import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Valid TBS types
const TBS_TYPES = [
  'numeric_entry',
  'document_review',
  'journal_entry',
  'research',
  'reconciliation',
  'written_communication',
] as const;

// Valid sections
const SECTIONS = ['FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC'] as const;

// Valid difficulties
const DIFFICULTIES = ['easy', 'medium', 'hard'] as const;

/**
 * GET /api/tbs/questions
 * List TBS questions with optional filters
 * Query params: section, tbsType, topic, difficulty, limit, offset
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

    // Get current user (authentication required)
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
    const tbsType = searchParams.get('tbsType');
    const topic = searchParams.get('topic');
    const difficulty = searchParams.get('difficulty');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = supabase
      .from('tbs_questions')
      .select('*', { count: 'exact' })
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (section && SECTIONS.includes(section as typeof SECTIONS[number])) {
      query = query.eq('section', section);
    }

    if (tbsType && TBS_TYPES.includes(tbsType as typeof TBS_TYPES[number])) {
      query = query.eq('tbs_type', tbsType);
    }

    if (topic) {
      query = query.ilike('topic', `%${topic}%`);
    }

    if (difficulty && DIFFICULTIES.includes(difficulty as typeof DIFFICULTIES[number])) {
      query = query.eq('difficulty', difficulty);
    }

    const { data: questions, error, count } = await query;

    if (error) {
      console.error('Error fetching TBS questions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch questions' },
        { status: 500 }
      );
    }

    // Get user's attempt history for these questions
    const questionIds = questions?.map(q => q.id) || [];
    let attempts: Record<string, { completed: number; bestScore: number | null }> = {};

    if (questionIds.length > 0) {
      const { data: userAttempts } = await supabase
        .from('tbs_attempts')
        .select('tbs_id, is_complete, score_percentage')
        .eq('user_id', user.id)
        .in('tbs_id', questionIds);

      if (userAttempts) {
        for (const attempt of userAttempts) {
          if (!attempts[attempt.tbs_id]) {
            attempts[attempt.tbs_id] = { completed: 0, bestScore: null };
          }
          if (attempt.is_complete) {
            attempts[attempt.tbs_id].completed++;
            if (attempt.score_percentage !== null) {
              const current = attempts[attempt.tbs_id].bestScore;
              if (current === null || attempt.score_percentage > current) {
                attempts[attempt.tbs_id].bestScore = attempt.score_percentage;
              }
            }
          }
        }
      }
    }

    // Transform to camelCase for frontend
    const transformedQuestions = questions?.map(q => ({
      id: q.id,
      section: q.section,
      tbsType: q.tbs_type,
      topic: q.topic,
      subtopic: q.subtopic,
      difficulty: q.difficulty,
      title: q.title,
      timeEstimateMinutes: q.time_estimate_minutes,
      maxScorePoints: q.max_score_points,
      attemptCount: attempts[q.id]?.completed || 0,
      bestScore: attempts[q.id]?.bestScore || null,
    }));

    return NextResponse.json({
      questions: transformedQuestions,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('TBS questions fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
