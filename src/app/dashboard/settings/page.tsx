"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useProfileAchievements } from "@/components/gamification/AchievementProvider";
import { getAllStates } from "@/lib/data/state-requirements";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function SettingsPage() {
  const { user, profile, refreshProfile, loading: authLoading } = useAuth();
  const { onProfileUpdated } = useProfileAchievements();
  const [formData, setFormData] = useState({
    full_name: "",
    state_code: "",
    target_completion_date: "",
    discipline_choice: "",
    weekly_study_hours: "",
    working_full_time: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();
  const states = getAllStates();

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        state_code: profile.state_code || "",
        target_completion_date: profile.target_completion_date || "",
        discipline_choice: profile.discipline_choice || "",
        weekly_study_hours: profile.weekly_study_hours?.toString() || "",
        working_full_time: profile.working_full_time || false,
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !supabase) return;

    setLoading(true);
    setSuccess(false);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: formData.full_name || null,
        state_code: formData.state_code || null,
        target_completion_date: formData.target_completion_date || null,
        discipline_choice: formData.discipline_choice || null,
        weekly_study_hours: formData.weekly_study_hours ? parseInt(formData.weekly_study_hours) : null,
        working_full_time: formData.working_full_time,
      })
      .eq("id", user.id);

    if (!error) {
      setSuccess(true);
      await refreshProfile();
      // Trigger achievement check for profile update
      await onProfileUpdated({
        full_name: formData.full_name || null,
        state_code: formData.state_code || null,
        target_completion_date: formData.target_completion_date || null,
        discipline_choice: formData.discipline_choice || null,
        weekly_study_hours: formData.weekly_study_hours ? parseInt(formData.weekly_study_hours) : null,
      });
      setTimeout(() => setSuccess(false), 3000);
    }

    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Settings</h1>
        <p className="text-[var(--muted)]">Manage your profile and preferences</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Profile</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Your name"
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Email
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--muted)]"
              />
              <p className="text-xs text-[var(--muted)] mt-1">Email cannot be changed</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                State
              </label>
              <select
                value={formData.state_code}
                onChange={(e) => setFormData({ ...formData, state_code: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              >
                <option value="">Select your state</option>
                {states.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-[var(--muted)] mt-1">
                Used for state-specific requirements and resources
              </p>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Appearance</h2>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">Theme</p>
              <p className="text-xs text-[var(--muted)] mt-1">
                Choose light, dark, or follow your system preference
              </p>
            </div>
            <ThemeToggle showLabel />
          </div>
        </div>

        {/* Study Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Study Preferences</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Target Completion Date
              </label>
              <input
                type="date"
                value={formData.target_completion_date}
                onChange={(e) => setFormData({ ...formData, target_completion_date: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
              <p className="text-xs text-[var(--muted)] mt-1">
                When do you want to pass all sections?
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Discipline Section
              </label>
              <select
                value={formData.discipline_choice}
                onChange={(e) => setFormData({ ...formData, discipline_choice: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              >
                <option value="">Not decided yet</option>
                <option value="TCP">TCP - Tax Compliance & Planning</option>
                <option value="BAR">BAR - Business Analysis & Reporting</option>
                <option value="ISC">ISC - Information Systems & Controls</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                Weekly Study Hours Goal
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={formData.weekly_study_hours}
                onChange={(e) => setFormData({ ...formData, weekly_study_hours: e.target.value })}
                placeholder="e.g., 15"
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
              />
              <p className="text-xs text-[var(--muted)] mt-1">
                How many hours per week can you dedicate to studying?
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="working_full_time"
                checked={formData.working_full_time}
                onChange={(e) => setFormData({ ...formData, working_full_time: e.target.checked })}
                className="w-4 h-4 text-[var(--primary)] border-[var(--border)] rounded focus:ring-[var(--primary)]"
              />
              <label htmlFor="working_full_time" className="text-sm text-[var(--foreground)]">
                I&apos;m working full-time while studying
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <div>
            {success && (
              <p className="text-green-600 text-sm font-medium">
                Settings saved successfully!
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* Danger Zone */}
      <div className="mt-12 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 p-6">
        <h2 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Danger Zone</h2>
        <p className="text-sm text-red-700 dark:text-red-300 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button
          onClick={() => alert("Contact support to delete your account")}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
