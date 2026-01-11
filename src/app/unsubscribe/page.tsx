'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function UnsubscribeContent() {
 const searchParams = useSearchParams();
 const success = searchParams.get('success') === 'true';
 const error = searchParams.get('error');

 const [email, setEmail] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setIsSubmitting(true);
 setMessage(null);

 try {
 const response = await fetch('/api/email/unsubscribe', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email }),
 });

 const data = await response.json();

 if (response.ok) {
 setMessage({ type: 'success', text: data.message });
 setEmail('');
 } else {
 setMessage({ type: 'error', text: data.error || 'Something went wrong' });
 }
 } catch {
 setMessage({ type: 'error', text: 'Failed to process request. Please try again.' });
 } finally {
 setIsSubmitting(false);
 }
 };

 // Show success message if redirected from one-click unsubscribe
 if (success) {
 return (
 <div className="min-h-screen bg-gray-50 dark:bg-[var(--background)] flex items-center justify-center p-4">
 <div className="max-w-md w-full bg-white dark:bg-[var(--card)] rounded-xl shadow-lg p-8 text-center">
 <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
 <svg className="w-8 h-8 text-green-600 dark:text-green-400"fill="none"viewBox="0 0 24 24"stroke="currentColor">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 </div>
 <h1 className="text-2xl font-bold text-gray-800 dark:text-[var(--foreground)] mb-4">
 Unsubscribed Successfully
 </h1>
 <p className="text-gray-600 dark:text-[var(--muted)] mb-6">
 You&apos;ve been removed from our email list. We&apos;re sorry to see you go!
 </p>
 <p className="text-sm text-gray-500 dark:text-[var(--muted)] mb-8">
 You can still access your account and use all Meridian CPA Review features.
 You just won&apos;t receive study tips and reminders via email.
 </p>
 <Link
 href="/"
 className="inline-block px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
 >
 Return to Home
 </Link>
 </div>
 </div>
 );
 }

 // Show error if any
 if (error) {
 return (
 <div className="min-h-screen bg-gray-50 dark:bg-[var(--background)] flex items-center justify-center p-4">
 <div className="max-w-md w-full bg-white dark:bg-[var(--card)] rounded-xl shadow-lg p-8 text-center">
 <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
 <svg className="w-8 h-8 text-red-600 dark:text-red-400"fill="none"viewBox="0 0 24 24"stroke="currentColor">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </div>
 <h1 className="text-2xl font-bold text-gray-800 dark:text-[var(--foreground)] mb-4">
 Something Went Wrong
 </h1>
 <p className="text-gray-600 dark:text-[var(--muted)] mb-6">
 We couldn&apos;t process your unsubscribe request. Please try again below.
 </p>
 </div>
 </div>
 );
 }

 // Default: show unsubscribe form
 return (
 <div className="min-h-screen bg-gray-50 dark:bg-[var(--background)] flex items-center justify-center p-4">
 <div className="max-w-md w-full bg-white dark:bg-[var(--card)] rounded-xl shadow-lg p-8">
 <h1 className="text-2xl font-bold text-gray-800 dark:text-[var(--foreground)] mb-2 text-center">
 Unsubscribe
 </h1>
 <p className="text-gray-600 dark:text-[var(--muted)] mb-6 text-center">
 Enter your email address to unsubscribe from our mailing list.
 </p>

 {message && (
 <div
 className={`p-4 rounded-lg mb-6 ${
 message.type === 'success'
 ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
 : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
 }`}
 >
 {message.text}
 </div>
 )}

 <form onSubmit={handleSubmit}>
 <div className="mb-4">
 <label
 htmlFor="email"
 className="block text-sm font-medium text-gray-700 dark:text-[var(--muted-light)] mb-2"
 >
 Email Address
 </label>
 <input
 type="email"
 id="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 placeholder="you@example.com"
 className="w-full px-4 py-3 border border-gray-300 dark:border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-white dark:bg-[var(--card-hover)] text-gray-900 dark:text-[var(--foreground)]"
 />
 </div>

 <button
 type="submit"
 disabled={isSubmitting}
 className="w-full py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
 >
 {isSubmitting ? 'Processing...' : 'Unsubscribe'}
 </button>
 </form>

 <p className="text-xs text-gray-500 dark:text-[var(--muted)] mt-6 text-center">
 This will only unsubscribe you from marketing emails. You&apos;ll still receive
 important account notifications.
 </p>

 <div className="mt-8 pt-6 border-t border-gray-200 text-center">
 <Link
 href="/"
 className="text-[var(--primary)] hover:underline text-sm"
 >
 Return to Meridian CPA Review
 </Link>
 </div>
 </div>
 </div>
 );
}

export default function UnsubscribePage() {
 return (
 <Suspense fallback={
 <div className="min-h-screen bg-gray-50 dark:bg-[var(--background)] flex items-center justify-center">
 <div className="text-gray-500">Loading...</div>
 </div>
 }>
 <UnsubscribeContent />
 </Suspense>
 );
}
