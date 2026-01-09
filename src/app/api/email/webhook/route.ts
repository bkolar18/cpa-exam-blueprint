import { NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import crypto from 'crypto';

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

const RESEND_WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET;

/**
 * POST /api/email/webhook
 * Handle Resend webhook events (opens, clicks, bounces, etc.)
 */
export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('svix-signature');

    // Verify webhook signature (optional but recommended)
    if (RESEND_WEBHOOK_SECRET && signature) {
      const isValid = verifyWebhookSignature(body, signature, RESEND_WEBHOOK_SECRET);
      if (!isValid) {
        console.error('Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = JSON.parse(body);
    const eventType = event.type;
    const data = event.data;

    console.log('Resend webhook event:', eventType, data.email_id);

    switch (eventType) {
      case 'email.sent':
        // Email was accepted by Resend
        await handleEmailSent(data);
        break;

      case 'email.delivered':
        // Email was delivered to recipient's server
        await handleEmailDelivered(data);
        break;

      case 'email.opened':
        // Recipient opened the email
        await handleEmailOpened(data);
        break;

      case 'email.clicked':
        // Recipient clicked a link
        await handleEmailClicked(data);
        break;

      case 'email.bounced':
        // Email bounced
        await handleEmailBounced(data);
        break;

      case 'email.complained':
        // Recipient marked as spam
        await handleEmailComplaint(data);
        break;

      default:
        console.log('Unhandled webhook event type:', eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleEmailSent(data: { email_id: string; to: string[] }) {
  const db = getSupabaseAdmin();
  await db
    .from('email_send_log')
    .update({ status: 'sent' })
    .eq('resend_message_id', data.email_id);
}

async function handleEmailDelivered(data: { email_id: string; to: string[] }) {
  const db = getSupabaseAdmin();
  await db
    .from('email_send_log')
    .update({ status: 'delivered' })
    .eq('resend_message_id', data.email_id);
}

async function handleEmailOpened(data: { email_id: string; to: string[] }) {
  const db = getSupabaseAdmin();
  const now = new Date().toISOString();

  await db
    .from('email_send_log')
    .update({ opened_at: now })
    .eq('resend_message_id', data.email_id);

  if (data.to && data.to[0]) {
    const { data: progress } = await db
      .from('email_sequence_progress')
      .select('id, total_opens')
      .eq('email', data.to[0])
      .single();

    if (progress) {
      await db
        .from('email_sequence_progress')
        .update({ total_opens: (progress.total_opens || 0) + 1 })
        .eq('id', progress.id);
    }
  }
}

async function handleEmailClicked(data: { email_id: string; to: string[]; link?: string }) {
  const db = getSupabaseAdmin();
  const now = new Date().toISOString();

  await db
    .from('email_send_log')
    .update({ clicked_at: now })
    .eq('resend_message_id', data.email_id);

  if (data.to && data.to[0]) {
    const { data: progress } = await db
      .from('email_sequence_progress')
      .select('id, total_clicks')
      .eq('email', data.to[0])
      .single();

    if (progress) {
      await db
        .from('email_sequence_progress')
        .update({ total_clicks: (progress.total_clicks || 0) + 1 })
        .eq('id', progress.id);
    }
  }
}

async function handleEmailBounced(data: { email_id: string; to: string[]; reason?: string }) {
  const db = getSupabaseAdmin();
  await db
    .from('email_send_log')
    .update({ status: 'bounced', error_message: data.reason })
    .eq('resend_message_id', data.email_id);

  if (data.to && data.to[0]) {
    await db
      .from('email_sequence_progress')
      .update({
        is_active: false,
        bounce_reason: data.reason || 'Email bounced',
      })
      .eq('email', data.to[0]);
  }
}

async function handleEmailComplaint(data: { email_id: string; to: string[] }) {
  const db = getSupabaseAdmin();
  await db
    .from('email_send_log')
    .update({ status: 'complained' })
    .eq('resend_message_id', data.email_id);

  if (data.to && data.to[0]) {
    await db
      .from('email_sequence_progress')
      .update({
        is_active: false,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', data.to[0]);
  }
}

/**
 * Verify Resend webhook signature
 */
function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    const expectedSignature = hmac.digest('hex');

    // Signature format may be "v1,timestamp,signature"
    const parts = signature.split(',');
    const actualSignature = parts[parts.length - 1];

    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature),
      Buffer.from(actualSignature)
    );
  } catch {
    return false;
  }
}
