import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Force dynamic to prevent caching
export const dynamic = 'force-dynamic';

/**
 * GET /api/ai/generate-flashcards/topics
 * Fetch user's topic performance data for a specific section
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get section from query params
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (!section) {
      return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }

    // Fetch user's topic performance for this section
    const { data: topicData, error: topicError } = await supabase
      .from('user_topic_performance')
      .select('topic, accuracy_rate, total_attempted, mastery_level')
      .eq('user_id', user.id)
      .eq('section', section)
      .order('accuracy_rate', { ascending: true });

    if (topicError) {
      console.error('Error fetching topic performance:', topicError);
      // Return empty array if table doesn't exist or other error
      return NextResponse.json({ topics: [], section });
    }

    // If no performance data, try to get topics from practice attempts
    if (!topicData || topicData.length === 0) {
      const { data: attemptData } = await supabase
        .from('practice_attempts')
        .select('topic, is_correct')
        .eq('user_id', user.id)
        .eq('section', section)
        .not('topic', 'is', null);

      if (attemptData && attemptData.length > 0) {
        // Aggregate by topic
        const topicStats: Record<string, { correct: number; total: number }> = {};
        attemptData.forEach(attempt => {
          if (!attempt.topic) return;
          if (!topicStats[attempt.topic]) {
            topicStats[attempt.topic] = { correct: 0, total: 0 };
          }
          topicStats[attempt.topic].total++;
          if (attempt.is_correct) {
            topicStats[attempt.topic].correct++;
          }
        });

        // Convert to array format
        const topics = Object.entries(topicStats).map(([topic, stats]) => {
          const accuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
          return {
            topic,
            accuracy_rate: accuracy,
            total_attempted: stats.total,
            mastery_level: accuracy < 60 ? 'weak' : accuracy < 75 ? 'moderate' : 'mastered',
          };
        });

        // Sort by accuracy (lowest first)
        topics.sort((a, b) => a.accuracy_rate - b.accuracy_rate);

        return NextResponse.json({ topics, section });
      }
    }

    // Format and return topics
    const topics = (topicData || []).map(t => ({
      topic: t.topic,
      accuracy_rate: t.accuracy_rate || 0,
      total_attempted: t.total_attempted || 0,
      mastery_level: t.mastery_level || 'weak',
    }));

    return NextResponse.json({ topics, section });

  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json({ error: 'Failed to fetch topics' }, { status: 500 });
  }
}
