/**
 * Client-side admin utilities
 * Fetches admin status from secure server endpoint (no email exposure)
 */

// Cache admin status to avoid repeated API calls
let cachedAdminStatus: boolean | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Check if the current user is an admin (client-side, secure)
 * Makes an API call to check server-side admin list
 */
export async function checkAdminStatus(): Promise<boolean> {
  // Return cached value if still valid
  const now = Date.now();
  if (cachedAdminStatus !== null && now - cacheTimestamp < CACHE_DURATION) {
    return cachedAdminStatus;
  }

  try {
    const response = await fetch('/api/auth/admin-status');
    if (!response.ok) return false;

    const data = await response.json();
    cachedAdminStatus = data.isAdmin === true;
    cacheTimestamp = now;
    return cachedAdminStatus;
  } catch {
    return false;
  }
}

/**
 * Clear the admin status cache (call on logout)
 */
export function clearAdminStatusCache(): void {
  cachedAdminStatus = null;
  cacheTimestamp = 0;
}

/**
 * @deprecated Use checkAdminStatus() instead - this exposes admin emails client-side
 * Keeping for backwards compatibility during transition
 */
export function isAdminEmailClient(email: string | null | undefined): boolean {
  if (!email) return false;
  // No longer check against exposed emails - return false
  // The component using this should migrate to useAdminStatus hook
  console.warn('isAdminEmailClient is deprecated. Use useAdminStatus hook instead.');
  return false;
}
