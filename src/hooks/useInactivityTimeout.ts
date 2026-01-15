"use client";

import { useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface UseInactivityTimeoutOptions {
  /** Timeout in milliseconds (default: 30 minutes) */
  timeout?: number;
  /** Whether the hook is enabled (default: true) */
  enabled?: boolean;
  /** Warning time before logout in milliseconds (default: 2 minutes) */
  warningTime?: number;
  /** Callback when warning is shown */
  onWarning?: () => void;
  /** Callback when logout occurs */
  onLogout?: () => void;
}

const DEFAULT_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const DEFAULT_WARNING_TIME = 2 * 60 * 1000; // 2 minutes before logout

/**
 * Hook to automatically log out inactive users
 * Tracks mouse movement, keyboard input, and touch events
 */
export function useInactivityTimeout({
  timeout = DEFAULT_TIMEOUT,
  enabled = true,
  warningTime = DEFAULT_WARNING_TIME,
  onWarning,
  onLogout,
}: UseInactivityTimeoutOptions = {}) {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
      warningRef.current = null;
    }
  }, []);

  const handleLogout = useCallback(async () => {
    clearTimers();

    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }

    onLogout?.();
    router.push("/login?reason=inactivity");
    router.refresh();
  }, [clearTimers, onLogout, router]);

  const resetTimer = useCallback(() => {
    if (!enabled) return;

    lastActivityRef.current = Date.now();
    clearTimers();

    // Set warning timer
    if (warningTime > 0 && onWarning) {
      warningRef.current = setTimeout(() => {
        onWarning();
      }, timeout - warningTime);
    }

    // Set logout timer
    timeoutRef.current = setTimeout(() => {
      handleLogout();
    }, timeout);
  }, [enabled, timeout, warningTime, onWarning, clearTimers, handleLogout]);

  // Store last activity time in localStorage for persistence across tabs
  const syncLastActivity = useCallback(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("lastActivity");
    if (stored) {
      const storedTime = parseInt(stored, 10);
      const timeSinceActivity = Date.now() - storedTime;

      // If inactive too long, log out immediately
      if (timeSinceActivity >= timeout) {
        handleLogout();
        return;
      }

      // Adjust timer based on stored activity
      lastActivityRef.current = storedTime;
    }

    // Update storage on activity
    localStorage.setItem("lastActivity", String(Date.now()));
  }, [timeout, handleLogout]);

  useEffect(() => {
    if (!enabled) {
      clearTimers();
      return;
    }

    syncLastActivity();

    const events = [
      "mousedown",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
      "click",
    ];

    const handleActivity = () => {
      localStorage.setItem("lastActivity", String(Date.now()));
      resetTimer();
    };

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, { passive: true });
    });

    // Listen for activity in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "lastActivity" && e.newValue) {
        lastActivityRef.current = parseInt(e.newValue, 10);
        resetTimer();
      }
    };
    window.addEventListener("storage", handleStorageChange);

    // Initial timer setup
    resetTimer();

    // Cleanup
    return () => {
      clearTimers();
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity);
      });
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [enabled, resetTimer, clearTimers, syncLastActivity]);

  return {
    resetTimer,
    lastActivity: lastActivityRef.current,
  };
}
