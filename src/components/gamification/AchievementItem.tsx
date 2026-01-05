"use client";

import { TIER_CONFIG, type Tier } from "@/lib/gamification/types";

interface AchievementItemProps {
  displayName: string;
  displayDescription: string;
  tier: Tier;
  points: number;
  isUnlocked: boolean;
  isHidden: boolean;
  unlockedAt: string | null | undefined;
}

export function AchievementItem({
  displayName,
  displayDescription,
  tier,
  points,
  isUnlocked,
  isHidden,
  unlockedAt,
}: AchievementItemProps) {
  const tierConfig = TIER_CONFIG[tier];

  return (
    <div
      className={`
        flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300
        ${isUnlocked ? "opacity-100" : "opacity-60"}
      `}
      style={{
        background: isUnlocked
          ? `linear-gradient(90deg, ${tierConfig.bgColor} 0%, var(--card) 50%)`
          : "var(--card)",
        borderColor: isUnlocked ? tierConfig.color : tierConfig.borderColor,
      }}
    >
      {/* Status icon */}
      <div
        className={`
          w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0
          ${isUnlocked ? "" : "grayscale"}
        `}
        style={{
          backgroundColor: tierConfig.bgColor,
          border: `2px solid ${isUnlocked ? tierConfig.color : tierConfig.borderColor}`,
        }}
      >
        {isUnlocked ? "🏆" : isHidden ? "❓" : "🔒"}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="font-bold text-[var(--foreground)] truncate">
            {displayName}
          </h4>
          <span
            className="text-xs font-bold uppercase px-1.5 py-0.5 rounded flex-shrink-0"
            style={{
              backgroundColor: tierConfig.color,
              color: tier === "platinum" || tier === "silver" ? "#000" : "#fff",
            }}
          >
            {tier}
          </span>
        </div>
        <p className="text-sm text-[var(--muted-foreground)] line-clamp-1">
          {displayDescription}
        </p>
      </div>

      {/* Points and date */}
      <div className="text-right flex-shrink-0">
        <div
          className="font-bold"
          style={{ color: isUnlocked ? tierConfig.color : "var(--muted-foreground)" }}
        >
          +{points}
        </div>
        {isUnlocked && unlockedAt && (
          <div className="text-xs text-[var(--muted-foreground)]">
            {new Date(unlockedAt).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Checkmark for unlocked */}
      {isUnlocked && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: tierConfig.color }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={tier === "platinum" || tier === "silver" ? "#000" : "#fff"}
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
