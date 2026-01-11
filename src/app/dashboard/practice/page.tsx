"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import type { PracticeAttempt, SectionCode } from "@/lib/supabase/types";
import Link from "next/link";
import { sectionHasQuestions, getQuestionCount } from "@/lib/data/practice-questions";

const sections: { code: SectionCode; name: string; topics: string[] }[] = [
  {
    code: "FAR",
    name: "Financial Accounting & Reporting",
    topics: ["Conceptual Framework", "Financial Statements", "Revenue Recognition", "Government Accounting"],
  },
  {
    code: "AUD",
    name: "Auditing & Attestation",
    topics: ["Ethics & Independence", "Risk Assessment", "Audit Evidence", "Audit Reports"],
  },
  {
    code: "REG",
    name: "Regulation",
    topics: ["Individual Taxation", "Business Taxation", "Business Law", "Federal Tax Procedures"],
  },
  {
    code: "TCP",
    name: "Tax Compliance & Planning",
    topics: ["Individual Tax Planning", "Entity Tax Planning", "Property Transactions", "Tax Research"],
  },
  {
    code: "BAR",
    name: "Business Analysis & Reporting",
    topics: ["Financial Statement Analysis", "Prospective Financial Information", "Cost Accounting", "Data Analytics"],
  },
  {
    code: "ISC",
    name: "Information Systems & Controls",
    topics: ["IT General Controls", "Cybersecurity", "System Development", "Data Management"],
  },
];

