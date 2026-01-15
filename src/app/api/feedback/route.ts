import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requireAdmin, logAdminAction, ActionTypes } from '@/lib/admin/auth';
import { rateLimitMiddleware } from '@/lib/security/rate-limit';
import { logRateLimitExceeded, logAuthFailure, logUnauthorizedAccess } from '@/lib/security/logging';
import { validateSection, validateLength, validateRequired, MAX_LENGTHS, validationErrorResponse } from '@/lib/security/validation';

// Valid feedback types
const FEEDBACK_TYPES = ['wrong_answer', 'unclear', 'outdated', 'typo', 'other'] as const;
type FeedbackType = typeof FEEDBACK_TYPES[number];

// Valid status values
const STATUS_VALUES = ['pending', 'reviewed', 'resolved', 'dismissed'] as const;
type FeedbackStatus = typeof STATUS_VALUES[number];

interface SubmitFeedbackRequest {
  questionId: string;
  section: string;
  feedbackType: FeedbackType;
  comment?: string | null;
}

/**
 * POST /api/feedback
 * Submit new feedback for a question (requires authentication)
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
      await logAuthFailure(request, 'No authenticated user', undefined);
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check rate limit (user-based since authenticated)
    const rateLimitResponse = await rateLimitMiddleware(request, 'feedback', user.id);
    if (rateLimitResponse) {
      await logRateLimitExceeded(request, 'feedback', user.id);
      return rateLimitResponse;
    }

    // Parse request body
    const body: SubmitFeedbackRequest = await request.json();
    const { questionId, section, feedbackType, comment } = body;

    // Validate questionId
    const questionIdValidation = validateRequired(questionId, 'questionId', MAX_LENGTHS.questionId, request);
    if (!questionIdValidation.valid) {
      return validationErrorResponse(questionIdValidation.error!);
    }

    // Validate section
    const sectionValidation = validateSection(section, request);
    if (!sectionValidation.valid) {
      return validationErrorResponse(sectionValidation.error!);
    }

    // Validate feedback type
    if (!feedbackType || !FEEDBACK_TYPES.includes(feedbackType)) {
      return validationErrorResponse(
        `Invalid feedback type. Must be one of: ${FEEDBACK_TYPES.join(', ')}`
      );
    }

    // Validate comment length if provided
    if (comment) {
      const commentValidation = validateLength(comment, 'comment', MAX_LENGTHS.comment, request);
      if (!commentValidation.valid) {
        return validationErrorResponse(commentValidation.error!);
      }
    }

    // Insert feedback
    const { data: feedback, error: insertError } = await supabase
      .from('question_feedback')
      .insert({
        user_id: user.id,
        question_id: questionIdValidation.sanitized,
        section: sectionValidation.sanitized,
        feedback_type: feedbackType,
        comment: comment?.trim() || null,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting feedback:', insertError);
      return NextResponse.json(
        { error: 'Failed to submit feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      feedback,
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/feedback
 * Get feedback list (admin only)
 * Query params: status, section, limit, offset
 */
export async function GET(request: Request) {
  try {
    // Require admin access
    const admin = await requireAdmin();

    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Parse query params
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as FeedbackStatus | null;
    const section = searchParams.get('section');
    const questionId = searchParams.get('questionId');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build query
    let query = supabase
      .from('question_feedback')
      .select('*, profiles:user_id(email, full_name)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (status && STATUS_VALUES.includes(status)) {
      query = query.eq('status', status);
    }

    if (section) {
      query = query.eq('section', section.toUpperCase());
    }

    if (questionId) {
      query = query.eq('question_id', questionId);
    }

    const { data: feedback, error, count } = await query;

    if (error) {
      console.error('Error fetching feedback:', error);
      return NextResponse.json(
        { error: 'Failed to fetch feedback' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      feedback,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Admin access required')) {
        await logUnauthorizedAccess(request, 'feedback-list');
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        );
      }
      if (error.message.includes('Authentication required')) {
        await logAuthFailure(request, 'Unauthenticated admin access attempt');
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
    }

    console.error('Feedback fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/feedback
 * Update feedback status (admin only)
 * Body: { id, status, adminNotes? }
 */
export async function PATCH(request: Request) {
  try {
    // Require admin access
    const admin = await requireAdmin();

    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { id, status, adminNotes } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Missing feedback ID' },
        { status: 400 }
      );
    }

    if (status && !STATUS_VALUES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${STATUS_VALUES.join(', ')}` },
        { status: 400 }
      );
    }

    // Build update object
    const updateData: Record<string, unknown> = {};

    if (status) {
      updateData.status = status;

      if (status === 'resolved' || status === 'dismissed') {
        updateData.resolved_at = new Date().toISOString();
        updateData.resolved_by = admin.email;
      }
    }

    if (adminNotes !== undefined) {
      updateData.admin_notes = adminNotes;
    }

    // Update feedback
    const { data: feedback, error } = await supabase
      .from('question_feedback')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating feedback:', error);
      return NextResponse.json(
        { error: 'Failed to update feedback' },
        { status: 500 }
      );
    }

    // Log admin action
    await logAdminAction(
      status === 'resolved' ? ActionTypes.FEEDBACK_RESOLVED :
      status === 'dismissed' ? ActionTypes.FEEDBACK_DISMISSED :
      'feedback_updated',
      {
        targetType: 'feedback',
        targetId: id,
        metadata: { status, adminNotes },
      }
    );

    return NextResponse.json({
      success: true,
      feedback,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Admin access required')) {
        await logUnauthorizedAccess(request, 'feedback-update');
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        );
      }
      if (error.message.includes('Authentication required')) {
        await logAuthFailure(request, 'Unauthenticated admin access attempt');
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
    }

    console.error('Feedback update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
