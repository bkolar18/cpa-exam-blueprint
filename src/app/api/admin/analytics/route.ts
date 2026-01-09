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
    const range = searchParams.get('range') || '30d';

    // Calculate date range
    const now = new Date();
    let startDate: Date;
    switch (range) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date('2020-01-01');
    }

    // Fetch all data in parallel
    const [
      profilesResult,
      sessionsResult,
      attemptsResult,
      streaksResult,
    ] = await Promise.all([
      supabase.from('profiles').select('id, created_at, subscription_tier'),
      supabase.from('practice_sessions').select('id, user_id, section, created_at').gte('created_at', startDate.toISOString()),
      supabase.from('practice_attempts').select('id, user_id, question_id, section, topic, is_correct, created_at').gte('created_at', startDate.toISOString()),
      supabase.from('study_streaks').select('user_id, current_streak'),
    ]);

    const profiles = profilesResult.data || [];
    const sessions = sessionsResult.data || [];
    const attempts = attemptsResult.data || [];
    const streaks = streaksResult.data || [];

    // Calculate signups over time
    const signupsByDate: Record<string, number> = {};
    profiles.forEach(p => {
      const date = new Date(p.created_at).toISOString().split('T')[0];
      signupsByDate[date] = (signupsByDate[date] || 0) + 1;
    });

    const signupsOverTime = Object.entries(signupsByDate)
      .filter(([date]) => new Date(date) >= startDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));

    // Calculate active users over time (daily)
    const activeUsersByDate: Record<string, Set<string>> = {};
    sessions.forEach(s => {
      const date = new Date(s.created_at).toISOString().split('T')[0];
      if (!activeUsersByDate[date]) {
        activeUsersByDate[date] = new Set();
      }
      activeUsersByDate[date].add(s.user_id);
    });

    const activeUsersOverTime = Object.entries(activeUsersByDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, users]) => ({ date, count: users.size }));

    // Calculate practice sessions over time
    const sessionsByDate: Record<string, number> = {};
    sessions.forEach(s => {
      const date = new Date(s.created_at).toISOString().split('T')[0];
      sessionsByDate[date] = (sessionsByDate[date] || 0) + 1;
    });

    const practiceSessionsOverTime = Object.entries(sessionsByDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date, count }));

    // Calculate accuracy by section
    const sectionStats: Record<string, { correct: number; total: number }> = {};
    attempts.forEach(a => {
      if (!sectionStats[a.section]) {
        sectionStats[a.section] = { correct: 0, total: 0 };
      }
      sectionStats[a.section].total++;
      if (a.is_correct) {
        sectionStats[a.section].correct++;
      }
    });

    const accuracyBySection = Object.entries(sectionStats).map(([section, stats]) => ({
      section,
      accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
      total: stats.total,
    }));

    // Subscription breakdown
    const tierCounts: Record<string, number> = { free: 0, pro: 0, premium: 0 };
    profiles.forEach(p => {
      const tier = p.subscription_tier || 'free';
      tierCounts[tier] = (tierCounts[tier] || 0) + 1;
    });

    const subscriptionBreakdown = Object.entries(tierCounts).map(([tier, count]) => ({
      tier,
      count,
    }));

    // Top topics
    const topicCounts: Record<string, number> = {};
    attempts.forEach(a => {
      if (a.topic) {
        topicCounts[a.topic] = (topicCounts[a.topic] || 0) + 1;
      }
    });

    const topTopics = Object.entries(topicCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([topic, count]) => ({ topic, count }));

    // Peak usage times (hour of day)
    const hourCounts: Record<number, number> = {};
    for (let i = 0; i < 24; i++) hourCounts[i] = 0;
    sessions.forEach(s => {
      const hour = new Date(s.created_at).getUTCHours();
      hourCounts[hour]++;
    });

    const peakUsageTimes = Object.entries(hourCounts).map(([hour, count]) => ({
      hour: parseInt(hour),
      count,
    }));

    // Streak distribution
    const streakBuckets: Record<string, number> = {
      '0 days': 0,
      '1-3 days': 0,
      '4-7 days': 0,
      '8-14 days': 0,
      '15-30 days': 0,
      '30+ days': 0,
    };

    streaks.forEach(s => {
      const streak = s.current_streak || 0;
      if (streak === 0) streakBuckets['0 days']++;
      else if (streak <= 3) streakBuckets['1-3 days']++;
      else if (streak <= 7) streakBuckets['4-7 days']++;
      else if (streak <= 14) streakBuckets['8-14 days']++;
      else if (streak <= 30) streakBuckets['15-30 days']++;
      else streakBuckets['30+ days']++;
    });

    const streakDistribution = Object.entries(streakBuckets).map(([streak, count]) => ({
      streak,
      count,
    }));

    return NextResponse.json({
      signupsOverTime,
      activeUsersOverTime,
      practiceSessionsOverTime,
      accuracyBySection,
      subscriptionBreakdown,
      topTopics,
      peakUsageTimes,
      streakDistribution,
    });
  } catch (error) {
    console.error('Error in analytics API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
