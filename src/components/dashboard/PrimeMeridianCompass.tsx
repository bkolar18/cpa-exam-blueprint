"use client";

import { getPrimeMeridianMilestone } from "@/lib/scoring/prime-meridian";

interface PrimeMeridianCompassProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  /** Use light colors for dark/colored backgrounds like the purple banner */
  variant?: "default" | "light";
  className?: string;
}

/**
 * Prime Meridian Compass Display
 *
 * Circular gauge design matching the section Prime Meridian scores.
 * Use variant="light" for colored backgrounds like the purple banner.
 */
export default function PrimeMeridianCompass({
  score,
  size = "md",
  showLabel = true,
  variant = "default",
  className = "",
}: PrimeMeridianCompassProps) {
  const milestone = getPrimeMeridianMilestone(score);

  // Size configurations matching PrimeMeridianCompact
  const sizeConfig = {
    sm: {
      svgSize: 64,
      radius: 28,
      strokeWidth: 5,
      fontSize: "text-base",
      labelSize: "text-[8px]",
    },
    md: {
      svgSize: 80,
      radius: 36,
      strokeWidth: 6,
      fontSize: "text-lg",
      labelSize: "text-xs",
    },
    lg: {
      svgSize: 100,
      radius: 44,
      strokeWidth: 7,
      fontSize: "text-xl",
      labelSize: "text-sm",
    },
  };

  const config = sizeConfig[size];
  const center = config.svgSize / 2;
  const circumference = 2 * Math.PI * config.radius;
  const scorePercentage = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

  // Get gauge color based on score
  const getGaugeColor = (s: number) => {
    if (s >= 75) return "#10b981"; // emerald-500
    if (s >= 65) return "#eab308"; // yellow-500
    if (s >= 50) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  const gaugeColor = getGaugeColor(score);

  // Colors based on variant
  const bgStrokeColor = variant === "light" ? "rgba(255,255,255,0.3)" : undefined;
  const bgStrokeClass = variant === "light" ? "" : "text-gray-200 dark:text-gray-700";
  const scoreColorClass = variant === "light" ? "text-white" : milestone.color;

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <div className="relative">
        <svg
          width={config.svgSize}
          height={config.svgSize}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={center}
            cy={center}
            r={config.radius}
            fill="none"
            stroke={bgStrokeColor || "currentColor"}
            strokeWidth={config.strokeWidth}
            className={bgStrokeClass}
          />

          {/* Progress arc */}
          <circle
            cx={center}
            cy={center}
            r={config.radius}
            fill="none"
            stroke={gaugeColor}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`${config.fontSize} font-bold ${scoreColorClass}`}
            style={variant === "light" ? { color: gaugeColor } : undefined}
          >
            {score}
          </span>
          {showLabel && (
            <span className={`${config.labelSize} ${variant === "light" ? "text-white/80" : "text-[var(--muted)]"} -mt-0.5`}>
              Prime Meridian
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
