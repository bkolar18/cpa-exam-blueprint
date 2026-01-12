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
 * Prime Meridian Compass Rose Display
 *
 * A stylized compass rose design that displays the Prime Meridian score.
 * Features:
 * - Decorative compass points (N, S, E, W)
 * - Inner decorative ring with tick marks
 * - Color-coded score based on milestone
 * - Optional label
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
    sm: { width: 64, height: 64, fontSize: "text-lg", labelSize: "text-[8px]" },
    md: { width: 100, height: 100, fontSize: "text-2xl", labelSize: "text-xs" },
    lg: { width: 160, height: 160, fontSize: "text-4xl", labelSize: "text-sm" },
  };

  const config = sizeConfig[size];
  const centerX = config.width / 2;
  const centerY = config.height / 2;
  const outerRadius = (config.width / 2) - 4;
  const innerRadius = outerRadius * 0.7;
  const scoreArcRadius = outerRadius * 0.85;

  // Calculate score arc
  const scorePercentage = Math.min(100, Math.max(0, score));
  const scoreAngle = (scorePercentage / 100) * 360;

  // Get gauge color based on score
  const getGaugeColor = (s: number) => {
    if (s >= 75) return "#10b981"; // emerald-500
    if (s >= 65) return "#eab308"; // yellow-500
    if (s >= 50) return "#f97316"; // orange-500
    return "#ef4444"; // red-500
  };

  const gaugeColor = getGaugeColor(score);

  // Create compass points path
  const createCompassPoint = (angle: number, length: number, width: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    const tipX = centerX + Math.cos(rad) * length;
    const tipY = centerY + Math.sin(rad) * length;
    const baseRad1 = (angle - 90 + 90) * (Math.PI / 180);
    const baseRad2 = (angle - 90 - 90) * (Math.PI / 180);
    const baseX1 = centerX + Math.cos(baseRad1) * width;
    const baseY1 = centerY + Math.sin(baseRad1) * width;
    const baseX2 = centerX + Math.cos(baseRad2) * width;
    const baseY2 = centerY + Math.sin(baseRad2) * width;
    return `M ${tipX} ${tipY} L ${baseX1} ${baseY1} L ${centerX} ${centerY} L ${baseX2} ${baseY2} Z`;
  };

  // Create arc path for score
  const createArc = (startAngle: number, endAngle: number, radius: number) => {
    const start = (startAngle - 90) * (Math.PI / 180);
    const end = (endAngle - 90) * (Math.PI / 180);
    const x1 = centerX + Math.cos(start) * radius;
    const y1 = centerY + Math.sin(start) * radius;
    const x2 = centerX + Math.cos(end) * radius;
    const y2 = centerY + Math.sin(end) * radius;
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  const compassPointLength = outerRadius * 0.95;
  const compassPointWidth = outerRadius * 0.12;
  const smallPointLength = outerRadius * 0.7;
  const smallPointWidth = outerRadius * 0.06;

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="drop-shadow-lg"
      >
        {/* Outer decorative ring */}
        <circle
          cx={centerX}
          cy={centerY}
          r={outerRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-300 dark:text-gray-600"
        />

        {/* Inner decorative ring */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-gray-200 dark:text-gray-700"
        />

        {/* Tick marks around the compass */}
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = i * 10;
          const rad = (angle - 90) * (Math.PI / 180);
          const isMajor = angle % 90 === 0;
          const isMinor = angle % 45 === 0 && !isMajor;
          const tickLength = isMajor ? 6 : isMinor ? 4 : 2;
          const outerR = outerRadius - 2;
          const innerR = outerR - tickLength;
          return (
            <line
              key={i}
              x1={centerX + Math.cos(rad) * innerR}
              y1={centerY + Math.sin(rad) * innerR}
              x2={centerX + Math.cos(rad) * outerR}
              y2={centerY + Math.sin(rad) * outerR}
              stroke="currentColor"
              strokeWidth={isMajor ? 2 : 1}
              className={isMajor ? "text-gray-400 dark:text-gray-500" : "text-gray-300 dark:text-gray-600"}
            />
          );
        })}

        {/* Score progress arc (background) */}
        <circle
          cx={centerX}
          cy={centerY}
          r={scoreArcRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-gray-200 dark:text-gray-700"
        />

        {/* Score progress arc (filled) */}
        {scoreAngle > 0 && (
          <path
            d={createArc(0, scoreAngle, scoreArcRadius)}
            fill="none"
            stroke={gaugeColor}
            strokeWidth="4"
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        )}

        {/* 75 marker */}
        {(() => {
          const markerAngle = (75 / 100) * 360;
          const rad = (markerAngle - 90) * (Math.PI / 180);
          const innerR = scoreArcRadius - 6;
          const outerR = scoreArcRadius + 6;
          return (
            <line
              x1={centerX + Math.cos(rad) * innerR}
              y1={centerY + Math.sin(rad) * innerR}
              x2={centerX + Math.cos(rad) * outerR}
              y2={centerY + Math.sin(rad) * outerR}
              stroke="#10b981"
              strokeWidth="2"
              className="opacity-60"
            />
          );
        })()}

        {/* Cardinal compass points (N, E, S, W) */}
        <path d={createCompassPoint(0, compassPointLength, compassPointWidth)} fill={gaugeColor} className="opacity-90" />
        <path d={createCompassPoint(90, compassPointLength * 0.85, compassPointWidth * 0.8)} fill="currentColor" className="text-gray-400 dark:text-gray-500" />
        <path d={createCompassPoint(180, compassPointLength * 0.85, compassPointWidth * 0.8)} fill="currentColor" className="text-gray-400 dark:text-gray-500" />
        <path d={createCompassPoint(270, compassPointLength * 0.85, compassPointWidth * 0.8)} fill="currentColor" className="text-gray-400 dark:text-gray-500" />

        {/* Intercardinal points (NE, SE, SW, NW) */}
        <path d={createCompassPoint(45, smallPointLength, smallPointWidth)} fill="currentColor" className="text-gray-300 dark:text-gray-600" />
        <path d={createCompassPoint(135, smallPointLength, smallPointWidth)} fill="currentColor" className="text-gray-300 dark:text-gray-600" />
        <path d={createCompassPoint(225, smallPointLength, smallPointWidth)} fill="currentColor" className="text-gray-300 dark:text-gray-600" />
        <path d={createCompassPoint(315, smallPointLength, smallPointWidth)} fill="currentColor" className="text-gray-300 dark:text-gray-600" />

        {/* Center circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius * 0.55}
          fill="white"
          className="dark:fill-gray-800"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius * 0.55}
          fill="none"
          stroke={gaugeColor}
          strokeWidth="2"
        />

        {/* Score text */}
        <text
          x={centerX}
          y={centerY}
          textAnchor="middle"
          dominantBaseline="central"
          className={`${config.fontSize} font-bold fill-current`}
          style={{ fill: gaugeColor }}
        >
          {score}
        </text>
      </svg>

      {/* Label */}
      {showLabel && (
        <div className={`${config.labelSize} text-[var(--muted)] mt-1 font-medium`}>
          Prime Meridian
        </div>
      )}
    </div>
  );
}
