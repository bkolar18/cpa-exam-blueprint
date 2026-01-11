'use client';

import { useState, useEffect } from 'react';

interface Announcement {
 id: string;
 subject: string;
 body: string;
 recipients: string;
 recipient_count: number;
 sent_at: string;
 sent_by: string;
}

export default function AnnouncementsPage() {
 const [announcements, setAnnouncements] = useState<Announcement[]>([]);
 const [loading, setLoading] = useState(true);
 const [sending, setSending] = useState(false);

 const [subject, setSubject] = useState('');
 const [body, setBody] = useState('');
 const [recipients, setRecipients] = useState('all');
 const [showPreview, setShowPreview] = useState(false);
 const [recipientCount, setRecipientCount] = useState(0);

 useEffect(() => {
 fetchAnnouncements();
 fetchRecipientCount();
 }, [recipients]);

 const fetchAnnouncements = async () => {
 setLoading(true);
 try {
 const response = await fetch('/api/admin/announcements');
 if (response.ok) {
 const data = await response.json();
 setAnnouncements(data.announcements || []);
 }
 } catch (error) {
 console.error('Error fetching announcements:', error);
 } finally {
 setLoading(false);
 }
 };

 const fetchRecipientCount = async () => {
 try {
 const response = await fetch(`/api/admin/announcements/count?recipients=${recipients}`);
 if (response.ok) {
 const data = await response.json();
 setRecipientCount(data.count || 0);
 }
 } catch (error) {
 console.error('Error fetching recipient count:', error);
 }
 };

 const handleSend = async () => {
 if (!subject.trim() || !body.trim()) {
 alert('Please fill in both subject and body');
 return;
 }

 if (!confirm(`Are you sure you want to send this announcement to ${recipientCount} users?`)) {
 return;
 }

 setSending(true);
 try {
 const response = await fetch('/api/admin/announcements', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ subject, body, recipients }),
 });

 if (response.ok) {
 setSubject('');
 setBody('');
 setShowPreview(false);
 fetchAnnouncements();
 alert('Announcement sent successfully!');
 } else {
 const data = await response.json();
 alert(data.error || 'Failed to send announcement');
 }
 } catch (error) {
 console.error('Error sending announcement:', error);
 alert('Failed to send announcement');
 } finally {
 setSending(false);
 }
 };

 return (
 <div className="space-y-6">
 <div>
 <h1 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">
 Announcements
 </h1>
 <p className="text-[var(--muted)] dark:text-[var(--muted)] mt-1">
 Send email announcements to users
 </p>
 </div>

 {/* Compose Form */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Compose Announcement
 </h2>

 <div className="space-y-4">
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
 Recipients
 </label>
 <select
 value={recipients}
 onChange={(e) => setRecipients(e.target.value)}
 className="w-full px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white"
 >
 <option value="all">All Users ({recipientCount})</option>
 <option value="free">Free Tier Only</option>
 <option value="paid">Paid Users Only</option>
 <option value="inactive">Inactive Users (no activity in 30 days)</option>
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
 Subject
 </label>
 <input
 type="text"
 value={subject}
 onChange={(e) => setSubject(e.target.value)}
 placeholder="Enter email subject..."
 className="w-full px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white placeholder:text-[var(--muted)] dark:placeholder:text-gray-500"
 />
 </div>

 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-1">
 Message Body
 </label>
 <textarea
 value={body}
 onChange={(e) => setBody(e.target.value)}
 placeholder="Write your announcement message... (Markdown supported)"
 rows={8}
 className="w-full px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] dark:text-white placeholder:text-[var(--muted)] dark:placeholder:text-gray-500 resize-none font-mono text-sm"
 />
 <p className="text-xs text-[var(--muted)] dark:text-[var(--muted)] mt-1">
 Supports basic Markdown: **bold**, *italic*, [links](url), bullet lists
 </p>
 </div>

 <div className="flex flex-wrap gap-4">
 <button
 onClick={() => setShowPreview(!showPreview)}
 className="px-4 py-2 border border-[var(--border)] dark:border-[var(--border)] text-[var(--foreground)] dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
 >
 {showPreview ? 'Hide Preview' : 'Show Preview'}
 </button>
 <button
 onClick={handleSend}
 disabled={sending || !subject.trim() || !body.trim()}
 className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
 >
 {sending ? (
 <>
 <LoadingSpinner className="h-4 w-4"/>
 Sending...
 </>
 ) : (
 <>
 <SendIcon className="h-4 w-4"/>
 Send to {recipientCount} Users
 </>
 )}
 </button>
 </div>
 </div>

 {/* Preview */}
 {showPreview && (
 <div className="mt-6 border-t border-[var(--border)] pt-6">
 <h3 className="text-sm font-semibold text-[var(--muted)] dark:text-[var(--muted)] uppercase mb-3">
 Email Preview
 </h3>
 <div className="bg-gray-50 dark:bg-[var(--card-hover)]/50 rounded-lg p-4">
 <div className="mb-4 pb-4 border-b border-[var(--border)] dark:border-[var(--border)]">
 <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">
 <strong>From:</strong> Meridian CPA Review &lt;noreply@meridian-cpa-review.com&gt;
 </p>
 <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">
 <strong>To:</strong> {recipientCount} recipients
 </p>
 <p className="text-sm text-[var(--foreground)] dark:text-white mt-2">
 <strong>Subject:</strong> {subject || '(No subject)'}
 </p>
 </div>
 <div className="prose dark:prose-invert prose-sm max-w-none">
 {body ? (
 <div className="whitespace-pre-wrap text-[var(--foreground)] dark:text-white">
 {body}
 </div>
 ) : (
 <p className="text-[var(--muted)] dark:text-[var(--muted)] italic">(No message body)</p>
 )}
 </div>
 </div>
 </div>
 )}
 </div>

 {/* Previous Announcements */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-4">
 Previous Announcements
 </h2>

 {loading ? (
 <div className="text-center py-8">
 <LoadingSpinner className="h-8 w-8 mx-auto text-[var(--primary)]"/>
 </div>
 ) : announcements.length === 0 ? (
 <div className="text-center py-8">
 <MegaphoneIcon className="h-12 w-12 mx-auto text-[var(--muted)] dark:text-gray-600 mb-4"/>
 <p className="text-[var(--muted)] dark:text-[var(--muted)]">No announcements sent yet</p>
 </div>
 ) : (
 <div className="space-y-4">
 {announcements.map((announcement) => (
 <div
 key={announcement.id}
 className="p-4 rounded-lg bg-gray-50 dark:bg-[var(--card-hover)]/50"
 >
 <div className="flex items-start justify-between">
 <div>
 <h3 className="font-medium text-[var(--foreground)] dark:text-white">
 {announcement.subject}
 </h3>
 <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)] mt-1 line-clamp-2">
 {announcement.body}
 </p>
 </div>
 <div className="text-right text-sm">
 <p className="text-[var(--foreground)] dark:text-white">
 {announcement.recipient_count} recipients
 </p>
 <p className="text-[var(--muted)] dark:text-[var(--muted)]">
 {new Date(announcement.sent_at).toLocaleDateString()}
 </p>
 </div>
 </div>
 </div>
 ))}
 </div>
 )}
 </div>
 </div>
 );
}

// Icons
function SendIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={2}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
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
