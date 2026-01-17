'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
 signupsOverTime: { date: string; count: number }[];
 activeUsersOverTime: { date: string; count: number }[];
 practiceSessionsOverTime: { date: string; count: number }[];
 accuracyBySection: { section: string; accuracy: number; total: number }[];
 subscriptionBreakdown: { tier: string; count: number }[];
 topTopics: { topic: string; count: number }[];
 peakUsageTimes: { hour: number; count: number }[];
 streakDistribution: { streak: string; count: number }[];
 // AI Feature Analytics
 aiUsageByFeature: { feature: string; displayName: string; totalUses: number; uniqueUsers: number }[];
 aiUsageOverTime: { date: string; count: number; uniqueUsers: number }[];
 totalAiUses: number;
 uniqueAiUsers: number;
}

interface TBSAnalyticsData {
 totalAttempts: number;
 completedAttempts: number;
 completionRate: number;
 averageScore: number;
 averageTimeMinutes: number;
 bySection: { section: string; attempts: number; avgScore: number; completionRate: number }[];
 byType: { tbsType: string; attempts: number; avgScore: number }[];
 popularTBS: { tbsId: string; attempts: number; avgScore: number }[];
 scoreDistribution: { bucket: string; count: number }[];
 topicPerformance: { topic: string; attempts: number; avgScore: number; status: string }[];
 overTime: { date: string; count: number; avgScore: number }[];
 message?: string;
}

interface ExamAnalyticsData {
 totalExams: number;
 completedExams: number;
 completionRate: number;
 averageScore: number;
 averageMCQScore: number;
 averageTBSScore: number;
 averageTimeMinutes: number;
 passingRate: number;
 bySection: { section: string; attempts: number; avgScore: number; completionRate: number; passingRate: number }[];
 byExamType: { examType: string; displayName: string; attempts: number; avgScore: number; avgTimeMinutes: number }[];
 scoreDistribution: { bucket: string; count: number; label: string }[];
 overTime: { date: string; count: number; avgScore: number }[];
 performanceTrend: { week: string; avgScore: number; examCount: number }[];
 mcqVsTbs: { mcqAverage: number; tbsAverage: number; difference: number; mcqStronger: boolean };
 message?: string;
}

