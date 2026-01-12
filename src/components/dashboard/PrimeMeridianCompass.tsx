"use client";

import { useMemo } from "react";
import { getPrimeMeridianMilestone } from "@/lib/scoring/prime-meridian";
import Image from "next/image";

interface PrimeMeridianCompassProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

/**
 * Prime Meridian Compass Rose Display
 *
 * Uses the official Meridian compass rose logo with a dynamic needle overlay.
 * Features:
 * - Official compass rose SVG as background
 * - Dynamic clock-hand needle pointing to current score percentage
 * - Color-coded needle based on score milestone
 * - Score display below compass
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
      width: 64,
      height: 64,
      labelSize: "text-[8px]",
      scoreSize: "text-base",
      needleLength: 22,
      needleWidth: 2.5,
      hubSize: 4,
      innerHub: 2,
    },
    md: {
      width: 100,
      height: 100,
      labelSize: "text-xs",
      scoreSize: "text-lg",
      needleLength: 36,
      needleWidth: 3.5,
      hubSize: 6,
      innerHub: 3,
    },
    lg: {
      width: 140,
      height: 140,
      labelSize: "text-sm",
      scoreSize: "text-xl",
      needleLength: 50,
      needleWidth: 4.5,
      hubSize: 8,
      innerHub: 4,
    },
  };

  const config = sizeConfig[size];
  const centerX = config.width / 2;
  const centerY = config.height / 2;

  // Score to angle: 0% = top (0°), 25% = right (90°), 50% = bottom (180°), 75% = left (270°)
  const scorePercentage = Math.min(100, Math.max(0, score));
  const needleAngle = (scorePercentage / 100) * 360;

  // Get needle color based on score
  const getNeedleColor = (s: number) => {
    if (s >= 75) return "#10b981"; // emerald-500
    if (s >= 60) return "#84cc16"; // lime-500
    if (s >= 40) return "#eab308"; // yellow-500
    if (s >= 20) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  const needleColor = getNeedleColor(score);

  // Create needle path (clock hand style - diamond shape)
  const createNeedlePath = () => {
    const needleLength = config.needleLength;
    const needleWidth = config.needleWidth;
    const tailLength = needleLength * 0.25;

    const rad = (needleAngle - 90) * (Math.PI / 180);
    const tipX = centerX + Math.cos(rad) * needleLength;
    const tipY = centerY + Math.sin(rad) * needleLength;

    // Tail (opposite direction)
    const tailRad = (needleAngle + 90) * (Math.PI / 180);
    const tailX = centerX + Math.cos(tailRad) * tailLength;
    const tailY = centerY + Math.sin(tailRad) * tailLength;

    // Side points for diamond shape
    const perpRad1 = needleAngle * (Math.PI / 180);
    const perpRad2 = (needleAngle + 180) * (Math.PI / 180);
    const sideX1 = centerX + Math.cos(perpRad1) * needleWidth;
    const sideY1 = centerY + Math.sin(perpRad1) * needleWidth;
    const sideX2 = centerX + Math.cos(perpRad2) * needleWidth;
    const sideY2 = centerY + Math.sin(perpRad2) * needleWidth;

    return `M ${tipX} ${tipY} L ${sideX1} ${sideY1} L ${tailX} ${tailY} L ${sideX2} ${sideY2} Z`;
  };

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {/* Compass container */}
      <div
        className="relative"
        style={{ width: config.width, height: config.height }}
      >
        {/* Compass rose background image */}
        <Image
          src="/compass-rose.svg"
          alt="Compass Rose"
          width={config.width}
          height={config.height}
          className="absolute inset-0"
          priority
        />

        {/* Dynamic needle overlay */}
        <svg
          width={config.width}
          height={config.height}
          viewBox={`0 0 ${config.width} ${config.height}`}
          className="absolute inset-0"
          style={{ zIndex: 10 }}
        >
          {/* Needle shadow for depth */}
          <path
            d={createNeedlePath()}
            fill="rgba(0,0,0,0.2)"
            transform="translate(1, 1)"
            className="transition-all duration-700 ease-out"
          />

          {/* Main needle */}
          <path
            d={createNeedlePath()}
            fill={needleColor}
            stroke="#1e3a5f"
            strokeWidth="0.5"
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 1px 2px ${needleColor}50)`,
            }}
          />

          {/* Center hub - outer ring */}
          <circle
            cx={centerX}
            cy={centerY}
            r={config.hubSize}
            fill="#1e3a5f"
          />

          {/* Center hub - inner colored dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r={config.innerHub}
            fill={needleColor}
          />
        </svg>
      </div>

      {/* Score and label below */}
      <div className="flex flex-col items-center mt-1">
        <div
          className={`font-bold tabular-nums ${config.scoreSize}`}
          style={{ color: needleColor }}
        >
          {score}
        </div>
        {showLabel && (
          <div className={`${config.labelSize} text-[var(--muted)] font-medium -mt-0.5`}>
            Prime Meridian
          </div>
        )}
      </div>
    </div>
  );
}
