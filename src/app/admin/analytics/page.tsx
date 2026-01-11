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
}

export default function AnalyticsPage() {
 const [data, setData] = useState<AnalyticsData | null>(null);
 const [loading, setLoading] = useState(true);
 const [dateRange, setDateRange] = useState('30d');

 useEffect(() => {
 fetchAnalytics();
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

 if (loading) {
 return (
 <div className="flex items-center justify-center h-64">
 <LoadingSpinner className="h-8 w-8 text-[var(--primary)]"/>
 </div>
 );
 }

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
 <select
 value={dateRange}
 onChange={(e) => setDateRange(e.target.value)}
 className="px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white"
 >
 <option value="7d">Last 7 days</option>
 <option value="30d">Last 30 days</option>
 <option value="90d">Last 90 days</option>
 <option value="all">All time</option>
 </select>
 </div>

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
 </div>
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
