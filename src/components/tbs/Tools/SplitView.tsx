"use client";

import { useState, useCallback, useRef, useEffect, ReactNode } from"react";

interface SplitViewProps {
 leftPanel: ReactNode;
 rightPanel: ReactNode;
 defaultLeftWidth?: number; // Percentage
 minLeftWidth?: number; // Percentage
 maxLeftWidth?: number; // Percentage
}

export default function SplitView({
 leftPanel,
 rightPanel,
 defaultLeftWidth = 45,
 minLeftWidth = 20,
 maxLeftWidth = 80,
}: SplitViewProps) {
 const [leftWidth, setLeftWidth] = useState(defaultLeftWidth);
 const [isDragging, setIsDragging] = useState(false);
 const containerRef = useRef<HTMLDivElement>(null);

 // Handle mouse down on divider
 const handleMouseDown = useCallback((e: React.MouseEvent) => {
 e.preventDefault();
 setIsDragging(true);
 }, []);

 // Handle double-click to reset
 const handleDoubleClick = useCallback(() => {
 setLeftWidth(defaultLeftWidth);
 }, [defaultLeftWidth]);

 // Handle mouse move and mouse up
 useEffect(() => {
 if (!isDragging) return;

 const handleMouseMove = (e: MouseEvent) => {
 if (!containerRef.current) return;

 const containerRect = containerRef.current.getBoundingClientRect();
 const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;

 // Clamp to min/max
 const clampedWidth = Math.max(minLeftWidth, Math.min(maxLeftWidth, newLeftWidth));
 setLeftWidth(clampedWidth);
 };

 const handleMouseUp = () => {
 setIsDragging(false);
 };

 document.addEventListener("mousemove", handleMouseMove);
 document.addEventListener("mouseup", handleMouseUp);

 return () => {
 document.removeEventListener("mousemove", handleMouseMove);
 document.removeEventListener("mouseup", handleMouseUp);
 };
 }, [isDragging, minLeftWidth, maxLeftWidth]);

 // Prevent text selection while dragging
 useEffect(() => {
 if (isDragging) {
 document.body.style.userSelect ="none";
 document.body.style.cursor ="col-resize";
 } else {
 document.body.style.userSelect ="";
 document.body.style.cursor ="";
 }

 return () => {
 document.body.style.userSelect ="";
 document.body.style.cursor ="";
 };
 }, [isDragging]);

 return (
 <div
 ref={containerRef}
 className="flex flex-1 overflow-hidden"
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
 className={`w-1.5 flex-shrink-0 cursor-col-resize flex items-center justify-center group transition-colors ${
 isDragging
 ?"bg-[var(--primary)]"
 :"bg-gray-200 dark:bg-[var(--card-hover)] hover:bg-[var(--primary)]/50"
 }`}
 onMouseDown={handleMouseDown}
 onDoubleClick={handleDoubleClick}
 title="Drag to resize. Double-click to reset."
 >
 {/* Visual indicator */}
 <div className="flex flex-col space-y-1">
 <div className={`w-1 h-1 rounded-full ${
 isDragging ?"bg-white":"bg-gray-400 dark:bg-gray-500 group-hover:bg-white"
 }`} />
 <div className={`w-1 h-1 rounded-full ${
 isDragging ?"bg-white":"bg-gray-400 dark:bg-gray-500 group-hover:bg-white"
 }`} />
 <div className={`w-1 h-1 rounded-full ${
 isDragging ?"bg-white":"bg-gray-400 dark:bg-gray-500 group-hover:bg-white"
 }`} />
 </div>
 </div>

 {/* Right Panel */}
 <div
 className="overflow-auto bg-gray-50 dark:bg-[var(--background)] flex-1"
 >
 {rightPanel}
 </div>
 </div>
 );
}
