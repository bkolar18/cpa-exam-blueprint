"use client";

import { useParams, useRouter } from "next/navigation";
import { TBSContainer } from "@/components/tbs";
import { getTBSById } from "@/lib/data/tbs";
import { TBSAttempt } from "@/lib/data/tbs/types";

export default function TBSPracticePage() {
  const params = useParams();
  const router = useRouter();
  const tbsId = params.id as string;

  const tbs = getTBSById(tbsId);

  if (!tbs) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Simulation Not Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            The requested task-based simulation could not be found.
          </p>
          <button
            onClick={() => router.push("/dashboard/simulations")}
            className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
          >
            Back to Simulations
          </button>
        </div>
      </div>
    );
  }

  const handleComplete = (attempt: TBSAttempt) => {
    // In production, this would save to the database
    console.log("TBS attempt completed:", attempt);

    // Could also show a toast notification
    // toast.success(`Score: ${attempt.scorePercentage}%`);
  };

  return (
    <TBSContainer
      tbs={tbs}
      testletIndex={1}
      testletTotal={1}
      onComplete={handleComplete}
      isPracticeMode={true}
      onReturnToLibrary={() => router.push("/dashboard/simulations")}
    />
  );
}
