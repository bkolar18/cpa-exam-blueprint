import { createClient } from '@/lib/supabase/server';

interface RateLimitConfig {
  windowMs: number;      // Time window in milliseconds
  maxRequests: number;   // Max requests per window
}

// Rate limit configurations for different endpoints
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  // AI endpoints - expensive, limit more strictly
  'ai/generate-flashcard': { windowMs: 60000, maxRequests: 10 },
  'ai/generate-flashcards': { windowMs: 60000, maxRequests: 5 },
  'ai/study-guide': { windowMs: 60000, maxRequests: 5 },
  'ai/weekly-report': { windowMs: 60000, maxRequests: 3 },
  'ai/exam-debrief': { windowMs: 60000, maxRequests: 5 },
  'ai/pre-exam-assessment': { windowMs: 60000, maxRequests: 3 },
  'navigator': { windowMs: 60000, maxRequests: 20 },

  // User submission endpoints
  'feedback': { windowMs: 60000, maxRequests: 10 },
  'tbs/attempts': { windowMs: 60000, maxRequests: 30 },

  // Auth-related (stricter)
  'auth/login': { windowMs: 300000, maxRequests: 10 },  // 5 min window
  'auth/signup': { windowMs: 3600000, maxRequests: 5 }, // 1 hour window

  // Default for unspecified endpoints
  'default': { windowMs: 60000, maxRequests: 100 },
};

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  retryAfter?: number; // seconds until reset
}

/**
 * Check rate limit for a given identifier and endpoint
 * Uses in-memory cache with database fallback for distributed systems
 */
export async function checkRateLimit(
  identifier: string, // IP address or user ID
  endpoint: string
): Promise<RateLimitResult> {
  const config = RATE_LIMITS[endpoint] || RATE_LIMITS['default'];
  const windowStart = new Date(Math.floor(Date.now() / config.windowMs) * config.windowMs);
  const resetAt = new Date(windowStart.getTime() + config.windowMs);

  try {
    const supabase = await createClient();
    if (!supabase) {
      // If no database, allow request but log warning
      console.warn('Rate limiting: No database connection, allowing request');
      return { allowed: true, remaining: config.maxRequests - 1, resetAt };
    }

    // Try to increment or insert rate limit record
    const { data, error } = await supabase
      .from('rate_limits')
      .upsert(
        {
          identifier,
          endpoint,
          window_start: windowStart.toISOString(),
          request_count: 1,
        },
        {
          onConflict: 'identifier,endpoint,window_start',
          ignoreDuplicates: false,
        }
      )
      .select('request_count')
      .single();

    if (error) {
      // If upsert failed, try to get current count and increment
      const { data: existing } = await supabase
        .from('rate_limits')
        .select('request_count')
        .eq('identifier', identifier)
        .eq('endpoint', endpoint)
        .eq('window_start', windowStart.toISOString())
        .single();

      if (existing) {
        const newCount = existing.request_count + 1;
        await supabase
          .from('rate_limits')
          .update({ request_count: newCount })
          .eq('identifier', identifier)
          .eq('endpoint', endpoint)
          .eq('window_start', windowStart.toISOString());

        const remaining = Math.max(0, config.maxRequests - newCount);
        const allowed = newCount <= config.maxRequests;

        return {
          allowed,
          remaining,
          resetAt,
          retryAfter: allowed ? undefined : Math.ceil((resetAt.getTime() - Date.now()) / 1000),
        };
      }

      // No existing record, this is the first request
      return { allowed: true, remaining: config.maxRequests - 1, resetAt };
    }

    const count = data?.request_count || 1;
    const remaining = Math.max(0, config.maxRequests - count);
    const allowed = count <= config.maxRequests;

    return {
      allowed,
      remaining,
      resetAt,
      retryAfter: allowed ? undefined : Math.ceil((resetAt.getTime() - Date.now()) / 1000),
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // On error, allow the request but log it
    return { allowed: true, remaining: config.maxRequests - 1, resetAt };
  }
}

/**
 * Get client IP address from request headers
 */
export function getClientIP(request: Request): string {
  // Check various headers for the real IP
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Vercel-specific header
  const vercelIP = request.headers.get('x-vercel-forwarded-for');
  if (vercelIP) {
    return vercelIP.split(',')[0].trim();
  }

  return 'unknown';
}

/**
 * Rate limit middleware helper
 * Returns null if allowed, or a Response if rate limited
 */
export async function rateLimitMiddleware(
  request: Request,
  endpoint: string,
  userId?: string
): Promise<Response | null> {
  const identifier = userId || getClientIP(request);
  const result = await checkRateLimit(identifier, endpoint);

  if (!result.allowed) {
    return new Response(
      JSON.stringify({
        error: 'Too many requests',
        retryAfter: result.retryAfter,
        resetAt: result.resetAt.toISOString(),
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(result.retryAfter || 60),
          'X-RateLimit-Limit': String(RATE_LIMITS[endpoint]?.maxRequests || 100),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': result.resetAt.toISOString(),
        },
      }
    );
  }

  return null;
}
