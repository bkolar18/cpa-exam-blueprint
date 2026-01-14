"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";

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
  mcq_responses: Array<{
    questionId: string;
    selectedAnswer: string | null;
    isCorrect: boolean;
    timeSpent: number;
  }>;
  tbs_responses: Array<{
    tbsId: string;
    responses: Record<string, unknown>;
    scoreEarned: number;
    maxScore: number;
    timeSpent: number;
  }>;
}

interface DebriefData {
  id: string;
  simulationId: string;
  section: string;
  content: string;
  summary: {
    mcq: { correct: number; total: number; accuracy: number };
    tbs: { earned: number; max: number; accuracy: number } | null;
    timeUsed: number;
    timeLimit: number;
  };
  createdAt: string;
}

const sectionNames: Record<string, string> = {
  FAR: "Financial Accounting & Reporting",
  AUD: "Auditing & Attestation",
  REG: "Regulation",
  TCP: "Tax Compliance & Planning",
  BAR: "Business Analysis & Reporting",
  ISC: "Information Systems & Controls",
};

export default function ExamDebriefPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const supabase = createClient();
  const examId = params.examId as string;

  const [examHistory, setExamHistory] = useState<ExamHistory | null>(null);
  const [debrief, setDebrief] = useState<DebriefData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth/login");
      return;
    }
    fetchData();
  }, [user, authLoading, examId]);

  const fetchData = async () => {
    if (!supabase || !user) return;

    try {
      // Fetch exam history
      const { data: examData, error: examError } = await supabase
        .from("exam_simulation_history")
        .select("*")
        .eq("id", examId)
        .eq("user_id", user.id)
        .single();

      if (examError || !examData) {
        console.error("Failed to fetch exam history:", examError);
        setError("Exam not found");
        setLoading(false);
        return;
      }

      setExamHistory(examData as ExamHistory);

      // Check for existing debrief
      const debriefResponse = await fetch(`/api/ai/exam-debrief?simulationId=${examId}`);
      if (debriefResponse.ok) {
        const debriefData = await debriefResponse.json();
        if (debriefData.exists && debriefData.debrief) {
          setDebrief(debriefData.debrief);
        }
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const generateDebrief = async () => {
    if (!examHistory) return;

    setGenerating(true);
    setError(null);

    try {
      // Get topic info for each MCQ
      const mcqAttempts = (examHistory.mcq_responses || []).map((response) => ({
        questionId: response.questionId,
        topic: "General", // We'd need to fetch actual topics from questions
        isCorrect: response.isCorrect,
        timeSpentSeconds: response.timeSpent,
      }));

      // Format TBS attempts
      const tbsAttempts = (examHistory.tbs_responses || []).map((tbs) => ({
        tbsId: tbs.tbsId,
        tbsType: "Document Review", // We'd need to fetch actual types
        topic: "General",
        score: tbs.scoreEarned,
        maxScore: tbs.maxScore,
        timeSpentSeconds: tbs.timeSpent,
      }));

      const response = await fetch("/api/ai/exam-debrief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          simulationId: examId,
          section: examHistory.section,
          mcqAttempts,
          tbsAttempts: tbsAttempts.length > 0 ? tbsAttempts : undefined,
          totalTimeSeconds: examHistory.time_spent_seconds,
          timeLimitSeconds: examHistory.time_limit_seconds,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate debrief");
      }

      const data = await response.json();

      // Set the debrief from the response
      setDebrief({
        id: data.debriefId || "new",
        simulationId: examId,
        section: examHistory.section,
        content: data.debrief,
        summary: data.summary,
        createdAt: data.generatedAt,
      });
    } catch (err) {
      console.error("Error generating debrief:", err);
      setError(err instanceof Error ? err.message : "Failed to generate debrief");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error && !examHistory) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-bold text-[var(--foreground)]">Error</h2>
          <p className="text-[var(--muted)] mt-2">{error}</p>
          <Link href="/dashboard/exam-simulation" className="btn-primary mt-4 inline-block">
            Back to Exam Simulation
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
        <Link href="/dashboard/exam-simulation" className="hover:text-[var(--primary)]">
          Exam Simulation
        </Link>
        <span>/</span>
        <Link href={`/dashboard/exam-simulation/history/${examId}`} className="hover:text-[var(--primary)]">
          Exam Results
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">AI Debrief</span>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-xl border border-purple-200 dark:border-purple-800/50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">AI Exam Debrief</h1>
            <p className="text-[var(--muted)]">
              {sectionNames[examHistory?.section || ""] || examHistory?.section} Simulation
            </p>
          </div>
        </div>

        {examHistory && (
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {examHistory.total_score_percentage?.toFixed(0) || 0}%
              </p>
              <p className="text-xs text-[var(--muted)]">Overall Score</p>
            </div>
            <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {examHistory.mcq_correct}/{examHistory.mcq_count}
              </p>
              <p className="text-xs text-[var(--muted)]">MCQ Correct</p>
            </div>
            <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center">
              <p className="text-2xl font-bold text-[var(--foreground)]">
                {Math.floor(examHistory.time_spent_seconds / 60)}m
              </p>
              <p className="text-xs text-[var(--muted)]">Time Used</p>
            </div>
          </div>
        )}
      </div>

      {/* Debrief Content or Generate Button */}
      {debrief ? (
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Performance Analysis</h2>
            <span className="text-xs text-[var(--muted)]">
              Generated {new Date(debrief.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-[var(--foreground)] bg-transparent p-0 m-0 leading-relaxed">
              {debrief.content}
            </pre>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
            Ready to Generate Your Debrief
          </h3>
          <p className="text-[var(--muted)] mb-6 max-w-md mx-auto">
            Get personalized insights about your exam performance, including strengths, areas for improvement, and specific recommendations.
          </p>
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          <button
            onClick={generateDebrief}
            disabled={generating}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing Performance...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate AI Debrief
              </>
            )}
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Link
          href={`/dashboard/exam-simulation/history/${examId}`}
          className="px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--card-hover)] transition-colors inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Exam Results
        </Link>
        <Link
          href="/dashboard/exam-simulation"
          className="btn-primary"
        >
          New Exam
        </Link>
      </div>
    </div>
  );
}
