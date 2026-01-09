"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { useNTSAchievements } from "@/components/gamification/AchievementProvider";
import type { NTSEntry, SectionCode, NTSStatus } from "@/lib/supabase/types";

const sections: SectionCode[] = ["FAR", "AUD", "REG", "TCP", "BAR", "ISC"];

export default function NTSPage() {
  const { user, loading: authLoading } = useAuth();
  const { onNTSAdded } = useNTSAchievements();
  const [entries, setEntries] = useState<NTSEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<NTSEntry | null>(null);
  const [formData, setFormData] = useState({
    section: "FAR" as SectionCode,
    issue_date: "",
    expiration_date: "",
    status: "active" as NTSStatus,
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (authLoading) return; // Wait for auth to finish
    if (user) {
      fetchEntries();
    } else {
      setLoading(false);
    }
  }, [user, authLoading]);

  const fetchEntries = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("nts_entries")
      .select("*")
      .eq("user_id", user?.id)
      .order("expiration_date", { ascending: true });

    if (!error && data) {
      setEntries(data as NTSEntry[]);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      section: "FAR",
      issue_date: "",
      expiration_date: "",
      status: "active",
      notes: "",
    });
    setEditingEntry(null);
  };

  const openEdit = (entry: NTSEntry) => {
    setFormData({
      section: entry.section,
      issue_date: entry.issue_date,
      expiration_date: entry.expiration_date,
      status: entry.status,
      notes: entry.notes || "",
    });
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !supabase) return;

    setSubmitting(true);

    const entryData = {
      user_id: user.id,
      section: formData.section,
      issue_date: formData.issue_date,
      expiration_date: formData.expiration_date,
      status: formData.status,
      notes: formData.notes || null,
    };

    if (editingEntry) {
      await supabase
        .from("nts_entries")
        .update(entryData)
        .eq("id", editingEntry.id);
    } else {
      const { error } = await supabase.from("nts_entries").insert(entryData);
      // Trigger achievement check for new NTS
      if (!error) {
        await onNTSAdded();
      }
    }

    resetForm();
    setShowForm(false);
    fetchEntries();
    setSubmitting(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this NTS entry?") || !supabase) return;

    await supabase.from("nts_entries").delete().eq("id", id);
    fetchEntries();
  };

  // Calculate days until expiration
  const getDaysUntilExpiration = (expirationDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpirationStatus = (days: number, status: NTSStatus) => {
    if (status !== "active") return "gray";
    if (days < 0) return "red";
    if (days <= 30) return "orange";
    if (days <= 60) return "yellow";
    return "green";
  };

  const activeEntries = entries.filter((e) => e.status === "active");
  const expiredOrUsed = entries.filter((e) => e.status !== "active");

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
          <h1 className="text-2xl font-bold text-[var(--foreground)]">NTS Tracker</h1>
          <p className="text-[var(--muted)]">Track your Notice to Schedule dates</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="btn-primary"
        >
          {showForm ? "Cancel" : "+ Add NTS"}
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-blue-800">
              <strong>NTS Validity:</strong> Your Notice to Schedule is typically valid for 6 months from issue date.
              Schedule your exam before it expires or you&apos;ll need to reapply and pay again.
            </p>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700 p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            {editingEntry ? "Edit NTS Entry" : "Add New NTS"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
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
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as NTSStatus })}
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                >
                  <option value="active">Active</option>
                  <option value="used">Used (Exam Taken)</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Issue Date
                </label>
                <input
                  type="date"
                  value={formData.issue_date}
                  onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={formData.expiration_date}
                  onChange={(e) => setFormData({ ...formData, expiration_date: e.target.value })}
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
                placeholder="Any notes about this NTS..."
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border)] focus:ring-2 focus:ring-[var(--primary)] outline-none resize-none"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary disabled:opacity-50"
              >
                {submitting ? "Saving..." : editingEntry ? "Update NTS" : "Add NTS"}
              </button>
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  setShowForm(false);
                }}
                className="px-4 py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--card)] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active NTS Entries */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700">
        <div className="p-6 border-b border-[var(--border)] dark:border-gray-700">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Active NTS Entries</h2>
        </div>

        {activeEntries.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-[var(--card)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-[var(--muted)] mb-4">No active NTS entries</p>
            <button onClick={() => setShowForm(true)} className="btn-primary">
              Add Your First NTS
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[var(--border)]">
            {activeEntries.map((entry) => {
              const daysLeft = getDaysUntilExpiration(entry.expiration_date);
              const statusColor = getExpirationStatus(daysLeft, entry.status);
              const colorClasses = {
                red: "bg-red-100 text-red-700 border-red-200",
                orange: "bg-orange-100 text-orange-700 border-orange-200",
                yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
                green: "bg-green-100 text-green-700 border-green-200",
                gray: "bg-gray-100 text-gray-700 border-gray-200",
              };

              return (
                <div key={entry.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 bg-[var(--primary)] rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold">{entry.section}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[var(--foreground)]">{entry.section}</h3>
                        <p className="text-sm text-[var(--muted)]">
                          Issued: {new Date(entry.issue_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm text-[var(--muted)]">Expires</p>
                        <p className="font-semibold text-[var(--foreground)]">
                          {new Date(entry.expiration_date).toLocaleDateString()}
                        </p>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${colorClasses[statusColor]}`}>
                        {daysLeft < 0 ? "Expired" : `${daysLeft} days left`}
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => openEdit(entry)}
                          className="p-2 hover:bg-[var(--card)] rounded-lg transition-colors"
                        >
                          <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  {entry.notes && (
                    <p className="mt-3 text-sm text-[var(--muted)] pl-18">{entry.notes}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Past NTS Entries */}
      {expiredOrUsed.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] dark:border-gray-700">
          <div className="p-6 border-b border-[var(--border)] dark:border-gray-700">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">Past NTS Entries</h2>
          </div>
          <div className="divide-y divide-[var(--border)] dark:divide-gray-700">
            {expiredOrUsed.map((entry) => (
              <div key={entry.id} className="p-6 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gray-400 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">{entry.section}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--foreground)]">{entry.section}</h3>
                      <p className="text-sm text-[var(--muted)]">
                        {new Date(entry.issue_date).toLocaleDateString()} - {new Date(entry.expiration_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      entry.status === "used" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                    }`}>
                      {entry.status === "used" ? "Exam Taken" : "Expired"}
                    </span>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-500"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