export default function AnalyticsPage() {
 const [data, setData] = useState<AnalyticsData | null>(null);
 const [tbsData, setTbsData] = useState<TBSAnalyticsData | null>(null);
 const [examData, setExamData] = useState<ExamAnalyticsData | null>(null);
 const [loading, setLoading] = useState(true);
 const [tbsLoading, setTbsLoading] = useState(true);
 const [examLoading, setExamLoading] = useState(true);
 const [dateRange, setDateRange] = useState('30d');
 const [activeTab, setActiveTab] = useState<'general' | 'tbs' | 'exams'>('general');

 useEffect(() => {
 fetchAnalytics();
 fetchTBSAnalytics();
 fetchExamAnalytics();
 }, [dateRange]);

 const fetchAnalytics = async () => {
 setLoading(true);
 try {
 const response = await fetch(`/api/admin/analytics?range=${dateRange}`);
 if (response.ok) {
 const result = await response.json();
 setData(result);
 }
 } catch (error) {
 console.error('Error fetching analytics:', error);
 } finally {
 setLoading(false);
 }
 };

 const fetchTBSAnalytics = async () => {
 setTbsLoading(true);
 try {
 const response = await fetch(`/api/admin/analytics/tbs?range=${dateRange}`);
 if (response.ok) {
 const result = await response.json();
 setTbsData(result);
 }
 } catch (error) {
 console.error('Error fetching TBS analytics:', error);
 } finally {
 setTbsLoading(false);
 }
 };

 const fetchExamAnalytics = async () => {
 setExamLoading(true);
 try {
 const response = await fetch(`/api/admin/analytics/exams?range=${dateRange}`);
 if (response.ok) {
 const result = await response.json();
 setExamData(result);
 }
 } catch (error) {
 console.error('Error fetching exam analytics:', error);
 } finally {
 setExamLoading(false);
 }
 };

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
 Analytics
 </h1>
 <p className="text-[var(--muted)] dark:text-[var(--muted)] mt-1">
 Platform usage and engagement metrics
 </p>
 </div>
 <div className="flex items-center gap-3">
 {/* Tab Buttons */}
 <div className="flex rounded-lg border border-[var(--border)] overflow-hidden">
 <button
 onClick={() => setActiveTab('general')}
 className={`px-4 py-2 text-sm font-medium transition-colors ${
 activeTab === 'general'
 ? 'bg-[var(--primary)] text-white'
 : 'bg-white dark:bg-[var(--card)] text-[var(--foreground)] dark:text-white hover:bg-gray-50 dark:hover:bg-[var(--card-hover)]'
 }`}
 >
 General
 </button>
 <button
 onClick={() => setActiveTab('tbs')}
 className={`px-4 py-2 text-sm font-medium transition-colors border-l border-[var(--border)] ${
 activeTab === 'tbs'
 ? 'bg-[var(--primary)] text-white'
 : 'bg-white dark:bg-[var(--card)] text-[var(--foreground)] dark:text-white hover:bg-gray-50 dark:hover:bg-[var(--card-hover)]'
 }`}
 >
 TBS
 </button>
 <button
 onClick={() => setActiveTab('exams')}
 className={`px-4 py-2 text-sm font-medium transition-colors border-l border-[var(--border)] ${
 activeTab === 'exams'
 ? 'bg-[var(--primary)] text-white'
 : 'bg-white dark:bg-[var(--card)] text-[var(--foreground)] dark:text-white hover:bg-gray-50 dark:hover:bg-[var(--card-hover)]'
 }`}
 >
 Exams
 </button>
 </div>
 <select
 value={dateRange}
 onChange={(e) => setDateRange(e.target.value)}
 className="px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white"
 >
 <option value="7d">Last 7 days</option>
 <option value="30d">Last 30 days</option>
 <option value="90d">Last 90 days</option>
 <option value="1y">Last year</option>
 <option value="all">All time</option>
 </select>
 </div>
 </div>

 {/* General Analytics Tab */}
 {activeTab === 'general' && (loading ? (
 <div className="flex items-center justify-center h-64">
 <LoadingSpinner className="h-8 w-8 text-[var(--primary)]"/>
 </div>
 ) : (
 <GeneralAnalyticsContent data={data} />
 ))}

 {/* TBS Analytics Tab */}
 {activeTab === 'tbs' && (tbsLoading ? (
 <div className="flex items-center justify-center h-64">
 <LoadingSpinner className="h-8 w-8 text-[var(--primary)]"/>
 </div>
 ) : (
 <TBSAnalyticsContent data={tbsData} />
 ))}

 {/* Exam Simulations Tab */}
 {activeTab === 'exams' && (examLoading ? (
 <div className="flex items-center justify-center h-64">
 <LoadingSpinner className="h-8 w-8 text-[var(--primary)]"/>
 </div>
 ) : (
 <ExamAnalyticsContent data={examData} />
 ))}
 </div>
 );
}

