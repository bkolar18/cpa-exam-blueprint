"use client";

import { TIER_CONFIG, type Tier } from "@/lib/gamification/types";

interface AchievementItemProps {
  name: string;
  description: string;
  tier: Tier;
  points: number;
  isUnlocked: boolean;
  isHidden: boolean;
  unlockedAt: string | null | undefined;
}

// Default fallback config for when tier is not found
const DEFAULT_TIER_CONFIG = {
  color: '#6b7280',
  bgColor: 'rgba(107, 114, 128, 0.1)',
  borderColor: 'rgba(107, 114, 128, 0.3)',
  points: 0,
};

export function AchievementItem({
  name,
  description,
  tier,
  points,
  isUnlocked,
  isHidden,
  unlockedAt,
}: AchievementItemProps) {
  const tierConfig = TIER_CONFIG[tier] || DEFAULT_TIER_CONFIG;

  // For hidden achievements that are NOT unlocked, show "???" as description
  const displayDescription = isHidden && !isUnlocked ? "???" : description;

  return (
    <div
      className={`
        flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300
        ${isUnlocked ? "" : "opacity-50 grayscale-[30%]"}
      `}
      style={{
        background: isUnlocked
          ? "linear-gradient(90deg, rgba(34, 197, 94, 0.15) 0%, var(--card) 50%)"
          : "var(--card)",
        borderColor: isUnlocked ? "#22c55e" : "var(--border)",
      }}
    >
      {/* Status icon */}
      <div
        className={`
          w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0
        `}
        style={{
          backgroundColor: isUnlocked ? "rgba(34, 197, 94, 0.2)" : "var(--card)",
          border: `2px solid ${isUnlocked ? "#22c55e" : "var(--border)"}`,
        }}
      >
        {isUnlocked ? "✓" : "🔒"}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4
            className={`font-bold truncate ${
              isUnlocked ? "text-green-600 dark:text-green-400" : "text-[var(--muted-foreground)]"
            }`}
          >
            {name}
          </h4>
          <span
            className={`text-xs font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0 ${
              isUnlocked ? "" : "opacity-60"
            }`}
            style={{
              backgroundColor: isUnlocked ? tierConfig.color : "var(--border)",
              color: isUnlocked
                ? tier === "platinum" || tier === "silver"
                  ? "#000"
                  : "#fff"
                : "var(--muted-foreground)",
            }}
          >
            {tier}
          </span>
        </div>
        <p className={`text-sm text-[var(--muted-foreground)] line-clamp-1 ${isHidden && !isUnlocked ? "italic" : ""}`}>
          {displayDescription}
        </p>
      </div>

      {/* Points */}
      <div className="text-right flex-shrink-0">
        <div
          className={`font-bold ${
            isUnlocked ? "text-green-600 dark:text-green-400" : "text-[var(--muted-foreground)]"
          }`}
        >
          +{points} pts
        </div>
        {isUnlocked && unlockedAt && (
          <div className="text-xs text-green-600 dark:text-green-400">
            {new Date(unlockedAt).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Checkmark for unlocked */}
      {isUnlocked && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-green-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
}
