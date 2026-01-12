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
 * A stylized compass rose matching the Meridian logo design.
 * Features:
 * - 8-pointed star (4 cardinal + 4 intercardinal)
 * - Concentric rings with tick marks
 * - Percentage labels (N=0%, E=25%, S=50%, W=75%)
 * - Clock-hand needle pointing to current score
 * - Color-coded needle based on milestone
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
      width: 72,
      height: 72,
      fontSize: 14,
      labelSize: "text-[7px]",
      percentSize: 6,
      showPercents: false,
    },
    md: {
      width: 110,
      height: 110,
      fontSize: 20,
      labelSize: "text-xs",
      percentSize: 8,
      showPercents: true,
    },
    lg: {
      width: 160,
      height: 160,
      fontSize: 28,
      labelSize: "text-sm",
      percentSize: 10,
      showPercents: true,
    },
  };

  const config = sizeConfig[size];
  const centerX = config.width / 2;
  const centerY = config.height / 2;
  const outerRadius = (config.width / 2) - 8;
  const innerRingRadius = outerRadius * 0.75;
  const starOuterRadius = outerRadius * 0.65;
  const starInnerRadius = outerRadius * 0.25;

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

  // Primary brand color (navy blue)
  const primaryColor = "#1e3a5f";
  const starColor = "#c4a052"; // Warm gold/amber like the logo
  const ringColor = "#374151"; // gray-700

  // Create 8-pointed star path
  const createStarPath = () => {
    const points: string[] = [];
    for (let i = 0; i < 16; i++) {
      const angle = (i * 22.5 - 90) * (Math.PI / 180);
      const radius = i % 2 === 0 ? starOuterRadius : starInnerRadius;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      points.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
    }
    return points.join(' ') + ' Z';
  };

  // Create needle path (clock hand style)
  const createNeedlePath = () => {
    const needleLength = outerRadius * 0.55;
    const needleWidth = size === 'sm' ? 3 : size === 'md' ? 4 : 5;
    const tailLength = outerRadius * 0.15;

    const rad = (needleAngle - 90) * (Math.PI / 180);
    const tipX = centerX + Math.cos(rad) * needleLength;
    const tipY = centerY + Math.sin(rad) * needleLength;

    // Tail (opposite direction)
    const tailRad = (needleAngle + 90) * (Math.PI / 180);
    const tailX = centerX + Math.cos(tailRad) * tailLength;
    const tailY = centerY + Math.sin(tailRad) * tailLength;

    // Side points for arrow shape
    const perpRad1 = (needleAngle) * (Math.PI / 180);
    const perpRad2 = (needleAngle + 180) * (Math.PI / 180);
    const sideX1 = centerX + Math.cos(perpRad1) * needleWidth;
    const sideY1 = centerY + Math.sin(perpRad1) * needleWidth;
    const sideX2 = centerX + Math.cos(perpRad2) * needleWidth;
    const sideY2 = centerY + Math.sin(perpRad2) * needleWidth;

    return `M ${tipX} ${tipY} L ${sideX1} ${sideY1} L ${tailX} ${tailY} L ${sideX2} ${sideY2} Z`;
  };

  // Percentage positions (N=0%, E=25%, S=50%, W=75%)
  const percentLabels = [
    { angle: 0, label: "0%", pos: "top" },
    { angle: 90, label: "25%", pos: "right" },
    { angle: 180, label: "50%", pos: "bottom" },
    { angle: 270, label: "75%", pos: "left" },
  ];

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      <svg
        width={config.width}
        height={config.height}
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="drop-shadow-md"
      >
        {/* Outer ring */}
        <circle
          cx={centerX}
          cy={centerY}
          r={outerRadius}
          fill="none"
          stroke={ringColor}
          strokeWidth="1.5"
          className="dark:stroke-gray-500"
        />

        {/* Inner ring */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRingRadius}
          fill="none"
          stroke={ringColor}
          strokeWidth="1"
          className="dark:stroke-gray-600"
        />

        {/* Tick marks between rings */}
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = i * 7.5;
          const rad = (angle - 90) * (Math.PI / 180);
          const isMajor = angle % 90 === 0; // Cardinal directions
          const isMinor = angle % 45 === 0 && !isMajor; // Intercardinal
          const outerR = outerRadius - 1;
          const innerR = innerRingRadius + 1;

          if (isMajor || isMinor) {
            return (
              <line
                key={i}
                x1={centerX + Math.cos(rad) * innerR}
                y1={centerY + Math.sin(rad) * innerR}
                x2={centerX + Math.cos(rad) * outerR}
                y2={centerY + Math.sin(rad) * outerR}
                stroke={ringColor}
                strokeWidth={isMajor ? 2 : 1}
                className="dark:stroke-gray-500"
              />
            );
          }

          // Small tick marks
          const tickInnerR = outerRadius - 4;
          return (
            <line
              key={i}
              x1={centerX + Math.cos(rad) * tickInnerR}
              y1={centerY + Math.sin(rad) * tickInnerR}
              x2={centerX + Math.cos(rad) * outerR}
              y2={centerY + Math.sin(rad) * outerR}
              stroke={ringColor}
              strokeWidth="0.5"
              className="dark:stroke-gray-600 opacity-60"
            />
          );
        })}

        {/* 8-pointed star */}
        <path
          d={createStarPath()}
          fill={starColor}
          stroke={primaryColor}
          strokeWidth="0.5"
          className="dark:stroke-gray-600"
        />

        {/* Star inner detail - lighter center */}
        <circle
          cx={centerX}
          cy={centerY}
          r={starInnerRadius * 0.7}
          fill={`${starColor}aa`}
        />

        {/* Percentage labels at cardinal positions */}
        {config.showPercents && percentLabels.map(({ angle, label }) => {
          const rad = (angle - 90) * (Math.PI / 180);
          const labelRadius = outerRadius + (size === 'lg' ? 14 : 10);
          const x = centerX + Math.cos(rad) * labelRadius;
          const y = centerY + Math.sin(rad) * labelRadius;

          return (
            <text
              key={angle}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={config.percentSize}
              fontWeight="600"
              className="fill-gray-500 dark:fill-gray-400"
            >
              {label}
            </text>
          );
        })}

        {/* Needle (clock hand) */}
        <path
          d={createNeedlePath()}
          fill={needleColor}
          stroke={primaryColor}
          strokeWidth="0.5"
          className="transition-all duration-700 ease-out dark:stroke-gray-700"
          style={{
            filter: `drop-shadow(0 1px 2px ${needleColor}40)`,
          }}
        />

        {/* Center hub */}
        <circle
          cx={centerX}
          cy={centerY}
          r={size === 'sm' ? 4 : size === 'md' ? 6 : 8}
          fill={primaryColor}
          className="dark:fill-gray-700"
        />
        <circle
          cx={centerX}
          cy={centerY}
          r={size === 'sm' ? 2 : size === 'md' ? 3 : 4}
          fill={needleColor}
        />
      </svg>

      {/* Score display below */}
      <div className="flex flex-col items-center mt-1">
        <div
          className={`font-bold tabular-nums ${
            size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl'
          }`}
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
