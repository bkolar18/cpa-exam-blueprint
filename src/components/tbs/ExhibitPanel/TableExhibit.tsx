"use client";

import { TableContent } from"@/lib/data/tbs/types";

interface TableExhibitProps {
 content: TableContent;
}

export default function TableExhibit({ content }: TableExhibitProps) {
 return (
 <div className="p-4">
 <div className="bg-white dark:bg-[var(--card)] border border-gray-200 rounded-lg shadow-sm overflow-hidden">
 {/* Title */}
 {content.title && (
 <div className="px-4 py-3 bg-gray-50 dark:bg-[var(--background)] border-b border-gray-200">
 <h3 className="text-sm font-semibold text-gray-800 dark:text-[var(--foreground)]">
 {content.title}
 </h3>
 </div>
 )}

 {/* Table */}
 <div className="overflow-x-auto">
 <table className="w-full">
 {/* Headers */}
 <thead>
 <tr className="bg-gray-100 dark:bg-[var(--background)]">
 {content.headers.map((header, index) => (
 <th
 key={index}
 className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-[var(--muted-light)] border-b border-gray-200"
 >
 {header}
 </th>
 ))}
 </tr>
 </thead>

 {/* Body */}
 <tbody>
 {content.rows.map((row, rowIndex) => {
 const rowData ="cells"in row ? row.cells : row;
 const isHeaderRow ="isHeader"in row && row.isHeader;
 const isBold ="isBold"in row && row.isBold;

 return (
 <tr
 key={rowIndex}
 className={`${
 isHeaderRow
 ?"bg-gray-50 dark:bg-[var(--background)]/50"
 : rowIndex % 2 === 0
 ?"bg-white dark:bg-[var(--card)]"
 :"bg-gray-50/50 dark:bg-[var(--card)]/50"
 }`}
 >
 {(rowData as (string | number | null)[]).map((cell, cellIndex) => (
 <td
 key={cellIndex}
 className={`px-4 py-2 text-sm border-b border-gray-100 ${
 isBold || isHeaderRow
 ?"font-semibold text-gray-800 dark:text-[var(--foreground)]"
 :"text-gray-700 dark:text-[var(--muted-light)]"
 } ${
 typeof cell ==="number"?"text-right font-mono":"text-left"
 }`}
 >
 {cell !== null && cell !== undefined
 ? typeof cell ==="number"
 ? cell.toLocaleString()
 : cell
 :"—"}
 </td>
 ))}
 </tr>
 );
 })}
 </tbody>
 </table>
 </div>

 {/* Footnotes */}
 {content.footnotes && content.footnotes.length > 0 && (
 <div className="px-4 py-3 bg-gray-50 dark:bg-[var(--background)] border-t border-gray-200">
 {content.footnotes.map((footnote, index) => (
 <p key={index} className="text-xs text-gray-500 dark:text-[var(--muted)]">
 {footnote}
 </p>
 ))}
 </div>
 )}
 </div>
 </div>
 );
}
