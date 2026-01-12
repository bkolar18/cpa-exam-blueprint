'use client';

import { useState } from 'react';
import FeedbackModal from './FeedbackModal';

interface FeedbackButtonProps {
 questionId: string;
 section: string;
 variant?: 'default' | 'compact' | 'text';
 className?: string;
}

export default function FeedbackButton({
 questionId,
 section,
 variant = 'default',
 className = '',
}: FeedbackButtonProps) {
 const [isModalOpen, setIsModalOpen] = useState(false);

 const baseStyles = {
 default: `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg
 border border-[var(--border)] dark:border-[var(--border)]
 text-[var(--muted)] dark:text-[var(--muted)]
 hover:text-red-600 dark:hover:text-red-400
 hover:border-red-300 dark:hover:border-red-500
 hover:bg-red-50 dark:hover:bg-red-900/20
 transition-colors`,
 compact: `flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded
 text-[var(--muted)] dark:text-[var(--muted)]
 hover:text-red-600 dark:hover:text-red-400
 hover:bg-red-50 dark:hover:bg-red-900/20
 transition-colors`,
 text: `flex items-center gap-1.5 text-sm
 text-[var(--muted)] dark:text-[var(--muted)]
 hover:text-red-600 dark:hover:text-red-400
 transition-colors`,
 };

 return (
 <>
 <button
 onClick={() => setIsModalOpen(true)}
 className={`${baseStyles[variant]} ${className}`}
 title="Report an issue with this question"
 >
 <WarningIcon className={variant === 'compact' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
 {variant !== 'compact' && <span>Report Issue</span>}
 </button>

 <FeedbackModal
 isOpen={isModalOpen}
 onClose={() => setIsModalOpen(false)}
 questionId={questionId}
 section={section}
 />
 </>
 );
}

function WarningIcon({ className = '' }: { className?: string }) {
 return (
 <svg
 className={className}
 fill="none"
 viewBox="0 0 24 24"
 stroke="currentColor"
 strokeWidth={2}
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
 />
 </svg>
 );
}
