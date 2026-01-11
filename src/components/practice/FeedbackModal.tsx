'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

interface FeedbackModalProps {
 isOpen: boolean;
 onClose: () => void;
 questionId: string;
 section: string;
}

type FeedbackType = 'wrong_answer' | 'unclear' | 'outdated' | 'typo' | 'other';

const feedbackTypes: { value: FeedbackType; label: string; description: string }[] = [
 { value: 'wrong_answer', label: 'Wrong Answer', description: 'The marked correct answer is incorrect' },
 { value: 'unclear', label: 'Unclear Question', description: 'The question or options are confusing' },
 { value: 'outdated', label: 'Outdated Content', description: 'Information no longer reflects current standards' },
 { value: 'typo', label: 'Typo/Grammar', description: 'Spelling or grammatical error' },
 { value: 'other', label: 'Other', description: 'Other issue not listed above' },
];

export default function FeedbackModal({
 isOpen,
 onClose,
 questionId,
 section,
}: FeedbackModalProps) {
 const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
 const [comment, setComment] = useState('');
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
 const [errorMessage, setErrorMessage] = useState('');

 // Reset form when modal opens
 useEffect(() => {
 if (isOpen) {
 setFeedbackType(null);
 setComment('');
 setSubmitStatus('idle');
 setErrorMessage('');
 }
 }, [isOpen]);

 // Close on escape key
 useEffect(() => {
 const handleEscape = (e: KeyboardEvent) => {
 if (e.key === 'Escape') onClose();
 };

 if (isOpen) {
 document.addEventListener('keydown', handleEscape);
 document.body.style.overflow = 'hidden';
 }

 return () => {
 document.removeEventListener('keydown', handleEscape);
 document.body.style.overflow = 'unset';
 };
 }, [isOpen, onClose]);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();

 if (!feedbackType) {
 setErrorMessage('Please select a feedback type');
 return;
 }

 setIsSubmitting(true);
 setErrorMessage('');

 try {
 const supabase = createClient();
 if (!supabase) {
 setErrorMessage('Unable to connect to server');
 setIsSubmitting(false);
 return;
 }

 const { data: { user } } = await supabase.auth.getUser();

 if (!user) {
 setErrorMessage('Please log in to submit feedback');
 setIsSubmitting(false);
 return;
 }

 const response = await fetch('/api/feedback', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 questionId,
 section,
 feedbackType,
 comment: comment.trim() || null,
 }),
 });

 if (!response.ok) {
 const data = await response.json();
 throw new Error(data.error || 'Failed to submit feedback');
 }

 setSubmitStatus('success');

 // Auto-close after success
 setTimeout(() => {
 onClose();
 }, 2000);
 } catch (error) {
 setErrorMessage(error instanceof Error ? error.message : 'Failed to submit feedback');
 setSubmitStatus('error');
 } finally {
 setIsSubmitting(false);
 }
 };

 if (!isOpen) return null;

 return (
 <div className="fixed inset-0 z-50 flex items-center justify-center">
 {/* Backdrop */}
 <div
 className="absolute inset-0 bg-black/50 backdrop-blur-sm"
 onClick={onClose}
 />

 {/* Modal */}
 <div className="relative w-full max-w-md mx-4 bg-white dark:bg-[var(--card)] rounded-xl shadow-2xl overflow-hidden">
 {/* Header */}
 <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
 <h2 className="text-lg font-semibold text-[var(--foreground)] dark:text-white">
 Report Question Issue
 </h2>
 <button
 onClick={onClose}
 className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
 >
 <XIcon className="w-5 h-5 text-[var(--muted)] dark:text-[var(--muted)]"/>
 </button>
 </div>

 {/* Content */}
 {submitStatus === 'success' ? (
 <div className="p-6 text-center">
 <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
 <CheckIcon className="w-8 h-8 text-green-600 dark:text-green-400"/>
 </div>
 <h3 className="text-lg font-semibold text-[var(--foreground)] dark:text-white mb-2">
 Thank You!
 </h3>
 <p className="text-[var(--muted)] dark:text-[var(--muted)]">
 Your feedback has been submitted. We&apos;ll review it shortly.
 </p>
 </div>
 ) : (
 <form onSubmit={handleSubmit} className="p-6">
 <p className="text-sm text-[var(--muted)] dark:text-[var(--muted)] mb-4">
 Question ID: <span className="font-mono text-xs">{questionId}</span>
 </p>

 {/* Feedback Type Selection */}
 <div className="space-y-2 mb-4">
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-2">
 What&apos;s the issue?
 </label>
 {feedbackTypes.map((type) => (
 <label
 key={type.value}
 className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
 feedbackType === type.value
 ? 'border-[var(--primary)] bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10'
 : 'border-[var(--border)] dark:border-[var(--border)] hover:border-[var(--primary)]/50'
 }`}
 >
 <input
 type="radio"
 name="feedbackType"
 value={type.value}
 checked={feedbackType === type.value}
 onChange={(e) => setFeedbackType(e.target.value as FeedbackType)}
 className="mt-1 accent-[var(--primary)]"
 />
 <div>
 <span className="block font-medium text-[var(--foreground)] dark:text-white">
 {type.label}
 </span>
 <span className="text-sm text-[var(--muted)] dark:text-[var(--muted)]">
 {type.description}
 </span>
 </div>
 </label>
 ))}
 </div>

 {/* Comment */}
 <div className="mb-4">
 <label className="block text-sm font-medium text-[var(--foreground)] dark:text-white mb-2">
 Additional details (optional)
 </label>
 <textarea
 value={comment}
 onChange={(e) => setComment(e.target.value)}
 placeholder="Please provide any additional context..."
 rows={3}
 className="w-full px-3 py-2 rounded-lg border border-[var(--border)] dark:border-[var(--border)]
 bg-white dark:bg-[var(--card-hover)]
 text-[var(--foreground)] dark:text-white
 placeholder:text-[var(--muted)] dark:placeholder:text-gray-400
 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50
 resize-none"
 />
 </div>

 {/* Error Message */}
 {errorMessage && (
 <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
 <p className="text-sm text-red-600 dark:text-red-400">{errorMessage}</p>
 </div>
 )}

 {/* Actions */}
 <div className="flex gap-3">
 <button
 type="button"
 onClick={onClose}
 className="flex-1 px-4 py-2 rounded-lg font-medium
 border border-[var(--border)] dark:border-[var(--border)]
 text-[var(--foreground)] dark:text-white
 hover:bg-gray-50 dark:hover:bg-gray-700
 transition-colors"
 >
 Cancel
 </button>
 <button
 type="submit"
 disabled={isSubmitting || !feedbackType}
 className="flex-1 px-4 py-2 rounded-lg font-medium
 bg-[var(--primary)] text-white
 hover:bg-[var(--primary-dark)]
 disabled:opacity-50 disabled:cursor-not-allowed
 transition-colors flex items-center justify-center gap-2"
 >
 {isSubmitting ? (
 <>
 <LoadingSpinner className="w-4 h-4"/>
 Submitting...
 </>
 ) : (
 'Submit Feedback'
 )}
 </button>
 </div>
 </form>
 )}
 </div>
 </div>
 );
}

function XIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={2}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M6 18L18 6M6 6l12 12"/>
 </svg>
 );
}

function CheckIcon({ className = '' }: { className?: string }) {
 return (
 <svg className={className} fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth={2}>
 <path strokeLinecap="round"strokeLinejoin="round"d="M5 13l4 4L19 7"/>
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
