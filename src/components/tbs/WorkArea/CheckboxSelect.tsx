"use client";

import { TBSRequirement, CheckboxResponse, CheckboxAnswer } from "@/lib/data/tbs/types";

interface CheckboxOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface CheckboxSelectProps {
  requirement: TBSRequirement;
  options: CheckboxOption[];
  response: CheckboxResponse | null;
  onResponseChange: (response: CheckboxResponse) => void;
  isSubmitted: boolean;
  showHint?: boolean;
}

export default function CheckboxSelect({
  requirement,
  options,
  response,
  onResponseChange,
  isSubmitted,
  showHint = false,
}: CheckboxSelectProps) {
  const selectedIds = response?.selectedIds || [];
  const correctAnswer = requirement.correctAnswer as CheckboxAnswer;

  const handleToggle = (optionId: string) => {
    if (isSubmitted) return;

    const newSelectedIds = selectedIds.includes(optionId)
      ? selectedIds.filter(id => id !== optionId)
      : [...selectedIds, optionId];

    onResponseChange({
      type: "checkbox",
      selectedIds: newSelectedIds,
    });
  };

  const isOptionCorrect = (optionId: string) => {
    return correctAnswer.correctSelections.includes(optionId);
  };

  const isUserSelectionCorrect = (optionId: string) => {
    const shouldBeSelected = isOptionCorrect(optionId);
    const wasSelected = selectedIds.includes(optionId);
    return shouldBeSelected === wasSelected;
  };

  return (
    <div className="space-y-3">
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {requirement.label}
        </label>
        {requirement.description && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {requirement.description}
          </p>
        )}
      </div>

      {/* Instructions */}
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Select all that apply
      </p>

      {/* Options */}
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selectedIds.includes(option.id);
          const isCorrectOption = isOptionCorrect(option.id);
          const userCorrect = isUserSelectionCorrect(option.id);

          return (
            <label
              key={option.id}
              className={`flex items-start p-3 border rounded-lg cursor-pointer transition-colors ${
                isSubmitted
                  ? userCorrect
                    ? isSelected
                      ? "bg-green-50 dark:bg-green-900/20 border-green-500"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    : isSelected
                      ? "bg-red-50 dark:bg-red-900/20 border-red-500"
                      : isCorrectOption
                        ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                  : isSelected
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-500"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
              } ${isSubmitted ? "cursor-default" : ""}`}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleToggle(option.id)}
                disabled={isSubmitted}
                className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="ml-3 flex-1">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {option.text}
                </span>
                {/* Show feedback after submission */}
                {isSubmitted && (
                  <span className="ml-2 inline-flex items-center">
                    {userCorrect ? (
                      isSelected && (
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )
                    ) : isSelected ? (
                      // Selected but shouldn't be
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      // Should have been selected but wasn't
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
                        (Should be selected)
                      </span>
                    )}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>

      {/* Hint */}
      {showHint && requirement.hint && !isSubmitted && (
        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <p className="text-sm text-amber-800 dark:text-amber-200">{requirement.hint}</p>
          </div>
        </div>
      )}

      {/* Explanation after submission */}
      {isSubmitted && requirement.explanation && (
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-medium">Explanation: </span>
            {requirement.explanation}
          </p>
        </div>
      )}

      {/* Selection count */}
      <div className="text-xs text-gray-500 dark:text-gray-400">
        {selectedIds.length} of {options.length} selected
        {isSubmitted && (
          <span className="ml-2">
            ({correctAnswer.correctSelections.length} correct answer{correctAnswer.correctSelections.length !== 1 ? "s" : ""})
          </span>
        )}
      </div>
    </div>
  );
}
