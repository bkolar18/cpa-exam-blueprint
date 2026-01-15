import { Resend } from "resend";
import { NextResponse } from "next/server";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { determineSegments, getSegmentEmail, generateSegmentEmailHtml } from "@/lib/email/segment-content";
import { nurtureSequence, generateNurtureEmailHtml } from "@/lib/email/nurture-sequence";

// Lazy initialization to avoid build-time errors
let supabaseAdmin: SupabaseClient | null = null;

function getSupabaseAdmin(): SupabaseClient {
  if (!supabaseAdmin) {
    supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return supabaseAdmin;
}

const resend = new Resend(process.env.RESEND_API_KEY);

interface StudyPlanData {
  email: string;
  workingFullTime: string;
  hoursPerWeek: string;
  accountingBackground: string;
  studyPlan: {
    sectionOrder: string[];
    weeklySchedule: string;
    estimatedCompletion: string;
    tips: string[];
  };
}

export async function POST(request: Request) {
  try {
    const data: StudyPlanData = await request.json();

    // Send study plan to user
    await resend.emails.send({
      from: "Meridian CPA Review <onboarding@resend.dev>",
      to: [data.email],
      subject: "Your Personalized CPA Study Plan",
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e3a5f, #152a45); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
    .section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0; }
    .section h2 { color: #1e3a5f; margin-top: 0; font-size: 18px; }
    .order-item { display: inline-block; background: #1e3a5f; color: white; padding: 8px 16px; border-radius: 20px; margin: 4px; font-weight: 600; }
    .tip { padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
    .tip:last-child { border-bottom: none; }
    .cta { text-align: center; margin-top: 30px; }
    .button { display: inline-block; background: #16a34a; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .button-secondary { display: inline-block; background: #1e3a5f; color: #ffffff !important; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; margin-left: 12px; }
    .footer { text-align: center; color: #64748b; font-size: 14px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your CPA Study Plan</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Personalized for your schedule and background</p>
    </div>
    <div class="content">
      <div class="section">
        <h2>Recommended Section Order</h2>
        <div>
          ${data.studyPlan.sectionOrder.map((section, i) => `<span class="order-item">${i + 1}. ${section}</span>`).join(" ")}
        </div>
      </div>

      <div class="section">
        <h2>Weekly Study Schedule</h2>
        <p style="margin: 0;">${data.studyPlan.weeklySchedule}</p>
      </div>

      <div class="section">
        <h2>Estimated Timeline</h2>
        <p style="margin: 0;">${data.studyPlan.estimatedCompletion}</p>
      </div>

      <div class="section">
        <h2>Study Tips</h2>
        ${data.studyPlan.tips.map(tip => `<div class="tip">✓ ${tip}</div>`).join("")}
      </div>

      <div class="cta">
        <p>Ready to start studying?</p>
        <a href="https://meridian-cpa-review.vercel.app/signup" class="button" style="color: #ffffff !important; text-decoration: none;">Create Your Account</a>
        <a href="https://meridian-cpa-review.vercel.app/dashboard" class="button-secondary" style="color: #ffffff !important; text-decoration: none;">Go to Dashboard</a>
      </div>
    </div>
    <div class="footer">
      <p>Meridian CPA Review - Affordable CPA exam study tools</p>
      <p>You received this because you requested a study plan at cpaexamblueprint.com</p>
    </div>
  </div>
</body>
</html>
      `,
    });

    // Determine user segments for targeted follow-up
    const userSegments = determineSegments({
      workingFullTime: data.workingFullTime,
      hoursPerWeek: data.hoursPerWeek,
      accountingBackground: data.accountingBackground,
      sectionOrder: data.studyPlan.sectionOrder,
    });

    // Send segment-specific email (first relevant segment)
    // This provides immediate personalized value
    if (userSegments.length > 0) {
      const primarySegment = userSegments[0];
      const segmentEmail = getSegmentEmail(primarySegment);

      if (segmentEmail) {
        try {
          await resend.emails.send({
            from: "Meridian CPA Review <onboarding@resend.dev>",
            to: [data.email],
            subject: segmentEmail.subject,
            html: generateSegmentEmailHtml(segmentEmail, data.email),
          });
        } catch (segmentError) {
          console.error("Error sending segment email:", segmentError);
          // Don't fail the whole request if segment email fails
        }
      }
    }

    // Send notification to admin with segment info
    const adminEmail = process.env.EMAIL_TO || "delivered@resend.dev";
    await resend.emails.send({
      from: "Meridian CPA Review <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `New Lead: ${data.email}`,
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1e3a5f; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 16px; }
    .label { font-weight: 600; color: #374151; font-size: 14px; }
    .value { background: white; padding: 12px; border-radius: 6px; margin-top: 4px; border: 1px solid #e2e8f0; }
    .segment-tag { display: inline-block; background: #16a34a; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-right: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Study Plan Lead</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Segments</div>
        <div class="value">${userSegments.length > 0 ? userSegments.map(s => `<span class="segment-tag">${s}</span>`).join(" ") : "None detected"}</div>
      </div>
      <div class="field">
        <div class="label">Working Full Time</div>
        <div class="value">${data.workingFullTime === "yes" ? "Yes" : "No"}</div>
      </div>
      <div class="field">
        <div class="label">Hours Per Week</div>
        <div class="value">${data.hoursPerWeek} hours</div>
      </div>
      <div class="field">
        <div class="label">Accounting Background</div>
        <div class="value">${data.accountingBackground}</div>
      </div>
      <div class="field">
        <div class="label">Recommended Section Order</div>
        <div class="value">${data.studyPlan.sectionOrder.join(" → ")}</div>
      </div>
      <div class="field">
        <div class="label">Nurture Sequence</div>
        <div class="value">Enrolled in 7-email welcome sequence (Days 0, 3, 7, 14, 21, 28, 30)</div>
      </div>
    </div>
  </div>
</body>
</html>
      `,
    });

    // Enroll user in email nurture sequence
    const now = new Date();
    const nextEmailDate = new Date(now);
    nextEmailDate.setDate(nextEmailDate.getDate() + 3); // First follow-up is day 3
    nextEmailDate.setHours(9, 0, 0, 0);

    try {
      const db = getSupabaseAdmin();
      // Check if user already exists in sequence
      const { data: existing } = await db
        .from('email_sequence_progress')
        .select('id')
        .eq('email', data.email.toLowerCase().trim())
        .single();

      if (!existing) {
        // Create new sequence progress record
        await db.from('email_sequence_progress').insert({
          email: data.email.toLowerCase().trim(),
          sequence_type: 'welcome',
          current_email_id: 1, // Just received the study plan (counts as email 1)
          last_email_sent_at: now.toISOString(),
          next_email_scheduled_at: nextEmailDate.toISOString(),
          signup_date: now.toISOString(),
          segments: userSegments,
          total_emails_sent: 1,
          is_active: true,
        });
      }
    } catch (dbError) {
      // Log but don't fail the request if DB insert fails
      console.error('Error enrolling in nurture sequence:', dbError);
    }

    return NextResponse.json({
      success: true,
      segments: userSegments,
      nurtureSequenceEnrolled: true
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
