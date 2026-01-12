"use client";

import { useState, useCallback, useRef, useEffect } from"react";
import { useAuthOptional } from"@/components/auth/AuthProvider";
import { createClient } from"@/lib/supabase/client";

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

type ResizeEdge ="n"|"s"|"e"|"w"|"ne"|"nw"|"se"|"sw"| null;

const HIGHLIGHT_COLORS = [
 { name:"Yellow", color:"#fef08a", darkColor:"#854d0e"},
 { name:"Green", color:"#bbf7d0", darkColor:"#166534"},
 { name:"Blue", color:"#bfdbfe", darkColor:"#1e40af"},
 { name:"Pink", color:"#fbcfe8", darkColor:"#9d174d"},
 { name:"Orange", color:"#fed7aa", darkColor:"#9a3412"},
];

const FONT_SIZES = [
 { label:"Small", value:"12px"},
 { label:"Normal", value:"14px"},
 { label:"Large", value:"16px"},
 { label:"X-Large", value:"20px"},
];

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
 const [size, setSize] = useState({ width: 400, height: 450 });
 const [isDragging, setIsDragging] = useState(false);
 const [resizeEdge, setResizeEdge] = useState<ResizeEdge>(null);
 const [isMinimized, setIsMinimized] = useState(false);
 const [showHighlightPicker, setShowHighlightPicker] = useState(false);
 const [showFontSizePicker, setShowFontSizePicker] = useState(false);
 const [isSaving, setIsSaving] = useState(false);
 const [lastSaved, setLastSaved] = useState<Date | null>(null);
 const [isEmpty, setIsEmpty] = useState(true);
 const dragOffset = useRef({ x: 0, y: 0 });
 const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });
 const panelRef = useRef<HTMLDivElement>(null);
 const editorRef = useRef<HTMLDivElement>(null);
 const initializedRef = useRef(false);

 // Save note to database
 const handleSaveNote = useCallback(async () => {
 if (!user || !supabase || !editorRef.current) return;

 const noteContent = editorRef.current.innerText.trim();
 if (!noteContent) return;

 setIsSaving(true);
 try {
 // Use tbsId if provided, otherwise generate a unique ID based on timestamp
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
 note: `${notePrefix}${noteContent}`,
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
 }, [user, supabase, tbsId, tbsTitle, tbsSection, tbsTopic, tbsSubtopic]);

 // Initialize position to center of viewport when first opened
 useEffect(() => {
 if (isOpen && position === null) {
 const x = Math.max(20, (window.innerWidth - size.width) / 2);
 const y = Math.max(20, (window.innerHeight - size.height) / 2);
 setPosition({ x, y });
 }
 }, [isOpen, position, size.width, size.height]);

 // Initialize editor content
 useEffect(() => {
 if (isOpen && editorRef.current && !initializedRef.current) {
 if (initialNotes) {
 editorRef.current.innerHTML = initialNotes;
 setIsEmpty(false);
 } else {
 // Start with a <br> to fix cursor positioning bug
 editorRef.current.innerHTML = "<br>";
 setIsEmpty(true);
 }
 initializedRef.current = true;
 }
 }, [isOpen, initialNotes]);

 // Handle dragging
 const handleMouseDown = useCallback((e: React.MouseEvent) => {
 if ((e.target as HTMLElement).closest("button")) return;
 if ((e.target as HTMLElement).closest("[contenteditable]")) return;
 if ((e.target as HTMLElement).closest(".resize-edge")) return;
 if ((e.target as HTMLElement).closest(".dropdown-menu")) return;
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
 const minHeight = 250;
 const maxWidth = window.innerWidth - 40;
 const maxHeight = window.innerHeight - 40;

 let newWidth = resizeStart.current.width;
 let newHeight = resizeStart.current.height;
 let newX = resizeStart.current.posX;
 let newY = resizeStart.current.posY;

 // Handle horizontal resizing
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

 // Handle vertical resizing
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

 // Handle content change
 const handleContentChange = useCallback(() => {
 if (editorRef.current) {
 const text = editorRef.current.innerText.trim();
 const html = editorRef.current.innerHTML;
 // Check if truly empty (just <br> or empty)
 const editorIsEmpty = !text || html === "<br>" || html === "";
 setIsEmpty(editorIsEmpty);

 // If editor becomes empty, ensure it has a <br> for proper cursor positioning
 if (editorIsEmpty && html === "") {
 editorRef.current.innerHTML = "<br>";
 }

 onNotesChange?.(editorRef.current.innerHTML);
 }
 }, [onNotesChange]);

 // Handle focus - position cursor correctly
 const handleFocus = useCallback(() => {
 if (editorRef.current) {
 const selection = window.getSelection();
 const range = document.createRange();
 // Position cursor at start of content
 range.setStart(editorRef.current, 0);
 range.collapse(true);
 selection?.removeAllRanges();
 selection?.addRange(range);
 }
 }, []);

 // Handle keydown for auto-bullets
 const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
 if (e.key ==="Enter") {
 const selection = window.getSelection();
 if (!selection || !selection.rangeCount) return;

 const range = selection.getRangeAt(0);
 let node = range.startContainer;

 // Find if we're in a list item
 while (node && node !== editorRef.current) {
 if (node.nodeName ==="LI") {
 const li = node as HTMLLIElement;
 // If the list item is empty, exit the list
 if (li.textContent?.trim() ==="") {
 e.preventDefault();
 const list = li.parentElement;
 if (list) {
 // Remove the empty li
 li.remove();
 // If list is now empty, remove it too
 if (list.children.length === 0) {
 const br = document.createElement("br");
 list.parentElement?.insertBefore(br, list.nextSibling);
 list.remove();
 // Move cursor after the list
 const newRange = document.createRange();
 newRange.setStartAfter(br);
 newRange.collapse(true);
 selection.removeAllRanges();
 selection.addRange(newRange);
 } else {
 // Move cursor after the list
 const newRange = document.createRange();
 newRange.setStartAfter(list);
 newRange.collapse(true);
 selection.removeAllRanges();
 selection.addRange(newRange);
 }
 }
 handleContentChange();
 return;
 }
 // Let browser handle normal enter in non-empty list item
 return;
 }
 node = node.parentNode as Node;
 }
 }
 }, [handleContentChange]);

 // Clear notes
 const handleClear = useCallback(() => {
 if (editorRef.current?.textContent?.trim() && !confirm("Clear all notes?")) return;
 if (editorRef.current) {
 editorRef.current.innerHTML = "<br>";
 setIsEmpty(true);
 editorRef.current.focus();
 handleContentChange();
 }
 }, [handleContentChange]);

 // Formatting commands
 const execCommand = useCallback((command: string, value?: string) => {
 document.execCommand(command, false, value);
 editorRef.current?.focus();
 handleContentChange();
 }, [handleContentChange]);

 const toggleBold = () => execCommand("bold");
 const toggleItalic = () => execCommand("italic");
 const toggleUnderline = () => execCommand("underline");
 const toggleStrikethrough = () => execCommand("strikeThrough");
 const insertBulletList = () => execCommand("insertUnorderedList");
 const insertNumberedList = () => execCommand("insertOrderedList");
 const setHighlight = (color: string) => {
 execCommand("hiliteColor", color);
 setShowHighlightPicker(false);
 };
 const removeHighlight = () => {
 execCommand("hiliteColor","transparent");
 setShowHighlightPicker(false);
 };
 const setFontSize = (size: string) => {
 // Font size command uses 1-7 scale, so we use CSS instead
 const selection = window.getSelection();
 if (selection && selection.rangeCount > 0) {
 const range = selection.getRangeAt(0);
 if (!range.collapsed) {
 const span = document.createElement("span");
 span.style.fontSize = size;
 range.surroundContents(span);
 handleContentChange();
 }
 }
 setShowFontSizePicker(false);
 };
 const alignLeft = () => execCommand("justifyLeft");
 const alignCenter = () => execCommand("justifyCenter");
 const alignRight = () => execCommand("justifyRight");

 // Get cursor style for resize edges
 const getResizeCursor = (edge: ResizeEdge): string => {
 switch (edge) {
 case"n": case"s": return"ns-resize";
 case"e": case"w": return"ew-resize";
 case"ne": case"sw": return"nesw-resize";
 case"nw": case"se": return"nwse-resize";
 default: return"default";
 }
 };

 if (!isOpen || !position) return null;

 return (
 <div
 ref={panelRef}
 className="fixed z-40 bg-white dark:bg-[var(--card)] rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col"
 style={{
 left: position.x,
 top: position.y,
 width: isMinimized ? 280 : size.width,
 height: isMinimized ?"auto": size.height,
 maxHeight:"calc(100vh - 40px)",
 cursor: isDragging ?"grabbing":"default",
 }}
 >
 {/* Resize edges */}
 {!isMinimized && (
 <>
 {/* Top edge */}
 <div
 className="resize-edge absolute top-0 left-2 right-2 h-1 cursor-ns-resize hover:bg-yellow-400/50"
 onMouseDown={(e) => handleResizeStart(e,"n")}
 />
 {/* Bottom edge */}
 <div
 className="resize-edge absolute bottom-0 left-2 right-2 h-1 cursor-ns-resize hover:bg-yellow-400/50"
 onMouseDown={(e) => handleResizeStart(e,"s")}
 />
 {/* Left edge */}
 <div
 className="resize-edge absolute left-0 top-2 bottom-2 w-1 cursor-ew-resize hover:bg-yellow-400/50"
 onMouseDown={(e) => handleResizeStart(e,"w")}
 />
 {/* Right edge */}
 <div
 className="resize-edge absolute right-0 top-2 bottom-2 w-1 cursor-ew-resize hover:bg-yellow-400/50"
 onMouseDown={(e) => handleResizeStart(e,"e")}
 />
 {/* Corner handles */}
 <div
 className="resize-edge absolute top-0 left-0 w-3 h-3 cursor-nwse-resize"
 onMouseDown={(e) => handleResizeStart(e,"nw")}
 />
 <div
 className="resize-edge absolute top-0 right-0 w-3 h-3 cursor-nesw-resize"
 onMouseDown={(e) => handleResizeStart(e,"ne")}
 />
 <div
 className="resize-edge absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize"
 onMouseDown={(e) => handleResizeStart(e,"sw")}
 />
 <div
 className="resize-edge absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize"
 onMouseDown={(e) => handleResizeStart(e,"se")}
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
 title={isMinimized ?"Expand":"Minimize"}
 >
 {isMinimized ? (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/>
 </svg>
 ) : (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M20 12H4"/>
 </svg>
 )}
 </button>
 {/* Close */}
 <button
 onClick={onClose}
 className="p-1 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 rounded"
 title="Close"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </button>
 </div>
 </div>

 {/* Content */}
 {!isMinimized && (
 <>
 {/* Formatting Toolbar */}
 <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-gray-200 bg-gray-50 dark:bg-[var(--background)]">
 {/* Font Size Dropdown */}
 <div className="relative">
 <button
 onClick={() => {
 setShowFontSizePicker(!showFontSizePicker);
 setShowHighlightPicker(false);
 }}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded flex items-center gap-1"
 title="Font size"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16"/>
 </svg>
 <svg className="w-3 h-3"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M19 9l-7 7-7-7"/>
 </svg>
 </button>
 {showFontSizePicker && (
 <div className="dropdown-menu absolute top-full left-0 mt-1 bg-white dark:bg-[var(--card)] border border-gray-200 rounded-lg shadow-lg py-1 z-50">
 {FONT_SIZES.map((fs) => (
 <button
 key={fs.value}
 onClick={() => setFontSize(fs.value)}
 className="w-full px-3 py-1.5 text-left text-sm text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-100 dark:hover:bg-gray-700"
 style={{ fontSize: fs.value }}
 >
 {fs.label}
 </button>
 ))}
 </div>
 )}
 </div>

 <div className="h-4 w-px bg-gray-300 dark:bg-[var(--border)] mx-0.5"/>

 {/* Bold */}
 <button
 onClick={toggleBold}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded font-bold"
 title="Bold (Ctrl+B)"
 >
 B
 </button>

 {/* Italic */}
 <button
 onClick={toggleItalic}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded italic"
 title="Italic (Ctrl+I)"
 >
 I
 </button>

 {/* Underline */}
 <button
 onClick={toggleUnderline}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded underline"
 title="Underline (Ctrl+U)"
 >
 U
 </button>

 {/* Strikethrough */}
 <button
 onClick={toggleStrikethrough}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded line-through"
 title="Strikethrough"
 >
 S
 </button>

 <div className="h-4 w-px bg-gray-300 dark:bg-[var(--border)] mx-0.5"/>

 {/* Highlight Dropdown */}
 <div className="relative">
 <button
 onClick={() => {
 setShowHighlightPicker(!showHighlightPicker);
 setShowFontSizePicker(false);
 }}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded flex items-center gap-1"
 title="Highlight"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
 </svg>
 <div className="w-3 h-3 rounded bg-yellow-300 border border-yellow-400"/>
 </button>
 {showHighlightPicker && (
 <div className="dropdown-menu absolute top-full left-0 mt-1 bg-white dark:bg-[var(--card)] border border-gray-200 rounded-lg shadow-lg p-2 z-50">
 <div className="flex gap-1 mb-2">
 {HIGHLIGHT_COLORS.map((hc) => (
 <button
 key={hc.name}
 onClick={() => setHighlight(hc.color)}
 className="w-6 h-6 rounded border-2 border-gray-300 dark:border-[var(--border)] hover:scale-110 transition-transform"
 style={{ backgroundColor: hc.color }}
 title={hc.name}
 />
 ))}
 </div>
 <button
 onClick={removeHighlight}
 className="w-full text-xs text-gray-600 dark:text-[var(--muted)] hover:text-gray-800 dark:hover:text-gray-200"
 >
 Remove highlight
 </button>
 </div>
 )}
 </div>

 <div className="h-4 w-px bg-gray-300 dark:bg-[var(--border)] mx-0.5"/>

 {/* Bullet List */}
 <button
 onClick={insertBulletList}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
 title="Bullet list"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
 </svg>
 </button>

 {/* Numbered List */}
 <button
 onClick={insertNumberedList}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
 title="Numbered list"
 >
 <svg className="w-4 h-4"viewBox="0 0 24 24"fill="none"stroke="currentColor">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M7 6h13M7 12h13M7 18h13"/>
 <text x="2"y="8"fontSize="6"fill="currentColor"stroke="none">1</text>
 <text x="2"y="14"fontSize="6"fill="currentColor"stroke="none">2</text>
 <text x="2"y="20"fontSize="6"fill="currentColor"stroke="none">3</text>
 </svg>
 </button>

 <div className="h-4 w-px bg-gray-300 dark:bg-[var(--border)] mx-0.5"/>

 {/* Align Left */}
 <button
 onClick={alignLeft}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
 title="Align left"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M4 6h16M4 12h10M4 18h16"/>
 </svg>
 </button>

 {/* Align Center */}
 <button
 onClick={alignCenter}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
 title="Align center"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M4 6h16M7 12h10M4 18h16"/>
 </svg>
 </button>

 {/* Align Right */}
 <button
 onClick={alignRight}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
 title="Align right"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M4 6h16M10 12h10M4 18h16"/>
 </svg>
 </button>

 <div className="flex-1"/>

 {/* Clear */}
 <button
 onClick={handleClear}
 className="p-1.5 text-gray-600 dark:text-[var(--muted)] hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 rounded"
 title="Clear all"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
 </svg>
 </button>
 </div>

 {/* Rich Text Editor with placeholder overlay */}
 <div className="relative flex-1" style={{ minHeight: 100 }}>
 {/* Placeholder - shown when editor is empty */}
 {isEmpty && (
 <div className="absolute inset-0 p-3 text-sm text-gray-400 pointer-events-none select-none whitespace-pre-line">
 Type your notes here...{"\n\n"}• Use formatting tools above{"\n"}• Create bullet or numbered lists{"\n"}• Highlight important info{"\n"}• Notes save to My Notes on submission
 </div>
 )}
 <div
 ref={editorRef}
 contentEditable
 onInput={handleContentChange}
 onKeyDown={handleKeyDown}
 onFocus={handleFocus}
 className="absolute inset-0 p-3 text-sm text-gray-800 dark:text-[var(--foreground)] bg-yellow-50/50 dark:bg-[var(--background)] overflow-auto focus:outline-none"
 />
 </div>

 {/* Info footer */}
 <div className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800 flex items-center justify-between">
 <div className="flex items-center gap-2">
 {user ? (
 <>
 <button
 onClick={handleSaveNote}
 disabled={isSaving}
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
 <span className="text-xs text-gray-400 dark:text-[var(--muted)]">
 Drag edges to resize
 </span>
 </div>
 </>
 )}

 </div>
 );
}
