"use client";

import { useState } from "react";
import Link from "next/link";
import { PracticeQuestion } from "@/lib/data/practice-questions";
import FeedbackButton from "./FeedbackButton";
import QuestionReview from "./QuestionReview";

interface QuizResult {
  question: PracticeQuestion;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
}

interface QuizResultsProps {
  section: string;
  sectionName: string;
  results: QuizResult[];
  onRetry: () => void;
  onNewQuiz: () => void;
  studySessionLogged?: boolean;
}

export default function QuizResults({
  section,
  sectionName,
  results,
  onRetry,
  onNewQuiz,
  studySessionLogged = false,
}: QuizResultsProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const totalQuestions = results.length;
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);

  const getScoreColor = () => {
    if (accuracy >= 80) return 'text-green-600 dark:text-green-400';
    if (accuracy >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreMessage = () => {
    if (accuracy >= 90) return "Outstanding! You're exam ready!";
    if (accuracy >= 80) return "Great job! Keep practicing!";
    if (accuracy >= 70) return "Good progress! Focus on weak areas.";
    if (accuracy >= 60) return "Getting there! Review the topics you missed.";
    return "Keep studying! Review the explanations carefully.";
  };

  // Group results by topic for analysis
  const topicAnalysis = results.reduce((acc, result) => {
    const topic = result.question.topic;
    if (!acc[topic]) {
      acc[topic] = { total: 0, correct: 0 };
    }
    acc[topic].total++;
    if (result.isCorrect) acc[topic].correct++;
    return acc;
  }, {} as Record<string, { total: number; correct: number }>);

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--primary)] to-blue-600 p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Quiz Complete!</h2>
          <p className="text-white/80">{sectionName}</p>
        </div>

        <div className="p-8 text-center">
          <div className={`text-6xl font-bold ${getScoreColor()} mb-2`}>
            {accuracy}%
          </div>
          <p className="text-[var(--muted)] mb-4">
            {correctAnswers} of {totalQuestions} correct
          </p>
          <p className="text-lg font-medium text-[var(--foreground)]">
            {getScoreMessage()}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 border-t border-[var(--border)] dark:border-gray-700">
          <div className="p-4 text-center border-r border-[var(--border)] dark:border-gray-700">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{correctAnswers}</div>
            <div className="text-sm text-[var(--muted)]">Correct</div>
          </div>
          <div className="p-4 text-center border-r border-[var(--border)] dark:border-gray-700">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{totalQuestions - correctAnswers}</div>
            <div className="text-sm text-[var(--muted)]">Incorrect</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-[var(--primary)]">{totalQuestions}</div>
            <div className="text-sm text-[var(--muted)]">Total</div>
          </div>
        </div>
      </div>

      {/* Study Session Logged Notice */}
      {studySessionLogged && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-green-800 dark:text-green-300">Study Session Logged!</p>
            <p className="text-sm text-green-600 dark:text-green-400">
              This practice session has been automatically added to your Study Log.
            </p>
          </div>
          <Link
            href="/dashboard/study-log"
            className="ml-auto text-sm font-medium text-green-700 dark:text-green-300 hover:text-green-800 dark:hover:text-green-200 whitespace-nowrap"
          >
            View Log &rarr;
          </Link>
        </div>
      )}

      {/* Topic Analysis */}
      {Object.keys(topicAnalysis).length > 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-6">
          <h3 className="font-semibold text-[var(--foreground)] mb-4">Performance by Topic</h3>
          <div className="space-y-3">
            {Object.entries(topicAnalysis).map(([topic, data]) => {
              const topicAccuracy = Math.round((data.correct / data.total) * 100);
              return (
                <div key={topic}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[var(--foreground)]">{topic}</span>
                    <span className={`font-medium ${
                      topicAccuracy >= 75 ? 'text-green-600 dark:text-green-400' : topicAccuracy >= 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {data.correct}/{data.total} ({topicAccuracy}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        topicAccuracy >= 75 ? 'bg-green-500' : topicAccuracy >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${topicAccuracy}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Question Review */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-[var(--foreground)]">Question Review</h3>
          <span className="text-sm text-[var(--muted)]">Click to view full explanation</span>
        </div>
        <div className="space-y-3">
          {results.map((result, index) => (
            <button
              key={result.question.id}
              onClick={() => setSelectedQuestion(index)}
              className={`w-full p-4 rounded-lg border text-left transition-all hover:shadow-md ${
                result.isCorrect
                  ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700'
                  : 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      result.isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="text-xs text-[var(--muted)]">{result.question.topic}</span>
                    {result.question.subtopic && (
                      <span className="text-xs text-[var(--muted)]">/ {result.question.subtopic}</span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--foreground)] line-clamp-2">{result.question.question}</p>
                  <div className="mt-2 text-xs">
                    {result.isCorrect ? (
                      <span className="text-green-700 dark:text-green-300">
                        {result.selectedAnswer}. {result.question.options[result.selectedAnswer]}
                      </span>
                    ) : (
                      <div className="space-y-1">
                        <span className="text-red-700 dark:text-red-300 block">
                          Your answer: {result.selectedAnswer}. {result.question.options[result.selectedAnswer]}
                        </span>
                        <span className="text-green-700 dark:text-green-300 block">
                          Correct: {result.question.correctAnswer}. {result.question.options[result.question.correctAnswer]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <FeedbackButton
                    questionId={result.question.id}
                    section={result.question.section}
                    variant="compact"
                  />
                  <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Question Review Modal */}
      {selectedQuestion !== null && results[selectedQuestion] && (
        <QuestionReview
          question={results[selectedQuestion].question}
          selectedAnswer={results[selectedQuestion].selectedAnswer}
          isCorrect={results[selectedQuestion].isCorrect}
          questionNumber={selectedQuestion + 1}
          onClose={() => setSelectedQuestion(null)}
        />
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRetry}
          className="flex-1 py-3 px-6 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors"
        >
          Retry Same Questions
        </button>
        <button
          onClick={onNewQuiz}
          className="flex-1 py-3 px-6 border-2 border-[var(--primary)] text-[var(--primary)] rounded-lg font-semibold hover:bg-[var(--primary)] hover:text-white transition-colors"
        >
          New Quiz
        </button>
        <Link
          href="/dashboard/practice"
          className="flex-1 py-3 px-6 bg-[var(--card)] dark:bg-gray-700 text-[var(--foreground)] rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-center"
        >
          Back to Practice
        </Link>
      </div>
    </div>
  );
}
