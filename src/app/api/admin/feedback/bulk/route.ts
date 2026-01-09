import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Check if email is in admin list
function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
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
    const { ids, status } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
    }

    if (!status) {
      return NextResponse.json({ error: 'No status provided' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = { status };

    if (status === 'resolved' || status === 'dismissed') {
      updateData.resolved_at = new Date().toISOString();
      updateData.resolved_by = user.email;
    }

    const { error } = await supabase
      .from('question_feedback')
      .update(updateData)
      .in('id', ids);

    if (error) {
      console.error('Error bulk updating feedback:', error);
      return NextResponse.json({ error: 'Failed to update feedback' }, { status: 500 });
    }

    // Log the action
    await supabase.from('activity_log').insert({
      actor_id: user.id,
      actor_email: user.email,
      action_type: 'feedback_bulk_updated',
      target_type: 'feedback',
      target_id: ids.join(','),
      details: { status, count: ids.length },
    });

    return NextResponse.json({ success: true, updated: ids.length });
  } catch (error) {
    console.error('Error in bulk feedback update API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
