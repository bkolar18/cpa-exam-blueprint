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
    // First verify admin status with regular auth client
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use service role client to bypass RLS for admin data access
    const serviceClient = createServiceRoleClient();
    if (!serviceClient) {
      console.error('Service role client not configured - SUPABASE_SERVICE_ROLE_KEY may be missing');
      return NextResponse.json({
        error: 'Server configuration error',
        details: 'Service role key not configured. Check Vercel environment variables.'
      }, { status: 500 });
    }

    const searchParams = request.nextUrl.searchParams;
    const tier = searchParams.get('tier');
    const sortBy = searchParams.get('sortBy') || 'created_at';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Get profiles with user stats using service role client
    let query = serviceClient
      .from('profiles')
      .select('id, email, full_name, created_at, subscription_tier');

    if (tier && tier !== 'all') {
      query = query.eq('subscription_tier', tier);
    }

    // Handle sorting for profile columns
    if (['created_at', 'email', 'full_name', 'subscription_tier'].includes(sortBy)) {
      query = query.order(sortBy, { ascending: sortOrder === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data: profiles, error } = await query;

    console.log('[Admin Users API] Profiles fetched:', profiles?.length || 0, 'users');
    if (profiles && profiles.length > 0) {
      console.log('[Admin Users API] First user email:', profiles[0]?.email);
    }

    if (error) {
      console.error('Error fetching profiles:', error);
      return NextResponse.json({ error: 'Failed to fetch users', details: error.message }, { status: 500 });
    }

    // Get practice session counts and last active dates
    const userIds = profiles?.map(p => p.id) || [];

    if (userIds.length === 0) {
      return NextResponse.json({ users: [] });
    }

    // Get session counts using service client
    const { data: sessionCounts } = await serviceClient
      .from('practice_sessions')
      .select('user_id')
      .in('user_id', userIds);

    // Get last active times
    const { data: lastActiveTimes } = await serviceClient
      .from('practice_sessions')
      .select('user_id, created_at')
      .in('user_id', userIds)
      .order('created_at', { ascending: false });

    // Get streaks from study_streaks table if it exists, otherwise calculate
    const { data: streaks } = await serviceClient
      .from('study_streaks')
      .select('user_id, current_streak')
      .in('user_id', userIds);

    // Aggregate data
    const sessionCountMap: Record<string, number> = {};
    sessionCounts?.forEach(s => {
      sessionCountMap[s.user_id] = (sessionCountMap[s.user_id] || 0) + 1;
    });

    const lastActiveMap: Record<string, string> = {};
    lastActiveTimes?.forEach(s => {
      if (!lastActiveMap[s.user_id]) {
        lastActiveMap[s.user_id] = s.created_at;
      }
    });

    const streakMap: Record<string, number> = {};
    streaks?.forEach(s => {
      streakMap[s.user_id] = s.current_streak || 0;
    });

    const users = profiles?.map(profile => ({
      ...profile,
      practice_sessions_count: sessionCountMap[profile.id] || 0,
      last_active: lastActiveMap[profile.id] || null,
      current_streak: streakMap[profile.id] || 0,
    })) || [];

    // Sort by computed fields if needed
    if (sortBy === 'last_active') {
      users.sort((a, b) => {
        const aTime = a.last_active ? new Date(a.last_active).getTime() : 0;
        const bTime = b.last_active ? new Date(b.last_active).getTime() : 0;
        return sortOrder === 'asc' ? aTime - bTime : bTime - aTime;
      });
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error in users API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
