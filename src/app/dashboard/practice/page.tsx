"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import type { PracticeAttempt, SectionCode } from "@/lib/supabase/types";
import Link from "next/link";
import { sectionHasQuestions, getQuestionCount } from "@/lib/data/practice-questions";
import { MCQSectionCard } from "@/components/practice/MCQSectionCard";

interface PracticeSession {
  id: string;
  section: string;
  date: Date;
  attempts: PracticeAttempt[];
  correctCount: number;
  totalCount: number;
  accuracy: number;
  totalTimeSeconds: number;
  topics: string[];
}

// Group attempts into sessions (attempts within 30 minutes of each other)
function groupIntoSessions(attempts: PracticeAttempt[]): PracticeSession[] {
  if (attempts.length === 0) return [];

  const sessions: PracticeSession[] = [];
  let currentSession: PracticeAttempt[] = [];
  let lastTime: Date | null = null;

  // Sort by created_at ascending to group properly
  const sorted = [...attempts].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  for (const attempt of sorted) {
    const attemptTime = new Date(attempt.created_at);

    if (lastTime === null || attemptTime.getTime() - lastTime.getTime() < 30 * 60 * 1000) {
      // Same session (within 30 minutes)
      currentSession.push(attempt);
    } else {
      // New session
      if (currentSession.length > 0) {
        sessions.push(createSessionFromAttempts(currentSession));
      }
      currentSession = [attempt];
    }
    lastTime = attemptTime;
  }

  // Don't forget the last session
  if (currentSession.length > 0) {
    sessions.push(createSessionFromAttempts(currentSession));
  }

  // Return newest first
  return sessions.reverse();
}

function createSessionFromAttempts(attempts: PracticeAttempt[]): PracticeSession {
  const correctCount = attempts.filter((a) => a.is_correct).length;
  const topics = [...new Set(attempts.map((a) => a.topic).filter(Boolean))] as string[];
  const totalTimeSeconds = attempts.reduce((sum, a) => sum + (a.time_spent_seconds || 0), 0);

  return {
    id: attempts[0].id,
    section: attempts[0].section,
    date: new Date(attempts[0].created_at),
    attempts,
    correctCount,
    totalCount: attempts.length,
    accuracy: Math.round((correctCount / attempts.length) * 100),
    totalTimeSeconds,
    topics,
  };
}

