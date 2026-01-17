import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Check if email is in admin list
function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
}

// Feedback type labels for email
const feedbackTypeLabels: Record<string, string> = {
  wrong_answer: 'Incorrect Answer',
  unclear: 'Unclear Question',
  outdated: 'Outdated Content',
  typo: 'Typo/Grammar Issue',
  other: 'Other Issue',
};

// Status action descriptions for email
const statusActionDescriptions: Record<string, string> = {
  resolved: 'has been reviewed and the issue has been fixed',
  dismissed: 'has been reviewed and determined to not require changes',
  reviewed: 'has been reviewed and is being investigated',
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin status with regular auth client
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use service role client to bypass RLS for admin operations
    const serviceClient = createServiceRoleClient();
    if (!serviceClient) {
      console.error('Service role client not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, admin_notes, sendEmail = true } = body;

    // First get the existing feedback to get user info
    const { data: existingFeedback, error: fetchError } = await serviceClient
      .from('question_feedback')
      .select(`
        *,
        profiles:user_id (
          email,
          full_name
        )
      `)
      .eq('id', id)
      .single();

    if (fetchError || !existingFeedback) {
      console.error('Error fetching feedback:', fetchError);
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 });
    }

    const updateData: Record<string, unknown> = {};

    if (status) {
      updateData.status = status;
      if (status === 'resolved' || status === 'dismissed') {
        updateData.resolved_at = new Date().toISOString();
        updateData.resolved_by = user.email;
      }
    }

    if (admin_notes !== undefined) {
      updateData.admin_notes = admin_notes;
    }

    const { data, error } = await serviceClient
      .from('question_feedback')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating feedback:', error);
      return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
    }

    // Log the action
    await serviceClient.from('activity_log').insert({
      actor_id: user.id,
      actor_email: user.email,
      action_type: 'feedback_updated',
      target_type: 'feedback',
      target_id: id,
      details: { status, admin_notes },
    });

    // Send email notification to the user who submitted the feedback
    if (sendEmail && existingFeedback.profiles?.email && (status === 'resolved' || status === 'dismissed')) {
      try {
        const userEmail = existingFeedback.profiles.email;
        const userName = existingFeedback.profiles.full_name || 'there';
        const feedbackType = feedbackTypeLabels[existingFeedback.feedback_type] || existingFeedback.feedback_type;
        const actionDescription = statusActionDescriptions[status] || 'has been reviewed';
        const questionId = existingFeedback.question_id;
        const section = existingFeedback.section;

        await resend.emails.send({
          from: 'Meridian CPA Review Support <support@meridiancpareview.com>',
          to: [userEmail],
          subject: `Your Feedback Report Has Been Reviewed - ${section} ${questionId}`,
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
    .status-resolved { color: #16a34a; font-weight: 600; }
    .status-dismissed { color: #64748b; font-weight: 600; }
    .admin-notes { background: #f1f5f9; padding: 16px; border-radius: 8px; border-left: 4px solid #1e3a5f; margin-top: 16px; }
    .cta { text-align: center; margin-top: 20px; }
    .button { display: inline-block; background: #1e3a5f; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .footer { text-align: center; color: #64748b; font-size: 14px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0;">Thank You for Your Report!</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">Your feedback helps us improve</p>
    </div>
    <div class="content">
      <p>Hi ${userName},</p>

      <p>Thank you for taking the time to report an issue with our practice questions. Your feedback is invaluable in helping us maintain high-quality study materials.</p>

      <div class="section">
        <h2 style="margin-top: 0; color: #1e3a5f;">Report Details</h2>
        <p><strong>Question:</strong> ${section} - ${questionId}</p>
        <p><strong>Issue Type:</strong> ${feedbackType}</p>
        <p><strong>Status:</strong> <span class="status-${status}">${status === 'resolved' ? 'Resolved ✓' : 'Reviewed'}</span></p>
        <p>Your report ${actionDescription}.</p>

        ${admin_notes ? `
        <div class="admin-notes">
          <strong>Our Response:</strong>
          <p style="margin: 8px 0 0 0;">${admin_notes}</p>
        </div>
        ` : ''}
      </div>

      <p>We appreciate your commitment to helping us provide the best CPA exam preparation experience. If you notice any other issues, please don't hesitate to report them.</p>

      <div class="cta">
        <a href="https://meridiancpareview.com/dashboard" class="button" style="color: white !important;">Continue Studying</a>
      </div>
    </div>
    <div class="footer">
      <p>Meridian CPA Review - Affordable CPA exam study tools</p>
      <p>Questions? Reply to this email and we'll be happy to help.</p>
    </div>
  </div>
</body>
</html>
          `,
        });
      } catch (emailError) {
        // Don't fail the request if email fails, just log it
        console.error('Error sending feedback resolution email:', emailError);
      }
    }

    return NextResponse.json({ feedback: data });
  } catch (error) {
    console.error('Error in feedback update API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
