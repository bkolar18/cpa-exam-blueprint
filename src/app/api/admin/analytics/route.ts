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
      aiUsageResult,
    ] = await Promise.all([
      supabase.from('profiles').select('id, created_at, subscription_tier'),
      supabase.from('practice_sessions').select('id, user_id, section, created_at').gte('created_at', startDate.toISOString()),
      supabase.from('practice_attempts').select('id, user_id, question_id, section, topic, is_correct, created_at').gte('created_at', startDate.toISOString()),
      supabase.from('study_streaks').select('user_id, current_streak'),
      supabase.from('ai_feature_usage').select('id, user_id, feature, period_type, period_key, usage_count, last_used_at, created_at').gte('created_at', startDate.toISOString()),
    ]);

    const profiles = profilesResult.data || [];
    const sessions = sessionsResult.data || [];
    const attempts = attemptsResult.data || [];
    const streaks = streaksResult.data || [];
    const aiUsage = aiUsageResult.data || [];

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

    // =============================================
    // AI Feature Usage Analytics
    // =============================================

    // AI usage by feature
    const aiFeatureStats: Record<string, { totalUses: number; uniqueUsers: Set<string> }> = {};
    aiUsage.forEach(u => {
      if (!aiFeatureStats[u.feature]) {
        aiFeatureStats[u.feature] = { totalUses: 0, uniqueUsers: new Set() };
      }
      aiFeatureStats[u.feature].totalUses += u.usage_count;
      aiFeatureStats[u.feature].uniqueUsers.add(u.user_id);
    });

    const aiUsageByFeature = Object.entries(aiFeatureStats).map(([feature, stats]) => ({
      feature,
      totalUses: stats.totalUses,
      uniqueUsers: stats.uniqueUsers.size,
    })).sort((a, b) => b.totalUses - a.totalUses);

    // AI usage over time (daily aggregation)
    const aiUsageByDate: Record<string, { total: number; users: Set<string> }> = {};
    aiUsage.forEach(u => {
      const date = new Date(u.created_at).toISOString().split('T')[0];
      if (!aiUsageByDate[date]) {
        aiUsageByDate[date] = { total: 0, users: new Set() };
      }
      aiUsageByDate[date].total += u.usage_count;
      aiUsageByDate[date].users.add(u.user_id);
    });

    const aiUsageOverTime = Object.entries(aiUsageByDate)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, stats]) => ({
        date,
        count: stats.total,
        uniqueUsers: stats.users.size,
      }));

    // Total AI stats
    const totalAiUses = aiUsage.reduce((acc, u) => acc + u.usage_count, 0);
    const uniqueAiUsers = new Set(aiUsage.map(u => u.user_id)).size;

    // AI feature display names mapping
    const featureDisplayNames: Record<string, string> = {
      navigator: 'Meridian Navigator',
      study_guide: 'AI Study Guide',
      flashcard: 'Flashcard Generator',
      exam_debrief: 'Exam Debrief',
      pre_exam_assessment: 'Pre-Exam Assessment',
      weekly_email: 'Weekly Progress Email',
    };

    // Format AI usage by feature with display names
    const aiUsageByFeatureFormatted = aiUsageByFeature.map(item => ({
      ...item,
      displayName: featureDisplayNames[item.feature] || item.feature,
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
      // AI Feature Analytics
      aiUsageByFeature: aiUsageByFeatureFormatted,
      aiUsageOverTime,
      totalAiUses,
      uniqueAiUsers,
    });
  } catch (error) {
    console.error('Error in analytics API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
