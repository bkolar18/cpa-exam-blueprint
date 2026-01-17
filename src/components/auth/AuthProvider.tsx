"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { clearAllAuthStorage } from "@/lib/supabase/clearAuthStorage";
import { performFullLogout } from "@/lib/auth/logout";
import { trackAuthError, setUser as setTrackedUser } from "@/lib/errorTracking";
import type { Profile } from "@/lib/supabase/types";

type AuthErrorType = 'network' | 'service_unavailable' | 'session_expired' | 'unknown' | null;

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  error: AuthErrorType;
  isServiceAvailable: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  retryAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Helper to classify errors
function classifyError(error: Error | { message?: string; code?: string; status?: number } | unknown): AuthErrorType {
  const message = error instanceof Error ? error.message :
    (typeof error === 'object' && error !== null && 'message' in error) ? String((error as { message?: string }).message) : '';

  // Check for status code in error object
  const status = (typeof error === 'object' && error !== null && 'status' in error)
    ? (error as { status?: number }).status
    : undefined;

  if (message.includes('fetch') || message.includes('network') || message.includes('Failed to fetch')) {
    return 'network';
  }
  if (message.includes('503') || message.includes('unavailable') || message.includes('timeout')) {
    return 'service_unavailable';
  }
  // 406 (Not Acceptable) and 401 (Unauthorized) indicate session issues
  if (status === 406 || status === 401 || message.includes('406') || message.includes('401') ||
      message.includes('expired') || message.includes('invalid') || message.includes('JWT') ||
      message.includes('Not Acceptable') || message.includes('Unauthorized')) {
    return 'session_expired';
  }
  return 'unknown';
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthErrorType>(null);
  const [isServiceAvailable, setIsServiceAvailable] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const fetchProfile = useCallback(async (userId: string, isInitialLoad: boolean = false): Promise<Profile | null> => {
    const supabase = createClient();
    if (!supabase) return null;

    const { data, error, status } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      trackAuthError("profile_fetch_failed", error.message, { userId, status, isInitialLoad });

      // Check if this is a session expiration error (406 or 401)
      // But DON'T redirect if this is an initial load after login -
      // the session might just need a moment to propagate
      if ((status === 406 || status === 401) && !isInitialLoad) {
        setError('session_expired');
        // Clear auth state and redirect to login
        clearAllAuthStorage();
        setUser(null);
        setProfile(null);
        setSession(null);
        setTrackedUser(null);
        // Redirect to login with reason
        if (typeof window !== 'undefined') {
          window.location.href = '/login?reason=session_expired';
        }
        return null;
      }

      // For initial load, just log the error but don't redirect
      // The user can still use the app, we'll retry on next refresh
      return null;
    }
    return data as Profile;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  }, [user, fetchProfile]);

  // Retry auth function that can be called manually
  const retryAuth = useCallback(async () => {
    setLoading(true);
    setError(null);
    setRetryCount(prev => prev + 1);

    const supabase = createClient();
    if (!supabase) {
      setError('service_unavailable');
      setIsServiceAvailable(false);
      setLoading(false);
      return;
    }

    try {
      const { data: { session: localSession }, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        const errorType = classifyError(sessionError);
        setError(errorType);
        trackAuthError("retry_session_failed", sessionError.message, { retryCount });

        if (errorType === 'session_expired') {
          clearAllAuthStorage();
        }
        setLoading(false);
        return;
      }

      // Success - clear error state
      setError(null);
      setIsServiceAvailable(true);

      if (localSession) {
        setSession(localSession);
        setUser(localSession.user);
        setTrackedUser(localSession.user.id, localSession.user.email);
        fetchProfile(localSession.user.id).then(setProfile);
      }
      setLoading(false);
    } catch (err) {
      const errorType = classifyError(err);
      setError(errorType);
      setIsServiceAvailable(errorType !== 'service_unavailable' && errorType !== 'network');
      trackAuthError("retry_exception", err instanceof Error ? err.message : "Unknown error", { retryCount });
      setLoading(false);
    }
  }, [fetchProfile, retryCount]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      setIsServiceAvailable(false);
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      setIsServiceAvailable(false);
      return;
    }

    let initialSessionReceived = false;

    // Set up auth state listener FIRST - this is the recommended approach per Supabase docs
    // The listener will receive INITIAL_SESSION event with current session state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        // Clear any previous errors on successful auth events
        setError(null);
        setIsServiceAvailable(true);

        if (event === 'INITIAL_SESSION') {
          initialSessionReceived = true;
          if (currentSession) {
            setSession(currentSession);
            setUser(currentSession.user);
            setTrackedUser(currentSession.user.id, currentSession.user.email);
            if (currentSession.user) {
              // Pass isInitialLoad=true to prevent redirect on 401/406 during initial auth
              fetchProfile(currentSession.user.id, true).then(setProfile);
            }
          }
          setLoading(false);
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (currentSession) {
            setSession(currentSession);
            setUser(currentSession.user);
            setTrackedUser(currentSession.user.id, currentSession.user.email);
            if (currentSession.user) {
              // Pass isInitialLoad=true for SIGNED_IN to handle fresh login after session expiry
              fetchProfile(currentSession.user.id, true).then(setProfile);
            }
          }
          setLoading(false);
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
          setTrackedUser(null);
          setLoading(false);
        }
      }
    );

    // Fallback: Check getSession after a delay in case INITIAL_SESSION doesn't fire
    const fallbackTimeout = setTimeout(async () => {
      if (initialSessionReceived) return;

      try {
        const { data: { session: localSession }, error: sessionError } =
          await supabase.auth.getSession();

        if (sessionError) {
          const errorType = classifyError(sessionError);
          setError(errorType);
          trackAuthError("session_fetch_failed", sessionError.message, {
            isInvalid: sessionError.message?.includes('invalid'),
            isExpired: sessionError.message?.includes('expired')
          });
          if (errorType === 'session_expired') {
            clearAllAuthStorage();
          }
          setLoading(false);
          return;
        }

        // Success - clear error state
        setError(null);
        setIsServiceAvailable(true);

        if (localSession) {
          setSession(localSession);
          setUser(localSession.user);
          setTrackedUser(localSession.user.id, localSession.user.email);
          // Pass isInitialLoad=true for fallback session check
          fetchProfile(localSession.user.id, true).then(setProfile);
        }
        setLoading(false);
      } catch (err) {
        const errorType = classifyError(err);
        setError(errorType);
        setIsServiceAvailable(errorType !== 'service_unavailable' && errorType !== 'network');
        trackAuthError("session_check_exception", err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    }, 100);

    return () => {
      subscription.unsubscribe();
      clearTimeout(fallbackTimeout);
    };
  }, [fetchProfile]);

  const signOut = useCallback(async () => {
    // Clear local state immediately for responsive UI
    setUser(null);
    setProfile(null);
    setSession(null);
    setTrackedUser(null);

    // Perform comprehensive logout with full page redirect
    // This clears all storage, cookies (client + server), and redirects to login
    await performFullLogout('user_initiated');
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, error, isServiceAvailable, signOut, refreshProfile, retryAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Optional version that returns null values instead of throwing when outside AuthProvider
export const useAuthOptional = () => {
  const context = useContext(AuthContext);
  // Return safe defaults when outside AuthProvider
  return context ?? {
    user: null,
    profile: null,
    session: null,
    loading: false,
    error: null,
    isServiceAvailable: true,
    signOut: async () => {},
    refreshProfile: async () => {},
    retryAuth: async () => {},
  };
};

// Export the error type for use in components
export type { AuthErrorType };
