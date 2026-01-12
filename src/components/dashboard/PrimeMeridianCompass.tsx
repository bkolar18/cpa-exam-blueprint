"use client";

import { useMemo } from "react";
import { getPrimeMeridianMilestone } from "@/lib/scoring/prime-meridian";

interface PrimeMeridianCompassProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

/**
 * Prime Meridian Compass Display
 *
 * Circular gauge design matching the section Prime Meridian scores
 * with a subtle 4-point star background for branding.
 */
export default function PrimeMeridianCompass({
  score,
  size = "md",
  showLabel = true,
  className = "",
}: PrimeMeridianCompassProps) {
  const milestone = useMemo(() => getPrimeMeridianMilestone(score), [score]);

  // Size configurations
  const sizeConfig = {
    sm: {
      svgSize: 72,
      radius: 28,
      strokeWidth: 5,
      fontSize: "text-lg",
      labelSize: "text-[8px]",
      starSize: 0.4, // relative to svgSize
    },
    md: {
      svgSize: 100,
      radius: 40,
      strokeWidth: 6,
      fontSize: "text-2xl",
      labelSize: "text-xs",
      starSize: 0.45,
    },
    lg: {
      svgSize: 130,
      radius: 52,
      strokeWidth: 8,
      fontSize: "text-3xl",
      labelSize: "text-sm",
      starSize: 0.5,
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

  // Create 4-point star path
  const createStarPath = () => {
    const starRadius = config.svgSize * config.starSize;
    const innerRadius = starRadius * 0.15; // Very thin star
    const points: string[] = [];

    // 4 points: top, right, bottom, left
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45 - 90) * (Math.PI / 180);
      const radius = i % 2 === 0 ? starRadius : innerRadius;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ') + ' Z';
  };

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <svg
        width={config.svgSize}
        height={config.svgSize}
        className="transform -rotate-90"
      >
        {/* 4-point star background - very subtle */}
        <path
          d={createStarPath()}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gray-200 dark:text-gray-700 opacity-60"
          transform={`rotate(90, ${center}, ${center})`}
        />

        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={config.radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={config.strokeWidth}
          className="text-gray-200 dark:text-gray-700"
        />

        {/* 75 marker (recommended score) */}
        <line
          x1={center}
          y1={center - config.radius + config.strokeWidth / 2 - 2}
          x2={center}
          y2={center - config.radius - config.strokeWidth / 2 - 4}
          stroke="#10b981"
          strokeWidth="2"
          transform={`rotate(${75 * 3.6}, ${center}, ${center})`}
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
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center content - positioned absolutely */}
      <div
        className="absolute flex flex-col items-center justify-center"
        style={{
          top: 0,
          left: 0,
          width: config.svgSize,
          height: config.svgSize,
        }}
      >
        <div className={`${config.fontSize} font-bold`} style={{ color: gaugeColor }}>
          {score}
        </div>
        {showLabel && (
          <div className={`${config.labelSize} text-[var(--muted)] -mt-0.5`}>
            Prime Meridian
          </div>
        )}
      </div>
    </div>
  );
}
