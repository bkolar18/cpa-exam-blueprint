"use client";

import { useState, useCallback } from"react";
import { TBSRequirement, UserResponse } from"@/lib/data/tbs/types";

interface NumericEntryGridProps {
 requirements: TBSRequirement[];
 responses: Record<string, UserResponse>;
 onResponseChange: (requirementId: string, response: UserResponse) => void;
 isSubmitted: boolean;
 showHints?: boolean;
}

function formatNumber(value: number | null): string {
 if (value === null || value === undefined) return"";
 return value.toLocaleString("en-US", {
 minimumFractionDigits: 0,
 maximumFractionDigits: 2,
 });
}

function parseNumber(value: string): number | null {
 if (!value.trim()) return null;
 // Remove commas and dollar signs
 const cleaned = value.replace(/[$,\s]/g,"");
 const parsed = parseFloat(cleaned);
 return isNaN(parsed) ? null : parsed;
}

export default function NumericEntryGrid({
 requirements,
 responses,
 onResponseChange,
 isSubmitted,
 showHints = false,
}: NumericEntryGridProps) {
 // Ensure responses is never null to prevent crashes
 const safeResponses = responses || {};

 // Track which cells are being edited (to show raw input)
 const [editingCell, setEditingCell] = useState<string | null>(null);
 const [editValue, setEditValue] = useState<string>("");

 const handleFocus = useCallback((reqId: string) => {
 setEditingCell(reqId);
 const response = safeResponses[reqId] as { type:"numeric"; value: number | null } | undefined;
 setEditValue(response?.value !== null && response?.value !== undefined ? String(response.value) :"");
 }, [safeResponses]);

 const handleBlur = useCallback((reqId: string) => {
 const numericValue = parseNumber(editValue);
 onResponseChange(reqId, {
 type:"numeric",
 value: numericValue,
 });
 setEditingCell(null);
 setEditValue("");
 }, [editValue, onResponseChange]);

 const handleKeyDown = useCallback((e: React.KeyboardEvent, reqId: string) => {
 if (e.key ==="Enter") {
 handleBlur(reqId);
 // Focus next input
 const currentIndex = requirements.findIndex((r) => r.id === reqId);
 if (currentIndex < requirements.length - 1) {
 const nextInput = document.getElementById(`numeric-${requirements[currentIndex + 1].id}`);
 nextInput?.focus();
 }
 }
 if (e.key ==="Escape") {
 setEditingCell(null);
 setEditValue("");
 }
 }, [handleBlur, requirements]);

 // Group requirements by grid row if cellReference is available
 const groupedRequirements = requirements.reduce((acc, req) => {
 const row = req.gridRow ?? 0;
 if (!acc[row]) acc[row] = [];
 acc[row].push(req);
 return acc;
 }, {} as Record<number, TBSRequirement[]>);

 const rows = Object.keys(groupedRequirements).map(Number).sort((a, b) => a - b);

 return (
 <div className="p-4">
 <div className="bg-white dark:bg-[var(--card)] border border-gray-200 rounded-lg overflow-hidden">
 {/* Header */}
 <div className="bg-gray-50 dark:bg-[var(--background)] px-4 py-3 border-b border-gray-200">
 <h3 className="text-sm font-semibold text-gray-700 dark:text-[var(--muted-light)]">
 Enter Your Answers
 </h3>
 <p className="text-xs text-gray-500 dark:text-[var(--muted)] mt-1">
 Enter numeric values. Use negative numbers or parentheses for negative amounts.
 </p>
 </div>

 {/* Grid */}
 <div className="p-4">
 {rows.length > 0 ? (
 <table className="w-full">
 <tbody>
 {rows.map((rowNum) => (
 <tr key={rowNum}>
 {groupedRequirements[rowNum]
 .sort((a, b) => (a.gridColumn ?? 0) - (b.gridColumn ?? 0))
 .map((req) => {
 const response = safeResponses[req.id] as { type:"numeric"; value: number | null } | undefined;
 const isEditing = editingCell === req.id;
 const displayValue = isEditing
 ? editValue
 : response?.value !== null && response?.value !== undefined
 ? formatNumber(response.value)
 :"";

 return (
 <td key={req.id} className="py-2 pr-4">
 <div className="space-y-1">
 <label
 htmlFor={`numeric-${req.id}`}
 className="block text-sm font-medium text-gray-700 dark:text-[var(--muted-light)]"
 >
 {req.label}
 {req.cellReference && (
 <span className="ml-2 text-xs text-gray-400 dark:text-[var(--muted)]">
 ({req.cellReference})
 </span>
 )}
 </label>
 <div className="relative">
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[var(--muted)]">
 $
 </span>
 <input
 id={`numeric-${req.id}`}
 type="text"
 value={displayValue}
 onChange={(e) => setEditValue(e.target.value)}
 onFocus={() => handleFocus(req.id)}
 onBlur={() => handleBlur(req.id)}
 onKeyDown={(e) => handleKeyDown(e, req.id)}
 disabled={isSubmitted}
 className="w-full pl-7 pr-4 py-2 border border-gray-300 dark:border-[var(--border)] rounded-lg bg-white dark:bg-[var(--card-hover)] text-gray-800 dark:text-[var(--foreground)] text-right font-mono focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
 placeholder="0"
 />
 </div>
 {req.hint && showHints && !isSubmitted && (
 <p className="text-xs text-blue-600 dark:text-blue-400">
 💡 {req.hint}
 </p>
 )}
 </div>
 </td>
 );
 })}
 </tr>
 ))}
 </tbody>
 </table>
 ) : (
 // Simple list layout if no grid positions defined
 <div className="space-y-4">
 {requirements.map((req, index) => {
 const response = safeResponses[req.id] as { type:"numeric"; value: number | null } | undefined;
 const isEditing = editingCell === req.id;
 const displayValue = isEditing
 ? editValue
 : response?.value !== null && response?.value !== undefined
 ? formatNumber(response.value)
 :"";

 return (
 <div key={req.id} className="flex items-center space-x-4">
 <span className="w-8 h-8 flex-shrink-0 rounded-full bg-gray-100 dark:bg-[var(--card-hover)] flex items-center justify-center text-sm font-medium text-gray-600 dark:text-[var(--muted)]">
 {index + 1}
 </span>
 <div className="flex-1">
 <label
 htmlFor={`numeric-${req.id}`}
 className="block text-sm font-medium text-gray-700 dark:text-[var(--muted-light)] mb-1"
 >
 {req.label}
 </label>
 <div className="relative max-w-xs">
 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-[var(--muted)]">
 $
 </span>
 <input
 id={`numeric-${req.id}`}
 type="text"
 value={displayValue}
 onChange={(e) => setEditValue(e.target.value)}
 onFocus={() => handleFocus(req.id)}
 onBlur={() => handleBlur(req.id)}
 onKeyDown={(e) => handleKeyDown(e, req.id)}
 disabled={isSubmitted}
 className="w-full pl-7 pr-4 py-2 border border-gray-300 dark:border-[var(--border)] rounded-lg bg-white dark:bg-[var(--card-hover)] text-gray-800 dark:text-[var(--foreground)] text-right font-mono focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
 placeholder="0"
 />
 </div>
 {req.hint && showHints && !isSubmitted && (
 <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
 💡 {req.hint}
 </p>
 )}
 </div>
 </div>
 );
 })}
 </div>
 )}
 </div>
 </div>
 </div>
 );
}
