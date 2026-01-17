import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { rateLimitMiddleware } from '@/lib/security/rate-limit';

/**
 * Secure endpoint to check if the current user is an admin
 * This keeps admin emails server-side only
 */
export async function GET(request: NextRequest) {
  try {
    // Rate limit to prevent enumeration attacks
    const rateLimitResponse = await rateLimitMiddleware(request, 'auth/admin-status');
    if (rateLimitResponse) return rateLimitResponse;

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ isAdmin: false });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      return NextResponse.json({ isAdmin: false });
    }

    // Check against server-side admin list (not exposed to client)
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
    const isAdmin = adminEmails.includes(user.email.toLowerCase());

    return NextResponse.json({ isAdmin });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
