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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getOptionClass = (option: 'A' | 'B' | 'C' | 'D') => {
    const baseClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 flex items-start space-x-3";

    if (!hasSubmitted) {
      if (selectedAnswer === option) {
        return `${baseClass} border-[var(--primary)] bg-[var(--primary)]/5`;
      }
      return `${baseClass} border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary)]/5`;
    }

    // After submission
    if (option === question.correctAnswer) {
      return `${baseClass} border-green-500 bg-green-50`;
    }
    if (selectedAnswer === option && option !== question.correctAnswer) {
      return `${baseClass} border-red-500 bg-red-50`;
    }
    return `${baseClass} border-[var(--border)] opacity-50`;
  };

  return (
    <div className="bg-white rounded-xl border border-[var(--border)] overflow-hidden">
      {/* Header */}
      <div className="bg-[var(--card)] px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-[var(--muted)]">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </span>
          </div>
          <span className="text-sm text-[var(--primary)] font-medium">{question.topic}</span>
        </div>
        {/* Progress bar */}
        <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
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
                      : 'bg-gray-200 text-gray-500'
                  : selectedAnswer === option
                    ? 'bg-[var(--primary)] text-white'
                    : 'bg-gray-200 text-gray-600'
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
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
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
            selectedAnswer === question.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold text-green-700">Correct!</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="font-semibold text-red-700">
                    Incorrect - The correct answer is {question.correctAnswer}
                  </span>
                </>
              )}
            </div>
            <p className="text-[var(--foreground)] text-sm">
              {question.explanation}
            </p>
            {question.tip && (
              <div className="mt-3 p-3 bg-white/50 rounded border border-[var(--border)]">
                <p className="text-sm text-[var(--primary)] font-medium">
                  <span className="font-bold">Tip:</span> {question.tip}
                </p>
              </div>
            )}

            {/* Feedback Button */}
            <div className="mt-4 pt-4 border-t border-[var(--border)] flex justify-end">
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
