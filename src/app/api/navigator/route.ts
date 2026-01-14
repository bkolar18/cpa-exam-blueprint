import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Anthropic from '@anthropic-ai/sdk';
import { getFeatureLimit, type SubscriptionTier, BETA_LIMITS } from '@/lib/ai/beta-limits';

// Force dynamic to prevent caching
export const dynamic = 'force-dynamic';

// Read IS_BETA at request time, not module load time
function isBetaPeriod(): boolean {
  return process.env.IS_BETA_PERIOD === 'true';
}

// Types
interface NavigatorMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface QuestionContext {
  questionId?: string;
  questionText?: string;
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  topic?: string;
  subtopic?: string | null;
  section?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  questionType?: 'mcq' | 'tbs';
  userAnswer?: string;
  isCorrect?: boolean;
}

interface AnalyticsContext {
  topicAccuracy?: number;
  topicQuestionsAttempted?: number;
  topicMasteryLevel?: 'weak' | 'moderate' | 'mastered';
  primeMeridianScore?: number;
  daysUntilExam?: number;
  recentMistakeCount?: number;
}

interface NavigatorRequest {
  message: string;
  conversationHistory?: NavigatorMessage[];
  questionContext?: QuestionContext;
  analyticsContext?: AnalyticsContext;
  mode: 'practice' | 'review';
}

// System prompt components
const BASE_SYSTEM_PROMPT = `You are the Meridian Navigator, an AI-powered CPA exam study tutor. Your role is to help students understand accounting concepts, walk through practice problems, and clarify misconceptions.

IMPORTANT GUIDELINES:
- You provide educational guidance only, NOT professional advice
- You are NOT affiliated with the AICPA, NASBA, or any official body
- Tax laws and accounting standards change frequently; encourage users to verify current rules
- If uncertain, acknowledge uncertainty and recommend authoritative sources
- Do NOT guarantee exam results or make promises about passing
- Stay on topic: CPA exam content only (FAR, AUD, REG, TCP, BAR, ISC)
- Do NOT help with actual client work, assignments, or anything outside exam preparation

COMMUNICATION STYLE:
- Be encouraging but avoid language implying guarantees
- Never say "You're ready", "You'll pass", "You're going to ace this"
- Instead use: "You're making progress", "This shows solid understanding", "Keep building on this"
- If asked about readiness, redirect to specific areas for improvement
- Focus on the learning journey, not predicted outcomes

RESPONSE FORMAT:
- Keep responses concise and focused (aim for 150-300 words)
- Use bullet points for lists
- Bold key terms or concepts
- For calculations, show step-by-step work`;

const PRACTICE_MODE_PROMPT = `
MODE: PRACTICE (Socratic Method)
The student is actively working on this question and has NOT submitted their answer yet.

CRITICAL RULES FOR PRACTICE MODE:
- NEVER reveal the correct answer directly
- NEVER say "The answer is..." or "You should select..."
- Guide with questions: "What does [concept] mean in this context?"
- Give hints about the underlying concept
- Point toward relevant accounting standards or rules
- If they ask directly for the answer, remind them you're in hint mode
- Help them reason through the problem step by step`;

const REVIEW_MODE_PROMPT = `
MODE: REVIEW (Full Explanation)
The student has submitted their answer and is reviewing the question.

You can:
- Explain why the correct answer is correct
- Explain why each incorrect option is wrong
- Provide detailed walkthroughs of the concept
- Share related concepts they should study
- Give full explanations and examples`;

/**
 * Build the complete system prompt based on context
 */
