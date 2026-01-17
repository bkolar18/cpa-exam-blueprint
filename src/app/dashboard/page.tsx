"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { getQuestionsBySection } from "@/lib/data/practice-questions";
import type { SectionCode } from "@/lib/supabase/types";
import {
  calculatePrimeMeridianScore,
  type PracticeAttemptData,
  type TBSAttemptData,
  getPrimeMeridianMilestone,
} from "@/lib/scoring/prime-meridian";
import PrimeMeridianCompass from "@/components/dashboard/PrimeMeridianCompass";
import AIFeaturesCard from "@/components/dashboard/AIFeaturesCard";
import { OBBBATransitionBanner } from "@/components/dashboard/OBBBATransitionBanner";
import type { TaxContentPreference } from "@/lib/utils/tax-content-version";

// Type for study session from Supabase
interface StudySessionRow {
 id: string;
 section: string;
 hours: number;
 date: string;
 notes: string | null;
}

// Type for section readiness data
interface SectionReadinessData {
 section: string;
 attempted: number; // unique questions attempted
 correct: number;
 accuracy: number;
 totalQuestions: number;
 coverage: number; // percentage of questions attempted
}

// Type for saved practice session
interface SavedPracticeSession {
 section: string;
 questionIds: string[];
 currentIndex: number;
 results: Array<{
 questionId: string;
 selectedAnswer: 'A' | 'B' | 'C' | 'D';
 isCorrect: boolean;
 }>;
 startTime: string;
 savedAt: string;
}

const SAVED_SESSION_KEY = 'cpa-practice-session';

/**
 * Calculate the displayed study streak based on last_study_date.
 * Returns 0 if the user hasn't studied today or yesterday (streak is broken).
 * This ensures the streak resets visually at midnight instead of only on next study.
 */
function getDisplayedStreak(lastStudyDate: string | null | undefined, currentStreak: number): number {
  if (!lastStudyDate || currentStreak <= 0) return 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const lastStudy = new Date(lastStudyDate);
  lastStudy.setHours(0, 0, 0, 0);

  // If last study was today or yesterday, streak is still active
  if (lastStudy >= yesterday) {
    return currentStreak;
  }

  // Streak is broken - they missed more than one day
  return 0;
}

