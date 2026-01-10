"use client";

import { useState, useEffect, useCallback } from "react";

export interface TBSAttemptSummary {
  id: string;
  tbsId: string;
  tbsTitle?: string;
  section?: string;
  tbsType?: string;
  topic?: string;
  startedAt: string;
  completedAt?: string;
  timeSpentSeconds?: number;
  scoreEarned?: number;
  maxScore?: number;
  scorePercentage?: number;
  isComplete: boolean;
}

export interface TBSProgressStats {
  totalAttempts: number;
  completedAttempts: number;
  averageScore: number | null;
  averageTimeMinutes: number | null;
  uniqueTBSAttempted: number;
  scoreByType: Record<string, number>;
  scoreByTopic: Record<string, number>;
  strongTopics: string[];
  weakTopics: string[];
}

export interface TBSProgressData {
  // Map of TBS ID to their attempts
  attemptsByTBS: Map<string, TBSAttemptSummary[]>;
  // Overall stats
  stats: TBSProgressStats | null;
  // Quick lookups
  completedTBSIds: Set<string>;
  inProgressTBSIds: Set<string>;
  bestScoreByTBS: Map<string, number>;
}

interface UseTBSProgressOptions {
  section?: string;
  enabled?: boolean;
}

interface UseTBSProgressReturn {
  data: TBSProgressData;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  getStatus: (tbsId: string) => "not_started" | "in_progress" | "completed";
  getBestScore: (tbsId: string) => number | null;
  getAttemptCount: (tbsId: string) => number;
}

export function useTBSProgress(
  options: UseTBSProgressOptions = {}
): UseTBSProgressReturn {
  const { section, enabled = true } = options;

  const [data, setData] = useState<TBSProgressData>({
    attemptsByTBS: new Map(),
    stats: null,
    completedTBSIds: new Set(),
    inProgressTBSIds: new Set(),
    bestScoreByTBS: new Map(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Fetch attempts and stats in parallel
      const [attemptsRes, statsRes] = await Promise.all([
        fetch(
          `/api/tbs/attempts${section ? `?section=${section}&limit=1000` : "?limit=1000"}`
        ),
        fetch(`/api/tbs/stats${section ? `?section=${section}` : ""}`),
      ]);

      // Check if user is not authenticated (401)
      if (attemptsRes.status === 401 || statsRes.status === 401) {
        // User not logged in - return empty progress
        setData({
          attemptsByTBS: new Map(),
          stats: null,
          completedTBSIds: new Set(),
          inProgressTBSIds: new Set(),
          bestScoreByTBS: new Map(),
        });
        setIsLoading(false);
        return;
      }

      if (!attemptsRes.ok) {
        throw new Error("Failed to fetch TBS attempts");
      }

      if (!statsRes.ok) {
        throw new Error("Failed to fetch TBS stats");
      }

      const attemptsData = await attemptsRes.json();
      const statsData = await statsRes.json();

      const attempts: TBSAttemptSummary[] = attemptsData.attempts || [];
      const stats: TBSProgressStats = statsData.stats || null;

      // Build lookup maps
      const attemptsByTBS = new Map<string, TBSAttemptSummary[]>();
      const completedTBSIds = new Set<string>();
      const inProgressTBSIds = new Set<string>();
      const bestScoreByTBS = new Map<string, number>();

      for (const attempt of attempts) {
        // Group by TBS ID
        const existing = attemptsByTBS.get(attempt.tbsId) || [];
        existing.push(attempt);
        attemptsByTBS.set(attempt.tbsId, existing);

        // Track completion status
        if (attempt.isComplete) {
          completedTBSIds.add(attempt.tbsId);
          // Track best score
          if (attempt.scorePercentage !== undefined) {
            const currentBest = bestScoreByTBS.get(attempt.tbsId) || 0;
            if (attempt.scorePercentage > currentBest) {
              bestScoreByTBS.set(attempt.tbsId, attempt.scorePercentage);
            }
          }
        } else {
          // Only mark as in-progress if not already completed
          if (!completedTBSIds.has(attempt.tbsId)) {
            inProgressTBSIds.add(attempt.tbsId);
          }
        }
      }

      setData({
        attemptsByTBS,
        stats,
        completedTBSIds,
        inProgressTBSIds,
        bestScoreByTBS,
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, [section, enabled]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  // Helper to get status of a specific TBS
  const getStatus = useCallback(
    (tbsId: string): "not_started" | "in_progress" | "completed" => {
      if (data.completedTBSIds.has(tbsId)) return "completed";
      if (data.inProgressTBSIds.has(tbsId)) return "in_progress";
      return "not_started";
    },
    [data.completedTBSIds, data.inProgressTBSIds]
  );

  // Helper to get best score for a specific TBS
  const getBestScore = useCallback(
    (tbsId: string): number | null => {
      return data.bestScoreByTBS.get(tbsId) ?? null;
    },
    [data.bestScoreByTBS]
  );

  // Helper to get attempt count for a specific TBS
  const getAttemptCount = useCallback(
    (tbsId: string): number => {
      return data.attemptsByTBS.get(tbsId)?.length ?? 0;
    },
    [data.attemptsByTBS]
  );

  return {
    data,
    isLoading,
    error,
    refetch: fetchProgress,
    getStatus,
    getBestScore,
    getAttemptCount,
  };
}
