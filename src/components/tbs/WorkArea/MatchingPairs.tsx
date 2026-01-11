"use client";

import { useState, useRef, useEffect } from"react";
import { TBSRequirement, MatchingResponse, MatchingAnswer } from"@/lib/data/tbs/types";

interface MatchingItem {
 id: string;
 text: string;
 side:"left"|"right";
}

interface MatchingPairsProps {
 requirement: TBSRequirement;
 leftItems: MatchingItem[];
 rightItems: MatchingItem[];
 response: MatchingResponse | null;
 onResponseChange: (response: MatchingResponse) => void;
 isSubmitted: boolean;
 showHint?: boolean;
}

export default function MatchingPairs({
 requirement,
 leftItems,
 rightItems,
 response,
 onResponseChange,
 isSubmitted,
 showHint = false,
}: MatchingPairsProps) {
 const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
 const [hoveredRight, setHoveredRight] = useState<string | null>(null);
 const pairs = response?.pairs || [];
 const correctAnswer = requirement.correctAnswer as MatchingAnswer;
 const containerRef = useRef<HTMLDivElement>(null);

 // Get paired right item for a left item
 const getPairedRight = (leftId: string): string | null => {
 const pair = pairs.find(p => p.leftId === leftId);
 return pair?.rightId || null;
 };

 // Get paired left item for a right item
 const getPairedLeft = (rightId: string): string | null => {
 const pair = pairs.find(p => p.rightId === rightId);
 return pair?.leftId || null;
 };

 // Check if a pair is correct
 const isPairCorrect = (leftId: string, rightId: string): boolean => {
 return correctAnswer.correctPairs.some(
 p => p.leftId === leftId && p.rightId === rightId
 );
 };

 // Handle left item click
 const handleLeftClick = (leftId: string) => {
 if (isSubmitted) return;

 if (selectedLeft === leftId) {
 // Deselect
 setSelectedLeft(null);
 } else {
 // Select new left item
 setSelectedLeft(leftId);
 }
 };

 // Handle right item click
 const handleRightClick = (rightId: string) => {
 if (isSubmitted) return;

 if (selectedLeft) {
 // Create or update pair
 const existingPairIndex = pairs.findIndex(p => p.leftId === selectedLeft);
 const rightAlreadyPaired = pairs.findIndex(p => p.rightId === rightId);

 let newPairs = [...pairs];

 // Remove any existing pairing for this right item
 if (rightAlreadyPaired >= 0) {
 newPairs.splice(rightAlreadyPaired, 1);
 }

 // Remove existing pairing for the left item if it exists
 if (existingPairIndex >= 0) {
 newPairs.splice(existingPairIndex, 1);
 }

 // Add new pair
 newPairs.push({ leftId: selectedLeft, rightId });

 onResponseChange({
 type:"matching",
 pairs: newPairs,
 });

 setSelectedLeft(null);
 }
 };

 // Remove a pair
 const handleRemovePair = (leftId: string) => {
 if (isSubmitted) return;

 const newPairs = pairs.filter(p => p.leftId !== leftId);
 onResponseChange({
 type:"matching",
 pairs: newPairs,
 });
 };

 // Clear all pairs
 const handleClearAll = () => {
 if (isSubmitted) return;
 onResponseChange({
 type:"matching",
 pairs: [],
 });
 setSelectedLeft(null);
 };

 // Calculate score
 const getScore = () => {
 let correct = 0;
 for (const pair of pairs) {
 if (isPairCorrect(pair.leftId, pair.rightId)) {
 correct++;
 }
 }
 return { correct, total: correctAnswer.correctPairs.length };
 };

 return (
 <div className="space-y-4"ref={containerRef}>
 {/* Label */}
 <div>
 <label className="block text-sm font-medium text-gray-700 dark:text-[var(--muted-light)]">
 {requirement.label}
 </label>
 {requirement.description && (
 <p className="text-xs text-gray-500 dark:text-[var(--muted)] mt-1">
 {requirement.description}
 </p>
 )}
 </div>

 {/* Instructions */}
 <p className="text-xs text-gray-500 dark:text-[var(--muted)]">
 Click an item on the left, then click its match on the right
 </p>

 {/* Matching Grid */}
 <div className="grid grid-cols-2 gap-4">
 {/* Left Column */}
 <div className="space-y-2">
 <h4 className="text-xs font-semibold text-gray-600 dark:text-[var(--muted)] uppercase tracking-wider">
 Items
 </h4>
 {leftItems.map((item) => {
 const pairedRight = getPairedRight(item.id);
 const isSelected = selectedLeft === item.id;
 const isPaired = pairedRight !== null;
 const pairCorrect = isSubmitted && isPaired && isPairCorrect(item.id, pairedRight);
 const pairIncorrect = isSubmitted && isPaired && !isPairCorrect(item.id, pairedRight);
 const missingPair = isSubmitted && !isPaired;

 return (
 <div key={item.id} className="flex items-center gap-2">
 <button
 onClick={() => handleLeftClick(item.id)}
 disabled={isSubmitted}
 className={`flex-1 p-3 text-left text-sm rounded-lg border-2 transition-all ${
 isSubmitted
 ? pairCorrect
 ?"bg-green-50 dark:bg-green-900/20 border-green-500"
 : pairIncorrect
 ?"bg-red-50 dark:bg-red-900/20 border-red-500"
 : missingPair
 ?"bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500"
 :"bg-white dark:bg-[var(--card)] border-gray-200"
 : isSelected
 ?"bg-blue-100 dark:bg-blue-900/40 border-blue-500 ring-2 ring-blue-300"
 : isPaired
 ?"bg-blue-50 dark:bg-blue-900/20 border-blue-400"
 :"bg-white dark:bg-[var(--card)] border-gray-200 hover:border-blue-300"
 }`}
 >
 <span className="text-gray-700 dark:text-[var(--muted-light)]">{item.text}</span>
 </button>

 {/* Pair indicator / remove button */}
 {isPaired && !isSubmitted && (
 <button
 onClick={() => handleRemovePair(item.id)}
 className="p-1 text-gray-400 hover:text-red-500 transition-colors"
 title="Remove pairing"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </button>
 )}

 {/* Status icon */}
 {isSubmitted && isPaired && (
 <span className="flex-shrink-0">
 {pairCorrect ? (
 <svg className="w-5 h-5 text-green-600"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 ) : (
 <svg className="w-5 h-5 text-red-600"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 )}
 </span>
 )}
 </div>
 );
 })}
 </div>

 {/* Right Column */}
 <div className="space-y-2">
 <h4 className="text-xs font-semibold text-gray-600 dark:text-[var(--muted)] uppercase tracking-wider">
 Matches
 </h4>
 {rightItems.map((item) => {
 const pairedLeft = getPairedLeft(item.id);
 const isPaired = pairedLeft !== null;
 const isHovered = hoveredRight === item.id && selectedLeft !== null;
 const pairCorrect = isSubmitted && isPaired && isPairCorrect(pairedLeft, item.id);
 const pairIncorrect = isSubmitted && isPaired && !isPairCorrect(pairedLeft, item.id);

 return (
 <button
 key={item.id}
 onClick={() => handleRightClick(item.id)}
 onMouseEnter={() => setHoveredRight(item.id)}
 onMouseLeave={() => setHoveredRight(null)}
 disabled={isSubmitted}
 className={`w-full p-3 text-left text-sm rounded-lg border-2 transition-all ${
 isSubmitted
 ? pairCorrect
 ?"bg-green-50 dark:bg-green-900/20 border-green-500"
 : pairIncorrect
 ?"bg-red-50 dark:bg-red-900/20 border-red-500"
 :"bg-white dark:bg-[var(--card)] border-gray-200"
 : isHovered && selectedLeft
 ?"bg-blue-100 dark:bg-blue-900/40 border-blue-500"
 : isPaired
 ?"bg-blue-50 dark:bg-blue-900/20 border-blue-400"
 : selectedLeft
 ?"bg-white dark:bg-[var(--card)] border-gray-200 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
 :"bg-white dark:bg-[var(--card)] border-gray-200"
 }`}
 >
 <span className="text-gray-700 dark:text-[var(--muted-light)]">{item.text}</span>
 </button>
 );
 })}
 </div>
 </div>

 {/* Current Pairings */}
 {pairs.length > 0 && (
 <div className="p-3 bg-gray-50 dark:bg-[var(--card)]/50 rounded-lg">
 <div className="flex items-center justify-between mb-2">
 <h4 className="text-xs font-semibold text-gray-600 dark:text-[var(--muted)] uppercase tracking-wider">
 Your Pairings
 </h4>
 {!isSubmitted && (
 <button
 onClick={handleClearAll}
 className="text-xs text-red-500 hover:text-red-700 transition-colors"
 >
 Clear All
 </button>
 )}
 </div>
 <div className="space-y-1">
 {pairs.map((pair) => {
 const leftItem = leftItems.find(i => i.id === pair.leftId);
 const rightItem = rightItems.find(i => i.id === pair.rightId);
 const isCorrect = isSubmitted && isPairCorrect(pair.leftId, pair.rightId);

 return (
 <div
 key={pair.leftId}
 className={`flex items-center gap-2 text-sm ${
 isSubmitted
 ? isCorrect
 ?"text-green-700 dark:text-green-400"
 :"text-red-700 dark:text-red-400"
 :"text-gray-700 dark:text-[var(--muted-light)]"
 }`}
 >
 <span className="truncate">{leftItem?.text}</span>
 <svg className="w-4 h-4 flex-shrink-0"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
 </svg>
 <span className="truncate">{rightItem?.text}</span>
 </div>
 );
 })}
 </div>
 </div>
 )}

 {/* Hint */}
 {showHint && requirement.hint && !isSubmitted && (
 <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
 <div className="flex items-start gap-2">
 <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
 </svg>
 <p className="text-sm text-amber-800 dark:text-amber-200">{requirement.hint}</p>
 </div>
 </div>
 )}

 {/* Score after submission */}
 {isSubmitted && (
 <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
 <div className="flex items-center justify-between mb-2">
 <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
 Score: {getScore().correct} / {getScore().total} correct
 </span>
 </div>
 {requirement.explanation && (
 <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
 <span className="font-medium">Explanation: </span>
 {requirement.explanation}
 </p>
 )}
 </div>
 )}

 {/* Status */}
 <div className="text-xs text-gray-500 dark:text-[var(--muted)]">
 {pairs.length} of {leftItems.length} items paired
 {selectedLeft && (
 <span className="ml-2 text-blue-600 dark:text-blue-400">
 • Click a match on the right
 </span>
 )}
 </div>
 </div>
 );
}
