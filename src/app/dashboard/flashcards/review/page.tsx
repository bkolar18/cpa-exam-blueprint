'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FlashcardReview from '@/components/flashcards/FlashcardReview';
import { allFlashcards, getFlashcardsBySection } from '@/lib/flashcards/sample-cards';
import type { Flashcard, FlashcardProgress, UserRating } from '@/lib/flashcards/types';

function ReviewContent() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [progressMap, setProgressMap] = useState<Record<string, FlashcardProgress>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get cards based on section filter or all cards
    let selectedCards: Flashcard[];

    if (sectionParam) {
      const section = sectionParam.toUpperCase() as 'FAR' | 'AUD' | 'REG' | 'TCP' | 'BAR' | 'ISC';
      selectedCards = getFlashcardsBySection(section);
    } else {
      selectedCards = [...allFlashcards];
    }

    // Shuffle cards for review
    const shuffled = selectedCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);

    // Load progress from localStorage (in production, load from database)
    const savedProgress = localStorage.getItem('flashcardProgress');
    if (savedProgress) {
      try {
        setProgressMap(JSON.parse(savedProgress));
      } catch {
        setProgressMap({});
      }
    }

    setIsLoading(false);
  }, [sectionParam]);

  const handleCardReviewed = (cardId: string, rating: UserRating, newProgress: Partial<FlashcardProgress>) => {
    const updatedProgress = {
      ...progressMap,
      [cardId]: {
        ...progressMap[cardId],
        ...newProgress,
        cardId,
      } as FlashcardProgress,
    };
    setProgressMap(updatedProgress);

    // Save to localStorage (in production, save to database)
    localStorage.setItem('flashcardProgress', JSON.stringify(updatedProgress));
  };

  const handleComplete = () => {
    // Save session to localStorage for streak tracking
    const today = new Date().toISOString().split('T')[0];
    const sessions = JSON.parse(localStorage.getItem('flashcardSessions') || '[]');
    sessions.push({
      date: today,
      cardsReviewed: cards.length,
      section: sectionParam || 'all',
    });
    localStorage.setItem('flashcardSessions', JSON.stringify(sessions));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            No Cards Available
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {sectionParam
              ? `No flashcards found for ${sectionParam.toUpperCase()} section.`
              : 'No flashcards available for review.'
            }
          </p>
          <Link
            href="/dashboard/flashcards"
            className="inline-flex items-center px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Flashcards
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/flashcards"
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {sectionParam ? `${sectionParam.toUpperCase()} Review` : 'Review All Cards'}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {cards.length} cards in this session
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Review Area */}
      <div className="max-w-4xl mx-auto p-6">
        <FlashcardReview
          cards={cards}
          progressMap={progressMap}
          onCardReviewed={handleCardReviewed}
          onComplete={handleComplete}
        />
      </div>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
      </div>
    }>
      <ReviewContent />
    </Suspense>
  );
}
