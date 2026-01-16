import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Server-side route to clear auth session and cookies.
 * This can clear httpOnly cookies that JavaScript can't access.
 *
 * Called during:
 * - Login (to clear stale sessions before new login)
 * - Logout (inactivity, manual, session expiration)
 */
export async function POST() {
  const response = NextResponse.json({ success: true });

  // Get the Supabase client to sign out server-side
  try {
    const supabase = await createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
  } catch (error) {
    console.error('Error signing out server-side:', error);
    // Continue with cookie clearing even if signOut fails
  }

  // Clear all Supabase auth cookies
  // These cookie names follow Supabase's naming convention
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const projectRef = supabaseUrl ? new URL(supabaseUrl).hostname.split('.')[0] : '';

  // Expanded list of potential cookie names
  // Supabase may use chunked cookies (.0, .1) for large tokens
  const cookieNames = [
    `sb-${projectRef}-auth-token`,
    `sb-${projectRef}-auth-token-code-verifier`,
    `sb-${projectRef}-auth-token.0`,
    `sb-${projectRef}-auth-token.1`,
    `sb-${projectRef}-auth-token.2`,
    // Legacy/fallback names without project ref
    'sb-access-token',
    'sb-refresh-token',
    'sb-auth-token',
    'sb-auth-token-code-verifier',
  ];

  // Clear with multiple option combinations for maximum compatibility
  // Different browsers/environments may have set cookies with different options
  cookieNames.forEach(name => {
    // Basic clear
    response.cookies.set(name, '', {
      expires: new Date(0),
      maxAge: 0,
      path: '/',
    });

    // With secure flag (for HTTPS)
    response.cookies.set(name, '', {
      expires: new Date(0),
      maxAge: 0,
      path: '/',
      secure: true,
    });

    // With sameSite variations
    response.cookies.set(name, '', {
      expires: new Date(0),
      maxAge: 0,
      path: '/',
      secure: true,
      sameSite: 'lax',
    });

    response.cookies.set(name, '', {
      expires: new Date(0),
      maxAge: 0,
      path: '/',
      secure: true,
      sameSite: 'strict',
    });

    // With httpOnly (in case any were set this way)
    response.cookies.set(name, '', {
      expires: new Date(0),
      maxAge: 0,
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });
  });

  return response;
}
