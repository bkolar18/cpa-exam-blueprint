/**
 * Error Tracking Utility
 *
 * Provides centralized error tracking that can be connected to Sentry or other
 * services. For now, logs errors to console in development and can be extended
 * to send to external services in production.
 *
 * To add Sentry later:
 * 1. Run: npx @sentry/wizard@latest -i nextjs
 * 2. Import Sentry in this file
 * 3. Replace the captureException implementation
 */

type ErrorSeverity = 'fatal' | 'error' | 'warning' | 'info';

interface ErrorContext {
  // User information
  userId?: string;
  userEmail?: string;

  // Error context
  component?: string;
  action?: string;

  // Additional data
  extra?: Record<string, unknown>;

  // Tags for filtering
  tags?: Record<string, string>;
}

interface TrackedError {
  message: string;
  stack?: string;
  severity: ErrorSeverity;
  context: ErrorContext;
  timestamp: string;
  url: string;
  userAgent: string;
}

// In-memory buffer for errors (useful for debugging)
const errorBuffer: TrackedError[] = [];
const MAX_BUFFER_SIZE = 50;

/**
 * Capture and track an exception
 */
export function captureException(
  error: Error | unknown,
  context: ErrorContext = {},
  severity: ErrorSeverity = 'error'
): void {
  const errorObj = error instanceof Error ? error : new Error(String(error));

  const trackedError: TrackedError = {
    message: errorObj.message,
    stack: errorObj.stack,
    severity,
    context,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : 'server',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
  };

  // Add to buffer
  errorBuffer.push(trackedError);
  if (errorBuffer.length > MAX_BUFFER_SIZE) {
    errorBuffer.shift();
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Tracking]', {
      message: trackedError.message,
      severity,
      context,
      stack: trackedError.stack,
    });
  }

  // In production, this is where you'd send to Sentry/LogRocket/etc.
  // Example Sentry integration:
  // if (typeof Sentry !== 'undefined') {
  //   Sentry.withScope((scope) => {
  //     scope.setLevel(severity);
  //     scope.setTags(context.tags || {});
  //     scope.setExtras(context.extra || {});
  //     if (context.userId) scope.setUser({ id: context.userId, email: context.userEmail });
  //     Sentry.captureException(errorObj);
  //   });
  // }
}

/**
 * Capture a message (non-exception event)
 */
export function captureMessage(
  message: string,
  context: ErrorContext = {},
  severity: ErrorSeverity = 'info'
): void {
  const trackedError: TrackedError = {
    message,
    severity,
    context,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : 'server',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server',
  };

  errorBuffer.push(trackedError);
  if (errorBuffer.length > MAX_BUFFER_SIZE) {
    errorBuffer.shift();
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Error Tracking]', { message, severity, context });
  }
}

/**
 * Set user context for error tracking
 */
let currentUser: { id?: string; email?: string } = {};

export function setUser(idOrUser: string | { id?: string; email?: string } | null, email?: string | null): void {
  if (idOrUser === null) {
    currentUser = {};
  } else if (typeof idOrUser === 'string') {
    currentUser = { id: idOrUser, email: email || undefined };
  } else {
    currentUser = idOrUser || {};
  }

  // Example Sentry integration:
  // if (typeof Sentry !== 'undefined') {
  //   Sentry.setUser(currentUser.id ? { id: currentUser.id, email: currentUser.email } : null);
  // }
}

export function getUser(): { id?: string; email?: string } {
  return currentUser;
}

/**
 * Get recent errors (useful for debugging)
 */
export function getRecentErrors(): TrackedError[] {
  return [...errorBuffer];
}

/**
 * Clear error buffer
 */
export function clearErrors(): void {
  errorBuffer.length = 0;
}

/**
 * Track auth-specific errors with context
 */
export function trackAuthError(
  action: string,
  errorMessage: string,
  extra?: Record<string, unknown>
): void {
  captureException(new Error(errorMessage), {
    component: 'auth',
    action,
    extra,
    tags: { category: 'authentication' },
  });
}

/**
 * Track API errors
 */
export function trackApiError(
  error: Error | unknown,
  endpoint: string,
  method: string,
  statusCode?: number
): void {
  captureException(error, {
    component: 'api',
    action: `${method} ${endpoint}`,
    extra: { statusCode },
    tags: { category: 'api', endpoint, method },
  });
}

/**
 * Create an error boundary handler
 */
export function createErrorBoundaryHandler(componentName: string) {
  return (error: Error, errorInfo: { componentStack: string }) => {
    captureException(error, {
      component: componentName,
      action: 'render',
      extra: { componentStack: errorInfo.componentStack },
      tags: { category: 'react_error_boundary' },
    }, 'fatal');
  };
}
