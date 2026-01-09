import { NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

/**
 * POST /api/email/unsubscribe
 * Unsubscribe a user from email sequences
 */
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const db = getSupabaseAdmin();

    // Find and update the email sequence progress
    const { data, error } = await db
      .from('email_sequence_progress')
      .update({
        is_active: false,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('email', email.toLowerCase().trim())
      .select();

    if (error) {
      console.error('Unsubscribe error:', error);
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'If this email exists in our system, it has been unsubscribed.',
      });
    }

    // Cancel any pending triggered emails
    await db
      .from('triggered_emails')
      .update({ status: 'cancelled' })
      .eq('email', email.toLowerCase().trim())
      .eq('status', 'pending');

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed.',
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/email/unsubscribe
 * Handle one-click unsubscribe from email link
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.redirect(new URL('/unsubscribe?error=missing_email', request.url));
  }

  const db = getSupabaseAdmin();

  // Process unsubscribe
  await db
    .from('email_sequence_progress')
    .update({
      is_active: false,
      unsubscribed_at: new Date().toISOString(),
    })
    .eq('email', email.toLowerCase().trim());

  // Redirect to confirmation page
  return NextResponse.redirect(new URL('/unsubscribe?success=true', request.url));
}
