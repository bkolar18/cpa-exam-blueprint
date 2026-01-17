import { Resend } from "resend";
import { NextResponse } from "next/server";
import { rateLimitMiddleware } from "@/lib/security/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY);

interface NTSSubscriptionData {
  email: string;
  ntsDate: string;
  expirationDate: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function POST(request: Request) {
  try {
    // Rate limit check
    const rateLimitResponse = await rateLimitMiddleware(request, 'subscribe-nts');
    if (rateLimitResponse) return rateLimitResponse;

    const data: NTSSubscriptionData = await request.json();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    if (!data.expirationDate) {
      return NextResponse.json(
        { error: "Expiration date is required" },
        { status: 400 }
      );
    }

    const expirationDate = new Date(data.expirationDate);
    const thirtyDaysBefore = new Date(expirationDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const fourteenDaysBefore = new Date(expirationDate.getTime() - 14 * 24 * 60 * 60 * 1000);
    const sevenDaysBefore = new Date(expirationDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Send confirmation email to user
    await resend.emails.send({
      from: "Meridian CPA Review <hello@meridiancpareview.com>",
      to: [data.email],
      subject: "NTS Expiration Reminders Confirmed",
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a5f, #152a45); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
    .section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0; }
    .date-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
    .date-row:last-child { border-bottom: none; }
    .label { color: #64748b; }
    .value { font-weight: 600; color: #1a1a2e; }
    .alert { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 16px; border-radius: 8px; margin-bottom: 20px; }
    .cta { text-align: center; margin-top: 20px; }
    .button { display: inline-block; background: #16a34a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .footer { text-align: center; color: #64748b; font-size: 14px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">NTS Reminders Set!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">We'll notify you before your NTS expires</p>
    </div>
    <div class="content">
      <div class="alert">
        <strong>Your NTS expires on ${formatDate(data.expirationDate)}</strong>
      </div>

      <div class="section">
        <h2 style="margin-top: 0; color: #1e3a5f;">Reminder Schedule</h2>
        <p>We'll send you email reminders on these dates:</p>
        <div class="date-row">
          <span class="label">30 Days Before</span>
          <span class="value">${formatDate(thirtyDaysBefore.toISOString())}</span>
        </div>
        <div class="date-row">
          <span class="label">14 Days Before</span>
          <span class="value">${formatDate(fourteenDaysBefore.toISOString())}</span>
        </div>
        <div class="date-row">
          <span class="label">7 Days Before</span>
          <span class="value">${formatDate(sevenDaysBefore.toISOString())}</span>
        </div>
      </div>

      <div class="section">
        <h2 style="margin-top: 0; color: #1e3a5f;">Pro Tip</h2>
        <p style="margin: 0;">Schedule your exam as soon as possible! Popular dates and times fill up quickly, especially near the end of testing windows.</p>
      </div>

      <div class="cta">
        <p>Need a study plan?</p>
        <a href="https://meridian-cpa-review.vercel.app/study-plan" class="button">Get Your Free Study Plan</a>
      </div>
    </div>
    <div class="footer">
      <p>Meridian CPA Review - Affordable CPA exam study tools</p>
      <p>You can unsubscribe at any time by replying to this email.</p>
    </div>
  </div>
</body>
</html>
      `,
    });

    // Notify admin of new subscriber
    const adminEmail = process.env.EMAIL_TO || "delivered@resend.dev";
    await resend.emails.send({
      from: "Meridian CPA Review <hello@meridiancpareview.com>",
      to: [adminEmail],
      subject: `New NTS Tracker Subscriber: ${data.email}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e3a5f; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 12px; }
    .label { color: #64748b; font-size: 14px; }
    .value { font-weight: 600; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New NTS Tracker Subscriber</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">NTS Issue Date</div>
        <div class="value">${formatDate(data.ntsDate)}</div>
      </div>
      <div class="field">
        <div class="label">NTS Expiration Date</div>
        <div class="value">${formatDate(data.expirationDate)}</div>
      </div>
      <div class="field">
        <div class="label">Subscribed at</div>
        <div class="value">${new Date().toLocaleString()}</div>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error subscribing to NTS tracker:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