export default function DashboardPage() {
 const searchParams = useSearchParams();
 const isVerified = searchParams.get("verified") ==="true";
 const { user, profile, loading: authLoading, refreshProfile } = useAuth();
 const [sectionProgress, setSectionProgress] = useState<{ status: string }[]>([]);
 const [recentSessions, setRecentSessions] = useState<StudySessionRow[]>([]);
  const [ntsEntries, setNtsEntries] = useState<{ id: string }[]>([]);
  const [readinessData, setReadinessData] = useState<SectionReadinessData[]>([]);
  const [overallPrimeMeridian, setOverallPrimeMeridian] = useState(0);
  const [loading, setLoading] = useState(true);
 const [showUpgradePromo, setShowUpgradePromo] = useState(false);
 const [savedPracticeSession, setSavedPracticeSession] = useState<SavedPracticeSession | null>(null);
 const supabase = createClient();

 // Determine user's subscription tier (default to 'free' if not set)
 const subscriptionTier = profile?.subscription_tier ||"free";
 const isPro = subscriptionTier ==="pro";
 const isFree = subscriptionTier ==="free";

 // Check if promo was dismissed in localStorage
 useEffect(() => {
 if (typeof window !=="undefined"&& !isPro) {
 const dismissed = localStorage.getItem("upgrade_promo_dismissed");
 const dismissedTime = dismissed ? parseInt(dismissed, 10) : 0;
 const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
 // Show promo if not dismissed or dismissed more than 3 days ago
 if (!dismissed || dismissedTime < threeDaysAgo) {
 setShowUpgradePromo(true);
 }
 }
 }, [isPro]);

 // Check for saved practice session in localStorage
 useEffect(() => {
 if (typeof window !=="undefined") {
 const saved = localStorage.getItem(SAVED_SESSION_KEY);
 if (saved) {
 try {
 const parsed: SavedPracticeSession = JSON.parse(saved);
 setSavedPracticeSession(parsed);
 } catch {
 localStorage.removeItem(SAVED_SESSION_KEY);
 }
 }
 }
 }, []);

 const discardSavedSession = () => {
 localStorage.removeItem(SAVED_SESSION_KEY);
 setSavedPracticeSession(null);
 };

 const dismissUpgradePromo = () => {
 setShowUpgradePromo(false);
 if (typeof window !=="undefined") {
 localStorage.setItem("upgrade_promo_dismissed", Date.now().toString());
 }
 };

 // Dismiss OBBBA transition banner - saves to database
 const dismissOBBBABanner = async () => {
   if (!supabase || !user) return;
   await supabase
     .from("profiles")
     .update({ obbba_banner_dismissed_at: new Date().toISOString() })
     .eq("id", user.id);
   // Refresh profile to update the dismissed state
   await refreshProfile();
 };

 useEffect(() => {
 if (authLoading) return;
 if (!user) {
 setLoading(false);
 return;
 }
 fetchDashboardData();
 }, [user, authLoading]);

 // Refetch data when page becomes visible (user returns from another page)
 useEffect(() => {
 const handleVisibilityChange = () => {
 if (document.visibilityState === 'visible' && user && !authLoading) {
 // Small delay to ensure any pending writes complete
 setTimeout(() => {
 fetchDashboardData();
 }, 500);
 }
 };

 document.addEventListener('visibilitychange', handleVisibilityChange);
 return () => {
 document.removeEventListener('visibilitychange', handleVisibilityChange);
 };
 }, [user, authLoading]);

 const fetchDashboardData = async () => {
 if (!supabase || !user) {
 setLoading(false);
 return;
 }

 // Refresh profile to get latest streak data
 await refreshProfile();

 // Fetch section progress
 const { data: progressData } = await supabase
 .from("section_progress")
 .select("*")
 .eq("user_id", user.id);
 if (progressData) setSectionProgress(progressData);

 // Fetch study sessions (last 7 days)
 const sevenDaysAgo = new Date();
 sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
 const { data: sessionsData } = await supabase
 .from("study_sessions")
 .select("*")
 .eq("user_id", user.id)
 .gte("date", sevenDaysAgo.toISOString().split("T")[0]);
 if (sessionsData) setRecentSessions(sessionsData as StudySessionRow[]);

 // Fetch NTS entries
 const { data: ntsData } = await supabase
 .from("nts_entries")
 .select("*")
 .eq("user_id", user.id)
 .eq("status","active");
 if (ntsData) setNtsEntries(ntsData);

 // Fetch practice attempts for readiness summary
    const { data: attempts } = await supabase
      .from("practice_attempts")
      .select("section, question_id, topic, is_correct, created_at")
      .eq("user_id", user.id);

    // Fetch TBS attempts for Prime Meridian calculation
    const { data: tbsAttempts } = await supabase
      .from("tbs_attempts")
      .select("tbs_id, section, is_complete, score_percentage")
      .eq("user_id", user.id);

    // Calculate readiness per section and Prime Meridian
    const sections: SectionCode[] = ["FAR", "AUD", "REG", "TCP", "BAR", "ISC"];
    const sectionStats: SectionReadinessData[] = [];
    let totalPMScore = 0;
    let sectionsWithData = 0;

    for (const section of sections) {
      const sectionAttempts = (attempts || []).filter(a => a.section === section);

      // Count unique questions attempted
      const uniqueQuestionIds = new Set(sectionAttempts.map(a => a.question_id));
      const uniqueAttempted = uniqueQuestionIds.size;

      // Count correct (if any attempt was correct, count as correct)
      const questionResults = new Map<string, boolean>();
      sectionAttempts.forEach(a => {
        const current = questionResults.get(a.question_id);
        if (current !== true) {
          questionResults.set(a.question_id, a.is_correct);
        }
      });
      const correctQuestions = [...questionResults.values()].filter(v => v).length;

      // Get total questions for this section
      const totalQuestions = getQuestionsBySection(section).length;
      const coverage = totalQuestions > 0 ? Math.round((uniqueAttempted / totalQuestions) * 100) : 0;

      if (uniqueAttempted > 0) {
        sectionStats.push({
          section,
          attempted: uniqueAttempted,
          correct: correctQuestions,
          accuracy: uniqueAttempted > 0 ? Math.round((correctQuestions / uniqueAttempted) * 100) : 0,
          totalQuestions,
          coverage,
        });

        // Calculate Prime Meridian for this section
        const mcqData: PracticeAttemptData[] = sectionAttempts.map(a => ({
          question_id: a.question_id,
          topic: a.topic || null,
          is_correct: a.is_correct,
          created_at: a.created_at,
        }));
        const tbsData: TBSAttemptData[] = ((tbsAttempts || []) as { tbs_id: string; section: string; is_complete: boolean; score_percentage: number | null }[])
          .filter(t => t.section === section)
          .map(t => ({
            tbs_id: t.tbs_id,
            section: t.section,
            is_complete: t.is_complete,
            score_percentage: t.score_percentage,
            created_at: new Date().toISOString(),
          }));
        const pmResult = calculatePrimeMeridianScore(mcqData, tbsData, section);
        totalPMScore += pmResult.overallScore;
        sectionsWithData++;
      }
    }

    setReadinessData(sectionStats);
    setOverallPrimeMeridian(sectionsWithData > 0 ? Math.round(totalPMScore / sectionsWithData) : 0);

 setLoading(false);
 };

 // Helper function to format hours (show minutes if under 1 hour)
 const formatHours = (hours: number): string => {
 if (hours === 0) return"0";
 if (hours < 1) {
 const minutes = Math.round(hours * 60);
 return `${minutes}m`;
 }
 if (hours % 1 === 0) return hours.toString();
 return hours.toFixed(1);
 };

 // Calculate stats
 const weeklyHours = recentSessions?.reduce((sum: number, s: { hours: number }) => sum + Number(s.hours), 0) || 0;
 const sectionsPassed = sectionProgress?.filter((s: { status: string }) => s.status ==="passed").length || 0;
 const sectionsInProgress = sectionProgress?.filter((s: { status: string }) => s.status ==="studying"|| s.status ==="scheduled").length || 0;
 const activeNTS = ntsEntries?.length || 0;

 // Check if profile is incomplete (needs onboarding)
 const needsOnboarding = !profile?.state_code || !profile?.target_completion_date;

 if (loading || authLoading) {
 return (
 <div className="flex items-center justify-center min-h-[400px]">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
 </div>
 );
 }

 return (
 <div className="space-y-8">
 {/* Email Verification Success Message */}
 {isVerified && (
 <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
 <div className="flex items-center space-x-3">
 <div className="w-8 h-8 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5 text-green-600 dark:text-green-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 </div>
 <div>
 <h3 className="font-semibold text-green-800 dark:text-green-300">Email Verified Successfully!</h3>
 <p className="text-green-700 dark:text-green-400 text-sm">
 Your account is now active. Welcome to Meridian CPA Review!
 </p>
 </div>
 </div>
 </div>
 )}

 {/* Welcome Section */}
 <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl p-8 text-white">
 <h1 className="text-3xl font-bold mb-2">
 Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` :""}!
 </h1>
 <p className="text-white/80">
 {weeklyHours > 0
 ? weeklyHours < 1
 ? `You've logged ${Math.round(weeklyHours * 60)} study minutes this week. Keep it up!`
 : `You've logged ${weeklyHours.toFixed(1)} study hours this week. Keep it up!`
 :"Ready to start tracking your CPA journey?"}
 </p>
 </div>

 {/* Onboarding Prompt */}
 {needsOnboarding && (
 <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5 text-amber-600 dark:text-amber-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
 </svg>
 </div>
 <div className="flex-1">
 <h3 className="font-semibold text-amber-800 dark:text-amber-300">Complete Your Profile</h3>
 <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
 Set up your state, target date, and study preferences to get personalized insights.
 </p>
 <Link
 href="/dashboard/settings"
 className="inline-block mt-3 text-sm font-medium text-amber-800 dark:text-amber-300 hover:text-amber-900 dark:hover:text-amber-200"
 >
 Complete Setup &rarr;
 </Link>
 </div>
 </div>
 </div>
 )}

 {/* OBBBA Tax Law Transition Banner */}
 <OBBBATransitionBanner
   targetDate={profile?.target_completion_date || null}
   disciplineChoice={profile?.discipline_choice || null}
   taxContentVersion={(profile?.tax_content_version as TaxContentPreference) || null}
   dismissedAt={profile?.obbba_banner_dismissed_at || null}
   onDismiss={dismissOBBBABanner}
 />

 {/* Resume Practice Session Banner */}
 {savedPracticeSession && (
 <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 </div>
 <div>
 <h3 className="font-semibold text-blue-800 dark:text-blue-300">Resume Practice Session</h3>
 <p className="text-blue-700 dark:text-blue-400 text-sm mt-1">
 You have an unfinished {savedPracticeSession.section} quiz ({savedPracticeSession.results.length}/{savedPracticeSession.questionIds.length} questions completed)
 </p>
 </div>
 </div>
 <div className="flex items-center space-x-3 ml-14 md:ml-0">
 <button
 onClick={discardSavedSession}
 className="px-4 py-2 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800 rounded-lg transition-colors text-sm font-medium"
 >
 Discard
 </button>
 <Link
 href={`/dashboard/practice/${savedPracticeSession.section.toLowerCase()}`}
 className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
 >
 Resume Quiz
 </Link>
 </div>
 </div>
 </div>
 )}

 {/* Upgrade Promotion Banner - Hidden during beta */}
 {false && showUpgradePromo && !isPro && (
 <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white relative overflow-hidden">
 {/* Decorative elements */}
 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
 <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

 {/* Dismiss button */}
 <button
 onClick={dismissUpgradePromo}
 className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition-colors"
 aria-label="Dismiss"
 >
 <svg className="w-5 h-5"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </button>

 <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
 <div className="flex-1">
 <div className="flex items-center gap-2 mb-2">
 <svg className="w-6 h-6 text-yellow-300"fill="currentColor"viewBox="0 0 24 24">
 <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
 </svg>
 <span className="text-sm font-medium text-purple-200 uppercase tracking-wider">
 {isFree ?"Unlock More Features":"Upgrade to Pro"}
 </span>
 </div>
 <h3 className="text-xl font-bold mb-2">
 {isFree
 ?"Ready to supercharge your CPA prep?"
 :"Get unlimited access with Pro!"}
 </h3>
 <p className="text-purple-100 text-sm">
 {isFree
 ?"Get 3,000+ questions across all core sections with unlimited access, or go Pro for 6,000+ questions across all 6 sections!"
 :"Unlock all 6,000+ practice questions, adaptive learning, and all 6 exam sections with unlimited access — no expiration."}
 </p>
 </div>
 <div className="flex flex-col sm:flex-row gap-3">
 {isFree && (
 <Link
 href="/pricing?plan=standard"
 className="px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-center transition-colors"
 >
 <span className="line-through opacity-60">$99</span>{""}
 <span className="font-bold">$79</span>
 </Link>
 )}
 <Link
 href="/pricing?plan=pro"
 className="px-5 py-2.5 bg-white text-purple-700 hover:bg-purple-50 rounded-lg font-semibold text-center transition-colors"
 >
 {isFree ? (
 <>
 <span className="line-through opacity-60">$199</span>{""}
 <span className="font-bold">$149</span>
 </>
 ) : (
 <>
 Pro - <span className="line-through opacity-60">$199</span>{""}
 <span className="font-bold">$149</span>
 </>
 )}
 </Link>
 </div>
 </div>
 </div>
 )}

 {/* Stats Grid */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
 <StatCard
 label="This Week"
 value={`${formatHours(weeklyHours)} ${weeklyHours === 1 ? 'hour' : 'hours'}`}
 sublabel={profile?.weekly_study_hours ? `Goal: ${profile.weekly_study_hours} hours` : "Set a goal"}
 color="blue"
 />
 <Link href="/dashboard/readiness" className="block">
            <div className={`rounded-xl border p-5 transition-all ${
              overallPrimeMeridian >= 75
                ? "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 border-emerald-300 dark:border-emerald-700 shadow-md ring-2 ring-emerald-200 dark:ring-emerald-800"
                : "bg-white dark:bg-[var(--card)] border-[var(--border)]"
            }`}>
              <div className="flex items-center justify-between">
                <p className="text-sm text-[var(--muted)] mb-1">Prime Meridian</p>
                {overallPrimeMeridian >= 75 && (
                  <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                )}
              </div>
              <div className="flex items-center justify-center py-1">
                <PrimeMeridianCompass
                  score={overallPrimeMeridian}
                  size="sm"
                  showLabel={false}
                />
              </div>
              <p className={`text-xs text-center ${
                overallPrimeMeridian >= 80
                  ? "text-emerald-700 dark:text-emerald-300 font-medium"
                  : "text-[var(--muted)]"
              }`}>
                {overallPrimeMeridian >= 80 ? "Recommended!" : overallPrimeMeridian > 0 ? `${80 - overallPrimeMeridian} to goal` : "Start practicing"}
              </p>
            </div>
          </Link>
 <StatCard
 label="Active NTS"
 value={activeNTS.toString()}
 sublabel={activeNTS > 0 ?"Track expiration":"Add your NTS"}
 color="purple"
 />
 <StatCard
 label="Study Streak"
 value={(() => {
   const displayedStreak = getDisplayedStreak(profile?.last_study_date, profile?.current_streak || 0);
   return `${displayedStreak} ${displayedStreak === 1 ? 'day' : 'days'}`;
 })()}
 sublabel={profile?.longest_streak ? `Best: ${profile.longest_streak} ${profile.longest_streak === 1 ? 'day' : 'days'}` :"Log a session"}
 color="orange"
 />
 </div>

 {/* Quick Actions - Updated with new features */}
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 <QuickActionCard
 href="/dashboard/practice"
 icon="practice"
 title="Practice MCQs"
 description="6,000+ multiple choice questions across all sections"
 color="blue"
 badge="Core"
 />
 <QuickActionCard
 href="/dashboard/simulations"
 icon="simulation"
 title="TBS Simulations"
 description="Task-based simulations with realistic exam scenarios"
 color="purple"
 badge="New"
 />
 <QuickActionCard
 href="/dashboard/exam-simulation"
 icon="exam"
 title="Exam Simulation"
 description="Full exam experience with MCQs and TBS combined"
 color="orange"
 badge="Featured"
 />
 <QuickActionCard
 href="/dashboard/readiness"
 icon="sections"
 title="Exam Preparation"
 description="Track your progress across all sections"
 color="green"
 />
 <QuickActionCard
 href="/dashboard/flashcards"
 icon="flashcard"
 title="Flashcards"
 description="Spaced repetition cards for key concepts"
 color="teal"
 />
 <QuickActionCard
 href="/dashboard/accolades"
 icon="trophy"
 title="Accolades"
 description="View your badges and achievements"
 color="yellow"
 />
 </div>

 {/* AI-Powered Features Section */}
 <AIFeaturesCard isBeta={true} />

 {/* Exam Preparation Summary */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-lg font-semibold text-[var(--foreground)]">Exam Preparation</h2>
 <Link
 href="/dashboard/readiness"
 className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center gap-1"
 >
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
 </svg>
 View Full Dashboard
 </Link>
 </div>
 {readinessData.length > 0 ? (
 <div className="space-y-4">
 {/* Overall Stats */}
 <div className="grid grid-cols-3 gap-4 mb-4">
 <div className="text-center p-3 bg-[var(--card)] dark:bg-[var(--card-hover)] rounded-lg">
 <p className="text-2xl font-bold text-[var(--primary)]">
 {readinessData.reduce((sum, s) => sum + s.attempted, 0)}
 </p>
 <p className="text-xs text-[var(--muted)]">Questions Attempted</p>
 </div>
 <div className="text-center p-3 bg-[var(--card)] dark:bg-[var(--card-hover)] rounded-lg">
 <p className="text-2xl font-bold text-green-600 dark:text-green-400">
 {readinessData.reduce((sum, s) => sum + s.correct, 0)}
 </p>
 <p className="text-xs text-[var(--muted)]">Correct Answers</p>
 </div>
 <div className="text-center p-3 bg-[var(--card)] dark:bg-[var(--card-hover)] rounded-lg">
 <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
 {readinessData.length > 0
 ? Math.round(readinessData.reduce((sum, s) => sum + s.accuracy, 0) / readinessData.length)
 : 0}%
 </p>
 <p className="text-xs text-[var(--muted)]">Avg Accuracy</p>
 </div>
 </div>
 {/* Section Breakdown */}
 <div className="space-y-3">
 {readinessData.map((section) => (
 <div key={section.section} className="flex items-center gap-4">
 <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
 <span className="text-sm font-bold text-[var(--primary)]">{section.section}</span>
 </div>
 <div className="flex-1 min-w-0">
 <div className="flex items-center justify-between mb-1">
 <span className="text-sm font-medium text-[var(--foreground)]">
 {section.attempted} / {section.totalQuestions} questions
 </span>
 <span className={`text-sm font-bold ${
 section.accuracy >= 75 ? 'text-green-600 dark:text-green-400' :
 section.accuracy >= 50 ? 'text-yellow-600 dark:text-yellow-400' :
 section.accuracy > 0 ? 'text-red-600 dark:text-red-400' :
 'text-gray-400'
 }`}>
 {section.accuracy}%
 </span>
 </div>
 <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
 <div
 className={`h-full transition-all duration-300 ${
 section.coverage >= 70 ? 'bg-green-500' :
 section.coverage >= 25 ? 'bg-yellow-500' :
 'bg-red-400'
 }`}
 style={{ width: `${section.coverage}%` }}
 />
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>
 ) : (
 <div className="text-center py-8">
 <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
 </svg>
 </div>
 <p className="text-[var(--muted)] mb-4">Start practicing to track your exam readiness</p>
 <Link href="/dashboard/practice" className="btn-primary inline-block">
 Start Practice Quiz
 </Link>
 </div>
 )}
 </div>
 </div>
 );
}

function StatCard({
  label,
  value,
  sublabel,
  color,
  highlighted = false,
}: {
  label: string;
  value: string;
  sublabel: string;
  color: "blue" | "green" | "purple" | "orange";
  highlighted?: boolean;
}) {
  const colors = {
    blue: "text-blue-700 dark:text-blue-400",
    green: "text-green-700 dark:text-green-400",
    purple: "text-purple-700 dark:text-purple-400",
    orange: "text-orange-700 dark:text-orange-400",
  };

  return (
    <div className={`rounded-xl border p-5 transition-all ${
      highlighted
        ? "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 border-emerald-300 dark:border-emerald-700 shadow-md ring-2 ring-emerald-200 dark:ring-emerald-800"
        : "bg-white dark:bg-[var(--card)] border-[var(--border)]"
    }`}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted)] mb-1">{label}</p>
        {highlighted && (
          <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        )}
      </div>
      <p className={`text-3xl font-bold ${highlighted ? "text-emerald-600 dark:text-emerald-400" : colors[color]}`}>{value}</p>
      <p className={`text-sm mt-1 ${highlighted ? "text-emerald-700 dark:text-emerald-300 font-medium" : "text-[var(--muted)]"}`}>{sublabel}</p>
    </div>
  );
}

function QuickActionCard({
 href,
 icon,
 title,
 description,
 color ="primary",
 badge,
}: {
 href: string;
 icon: string;
 title: string;
 description: string;
 color?:"primary"|"blue"|"green"|"purple"|"orange"|"teal"|"yellow";
 badge?: string;
}) {
 const colorStyles: Record<string, { bg: string; text: string; hover: string }> = {
 primary: {
 bg:"bg-[var(--primary)]/10 dark:bg-[var(--primary)]/20",
 text:"text-[var(--primary)]",
 hover:"group-hover:bg-[var(--primary)]",
 },
 blue: {
 bg:"bg-blue-100 dark:bg-blue-900/30",
 text:"text-blue-600 dark:text-blue-400",
 hover:"group-hover:bg-blue-600",
 },
 green: {
 bg:"bg-green-100 dark:bg-green-900/30",
 text:"text-green-600 dark:text-green-400",
 hover:"group-hover:bg-green-600",
 },
 purple: {
 bg:"bg-purple-100 dark:bg-purple-900/30",
 text:"text-purple-600 dark:text-purple-400",
 hover:"group-hover:bg-purple-600",
 },
 orange: {
 bg:"bg-orange-100 dark:bg-orange-900/30",
 text:"text-orange-600 dark:text-orange-400",
 hover:"group-hover:bg-orange-600",
 },
 teal: {
 bg:"bg-teal-100 dark:bg-teal-900/30",
 text:"text-teal-600 dark:text-teal-400",
 hover:"group-hover:bg-teal-600",
 },
 yellow: {
 bg:"bg-yellow-100 dark:bg-yellow-900/30",
 text:"text-yellow-600 dark:text-yellow-400",
 hover:"group-hover:bg-yellow-600",
 },
 };

 const badgeColors: Record<string, string> = {
"New":"bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
"Featured":"bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
"Core":"bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
"Beta":"bg-gray-100 text-gray-700 dark:bg-[var(--card)] dark:text-[var(--muted-light)]",
 };

 const icons: Record<string, React.ReactNode> = {
 clock: (
 <svg className="w-6 h-6"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 ),
 sections: (
 <svg className="w-6 h-6"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
 </svg>
 ),
 calendar: (
 <svg className="w-6 h-6"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
 </svg>
 ),
 practice: (
 <svg className="w-6 h-6"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
 </svg>
 ),
 simulation: (
 <svg className="w-6 h-6"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
 </svg>
 ),
 exam: (
 <svg className="w-6 h-6"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 12l2 2 4-4"/>
 </svg>
 ),
 flashcard: (
 <svg className="w-6 h-6"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
 </svg>
 ),
 trophy: (
 <svg className="w-6 h-6"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
 </svg>
 ),
 book: (
 <svg className="w-6 h-6"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
 </svg>
 ),
 };

 const style = colorStyles[color] || colorStyles.primary;

 return (
 <Link
 href={href}
 className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--primary)] hover:shadow-lg transition-all group relative overflow-hidden"
 >
 {badge && (
 <span className={`absolute top-3 right-3 px-2 py-0.5 text-xs font-medium rounded-full ${badgeColors[badge] ||"bg-gray-100 text-gray-700"}`}>
 {badge}
 </span>
 )}
 <div className={`w-12 h-12 ${style.bg} rounded-xl flex items-center justify-center ${style.text} mb-4 ${style.hover} group-hover:text-white transition-colors`}>
 {icons[icon]}
 </div>
 <h3 className="font-semibold text-[var(--foreground)] mb-1">{title}</h3>
 <p className="text-sm text-[var(--muted)]">{description}</p>
 </Link>
 );
}
