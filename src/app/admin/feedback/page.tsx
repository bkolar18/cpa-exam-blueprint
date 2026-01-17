'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface Feedback {
 id: string;
 question_id: string;
 section: string;
 feedback_type: string;
 comment: string | null;
 status: string;
 admin_notes: string | null;
 created_at: string;
 user_id?: string;
 profiles?: {
  email: string;
  full_name: string | null;
 } | null;
}

const feedbackTypeLabels: Record<string, string> = {
 wrong_answer: 'Wrong Answer',
 unclear: 'Unclear Question',
 outdated: 'Outdated Content',
 typo: 'Typo/Grammar',
 other: 'Other',
};

const statusColors: Record<string, string> = {
 pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
 reviewed: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
 resolved: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
 dismissed: 'bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)]',
};

export default function FeedbackManagementPage() {
 const searchParams = useSearchParams();
 const [feedback, setFeedback] = useState<Feedback[]>([]);
 const [loading, setLoading] = useState(true);
 const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
 const [filterStatus, setFilterStatus] = useState(searchParams?.get('status') || 'all');
 const [filterSection, setFilterSection] = useState('all');
 const [filterType, setFilterType] = useState('all');
 const [expandedId, setExpandedId] = useState<string | null>(null);
 const [adminNotes, setAdminNotes] = useState<Record<string, string>>({});
 const [updating, setUpdating] = useState<string | null>(null);

 useEffect(() => {
 fetchFeedback();
 }, [filterStatus, filterSection, filterType]);

 const fetchFeedback = async () => {
 setLoading(true);
 try {
 const params = new URLSearchParams();
 if (filterStatus !== 'all') params.set('status', filterStatus);
 if (filterSection !== 'all') params.set('section', filterSection);
 if (filterType !== 'all') params.set('type', filterType);

 const response = await fetch(`/api/admin/feedback?${params}`);
 if (response.ok) {
 const data = await response.json();
 setFeedback(data.feedback || []);
 }
 } catch (error) {
 console.error('Error fetching feedback:', error);
 } finally {
 setLoading(false);
 }
 };

 const updateStatus = async (id: string, status: string) => {
 setUpdating(id);
 try {
 const response = await fetch(`/api/admin/feedback/${id}`, {
 method: 'PATCH',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ status, admin_notes: adminNotes[id] }),
 });

 if (response.ok) {
 setFeedback(prev =>
 prev.map(f => (f.id === id ? { ...f, status, admin_notes: adminNotes[id] || f.admin_notes } : f))
 );
 }
 } catch (error) {
 console.error('Error updating feedback:', error);
 } finally {
 setUpdating(null);
 }
 };

 const bulkUpdateStatus = async (status: string) => {
 if (selectedIds.size === 0) return;

 try {
 const response = await fetch('/api/admin/feedback/bulk', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ ids: Array.from(selectedIds), status }),
 });

 if (response.ok) {
 setFeedback(prev =>
 prev.map(f => (selectedIds.has(f.id) ? { ...f, status } : f))
 );
 setSelectedIds(new Set());
 }
 } catch (error) {
 console.error('Error bulk updating:', error);
 }
 };

 const exportToCSV = () => {
 const headers = ['ID', 'Question ID', 'Section', 'Type', 'Comment', 'Status', 'Admin Notes', 'Created At'];
 const rows = feedback.map(f => [
 f.id,
 f.question_id,
 f.section,
 f.feedback_type,
 f.comment || '',
 f.status,
 f.admin_notes || '',
 new Date(f.created_at).toISOString(),
 ]);

 const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
 const blob = new Blob([csv], { type: 'text/csv' });
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = `feedback-export-${new Date().toISOString().split('T')[0]}.csv`;
 a.click();
 };

 const toggleSelectAll = () => {
 if (selectedIds.size === feedback.length) {
 setSelectedIds(new Set());
 } else {
 setSelectedIds(new Set(feedback.map(f => f.id)));
 }
 };

 const toggleSelect = (id: string) => {
 const newSelected = new Set(selectedIds);
 if (newSelected.has(id)) {
 newSelected.delete(id);
 } else {
 newSelected.add(id);
 }
 setSelectedIds(newSelected);
 };

 const sections = ['FAR', 'AUD', 'REG', 'TCP'];

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
 <div>
 <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
 Feedback Management
 </h1>
 <p className="text-[var(--muted)] dark:text-[var(--muted)] mt-1">
 Review and manage user-reported question issues
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
 Status
 </label>
 <select
 value={filterStatus}
 onChange={(e) => setFilterStatus(e.target.value)}
 className="px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white"
 >
 <option value="all">All Statuses</option>
 <option value="pending">Pending</option>
 <option value="reviewed">Reviewed</option>
 <option value="resolved">Resolved</option>
 <option value="dismissed">Dismissed</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
 Section
 </label>
 <select
 value={filterSection}
 onChange={(e) => setFilterSection(e.target.value)}
 className="px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white"
 >
 <option value="all">All Sections</option>
 {sections.map((s) => (
 <option key={s} value={s}>{s}</option>
 ))}
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
 Type
 </label>
 <select
 value={filterType}
 onChange={(e) => setFilterType(e.target.value)}
 className="px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white"
 >
 <option value="all">All Types</option>
 {Object.entries(feedbackTypeLabels).map(([value, label]) => (
 <option key={value} value={value}>{label}</option>
 ))}
 </select>
 </div>
 </div>
 </div>

 {/* Bulk Actions */}
 {selectedIds.size > 0 && (
 <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 flex flex-wrap items-center gap-4">
 <span className="text-sm text-blue-700 dark:text-blue-300">
 {selectedIds.size} item{selectedIds.size > 1 ? 's' : ''} selected
 </span>
 <div className="flex gap-2">
 <button
 onClick={() => bulkUpdateStatus('reviewed')}
 className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
 >
 Mark Reviewed
 </button>
 <button
 onClick={() => bulkUpdateStatus('resolved')}
 className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
 >
 Mark Resolved
 </button>
 <button
 onClick={() => bulkUpdateStatus('dismissed')}
 className="px-3 py-1.5 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600"
 >
 Dismiss
 </button>
 </div>
 <button
 onClick={() => setSelectedIds(new Set())}
 className="text-sm text-blue-600 dark:text-blue-400 hover:underline ml-auto"
 >
 Clear selection
 </button>
 </div>
 )}

 {/* Feedback Table */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
 {loading ? (
 <div className="p-8 text-center">
 <LoadingSpinner className="h-8 w-8 mx-auto text-[var(--primary)]"/>
 <p className="mt-2 text-[var(--muted)] dark:text-[var(--muted)]">Loading feedback...</p>
 </div>
 ) : feedback.length === 0 ? (
 <div className="p-8 text-center">
 <FlagIcon className="h-12 w-12 mx-auto text-[var(--muted)] dark:text-gray-600 mb-4"/>
 <p className="text-[var(--muted)] dark:text-[var(--muted)]">No feedback found</p>
 </div>
 ) : (
 <div className="overflow-x-auto">
 <table className="w-full">
 <thead className="bg-gray-50 dark:bg-[var(--card-hover)]/50">
 <tr>
 <th className="px-4 py-3 text-left">
 <input
 type="checkbox"
 checked={selectedIds.size === feedback.length}
 onChange={toggleSelectAll}
 className="rounded border-gray-300 dark:border-[var(--border)]"
 />
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Question
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Type
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Status
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Submitted By
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Date
 </th>
 <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase tracking-wider">
 Actions
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-[var(--border)] dark:divide-[var(--border)]">
 {feedback.map((item) => (
 <>
 <tr
 key={item.id}
 className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
 expandedId === item.id ? 'bg-gray-50 dark:bg-[var(--card-hover)]/50' : ''
 }`}
 >
 <td className="px-4 py-3">
 <input
 type="checkbox"
 checked={selectedIds.has(item.id)}
 onChange={() => toggleSelect(item.id)}
 className="rounded border-gray-300 dark:border-[var(--border)]"
 />
 </td>
 <td className="px-4 py-3">
 <button
 onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
 className="text-left"
 >
 <div className="font-medium text-[var(--foreground)] dark:text-white">
 {item.question_id}
 </div>
 <div className="text-xs text-[var(--muted)] dark:text-[var(--muted)]">
 {item.section}
 </div>
 </button>
 </td>
 <td className="px-4 py-3 text-sm text-[var(--foreground)] dark:text-white">
 {feedbackTypeLabels[item.feedback_type] || item.feedback_type}
 </td>
 <td className="px-4 py-3">
 <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[item.status]}`}>
 {item.status}
 </span>
 </td>
 <td className="px-4 py-3 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
 {item.profiles?.email || 'Unknown'}
 </td>
 <td className="px-4 py-3 text-sm text-[var(--muted)] dark:text-[var(--muted)]">
 {new Date(item.created_at).toLocaleDateString()}
 </td>
 <td className="px-4 py-3">
 <div className="flex items-center gap-2">
 <button
 onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
 className="p-1 text-[var(--muted)] dark:text-[var(--muted)] hover:text-[var(--foreground)] dark:hover:text-white"
 >
 <ChevronIcon className={`h-5 w-5 transition-transform ${expandedId === item.id ? 'rotate-180' : ''}`} />
 </button>
 </div>
 </td>
 </tr>
 {expandedId === item.id && (
 <tr key={`${item.id}-expanded`}>
 <td colSpan={7} className="px-4 py-4 bg-gray-50 dark:bg-[var(--card-hover)]/30">
 <div className="space-y-4">
 {item.comment && (
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
 User Comment
 </label>
 <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)] bg-white dark:bg-[var(--card)] p-3 rounded-lg border border-[var(--border)] dark:border-[var(--border)]">
 {item.comment}
 </p>
 </div>
 )}

 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
 Admin Notes
 </label>
 <textarea
 value={adminNotes[item.id] ?? item.admin_notes ?? ''}
 onChange={(e) => setAdminNotes({ ...adminNotes, [item.id]: e.target.value })}
 placeholder="Add notes about this feedback..."
 rows={2}
 className="w-full px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card)] text-[var(--foreground)] dark:text-white placeholder:text-[var(--muted)] dark:placeholder:text-gray-500 resize-none"
 />
 </div>

 <div className="flex flex-wrap gap-2">
 <button
 onClick={() => updateStatus(item.id, 'reviewed')}
 disabled={updating === item.id}
 className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
 >
 Mark Reviewed
 </button>
 <button
 onClick={() => updateStatus(item.id, 'resolved')}
 disabled={updating === item.id}
 className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
 >
 Mark Resolved
 </button>
 <button
 onClick={() => updateStatus(item.id, 'dismissed')}
 disabled={updating === item.id}
 className="px-3 py-1.5 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
 >
 Dismiss
 </button>
 <span className="text-sm text-[var(--muted)] dark:text-[var(--muted)] flex items-center ml-auto">
 Edit question: <code className="ml-1 px-2 py-0.5 bg-gray-200 dark:bg-[var(--card-hover)] rounded text-xs">node scripts/question-editor.js edit {item.question_id}</code>
 </span>
 </div>
 </div>
 </td>
 </tr>
 )}
 </>
 ))}
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

function FlagIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={1.5}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"/>
 </svg>
 );
}

function ChevronIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={2}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M19 9l-7 7-7-7"/>
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
