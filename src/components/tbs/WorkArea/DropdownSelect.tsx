"use client";

import { useState, useRef, useEffect } from "react";
import { TBSRequirement, DropdownOption, DropdownResponse } from "@/lib/data/tbs/types";

interface DropdownSelectProps {
  requirement: TBSRequirement;
  response: DropdownResponse | null;
  onResponseChange: (response: DropdownResponse) => void;
  isSubmitted: boolean;
  showCorrectAnswer?: boolean;
}

export default function DropdownSelect({
  requirement,
  response,
  onResponseChange,
  isSubmitted,
  showCorrectAnswer = false,
}: DropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const options = requirement.dropdownOptions || [];
  const selectedOption = options.find(opt => opt.id === response?.selectedOptionId);
  const correctOption = options.find(opt => opt.isCorrect);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if dropdown should open upward based on available space
  const checkDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const dropdownHeight = Math.min(options.length * 48, 240); // Estimate max height

      // If less than dropdown height + 20px buffer below, open upward
      setOpenUpward(spaceBelow < dropdownHeight + 20);
    }
  };

  const handleSelect = (option: DropdownOption) => {
    if (isSubmitted) return;

    onResponseChange({
      type: "dropdown",
      selectedOptionId: option.id,
    });
    setIsOpen(false);
  };

  const isCorrect = isSubmitted && selectedOption?.isCorrect;
  const isIncorrect = isSubmitted && selectedOption && !selectedOption.isCorrect;

  return (
    <div className="mb-4">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {requirement.label}
        {requirement.description && (
          <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1 font-normal">
            {requirement.description}
          </span>
        )}
      </label>

      {/* Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => {
            if (!isSubmitted) {
              checkDropdownPosition();
              setIsOpen(!isOpen);
            }
          }}
          disabled={isSubmitted}
          className={`w-full px-4 py-3 text-left border rounded-lg transition-colors flex items-center justify-between ${
            isSubmitted
              ? isCorrect
                ? "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200"
                : isIncorrect
                ? "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200"
                : "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600"
              : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:border-blue-500 cursor-pointer"
          }`}
        >
          <span className={selectedOption ? "" : "text-gray-400"}>
            {selectedOption?.text || "Select an answer..."}
          </span>

          {!isSubmitted && (
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}

          {isSubmitted && isCorrect && (
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}

          {isSubmitted && isIncorrect && (
            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>

        {/* Dropdown Options */}
        {isOpen && !isSubmitted && (
          <div
            className={`absolute z-50 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto ${
              openUpward ? "bottom-full mb-1" : "top-full mt-1"
            }`}
          >
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option)}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors ${
                  option.id === response?.selectedOptionId
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {option.text}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Show correct answer after submission */}
      {isSubmitted && showCorrectAnswer && isIncorrect && correctOption && (
        <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-800 dark:text-green-200">
            <span className="font-medium">Correct answer:</span> {correctOption.text}
          </p>
        </div>
      )}

      {/* Explanation */}
      {isSubmitted && requirement.explanation && (
        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <span className="font-medium">Explanation:</span> {requirement.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