export default function PracticePage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [attempts, setAttempts] = useState<PracticeAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return;
    if (user) {
      fetchAttempts();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchAttempts = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("practice_attempts")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setAttempts(data as PracticeAttempt[]);
    }
    setLoading(false);
  };

  const getSectionStats = (sectionCode: SectionCode) => {
    const sectionAttempts = attempts.filter((a) => a.section === sectionCode);
    if (sectionAttempts.length === 0) {
      return { totalQuestions: 0, correctAnswers: 0, accuracy: 0 };
    }

    const totalQuestions = sectionAttempts.length;
    const correctAnswers = sectionAttempts.filter((a) => a.is_correct).length;
    const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

    return { totalQuestions, correctAnswers, accuracy };
  };

  const recentAttempts = attempts.slice(0, 5);
  const totalQuestions = attempts.length;
  const totalCorrect = attempts.filter((a) => a.is_correct).length;
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const disciplineChoice = profile?.discipline_choice;
  const visibleSections = sections.filter(
    (s) => ["FAR", "AUD", "REG"].includes(s.code) || s.code === disciplineChoice || !disciplineChoice
  );

  // Count sections with available questions
  const availableSections = visibleSections.filter(s => sectionHasQuestions(s.code));
  const totalAvailableQuestions = availableSections.reduce((acc, s) => acc + getQuestionCount(s.code), 0);

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
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Practice Questions</h1>
          <p className="text-[var(--muted)]">Test your knowledge and track your progress</p>
        </div>
        {attempts.length > 0 && (
          <Link
            href="/dashboard/practice/history"
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[var(--card)] border border-[var(--border)] rounded-lg hover:border-[var(--primary)] hover:shadow-md transition-all text-[var(--foreground)] font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View History
          </Link>
        )}
      </div>

      {/* Practice Banner */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Practice Booklets Now Available!</h2>
            <p className="text-white/80 max-w-xl">
              {totalAvailableQuestions} practice questions across {availableSections.length} sections.
              Start practicing FAR, AUD, and REG today. More sections coming soon!
            </p>
          </div>
          <div className="hidden md:block">
            <svg className="w-24 h-24 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      {attempts.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
            <p className="text-sm text-[var(--muted)]">Questions Attempted</p>
            <p className="text-3xl font-bold text-[var(--primary)]">{totalQuestions}</p>
          </div>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
            <p className="text-sm text-[var(--muted)]">Correct Answers</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{totalCorrect}</p>
          </div>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
            <p className="text-sm text-[var(--muted)]">Overall Accuracy</p>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{overallAccuracy}%</p>
          </div>
        </div>
      )}

      {/* Section Cards */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Practice by Section</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleSections.map((section) => {
            const stats = getSectionStats(section.code);
            const isCore = ["FAR", "AUD", "REG"].includes(section.code);
            const hasQuestions = sectionHasQuestions(section.code);
            const questionCount = getQuestionCount(section.code);

            return (
              <div
                key={section.code}
                className={`bg-white dark:bg-[var(--card)] rounded-xl border p-5 transition-all duration-200 ${
                  hasQuestions
                    ? "border-[var(--border)] hover:border-[var(--primary)] hover:shadow-md"
                    : "border-[var(--border)] opacity-75"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    hasQuestions ? "bg-[var(--primary)]" : "bg-gray-300 dark:bg-[var(--border)]"
                  }`}>
                    <span className="text-white font-bold">{section.code}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      isCore ? "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" : "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300"
                    }`}>
                      {isCore ? "Core" : "Discipline"}
                    </span>
                    {hasQuestions && (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        {questionCount} questions
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-[var(--foreground)] mb-1">{section.code}</h3>
                <p className="text-sm text-[var(--muted)] mb-4">{section.name}</p>

                {stats.totalQuestions > 0 ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Accuracy</span>
                      <span className="font-medium text-[var(--foreground)]">{stats.accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-[var(--card-hover)] rounded-full h-2">
                      <div
                        className="bg-[var(--primary)] h-2 rounded-full"
                        style={{ width: `${stats.accuracy}%` }}
                      />
                    </div>
                    <p className="text-xs text-[var(--muted)]">
                      {stats.correctAnswers}/{stats.totalQuestions} correct
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-[var(--muted)]">
                      {hasQuestions ? "No attempts yet" : "Questions coming soon"}
                    </p>
                  </div>
                )}

                {hasQuestions ? (
                  <Link
                    href={`/dashboard/practice/${section.code.toLowerCase()}`}
                    className="w-full mt-4 px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors flex items-center justify-center"
                  >
                    Start Practice
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full mt-4 px-4 py-2 bg-gray-100 dark:bg-[var(--card-hover)] text-gray-400 dark:text-[var(--muted)] rounded-lg cursor-not-allowed text-sm"
                  >
                    Coming Soon
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Topics Preview */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Topics Covered</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleSections.filter(s => sectionHasQuestions(s.code)).map((section) => (
            <div key={section.code}>
              <h3 className="font-medium text-[var(--foreground)] mb-2 flex items-center">
                <span className="w-8 h-8 bg-[var(--primary)] text-white rounded-lg flex items-center justify-center text-xs font-bold mr-2">
                  {section.code}
                </span>
                {section.name}
              </h3>
              <ul className="space-y-1 ml-10">
                {section.topics.map((topic) => (
                  <li key={topic} className="text-sm text-[var(--muted)] flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Attempts */}
      {recentAttempts.length > 0 && (
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)]">
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Recent Questions</h2>
          </div>
          <div className="divide-y divide-[var(--border)] dark:divide-[var(--border)]">
            {recentAttempts.map((attempt) => (
              <div key={attempt.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    attempt.is_correct ? "bg-green-100 dark:bg-green-900/50" : "bg-red-100 dark:bg-red-900/50"
                  }`}>
                    <span className={`text-sm font-bold ${
                      attempt.is_correct ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    }`}>{attempt.section}</span>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      {attempt.topic || "General Practice"}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {new Date(attempt.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    attempt.is_correct ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300" : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                  }`}>
                    {attempt.is_correct ? "Correct" : "Incorrect"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Resources Links */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Study Resources</h2>
        <p className="text-[var(--muted)] mb-4">
          Complement your practice with these comprehensive study guides:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/blog/far-section-complete-study-guide"
            className="p-4 border border-[var(--border)] rounded-lg hover:border-[var(--primary)] transition-colors"
          >
            <span className="text-sm font-medium text-[var(--primary)]">FAR Study Guide &rarr;</span>
          </Link>
          <Link
            href="/blog/aud-section-complete-study-guide"
            className="p-4 border border-[var(--border)] rounded-lg hover:border-[var(--primary)] transition-colors"
          >
            <span className="text-sm font-medium text-[var(--primary)]">AUD Study Guide &rarr;</span>
          </Link>
          <Link
            href="/blog/reg-section-complete-study-guide"
            className="p-4 border border-[var(--border)] rounded-lg hover:border-[var(--primary)] transition-colors"
          >
            <span className="text-sm font-medium text-[var(--primary)]">REG Study Guide &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
