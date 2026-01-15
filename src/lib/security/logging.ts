import { createClient } from '@/lib/supabase/server';
import { getClientIP } from './rate-limit';

export type SecurityEventType =
  | 'auth_failure'
  | 'auth_success'
  | 'rate_limit_exceeded'
  | 'invalid_input'
  | 'unauthorized_access'
  | 'admin_access'
  | 'suspicious_activity'
  | 'csp_violation'
  | 'api_error'
  | 'validation_failure';

export type SecuritySeverity = 'low' | 'medium' | 'high' | 'critical';

interface SecurityEventData {
  eventType: SecurityEventType;
  severity: SecuritySeverity;
  userId?: string;
  userEmail?: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
  details?: Record<string, unknown>;
  request?: Request;
}

/**
 * Log a security event to the database
 */
export async function logSecurityEvent(data: SecurityEventData): Promise<void> {
  try {
    const supabase = await createClient();
    if (!supabase) {
      console.warn('Security logging: No database connection');
      console.log('SECURITY EVENT:', JSON.stringify(data, null, 2));
      return;
    }

    const ipAddress = data.request ? getClientIP(data.request) : undefined;
    const userAgent = data.request?.headers.get('user-agent') || undefined;

    await supabase.from('security_events').insert({
      event_type: data.eventType,
      severity: data.severity,
      user_id: data.userId,
      user_email: data.userEmail,
      ip_address: ipAddress,
      user_agent: userAgent,
      endpoint: data.endpoint,
      method: data.method,
      status_code: data.statusCode,
      details: data.details || {},
    });
  } catch (error) {
    // Don't throw - logging shouldn't break the main operation
    console.error('Failed to log security event:', error);
    console.log('SECURITY EVENT (fallback):', JSON.stringify(data, null, 2));
  }
}

/**
 * Log authentication failure
 */
export async function logAuthFailure(
  request: Request,
  reason: string,
  email?: string
): Promise<void> {
  await logSecurityEvent({
    eventType: 'auth_failure',
    severity: 'medium',
    userEmail: email,
    endpoint: new URL(request.url).pathname,
    method: request.method,
    statusCode: 401,
    details: { reason },
    request,
  });
}

/**
 * Log rate limit exceeded
 */
export async function logRateLimitExceeded(
  request: Request,
  endpoint: string,
  userId?: string
): Promise<void> {
  await logSecurityEvent({
    eventType: 'rate_limit_exceeded',
    severity: 'medium',
    userId,
    endpoint,
    method: request.method,
    statusCode: 429,
    details: {
      userAgent: request.headers.get('user-agent'),
    },
    request,
  });
}

/**
 * Log unauthorized access attempt
 */
export async function logUnauthorizedAccess(
  request: Request,
  resource: string,
  userId?: string,
  userEmail?: string
): Promise<void> {
  await logSecurityEvent({
    eventType: 'unauthorized_access',
    severity: 'high',
    userId,
    userEmail,
    endpoint: new URL(request.url).pathname,
    method: request.method,
    statusCode: 403,
    details: { resource },
    request,
  });
}

/**
 * Log admin access
 */
export async function logAdminAccess(
  request: Request,
  action: string,
  userId: string,
  userEmail: string
): Promise<void> {
  await logSecurityEvent({
    eventType: 'admin_access',
    severity: 'low',
    userId,
    userEmail,
    endpoint: new URL(request.url).pathname,
    method: request.method,
    statusCode: 200,
    details: { action },
    request,
  });
}

/**
 * Log validation failure (potential attack)
 */
export async function logValidationFailure(
  request: Request,
  field: string,
  reason: string,
  value?: unknown
): Promise<void> {
  // Don't log the actual value if it might contain sensitive data
  const safeValue = typeof value === 'string' && value.length > 100
    ? `[string of length ${value.length}]`
    : value;

  await logSecurityEvent({
    eventType: 'validation_failure',
    severity: 'low',
    endpoint: new URL(request.url).pathname,
    method: request.method,
    statusCode: 400,
    details: { field, reason, valueType: typeof value, valuePreview: safeValue },
    request,
  });
}

/**
 * Log suspicious activity
 */
export async function logSuspiciousActivity(
  request: Request,
  reason: string,
  details?: Record<string, unknown>
): Promise<void> {
  await logSecurityEvent({
    eventType: 'suspicious_activity',
    severity: 'high',
    endpoint: new URL(request.url).pathname,
    method: request.method,
    details: { reason, ...details },
    request,
  });
}

/**
 * Detect and log potential security issues in input
 */
export function detectSuspiciousInput(value: string): boolean {
  const suspiciousPatterns = [
    /<script/i,                    // XSS attempt
    /javascript:/i,                // XSS attempt
    /on\w+\s*=/i,                 // Event handler injection
    /union\s+select/i,            // SQL injection
    /;\s*drop\s+table/i,          // SQL injection
    /'\s*or\s+'1'\s*=\s*'1/i,     // SQL injection
    /\.\.\//,                      // Path traversal
    /%00/,                         // Null byte injection
  ];

  return suspiciousPatterns.some(pattern => pattern.test(value));
}
