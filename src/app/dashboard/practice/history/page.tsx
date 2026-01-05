"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";
import { getQuestionById } from "@/lib/data/practice-questions";

interface PracticeAttempt {
  id: string;
  user_id: string;
  question_id: string;
  section: string;
  topic: string | null;
  selected_answer: string;
  correct_answer: string;
  is_correct: boolean;
  created_at: string;
}

interface Session {
  id: string;
  section: string;
  date: Date;
  attempts: PracticeAttempt[];
  correctCount: number;
  totalCount: number;
  accuracy: number;
  topics: string[];
}

// Group attempts into sessions (attempts within 30 minutes of each other)
function groupIntoSessions(attempts: PracticeAttempt[]): Session[] {
  if (attempts.length === 0) return [];

  const sessions: Session[] = [];
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

function createSessionFromAttempts(attempts: PracticeAttempt[]): Session {
  const correctCount = attempts.filter((a) => a.is_correct).length;
  const topics = [...new Set(attempts.map((a) => a.topic).filter(Boolean))] as string[];

  return {
    id: attempts[0].id,
    section: attempts[0].section,
    date: new Date(attempts[0].created_at),
    attempts,
    correctCount,
    totalCount: attempts.length,
    accuracy: Math.round((correctCount / attempts.length) * 100),
    topics,
  };
}

export default function PracticeHistoryPage() {
  const { user, loading: authLoading } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
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
    if (!supabase || !user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("practice_attempts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      const grouped = groupIntoSessions(data as PracticeAttempt[]);
      setSessions(grouped);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--muted)]">Please log in to view your practice history.</p>
        <Link href="/login" className="btn-primary mt-4 inline-block">
          Log In
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
        <Link href="/dashboard/practice" className="hover:text-[var(--primary)]">
          Practice
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">History</span>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Practice History</h1>
        <p className="text-[var(--muted)]">Review your past practice sessions and answers</p>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-white rounded-xl border border-[var(--border)] p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">No Practice Sessions Yet</h3>
          <p className="text-[var(--muted)] mb-6">
            Complete a practice quiz to see your history here.
          </p>
          <Link href="/dashboard/practice" className="btn-primary inline-block">
            Start Practicing
          </Link>
        </div>
      ) : selectedSession ? (
        // Session Detail View
        <div className="space-y-6">
          <button
            onClick={() => setSelectedSession(null)}
            className="flex items-center text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Sessions
          </button>

          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-[var(--primary)] text-white rounded-lg font-bold">
                    {selectedSession.section}
                  </span>
                  <span className={`px-3 py-1 rounded-lg font-medium ${
                    selectedSession.accuracy >= 80 ? "bg-green-100 text-green-700" :
                    selectedSession.accuracy >= 60 ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {selectedSession.accuracy}% Accuracy
                  </span>
                </div>
                <p className="text-[var(--muted)]">
                  {selectedSession.date.toLocaleDateString("en-US", {
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
                <p className="text-2xl font-bold text-[var(--foreground)]">
                  {selectedSession.correctCount}/{selectedSession.totalCount}
                </p>
                <p className="text-sm text-[var(--muted)]">Correct</p>
              </div>
            </div>

            <div className="space-y-4">
              {selectedSession.attempts.map((attempt, index) => {
                const question = getQuestionById(attempt.question_id);

                return (
                  <div
                    key={attempt.id}
                    className={`p-4 rounded-lg border ${
                      attempt.is_correct ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-medium text-[var(--muted)]">
                        Question {index + 1}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        attempt.is_correct ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                      }`}>
                        {attempt.is_correct ? "Correct" : "Incorrect"}
                      </span>
                    </div>

                    {question ? (
                      <>
                        <p className="font-medium text-[var(--foreground)] mb-3">
                          {question.question}
                        </p>

                        <div className="space-y-2 mb-3">
                          {(["A", "B", "C", "D"] as const).map((letter) => {
                            const isSelected = attempt.selected_answer === letter;
                            const isCorrect = attempt.correct_answer === letter;

                            let bgColor = "bg-white";
                            let borderColor = "border-gray-200";
                            let textColor = "text-[var(--foreground)]";

                            if (isCorrect) {
                              bgColor = "bg-green-100";
                              borderColor = "border-green-300";
                              textColor = "text-green-800";
                            } else if (isSelected && !isCorrect) {
                              bgColor = "bg-red-100";
                              borderColor = "border-red-300";
                              textColor = "text-red-800";
                            }

                            return (
                              <div
                                key={letter}
                                className={`p-3 rounded-lg border ${bgColor} ${borderColor} ${textColor} flex items-center`}
                              >
                                <span className="font-bold mr-3">{letter}.</span>
                                <span>{question.options[letter]}</span>
                                {isSelected && (
                                  <span className="ml-auto text-xs font-medium">
                                    Your answer
                                  </span>
                                )}
                                {isCorrect && !isSelected && (
                                  <span className="ml-auto text-xs font-medium">
                                    Correct answer
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="bg-white p-3 rounded-lg border border-gray-200">
                          <p className="text-sm font-medium text-[var(--foreground)] mb-1">Explanation:</p>
                          <p className="text-sm text-[var(--muted)]">{question.explanation}</p>
                          {question.tip && (
                            <p className="text-sm text-[var(--primary)] mt-2">
                              <span className="font-medium">Tip:</span> {question.tip}
                            </p>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-sm text-[var(--muted)]">
                        <p>Question ID: {attempt.question_id}</p>
                        <p>Your answer: {attempt.selected_answer}</p>
                        <p>Correct answer: {attempt.correct_answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        // Sessions List View
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[var(--muted)]">{sessions.length} practice sessions</p>
          </div>

          {sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setSelectedSession(session)}
              className="w-full bg-white rounded-xl border border-[var(--border)] p-5 hover:border-[var(--primary)] hover:shadow-md transition-all text-left"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">{session.section}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--foreground)]">
                      {session.totalCount} Questions
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {session.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      session.accuracy >= 80 ? "text-green-600" :
                      session.accuracy >= 60 ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {session.accuracy}%
                    </p>
                    <p className="text-xs text-[var(--muted)]">
                      {session.correctCount}/{session.totalCount} correct
                    </p>
                  </div>
                  <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {session.topics.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {session.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-gray-100 text-[var(--muted)] rounded text-xs"
                    >
                      {topic}
                    </span>
                  ))}
                  {session.topics.length > 3 && (
                    <span className="px-2 py-1 text-[var(--muted)] text-xs">
                      +{session.topics.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
