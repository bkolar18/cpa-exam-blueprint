// Email Nurture Sequence for CPA Exam Blueprint
// 7-email welcome sequence sent over 30 days

export interface NurtureEmail {
  id: number;
  dayOffset: number; // Days after signup to send
  subject: string;
  previewText: string;
  category: "welcome" | "tips" | "motivation" | "section-guide" | "soft-cta" | "check-in";
  content: {
    headline: string;
    body: string[];
    callToAction?: {
      text: string;
      url: string;
    };
    tips?: string[];
    quote?: {
      text: string;
      author: string;
    };
  };
}

export const nurtureSequence: NurtureEmail[] = [
  {
    id: 1,
    dayOffset: 0,
    subject: "Your CPA Study Plan is Ready!",
    previewText: "Plus: The #1 mistake new candidates make",
    category: "welcome",
    content: {
      headline: "Welcome to Your CPA Journey",
      body: [
        "Thank you for creating your personalized CPA study plan. You've just taken the most important step—making the commitment to start.",
        "Over the next few weeks, I'll send you tips, strategies, and guidance from CPAs who've been exactly where you are now.",
        "But first, let me share the #1 mistake new candidates make: trying to do too much, too fast.",
        "The CPA exam is a marathon, not a sprint. Consistency beats intensity every time. If your plan calls for 15 hours per week, protect those 15 hours fiercely—but don't try to cram 30.",
        "Your study plan is designed for sustainable progress. Trust the process."
      ],
      tips: [
        "Block your study time on your calendar now—treat it like a non-negotiable meeting",
        "Tell at least one person about your CPA goal (accountability matters)",
        "Prepare your study space before your first session"
      ],
      callToAction: {
        text: "Review Your Study Plan",
        url: "https://cpaexamblueprint.com/study-plan"
      }
    }
  },
  {
    id: 2,
    dayOffset: 3,
    subject: "How to Use Your First Week Wisely",
    previewText: "Set yourself up for success from day one",
    category: "tips",
    content: {
      headline: "Your First Week: A Strategic Approach",
      body: [
        "Your first week studying for the CPA exam sets the tone for everything that follows. Here's how to make it count.",
        "Don't dive into content immediately. Instead, spend your first few sessions understanding the exam structure and your review materials.",
        "Get familiar with how your course is organized. Know where to find lectures, practice questions, and simulations. This investment pays dividends later.",
        "Then, start with the fundamentals. Whatever section you're tackling first, begin with the foundational concepts before moving to complex topics."
      ],
      tips: [
        "Watch the 'how to use this course' videos (most candidates skip these—don't)",
        "Take one diagnostic quiz to assess your starting point",
        "Set a realistic goal for hours this week, then hit it",
        "End each session by noting what you'll cover next (reduces startup friction)"
      ],
      quote: {
        text: "The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks, and starting on the first one.",
        author: "Mark Twain"
      }
    }
  },
  {
    id: 3,
    dayOffset: 7,
    subject: "The MCQ Strategy Most Candidates Miss",
    previewText: "How to actually learn from practice questions",
    category: "tips",
    content: {
      headline: "Master Multiple Choice Questions",
      body: [
        "Multiple choice questions (MCQs) are 50% of your CPA exam score. Most candidates practice them wrong.",
        "The mistake: Doing MCQs passively, checking answers, and moving on without understanding WHY.",
        "The fix: For every question you miss, spend 2-3 minutes understanding the concept, not just memorizing the answer. Ask yourself: What rule or principle was being tested? Why is the correct answer correct? Why are the other options wrong?",
        "This active review transforms wrong answers into learning opportunities. Candidates who do this consistently score significantly higher."
      ],
      tips: [
        "Don't peek at the answer until you've committed to a choice",
        "For wrong answers, read the full explanation—don't just note the correct letter",
        "Track your weak areas and revisit them",
        "Aim for 30-50 MCQs per study session once you're in rhythm"
      ],
      callToAction: {
        text: "More Study Strategies",
        url: "https://cpaexamblueprint.com/blog"
      }
    }
  },
  {
    id: 4,
    dayOffset: 14,
    subject: "Feeling Overwhelmed? Read This.",
    previewText: "Every CPA candidate hits this wall",
    category: "motivation",
    content: {
      headline: "The Two-Week Wall is Real",
      body: [
        "About two weeks into studying, almost every CPA candidate hits a wall. The initial motivation fades, the content feels endless, and doubt creeps in.",
        "This is completely normal. It doesn't mean you can't do this.",
        "The CPA exam is designed to be challenging. If it were easy, the credential wouldn't be valuable. But here's what successful candidates know: the feeling of being overwhelmed is temporary.",
        "Every CPA you admire—every partner at a Big 4, every CFO, every successful practitioner—felt exactly what you're feeling right now. They kept going anyway.",
        "You don't need to feel motivated every day. You just need to show up. Motivation follows action, not the other way around."
      ],
      tips: [
        "Lower the bar temporarily: 'I'll just do 20 minutes' often turns into a full session",
        "Remember your 'why'—why did you start this journey?",
        "Connect with other candidates (r/CPA on Reddit is surprisingly supportive)",
        "Celebrate small wins: finished a chapter? That counts."
      ],
      quote: {
        text: "It's supposed to be hard. If it wasn't hard, everyone would do it. The hard is what makes it great.",
        author: "A League of Their Own"
      }
    }
  },
  {
    id: 5,
    dayOffset: 21,
    subject: "The Review Course That Actually Works",
    previewText: "After 3 weeks, here's what we recommend",
    category: "soft-cta",
    content: {
      headline: "Finding the Right Review Course",
      body: [
        "By now, you've been studying for a few weeks. You know whether your current approach is working—or if you need additional support.",
        "We've reviewed every major CPA review course and consistently recommend Surgent CPA Review for most candidates. Here's why:",
        "Their adaptive learning technology identifies your weak areas and focuses your study time where it matters most. No wasted hours on topics you already know.",
        "But the right course depends on your learning style. Some candidates need structured video lectures (Becker). Others prefer engaging instruction (UWorld Roger). Tech-focused learners often thrive with Surgent.",
        "If you're happy with your current approach, keep going. If you're struggling, it might be time to reassess your resources."
      ],
      tips: [
        "The best review course is the one you'll actually use consistently",
        "Look for courses with adaptive technology if you're short on time",
        "Many courses offer free trials—test before you commit",
        "Course quality matters, but your effort matters more"
      ],
      callToAction: {
        text: "See Our Full Course Comparison",
        url: "https://cpaexamblueprint.com/recommended-program"
      }
    }
  },
  {
    id: 6,
    dayOffset: 28,
    subject: "How's Studying Going? (Quick Check-In)",
    previewText: "One month in—let's assess",
    category: "check-in",
    content: {
      headline: "One Month Check-In",
      body: [
        "You've been on this CPA journey for about a month now. That's worth acknowledging—many candidates never make it this far.",
        "Take a moment to honestly assess: Are you on track with your study plan? Have you been hitting your weekly hour goals? Do you feel like you're making progress?",
        "If yes, excellent. Keep doing what you're doing.",
        "If you're behind, that's okay too. The most important thing is to recalibrate, not quit. Adjust your exam date if needed. Simplify your schedule. Remove obstacles.",
        "One month in is a perfect time to course-correct. What's one thing you could change to make the next month more effective?"
      ],
      tips: [
        "Review your study metrics: hours logged, MCQ scores, topics completed",
        "Identify your biggest time waster and eliminate it",
        "If you haven't scheduled your first exam, consider doing so (creates urgency)",
        "Reach out if you need guidance—we're here to help"
      ],
      callToAction: {
        text: "Access Free CPA Resources",
        url: "https://cpaexamblueprint.com/tools/score-release-calendar"
      }
    }
  },
  {
    id: 7,
    dayOffset: 30,
    subject: "Your Path to Passing (Final Thoughts)",
    previewText: "Everything you need to know, summarized",
    category: "motivation",
    content: {
      headline: "You Have Everything You Need",
      body: [
        "This is my last scheduled email to you (though you'll continue receiving score release updates and occasional tips).",
        "I want to leave you with this truth: You have everything you need to pass the CPA exam.",
        "Not everyone who starts this journey finishes it. But you're still here, still committed, still showing up. That matters.",
        "The CPA exam tests persistence as much as knowledge. Every candidate who passed had moments of doubt. They kept going anyway.",
        "In 12-18 months, you could be a licensed CPA. Think about that. The credential. The career opportunities. The sense of accomplishment. It's all within reach—if you keep moving forward.",
        "Don't forget: we're here to help. Our blog is packed with free resources. Our tools are designed to support you. And our mission is your success."
      ],
      tips: [
        "Consistency over intensity: 15 focused hours beats 30 scattered hours",
        "Trust your review course but verify with the AICPA Blueprint",
        "Take care of yourself: sleep, exercise, and breaks improve retention",
        "When you pass, come back and share your story—it helps the next candidate"
      ],
      quote: {
        text: "Every expert was once a beginner. Every CPA once sat where you're sitting now.",
        author: "CPA Exam Blueprint Team"
      },
      callToAction: {
        text: "Share Your CPA Goals",
        url: "https://cpaexamblueprint.com/success-stories"
      }
    }
  }
];

