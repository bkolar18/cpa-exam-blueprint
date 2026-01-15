# Security Documentation

**Meridian CPA Review - Security Hardening Implementation**

Last Updated: January 2026

---

## Table of Contents

1. [Overview](#overview)
2. [Security Headers](#security-headers)
3. [Rate Limiting](#rate-limiting)
4. [Input Validation](#input-validation)
5. [Security Event Logging](#security-event-logging)
6. [Database Security](#database-security)
7. [Content Security Policy](#content-security-policy)
8. [Environment Variables](#environment-variables)
9. [API Route Security](#api-route-security)
10. [Security Monitoring](#security-monitoring)

---

## Overview

This document describes the security measures implemented in the Meridian CPA Review application to protect against common web vulnerabilities and attacks.

### Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Request                            │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Security Headers (next.config.ts)             │
│  • X-Frame-Options: DENY                                         │
│  • X-Content-Type-Options: nosniff                              │
│  • Content-Security-Policy                                       │
│  • Strict-Transport-Security                                     │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Rate Limiting (rate-limit.ts)                 │
│  • Per-endpoint limits                                           │
│  • User/IP based tracking                                        │
│  • Sliding window algorithm                                      │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                 Authentication (Supabase Auth)                   │
│  • JWT validation                                                │
│  • Session management                                            │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                Input Validation (validation.ts)                  │
│  • Type checking                                                 │
│  • Length limits                                                 │
│  • XSS/SQL injection detection                                   │
│  • Section code validation                                       │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                Security Logging (logging.ts)                     │
│  • Event recording                                               │
│  • Severity classification                                       │
│  • IP/User tracking                                              │
└─────────────────────────────────────────────────────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Database (Supabase)                           │
│  • Row Level Security (RLS)                                      │
│  • Service role isolation                                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Security Headers

**File:** `next.config.ts`

All HTTP responses include security headers to protect against common attacks:

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Frame-Options` | `DENY` | Prevents clickjacking attacks |
| `X-Content-Type-Options` | `nosniff` | Prevents MIME type sniffing |
| `X-XSS-Protection` | `1; mode=block` | XSS filter for legacy browsers |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Controls referrer information |
| `Permissions-Policy` | `camera=(), microphone=(), ...` | Disables unused browser APIs |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Forces HTTPS |
| `Content-Security-Policy` | See [CSP section](#content-security-policy) | XSS prevention |

---

## Rate Limiting

**File:** `src/lib/security/rate-limit.ts`

### Configuration

Rate limits are configured per endpoint to prevent abuse:

| Endpoint | Window | Max Requests | Purpose |
|----------|--------|--------------|---------|
| `ai/generate-flashcard` | 1 min | 10 | AI resource protection |
| `ai/generate-flashcards` | 1 min | 5 | AI resource protection |
| `ai/study-guide` | 1 min | 5 | AI resource protection |
| `ai/weekly-report` | 1 min | 3 | AI resource protection |
| `ai/exam-debrief` | 1 min | 5 | AI resource protection |
| `ai/pre-exam-assessment` | 1 min | 3 | AI resource protection |
| `navigator` | 1 min | 20 | AI assistant protection |
| `feedback` | 1 min | 10 | Spam prevention |
| `tbs/attempts` | 1 min | 30 | Practice session support |
| `auth/login` | 5 min | 10 | Brute force prevention |
| `auth/signup` | 1 hour | 5 | Account spam prevention |
| `default` | 1 min | 100 | General API protection |

### Implementation

```typescript
import { rateLimitMiddleware } from '@/lib/security/rate-limit';
import { logRateLimitExceeded } from '@/lib/security/logging';

// In API route handler:
const rateLimitResponse = await rateLimitMiddleware(request, 'endpoint-name', user.id);
if (rateLimitResponse) {
  await logRateLimitExceeded(request, 'endpoint-name', user.id);
  return rateLimitResponse;
}
```

### Response Headers

When rate limited, clients receive:
- HTTP 429 status code
- `Retry-After` header with seconds until reset
- `X-RateLimit-Limit` with the max requests allowed
- `X-RateLimit-Remaining` with remaining requests
- `X-RateLimit-Reset` with ISO timestamp of reset time

---

## Input Validation

**File:** `src/lib/security/validation.ts`

### Valid Section Codes

Only these CPA exam sections are accepted:
- `FAR` - Financial Accounting and Reporting
- `AUD` - Auditing and Attestation
- `REG` - Regulation
- `TCP` - Tax Compliance and Planning
- `BAR` - Business Analysis and Reporting
- `ISC` - Information Systems and Controls

### Maximum Field Lengths

| Field | Max Length | Purpose |
|-------|------------|---------|
| `comment` | 5,000 chars | User feedback |
| `notes` | 10,000 chars | Study notes |
| `email` | 254 chars | Email addresses |
| `name` | 200 chars | User names |
| `questionId` | 100 chars | Question identifiers |
| `topic` | 200 chars | Topic names |
| `subject` | 500 chars | Email subjects |
| `body` | 50,000 chars | Large text content |
| `url` | 2,048 chars | URLs |
| `searchQuery` | 500 chars | Search terms |

### Suspicious Input Detection

The system detects and blocks:
- XSS attempts: `<script`, `javascript:`, event handlers
- SQL injection: `UNION SELECT`, `DROP TABLE`, `'1'='1`
- Path traversal: `../`
- Null byte injection: `%00`

### Usage

```typescript
import { validateSection, validateLength, validateRequired, MAX_LENGTHS } from '@/lib/security/validation';

// Validate required field
const questionIdValidation = validateRequired(questionId, 'questionId', MAX_LENGTHS.questionId, request);
if (!questionIdValidation.valid) {
  return validationErrorResponse(questionIdValidation.error!);
}

// Validate section code
const sectionValidation = validateSection(section, request);
if (!sectionValidation.valid) {
  return validationErrorResponse(sectionValidation.error!);
}

// Validate optional field length
const messageValidation = validateLength(message, 'message', MAX_LENGTHS.body, request);
if (!messageValidation.valid) {
  return validationErrorResponse(messageValidation.error!);
}
```

---

## Security Event Logging

**File:** `src/lib/security/logging.ts`

### Event Types

| Event Type | Severity | Description |
|------------|----------|-------------|
| `auth_failure` | Medium | Failed authentication attempt |
| `auth_success` | Low | Successful authentication |
| `rate_limit_exceeded` | Medium | Rate limit triggered |
| `invalid_input` | Low | Invalid input received |
| `unauthorized_access` | High | Access to forbidden resource |
| `admin_access` | Low | Admin action performed |
| `suspicious_activity` | High | Potential attack detected |
| `csp_violation` | Medium | CSP rule violated |
| `api_error` | Medium | API error occurred |
| `validation_failure` | Low | Validation check failed |

### Severity Levels

- **Low**: Informational, normal operations
- **Medium**: Potential issue, monitor trends
- **High**: Security concern, investigate promptly
- **Critical**: Active attack, immediate action required

### Usage

```typescript
import { logAuthFailure, logRateLimitExceeded, logUnauthorizedAccess, logSuspiciousActivity } from '@/lib/security/logging';

// Log auth failure
await logAuthFailure(request, 'Invalid credentials', email);

// Log rate limit exceeded
await logRateLimitExceeded(request, 'navigator', user.id);

// Log unauthorized access
await logUnauthorizedAccess(request, 'admin-panel', user.id, user.email);

// Log suspicious activity
await logSuspiciousActivity(request, 'XSS attempt detected', { field: 'comment' });
```

---

## Database Security

**File:** `supabase/migrations/20260114_security_enhancements.sql`

### Tables

#### `security_events`
Stores all security-related events for auditing and monitoring.

```sql
CREATE TABLE security_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  ip_address TEXT,
  user_agent TEXT,
  endpoint TEXT,
  method TEXT,
  status_code INTEGER,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `rate_limits`
Tracks request counts for rate limiting with sliding window.

```sql
CREATE TABLE rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier TEXT NOT NULL,  -- IP address or user ID
  endpoint TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  request_count INTEGER DEFAULT 1,
  UNIQUE(identifier, endpoint, window_start)
);
```

#### `csp_reports`
Stores Content Security Policy violation reports.

```sql
CREATE TABLE csp_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_uri TEXT,
  referrer TEXT,
  violated_directive TEXT,
  effective_directive TEXT,
  original_policy TEXT,
  disposition TEXT,
  blocked_uri TEXT,
  status_code INTEGER,
  script_sample TEXT,
  source_file TEXT,
  line_number INTEGER,
  column_number INTEGER,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)

All security tables are protected with RLS:
- Only `service_role` can access security tables
- User profiles cannot be deleted directly (cascade only)
- Users can only access their own data

### Security Dashboard View

```sql
CREATE VIEW security_summary AS
SELECT
  event_type,
  severity,
  COUNT(*) as count,
  MAX(created_at) as last_occurrence
FROM security_events
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY event_type, severity
ORDER BY severity, count DESC;
```

---

## Content Security Policy

**File:** `next.config.ts`

### Policy Directives

| Directive | Value | Purpose |
|-----------|-------|---------|
| `default-src` | `'self'` | Default to same-origin |
| `script-src` | `'self' 'unsafe-inline' 'unsafe-eval' vercel.live` | Scripts from trusted sources |
| `style-src` | `'self' 'unsafe-inline'` | Styles from same-origin |
| `img-src` | `'self' data: blob: https:` | Images from any HTTPS |
| `font-src` | `'self' data:` | Fonts from same-origin |
| `connect-src` | `'self' supabase anthropic resend vercel` | API connections |
| `frame-ancestors` | `'none'` | Prevent embedding |
| `base-uri` | `'self'` | Restrict base URLs |
| `form-action` | `'self'` | Form submissions |

### CSP Reporting

**Endpoint:** `/api/csp-report`

Violations are reported to the database and logged:

```typescript
// CSP Report Endpoint
export async function POST(request: Request) {
  const body = await request.json();
  const report = body['csp-report'];

  // Store in database
  await supabase.from('csp_reports').insert({
    violated_directive: report['violated-directive'],
    blocked_uri: report['blocked-uri'],
    // ... other fields
  });
}
```

---

## Environment Variables

**File:** `.env.example`

### Required Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `ANTHROPIC_API_KEY` | Anthropic API key for Navigator |
| `RESEND_API_KEY` | Resend API key for emails |
| `EMAIL_TO` | Feedback recipient email |
| `ADMIN_EMAILS` | Comma-separated admin emails |

### Security Notes

- Never commit `.env.local` to version control
- `.env.example` contains only placeholder values
- Rotate API keys if exposed
- Use different keys for development/production

---

## API Route Security

### Security Integration Pattern

All API routes should follow this pattern:

```typescript
import { createClient } from '@/lib/supabase/server';
import { rateLimitMiddleware } from '@/lib/security/rate-limit';
import { logRateLimitExceeded, logAuthFailure, logUnauthorizedAccess } from '@/lib/security/logging';
import { validateSection, validateLength, validateRequired, MAX_LENGTHS, validationErrorResponse } from '@/lib/security/validation';

export async function POST(request: Request) {
  // 1. Authentication
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    await logAuthFailure(request, 'No authenticated user');
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  // 2. Rate Limiting
  const rateLimitResponse = await rateLimitMiddleware(request, 'endpoint-name', user.id);
  if (rateLimitResponse) {
    await logRateLimitExceeded(request, 'endpoint-name', user.id);
    return rateLimitResponse;
  }

  // 3. Input Validation
  const body = await request.json();

  const sectionValidation = validateSection(body.section, request);
  if (!sectionValidation.valid) {
    return validationErrorResponse(sectionValidation.error!);
  }

  // 4. Business Logic
  // ... process request

  // 5. Return Response
  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
```

### Protected Routes

The following routes have security integration:
- `/api/feedback` - Rate limited, input validated
- `/api/navigator` - Rate limited, message length validated

---

## Security Monitoring

### Querying Security Events

```sql
-- Recent high-severity events
SELECT * FROM security_events
WHERE severity IN ('high', 'critical')
AND created_at >= NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- Rate limit violations by IP
SELECT ip_address, COUNT(*) as violations
FROM security_events
WHERE event_type = 'rate_limit_exceeded'
AND created_at >= NOW() - INTERVAL '24 hours'
GROUP BY ip_address
ORDER BY violations DESC;

-- Auth failures by email
SELECT user_email, COUNT(*) as failures
FROM security_events
WHERE event_type = 'auth_failure'
AND created_at >= NOW() - INTERVAL '24 hours'
GROUP BY user_email
HAVING COUNT(*) > 3;

-- CSP violations summary
SELECT violated_directive, COUNT(*) as count
FROM csp_reports
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY violated_directive
ORDER BY count DESC;
```

### Automated Cleanup

The `cleanup_old_rate_limits()` function removes rate limit records older than 1 hour to prevent table bloat.

```sql
-- Run manually or via cron
SELECT cleanup_old_rate_limits();
```

---

## Security Checklist

- [x] Security headers configured in `next.config.ts`
- [x] Rate limiting implemented with database tracking
- [x] Input validation with length limits and sanitization
- [x] XSS/SQL injection pattern detection
- [x] Security event logging with severity levels
- [x] CSP violation reporting endpoint
- [x] Row Level Security on all security tables
- [x] Profile DELETE restriction (cascade only)
- [x] Environment variables template created
- [x] No secrets committed to git history
- [x] HTTPS enforced via HSTS header

---

## Future Considerations

1. **CAPTCHA Integration**: Consider adding CAPTCHA for auth endpoints
2. **IP Blocklist**: Implement automatic IP blocking after repeated violations
3. **Anomaly Detection**: Add ML-based anomaly detection for unusual patterns
4. **Security Alerts**: Set up automated alerts for critical events
5. **Penetration Testing**: Schedule regular security audits
6. **Two-Factor Authentication**: Consider adding 2FA for admin accounts

---

## References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
