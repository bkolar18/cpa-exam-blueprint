"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import Link from "next/link";
import type { SectionCode } from "@/lib/supabase/types";

const sections: { code: SectionCode; name: string; description: string }[] = [
  { code: "FAR", name: "Financial Accounting & Reporting", description: "Financial statements, governmental accounting" },
  { code: "AUD", name: "Auditing & Attestation", description: "Audit procedures, ethics, attestation" },
  { code: "REG", name: "Regulation", description: "Federal taxation, business law, ethics" },
  { code: "TCP", name: "Tax Compliance & Planning", description: "Individual & entity tax planning" },
  { code: "BAR", name: "Business Analysis & Reporting", description: "Cost accounting, financial management" },
  { code: "ISC", name: "Information Systems & Controls", description: "IT controls, data management, security" },
];

interface SectionExamDate {
  section: SectionCode;
  exam_date: string | null;
  status: string;
}

export default function ExamSchedulePage() {
  const { user, profile, loading: authLoading } = useAuth();
  const [examDates, setExamDates] = useState<Record<SectionCode, SectionExamDate>>({} as Record<SectionCode, SectionExamDate>);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<SectionCode | null>(null);
  const [editingSection, setEditingSection] = useState<SectionCode | null>(null);
  const [tempDate, setTempDate] = useState("");
  const supabase = createClient();

  // Get user's discipline choice to filter sections
  const disciplineChoice = profile?.discipline_choice;
  const coreSections: SectionCode[] = ["FAR", "AUD", "REG"];
  const disciplineSections: SectionCode[] = ["TCP", "BAR", "ISC"];

  // Filter to show core + chosen discipline (or all if no choice)
  const visibleSections = sections.filter(s => {
    if (coreSections.includes(s.code)) return true;
    if (!disciplineChoice) return true; // Show all if no discipline chosen
    return s.code === disciplineChoice;
  });

  useEffect(() => {
    if (authLoading) return;
    if (user) {
      fetchExamDates();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchExamDates = async () => {
    if (!supabase || !user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("section_progress")
      .select("section, exam_date, status")
      .eq("user_id", user.id);

    if (!error && data) {
      const dates: Record<string, SectionExamDate> = {};
      data.forEach((row) => {
        dates[row.section] = {
          section: row.section as SectionCode,
          exam_date: row.exam_date,
          status: row.status,
        };
      });
      setExamDates(dates as Record<SectionCode, SectionExamDate>);
    }
    setLoading(false);
  };

  const saveExamDate = async (section: SectionCode, date: string | null) => {
    if (!supabase || !user) return;

    setSaving(section);

    // Check if entry exists
    const { data: existing } = await supabase
      .from("section_progress")
      .select("id")
      .eq("user_id", user.id)
      .eq("section", section)
      .maybeSingle();

    if (existing) {
      await supabase
        .from("section_progress")
        .update({
          exam_date: date || null,
          status: date ? "scheduled" : "studying",
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("section_progress")
        .insert({
          user_id: user.id,
          section,
          exam_date: date || null,
          status: date ? "scheduled" : "not_started",
          attempt_number: 1,
        });
    }

    // Update local state
    setExamDates(prev => ({
      ...prev,
      [section]: {
        section,
        exam_date: date || null,
        status: date ? "scheduled" : (prev[section]?.status || "not_started"),
      },
    }));

    setSaving(null);
    setEditingSection(null);
  };

  const getDaysUntilExam = (dateStr: string | null) => {
    if (!dateStr) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(dateStr);
    const diffTime = examDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (days: number | null) => {
    if (days === null) return "gray";
    if (days < 0) return "red";
    if (days <= 7) return "red";
    if (days <= 30) return "orange";
    if (days <= 60) return "yellow";
    return "green";
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
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Exam Schedule</h1>
        <p className="text-[var(--muted)]">Set your scheduled exam dates for each section</p>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Why set exam dates?</strong> Your scheduled exam dates are used for Pre-Exam Assessments,
              personalized study recommendations, and countdown tracking. Set them once you&apos;ve scheduled at the testing center.
            </p>
          </div>
        </div>
      </div>

      {/* Exam Date Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleSections.map((section) => {
          const examData = examDates[section.code];
          const examDate = examData?.exam_date;
          const daysUntil = getDaysUntilExam(examDate);
          const statusColor = getStatusColor(daysUntil);
          const isEditing = editingSection === section.code;

          const colorClasses: Record<string, string> = {
            red: "border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20",
            orange: "border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/20",
            yellow: "border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20",
            green: "border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20",
            gray: "border-gray-200 dark:border-gray-700 bg-white dark:bg-[var(--card)]",
          };

          return (
            <div
              key={section.code}
              className={`rounded-xl border-2 p-5 transition-all ${colorClasses[statusColor]}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[var(--foreground)]">{section.code}</span>
                    {disciplineSections.includes(section.code) && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded font-medium">
                        DISCIPLINE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--muted)]">{section.name}</p>
                </div>
                {examDate && daysUntil !== null && (
                  <div className={`text-right ${
                    daysUntil < 0 ? "text-red-600 dark:text-red-400" :
                    daysUntil <= 7 ? "text-red-600 dark:text-red-400" :
                    daysUntil <= 30 ? "text-orange-600 dark:text-orange-400" :
                    "text-green-600 dark:text-green-400"
                  }`}>
                    <p className="text-2xl font-bold">{Math.abs(daysUntil)}</p>
                    <p className="text-xs">
                      {daysUntil < 0 ? "days ago" : daysUntil === 0 ? "TODAY!" : "days left"}
                    </p>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <input
                    type="date"
                    value={tempDate}
                    onChange={(e) => setTempDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[var(--primary)] outline-none text-sm"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveExamDate(section.code, tempDate || null)}
                      disabled={saving === section.code}
                      className="flex-1 px-3 py-2 text-sm font-medium bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] disabled:opacity-50"
                    >
                      {saving === section.code ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => {
                        setEditingSection(null);
                        setTempDate("");
                      }}
                      className="px-3 py-2 text-sm font-medium border border-[var(--border)] rounded-lg hover:bg-[var(--card)]"
                    >
                      Cancel
                    </button>
                    {examDate && (
                      <button
                        onClick={() => saveExamDate(section.code, null)}
                        disabled={saving === section.code}
                        className="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        title="Clear date"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  {examDate ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-[var(--muted)]">Scheduled</p>
                        <p className="font-semibold text-[var(--foreground)]">
                          {new Date(examDate).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setEditingSection(section.code);
                          setTempDate(examDate);
                        }}
                        className="p-2 text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--card)] rounded-lg transition-colors"
                        title="Edit date"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingSection(section.code);
                        setTempDate("");
                      }}
                      className="w-full py-3 text-sm font-medium text-[var(--primary)] border-2 border-dashed border-[var(--primary)] rounded-lg hover:bg-[var(--primary)] hover:text-white transition-colors"
                    >
                      + Set Exam Date
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Related Tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/dashboard/nts"
            className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--card-hover)] transition-colors"
          >
            <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">NTS Tracker</p>
              <p className="text-xs text-[var(--muted)]">Track your Notice to Schedule validity</p>
            </div>
          </Link>

          <Link
            href="/dashboard/readiness"
            className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--card-hover)] transition-colors"
          >
            <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">Exam Preparation</p>
              <p className="text-xs text-[var(--muted)]">Pre-Exam Assessments & readiness tools</p>
            </div>
          </Link>

          <Link
            href="/dashboard/study-log"
            className="flex items-center gap-3 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--card-hover)] transition-colors"
          >
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-[var(--foreground)]">Study Log</p>
              <p className="text-xs text-[var(--muted)]">Track your study sessions</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
