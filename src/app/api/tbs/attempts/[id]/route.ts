import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/tbs/attempts/[id]
 * Get a specific attempt
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const supabase = await createClient();
    const { id } = await params;

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

    // Get attempt
    const { data: attempt, error } = await supabase
      .from('tbs_attempts')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error || !attempt) {
      return NextResponse.json(
        { error: 'Attempt not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      attempt: {
        id: attempt.id,
        tbsId: attempt.tbs_id,
        startedAt: attempt.started_at,
        completedAt: attempt.completed_at,
        timeSpentSeconds: attempt.time_spent_seconds,
        responses: attempt.responses,
        scoreEarned: attempt.score_earned,
        maxScore: attempt.max_score,
        scorePercentage: attempt.score_percentage,
        gradingDetails: attempt.grading_details,
        isComplete: attempt.is_complete,
        lastSavedAt: attempt.last_saved_at,
      },
    });
  } catch (error) {
    console.error('TBS attempt fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/tbs/attempts/[id]
 * Update attempt (auto-save responses and time)
 * Body: { responses: Record<string, UserResponse>, timeSpentSeconds: number }
 */
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const supabase = await createClient();
    const { id } = await params;

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

    // Verify attempt belongs to user and is not complete
    const { data: existingAttempt, error: fetchError } = await supabase
      .from('tbs_attempts')
      .select('id, is_complete')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingAttempt) {
      return NextResponse.json(
        { error: 'Attempt not found' },
        { status: 404 }
      );
    }

    if (existingAttempt.is_complete) {
      return NextResponse.json(
        { error: 'Cannot modify completed attempt' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { responses, timeSpentSeconds } = body;

    // Build update object
    const updateData: Record<string, unknown> = {};

    if (responses !== undefined) {
      updateData.responses = responses;
    }

    if (timeSpentSeconds !== undefined) {
      updateData.time_spent_seconds = timeSpentSeconds;
    }

    // Update attempt
    const { data: attempt, error: updateError } = await supabase
      .from('tbs_attempts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating TBS attempt:', updateError);
      return NextResponse.json(
        { error: 'Failed to update attempt' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lastSavedAt: attempt.last_saved_at,
    });
  } catch (error) {
    console.error('TBS attempt update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/tbs/attempts/[id]
 * Delete an incomplete attempt
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const supabase = await createClient();
    const { id } = await params;

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

    // Only allow deleting incomplete attempts
    const { error } = await supabase
      .from('tbs_attempts')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id)
      .eq('is_complete', false);

    if (error) {
      console.error('Error deleting TBS attempt:', error);
      return NextResponse.json(
        { error: 'Failed to delete attempt' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('TBS attempt delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
