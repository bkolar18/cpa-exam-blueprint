"use client";

import { useState } from "react";
import { TBSContainer } from "@/components/tbs";
import { sampleTBSQuestions, getSampleTBSById } from "@/lib/data/tbs/sample-tbs";
import { TBSAttempt } from "@/lib/data/tbs/types";

export default function TestTBSPage() {
  const [selectedTBS, setSelectedTBS] = useState<string | null>(null);
  const [lastAttempt, setLastAttempt] = useState<TBSAttempt | null>(null);

  const tbs = selectedTBS ? getSampleTBSById(selectedTBS) : null;

  const handleComplete = (attempt: TBSAttempt) => {
    console.log("TBS attempt completed:", attempt);
    setLastAttempt(attempt);
  };

  const handleBack = () => {
    setSelectedTBS(null);
    setLastAttempt(null);
  };

  // Show TBS Container if one is selected
  if (tbs) {
    return (
      <div className="min-h-screen">
        <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 hover:text-blue-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to TBS List
          </button>
          <span className="text-sm text-gray-400">Test Mode - No Auth Required</span>
        </div>
        <TBSContainer
          tbs={tbs}
          testletIndex={1}
          testletTotal={1}
          onComplete={handleComplete}
          isPracticeMode={true}
        />
      </div>
    );
  }

  // Show TBS selection list
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            TBS Test Page
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test Task-Based Simulations without authentication. Select a TBS below to start.
          </p>
        </div>

        {/* Last Attempt Result */}
        {lastAttempt && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Last Attempt Result</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Score:</span>
                <span className="ml-2 font-medium text-blue-700 dark:text-blue-300">
                  {lastAttempt.scorePercentage?.toFixed(0)}%
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Points:</span>
                <span className="ml-2 font-medium text-blue-700 dark:text-blue-300">
                  {lastAttempt.scoreEarned} / {lastAttempt.maxScore}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Time:</span>
                <span className="ml-2 font-medium text-blue-700 dark:text-blue-300">
                  {Math.floor((lastAttempt.timeSpentSeconds ?? 0) / 60)}:{((lastAttempt.timeSpentSeconds ?? 0) % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TBS List */}
        <div className="space-y-4">
          {sampleTBSQuestions.map((tbsItem) => (
            <button
              key={tbsItem.id}
              onClick={() => setSelectedTBS(tbsItem.id)}
              className="w-full text-left bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                      tbsItem.difficulty === "easy"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                        : tbsItem.difficulty === "medium"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                    }`}>
                      {tbsItem.difficulty}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded">
                      {tbsItem.section}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                      {tbsItem.tbsType.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {tbsItem.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {tbsItem.topic} {tbsItem.subtopic && `- ${tbsItem.subtopic}`}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {tbsItem.maxScorePoints} pts
                  </div>
                  <div className="text-xs text-gray-500">
                    ~{tbsItem.timeEstimateMinutes} min
                  </div>
                  <div className="text-xs text-gray-500">
                    {tbsItem.exhibits.length} exhibit{tbsItem.exhibits.length !== 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
