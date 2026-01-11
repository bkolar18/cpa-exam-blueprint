'use client';

import { useState, useMemo, useCallback } from 'react';
import { Flashcard, UserRating, FlashcardProgress } from '@/lib/flashcards/types';
import { calculateNextReviewFromRating, initialSM2State, getMasteryLevel, formatInterval } from '@/lib/flashcards/sm2';
import FlashcardCard from './FlashcardCard';

interface FlashcardReviewProps {
 cards: Flashcard[];
 progressMap?: Record<string, FlashcardProgress>;
 onComplete?: (results: ReviewResult[]) => void;
 onCardReviewed?: (cardId: string, rating: UserRating, newProgress: Partial<FlashcardProgress>) => void;
 maxCards?: number;
}

interface ReviewResult {
 cardId: string;
 rating: UserRating;
 timeSpentMs: number;
 wasCorrect: boolean;
 newInterval: number;
}

export default function FlashcardReview({
 cards,
 progressMap = {},
 onComplete,
 onCardReviewed,
 maxCards = 20,
}: FlashcardReviewProps) {
 const [currentIndex, setCurrentIndex] = useState(0);
 const [results, setResults] = useState<ReviewResult[]>([]);
 const [startTime, setStartTime] = useState(Date.now());
 const [isComplete, setIsComplete] = useState(false);

 // Get cards to review (limited to maxCards)
 const reviewCards = useMemo(() => {
 return cards.slice(0, maxCards);
 }, [cards, maxCards]);

 const currentCard = reviewCards[currentIndex];

 // Get current card's progress
 const currentProgress = currentCard ? progressMap[currentCard.id] : undefined;
 const currentState = currentProgress
 ? {
 easeFactor: currentProgress.easeFactor,
 interval: currentProgress.interval,
 repetitions: currentProgress.repetitions,
 }
 : initialSM2State;

 // Handle rating
 const handleRate = useCallback((rating: UserRating) => {
 if (!currentCard) return;

 const timeSpent = Date.now() - startTime;
 const newState = calculateNextReviewFromRating(currentState, rating);
 const wasCorrect = rating !== 'again';

 const result: ReviewResult = {
 cardId: currentCard.id,
 rating,
 timeSpentMs: timeSpent,
 wasCorrect,
 newInterval: newState.interval,
 };

 setResults((prev) => [...prev, result]);

 // Notify parent of card review
 if (onCardReviewed) {
 onCardReviewed(currentCard.id, rating, {
 easeFactor: newState.easeFactor,
 interval: newState.interval,
 repetitions: newState.repetitions,
 nextReviewDate: newState.nextReviewDate,
 lastReviewDate: new Date(),
 totalReviews: (currentProgress?.totalReviews || 0) + 1,
 correctReviews: (currentProgress?.correctReviews || 0) + (wasCorrect ? 1 : 0),
 });
 }

 // Move to next card or complete
 if (currentIndex < reviewCards.length - 1) {
 setCurrentIndex((prev) => prev + 1);
 setStartTime(Date.now());
 } else {
 setIsComplete(true);
 onComplete?.([...results, result]);
 }
 }, [currentCard, currentState, startTime, currentIndex, reviewCards.length, results, progressMap, onCardReviewed, onComplete, currentProgress]);

 // Calculate stats
 const stats = useMemo(() => {
 const completed = results.length;
 const correct = results.filter((r) => r.wasCorrect).length;
 const avgTime = completed > 0
 ? Math.round(results.reduce((sum, r) => sum + r.timeSpentMs, 0) / completed / 1000)
 : 0;

 return { completed, correct, avgTime };
 }, [results]);

 // Completion screen
 if (isComplete) {
 const accuracy = stats.completed > 0 ? Math.round((stats.correct / stats.completed) * 100) : 0;

 return (
 <div className="max-w-lg mx-auto p-6 text-center">
 <div className="bg-white dark:bg-[var(--card)] rounded-2xl shadow-lg p-8">
 <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
 <svg className="w-8 h-8 text-green-600 dark:text-green-400"fill="none"viewBox="0 0 24 24"stroke="currentColor">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 </div>
 <h2 className="text-2xl font-bold text-gray-800 dark:text-[var(--foreground)] mb-2">
 Session Complete!
 </h2>
 <p className="text-[var(--muted)] mb-6">
 Great work reviewing your flashcards.
 </p>

 <div className="grid grid-cols-3 gap-4 mb-8">
 <div className="bg-gray-50 dark:bg-[var(--card-hover)]/50 rounded-lg p-4">
 <p className="text-2xl font-bold text-gray-800 dark:text-[var(--foreground)]">
 {stats.completed}
 </p>
 <p className="text-sm text-[var(--muted)]">Cards Reviewed</p>
 </div>
 <div className="bg-gray-50 dark:bg-[var(--card-hover)]/50 rounded-lg p-4">
 <p className="text-2xl font-bold text-green-600 dark:text-green-400">
 {accuracy}%
 </p>
 <p className="text-sm text-[var(--muted)]">Accuracy</p>
 </div>
 <div className="bg-gray-50 dark:bg-[var(--card-hover)]/50 rounded-lg p-4">
 <p className="text-2xl font-bold text-gray-800 dark:text-[var(--foreground)]">
 {stats.avgTime}s
 </p>
 <p className="text-sm text-[var(--muted)]">Avg Time</p>
 </div>
 </div>

 <div className="flex gap-3 justify-center">
 <button
 onClick={() => {
 setCurrentIndex(0);
 setResults([]);
 setStartTime(Date.now());
 setIsComplete(false);
 }}
 className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90"
 >
 Review Again
 </button>
 <a
 href="/dashboard/flashcards"
 className="px-6 py-2 border border-gray-300 dark:border-[var(--border)] rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
 >
 Back to Decks
 </a>
 </div>
 </div>
 </div>
 );
 }

 if (!currentCard) {
 return (
 <div className="text-center p-8">
 <p className="text-[var(--muted)]">No cards to review.</p>
 </div>
 );
 }

 return (
 <div className="max-w-2xl mx-auto p-4">
 {/* Progress Bar */}
 <div className="mb-6">
 <div className="flex justify-between items-center mb-2">
 <span className="text-sm text-[var(--muted)]">
 Card {currentIndex + 1} of {reviewCards.length}
 </span>
 <span className="text-sm text-[var(--muted)]">
 {stats.correct} correct · {stats.completed - stats.correct} to review
 </span>
 </div>
 <div className="h-2 bg-gray-200 dark:bg-[var(--card-hover)] rounded-full overflow-hidden">
 <div
 className="h-full bg-[var(--secondary)] transition-all duration-300"
 style={{ width: `${((currentIndex) / reviewCards.length) * 100}%` }}
 />
 </div>
 </div>

 {/* Card */}
 <FlashcardCard
 card={currentCard}
 easeFactor={currentState.easeFactor}
 interval={currentState.interval}
 repetitions={currentState.repetitions}
 onRate={handleRate}
 />

 {/* Card Info */}
 <div className="mt-4 text-center text-sm text-[var(--muted)]">
 {currentProgress ? (
 <span>
 Mastery: {getMasteryLevel(currentProgress.easeFactor, currentProgress.repetitions)} ·
 Last reviewed: {new Date(currentProgress.lastReviewDate).toLocaleDateString()}
 </span>
 ) : (
 <span>New card - not yet reviewed</span>
 )}
 </div>
 </div>
 );
}
