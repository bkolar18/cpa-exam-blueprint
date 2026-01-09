"use client";

import { useState, useCallback } from "react";

interface ExhibitToolbarProps {
  exhibitTitle: string;
  onPrint?: () => void;
  onCopy?: () => void;
  zoomLevel: number;
  onZoomChange: (level: number) => void;
  onFullscreen?: () => void;
  isFullscreen?: boolean;
}

const ZOOM_LEVELS = [75, 90, 100, 110, 125, 150];

export default function ExhibitToolbar({
  exhibitTitle,
  onPrint,
  onCopy,
  zoomLevel,
  onZoomChange,
  onFullscreen,
  isFullscreen,
}: ExhibitToolbarProps) {
  const [showCopiedToast, setShowCopiedToast] = useState(false);

  const handleCopy = useCallback(() => {
    onCopy?.();
    setShowCopiedToast(true);
    setTimeout(() => setShowCopiedToast(false), 2000);
  }, [onCopy]);

  const handleZoomIn = useCallback(() => {
    const currentIndex = ZOOM_LEVELS.indexOf(zoomLevel);
    if (currentIndex < ZOOM_LEVELS.length - 1) {
      onZoomChange(ZOOM_LEVELS[currentIndex + 1]);
    }
  }, [zoomLevel, onZoomChange]);

  const handleZoomOut = useCallback(() => {
    const currentIndex = ZOOM_LEVELS.indexOf(zoomLevel);
    if (currentIndex > 0) {
      onZoomChange(ZOOM_LEVELS[currentIndex - 1]);
    }
  }, [zoomLevel, onZoomChange]);

  const handleResetZoom = useCallback(() => {
    onZoomChange(100);
  }, [onZoomChange]);

  return (
    <div className="flex items-center justify-between px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Left: Exhibit title */}
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
        {exhibitTitle}
      </span>

      {/* Right: Tools */}
      <div className="flex items-center space-x-1">
        {/* Zoom Controls */}
        <div className="flex items-center bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
          <button
            onClick={handleZoomOut}
            disabled={zoomLevel <= ZOOM_LEVELS[0]}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-l transition-colors"
            title="Zoom out"
          >
            <svg className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>

          <button
            onClick={handleResetZoom}
            className="px-1.5 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors min-w-[40px]"
            title="Reset zoom to 100%"
          >
            {zoomLevel}%
          </button>

          <button
            onClick={handleZoomIn}
            disabled={zoomLevel >= ZOOM_LEVELS[ZOOM_LEVELS.length - 1]}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed rounded-r transition-colors"
            title="Zoom in"
          >
            <svg className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 mx-0.5" />

        {/* Copy Button */}
        <div className="relative">
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title="Copy exhibit content"
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>

          {/* Copied Toast */}
          {showCopiedToast && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 text-xs rounded shadow-lg whitespace-nowrap z-10">
              Copied!
            </div>
          )}
        </div>

        {/* Print Button */}
        {onPrint && (
          <button
            onClick={onPrint}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title="Print exhibit"
          >
            <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </button>
        )}

        {/* Fullscreen Button */}
        {onFullscreen && (
          <button
            onClick={onFullscreen}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            title={isFullscreen ? "Exit fullscreen" : "View fullscreen"}
          >
            {isFullscreen ? (
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
