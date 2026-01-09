"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useStudySessionAchievements } from "@/components/gamification/AchievementProvider";
import Link from "next/link";
import type { StudySession, SectionCode } from "@/lib/supabase/types";

const sections: SectionCode[] = ["FAR", "AUD", "REG", "TCP", "BAR", "ISC"];

interface PracticeAttempt {
  id: string;
  question_id: string;
  section: string;
  topic: string | null;
  selected_answer: string;
  correct_answer: string;
  is_correct: boolean;
  time_spent_seconds: number | null;
  created_at: string;
}

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

export default function StudyLogPage() {
  const { user, loading: authLoading } = useAuth();
  const { onStudySessionLogged } = useStudySessionAchievements();
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [practiceSessions, setPracticeSessions] = useState<PracticeSession[]>([]);
  const [visiblePracticeSessions, setVisiblePracticeSessions] = useState(5);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    section: "FAR" as SectionCode,
    date: new Date().toISOString().split("T")[0],
    hours: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'manual' | 'practice'>('practice');
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return; // Wait for auth to finish
    if (user) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchData = async () => {
    if (!supabase || !user) {
      setLoading(false);
      return;
    }

    // Fetch manual study sessions
    const { data: sessionData } = await supabase
      .from("study_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })
      .limit(50);

    if (sessionData) {
      setSessions(sessionData as StudySession[]);
    }

    // Fetch practice attempts
    const { data: attemptData } = await supabase
      .from("practice_attempts")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (attemptData) {
      const grouped = groupIntoSessions(attemptData as PracticeAttempt[]);
      setPracticeSessions(grouped);
    }

    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !supabase) return;

    setSubmitting(true);

    const { error } = await supabase.from("study_sessions").insert({
      user_id: user.id,
      section: formData.section,
      date: formData.date,
      hours: parseFloat(formData.hours),
      notes: formData.notes || null,
    });

    if (!error) {
      // Trigger achievement check
      await onStudySessionLogged(formData.section, parseFloat(formData.hours));

      setFormData({
        section: "FAR",
        date: new Date().toISOString().split("T")[0],
        hours: "",
        notes: "",
      });
      setShowForm(false);
      fetchData();
    }

    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this study session?") || !supabase) return;

    const { error } = await supabase
      .from("study_sessions")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchData();
    }
  };

  // Helper function to format hours (show minutes if under 1 hour)
  const formatTime = (hours: number): string => {
    if (hours === 0) return "0h";
    if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return `${minutes}m`;
    }
    if (hours % 1 === 0) return `${hours}h`;
    return `${hours.toFixed(1)}h`;
  };

  // Format seconds to hours and minutes
  const formatSeconds = (seconds: number): string => {
    if (seconds === 0) return "0m";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);
    if (hours === 0) return `${minutes}m`;
    if (minutes === 0) return `${hours}h`;
    return `${hours}h ${minutes}m`;
  };

  // Calculate weekly stats from both manual sessions and practice
  const thisWeekStart = new Date();
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
  thisWeekStart.setHours(0, 0, 0, 0);

  // Manual session hours
  const thisWeekManualSessions = sessions.filter(
    (s) => new Date(s.date) >= thisWeekStart
  );
  const weeklyManualHours = thisWeekManualSessions.reduce((sum, s) => sum + Number(s.hours), 0);
  const totalManualHours = sessions.reduce((sum, s) => sum + Number(s.hours), 0);

  // Practice session hours (from time_spent_seconds)
  const thisWeekPracticeSessions = practiceSessions.filter(
    (s) => s.date >= thisWeekStart
  );
  const weeklyPracticeSeconds = thisWeekPracticeSessions.reduce((sum, s) => sum + s.totalTimeSeconds, 0);
  const totalPracticeSeconds = practiceSessions.reduce((sum, s) => sum + s.totalTimeSeconds, 0);

  // Combined stats
  const weeklyTotalHours = weeklyManualHours + (weeklyPracticeSeconds / 3600);
  const totalTotalHours = totalManualHours + (totalPracticeSeconds / 3600);

  // Group manual sessions by week
  const groupedSessions = sessions.reduce((groups, session) => {
    const date = new Date(session.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split("T")[0];

    if (!groups[weekKey]) {
      groups[weekKey] = [];
    }
    groups[weekKey].push(session);
    return groups;
  }, {} as Record<string, StudySession[]>);

  // Show more practice sessions
  const handleShowMorePractice = () => {
    setVisiblePracticeSessions(prev => prev + 10);
  };

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
          <h1 className="text-2xl font-bold text-[var(--foreground)]">Study Log</h1>
          <p className="text-[var(--muted)]">Track your study time and review practice history</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
        >
          {showForm ? "Cancel" : "+ Log Session"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-5">
          <p className="text-sm text-[var(--muted)]">This Week</p>
          <p className="text-2xl font-bold text-[var(--primary)]">{formatTime(weeklyTotalHours)}</p>
          <p className="text-xs text-[var(--muted)] mt-1">
            {weeklyManualHours > 0 && `${formatTime(weeklyManualHours)} logged`}
            {weeklyManualHours > 0 && weeklyPracticeSeconds > 0 && ' + '}
            {weeklyPracticeSeconds > 0 && `${formatSeconds(weeklyPracticeSeconds)} practice`}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-5">
          <p className="text-sm text-[var(--muted)]">Total Hours</p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatTime(totalTotalHours)}</p>
          <p className="text-xs text-[var(--muted)] mt-1">
            {totalManualHours > 0 && `${formatTime(totalManualHours)} logged`}
            {totalManualHours > 0 && totalPracticeSeconds > 0 && ' + '}
            {totalPracticeSeconds > 0 && `${formatSeconds(totalPracticeSeconds)} practice`}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-5">
          <p className="text-sm text-[var(--muted)]">Practice Sessions</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{thisWeekPracticeSessions.length}</p>
          <p className="text-xs text-[var(--muted)] mt-1">this week</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-5">
          <p className="text-sm text-[var(--muted)]">Questions Answered</p>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {thisWeekPracticeSessions.reduce((sum, s) => sum + s.totalCount, 0)}
          </p>
          <p className="text-xs text-[var(--muted)] mt-1">this week</p>
        </div>
      </div>

      {/* Log Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Log Study Session</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Section
                </label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value as SectionCode })}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] dark:border-gray-600 bg-white dark:bg-gray-700 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                >
                  {sections.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] dark:border-gray-600 bg-white dark:bg-gray-700 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Hours
                </label>
                <input
                  type="number"
                  step="0.25"
                  min="0.25"
                  max="24"
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  placeholder="e.g., 2.5"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] dark:border-gray-600 bg-white dark:bg-gray-700 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Notes (optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="What did you study? Any topics or chapters?"
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] dark:border-gray-600 bg-white dark:bg-gray-700 text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] outline-none resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save Session"}
            </button>
          </form>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex border-b border-[var(--border)] dark:border-gray-700">
        <button
          onClick={() => setActiveTab('practice')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'practice'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          Practice History ({practiceSessions.length})
        </button>
        <button
          onClick={() => setActiveTab('manual')}
          className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'manual'
              ? 'border-[var(--primary)] text-[var(--primary)]'
              : 'border-transparent text-[var(--muted)] hover:text-[var(--foreground)]'
          }`}
        >
          Manual Log ({sessions.length})
        </button>
      </div>

      {/* Practice History Tab */}
      {activeTab === 'practice' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700">
          <div className="p-6 border-b border-[var(--border)] dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--foreground)]">Practice Sessions</h2>
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

          {practiceSessions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-[var(--card)] dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <p className="text-[var(--muted)] mb-4">No practice sessions yet</p>
              <Link href="/dashboard/practice" className="btn-primary inline-block">
                Start Practicing
              </Link>
            </div>
          ) : (
            <>
              <div className="divide-y divide-[var(--border)] dark:divide-gray-700">
                {practiceSessions.slice(0, visiblePracticeSessions).map((session) => (
                  <Link
                    key={session.id}
                    href="/dashboard/practice/history"
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

              {/* Show More Button */}
              {visiblePracticeSessions < practiceSessions.length && (
                <div className="p-4 text-center border-t border-[var(--border)] dark:border-gray-700">
                  <button
                    onClick={handleShowMorePractice}
                    className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium text-sm"
                  >
                    Show More ({practiceSessions.length - visiblePracticeSessions} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Manual Study Log Tab */}
      {activeTab === 'manual' && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700">
          <div className="p-6 border-b border-[var(--border)] dark:border-gray-700">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Manual Study Log</h2>
            <p className="text-sm text-[var(--muted)] mt-1">
              Track additional study time (reading, flashcards, etc.)
            </p>
          </div>

          {sessions.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-[var(--card)] dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-[var(--muted)] mb-4">No manual study sessions logged yet</p>
              <button onClick={() => setShowForm(true)} className="btn-primary">
                Log Your First Session
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)] dark:divide-gray-700">
              {Object.entries(groupedSessions).map(([weekStart, weekSessions]) => {
                const weekTotal = weekSessions.reduce((sum, s) => sum + Number(s.hours), 0);
                const weekDate = new Date(weekStart);

                return (
                  <div key={weekStart} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-[var(--foreground)]">
                        Week of {weekDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </h3>
                      <span className="text-sm font-semibold text-[var(--primary)]">
                        {formatTime(weekTotal)}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {weekSessions.map((session) => (
                        <div
                          key={session.id}
                          className="flex items-center justify-between py-2 px-4 bg-[var(--card)] dark:bg-gray-700/50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-[var(--primary)] rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{session.section}</span>
                            </div>
                            <div>
                              <p className="font-medium text-[var(--foreground)]">
                                {Number(session.hours) < 1
                                  ? `${Math.round(Number(session.hours) * 60)} minutes`
                                  : `${Number(session.hours).toFixed(1)} hours`}
                              </p>
                              <p className="text-sm text-[var(--muted)]">
                                {new Date(session.date).toLocaleDateString("en-US", {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            {session.notes && (
                              <p className="text-sm text-[var(--muted)] max-w-xs truncate hidden md:block">
                                {session.notes}
                              </p>
                            )}
                            <button
                              onClick={() => handleDelete(session.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
