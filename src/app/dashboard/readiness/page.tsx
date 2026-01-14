"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";
import { allTaxonomies, type SectionTaxonomy } from "@/lib/data/practice-questions/taxonomy";
import { getQuestionsBySection, getQuestionsByTopic } from "@/lib/data/practice-questions";
import { getTBSBySection, type TBSQuestion } from "@/lib/data/tbs";
import type { SectionCode } from "@/lib/supabase/types";
import {
  calculatePrimeMeridianScore,
  type PrimeMeridianResult,
  type PracticeAttemptData,
  type TBSAttemptData,
} from "@/lib/scoring/prime-meridian";
import PrimeMeridianScore from "@/components/dashboard/PrimeMeridianScore";
import PrimeMeridianCompass from "@/components/dashboard/PrimeMeridianCompass";

// Core sections always shown
const coreSections: SectionCode[] = ["FAR","AUD","REG"];
// Discipline sections - only show the one user selected
const disciplineSections: SectionCode[] = ["TCP","BAR","ISC"];

interface PracticeAttempt {
 id: string;
 question_id: string;
 section: string;
 topic: string | null;
 is_correct: boolean;
 time_spent_seconds: number | null;
 created_at: string;
 difficulty?: 'easy' | 'medium' | 'hard';
 explanation_view_seconds?: number | null;
}

interface TopicStats {
 topic: string;
 weight: number;
 attempted: number; // unique questions attempted
 totalAttempts: number; // total attempts (may repeat same question)
 correct: number;
 accuracy: number;
 coverage: number; // percentage of questions attempted
 totalQuestions: number; // actual questions available for this topic
}

interface TBSStats {
 totalAttempts: number;
 completedAttempts: number;
 averageScore: number | null;
 averageTimeMinutes: number | null;
 uniqueTBSAttempted: number;
 uniqueTBSCompleted: number;
}

interface TBSTopicStats {
 topic: string;
 weight: number;
 attempted: number; // unique TBS attempted
 completed: number; // unique TBS completed
 totalTBS: number; // total TBS available for this topic
 averageScore: number | null;
 coverage: number; // percentage of TBS attempted
}

interface SectionReadiness {
  section: SectionCode;
  overallScore: number;
  topicStats: TopicStats[];
  totalAttempted: number;
  totalCorrect: number;
  avgAccuracy: number;
  coveragePercent: number;
  simulationAvg: number | null;
  simulationCount: number;
  // TBS stats
  tbsStats: TBSStats;
  tbsTopicStats: TBSTopicStats[];
  // Prime Meridian
  primeMeridian: PrimeMeridianResult;
}

interface ConfidenceData {
 topic: string;
 accuracy: number;
 confidence: number;
 calibration: 'overconfident' | 'underconfident' | 'calibrated' | 'unknown';
}

// Milestone definitions for progress bars
const milestones = [
 { threshold: 0, label:"Getting Started", color:"bg-gray-400", message:"Begin practicing to build your foundation"},
 { threshold: 20, label:"Foundation", color:"bg-red-400", message:"Keep practicing! Every question helps"},
 { threshold: 40, label:"Building", color:"bg-orange-400", message:"Making progress! Stay consistent"},
 { threshold: 60, label:"Developing", color:"bg-yellow-400", message:"Getting stronger! Keep pushing"},
 { threshold: 80, label:"Strong Coverage", color:"bg-lime-400", message:"Recommended level reached - you're prepared!"},
 { threshold: 90, label:"Excellent Coverage", color:"bg-green-500", message:"Excellent preparation - you've put in the work!"},
];

function getMilestone(score: number) {
 for (let i = milestones.length - 1; i >= 0; i--) {
 if (score >= milestones[i].threshold) {
 return milestones[i];
 }
 }
 return milestones[0];
}

function getNextMilestone(score: number) {
 for (const milestone of milestones) {
 if (score < milestone.threshold) {
 return milestone;
 }
 }
 return null;
}

