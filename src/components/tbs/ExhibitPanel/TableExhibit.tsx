"use client";

import { TableContent } from "@/lib/data/tbs/types";

interface TableExhibitProps {
  content: TableContent;
}

export default function TableExhibit({ content }: TableExhibitProps) {
  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden">
        {/* Title */}
        {content.title && (
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {content.title}
            </h3>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Headers */}
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-900">
                {content.headers.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody>
              {content.rows.map((row, rowIndex) => {
                const rowData = "cells" in row ? row.cells : row;
                const isHeaderRow = "isHeader" in row && row.isHeader;
                const isBold = "isBold" in row && row.isBold;

                return (
                  <tr
                    key={rowIndex}
                    className={`${
                      isHeaderRow
                        ? "bg-gray-50 dark:bg-gray-900/50"
                        : rowIndex % 2 === 0
                          ? "bg-white dark:bg-gray-800"
                          : "bg-gray-50/50 dark:bg-gray-800/50"
                    }`}
                  >
                    {(rowData as (string | number | null)[]).map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`px-4 py-2 text-sm border-b border-gray-100 dark:border-gray-700 ${
                          isBold || isHeaderRow
                            ? "font-semibold text-gray-800 dark:text-gray-200"
                            : "text-gray-700 dark:text-gray-300"
                        } ${
                          typeof cell === "number" ? "text-right font-mono" : "text-left"
                        }`}
                      >
                        {cell !== null && cell !== undefined
                          ? typeof cell === "number"
                            ? cell.toLocaleString()
                            : cell
                          : "—"}
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
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {content.footnotes.map((footnote, index) => (
              <p key={index} className="text-xs text-gray-500 dark:text-gray-400">
                {footnote}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
