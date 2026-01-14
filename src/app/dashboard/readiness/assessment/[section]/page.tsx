"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

const sectionNames: Record<string, string> = {
  far: "Financial Accounting & Reporting",
  aud: "Auditing & Attestation",
  reg: "Regulation",
  tcp: "Tax Compliance & Planning",
  bar: "Business Analysis & Reporting",
  isc: "Information Systems & Controls",
};

interface AssessmentData {
  id: string;
  content: string;
  summary: {
    section: string;
    examDate: string;
    daysRemaining: number;
    primeMeridianScore: number | null;
    totalAttempted: number | null;
    mockExamTrend: string;
    studyStreak: number;
  };
  createdAt: string;
}

export default function PreExamAssessmentPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const section = (params.section as string).toUpperCase();
  const sectionLower = (params.section as string).toLowerCase();

  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assessmentStatus, setAssessmentStatus] = useState<{
    available: boolean;
    alreadyGenerated: boolean;
    examDate?: string;
    daysUntilExam?: number;
  } | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth/login");
      return;
    }
    checkAndFetchAssessment();
  }, [user, authLoading, section]);

  const checkAndFetchAssessment = async () => {
    setLoading(true);
    try {
      // First check status and try to get existing assessment
      const response = await fetch(`/api/ai/pre-exam-assessment?section=${section}&includeContent=true`);
      if (response.ok) {
        const data = await response.json();
        setAssessmentStatus(data);

        if (data.assessment) {
          setAssessment(data.assessment);
        }
      } else {
        const errorData = await response.json();
        if (errorData.reason === 'No exam date scheduled') {
          setError('noExamDate');
        }
      }
    } catch (err) {
      console.error('Error checking assessment:', err);
      setError('Failed to load assessment status');
    } finally {
      setLoading(false);
    }
  };

  const generateAssessment = async () => {
    setGenerating(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/pre-exam-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.alreadyGenerated) {
          // Assessment was already generated, refetch it
          await checkAndFetchAssessment();
          return;
        }
        throw new Error(errorData.error || 'Failed to generate assessment');
      }

      const data = await response.json();
      setAssessment({
        id: data.assessmentId || 'new',
        content: data.assessment,
        summary: data.summary,
        createdAt: data.generatedAt,
      });
      setAssessmentStatus(prev => prev ? { ...prev, alreadyGenerated: true } : null);
    } catch (err) {
      console.error('Error generating assessment:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate assessment');
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

  if (error === 'noExamDate') {
    return (
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
          <Link href="/dashboard/readiness" className="hover:text-[var(--primary)]">
            Exam Preparation
          </Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">{section} Pre-Exam Assessment</span>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800 p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Schedule Your Exam First</h2>
          <p className="text-[var(--muted)] mb-6 max-w-md mx-auto">
            To generate your Pre-Exam Assessment, you need to have an exam date scheduled for {section}.
            This allows us to provide personalized recommendations based on your remaining preparation time.
          </p>
          <Link
            href="/dashboard/nts"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Go to NTS Tracker
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
        <Link href="/dashboard/readiness" className="hover:text-[var(--primary)]">
          Exam Preparation
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{section} Pre-Exam Assessment</span>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800/50 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)]">{section} Pre-Exam Assessment</h1>
            <p className="text-[var(--muted)]">
              {sectionNames[sectionLower] || section}
            </p>
          </div>
        </div>

        {assessmentStatus?.examDate && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-[var(--foreground)]">
                {new Date(assessmentStatus.examDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              <p className="text-xs text-[var(--muted)]">Exam Date</p>
            </div>
            <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center">
              <p className="text-lg font-bold text-[var(--foreground)]">
                {assessmentStatus.daysUntilExam}
              </p>
              <p className="text-xs text-[var(--muted)]">Days Left</p>
            </div>
            {assessment?.summary && (
              <>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-[var(--foreground)]">
                    {assessment.summary.primeMeridianScore || '--'}
                  </p>
                  <p className="text-xs text-[var(--muted)]">Prime Meridian</p>
                </div>
                <div className="bg-white/50 dark:bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-[var(--foreground)]">
                    {assessment.summary.totalAttempted || 0}
                  </p>
                  <p className="text-xs text-[var(--muted)]">Questions Done</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* One-time usage notice */}
        <div className="mt-4 flex items-center gap-2 text-sm text-amber-700 dark:text-amber-300 bg-amber-100/50 dark:bg-amber-900/30 rounded-lg px-3 py-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            {assessment
              ? `Assessment generated on ${new Date(assessment.createdAt).toLocaleDateString()}`
              : 'You get one Pre-Exam Assessment per scheduled exam. Make sure you\'re ready to review your comprehensive analysis.'}
          </span>
        </div>
      </div>

      {/* Assessment Content or Generate Button */}
      {assessment ? (
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Your Pre-Exam Readiness Assessment</h2>
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-[var(--foreground)] bg-transparent p-0 m-0 leading-relaxed text-sm">
              {assessment.content}
            </pre>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
            <svg className="w-10 h-10 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
            Ready to Generate Your Assessment
          </h3>
          <p className="text-[var(--muted)] mb-6 max-w-lg mx-auto">
            This comprehensive AI-powered assessment will analyze your preparation metrics, identify strengths and areas for improvement,
            and provide personalized recommendations for your upcoming {section} exam.
          </p>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-6 max-w-md mx-auto">
            <p className="text-sm font-medium text-[var(--foreground)] mb-2">Your assessment will include:</p>
            <ul className="text-sm text-[var(--muted)] space-y-1 text-left">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Content area breakdown with AICPA weights
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mock exam performance trend analysis
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Specific observations and recommendations
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Options to consider for final preparation
              </li>
            </ul>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <button
            onClick={generateAssessment}
            disabled={generating}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium hover:from-amber-700 hover:to-orange-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing Your Preparation...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                Generate Pre-Exam Assessment
              </>
            )}
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Link
          href="/dashboard/readiness"
          className="px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--card-hover)] transition-colors inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Exam Preparation
        </Link>
        {assessment && (
          <Link
            href={`/dashboard/practice/${sectionLower}`}
            className="btn-primary"
          >
            Continue Practicing
          </Link>
        )}
      </div>
    </div>
  );
}
