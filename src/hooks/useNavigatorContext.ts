"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuthOptional } from "@/components/auth/AuthProvider";
import type { SectionCode } from "@/lib/supabase/types";

// Types for question context sent to Navigator
export interface NavigatorQuestionContext {
  questionId?: string;
  questionText?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  topic?: string;
  subtopic?: string | null;
  section?: string;
  difficulty?: "easy" | "medium" | "hard";
  questionType?: "mcq" | "tbs";
  userAnswer?: string;
  isCorrect?: boolean;
}

// Types for analytics context sent to Navigator
export interface NavigatorAnalyticsContext {
  topicAccuracy?: number;
  topicQuestionsAttempted?: number;
  topicMasteryLevel?: "weak" | "moderate" | "mastered";
  primeMeridianScore?: number;
  daysUntilExam?: number;
  recentMistakeCount?: number;
}

// Message type for conversation
export interface NavigatorMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

// Navigator usage info
export interface NavigatorUsage {
  tier: string;
  limit: number;
  used: number;
  remaining: number;
  lastUsedAt: string | null;
}

interface UseNavigatorContextOptions {
  section?: SectionCode;
  topic?: string;
  enabled?: boolean;
}

interface UseNavigatorContextReturn {
  // Analytics context for personalization
  analyticsContext: NavigatorAnalyticsContext | null;
  // Loading state
  isLoading: boolean;
  // Usage info
  usage: NavigatorUsage | null;
  usageLoading: boolean;
  // Send message to Navigator
  sendMessage: (
    message: string,
    questionContext: NavigatorQuestionContext | null,
    mode: "practice" | "review",
    history?: NavigatorMessage[]
  ) => Promise<{ response: string; remaining: number } | null>;
  // Refetch analytics
  refetchAnalytics: () => Promise<void>;
  // Refetch usage
  refetchUsage: () => Promise<void>;
  // Error state
  error: Error | null;
  // Is user authenticated
  isAuthenticated: boolean;
}

/**
 * Hook to manage Navigator context and communication
 *
 * Fetches user performance data for the given section/topic
 * to personalize AI responses.
 */
export function useNavigatorContext(
  options: UseNavigatorContextOptions = {}
): UseNavigatorContextReturn {
  const { section, topic, enabled = true } = options;
  const { user } = useAuthOptional();
  const supabase = createClient();

  const [analyticsContext, setAnalyticsContext] = useState<NavigatorAnalyticsContext | null>(null);
  const [usage, setUsage] = useState<NavigatorUsage | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [usageLoading, setUsageLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch analytics context for the current topic
  const fetchAnalytics = useCallback(async () => {
    if (!enabled || !user || !supabase || !section) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const context: NavigatorAnalyticsContext = {};

      // Fetch topic performance if topic is specified
      if (topic) {
        // Use maybeSingle() to avoid 406 error when no row exists
        const { data: topicPerf } = await supabase
          .from("user_topic_performance")
          .select("accuracy, questions_attempted, mastery_level")
          .eq("user_id", user.id)
          .eq("section", section)
          .eq("topic", topic)
          .maybeSingle();

        if (topicPerf) {
          context.topicAccuracy = Math.round(topicPerf.accuracy * 100);
          context.topicQuestionsAttempted = topicPerf.questions_attempted;
          context.topicMasteryLevel = topicPerf.mastery_level as "weak" | "moderate" | "mastered";
        }

        // Get recent mistakes in this topic (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);

        const { count: mistakeCount } = await supabase
          .from("practice_attempts")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id)
          .eq("section", section)
          .eq("topic", topic)
          .eq("is_correct", false)
          .gte("created_at", weekAgo.toISOString());

        if (mistakeCount && mistakeCount > 0) {
          context.recentMistakeCount = mistakeCount;
        }
      }

      // Fetch section progress for Prime Meridian score
      // Use maybeSingle() to avoid 406 error when no row exists
      const { data: sectionProgress } = await supabase
        .from("section_progress")
        .select("prime_meridian_score, exam_date")
        .eq("user_id", user.id)
        .eq("section", section)
        .maybeSingle();

      if (sectionProgress) {
        context.primeMeridianScore = sectionProgress.prime_meridian_score;

        // Calculate days until exam if set
        if (sectionProgress.exam_date) {
          const examDate = new Date(sectionProgress.exam_date);
          const today = new Date();
          const diffTime = examDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays > 0) {
            context.daysUntilExam = diffDays;
          }
        }
      }

      setAnalyticsContext(context);
    } catch (err) {
      console.error("Error fetching analytics context:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch analytics"));
    } finally {
      setIsLoading(false);
    }
  }, [enabled, user, supabase, section, topic]);

  // Fetch current usage stats
  const fetchUsage = useCallback(async () => {
    if (!enabled || !user) {
      setUsageLoading(false);
      return;
    }

    setUsageLoading(true);

    try {
      const response = await fetch("/api/navigator", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setUsage(data);
      }
    } catch (err) {
      console.error("Error fetching usage:", err);
    } finally {
      setUsageLoading(false);
    }
  }, [enabled, user]);

  // Send message to Navigator API
  const sendMessage = useCallback(
    async (
      message: string,
      questionContext: NavigatorQuestionContext | null,
      mode: "practice" | "review",
      history?: NavigatorMessage[]
    ): Promise<{ response: string; remaining: number } | null> => {
      if (!user) {
        setError(new Error("Authentication required"));
        return null;
      }

      try {
        const response = await fetch("/api/navigator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            conversationHistory: history || [],
            questionContext,
            analyticsContext,
            mode,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          // Handle rate limit
          if (response.status === 429) {
            setUsage((prev) =>
              prev ? { ...prev, remaining: 0, used: prev.limit } : null
            );
            throw new Error(data.error || "Daily message limit reached");
          }
          throw new Error(data.error || "Failed to send message");
        }

        // Update remaining usage
        if (data.usage) {
          setUsage((prev) =>
            prev
              ? { ...prev, remaining: data.usage.remaining, used: prev.limit - data.usage.remaining }
              : null
          );
        }

        return {
          response: data.message,
          remaining: data.usage?.remaining ?? 0,
        };
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        return null;
      }
    },
    [user, analyticsContext]
  );

  // Initial fetch
  useEffect(() => {
    fetchAnalytics();
    fetchUsage();
  }, [fetchAnalytics, fetchUsage]);

  return useMemo(
    () => ({
      analyticsContext,
      isLoading,
      usage,
      usageLoading,
      sendMessage,
      refetchAnalytics: fetchAnalytics,
      refetchUsage: fetchUsage,
      error,
      isAuthenticated: !!user,
    }),
    [
      analyticsContext,
      isLoading,
      usage,
      usageLoading,
      sendMessage,
      fetchAnalytics,
      fetchUsage,
      error,
      user,
    ]
  );
}

/**
 * Helper hook for managing Navigator conversation state
 */
export function useNavigatorConversation() {
  const [messages, setMessages] = useState<NavigatorMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const addUserMessage = useCallback((content: string) => {
    const message: NavigatorMessage = {
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
    return message;
  }, []);

  const addAssistantMessage = useCallback((content: string) => {
    const message: NavigatorMessage = {
      role: "assistant",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
    return message;
  }, []);

  const clearConversation = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isTyping,
    setIsTyping,
    addUserMessage,
    addAssistantMessage,
    clearConversation,
  };
}
