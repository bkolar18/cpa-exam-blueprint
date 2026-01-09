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
        // Step 1: Get local session
        const { data: { session: localSession }, error: sessionError } =
          await supabase!.auth.getSession();

        if (sessionError) {
          console.error("Session error, clearing storage:", sessionError);
          clearAllAuthStorage();
          setLoading(false);
          return;
        }

        if (localSession) {
          // Step 2: CRITICAL - Validate with server to catch stale tokens
          const { data: { user: validatedUser }, error: userError } =
            await supabase!.auth.getUser();

          if (userError || !validatedUser) {
            // Local session exists but server says it's invalid
            console.error("Stale session detected, clearing:", userError?.message);
            clearAllAuthStorage();
            await supabase!.auth.signOut({ scope: 'local' });
            setSession(null);
            setUser(null);
            setLoading(false);
            return;
          }

          // Session is valid
          setSession(localSession);
          setUser(validatedUser);
          fetchProfile(validatedUser.id).then(setProfile);
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        // On any error, clear and start fresh
        clearAllAuthStorage();
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
