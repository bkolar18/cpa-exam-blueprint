import { createClient, clearCachedClient } from '@/lib/supabase/client';
import { clearAllAuthStorage } from '@/lib/supabase/clearAuthStorage';

type LogoutReason = 'inactivity' | 'session_expired' | 'user_initiated';

/**
 * Comprehensive logout that clears ALL auth state and redirects.
 *
 * This function:
 * 1. Signs out from Supabase (invalidates tokens server-side)
 * 2. Clears all client-side storage (localStorage, sessionStorage, cookies)
 * 3. Clears the cached Supabase client
 * 4. Calls server endpoint to clear httpOnly cookies
 * 5. Adds delay for mobile browser compatibility
 * 6. Performs full page redirect (not router.push)
 *
 * This function does NOT return - it performs a full page redirect.
 */
export async function performFullLogout(reason?: LogoutReason): Promise<void> {
  // 1. Sign out from Supabase (invalidates tokens server-side)
  try {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
  } catch (error) {
    console.error('Supabase signOut error:', error);
    // Continue with cleanup even if signOut fails
  }

  // 2. Clear all client-side storage (localStorage, sessionStorage, cookies)
  // This also clears the cached client
  clearAllAuthStorage();

  // 3. Ensure cached client is cleared (redundant but explicit)
  clearCachedClient();

  // 4. Clear server-side httpOnly cookies
  try {
    await fetch('/api/auth/clear-session', {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    console.error('Server session clear error:', error);
    // Continue with redirect even if server clear fails
  }

  // 5. Delay for mobile browsers to process cookie changes
  await new Promise(resolve => setTimeout(resolve, 100));

  // 6. Full page redirect (not router.push - ensures fresh React state)
  const url = reason ? `/login?reason=${reason}` : '/login';
  window.location.href = url;
}

/**
 * Clears auth state without redirecting.
 * Use this for internal state management when you need to clear auth
 * but handle the redirect yourself.
 */
export async function clearAuthStateWithoutRedirect(): Promise<void> {
  try {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
  } catch (error) {
    console.error('Supabase signOut error:', error);
  }

  clearAllAuthStorage();
  clearCachedClient();

  try {
    await fetch('/api/auth/clear-session', {
      method: 'POST',
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    console.error('Server session clear error:', error);
  }
}
