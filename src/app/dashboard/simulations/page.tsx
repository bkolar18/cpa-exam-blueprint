"use client";

import Link from "next/link";
import { allTBSQuestions } from "@/lib/data/tbs";

export default function SimulationsPage() {
  // Group TBS by section
  const tbsBySection = allTBSQuestions.reduce((acc, tbs) => {
    if (!acc[tbs.section]) acc[tbs.section] = [];
    acc[tbs.section].push(tbs);
    return acc;
  }, {} as Record<string, typeof allTBSQuestions>);

  // Difficulty colors removed - hiding difficulty from students to let adaptive model handle question selection

  const getTBSTypeLabel = (type: string) => {
    switch (type) {
      case "journal_entry":
        return "Journal Entry";
      case "numeric_entry":
        return "Numeric Entry";
      case "document_review":
        return "Document Review";
      case "research":
        return "Research";
      case "reconciliation":
        return "Reconciliation";
      case "written_communication":
        return "Written Communication";
      default:
        return type;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Task-Based Simulations
          </h1>
          <span className="px-3 py-1 bg-[var(--primary)] text-white text-sm font-semibold rounded-full">
            {allTBSQuestions.length}+ Available
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Practice with realistic CPA exam simulations. TBS make up 50% of most exam sections.
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-8">
        <div className="flex items-start space-x-3">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
              About Task-Based Simulations
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              TBS are case-study style questions that test your ability to apply knowledge to realistic scenarios.
              Unlike MCQs, you can earn partial credit on TBS questions. Each simulation includes exhibits
              (documents, tables, memos) that you&apos;ll need to analyze to complete the requirements.
            </p>
          </div>
        </div>
      </div>

      {/* TBS by Section */}
      <div className="space-y-8">
        {Object.entries(tbsBySection).map(([section, questions]) => (
          <div key={section}>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <span className="px-2 py-1 bg-[var(--primary)] text-white text-sm font-bold rounded mr-3">
                {section}
              </span>
              {section === "FAR" && "Financial Accounting & Reporting"}
              {section === "AUD" && "Auditing & Attestation"}
              {section === "REG" && "Regulation"}
              {section === "TCP" && "Tax Compliance & Planning"}
              {section === "BAR" && "Business Analysis & Reporting"}
              {section === "ISC" && "Information Systems & Controls"}
            </h2>

            <div className="grid gap-4">
              {questions.map((tbs) => (
                <Link
                  key={tbs.id}
                  href={`/dashboard/simulations/${tbs.id}`}
                  className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-[var(--primary)] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {/* Difficulty badge removed - let adaptive model handle question selection */}
                        <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                          {getTBSTypeLabel(tbs.tbsType)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          ~{tbs.timeEstimateMinutes} min
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                        {tbs.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {tbs.topic}
                        {tbs.subtopic && ` - ${tbs.subtopic}`}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {tbs.maxScorePoints} pts
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {tbs.exhibits.length} exhibit{tbs.exhibits.length !== 1 ? "s" : ""}
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* TBS Summary Stats */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
              Comprehensive TBS Library
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {allTBSQuestions.length}+ Task-Based Simulations across all 6 CPA exam sections with realistic scenarios.
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[var(--primary)]">{allTBSQuestions.length}+</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total TBS</div>
          </div>
        </div>
      </div>
    </div>
  );
}
