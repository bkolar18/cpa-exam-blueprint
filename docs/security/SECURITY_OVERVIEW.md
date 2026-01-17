# Security Implementation Overview

This document provides a comprehensive overview of the security measures implemented in the Meridian CPA Review application.

## Table of Contents

1. [Authentication & Authorization](#authentication--authorization)
2. [Content Security Policy (CSP)](#content-security-policy)
3. [Rate Limiting](#rate-limiting)
4. [CSRF Protection](#csrf-protection)
5. [Input Validation](#input-validation)
6. [Security Headers](#security-headers)
7. [Admin Access Control](#admin-access-control)
8. [Activity Logging](#activity-logging)

---

## Authentication & Authorization

### Supabase Auth

- All authentication is handled via Supabase Auth
- JWT tokens are used for session management
- Tokens are stored in HTTP-only cookies (via Supabase middleware)

### Protected Routes

- Dashboard routes require authentication (`/dashboard/*`)
- Admin routes require both authentication AND admin email verification (`/admin/*`)

### Admin Authorization

Admin access is controlled via server-side email verification:

```typescript
// Server-side only (not exposed to client)
const adminEmails = process.env.ADMIN_EMAILS?.split(',');
```

The `/api/auth/admin-status` endpoint provides a secure way to check admin status without exposing admin emails to the client.

---

## Content Security Policy

The CSP is configured in `next.config.ts` with environment-aware settings:

### Production CSP

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https:;
font-src 'self' data:;
connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com https://api.resend.com https://www.google-analytics.com https://analytics.google.com;
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

### Development CSP

Adds:
- `'unsafe-eval'` for hot reloading
- Vercel dev tools domains

### CSP Reporting

CSP violations are reported to `/api/csp-report` for monitoring.

---

## Rate Limiting

Rate limiting is implemented in `src/lib/security/rate-limit.ts` using database-backed tracking.

### Configured Limits

| Endpoint | Window | Max Requests |
|----------|--------|--------------|
| AI endpoints | 1 min | 3-10 |
| Navigator | 1 min | 20 |
| Feedback | 1 min | 10 |
| TBS attempts | 1 min | 30 |
| Auth login | 5 min | 10 |
| Auth signup | 1 hour | 5 |
| Email subscriptions | 1 hour | 5-10 |
| Admin status | 1 min | 30 |
| Default | 1 min | 100 |

### Usage

```typescript
import { rateLimitMiddleware } from '@/lib/security/rate-limit';

export async function POST(request: Request) {
  const rateLimitResponse = await rateLimitMiddleware(request, 'endpoint-name', userId);
  if (rateLimitResponse) return rateLimitResponse;
  // ... rest of handler
}
```

---

## CSRF Protection

CSRF protection is available via `src/lib/security/csrf.ts`.

### Token Management

1. Client calls `GET /api/auth/csrf` to get a token
2. Token is set in a cookie (readable by JS)
3. Client includes token in `x-csrf-token` header for POST/PUT/DELETE requests

### Usage (Server)

```typescript
import { csrfProtection } from '@/lib/security/csrf';

export async function POST(request: NextRequest) {
  const csrfError = await csrfProtection(request);
  if (csrfError) return csrfError;
  // ... rest of handler
}
```

### Usage (Client)

```typescript
import { useCSRFToken } from '@/hooks/useCSRFToken';

function MyComponent() {
  const { secureFetch, getHeaders } = useCSRFToken();

  const handleSubmit = async () => {
    await secureFetch('/api/endpoint', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };
}
```

---

## Input Validation

Validation utilities are in `src/lib/security/validation.ts`.

### Available Validators

- `validateSection(section)` - Validates CPA exam section codes
- `validateEmail(email)` - Email format validation
- `validateLength(value, field, max)` - String length limits
- `validateRequired(value, field, max)` - Required field + length
- `validateUUID(value, field)` - UUID format validation
- `validatePositiveInt(value, field, max)` - Positive integer validation
- `sanitizeString(value)` - HTML entity encoding

### Suspicious Input Detection

The validation library includes detection for:
- SQL injection patterns
- XSS attempts
- Script tags
- Event handlers

### Example Usage

```typescript
import { validateSection, validateRequired, MAX_LENGTHS, validationErrorResponse } from '@/lib/security/validation';

const sectionResult = validateSection(body.section, request);
if (!sectionResult.valid) {
  return validationErrorResponse(sectionResult.error!);
}
```

---

## Security Headers

All responses include these security headers (configured in `next.config.ts`):

| Header | Value | Purpose |
|--------|-------|---------|
| X-Frame-Options | DENY | Prevents clickjacking |
| X-Content-Type-Options | nosniff | Prevents MIME sniffing |
| X-XSS-Protection | 1; mode=block | XSS filter (legacy) |
| Referrer-Policy | strict-origin-when-cross-origin | Controls referrer info |
| Permissions-Policy | camera=(), microphone=(), etc. | Disables unused features |
| Strict-Transport-Security | max-age=31536000 | Forces HTTPS |

---

## Admin Access Control

### Server-Side Verification

Admin layout (`/app/admin/layout.tsx`) verifies admin status server-side:

```typescript
function isAdminEmail(email: string): boolean {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',');
  return adminEmails.includes(email.toLowerCase());
}
```

### API Route Protection

Admin API routes use `requireAdmin()`:

```typescript
import { requireAdmin } from '@/lib/admin/auth';

export async function GET(request: Request) {
  const admin = await requireAdmin(); // Throws if not admin
  // ... admin-only logic
}
```

### Client-Side Check (Secure)

The client uses `useAdminStatus()` hook which calls a secure API:

```typescript
import { useAdminStatus } from '@/hooks/useAdminStatus';

function Component() {
  const { isAdmin, isLoading } = useAdminStatus();
  // ...
}
```

---

## Activity Logging

### Admin Actions

All admin actions are logged via `logAdminAction()`:

```typescript
await logAdminAction(ActionTypes.FEEDBACK_RESOLVED, {
  targetType: 'feedback',
  targetId: feedbackId,
  metadata: { status, notes },
});
```

### Security Events

Security-related events are logged via `src/lib/security/logging.ts`:

- `logValidationFailure()` - Input validation failures
- `logSuspiciousActivity()` - Potential attack attempts
- `logRateLimitExceeded()` - Rate limit hits
- `logAuthFailure()` - Authentication failures
- `logUnauthorizedAccess()` - Access denied events

---

## Environment Variables

### Required (Server-side only)

```bash
# Admin configuration
ADMIN_EMAILS=admin1@example.com,admin2@example.com

# Supabase (service role for admin operations)
SUPABASE_SERVICE_ROLE_KEY=...
```

### Public (Client-safe)

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Deprecated

```bash
# DO NOT USE - exposes admin emails to client
# NEXT_PUBLIC_ADMIN_EMAILS=...
```

---

## Recommendations for Future Improvements

1. **Nonce-based CSP**: Implement nonce generation for inline scripts to remove `'unsafe-inline'`

2. **Expand Validation Usage**: Apply validation library to more API routes

3. **Session Timeout**: Implement automatic session timeout after inactivity

4. **RLS Policy Audit**: Regular audit of Supabase Row Level Security policies

5. **Penetration Testing**: Schedule regular security assessments

6. **Dependency Scanning**: Automate npm audit in CI/CD pipeline

---

## Security Contacts

For security concerns, contact the development team via the internal channels.

Last Updated: January 2026
