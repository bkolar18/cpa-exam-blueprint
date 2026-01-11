import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

async function getStats() {
 const supabase = await createClient();

 if (!supabase) {
 return {
 totalUsers: 0,
 pendingFeedback: 0,
 practiceSessionsToday: 0,
 activeUsers7d: 0,
 };
 }

 // Get total users
 const { count: totalUsers } = await supabase
 .from('profiles')
 .select('*', { count: 'exact', head: true });

 // Get pending feedback count
 const { count: pendingFeedback } = await supabase
 .from('question_feedback')
 .select('*', { count: 'exact', head: true })
 .eq('status', 'pending');

 // Get practice sessions today
 const today = new Date();
 today.setHours(0, 0, 0, 0);
 const { count: practiceSessionsToday } = await supabase
 .from('practice_sessions')
 .select('*', { count: 'exact', head: true })
 .gte('created_at', today.toISOString());

 // Get active users in last 7 days
 const sevenDaysAgo = new Date();
 sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
 const { data: activeUsersData } = await supabase
 .from('practice_sessions')
 .select('user_id')
 .gte('created_at', sevenDaysAgo.toISOString());

 const uniqueActiveUsers = new Set(activeUsersData?.map(s => s.user_id) || []);

 return {
 totalUsers: totalUsers || 0,
 pendingFeedback: pendingFeedback || 0,
 practiceSessionsToday: practiceSessionsToday || 0,
 activeUsers7d: uniqueActiveUsers.size,
 };
}

async function getRecentFeedback() {
 const supabase = await createClient();

 if (!supabase) return [];

 const { data } = await supabase
 .from('question_feedback')
 .select('id, question_id, section, feedback_type, status, created_at')
 .order('created_at', { ascending: false })
 .limit(5);

 return data || [];
}

async function getRecentSignups() {
 const supabase = await createClient();

 if (!supabase) return [];

 const { data } = await supabase
 .from('profiles')
 .select('id, email, full_name, created_at')
 .order('created_at', { ascending: false })
 .limit(5);

 return data || [];
}

