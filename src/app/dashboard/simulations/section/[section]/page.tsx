"use client";

import { useState, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getTBSBySection } from "@/lib/data/tbs";
import {
  TBSListItem,
  TBSSearchBar,
  TBSFilters,
  TBSFiltersState,
  TBSType,
} from "@/components/tbs/TBSLibrary";
import { useTBSProgress } from "@/hooks/useTBSProgress";

const sectionNames: Record<string, string> = {
  far: "Financial Accounting & Reporting",
  aud: "Auditing & Attestation",
  reg: "Regulation",
  tcp: "Tax Compliance & Planning",
  bar: "Business Analysis & Reporting",
  isc: "Information Systems & Controls",
};

const ITEMS_PER_PAGE = 20;

export default function SectionPage() {
  const params = useParams();
  const sectionParam = (params.section as string)?.toUpperCase();
  const sectionLower = (params.section as string)?.toLowerCase();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<TBSFiltersState>({
    type: "all",
    status: "all",
    topic: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"title" | "time" | "topic">("title");

  const { getStatus, getBestScore, isLoading: progressLoading } = useTBSProgress({
    section: sectionParam,
  });

  // Get TBS for this section
  const allSectionTBS = useMemo(() => {
    if (!sectionParam) return [];
    return getTBSBySection(sectionParam as "FAR" | "AUD" | "REG" | "TCP" | "BAR" | "ISC") || [];
  }, [sectionParam]);

  // Get unique topics for filter dropdown
  const topics = useMemo(() => {
    const topicSet = new Set<string>();
    for (const tbs of allSectionTBS) {
      topicSet.add(tbs.topic);
    }
    return Array.from(topicSet).sort();
  }, [allSectionTBS]);

  // Filter and search TBS
  const filteredTBS = useMemo(() => {
    let result = allSectionTBS;

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (tbs) =>
          tbs.title.toLowerCase().includes(query) ||
          tbs.topic.toLowerCase().includes(query) ||
          (tbs.subtopic && tbs.subtopic.toLowerCase().includes(query))
      );
    }

    // Apply type filter
    if (filters.type !== "all") {
      result = result.filter((tbs) => tbs.tbsType === filters.type);
    }

    // Apply topic filter
    if (filters.topic) {
      result = result.filter((tbs) => tbs.topic === filters.topic);
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter((tbs) => getStatus(tbs.id) === filters.status);
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case "time":
          return a.timeEstimateMinutes - b.timeEstimateMinutes;
        case "topic":
          return a.topic.localeCompare(b.topic);
        case "title":
        default:
          return a.title.localeCompare(b.title);
      }
    });

    return result;
  }, [allSectionTBS, searchQuery, filters, sortBy, getStatus]);

  // Pagination
  const totalPages = Math.ceil(filteredTBS.length / ITEMS_PER_PAGE);
  const paginatedTBS = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTBS.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTBS, currentPage]);

  // Reset to page 1 when filters change
  const handleFiltersChange = useCallback((newFilters: TBSFiltersState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  // Stats for this section
  const sectionStats = useMemo(() => {
    const total = allSectionTBS.length;
    let completed = 0;
    let totalScore = 0;
    let scoreCount = 0;

    for (const tbs of allSectionTBS) {
      const status = getStatus(tbs.id);
      if (status === "completed") {
        completed++;
        const score = getBestScore(tbs.id);
        if (score !== null) {
          totalScore += score;
          scoreCount++;
        }
      }
    }

    const avgScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : null;
    return { total, completed, avgScore };
  }, [allSectionTBS, getStatus, getBestScore]);

  if (!sectionParam || !sectionNames[sectionLower]) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Section Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The requested section does not exist.
          </p>
          <Link
            href="/dashboard/simulations"
            className="text-[var(--primary)] hover:underline"
          >
            Back to Simulations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link
              href="/dashboard/simulations"
              className="text-gray-500 dark:text-gray-400 hover:text-[var(--primary)]"
            >
              Simulations
            </Link>
          </li>
          <li className="text-gray-400 dark:text-gray-500">/</li>
          <li className="text-gray-800 dark:text-gray-200 font-medium">
            {sectionParam}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-[var(--primary)] text-white text-sm font-bold rounded">
            {sectionParam}
          </span>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {sectionNames[sectionLower]}
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {allSectionTBS.length} Task-Based Simulations
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total TBS</p>
          <p className="text-2xl font-bold text-[var(--primary)]">{sectionStats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
            {progressLoading ? "—" : sectionStats.completed}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">Avg Score</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {progressLoading
              ? "—"
              : sectionStats.avgScore !== null
                ? `${sectionStats.avgScore}%`
                : "—"}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-6">
        <TBSSearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={`Search ${sectionParam} simulations...`}
        />
        <div className="flex flex-wrap items-center gap-3">
          <TBSFilters
            filters={filters}
            onChange={handleFiltersChange}
            topics={topics}
            showStatusFilter={!progressLoading}
          />
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "title" | "time" | "topic")}
              className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              <option value="title">Title</option>
              <option value="time">Time Estimate</option>
              <option value="topic">Topic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results info */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {paginatedTBS.length} of {filteredTBS.length} simulations
          {filteredTBS.length !== allSectionTBS.length && " (filtered)"}
        </p>
      </div>

      {/* TBS List */}
      {paginatedTBS.length > 0 ? (
        <div className="space-y-3 mb-6">
          {paginatedTBS.map((tbs) => (
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
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
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
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400">
            No simulations match your filters
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setFilters({ type: "all", status: "all", topic: "" });
            }}
            className="mt-3 text-[var(--primary)] hover:underline text-sm"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--primary)] transition-colors"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Show first, last, current, and adjacent pages
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                );
              })
              .map((page, idx, arr) => {
                // Add ellipsis if there's a gap
                const prevPage = arr[idx - 1];
                const showEllipsis = prevPage && page - prevPage > 1;
                return (
                  <span key={page} className="flex items-center gap-1">
                    {showEllipsis && (
                      <span className="px-2 text-gray-400">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`w-9 h-9 text-sm rounded-lg transition-colors ${
                        page === currentPage
                          ? "bg-[var(--primary)] text-white"
                          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[var(--primary)]"
                      }`}
                    >
                      {page}
                    </button>
                  </span>
                );
              })}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[var(--primary)] transition-colors"
          >
            Next
          </button>
        </div>
      )}

      {/* Back link */}
      <div className="mt-8 text-center">
        <Link
          href="/dashboard/simulations"
          className="text-[var(--primary)] hover:underline text-sm inline-flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to All Sections
        </Link>
      </div>
    </div>
  );
}
