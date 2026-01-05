"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import type { PracticeAttempt, SectionCode } from "@/lib/supabase/types";
import Link from "next/link";

const sections: { code: SectionCode; name: string; topics: string[] }[] = [
  {
    code: "FAR",
    name: "Financial Accounting & Reporting",
    topics: ["Conceptual Framework", "Financial Statements", "Government Accounting", "Non-profit Accounting"],
  },
  {
    code: "AUD",
    name: "Auditing & Attestation",
    topics: ["Ethics & Independence", "Risk Assessment", "Evidence & Procedures", "Reporting"],
  },
  {
    code: "REG",
    name: "Regulation",
    topics: ["Individual Taxation", "Business Taxation", "Business Law", "Ethics"],
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
    if (authLoading) return; // Wait for auth to finish
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

  // Calculate stats per section (each attempt is a single question)
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

  // Get recent attempts
  const recentAttempts = attempts.slice(0, 5);

  // Overall stats (each attempt is a single question)
  const totalQuestions = attempts.length;
  const totalCorrect = attempts.filter((a) => a.is_correct).length;
  const overallAccuracy = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Filter sections based on discipline choice
  const disciplineChoice = profile?.discipline_choice;
  const visibleSections = sections.filter(
    (s) => ["FAR", "AUD", "REG"].includes(s.code) || s.code === disciplineChoice || !disciplineChoice
  );

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
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Practice Questions</h1>
        <p className="text-[var(--muted)]">Test your knowledge and track your progress</p>
      </div>

      {/* Coming Soon Banner */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Practice Booklets Coming Soon!</h2>
            <p className="text-white/80 max-w-xl">
              We&apos;re building comprehensive practice question sets for each CPA exam section.
              Get notified when they&apos;re ready.
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
          <div className="bg-white rounded-xl border border-[var(--border)] p-5">
            <p className="text-sm text-[var(--muted)]">Questions Attempted</p>
            <p className="text-3xl font-bold text-[var(--primary)]">{totalQuestions}</p>
          </div>
          <div className="bg-white rounded-xl border border-[var(--border)] p-5">
            <p className="text-sm text-[var(--muted)]">Correct Answers</p>
            <p className="text-3xl font-bold text-green-600">{totalCorrect}</p>
          </div>
          <div className="bg-white rounded-xl border border-[var(--border)] p-5">
            <p className="text-sm text-[var(--muted)]">Overall Accuracy</p>
            <p className="text-3xl font-bold text-purple-600">{overallAccuracy}%</p>
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

            return (
              <div
                key={section.code}
                className="bg-white rounded-xl border border-[var(--border)] p-5 hover:border-[var(--primary)] transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{section.code}</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    isCore ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"
                  }`}>
                    {isCore ? "Core" : "Discipline"}
                  </span>
                </div>

                <h3 className="font-semibold text-[var(--foreground)] mb-1">{section.code}</h3>
                <p className="text-sm text-[var(--muted)] mb-4">{section.name}</p>

                {stats.totalQuestions > 0 ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Accuracy</span>
                      <span className="font-medium text-[var(--foreground)]">{stats.accuracy}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
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
                    <p className="text-sm text-[var(--muted)]">No attempts yet</p>
                  </div>
                )}

                <button
                  disabled
                  className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed text-sm"
                >
                  Coming Soon
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topics Preview */}
      <div className="bg-white rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Topics We&apos;ll Cover</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleSections.map((section) => (
            <div key={section.code}>
              <h3 className="font-medium text-[var(--foreground)] mb-2">{section.code}</h3>
              <ul className="space-y-1">
                {section.topics.map((topic) => (
                  <li key={topic} className="text-sm text-[var(--muted)] flex items-center">
                    <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="bg-white rounded-xl border border-[var(--border)]">
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Recent Questions</h2>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {recentAttempts.map((attempt) => (
              <div key={attempt.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    attempt.is_correct ? "bg-green-100" : "bg-red-100"
                  }`}>
                    <span className={`text-sm font-bold ${
                      attempt.is_correct ? "text-green-600" : "text-red-600"
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
                    attempt.is_correct ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
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
      <div className="bg-white rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Study Resources</h2>
        <p className="text-[var(--muted)] mb-4">
          While our practice questions are in development, check out these study guides:
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
