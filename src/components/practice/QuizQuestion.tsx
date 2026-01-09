"use client";

import { useState } from "react";
import { PracticeQuestion } from "@/lib/data/practice-questions";
import FeedbackButton from "./FeedbackButton";

interface QuizQuestionProps {
  question: PracticeQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedAnswer: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => void;
  onNext: () => void;
  isLast: boolean;
}

export default function QuizQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  isLast,
}: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSelectAnswer = (answer: 'A' | 'B' | 'C' | 'D') => {
    if (hasSubmitted) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    const isCorrect = selectedAnswer === question.correctAnswer;
    onAnswer(selectedAnswer, isCorrect);
    setHasSubmitted(true);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setHasSubmitted(false);
    onNext();
  };

  // Difficulty colors removed - hiding difficulty from students

  const getOptionClass = (option: 'A' | 'B' | 'C' | 'D') => {
    const baseClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 flex items-start space-x-3";

    if (!hasSubmitted) {
      if (selectedAnswer === option) {
        return `${baseClass} border-[var(--primary)] bg-[var(--primary)]/5 dark:bg-[var(--primary)]/10`;
      }
      return `${baseClass} border-[var(--border)] dark:border-gray-600 hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 dark:hover:bg-[var(--primary)]/10`;
    }

    // After submission
    if (option === question.correctAnswer) {
      return `${baseClass} border-green-500 bg-green-50 dark:bg-green-900/30`;
    }
    if (selectedAnswer === option && option !== question.correctAnswer) {
      return `${baseClass} border-red-500 bg-red-50 dark:bg-red-900/30`;
    }
    return `${baseClass} border-[var(--border)] dark:border-gray-700 opacity-50`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--card)] dark:bg-gray-900 px-6 py-4 border-b border-[var(--border)] dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              Question {questionNumber} of {totalQuestions}
            </span>
            {/* Difficulty hidden - let adaptive model handle question selection */}
          </div>
          <span className="text-sm text-[var(--primary)] font-medium">{question.topic}</span>
        </div>
        {/* Progress bar */}
        <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
          <div
            className="bg-[var(--primary)] h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <p className="text-lg font-medium text-[var(--foreground)] mb-6">
          {question.question}
        </p>

        {/* Options */}
        <div className="space-y-3">
          {(['A', 'B', 'C', 'D'] as const).map((option) => (
            <button
              key={option}
              onClick={() => handleSelectAnswer(option)}
              disabled={hasSubmitted}
              className={getOptionClass(option)}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-semibold ${
                hasSubmitted
                  ? option === question.correctAnswer
                    ? 'bg-green-500 text-white'
                    : selectedAnswer === option
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400'
                  : selectedAnswer === option
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
              }`}>
                {option}
              </span>
              <span className="text-[var(--foreground)]">{question.options[option]}</span>
            </button>
          ))}
        </div>

        {/* Submit / Next Button */}
        {!hasSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className={`w-full mt-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedAnswer
                ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full mt-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-all duration-200"
          >
            {isLast ? 'See Results' : 'Next Question'}
          </button>
        )}

        {/* Explanation (shown after submission) */}
        {hasSubmitted && (
          <div className={`mt-6 p-4 rounded-lg ${
            selectedAnswer === question.correctAnswer ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold text-green-700 dark:text-green-300">Correct!</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-semibold text-red-700 dark:text-red-300">
                    Incorrect - The correct answer is {question.correctAnswer}
                  </span>
                </>
              )}
            </div>
            <p className="text-[var(--foreground)] text-sm">
              {question.explanation}
            </p>
            {question.tip && (
              <div className="mt-3 p-3 bg-white/50 dark:bg-gray-700/50 rounded border border-[var(--border)] dark:border-gray-600">
                <p className="text-sm text-[var(--primary)] font-medium">
                  <span className="font-bold">Tip:</span> {question.tip}
                </p>
              </div>
            )}

            {/* Feedback Button */}
            <div className="mt-4 pt-4 border-t border-[var(--border)] dark:border-gray-600 flex justify-end">
              <FeedbackButton
                questionId={question.id}
                section={question.section}
                variant="default"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
