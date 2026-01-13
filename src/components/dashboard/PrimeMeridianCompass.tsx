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
 * Includes milestone markers at 50, 65, 85 and a green 80 badge.
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

  // Size configurations matching section Prime Meridian design
  const sizeConfig = {
    sm: {
      svgSize: 64,
      radius: 26,
      strokeWidth: 5,
      fontSize: "text-base",
      labelSize: "text-[8px]",
      badgeSize: 16,
      badgeFont: "text-[8px]",
      badgeOffset: 30,
      markerLength: 4,
    },
    md: {
      svgSize: 80,
      radius: 32,
      strokeWidth: 6,
      fontSize: "text-lg",
      labelSize: "text-xs",
      badgeSize: 20,
      badgeFont: "text-[9px]",
      badgeOffset: 38,
      markerLength: 5,
    },
    lg: {
      svgSize: 100,
      radius: 40,
      strokeWidth: 7,
      fontSize: "text-xl",
      labelSize: "text-sm",
      badgeSize: 24,
      badgeFont: "text-[10px]",
      badgeOffset: 48,
      markerLength: 6,
    },
  };

  const config = sizeConfig[size];
  const center = config.svgSize / 2;
  const circumference = 2 * Math.PI * config.radius;
  const scorePercentage = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

  // Get gauge color based on score
  const getGaugeColor = (s: number) => {
    if (s >= 80) return "#10b981"; // emerald-500
    if (s >= 65) return "#eab308"; // yellow-500
    if (s >= 50) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  const gaugeColor = getGaugeColor(score);

  // Colors based on variant
  const bgStrokeColor = variant === "light" ? "rgba(255,255,255,0.3)" : undefined;
  const bgStrokeClass = variant === "light" ? "" : "text-gray-200 dark:text-gray-700";
  const markerClass = variant === "light" ? "text-white/50" : "text-gray-400 dark:text-gray-500";

  // Calculate 80 badge position
  const angle80 = 80 * 3.6; // degrees
  const rad80 = (angle80 - 90) * (Math.PI / 180);
  const badge80X = center + Math.cos(rad80) * config.badgeOffset;
  const badge80Y = center + Math.sin(rad80) * config.badgeOffset;

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

          {/* 80 marker line (behind progress) */}
          <line
            x1={center}
            y1={center - config.radius + config.strokeWidth / 2}
            x2={center}
            y2={center - config.radius - config.strokeWidth / 2 - 2}
            stroke="#10b981"
            strokeWidth="2"
            transform={`rotate(${80 * 3.6}, ${center}, ${center})`}
            className="opacity-70"
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

          {/* Milestone markers at 50, 65, 85 */}
          {[50, 65, 85].map((mark) => (
            <line
              key={mark}
              x1={center}
              y1={center - config.radius + config.strokeWidth / 2}
              x2={center}
              y2={center - config.radius + config.strokeWidth / 2 + config.markerLength}
              stroke="currentColor"
              strokeWidth="1.5"
              transform={`rotate(${mark * 3.6}, ${center}, ${center})`}
              className={markerClass}
            />
          ))}
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`${config.fontSize} font-bold`}
            style={{ color: gaugeColor }}
          >
            {score}
          </span>
          {showLabel && (
            <span className={`${config.labelSize} ${variant === "light" ? "text-white/80" : "text-[var(--muted)]"} -mt-0.5`}>
              Prime Meridian
            </span>
          )}
        </div>

        {/* 80 Badge */}
        <div
          className={`absolute flex items-center justify-center rounded-full font-bold shadow-sm ${config.badgeFont} ${
            variant === "light"
              ? "bg-emerald-400 text-white border border-white/50"
              : "bg-emerald-500 text-white border-2 border-white dark:border-gray-800"
          }`}
          style={{
            width: config.badgeSize,
            height: config.badgeSize,
            top: badge80Y - config.badgeSize / 2,
            left: badge80X - config.badgeSize / 2,
          }}
        >
          80
        </div>
      </div>
    </div>
  );
}
