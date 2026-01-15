import { Resend } from 'resend';

/**
 * Initialize Resend client
 * Make sure RESEND_API_KEY is set in your environment variables
 */
export const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * 1) SYSTEM / AUTH EMAILS
 * From: no-reply@meridiancpareview.com
 * Replies go to: support@meridiancpareview.com
 */
export async function sendSystemEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return resend.emails.send({
    from: 'Meridian CPA Review <no-reply@meridiancpareview.com>',
    replyTo: 'support@meridiancpareview.com',
    to,
    subject,
    html,
  });
}

/**
 * 2) SUPPORT EMAILS
 * From: support@meridiancpareview.com
 * Used for human responses and follow-ups
 */
export async function sendSupportEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return resend.emails.send({
    from: 'Meridian CPA Review Support <support@meridiancpareview.com>',
    to,
    subject,
    html,
  });
}

/**
 * 3) GENERAL / ONBOARDING / ANNOUNCEMENTS
 * From: hello@meridiancpareview.com
 */
export async function sendGeneralEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  return resend.emails.send({
    from: 'Meridian CPA Review <hello@meridiancpareview.com>',
    to,
    subject,
    html,
  });
}
