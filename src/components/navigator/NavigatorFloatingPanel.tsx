"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import NavigatorChat from "./NavigatorChat";
import type { NavigatorQuestionContext } from "@/hooks/useNavigatorContext";
import type { SectionCode } from "@/lib/supabase/types";

type ResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null;

interface NavigatorFloatingPanelProps {
  /** Whether the panel is open */
  isOpen: boolean;
  /** Called when panel is closed */
  onClose: () => void;
  /** Current section */
  section: SectionCode;
  /** Current topic */
  topic?: string;
  /** Question context */
  questionContext?: NavigatorQuestionContext | null;
  /** Mode: practice (hints) or review (full explanations) */
  mode: "practice" | "review";
  /** Initial welcome message */
  initialMessage?: string;
}

/**
 * Floating Panel for the Meridian Navigator
 *
 * A draggable, resizable panel that contains the Navigator chat.
 * Used in TBS simulations and other contexts where floating is preferred.
 *
 * Features:
 * - Drag to reposition
 * - Resize from any edge or corner
 * - Minimize to title bar
 * - Remembers position within session
 */
export default function NavigatorFloatingPanel({
  isOpen,
  onClose,
  section,
  topic,
  questionContext,
  mode,
  initialMessage,
}: NavigatorFloatingPanelProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState({ width: 380, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [resizeEdge, setResizeEdge] = useState<ResizeEdge>(null);
  const [isMinimized, setIsMinimized] = useState(false);

  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
  });
  const panelRef = useRef<HTMLDivElement>(null);

  // Initialize position to right side of viewport when first opened
  useEffect(() => {
    if (isOpen && position === null) {
      const x = Math.max(20, window.innerWidth - size.width - 40);
      const y = Math.max(80, (window.innerHeight - size.height) / 2);
      setPosition({ x, y });
    }
  }, [isOpen, position, size.width, size.height]);

  // Handle dragging
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Don't drag if clicking buttons, inputs, or resize edges
      if ((e.target as HTMLElement).closest("button")) return;
      if ((e.target as HTMLElement).closest("textarea")) return;
      if ((e.target as HTMLElement).closest("input")) return;
      if ((e.target as HTMLElement).closest(".resize-edge")) return;
      if (!position) return;

      setIsDragging(true);
      dragOffset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position]
  );

  // Handle resize start
  const handleResizeStart = useCallback(
    (e: React.MouseEvent, edge: ResizeEdge) => {
      e.preventDefault();
      e.stopPropagation();
      if (!position) return;

      setResizeEdge(edge);
      resizeStart.current = {
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
        posX: position.x,
        posY: position.y,
      };
    },
    [size, position]
  );

  // Handle mouse move for dragging and resizing
  useEffect(() => {
    if (!isDragging && !resizeEdge) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && position) {
        const maxX = window.innerWidth - size.width - 20;
        const maxY = window.innerHeight - (isMinimized ? 50 : size.height) - 20;
        setPosition({
          x: Math.min(maxX, Math.max(20, e.clientX - dragOffset.current.x)),
          y: Math.min(maxY, Math.max(20, e.clientY - dragOffset.current.y)),
        });
      }

      if (resizeEdge) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;
        const minWidth = 320;
        const minHeight = 350;
        const maxWidth = window.innerWidth - 40;
        const maxHeight = window.innerHeight - 60;

        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newX = resizeStart.current.posX;
        let newY = resizeStart.current.posY;

        if (resizeEdge.includes("e")) {
          newWidth = Math.min(
            maxWidth,
            Math.max(minWidth, resizeStart.current.width + deltaX)
          );
        }
        if (resizeEdge.includes("w")) {
          const potentialWidth = resizeStart.current.width - deltaX;
          if (potentialWidth >= minWidth && potentialWidth <= maxWidth) {
            newWidth = potentialWidth;
            newX = resizeStart.current.posX + deltaX;
          }
        }
        if (resizeEdge.includes("s")) {
          newHeight = Math.min(
            maxHeight,
            Math.max(minHeight, resizeStart.current.height + deltaY)
          );
        }
        if (resizeEdge.includes("n")) {
          const potentialHeight = resizeStart.current.height - deltaY;
          if (potentialHeight >= minHeight && potentialHeight <= maxHeight) {
            newHeight = potentialHeight;
            newY = resizeStart.current.posY + deltaY;
          }
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setResizeEdge(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, resizeEdge, size.width, size.height, position, isMinimized]);

  if (!isOpen || !position) return null;

  return (
    <div
      ref={panelRef}
      className="fixed z-50 flex flex-col"
      style={{
        left: position.x,
        top: position.y,
        width: isMinimized ? 320 : size.width,
        height: isMinimized ? "auto" : size.height,
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      {/* Resize edges (only when not minimized) */}
      {!isMinimized && (
        <>
          <div
            className="resize-edge absolute top-0 left-3 right-3 h-1 cursor-ns-resize hover:bg-blue-400/50 z-10"
            onMouseDown={(e) => handleResizeStart(e, "n")}
          />
          <div
            className="resize-edge absolute bottom-0 left-3 right-3 h-1 cursor-ns-resize hover:bg-blue-400/50 z-10"
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />
          <div
            className="resize-edge absolute left-0 top-3 bottom-3 w-1 cursor-ew-resize hover:bg-blue-400/50 z-10"
            onMouseDown={(e) => handleResizeStart(e, "w")}
          />
          <div
            className="resize-edge absolute right-0 top-3 bottom-3 w-1 cursor-ew-resize hover:bg-blue-400/50 z-10"
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />
          <div
            className="resize-edge absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-10"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="resize-edge absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-10"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="resize-edge absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-10"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          />
          <div
            className="resize-edge absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-10"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />
        </>
      )}

      {/* Minimized header bar */}
      {isMinimized ? (
        <div
          className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-2xl cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <span className="text-sm font-medium text-white">
              Meridian Navigator
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(false)}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Expand"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
              title="Close"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        /* Full chat panel */
        <div className="flex flex-col h-full bg-white dark:bg-[var(--card)] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Custom draggable header */}
          <div
            className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Meridian Navigator
                </h3>
                <p className="text-xs text-white/80">
                  {mode === "practice" ? "Hint Mode" : "Review Mode"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Minimize button */}
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                title="Minimize"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>
              {/* Close button */}
              <button
                onClick={onClose}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                title="Close"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Chat content (without duplicate header) */}
          <div className="flex-1 overflow-hidden">
            <NavigatorChat
              section={section}
              topic={topic}
              questionContext={questionContext}
              mode={mode}
              isOpen={true}
              variant="inline"
              initialMessage={initialMessage}
              className="h-full border-0 rounded-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
