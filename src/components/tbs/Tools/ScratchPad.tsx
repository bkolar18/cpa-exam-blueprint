"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useAuthOptional } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";

interface ScratchPadProps {
  isOpen: boolean;
  onClose: () => void;
  initialNotes?: string;
  onNotesChange?: (notes: string) => void;
  // TBS context for saving notes
  tbsId?: string;
  tbsTitle?: string;
  tbsSection?: string;
  tbsTopic?: string;
  tbsSubtopic?: string | null;
}

type ResizeEdge = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw" | null;

export default function ScratchPad({
  isOpen,
  onClose,
  initialNotes = "",
  onNotesChange,
  tbsId,
  tbsTitle,
  tbsSection,
  tbsTopic,
  tbsSubtopic,
}: ScratchPadProps) {
  const { user } = useAuthOptional();
  const supabase = createClient();
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [size, setSize] = useState({ width: 400, height: 350 });
  const [isDragging, setIsDragging] = useState(false);
  const [resizeEdge, setResizeEdge] = useState<ResizeEdge>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [note, setNote] = useState(initialNotes);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Save note to database
  const handleSaveNote = useCallback(async () => {
    if (!user || !supabase || !note.trim()) return;

    setIsSaving(true);
    try {
      const questionId = tbsId ? `tbs_${tbsId}` : `tbs_scratch_${Date.now()}`;
      const notePrefix = tbsTitle ? `[Simulation: ${tbsTitle}]\n\n` : '[Scratch Pad Note]\n\n';

      await supabase
        .from('question_notes')
        .upsert({
          user_id: user.id,
          question_id: questionId,
          section: tbsSection || 'FAR',
          topic: tbsTopic || 'General',
          subtopic: tbsSubtopic || null,
          note: `${notePrefix}${note.trim()}`,
          is_starred: false,
          confidence: null,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id,question_id'
        });

      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setIsSaving(false);
    }
  }, [user, supabase, tbsId, tbsTitle, tbsSection, tbsTopic, tbsSubtopic, note]);

  // Initialize position to center of viewport when first opened
  useEffect(() => {
    if (isOpen && position === null) {
      const x = Math.max(20, (window.innerWidth - size.width) / 2);
      const y = Math.max(20, (window.innerHeight - size.height) / 2);
      setPosition({ x, y });
    }
  }, [isOpen, position, size.width, size.height]);

  // Sync note with initialNotes when it changes
  useEffect(() => {
    if (initialNotes !== note) {
      setNote(initialNotes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialNotes]);

  // Handle note change
  const handleNoteChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setNote(newValue);
    onNotesChange?.(newValue);
  }, [onNotesChange]);

  // Handle dragging
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    if ((e.target as HTMLElement).closest("textarea")) return;
    if ((e.target as HTMLElement).closest(".resize-edge")) return;
    if (!position) return;
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  }, [position]);

  // Handle resize start for any edge
  const handleResizeStart = useCallback((e: React.MouseEvent, edge: ResizeEdge) => {
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
  }, [size, position]);

  useEffect(() => {
    if (!isDragging && !resizeEdge) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && position) {
        const maxX = window.innerWidth - size.width - 20;
        const maxY = window.innerHeight - size.height - 20;
        setPosition({
          x: Math.min(maxX, Math.max(20, e.clientX - dragOffset.current.x)),
          y: Math.min(maxY, Math.max(20, e.clientY - dragOffset.current.y)),
        });
      }
      if (resizeEdge) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;
        const minWidth = 280;
        const minHeight = 200;
        const maxWidth = window.innerWidth - 40;
        const maxHeight = window.innerHeight - 40;

        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newX = resizeStart.current.posX;
        let newY = resizeStart.current.posY;

        if (resizeEdge.includes("e")) {
          newWidth = Math.min(maxWidth, Math.max(minWidth, resizeStart.current.width + deltaX));
        }
        if (resizeEdge.includes("w")) {
          const potentialWidth = resizeStart.current.width - deltaX;
          if (potentialWidth >= minWidth && potentialWidth <= maxWidth) {
            newWidth = potentialWidth;
            newX = resizeStart.current.posX + deltaX;
          }
        }
        if (resizeEdge.includes("s")) {
          newHeight = Math.min(maxHeight, Math.max(minHeight, resizeStart.current.height + deltaY));
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
  }, [isDragging, resizeEdge, size.width, size.height, position]);

  // Clear notes
  const handleClear = useCallback(() => {
    if (note.trim() && !confirm("Clear all notes?")) return;
    setNote("");
    onNotesChange?.("");
  }, [note, onNotesChange]);

  if (!isOpen || !position) return null;

  return (
    <div
      ref={panelRef}
      className="fixed z-40 bg-white dark:bg-[var(--card)] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col"
      style={{
        left: position.x,
        top: position.y,
        width: isMinimized ? 280 : size.width,
        height: isMinimized ? "auto" : size.height,
        maxHeight: "calc(100vh - 40px)",
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      {/* Resize edges */}
      {!isMinimized && (
        <>
          <div
            className="resize-edge absolute top-0 left-2 right-2 h-1 cursor-ns-resize hover:bg-yellow-400/50"
            onMouseDown={(e) => handleResizeStart(e, "n")}
          />
          <div
            className="resize-edge absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize hover:bg-yellow-400/50"
            onMouseDown={(e) => handleResizeStart(e, "s")}
          />
          <div
            className="resize-edge absolute left-0 top-2 bottom-2 w-1 cursor-ew-resize hover:bg-yellow-400/50"
            onMouseDown={(e) => handleResizeStart(e, "w")}
          />
          <div
            className="resize-edge absolute right-0 top-2 bottom-2 w-1 cursor-ew-resize hover:bg-yellow-400/50"
            onMouseDown={(e) => handleResizeStart(e, "e")}
          />
          <div
            className="resize-edge absolute top-0 left-0 w-3 h-3 cursor-nwse-resize"
            onMouseDown={(e) => handleResizeStart(e, "nw")}
          />
          <div
            className="resize-edge absolute top-0 right-0 w-3 h-3 cursor-nesw-resize"
            onMouseDown={(e) => handleResizeStart(e, "ne")}
          />
          <div
            className="resize-edge absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize"
            onMouseDown={(e) => handleResizeStart(e, "sw")}
          />
          <div
            className="resize-edge absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
            onMouseDown={(e) => handleResizeStart(e, "se")}
          />
        </>
      )}

      {/* Header - Draggable */}
      <div
        className="flex items-center justify-between px-3 py-2 bg-yellow-50 dark:bg-yellow-900/30 border-b border-yellow-200 dark:border-yellow-800 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 text-yellow-600 dark:text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            Scratch Paper
          </span>
        </div>
        <div className="flex items-center gap-1">
          {/* Minimize/Maximize */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 rounded"
            title={isMinimized ? "Expand" : "Minimize"}
          >
            {isMinimized ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4"/>
              </svg>
            )}
          </button>
          {/* Close */}
          <button
            onClick={onClose}
            className="p-1 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 rounded"
            title="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <>
          {/* Simple textarea like MCQ notes */}
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Type your notes here (calculations, reminders, formulas)..."
            className="flex-1 p-3 text-sm border-0 bg-yellow-50/50 dark:bg-[var(--background)] text-gray-800 dark:text-[var(--foreground)] placeholder-gray-400 focus:ring-0 focus:outline-none resize-none"
            style={{ minHeight: 100 }}
          />

          {/* Footer with actions */}
          <div className="px-3 py-2 bg-gray-50 dark:bg-[var(--background)] border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <button
                    onClick={handleSaveNote}
                    disabled={isSaving || !note.trim()}
                    className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                    </svg>
                    {isSaving ? 'Saving...' : 'Save to My Notes'}
                  </button>
                  {lastSaved && (
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Saved!
                    </span>
                  )}
                </>
              ) : (
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  Sign in to save notes
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleClear}
                disabled={!note.trim()}
                className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500"
                title="Clear all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
              <span className="text-xs text-gray-400 dark:text-[var(--muted)]">
                Drag to move
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
