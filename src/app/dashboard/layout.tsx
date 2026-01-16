"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { AchievementProvider } from "@/components/gamification/AchievementProvider";
import DashboardNav from "@/components/dashboard/DashboardNav";
import { InactivityWarning } from "@/components/auth/InactivityWarning";
import { AuthErrorBanner } from "@/components/auth/AuthErrorBanner";
import { createClient } from "@/lib/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, error, isServiceAvailable, retryAuth } = useAuth();
  const router = useRouter();
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const MAX_RETRIES = 2;

  // Retry auth check if initial check fails
  const retryAuthCheck = useCallback(async () => {
    if (retryCount >= MAX_RETRIES) return false;

    setIsRetrying(true);
    const supabase = createClient();
    if (!supabase) {
      setIsRetrying(false);
      return false;
    }

    // Wait before retry (increases with each attempt)
    await new Promise(resolve => setTimeout(resolve, 300 * (retryCount + 1)));

    const { data: { session } } = await supabase.auth.getSession();
    setIsRetrying(false);

    if (session) {
      // Session found on retry - reload to get fresh state
      window.location.reload();
      return true;
    }

    setRetryCount(prev => prev + 1);
    return false;
  }, [retryCount]);

  useEffect(() => {
    // Don't redirect if there's an error (graceful degradation)
    // Network/service errors should show error UI instead of redirecting
    if (error === 'network' || error === 'service_unavailable') {
      return;
    }

    // Only redirect after loading is complete, no user, and retries exhausted
    if (!loading && !user && !isRetrying) {
      if (retryCount < MAX_RETRIES) {
        // Attempt retry
        retryAuthCheck();
      } else {
        // All retries exhausted, redirect to login
        router.push("/login");
      }
    }
  }, [user, loading, router, retryCount, isRetrying, retryAuthCheck, error]);

  // Show loading state while checking auth or retrying
  if (loading || isRetrying || (!user && !error && retryCount < MAX_RETRIES)) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
        {retryCount > 0 && (
          <p className="text-sm text-[var(--muted)]">
            Verifying authentication...
          </p>
        )}
      </div>
    );
  }

  // Graceful degradation: Show error state instead of redirecting on network/service errors
  if (!user && (error === 'network' || error === 'service_unavailable')) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <AuthErrorBanner className="mb-4" />
          <p className="text-center text-sm text-[var(--muted)]">
            If this problem persists, try refreshing the page or{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-[var(--primary)] hover:underline"
            >
              sign in again
            </button>
            .
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    // This state means we're about to redirect
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  return (
    <AchievementProvider>
      <div className="min-h-screen bg-[var(--background)]">
        <DashboardNav />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <InactivityWarning timeoutMinutes={120} warningMinutes={5} />
      </div>
    </AchievementProvider>
  );
}
