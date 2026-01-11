"use client";

import { useState, useCallback, useEffect, memo } from"react";

interface TBSSearchBarProps {
 value: string;
 onChange: (value: string) => void;
 placeholder?: string;
 debounceMs?: number;
}

export const TBSSearchBar = memo(function TBSSearchBar({
 value,
 onChange,
 placeholder ="Search simulations...",
 debounceMs = 300,
}: TBSSearchBarProps) {
 const [localValue, setLocalValue] = useState(value);

 // Sync local value when external value changes
 useEffect(() => {
 setLocalValue(value);
 }, [value]);

 // Debounced onChange
 useEffect(() => {
 const timer = setTimeout(() => {
 if (localValue !== value) {
 onChange(localValue);
 }
 }, debounceMs);

 return () => clearTimeout(timer);
 }, [localValue, value, onChange, debounceMs]);

 const handleClear = useCallback(() => {
 setLocalValue("");
 onChange("");
 }, [onChange]);

 return (
 <div className="relative">
 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
 <svg
 className="w-5 h-5 text-gray-400"
 fill="none"
 stroke="currentColor"
 viewBox="0 0 24 24"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
 />
 </svg>
 </div>
 <input
 type="text"
 value={localValue}
 onChange={(e) => setLocalValue(e.target.value)}
 placeholder={placeholder}
 className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-[var(--card)] border border-gray-200 rounded-lg text-gray-800 dark:text-[var(--foreground)] placeholder-gray-400 dark:placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
 />
 {localValue && (
 <button
 onClick={handleClear}
 className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
 >
 <svg className="w-5 h-5"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 strokeWidth={2}
 d="M6 18L18 6M6 6l12 12"
 />
 </svg>
 </button>
 )}
 </div>
 );
});
