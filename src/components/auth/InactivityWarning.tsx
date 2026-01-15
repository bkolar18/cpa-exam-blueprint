"use client";

import { useState, useCallback } from "react";
import { useInactivityTimeout } from "@/hooks/useInactivityTimeout";

interface InactivityWarningProps {
  /** Timeout in minutes (default: 30) */
  timeoutMinutes?: number;
  /** Warning before logout in minutes (default: 2) */
  warningMinutes?: number;
}

export function InactivityWarning({
  timeoutMinutes = 30,
  warningMinutes = 2,
}: InactivityWarningProps) {
  const [showWarning, setShowWarning] = useState(false);

  const handleWarning = useCallback(() => {
    setShowWarning(true);
  }, []);

  const handleLogout = useCallback(() => {
    setShowWarning(false);
  }, []);

  const { resetTimer } = useInactivityTimeout({
    timeout: timeoutMinutes * 60 * 1000,
    warningTime: warningMinutes * 60 * 1000,
    onWarning: handleWarning,
    onLogout: handleLogout,
  });

  const handleStayLoggedIn = () => {
    setShowWarning(false);
    resetTimer();
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[var(--card)] rounded-xl shadow-2xl p-8 max-w-md mx-4 animate-fade-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-amber-600 dark:text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
            Session Timeout Warning
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Your session will expire in {warningMinutes} minute{warningMinutes > 1 ? "s" : ""} due to
            inactivity. Click below to stay logged in.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleStayLoggedIn}
              className="flex-1 btn-primary py-3"
            >
              Stay Logged In
            </button>
          </div>
          <p className="text-xs text-[var(--muted)] mt-4">
            For your security, we automatically log you out after periods of inactivity.
          </p>
        </div>
      </div>
    </div>
  );
}
