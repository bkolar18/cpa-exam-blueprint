import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null;

export function createClient(): SupabaseClient | null {
  // Return cached client if available
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Debug logging - remove after fixing
  console.log('[Supabase Debug] URL exists:', !!supabaseUrl);
  console.log('[Supabase Debug] Key exists:', !!supabaseAnonKey);

  // During SSG/build time, credentials may not be available
  if (!supabaseUrl || !supabaseAnonKey) {
    console.log('[Supabase Debug] Missing credentials, returning null');
    return null;
  }

  console.log('[Supabase Debug] Creating client...');
  supabaseClient = createSupabaseClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}

// Check if Supabase is properly configured
export function isSupabaseConfigured() {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}
