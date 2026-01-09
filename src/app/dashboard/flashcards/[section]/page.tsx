'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getFlashcardsBySection } from '@/lib/flashcards/sample-cards';
import type { Flashcard, FlashcardProgress } from '@/lib/flashcards/types';
import { getMasteryLevel } from '@/lib/flashcards/sm2';

const sectionInfo: Record<string, { name: string; color: string; description: string }> = {
  far: {
    name: 'Financial Accounting & Reporting',
    color: 'bg-blue-500',
    description: 'Master financial statements, GAAP principles, and accounting standards.',
  },
  aud: {
    name: 'Auditing & Attestation',
    color: 'bg-purple-500',
    description: 'Learn audit procedures, internal controls, and professional standards.',
  },
  reg: {
    name: 'Regulation',
    color: 'bg-orange-500',
    description: 'Study business law, ethics, and federal taxation principles.',
  },
  tcp: {
    name: 'Tax Compliance & Planning',
    color: 'bg-green-500',
    description: 'Focus on individual and entity tax compliance and planning strategies.',
  },
  bar: {
    name: 'Business Analysis & Reporting',
    color: 'bg-red-500',
    description: 'Understand business analysis, financial management, and reporting.',
  },
  isc: {
    name: 'Information Systems & Controls',
    color: 'bg-cyan-500',
    description: 'Master IT controls, security concepts, and system reliability.',
  },
};

export default function SectionFlashcardsPage() {
  const params = useParams();
  const section = (params.section as string).toLowerCase();
  const info = sectionInfo[section];

  const [cards, setCards] = useState<Flashcard[]>([]);
  const [progress, setProgress] = useState<Record<string, FlashcardProgress>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sectionUpper = section.toUpperCase() as 'FAR' | 'AUD' | 'REG' | 'TCP' | 'BAR' | 'ISC';
    const sectionCards = getFlashcardsBySection(sectionUpper);
    setCards(sectionCards);

    // Load progress from localStorage
    const savedProgress = localStorage.getItem('flashcardProgress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch {
        setProgress({});
      }
    }

    setIsLoading(false);
  }, [section]);

  if (!info) {
    return (
      <div className="p-6 max-w-2xl mx-auto text-center py-12">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Section Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The section &quot;{section}&quot; does not exist.
        </p>
        <Link
          href="/dashboard/flashcards"
          className="inline-flex items-center px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          Back to Flashcards
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  // Calculate stats
  const topics = [...new Set(cards.map(c => c.topic))];
  const masteryStats = {
    new: 0,
    learning: 0,
    review: 0,
    mastered: 0,
  };

  cards.forEach(card => {
    const cardProgress = progress[card.id];
    if (!cardProgress) {
      masteryStats.new++;
    } else {
      const level = getMasteryLevel(cardProgress.easeFactor, cardProgress.repetitions);
      masteryStats[level]++;
    }
  });

  const masteredPercentage = cards.length > 0
    ? Math.round((masteryStats.mastered / cards.length) * 100)
    : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/dashboard/flashcards"
        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-6"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to All Decks
      </Link>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 ${info.color} text-white text-lg font-bold rounded-lg`}>
              {section.toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {info.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {info.description}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{cards.length}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Cards</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <p className="text-2xl font-bold text-blue-600">{masteryStats.new}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">New</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <p className="text-2xl font-bold text-yellow-600">{masteryStats.learning + masteryStats.review}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
            <p className="text-2xl font-bold text-green-600">{masteryStats.mastered}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Mastered</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">{masteredPercentage}%</span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] transition-all duration-500"
              style={{ width: `${masteredPercentage}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`/dashboard/flashcards/review?section=${section}`}
          className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-[var(--primary)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Start Review Session
        </Link>
      </div>

      {/* Topics Section */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Topics Covered ({topics.length})
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {topics.map(topic => {
            const topicCards = cards.filter(c => c.topic === topic);
            const topicMastered = topicCards.filter(c => {
              const p = progress[c.id];
              return p && getMasteryLevel(p.easeFactor, p.repetitions) === 'mastered';
            }).length;

            return (
              <div
                key={topic}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{topic}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {topicCards.length} cards
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">
                    {topicMastered}/{topicCards.length}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">mastered</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Card Preview Section */}
      <div className="mt-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Sample Cards
        </h2>
        <div className="space-y-3">
          {cards.slice(0, 5).map(card => {
            const cardProgress = progress[card.id];
            const mastery = cardProgress
              ? getMasteryLevel(cardProgress.easeFactor, cardProgress.repetitions)
              : 'new';

            const masteryColors = {
              new: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
              learning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
              review: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
              mastered: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
            };

            return (
              <div
                key={card.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{card.front}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{card.topic}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${masteryColors[mastery]}`}>
                    {mastery}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {cards.length > 5 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
            + {cards.length - 5} more cards
          </p>
        )}
      </div>
    </div>
  );
}
