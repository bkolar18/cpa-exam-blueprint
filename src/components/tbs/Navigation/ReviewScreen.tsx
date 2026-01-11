"use client";

import { TBSQuestion, UserResponse } from"@/lib/data/tbs/types";

interface ReviewScreenProps {
 tbs: TBSQuestion;
 responses: Record<string, UserResponse>;
 isFlagged: boolean;
 elapsedSeconds: number;
 timeLimit: number;
 onJumpToRequirement: (requirementId: string) => void;
 onSubmit: () => void;
 onCancel: () => void;
}

function formatTime(seconds: number): string {
 const mins = Math.floor(seconds / 60);
 const secs = seconds % 60;
 return `${mins}:${secs.toString().padStart(2,"0")}`;
}

export default function ReviewScreen({
 tbs,
 responses,
 isFlagged,
 elapsedSeconds,
 timeLimit,
 onJumpToRequirement,
 onSubmit,
 onCancel,
}: ReviewScreenProps) {
 // Ensure responses is never null to prevent crashes
 const safeResponses = responses || {};

 // Get status for each requirement
 const requirementStatuses = tbs.requirements.map((req) => {
 const response = safeResponses[req.id];
 let status:"complete"|"incomplete"|"empty"="empty";

 if (response) {
 switch (response.type) {
 case"numeric":
 status = response.value !== null ?"complete":"empty";
 break;
 case"dropdown":
 status = response.selectedOptionId !== null ?"complete":"empty";
 break;
 case"journal_debit":
 case"journal_credit":
 status =
 response.accountId !== null && response.amount !== null
 ?"complete"
 : response.accountId !== null || response.amount !== null
 ?"incomplete"
 :"empty";
 break;
 case"text":
 case"citation":
 status = response.value.trim().length > 0 ?"complete":"empty";
 break;
 case"checkbox":
 status = response.selectedIds.length > 0 ?"complete":"empty";
 break;
 case"matching":
 status = response.pairs.length > 0 ?"complete":"empty";
 break;
 }
 }

 return {
 id: req.id,
 label: req.label,
 order: req.order,
 points: req.points,
 status,
 };
 });

 const completeCount = requirementStatuses.filter((r) => r.status ==="complete").length;
 const incompleteCount = requirementStatuses.filter((r) => r.status ==="incomplete").length;
 const emptyCount = requirementStatuses.filter((r) => r.status ==="empty").length;
 const totalCount = requirementStatuses.length;

 const remainingSeconds = Math.max(0, timeLimit - elapsedSeconds);
 const isLowTime = remainingSeconds < 300; // Less than 5 minutes

 return (
 <div className="flex-1 overflow-auto bg-gray-50 dark:bg-[var(--background)] p-6">
 <div className="max-w-3xl mx-auto">
 {/* Header */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-gray-200 p-6 mb-6">
 <h2 className="text-xl font-bold text-gray-800 dark:text-[var(--foreground)] mb-2">
 Review Before Submitting
 </h2>
 <p className="text-gray-600 dark:text-[var(--muted)]">
 Review your answers below. Click on any item to return to it.
 </p>
 </div>

 {/* Summary Stats */}
 <div className="grid grid-cols-4 gap-4 mb-6">
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-gray-200 p-4 text-center">
 <div className="text-2xl font-bold text-gray-800 dark:text-[var(--foreground)]">
 {totalCount}
 </div>
 <div className="text-sm text-gray-500 dark:text-[var(--muted)]">Total Items</div>
 </div>
 <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-4 text-center">
 <div className="text-2xl font-bold text-green-600 dark:text-green-400">
 {completeCount}
 </div>
 <div className="text-sm text-green-600 dark:text-green-400">Complete</div>
 </div>
 <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 p-4 text-center">
 <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
 {incompleteCount}
 </div>
 <div className="text-sm text-amber-600 dark:text-amber-400">Partial</div>
 </div>
 <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-4 text-center">
 <div className="text-2xl font-bold text-red-600 dark:text-red-400">
 {emptyCount}
 </div>
 <div className="text-sm text-red-600 dark:text-red-400">Unanswered</div>
 </div>
 </div>

 {/* Flag Status */}
 {isFlagged && (
 <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-6">
 <div className="flex items-center gap-2">
 <svg className="w-5 h-5 text-orange-500"fill="currentColor"viewBox="0 0 24 24">
 <path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
 </svg>
 <span className="text-orange-700 dark:text-orange-300 font-medium">
 This TBS is flagged for review
 </span>
 </div>
 </div>
 )}

 {/* Time Remaining */}
 <div
 className={`rounded-xl border p-4 mb-6 ${
 isLowTime
 ?"bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
 :"bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
 }`}
 >
 <div className="flex items-center justify-between">
 <span
 className={`font-medium ${
 isLowTime
 ?"text-red-700 dark:text-red-300"
 :"text-blue-700 dark:text-blue-300"
 }`}
 >
 Time Remaining
 </span>
 <span
 className={`text-2xl font-mono font-bold ${
 isLowTime
 ?"text-red-600 dark:text-red-400"
 :"text-blue-600 dark:text-blue-400"
 }`}
 >
 {formatTime(remainingSeconds)}
 </span>
 </div>
 {isLowTime && (
 <p className="text-sm text-red-600 dark:text-red-400 mt-2">
 Less than 5 minutes remaining. Consider submitting soon.
 </p>
 )}
 </div>

 {/* Requirement List */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-gray-200 overflow-hidden mb-6">
 <div className="px-4 py-3 bg-gray-50 dark:bg-[var(--background)] border-b border-gray-200">
 <h3 className="font-semibold text-gray-800 dark:text-[var(--foreground)]">
 Answer Status
 </h3>
 </div>
 <div className="divide-y divide-gray-200 dark:divide-[var(--border)]">
 {requirementStatuses.map((req, index) => (
 <button
 key={req.id}
 onClick={() => onJumpToRequirement(req.id)}
 className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
 >
 <div className="flex items-center gap-3">
 <span className="text-sm font-medium text-gray-500 dark:text-[var(--muted)] w-6">
 {index + 1}.
 </span>
 <span className="text-gray-800 dark:text-[var(--foreground)]">{req.label}</span>
 <span className="text-xs text-gray-500 dark:text-[var(--muted)]">
 ({req.points} pt{req.points !== 1 ?"s":""})
 </span>
 </div>
 <div className="flex items-center gap-2">
 {req.status ==="complete"&& (
 <span className="px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
 Complete
 </span>
 )}
 {req.status ==="incomplete"&& (
 <span className="px-2 py-1 text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded">
 Partial
 </span>
 )}
 {req.status ==="empty"&& (
 <span className="px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
 Unanswered
 </span>
 )}
 <svg
 className="w-4 h-4 text-gray-400"
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
 </button>
 ))}
 </div>
 </div>

 {/* Warning for unanswered */}
 {emptyCount > 0 && (
 <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
 <div className="flex items-start gap-3">
 <svg
 className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
 />
 </svg>
 <div>
 <p className="text-amber-700 dark:text-amber-300 font-medium">
 You have {emptyCount} unanswered item{emptyCount !== 1 ?"s":""}
 </p>
 <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
 Unanswered items will receive zero points. Click on any item above to
 complete it before submitting.
 </p>
 </div>
 </div>
 </div>
 )}

 {/* Action Buttons */}
 <div className="flex gap-4 justify-end">
 <button
 onClick={onCancel}
 className="px-6 py-3 text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
 >
 Return to Questions
 </button>
 <button
 onClick={onSubmit}
 className={`px-6 py-3 rounded-lg font-medium transition-colors ${
 completeCount === totalCount
 ?"bg-green-600 hover:bg-green-700 text-white"
 :"bg-amber-600 hover:bg-amber-700 text-white"
 }`}
 >
 {completeCount === totalCount ?"Submit Answers":"Submit Anyway"}
 </button>
 </div>
 </div>
 </div>
 );
}