// Helper function to get email by day offset
export function getEmailByDay(dayOffset: number): NurtureEmail | undefined {
  return nurtureSequence.find(email => email.dayOffset === dayOffset);
}

// Get all emails scheduled up to a certain day
export function getEmailsUpToDay(maxDay: number): NurtureEmail[] {
  return nurtureSequence.filter(email => email.dayOffset <= maxDay);
}

// Generate HTML for a nurture email
export function generateNurtureEmailHtml(email: NurtureEmail): string {
  const tipsHtml = email.content.tips
    ? `<div class="section">
        <h3>Quick Tips</h3>
        ${email.content.tips.map(tip => `<div class="tip">✓ ${tip}</div>`).join('')}
       </div>`
    : '';

  const quoteHtml = email.content.quote
    ? `<div class="quote">
        <p>"${email.content.quote.text}"</p>
        <p class="quote-author">— ${email.content.quote.author}</p>
       </div>`
    : '';

  const ctaHtml = email.content.callToAction
    ? `<div class="cta">
        <a href="${email.content.callToAction.url}" class="button">${email.content.callToAction.text}</a>
       </div>`
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.7;
      color: #1a1a2e;
      margin: 0;
      padding: 0;
      background: #f5f5f5;
    }
    .wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #1e3a5f, #152a45);
      color: white;
      padding: 30px;
      border-radius: 12px 12px 0 0;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 700;
    }
    .header .subtitle {
      margin: 8px 0 0 0;
      opacity: 0.9;
      font-size: 15px;
    }
    .content {
      background: white;
      padding: 35px;
      border-radius: 0 0 12px 12px;
    }
    .content p {
      margin: 0 0 16px 0;
      font-size: 16px;
    }
    .section {
      background: #f8fafc;
      padding: 20px;
      border-radius: 8px;
      margin: 24px 0;
      border-left: 4px solid #1e3a5f;
    }
    .section h3 {
      margin: 0 0 12px 0;
      color: #1e3a5f;
      font-size: 16px;
    }
    .tip {
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
      font-size: 15px;
    }
    .tip:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .quote {
      background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
      padding: 24px;
      border-radius: 8px;
      margin: 24px 0;
      border-left: 4px solid #0ea5e9;
      font-style: italic;
    }
    .quote p {
      margin: 0;
      font-size: 17px;
      color: #0c4a6e;
    }
    .quote-author {
      margin-top: 12px !important;
      font-style: normal;
      font-weight: 600;
      font-size: 14px !important;
    }
    .cta {
      text-align: center;
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
    }
    .button {
      display: inline-block;
      background: #16a34a;
      color: white !important;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 16px;
    }
    .footer {
      text-align: center;
      color: #64748b;
      font-size: 13px;
      margin-top: 24px;
      padding: 0 20px;
    }
    .footer a {
      color: #1e3a5f;
    }
    .divider {
      height: 1px;
      background: #e2e8f0;
      margin: 24px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>${email.content.headline}</h1>
      <p class="subtitle">CPA Exam Blueprint</p>
    </div>
    <div class="content">
      ${email.content.body.map(p => `<p>${p}</p>`).join('')}

      ${tipsHtml}

      ${quoteHtml}

      ${ctaHtml}
    </div>
    <div class="footer">
      <p>CPA Exam Blueprint — Free guidance from licensed CPAs</p>
      <p><a href="https://cpaexamblueprint.com">cpaexamblueprint.com</a></p>
      <p style="margin-top: 16px; font-size: 12px;">
        You received this email because you created a study plan at CPA Exam Blueprint.<br>
        <a href="https://cpaexamblueprint.com/unsubscribe">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
