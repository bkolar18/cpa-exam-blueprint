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
    // Note: We query tbs_attempts directly since frontend TBS IDs are strings
    // that don't exist in tbs_questions table. The section is stored directly
    // in tbs_attempts for this reason.
    let attemptsQuery = supabase
      .from('tbs_attempts')
      .select(`
        id,
        tbs_id,
        section,
        is_complete,
        score_percentage,
        time_spent_seconds
      `)
      .eq('user_id', user.id);

    if (section) {
      attemptsQuery = attemptsQuery.eq('section', section);
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

    // Note: scoreByType and scoreByTopic require TBS metadata (type, topic)
    // which isn't stored in tbs_attempts. For now, return empty objects.
    // A future enhancement could store tbs_type and topic in tbs_attempts
    // or look up from local TBS data.
    const scoreByTypeAverages: Record<string, number> = {};
    const scoreByTopicAverages: Record<string, number> = {};
    const strongTopics: string[] = [];
    const weakTopics: string[] = [];

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
