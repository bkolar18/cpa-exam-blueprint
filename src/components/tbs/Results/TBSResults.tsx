"use client";

import { TBSQuestion, UserResponse } from "@/lib/data/tbs/types";

interface TBSResultsProps {
  tbs: TBSQuestion;
  responses: Record<string, UserResponse>;
  gradingResult: {
    totalPoints: number;
    earnedPoints: number;
    percentage: number;
    details: Array<{
      requirementId: string;
      pointsEarned: number;
      pointsPossible: number;
      isCorrect: boolean;
      isPartialCredit: boolean;
      feedback: string;
    }>;
  };
  timeSpentSeconds: number;
  onRetry?: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function TBSResults({
  tbs,
  gradingResult,
  timeSpentSeconds,
  onRetry,
}: TBSResultsProps) {
  const { totalPoints, earnedPoints, percentage, details } = gradingResult;

  // Calculate statistics
  const correctCount = details.filter((d) => d.isCorrect).length;
  const partialCount = details.filter((d) => d.isPartialCredit).length;
  const incorrectCount = details.filter((d) => !d.isCorrect && !d.isPartialCredit).length;

  // Determine score color
  const getScoreColor = (pct: number) => {
    if (pct >= 80) return "text-green-600 dark:text-green-400";
    if (pct >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (pct: number) => {
    if (pct >= 80) return "bg-green-500";
    if (pct >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Score Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className={`${getScoreBgColor(percentage)} px-6 py-8 text-white text-center`}>
            <h2 className="text-2xl font-bold mb-2">Results</h2>
            <div className="text-6xl font-bold mb-2">{percentage}%</div>
            <p className="text-white/80">
              {earnedPoints} / {totalPoints} points earned
            </p>
          </div>

          <div className="px-6 py-4 grid grid-cols-4 gap-4 text-center border-b border-gray-200 dark:border-gray-700">
            <div>
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {correctCount}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Correct</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {partialCount}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Partial</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {incorrectCount}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Incorrect</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {formatTime(timeSpentSeconds)}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Time</div>
            </div>
          </div>

          {/* Performance Message */}
          <div className="px-6 py-4">
            <p className={`text-center ${getScoreColor(percentage)}`}>
              {percentage >= 80
                ? "Excellent work! You demonstrated strong understanding of this topic."
                : percentage >= 60
                  ? "Good effort! Review the explanations to strengthen your understanding."
                  : "Keep practicing! Review the explanations below to learn from this attempt."}
            </p>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Question-by-Question Review
            </h3>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {details.map((detail, index) => {
              const requirement = tbs.requirements.find((r) => r.id === detail.requirementId);

              return (
                <div key={detail.requirementId} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {/* Status Icon */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        detail.isCorrect
                          ? "bg-green-100 dark:bg-green-900/30"
                          : detail.isPartialCredit
                            ? "bg-yellow-100 dark:bg-yellow-900/30"
                            : "bg-red-100 dark:bg-red-900/30"
                      }`}>
                        {detail.isCorrect ? (
                          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : detail.isPartialCredit ? (
                          <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {index + 1}. {requirement?.label || `Requirement ${index + 1}`}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {detail.feedback}
                        </p>
                        {requirement?.explanation && !detail.isCorrect && (
                          <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                              <span className="font-medium">Explanation:</span> {requirement.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Points */}
                    <div className="text-right flex-shrink-0 ml-4">
                      <span className={`text-lg font-semibold ${
                        detail.isCorrect
                          ? "text-green-600 dark:text-green-400"
                          : detail.isPartialCredit
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-red-600 dark:text-red-400"
                      }`}>
                        {detail.pointsEarned}
                      </span>
                      <span className="text-gray-400 dark:text-gray-500">
                        /{detail.pointsPossible}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center space-x-4">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-dark)] transition-colors"
            >
              Try Again
            </button>
          )}
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Back to Practice
          </button>
        </div>

        {/* Tip */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-medium">Study Tip:</span> Review incorrect answers and read the explanations carefully.
            Understanding why an answer is correct helps build lasting knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}
