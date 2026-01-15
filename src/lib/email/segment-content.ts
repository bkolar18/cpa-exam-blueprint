// Segment-based email content for targeted follow-ups
// Sends relevant content based on user behavior and quiz answers

import {
  baseLayout,
  header,
  footer,
  resourceList,
  ctaSection,
} from './components';
import { EMAIL_BRAND } from './constants';

const { colors } = EMAIL_BRAND;

export interface SegmentEmail {
  id: string;
  segment: string;
  subject: string;
  previewText: string;
  content: {
    headline: string;
    body: string[];
    callToAction?: {
      text: string;
      url: string;
    };
    resources?: {
      title: string;
      url: string;
      description: string;
    }[];
  };
}

// Segment definitions based on user attributes
export const segments = {
  workingFullTime: "working-full-time",
  student: "student",
  careerChanger: "career-changer",
  retaker: "retaker",
  farFirst: "far-first",
  regFirst: "reg-first",
  audFirst: "aud-first",
  limitedHours: "limited-hours",
} as const;

export type SegmentType = typeof segments[keyof typeof segments];

// Segment-specific email content
export const segmentEmails: Record<string, SegmentEmail> = {
  "working-full-time": {
    id: "seg-working-ft",
    segment: "working-full-time",
    subject: "CPA Exam Strategies for Working Professionals",
    previewText: "Practical tips for balancing work and CPA studies",
    content: {
      headline: "Studying While Working Full-Time",
      body: [
        "You mentioned you're working full-time while studying for the CPA exam. You're in good company—most candidates are balancing the same challenge.",
        "The key isn't finding more time. It's protecting the time you have and using it effectively.",
        "We've put together strategies specifically for working professionals to help you make the most of your limited study time.",
        "Remember: consistent, moderate effort beats sporadic intensity. Even 10 focused hours per week compounds over time."
      ],
      callToAction: {
        text: "Access Your Dashboard",
        url: "https://meridiancpareview.com/dashboard"
      },
      resources: [
        {
          title: "Meridian CPA Academy",
          url: "https://meridiancpareview.com/cpa-academy",
          description: "Your free study dashboard with progress tracking"
        },
        {
          title: "Practice Questions",
          url: "https://meridiancpareview.com/dashboard/practice",
          description: "6,000+ blueprint-aligned questions"
        }
      ]
    }
  },

  "far-first": {
    id: "seg-far-first",
    segment: "far-first",
    subject: "Starting with FAR? Here's Your Game Plan",
    previewText: "Section-specific strategies for Financial Accounting & Reporting",
    content: {
      headline: "Tackling FAR First",
      body: [
        "Your study plan recommends starting with FAR—the most comprehensive core section. This is a common choice for building a strong foundation.",
        "FAR has the lowest pass rate among core sections (40-43%), but that's largely because it covers the broadest range of topics, not because it's impossibly difficult.",
        "A key focus area for FAR: governmental accounting. It's 20-30% of your score, and many candidates underestimate it.",
        "Use Meridian CPA Academy to practice FAR questions and track your progress."
      ],
      callToAction: {
        text: "Practice FAR Questions",
        url: "https://meridiancpareview.com/dashboard/practice"
      },
      resources: [
        {
          title: "Meridian CPA Academy",
          url: "https://meridiancpareview.com/cpa-academy",
          description: "Your free study dashboard with progress tracking"
        },
        {
          title: "FAR Section Overview",
          url: "https://meridiancpareview.com/sections/far",
          description: "Exam format and key topics"
        }
      ]
    }
  },

  "aud-first": {
    id: "seg-aud-first",
    segment: "aud-first",
    subject: "Starting with AUD? Here's Your Strategy",
    previewText: "Tips for mastering auditing concepts",
    content: {
      headline: "Tackling Audit First",
      body: [
        "Your plan recommends starting with AUD—a solid choice if you're coming from an audit background or want to tackle conceptual material while fresh.",
        "AUD is unique among CPA sections: it tests the 'Evaluation' skill level, requiring professional judgment rather than just recall.",
        "A helpful approach for AUD: understand the 'why' behind procedures. Don't just memorize—learn why specific audit procedures are appropriate for specific risks.",
        "Use Meridian CPA Academy to practice AUD questions and track your progress."
      ],
      callToAction: {
        text: "Practice AUD Questions",
        url: "https://meridiancpareview.com/dashboard/practice"
      },
      resources: [
        {
          title: "Meridian CPA Academy",
          url: "https://meridiancpareview.com/cpa-academy",
          description: "Your free study dashboard with progress tracking"
        },
        {
          title: "AUD Section Overview",
          url: "https://meridiancpareview.com/sections/aud",
          description: "Exam format and key concepts"
        }
      ]
    }
  },

  "reg-first": {
    id: "seg-reg-first",
    segment: "reg-first",
    subject: "Starting with REG? Here's Your Strategy",
    previewText: "Tax and business law study tips",
    content: {
      headline: "Tackling REG First",
      body: [
        "Your plan recommends starting with REG. This section has historically had the highest pass rate among core sections (58-64%), making it a popular starting choice.",
        "REG combines federal taxation with business law. If you have any tax background, you'll find parts of this section familiar.",
        "Key tip: Don't neglect business law (10-20% of the exam). It's important to balance your study time across all topics.",
        "Use Meridian CPA Academy to practice REG questions and track your progress."
      ],
      callToAction: {
        text: "Practice REG Questions",
        url: "https://meridiancpareview.com/dashboard/practice"
      },
      resources: [
        {
          title: "Meridian CPA Academy",
          url: "https://meridiancpareview.com/cpa-academy",
          description: "Your free study dashboard with progress tracking"
        },
        {
          title: "REG Section Overview",
          url: "https://meridiancpareview.com/sections/reg",
          description: "Exam structure and topics"
        }
      ]
    }
  },

  "limited-hours": {
    id: "seg-limited-hours",
    segment: "limited-hours",
    subject: "Making 10-15 Hours/Week Work",
    previewText: "Quality over quantity in your CPA studies",
    content: {
      headline: "Maximizing Limited Study Time",
      body: [
        "You indicated you have 10-15 hours per week for studying. Many candidates have successfully prepared for the CPA exam with similar schedules—it just requires a longer timeline and efficient use of your time.",
        "With limited hours, efficiency becomes critical. Every study session needs to count.",
        "The good news: research shows that spaced repetition (shorter, more frequent sessions) often produces better retention than marathon study days.",
        "Here's how to make your limited hours more effective."
      ],
      callToAction: {
        text: "Access Your Dashboard",
        url: "https://meridiancpareview.com/dashboard"
      },
      resources: [
        {
          title: "Meridian CPA Academy",
          url: "https://meridiancpareview.com/cpa-academy",
          description: "Your free study dashboard with progress tracking"
        },
        {
          title: "Practice Questions",
          url: "https://meridiancpareview.com/dashboard/practice",
          description: "6,000+ blueprint-aligned questions"
        }
      ]
    }
  },

  "retaker": {
    id: "seg-retaker",
    segment: "retaker",
    subject: "Coming Back Stronger",
    previewText: "Strategies for candidates retaking a section",
    content: {
      headline: "Retaking a Section? Here's How to Approach It",
      body: [
        "If you're retaking a section, first know this: you're not alone. Many CPAs didn't pass every section on the first try.",
        "The fact that you're back studying shows resilience. That matters more than a first-attempt pass.",
        "For retakes, strategy is everything. Identify what went wrong last time—was it content gaps, time management, or test anxiety?",
        "Use Meridian CPA Academy to focus on your weak areas and track your improvement."
      ],
      callToAction: {
        text: "Access Your Dashboard",
        url: "https://meridiancpareview.com/dashboard"
      },
      resources: [
        {
          title: "Meridian CPA Academy",
          url: "https://meridiancpareview.com/cpa-academy",
          description: "Your free study dashboard with progress tracking"
        },
        {
          title: "Flagged Questions",
          url: "https://meridiancpareview.com/dashboard/flagged-questions",
          description: "Review questions you've bookmarked"
        }
      ]
    }
  }
};

