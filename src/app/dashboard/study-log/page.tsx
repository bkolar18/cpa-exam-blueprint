"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";

interface PracticeAttempt {
 id: string;
 question_id: string;
 section: string;
 topic: string | null;
 selected_answer: string;
 correct_answer: string;
 is_correct: boolean;
 time_spent_seconds: number | null;
 created_at: string;
}

interface PracticeSession {
 id: string;
 section: string;
 date: Date;
 attempts: PracticeAttempt[];
 correctCount: number;
 totalCount: number;
 accuracy: number;
 totalTimeSeconds: number;
 topics: string[];
}

interface ExamSimulationHistory {
 id: string;
 section: string;
 exam_type: 'mini' | 'mixed' | 'realistic';
 started_at: string;
 completed_at: string | null;
 mcq_count: number;
 mcq_correct: number;
 mcq_score_percentage: number | null;
 tbs_count: number;
 tbs_score_percentage: number | null;
 total_score_percentage: number | null;
 time_limit_seconds: number;
 time_spent_seconds: number;
}

interface TBSAttempt {
 id: string;
 tbs_id: string;
 section: string | null;
 started_at: string;
 completed_at: string | null;
 time_spent_seconds: number | null;
 score_earned: number | null;
 max_score: number | null;
 score_percentage: number | null;
 is_complete: boolean;
}

