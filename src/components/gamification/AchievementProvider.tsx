"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { AchievementToastContainer } from "./AchievementToast";
import {
  checkAchievements,
  getGamificationSummary,
} from "@/lib/gamification/checker";
import type {
  AchievementNotification,
  AchievementCheckContext,
  SectionCode,
} from "@/lib/gamification/types";

interface GamificationSummary {
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  badges: {
    total: number;
    earned: number;
    list: Array<{
      id: string;
      code: string;
      name: string;
      tier: string;
      points: number;
      isEarned: boolean;
      progress: number;
      earnedAt: string | null | undefined;
    }>;
  };
  achievements: {
    total: number;
    unlocked: number;
    list: Array<{
      id: string;
      code: string;
      name: string;
      tier: string;
      points: number;
      is_hidden: boolean;
      isUnlocked: boolean;
      unlockedAt: string | null | undefined;
      isDiscovered: boolean;
      displayName: string;
      displayDescription: string;
    }>;
  };
}

interface AchievementContextType {
  notifications: AchievementNotification[];
  summary: GamificationSummary | null;
  loading: boolean;
  triggerCheck: (context: Omit<AchievementCheckContext, "userId">) => Promise<void>;
  refreshSummary: () => Promise<void>;
}

const AchievementContext = createContext<AchievementContextType>({
  notifications: [],
  summary: null,
  loading: true,
  triggerCheck: async () => {},
  refreshSummary: async () => {},
});

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AchievementNotification[]>([]);
  const [summary, setSummary] = useState<GamificationSummary | null>(null);
  const [loading, setLoading] = useState(true);

  // Load initial summary
  const refreshSummary = useCallback(async () => {
    if (!user) {
      setSummary(null);
      setLoading(false);
      return;
    }

    try {
      const data = await getGamificationSummary(user.id);
      setSummary(data);
    } catch (error) {
      console.error("Error loading gamification summary:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refreshSummary();
  }, [refreshSummary]);

  // Trigger achievement check
  const triggerCheck = useCallback(
    async (context: Omit<AchievementCheckContext, "userId">) => {
      if (!user) return;

      try {
        const newNotifications = await checkAchievements({
          ...context,
          userId: user.id,
        });

        if (newNotifications.length > 0) {
          setNotifications((prev) => [...prev, ...newNotifications]);
          // Refresh summary after new achievements
          await refreshSummary();
        }
      } catch (error) {
        console.error("Error checking achievements:", error);
      }
    },
    [user, refreshSummary]
  );

  // Dismiss notification
  const dismissNotification = useCallback((index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return (
    <AchievementContext.Provider
      value={{
        notifications,
        summary,
        loading,
        triggerCheck,
        refreshSummary,
      }}
    >
      {children}
      <AchievementToastContainer
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error("useAchievements must be used within an AchievementProvider");
  }
  return context;
}

// Helper hook for triggering study session achievements
export function useStudySessionAchievements() {
  const { triggerCheck } = useAchievements();

  const onStudySessionLogged = useCallback(
    async (section: SectionCode, hours: number) => {
      await triggerCheck({
        trigger: "study_session",
        section,
        hours,
        sessionTime: new Date(),
      });
    },
    [triggerCheck]
  );

  return { onStudySessionLogged };
}

// Helper hook for triggering practice session achievements
export function usePracticeSessionAchievements() {
  const { triggerCheck } = useAchievements();

  const onPracticeSessionCompleted = useCallback(
    async (
      section: SectionCode,
      questionsCorrect: number,
      questionsAttempted: number
    ) => {
      const accuracy =
        questionsAttempted > 0
          ? (questionsCorrect / questionsAttempted) * 100
          : 0;

      await triggerCheck({
        trigger: "practice_session",
        section,
        accuracy,
        questionsCorrect,
        questionsAttempted,
      });
    },
    [triggerCheck]
  );

  return { onPracticeSessionCompleted };
}
