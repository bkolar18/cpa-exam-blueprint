"use client";

import { useMemo } from "react";
import {
  type PrimeMeridianResult,
  getPrimeMeridianMilestone,
  PRIME_MERIDIAN_CONFIG,
  getCoverageBarColor,
  getAccuracyTextColor,
} from "@/lib/scoring/prime-meridian";

interface PrimeMeridianScoreProps {
  result: PrimeMeridianResult;
  section: string;
  showDetails?: boolean;
}

/**
 * Prime Meridian Score Display Component
 *
 * Features:
 * - Circular gauge with 75 prominently marked as recommended
 * - Color-coded progress (red -> yellow -> green)
 * - Content area breakdown
 * - Recommended actions
 */
export default function PrimeMeridianScore({
  result,
  section,
  showDetails = true,
}: PrimeMeridianScoreProps) {
  const milestone = useMemo(
    () => getPrimeMeridianMilestone(result.overallScore),
    [result.overallScore]
  );

  const scorePercentage = Math.min(100, result.overallScore);
  const circumference = 2 * Math.PI * 90; // radius = 90
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

  // Calculate color based on score
  const getGaugeColor = (score: number) => {
    if (score >= 75) return "#10b981"; // emerald-500
    if (score >= 65) return "#eab308"; // yellow-500
    if (score >= 50) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  const gaugeColor = getGaugeColor(result.overallScore);

  return (
    <div className="space-y-6">
      {/* Main Score Card */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Circular Gauge */}
          <div className="relative flex-shrink-0">
            <svg width="220" height="220" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="110"
                cy="110"
                r="90"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
                className="text-gray-200 dark:text-gray-700"
              />

              {/* 75 marker (recommended score) - render before progress so it's behind */}
              <line
                x1="110"
                y1="20"
                x2="110"
                y2="8"
                stroke="#10b981"
                strokeWidth="3"
                transform={`rotate(${75 * 3.6}, 110, 110)`}
                className="opacity-80"
              />

              {/* Progress arc */}
              <circle
                cx="110"
                cy="110"
                r="90"
                fill="none"
                stroke={gaugeColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
              />

              {/* Milestone markers at 50, 65, 75, 85 */}
              {[50, 65, 85].map((mark) => (
                <line
                  key={mark}
                  x1="110"
                  y1="20"
                  x2="110"
                  y2="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  transform={`rotate(${mark * 3.6}, 110, 110)`}
                  className="text-gray-400 dark:text-gray-500"
                />
              ))}
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-5xl font-bold ${milestone.color}`}>
                {result.overallScore}
              </div>
              <div className="text-sm text-[var(--muted)] mt-1">Prime Meridian</div>
            </div>

            {/* 75 Badge */}
            <div
              className="absolute w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white dark:border-gray-800"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${75 * 3.6}deg) translateY(-102px) rotate(-${75 * 3.6}deg)`,
                transformOrigin: "center center",
              }}
            >
              75
            </div>
          </div>

          {/* Score Details */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">
                {section} Prime Meridian
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${milestone.bgColor}`}>
                {milestone.label}
              </span>
            </div>

            <p className="text-[var(--muted)] mb-4">{milestone.message}</p>

            {/* Recommended Score Callout */}
            {result.overallScore < PRIME_MERIDIAN_CONFIG.RECOMMENDED_SCORE && (
              <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
                    {PRIME_MERIDIAN_CONFIG.RECOMMENDED_SCORE - result.overallScore} points to recommended score
                  </span>
                </div>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                  We recommend reaching 75 before scheduling your exam, as students at this level typically feel well-prepared.
                </p>
              </div>
            )}

            {/* Reached Recommended Score */}
            {result.overallScore >= PRIME_MERIDIAN_CONFIG.RECOMMENDED_SCORE && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    Recommended score achieved!
                  </span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                  You&apos;ve reached our recommended preparation level. Consider scheduling your exam when you feel ready.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      {showDetails && result.recommendedActions.length > 0 && (
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            Recommended Next Steps
          </h3>
          <ul className="space-y-3">
            {result.recommendedActions.map((action, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <span className="text-[var(--foreground)]">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-[var(--muted)] text-center px-4">
        The Prime Meridian score is designed to help guide your study efforts based on AICPA exam blueprint weightings.
        We recommend reaching a score of 75 before scheduling your exam, as this indicates strong coverage across all tested areas.
        This score is for guidance only and does not predict or guarantee any particular outcome on the CPA exam.
      </p>
    </div>
  );
}

/**
 * Compact Prime Meridian display for dashboard cards
 */
export function PrimeMeridianCompact({
  score,
  section,
}: {
  score: number;
  section: string;
}) {
  const milestone = getPrimeMeridianMilestone(score);
  const circumference = 2 * Math.PI * 36; // radius = 36
  const strokeDashoffset = circumference - (Math.min(100, score) / 100) * circumference;

  const getGaugeColor = (s: number) => {
    if (s >= 75) return "#10b981";
    if (s >= 65) return "#eab308";
    if (s >= 50) return "#f97316";
    return "#ef4444";
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <svg width="80" height="80" className="transform -rotate-90">
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={getGaugeColor(score)}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${milestone.color}`}>{score}</span>
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-[var(--foreground)]">{section}</div>
        <div className={`text-xs ${milestone.color}`}>{milestone.label}</div>
        {score < 75 && (
          <div className="text-xs text-[var(--muted)]">{75 - score} to 75</div>
        )}
      </div>
    </div>
  );
}
