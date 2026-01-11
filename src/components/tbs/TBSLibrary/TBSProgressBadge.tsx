"use client";

import { memo } from"react";

export type TBSStatus ="not_started"|"in_progress"|"completed";

interface TBSProgressBadgeProps {
 status: TBSStatus;
 score?: number | null;
 size?:"sm"|"md";
}

const statusConfig: Record<
 TBSStatus,
 { label: string; bgColor: string; textColor: string; dotColor: string }
> = {
 not_started: {
 label:"Not Started",
 bgColor:"bg-gray-100 dark:bg-[var(--card-hover)]",
 textColor:"text-gray-600 dark:text-[var(--muted)]",
 dotColor:"bg-gray-400 dark:bg-gray-500",
 },
 in_progress: {
 label:"In Progress",
 bgColor:"bg-amber-100 dark:bg-amber-900/40",
 textColor:"text-amber-700 dark:text-amber-300",
 dotColor:"bg-amber-500",
 },
 completed: {
 label:"Completed",
 bgColor:"bg-green-100 dark:bg-green-900/40",
 textColor:"text-green-700 dark:text-green-300",
 dotColor:"bg-green-500",
 },
};

const sizeClasses = {
 sm:"text-xs px-2 py-0.5",
 md:"text-sm px-2.5 py-1",
};

export const TBSProgressBadge = memo(function TBSProgressBadge({
 status,
 score,
 size ="sm",
}: TBSProgressBadgeProps) {
 const config = statusConfig[status];

 // If completed with a score, show the score
 if (status ==="completed"&& score !== null && score !== undefined) {
 const scoreColor =
 score >= 75
 ?"bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
 : score >= 50
 ?"bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
 :"bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300";

 return (
 <span
 className={`inline-flex items-center gap-1 font-medium rounded ${scoreColor} ${sizeClasses[size]}`}
 >
 <svg
 className="w-3 h-3"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M5 13l4 4L19 7"
 />
 </svg>
 {Math.round(score)}%
 </span>
 );
 }

 return (
 <span
 className={`inline-flex items-center gap-1.5 font-medium rounded ${config.bgColor} ${config.textColor} ${sizeClasses[size]}`}
 >
 <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
 {config.label}
 </span>
 );
});
