// SM-2 Spaced Repetition Algorithm Implementation
// Based on SuperMemo 2 algorithm by Piotr Wozniak

import { ReviewQuality, UserRating, ratingToQuality } from './types';

export interface SM2State {
  easeFactor: number;    // EF - starts at 2.5
  interval: number;      // Days until next review
  repetitions: number;   // Consecutive correct answers
}

export interface SM2Result extends SM2State {
  nextReviewDate: Date;
}

/**
 * Initial state for a new flashcard
 */
export const initialSM2State: SM2State = {
  easeFactor: 2.5,
  interval: 0,
  repetitions: 0,
};

/**
 * Calculate next review date and update SM2 state based on quality of recall
 *
 * @param state Current SM2 state
 * @param quality Quality of recall (0-5)
 * @returns Updated SM2 state with next review date
 */
export function calculateNextReview(
  state: SM2State,
  quality: ReviewQuality
): SM2Result {
  let { easeFactor, interval, repetitions } = state;

  // Quality < 3 means incorrect response - reset
  if (quality < 3) {
    repetitions = 0;
    interval = 1; // Review again tomorrow
  } else {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor using SM-2 formula
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // EF should never be less than 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  nextReviewDate.setHours(0, 0, 0, 0);

  return {
    easeFactor: Math.round(easeFactor * 100) / 100,
    interval,
    repetitions,
    nextReviewDate,
  };
}

/**
 * Calculate next review using simplified user rating
 */
export function calculateNextReviewFromRating(
  state: SM2State,
  rating: UserRating
): SM2Result {
  const quality = ratingToQuality[rating];
  return calculateNextReview(state, quality);
}

/**
 * Get estimated next review intervals for all possible ratings
 * Useful for showing user what choosing each option will do
 */
export function getNextIntervalPreview(state: SM2State): Record<UserRating, number> {
  return {
    again: calculateNextReview(state, ratingToQuality.again).interval,
    hard: calculateNextReview(state, ratingToQuality.hard).interval,
    good: calculateNextReview(state, ratingToQuality.good).interval,
    easy: calculateNextReview(state, ratingToQuality.easy).interval,
  };
}

/**
 * Check if a card is due for review
 */
export function isDue(nextReviewDate: Date): boolean {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return nextReviewDate <= now;
}

/**
 * Get mastery level based on ease factor and repetitions
 */
export function getMasteryLevel(easeFactor: number, repetitions: number): 'new' | 'learning' | 'review' | 'mastered' {
  if (repetitions === 0) return 'new';
  if (repetitions < 3) return 'learning';
  if (easeFactor >= 2.5 && repetitions >= 5) return 'mastered';
  return 'review';
}

/**
 * Format interval for display
 */
export function formatInterval(days: number): string {
  if (days === 0) return 'Today';
  if (days === 1) return '1 day';
  if (days < 7) return `${days} days`;
  if (days < 30) {
    const weeks = Math.round(days / 7);
    return weeks === 1 ? '1 week' : `${weeks} weeks`;
  }
  if (days < 365) {
    const months = Math.round(days / 30);
    return months === 1 ? '1 month' : `${months} months`;
  }
  const years = Math.round(days / 365);
  return years === 1 ? '1 year' : `${years} years`;
}

/**
 * Sort cards by priority for review
 * - Overdue cards first (oldest first)
 * - Then new cards
 * - Then cards due today
 */
export function sortCardsForReview<T extends { nextReviewDate: Date; repetitions: number }>(
  cards: T[]
): T[] {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  return [...cards].sort((a, b) => {
    const aOverdue = a.nextReviewDate < now;
    const bOverdue = b.nextReviewDate < now;
    const aNew = a.repetitions === 0;
    const bNew = b.repetitions === 0;

    // Overdue cards first
    if (aOverdue && !bOverdue) return -1;
    if (!aOverdue && bOverdue) return 1;

    // Among overdue, oldest first
    if (aOverdue && bOverdue) {
      return a.nextReviewDate.getTime() - b.nextReviewDate.getTime();
    }

    // New cards next
    if (aNew && !bNew) return -1;
    if (!aNew && bNew) return 1;

    // Otherwise by next review date
    return a.nextReviewDate.getTime() - b.nextReviewDate.getTime();
  });
}
