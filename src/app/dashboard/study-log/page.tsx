"use client";

import { useState, useEffect } from "react";
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

export default function StudyLogPage() {
 const { user, loading: authLoading } = useAuth();
 const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);
 const [visiblePracticeSessions, setVisiblePracticeSessions] = useState(5);
 const [loading, setLoading] = useState(true);
 const [activeTab, setActiveTab] = useState<'practice' | 'tbs' | 'exam'>('practice');
 const [examSimulations, setExamSimulations] = useState<ExamSimulationHistory[]>([]);
 const [visibleExamSimulations, setVisibleExamSimulations] = useState(5);
 const [tbsAttempts, setTbsAttempts] = useState<TBSAttempt[]>([]);
 const [visibleTbsAttempts, setVisibleTbsAttempts] = useState(5);
 const supabase = createClient();

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
 </div>
 );
}
