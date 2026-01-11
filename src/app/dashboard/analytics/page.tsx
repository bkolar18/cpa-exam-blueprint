'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import type { SectionCode } from '@/lib/supabase/types';

// Dynamic imports to avoid SSR issues with Recharts
const PerformanceLineChart = dynamic(
 () => import('@/components/analytics/PerformanceLineChart'),
 { ssr: false, loading: () => <ChartSkeleton /> }
);
const TopicHeatmap = dynamic(
 () => import('@/components/analytics/TopicHeatmap'),
 { ssr: false, loading: () => <ChartSkeleton /> }
);
const StudyTimeChart = dynamic(
 () => import('@/components/analytics/StudyTimeChart'),
 { ssr: false, loading: () => <ChartSkeleton /> }
);
const ActivityCalendar = dynamic(
 () => import('@/components/analytics/ActivityCalendar'),
 { ssr: false, loading: () => <ChartSkeleton /> }
);
const DifficultyBreakdown = dynamic(
 () => import('@/components/analytics/DifficultyBreakdown'),
 { ssr: false, loading: () => <ChartSkeleton /> }
);

type DateRange = '7d' | '30d' | '90d' | 'all';

interface PracticeAttempt {
 id: string;
 question_id: string;
 section: string;
 topic: string | null;
 difficulty: string | null;
 is_correct: boolean;
 time_spent_seconds: number | null;
 created_at: string;
}

interface StudySession {
 id: string;
 section: string;
 hours: number;
 date: string;
}

function ChartSkeleton() {
 return (
 <div className="animate-pulse bg-gray-200 dark:bg-[var(--card-hover)] rounded-lg h-[300px]"/>
 );
}

