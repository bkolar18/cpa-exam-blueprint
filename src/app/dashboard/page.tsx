"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";

// Type for study session from Supabase
interface StudySessionRow {
  id: string;
  section: string;
  hours: number;
  date: string;
  notes: string | null;
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified") === "true";
  const { user, profile, loading: authLoading, refreshProfile } = useAuth();
  const [sectionProgress, setSectionProgress] = useState<{ status: string }[]>([]);
  const [recentSessions, setRecentSessions] = useState<StudySessionRow[]>([]);
  const [ntsEntries, setNtsEntries] = useState<{ id: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUpgradePromo, setShowUpgradePromo] = useState(false);
  const supabase = createClient();

  // Determine user's subscription tier (default to 'free' if not set)
  const subscriptionTier = profile?.subscription_tier || "free";
  const isPro = subscriptionTier === "pro";
  const isFree = subscriptionTier === "free";

  // Check if promo was dismissed in localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && !isPro) {
      const dismissed = localStorage.getItem("upgrade_promo_dismissed");
      const dismissedTime = dismissed ? parseInt(dismissed, 10) : 0;
      const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
      // Show promo if not dismissed or dismissed more than 3 days ago
      if (!dismissed || dismissedTime < threeDaysAgo) {
        setShowUpgradePromo(true);
      }
    }
  }, [isPro]);

  const dismissUpgradePromo = () => {
    setShowUpgradePromo(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("upgrade_promo_dismissed", Date.now().toString());
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    fetchDashboardData();
  }, [user, authLoading]);

  const fetchDashboardData = async () => {
    if (!supabase || !user) {
      setLoading(false);
      return;
    }

    // Refresh profile to get latest streak data
    await refreshProfile();

    // Fetch section progress
    const { data: progressData } = await supabase
      .from("section_progress")
      .select("*")
      .eq("user_id", user.id);
    if (progressData) setSectionProgress(progressData);

    // Fetch study sessions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const { data: sessionsData } = await supabase
      .from("study_sessions")
      .select("*")
      .eq("user_id", user.id)
      .gte("date", sevenDaysAgo.toISOString().split("T")[0]);
    if (sessionsData) setRecentSessions(sessionsData as StudySessionRow[]);

    // Fetch NTS entries
    const { data: ntsData } = await supabase
      .from("nts_entries")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "active");
    if (ntsData) setNtsEntries(ntsData);

    setLoading(false);
  };

  // Helper function to format hours (show minutes if under 1 hour)
  const formatHours = (hours: number): string => {
    if (hours === 0) return "0";
    if (hours < 1) {
      const minutes = Math.round(hours * 60);
      return `${minutes}m`;
    }
    if (hours % 1 === 0) return hours.toString();
    return hours.toFixed(1);
  };

  // Calculate stats
  const weeklyHours = recentSessions?.reduce((sum: number, s: { hours: number }) => sum + Number(s.hours), 0) || 0;
  const sectionsPassed = sectionProgress?.filter((s: { status: string }) => s.status === "passed").length || 0;
  const sectionsInProgress = sectionProgress?.filter((s: { status: string }) => s.status === "studying" || s.status === "scheduled").length || 0;
  const activeNTS = ntsEntries?.length || 0;

  // Check if profile is incomplete (needs onboarding)
  const needsOnboarding = !profile?.state_code || !profile?.target_completion_date;

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Email Verification Success Message */}
      {isVerified && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Email Verified Successfully!</h3>
              <p className="text-green-700 text-sm">
                Your account is now active. Welcome to CPA Exam Blueprint!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}!
        </h1>
        <p className="text-white/80">
          {weeklyHours > 0
            ? weeklyHours < 1
              ? `You've logged ${Math.round(weeklyHours * 60)} study minutes this week. Keep it up!`
              : `You've logged ${weeklyHours.toFixed(1)} study hours this week. Keep it up!`
            : "Ready to start tracking your CPA journey?"}
        </p>
      </div>

      {/* Onboarding Prompt */}
      {needsOnboarding && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800">Complete Your Profile</h3>
              <p className="text-amber-700 text-sm mt-1">
                Set up your state, target date, and study preferences to get personalized insights.
              </p>
              <Link
                href="/dashboard/settings"
                className="inline-block mt-3 text-sm font-medium text-amber-800 hover:text-amber-900"
              >
                Complete Setup &rarr;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Promotion Banner */}
      {showUpgradePromo && !isPro && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          {/* Dismiss button */}
          <button
            onClick={dismissUpgradePromo}
            className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Dismiss"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-6 h-6 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span className="text-sm font-medium text-purple-200 uppercase tracking-wider">
                  {isFree ? "Unlock More Features" : "Upgrade to Pro"}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                {isFree
                  ? "Ready to supercharge your CPA prep?"
                  : "Get unlimited access with Pro!"}
              </h3>
              <p className="text-purple-100 text-sm">
                {isFree
                  ? "Get 3,000+ questions across all core sections with unlimited access until you pass, or go Pro for 6,000+ questions across all 6 sections!"
                  : "Unlock all 6,000+ practice questions, adaptive learning, and all 6 exam sections with unlimited access until you pass."}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {isFree && (
                <Link
                  href="/pricing?plan=standard"
                  className="px-5 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg font-medium text-center transition-colors"
                >
                  <span className="line-through opacity-60">$99</span>{" "}
                  <span className="font-bold">$79</span>
                </Link>
              )}
              <Link
                href="/pricing?plan=pro"
                className="px-5 py-2.5 bg-white text-purple-700 hover:bg-purple-50 rounded-lg font-semibold text-center transition-colors"
              >
                {isFree ? (
                  <>
                    <span className="line-through opacity-60">$199</span>{" "}
                    <span className="font-bold">$149</span>
                  </>
                ) : (
                  <>
                    Pro - <span className="line-through opacity-60">$199</span>{" "}
                    <span className="font-bold">$149</span>
                  </>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="This Week"
          value={weeklyHours < 1 && weeklyHours > 0 ? formatHours(weeklyHours) : `${formatHours(weeklyHours)}h`}
          sublabel={profile?.weekly_study_hours ? `Goal: ${profile.weekly_study_hours}h` : "Set a goal"}
          color="blue"
        />
        <StatCard
          label="Sections Passed"
          value={`${sectionsPassed}/4`}
          sublabel={sectionsInProgress > 0 ? `${sectionsInProgress} in progress` : "Start studying"}
          color="green"
        />
        <StatCard
          label="Active NTS"
          value={activeNTS.toString()}
          sublabel={activeNTS > 0 ? "Track expiration" : "Add your NTS"}
          color="purple"
        />
        <StatCard
          label="Study Streak"
          value={`${profile?.current_streak || 0} ${(profile?.current_streak || 0) === 1 ? 'day' : 'days'}`}
          sublabel={profile?.longest_streak ? `Best: ${profile.longest_streak} ${profile.longest_streak === 1 ? 'day' : 'days'}` : "Log a session"}
          color="orange"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickActionCard
          href="/dashboard/study-log"
          icon="clock"
          title="Log Study Session"
          description="Track your daily study hours and topics"
        />
        <QuickActionCard
          href="/dashboard/sections"
          icon="sections"
          title="Update Section Progress"
          description="Mark sections as studying, scheduled, or passed"
        />
        <QuickActionCard
          href="/dashboard/nts"
          icon="calendar"
          title="Manage NTS"
          description="Track your Notice to Schedule dates"
        />
        <QuickActionCard
          href="/dashboard/practice"
          icon="practice"
          title="Practice Questions"
          description="Test your knowledge with MCQs"
        />
        <QuickActionCard
          href="/tools/score-release-calendar"
          icon="calendar"
          title="Score Release Calendar"
          description="Check when scores will be released"
        />
        <QuickActionCard
          href="/blog"
          icon="book"
          title="Study Guides"
          description="Read section-specific study strategies"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-[var(--border)] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">Recent Study Sessions</h2>
          <Link
            href="/dashboard/practice"
            className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Start Practice Session
          </Link>
        </div>
        {recentSessions && recentSessions.length > 0 ? (
          <div className="space-y-3">
            {recentSessions.slice(0, 5).map((session) => (
              <div key={session.id} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-bold text-[var(--primary)]">{session.section}</span>
                  </div>
                  <div>
                    <p className="font-medium text-[var(--foreground)]">
                      {session.hours < 1
                        ? `${Math.round(session.hours * 60)} minutes`
                        : `${session.hours} hours`}
                    </p>
                    <p className="text-sm text-[var(--muted)]">{new Date(session.date).toLocaleDateString()}</p>
                  </div>
                </div>
                {session.notes && (
                  <p className="text-sm text-[var(--muted)] max-w-xs truncate">{session.notes}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-[var(--muted)] mb-4">No study sessions logged yet</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard/study-log" className="btn-primary inline-block">
                Log Your First Session
              </Link>
              <Link href="/dashboard/practice" className="btn-secondary inline-block">
                Start Practice Quiz
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  sublabel,
  color,
}: {
  label: string;
  value: string;
  sublabel: string;
  color: "blue" | "green" | "purple" | "orange";
}) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <div className="bg-white rounded-xl border border-[var(--border)] p-5">
      <p className="text-sm text-[var(--muted)] mb-1">{label}</p>
      <p className={`text-3xl font-bold ${colors[color].split(" ")[1]}`}>{value}</p>
      <p className="text-sm text-[var(--muted)] mt-1">{sublabel}</p>
    </div>
  );
}

function QuickActionCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  const icons: Record<string, React.ReactNode> = {
    clock: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    sections: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    calendar: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    practice: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    book: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  };

  return (
    <Link
      href={href}
      className="bg-white rounded-xl border border-[var(--border)] p-5 hover:border-[var(--primary)] hover:shadow-md transition-all group"
    >
      <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center text-[var(--primary)] mb-4 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
        {icons[icon]}
      </div>
      <h3 className="font-semibold text-[var(--foreground)] mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted)]">{description}</p>
    </Link>
  );
}
