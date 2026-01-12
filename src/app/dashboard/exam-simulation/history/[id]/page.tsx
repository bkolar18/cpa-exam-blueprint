"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { getQuestionById, PracticeQuestion } from "@/lib/data/practice-questions";

interface MCQResponse {
  questionId: string;
  selectedAnswer: string | null;
  isCorrect: boolean;
  timeSpent: number;
}

interface TBSResponse {
  tbsId: string;
  responses: Record<string, unknown>;
  scoreEarned: number;
  maxScore: number;
  timeSpent: number;
}

interface ExamHistory {
  id: string;
  section: string;
  exam_type: string;
  started_at: string;
  completed_at: string | null;
  mcq_count: number;
  mcq_correct: number;
  mcq_score_percentage: number | null;
  tbs_count: number;
  tbs_score_percentage: number | null;
  total_score_percentage: number | null;
  time_limit_seconds: number;
  time_spent_seconds: number;
  mcq_responses: MCQResponse[];
  tbs_responses: TBSResponse[];
  mcq_question_ids: string[];
  tbs_question_ids: string[];
}

const sectionNames: Record<string, string> = {
  FAR: "Financial Accounting & Reporting",
  AUD: "Auditing & Attestation",
  REG: "Regulation",
  TCP: "Tax Compliance & Planning",
  BAR: "Business Analysis & Reporting",
  ISC: "Information Systems & Controls",
};

const examTypeLabels: Record<string, string> = {
  mini: "MCQ Only (20 questions)",
  mixed: "Mixed Practice (20 MCQ + 1 TBS)",
  realistic: "Realistic Testlet (36 MCQ + 2 TBS)",
};

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

