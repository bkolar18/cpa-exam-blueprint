"use client";

import { FinancialStatementContent } from"@/lib/data/tbs/types";

interface FinancialExhibitProps {
 content: FinancialStatementContent;
}

function formatCurrency(value: number | string | null): string {
 if (value === null || value === undefined) return"";
 if (typeof value ==="string") return value;

 // Handle negative numbers with parentheses
 if (value < 0) {
 return `(${Math.abs(value).toLocaleString()})`;
 }
 return value.toLocaleString();
}

export default function FinancialExhibit({ content }: FinancialExhibitProps) {
 const columns = content.columns || ["Amount"];

 return (
 <div className="p-4">
 <div className="bg-white dark:bg-[var(--card)] border border-gray-200 rounded-lg shadow-sm overflow-hidden">
 {/* Header */}
 <div className="px-4 py-4 bg-gray-50 dark:bg-[var(--background)] border-b border-gray-200 text-center">
 {content.companyName && (
 <h2 className="text-base font-bold text-gray-800 dark:text-[var(--foreground)]">
 {content.companyName}
 </h2>
 )}
 <h3 className="text-sm font-semibold text-gray-700 dark:text-[var(--muted-light)]">
 {content.title}
 </h3>
 <p className="text-sm text-gray-500 dark:text-[var(--muted)]">
 {content.period}
 </p>
 </div>

 {/* Financial Statement Table */}
 <div className="overflow-x-auto">
 <table className="w-full">
 {/* Column Headers (if multiple columns) */}
 {columns.length > 1 && (
 <thead>
 <tr className="border-b border-gray-200">
 <th className="px-4 py-2 text-left w-1/2"></th>
 {columns.map((col, index) => (
 <th
 key={index}
 className="px-4 py-2 text-right text-sm font-semibold text-gray-700 dark:text-[var(--muted-light)]"
 >
 {col}
 </th>
 ))}
 </tr>
 </thead>
 )}

 <tbody>
 {content.rows.map((row, rowIndex) => {
 const indent = row.indent || 0;
 const paddingLeft = 16 + indent * 20; // Base 16px + 20px per indent level

 return (
 <tr
 key={rowIndex}
 className={`${
 row.isTotal
 ?"border-t-2 border-gray-400 dark:border-[var(--border)] bg-gray-50 dark:bg-[var(--background)]/50"
 : row.isSubtotal
 ?"border-t border-gray-300 dark:border-[var(--border)]"
 :""
 }`}
 >
 {/* Label */}
 <td
 className={`py-1.5 text-sm ${
 row.isBold || row.isTotal
 ?"font-semibold text-gray-800 dark:text-[var(--foreground)]"
 :"text-gray-700 dark:text-[var(--muted-light)]"
 }`}
 style={{ paddingLeft: `${paddingLeft}px` }}
 >
 {row.label}
 </td>

 {/* Values */}
 {row.values.map((value, valueIndex) => (
 <td
 key={valueIndex}
 className={`px-4 py-1.5 text-sm text-right font-mono ${
 row.isBold || row.isTotal
 ?"font-semibold text-gray-800 dark:text-[var(--foreground)]"
 :"text-gray-700 dark:text-[var(--muted-light)]"
 } ${
 typeof value ==="number"&& value < 0
 ?"text-red-600 dark:text-red-400"
 :""
 }`}
 >
 {row.isTotal && valueIndex === row.values.length - 1 ? (
 <span className="border-b-2 border-gray-800 dark:border-gray-200 pb-0.5">
 ${formatCurrency(value)}
 </span>
 ) : row.isSubtotal ? (
 <span className="border-b border-gray-400 dark:border-[var(--border)] pb-0.5">
 ${formatCurrency(value)}
 </span>
 ) : value !== null && value !== undefined ? (
 `$${formatCurrency(value)}`
 ) : (
""
 )}
 </td>
 ))}
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>

 {/* Notes */}
 {content.notes && content.notes.length > 0 && (
 <div className="px-4 py-3 bg-gray-50 dark:bg-[var(--background)] border-t border-gray-200">
 <p className="text-xs font-medium text-gray-500 dark:text-[var(--muted)] mb-1">
 Notes:
 </p>
 {content.notes.map((note, index) => (
 <p key={index} className="text-xs text-gray-500 dark:text-[var(--muted)]">
 {note}
 </p>
 ))}
 </div>
 )}
 </div>
 </div>
 );
}
