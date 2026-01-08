import { createClient } from '@/lib/supabase/server';

/**
 * Check if an email is in the admin allowlist
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;

  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
}

/**
 * Get the current user and check if they're an admin
 * Returns { user, isAdmin } or { user: null, isAdmin: false }
 */
export async function getAdminUser() {
  const supabase = await createClient();
  if (!supabase) {
    return { user: null, isAdmin: false };
  }

  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, isAdmin: false };
  }

  return {
    user,
    isAdmin: isAdminEmail(user.email)
  };
}

/**
 * Require admin access - throws if not admin
 * Use in API routes
 */
export async function requireAdmin() {
  const { user, isAdmin } = await getAdminUser();

  if (!user) {
    throw new Error('Authentication required');
  }

  if (!isAdmin) {
    throw new Error('Admin access required');
  }

  return user;
}

/**
 * Log an admin action to the activity log
 */
export async function logAdminAction(
  actionType: string,
  details: {
    targetType?: string;
    targetId?: string;
    metadata?: Record<string, unknown>;
  } = {}
) {
  try {
    const { user } = await getAdminUser();
    if (!user) return;

    const supabase = await createClient();
    if (!supabase) return;

    await supabase.from('activity_log').insert({
      actor_id: user.id,
      actor_email: user.email,
      action_type: actionType,
      target_type: details.targetType,
      target_id: details.targetId,
      details: details.metadata || {},
    });
  } catch (error) {
    // Don't throw - logging shouldn't break the main operation
    console.error('Failed to log admin action:', error);
  }
}

/**
 * Log a user action (non-admin) to the activity log
 */
export async function logUserAction(
  userId: string,
  userEmail: string,
  actionType: string,
  details: {
    targetType?: string;
    targetId?: string;
    metadata?: Record<string, unknown>;
  } = {}
) {
  try {
    const supabase = await createClient();
    if (!supabase) return;

    await supabase.from('activity_log').insert({
      actor_id: userId,
      actor_email: userEmail,
      action_type: actionType,
      target_type: details.targetType,
      target_id: details.targetId,
      details: details.metadata || {},
    });
  } catch (error) {
    console.error('Failed to log user action:', error);
  }
}

// Common action types for consistency
export const ActionTypes = {
  // Admin actions
  ADMIN_LOGIN: 'admin_login',
  FEEDBACK_RESOLVED: 'feedback_resolved',
  FEEDBACK_DISMISSED: 'feedback_dismissed',
  FEEDBACK_BULK_UPDATE: 'feedback_bulk_update',
  USER_VIEWED: 'user_viewed',
  EXPORT_DATA: 'export_data',
  ANNOUNCEMENT_SENT: 'announcement_sent',

  // User actions
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  FEEDBACK_SUBMITTED: 'feedback_submitted',
  PRACTICE_SESSION: 'practice_session',
  SUBSCRIPTION_CHANGED: 'subscription_changed',
} as const;

export type ActionType = typeof ActionTypes[keyof typeof ActionTypes];
