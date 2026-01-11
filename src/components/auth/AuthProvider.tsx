"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { clearAllAuthStorage } from "@/lib/supabase/clearAuthStorage";
import type { Profile } from "@/lib/supabase/types";

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    const supabase = createClient();
    if (!supabase) return null;

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) return null;
    return data as Profile;
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setLoading(false);
      return;
    }

    async function initializeAuth() {
      try {
        // Step 1: Get local session - this is the primary source of truth
        const { data: { session: localSession }, error: sessionError } =
          await supabase!.auth.getSession();

        if (sessionError) {
          // Only clear on explicit auth errors, not network issues
          if (sessionError.message?.includes('invalid') || sessionError.message?.includes('expired')) {
            console.error("Invalid session, clearing storage:", sessionError);
            clearAllAuthStorage();
          } else {
            console.warn("Session fetch warning (may be transient):", sessionError);
          }
          setLoading(false);
          return;
        }

        if (localSession) {
          // Trust the local session - Supabase handles token refresh automatically
          // Only validate with server if the token looks suspicious (very old)
          const tokenAge = localSession.expires_at
            ? (localSession.expires_at * 1000) - Date.now()
            : Infinity;

          // If token expires in less than 5 minutes, try to refresh
          if (tokenAge < 5 * 60 * 1000 && tokenAge > 0) {
            const { data: { session: refreshedSession } } =
              await supabase!.auth.refreshSession();
            if (refreshedSession) {
              setSession(refreshedSession);
              setUser(refreshedSession.user);
              fetchProfile(refreshedSession.user.id).then(setProfile);
              return;
            }
          }

          // Session looks good, use it
          setSession(localSession);
          setUser(localSession.user);
          fetchProfile(localSession.user.id).then(setProfile);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        // Don't clear on transient errors - just log and continue
        // User can manually sign out if needed
      } finally {
        setLoading(false);
      }
    }

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setSession(session);
          setUser(session?.user ?? null);
          if (session?.user) {
            fetchProfile(session.user.id).then(setProfile);
          }
        } else if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signOut = useCallback(async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    clearAllAuthStorage();
    setUser(null);
    setProfile(null);
    setSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signOut, refreshProfile }}>
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
    signOut: async () => {},
    refreshProfile: async () => {},
  };
};