// Get segment email by segment type
export function getSegmentEmail(segment: string): SegmentEmail | undefined {
  return segmentEmails[segment];
}

// Determine segments from quiz answers
export function determineSegments(quizAnswers: {
  workingFullTime?: string;
  hoursPerWeek?: string;
  accountingBackground?: string;
  sectionOrder?: string[];
  isRetake?: boolean;
}): SegmentType[] {
  const segments: SegmentType[] = [];

  // Working situation
  if (quizAnswers.workingFullTime === "yes") {
    segments.push("working-full-time");
  }

  // Hours available
  if (quizAnswers.hoursPerWeek) {
    const hours = parseInt(quizAnswers.hoursPerWeek);
    if (hours <= 15) {
      segments.push("limited-hours");
    }
  }

  // First section recommendation
  if (quizAnswers.sectionOrder && quizAnswers.sectionOrder.length > 0) {
    const firstSection = quizAnswers.sectionOrder[0].toLowerCase();
    if (firstSection.includes("far")) {
      segments.push("far-first");
    } else if (firstSection.includes("aud")) {
      segments.push("aud-first");
    } else if (firstSection.includes("reg")) {
      segments.push("reg-first");
    }
  }

  // Retaker
  if (quizAnswers.isRetake) {
    segments.push("retaker");
  }

  return segments;
}

// Generate HTML for segment email
export function generateSegmentEmailHtml(email: SegmentEmail, recipientEmail: string): string {
  // Build body paragraphs
  const bodyHtml = email.content.body
    .map(p => `<p style="margin:0 0 16px 0;font-size:16px;">${p}</p>`)
    .join('');

  // Build resources section using component
  const resourcesHtml = email.content.resources
    ? resourceList({
        title: 'Recommended Resources',
        resources: email.content.resources,
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
      ${resourcesHtml}
      ${ctaHtml}
    </div>

    ${footer({
      type: 'full',
      email: recipientEmail,
      customMessage: 'You received this email based on your CPA study preferences.',
    })}
  `;

  return baseLayout({
    preheader: email.previewText,
    subject: email.subject,
    content,
  });
}
