'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import type { SectionCode } from '@/lib/supabase/types';

interface FlagQuestionButtonProps {
  questionId: string;
  section: SectionCode;
  topic: string;
  subtopic?: string;
  variant?: 'default' | 'compact';
  className?: string;
}

export default function FlagQuestionButton({
  questionId,
  section,
  topic,
  subtopic,
  variant = 'default',
  className = '',
}: FlagQuestionButtonProps) {
  const { user } = useAuth();
  const supabase = createClient();
  const [isFlagged, setIsFlagged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load existing flag state
  useEffect(() => {
    const loadFlag = async () => {
      if (!user || !supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('question_flags')
          .select('flag_return_to')
          .eq('user_id', user.id)
          .eq('question_id', questionId)
          .maybeSingle();

        if (data && !error) {
          setIsFlagged(data.flag_return_to || false);
        }
      } catch {
        // No flag exists yet
      } finally {
        setIsLoading(false);
      }
    };

    loadFlag();
  }, [user, questionId, supabase]);

  const handleToggleFlag = async () => {
    if (!user || !supabase) return;

    const newValue = !isFlagged;

    // Optimistic update
    setIsFlagged(newValue);

    try {
      // Check if record exists
      const { data: existing } = await supabase
        .from('question_flags')
        .select('id')
        .eq('user_id', user.id)
        .eq('question_id', questionId)
        .maybeSingle();

      if (existing) {
        // Update existing
        await supabase
          .from('question_flags')
          .update({
            flag_return_to: newValue,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id)
          .eq('question_id', questionId);
      } else {
        // Insert new
        await supabase.from('question_flags').insert({
          user_id: user.id,
          question_id: questionId,
          section,
          topic,
          subtopic: subtopic || null,
          flag_return_to: newValue,
        });
      }
    } catch (error) {
      console.error('Failed to toggle flag:', error);
      // Revert on error
      setIsFlagged(!newValue);
    }
  };

  if (!user) return null;

  const baseStyles = variant === 'compact'
    ? `flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded transition-colors`
    : `flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-colors`;

  const colorStyles = isFlagged
    ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600'
    : variant === 'compact'
      ? 'text-[var(--muted)] hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
      : 'border-[var(--border)] text-[var(--muted)] hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20';

  return (
    <button
      onClick={handleToggleFlag}
      disabled={isLoading}
      className={`${baseStyles} ${colorStyles} ${className}`}
      title={isFlagged ? 'Remove flag' : 'Flag question for later review'}
    >
      <FlagIcon className={variant === 'compact' ? 'w-3.5 h-3.5' : 'w-4 h-4'} filled={isFlagged} />
      {variant !== 'compact' && <span>{isFlagged ? 'Flagged' : 'Flag'}</span>}
    </button>
  );
}

function FlagIcon({ className = '', filled = false }: { className?: string; filled?: boolean }) {
  if (filled) {
    return (
      <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M5 21V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H7v6H5z" />
      </svg>
    );
  }

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
