// Email sending service using Resend
import { Resend } from 'resend';
import { nurtureSequence, generateNurtureEmailHtml, NurtureEmail } from './nurture-sequence';
import { segmentEmails, generateSegmentEmailHtml, SegmentType } from './segment-content';
import { welcomeEmail, passwordResetEmail } from './templates/transactional';
import { generateUnsubscribeHeaders } from './utils/unsubscribe';
import { EMAIL_BRAND } from './constants';
import type { SendEmailResult } from './types';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration from constants
const FROM_EMAIL = `${EMAIL_BRAND.senders.marketing.name} <${EMAIL_BRAND.senders.marketing.email}>`;
const FROM_SUPPORT = `${EMAIL_BRAND.senders.support.name} <${EMAIL_BRAND.senders.support.email}>`;
const REPLY_TO = EMAIL_BRAND.senders.support.email;

/**
 * Send a welcome email to new users
 */
export async function sendWelcomeEmail(
  to: string,
  name?: string
): Promise<SendEmailResult> {
  const html = welcomeEmail({ to, name });

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      replyTo: REPLY_TO,
      subject: 'Welcome to Meridian CPA Review!',
      html,
      tags: [
        { name: 'type', value: 'transactional' },
        { name: 'template', value: 'welcome' },
      ],
    });

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send a password reset email
 */
export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
  expiresInHours = 1
): Promise<SendEmailResult> {
  const html = passwordResetEmail({ to, resetUrl, expiresInHours });

  try {
    const result = await resend.emails.send({
      from: FROM_SUPPORT,
      to: [to],
      replyTo: REPLY_TO,
      subject: 'Reset Your Password',
      html,
      tags: [
        { name: 'type', value: 'transactional' },
        { name: 'template', value: 'password-reset' },
      ],
    });

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send a nurture sequence email
 */
export async function sendNurtureEmail(
  to: string,
  emailId: number
): Promise<SendEmailResult> {
  const email = nurtureSequence.find(e => e.id === emailId);

  if (!email) {
    return { success: false, error: `Email ID ${emailId} not found in nurture sequence` };
  }

  const html = generateNurtureEmailHtml(email, to);
  const unsubscribeHeaders = generateUnsubscribeHeaders(to);

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      replyTo: REPLY_TO,
      subject: email.subject,
      html,
      headers: unsubscribeHeaders,
      tags: [
        { name: 'type', value: 'nurture' },
        { name: 'sequence', value: 'welcome' },
        { name: 'email_id', value: String(emailId) },
        { name: 'category', value: email.category },
      ],
    });

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending nurture email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send a segment-specific email
 */
export async function sendSegmentEmail(
  to: string,
  segment: SegmentType
): Promise<SendEmailResult> {
  const email = segmentEmails[segment];

  if (!email) {
    return { success: false, error: `Segment ${segment} not found` };
  }

  const html = generateSegmentEmailHtml(email, to);
  const unsubscribeHeaders = generateUnsubscribeHeaders(to);

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      replyTo: REPLY_TO,
      subject: email.subject,
      html,
      headers: unsubscribeHeaders,
      tags: [
        { name: 'type', value: 'segment' },
        { name: 'segment', value: segment },
      ],
    });

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending segment email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send a custom transactional email
 */
export async function sendCustomEmail(
  to: string,
  subject: string,
  html: string,
  options?: {
    tags?: { name: string; value: string }[];
    includeUnsubscribe?: boolean;
  }
): Promise<SendEmailResult> {
  const headers = options?.includeUnsubscribe
    ? generateUnsubscribeHeaders(to)
    : undefined;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      replyTo: REPLY_TO,
      subject,
      html,
      headers,
      tags: options?.tags,
    });

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending custom email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Calculate the next email to send based on signup date
 */
export function getNextNurtureEmail(
  signupDate: Date,
  currentEmailId: number
): NurtureEmail | null {
  const now = new Date();
  const daysSinceSignup = Math.floor(
    (now.getTime() - signupDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Find the next email that should be sent
  for (const email of nurtureSequence) {
    // Skip emails already sent
    if (email.id <= currentEmailId) continue;

    // Check if it's time to send this email
    if (daysSinceSignup >= email.dayOffset) {
      return email;
    }
  }

  return null;
}

/**
 * Check if user should receive a segment email
 * Returns the first segment email they haven't received
 */
export function getSegmentEmailToSend(
  segments: SegmentType[],
  sentSegments: SegmentType[]
): SegmentType | null {
  for (const segment of segments) {
    if (!sentSegments.includes(segment) && segmentEmails[segment]) {
      return segment;
    }
  }
  return null;
}

// Re-export types for convenience
export type { SendEmailResult } from './types';
