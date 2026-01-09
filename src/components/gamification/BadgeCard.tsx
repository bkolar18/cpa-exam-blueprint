"use client";

import { TIER_CONFIG, type Tier } from "@/lib/gamification/types";

interface BadgeCardProps {
  name: string;
  description: string;
  tier: Tier;
  points: number;
  isEarned: boolean;
  progress: number;
  earnedAt: string | null | undefined;
  section?: string;
}

// Default fallback config for when tier is not found
const DEFAULT_TIER_CONFIG = {
  color: '#6b7280',
  bgColor: 'rgba(107, 114, 128, 0.1)',
  borderColor: 'rgba(107, 114, 128, 0.3)',
  points: 0,
};

export function BadgeCard({
  name,
  description,
  tier,
  points,
  isEarned,
  progress,
  earnedAt,
  section,
}: BadgeCardProps) {
  const tierConfig = TIER_CONFIG[tier] || DEFAULT_TIER_CONFIG;

  return (
    <div
      className={`
        relative rounded-xl p-4 border-2 transition-all duration-300
        ${isEarned ? "opacity-100" : "opacity-60"}
      `}
      style={{
        background: isEarned
          ? `linear-gradient(135deg, ${tierConfig.bgColor} 0%, var(--card) 100%)`
          : "var(--card)",
        borderColor: isEarned ? tierConfig.color : tierConfig.borderColor,
      }}
    >
      {/* Tier badge */}
      <div
        className="absolute -top-2 -right-2 px-2 py-0.5 rounded text-xs font-bold uppercase"
        style={{
          backgroundColor: tierConfig.color,
          color: tier === "platinum" || tier === "silver" ? "#000" : "#fff",
        }}
      >
        {tier}
      </div>

      {/* Icon / Status */}
      <div className="flex items-center justify-center mb-3">
        <div
          className={`
            w-16 h-16 rounded-full flex items-center justify-center text-3xl
            ${isEarned ? "" : "grayscale"}
          `}
          style={{
            backgroundColor: tierConfig.bgColor,
            border: `3px solid ${isEarned ? tierConfig.color : tierConfig.borderColor}`,
          }}
        >
          {isEarned ? "🎖️" : "🔒"}
        </div>
      </div>

      {/* Section tag */}
      {section && (
        <div className="text-center mb-2">
          <span className="text-xs font-medium px-2 py-0.5 rounded bg-[var(--primary)] text-white">
            {section}
          </span>
        </div>
      )}

      {/* Name */}
      <h4 className="font-bold text-center text-[var(--foreground)] mb-1">
        {name}
      </h4>

      {/* Description */}
      <p className="text-xs text-center text-[var(--muted-foreground)] mb-3 line-clamp-2">
        {description}
      </p>

      {/* Progress bar */}
      {!isEarned && (
        <div className="mb-2">
          <div className="flex justify-between text-xs text-[var(--muted-foreground)] mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: tierConfig.borderColor }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                backgroundColor: tierConfig.color,
              }}
            />
          </div>
        </div>
      )}

      {/* Points / Earned date */}
      <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
        <span
          className="font-medium"
          style={{ color: isEarned ? tierConfig.color : "inherit" }}
        >
          +{points} pts
        </span>
        {isEarned && earnedAt && (
          <span>
            Earned {new Date(earnedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
