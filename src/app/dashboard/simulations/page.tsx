"use client";

import { useState, useMemo } from"react";
import Link from"next/link";
import { allTBSQuestions, tbsStatistics } from"@/lib/data/tbs";
import { TBSSectionCard, TBSSearchBar, TBSListItem } from"@/components/tbs/TBSLibrary";
import { useTBSProgress } from"@/hooks/useTBSProgress";
import type { TBSType } from"@/components/tbs/TBSLibrary";

const sections: { code: string; name: string }[] = [
 { code:"FAR", name:"Financial Accounting & Reporting"},
 { code:"AUD", name:"Auditing & Attestation"},
 { code:"REG", name:"Regulation"},
 { code:"TCP", name:"Tax Compliance & Planning"},
 { code:"BAR", name:"Business Analysis & Reporting"},
 { code:"ISC", name:"Information Systems & Controls"},
];

export default function SimulationsPage() {
 const [searchQuery, setSearchQuery] = useState("");
 const { data: progressData, isLoading: progressLoading, getStatus, getBestScore } = useTBSProgress();

 // Group TBS by section
 const tbsBySection = useMemo(() => {
 return allTBSQuestions.reduce((acc, tbs) => {
 if (!acc[tbs.section]) acc[tbs.section] = [];
 acc[tbs.section].push(tbs);
 return acc;
 }, {} as Record<string, typeof allTBSQuestions>);
 }, []);

 // Filter TBS by search query
 const searchResults = useMemo(() => {
 if (!searchQuery.trim()) return null;

 const query = searchQuery.toLowerCase();
 return allTBSQuestions
 .filter(
 (tbs) =>
 tbs.title.toLowerCase().includes(query) ||
 tbs.topic.toLowerCase().includes(query) ||
 (tbs.subtopic && tbs.subtopic.toLowerCase().includes(query))
 )
 .slice(0, 20); // Limit to 20 results
 }, [searchQuery]);

 // Calculate section stats
 const getSectionStats = (sectionCode: string) => {
 const sectionTBS = tbsBySection[sectionCode] || [];
 const completedCount = sectionTBS.filter((tbs) =>
 progressData.completedTBSIds.has(tbs.id)
 ).length;

 // Calculate average score for completed TBS in this section
 let totalScore = 0;
 let scoreCount = 0;
 for (const tbs of sectionTBS) {
 const score = progressData.bestScoreByTBS.get(tbs.id);
 if (score !== undefined) {
 totalScore += score;
 scoreCount++;
 }
 }
 const averageScore = scoreCount > 0 ? totalScore / scoreCount : null;

 return { totalCount: sectionTBS.length, completedCount, averageScore };
 };

 // Overall stats
 const overallStats = useMemo(() => {
 const totalTBS = allTBSQuestions.length;
 const completedTBS = progressData.completedTBSIds.size;
 const averageScore = progressData.stats?.averageScore ?? null;
 return { totalTBS, completedTBS, averageScore };
 }, [progressData]);

 return (
 <div className="p-6 max-w-6xl mx-auto">
 {/* Header */}
 <div className="mb-6">
 <div className="flex items-center justify-between flex-wrap gap-4">
 <div>
 <h1 className="text-2xl font-bold text-gray-800 dark:text-[var(--foreground)] mb-1">
 Task-Based Simulations
 </h1>
 <p className="text-gray-600 dark:text-[var(--muted)]">
 Practice with realistic CPA exam simulations. TBS make up 50% of most exam sections.
 </p>
 </div>
 <span className="px-3 py-1 bg-[var(--primary)] text-white text-sm font-semibold rounded-full">
 {allTBSQuestions.length}+ Available
 </span>
 </div>
 </div>

 {/* Stats Overview */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-gray-500 dark:text-[var(--muted)]">Total Simulations</p>
 <p className="text-3xl font-bold text-[var(--primary)]">{overallStats.totalTBS}</p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-gray-500 dark:text-[var(--muted)]">Completed</p>
 <p className="text-3xl font-bold text-green-600 dark:text-green-400">
 {progressLoading ?"—": overallStats.completedTBS}
 </p>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <p className="text-sm text-gray-500 dark:text-[var(--muted)]">Average Score</p>
 <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
 {progressLoading
 ?"—"
 : overallStats.averageScore !== null
 ? `${Math.round(overallStats.averageScore)}%`
 :"—"}
 </p>
 </div>
 </div>

 {/* Search Bar */}
 <div className="mb-6">
 <TBSSearchBar
 value={searchQuery}
 onChange={setSearchQuery}
 placeholder="Search by title, topic, or subtopic..."
 />
 </div>

 {/* Search Results */}
 {searchResults && (
 <div className="mb-8">
 <div className="flex items-center justify-between mb-4">
 <h2 className="text-lg font-semibold text-gray-800 dark:text-[var(--foreground)]">
 Search Results ({searchResults.length})
 </h2>
 <button
 onClick={() => setSearchQuery("")}
 className="text-sm text-[var(--primary)] hover:underline"
 >
 Clear search
 </button>
 </div>
 {searchResults.length > 0 ? (
 <div className="space-y-3">
 {searchResults.map((tbs) => (
 <TBSListItem
 key={tbs.id}
 id={tbs.id}
 title={tbs.title}
 topic={tbs.topic}
 subtopic={tbs.subtopic}
 tbsType={tbs.tbsType as TBSType}
 timeEstimateMinutes={tbs.timeEstimateMinutes}
 maxScorePoints={tbs.maxScorePoints}
 exhibitCount={tbs.exhibits.length}
 status={getStatus(tbs.id)}
 bestScore={getBestScore(tbs.id)}
 />
 ))}
 </div>
 ) : (
 <div className="text-center py-8 bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)]">
 <svg
 className="w-12 h-12 text-gray-400 mx-auto mb-3"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
 />
 </svg>
 <p className="text-gray-600 dark:text-[var(--muted)]">
 No simulations found matching &quot;{searchQuery}&quot;
 </p>
 </div>
 )}
 </div>
 )}

 {/* Section Cards Grid */}
 {!searchResults && (
 <>
 <div className="mb-4">
 <h2 className="text-lg font-semibold text-gray-800 dark:text-[var(--foreground)]">
 Browse by Section
 </h2>
 </div>
 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
 {sections.map((section) => {
 const stats = getSectionStats(section.code);
 const sectionTBS = tbsBySection[section.code] || [];
 const previewItems = sectionTBS.slice(0, 3).map((tbs) => ({
 id: tbs.id,
 title: tbs.title,
 topic: tbs.topic,
 subtopic: tbs.subtopic,
 tbsType: tbs.tbsType as TBSType,
 timeEstimateMinutes: tbs.timeEstimateMinutes,
 maxScorePoints: tbs.maxScorePoints,
 exhibitCount: tbs.exhibits.length,
 }));

 return (
 <TBSSectionCard
 key={section.code}
 sectionCode={section.code}
 sectionName={section.name}
 totalCount={stats.totalCount}
 completedCount={stats.completedCount}
 averageScore={stats.averageScore}
 previewItems={previewItems}
 getStatus={getStatus}
 getBestScore={getBestScore}
 />
 );
 })}
 </div>
 </>
 )}

 {/* Info Banner */}
 <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
 <div className="flex items-start gap-3">
 <svg
 className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
 />
 </svg>
 <div>
 <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
 About Task-Based Simulations
 </h3>
 <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
 TBS are case-study style questions that test your ability to apply knowledge to
 realistic scenarios. Unlike MCQs, you can earn partial credit on TBS questions.
 Each simulation includes exhibits (documents, tables, memos) that you&apos;ll need
 to analyze to complete the requirements.
 </p>
 </div>
 </div>
 </div>

 {/* TBS Type Legend */}
 <div className="mt-6 bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
 <h3 className="text-sm font-semibold text-gray-800 dark:text-[var(--foreground)] mb-3">
 Simulation Types
 </h3>
 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
 {[
 { code:"NE", label:"Numeric Entry", count: tbsStatistics.byType.numeric_entry },
 { code:"JE", label:"Journal Entry", count: tbsStatistics.byType.journal_entry },
 { code:"DR", label:"Document Review", count: tbsStatistics.byType.document_review },
 { code:"RS", label:"Research", count: tbsStatistics.byType.research },
 ].map((type) => (
 <div
 key={type.code}
 className="flex items-center gap-2 text-sm text-gray-600 dark:text-[var(--muted)]"
 >
 <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-[var(--card-hover)] rounded text-xs font-medium">
 {type.code}
 </span>
 <span>{type.label}</span>
 <span className="text-gray-400 dark:text-[var(--muted)]">({type.count})</span>
 </div>
 ))}
 </div>
 </div>
 </div>
 );
}