export default function ExamHistoryPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const supabase = createClient();
  const examId = params.id as string;

  const [examHistory, setExamHistory] = useState<ExamHistory | null>(null);
  const [questions, setQuestions] = useState<Map<string, PracticeQuestion>>(new Map());
  const [loading, setLoading] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth/login");
      return;
    }
    fetchExamHistory();
  }, [user, authLoading, examId]);

  const fetchExamHistory = async () => {
    if (!supabase || !user) return;

    const { data, error } = await supabase
      .from("exam_simulation_history")
      .select("*")
      .eq("id", examId)
      .eq("user_id", user.id)
      .single();

    if (error || !data) {
      console.error("Failed to fetch exam history:", error);
      setLoading(false);
      return;
    }

    setExamHistory(data as ExamHistory);

    // Load question details for all MCQ questions
    const questionMap = new Map<string, PracticeQuestion>();
    for (const qId of data.mcq_question_ids || []) {
      const question = getQuestionById(qId);
      if (question) {
        questionMap.set(qId, question);
      }
    }
    setQuestions(questionMap);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!examHistory) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-bold text-[var(--foreground)]">Exam Not Found</h2>
          <p className="text-[var(--muted)] mt-2">This exam simulation could not be found.</p>
          <Link href="/dashboard/study-log" className="btn-primary mt-4 inline-block">
            Back to Study Log
          </Link>
        </div>
      </div>
    );
  }

  const mcqResponses = examHistory.mcq_responses || [];
  const correctCount = mcqResponses.filter((r) => r.isCorrect).length;
  const incorrectCount = mcqResponses.filter((r) => !r.isCorrect && r.selectedAnswer).length;
  const skippedCount = mcqResponses.filter((r) => !r.selectedAnswer).length;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
        <Link href="/dashboard/study-log" className="hover:text-[var(--primary)]">
          Study Log
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">Exam Review</span>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              {sectionNames[examHistory.section] || examHistory.section} Exam
            </h1>
            <p className="text-[var(--muted)] mt-1">
              {examTypeLabels[examHistory.exam_type] || examHistory.exam_type}
            </p>
            <p className="text-sm text-[var(--muted)] mt-2">
              {examHistory.completed_at &&
                new Date(examHistory.completed_at).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
            </p>
          </div>
          <div className="text-right">
            <p
              className={`text-4xl font-bold ${
                (examHistory.total_score_percentage || 0) >= 75
                  ? "text-green-600 dark:text-green-400"
                  : (examHistory.total_score_percentage || 0) >= 50
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {examHistory.total_score_percentage?.toFixed(0) || 0}%
            </p>
            <p className="text-sm text-[var(--muted)]">Overall Score</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-[var(--card)] dark:bg-[var(--card-hover)] rounded-lg p-4">
            <p className="text-sm text-[var(--muted)]">MCQ Score</p>
            <p className="text-xl font-bold text-[var(--foreground)]">
              {examHistory.mcq_correct}/{examHistory.mcq_count}
            </p>
            <p className="text-sm text-[var(--muted)]">
              {examHistory.mcq_score_percentage?.toFixed(0) || 0}%
            </p>
          </div>
          {examHistory.tbs_count > 0 && (
            <div className="bg-[var(--card)] dark:bg-[var(--card-hover)] rounded-lg p-4">
              <p className="text-sm text-[var(--muted)]">TBS Score</p>
              <p className="text-xl font-bold text-[var(--foreground)]">
                {examHistory.tbs_score_percentage?.toFixed(0) || 0}%
              </p>
              <p className="text-sm text-[var(--muted)]">{examHistory.tbs_count} TBS</p>
            </div>
          )}
          <div className="bg-[var(--card)] dark:bg-[var(--card-hover)] rounded-lg p-4">
            <p className="text-sm text-[var(--muted)]">Time Used</p>
            <p className="text-xl font-bold text-[var(--foreground)]">
              {formatTime(examHistory.time_spent_seconds)}
            </p>
            <p className="text-sm text-[var(--muted)]">
              of {formatTime(examHistory.time_limit_seconds)}
            </p>
          </div>
          <div className="bg-[var(--card)] dark:bg-[var(--card-hover)] rounded-lg p-4">
            <p className="text-sm text-[var(--muted)]">Breakdown</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-green-600 dark:text-green-400 font-bold">{correctCount}</span>
              <span className="text-[var(--muted)]">/</span>
              <span className="text-red-600 dark:text-red-400 font-bold">{incorrectCount}</span>
              {skippedCount > 0 && (
                <>
                  <span className="text-[var(--muted)]">/</span>
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold">{skippedCount}</span>
                </>
              )}
            </div>
            <p className="text-xs text-[var(--muted)]">
              Correct / Incorrect{skippedCount > 0 ? " / Skipped" : ""}
            </p>
          </div>
        </div>
      </div>

      {/* MCQ Questions List */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)]">
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">MCQ Questions</h2>
          <p className="text-sm text-[var(--muted)] mt-1">Click on a question to see details</p>
        </div>

        <div className="divide-y divide-[var(--border)]">
          {mcqResponses.map((response, index) => {
            const question = questions.get(response.questionId);
            return (
              <button
                key={response.questionId}
                onClick={() => setSelectedQuestion(selectedQuestion === index ? null : index)}
                className="w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                        response.isCorrect
                          ? "bg-green-500"
                          : !response.selectedAnswer
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)]">
                        {question?.topic || "Question"} - Q{index + 1}
                      </p>
                      <p className="text-sm text-[var(--muted)]">
                        {response.selectedAnswer
                          ? `Your answer: ${response.selectedAnswer}`
                          : "Skipped"}
                        {question && ` • Correct: ${question.correctAnswer}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-[var(--muted)]">
                      {formatTime(response.timeSpent)}
                    </span>
                    <svg
                      className={`w-5 h-5 text-[var(--muted)] transition-transform ${
                        selectedQuestion === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Expanded Question Details */}
                {selectedQuestion === index && question && (
                  <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <p className="text-[var(--foreground)] mb-4">{question.question}</p>
                    <div className="space-y-2">
                      {(["A", "B", "C", "D"] as const).map((letter) => (
                        <div
                          key={letter}
                          className={`p-3 rounded-lg border ${
                            letter === question.correctAnswer
                              ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600"
                              : letter === response.selectedAnswer && !response.isCorrect
                              ? "bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-600"
                              : "bg-[var(--card)] dark:bg-[var(--card-hover)] border-[var(--border)]"
                          }`}
                        >
                          <span className="font-medium">{letter}.</span> {question.options[letter]}
                          {letter === question.correctAnswer && (
                            <span className="ml-2 text-green-600 dark:text-green-400 text-sm">
                              (Correct)
                            </span>
                          )}
                          {letter === response.selectedAnswer && letter !== question.correctAnswer && (
                            <span className="ml-2 text-red-600 dark:text-red-400 text-sm">
                              (Your answer)
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                          Explanation
                        </p>
                        <p className="text-sm text-blue-900 dark:text-blue-100">
                          {question.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TBS Summary (if applicable) */}
      {examHistory.tbs_count > 0 && examHistory.tbs_responses && examHistory.tbs_responses.length > 0 && (
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)]">
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">TBS Questions</h2>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {examHistory.tbs_responses.map((tbs, index) => (
              <div key={tbs.tbsId} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-[var(--foreground)]">TBS {index + 1}</p>
                    <p className="text-sm text-[var(--muted)]">ID: {tbs.tbsId}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        tbs.maxScore > 0 && tbs.scoreEarned / tbs.maxScore >= 0.75
                          ? "text-green-600 dark:text-green-400"
                          : tbs.maxScore > 0 && tbs.scoreEarned / tbs.maxScore >= 0.5
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {tbs.scoreEarned}/{tbs.maxScore}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {tbs.maxScore > 0
                        ? `${Math.round((tbs.scoreEarned / tbs.maxScore) * 100)}%`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/dashboard/study-log"
          className="px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--card-hover)] transition-colors"
        >
          Back to Study Log
        </Link>
        <Link
          href={`/dashboard/exam-simulation/${examHistory.section.toLowerCase()}`}
          className="btn-primary"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
}
