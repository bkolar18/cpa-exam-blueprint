import { NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { sendNurtureEmail, sendSegmentEmail, getNextNurtureEmail } from '@/lib/email/send';
import { SegmentType } from '@/lib/email/segment-content';

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

// Verify cron secret for security
const CRON_SECRET = process.env.CRON_SECRET;

/**
 * POST /api/email/process-queue
 * Process the email queue - meant to be called by Vercel Cron
 *
 * Security: Requires CRON_SECRET header or runs from Vercel Cron
 */
export async function POST(request: Request) {
  // Verify authorization
  const authHeader = request.headers.get('authorization');
  const isVercelCron = request.headers.get('x-vercel-cron') === '1';

  if (!isVercelCron && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const db = getSupabaseAdmin();
  const results = {
    processed: 0,
    sent: 0,
    failed: 0,
    errors: [] as string[],
  };

  try {
    const now = new Date();

    // 1. Process nurture sequence emails
    const { data: sequenceProgress, error: progressError } = await db
      .from('email_sequence_progress')
      .select('*')
      .eq('is_active', true)
      .eq('sequence_type', 'welcome')
      .lt('current_email_id', 7)
      .or(`next_email_scheduled_at.is.null,next_email_scheduled_at.lte.${now.toISOString()}`);

    if (progressError) {
      console.error('Error fetching email progress:', progressError);
      results.errors.push(`Database error: ${progressError.message}`);
    }

    if (sequenceProgress && sequenceProgress.length > 0) {
      for (const progress of sequenceProgress) {
        results.processed++;

        const signupDate = new Date(progress.signup_date);
        const nextEmail = getNextNurtureEmail(signupDate, progress.current_email_id);

        if (!nextEmail) {
          continue;
        }

        const sendResult = await sendNurtureEmail(progress.email, nextEmail.id);

        if (sendResult.success) {
          results.sent++;

          await db
            .from('email_sequence_progress')
            .update({
              current_email_id: nextEmail.id,
              last_email_sent_at: now.toISOString(),
              next_email_scheduled_at: calculateNextEmailDate(signupDate, nextEmail.id),
              total_emails_sent: (progress.total_emails_sent || 0) + 1,
            })
            .eq('id', progress.id);

          await db.from('email_send_log').insert({
            progress_id: progress.id,
            email_to: progress.email,
            email_id: nextEmail.id,
            sequence_type: 'welcome',
            subject: nextEmail.subject,
            status: 'sent',
            resend_message_id: sendResult.messageId,
          });
        } else {
          results.failed++;
          results.errors.push(`Failed to send to ${progress.email}: ${sendResult.error}`);

          await db.from('email_send_log').insert({
            progress_id: progress.id,
            email_to: progress.email,
            email_id: nextEmail.id,
            sequence_type: 'welcome',
            subject: nextEmail.subject,
            status: 'failed',
            error_message: sendResult.error,
          });
        }

        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }

    // 2. Process triggered emails
    const today = now.toISOString().split('T')[0];
    const { data: triggeredEmails, error: triggeredError } = await db
      .from('triggered_emails')
      .select('*')
      .eq('status', 'pending')
      .lte('trigger_date', today);

    if (triggeredError) {
      console.error('Error fetching triggered emails:', triggeredError);
      results.errors.push(`Triggered emails error: ${triggeredError.message}`);
    }

    if (triggeredEmails && triggeredEmails.length > 0) {
      for (const triggered of triggeredEmails) {
        results.processed++;

        await db
          .from('triggered_emails')
          .update({
            status: 'sent',
            sent_at: now.toISOString(),
          })
          .eq('id', triggered.id);
      }
    }

    // 3. Send segment-specific emails (one day after signup)
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const { data: segmentUsers, error: segmentError } = await db
      .from('email_sequence_progress')
      .select('*')
      .eq('is_active', true)
      .eq('current_email_id', 1)
      .lt('signup_date', oneDayAgo.toISOString())
      .not('segments', 'is', null);

    if (!segmentError && segmentUsers) {
      for (const user of segmentUsers) {
        const segments = user.segments as SegmentType[];

        if (!segments || segments.length === 0) continue;

        const segment = segments[0];
        const sendResult = await sendSegmentEmail(user.email, segment);

        if (sendResult.success) {
          results.sent++;

          await db.from('email_send_log').insert({
            progress_id: user.id,
            email_to: user.email,
            email_id: 100,
            sequence_type: `segment-${segment}`,
            subject: `Segment: ${segment}`,
            status: 'sent',
            resend_message_id: sendResult.messageId,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      ...results,
      timestamp: now.toISOString(),
    });
  } catch (error) {
    console.error('Email queue processing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        ...results,
      },
      { status: 500 }
    );
  }
}

function calculateNextEmailDate(signupDate: Date, currentEmailId: number): string | null {
  const nurtureSchedule = [
    { id: 1, dayOffset: 0 },
    { id: 2, dayOffset: 3 },
    { id: 3, dayOffset: 7 },
    { id: 4, dayOffset: 14 },
    { id: 5, dayOffset: 21 },
    { id: 6, dayOffset: 28 },
    { id: 7, dayOffset: 30 },
  ];

  const nextEmail = nurtureSchedule.find(e => e.id > currentEmailId);

  if (!nextEmail) {
    return null;
  }

  const nextDate = new Date(signupDate);
  nextDate.setDate(nextDate.getDate() + nextEmail.dayOffset);
  nextDate.setHours(9, 0, 0, 0);

  return nextDate.toISOString();
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Email queue processor ready',
    timestamp: new Date().toISOString(),
  });
}
