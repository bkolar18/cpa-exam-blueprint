"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import type { SectionCode } from "@/lib/supabase/types";

interface QuestionFlagsProps {
  questionId: string;
  section: SectionCode;
  topic: string;
  subtopic?: string;
}

interface FlagState {
  flag_return_to: boolean;
  flag_difficult: boolean;
  flag_easy: boolean;
}

const flagOptions = [
  {
    key: "flag_return_to" as const,
    label: "Return to",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    ),
    activeColor: "bg-blue-500 text-white",
    inactiveColor: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900/30",
    description: "Flag to review later",
  },
  {
    key: "flag_difficult" as const,
    label: "Difficult",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    activeColor: "bg-red-500 text-white",
    inactiveColor: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-red-100 dark:hover:bg-red-900/30",
    description: "Mark as difficult",
  },
  {
    key: "flag_easy" as const,
    label: "Easy",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    activeColor: "bg-green-500 text-white",
    inactiveColor: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900/30",
    description: "Mark as easy/mastered",
  },
];

export default function QuestionFlags({
  questionId,
  section,
  topic,
  subtopic,
}: QuestionFlagsProps) {
  const { user } = useAuth();
  const supabase = createClient();
  const [flags, setFlags] = useState<FlagState>({
    flag_return_to: false,
    flag_difficult: false,
    flag_easy: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load existing flags
  useEffect(() => {
    const loadFlags = async () => {
      if (!user || !supabase) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("question_flags")
          .select("flag_return_to, flag_difficult, flag_easy")
          .eq("user_id", user.id)
          .eq("question_id", questionId)
          .single();

        if (data && !error) {
          setFlags({
            flag_return_to: data.flag_return_to || false,
            flag_difficult: data.flag_difficult || false,
            flag_easy: data.flag_easy || false,
          });
        }
      } catch {
        // No flags exist yet
      } finally {
        setIsLoading(false);
      }
    };

    loadFlags();
  }, [user, questionId, supabase]);

  const handleToggleFlag = async (flagKey: keyof FlagState) => {
    if (!user || !supabase) return;

    const newValue = !flags[flagKey];

    // Optimistic update
    setFlags((prev) => ({ ...prev, [flagKey]: newValue }));

    try {
      // Check if record exists
      const { data: existing } = await supabase
        .from("question_flags")
        .select("id")
        .eq("user_id", user.id)
        .eq("question_id", questionId)
        .single();

      if (existing) {
        // Update existing
        await supabase
          .from("question_flags")
          .update({
            [flagKey]: newValue,
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id)
          .eq("question_id", questionId);
      } else {
        // Insert new
        await supabase.from("question_flags").insert({
          user_id: user.id,
          question_id: questionId,
          section,
          topic,
          subtopic: subtopic || null,
          [flagKey]: newValue,
        });
      }
    } catch (error) {
      console.error("Failed to toggle flag:", error);
      // Revert on error
      setFlags((prev) => ({ ...prev, [flagKey]: !newValue }));
    }
  };

  if (!user) return null;

  return (
    <div className="flex items-center space-x-2">
      {isLoading ? (
        <div className="text-xs text-gray-400">Loading...</div>
      ) : (
        flagOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => handleToggleFlag(option.key)}
            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
              flags[option.key] ? option.activeColor : option.inactiveColor
            }`}
            title={option.description}
          >
            {option.icon}
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        ))
      )}
    </div>
  );
}
