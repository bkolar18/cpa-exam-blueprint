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
    // Verify admin status with regular auth client
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use service role client to bypass RLS for admin search
    const serviceClient = createServiceRoleClient();
    if (!serviceClient) {
      console.error('Service role client not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query || query.length < 2) {
      return NextResponse.json({ users: [], feedback: [], questions: [] });
    }

    const searchQuery = query.toLowerCase();

    // Search users by email or name using service client
    const { data: usersData } = await serviceClient
      .from('profiles')
      .select('id, email, full_name')
      .or(`email.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%`)
      .limit(5);

    const users = (usersData || []).map(u => ({
      id: u.id,
      title: u.full_name || u.email,
      subtitle: u.email,
    }));

    // Search feedback by question_id or comment
    const { data: feedbackData } = await serviceClient
      .from('question_feedback')
      .select('id, question_id, section, feedback_type, comment')
      .or(`question_id.ilike.%${searchQuery}%,comment.ilike.%${searchQuery}%`)
      .limit(5);

    const feedback = (feedbackData || []).map(f => ({
      id: f.id,
      title: f.question_id,
      subtitle: `${f.section} • ${f.feedback_type}${f.comment ? ` • "${f.comment.substring(0, 30)}..."` : ''}`,
    }));

    // Search questions by ID (from question_stats if available, otherwise from feedback)
    const { data: questionStatsData } = await serviceClient
      .from('question_stats')
      .select('question_id, section, topic')
      .ilike('question_id', `%${searchQuery}%`)
      .limit(5);

    let questions = (questionStatsData || []).map(q => ({
      id: q.question_id,
      title: q.question_id,
      subtitle: `${q.section}${q.topic ? ` • ${q.topic}` : ''}`,
    }));

    // If no results from question_stats, try to find from feedback
    if (questions.length === 0) {
      const { data: feedbackQuestionsData } = await serviceClient
        .from('question_feedback')
        .select('question_id, section')
        .ilike('question_id', `%${searchQuery}%`)
        .limit(5);

      // Deduplicate
      const seen = new Set<string>();
      questions = (feedbackQuestionsData || [])
        .filter(q => {
          if (seen.has(q.question_id)) return false;
          seen.add(q.question_id);
          return true;
        })
        .map(q => ({
          id: q.question_id,
          title: q.question_id,
          subtitle: q.section,
        }));
    }

    return NextResponse.json({ users, feedback, questions });
  } catch (error) {
    console.error('Error in admin search API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
