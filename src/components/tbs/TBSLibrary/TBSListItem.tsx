"use client";

import { memo } from "react";
import Link from "next/link";
import { TBSTypeIcon, TBSType } from "./TBSTypeIcon";
import { TBSProgressBadge, TBSStatus } from "./TBSProgressBadge";

interface TBSListItemProps {
  id: string;
  title: string;
  topic: string;
  subtopic?: string;
  tbsType: TBSType;
  timeEstimateMinutes: number;
  maxScorePoints: number;
  exhibitCount: number;
  status?: TBSStatus;
  bestScore?: number | null;
  compact?: boolean;
}

export const TBSListItem = memo(function TBSListItem({
  id,
  title,
  topic,
  subtopic,
  tbsType,
  timeEstimateMinutes,
  maxScorePoints,
  exhibitCount,
  status = "not_started",
  bestScore,
  compact = false,
}: TBSListItemProps) {
  if (compact) {
    return (
      <Link
        href={`/dashboard/simulations/${id}`}
        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
      >
        <div className="flex items-center gap-2 min-w-0">
          <TBSTypeIcon type={tbsType} size="sm" />
          <span className="text-sm text-gray-800 dark:text-gray-200 truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {status !== "not_started" && (
            <TBSProgressBadge status={status} score={bestScore} size="sm" />
          )}
          <svg
            className="w-4 h-4 text-gray-400 group-hover:text-[var(--primary)] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/dashboard/simulations/${id}`}
      className="block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-[var(--primary)] hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-2">
            <TBSTypeIcon type={tbsType} />
            <span className="text-xs text-gray-500 dark:text-gray-500">
              ~{timeEstimateMinutes} min
            </span>
            {status !== "not_started" && (
              <TBSProgressBadge status={status} score={bestScore} />
            )}
          </div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-[var(--primary)] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
            {topic}
            {subtopic && ` - ${subtopic}`}
          </p>
        </div>
        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              {maxScorePoints} pts
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {exhibitCount} exhibit{exhibitCount !== 1 ? "s" : ""}
            </div>
          </div>
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-[var(--primary)] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
});
