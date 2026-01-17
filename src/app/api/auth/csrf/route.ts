import { getCSRFTokenEndpoint } from '@/lib/security/csrf';

/**
 * GET /api/auth/csrf
 * Returns a new CSRF token and sets it in a cookie
 * Client should call this on app load and include the token in state-changing requests
 */
export async function GET() {
  return getCSRFTokenEndpoint();
}
