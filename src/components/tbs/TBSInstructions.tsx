"use client";

import { useState } from"react";

interface TBSInstructionsProps {
 scenarioText: string;
 difficulty:"easy"|"medium"|"hard";
 topic: string;
 subtopic?: string;
 isPracticeMode?: boolean;
}

export default function TBSInstructions({
 scenarioText,
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 difficulty,
 topic,
 subtopic,
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 isPracticeMode = true,
}: TBSInstructionsProps) {
 // Default to collapsed to maximize workspace
 const [isExpanded, setIsExpanded] = useState(false);

 return (
 <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 flex-shrink-0">
 {/* Compact Collapsible Header */}
 <button
 onClick={() => setIsExpanded(!isExpanded)}
 className="w-full px-3 py-1 flex items-center justify-between hover:bg-blue-100/50 dark:hover:bg-blue-900/30 transition-colors"
 >
 <div className="flex items-center space-x-2">
 <svg
 className={`w-4 h-4 text-blue-600 dark:text-blue-400 transition-transform ${
 isExpanded ?"rotate-0":"-rotate-90"
 }`}
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M19 9l-7 7-7-7"/>
 </svg>
 <span className="text-sm font-semibold text-blue-800 dark:text-blue-200">
 Instructions
 </span>

 {/* Topic Tags - only show when collapsed */}
 {!isExpanded && (
 <div className="flex items-center space-x-1.5 ml-2">
 <span className="px-1.5 py-0.5 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
 {topic}
 </span>
 {subtopic && (
 <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded">
 {subtopic}
 </span>
 )}
 {/* Difficulty hidden - let adaptive model handle question selection */}
 </div>
 )}
 </div>

 <span className="text-xs text-blue-600 dark:text-blue-400">
 {isExpanded ?"Collapse":"Expand"}
 </span>
 </button>

 {/* Scenario Content */}
 {isExpanded && (
 <div className="px-3 pb-2">
 <div className="bg-white dark:bg-[var(--card)] rounded border border-blue-200 dark:border-blue-700 p-3">
 {/* Topic tags when expanded */}
 <div className="flex items-center space-x-1.5 mb-2">
 <span className="px-1.5 py-0.5 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 text-xs font-medium rounded">
 {topic}
 </span>
 {subtopic && (
 <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded">
 {subtopic}
 </span>
 )}
 {/* Difficulty hidden - let adaptive model handle question selection */}
 </div>

 <div className="prose prose-sm dark:prose-invert max-w-none text-sm">
 {scenarioText.split("\n").map((paragraph, index) => {
 const trimmed = paragraph.trim();
 if (!trimmed) return null;

 // Handle bullet points
 if (trimmed.startsWith("•") || trimmed.startsWith("-") || trimmed.startsWith("*")) {
 return (
 <li key={index} className="text-gray-700 dark:text-[var(--muted-light)] ml-4 text-sm">
 {trimmed.substring(1).trim()}
 </li>
 );
 }

 // Handle"Required:"sections
 if (trimmed.toLowerCase().startsWith("required:")) {
 return (
 <p key={index} className="mt-3 font-semibold text-blue-800 dark:text-blue-200 text-sm">
 {trimmed}
 </p>
 );
 }

 // Regular paragraphs
 return (
 <p key={index} className="text-gray-700 dark:text-[var(--muted-light)] text-sm leading-relaxed">
 {trimmed}
 </p>
 );
 })}
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
