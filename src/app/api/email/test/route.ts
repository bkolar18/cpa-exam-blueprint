import { NextResponse } from 'next/server';
import { sendGeneralEmail } from '@/lib/resend';

/**
 * Test email endpoint - sends a test email to verify Resend is working
 * POST /api/email/test
 * Body: { to: "email@example.com" }
 *
 * NOTE: Remove or protect this endpoint in production!
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to } = body;

    if (!to) {
      return NextResponse.json(
        { success: false, error: 'Missing "to" email address' },
        { status: 400 }
      );
    }

    // Send a test email
    const result = await sendGeneralEmail({
      to,
      subject: 'Test Email from Meridian CPA Review',
      html: `
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
    .success-badge {
      display: inline-block;
      background: #16a34a;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 20px;
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
      <h1>Email Test Successful!</h1>
    </div>
    <div class="content">
      <div class="success-badge">✓ Resend is working</div>
      <p>If you're seeing this email, your Resend integration is configured correctly.</p>
      <p><strong>Sent at:</strong> ${new Date().toISOString()}</p>
      <p><strong>From domain:</strong> meridiancpareview.com</p>
      <p>You can now use the email system for:</p>
      <ul>
        <li>Welcome/nurture sequences</li>
        <li>System notifications</li>
        <li>Support communications</li>
        <li>Announcements</li>
      </ul>
    </div>
    <div class="footer">
      <p>Meridian CPA Review</p>
      <p><a href="https://meridiancpareview.com">meridiancpareview.com</a></p>
    </div>
  </div>
</body>
</html>
      `,
    });

    if (result.error) {
      return NextResponse.json(
        { success: false, error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      messageId: result.data?.id,
      message: `Test email sent to ${to}`,
    });
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
