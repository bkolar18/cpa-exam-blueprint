import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Check if email is in admin list
function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
}

export async function GET() {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('sent_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching announcements:', error);
      return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 });
    }

    return NextResponse.json({ announcements: data || [] });
  } catch (error) {
    console.error('Error in announcements GET API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { subject, body: messageBody, recipients } = body;

    if (!subject || !messageBody) {
      return NextResponse.json({ error: 'Subject and body are required' }, { status: 400 });
    }

    // Get recipient emails based on filter
    let query = supabase.from('profiles').select('email');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    switch (recipients) {
      case 'free':
        query = query.or('subscription_tier.is.null,subscription_tier.eq.free');
        break;
      case 'paid':
        query = query.or('subscription_tier.eq.pro,subscription_tier.eq.premium');
        break;
      case 'inactive':
        // For inactive, we'd need to join with practice_sessions
        // For now, just get all and filter
        break;
    }

    const { data: recipientData, error: recipientError } = await query;

    if (recipientError) {
      console.error('Error fetching recipients:', recipientError);
      return NextResponse.json({ error: 'Failed to fetch recipients' }, { status: 500 });
    }

    let recipientEmails = recipientData?.map(r => r.email).filter(Boolean) || [];

    // For inactive users, we'd filter based on practice sessions
    if (recipients === 'inactive') {
      const { data: activeSessions } = await supabase
        .from('practice_sessions')
        .select('user_id')
        .gte('created_at', thirtyDaysAgo.toISOString());

      const activeUserIds = new Set(activeSessions?.map(s => s.user_id) || []);

      const { data: allProfiles } = await supabase
        .from('profiles')
        .select('id, email');

      recipientEmails = (allProfiles || [])
        .filter(p => !activeUserIds.has(p.id))
        .map(p => p.email)
        .filter(Boolean) as string[];
    }

    const recipientCount = recipientEmails.length;

    // In a real app, you'd integrate with an email service here
    // For now, we'll just log the announcement and store it

    // Store the announcement
    const { error: insertError } = await supabase.from('announcements').insert({
      subject,
      body: messageBody,
      recipients,
      recipient_count: recipientCount,
      sent_by: user.email,
      sent_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error('Error storing announcement:', insertError);
      return NextResponse.json({ error: 'Failed to store announcement' }, { status: 500 });
    }

    // Log the action
    await supabase.from('activity_log').insert({
      actor_id: user.id,
      actor_email: user.email,
      action_type: 'announcement_sent',
      target_type: 'announcement',
      details: { subject, recipients, recipient_count: recipientCount },
    });

    // TODO: Integrate with email service (SendGrid, Resend, etc.)
    console.log(`[Announcement] Would send to ${recipientCount} recipients:`, {
      subject,
      body: messageBody.substring(0, 100) + '...',
      recipients: recipientEmails.slice(0, 5),
    });

    return NextResponse.json({
      success: true,
      message: `Announcement logged for ${recipientCount} recipients. Email integration pending.`,
      recipientCount,
    });
  } catch (error) {
    console.error('Error in announcements POST API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
