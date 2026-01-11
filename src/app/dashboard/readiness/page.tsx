"use client";

import { useState, useEffect, useMemo } from"react";
import { createClient } from"@/lib/supabase/client";
import { useAuth } from"@/components/auth/AuthProvider";
import Link from"next/link";
import { allTaxonomies, type SectionTaxonomy } from"@/lib/data/practice-questions/taxonomy";
import type { SectionCode } from"@/lib/supabase/types";

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
}

interface TopicStats {
 topic: string;
 weight: number;
 attempted: number;
 correct: number;
 accuracy: number;
 coverage: number; // percentage of expected questions attempted
}

interface TBSStats {
 totalAttempts: number;
 completedAttempts: number;
 averageScore: number | null;
 averageTimeMinutes: number | null;
 uniqueTBSAttempted: number;
 uniqueTBSCompleted: number;
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
 { threshold: 75, label:"Proficient", color:"bg-lime-400", message:"Solid foundation - consider a practice simulation"},
 { threshold: 85, label:"Strong", color:"bg-green-500", message:"Well prepared - you've put in the work!"},
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
 const [readinessData, setReadinessData] = useState<Record<string, SectionReadiness>>({});
 const [confidenceData, setConfidenceData] = useState<ConfidenceData[]>([]);
 const [loading, setLoading] = useState(true);
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
 } else {
 setLoading(false);
 }
 }, [user, authLoading]);

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

 // Fetch confidence ratings from notes - filter for notes that have a confidence rating
 const { data: notes } = await supabase
 .from("question_notes")
 .select("topic, confidence")
 .eq("user_id", user.id)
 .neq("confidence", null);

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
 const correct = topicAttempts.filter(a => a.is_correct).length;
 const attempted = topicAttempts.length;
 const expectedQuestions = Math.round((topic.weight / 100) * taxonomy.targetQuestions);

 return {
 topic: topic.name,
 weight: topic.weight,
 attempted,
 correct,
 accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
 coverage: Math.min(100, Math.round((attempted / Math.max(expectedQuestions, 1)) * 100)),
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

 const totalAttempted = sectionAttempts.length;
 const totalCorrect = sectionAttempts.filter(a => a.is_correct).length;

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
 const tbsScores = completedTBS
 .map(t => t.score_percentage)
 .filter((s): s is number => s !== null);
 const tbsTimes = completedTBS
 .map(t => t.time_spent_seconds)
 .filter((t): t is number => t !== null);

 const tbsStats: TBSStats = {
 totalAttempts: sectionTBSAttempts.length,
 completedAttempts: completedTBS.length,
 averageScore: tbsScores.length > 0
 ? Math.round(tbsScores.reduce((sum, s) => sum + s, 0) / tbsScores.length)
 : null,
 averageTimeMinutes: tbsTimes.length > 0
 ? Math.round((tbsTimes.reduce((sum, t) => sum + t, 0) / tbsTimes.length) / 60)
 : null,
 uniqueTBSAttempted: new Set(sectionTBSAttempts.map(t => t.tbs_id)).size,
 uniqueTBSCompleted: new Set(completedTBS.map(t => t.tbs_id)).size,
 };

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

 // Calculate overall readiness across visible studied sections only
 const studiedSections = visibleSections
 .map(s => readinessData[s])
 .filter((r): r is SectionReadiness => r !== undefined && r.totalAttempted > 0);
 const overallReadiness = studiedSections.length > 0
 ? Math.round(studiedSections.reduce((sum, r) => sum + r.overallScore, 0) / studiedSections.length)
 : 0;

 return (
 <div className="space-y-6">
 {/* Header */}
 <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
 <div className="flex items-center justify-between">
 <div className="flex items-center space-x-4">
 <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
 <svg className="w-7 h-7"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
 </svg>
 </div>
 <div>
 <h1 className="text-2xl font-bold">Exam Readiness Dashboard</h1>
 <p className="text-white/80">Track your preparation progress across all topics</p>
 </div>
 </div>
 <div className="text-right">
 <div className="text-4xl font-bold">{overallReadiness}%</div>
 <div className="text-white/80 text-sm">Overall Readiness</div>
 </div>
 </div>
 </div>

 {/* Section Selector */}
 <div className="flex flex-wrap gap-2">
 {visibleSections.map((section) => {
 const data = readinessData[section];
 const score = data?.overallScore || 0;
 const milestone = getMilestone(score);

 return (
 <button
 key={section}
 onClick={() => setSelectedSection(section)}
 className={`px-4 py-3 rounded-xl font-medium transition-all min-w-[72px] ${
 selectedSection === section
 ? 'bg-[var(--primary)] text-white shadow-lg scale-105'
 : 'bg-white dark:bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)]'
 }`}
 >
 <div className="text-lg font-bold">{section}</div>
 <div className={`text-xs ${selectedSection === section ? 'text-white/80' : 'text-[var(--muted)]'}`}>
 {score > 0 ? `${score}%` : 'Not started'}
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
 {/* Main Readiness Score with Milestone Progress */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-lg font-semibold text-[var(--foreground)]">
 {selectedSection} Readiness Score
 </h2>
 <div className={`px-3 py-1 rounded-full text-sm font-medium text-white ${currentMilestone.color}`}>
 {currentMilestone.label}
 </div>
 </div>

 {/* Big Progress Bar with Milestones */}
 <div className="relative mb-6">
 <div className="h-8 bg-gray-200 dark:bg-[var(--card-hover)] rounded-full overflow-hidden">
 <div
 className={`h-full ${currentMilestone.color} transition-all duration-500`}
 style={{ width: `${currentReadiness.overallScore}%` }}
 />
 </div>

 {/* Milestone markers */}
 <div className="absolute top-0 left-0 right-0 h-8 flex items-center">
 {milestones.slice(1).map((milestone, i) => (
 <div
 key={milestone.threshold}
 className="absolute flex flex-col items-center"
 style={{ left: `${milestone.threshold}%`, transform: 'translateX(-50%)' }}
 >
 <div className={`w-1 h-8 ${
 currentReadiness.overallScore >= milestone.threshold
 ? 'bg-white/50'
 : 'bg-gray-400 dark:bg-[var(--border)]'
 }`} />
 </div>
 ))}
 </div>

 {/* Score indicator */}
 <div
 className="absolute top-10 flex flex-col items-center"
 style={{ left: `${currentReadiness.overallScore}%`, transform: 'translateX(-50%)' }}
 >
 <div className="text-2xl font-bold text-[var(--foreground)]">{currentReadiness.overallScore}%</div>
 </div>
 </div>

 {/* Milestone Labels */}
 <div className="flex justify-between text-xs text-[var(--muted)] mt-8 mb-4">
 {milestones.map((milestone) => (
 <div
 key={milestone.threshold}
 className={`text-center ${currentReadiness.overallScore >= milestone.threshold ? 'font-medium text-[var(--foreground)]' : ''}`}
 style={{ width: '16%' }}
 >
 {milestone.label}
 </div>
 ))}
 </div>

 {/* Motivational Message */}
 <div className="bg-gray-50 dark:bg-[var(--card-hover)]/50 rounded-lg p-4 text-center">
 <p className="text-[var(--foreground)] font-medium">{currentMilestone.message}</p>
 {nextMilestone && (
 <p className="text-sm text-[var(--muted)] mt-1">
 {nextMilestone.threshold - currentReadiness.overallScore} points to reach &quot;{nextMilestone.label}&quot;
 </p>
 )}
 </div>
 </div>

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

 {/* Readiness Radar - Topic Breakdown */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Topic Readiness</h2>
 <p className="text-sm text-[var(--muted)] mb-6">
 Each topic is weighted by its importance on the actual exam (shown in parentheses)
 </p>

 <div className="space-y-4">
 {currentReadiness.topicStats.map((stat) => {
 // Calculate target questions for this topic based on weight
 // Assume ~100 target questions per section, scaled by topic weight
 const targetQuestions = Math.max(5, Math.round((stat.weight / 100) * 100));
 const completionPercent = Math.min(100, Math.round((stat.attempted / targetQuestions) * 100));

 return (
 <div key={stat.topic} className="space-y-2">
 <div className="flex items-center justify-between">
 <div className="flex-1 min-w-0">
 <span className="font-medium text-[var(--foreground)] text-sm truncate block">
 {stat.topic}
 </span>
 <span className="text-xs text-[var(--muted)]">
 {stat.weight}% of exam • {stat.attempted} / {targetQuestions} questions
 </span>
 </div>
 <div className="text-right ml-4">
 <span className={`text-lg font-bold ${
 stat.accuracy >= 80 ? 'text-green-600 dark:text-green-400' :
 stat.accuracy >= 60 ? 'text-yellow-600 dark:text-yellow-400' :
 stat.accuracy > 0 ? 'text-red-600 dark:text-red-400' :
 'text-gray-400'
 }`}>
 {stat.accuracy > 0 ? `${stat.accuracy}% accuracy` : '--'}
 </span>
 </div>
 </div>

 {/* Progress bar for topic - width represents questions completed */}
 <div className="h-3 bg-gray-200 dark:bg-[var(--card-hover)] rounded-full overflow-hidden">
 <div
 className={`h-full transition-all duration-300 ${
 stat.accuracy >= 80 ? 'bg-green-500' :
 stat.accuracy >= 60 ? 'bg-yellow-500' :
 stat.accuracy > 0 ? 'bg-red-400' :
 'bg-gray-300 dark:bg-[var(--border)]'
 }`}
 style={{ width: `${completionPercent}%` }}
 />
 </div>

 {/* Coverage indicator */}
 {completionPercent < 50 && stat.attempted > 0 && (
 <p className="text-xs text-orange-600 dark:text-orange-400">
 Need more practice ({targetQuestions - stat.attempted} more questions recommended)
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
 </div>

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
 const isCovered = stat.attempted >= 5;
 const isWellCovered = stat.coverage >= 50;

 return (
 <div
 key={stat.topic}
 className={`p-3 rounded-lg border flex items-center space-x-2 ${
 isWellCovered
 ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
 : isCovered
 ? 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20'
 : 'border-gray-200 bg-gray-50 dark:bg-[var(--card)]'
 }`}
 >
 <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
 isWellCovered
 ? 'bg-green-500 text-white'
 : isCovered
 ? 'bg-yellow-500 text-white'
 : 'bg-gray-300 dark:bg-[var(--border)] text-gray-500 dark:text-gray-400'
 }`}>
 {isWellCovered ? (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 ) : isCovered ? (
 <span className="text-xs font-bold">~</span>
 ) : (
 <span className="text-xs font-bold">?</span>
 )}
 </div>
 <span className={`text-sm truncate ${
 isCovered ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'
 }`}>
 {stat.topic.length > 25 ? stat.topic.substring(0, 25) + '...' : stat.topic}
 </span>
 </div>
 );
 })}
 </div>

 <div className="mt-4 flex items-center justify-center space-x-6 text-xs text-[var(--muted)]">
 <div className="flex items-center space-x-1">
 <div className="w-3 h-3 rounded-full bg-green-500"/>
 <span>Well covered (50%+)</span>
 </div>
 <div className="flex items-center space-x-1">
 <div className="w-3 h-3 rounded-full bg-yellow-500"/>
 <span>Started (5+ questions)</span>
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
 ) : currentReadiness.overallScore < 75 ? (
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

 {/* Disclaimer */}
 <p className="text-xs text-[var(--muted)] text-center mt-6">
 This readiness score is based on your practice performance and is intended as a study aid only.
 It does not guarantee any particular outcome on the actual CPA exam.
 </p>
 </>
 )}
 </div>
 );
}
