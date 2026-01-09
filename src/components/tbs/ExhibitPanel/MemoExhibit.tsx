"use client";

import { MemoContent, EmailContent } from "@/lib/data/tbs/types";

interface MemoExhibitProps {
  content: MemoContent | EmailContent;
}

export default function MemoExhibit({ content }: MemoExhibitProps) {
  const isEmail = content.type === "email";

  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 p-4 space-y-2">
          {/* From */}
          <div className="flex">
            <span className="w-20 text-sm font-medium text-gray-500 dark:text-gray-400">
              From:
            </span>
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {content.from}
            </span>
          </div>

          {/* To */}
          <div className="flex">
            <span className="w-20 text-sm font-medium text-gray-500 dark:text-gray-400">
              To:
            </span>
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {content.to}
            </span>
          </div>

          {/* CC (Email only) */}
          {isEmail && (content as EmailContent).cc && (
            <div className="flex">
              <span className="w-20 text-sm font-medium text-gray-500 dark:text-gray-400">
                CC:
              </span>
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {(content as EmailContent).cc}
              </span>
            </div>
          )}

          {/* Date */}
          <div className="flex">
            <span className="w-20 text-sm font-medium text-gray-500 dark:text-gray-400">
              Date:
            </span>
            <span className="text-sm text-gray-800 dark:text-gray-200">
              {content.date}
            </span>
          </div>

          {/* Subject */}
          <div className="flex">
            <span className="w-20 text-sm font-medium text-gray-500 dark:text-gray-400">
              {isEmail ? "Subject:" : "Re:"}
            </span>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {content.subject}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {content.body.split("\n").map((paragraph, index) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return <br key={index} />;

              // Handle numbered lists
              const numberedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
              if (numberedMatch) {
                return (
                  <p key={index} className="text-gray-700 dark:text-gray-300 ml-4">
                    <span className="font-medium">{numberedMatch[1]}.</span> {numberedMatch[2]}
                  </p>
                );
              }

              // Handle bullet points
              if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
                return (
                  <p key={index} className="text-gray-700 dark:text-gray-300 ml-4">
                    • {trimmed.substring(1).trim()}
                  </p>
                );
              }

              return (
                <p key={index} className="text-gray-700 dark:text-gray-300">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>

        {/* Attachments (Email only) */}
        {isEmail && (content as EmailContent).attachments && (content as EmailContent).attachments!.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Attachments:
            </p>
            <div className="flex flex-wrap gap-2">
              {(content as EmailContent).attachments!.map((attachment, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  {attachment}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