// Group attempts into sessions (attempts within 30 minutes of each other)
function groupIntoSessions(attempts: PracticeAttempt[]): PracticeSession[] {
 if (attempts.length === 0) return [];

 const sessions: PracticeSession[] = [];
 let currentSession: PracticeAttempt[] = [];
 let lastTime: Date | null = null;

 // Sort by created_at ascending to group properly
 const sorted = [...attempts].sort(
 (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
 );

 for (const attempt of sorted) {
 const attemptTime = new Date(attempt.created_at);

 if (lastTime === null || attemptTime.getTime() - lastTime.getTime() < 30 * 60 * 1000) {
 // Same session (within 30 minutes)
 currentSession.push(attempt);
 } else {
 // New session
 if (currentSession.length > 0) {
 sessions.push(createSessionFromAttempts(currentSession));
 }
 currentSession = [attempt];
 }
 lastTime = attemptTime;
 }

 // Don't forget the last session
 if (currentSession.length > 0) {
 sessions.push(createSessionFromAttempts(currentSession));
 }

 // Return newest first
 return sessions.reverse();
}

function createSessionFromAttempts(attempts: PracticeAttempt[]): PracticeSession {
 const correctCount = attempts.filter((a) => a.is_correct).length;
 const topics = [...new Set(attempts.map((a) => a.topic).filter(Boolean))] as string[];
 const totalTimeSeconds = attempts.reduce((sum, a) => sum + (a.time_spent_seconds || 0), 0);

 return {
 id: attempts[0].id,
 section: attempts[0].section,
 date: new Date(attempts[0].created_at),
 attempts,
 correctCount,
 totalCount: attempts.length,
 accuracy: Math.round((correctCount / attempts.length) * 100),
 totalTimeSeconds,
 topics,
 };
}

// Study Guide types
interface StudyGuideUsage {
  used: number;
  limit: number;
  remaining: number;
  tier: string;
  resetDate: string;
}

type StudyStyle = 'intensive' | 'balanced' | 'spaced';

const STUDY_STYLES: { value: StudyStyle; label: string; description: string }[] = [
  { value: 'intensive', label: 'Intensive', description: 'Focus heavily on weak areas first' },
  { value: 'balanced', label: 'Balanced', description: 'Mix of weak and strong areas' },
  { value: 'spaced', label: 'Spaced', description: 'Distributed practice across all topics' },
];

const SECTIONS = [
  { value: 'FAR', label: 'FAR - Financial Accounting & Reporting' },
  { value: 'AUD', label: 'AUD - Auditing & Attestation' },
  { value: 'REG', label: 'REG - Regulation' },
  { value: 'TCP', label: 'TCP - Tax Compliance & Planning' },
  { value: 'BAR', label: 'BAR - Business Analysis & Reporting' },
  { value: 'ISC', label: 'ISC - Information Systems & Controls' },
];

export default function StudyLogPage() {
 const { user, loading: authLoading } = useAuth();
 const searchParams = useSearchParams();
 const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);
 const [visiblePracticeSessions, setVisiblePracticeSessions] = useState(5);
 const [loading, setLoading] = useState(true);
 const [activeTab, setActiveTab] = useState<'practice' | 'tbs' | 'exam' | 'study-guide'>('practice');
 const [examSimulations, setExamSimulations] = useState<ExamSimulationHistory[]>([]);
 const [visibleExamSimulations, setVisibleExamSimulations] = useState(5);
 const [tbsAttempts, setTbsAttempts] = useState<TBSAttempt[]>([]);
 const [visibleTbsAttempts, setVisibleTbsAttempts] = useState(5);
 const supabase = createClient();

 // Study Guide state
 const [studyGuideUsage, setStudyGuideUsage] = useState<StudyGuideUsage | null>(null);
 const [selectedSection, setSelectedSection] = useState<string>('FAR');
 const [studyStyle, setStudyStyle] = useState<StudyStyle>('balanced');
 const [availableHours, setAvailableHours] = useState<number>(10);
 const [generatedGuide, setGeneratedGuide] = useState<string | null>(null);
 const [generatingGuide, setGeneratingGuide] = useState(false);
 const [guideError, setGuideError] = useState<string | null>(null);

 // Handle URL tab parameter
 useEffect(() => {
  const tabParam = searchParams.get('tab');
  if (tabParam === 'study-guide') {
   setActiveTab('study-guide');
  }
 }, [searchParams]);

 // Fetch study guide usage when on study-guide tab
 useEffect(() => {
  if (activeTab === 'study-guide' && user) {
   fetchStudyGuideUsage();
  }
 }, [activeTab, user]);

 useEffect(() => {
 if (authLoading) return; // Wait for auth to finish
 if (user) {
 fetchData();
 } else {
 setLoading(false);
 }
 }, [user, authLoading]);

 const fetchData = async () => {
 if (!supabase || !user) {
 setLoading(false);
 return;
 }

 // Fetch practice attempts
 const { data: attemptData } = await supabase
 .from("practice_attempts")
 .select("*")
 .eq("user_id", user.id)
 .order("created_at", { ascending: false });

 if (attemptData) {
 const grouped = groupIntoSessions(attemptData as PracticeAttempt[]);
 setPracticeSessions(grouped);
 }

 // Fetch exam simulation history
 const { data: examData } = await supabase
 .from("exam_simulation_history")
 .select("id, section, exam_type, started_at, completed_at, mcq_count, mcq_correct, mcq_score_percentage, tbs_count, tbs_score_percentage, total_score_percentage, time_limit_seconds, time_spent_seconds")
 .eq("user_id", user.id)
 .not("completed_at", "is", null)
 .order("completed_at", { ascending: false })
 .limit(50);

 if (examData) {
 setExamSimulations(examData as ExamSimulationHistory[]);
 }

 // Fetch TBS attempts (standalone TBS practice, not exam TBS)
 const { data: tbsData } = await supabase
 .from("tbs_attempts")
 .select("id, tbs_id, section, started_at, completed_at, time_spent_seconds, score_earned, max_score, score_percentage, is_complete")
 .eq("user_id", user.id)
 .eq("is_complete", true)
 .is("exam_history_id", null) // Only standalone TBS, not exam simulations
 .order("completed_at", { ascending: false })
 .limit(50);

 if (tbsData) {
 setTbsAttempts(tbsData as TBSAttempt[]);
 }

 setLoading(false);
 };

 // Fetch study guide usage
 const fetchStudyGuideUsage = async () => {
  try {
   const response = await fetch('/api/ai/study-guide');
   if (response.ok) {
    const data = await response.json();
    setStudyGuideUsage(data);
   }
  } catch (error) {
   console.error('Error fetching study guide usage:', error);
  }
 };

 // Generate study guide
 const handleGenerateGuide = async () => {
  if (!user) return;

  setGeneratingGuide(true);
  setGuideError(null);
  setGeneratedGuide(null);

  try {
   const response = await fetch('/api/ai/study-guide', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
     section: selectedSection,
     availableHoursPerWeek: availableHours,
     studyStyle: studyStyle,
    }),
   });

   const data = await response.json();

   if (!response.ok) {
    setGuideError(data.error || 'Failed to generate study guide');
    return;
   }

   setGeneratedGuide(data.studyGuide);
   // Refresh usage after generation
   fetchStudyGuideUsage();
  } catch (error) {
   console.error('Error generating study guide:', error);
   setGuideError('Failed to generate study guide. Please try again.');
  } finally {
   setGeneratingGuide(false);
  }
 };

 // Format seconds to hours and minutes
 const formatSeconds = (seconds: number): string => {
 if (seconds === 0) return "0m";
 const hours = Math.floor(seconds / 3600);
 const minutes = Math.round((seconds % 3600) / 60);
 if (hours === 0) return `${minutes}m`;
 if (minutes === 0) return `${hours}h`;
 return `${hours}h ${minutes}m`;
 };

 // Calculate weekly stats from practice sessions
 const now = new Date();
 const thisWeekStart = new Date(now);
 thisWeekStart.setDate(now.getDate() - now.getDay());
 thisWeekStart.setHours(0, 0, 0, 0);

 // Practice session stats
 const thisWeekPracticeSessions = practiceSessions.filter(
 (s) => s.date >= thisWeekStart
 );
 const weeklyPracticeSeconds = thisWeekPracticeSessions.reduce((sum, s) => sum + s.totalTimeSeconds, 0);
 const totalPracticeSeconds = practiceSessions.reduce((sum, s) => sum + s.totalTimeSeconds, 0);

 // TBS session stats
 const thisWeekTbsAttempts = tbsAttempts.filter(
 (t) => t.completed_at && new Date(t.completed_at) >= thisWeekStart
 );
 const weeklyTbsSeconds = thisWeekTbsAttempts.reduce((sum, t) => sum + (t.time_spent_seconds || 0), 0);
 const totalTbsSeconds = tbsAttempts.reduce((sum, t) => sum + (t.time_spent_seconds || 0), 0);

 // Exam simulation stats
 const thisWeekExams = examSimulations.filter(
 (e) => e.completed_at && new Date(e.completed_at) >= thisWeekStart
 );
 const weeklyExamSeconds = thisWeekExams.reduce((sum, e) => sum + (e.time_spent_seconds || 0), 0);
 const totalExamSeconds = examSimulations.reduce((sum, e) => sum + (e.time_spent_seconds || 0), 0);

 // Combined totals
 const weeklyTotalSeconds = weeklyPracticeSeconds + weeklyTbsSeconds + weeklyExamSeconds;
 const totalTotalSeconds = totalPracticeSeconds + totalTbsSeconds + totalExamSeconds;

 // Show more practice sessions
 const handleShowMorePractice = () => {
 setVisiblePracticeSessions(prev => prev + 10);
 };

 // Show more exam simulations
 const handleShowMoreExams = () => {
 setVisibleExamSimulations(prev => prev + 10);
 };

 // Show more TBS attempts
 const handleShowMoreTbs = () => {
 setVisibleTbsAttempts(prev => prev + 10);
 };

 // Get exam type label
 const getExamTypeLabel = (type: string) => {
 switch (type) {
 case 'mini': return 'MCQ Only';
 case 'mixed': return 'Mixed';
 case 'realistic': return 'Realistic';
 default: return type;
 }
 };

 if (loading) {
 return (
 <div className="flex items-center justify-center min-h-[400px]">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
 </div>
 );
 }

 return (
 <div className="space-y-6">
 {/* Header */}
 <div>
 <h1 className="text-2xl font-bold text-[var(--foreground)]">Study Log</h1>
 <p className="text-[var(--muted)]">Review your practice history and track progress</p>
 </div>

 {/* Stats */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">This Week</p>
 <p className="text-2xl font-bold text-[var(--primary)]">{formatSeconds(weeklyTotalSeconds)}</p>
 <p className="text-xs text-[var(--muted)] mt-1">total study time</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">All Time</p>
 <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatSeconds(totalTotalSeconds)}</p>
 <p className="text-xs text-[var(--muted)] mt-1">total study time</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">MCQs Answered</p>
 <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
 {thisWeekPracticeSessions.reduce((sum, s) => sum + s.totalCount, 0)}
 </p>
 <p className="text-xs text-[var(--muted)] mt-1">this week</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">TBS Completed</p>
 <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
 {thisWeekTbsAttempts.length}
 </p>
 <p className="text-xs text-[var(--muted)] mt-1">this week</p>
 </div>
 </div>

 {/* Tab Navigation */}
 <div className="flex flex-wrap border-b border-[var(--border)]">
 <button
 onClick={() => setActiveTab('practice')}
 className={`px-4 md:px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
 activeTab === 'practice'
 ? 'border-[var(--primary)] text-[var(--primary)]'
 : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'
 }`}
 >
 MCQs ({practiceSessions.length})
 </button>
 <button
 onClick={() => setActiveTab('tbs')}
 className={`px-4 md:px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
 activeTab === 'tbs'
 ? 'border-[var(--primary)] text-[var(--primary)]'
 : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'
 }`}
 >
 TBS ({tbsAttempts.length})
 </button>
 <button
 onClick={() => setActiveTab('exam')}
 className={`px-4 md:px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
 activeTab === 'exam'
 ? 'border-[var(--primary)] text-[var(--primary)]'
 : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'
 }`}
 >
 Exams ({examSimulations.length})
 </button>
 <button
 onClick={() => setActiveTab('study-guide')}
 className={`px-4 md:px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
 activeTab === 'study-guide'
 ? 'border-purple-500 text-purple-600 dark:text-purple-400'
 : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'
 }`}
 >
 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
 </svg>
 <span className="hidden sm:inline">AI Study Guide</span>
 <span className="sm:hidden">AI Guide</span>
 </button>
 </div>

 {/* Multiple Choice Tab */}
 {activeTab === 'practice' && (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)]">
 <div className="p-6 border-b border-[var(--border)]">
 <div className="flex items-center justify-between">
 <h2 className="text-lg font-semibold text-[var(--foreground)]">Multiple Choice Questions</h2>
 <Link
 href="/dashboard/practice"
 className="text-sm text-[var(--primary)] hover:underline"
 >
 Practice More MCQs →
 </Link>
 </div>
 <p className="text-sm text-[var(--muted)] mt-1">
 Click on a session to review your answers
 </p>
 </div>

 {practiceSessions.length === 0 ? (
 <div className="p-12 text-center">
 <div className="w-16 h-16 bg-[var(--card)] dark:bg-[var(--card-hover)] rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-[var(--muted)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
 </svg>
 </div>
 <p className="text-[var(--muted)] mb-4">No MCQ practice sessions yet</p>
 <Link href="/dashboard/practice" className="btn-primary inline-block">
 Start Practicing
 </Link>
 </div>
 ) : (
 <>
 <div className="divide-y divide-[var(--border)] dark:divide-[var(--border)]">
 {practiceSessions.slice(0, visiblePracticeSessions).map((session) => (
 <Link
 key={session.id}
 href={`/dashboard/practice/history?session=${session.id}`}
 className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
 >
 <div className="flex items-center space-x-4">
 <div className="w-12 h-12 bg-[var(--primary)] rounded-lg flex items-center justify-center">
 <span className="text-white font-bold text-sm">{session.section}</span>
 </div>
 <div>
 <p className="font-medium text-[var(--foreground)]">
 {session.totalCount} Questions
 {session.totalTimeSeconds > 0 && (
 <span className="text-[var(--muted)] font-normal ml-2">
 ({formatSeconds(session.totalTimeSeconds)})
 </span>
 )}
 </p>
 <p className="text-sm text-[var(--muted)]">
 {session.date.toLocaleDateString("en-US", {
 weekday:"short",
 month:"short",
 day:"numeric",
 hour:"numeric",
 minute:"2-digit",
 })}
 </p>
 </div>
 </div>

 <div className="flex items-center space-x-4">
 <div className="text-right">
 <p className={`text-lg font-bold ${
 session.accuracy >= 80 ?"text-green-600 dark:text-green-400":
 session.accuracy >= 60 ?"text-yellow-600 dark:text-yellow-400":
"text-red-600 dark:text-red-400"
 }`}>
 {session.accuracy}%
 </p>
 <p className="text-xs text-[var(--muted)]">
 {session.correctCount}/{session.totalCount}
 </p>
 </div>
 <svg className="w-5 h-5 text-[var(--muted)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5l7 7-7 7"/>
 </svg>
 </div>
 </Link>
 ))}
 </div>

 {/* Show More Button */}
 {visiblePracticeSessions < practiceSessions.length && (
 <div className="p-4 text-center border-t border-[var(--border)]">
 <button
 onClick={handleShowMorePractice}
 className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium text-sm"
 >
 Show More ({practiceSessions.length - visiblePracticeSessions} remaining)
 </button>
 </div>
 )}
 </>
 )}
 </div>
 )}

 {/* Exam Simulations Tab */}
 {activeTab === 'exam' && (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)]">
 <div className="p-6 border-b border-[var(--border)]">
 <div className="flex items-center justify-between">
 <h2 className="text-lg font-semibold text-[var(--foreground)]">Exam Simulations</h2>
 <Link
 href="/dashboard/exam-simulation"
 className="text-sm text-[var(--primary)] hover:underline"
 >
 Start New Exam →
 </Link>
 </div>
 <p className="text-sm text-[var(--muted)] mt-1">
 Review your past exam simulations
 </p>
 </div>

 {examSimulations.length === 0 ? (
 <div className="p-12 text-center">
 <div className="w-16 h-16 bg-[var(--card)] dark:bg-[var(--card-hover)] rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-[var(--muted)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
 </svg>
 </div>
 <p className="text-[var(--muted)] mb-4">No exam simulations completed yet</p>
 <Link href="/dashboard/exam-simulation"className="btn-primary inline-block">
 Start an Exam
 </Link>
 </div>
 ) : (
 <>
 <div className="divide-y divide-[var(--border)] dark:divide-[var(--border)]">
 {examSimulations.slice(0, visibleExamSimulations).map((exam) => (
 <Link
 key={exam.id}
 href={`/dashboard/exam-simulation/history/${exam.id}`}
 className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
 >
 <div className="flex items-center space-x-4">
 <div className="w-12 h-12 bg-[var(--primary)] rounded-lg flex items-center justify-center">
 <span className="text-white font-bold text-sm">{exam.section}</span>
 </div>
 <div>
 <p className="font-medium text-[var(--foreground)]">
 {getExamTypeLabel(exam.exam_type)}
 <span className="text-[var(--muted)] font-normal ml-2">
 ({exam.mcq_count} MCQ{exam.tbs_count > 0 ? ` + ${exam.tbs_count} TBS` : ''})
 </span>
 </p>
 <p className="text-sm text-[var(--muted)]">
 {exam.completed_at && new Date(exam.completed_at).toLocaleDateString("en-US", {
 weekday:"short",
 month:"short",
 day:"numeric",
 hour:"numeric",
 minute:"2-digit",
 })}
 <span className="mx-2">•</span>
 {formatSeconds(exam.time_spent_seconds)}
 </p>
 </div>
 </div>
 <div className="flex items-center space-x-4">
 <div className="text-right">
 <p className={`text-lg font-bold ${
 (exam.total_score_percentage || 0) >= 75
 ? 'text-green-600 dark:text-green-400'
 : (exam.total_score_percentage || 0) >= 50
 ? 'text-yellow-600 dark:text-yellow-400'
 : 'text-red-600 dark:text-red-400'
 }`}>
 {exam.total_score_percentage?.toFixed(0) || 0}%
 </p>
 <p className="text-xs text-[var(--muted)]">
 {exam.mcq_correct}/{exam.mcq_count} MCQ
 </p>
 </div>
 <svg className="w-5 h-5 text-[var(--muted)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5l7 7-7 7"/>
 </svg>
 </div>
 </Link>
 ))}
 </div>

 {/* Show More Button */}
 {visibleExamSimulations < examSimulations.length && (
 <div className="p-4 text-center border-t border-[var(--border)]">
 <button
 onClick={handleShowMoreExams}
 className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium text-sm"
 >
 Show More ({examSimulations.length - visibleExamSimulations} remaining)
 </button>
 </div>
 )}
 </>
 )}
 </div>
 )}

 {/* Task-Based Simulations Tab */}
 {activeTab === 'tbs' && (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)]">
 <div className="p-6 border-b border-[var(--border)]">
 <div className="flex items-center justify-between">
 <h2 className="text-lg font-semibold text-[var(--foreground)]">Task-Based Simulations</h2>
 <Link
 href="/dashboard/simulations"
 className="text-sm text-[var(--primary)] hover:underline"
 >
 Practice More TBS →
 </Link>
 </div>
 <p className="text-sm text-[var(--muted)] mt-1">
 Click on a simulation to review your answers
 </p>
 </div>

 {tbsAttempts.length === 0 ? (
 <div className="p-12 text-center">
 <div className="w-16 h-16 bg-[var(--card)] dark:bg-[var(--card-hover)] rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-[var(--muted)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
 </svg>
 </div>
 <p className="text-[var(--muted)] mb-4">No TBS practice sessions completed yet</p>
 <Link href="/dashboard/simulations"className="btn-primary inline-block">
 Start TBS Practice
 </Link>
 </div>
 ) : (
 <>
 <div className="divide-y divide-[var(--border)] dark:divide-[var(--border)]">
 {tbsAttempts.slice(0, visibleTbsAttempts).map((tbs) => (
 <Link
 key={tbs.id}
 href={`/dashboard/simulations/review/${tbs.id}`}
 className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
 >
 <div className="flex items-center space-x-4">
 <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
 <span className="text-white font-bold text-sm">{tbs.section || 'TBS'}</span>
 </div>
 <div>
 <p className="font-medium text-[var(--foreground)]">
 Task-Based Simulation
 {(tbs.time_spent_seconds || 0) > 0 && (
 <span className="text-[var(--muted)] font-normal ml-2">
 ({formatSeconds(tbs.time_spent_seconds || 0)})
 </span>
 )}
 </p>
 <p className="text-sm text-[var(--muted)]">
 {tbs.completed_at && new Date(tbs.completed_at).toLocaleDateString("en-US", {
 weekday:"short",
 month:"short",
 day:"numeric",
 hour:"numeric",
 minute:"2-digit",
 })}
 </p>
 </div>
 </div>

 <div className="flex items-center space-x-4">
 <div className="text-right">
 <p className={`text-lg font-bold ${
 (tbs.score_percentage || 0) >= 80 ?"text-green-600 dark:text-green-400":
 (tbs.score_percentage || 0) >= 60 ?"text-yellow-600 dark:text-yellow-400":
"text-red-600 dark:text-red-400"
 }`}>
 {tbs.score_percentage?.toFixed(0) || 0}%
 </p>
 <p className="text-xs text-[var(--muted)]">
 {tbs.score_earned || 0}/{tbs.max_score || 0} pts
 </p>
 </div>
 <svg className="w-5 h-5 text-[var(--muted)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5l7 7-7 7"/>
 </svg>
 </div>
 </Link>
 ))}
 </div>

 {/* Show More Button */}
 {visibleTbsAttempts < tbsAttempts.length && (
 <div className="p-4 text-center border-t border-[var(--border)]">
 <button
 onClick={handleShowMoreTbs}
 className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium text-sm"
 >
 Show More ({tbsAttempts.length - visibleTbsAttempts} remaining)
 </button>
 </div>
 )}
 </>
 )}
 </div>
 )}

 {/* AI Study Guide Tab */}
 {activeTab === 'study-guide' && (
 <div className="space-y-6">
  {/* Usage Banner */}
  {studyGuideUsage && (
   <div className={`rounded-xl border p-4 ${
    studyGuideUsage.remaining > 0
     ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
     : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
   }`}>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
     <div className="flex items-center gap-2">
      <svg className={`w-5 h-5 ${studyGuideUsage.remaining > 0 ? 'text-purple-600 dark:text-purple-400' : 'text-red-600 dark:text-red-400'}`} fill="currentColor" viewBox="0 0 20 20">
       <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
      </svg>
      <span className={`text-sm font-medium ${studyGuideUsage.remaining > 0 ? 'text-purple-700 dark:text-purple-300' : 'text-red-700 dark:text-red-300'}`}>
       {studyGuideUsage.remaining}/{studyGuideUsage.limit} generation{studyGuideUsage.limit > 1 ? 's' : ''} remaining this month
      </span>
     </div>
     <span className="text-xs text-[var(--muted)]">
      Resets {new Date(studyGuideUsage.resetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
     </span>
    </div>
   </div>
  )}

  {/* Generator Card */}
  <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)]">
   <div className="p-6 border-b border-[var(--border)]">
    <div className="flex items-center gap-3">
     <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
      </svg>
     </div>
     <div>
      <h2 className="text-lg font-semibold text-[var(--foreground)]">Generate AI Study Guide</h2>
      <p className="text-sm text-[var(--muted)]">Get a personalized study plan based on your performance</p>
     </div>
    </div>
   </div>

   <div className="p-6 space-y-6">
    {/* Section Selection */}
    <div>
     <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
      Exam Section
     </label>
     <select
      value={selectedSection}
      onChange={(e) => setSelectedSection(e.target.value)}
      className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
     >
      {SECTIONS.map((section) => (
       <option key={section.value} value={section.value}>
        {section.label}
       </option>
      ))}
     </select>
    </div>

    {/* Study Style Selection */}
    <div>
     <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
      Study Style
     </label>
     <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {STUDY_STYLES.map((style) => (
       <button
        key={style.value}
        onClick={() => setStudyStyle(style.value)}
        className={`p-4 rounded-lg border-2 text-left transition-all ${
         studyStyle === style.value
          ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
          : 'border-[var(--border)] hover:border-purple-300 dark:hover:border-purple-700'
        }`}
       >
        <div className={`font-medium ${studyStyle === style.value ? 'text-purple-700 dark:text-purple-300' : 'text-[var(--foreground)]'}`}>
         {style.label}
        </div>
        <div className="text-xs text-[var(--muted)] mt-1">
         {style.description}
        </div>
       </button>
      ))}
     </div>
    </div>

    {/* Available Hours */}
    <div>
     <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
      Available Study Hours Per Week
     </label>
     <div className="flex items-center gap-4">
      <input
       type="range"
       min="5"
       max="40"
       step="5"
       value={availableHours}
       onChange={(e) => setAvailableHours(parseInt(e.target.value))}
       className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
      />
      <span className="w-20 text-center font-medium text-[var(--foreground)] bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-lg">
       {availableHours}h/week
      </span>
     </div>
    </div>

    {/* Error Message */}
    {guideError && (
     <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-sm">
      {guideError}
     </div>
    )}

    {/* Generate Button */}
    <button
     onClick={handleGenerateGuide}
     disabled={generatingGuide || (studyGuideUsage?.remaining === 0)}
     className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
     {generatingGuide ? (
      <>
       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
       Generating Your Study Guide...
      </>
     ) : (
      <>
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
       </svg>
       Generate Study Guide
      </>
     )}
    </button>
   </div>
  </div>

  {/* Generated Guide Display */}
  {generatedGuide && (
   <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)]">
    <div className="p-6 border-b border-[var(--border)]">
     <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
       <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
       </div>
       <div>
        <h3 className="font-semibold text-[var(--foreground)]">Your {selectedSection} Study Guide</h3>
        <p className="text-xs text-[var(--muted)]">Generated just now</p>
       </div>
      </div>
      <button
       onClick={() => {
        navigator.clipboard.writeText(generatedGuide);
       }}
       className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] flex items-center gap-1"
      >
       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
       </svg>
       Copy
      </button>
     </div>
    </div>
    <div className="p-6">
     <pre className="whitespace-pre-wrap font-sans text-sm text-[var(--foreground)] leading-relaxed">
      {generatedGuide}
     </pre>
    </div>
   </div>
  )}

  {/* Help Text */}
  <div className="text-center text-sm text-[var(--muted)] py-4">
   <p>Your study guide will be personalized based on your practice history for the selected section.</p>
   <p className="mt-1">The more you practice, the more tailored your guide will be!</p>
  </div>
 </div>
 )}
 </div>
 );
}