export default async function AdminOverviewPage() {
 const [stats, recentFeedback, recentSignups] = await Promise.all([
 getStats(),
 getRecentFeedback(),
 getRecentSignups(),
 ]);

 const statCards = [
 {
 name: 'Total Users',
 value: stats.totalUsers,
 icon: UsersIcon,
 href: '/admin/users',
 color: 'bg-blue-500',
 },
 {
 name: 'Pending Feedback',
 value: stats.pendingFeedback,
 icon: FlagIcon,
 href: '/admin/feedback',
 color: 'bg-yellow-500',
 highlight: stats.pendingFeedback > 0,
 },
 {
 name: 'Sessions Today',
 value: stats.practiceSessionsToday,
 icon: BookIcon,
 href: '/admin/analytics',
 color: 'bg-green-500',
 },
 {
 name: 'Active Users (7d)',
 value: stats.activeUsers7d,
 icon: TrendingIcon,
 href: '/admin/analytics',
 color: 'bg-purple-500',
 },
 ];

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
 Admin Dashboard
 </h1>
 <p className="text-[var(--muted)] dark:text-[var(--muted)] mt-1">
 Overview of your Meridian CPA Review platform
 </p>
 </div>

 {/* Stats Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
 {statCards.map((stat) => (
 <Link
 key={stat.name}
 href={stat.href}
 className={`bg-white dark:bg-[var(--card)] rounded-xl border ${
 stat.highlight
 ? 'border-yellow-400 dark:border-yellow-600'
 : 'border-[var(--border)] '
 } p-6 hover:shadow-lg transition-shadow`}
 >
 <div className="flex items-center">
 <div className={`${stat.color} p-3 rounded-lg`}>
 <stat.icon className="h-6 w-6 text-white"/>
 </div>
 <div className="ml-4">
 <p className="text-sm font-medium text-[var(--muted)] dark:text-[var(--muted)]">
 {stat.name}
 </p>
 <p className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
 {stat.value.toLocaleString()}
 </p>
 </div>
 </div>
 </Link>
 ))}
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* Recent Feedback */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white">
 Recent Feedback
 </h2>
 <Link
 href="/admin/feedback"
 className="text-sm text-[var(--primary)] hover:underline"
 >
 View all
 </Link>
 </div>

 {recentFeedback.length === 0 ? (
 <p className="text-[var(--muted)] dark:text-[var(--muted)] text-center py-8">
 No feedback submitted yet
 </p>
 ) : (
 <div className="space-y-3">
 {recentFeedback.map((feedback) => (
 <div
 key={feedback.id}
 className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[var(--card-hover)]/50"
 >
 <div className="flex-1 min-w-0">
 <p className="text-sm font-medium text-[var(--foreground)] dark:text-white truncate">
 {feedback.question_id}
 </p>
 <p className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">
 {feedback.feedback_type} • {feedback.section}
 </p>
 </div>
 <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
 feedback.status === 'pending'
 ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
 : feedback.status === 'resolved'
 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
 : 'bg-gray-100 dark:bg-[var(--border)] text-gray-700 dark:text-[var(--muted-light)]'
 }`}>
 {feedback.status}
 </span>
 </div>
 ))}
 </div>
 )}
 </div>

 {/* Recent Signups */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white">
 Recent Signups
 </h2>
 <Link
 href="/admin/users"
 className="text-sm text-[var(--primary)] hover:underline"
 >
 View all
 </Link>
 </div>

 {recentSignups.length === 0 ? (
 <p className="text-[var(--muted)] dark:text-[var(--muted)] text-center py-8">
 No users yet
 </p>
 ) : (
 <div className="space-y-3">
 {recentSignups.map((user) => (
 <div
 key={user.id}
 className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-[var(--card-hover)]/50"
 >
 <div className="flex items-center min-w-0">
 <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center flex-shrink-0">
 <span className="text-white text-sm font-medium">
 {(user.full_name || user.email || '?')[0].toUpperCase()}
 </span>
 </div>
 <div className="ml-3 min-w-0">
 <p className="text-sm font-medium text-[var(--foreground)] dark:text-white truncate">
 {user.full_name || 'No name'}
 </p>
 <p className="text-xs text-[var(--muted)] dark:text-[var(--muted)] truncate">
 {user.email}
 </p>
 </div>
 </div>
 <span className="text-xs text-[var(--muted)] dark:text-[var(--muted)] whitespace-nowrap ml-2">
 {formatRelativeTime(user.created_at)}
 </span>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>

 {/* Quick Links */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Quick Actions
 </h2>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
 <Link
 href="/admin/feedback?status=pending"
 className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-[var(--card-hover)]/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
 >
 <FlagIcon className="h-6 w-6 text-yellow-500 mb-2"/>
 <span className="text-sm text-[var(--foreground)] dark:text-white">Review Feedback</span>
 </Link>
 <Link
 href="/admin/analytics"
 className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-[var(--card-hover)]/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
 >
 <ChartIcon className="h-6 w-6 text-blue-500 mb-2"/>
 <span className="text-sm text-[var(--foreground)] dark:text-white">View Analytics</span>
 </Link>
 <Link
 href="/admin/questions"
 className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-[var(--card-hover)]/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
 >
 <QuestionIcon className="h-6 w-6 text-purple-500 mb-2"/>
 <span className="text-sm text-[var(--foreground)] dark:text-white">Question Stats</span>
 </Link>
 <Link
 href="/admin/announcements"
 className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-[var(--card-hover)]/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
 >
 <MegaphoneIcon className="h-6 w-6 text-green-500 mb-2"/>
 <span className="text-sm text-[var(--foreground)] dark:text-white">Send Announcement</span>
 </Link>
 </div>
 </div>
 </div>
 );
}

function formatRelativeTime(dateString: string): string {
 const date = new Date(dateString);
 const now = new Date();
 const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

 if (diffInSeconds < 60) return 'Just now';
 if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
 if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
 if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
 return date.toLocaleDateString();
}

// Icons
function UsersIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>
 </svg>
 );
}

function FlagIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"/>
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

function TrendingIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/>
 </svg>
 );
}

function ChartIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
 </svg>
 );
}

function QuestionIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>
 </svg>
 );
}

function MegaphoneIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"/>
 </svg>
 );
}
