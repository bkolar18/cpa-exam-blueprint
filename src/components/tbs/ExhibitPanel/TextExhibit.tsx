"use client";

import { TextContent } from "@/lib/data/tbs/types";

interface TextExhibitProps {
  content: TextContent;
}

export default function TextExhibit({ content }: TextExhibitProps) {
  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        {/* Title */}
        {content.title && (
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
              {content.title}
            </h3>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            {content.paragraphs.map((paragraph, index) => {
              // Handle string paragraphs
              if (typeof paragraph === "string") {
                const trimmed = paragraph.trim();
                if (!trimmed) return <br key={index} />;

                // Handle section headers (all caps or ends with colon)
                if (trimmed === trimmed.toUpperCase() && trimmed.length < 50) {
                  return (
                    <h4 key={index} className="text-sm font-bold text-gray-800 dark:text-gray-200 mt-4 mb-2">
                      {trimmed}
                    </h4>
                  );
                }

                if (trimmed.endsWith(":") && !trimmed.includes(" ")) {
                  return (
                    <h4 key={index} className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-3 mb-1">
                      {trimmed}
                    </h4>
                  );
                }

                // Handle [DROPDOWN:X] placeholders
                if (trimmed.includes("[DROPDOWN:")) {
                  const parts = trimmed.split(/(\[DROPDOWN:\d+\])/g);
                  return (
                    <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {parts.map((part, partIndex) => {
                        if (part.match(/\[DROPDOWN:\d+\]/)) {
                          return (
                            <span
                              key={partIndex}
                              className="inline-block mx-1 px-3 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded border border-blue-300 dark:border-blue-700 text-sm font-medium"
                            >
                              [Select Answer]
                            </span>
                          );
                        }
                        return part;
                      })}
                    </p>
                  );
                }

                // Regular paragraph
                return (
                  <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {trimmed}
                  </p>
                );
              }

              // Handle HighlightableParagraph objects
              const paraObj = paragraph as { text: string; highlightableRanges?: Array<{ id: string; start: number; end: number }> };
              return (
                <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {paraObj.text}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
