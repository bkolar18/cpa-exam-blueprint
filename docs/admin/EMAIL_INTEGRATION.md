# Email Integration with Resend

## Overview

The admin dashboard supports sending email announcements to users via Resend. This document covers setup and configuration.

## Setup

### 1. Get Resend API Key

1. Go to [resend.com](https://resend.com) and sign in
2. Navigate to API Keys
3. Create a new API key or use your existing one

### 2. Configure Environment Variables

Add to your `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
EMAIL_FROM="CPA Exam Blueprint <noreply@yourdomain.com>"
```

For production (Vercel):
1. Go to Project Settings > Environment Variables
2. Add `RESEND_API_KEY` and `EMAIL_FROM`

### 3. Verify Your Domain (Recommended)

For production use, verify your domain in Resend:
1. Go to Resend Dashboard > Domains
2. Add your domain (e.g., cpa-exam-blueprint.com)
3. Add the DNS records Resend provides
4. Update `EMAIL_FROM` to use your verified domain

## Implementation Plan

### Phase 1: Basic Email Service

Create an email service module:

```typescript
// src/lib/email/resend.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[Email] Resend not configured - email not sent');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'CPA Exam Blueprint <onboarding@resend.dev>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });

    if (error) {
      console.error('[Email] Send failed:', error);
      return { success: false, error: error.message };
    }

    return { success: true, id: data?.id };
  } catch (error) {
    console.error('[Email] Send error:', error);
    return { success: false, error: String(error) };
  }
}
```

### Phase 2: Announcement Emails

Update the announcements API to actually send emails:

```typescript
// In /api/admin/announcements/route.ts POST handler

import { sendEmail } from '@/lib/email/resend';

// After storing the announcement...
// Send emails in batches to avoid rate limits
const BATCH_SIZE = 50;
const DELAY_MS = 1000;

for (let i = 0; i < recipientEmails.length; i += BATCH_SIZE) {
  const batch = recipientEmails.slice(i, i + BATCH_SIZE);

  await Promise.all(
    batch.map(email => sendEmail({
      to: email,
      subject,
      html: generateAnnouncementHtml(messageBody),
    }))
  );

  // Delay between batches
  if (i + BATCH_SIZE < recipientEmails.length) {
    await new Promise(resolve => setTimeout(resolve, DELAY_MS));
  }
}
```

### Phase 3: Email Templates

Create reusable email templates:

```typescript
// src/lib/email/templates/announcement.ts
export function generateAnnouncementHtml(body: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 32px 40px 24px; text-align: center; border-bottom: 1px solid #e5e7eb;">
              <h1 style="margin: 0; color: #3b82f6; font-size: 24px; font-weight: bold;">
                CPA Exam Blueprint
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 40px;">
              <div style="color: #374151; font-size: 16px; line-height: 1.6;">
                ${body.replace(/\n/g, '<br>')}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 8px 8px; text-align: center;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                You're receiving this email because you have an account on CPA Exam Blueprint.
              </p>
              <p style="margin: 12px 0 0; color: #9ca3af; font-size: 12px;">
                <a href="https://cpa-exam-blueprint.com" style="color: #3b82f6; text-decoration: none;">
                  cpa-exam-blueprint.com
                </a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
```

## Rate Limits

Resend has the following limits:
- Free tier: 100 emails/day, 3,000 emails/month
- Pro tier: Higher limits based on plan

For bulk announcements:
- Send in batches of 50
- Add 1 second delay between batches
- Consider using a background job for large sends

## Testing

Test email sending locally:
1. Set up your Resend API key in `.env.local`
2. Use `onboarding@resend.dev` as the from address (works without domain verification)
3. Send a test announcement to yourself

## Dependencies

Install the Resend SDK:

```bash
npm install resend
```

## Environment Variables Summary

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Your Resend API key |
| `EMAIL_FROM` | No | From address (defaults to onboarding@resend.dev) |
