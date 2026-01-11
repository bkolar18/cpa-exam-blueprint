'use client';

import { useState, useEffect } from 'react';

interface ActivityLog {
 id: string;
 actor_id: string | null;
 actor_email: string | null;
 action_type: string;
 target_type: string | null;
 target_id: string | null;
 details: Record<string, unknown> | null;
 ip_address: string | null;
 created_at: string;
}

const actionTypeLabels: Record<string, { label: string; color: string }> = {
 admin_login: { label: 'Admin Login', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
 feedback_updated: { label: 'Feedback Updated', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
 feedback_bulk_updated: { label: 'Bulk Feedback Update', color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
 user_created: { label: 'User Created', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' },
 user_updated: { label: 'User Updated', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
 export: { label: 'Data Export', color: 'bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)]' },
 announcement_sent: { label: 'Announcement Sent', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' },
 subscription_changed: { label: 'Subscription Changed', color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' },
};

export default function ActivityLogPage() {
 const [logs, setLogs] = useState<ActivityLog[]>([]);
 const [loading, setLoading] = useState(true);
 const [filterAction, setFilterAction] = useState('all');
 const [dateRange, setDateRange] = useState('7d');

 useEffect(() => {
 fetchLogs();
 }, [filterAction, dateRange]);

 const fetchLogs = async () => {
 setLoading(true);
 try {
 const params = new URLSearchParams();
 if (filterAction !== 'all') params.set('action', filterAction);
 params.set('range', dateRange);

 const response = await fetch(`/api/admin/activity?${params}`);
 if (response.ok) {
 const data = await response.json();
 setLogs(data.logs || []);
 }
 } catch (error) {
 console.error('Error fetching activity logs:', error);
 } finally {
 setLoading(false);
 }
 };

 const exportToCSV = () => {
 const headers = ['ID', 'Timestamp', 'Actor', 'Action', 'Target Type', 'Target ID', 'Details', 'IP Address'];
 const rows = logs.map(log => [
 log.id,
 new Date(log.created_at).toISOString(),
 log.actor_email || 'System',
 log.action_type,
 log.target_type || '',
 log.target_id || '',
 JSON.stringify(log.details || {}),
 log.ip_address || '',
 ]);

 const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');
 const blob = new Blob([csv], { type: 'text/csv' });
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = `activity-log-${new Date().toISOString().split('T')[0]}.csv`;
 a.click();
 };

 const formatDetails = (details: Record<string, unknown> | null): string => {
 if (!details) return '';
 const entries = Object.entries(details);
 if (entries.length === 0) return '';
 return entries.map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ');
 };

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
 Activity Log
 </h1>
 <p className="text-[var(--muted)] dark:text-[var(--muted)] mt-1">
 Audit trail of admin and system actions
 </p>
 </div>
 <button
 onClick={exportToCSV}
 className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors flex items-center gap-2"
 >
 <DownloadIcon className="h-4 w-4"/>
 Export CSV
 </button>
 </div>

 {/* Filters */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
 <div className="flex flex-wrap gap-4">
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
 Action Type
 </label>
 <select
 value={filterAction}
 onChange={(e) => setFilterAction(e.target.value)}
 className="px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white"
 >
 <option value="all">All Actions</option>
 {Object.entries(actionTypeLabels).map(([value, { label }]) => (
 <option key={value} value={value}>{label}</option>
 ))}
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
 Date Range
 </label>
 <select
 value={dateRange}
 onChange={(e) => setDateRange(e.target.value)}
 className="px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white"
 >
 <option value="1d">Last 24 hours</option>
 <option value="7d">Last 7 days</option>
 <option value="30d">Last 30 days</option>
 <option value="90d">Last 90 days</option>
 <option value="all">All time</option>
 </select>
 </div>
 </div>
 </div>

 {/* Activity Table */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
 {loading ? (
 <div className="p-8 text-center">
 <LoadingSpinner className="h-8 w-8 mx-auto text-[var(--primary)]"/>
 <p className="mt-2 text-[var(--muted)] dark:text-[var(--muted)]">Loading activity logs...</p>
 </div>
 ) : logs.length === 0 ? (
 <div className="p-8 text-center">
 <ListIcon className="h-12 w-12 mx-auto text-[var(--muted)] dark:text-gray-600 mb-4"/>
 <p className="text-[var(--muted)] dark:text-[var(--muted)]">No activity logs found</p>
 </div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-gray-50 dark:bg-[var(--card-hover)]/50">
 <tr>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Timestamp
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Actor
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Action
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Target
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Details
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-[var(--border)] dark:divide-[var(--border)]">
 {logs.map((log) => {
 const actionInfo = actionTypeLabels[log.action_type] || {
 label: log.action_type,
 color: 'bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)]',
 };

 return (
 <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
 <td className="px-4 py-3">
 <div className="text-sm text-[var(--foreground)] dark:text-white">
 {new Date(log.created_at).toLocaleDateString()}
 </div>
 <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">
 {new Date(log.created_at).toLocaleTimeString()}
 </div>
 </td>
 <td className="px-4 py-3">
 <div className="text-sm text-[var(--foreground)] dark:text-white">
 {log.actor_email || 'System'}
 </div>
 {log.ip_address && (
 <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)] font-mono">
 {log.ip_address}
 </div>
 )}
 </td>
 <td className="px-4 py-3">
 <span className={`px-2 py-1 text-xs font-medium rounded-full ${actionInfo.color}`}>
 {actionInfo.label}
 </span>
 </td>
 <td className="px-4 py-3">
 {log.target_type && (
 <div className="text-sm text-[var(--foreground)] dark:text-white capitalize">
 {log.target_type}
 </div>
 )}
 {log.target_id && (
 <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)] font-mono truncate max-w-[150px]">
 {log.target_id}
 </div>
 )}
 </td>
 <td className="px-4 py-3">
 <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)] max-w-[200px] truncate"title={formatDetails(log.details)}>
 {formatDetails(log.details) || '-'}
 </div>
 </td>
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>
 )}
 </div>
 </div>
 );
}

// Icons
function DownloadIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={2}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
 </svg>
 );
}

function ListIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
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
