"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useSectionAchievements } from "@/components/gamification/AchievementProvider";
import type { SectionProgress, SectionCode, SectionStatus } from "@/lib/supabase/types";

const sections: { code: SectionCode; name: string; type: "core" | "discipline" }[] = [
  { code: "FAR", name: "Financial Accounting & Reporting", type: "core" },
  { code: "AUD", name: "Auditing & Attestation", type: "core" },
  { code: "REG", name: "Regulation", type: "core" },
  { code: "TCP", name: "Tax Compliance & Planning", type: "discipline" },
  { code: "BAR", name: "Business Analysis & Reporting", type: "discipline" },
  { code: "ISC", name: "Information Systems & Controls", type: "discipline" },
];

const statuses: { value: SectionStatus; label: string; color: string }[] = [
  { value: "not_started", label: "Not Started", color: "bg-gray-100 text-gray-700" },
  { value: "studying", label: "Studying", color: "bg-blue-100 text-blue-700" },
  { value: "scheduled", label: "Scheduled", color: "bg-purple-100 text-purple-700" },
  { value: "passed", label: "Passed", color: "bg-green-100 text-green-700" },
  { value: "failed", label: "Failed", color: "bg-red-100 text-red-700" },
];

export default function SectionsPage() {
  const { user, profile, loading: authLoading } = useAuth();
  const { onSectionUpdated } = useSectionAchievements();
  const [progress, setProgress] = useState<Record<string, SectionProgress>>({});
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<SectionCode | null>(null);
  const [formData, setFormData] = useState({
    status: "not_started" as SectionStatus,
    start_date: "",
    exam_date: "",
    score: "",
  });
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return; // Wait for auth to finish
    if (user) {
      fetchProgress();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchProgress = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("section_progress")
      .select("*")
      .eq("user_id", user?.id);

    if (!error && data) {
      const progressMap: Record<string, SectionProgress> = {};
      (data as SectionProgress[]).forEach((p) => {
        progressMap[p.section] = p;
      });
      setProgress(progressMap);
    }
    setLoading(false);
  };

  const openEdit = (sectionCode: SectionCode) => {
    const existing = progress[sectionCode];
    setFormData({
      status: existing?.status || "not_started",
      start_date: existing?.start_date || "",
      exam_date: existing?.exam_date || "",
      score: existing?.score?.toString() || "",
    });
    setEditingSection(sectionCode);
  };

  const handleSave = async () => {
    if (!user || !editingSection || !supabase) return;

    const existing = progress[editingSection];

    const updateData = {
      user_id: user.id,
      section: editingSection,
      status: formData.status,
      start_date: formData.start_date || null,
      exam_date: formData.exam_date || null,
      score: formData.score ? parseInt(formData.score) : null,
      attempt_number: existing?.attempt_number || 1,
    };

    let error;
    if (existing) {
      const result = await supabase
        .from("section_progress")
        .update(updateData)
        .eq("id", existing.id);
      error = result.error;
    } else {
      const result = await supabase.from("section_progress").insert(updateData);
      error = result.error;
    }

    // Trigger achievement check for section update
    if (!error) {
      await onSectionUpdated();
    }

    setEditingSection(null);
    fetchProgress();
  };

  // Determine which discipline to show based on profile
  const disciplineChoice = profile?.discipline_choice;
  const visibleSections = sections.filter(
    (s) => s.type === "core" || s.code === disciplineChoice || !disciplineChoice
  );

  const passedCount = Object.values(progress).filter((p) => p.status === "passed").length;
  const studyingCount = Object.values(progress).filter(
    (p) => p.status === "studying" || p.status === "scheduled"
  ).length;

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
        <h1 className="text-2xl font-bold text-[var(--foreground)]">My Sections</h1>
        <p className="text-[var(--muted)]">Track your progress on each CPA exam section</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl border border-[var(--border)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Overall Progress</h2>
          <span className="text-2xl font-bold text-[var(--primary)]">{passedCount}/4</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-[var(--primary)] h-4 rounded-full transition-all"
            style={{ width: `${(passedCount / 4) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-[var(--muted)]">
          <span>{passedCount} passed</span>
          <span>{studyingCount} in progress</span>
          <span>{4 - passedCount - studyingCount} remaining</span>
        </div>
      </div>

      {/* Core Sections */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Core Sections (Required)</h2>
        <div className="grid gap-4">
          {visibleSections
            .filter((s) => s.type === "core")
            .map((section) => (
              <SectionCard
                key={section.code}
                section={section}
                progress={progress[section.code]}
                onEdit={() => openEdit(section.code)}
              />
            ))}
        </div>
      </div>

      {/* Discipline Section */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
          Discipline Section (Choose 1)
        </h2>
        {!disciplineChoice && (
          <p className="text-sm text-[var(--muted)] mb-4">
            Set your discipline choice in Settings to focus on one section.
          </p>
        )}
        <div className="grid gap-4">
          {visibleSections
            .filter((s) => s.type === "discipline")
            .map((section) => (
              <SectionCard
                key={section.code}
                section={section}
                progress={progress[section.code]}
                onEdit={() => openEdit(section.code)}
                isSelected={section.code === disciplineChoice}
              />
            ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingSection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">
              Update {editingSection}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as SectionStatus })}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                >
                  {statuses.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>

              {(formData.status === "scheduled" || formData.status === "passed" || formData.status === "failed") && (
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Exam Date
                  </label>
                  <input
                    type="date"
                    value={formData.exam_date}
                    onChange={(e) => setFormData({ ...formData, exam_date: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                  />
                </div>
              )}

              {(formData.status === "passed" || formData.status === "failed") && (
                <div>
                  <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                    Score
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="99"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    placeholder="0-99"
                    className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setEditingSection(null)}
                className="flex-1 px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--card)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 btn-primary"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionCard({
  section,
  progress,
  onEdit,
  isSelected,
}: {
  section: { code: SectionCode; name: string; type: string };
  progress?: SectionProgress;
  onEdit: () => void;
  isSelected?: boolean;
}) {
  const status = statuses.find((s) => s.value === (progress?.status || "not_started"))!;

  return (
    <div
      className={`bg-white rounded-xl border p-5 ${
        isSelected ? "border-[var(--primary)] ring-2 ring-[var(--primary)]/20" : "border-[var(--border)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              progress?.status === "passed"
                ? "bg-green-500"
                : "bg-[var(--primary)]"
            }`}
          >
            <span className="text-white font-bold">{section.code}</span>
          </div>
          <div>
            <h3 className="font-semibold text-[var(--foreground)]">{section.code}</h3>
            <p className="text-sm text-[var(--muted)]">{section.name}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
            {status.label}
          </span>
          {progress?.score && (
            <span className="text-2xl font-bold text-[var(--foreground)]">{progress.score}</span>
          )}
          <button
            onClick={onEdit}
            className="p-2 hover:bg-[var(--card)] rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
      </div>

      {(progress?.start_date || progress?.exam_date) && (
        <div className="mt-4 pt-4 border-t border-[var(--border)] flex space-x-6 text-sm">
          {progress.start_date && (
            <div>
              <span className="text-[var(--muted)]">Started: </span>
              <span className="text-[var(--foreground)]">
                {new Date(progress.start_date).toLocaleDateString()}
              </span>
            </div>
          )}
          {progress.exam_date && (
            <div>
              <span className="text-[var(--muted)]">Exam: </span>
              <span className="text-[var(--foreground)]">
                {new Date(progress.exam_date).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
