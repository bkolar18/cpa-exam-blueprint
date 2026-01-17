import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Send confirmation email to user
    await resend.emails.send({
      from: "Meridian CPA Review <hello@meridiancpareview.com>",
      to: [email],
      subject: "Score Release Notifications Confirmed",
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
    .cta { text-align: center; margin-top: 20px; }
    .button { display: inline-block; background: #16a34a; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .footer { text-align: center; color: #64748b; font-size: 14px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">You're Subscribed!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Score Release Notifications</p>
    </div>
    <div class="content">
      <div class="section">
        <h2 style="margin-top: 0; color: #1e3a5f;">What to Expect</h2>
        <p>We'll send you email reminders <strong>3 days before</strong> each CPA exam score release date, so you're never caught off guard.</p>
        <p>You'll receive notifications for:</p>
        <ul>
          <li><strong>Core Sections</strong> (FAR, AUD, REG) - Released every 2 weeks</li>
          <li><strong>Discipline Sections</strong> (BAR, TCP, ISC) - Released quarterly</li>
        </ul>
      </div>

      <div class="cta">
        <p>While you wait, get a personalized study plan:</p>
        <a href="https://meridian-cpa-review.vercel.app/study-plan" class="button">Build My Study Plan</a>
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
      subject: `New Score Release Subscriber: ${email}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e3a5f; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Score Release Subscriber</h2>
    </div>
    <div class="content">
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Source:</strong> Score Release Calendar Page</p>
      <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json(
      { error: "Failed to subscribe" },
      { status: 500 }
    );
  }
}
