"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface State {
  code: string;
  name: string;
  boardName: string;
  educationRequirements: { totalCredits: number };
  experienceRequirements: { yearsRequired: number };
  examRequirements: { canSitBeforeDegree: boolean };
  ethicsExam: { required: boolean };
}

interface StateSelectorProps {
  states: State[];
}

export default function StateSelector({ states }: StateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filteredStates = states.filter((state) =>
    state.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (stateCode: string) => {
    setIsOpen(false);
    setSearch("");
    router.push(`/state-requirements/${stateCode.toLowerCase()}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-md mx-auto" ref={dropdownRef}>
      <div className="relative">
        {/* Input/Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl text-white text-lg font-medium text-left cursor-pointer focus:outline-none focus:border-white/50 transition-all hover:bg-white/20 flex items-center justify-between"
        >
          <span className="text-white/80">Select your state...</span>
          <svg
            className={`w-6 h-6 text-white transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
            {/* Search input */}
            <div className="p-3 border-b border-gray-100">
              <input
                type="text"
                placeholder="Search states..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)]"
                autoFocus
              />
            </div>

            {/* State list */}
            <div className="max-h-64 overflow-y-auto">
              {filteredStates.length > 0 ? (
                filteredStates.map((state) => (
                  <button
                    key={state.code}
                    onClick={() => handleSelect(state.code)}
                    className="w-full px-4 py-3 text-left hover:bg-[var(--primary)] hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span className="font-medium text-gray-900 group-hover:text-white">
                      {state.name}
                    </span>
                    <span className="text-sm text-gray-500 group-hover:text-white/80">
                      {state.code}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-center">
                  No states found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <p className="text-sm text-white/60 mt-3">
        Or scroll down to browse all {states.length} states
      </p>
    </div>
  );
}
