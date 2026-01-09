'use client';

import { useState, useEffect } from 'react';
import { Flashcard, UserRating } from '@/lib/flashcards/types';
import { getNextIntervalPreview, formatInterval } from '@/lib/flashcards/sm2';

interface FlashcardCardProps {
  card: Flashcard;
  easeFactor?: number;
  interval?: number;
  repetitions?: number;
  onRate: (rating: UserRating) => void;
  showHint?: boolean;
}

export default function FlashcardCard({
  card,
  easeFactor = 2.5,
  interval = 0,
  repetitions = 0,
  onRate,
  showHint = false,
}: FlashcardCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [startTime] = useState(Date.now());

  // Reset flip state when card changes
  useEffect(() => {
    setIsFlipped(false);
  }, [card.id]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      if (!isFlipped) {
        handleFlip();
      }
    }

    // Rating shortcuts when flipped
    if (isFlipped) {
      switch (e.key) {
        case '1':
          onRate('again');
          break;
        case '2':
          onRate('hard');
          break;
        case '3':
          onRate('good');
          break;
        case '4':
          onRate('easy');
          break;
      }
    }
  };

  const intervalPreview = getNextIntervalPreview({ easeFactor, interval, repetitions });

  return (
    <div
      className="w-full max-w-2xl mx-auto perspective-1000"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Card */}
      <div
        className={`relative w-full min-h-[300px] cursor-pointer transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={handleFlip}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 flex flex-col backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Topic Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 text-xs font-semibold bg-[var(--primary)] text-white rounded">
              {card.section}
            </span>
            <span className="text-xs text-[var(--muted)]">{card.topic}</span>
          </div>

          {/* Question */}
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl text-center text-gray-800 dark:text-gray-100 font-medium whitespace-pre-wrap">
              {card.front}
            </p>
          </div>

          {/* Hint to flip */}
          <div className="text-center text-sm text-[var(--muted)]">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs">Space</kbd>
              or click to reveal answer
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 flex flex-col backface-hidden rotate-y-180"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Topic Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-1 text-xs font-semibold bg-[var(--secondary)] text-white rounded">
              Answer
            </span>
          </div>

          {/* Answer */}
          <div className="flex-1 overflow-y-auto">
            <p className="text-lg text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
              {card.back}
            </p>
          </div>

          {/* Rating buttons */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-center text-[var(--muted)] mb-3">
              How well did you know this?
            </p>
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRate('again');
                }}
                className="flex flex-col items-center py-2 px-3 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium">Again</span>
                <span className="text-xs opacity-75">{formatInterval(intervalPreview.again)}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRate('hard');
                }}
                className="flex flex-col items-center py-2 px-3 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 text-orange-700 dark:text-orange-300 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium">Hard</span>
                <span className="text-xs opacity-75">{formatInterval(intervalPreview.hard)}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRate('good');
                }}
                className="flex flex-col items-center py-2 px-3 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 text-green-700 dark:text-green-300 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium">Good</span>
                <span className="text-xs opacity-75">{formatInterval(intervalPreview.good)}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRate('easy');
                }}
                className="flex flex-col items-center py-2 px-3 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium">Easy</span>
                <span className="text-xs opacity-75">{formatInterval(intervalPreview.easy)}</span>
              </button>
            </div>
            <p className="text-xs text-center text-[var(--muted)] mt-2">
              Keyboard: 1-4 to rate
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
