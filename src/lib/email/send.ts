// Email sending service using Resend
import { Resend } from 'resend';
import { nurtureSequence, generateNurtureEmailHtml, NurtureEmail } from './nurture-sequence';
import { segmentEmails, SegmentEmail, SegmentType } from './segment-content';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
const FROM_EMAIL = process.env.EMAIL_FROM || 'Meridian CPA Review <hello@cpaexamblueprint.com>';
const REPLY_TO = process.env.EMAIL_REPLY_TO || 'support@cpaexamblueprint.com';

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
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

  const html = generateNurtureEmailHtml(email);

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      replyTo: REPLY_TO,
      subject: email.subject,
      html,
      tags: [
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
 * Generate HTML for segment-specific emails
 */
function generateSegmentEmailHtml(email: SegmentEmail): string {
  const resourcesHtml = email.content.resources
    ? `<div class="resources">
        <h3>Recommended Resources</h3>
        ${email.content.resources.map(r => `
          <div class="resource">
            <a href="${r.url}" class="resource-title">${r.title}</a>
            <p class="resource-desc">${r.description}</p>
          </div>
        `).join('')}
       </div>`
    : '';

  const ctaHtml = email.content.callToAction
    ? `<div class="cta">
        <a href="${email.content.callToAction.url}" class="button">${email.content.callToAction.text}</a>
       </div>`
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.7;
      color: #1a1a2e;
      margin: 0;
      padding: 0;
      background: #f5f5f5;
    }
    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #1e3a5f, #152a45);
      color: white;
      padding: 30px;
      border-radius: 12px 12px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }
    .content {
      background: white;
      padding: 35px;
      border-radius: 0 0 12px 12px;
    }
    .content p {
      margin: 0 0 16px 0;
      font-size: 16px;
    }
    .resources {
      background: #f8fafc;
      padding: 20px;
      border-radius: 8px;
      margin: 24px 0;
    }
    .resources h3 {
      margin: 0 0 16px 0;
      color: #1e3a5f;
      font-size: 16px;
    }
    .resource {
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .resource:last-child {
      border-bottom: none;
    }
    .resource-title {
      color: #1e3a5f;
      text-decoration: none;
      font-weight: 600;
    }
    .resource-desc {
      margin: 4px 0 0 0;
      font-size: 14px;
      color: #64748b;
    }
    .cta {
      text-align: center;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
    }
    .button {
      display: inline-block;
      background: #16a34a;
      color: white !important;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
    }
    .footer {
      text-align: center;
      color: #64748b;
      font-size: 13px;
      margin-top: 24px;
    }
    .footer a {
      color: #1e3a5f;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>${email.content.headline}</h1>
    </div>
    <div class="content">
      ${email.content.body.map(p => `<p>${p}</p>`).join('')}

      ${resourcesHtml}

      ${ctaHtml}
    </div>
    <div class="footer">
      <p>Meridian CPA Review — Affordable CPA exam study tools</p>
      <p><a href="https://cpaexamblueprint.com">cpaexamblueprint.com</a></p>
      <p style="margin-top: 16px; font-size: 12px;">
        <a href="https://cpaexamblueprint.com/unsubscribe">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
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

  const html = generateSegmentEmailHtml(email);

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      replyTo: REPLY_TO,
      subject: email.subject,
      html,
      tags: [
        { name: 'sequence', value: 'segment' },
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
  tags?: { name: string; value: string }[]
): Promise<SendEmailResult> {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      replyTo: REPLY_TO,
      subject,
      html,
      tags,
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
