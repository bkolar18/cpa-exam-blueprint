import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Anthropic from '@anthropic-ai/sdk';
import { getFeatureLimit, IS_BETA, isFeatureAvailable, type SubscriptionTier, BETA_LIMITS } from '@/lib/ai/beta-limits';

// Force dynamic to prevent caching
export const dynamic = 'force-dynamic';

// Read IS_BETA at request time, not module load time
function isBetaPeriod(): boolean {
  return process.env.IS_BETA_PERIOD === 'true';
}

type FlashcardSource = 'missed_questions' | 'weak_topics' | 'all_topics' | 'manual';

interface GenerateFlashcardsRequest {
  section: string;
  source: FlashcardSource;
  count: number;
  focusTopics?: string[];
}

interface MissedQuestion {
  question_id: string;
  topic: string;
  subtopic?: string;
  question_text?: string;
  correct_answer?: string;
  explanation?: string;
}

export async function POST(request: NextRequest) {
  const IS_BETA_NOW = isBetaPeriod();

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

    // Parse request body
    const body: GenerateFlashcardsRequest = await request.json();
    const { section, source = 'missed_questions', count = 3, focusTopics } = body;

    if (!section) {
      return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }

    // Validate count (max 5 at a time)
    const cardCount = Math.min(Math.max(1, count), 5);

    // Get user's subscription tier
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const tier = (profile?.subscription_tier || 'free') as SubscriptionTier;
    const limit = IS_BETA_NOW ? BETA_LIMITS.flashcard : getFeatureLimit('flashcard', tier);

    // Check if feature is available
    if (!IS_BETA_NOW && !isFeatureAvailable('flashcard', tier)) {
      return NextResponse.json({
        error: 'Flashcard Generator is not available on the free tier',
        upgrade: true
      }, { status: 403 });
    }

    // Check usage for this month
    const currentMonth = new Date().toISOString().slice(0, 7);
    const { data: usageData } = await supabase
      .from('ai_feature_usage')
      .select('usage_count')
      .eq('user_id', user.id)
      .eq('feature', 'flashcard')
      .eq('period_type', 'monthly')
      .eq('period_key', currentMonth)
      .single();

    const currentUsage = usageData?.usage_count || 0;
    const remainingGenerations = limit - currentUsage;

    if (remainingGenerations <= 0) {
      return NextResponse.json({
        error: `You've used all ${limit} flashcard generations for this month`,
        remaining: 0,
        resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
      }, { status: 429 });
    }

    // Calculate how many cards we can actually generate
    const actualCardCount = Math.min(cardCount, remainingGenerations);

    // Fetch data based on source
    let topicsToUse: string[] = [];
    let missedQuestions: MissedQuestion[] = [];

    // If manual mode with focus topics, use those directly
    if (source === 'manual' && focusTopics && focusTopics.length > 0) {
      topicsToUse = focusTopics;
    } else if (source === 'missed_questions') {
      // Get recent missed questions
      const { data: missedData } = await supabase
        .from('practice_attempts')
        .select('question_id, topic, is_correct, created_at')
        .eq('user_id', user.id)
        .eq('section', section)
        .eq('is_correct', false)
        .order('created_at', { ascending: false })
        .limit(20);

      if (missedData && missedData.length > 0) {
        // Get unique topics from missed questions
        topicsToUse = [...new Set(missedData.map(d => d.topic).filter(Boolean))];
        missedQuestions = missedData.map(d => ({
          question_id: d.question_id,
          topic: d.topic || 'General',
        }));
      }
    } else if (source === 'weak_topics') {
      // Get weak topics from performance data
      const { data: perfData } = await supabase
        .from('user_topic_performance')
        .select('topic, accuracy_rate, mastery_level')
        .eq('user_id', user.id)
        .eq('section', section)
        .or('mastery_level.eq.weak,accuracy_rate.lt.60')
        .order('accuracy_rate', { ascending: true })
        .limit(10);

      if (perfData && perfData.length > 0) {
        topicsToUse = perfData.map(p => p.topic);
      }
    }

    // For non-manual modes, allow focusTopics to override
    if (source !== 'manual' && focusTopics && focusTopics.length > 0) {
      topicsToUse = focusTopics;
    }

    // If we still don't have topics, use general section topics
    if (topicsToUse.length === 0) {
      topicsToUse = ['General concepts', 'Key terminology', 'Important calculations'];
    }

    // Build the prompt for batch flashcard generation
    const systemPrompt = `You are Meridian Navigator, an AI flashcard generator for CPA exam preparation. Generate ${actualCardCount} unique, high-quality flashcards for the ${section} section of the CPA exam.

Each flashcard should:
1. Test a specific, important concept
2. Have a clear, focused question on the front
3. Have a concise but complete answer on the back
4. Include helpful memory aids when applicable

Format your response as a JSON array:
[
  {
    "front": "Question text",
    "back": "Answer with explanation",
    "topic": "Topic name",
    "keyTakeaway": "One sentence summary"
  }
]

Guidelines:
- Create diverse questions covering different aspects of each topic
- Use real CPA exam terminology and concepts
- Make questions testable and specific, not vague
- Include relevant calculations, rules, or standards when applicable
- Each card should stand alone and test one concept`;

    const sourceDescription = source === 'manual'
      ? 'the specific topics the student has selected to study'
      : source === 'missed_questions'
        ? 'concepts the student has struggled with based on their missed questions'
        : source === 'weak_topics'
          ? 'topics where the student needs improvement'
          : 'important concepts across the section';

    const userMessage = `Generate ${actualCardCount} flashcards for ${section} focusing on ${sourceDescription}.

TOPICS TO COVER:
${topicsToUse.slice(0, 5).map(t => `- ${t}`).join('\n')}

${missedQuestions.length > 0 ? `
RECENT MISSED QUESTION TOPICS (prioritize these):
${missedQuestions.slice(0, 5).map(q => `- ${q.topic}`).join('\n')}
` : ''}

Generate ${actualCardCount} unique flashcards that will help reinforce these concepts. Make each card memorable and focused on practical exam knowledge.`;

    // Call Claude API
    const anthropic = new Anthropic();
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    // Extract and parse JSON response
    const responseText = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('');

    // Try to parse JSON from response
    let flashcards = [];
    try {
      // Find JSON array in the response
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        flashcards = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON array found in response');
      }
    } catch {
      // If parsing fails, try to create cards from the response
      flashcards = [{
        front: `What are the key concepts in ${section}?`,
        back: responseText,
        topic: section,
        keyTakeaway: 'Review generated content',
      }];
    }

    // Add metadata to each flashcard
    const processedFlashcards = flashcards.map((card: { front: string; back: string; topic?: string; keyTakeaway?: string }, index: number) => ({
      id: `ai-${Date.now()}-${index}`,
      ...card,
      section,
      source,
      generatedAt: new Date().toISOString(),
    }));

    // Increment usage by the number of cards generated
    await supabase
      .from('ai_feature_usage')
      .upsert({
        user_id: user.id,
        feature: 'flashcard',
        period_type: 'monthly',
        period_key: currentMonth,
        usage_count: currentUsage + 1, // Count as 1 generation regardless of card count
        last_used_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,feature,period_type,period_key',
      });

    return NextResponse.json({
      success: true,
      flashcards: processedFlashcards,
      section,
      source,
      isBeta: IS_BETA_NOW,
      usage: {
        used: currentUsage + 1,
        limit,
        remaining: limit - currentUsage - 1,
      },
    });

  } catch (error) {
    console.error('Error generating flashcards:', error);
    return NextResponse.json({ error: 'Failed to generate flashcards' }, { status: 500 });
  }
}

// GET endpoint to check usage
export async function GET() {
  const IS_BETA_NOW = isBetaPeriod();

  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get user's subscription tier
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const tier = (profile?.subscription_tier || 'free') as SubscriptionTier;
    const limit = IS_BETA_NOW ? BETA_LIMITS.flashcard : getFeatureLimit('flashcard', tier);

    // Check usage for this month
    const currentMonth = new Date().toISOString().slice(0, 7);
    const { data: usageData } = await supabase
      .from('ai_feature_usage')
      .select('usage_count')
      .eq('user_id', user.id)
      .eq('feature', 'flashcard')
      .eq('period_type', 'monthly')
      .eq('period_key', currentMonth)
      .single();

    const currentUsage = usageData?.usage_count || 0;

    return NextResponse.json({
      used: currentUsage,
      limit,
      remaining: Math.max(0, limit - currentUsage),
      tier,
      isBeta: IS_BETA_NOW,
      resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
    });

  } catch (error) {
    console.error('Error checking flashcard usage:', error);
    return NextResponse.json({ error: 'Failed to check usage' }, { status: 500 });
  }
}
