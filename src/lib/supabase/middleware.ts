import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Timeout for getUser call (5 seconds)
const AUTH_TIMEOUT_MS = 5000;

/**
 * Wraps a promise with a timeout to prevent hanging
 */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Auth timeout')), ms)
    ),
  ]);
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Skip if Supabase is not configured
  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse
  }

  // Skip session refresh on login page with logout reason
  // This prevents the middleware from restoring a session we're trying to clear
  const pathname = request.nextUrl.pathname;
  const hasLogoutReason = request.nextUrl.searchParams.has('reason');

  if (pathname === '/login' && hasLogoutReason) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refreshing the auth token with timeout and error handling
  // This is important for keeping sessions alive, but we don't want it to hang
  try {
    await withTimeout(supabase.auth.getUser(), AUTH_TIMEOUT_MS);
  } catch (error) {
    // Log error but don't fail the request
    // The client-side auth will handle expired sessions
    if (error instanceof Error && error.message === 'Auth timeout') {
      console.error('Middleware auth refresh timed out');
    } else {
      console.error('Middleware auth refresh error:', error);
    }
  }

  return supabaseResponse
}
