import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  TBSRequirement,
  UserResponse,
  GradingDetail,
  NumericAnswer,
  DropdownAnswer,
  JournalAnswer,
  TextAnswer,
  CitationAnswer,
  NumericResponse,
  DropdownResponse,
  JournalDebitResponse,
  JournalCreditResponse,
  TextResponse,
  CitationResponse,
} from '@/lib/data/tbs/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/tbs/attempts/[id]/submit
 * Submit and grade an attempt
 * Body: { responses: Record<string, UserResponse>, timeSpentSeconds: number }
 */
export async function POST(request: Request, { params }: RouteParams) {
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

    // Get the attempt
    const { data: attempt, error: attemptError } = await supabase
      .from('tbs_attempts')
      .select('id, tbs_id, is_complete')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (attemptError || !attempt) {
      return NextResponse.json(
        { error: 'Attempt not found' },
        { status: 404 }
      );
    }

    if (attempt.is_complete) {
      return NextResponse.json(
        { error: 'Attempt already submitted' },
        { status: 400 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { responses, timeSpentSeconds } = body as {
      responses: Record<string, UserResponse>;
      timeSpentSeconds: number;
    };

    // Get the TBS question with requirements
    const { data: tbsQuestion, error: tbsError } = await supabase
      .from('tbs_questions')
      .select('max_score_points')
      .eq('id', attempt.tbs_id)
      .single();

    if (tbsError || !tbsQuestion) {
      return NextResponse.json(
        { error: 'TBS question not found' },
        { status: 404 }
      );
    }

    // Get requirements with correct answers
    const { data: requirements, error: reqError } = await supabase
      .from('tbs_requirements')
      .select('*')
      .eq('tbs_id', attempt.tbs_id)
      .order('requirement_order');

    if (reqError || !requirements) {
      return NextResponse.json(
        { error: 'Failed to load requirements' },
        { status: 500 }
      );
    }

    // Get dropdown options for validation
    const requirementIds = requirements.map(r => r.id);
    const { data: dropdownOptions } = await supabase
      .from('tbs_dropdown_options')
      .select('*')
      .in('requirement_id', requirementIds);

    // Build dropdown options map
    const dropdownMap: Record<string, Record<string, boolean>> = {};
    if (dropdownOptions) {
      for (const opt of dropdownOptions) {
        if (!dropdownMap[opt.requirement_id]) {
          dropdownMap[opt.requirement_id] = {};
        }
        dropdownMap[opt.requirement_id][opt.id] = opt.is_correct;
      }
    }

    // Grade each requirement
    const gradingDetails: GradingDetail[] = [];
    let totalEarned = 0;
    let totalPossible = 0;

    for (const req of requirements) {
      const requirement: TBSRequirement = {
        id: req.id,
        order: req.requirement_order,
        type: req.requirement_type,
        label: req.label,
        points: req.points,
        correctAnswer: req.correct_answer,
        explanation: req.explanation || '',
      };

      const userResponse = responses[req.id];
      const gradeResult = gradeRequirement(
        requirement,
        userResponse,
        dropdownMap[req.id]
      );

      gradingDetails.push(gradeResult);
      totalEarned += gradeResult.pointsEarned;
      totalPossible += gradeResult.pointsPossible;
    }

    const scorePercentage = totalPossible > 0
      ? Math.round((totalEarned / totalPossible) * 10000) / 100
      : 0;

    // Update the attempt with results
    const { error: updateError } = await supabase
      .from('tbs_attempts')
      .update({
        responses,
        time_spent_seconds: timeSpentSeconds,
        score_earned: totalEarned,
        max_score: totalPossible,
        score_percentage: scorePercentage,
        grading_details: gradingDetails,
        is_complete: true,
        completed_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (updateError) {
      console.error('Error updating TBS attempt:', updateError);
      return NextResponse.json(
        { error: 'Failed to submit attempt' },
        { status: 500 }
      );
    }

    // Get TBS type and section for achievement checking
    const { data: tbsInfo } = await supabase
      .from('tbs_questions')
      .select('tbs_type, section')
      .eq('id', attempt.tbs_id)
      .single();

    // Get user's total completed TBS count for achievement checking
    const { count: tbsCompleteCount } = await supabase
      .from('tbs_attempts')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_complete', true);

    return NextResponse.json({
      success: true,
      result: {
        totalPoints: totalPossible,
        earnedPoints: totalEarned,
        percentage: scorePercentage,
        details: gradingDetails,
        timeTaken: timeSpentSeconds,
        completedAt: new Date().toISOString(),
      },
      // Include achievement context for client-side achievement check
      achievementContext: {
        tbsScore: scorePercentage,
        tbsCompleteCount: tbsCompleteCount || 0,
        tbsType: tbsInfo?.tbs_type || undefined,
        section: tbsInfo?.section || undefined,
      },
    });
  } catch (error) {
    console.error('TBS submit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Grade a single requirement
 */
function gradeRequirement(
  requirement: TBSRequirement,
  userResponse: UserResponse | undefined,
  dropdownCorrectMap?: Record<string, boolean>
): GradingDetail {
  const base: GradingDetail = {
    requirementId: requirement.id,
    requirementLabel: requirement.label,
    pointsEarned: 0,
    pointsPossible: requirement.points,
    isCorrect: false,
    isPartialCredit: false,
    userAnswer: '',
    correctAnswer: '',
    feedback: '',
  };

  if (!userResponse) {
    base.feedback = 'No response provided';
    base.correctAnswer = formatCorrectAnswer(requirement.correctAnswer);
    return base;
  }

  const correctAnswer = requirement.correctAnswer;

  switch (requirement.type) {
    case 'numeric': {
      const numericAnswer = correctAnswer as NumericAnswer;
      const numericResponse = userResponse as NumericResponse;
      base.userAnswer = numericResponse.value?.toString() || '';
      base.correctAnswer = numericAnswer.value.toString();

      if (numericResponse.value === null || numericResponse.value === undefined) {
        base.feedback = 'No answer provided';
        return base;
      }

      const isCorrect = checkNumericAnswer(
        numericResponse.value,
        numericAnswer.value,
        numericAnswer.tolerance,
        numericAnswer.tolerancePercent
      );

      if (isCorrect) {
        base.isCorrect = true;
        base.pointsEarned = requirement.points;
        base.feedback = 'Correct!';
      } else if (numericAnswer.acceptNegative &&
        checkNumericAnswer(-numericResponse.value, numericAnswer.value, numericAnswer.tolerance, numericAnswer.tolerancePercent)) {
        // Sign error - partial credit
        base.isPartialCredit = true;
        base.pointsEarned = Math.round(requirement.points * 0.5);
        base.feedback = 'Sign error - partial credit awarded';
      } else {
        base.feedback = `Incorrect. The correct answer is ${numericAnswer.value}`;
      }
      break;
    }

    case 'dropdown': {
      const dropdownAnswer = correctAnswer as DropdownAnswer;
      const dropdownResponse = userResponse as DropdownResponse;
      base.userAnswer = dropdownResponse.selectedOptionId || '';
      base.correctAnswer = dropdownAnswer.correctOptionId;

      if (!dropdownResponse.selectedOptionId) {
        base.feedback = 'No selection made';
        return base;
      }

      // Check using the dropdown map if available
      const isCorrect = dropdownCorrectMap
        ? dropdownCorrectMap[dropdownResponse.selectedOptionId] === true
        : dropdownResponse.selectedOptionId === dropdownAnswer.correctOptionId;

      if (isCorrect) {
        base.isCorrect = true;
        base.pointsEarned = requirement.points;
        base.feedback = 'Correct!';
      } else {
        base.feedback = 'Incorrect selection';
      }
      break;
    }

    case 'journal_debit':
    case 'journal_credit': {
      const journalAnswer = correctAnswer as JournalAnswer;
      const journalResponse = userResponse as JournalDebitResponse | JournalCreditResponse;
      base.userAnswer = `${journalResponse.accountId || 'None'}: ${journalResponse.amount || 0}`;
      base.correctAnswer = `${journalAnswer.accountName}: ${journalAnswer.amount}`;

      if (!journalResponse.accountId && !journalResponse.amount) {
        base.feedback = 'No journal entry provided';
        return base;
      }

      const accountCorrect = journalResponse.accountId === journalAnswer.accountId;
      const amountCorrect = journalResponse.amount !== null &&
        checkNumericAnswer(journalResponse.amount, journalAnswer.amount, journalAnswer.tolerance);

      if (accountCorrect && amountCorrect) {
        base.isCorrect = true;
        base.pointsEarned = requirement.points;
        base.feedback = 'Correct!';
      } else if (accountCorrect) {
        // Partial credit for correct account
        base.isPartialCredit = true;
        base.pointsEarned = Math.round(requirement.points * 0.5);
        base.feedback = 'Account correct, amount incorrect - partial credit';
      } else if (amountCorrect) {
        // Partial credit for correct amount
        base.isPartialCredit = true;
        base.pointsEarned = Math.round(requirement.points * 0.25);
        base.feedback = 'Amount correct, account incorrect - partial credit';
      } else {
        base.feedback = `Incorrect. Should be ${journalAnswer.accountName}: ${journalAnswer.amount}`;
      }
      break;
    }

    case 'text': {
      const textAnswer = correctAnswer as TextAnswer;
      const textResponse = userResponse as TextResponse;
      base.userAnswer = textResponse.value || '';
      base.correctAnswer = `Contains keywords: ${textAnswer.keywords.join(', ')}`;

      if (!textResponse.value || textResponse.value.trim().length === 0) {
        base.feedback = 'No response provided';
        return base;
      }

      // Check for required keywords
      const responseText = textAnswer.caseSensitive
        ? textResponse.value
        : textResponse.value.toLowerCase();

      const foundKeywords = textAnswer.keywords.filter(kw =>
        responseText.includes(textAnswer.caseSensitive ? kw : kw.toLowerCase())
      );

      const keywordRatio = foundKeywords.length / textAnswer.keywords.length;

      if (keywordRatio >= 0.8) {
        base.isCorrect = true;
        base.pointsEarned = requirement.points;
        base.feedback = 'Excellent response - all key points covered';
      } else if (keywordRatio >= 0.5) {
        base.isPartialCredit = true;
        base.pointsEarned = Math.round(requirement.points * keywordRatio);
        base.feedback = `Partial credit - ${foundKeywords.length}/${textAnswer.keywords.length} key points addressed`;
      } else {
        base.feedback = 'Response missing key points';
      }
      break;
    }

    case 'citation': {
      const citationAnswer = correctAnswer as CitationAnswer;
      const citationResponse = userResponse as CitationResponse;
      base.userAnswer = citationResponse.value || '';
      base.correctAnswer = `${citationAnswer.source} ${citationAnswer.topicCode}`;

      if (!citationResponse.value || citationResponse.value.trim().length === 0) {
        base.feedback = 'No citation provided';
        return base;
      }

      // Normalize for comparison
      const userCitation = citationResponse.value.toLowerCase().replace(/\s+/g, '');
      const correctCitation = citationAnswer.topicCode.toLowerCase().replace(/\s+/g, '');

      if (userCitation.includes(correctCitation) || correctCitation.includes(userCitation)) {
        base.isCorrect = true;
        base.pointsEarned = requirement.points;
        base.feedback = 'Correct citation!';
      } else if (citationAnswer.alternativeCitations) {
        // Check alternatives
        const altMatch = citationAnswer.alternativeCitations.some(alt =>
          userCitation.includes(alt.topicCode.toLowerCase().replace(/\s+/g, ''))
        );
        if (altMatch) {
          base.isCorrect = true;
          base.pointsEarned = requirement.points;
          base.feedback = 'Correct citation (alternative accepted)';
        } else {
          base.feedback = `Incorrect. The correct citation is ${citationAnswer.source} ${citationAnswer.topicCode}`;
        }
      } else {
        base.feedback = `Incorrect. The correct citation is ${citationAnswer.source} ${citationAnswer.topicCode}`;
      }
      break;
    }

    default:
      base.feedback = 'Unknown requirement type';
  }

  return base;
}

/**
 * Check if a numeric answer is correct within tolerance
 */
function checkNumericAnswer(
  userValue: number,
  correctValue: number,
  tolerance?: number,
  tolerancePercent?: number
): boolean {
  if (tolerance !== undefined) {
    return Math.abs(userValue - correctValue) <= tolerance;
  }
  if (tolerancePercent !== undefined) {
    const allowedDiff = Math.abs(correctValue * tolerancePercent);
    return Math.abs(userValue - correctValue) <= allowedDiff;
  }
  // Default: exact match (accounting for floating point)
  return Math.abs(userValue - correctValue) < 0.001;
}

/**
 * Format correct answer for display
 */
function formatCorrectAnswer(answer: TBSRequirement['correctAnswer']): string {
  switch (answer.type) {
    case 'numeric':
      return (answer as NumericAnswer).value.toString();
    case 'dropdown':
      return (answer as DropdownAnswer).correctOptionId;
    case 'journal':
      const ja = answer as JournalAnswer;
      return `${ja.accountName}: ${ja.amount}`;
    case 'text':
      return `Keywords: ${(answer as TextAnswer).keywords.join(', ')}`;
    case 'citation':
      const ca = answer as CitationAnswer;
      return `${ca.source} ${ca.topicCode}`;
    default:
      return JSON.stringify(answer);
  }
}
