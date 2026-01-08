"use client";

import { useState } from "react";
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
  const [selectedState, setSelectedState] = useState("");
  const router = useRouter();

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    if (stateCode) {
      router.push(`/state-requirements/${stateCode.toLowerCase()}`);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="relative">
        <select
          value={selectedState}
          onChange={handleStateChange}
          className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl text-white text-lg font-medium appearance-none cursor-pointer focus:outline-none focus:border-white/50 transition-all hover:bg-white/20"
        >
          <option value="" className="text-gray-900">
            Select your state...
          </option>
          {states.map((state) => (
            <option key={state.code} value={state.code} className="text-gray-900">
              {state.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-6 h-6 text-white"
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
        </div>
      </div>
      <p className="text-sm text-white/60 mt-3">
        Or scroll down to browse all {states.length} states
      </p>
    </div>
  );
}