// General Analytics Content Component
function GeneralAnalyticsContent({ data }: { data: AnalyticsData | null }) {
 return (
 <>

 {/* Key Metrics */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
 <MetricCard
 title="Total Signups"
 value={data?.signupsOverTime?.reduce((acc, d) => acc + d.count, 0) || 0}
 icon={<UsersIcon className="h-5 w-5"/>}
 color="blue"
 />
 <MetricCard
 title="Active Users"
 value={data?.activeUsersOverTime?.[data.activeUsersOverTime.length - 1]?.count || 0}
 icon={<ActivityIcon className="h-5 w-5"/>}
 color="green"
 />
 <MetricCard
 title="Practice Sessions"
 value={data?.practiceSessionsOverTime?.reduce((acc, d) => acc + d.count, 0) || 0}
 icon={<BookIcon className="h-5 w-5"/>}
 color="purple"
 />
 <MetricCard
 title="Avg Accuracy"
 value={`${Math.round(
 (data?.accuracyBySection?.reduce((acc, d) => acc + d.accuracy * d.total, 0) || 0) /
 (data?.accuracyBySection?.reduce((acc, d) => acc + d.total, 0) || 1)
 )}%`}
 icon={<TargetIcon className="h-5 w-5"/>}
 color="yellow"
 />
 </div>

 {/* Charts Row 1 */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* Signups Over Time */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Signups Over Time
 </h3>
 <SimpleBarChart data={data?.signupsOverTime || []} color="blue"/>
 </div>

 {/* Practice Sessions Over Time */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Practice Sessions
 </h3>
 <SimpleBarChart data={data?.practiceSessionsOverTime || []} color="purple"/>
 </div>
 </div>

 {/* Charts Row 2 */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Accuracy by Section */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Accuracy by Section
 </h3>
 <div className="space-y-4">
 {(data?.accuracyBySection || []).map((item) => (
 <div key={item.section}>
 <div className="flex justify-between text-sm mb-1">
 <span className="text-[var(--foreground)] dark:text-white">{item.section}</span>
 <span className="text-[var(--muted)] dark:text-[var(--muted)]">
 {Math.round(item.accuracy)}%
 </span>
 </div>
 <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2">
 <div
 className={`h-2 rounded-full ${
 item.accuracy >= 75 ? 'bg-green-500' : item.accuracy >= 50 ? 'bg-yellow-500' : 'bg-red-500'
 }`}
 style={{ width: `${item.accuracy}%` }}
 />
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Subscription Breakdown */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Subscription Breakdown
 </h3>
 <div className="space-y-3">
 {(data?.subscriptionBreakdown || []).map((item) => {
 const total = data?.subscriptionBreakdown?.reduce((acc, d) => acc + d.count, 0) || 1;
 const percentage = Math.round((item.count / total) * 100);
 return (
 <div key={item.tier} className="flex items-center justify-between">
 <div className="flex items-center">
 <div className={`w-3 h-3 rounded-full mr-2 ${
 item.tier === 'premium' ? 'bg-purple-500' :
 item.tier === 'pro' ? 'bg-blue-500' : 'bg-gray-400'
 }`} />
 <span className="text-sm text-[var(--foreground)] dark:text-white capitalize">
 {item.tier}
 </span>
 </div>
 <span className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">
 {item.count} ({percentage}%)
 </span>
 </div>
 );
 })}
 </div>
 </div>

 {/* Top Topics */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Popular Topics
 </h3>
 <div className="space-y-3">
 {(data?.topTopics || []).slice(0, 5).map((item, index) => (
 <div key={item.topic} className="flex items-center justify-between">
 <div className="flex items-center">
 <span className="text-sm font-medium text-[var(--muted)] dark:text-[var(--muted)] w-5">
 {index + 1}.
 </span>
 <span className="text-sm text-[var(--foreground)] dark:text-white ml-2 truncate">
 {item.topic}
 </span>
 </div>
 <span className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">
 {item.count}
 </span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Charts Row 3 */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* Peak Usage Times */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Peak Usage Times (UTC)
 </h3>
 <div className="flex items-end justify-between h-40 px-2">
 {(data?.peakUsageTimes || Array.from({ length: 24 }, (_, i) => ({ hour: i, count: 0 }))).map((item) => {
 const maxCount = Math.max(...(data?.peakUsageTimes?.map(d => d.count) || [1]));
 const height = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
 return (
 <div
 key={item.hour}
 className="flex-1 mx-0.5 bg-blue-500 rounded-t"
 style={{ height: `${height}%`, minHeight: item.count > 0 ? '4px' : '0' }}
 title={`${item.hour}:00 - ${item.count} sessions`}
 />
 );
 })}
 </div>
 <div className="flex justify-between mt-2 text-xs text-[var(--muted)] dark:text-[var(--muted)]">
 <span>12am</span>
 <span>6am</span>
 <span>12pm</span>
 <span>6pm</span>
 <span>12am</span>
 </div>
 </div>

 {/* Streak Distribution */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Study Streak Distribution
 </h3>
 <div className="space-y-3">
 {(data?.streakDistribution || []).map((item) => {
 const total = data?.streakDistribution?.reduce((acc, d) => acc + d.count, 0) || 1;
 const percentage = Math.round((item.count / total) * 100);
 return (
 <div key={item.streak}>
 <div className="flex justify-between text-sm mb-1">
 <span className="text-[var(--foreground)] dark:text-white">{item.streak}</span>
 <span className="text-[var(--muted)] dark:text-[var(--muted)]">
 {item.count} ({percentage}%)
 </span>
 </div>
 <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2">
 <div
 className="h-2 rounded-full bg-orange-500"
 style={{ width: `${percentage}%` }}
 />
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </div>

 {/* AI Features Section Header */}
 <div className="mt-8 pt-6 border-t border-[var(--border)]">
 <div className="flex items-center gap-2 mb-6">
 <AiIcon className="h-6 w-6 text-purple-500"/>
 <h2 className="text-xl font-bold text-[var(--foreground)] dark:text-white">
 AI Feature Analytics
 </h2>
 </div>

 {/* AI Key Metrics */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
 <MetricCard
 title="Total AI Uses"
 value={data?.totalAiUses || 0}
 icon={<SparklesIcon className="h-5 w-5"/>}
 color="purple"
 />
 <MetricCard
 title="AI Active Users"
 value={data?.uniqueAiUsers || 0}
 icon={<UsersIcon className="h-5 w-5"/>}
 color="blue"
 />
 <MetricCard
 title="Navigator Chats"
 value={data?.aiUsageByFeature?.find(f => f.feature === 'navigator')?.totalUses || 0}
 icon={<ChatIcon className="h-5 w-5"/>}
 color="green"
 />
 <MetricCard
 title="Study Guides"
 value={data?.aiUsageByFeature?.find(f => f.feature === 'study_guide')?.totalUses || 0}
 icon={<BookIcon className="h-5 w-5"/>}
 color="yellow"
 />
 </div>

 {/* AI Charts Row */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* AI Usage Over Time */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 AI Usage Over Time
 </h3>
 <SimpleBarChart data={data?.aiUsageOverTime || []} color="purple"/>
 </div>

 {/* AI Usage by Feature */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Usage by AI Feature
 </h3>
 <div className="space-y-4">
 {(data?.aiUsageByFeature || []).map((item) => {
 const maxUses = Math.max(...(data?.aiUsageByFeature?.map(f => f.totalUses) || [1]));
 const percentage = maxUses > 0 ? (item.totalUses / maxUses) * 100 : 0;
 return (
 <div key={item.feature}>
 <div className="flex justify-between text-sm mb-1">
 <span className="text-[var(--foreground)] dark:text-white">{item.displayName}</span>
 <span className="text-[var(--muted)] dark:text-[var(--muted)]">
 {item.totalUses.toLocaleString()} uses • {item.uniqueUsers} users
 </span>
 </div>
 <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2">
 <div
 className="h-2 rounded-full bg-purple-500"
 style={{ width: `${percentage}%` }}
 />
 </div>
 </div>
 );
 })}
 {(!data?.aiUsageByFeature || data.aiUsageByFeature.length === 0) && (
 <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)] text-center py-4">
 No AI feature usage data yet
 </p>
 )}
 </div>
 </div>
 </div>
 </div>
 </>
 );
}

// TBS Analytics Content Component
function TBSAnalyticsContent({ data }: { data: TBSAnalyticsData | null }) {
 if (!data || data.totalAttempts === 0) {
 return (
 <div className="flex flex-col items-center justify-center h-64 text-center">
 <DocumentIcon className="h-12 w-12 text-[var(--muted)] mb-4" />
 <h3 className="text-lg font-semibold text-[var(--foreground)] dark:text-white">No TBS Data Yet</h3>
 <p className="text-[var(--muted)] mt-2">{data?.message || 'TBS attempts will appear here once users start practicing'}</p>
 </div>
 );
 }

 return (
 <>
 {/* TBS Key Metrics */}
 <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
 <MetricCard
 title="Total Attempts"
 value={data.totalAttempts}
 icon={<DocumentIcon className="h-5 w-5"/>}
 color="blue"
 />
 <MetricCard
 title="Completed"
 value={data.completedAttempts}
 icon={<CheckIcon className="h-5 w-5"/>}
 color="green"
 />
 <MetricCard
 title="Completion Rate"
 value={`${data.completionRate}%`}
 icon={<TargetIcon className="h-5 w-5"/>}
 color="purple"
 />
 <MetricCard
 title="Avg Score"
 value={`${data.averageScore}%`}
 icon={<ChartIcon className="h-5 w-5"/>}
 color="yellow"
 />
 <MetricCard
 title="Avg Time"
 value={`${data.averageTimeMinutes}m`}
 icon={<ClockIcon className="h-5 w-5"/>}
 color="blue"
 />
 </div>

 {/* TBS Charts Row 1 */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* TBS Over Time */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 TBS Attempts Over Time
 </h3>
 <SimpleBarChart data={data.overTime || []} color="blue"/>
 </div>

 {/* Score Distribution */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Score Distribution
 </h3>
 <div className="space-y-3">
 {data.scoreDistribution.map((item) => {
 const maxCount = Math.max(...data.scoreDistribution.map(d => d.count), 1);
 const percentage = (item.count / maxCount) * 100;
 return (
 <div key={item.bucket}>
 <div className="flex justify-between text-sm mb-1">
 <span className="text-[var(--foreground)] dark:text-white">{item.bucket}</span>
 <span className="text-[var(--muted)]">{item.count}</span>
 </div>
 <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2">
 <div
 className={`h-2 rounded-full ${
 item.bucket.includes('91-100') ? 'bg-green-500' :
 item.bucket.includes('81-90') ? 'bg-green-400' :
 item.bucket.includes('71-80') ? 'bg-yellow-400' :
 item.bucket.includes('61-70') ? 'bg-yellow-500' :
 item.bucket.includes('51-60') ? 'bg-orange-500' : 'bg-red-500'
 }`}
 style={{ width: `${percentage}%` }}
 />
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </div>

 {/* TBS Charts Row 2 */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* By Section */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Performance by Section
 </h3>
 <div className="space-y-4">
 {data.bySection.map((item) => (
 <div key={item.section}>
 <div className="flex justify-between text-sm mb-1">
 <span className="text-[var(--foreground)] dark:text-white font-medium">{item.section.toUpperCase()}</span>
 <span className="text-[var(--muted)]">{item.avgScore}% avg • {item.attempts} attempts</span>
 </div>
 <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2">
 <div
 className={`h-2 rounded-full ${
 item.avgScore >= 75 ? 'bg-green-500' : item.avgScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
 }`}
 style={{ width: `${item.avgScore}%` }}
 />
 </div>
 </div>
 ))}
 {data.bySection.length === 0 && (
 <p className="text-sm text-[var(--muted)] text-center py-4">No section data</p>
 )}
 </div>
 </div>

 {/* By Type */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Performance by TBS Type
 </h3>
 <div className="space-y-4">
 {data.byType.map((item) => (
 <div key={item.tbsType}>
 <div className="flex justify-between text-sm mb-1">
 <span className="text-[var(--foreground)] dark:text-white capitalize">
 {item.tbsType.replace(/_/g, ' ')}
 </span>
 <span className="text-[var(--muted)]">{item.avgScore}% avg • {item.attempts}</span>
 </div>
 <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2">
 <div
 className={`h-2 rounded-full ${
 item.avgScore >= 75 ? 'bg-green-500' : item.avgScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
 }`}
 style={{ width: `${item.avgScore}%` }}
 />
 </div>
 </div>
 ))}
 {data.byType.length === 0 && (
 <p className="text-sm text-[var(--muted)] text-center py-4">No type data</p>
 )}
 </div>
 </div>

 {/* Popular TBS */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Most Attempted TBS
 </h3>
 <div className="space-y-3">
 {data.popularTBS.slice(0, 8).map((item, index) => (
 <div key={item.tbsId} className="flex items-center justify-between">
 <div className="flex items-center min-w-0">
 <span className="text-sm font-medium text-[var(--muted)] w-5">{index + 1}.</span>
 <span className="text-sm text-[var(--foreground)] dark:text-white ml-2 truncate">
 {item.tbsId}
 </span>
 </div>
 <div className="flex items-center gap-2 ml-2">
 <span className={`text-xs px-2 py-0.5 rounded ${
 item.avgScore >= 75 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
 item.avgScore >= 60 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
 }`}>
 {item.avgScore}%
 </span>
 <span className="text-xs text-[var(--muted)]">{item.attempts}</span>
 </div>
 </div>
 ))}
 {data.popularTBS.length === 0 && (
 <p className="text-sm text-[var(--muted)] text-center py-4">No TBS data</p>
 )}
 </div>
 </div>
 </div>

 {/* Topic Performance */}
 {data.topicPerformance.length > 0 && (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Topic Performance Analysis
 </h3>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 <div>
 <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Strong Topics</h4>
 <div className="space-y-2">
 {data.topicPerformance.filter(t => t.status === 'strong').map(t => (
 <div key={t.topic} className="flex justify-between text-sm">
 <span className="text-[var(--foreground)] dark:text-white">{t.topic}</span>
 <span className="text-green-600 dark:text-green-400">{t.avgScore}%</span>
 </div>
 ))}
 {data.topicPerformance.filter(t => t.status === 'strong').length === 0 && (
 <p className="text-xs text-[var(--muted)]">No strong topics yet</p>
 )}
 </div>
 </div>
 <div>
 <h4 className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-2">Moderate Topics</h4>
 <div className="space-y-2">
 {data.topicPerformance.filter(t => t.status === 'moderate').map(t => (
 <div key={t.topic} className="flex justify-between text-sm">
 <span className="text-[var(--foreground)] dark:text-white">{t.topic}</span>
 <span className="text-yellow-600 dark:text-yellow-400">{t.avgScore}%</span>
 </div>
 ))}
 {data.topicPerformance.filter(t => t.status === 'moderate').length === 0 && (
 <p className="text-xs text-[var(--muted)]">No moderate topics</p>
 )}
 </div>
 </div>
 <div>
 <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">Needs Work</h4>
 <div className="space-y-2">
 {data.topicPerformance.filter(t => t.status === 'weak').map(t => (
 <div key={t.topic} className="flex justify-between text-sm">
 <span className="text-[var(--foreground)] dark:text-white">{t.topic}</span>
 <span className="text-red-600 dark:text-red-400">{t.avgScore}%</span>
 </div>
 ))}
 {data.topicPerformance.filter(t => t.status === 'weak').length === 0 && (
 <p className="text-xs text-[var(--muted)]">No weak topics</p>
 )}
 </div>
 </div>
 </div>
 </div>
 )}
 </>
 );
}

// Exam Analytics Content Component
function ExamAnalyticsContent({ data }: { data: ExamAnalyticsData | null }) {
 if (!data || data.totalExams === 0) {
 return (
 <div className="flex flex-col items-center justify-center h-64 text-center">
 <ClipboardIcon className="h-12 w-12 text-[var(--muted)] mb-4" />
 <h3 className="text-lg font-semibold text-[var(--foreground)] dark:text-white">No Exam Data Yet</h3>
 <p className="text-[var(--muted)] mt-2">{data?.message || 'Exam simulations will appear here once users start taking them'}</p>
 </div>
 );
 }

 return (
 <>
 {/* Exam Key Metrics */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
 <MetricCard
 title="Total Exams"
 value={data.totalExams}
 icon={<ClipboardIcon className="h-5 w-5"/>}
 color="blue"
 />
 <MetricCard
 title="Completed"
 value={data.completedExams}
 icon={<CheckIcon className="h-5 w-5"/>}
 color="green"
 />
 <MetricCard
 title="Avg Score"
 value={`${data.averageScore}%`}
 icon={<ChartIcon className="h-5 w-5"/>}
 color="purple"
 />
 <MetricCard
 title="Passing Rate"
 value={`${data.passingRate}%`}
 icon={<TrophyIcon className="h-5 w-5"/>}
 color="yellow"
 />
 </div>

 {/* Secondary Metrics */}
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
 <MetricCard
 title="MCQ Avg"
 value={`${data.averageMCQScore}%`}
 icon={<DocumentIcon className="h-5 w-5"/>}
 color="blue"
 />
 <MetricCard
 title="TBS Avg"
 value={`${data.averageTBSScore}%`}
 icon={<DocumentIcon className="h-5 w-5"/>}
 color="purple"
 />
 <MetricCard
 title="Avg Time"
 value={`${data.averageTimeMinutes}m`}
 icon={<ClockIcon className="h-5 w-5"/>}
 color="green"
 />
 <MetricCard
 title="Completion Rate"
 value={`${data.completionRate}%`}
 icon={<TargetIcon className="h-5 w-5"/>}
 color="yellow"
 />
 </div>

 {/* Charts Row 1 */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* Exams Over Time */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Exams Over Time
 </h3>
 <SimpleBarChart data={data.overTime || []} color="blue"/>
 </div>

 {/* Score Distribution */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Score Distribution
 </h3>
 <div className="space-y-3">
 {data.scoreDistribution.map((item) => {
 const maxCount = Math.max(...data.scoreDistribution.map(d => d.count), 1);
 const percentage = (item.count / maxCount) * 100;
 return (
 <div key={item.bucket}>
 <div className="flex justify-between text-sm mb-1">
 <span className="text-[var(--foreground)] dark:text-white">{item.bucket}</span>
 <span className="text-[var(--muted)]">{item.count} ({item.label})</span>
 </div>
 <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2">
 <div
 className={`h-2 rounded-full ${
 item.bucket.includes('91-100') ? 'bg-green-500' :
 item.bucket.includes('81-90') ? 'bg-green-400' :
 item.bucket.includes('75-80') ? 'bg-green-300' :
 item.bucket.includes('61-74') ? 'bg-yellow-500' :
 item.bucket.includes('51-60') ? 'bg-orange-500' : 'bg-red-500'
 }`}
 style={{ width: `${percentage}%` }}
 />
 </div>
 </div>
 );
 })}
 </div>
 </div>
 </div>

 {/* Charts Row 2 */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* By Section */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Performance by Section
 </h3>
 <div className="space-y-4">
 {data.bySection.map((item) => (
 <div key={item.section}>
 <div className="flex justify-between text-sm mb-1">
 <span className="text-[var(--foreground)] dark:text-white font-medium">{item.section}</span>
 <span className="text-[var(--muted)]">{item.avgScore}% avg</span>
 </div>
 <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2 mb-1">
 <div
 className={`h-2 rounded-full ${
 item.avgScore >= 75 ? 'bg-green-500' : item.avgScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
 }`}
 style={{ width: `${item.avgScore}%` }}
 />
 </div>
 <div className="flex justify-between text-xs text-[var(--muted)]">
 <span>{item.attempts} attempts</span>
 <span>{item.passingRate}% passing</span>
 </div>
 </div>
 ))}
 {data.bySection.length === 0 && (
 <p className="text-sm text-[var(--muted)] text-center py-4">No section data</p>
 )}
 </div>
 </div>

 {/* By Exam Type */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 By Exam Type
 </h3>
 <div className="space-y-4">
 {data.byExamType.map((item) => (
 <div key={item.examType} className="p-3 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg">
 <div className="flex justify-between items-center mb-2">
 <span className="text-[var(--foreground)] dark:text-white font-medium">{item.displayName}</span>
 <span className={`text-xs px-2 py-0.5 rounded ${
 item.avgScore >= 75 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
 item.avgScore >= 60 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
 }`}>
 {item.avgScore}% avg
 </span>
 </div>
 <div className="flex justify-between text-xs text-[var(--muted)]">
 <span>{item.attempts} attempts</span>
 <span>{item.avgTimeMinutes}m avg time</span>
 </div>
 </div>
 ))}
 {data.byExamType.length === 0 && (
 <p className="text-sm text-[var(--muted)] text-center py-4">No type data</p>
 )}
 </div>
 </div>

 {/* MCQ vs TBS Comparison */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 MCQ vs TBS Performance
 </h3>
 <div className="space-y-6">
 <div>
 <div className="flex justify-between text-sm mb-2">
 <span className="text-[var(--foreground)] dark:text-white">MCQ Performance</span>
 <span className={data.mcqVsTbs.mcqAverage >= 75 ? 'text-green-600' : 'text-[var(--muted)]'}>
 {data.mcqVsTbs.mcqAverage}%
 </span>
 </div>
 <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-3">
 <div
 className="h-3 rounded-full bg-blue-500"
 style={{ width: `${data.mcqVsTbs.mcqAverage}%` }}
 />
 </div>
 </div>
 <div>
 <div className="flex justify-between text-sm mb-2">
 <span className="text-[var(--foreground)] dark:text-white">TBS Performance</span>
 <span className={data.mcqVsTbs.tbsAverage >= 75 ? 'text-green-600' : 'text-[var(--muted)]'}>
 {data.mcqVsTbs.tbsAverage}%
 </span>
 </div>
 <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-3">
 <div
 className="h-3 rounded-full bg-purple-500"
 style={{ width: `${data.mcqVsTbs.tbsAverage}%` }}
 />
 </div>
 </div>
 <div className="pt-4 border-t border-[var(--border)]">
 <p className="text-sm text-[var(--muted)]">
 {data.mcqVsTbs.mcqStronger ? (
 <>Users perform <span className="text-blue-600 font-medium">{Math.abs(data.mcqVsTbs.difference)}%</span> better on MCQs</>
 ) : data.mcqVsTbs.difference === 0 ? (
 <>MCQ and TBS performance is <span className="font-medium">equal</span></>
 ) : (
 <>Users perform <span className="text-purple-600 font-medium">{Math.abs(data.mcqVsTbs.difference)}%</span> better on TBS</>
 )}
 </p>
 </div>
 </div>
 </div>
 </div>

 {/* Performance Trend */}
 {data.performanceTrend.length > 0 && (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h3 className="font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Weekly Performance Trend
 </h3>
 <div className="flex items-end justify-between h-40 px-2">
 {data.performanceTrend.slice(-12).map((item, index) => {
 const height = item.avgScore;
 return (
 <div key={item.week} className="flex-1 mx-1 flex flex-col items-center">
 <span className="text-xs text-[var(--muted)] mb-1">{item.avgScore}%</span>
 <div
 className={`w-full rounded-t transition-all ${
 item.avgScore >= 75 ? 'bg-green-500' : item.avgScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
 }`}
 style={{ height: `${height}%`, minHeight: '4px' }}
 title={`Week of ${item.week}: ${item.avgScore}% avg (${item.examCount} exams)`}
 />
 </div>
 );
 })}
 </div>
 <div className="flex justify-between mt-2 text-xs text-[var(--muted)]">
 <span>{data.performanceTrend[0]?.week || ''}</span>
 <span>{data.performanceTrend[data.performanceTrend.length - 1]?.week || ''}</span>
 </div>
 </div>
 )}
 </>
 );
}

function MetricCard({
 title,
 value,
 icon,
 color,
}: {
 title: string;
 value: number | string;
 icon: React.ReactNode;
 color: 'blue' | 'green' | 'purple' | 'yellow';
}) {
 const colors = {
 blue: 'bg-blue-500',
 green: 'bg-green-500',
 purple: 'bg-purple-500',
 yellow: 'bg-yellow-500',
 };

 return (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
 <div className="flex items-center">
 <div className={`${colors[color]} p-2 rounded-lg text-white`}>
 {icon}
 </div>
 <div className="ml-3">
 <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">{title}</p>
 <p className="text-xl font-bold text-[var(--foreground)] dark:text-white">
 {typeof value === 'number' ? value.toLocaleString() : value}
 </p>
 </div>
 </div>
 </div>
 );
}

function SimpleBarChart({
 data,
 color,
}: {
 data: { date: string; count: number }[];
 color: 'blue' | 'purple' | 'green';
}) {
 const colors = {
 blue: 'bg-blue-500',
 purple: 'bg-purple-500',
 green: 'bg-green-500',
 };

 const maxCount = Math.max(...data.map(d => d.count), 1);

 return (
 <div className="h-48">
 <div className="flex items-end justify-between h-40 px-1">
 {data.slice(-14).map((item, index) => {
 const height = (item.count / maxCount) * 100;
 return (
 <div
 key={index}
 className={`flex-1 mx-0.5 ${colors[color]} rounded-t transition-all`}
 style={{ height: `${height}%`, minHeight: item.count > 0 ? '4px' : '0' }}
 title={`${item.date}: ${item.count}`}
 />
 );
 })}
 </div>
 <div className="flex justify-between mt-2 text-xs text-[var(--muted)] dark:text-[var(--muted)]">
 <span>{data[0]?.date || ''}</span>
 <span>{data[data.length - 1]?.date || ''}</span>
 </div>
 </div>
 );
}

// Icons
function UsersIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
 </svg>
 );
}

function ActivityIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>
 </svg>
 );
}

function BookIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
 </svg>
 );
}

function TargetIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M12 21a9 9 0 100-18 9 9 0 000 18z"/>
 <path strokeLinecap="round"strokeLinejoin="round"d="M12 15a3 3 0 100-6 3 3 0 000 6z"/>
 </svg>
 );
}

function LoadingSpinner({ className = '' }: { className?: string }) {
 return (
 <svg className={`animate-spin ${className}`} fill="none"viewBox="0 0 24 24">
 <circle className="opacity-25"cx="12"cy="12"r="10"stroke="currentColor"strokeWidth="4"/>
 <path
 className="opacity-75"
 fill="currentColor"
 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
 />
 </svg>
 );
}

function AiIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>
 </svg>
 );
}

function SparklesIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
 </svg>
 );
}

function ChatIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>
 </svg>
 );
}

function DocumentIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
 </svg>
 );
}

function CheckIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 );
}

function ChartIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
 </svg>
 );
}

function ClockIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 );
}

function ClipboardIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"/>
 </svg>
 );
}

function TrophyIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
 <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"/>
 </svg>
 );
}
