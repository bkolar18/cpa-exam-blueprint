import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';

// Check if email is in admin list
function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
}

export async function GET(request: NextRequest) {
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

    // Use service role client to bypass RLS for admin activity log
    const serviceClient = createServiceRoleClient();
    if (!serviceClient) {
      console.error('Service role client not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const range = searchParams.get('range') || '7d';

    // Calculate date range
    const now = new Date();
    let startDate: Date | null = null;
    switch (range) {
      case '1d':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
    }

    let query = serviceClient
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    if (startDate) {
      query = query.gte('created_at', startDate.toISOString());
    }

    if (action && action !== 'all') {
      query = query.eq('action_type', action);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching activity logs:', error);
      return NextResponse.json({ error: 'Failed to fetch activity logs' }, { status: 500 });
    }

    return NextResponse.json({ logs: data || [] });
  } catch (error) {
    console.error('Error in activity API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
