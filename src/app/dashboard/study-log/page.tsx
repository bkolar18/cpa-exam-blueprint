"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useStudySessionAchievements } from "@/components/gamification/AchievementProvider";
import type { StudySession, SectionCode } from "@/lib/supabase/types";

const sections: SectionCode[] = ["FAR", "AUD", "REG", "TCP", "BAR", "ISC"];

export default function StudyLogPage() {
  const { user, loading: authLoading } = useAuth();
  const { onStudySessionLogged } = useStudySessionAchievements();
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    section: "FAR" as SectionCode,
    date: new Date().toISOString().split("T")[0],
    hours: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return; // Wait for auth to finish
    if (user) {
      fetchSessions();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchSessions = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("study_sessions")
      .select("*")
      .eq("user_id", user?.id)
      .order("date", { ascending: false })
      .limit(50);

    if (!error && data) {
      setSessions(data as StudySession[]);
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
      fetchSessions();
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
      fetchSessions();
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

  // Calculate weekly stats
  const thisWeekStart = new Date();
  thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay());
  const thisWeekSessions = sessions.filter(
    (s) => new Date(s.date) >= thisWeekStart
  );
  const weeklyHours = thisWeekSessions.reduce((sum, s) => sum + Number(s.hours), 0);
  const totalHours = sessions.reduce((sum, s) => sum + Number(s.hours), 0);

  // Group sessions by week
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
          <p className="text-[var(--muted)]">Track your daily study hours</p>
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
        <div className="bg-white rounded-xl border border-[var(--border)] p-5">
          <p className="text-sm text-[var(--muted)]">This Week</p>
          <p className="text-2xl font-bold text-[var(--primary)]">{formatTime(weeklyHours)}</p>
        </div>
        <div className="bg-white rounded-xl border border-[var(--border)] p-5">
          <p className="text-sm text-[var(--muted)]">Total Hours</p>
          <p className="text-2xl font-bold text-green-600">{formatTime(totalHours)}</p>
        </div>
        <div className="bg-white rounded-xl border border-[var(--border)] p-5">
          <p className="text-sm text-[var(--muted)]">Sessions This Week</p>
          <p className="text-2xl font-bold text-purple-600">{thisWeekSessions.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-[var(--border)] p-5">
          <p className="text-sm text-[var(--muted)]">Avg Per Session</p>
          <p className="text-2xl font-bold text-orange-600">
            {sessions.length > 0 ? formatTime(totalHours / sessions.length) : "0h"}
          </p>
        </div>
      </div>

      {/* Log Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-[var(--border)] p-6">
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
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
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
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
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
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
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
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none resize-none"
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

      {/* Sessions List */}
      <div className="bg-white rounded-xl border border-[var(--border)]">
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Study History</h2>
        </div>

        {sessions.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-[var(--card)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[var(--muted)] mb-4">No study sessions logged yet</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Log Your First Session
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {Object.entries(groupedSessions).map(([weekStart, weekSessions]) => {
              const weekTotal = weekSessions.reduce((sum, s) => sum + Number(s.hours), 0);
              const weekDate = new Date(weekStart);
              const weekEnd = new Date(weekDate);
              weekEnd.setDate(weekEnd.getDate() + 6);

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
                        className="flex items-center justify-between py-2 px-4 bg-[var(--card)] rounded-lg"
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
    </div>
  );
}
