/**
 * Email Preview API
 * GET /api/email/preview?template=welcome&email=test@example.com
 *
 * Supported templates:
 * - welcome: Welcome email for new users
 * - password-reset: Password reset email
 * - nurture-{1-7}: Nurture sequence emails
 * - segment-{segment-name}: Segment-specific emails
 */

import { NextRequest, NextResponse } from 'next/server';
import { welcomeEmail, passwordResetEmail } from '@/lib/email/templates/transactional';
import { nurtureSequence, generateNurtureEmailHtml } from '@/lib/email/nurture-sequence';
import { segmentEmails, generateSegmentEmailHtml } from '@/lib/email/segment-content';

export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Email preview is only available in development' },
      { status: 403 }
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const template = searchParams.get('template');
  const email = searchParams.get('email') || 'preview@example.com';
  const name = searchParams.get('name') || 'Test User';

  if (!template) {
    return NextResponse.json(
      {
        error: 'Missing template parameter',
        availableTemplates: {
          transactional: ['welcome', 'password-reset'],
          nurture: nurtureSequence.map(e => `nurture-${e.id}`),
          segment: Object.keys(segmentEmails).map(s => `segment-${s}`),
        },
      },
      { status: 400 }
    );
  }

  let html: string;

  try {
    // Transactional templates
    if (template === 'welcome') {
      html = welcomeEmail({ to: email, name });
    } else if (template === 'password-reset') {
      html = passwordResetEmail({
        to: email,
        resetUrl: 'https://meridiancpareview.com/reset-password?token=preview-token-123',
        expiresInHours: 1,
      });
    }
    // Nurture sequence templates
    else if (template.startsWith('nurture-')) {
      const emailId = parseInt(template.replace('nurture-', ''));
      const nurtureEmail = nurtureSequence.find(e => e.id === emailId);

      if (!nurtureEmail) {
        return NextResponse.json(
          {
            error: `Nurture email ${emailId} not found`,
            available: nurtureSequence.map(e => `nurture-${e.id}`),
          },
          { status: 404 }
        );
      }

      html = generateNurtureEmailHtml(nurtureEmail, email);
    }
    // Segment templates
    else if (template.startsWith('segment-')) {
      const segment = template.replace('segment-', '');
      const segmentEmail = segmentEmails[segment];

      if (!segmentEmail) {
        return NextResponse.json(
          {
            error: `Segment ${segment} not found`,
            available: Object.keys(segmentEmails).map(s => `segment-${s}`),
          },
          { status: 404 }
        );
      }

      html = generateSegmentEmailHtml(segmentEmail, email);
    } else {
      return NextResponse.json(
        {
          error: `Unknown template: ${template}`,
          availableTemplates: {
            transactional: ['welcome', 'password-reset'],
            nurture: nurtureSequence.map(e => `nurture-${e.id}`),
            segment: Object.keys(segmentEmails).map(s => `segment-${s}`),
          },
        },
        { status: 404 }
      );
    }

    // Return HTML directly for browser preview
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error generating email preview:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate email preview',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
