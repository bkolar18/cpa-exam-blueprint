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
              border border-[var(--border)] dark:border-gray-600
              text-[var(--muted)] dark:text-gray-400
              hover:text-red-600 dark:hover:text-red-400
              hover:border-red-300 dark:hover:border-red-500
              hover:bg-red-50 dark:hover:bg-red-900/20
              transition-colors`,
    compact: `flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded
              text-[var(--muted)] dark:text-gray-400
              hover:text-red-600 dark:hover:text-red-400
              hover:bg-red-50 dark:hover:bg-red-900/20
              transition-colors`,
    text: `flex items-center gap-1.5 text-sm
           text-[var(--muted)] dark:text-gray-400
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
        <FlagIcon className={variant === 'compact' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
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

function FlagIcon({ className = '' }: { className?: string }) {
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
        d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
      />
    </svg>
  );
}
