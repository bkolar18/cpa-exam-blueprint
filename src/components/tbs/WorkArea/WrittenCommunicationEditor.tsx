"use client";

import { useState, useMemo, useCallback } from "react";
import { TBSRequirement, TextResponse } from "@/lib/data/tbs/types";

interface WrittenCommunicationEditorProps {
  requirement: TBSRequirement;
  response: TextResponse | null;
  onResponseChange: (response: TextResponse) => void;
  isSubmitted: boolean;
}

// Common business writing templates
const WRITING_TEMPLATES = [
  { id: "memo", label: "Memorandum", icon: "📝" },
  { id: "letter", label: "Business Letter", icon: "✉️" },
  { id: "email", label: "Email", icon: "📧" },
];

// Word count ranges for CPA exam
const WORD_COUNT_GUIDELINES = {
  min: 150,
  target: 300,
  max: 500,
};

export default function WrittenCommunicationEditor({
  requirement,
  response,
  onResponseChange,
  isSubmitted,
}: WrittenCommunicationEditorProps) {
  const [text, setText] = useState(response?.value || "");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  // Calculate word and character counts using useMemo to avoid useEffect setState
  const { wordCount, charCount } = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(word => word.length > 0).length : 0;
    const chars = text.length;
    return { wordCount: words, charCount: chars };
  }, [text]);

  // Calculate counts for onChange callback
  const calculateCounts = useCallback((content: string) => {
    const trimmed = content.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(word => word.length > 0).length : 0;
    const chars = content.length;
    return { words, chars };
  }, []);

  const handleTextChange = (newText: string) => {
    setText(newText);
    const { words } = calculateCounts(newText);
    onResponseChange({
      type: "text",
      value: newText,
      wordCount: words,
    });
  };

  const applyTemplate = (templateId: string) => {
    let template = "";
    switch (templateId) {
      case "memo":
        template = `MEMORANDUM

TO: [Recipient Name and Title]
FROM: [Your Name and Title]
DATE: [Date]
RE: [Subject]

[Introduction - State the purpose of the memo]

[Body - Present the analysis, findings, or recommendations]

[Conclusion - Summarize key points and any action items]
`;
        break;
      case "letter":
        template = `[Date]

[Recipient Name]
[Recipient Title]
[Company Name]
[Address]

Dear [Recipient Name]:

[Opening paragraph - State the purpose of the letter]

[Body paragraphs - Present the main content]

[Closing paragraph - Summarize and indicate next steps]

Sincerely,

[Your Name]
[Your Title]
`;
        break;
      case "email":
        template = `Subject: [Clear, specific subject line]

Dear [Recipient Name],

[Opening - Brief statement of purpose]

[Body - Main content with clear paragraphs]

[Closing - Summary and call to action]

Best regards,
[Your Name]
[Your Title]
`;
        break;
    }

    if (text.trim() && template) {
      const confirmReplace = window.confirm("This will replace your current text. Continue?");
      if (!confirmReplace) return;
    }

    setSelectedTemplate(templateId);
    handleTextChange(template);
  };

  const getWordCountStatus = () => {
    if (wordCount < WORD_COUNT_GUIDELINES.min) {
      return { color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30", message: "Below minimum" };
    }
    if (wordCount <= WORD_COUNT_GUIDELINES.target) {
      return { color: "text-green-600", bg: "bg-green-100 dark:bg-green-900/30", message: "Good length" };
    }
    if (wordCount <= WORD_COUNT_GUIDELINES.max) {
      return { color: "text-amber-600", bg: "bg-amber-100 dark:bg-amber-900/30", message: "Getting long" };
    }
    return { color: "text-red-600", bg: "bg-red-100 dark:bg-red-900/30", message: "Too long" };
  };

  const wordCountStatus = getWordCountStatus();

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Written Communication
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {requirement.label}
        </p>
        {requirement.description && (
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {requirement.description}
          </p>
        )}
      </div>

      {/* Toolbar */}
      {!isSubmitted && (
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex items-center gap-4 flex-wrap">
          {/* Templates */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">Templates:</span>
            {WRITING_TEMPLATES.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => applyTemplate(template.id)}
                className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                  selectedTemplate === template.id
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {template.icon} {template.label}
              </button>
            ))}
          </div>

          {/* Formatting Tips */}
          <div className="ml-auto">
            <button
              type="button"
              className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
              onClick={() => alert("Writing Tips:\n\n• Use clear, professional language\n• Organize with proper structure\n• Support claims with specific references\n• Proofread for grammar and spelling\n• Stay within word count guidelines")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Writing Tips
            </button>
          </div>
        </div>
      )}

      {/* Editor */}
      <div className="flex-1 p-4">
        <textarea
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          disabled={isSubmitted}
          placeholder="Enter your written response here..."
          className={`w-full h-full min-h-[300px] p-4 border rounded-lg resize-none font-mono text-sm leading-relaxed ${
            isSubmitted
              ? "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          }`}
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        />
      </div>

      {/* Footer with counts */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          {/* Word Count Progress */}
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1.5 rounded-lg ${wordCountStatus.bg}`}>
              <span className={`text-sm font-medium ${wordCountStatus.color}`}>
                {wordCount} words
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                ({wordCountStatus.message})
              </span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {charCount} characters
            </span>
          </div>

          {/* Guidelines */}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Target: {WORD_COUNT_GUIDELINES.min}-{WORD_COUNT_GUIDELINES.max} words
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              wordCount < WORD_COUNT_GUIDELINES.min
                ? "bg-red-500"
                : wordCount <= WORD_COUNT_GUIDELINES.target
                ? "bg-green-500"
                : wordCount <= WORD_COUNT_GUIDELINES.max
                ? "bg-amber-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${Math.min((wordCount / WORD_COUNT_GUIDELINES.max) * 100, 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Grading Criteria (shown after submission) */}
      {isSubmitted && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Grading Criteria
          </h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium text-gray-700 dark:text-gray-300">Organization</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Clear structure with introduction, body, and conclusion
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium text-gray-700 dark:text-gray-300">Development</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Relevant content that addresses the topic completely
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium text-gray-700 dark:text-gray-300">Expression</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Professional tone with proper grammar and spelling
              </p>
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="font-medium text-gray-700 dark:text-gray-300">Word Choice</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                Appropriate technical vocabulary and clear language
              </p>
            </div>
          </div>

          {requirement.explanation && (
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <span className="font-medium">Guidance:</span> {requirement.explanation}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
