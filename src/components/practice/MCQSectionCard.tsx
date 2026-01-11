"use client";

import { memo } from "react";
import Link from "next/link";

interface MCQSectionCardProps {
  sectionCode: string;
  sectionName: string;
  totalQuestions: number;
  attemptedCount: number;
  correctCount: number;
  averageAccuracy: number | null;
  hasQuestions: boolean;
}

const sectionColors: Record<string, string> = {
  FAR: "from-blue-500 to-blue-600",
  AUD: "from-emerald-500 to-emerald-600",
  REG: "from-orange-500 to-orange-600",
  TCP: "from-purple-500 to-purple-600",
  BAR: "from-pink-500 to-pink-600",
  ISC: "from-cyan-500 to-cyan-600",
};

export const MCQSectionCard = memo(function MCQSectionCard({
  sectionCode,
  sectionName,
  totalQuestions,
  attemptedCount,
  correctCount,
  averageAccuracy,
  hasQuestions,
}: MCQSectionCardProps) {
  const progressPercent =
    totalQuestions > 0 ? Math.round((attemptedCount / totalQuestions) * 100) : 0;
  const gradientClass = sectionColors[sectionCode] || sectionColors.FAR;
  const isCore = ["FAR", "AUD", "REG"].includes(sectionCode);

  if (!hasQuestions) {
    return (
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-gray-200 dark:border-[var(--border)] overflow-hidden opacity-75">
        {/* Header with gradient (muted) */}
        <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-white/20 text-white text-sm font-bold px-2 py-0.5 rounded">
                  {sectionCode}
                </span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  isCore ? "bg-white/30 text-white" : "bg-white/30 text-white"
                }`}>
                  {isCore ? "Core" : "Discipline"}
                </span>
              </div>
              <h3 className="text-white font-semibold mt-1">{sectionName}</h3>
            </div>
          </div>
        </div>

        {/* Coming soon message */}
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-gray-100 dark:bg-[var(--card-hover)] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-[var(--muted)]">Questions coming soon</p>
        </div>

        {/* Disabled button */}
        <div className="p-3 bg-gray-50 dark:bg-[var(--card)]/50 border-t border-gray-200 dark:border-[var(--border)]">
          <button
            disabled
            className="w-full flex items-center justify-center gap-2 py-2 text-gray-400 font-medium cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-gray-200 dark:border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${gradientClass} p-4`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-sm font-bold px-2 py-0.5 rounded">
                {sectionCode}
              </span>
              <span className="text-white/90 text-sm font-medium">
                {totalQuestions} MCQs
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                isCore ? "bg-white/30 text-white" : "bg-white/30 text-white"
              }`}>
                {isCore ? "Core" : "Discipline"}
              </span>
            </div>
            <h3 className="text-white font-semibold mt-1">{sectionName}</h3>
          </div>
          {averageAccuracy !== null && (
            <div className="text-right">
              <div className="text-white/70 text-xs">Avg Accuracy</div>
              <div className="text-white text-xl font-bold">
                {Math.round(averageAccuracy)}%
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-white/80 mb-1">
            <span>Progress</span>
            <span>
              {attemptedCount}/{totalQuestions} attempted
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="p-4 bg-gray-50 dark:bg-[var(--card)]/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--foreground)]">{attemptedCount}</div>
            <div className="text-xs text-[var(--muted)]">Attempted</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{correctCount}</div>
            <div className="text-xs text-[var(--muted)]">Correct</div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${
              averageAccuracy !== null && averageAccuracy >= 75
                ? "text-green-600 dark:text-green-400"
                : averageAccuracy !== null && averageAccuracy >= 50
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-[var(--muted)]"
            }`}>
              {averageAccuracy !== null ? `${Math.round(averageAccuracy)}%` : "—"}
            </div>
            <div className="text-xs text-[var(--muted)]">Accuracy</div>
          </div>
        </div>
      </div>

      {/* View All link */}
      <Link
        href={`/dashboard/practice/${sectionCode.toLowerCase()}`}
        className="flex items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-[var(--card)]/50 border-t border-gray-200 dark:border-[var(--border)] text-[var(--primary)] font-medium hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
      >
        View All {totalQuestions} MCQs
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </Link>
    </div>
  );
});
