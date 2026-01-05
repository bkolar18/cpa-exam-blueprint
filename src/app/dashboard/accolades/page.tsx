"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { BadgeCard } from "@/components/gamification/BadgeCard";
import { AchievementItem } from "@/components/gamification/AchievementItem";
import { getGamificationSummary } from "@/lib/gamification/checker";
import { TIER_CONFIG, type Tier } from "@/lib/gamification/types";

interface BadgeData {
  id: string;
  code: string;
  name: string;
  description: string;
  tier: Tier;
  points: number;
  requirement_section: string | null;
  isEarned: boolean;
  progress: number;
  earnedAt: string | null | undefined;
}

interface AchievementData {
  id: string;
  code: string;
  name: string;
  description: string;
  tier: Tier;
  points: number;
  is_hidden: boolean;
  isUnlocked: boolean;
  unlockedAt: string | null | undefined;
  displayName: string;
  displayDescription: string;
}

interface GamificationData {
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  badges: {
    total: number;
    earned: number;
    list: BadgeData[];
  };
  achievements: {
    total: number;
    unlocked: number;
    list: AchievementData[];
  };
}

export default function AccoladesPage() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<GamificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"badges" | "achievements">("badges");
  const [sectionFilter, setSectionFilter] = useState<string>("all");

  useEffect(() => {
    if (authLoading) return;

    async function loadData() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const summary = await getGamificationSummary(user.id);
        // Debug: check is_hidden values
        const hiddenAchievements = summary?.achievements.list.filter((a: { is_hidden?: boolean }) => a.is_hidden === true);
        console.log('[Accolades] Hidden achievements:', hiddenAchievements?.length, hiddenAchievements?.map((a: { code?: string }) => a.code));
        setData(summary);
      } catch (error) {
        console.error("Error loading accolades:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--muted-foreground)]">Unable to load accolades.</p>
      </div>
    );
  }

  // Filter badges by section
  const sections = ["all", "FAR", "AUD", "REG", "TCP", "BAR", "ISC"];
  const filteredBadges =
    sectionFilter === "all"
      ? data.badges.list
      : data.badges.list.filter((b) => b.requirement_section === sectionFilter);

  // Group achievements by tier
  const achievementsByTier = data.achievements.list.reduce(
    (acc, achievement) => {
      const tier = achievement.tier as Tier;
      if (!acc[tier]) acc[tier] = [];
      acc[tier].push(achievement);
      return acc;
    },
    {} as Record<Tier, AchievementData[]>
  );

  const tierOrder: Tier[] = ["platinum", "gold", "silver", "bronze"];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
          My Accolades
        </h1>
        <p className="text-[var(--muted-foreground)]">
          Track your badges and achievements as you progress through your CPA journey.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Points"
          value={data.totalPoints.toLocaleString()}
          icon="⭐"
        />
        <StatCard
          label="Badges Earned"
          value={`${data.badges.earned}/${data.badges.total}`}
          icon="🎖️"
        />
        <StatCard
          label="Achievements"
          value={`${data.achievements.unlocked}/${data.achievements.total}`}
          icon="🏆"
        />
        <StatCard
          label="Study Streak"
          value={`${data.currentStreak} days`}
          icon="🔥"
          subtext={`Best: ${data.longestStreak} days`}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("badges")}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all
            ${
              activeTab === "badges"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }
          `}
        >
          Badges ({data.badges.earned}/{data.badges.total})
        </button>
        <button
          onClick={() => setActiveTab("achievements")}
          className={`
            px-6 py-3 rounded-lg font-medium transition-all
            ${
              activeTab === "achievements"
                ? "bg-[var(--primary)] text-white"
                : "bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }
          `}
        >
          Achievements ({data.achievements.unlocked}/{data.achievements.total})
        </button>
      </div>

      {/* Badges Tab */}
      {activeTab === "badges" && (
        <>
          {/* Section Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setSectionFilter(section)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    sectionFilter === section
                      ? "bg-[var(--primary)] text-white"
                      : "bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)]"
                  }
                `}
              >
                {section === "all" ? "All Sections" : section}
              </button>
            ))}
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                name={badge.name}
                description={badge.description}
                tier={badge.tier}
                points={badge.points}
                isEarned={badge.isEarned}
                progress={badge.progress}
                earnedAt={badge.earnedAt}
                section={badge.requirement_section || undefined}
              />
            ))}
          </div>

          {filteredBadges.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[var(--muted-foreground)]">
                No badges found for this section.
              </p>
            </div>
          )}
        </>
      )}

      {/* Achievements Tab */}
      {activeTab === "achievements" && (
        <div className="space-y-8">
          {tierOrder.map((tier) => {
            const achievements = achievementsByTier[tier];
            if (!achievements || achievements.length === 0) return null;

            const tierConfig = TIER_CONFIG[tier];
            const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

            return (
              <div key={tier}>
                <div className="flex items-center gap-3 mb-4">
                  <h3
                    className="text-lg font-bold uppercase"
                    style={{ color: tierConfig.color }}
                  >
                    {tier}
                  </h3>
                  <span className="text-sm text-[var(--muted-foreground)]">
                    {unlockedCount}/{achievements.length} unlocked
                  </span>
                  <div className="flex-1 h-px bg-[var(--border)]" />
                </div>

                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <AchievementItem
                      key={achievement.id}
                      name={achievement.displayName}
                      description={achievement.displayDescription}
                      tier={achievement.tier}
                      points={achievement.points}
                      isUnlocked={achievement.isUnlocked}
                      isHidden={achievement.is_hidden}
                      unlockedAt={achievement.unlockedAt}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Platinum Reward Banner */}
      {data.achievements.unlocked >= data.achievements.total - 1 && (
        <div className="mt-12 rounded-xl p-6 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-2 border-purple-500/50">
          <div className="flex items-center gap-4">
            <div className="text-5xl">👑</div>
            <div>
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-1">
                {data.achievements.unlocked === data.achievements.total
                  ? "You've Earned a Reward!"
                  : "Almost There!"}
              </h3>
              <p className="text-[var(--muted-foreground)]">
                {data.achievements.unlocked === data.achievements.total
                  ? "Use code CPAMASTER for an exclusive discount on Surgent CPA Review!"
                  : `Unlock ${data.achievements.total - data.achievements.unlocked} more achievement${data.achievements.total - data.achievements.unlocked === 1 ? "" : "s"} to earn an exclusive Surgent discount code.`}
              </p>
              {data.achievements.unlocked === data.achievements.total && (
                <a
                  href="/recommended-program"
                  className="inline-block mt-3 px-6 py-2 bg-[var(--primary)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Claim Your Discount
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  subtext,
}: {
  label: string;
  value: string;
  icon: string;
  subtext?: string;
}) {
  return (
    <div className="bg-[var(--card)] rounded-xl p-4 border border-[var(--border)]">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm text-[var(--muted-foreground)]">{label}</span>
      </div>
      <div className="text-2xl font-bold text-[var(--foreground)]">{value}</div>
      {subtext && (
        <div className="text-xs text-[var(--muted-foreground)] mt-1">{subtext}</div>
      )}
    </div>
  );
}
