"use client";

import { memo } from "react";
import Link from "next/link";
import { TBSListItem } from "./TBSListItem";
import { TBSType } from "./TBSTypeIcon";
import { TBSStatus } from "./TBSProgressBadge";

interface TBSPreview {
  id: string;
  title: string;
  topic: string;
  subtopic?: string;
  tbsType: TBSType;
  timeEstimateMinutes: number;
  maxScorePoints: number;
  exhibitCount: number;
}

interface TBSSectionCardProps {
  sectionCode: string;
  sectionName: string;
  totalCount: number;
  completedCount: number;
  averageScore?: number | null;
  previewItems: TBSPreview[];
  getStatus?: (tbsId: string) => TBSStatus;
  getBestScore?: (tbsId: string) => number | null;
}

const sectionColors: Record<string, string> = {
  FAR: "from-blue-500 to-blue-600",
  AUD: "from-emerald-500 to-emerald-600",
  REG: "from-orange-500 to-orange-600",
  TCP: "from-purple-500 to-purple-600",
  BAR: "from-pink-500 to-pink-600",
  ISC: "from-cyan-500 to-cyan-600",
};

export const TBSSectionCard = memo(function TBSSectionCard({
  sectionCode,
  sectionName,
  totalCount,
  completedCount,
  averageScore,
  previewItems,
  getStatus,
  getBestScore,
}: TBSSectionCardProps) {
  const progressPercent =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const gradientClass = sectionColors[sectionCode] || sectionColors.FAR;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${gradientClass} p-4`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-white/20 text-white text-sm font-bold px-2 py-0.5 rounded">
                {sectionCode}
              </span>
              <span className="text-white/90 text-sm font-medium">
                {totalCount} TBS
              </span>
            </div>
            <h3 className="text-white font-semibold mt-1">{sectionName}</h3>
          </div>
          {averageScore !== null && averageScore !== undefined && (
            <div className="text-right">
              <div className="text-white/70 text-xs">Avg Score</div>
              <div className="text-white text-xl font-bold">
                {Math.round(averageScore)}%
              </div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-white/80 mb-1">
            <span>Progress</span>
            <span>
              {completedCount}/{totalCount} completed
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

      {/* Preview TBS items */}
      <div className="p-3 space-y-1 bg-gray-50 dark:bg-gray-800/50">
        {previewItems.slice(0, 3).map((tbs) => (
          <TBSListItem
            key={tbs.id}
            id={tbs.id}
            title={tbs.title}
            topic={tbs.topic}
            subtopic={tbs.subtopic}
            tbsType={tbs.tbsType}
            timeEstimateMinutes={tbs.timeEstimateMinutes}
            maxScorePoints={tbs.maxScorePoints}
            exhibitCount={tbs.exhibitCount}
            status={getStatus?.(tbs.id) || "not_started"}
            bestScore={getBestScore?.(tbs.id)}
            compact
          />
        ))}
      </div>

      {/* View All link */}
      <Link
        href={`/dashboard/simulations/section/${sectionCode.toLowerCase()}`}
        className="flex items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 text-[var(--primary)] font-medium hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
      >
        View All {totalCount} Simulations
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
