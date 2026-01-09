import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /api/tbs/stats
 * Get user's TBS statistics
 * Query params: section (optional)
 */
export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse query params
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    // Try using the RPC function first
    const { data: rpcStats, error: rpcError } = await supabase.rpc(
      'get_user_tbs_stats',
      { p_user_id: user.id, p_section: section }
    );

    if (!rpcError && rpcStats) {
      return NextResponse.json({ stats: rpcStats });
    }

    // Fallback: Calculate stats manually
    let attemptsQuery = supabase
      .from('tbs_attempts')
      .select(`
        id,
        tbs_id,
        is_complete,
        score_percentage,
        time_spent_seconds,
        tbs_questions!inner (
          section,
          tbs_type,
          topic
        )
      `)
      .eq('user_id', user.id);

    if (section) {
      attemptsQuery = attemptsQuery.eq('tbs_questions.section', section);
    }

    const { data: attempts, error: attemptsError } = await attemptsQuery;

    if (attemptsError) {
      console.error('Error fetching TBS stats:', attemptsError);
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      );
    }

    // Calculate statistics
    const totalAttempts = attempts?.length || 0;
    const completedAttempts = attempts?.filter(a => a.is_complete) || [];
    const uniqueTBS = new Set(attempts?.map(a => a.tbs_id)).size;

    const completedWithScores = completedAttempts.filter(a => a.score_percentage !== null);
    const averageScore = completedWithScores.length > 0
      ? completedWithScores.reduce((sum, a) => sum + (a.score_percentage || 0), 0) / completedWithScores.length
      : null;

    const completedWithTime = completedAttempts.filter(a => a.time_spent_seconds !== null);
    const averageTimeMinutes = completedWithTime.length > 0
      ? completedWithTime.reduce((sum, a) => sum + (a.time_spent_seconds || 0), 0) / completedWithTime.length / 60
      : null;

    // Calculate score by type
    const scoreByType: Record<string, { total: number; count: number }> = {};
    for (const attempt of completedWithScores) {
      // tbs_questions comes back as an object when using !inner join
      const tbsQuestion = attempt.tbs_questions as unknown as { tbs_type: string; topic: string; section: string } | null;
      const tbsType = tbsQuestion?.tbs_type;
      if (tbsType) {
        if (!scoreByType[tbsType]) {
          scoreByType[tbsType] = { total: 0, count: 0 };
        }
        scoreByType[tbsType].total += attempt.score_percentage || 0;
        scoreByType[tbsType].count++;
      }
    }

    const scoreByTypeAverages: Record<string, number> = {};
    for (const [type, data] of Object.entries(scoreByType)) {
      scoreByTypeAverages[type] = Math.round((data.total / data.count) * 100) / 100;
    }

    // Calculate score by topic
    const scoreByTopic: Record<string, { total: number; count: number }> = {};
    for (const attempt of completedWithScores) {
      const tbsQuestion = attempt.tbs_questions as unknown as { tbs_type: string; topic: string; section: string } | null;
      const topic = tbsQuestion?.topic;
      if (topic) {
        if (!scoreByTopic[topic]) {
          scoreByTopic[topic] = { total: 0, count: 0 };
        }
        scoreByTopic[topic].total += attempt.score_percentage || 0;
        scoreByTopic[topic].count++;
      }
    }

    const scoreByTopicAverages: Record<string, number> = {};
    for (const [topic, data] of Object.entries(scoreByTopic)) {
      scoreByTopicAverages[topic] = Math.round((data.total / data.count) * 100) / 100;
    }

    // Find strong and weak topics
    const topicScores = Object.entries(scoreByTopicAverages)
      .map(([topic, score]) => ({ topic, score }))
      .sort((a, b) => b.score - a.score);

    const strongTopics = topicScores.filter(t => t.score >= 75).map(t => t.topic).slice(0, 3);
    const weakTopics = topicScores.filter(t => t.score < 75).map(t => t.topic).slice(-3);

    return NextResponse.json({
      stats: {
        totalAttempts,
        completedAttempts: completedAttempts.length,
        averageScore: averageScore ? Math.round(averageScore * 100) / 100 : null,
        averageTimeMinutes: averageTimeMinutes ? Math.round(averageTimeMinutes * 10) / 10 : null,
        uniqueTBSAttempted: uniqueTBS,
        scoreByType: scoreByTypeAverages,
        scoreByTopic: scoreByTopicAverages,
        strongTopics,
        weakTopics,
      },
    });
  } catch (error) {
    console.error('TBS stats fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
