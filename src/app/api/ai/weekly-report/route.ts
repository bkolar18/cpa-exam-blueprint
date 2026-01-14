import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';
import { IS_BETA, isFeatureAvailable, type SubscriptionTier } from '@/lib/ai/beta-limits';

// Initialize Resend for email sending
const resend = new Resend(process.env.RESEND_API_KEY);

interface WeeklyReportData {
  userId: string;
  email: string;
  name: string;
  studyHours: number;
  questionsAttempted: number;
  overallAccuracy: number;
  currentStreak: number;
  topicImprovements: Array<{ topic: string; before: number; after: number }>;
  weakAreas: Array<{ topic: string; accuracy: number }>;
  upcomingExams: Array<{ section: string; date: string; daysAway: number; primeMeridian: number }>;
}

// Generate weekly report for a single user (called by cron job)
export async function POST(request: NextRequest) {
  try {
    // Verify this is an authorized cron job request
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // For internal calls (from cron), check secret; for user preview, check auth
    const isInternalCall = authHeader === `Bearer ${cronSecret}`;

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    let targetUserId: string;
    let isPreview = false;

    if (isInternalCall) {
      // Called by cron job with specific user ID
      const body = await request.json();
      targetUserId = body.userId;
      if (!targetUserId) {
        return NextResponse.json({ error: 'User ID required for cron job' }, { status: 400 });
      }
    } else {
      // User requesting their own preview
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
      }
      targetUserId = user.id;
      isPreview = true;
    }

    // Get user profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('email, full_name, subscription_tier, weekly_email_enabled')
      .eq('id', targetUserId)
      .single();

    if (!profile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Check if user has weekly emails enabled (skip for preview)
    if (!isPreview && profile.weekly_email_enabled === false) {
      return NextResponse.json({ skipped: true, reason: 'Weekly emails disabled' });
    }

    // Calculate date range (last 7 days)
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // Fetch all relevant data for the week
    const [
      thisWeekAttempts,
      lastWeekAttempts,
      studyStreak,
      sectionProgress,
      thisWeekTopicPerf,
      lastWeekTopicPerf,
    ] = await Promise.all([
      // This week's practice attempts
      supabase
        .from('practice_attempts')
        .select('topic, section, is_correct, created_at')
        .eq('user_id', targetUserId)
        .gte('created_at', weekAgo.toISOString()),

      // Last week's practice attempts (for comparison)
      supabase
        .from('practice_attempts')
        .select('topic, section, is_correct')
        .eq('user_id', targetUserId)
        .gte('created_at', twoWeeksAgo.toISOString())
        .lt('created_at', weekAgo.toISOString()),

      // Study streak
      supabase
        .from('study_streaks')
        .select('current_streak, longest_streak')
        .eq('user_id', targetUserId)
        .single(),

      // Section progress with exam dates
      supabase
        .from('section_progress')
        .select('section, exam_date, prime_meridian_score')
        .eq('user_id', targetUserId)
        .not('exam_date', 'is', null),

      // This week topic performance (for improvement tracking)
      supabase
        .from('user_topic_performance')
        .select('topic, section, accuracy_rate')
        .eq('user_id', targetUserId)
        .gte('updated_at', weekAgo.toISOString()),

      // Last week topic performance
      supabase
        .from('user_topic_performance')
        .select('topic, section, accuracy_rate')
        .eq('user_id', targetUserId)
        .lt('updated_at', weekAgo.toISOString()),
    ]);

    const thisWeek = thisWeekAttempts.data || [];
    const lastWeek = lastWeekAttempts.data || [];
    const streak = studyStreak.data;
    const exams = sectionProgress.data || [];
    const currentTopics = thisWeekTopicPerf.data || [];
    const previousTopics = lastWeekTopicPerf.data || [];

    // Calculate metrics
    const questionsAttempted = thisWeek.length;
    const correctAnswers = thisWeek.filter(a => a.is_correct).length;
    const overallAccuracy = questionsAttempted > 0
      ? Math.round((correctAnswers / questionsAttempted) * 100)
      : 0;

    const lastWeekQuestions = lastWeek.length;
    const lastWeekCorrect = lastWeek.filter(a => a.is_correct).length;
    const lastWeekAccuracy = lastWeekQuestions > 0
      ? Math.round((lastWeekCorrect / lastWeekQuestions) * 100)
      : 0;

    // Find topic improvements
    const previousTopicMap = new Map(previousTopics.map(t => [t.topic, t.accuracy_rate]));
    const improvements = currentTopics
      .filter(t => {
        const prev = previousTopicMap.get(t.topic);
        return prev !== undefined && t.accuracy_rate > prev + 5;
      })
      .map(t => ({
        topic: t.topic,
        before: Math.round(previousTopicMap.get(t.topic) || 0),
        after: Math.round(t.accuracy_rate),
      }))
      .slice(0, 3);

    // Find weak areas
    const weakAreas = currentTopics
      .filter(t => t.accuracy_rate < 60)
      .sort((a, b) => a.accuracy_rate - b.accuracy_rate)
      .slice(0, 3)
      .map(t => ({ topic: t.topic, accuracy: Math.round(t.accuracy_rate) }));

    // Process upcoming exams
    const upcomingExams = exams
      .filter(e => new Date(e.exam_date) > now)
      .map(e => ({
        section: e.section,
        date: e.exam_date,
        daysAway: Math.ceil((new Date(e.exam_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)),
        primeMeridian: e.prime_meridian_score || 0,
      }))
      .sort((a, b) => a.daysAway - b.daysAway);

    // Generate AI summary
    const systemPrompt = `You are Meridian Navigator, generating a friendly, encouraging weekly progress email for a CPA exam candidate. Keep it concise, warm, and actionable.

CRITICAL RULES:
1. NEVER predict exam outcomes
2. ALWAYS be encouraging but honest
3. Focus on progress and next steps
4. Keep it under 300 words

Format as a friendly email with emojis and clear sections.`;

    const userMessage = `Generate a weekly progress email for ${profile.full_name || 'CPA Candidate'}:

THIS WEEK'S NUMBERS:
- Questions Practiced: ${questionsAttempted} (${questionsAttempted > lastWeekQuestions ? '↑' : questionsAttempted < lastWeekQuestions ? '↓' : '='} from ${lastWeekQuestions} last week)
- Overall Accuracy: ${overallAccuracy}% (${overallAccuracy > lastWeekAccuracy ? '↑' : overallAccuracy < lastWeekAccuracy ? '↓' : '='} from ${lastWeekAccuracy}% last week)
- Current Streak: ${streak?.current_streak || 0} days

WINS THIS WEEK:
${improvements.length > 0 ? improvements.map(i => `- ${i.topic}: ${i.before}% → ${i.after}%`).join('\n') : '- Keep building - improvements coming!'}

FOCUS AREAS:
${weakAreas.length > 0 ? weakAreas.map(w => `- ${w.topic}: ${w.accuracy}%`).join('\n') : '- No critical weak areas identified!'}

UPCOMING EXAMS:
${upcomingExams.length > 0 ? upcomingExams.map(e => `- ${e.section}: ${e.date} (${e.daysAway} days, PM: ${e.primeMeridian}/80)`).join('\n') : '- No exams scheduled yet'}

Generate an encouraging, personalized email that celebrates wins and provides focus guidance.`;

    const anthropic = new Anthropic();
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 800,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    const emailContent = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    // Track usage
    const weekKey = `${now.getFullYear()}-W${Math.ceil((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000))}`;
    await supabase
      .from('ai_feature_usage')
      .upsert({
        user_id: targetUserId,
        feature: 'weekly_email',
        period_type: 'weekly',
        period_key: weekKey,
        usage_count: 1,
        last_used_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,feature,period_type,period_key',
      });

    // If this is a preview, just return the content
    if (isPreview) {
      return NextResponse.json({
        success: true,
        preview: true,
        emailContent,
        isBeta: IS_BETA,
        metrics: {
          questionsAttempted,
          overallAccuracy,
          currentStreak: streak?.current_streak || 0,
          improvements,
          weakAreas,
          upcomingExams,
        },
      });
    }

    // Send the actual email
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a2e; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; padding: 20px 0; border-bottom: 2px solid #1e3a5f; }
    .logo { font-size: 24px; font-weight: bold; color: #1e3a5f; }
    .content { padding: 20px 0; white-space: pre-wrap; }
    .footer { text-align: center; padding: 20px 0; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; }
    a { color: #0ea5e9; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">🧭 CPA Exam Blueprint</div>
  </div>
  <div class="content">
${emailContent}
  </div>
  <div class="footer">
    <p>You're receiving this because you have weekly progress emails enabled.</p>
    <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/settings">Adjust email preferences</a> | <a href="${process.env.NEXT_PUBLIC_BASE_URL}/unsubscribe?token=${targetUserId}">Unsubscribe</a></p>
    <p>© ${now.getFullYear()} CPA Exam Blueprint. All rights reserved.</p>
  </div>
</body>
</html>`;

    await resend.emails.send({
      from: 'Meridian Navigator <navigator@cpa-exam-blueprint.com>',
      to: profile.email,
      subject: `Your CPA Study Week in Review 📊`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      sent: true,
      to: profile.email,
    });

  } catch (error) {
    console.error('Error generating/sending weekly report:', error);
    return NextResponse.json({ error: 'Failed to generate weekly report' }, { status: 500 });
  }
}

// Cron endpoint to trigger weekly emails for all users
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    // Get all users with weekly emails enabled
    // In beta, all users get weekly emails; in production, only paid tiers
    const { data: eligibleUsers } = IS_BETA
      ? await supabase
          .from('profiles')
          .select('id')
          .neq('weekly_email_enabled', false)
      : await supabase
          .from('profiles')
          .select('id')
          .in('subscription_tier', ['standard', 'pro'])
          .neq('weekly_email_enabled', false);

    if (!eligibleUsers || eligibleUsers.length === 0) {
      return NextResponse.json({ success: true, processed: 0 });
    }

    // Process each user (in production, you'd use a queue)
    const results = await Promise.allSettled(
      eligibleUsers.map(async (user) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ai/weekly-report`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cronSecret}`,
          },
          body: JSON.stringify({ userId: user.id }),
        });
        return response.json();
      })
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    return NextResponse.json({
      success: true,
      processed: eligibleUsers.length,
      successful,
      failed,
    });

  } catch (error) {
    console.error('Error in weekly email cron job:', error);
    return NextResponse.json({ error: 'Cron job failed' }, { status: 500 });
  }
}