function buildSystemPrompt(
  mode: 'practice' | 'review',
  questionContext?: QuestionContext,
  analyticsContext?: AnalyticsContext
): string {
  let prompt = BASE_SYSTEM_PROMPT;

  // Add mode-specific instructions
  prompt += mode === 'practice' ? PRACTICE_MODE_PROMPT : REVIEW_MODE_PROMPT;

  // Add question context if available
  if (questionContext) {
    prompt += `\n\nCURRENT QUESTION CONTEXT:`;
    prompt += `\nSection: ${questionContext.section || 'Unknown'}`;
    prompt += `\nTopic: ${questionContext.topic || 'Unknown'}`;
    if (questionContext.subtopic) {
      prompt += `\nSubtopic: ${questionContext.subtopic}`;
    }
    prompt += `\nDifficulty: ${questionContext.difficulty || 'Unknown'}`;
    prompt += `\nQuestion Type: ${questionContext.questionType?.toUpperCase() || 'MCQ'}`;

    if (questionContext.questionText) {
      prompt += `\n\nQuestion:\n${questionContext.questionText}`;
    }

    if (questionContext.options && questionContext.options.length > 0) {
      prompt += `\n\nAnswer Options:`;
      questionContext.options.forEach((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        prompt += `\n${letter}. ${opt}`;
      });
    }

    // Only include answer info in review mode
    if (mode === 'review') {
      if (questionContext.userAnswer) {
        prompt += `\n\nStudent's Answer: ${questionContext.userAnswer}`;
      }
      if (questionContext.isCorrect !== undefined) {
        prompt += `\nResult: ${questionContext.isCorrect ? 'CORRECT' : 'INCORRECT'}`;
      }
      if (questionContext.correctAnswer) {
        prompt += `\nCorrect Answer: ${questionContext.correctAnswer}`;
      }
      if (questionContext.explanation) {
        prompt += `\n\nOfficial Explanation:\n${questionContext.explanation}`;
      }
    }
  }

  // Add analytics context for personalization
  if (analyticsContext) {
    prompt += `\n\nSTUDENT PERFORMANCE CONTEXT:`;
    if (analyticsContext.topicAccuracy !== undefined) {
      prompt += `\n- Topic accuracy: ${analyticsContext.topicAccuracy}% (${analyticsContext.topicQuestionsAttempted || 0} questions)`;
    }
    if (analyticsContext.topicMasteryLevel) {
      prompt += `\n- Topic mastery: ${analyticsContext.topicMasteryLevel}`;
    }
    if (analyticsContext.primeMeridianScore !== undefined) {
      prompt += `\n- Overall readiness score: ${analyticsContext.primeMeridianScore}/100`;
    }
    if (analyticsContext.daysUntilExam !== undefined && analyticsContext.daysUntilExam > 0) {
      prompt += `\n- Days until exam: ${analyticsContext.daysUntilExam}`;
    }
    if (analyticsContext.recentMistakeCount !== undefined && analyticsContext.recentMistakeCount > 0) {
      prompt += `\n- Recent mistakes in this topic: ${analyticsContext.recentMistakeCount}`;
    }

    prompt += `\n\nUse this context to personalize your response. If the student is struggling with this topic, be more encouraging and thorough. If they're doing well, you can be more concise.`;
  }

  return prompt;
}

/**
 * Check and update usage limits
 */
