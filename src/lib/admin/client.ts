/**
 * Client-side admin utilities
 * Uses NEXT_PUBLIC_ADMIN_EMAILS environment variable
 */

/**
 * Check if an email is in the admin allowlist (client-side)
 */
export function isAdminEmailClient(email: string | null | undefined): boolean {
  if (!email) return false;

  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
}
