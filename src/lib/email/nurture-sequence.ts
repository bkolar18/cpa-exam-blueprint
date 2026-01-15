// Email Nurture Sequence for Meridian CPA Review
// 7-email welcome sequence sent over 30 days

import {
  baseLayout,
  header,
  footer,
  tipBox,
  quoteBlock,
  ctaSection,
} from './components';
import { EMAIL_BRAND } from './constants';

const { colors } = EMAIL_BRAND;

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
        "Over the next few weeks, I'll send you tips, strategies, and study guidance to help you prepare.",
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
        text: "Access Your Dashboard",
        url: "https://meridiancpareview.com/dashboard"
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
        "Start by exploring your dashboard. Get familiar with the practice question bank and task-based simulations. Know where to track your progress and identify weak areas.",
        "Don't try to cover everything at once. Pick one topic area in your first section and work through 20-30 practice questions. Focus on understanding the explanations, not just getting answers right.",
        "The goal this week isn't to master content—it's to build the habit. Consistent daily practice beats marathon cramming every time."
      ],
      tips: [
        "Explore your dashboard and find the progress tracking features",
        "Complete a set of practice questions in your first topic area",
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
        "This active review transforms wrong answers into learning opportunities. This approach helps build deeper understanding of the material."
      ],
      tips: [
        "Don't peek at the answer until you've committed to a choice",
        "For wrong answers, read the full explanation—don't just note the correct letter",
        "Track your weak areas and revisit them",
        "Aim for 30-50 MCQs per study session once you're in rhythm"
      ],
      callToAction: {
        text: "More Study Strategies",
        url: "https://meridiancpareview.com/blog"
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
    subject: "How's Your Study Progress?",
    previewText: "After 3 weeks, let's check in",
    category: "soft-cta",
    content: {
      headline: "Making Progress?",
      body: [
        "By now, you've been studying for a few weeks. You know whether your current approach is working—or if you need to adjust.",
        "The key to CPA success isn't just hours studied—it's quality practice on the right topics.",
        "Focus on understanding concepts, not memorizing. The exam tests application, not recall.",
        "If you're happy with your current approach, keep going. If you're struggling, consider changing up your study routine or focusing on your weak areas."
      ],
      tips: [
        "Practice questions are more valuable than passive review",
        "Focus extra time on your weakest topics",
        "Take timed practice tests to build exam stamina",
        "Consistency beats cramming every time"
      ],
      callToAction: {
        text: "Practice More Questions",
        url: "https://meridiancpareview.com/dashboard/practice"
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
        text: "Access Free CPA Exam Resources",
        url: "https://meridiancpareview.com/blog"
      }
    }
  },
  {
    id: 7,
    dayOffset: 30,
    subject: "Final Thoughts on Your CPA Journey",
    previewText: "A month in—here's what matters most",
    category: "motivation",
    content: {
      headline: "Keep Moving Forward",
      body: [
        "This is my last scheduled email to you (though you'll continue receiving score release updates and occasional tips).",
        "Not everyone who starts this journey finishes it. But you're still here, still committed, still showing up. That matters more than you might realize.",
        "The CPA exam tests persistence as much as knowledge. Every candidate who passed had moments of doubt. They kept going anyway.",
        "In 12-18 months, you could be working toward becoming a licensed CPA. Think about that. The credential. The career opportunities. The sense of accomplishment. It's within reach—if you keep moving forward.",
        "Don't forget: we're here to help. Meridian CPA Academy is packed with free resources. Our tools are designed to support your preparation. And our mission is to help you study smarter."
      ],
      tips: [
        "Consistency over intensity: 15 focused hours beats 30 scattered hours",
        "Use the official AICPA Blueprint as your guide—our content is built around it",
        "Take care of yourself: sleep, exercise, and breaks improve retention",
        "Connect with other candidates—share tips and encouragement along the way"
      ],
      quote: {
        text: "Every expert was once a beginner. Every CPA once sat where you're sitting now.",
        author: "Meridian CPA Review Team"
      },
      callToAction: {
        text: "Continue Studying",
        url: "https://meridiancpareview.com/dashboard"
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
export function generateNurtureEmailHtml(email: NurtureEmail, recipientEmail: string): string {
  // Build body paragraphs
  const bodyHtml = email.content.body
    .map(p => `<p style="margin:0 0 16px 0;font-size:16px;">${p}</p>`)
    .join('');

  // Build tips section using component
  const tipsHtml = email.content.tips
    ? tipBox({ tips: email.content.tips, title: 'Quick Tips' })
    : '';

  // Build quote section using component
  const quoteHtml = email.content.quote
    ? quoteBlock({
        text: email.content.quote.text,
        author: email.content.quote.author,
      })
    : '';

  // Build CTA section using component
  const ctaHtml = email.content.callToAction
    ? ctaSection({
        text: email.content.callToAction.text,
        url: email.content.callToAction.url,
      })
    : '';

  const content = `
    ${header({
      type: 'full',
      headline: email.content.headline,
      showLogo: true,
    })}

    <div class="content" style="background:#ffffff;padding:35px;border-radius:0 0 12px 12px;">
      ${bodyHtml}
      ${tipsHtml}
      ${quoteHtml}
      ${ctaHtml}
    </div>

    ${footer({
      type: 'full',
      email: recipientEmail,
      customMessage: 'You received this email because you created a study plan at Meridian CPA Review.',
    })}
  `;

  return baseLayout({
    preheader: email.previewText,
    subject: email.subject,
    content,
  });
}
