"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TBSContainer } from "@/components/tbs";
import { getTBSById } from "@/lib/data/tbs";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import type { UserResponse } from "@/lib/data/tbs/types";

interface AttemptData {
  id: string;
  tbs_id: string;
  responses: Record<string, UserResponse>;
  score_earned: number | null;
  max_score: number | null;
  score_percentage: number | null;
  time_spent_seconds: number | null;
  completed_at: string | null;
}

export default function TBSReviewPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const attemptId = params.attemptId as string;

  const [attempt, setAttempt] = useState<AttemptData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const fetchAttempt = async () => {
      const supabase = createClient();
      if (!supabase) {
        setError("Database connection failed");
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("tbs_attempts")
        .select("id, tbs_id, responses, score_earned, max_score, score_percentage, time_spent_seconds, completed_at")
        .eq("id", attemptId)
        .eq("user_id", user.id)
        .single();

      if (fetchError || !data) {
        setError("Attempt not found or you don't have permission to view it");
        setLoading(false);
        return;
      }

      setAttempt(data as AttemptData);
      setLoading(false);
    };

    fetchAttempt();
  }, [attemptId, user, authLoading, router]);

  if (loading || authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[var(--background)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[var(--background)]">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-xl font-semibold text-gray-700 dark:text-[var(--muted-light)] mb-2">
            {error || "Attempt Not Found"}
          </h1>
          <button
            onClick={() => router.push("/dashboard/study-log")}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
          >
            Back to Study Log
          </button>
        </div>
      </div>
    );
  }

  const tbs = getTBSById(attempt.tbs_id);

  if (!tbs) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-[var(--background)]">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-xl font-semibold text-gray-700 dark:text-[var(--muted-light)] mb-2">
            Simulation Not Found
          </h1>
          <p className="text-gray-500 dark:text-[var(--muted)] mb-4">
            The simulation for this attempt could not be found.
          </p>
          <button
            onClick={() => router.push("/dashboard/study-log")}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
          >
            Back to Study Log
          </button>
        </div>
      </div>
    );
  }

  return (
    <TBSContainer
      tbs={tbs}
      testletIndex={1}
      testletTotal={1}
      isPracticeMode={true}
      reviewMode={true}
      savedResponses={attempt.responses || {}}
      savedScore={{
        earned: attempt.score_earned || 0,
        total: attempt.max_score || tbs.maxScorePoints,
      }}
      onClose={() => router.push("/dashboard/study-log")}
      onReturnToLibrary={() => router.push("/dashboard/simulations")}
    />
  );
}
