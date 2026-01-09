"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { TBSExhibit } from "@/lib/data/tbs/types";
import ExhibitTabs from "./ExhibitTabs";
import ExhibitViewer from "./ExhibitViewer";
import ExhibitToolbar from "./ExhibitToolbar";

interface ExhibitPanelProps {
  exhibits: TBSExhibit[];
  currentExhibitId: string | null;
  onExhibitChange: (exhibitId: string) => void;
}

export default function ExhibitPanel({
  exhibits,
  currentExhibitId,
  onExhibitChange,
}: ExhibitPanelProps) {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const exhibitContentRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const currentExhibit = exhibits.find((e) => e.id === currentExhibitId) || exhibits[0];

  // Handle copy exhibit content to clipboard
  const handleCopy = useCallback(() => {
    if (!exhibitContentRef.current) return;

    const text = exhibitContentRef.current.innerText;
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy:", err);
    });
  }, []);

  // Handle print exhibit
  const handlePrint = useCallback(() => {
    if (!exhibitContentRef.current) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const exhibitContent = exhibitContentRef.current.innerHTML;
    const exhibitTitle = currentExhibit?.title || "Exhibit";

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${exhibitTitle}</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f5f5f5;
            }
            @media print {
              body { padding: 0; }
            }
          </style>
        </head>
        <body>
          <h2>${exhibitTitle}</h2>
          ${exhibitContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }, [currentExhibit]);

  // Handle fullscreen toggle
  const handleFullscreen = useCallback(() => {
    if (!panelRef.current) return;

    if (!isFullscreen) {
      panelRef.current.requestFullscreen?.().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen?.().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error("Exit fullscreen error:", err);
      });
    }
  }, [isFullscreen]);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  if (exhibits.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No exhibits available</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={panelRef}
      className={`h-full flex flex-col ${isFullscreen ? "bg-white dark:bg-gray-900" : ""}`}
    >
      {/* Tabs */}
      <ExhibitTabs
        exhibits={exhibits}
        currentExhibitId={currentExhibitId || exhibits[0]?.id}
        onExhibitChange={onExhibitChange}
      />

      {/* Toolbar */}
      <ExhibitToolbar
        exhibitTitle={currentExhibit?.title || "Exhibit"}
        onCopy={handleCopy}
        onPrint={handlePrint}
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
        onFullscreen={handleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Exhibit Content */}
      <div className="flex-1 overflow-auto">
        <div
          ref={exhibitContentRef}
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: "top left",
            width: `${10000 / zoomLevel}%`,
          }}
        >
          {currentExhibit && (
            <ExhibitViewer exhibit={currentExhibit} />
          )}
        </div>
      </div>
    </div>
  );
}
