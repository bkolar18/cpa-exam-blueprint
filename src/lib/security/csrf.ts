import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { logSuspiciousActivity } from './logging';

const CSRF_COOKIE_NAME = 'csrf_token';
const CSRF_HEADER_NAME = 'x-csrf-token';
const CSRF_TOKEN_LENGTH = 32;

/**
 * Generate a cryptographically secure CSRF token
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
}

/**
 * Get or create a CSRF token for the current session
 * Call this from a server component or API route to set the cookie
 */
export async function getOrCreateCSRFToken(): Promise<string> {
  const cookieStore = await cookies();
  const existingToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

  if (existingToken) {
    return existingToken;
  }

  const newToken = generateCSRFToken();
  // Note: Cookie setting needs to happen in a response context
  return newToken;
}

/**
 * Set CSRF token cookie on a response
 */
export function setCSRFCookie(response: NextResponse, token: string): NextResponse {
  response.cookies.set(CSRF_COOKIE_NAME, token, {
    httpOnly: false, // Must be readable by JavaScript
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });
  return response;
}

/**
 * Validate CSRF token from request header against cookie
 * Returns true if valid, false otherwise
 */
export async function validateCSRFToken(request: NextRequest): Promise<boolean> {
  try {
    const headerToken = request.headers.get(CSRF_HEADER_NAME);
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;

    if (!headerToken || !cookieToken) {
      return false;
    }

    // Constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(headerToken),
      Buffer.from(cookieToken)
    );
  } catch {
    return false;
  }
}

/**
 * CSRF protection middleware for API routes
 * Returns null if valid, or a 403 response if invalid
 *
 * Usage:
 * const csrfError = await csrfProtection(request);
 * if (csrfError) return csrfError;
 */
export async function csrfProtection(request: NextRequest): Promise<NextResponse | null> {
  // Skip CSRF check for GET, HEAD, OPTIONS (safe methods)
  const safeMethod = ['GET', 'HEAD', 'OPTIONS'].includes(request.method);
  if (safeMethod) {
    return null;
  }

  const isValid = await validateCSRFToken(request);

  if (!isValid) {
    // Log CSRF validation failure as suspicious activity
    logSuspiciousActivity(request, 'CSRF token validation failed', {
      hasHeaderToken: !!request.headers.get(CSRF_HEADER_NAME),
      method: request.method,
    }).catch(err => {
      console.error('Failed to log CSRF failure:', err);
    });

    return NextResponse.json(
      { error: 'Invalid or missing CSRF token' },
      { status: 403 }
    );
  }

  return null;
}

/**
 * API endpoint to get a new CSRF token
 * Call this from the client to get a token to include in requests
 */
export async function getCSRFTokenEndpoint(): Promise<NextResponse> {
  const token = generateCSRFToken();
  const response = NextResponse.json({ csrfToken: token });
  return setCSRFCookie(response, token);
}