// Format seconds to hours and minutes
function formatSeconds(seconds: number): string {
  if (seconds === 0) return "0m";
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

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

interface SavedSession {
  section: string;
  questionIds: string[];
  currentIndex: number;
  results: Array<{
    questionId: string;
    selectedAnswer: 'A' | 'B' | 'C' | 'D';
    isCorrect: boolean;
  }>;
  startTime: string;
  savedAt: string;
}

const SAVED_SESSION_KEY = 'cpa-practice-session';

const sectionNames: Record<string, string> = {
  FAR: 'Financial Accounting & Reporting',
  AUD: 'Auditing & Attestation',
  REG: 'Regulation',
  TCP: 'Tax Compliance & Planning',
  BAR: 'Business Analysis & Reporting',
  ISC: 'Information Systems & Controls',
};

export default function PracticePage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [attempts, setAttempts] = useState<PracticeAttempt[]>([]);
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedSession, setSavedSession] = useState<SavedSession | null>(null);
  const supabase = createClient();

  // Check for saved session on mount
  useEffect(() => {
    const saved = localStorage.getItem(SAVED_SESSION_KEY);
    if (saved) {
      try {
        const parsed: SavedSession = JSON.parse(saved);
        setSavedSession(parsed);
      } catch {
        localStorage.removeItem(SAVED_SESSION_KEY);
      }
    }
  }, []);

  const discardSession = () => {
    localStorage.removeItem(SAVED_SESSION_KEY);
    setSavedSession(null);
  };

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
      // Group attempts into sessions
      const grouped = groupIntoSessions(data as PracticeAttempt[]);
      setPracticeSessions(grouped);
    }
    setLoading(false);
  };

  // Calculate stats using BEST attempt per question (matching readiness dashboard and Prime Meridian)
  const getSectionStats = (sectionCode: SectionCode) => {
    const sectionAttempts = attempts.filter((a) => a.section === sectionCode);
    if (sectionAttempts.length === 0) {
      return { totalQuestions: 0, correctAnswers: 0, accuracy: 0, totalAttempts: 0 };
    }

    // Group by question_id and check if any attempt was correct (best attempt logic)
    const questionResults = new Map<string, boolean>();
    sectionAttempts.forEach(a => {
      const current = questionResults.get(a.question_id);
      // If any attempt was correct, mark as correct
      if (current !== true) {
        questionResults.set(a.question_id, a.is_correct);
      }
    });

    const uniqueQuestions = questionResults.size;
    const correctQuestions = [...questionResults.values()].filter(v => v).length;
    const accuracy = uniqueQuestions > 0 ? Math.round((correctQuestions / uniqueQuestions) * 100) : 0;

    return { totalQuestions: uniqueQuestions, correctAnswers: correctQuestions, accuracy, totalAttempts: sectionAttempts.length };
  };

  const recentSessions = practiceSessions.slice(0, 5);

  // Calculate overall stats using BEST attempt per question (matching readiness dashboard)
  const questionResults = new Map<string, boolean>();
  attempts.forEach(a => {
    const current = questionResults.get(a.question_id);
    if (current !== true) {
      questionResults.set(a.question_id, a.is_correct);
    }
  });
  const totalQuestions = questionResults.size;
  const totalCorrect = [...questionResults.values()].filter(v => v).length;
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
          <p className="text-[var(--muted)]">Practice applying concepts and track your progress</p>
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

      {/* Resume Session Banner */}
      {savedSession && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-800/50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-amber-800 dark:text-amber-200">Resume Previous Session</p>
                <p className="text-sm text-amber-600 dark:text-amber-300">
                  {sectionNames[savedSession.section] || savedSession.section} • {savedSession.results.length}/{savedSession.questionIds.length} questions completed
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={discardSession}
                className="px-3 py-1.5 text-sm font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800/50 rounded-lg transition-colors"
              >
                Discard
              </button>
              <Link
                href={`/dashboard/practice/${savedSession.section.toLowerCase()}`}
                className="px-4 py-1.5 text-sm font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Resume
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Practice Banner */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-blue-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Adaptive Practice Questions</h2>
            <p className="text-white/80 max-w-xl">
              6,000+ practice questions and simulations across FAR, AUD, REG, and your chosen discipline section.
              Full adaptive learning and progress tracking included.
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleSections.map((section) => {
            const stats = getSectionStats(section.code);
            const hasQuestions = sectionHasQuestions(section.code);
            const questionCount = getQuestionCount(section.code);

            return (
              <MCQSectionCard
                key={section.code}
                sectionCode={section.code}
                sectionName={section.name}
                totalQuestions={questionCount}
                attemptedCount={stats.totalQuestions}
                correctCount={stats.correctAnswers}
                averageAccuracy={stats.totalQuestions > 0 ? stats.accuracy : null}
                hasQuestions={hasQuestions}
              />
            );
          })}
        </div>
      </div>

      {/* Recent Sessions */}
      {recentSessions.length > 0 && (
        <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)]">
          <div className="p-6 border-b border-[var(--border)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Recent Sessions</h2>
              <Link
                href="/dashboard/practice/history"
                className="text-sm text-[var(--primary)] hover:underline"
              >
                View Full History →
              </Link>
            </div>
            <p className="text-sm text-[var(--muted)] mt-1">
              Click on a session to review your answers
            </p>
          </div>
          <div className="divide-y divide-[var(--border)] dark:divide-[var(--border)]">
            {recentSessions.map((session) => (
              <Link
                key={session.id}
                href={`/dashboard/practice/history?session=${session.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{session.section}</span>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      {session.totalCount} Questions
                      {session.totalTimeSeconds > 0 && (
                        <span className="text-[var(--muted)] font-normal ml-2">
                          ({formatSeconds(session.totalTimeSeconds)})
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {session.date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      session.accuracy >= 80 ? "text-green-600 dark:text-green-400" :
                      session.accuracy >= 60 ? "text-yellow-600 dark:text-yellow-400" :
                      "text-red-600 dark:text-red-400"
                    }`}>
                      {session.accuracy}%
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      {session.correctCount}/{session.totalCount}
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
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
