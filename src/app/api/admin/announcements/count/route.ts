import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Check if email is in admin list
function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const recipients = searchParams.get('recipients') || 'all';

    let count = 0;

    switch (recipients) {
      case 'all': {
        const { count: totalCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        count = totalCount || 0;
        break;
      }
      case 'free': {
        const { count: freeCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .or('subscription_tier.is.null,subscription_tier.eq.free');
        count = freeCount || 0;
        break;
      }
      case 'paid': {
        const { count: paidCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .or('subscription_tier.eq.pro,subscription_tier.eq.premium');
        count = paidCount || 0;
        break;
      }
      case 'inactive': {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Get active user IDs
        const { data: activeSessions } = await supabase
          .from('practice_sessions')
          .select('user_id')
          .gte('created_at', thirtyDaysAgo.toISOString());

        const activeUserIds = new Set(activeSessions?.map(s => s.user_id) || []);

        // Get all profiles and count inactive
        const { data: allProfiles } = await supabase
          .from('profiles')
          .select('id');

        count = (allProfiles || []).filter(p => !activeUserIds.has(p.id)).length;
        break;
      }
    }

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error in announcements count API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
