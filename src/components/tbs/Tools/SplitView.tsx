"use client";

import { useState, useCallback, useRef, useEffect, ReactNode } from "react";

interface SplitViewProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  defaultLeftWidth?: number; // Percentage
  minLeftWidth?: number; // Percentage
  maxLeftWidth?: number; // Percentage
  leftPanelLabel?: string;
  rightPanelLabel?: string;
}

export default function SplitView({
  leftPanel,
  rightPanel,
  defaultLeftWidth = 45,
  minLeftWidth = 20,
  maxLeftWidth = 80,
  leftPanelLabel = "Exhibits",
  rightPanelLabel = "Work Area",
}: SplitViewProps) {
  const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
  const [isDragging, setIsDragging] = useState(false);
  const [activePanel, setActivePanel] = useState<"left" | "right">("right"); // Mobile: default to work area
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse down on divider
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // Handle touch start on divider
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // Handle double-click to reset
  const handleDoubleClick = useCallback(() => {
    setLeftWidth(defaultLeftWidth);
  }, [defaultLeftWidth]);

  // Handle mouse/touch move and end
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const newLeftWidth = ((clientX - containerRect.left) / containerRect.width) * 100;

      // Clamp to min/max
      const clampedWidth = Math.max(minLeftWidth, Math.min(maxLeftWidth, newLeftWidth));
      setLeftWidth(clampedWidth);
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isDragging, minLeftWidth, maxLeftWidth]);

  // Prevent text selection while dragging
  useEffect(() => {
    if (isDragging) {
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";
    } else {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    }

    return () => {
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [isDragging]);

  return (
    <>
      {/* Mobile Tab Navigation */}
      <div className="md:hidden flex border-b border-gray-200 dark:border-[var(--border)] bg-white dark:bg-[var(--card)]">
        <button
          onClick={() => setActivePanel("left")}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
            activePanel === "left"
              ? "text-[var(--primary)] border-b-2 border-[var(--primary)] bg-[var(--primary)]/5"
              : "text-gray-600 dark:text-[var(--muted)] hover:bg-gray-50 dark:hover:bg-[var(--card-hover)]"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {leftPanelLabel}
          </div>
        </button>
        <button
          onClick={() => setActivePanel("right")}
          className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
            activePanel === "right"
              ? "text-[var(--primary)] border-b-2 border-[var(--primary)] bg-[var(--primary)]/5"
              : "text-gray-600 dark:text-[var(--muted)] hover:bg-gray-50 dark:hover:bg-[var(--card-hover)]"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            {rightPanelLabel}
          </div>
        </button>
      </div>

      {/* Mobile Panel Content */}
      <div className="md:hidden flex-1 overflow-auto">
        {activePanel === "left" ? (
          <div className="h-full bg-white dark:bg-[var(--card)]">
            {leftPanel}
          </div>
        ) : (
          <div className="h-full bg-gray-50 dark:bg-[var(--background)]">
            {rightPanel}
          </div>
        )}
      </div>

      {/* Desktop Split View */}
      <div
        ref={containerRef}
        className="hidden md:flex flex-1 overflow-hidden"
      >
        {/* Left Panel */}
        <div
          className="overflow-auto bg-white dark:bg-[var(--card)] border-r border-gray-200"
          style={{ width: `${leftWidth}%` }}
        >
          {leftPanel}
        </div>

        {/* Resizable Divider */}
        <div
          className={`w-1.5 flex-shrink-0 cursor-col-resize flex items-center justify-center group transition-colors touch-none ${
            isDragging
              ? "bg-[var(--primary)]"
              : "bg-gray-200 dark:bg-[var(--card-hover)] hover:bg-[var(--primary)]/50"
          }`}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onDoubleClick={handleDoubleClick}
          title="Drag to resize. Double-click to reset."
        >
          {/* Visual indicator */}
          <div className="flex flex-col space-y-1">
            <div className={`w-1 h-1 rounded-full ${
              isDragging ? "bg-white" : "bg-gray-400 dark:bg-gray-500 group-hover:bg-white"
            }`} />
            <div className={`w-1 h-1 rounded-full ${
              isDragging ? "bg-white" : "bg-gray-400 dark:bg-gray-500 group-hover:bg-white"
            }`} />
            <div className={`w-1 h-1 rounded-full ${
              isDragging ? "bg-white" : "bg-gray-400 dark:bg-gray-500 group-hover:bg-white"
            }`} />
          </div>
        </div>

        {/* Right Panel */}
        <div className="overflow-auto bg-gray-50 dark:bg-[var(--background)] flex-1">
          {rightPanel}
        </div>
      </div>
    </>
  );
}