async function checkAndUpdateUsage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  tier: string
): Promise<{ allowed: boolean; remaining: number; limit: number; isBeta: boolean }> {
  const IS_BETA = isBetaPeriod();
  const dailyLimit = IS_BETA ? BETA_LIMITS.navigator : getFeatureLimit('navigator', tier as SubscriptionTier);
  const today = new Date().toISOString().split('T')[0];

  if (!supabase) {
    return { allowed: false, remaining: 0, limit: dailyLimit, isBeta: IS_BETA };
  }

  // Get or create today's usage record
  const { data: usageRecord, error: fetchError } = await supabase
    .from('ai_feature_usage')
    .select('usage_count')
    .eq('user_id', userId)
    .eq('feature', 'navigator')
    .eq('period_type', 'daily')
    .eq('period_key', today)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error fetching usage:', fetchError);
    // Allow on error to not block users
    return { allowed: true, remaining: dailyLimit, limit: dailyLimit, isBeta: IS_BETA };
  }

  const currentUsage = usageRecord?.usage_count || 0;
  const remaining = Math.max(0, dailyLimit - currentUsage);

  if (currentUsage >= dailyLimit) {
    return { allowed: false, remaining: 0, limit: dailyLimit, isBeta: IS_BETA };
  }

  // Increment usage
  if (usageRecord) {
    await supabase
      .from('ai_feature_usage')
      .update({
        usage_count: currentUsage + 1,
        last_used_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('feature', 'navigator')
      .eq('period_type', 'daily')
      .eq('period_key', today);
  } else {
    await supabase.from('ai_feature_usage').insert({
      user_id: userId,
      feature: 'navigator',
      period_type: 'daily',
      period_key: today,
      usage_count: 1,
    });
  }

  return { allowed: true, remaining: remaining - 1, limit: dailyLimit, isBeta: IS_BETA };
}

/**
 * POST /api/navigator
 * Send a message to the Meridian Navigator AI tutor
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
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required to use the Navigator' },
        { status: 401 }
      );
    }

    // Get user's subscription tier
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const tier = profile?.subscription_tier || 'free';

    // Check rate limits
    const usageCheck = await checkAndUpdateUsage(supabase, user.id, tier);

    if (!usageCheck.allowed) {
      return NextResponse.json(
        {
          error: 'Daily message limit reached',
          limit: usageCheck.limit,
          remaining: 0,
          upgradePrompt:
            tier === 'free'
              ? 'Upgrade to Standard for 50 messages/day or Pro for 200 messages/day'
              : tier === 'standard'
                ? 'Upgrade to Pro for 200 messages/day'
                : null,
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body: NavigatorRequest = await request.json();
    const {
      message,
      conversationHistory = [],
      questionContext,
      analyticsContext,
      mode,
    } = body;

    // Validate required fields
    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!mode || !['practice', 'review'].includes(mode)) {
      return NextResponse.json(
        { error: 'Mode must be either "practice" or "review"' },
        { status: 400 }
      );
    }

    // Check for Anthropic API key
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicApiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return NextResponse.json(
        { error: 'AI service not configured' },
        { status: 500 }
      );
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: anthropicApiKey,
    });

    // Build system prompt
    const systemPrompt = buildSystemPrompt(mode, questionContext, analyticsContext);

    // Build messages array for Claude
    const messages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

    // Add conversation history (limit to last 10 messages to control costs)
    const recentHistory = conversationHistory.slice(-10);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message,
    });

    // Call Claude API (using Haiku for cost efficiency)
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    // Extract response text
    const assistantMessage =
      response.content[0].type === 'text' ? response.content[0].text : '';

    // Log conversation for quality improvement (optional, can be disabled)
    if (process.env.LOG_NAVIGATOR_CONVERSATIONS === 'true') {
      await supabase.from('ai_tutor_conversations').insert([
        {
          user_id: user.id,
          session_id: body.questionContext?.questionId || 'general',
          role: 'user',
          content: message,
          context: {
            question_id: questionContext?.questionId,
            section: questionContext?.section,
            topic: questionContext?.topic,
            mode,
          },
        },
        {
          user_id: user.id,
          session_id: body.questionContext?.questionId || 'general',
          role: 'assistant',
          content: assistantMessage,
          context: {
            question_id: questionContext?.questionId,
            section: questionContext?.section,
            topic: questionContext?.topic,
            mode,
          },
        },
      ]);
    }

    return NextResponse.json({
      message: assistantMessage,
      usage: {
        remaining: usageCheck.remaining,
        limit: usageCheck.limit,
      },
    });
  } catch (error) {
    console.error('Navigator error:', error);

    // Handle specific Anthropic errors
    if (error instanceof Anthropic.APIError) {
      if (error.status === 429) {
        return NextResponse.json(
          { error: 'AI service is temporarily busy. Please try again in a moment.' },
          { status: 503 }
        );
      }
      if (error.status === 401) {
        return NextResponse.json(
          { error: 'AI service configuration error' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/navigator
 * Get current usage stats for the Navigator
 */
export async function GET() {
  const IS_BETA = isBetaPeriod();

  try {
    const supabase = await createClient();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user's subscription tier
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const tier = (profile?.subscription_tier || 'free') as SubscriptionTier;

    // During beta, use beta limits regardless of tier
    const dailyLimit = IS_BETA ? BETA_LIMITS.navigator : getFeatureLimit('navigator', tier);
    const today = new Date().toISOString().split('T')[0];

    // Get today's usage
    const { data: usageRecord } = await supabase
      .from('ai_feature_usage')
      .select('usage_count, last_used_at')
      .eq('user_id', user.id)
      .eq('feature', 'navigator')
      .eq('period_type', 'daily')
      .eq('period_key', today)
      .single();

    const currentUsage = usageRecord?.usage_count || 0;
    const remaining = Math.max(0, dailyLimit - currentUsage);

    return NextResponse.json({
      tier,
      limit: dailyLimit,
      used: currentUsage,
      remaining,
      lastUsedAt: usageRecord?.last_used_at || null,
      resetsAt: `${today}T23:59:59Z`,
      isBeta: IS_BETA,
    });
  } catch (error) {
    console.error('Usage check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
