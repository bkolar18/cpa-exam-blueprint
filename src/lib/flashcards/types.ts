// Flashcard System Types
import { SectionCode } from '../data/practice-questions/types';

// Core flashcard structure
export interface Flashcard {
  id: string;
  section: SectionCode;
  topic: string;
  subtopic?: string;
  front: string;          // Question or term
  back: string;           // Answer or definition
  difficulty: 'easy' | 'medium' | 'hard';
  source: 'manual' | 'auto' | 'missed_question';
  sourceQuestionId?: string; // If generated from a missed question
  tags?: string[];
  createdAt?: Date;
}

// User progress on a specific flashcard (SM-2 algorithm state)
export interface FlashcardProgress {
  userId: string;
  cardId: string;
  easeFactor: number;      // Starts at 2.5, adjusts based on performance
  interval: number;        // Days until next review
  repetitions: number;     // Successful reviews in a row
  nextReviewDate: Date;
  lastReviewDate: Date;
  totalReviews: number;
  correctReviews: number;
}

// Quality rating for SM-2 algorithm
export type ReviewQuality = 0 | 1 | 2 | 3 | 4 | 5;
// 0 - Complete blackout
// 1 - Incorrect, but recognized after seeing answer
// 2 - Incorrect, but answer was easy to recall after seeing
// 3 - Correct, with serious difficulty
// 4 - Correct, after hesitation
// 5 - Perfect, instant recall

// Simplified user-facing rating
export type UserRating = 'again' | 'hard' | 'good' | 'easy';

// Mapping from user rating to SM-2 quality
export const ratingToQuality: Record<UserRating, ReviewQuality> = {
  again: 1,
  hard: 3,
  good: 4,
  easy: 5,
};

// Deck is a collection of flashcards for a section or topic
export interface FlashcardDeck {
  id: string;
  name: string;
  description?: string;
  section?: SectionCode;
  topic?: string;
  cardIds: string[];
  totalCards: number;
  masteredCards: number;
  learningCards: number;
  newCards: number;
}

// Review session state
export interface ReviewSession {
  id: string;
  userId: string;
  deckId?: string;
  section?: SectionCode;
  startedAt: Date;
  completedAt?: Date;
  cardsReviewed: number;
  correctCount: number;
  incorrectCount: number;
  cardResults: ReviewResult[];
}

export interface ReviewResult {
  cardId: string;
  rating: UserRating;
  timeSpentMs: number;
  wasCorrect: boolean;
}

// Daily review stats
export interface DailyReviewStats {
  date: string;
  cardsReviewed: number;
  correctCount: number;
  newCardsLearned: number;
  averageTimePerCard: number;
  streakDays: number;
}

// Filter options for flashcard queries
export interface FlashcardFilterOptions {
  sections?: SectionCode[];
  topics?: string[];
  difficulties?: ('easy' | 'medium' | 'hard')[];
  tags?: string[];
  dueOnly?: boolean;      // Only cards due for review
  newOnly?: boolean;      // Only cards never reviewed
  masteredOnly?: boolean; // Only cards with high ease factor
}