export default function AnalyticsPage() {
 const { user, loading: authLoading } = useAuth();
 const [dateRange, setDateRange] = useState<DateRange>('30d');
 const [selectedSection, setSelectedSection] = useState<SectionCode | 'all'>('all');
 const [attempts, setAttempts] = useState<PracticeAttempt[]>([]);
 const [studySessions, setStudySessions] = useState<StudySession[]>([]);
 const [loading, setLoading] = useState(true);
 const supabase = createClient();

 const sections: SectionCode[] = ['FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC'];

 useEffect(() => {
 if (authLoading) return;
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
 const { data: attemptsData } = await supabase
 .from('practice_attempts')
 .select('*')
 .eq('user_id', user.id)
 .order('created_at', { ascending: true });

 if (attemptsData) {
 setAttempts(attemptsData as PracticeAttempt[]);
 }

 // Fetch study sessions
 const { data: sessionsData } = await supabase
 .from('study_sessions')
 .select('*')
 .eq('user_id', user.id)
 .order('date', { ascending: true });

 if (sessionsData) {
 setStudySessions(sessionsData as StudySession[]);
 }

 setLoading(false);
 };

 // Filter data by date range
 const filteredAttempts = useMemo(() => {
 const now = new Date();
 let cutoffDate: Date;

 switch (dateRange) {
 case '7d':
 cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
 break;
 case '30d':
 cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
 break;
 case '90d':
 cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
 break;
 default:
 cutoffDate = new Date(0);
 }

 let filtered = attempts.filter(a => new Date(a.created_at) >= cutoffDate);

 if (selectedSection !== 'all') {
 filtered = filtered.filter(a => a.section === selectedSection);
 }

 return filtered;
 }, [attempts, dateRange, selectedSection]);

 const filteredSessions = useMemo(() => {
 const now = new Date();
 let cutoffDate: Date;

 switch (dateRange) {
 case '7d':
 cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
 break;
 case '30d':
 cutoffDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
 break;
 case '90d':
 cutoffDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
 break;
 default:
 cutoffDate = new Date(0);
 }

 let filtered = studySessions.filter(s => new Date(s.date) >= cutoffDate);

 if (selectedSection !== 'all') {
 filtered = filtered.filter(s => s.section === selectedSection);
 }

 return filtered;
 }, [studySessions, dateRange, selectedSection]);

 // Calculate performance data for line chart
 const performanceData = useMemo(() => {
 const grouped: Record<string, { correct: number; total: number; section?: string }> = {};

 for (const attempt of filteredAttempts) {
 const date = new Date(attempt.created_at).toISOString().split('T')[0];
 const key = selectedSection === 'all' ? `${date}-${attempt.section}` : date;

 if (!grouped[key]) {
 grouped[key] = { correct: 0, total: 0, section: attempt.section };
 }
 grouped[key].total++;
 if (attempt.is_correct) grouped[key].correct++;
 }

 return Object.entries(grouped).map(([key, stats]) => {
 const date = key.includes('-') ? key.split('-').slice(0, 3).join('-') : key;
 return {
 date,
 accuracy: Math.round((stats.correct / stats.total) * 100),
 section: stats.section,
 };
 });
 }, [filteredAttempts, selectedSection]);

 // Calculate topic heatmap data
 const topicData = useMemo(() => {
 const grouped: Record<string, { correct: number; total: number; section: string }> = {};

 for (const attempt of filteredAttempts) {
 if (!attempt.topic) continue;
 const key = `${attempt.section}-${attempt.topic}`;

 if (!grouped[key]) {
 grouped[key] = { correct: 0, total: 0, section: attempt.section };
 }
 grouped[key].total++;
 if (attempt.is_correct) grouped[key].correct++;
 }

 return Object.entries(grouped).map(([key, stats]) => ({
 topic: key.split('-').slice(1).join('-'),
 section: stats.section,
 accuracy: Math.round((stats.correct / stats.total) * 100),
 attempted: stats.total,
 }));
 }, [filteredAttempts]);

 // Calculate study time data
 const studyTimeData = useMemo(() => {
 const weeks: Record<string, Record<string, number>> = {};

 for (const session of filteredSessions) {
 const date = new Date(session.date);
 const weekStart = new Date(date);
 weekStart.setDate(date.getDate() - date.getDay());
 const weekKey = weekStart.toISOString().split('T')[0];

 if (!weeks[weekKey]) {
 weeks[weekKey] = { total: 0 };
 }
 weeks[weekKey][session.section] = (weeks[weekKey][session.section] || 0) + session.hours;
 weeks[weekKey].total += session.hours;
 }

 return Object.entries(weeks).map(([week, hours]) => ({
 week: formatWeekLabel(week),
 total: hours.total || 0,
 FAR: hours.FAR,
 AUD: hours.AUD,
 REG: hours.REG,
 TCP: hours.TCP,
 BAR: hours.BAR,
 ISC: hours.ISC,
 })).slice(-8); // Last 8 weeks
 }, [filteredSessions]);

 // Calculate activity calendar data
 const activityData = useMemo(() => {
 const days: Record<string, number> = {};

 for (const session of studySessions) {
 days[session.date] = (days[session.date] || 0) + Math.round(session.hours * 60);
 }

 for (const attempt of attempts) {
 const date = new Date(attempt.created_at).toISOString().split('T')[0];
 days[date] = (days[date] || 0) + Math.round((attempt.time_spent_seconds || 30) / 60);
 }

 return Object.entries(days).map(([date, minutes]) => ({ date, minutes }));
 }, [attempts, studySessions]);

 // Calculate difficulty breakdown
 const difficultyData = useMemo(() => {
 const stats: Record<string, { total: number; correct: number }> = {
 easy: { total: 0, correct: 0 },
 medium: { total: 0, correct: 0 },
 hard: { total: 0, correct: 0 },
 };

 for (const attempt of filteredAttempts) {
 const difficulty = (attempt.difficulty || 'medium').toLowerCase();
 if (stats[difficulty]) {
 stats[difficulty].total++;
 if (attempt.is_correct) stats[difficulty].correct++;
 }
 }

 return Object.entries(stats).map(([difficulty, data]) => ({
 difficulty: difficulty as 'easy' | 'medium' | 'hard',
 ...data,
 }));
 }, [filteredAttempts]);

 // Calculate summary stats
 const summaryStats = useMemo(() => {
 const totalQuestions = filteredAttempts.length;
 const correctQuestions = filteredAttempts.filter(a => a.is_correct).length;
 const totalStudyHours = filteredSessions.reduce((sum, s) => sum + s.hours, 0);
 const avgAccuracy = totalQuestions > 0 ? Math.round((correctQuestions / totalQuestions) * 100) : 0;

 // Calculate week-over-week improvement
 const now = new Date();
 const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
 const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

 const thisWeek = attempts.filter(a => new Date(a.created_at) >= oneWeekAgo);
 const lastWeek = attempts.filter(a => {
 const date = new Date(a.created_at);
 return date >= twoWeeksAgo && date < oneWeekAgo;
 });

 const thisWeekAcc = thisWeek.length > 0
 ? Math.round((thisWeek.filter(a => a.is_correct).length / thisWeek.length) * 100)
 : 0;
 const lastWeekAcc = lastWeek.length > 0
 ? Math.round((lastWeek.filter(a => a.is_correct).length / lastWeek.length) * 100)
 : 0;

 const improvement = thisWeekAcc - lastWeekAcc;

 return {
 totalQuestions,
 correctQuestions,
 totalStudyHours,
 avgAccuracy,
 improvement,
 };
 }, [filteredAttempts, filteredSessions, attempts]);

 if (loading || authLoading) {
 return (
 <div className="flex items-center justify-center min-h-[400px]">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
 </div>
 );
 }

 if (!user) {
 return (
 <div className="text-center py-12">
 <p className="text-[var(--muted)]">Please log in to view your analytics.</p>
 <Link href="/login"className="btn-primary mt-4 inline-block">
 Log In
 </Link>
 </div>
 );
 }

 return (
 <div className="space-y-6">
 {/* Header */}
 <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold">Performance Analytics</h1>
 <p className="text-white/80 mt-1">Track your progress and identify areas for improvement</p>
 </div>
 <div className="flex items-center gap-3">
 <select
 value={dateRange}
 onChange={(e) => setDateRange(e.target.value as DateRange)}
 className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
 >
 <option value="7d"className="text-gray-900 dark:text-white">Last 7 days</option>
 <option value="30d"className="text-gray-900 dark:text-white">Last 30 days</option>
 <option value="90d"className="text-gray-900 dark:text-white">Last 90 days</option>
 <option value="all"className="text-gray-900 dark:text-white">All time</option>
 </select>
 <select
 value={selectedSection}
 onChange={(e) => setSelectedSection(e.target.value as SectionCode | 'all')}
 className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
 >
 <option value="all"className="text-gray-900 dark:text-white">All Sections</option>
 {sections.map(section => (
 <option key={section} value={section} className="text-gray-900 dark:text-white">{section}</option>
 ))}
 </select>
 </div>
 </div>
 </div>

 {/* Summary Stats */}
 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">Questions Practiced</p>
 <p className="text-2xl font-bold text-[var(--primary)]">{summaryStats.totalQuestions}</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">Average Accuracy</p>
 <p className="text-2xl font-bold text-green-600 dark:text-green-400">{summaryStats.avgAccuracy}%</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">Study Hours</p>
 <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
 {summaryStats.totalStudyHours.toFixed(1)}h
 </p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-[var(--muted)]">Week-over-Week</p>
 <p className={`text-2xl font-bold ${
 summaryStats.improvement >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
 }`}>
 {summaryStats.improvement >= 0 ? '+' : ''}{summaryStats.improvement}%
 </p>
 </div>
 </div>

 {/* Performance Trend */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
 Performance Trend
 </h2>
 {performanceData.length > 0 ? (
 <PerformanceLineChart
 data={performanceData}
 showSections={selectedSection === 'all'}
 />
 ) : (
 <div className="flex items-center justify-center h-[300px] text-[var(--muted)]">
 No data available for the selected period
 </div>
 )}
 </div>

 {/* Two Column Layout */}
 <div className="grid md:grid-cols-2 gap-6">
 {/* Study Time */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
 Study Time Distribution
 </h2>
 {studyTimeData.length > 0 ? (
 <StudyTimeChart data={studyTimeData} />
 ) : (
 <div className="flex items-center justify-center h-[300px] text-[var(--muted)]">
 No study sessions logged
 </div>
 )}
 </div>

 {/* Difficulty Breakdown */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
 Difficulty Breakdown
 </h2>
 <DifficultyBreakdown data={difficultyData} />
 </div>
 </div>

 {/* Activity Calendar */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
 Activity Calendar
 </h2>
 <ActivityCalendar data={activityData} />
 </div>

 {/* Topic Heatmap */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
 Topic Mastery
 </h2>
 <p className="text-sm text-[var(--muted)] mb-4">
 Click on a topic to see detailed performance
 </p>
 {topicData.length > 0 ? (
 <TopicHeatmap
 data={topicData}
 onTopicClick={(topic, section) => {
 // Could link to practice filtered by topic
 console.log('Clicked topic:', topic, section);
 }}
 />
 ) : (
 <div className="flex items-center justify-center h-[200px] text-[var(--muted)]">
 No topic data available
 </div>
 )}
 </div>

 {/* Recommendations */}
 <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
 <h2 className="text-lg font-semibold text-amber-800 dark:text-amber-200 mb-4 flex items-center gap-2">
 <svg className="w-5 h-5"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
 </svg>
 Study Recommendations
 </h2>
 <div className="space-y-3">
 {getRecommendations(summaryStats, topicData).map((rec, i) => (
 <div key={i} className="flex items-start gap-3">
 <div className="w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
 <span className="text-xs font-bold text-amber-800 dark:text-amber-200">{i + 1}</span>
 </div>
 <p className="text-amber-900 dark:text-amber-100">{rec}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}

function formatWeekLabel(dateStr: string): string {
 const date = new Date(dateStr);
 const month = date.toLocaleDateString('en-US', { month: 'short' });
 const day = date.getDate();
 return `${month} ${day}`;
}

function getRecommendations(
 stats: { totalQuestions: number; avgAccuracy: number; improvement: number },
 topicData: { topic: string; section: string; accuracy: number; attempted: number }[]
): string[] {
 const recommendations: string[] = [];

 // Low volume recommendation
 if (stats.totalQuestions < 50) {
 recommendations.push(
"Increase your practice volume. Aim for at least 20-30 questions per study session to build momentum."
 );
 }

 // Accuracy-based recommendations
 if (stats.avgAccuracy < 60) {
 recommendations.push(
"Focus on foundational concepts before moving to harder material. Review explanations for questions you miss."
 );
 } else if (stats.avgAccuracy < 75) {
 recommendations.push(
"Good progress! Identify your weakest topics and allocate extra time to those areas."
 );
 }

 // Find weak topics
 const weakTopics = topicData
 .filter(t => t.attempted >= 5 && t.accuracy < 60)
 .sort((a, b) => a.accuracy - b.accuracy)
 .slice(0, 3);

 if (weakTopics.length > 0) {
 const topicNames = weakTopics.map(t => t.topic).join(', ');
 recommendations.push(
 `Your weakest areas are: ${topicNames}. Consider focusing your next study sessions on these topics.`
 );
 }

 // Declining performance
 if (stats.improvement < -10) {
 recommendations.push(
"Your accuracy has declined recently. Take a short break or try a different study approach to avoid burnout."
 );
 }

 // Positive reinforcement
 if (stats.improvement >= 5 && stats.avgAccuracy >= 70) {
 recommendations.push(
"Great improvement! Keep up the momentum and consider taking a practice simulation to test your timing."
 );
 }

 // Default recommendation
 if (recommendations.length === 0) {
 recommendations.push(
"Keep practicing consistently! Daily practice, even for short periods, leads to better retention."
 );
 }

 return recommendations.slice(0, 4);
}
