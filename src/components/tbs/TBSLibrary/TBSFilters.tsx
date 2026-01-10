"use client";

import { memo, useCallback } from "react";
import { TBSType } from "./TBSTypeIcon";
import { TBSStatus } from "./TBSProgressBadge";

export interface TBSFiltersState {
  type: TBSType | "all";
  status: TBSStatus | "all";
  topic: string;
}

interface TBSFiltersProps {
  filters: TBSFiltersState;
  onChange: (filters: TBSFiltersState) => void;
  topics: string[];
  showStatusFilter?: boolean;
}

const tbsTypes: { value: TBSType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "numeric_entry", label: "Numeric Entry" },
  { value: "journal_entry", label: "Journal Entry" },
  { value: "document_review", label: "Document Review" },
  { value: "research", label: "Research" },
  { value: "reconciliation", label: "Reconciliation" },
  { value: "dropdown", label: "Dropdown" },
  { value: "written_communication", label: "Written Communication" },
];

const statusOptions: { value: TBSStatus | "all"; label: string }[] = [
  { value: "all", label: "All Status" },
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

export const TBSFilters = memo(function TBSFilters({
  filters,
  onChange,
  topics,
  showStatusFilter = true,
}: TBSFiltersProps) {
  const handleTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({ ...filters, type: e.target.value as TBSType | "all" });
    },
    [filters, onChange]
  );

  const handleStatusChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({ ...filters, status: e.target.value as TBSStatus | "all" });
    },
    [filters, onChange]
  );

  const handleTopicChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({ ...filters, topic: e.target.value });
    },
    [filters, onChange]
  );

  const handleReset = useCallback(() => {
    onChange({ type: "all", status: "all", topic: "" });
  }, [onChange]);

  const hasActiveFilters =
    filters.type !== "all" || filters.status !== "all" || filters.topic !== "";

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Type filter */}
      <select
        value={filters.type}
        onChange={handleTypeChange}
        className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
      >
        {tbsTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>

      {/* Topic filter */}
      {topics.length > 0 && (
        <select
          value={filters.topic}
          onChange={handleTopicChange}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent max-w-[200px]"
        >
          <option value="">All Topics</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      )}

      {/* Status filter */}
      {showStatusFilter && (
        <select
          value={filters.status}
          onChange={handleStatusChange}
          className="px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
        >
          {statusOptions.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      )}

      {/* Reset button */}
      {hasActiveFilters && (
        <button
          onClick={handleReset}
          className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--primary)] transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Clear Filters
        </button>
      )}
    </div>
  );
});