export default function ReadinessDashboardPage() {
 const { user, profile, loading: authLoading } = useAuth();
 const [selectedSection, setSelectedSection] = useState<SectionCode>("FAR");
 const [activeTab, setActiveTab] = useState<'mcq' | 'tbs'>('mcq');
 const [readinessData, setReadinessData] = useState<Record<string, SectionReadiness>>({});
 const [confidenceData, setConfidenceData] = useState<ConfidenceData[]>([]);
 const [loading, setLoading] = useState(true);
 const [assessmentStatus, setAssessmentStatus] = useState<Record<string, {
   available: boolean;
   alreadyGenerated: boolean;
   generatedAt?: string;
   examDate?: string;
   daysUntilExam?: number;
 }>>({});
 const supabase = createClient();

 // Compute visible sections based on user's discipline choice
 const visibleSections = useMemo(() => {
 const disciplineChoice = profile?.discipline_choice;
 if (!disciplineChoice) {
 // No discipline chosen yet - show all sections
 return [...coreSections, ...disciplineSections];
 }
 // Show core sections + only the chosen discipline
 return [...coreSections, disciplineChoice as SectionCode];
 }, [profile?.discipline_choice]);

 // All sections for data fetching (we fetch all, display filtered)
 const allSections: SectionCode[] = ["FAR","AUD","REG","TCP","BAR","ISC"];

 useEffect(() => {
 if (authLoading) return;
 if (user) {
 fetchReadinessData();
 fetchAssessmentStatus();
 } else {
 setLoading(false);
 }
 }, [user, authLoading]);

 const fetchAssessmentStatus = async () => {
   const statuses: Record<string, typeof assessmentStatus[string]> = {};
   for (const section of allSections) {
     try {
       const response = await fetch(`/api/ai/pre-exam-assessment?section=${section}`);
       if (response.ok) {
         const data = await response.json();
         statuses[section] = data;
       }
     } catch (error) {
       console.error(`Error fetching assessment status for ${section}:`, error);
     }
   }
   setAssessmentStatus(statuses);
 };

 const fetchReadinessData = async () => {
 if (!supabase || !user) {
 setLoading(false);
 return;
 }

 // Fetch all practice attempts
 const { data: attempts } = await supabase
 .from("practice_attempts")
 .select("*")
 .eq("user_id", user.id);

 // Note: Confidence calibration feature not yet implemented
 // The question_notes table doesn't have a confidence column yet
 const notes: { topic: string; confidence: number }[] = [];

 // Fetch TBS attempts - section is stored directly on tbs_attempts
 const { data: tbsAttempts } = await supabase
 .from("tbs_attempts")
 .select(`
 id,
 tbs_id,
 section,
 is_complete,
 score_percentage,
 time_spent_seconds
 `)
 .eq("user_id", user.id);

 // Process data for each section (fetch all, display will be filtered)
 const readiness: Record<string, SectionReadiness> = {};

 for (const section of allSections) {
 const taxonomy = allTaxonomies[section];
 const sectionAttempts = (attempts || []).filter(a => a.section === section) as PracticeAttempt[];

 // Calculate topic-level stats
 const topicStats: TopicStats[] = taxonomy.topics.map(topic => {
 const topicAttempts = sectionAttempts.filter(a => a.topic === topic.name);

 // Get unique question IDs attempted
 const uniqueQuestionIds = new Set(topicAttempts.map(a => a.question_id));
 const uniqueAttempted = uniqueQuestionIds.size;
 const totalAttempts = topicAttempts.length;

 // Count correct - for accuracy, use best attempt per question
 // Group by question_id and check if any attempt was correct
 const questionResults = new Map<string, boolean>();
 topicAttempts.forEach(a => {
 const current = questionResults.get(a.question_id);
 // If any attempt was correct, mark as correct
 if (current !== true) {
 questionResults.set(a.question_id, a.is_correct);
 }
 });
 const correctQuestions = [...questionResults.values()].filter(v => v).length;

 // Get actual question count for this topic from the question bank
 const actualTopicQuestions = getQuestionsByTopic(section as SectionCode, topic.name);
 const totalQuestions = actualTopicQuestions.length;

 return {
 topic: topic.name,
 weight: topic.weight,
 attempted: uniqueAttempted,
 totalAttempts,
 correct: correctQuestions,
 accuracy: uniqueAttempted > 0 ? Math.round((correctQuestions / uniqueAttempted) * 100) : 0,
 coverage: totalQuestions > 0 ? Math.min(100, Math.round((uniqueAttempted / totalQuestions) * 100)) : 0,
 totalQuestions,
 };
 });

 // Calculate weighted overall score
 // Score = weighted average of (accuracy * coverage_factor)
 // coverage_factor = min(1, attempted / expected) to penalize low coverage
 let weightedScore = 0;
 let totalWeight = 0;

 for (const stat of topicStats) {
 const coverageFactor = Math.min(1, stat.coverage / 50); // At least 50% coverage for full weight
 const topicScore = stat.accuracy * coverageFactor;
 weightedScore += topicScore * stat.weight;
 totalWeight += stat.weight;
 }

 const overallScore = totalWeight > 0 ? Math.round(weightedScore / totalWeight) : 0;

 // Identify exam simulations (sessions with 20+ questions within 30 min)
 const sortedAttempts = [...sectionAttempts].sort(
 (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
 );

 const simulations: { accuracy: number }[] = [];
 let currentSim: PracticeAttempt[] = [];
 let lastTime: Date | null = null;

 for (const attempt of sortedAttempts) {
 const attemptTime = new Date(attempt.created_at);
 if (lastTime === null || attemptTime.getTime() - lastTime.getTime() < 30 * 60 * 1000) {
 currentSim.push(attempt);
 } else {
 if (currentSim.length >= 20) {
 const correct = currentSim.filter(a => a.is_correct).length;
 simulations.push({ accuracy: Math.round((correct / currentSim.length) * 100) });
 }
 currentSim = [attempt];
 }
 lastTime = attemptTime;
 }
 if (currentSim.length >= 20) {
 const correct = currentSim.filter(a => a.is_correct).length;
 simulations.push({ accuracy: Math.round((correct / currentSim.length) * 100) });
 }

 // Count unique questions attempted for the section
 const uniqueSectionQuestionIds = new Set(sectionAttempts.map(a => a.question_id));
 const totalAttempted = uniqueSectionQuestionIds.size;

 // Count correct questions (if any attempt was correct, count as correct)
 const sectionQuestionResults = new Map<string, boolean>();
 sectionAttempts.forEach(a => {
 const current = sectionQuestionResults.get(a.question_id);
 if (current !== true) {
 sectionQuestionResults.set(a.question_id, a.is_correct);
 }
 });
 const totalCorrect = [...sectionQuestionResults.values()].filter(v => v).length;

 // Calculate TBS stats for this section
 interface TBSAttemptRow {
 id: string;
 tbs_id: string;
 section: string;
 is_complete: boolean;
 score_percentage: number | null;
 time_spent_seconds: number | null;
 }
 const sectionTBSAttempts = ((tbsAttempts || []) as TBSAttemptRow[]).filter(
 t => t.section === section
 );
 const completedTBS = sectionTBSAttempts.filter(t => t.is_complete);

 // Get the local TBS data for this section to ensure we only count TBS that exist in our data
 const localTBSForSection = getTBSBySection(section as "FAR" | "AUD" | "REG" | "TCP" | "BAR" | "ISC");
 const localTBSIds = new Set(localTBSForSection.map(tbs => tbs.id));

 // Filter to only TBS that exist in local data
 const completedTBSInLocalData = completedTBS.filter(t => localTBSIds.has(t.tbs_id));

 // Calculate BEST score per TBS (matching simulations page calculation)
 const bestScoreByTBS = new Map<string, number>();
 for (const attempt of completedTBSInLocalData) {
   if (attempt.score_percentage !== null) {
     const currentBest = bestScoreByTBS.get(attempt.tbs_id);
     if (currentBest === undefined || attempt.score_percentage > currentBest) {
       bestScoreByTBS.set(attempt.tbs_id, attempt.score_percentage);
     }
   }
 }
 const bestScores = Array.from(bestScoreByTBS.values());

 const tbsTimes = completedTBSInLocalData
 .map(t => t.time_spent_seconds)
 .filter((t): t is number => t !== null);

 // Count unique TBS completed that exist in local data
 const uniqueTBSCompletedInLocalData = new Set(completedTBSInLocalData.map(t => t.tbs_id)).size;

 const tbsStats: TBSStats = {
 totalAttempts: sectionTBSAttempts.length,
 completedAttempts: completedTBSInLocalData.length,
 averageScore: bestScores.length > 0
 ? Math.round(bestScores.reduce((sum, s) => sum + s, 0) / bestScores.length)
 : null,
 averageTimeMinutes: tbsTimes.length > 0
 ? Math.round((tbsTimes.reduce((sum, t) => sum + t, 0) / tbsTimes.length) / 60)
 : null,
 uniqueTBSAttempted: new Set(sectionTBSAttempts.filter(t => localTBSIds.has(t.tbs_id)).map(t => t.tbs_id)).size,
 uniqueTBSCompleted: uniqueTBSCompletedInLocalData,
 };

 // Helper function to match TBS to taxonomy topics (fuzzy matching)
 // TBS may use subtopic names or variations, so we match if the TBS topic contains the taxonomy topic name or vice versa
 const tbsMatchesTopic = (tbsTopic: string, taxonomyTopic: string): boolean => {
   const tbsLower = tbsTopic.toLowerCase();
   const taxLower = taxonomyTopic.toLowerCase();
   // Exact match
   if (tbsLower === taxLower) return true;
   // Partial match (topic contains taxonomy topic name or vice versa)
   if (tbsLower.includes(taxLower) || taxLower.includes(tbsLower)) return true;
   // Special mappings for common variations
   const mappings: Record<string, string[]> = {
     'government accounting': ['state and local government', 'governmental', 'budgetary', 'fiduciary', 'modified accrual', 'government-wide', 'interfund', 'proprietary fund', 'capital assets'],
     'not-for-profit accounting': ['nfp', 'not-for-profit', 'contributions', 'donor restriction'],
     'property, plant & equipment': ['depreciation', 'asset retirement', 'capitalized interest', 'long-lived assets', 'impairment'],
     'long-term debt': ['bonds', 'bond', 'convertible debt', 'debt restructuring', 'long-term liabilities'],
     "stockholders' equity": ['treasury stock', 'stock dividend', 'stock compensation', 'stock option', 'stock-based', 'earnings per share', 'equity'],
     'income taxes': ['deferred tax', 'tax asset', 'tax liabilities'],
     'investments': ['equity method', 'debt securities', 'fair value', 'held-to-maturity', 'hedge', 'derivatives'],
     'statement of cash flows': ['cash flow', 'operating activities', 'investing activities', 'cash and cash equivalents'],
     'revenue recognition': ['contract', 'performance obligation', 'transaction'],
     'financial statement presentation': ['balance sheet', 'comprehensive income', 'interim', 'segment', 'discontinued', 'subsequent events', 'related party', 'disclosure', 'conceptual framework', 'gaap', 'standard setting', 'qualitative', 'elements of financial'],
     'consolidations': ['intercompany', 'noncontrolling', 'variable interest', 'business combination', 'acquisition', 'purchase price'],
     'inventory': ['fifo', 'lifo', 'lower of cost', 'inventory costing'],
     'leases': ['lease', 'lessee', 'lessor', 'sale-leaseback'],
     'employee benefits': ['pension', 'defined benefit', 'employee'],
     'receivables': ['allowance', 'doubtful accounts', 'receivable'],
     'intangibles': ['intangible', 'goodwill', 'amortization'],
   };
   for (const [taxonomyKey, keywords] of Object.entries(mappings)) {
     if (taxLower.includes(taxonomyKey) || taxonomyKey.includes(taxLower)) {
       if (keywords.some(kw => tbsLower.includes(kw))) return true;
     }
   }
   return false;
 };

 // Calculate TBS topic stats (reuse localTBSForSection from above)
 const tbsTopicStats: TBSTopicStats[] = taxonomy.topics.map(topic => {
 // Get TBS questions for this topic using fuzzy matching
 const topicTBS = localTBSForSection.filter(tbs => tbsMatchesTopic(tbs.topic, topic.name));
 const totalTBS = topicTBS.length;

 // Get attempts for TBS in this topic
 const topicTBSIds = new Set(topicTBS.map(tbs => tbs.id));
 const topicTBSAttempts = sectionTBSAttempts.filter(a => topicTBSIds.has(a.tbs_id));
 const topicCompletedAttempts = topicTBSAttempts.filter(a => a.is_complete);

 // Unique TBS attempted and completed
 const uniqueAttempted = new Set(topicTBSAttempts.map(a => a.tbs_id)).size;
 const uniqueCompleted = new Set(topicCompletedAttempts.map(a => a.tbs_id)).size;

 // Calculate BEST score per TBS for this topic (matching simulations page)
 const topicBestScores = new Map<string, number>();
 for (const attempt of topicCompletedAttempts) {
   if (attempt.score_percentage !== null) {
     const currentBest = topicBestScores.get(attempt.tbs_id);
     if (currentBest === undefined || attempt.score_percentage > currentBest) {
       topicBestScores.set(attempt.tbs_id, attempt.score_percentage);
     }
   }
 }
 const bestScoresArray = Array.from(topicBestScores.values());
 const averageScore = bestScoresArray.length > 0
 ? Math.round(bestScoresArray.reduce((sum, s) => sum + s, 0) / bestScoresArray.length)
 : null;

 return {
 topic: topic.name,
 weight: topic.weight,
 attempted: uniqueAttempted,
 completed: uniqueCompleted,
 totalTBS,
 averageScore,
 coverage: totalTBS > 0 ? Math.min(100, Math.round((uniqueAttempted / totalTBS) * 100)) : 0,
 };
 });

 // Calculate Prime Meridian score
      const mcqAttemptsForPM: PracticeAttemptData[] = sectionAttempts.map(a => ({
        question_id: a.question_id,
        topic: a.topic,
        is_correct: a.is_correct,
        created_at: a.created_at,
        difficulty: a.difficulty,
        time_spent_seconds: a.time_spent_seconds,
        explanation_view_seconds: a.explanation_view_seconds,
      }));
      const tbsAttemptsForPM: TBSAttemptData[] = (sectionTBSAttempts as TBSAttemptRow[]).map(t => ({
        tbs_id: t.tbs_id,
        section: t.section,
        is_complete: t.is_complete,
        score_percentage: t.score_percentage,
        created_at: new Date().toISOString(), // TBS attempts don't have created_at in current schema
      }));
      const primeMeridian = calculatePrimeMeridianScore(mcqAttemptsForPM, tbsAttemptsForPM, section as SectionCode);

      readiness[section] = {
        section: section as SectionCode,
        overallScore,
        topicStats,
        totalAttempted,
        totalCorrect,
        avgAccuracy: totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0,
        coveragePercent: Math.round(
          topicStats.reduce((sum, t) => sum + t.coverage, 0) / topicStats.length
        ),
        simulationAvg: simulations.length > 0
          ? Math.round(simulations.reduce((sum, s) => sum + s.accuracy, 0) / simulations.length)
          : null,
        simulationCount: simulations.length,
        tbsStats,
        tbsTopicStats,
        primeMeridian,
      };
 }

 setReadinessData(readiness);

 // Process confidence calibration
 if (notes && notes.length > 0 && attempts) {
 const topicConfidence: Record<string, { confidenceSum: number; count: number }> = {};
 const topicAccuracy: Record<string, { correct: number; total: number }> = {};

 for (const note of notes) {
 if (note.topic && note.confidence) {
 if (!topicConfidence[note.topic]) {
 topicConfidence[note.topic] = { confidenceSum: 0, count: 0 };
 }
 topicConfidence[note.topic].confidenceSum += note.confidence;
 topicConfidence[note.topic].count += 1;
 }
 }

 for (const attempt of attempts as PracticeAttempt[]) {
 if (attempt.topic) {
 if (!topicAccuracy[attempt.topic]) {
 topicAccuracy[attempt.topic] = { correct: 0, total: 0 };
 }
 topicAccuracy[attempt.topic].total += 1;
 if (attempt.is_correct) {
 topicAccuracy[attempt.topic].correct += 1;
 }
 }
 }

 const calibration: ConfidenceData[] = [];
 for (const topic of Object.keys(topicConfidence)) {
 const conf = topicConfidence[topic];
 const acc = topicAccuracy[topic];

 if (conf && acc && acc.total >= 5) {
 const avgConfidence = Math.round((conf.confidenceSum / conf.count) * 20); // Scale 1-5 to 0-100
 const accuracy = Math.round((acc.correct / acc.total) * 100);

 let calibrationStatus: ConfidenceData['calibration'] = 'calibrated';
 if (avgConfidence - accuracy > 20) {
 calibrationStatus = 'overconfident';
 } else if (accuracy - avgConfidence > 20) {
 calibrationStatus = 'underconfident';
 }

 calibration.push({
 topic,
 accuracy,
 confidence: avgConfidence,
 calibration: calibrationStatus,
 });
 }
 }

 setConfidenceData(calibration);
 }

 setLoading(false);
 };

 if (loading) {
 return (
 <div className="flex items-center justify-center min-h-[400px]">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
 </div>
 );
 }

 if (!user) {
 return (
 <div className="text-center py-12">
 <p className="text-[var(--muted)]">Please log in to view your exam readiness.</p>
 <Link href="/login"className="btn-primary mt-4 inline-block">
 Log In
 </Link>
 </div>
 );
 }

 const currentReadiness = readinessData[selectedSection];
 const currentMilestone = currentReadiness ? getMilestone(currentReadiness.overallScore) : milestones[0];
 const nextMilestone = currentReadiness ? getNextMilestone(currentReadiness.overallScore) : milestones[1];

 // Calculate overall Prime Meridian across visible studied sections only
  const studiedSections = visibleSections
    .map(s => readinessData[s])
    .filter((r): r is SectionReadiness => r !== undefined && r.totalAttempted > 0);
  const overallPrimeMeridian = studiedSections.length > 0
    ? Math.round(studiedSections.reduce((sum, r) => sum + r.primeMeridian.overallScore, 0) / studiedSections.length)
    : 0;

 return (
 <div className="space-y-6">
 {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Exam Preparation Dashboard</h1>
              <p className="text-white/80 text-sm sm:text-base">Track your Prime Meridian score across all sections</p>
            </div>
          </div>
          {/* Overall Prime Meridian Score - Compass Rose Display */}
          <div className="flex items-center gap-3 sm:gap-4">
            <PrimeMeridianCompass
              score={overallPrimeMeridian}
              size="md"
              showLabel={false}
              variant="light"
            />
            <div className="text-left sm:text-right">
              <div className="text-white/80 text-xs sm:text-sm font-medium">Overall Prime Meridian</div>
              {overallPrimeMeridian > 0 && overallPrimeMeridian < 80 && (
                <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                  </svg>
                  {80 - overallPrimeMeridian} to 80
                </div>
              )}
              {overallPrimeMeridian >= 80 && (
                <div className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-400/30 rounded-full text-xs text-emerald-200">
                  Recommended reached!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

 {/* Section Selector */}
      <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2">
        {visibleSections.map((section) => {
          const data = readinessData[section];
          const pmScore = data?.primeMeridian?.overallScore || 0;
          const isRecommended = pmScore >= 80;

          return (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`px-2 sm:px-4 py-2 sm:py-3 rounded-xl font-medium transition-all sm:w-[100px] text-center ${
                selectedSection === section
                  ? 'bg-[var(--primary)] text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]'
              }`}
            >
              <div className="text-base sm:text-lg font-bold">{section}</div>
              <div className={`text-[10px] sm:text-xs ${selectedSection === section ? 'text-white/80' : 'text-[var(--muted)]'}`}>
                {pmScore > 0 ? (
                  <span className="flex items-center justify-center gap-1">
                    {pmScore}
                    {isRecommended && (
                      <svg className={`w-3 h-3 ${selectedSection === section ? 'text-white' : 'text-emerald-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                      </svg>
                    )}
                  </span>
                ) : 'Not started'}
              </div>
            </button>
          );
        })}

 {/* Show hint when discipline not selected */}
 {!profile?.discipline_choice && (
 <Link
 href="/dashboard/settings"
 className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
 </svg>
 Select your discipline in Settings
 </Link>
 )}
 </div>

 {currentReadiness && (
        <>
          {/* Prime Meridian Score */}
          <PrimeMeridianScore
            result={currentReadiness.primeMeridian}
            section={selectedSection}
            showDetails={true}
          />

 {/* Stats Overview */}
 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">MCQs Practiced</p>
 <p className="text-2xl font-bold text-[var(--primary)]">{currentReadiness.totalAttempted}</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">MCQ Accuracy</p>
 <p className="text-2xl font-bold text-green-600 dark:text-green-400">{currentReadiness.avgAccuracy}%</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">Topic Coverage</p>
 <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{currentReadiness.coveragePercent}%</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">Simulation Avg</p>
 <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
 {currentReadiness.simulationAvg !== null ? `${currentReadiness.simulationAvg}%` : '--'}
 </p>
 <p className="text-xs text-[var(--muted)]">
 {currentReadiness.simulationCount} simulation{currentReadiness.simulationCount !== 1 ? 's' : ''}
 </p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">TBS Completed</p>
 <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">{currentReadiness.tbsStats.uniqueTBSCompleted}</p>
 <p className="text-xs text-[var(--muted)]">
 {currentReadiness.tbsStats.completedAttempts} attempt{currentReadiness.tbsStats.completedAttempts !== 1 ? 's' : ''}
 </p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">TBS Avg Score</p>
 <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
 {currentReadiness.tbsStats.averageScore !== null ? `${currentReadiness.tbsStats.averageScore}%` : '--'}
 </p>
 {currentReadiness.tbsStats.averageTimeMinutes !== null && (
 <p className="text-xs text-[var(--muted)]">
 ~{currentReadiness.tbsStats.averageTimeMinutes} min avg
 </p>
 )}
 </div>
 </div>

 {/* Tab Toggle for MCQ / TBS */}
 <div className="flex gap-2 mb-6">
 <button
 onClick={() => setActiveTab('mcq')}
 className={`px-6 py-3 rounded-lg font-medium transition-all ${
 activeTab === 'mcq'
 ? 'bg-[var(--primary)] text-white shadow-md'
 : 'bg-white dark:bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]'
 }`}
 >
 MCQ Progress
 </button>
 <button
 onClick={() => setActiveTab('tbs')}
 className={`px-6 py-3 rounded-lg font-medium transition-all ${
 activeTab === 'tbs'
 ? 'bg-[var(--primary)] text-white shadow-md'
 : 'bg-white dark:bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]'
 }`}
 >
 TBS Progress
 </button>
 </div>

 {/* MCQ Topic Preparation */}
 {activeTab === 'mcq' && (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">MCQ Topic Preparation</h2>
 <p className="text-sm text-[var(--muted)] mb-6">
 Each topic is weighted by its importance on the actual exam (shown in parentheses)
 </p>

 <div className="space-y-4">
 {currentReadiness.topicStats
 .filter((stat) => stat.totalQuestions > 0 || stat.attempted > 0)
 .map((stat) => {
 return (
 <div key={stat.topic} className="space-y-2">
 <div className="flex items-center justify-between">
 <div className="flex-1 min-w-0">
 <span className="font-medium text-[var(--foreground)] text-sm truncate block">
 {stat.topic}
 </span>
 <span className="text-xs text-[var(--muted)]">
 {stat.weight}% of exam • {stat.attempted} / {stat.totalQuestions} questions
 </span>
 </div>
 <div className="text-right ml-4">
 <span className={`text-lg font-bold ${
 stat.accuracy >= 75 ? 'text-green-600 dark:text-green-400' :
 stat.accuracy >= 50 ? 'text-yellow-600 dark:text-yellow-400' :
 stat.accuracy > 0 ? 'text-red-600 dark:text-red-400' :
 'text-gray-400'
 }`}>
 {stat.accuracy > 0 ? `${stat.accuracy}% accuracy` : '--'}
 </span>
 </div>
 </div>

 {/* Progress bar for topic - width represents questions completed, color based on coverage */}
 <div className="h-3 bg-gray-200 dark:bg-[var(--card-hover)] rounded-full overflow-hidden">
 <div
 className={`h-full transition-all duration-300 ${
 stat.coverage >= 70 ? 'bg-green-500' :
 stat.coverage >= 25 ? 'bg-yellow-500' :
 stat.coverage > 0 ? 'bg-orange-400' :
 'bg-gray-300 dark:bg-[var(--border)]'
 }`}
 style={{ width: `${stat.coverage}%` }}
 />
 </div>

 {/* Coverage indicator */}
 {stat.coverage < 70 && stat.attempted > 0 && (
 <p className="text-xs text-orange-600 dark:text-orange-400">
 Need more practice ({stat.totalQuestions - stat.attempted} more questions available)
 </p>
 )}
 {stat.attempted === 0 && (
 <p className="text-xs text-gray-500 dark:text-gray-400">
 Not yet practiced - start here to improve your score
 </p>
 )}
 </div>
 );
 })}
 </div>

 {/* Coverage Legend */}
 <div className="mt-6 pt-4 border-t border-[var(--border)]">
   <p className="text-xs text-[var(--muted)] mb-2 font-medium">Coverage Legend (Bar Color)</p>
   <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]">
     <div className="flex items-center gap-1.5">
       <div className="w-3 h-3 rounded-full bg-green-500" />
       <span>≥70% (Well covered)</span>
     </div>
     <div className="flex items-center gap-1.5">
       <div className="w-3 h-3 rounded-full bg-yellow-500" />
       <span>≥25% (In progress)</span>
     </div>
     <div className="flex items-center gap-1.5">
       <div className="w-3 h-3 rounded-full bg-red-400" />
       <span>&lt;25% (Just started)</span>
     </div>
   </div>
 </div>
 </div>
 )}

 {/* TBS Topic Preparation */}
 {activeTab === 'tbs' && (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">TBS Topic Preparation</h2>
 <p className="text-sm text-[var(--muted)] mb-6">
 Task-Based Simulations completed by topic
 </p>

 <div className="space-y-4">
 {currentReadiness.tbsTopicStats
 .filter((stat) => stat.totalTBS > 0 || stat.attempted > 0)
 .map((stat) => {
 return (
 <div key={stat.topic} className="space-y-2">
 <div className="flex items-center justify-between">
 <div className="flex-1 min-w-0">
 <span className="font-medium text-[var(--foreground)] text-sm truncate block">
 {stat.topic}
 </span>
 <span className="text-xs text-[var(--muted)]">
 {stat.weight}% of exam • {stat.attempted} / {stat.totalTBS} TBS
 </span>
 </div>
 <div className="text-right ml-4">
 <span className={`text-lg font-bold ${
 stat.averageScore !== null && stat.averageScore >= 75 ? 'text-green-600 dark:text-green-400' :
 stat.averageScore !== null && stat.averageScore >= 50 ? 'text-yellow-600 dark:text-yellow-400' :
 stat.averageScore !== null ? 'text-red-600 dark:text-red-400' :
 'text-gray-400'
 }`}>
 {stat.averageScore !== null ? `${stat.averageScore}% avg` : '--'}
 </span>
 </div>
 </div>

 {/* Progress bar for TBS - width represents TBS completed, color based on coverage */}
 <div className="h-3 bg-gray-200 dark:bg-[var(--card-hover)] rounded-full overflow-hidden">
 <div
 className={`h-full transition-all duration-300 ${
 stat.coverage >= 70 ? 'bg-green-500' :
 stat.coverage >= 25 ? 'bg-yellow-500' :
 stat.coverage > 0 ? 'bg-orange-400' :
 'bg-gray-300 dark:bg-[var(--border)]'
 }`}
 style={{ width: `${stat.coverage}%` }}
 />
 </div>

 {/* Coverage indicator */}
 {stat.coverage < 70 && stat.attempted > 0 && (
 <p className="text-xs text-orange-600 dark:text-orange-400">
 Need more practice ({stat.totalTBS - stat.attempted} more TBS available)
 </p>
 )}
 {stat.attempted === 0 && stat.totalTBS > 0 && (
 <p className="text-xs text-gray-500 dark:text-gray-400">
 Not yet practiced - start here to improve your score
 </p>
 )}
 </div>
 );
 })}
 {currentReadiness.tbsTopicStats.filter(s => s.totalTBS > 0).length === 0 && (
 <p className="text-sm text-[var(--muted)] text-center py-8">
 No TBS questions available for {selectedSection} yet.
 </p>
 )}
 </div>
 </div>
 )}

 {/* Confidence Calibration */}
 {confidenceData.length > 0 && (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">Confidence Calibration</h2>
 <p className="text-sm text-[var(--muted)] mb-4">
 How well your self-assessment matches your actual performance
 </p>

 <div className="space-y-3">
 {confidenceData.filter(c =>
 currentReadiness.topicStats.some(t => t.topic === c.topic)
 ).map((item) => (
 <div
 key={item.topic}
 className={`p-4 rounded-lg border ${
 item.calibration === 'overconfident'
 ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
 : item.calibration === 'underconfident'
 ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
 : 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
 }`}
 >
 <div className="flex items-center justify-between">
 <div>
 <p className="font-medium text-[var(--foreground)]">{item.topic}</p>
 <p className="text-sm text-[var(--muted)]">
 Accuracy: {item.accuracy}% • Self-rating: {item.confidence}%
 </p>
 </div>
 <div className={`px-3 py-1 rounded-full text-xs font-medium ${
 item.calibration === 'overconfident'
 ? 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
 : item.calibration === 'underconfident'
 ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
 : 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
 }`}>
 {item.calibration === 'overconfident' && 'Overconfident'}
 {item.calibration === 'underconfident' && 'Under-confident'}
 {item.calibration === 'calibrated' && 'Well Calibrated'}
 </div>
 </div>
 {item.calibration === 'overconfident' && (
 <p className="text-xs text-red-700 dark:text-red-300 mt-2">
 Your confidence exceeds your accuracy - consider more practice before the exam
 </p>
 )}
 </div>
 ))}

 {confidenceData.filter(c =>
 currentReadiness.topicStats.some(t => t.topic === c.topic)
 ).length === 0 && (
 <p className="text-sm text-[var(--muted)] text-center py-4">
 Rate your confidence on notes to see calibration data.
 <br />Need at least 5 questions per topic for analysis.
 </p>
 )}
 </div>
 </div>
 )}

 {/* Coverage Check */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-2">Coverage Check</h2>
 <p className="text-sm text-[var(--muted)] mb-4">
 Have you practiced all the important topics?
 </p>

 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
 {currentReadiness.topicStats.map((stat) => {
 const isWellCovered = stat.coverage >= 70;
 const isInProgress = stat.coverage >= 25 && stat.coverage < 70;
 const isJustStarted = stat.coverage > 0 && stat.coverage < 25;

 return (
 <div
 key={stat.topic}
 className={`p-3 rounded-lg border flex items-center space-x-2 ${
 isWellCovered
 ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
 : isInProgress
 ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
 : isJustStarted
 ? 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20'
 : 'border-gray-200 bg-gray-50 dark:bg-[var(--card)]'
 }`}
 >
 <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
 isWellCovered
 ? 'bg-green-500 text-white'
 : isInProgress
 ? 'bg-yellow-500 text-white'
 : isJustStarted
 ? 'bg-orange-400 text-white'
 : 'bg-gray-300 dark:bg-[var(--border)] text-gray-500 dark:text-gray-400'
 }`}>
 {isWellCovered ? (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 ) : isInProgress || isJustStarted ? (
 <span className="text-xs font-bold">~</span>
 ) : (
 <span className="text-xs font-bold">?</span>
 )}
 </div>
 <span className={`text-sm truncate ${
 (isWellCovered || isInProgress || isJustStarted) ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'
 }`}>
 {stat.topic.length > 25 ? stat.topic.substring(0, 25) + '...' : stat.topic}
 </span>
 </div>
 );
 })}
 </div>

 <div className="mt-4 flex items-center justify-center flex-wrap gap-4 text-xs text-[var(--muted)]">
 <div className="flex items-center space-x-1">
 <div className="w-3 h-3 rounded-full bg-green-500"/>
 <span>≥70% (Well covered)</span>
 </div>
 <div className="flex items-center space-x-1">
 <div className="w-3 h-3 rounded-full bg-yellow-500"/>
 <span>≥25% (In progress)</span>
 </div>
 <div className="flex items-center space-x-1">
 <div className="w-3 h-3 rounded-full bg-orange-400"/>
 <span>&lt;25% (Just started)</span>
 </div>
 <div className="flex items-center space-x-1">
 <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-[var(--border)]"/>
 <span>Not started</span>
 </div>
 </div>
 </div>

 {/* Call to Action */}
 {currentReadiness.totalAttempted === 0 ? (
 <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-6 text-white text-center">
 <h3 className="text-xl font-bold mb-2">Start Your {selectedSection} Journey</h3>
 <p className="text-white/80 mb-4">
 Begin practicing to see your readiness score and track your progress toward exam day.
 </p>
 <Link
 href={`/dashboard/practice/${selectedSection.toLowerCase()}`}
 className="inline-block px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
 >
 Start Practicing {selectedSection}
 </Link>
 </div>
 ) : currentReadiness.overallScore < 80 ? (
 <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white text-center">
 <h3 className="text-xl font-bold mb-2">Keep Pushing!</h3>
 <p className="text-white/80 mb-4">
 You&apos;re making progress. Focus on your weakest topics to strengthen your foundation.
 </p>
 <Link
 href={`/dashboard/practice/${selectedSection.toLowerCase()}`}
 className="inline-block px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
 >
 Continue Practicing
 </Link>
 </div>
 ) : (
 <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white text-center">
 <h3 className="text-xl font-bold mb-2">Strong Preparation!</h3>
 <p className="text-white/80 mb-4">
 You&apos;ve built a solid foundation. Test yourself with a full simulation to gauge your timing and stamina.
 </p>
 <div className="flex items-center justify-center space-x-4">
 <Link
 href={`/dashboard/exam-simulation/${selectedSection.toLowerCase()}`}
 className="inline-block px-6 py-3 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
 >
 Take a Full Simulation
 </Link>
 <Link
 href="/dashboard/nts"
 className="inline-block px-6 py-3 bg-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors"
 >
 View NTS Tracker
 </Link>
 </div>
 </div>
 )}

 {/* Pre-Exam Assessment Section */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800/50 p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">{selectedSection} Pre-Exam Assessment</h3>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    {assessmentStatus[selectedSection]?.alreadyGenerated
                      ? `Assessment generated on ${new Date(assessmentStatus[selectedSection].generatedAt!).toLocaleDateString()}`
                      : assessmentStatus[selectedSection]?.examDate
                        ? `One comprehensive AI assessment available per exam (${assessmentStatus[selectedSection].daysUntilExam} days until exam)`
                        : 'Schedule your exam date to unlock your Pre-Exam Assessment'}
                  </p>
                  {!assessmentStatus[selectedSection]?.examDate && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                      Set your exam date in the <Link href="/dashboard/nts" className="underline hover:no-underline">NTS Tracker</Link> to access this feature.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex-shrink-0">
                {assessmentStatus[selectedSection]?.alreadyGenerated ? (
                  <Link
                    href={`/dashboard/readiness/assessment/${selectedSection.toLowerCase()}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium hover:from-amber-700 hover:to-orange-700 transition-all shadow-sm hover:shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Assessment
                  </Link>
                ) : assessmentStatus[selectedSection]?.examDate ? (
                  <Link
                    href={`/dashboard/readiness/assessment/${selectedSection.toLowerCase()}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium hover:from-amber-700 hover:to-orange-700 transition-all shadow-sm hover:shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    Begin Pre-Exam Assessment
                  </Link>
                ) : (
                  <Link
                    href="/dashboard/nts"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300 font-medium hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Schedule Exam
                  </Link>
                )}
              </div>
            </div>

            {/* Readiness Recommendations */}
            <div className="mt-6 pt-4 border-t border-amber-200 dark:border-amber-800/50">
              <p className="text-sm font-medium text-[var(--foreground)] mb-3">What We Recommend Before Sitting:</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className={`p-3 rounded-lg border ${
                  currentReadiness.primeMeridian.overallScore >= 80
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center gap-2">
                    {currentReadiness.primeMeridian.overallScore >= 80 ? (
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span className="text-sm font-medium">Prime Meridian ≥ 80</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-1">Current: {currentReadiness.primeMeridian.overallScore}</p>
                </div>

                <div className={`p-3 rounded-lg border ${
                  currentReadiness.coveragePercent >= 70
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center gap-2">
                    {currentReadiness.coveragePercent >= 70 ? (
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span className="text-sm font-medium">Coverage ≥ 70%</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-1">Current: {currentReadiness.coveragePercent}%</p>
                </div>

                <div className={`p-3 rounded-lg border ${
                  currentReadiness.simulationCount >= 3
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center gap-2">
                    {currentReadiness.simulationCount >= 3 ? (
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span className="text-sm font-medium">3+ Simulations</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-1">Completed: {currentReadiness.simulationCount}</p>
                </div>

                <div className={`p-3 rounded-lg border ${
                  currentReadiness.tbsStats.uniqueTBSCompleted >= 5
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
                }`}>
                  <div className="flex items-center gap-2">
                    {currentReadiness.tbsStats.uniqueTBSCompleted >= 5 ? (
                      <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <span className="text-sm font-medium">5+ TBS Completed</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-1">Completed: {currentReadiness.tbsStats.uniqueTBSCompleted}</p>
                </div>
              </div>
            </div>
          </div>

 {/* Note: Prime Meridian component includes its own disclaimer */}
 </>
 )}
 </div>
 );
}
