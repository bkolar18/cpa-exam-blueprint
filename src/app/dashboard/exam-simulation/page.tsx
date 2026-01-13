"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";
import { sectionHasQuestions, getQuestionCount } from "@/lib/data/practice-questions";
import type { SectionCode } from "@/lib/supabase/types";

const sections: { code: SectionCode; name: string; examInfo: { testlets: number; questionsPerTestlet: number; timeMinutes: number } }[] = [
  {
    code: "FAR",
    name: "Financial Accounting & Reporting",
    examInfo: { testlets: 5, questionsPerTestlet: 33, timeMinutes: 240 },
  },
  {
    code: "AUD",
    name: "Auditing & Attestation",
    examInfo: { testlets: 5, questionsPerTestlet: 36, timeMinutes: 240 },
  },
  {
    code: "REG",
    name: "Regulation",
    examInfo: { testlets: 5, questionsPerTestlet: 36, timeMinutes: 240 },
  },
  {
    code: "TCP",
    name: "Tax Compliance & Planning",
    examInfo: { testlets: 4, questionsPerTestlet: 34, timeMinutes: 240 },
  },
  {
    code: "BAR",
    name: "Business Analysis & Reporting",
    examInfo: { testlets: 4, questionsPerTestlet: 36, timeMinutes: 240 },
  },
  {
    code: "ISC",
    name: "Information Systems & Controls",
    examInfo: { testlets: 4, questionsPerTestlet: 36, timeMinutes: 240 },
  },
];

// Exam simulation configuration - realistic exam distribution
const EXAM_CONFIG = {
  mini: { questions: 20, timeMinutes: 40, label: "Mini Exam (20 min)" },
  half: { questions: 36, timeMinutes: 72, label: "Half Exam (72 min)" },
  full: { questions: 72, timeMinutes: 144, label: "Full Testlet (144 min)" },
};

export default function ExamSimulationPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [simulations, setSimulations] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return;
    setLoading(false);
  }, [authLoading]);

  const disciplineChoice = profile?.discipline_choice;
  const visibleSections = sections.filter(
    (s) => ["FAR", "AUD", "REG"].includes(s.code) || s.code === disciplineChoice || !disciplineChoice
  );

  const availableSections = visibleSections.filter(s => sectionHasQuestions(s.code));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Exam Simulation</h1>
          <p className="text-[var(--muted)]">Practice MCQs and TBS under real exam conditions</p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Simulate Real Exam Conditions</h2>
            <p className="text-white/80 max-w-xl">
              Practice with timed MCQs that reflect the CPA exam format. The real exam includes both
              Multiple Choice Questions (MCQs) and Task-Based Simulations (TBS) — practice both to be fully prepared.
            </p>
          </div>
          <div className="hidden md:block">
            <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Exam vs Practice Comparison */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Exam Simulation vs. Practice Mode</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-orange-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Exam Simulation
            </h3>
            <ul className="space-y-2 text-sm text-orange-700">
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Timed sessions with countdown timer
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Realistic difficulty distribution
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No explanations until completion
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Flag questions for review
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Full review at end only
              </li>
            </ul>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-3 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Practice Mode
            </h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Untimed, learn at your own pace
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Choose specific topics
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Instant feedback after each question
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Detailed explanations shown immediately
              </li>
              <li className="flex items-start">
                <svg className="w-4 h-4 mr-2 mt-0.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Best for learning new material
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Section Cards */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Choose a Section</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleSections.map((section) => {
            const isCore = ["FAR", "AUD", "REG"].includes(section.code);
            const hasQuestions = sectionHasQuestions(section.code);
            const questionCount = getQuestionCount(section.code);

            return (
              <div
                key={section.code}
                className={`bg-white dark:bg-[var(--card)] rounded-xl border p-5 transition-all duration-200 ${
                  hasQuestions
                    ? "border-[var(--border)] hover:border-orange-400 hover:shadow-md"
                    : "border-[var(--border)] opacity-75"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    hasQuestions ? "bg-orange-500" : "bg-gray-300"
                  }`}>
                    <span className="text-white font-bold">{section.code}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      isCore ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                    }`}>
                      {isCore ? "Core" : "Discipline"}
                    </span>
                    {hasQuestions && (
                      <span className="text-xs text-green-600 font-medium">
                        {questionCount} questions
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-[var(--foreground)] mb-1">{section.code}</h3>
                <p className="text-sm text-[var(--muted)] mb-3">{section.name}</p>

                {/* Exam Info */}
                <div className="text-xs text-[var(--muted)] mb-4 space-y-1">
                  <p>Real exam: {section.examInfo.testlets} testlets (MCQs + TBS)</p>
                  <p>MCQs: 50% of score • TBS: 50% of score</p>
                  <p>Time limit: {section.examInfo.timeMinutes / 60} hours total</p>
                </div>

                {hasQuestions ? (
                  <Link
                    href={`/dashboard/exam-simulation/${section.code.toLowerCase()}`}
                    className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors flex items-center justify-center"
                  >
                    Start Simulation
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[var(--card-hover)] text-gray-400 dark:text-[var(--muted)] rounded-lg cursor-not-allowed text-sm"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Exam Day Tips</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold text-sm">1</span>
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">Pace Yourself</p>
              <p className="text-sm text-[var(--muted)]">Aim for ~2 minutes per MCQ. Budget 15-20 minutes per TBS.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold text-sm">2</span>
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">Flag & Move On</p>
              <p className="text-sm text-[var(--muted)]">If unsure, flag the question and come back. Don&apos;t get stuck.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold text-sm">3</span>
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">Answer Everything</p>
              <p className="text-sm text-[var(--muted)]">No penalty for guessing. Never leave MCQs or TBS fields blank.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold text-sm">4</span>
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">TBS Partial Credit</p>
              <p className="text-sm text-[var(--muted)]">Unlike MCQs, TBS award partial credit. Answer what you can!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Link to TBS Simulations */}
      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-purple-800 dark:text-purple-200">Practice Task-Based Simulations</h3>
            <p className="text-sm text-purple-600 dark:text-purple-300">TBS make up 50% of your exam score. Practice realistic case studies with exhibits.</p>
          </div>
          <Link
            href="/dashboard/simulations"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Go to TBS Practice
          </Link>
        </div>
      </div>

      {/* Link to Practice Mode */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200">Not ready for a timed exam?</h3>
            <p className="text-sm text-blue-600 dark:text-blue-300">Practice mode lets you learn MCQs at your own pace with instant feedback.</p>
          </div>
          <Link
            href="/dashboard/practice"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Go to MCQ Practice
          </Link>
        </div>
      </div>
    </div>
  );
}
