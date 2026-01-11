import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * POST /api/tbs/attempts
 * Create a new TBS attempt
 * Body: { tbsId: string }
 */
export async function POST(request: Request) {
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

    // Parse request body
    const body = await request.json();
    const { tbsId } = body;

    if (!tbsId) {
      return NextResponse.json(
        { error: 'Missing required field: tbsId' },
        { status: 400 }
      );
    }

    // Verify the TBS question exists
    const { data: question, error: questionError } = await supabase
      .from('tbs_questions')
      .select('id, max_score_points')
      .eq('id', tbsId)
      .eq('is_active', true)
      .single();

    if (questionError || !question) {
      return NextResponse.json(
        { error: 'TBS question not found' },
        { status: 404 }
      );
    }

    // Check for existing incomplete attempt (to resume)
    const { data: existingAttempt } = await supabase
      .from('tbs_attempts')
      .select('*')
      .eq('user_id', user.id)
      .eq('tbs_id', tbsId)
      .eq('is_complete', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (existingAttempt) {
      // Return existing attempt to resume
      return NextResponse.json({
        attempt: {
          id: existingAttempt.id,
          tbsId: existingAttempt.tbs_id,
          startedAt: existingAttempt.started_at,
          timeSpentSeconds: existingAttempt.time_spent_seconds || 0,
          responses: existingAttempt.responses || {},
          isComplete: false,
          isResumed: true,
        },
        message: 'Resuming existing attempt',
      });
    }

    // Create new attempt
    const { data: attempt, error: insertError } = await supabase
      .from('tbs_attempts')
      .insert({
        user_id: user.id,
        tbs_id: tbsId,
        max_score: question.max_score_points,
        responses: {},
        is_complete: false,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating TBS attempt:', insertError);
      return NextResponse.json(
        { error: 'Failed to create attempt' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      attempt: {
        id: attempt.id,
        tbsId: attempt.tbs_id,
        startedAt: attempt.started_at,
        timeSpentSeconds: 0,
        responses: {},
        isComplete: false,
        isResumed: false,
      },
    });
  } catch (error) {
    console.error('TBS attempt creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/tbs/attempts
 * Get user's TBS attempts
 * Query params: tbsId (optional), limit, offset
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
    const tbsId = searchParams.get('tbsId');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query - select all columns from tbs_attempts directly
    // since frontend TBS IDs don't exist in tbs_questions table
    let query = supabase
      .from('tbs_attempts')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (tbsId) {
      query = query.eq('tbs_id', tbsId);
    }

    const { data: attempts, error, count } = await query;

    if (error) {
      console.error('Error fetching TBS attempts:', error);
      return NextResponse.json(
        { error: 'Failed to fetch attempts' },
        { status: 500 }
      );
    }

    // Transform to frontend format
    // Note: section is stored directly in tbs_attempts; title/type/topic
    // would need to be looked up from frontend TBS data if needed
    const transformedAttempts = attempts?.map(a => ({
      id: a.id,
      tbsId: a.tbs_id,
      tbsTitle: null, // Not stored in database; look up from frontend data if needed
      section: a.section, // Stored directly in tbs_attempts
      tbsType: null, // Not stored in database
      topic: null, // Not stored in database
      startedAt: a.started_at,
      completedAt: a.completed_at,
      timeSpentSeconds: a.time_spent_seconds,
      scoreEarned: a.score_earned,
      maxScore: a.max_score,
      scorePercentage: a.score_percentage,
      isComplete: a.is_complete,
    }));

    return NextResponse.json({
      attempts: transformedAttempts,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('TBS attempts fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
