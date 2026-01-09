'use client';

import Link from 'next/link';
import { allFlashcards, getFlashcardsBySection } from '@/lib/flashcards/sample-cards';

export default function FlashcardsPage() {
  // Group flashcards by section
  const sections = ['FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC'] as const;

  const sectionInfo = {
    FAR: { name: 'Financial Accounting & Reporting', color: 'bg-blue-500' },
    AUD: { name: 'Auditing & Attestation', color: 'bg-purple-500' },
    REG: { name: 'Regulation', color: 'bg-orange-500' },
    TCP: { name: 'Tax Compliance & Planning', color: 'bg-green-500' },
    BAR: { name: 'Business Analysis & Reporting', color: 'bg-red-500' },
    ISC: { name: 'Information Systems & Controls', color: 'bg-cyan-500' },
  };

  // Calculate stats for each section
  const sectionStats = sections.map((section) => {
    const cards = getFlashcardsBySection(section);
    const topics = [...new Set(cards.map((c) => c.topic))];
    return {
      section,
      info: sectionInfo[section],
      totalCards: cards.length,
      topics: topics.length,
      dueCards: 0, // In production, calculate from user progress
      newCards: cards.length, // In production, exclude reviewed cards
    };
  });

  const totalCards = allFlashcards.length;
  const totalDue = 0; // In production, calculate from user progress

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Flashcards
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Review key CPA exam concepts with spaced repetition for better retention.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {totalCards}
          </p>
          <p className="text-sm text-[var(--muted)]">Total Cards</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <p className="text-2xl font-bold text-[var(--primary)]">
            {totalDue}
          </p>
          <p className="text-sm text-[var(--muted)]">Due Today</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <p className="text-2xl font-bold text-[var(--secondary)]">
            {sections.length}
          </p>
          <p className="text-sm text-[var(--muted)]">Sections</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            0
          </p>
          <p className="text-sm text-[var(--muted)]">Day Streak</p>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2">Start Reviewing</h2>
            <p className="opacity-90">
              Review all due cards across all sections, or choose a specific deck below.
            </p>
          </div>
          <Link
            href="/dashboard/flashcards/review"
            className="px-6 py-3 bg-white text-[var(--primary)] font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Review All Cards
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              How Spaced Repetition Works
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Cards you find easy will appear less frequently, while difficult cards will repeat more often.
              This optimizes your study time by focusing on what you need to learn most. Rate each card honestly
              for the best results.
            </p>
          </div>
        </div>
      </div>

      {/* Section Decks */}
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Decks by Section
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sectionStats.map((stat) => (
          <Link
            key={stat.section}
            href={`/dashboard/flashcards/${stat.section.toLowerCase()}`}
            className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-[var(--primary)] hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`px-3 py-1 ${stat.info.color} text-white text-sm font-bold rounded-lg`}>
                {stat.section}
              </div>
              {stat.dueCards > 0 && (
                <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium rounded-full">
                  {stat.dueCards} due
                </span>
              )}
            </div>

            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-1">
              {stat.info.name}
            </h3>

            <div className="flex items-center text-sm text-[var(--muted)] gap-3">
              <span>{stat.totalCards} cards</span>
              <span>·</span>
              <span>{stat.topics} topics</span>
            </div>

            {/* Progress bar - placeholder */}
            <div className="mt-4">
              <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--secondary)] w-0" />
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">
                0% mastered
              </p>
            </div>

            <div className="mt-4 flex items-center text-sm font-medium text-[var(--primary)] group-hover:underline">
              Study this deck
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Tips for Effective Flashcard Study
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
              1
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">Review daily</p>
              <p className="text-sm text-[var(--muted)]">
                Consistency beats intensity. 15 minutes daily is better than 2 hours once a week.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
              2
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">Be honest with ratings</p>
              <p className="text-sm text-[var(--muted)]">
                If you struggled, mark it as Hard. The algorithm works best with honest input.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
              3
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">Clear due cards first</p>
              <p className="text-sm text-[var(--muted)]">
                Prioritize cards that are due before adding new ones to your rotation.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
              4
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-200">Use with practice questions</p>
              <p className="text-sm text-[var(--muted)]">
                Flashcards build recall; MCQs test application. Use both together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
