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
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use service role client to bypass RLS for admin queries
    const serviceClient = createServiceRoleClient();
    if (!serviceClient) {
      return NextResponse.json({ error: 'Service client unavailable' }, { status: 500 });
    }

    const searchParams = request.nextUrl.searchParams;
    const section = searchParams.get('section');
    const accuracy = searchParams.get('accuracy');
    const sortBy = searchParams.get('sortBy') || 'times_shown';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Try to get from question_stats table first (if it exists)
    let query = serviceClient
      .from('question_stats')
      .select('*');

    if (section && section !== 'all') {
      query = query.eq('section', section);
    }

    // Handle accuracy filtering
    if (accuracy && accuracy !== 'all') {
      switch (accuracy) {
        case 'low':
          query = query.lt('accuracy_rate', 0.5);
          break;
        case 'medium':
          query = query.gte('accuracy_rate', 0.5).lt('accuracy_rate', 0.75);
          break;
        case 'high':
          query = query.gte('accuracy_rate', 0.75).lt('accuracy_rate', 0.95);
          break;
        case 'very_high':
          query = query.gte('accuracy_rate', 0.95);
          break;
      }
    }

    // Handle sorting
    const validSortColumns = ['question_id', 'times_shown', 'accuracy_rate', 'avg_time_seconds', 'feedback_count'];
    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'times_shown';
    query = query.order(sortColumn, { ascending: sortOrder === 'asc' });

    const { data: statsData, error: statsError } = await query;

    // If question_stats exists and has data, use it
    if (!statsError && statsData && statsData.length > 0) {
      return NextResponse.json({ questions: statsData });
    }

    // Fallback: Calculate stats from practice_attempts (using service client)
    const { data: attempts, error: attemptsError } = await serviceClient
      .from('practice_attempts')
      .select('question_id, section, topic, is_correct, time_spent_seconds');

    if (attemptsError) {
      console.error('Error fetching attempts:', attemptsError);
      // If practice_attempts also fails (table might not exist or be empty), return empty array
      return NextResponse.json({ questions: [], message: 'No practice data available yet' });
    }

    // If no attempts yet, return empty with helpful message
    if (!attempts || attempts.length === 0) {
      return NextResponse.json({ questions: [], message: 'No practice attempts recorded yet. Stats will appear once users start practicing.' });
    }

    // Get feedback counts (using service client)
    const { data: feedbackData } = await serviceClient
      .from('question_feedback')
      .select('question_id');

    const feedbackCounts: Record<string, number> = {};
    feedbackData?.forEach(f => {
      feedbackCounts[f.question_id] = (feedbackCounts[f.question_id] || 0) + 1;
    });

    // Aggregate stats
    const questionStats: Record<string, {
      question_id: string;
      section: string;
      topic: string;
      times_shown: number;
      times_correct: number;
      total_time_seconds: number;
    }> = {};

    attempts?.forEach(attempt => {
      const qid = attempt.question_id;
      if (!questionStats[qid]) {
        questionStats[qid] = {
          question_id: qid,
          section: attempt.section || '',
          topic: attempt.topic || '',
          times_shown: 0,
          times_correct: 0,
          total_time_seconds: 0,
        };
      }
      questionStats[qid].times_shown++;
      if (attempt.is_correct) {
        questionStats[qid].times_correct++;
      }
      if (attempt.time_spent_seconds) {
        questionStats[qid].total_time_seconds += attempt.time_spent_seconds;
      }
    });

    let questions = Object.values(questionStats).map(q => ({
      question_id: q.question_id,
      section: q.section,
      topic: q.topic,
      times_shown: q.times_shown,
      times_correct: q.times_correct,
      accuracy_rate: q.times_shown > 0 ? q.times_correct / q.times_shown : 0,
      avg_time_seconds: q.times_shown > 0 ? q.total_time_seconds / q.times_shown : 0,
      feedback_count: feedbackCounts[q.question_id] || 0,
    }));

    // Apply section filter
    if (section && section !== 'all') {
      questions = questions.filter(q => q.section === section);
    }

    // Apply accuracy filter
    if (accuracy && accuracy !== 'all') {
      switch (accuracy) {
        case 'low':
          questions = questions.filter(q => q.accuracy_rate < 0.5);
          break;
        case 'medium':
          questions = questions.filter(q => q.accuracy_rate >= 0.5 && q.accuracy_rate < 0.75);
          break;
        case 'high':
          questions = questions.filter(q => q.accuracy_rate >= 0.75 && q.accuracy_rate < 0.95);
          break;
        case 'very_high':
          questions = questions.filter(q => q.accuracy_rate >= 0.95);
          break;
      }
    }

    // Sort
    questions.sort((a, b) => {
      const aVal = a[sortColumn as keyof typeof a] as number;
      const bVal = b[sortColumn as keyof typeof b] as number;
      return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return NextResponse.json({ questions });
  } catch (error) {
    console.error('Error in questions API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
