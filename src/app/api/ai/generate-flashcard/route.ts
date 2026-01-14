import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Anthropic from '@anthropic-ai/sdk';
import { getFeatureLimit, IS_BETA, isFeatureAvailable, type SubscriptionTier } from '@/lib/ai/beta-limits';

interface FlashcardRequest {
  questionId: string;
  questionText: string;
  correctAnswer: string;
  userAnswer?: string;
  explanation?: string;
  section: string;
  topic: string;
  subtopic?: string;
  options?: Record<string, string>;
}

export async function POST(request: NextRequest) {
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
    const body: FlashcardRequest = await request.json();
    const { questionId, questionText, correctAnswer, userAnswer, explanation, section, topic, subtopic, options } = body;

    if (!questionId || !questionText || !correctAnswer || !section || !topic) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get user's subscription tier
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const tier = (profile?.subscription_tier || 'free') as SubscriptionTier;
    const limit = getFeatureLimit('flashcard', tier);

    // Check if feature is available (always available in beta, tier-restricted otherwise)
    if (!isFeatureAvailable('flashcard', tier)) {
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

    if (currentUsage >= limit) {
      return NextResponse.json({
        error: `You've used all ${limit} flashcard generations for this month`,
        remaining: 0,
        resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
      }, { status: 429 });
    }

    // Build the prompt
    const systemPrompt = `You are Meridian Navigator, an AI flashcard generator for CPA exam preparation. Your task is to create a concise, effective flashcard from a missed question.

Generate a flashcard with:
1. FRONT: A clear question that tests the key concept (not just copying the original question)
2. BACK: A concise answer followed by a brief explanation and memory tips

Format your response as JSON:
{
  "front": "Question text here",
  "back": "Answer\\n\\nExplanation here",
  "tags": ["section", "topic", "subtopic if applicable"],
  "keyTakeaway": "One sentence summary of the concept"
}

Guidelines:
- Extract the core concept being tested
- Make the front question clear and focused
- Keep the back answer concise but complete
- Include a memorable explanation or mnemonic if applicable
- Tags should help with organization and review`;

    const optionsText = options
      ? Object.entries(options).map(([key, value]) => `${key}. ${value}`).join('\n')
      : '';

    const userMessage = `Create a flashcard from this missed question:

QUESTION: ${questionText}

${optionsText ? `OPTIONS:\n${optionsText}\n` : ''}

CORRECT ANSWER: ${correctAnswer}
${userAnswer ? `USER'S WRONG ANSWER: ${userAnswer}` : ''}
${explanation ? `EXISTING EXPLANATION: ${explanation}` : ''}

SECTION: ${section}
TOPIC: ${topic}
${subtopic ? `SUBTOPIC: ${subtopic}` : ''}

Generate a flashcard that will help the student remember this concept correctly.`;

    // Call Claude API
    const anthropic = new Anthropic();
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    // Extract and parse JSON response
    const responseText = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('');

    // Try to parse JSON from response
    let flashcard;
    try {
      // Find JSON in the response (it might be wrapped in markdown code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        flashcard = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch {
      // If parsing fails, create a simple flashcard from the response
      flashcard = {
        front: `What is the key concept tested in this ${topic} question?`,
        back: responseText,
        tags: [section, topic, subtopic].filter(Boolean),
        keyTakeaway: 'Review this concept for better understanding.',
      };
    }

    // Increment usage
    await supabase
      .from('ai_feature_usage')
      .upsert({
        user_id: user.id,
        feature: 'flashcard',
        period_type: 'monthly',
        period_key: currentMonth,
        usage_count: currentUsage + 1,
        last_used_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,feature,period_type,period_key',
      });

    // Optionally save the flashcard to a flashcards table if one exists
    // For now, just return the generated flashcard

    return NextResponse.json({
      success: true,
      flashcard: {
        ...flashcard,
        sourceQuestionId: questionId,
        generatedAt: new Date().toISOString(),
      },
      isBeta: IS_BETA,
      usage: {
        used: currentUsage + 1,
        limit,
        remaining: limit - currentUsage - 1,
      },
    });

  } catch (error) {
    console.error('Error generating flashcard:', error);
    return NextResponse.json({ error: 'Failed to generate flashcard' }, { status: 500 });
  }
}

// GET endpoint to check usage
export async function GET() {
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
    const limit = getFeatureLimit('flashcard', tier);

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
      isBeta: IS_BETA,
      resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
    });

  } catch (error) {
    console.error('Error checking flashcard usage:', error);
    return NextResponse.json({ error: 'Failed to check usage' }, { status: 500 });
  }
}
