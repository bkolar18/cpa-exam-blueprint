"use client";

import { useMemo } from "react";
import {
  type PrimeMeridianResult,
  getPrimeMeridianMilestone,
  PRIME_MERIDIAN_CONFIG,
  getCoverageBarColor,
  getAccuracyTextColor,
  getTopicsForContentArea,
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
 * - Circular gauge with 80 prominently marked as recommended (stricter standards)
 * - Color-coded progress (red -> yellow -> green)
 * - Content area gaps highlighted
 * - Consistency warnings
 * - Time and engagement insights
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

  // Calculate color based on score (updated for stricter thresholds)
  const getGaugeColor = (score: number) => {
    if (score >= 80) return "#10b981"; // emerald-500 (was 75)
    if (score >= 70) return "#eab308"; // yellow-500 (was 65)
    if (score >= 55) return "#f97316"; // orange-500 (was 50)
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

              {/* 80 marker (recommended score) - render before progress so it's behind */}
              <line
                x1="110"
                y1="20"
                x2="110"
                y2="8"
                stroke="#10b981"
                strokeWidth="3"
                transform={`rotate(${80 * 3.6}, 110, 110)`}
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

              {/* Milestone markers at 55, 70, 80, 85 (updated thresholds) */}
              {[55, 70, 85].map((mark) => (
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

            {/* 80 Badge (stricter recommended score) */}
            <div
              className="absolute w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg border-2 border-white dark:border-gray-800"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${80 * 3.6}deg) translateY(-102px) rotate(-${80 * 3.6}deg)`,
                transformOrigin: "center center",
              }}
            >
              80
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

            {/* Readiness Assessment - Shows why they're not ready */}
            {!result.readinessAssessment.isReady && result.readinessAssessment.reasons.length > 0 && (
              <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Not Yet Exam Ready
                  </span>
                </div>
                <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                  {result.readinessAssessment.reasons.map((reason, i) => (
                    <li key={i}>• {reason}</li>
                  ))}
                </ul>
              </div>
            )}

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
                  We grade conservatively. Students who reach 80 on Meridian typically pass their section.
                </p>
              </div>
            )}

            {/* Reached Recommended Score */}
            {result.readinessAssessment.isReady && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">
                    Exam Ready!
                  </span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                  You&apos;ve met our strict readiness criteria. Consider scheduling your exam.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Area Gaps - Prominent Warning */}
      {showDetails && result.hasGaps && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-6">
          <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Content Area Gaps Detected
          </h3>
          <p className="text-sm text-red-700 dark:text-red-300 mb-4">
            These content areas are below the {PRIME_MERIDIAN_CONFIG.CONTENT_AREA_MINIMUM}% minimum. The CPA exam will test these areas - address them before scheduling.
          </p>
          <div className="space-y-3">
            {result.contentAreaGaps.map((gap) => {
              const practiceTopics = getTopicsForContentArea(section, gap.contentArea);
              return (
                <div key={gap.contentArea} className="bg-white dark:bg-red-900/30 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="font-medium text-red-800 dark:text-red-200">{gap.name.split(',')[0]}</div>
                      <div className="text-xs text-red-600 dark:text-red-400">{gap.questionsAttempted} questions attempted</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-red-700 dark:text-red-300">{gap.score}%</div>
                      <div className="text-xs text-red-600 dark:text-red-400">Need +{gap.pointsToThreshold} pts</div>
                    </div>
                  </div>
                  {practiceTopics.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-red-200 dark:border-red-700">
                      <div className="text-xs font-medium text-red-700 dark:text-red-300 mb-2 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        Practice these topics in Quiz Configuration:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {practiceTopics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 bg-red-100 dark:bg-red-800/50 text-red-700 dark:text-red-200 rounded text-xs font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Consistency Warning */}
      {showDetails && !result.consistency.isConsistent && result.consistency.inconsistentAreas.length > 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-6">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
            Inconsistent Performance
          </h3>
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            Your performance varies significantly across topics. The CPA exam will find weak spots. Focus on: {result.consistency.inconsistentAreas.join(', ')}.
          </p>
        </div>
      )}

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
        The Prime Meridian score uses stricter thresholds than most review courses to better prepare you for exam day.
        We recommend reaching a score of 80 with no content area below 70% before scheduling your exam.
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
    if (s >= 80) return "#10b981"; // Updated for stricter thresholds
    if (s >= 70) return "#eab308";
    if (s >= 55) return "#f97316";
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
        {score < 80 && (
          <div className="text-xs text-[var(--muted)]">{80 - score} to 80</div>
        )}
      </div>
    </div>
  );
}
