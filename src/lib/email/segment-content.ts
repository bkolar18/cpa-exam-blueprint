// Segment-based email content for targeted follow-ups
// Sends relevant content based on user behavior and quiz answers

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
    subject: "CPA Strategies for Working Professionals",
    previewText: "Time-tested tips from candidates who work 40+ hours",
    content: {
      headline: "Studying While Working Full-Time",
      body: [
        "You mentioned you're working full-time while studying for the CPA exam. You're in good company—most candidates are balancing the same challenge.",
        "The key isn't finding more time. It's protecting the time you have and using it effectively.",
        "I've compiled our best resources specifically for working professionals. These strategies come from CPAs who passed while working demanding jobs.",
        "Remember: consistent, moderate effort beats sporadic intensity. Even 10 focused hours per week compounds over time."
      ],
      callToAction: {
        text: "Read the Full Guide",
        url: "https://cpaexamblueprint.com/working-full-time"
      },
      resources: [
        {
          title: "CPA Exam While Working Full Time",
          url: "https://cpaexamblueprint.com/blog/cpa-exam-while-working-full-time",
          description: "Complete guide with sample schedules"
        },
        {
          title: "Study Hours Calculator",
          url: "https://cpaexamblueprint.com/tools/study-hours-calculator",
          description: "Plan your timeline based on available hours"
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
      headline: "Conquering FAR First",
      body: [
        "Your study plan recommends starting with FAR—the most comprehensive core section. Good choice for building a strong foundation.",
        "FAR has the lowest pass rate among core sections (40-43%), but that's largely because it covers the broadest range of topics, not because it's impossibly difficult.",
        "The key to FAR success: don't skip governmental accounting. It's 20-30% of your score, and many candidates underestimate it.",
        "I've put together FAR-specific resources to help you prepare strategically."
      ],
      callToAction: {
        text: "FAR Study Guide",
        url: "https://cpaexamblueprint.com/blog/far-section-complete-study-guide"
      },
      resources: [
        {
          title: "FAR Section Complete Guide",
          url: "https://cpaexamblueprint.com/blog/far-section-complete-study-guide",
          description: "Content breakdown and study strategy"
        },
        {
          title: "FAR Section Overview",
          url: "https://cpaexamblueprint.com/sections/far",
          description: "Exam format and key topics"
        }
      ]
    }
  },

  "aud-first": {
    id: "seg-aud-first",
    segment: "aud-first",
    subject: "Starting with AUD? Here's Your Strategy",
    previewText: "Master auditing concepts with these proven approaches",
    content: {
      headline: "Mastering Audit First",
      body: [
        "Your plan recommends starting with AUD—a solid choice if you're coming from an audit background or want to tackle conceptual material while fresh.",
        "AUD is unique among CPA sections: it tests the 'Evaluation' skill level, requiring professional judgment rather than just recall.",
        "The secret to AUD: understand the 'why' behind procedures. Don't just memorize—learn why specific audit procedures are appropriate for specific risks.",
        "Here are AUD-specific resources to guide your preparation."
      ],
      callToAction: {
        text: "AUD Study Guide",
        url: "https://cpaexamblueprint.com/blog/aud-section-complete-study-guide"
      },
      resources: [
        {
          title: "AUD Section Complete Guide",
          url: "https://cpaexamblueprint.com/blog/aud-section-complete-study-guide",
          description: "Content areas and strategies"
        },
        {
          title: "AUD Section Overview",
          url: "https://cpaexamblueprint.com/sections/aud",
          description: "Exam format and key concepts"
        }
      ]
    }
  },

  "reg-first": {
    id: "seg-reg-first",
    segment: "reg-first",
    subject: "Starting with REG? Smart Choice",
    previewText: "Tax and business law strategies for success",
    content: {
      headline: "REG: Your Starting Point",
      body: [
        "Your plan recommends starting with REG—excellent for building confidence since it has the highest pass rate among core sections (58-64%).",
        "REG combines federal taxation with business law. If you have any tax background, you'll find parts of this section familiar.",
        "Key tip: Don't neglect business law (10-20% of the exam). Candidates often over-focus on tax and lose easy points on conceptual law questions.",
        "Here are REG-specific resources for your preparation."
      ],
      callToAction: {
        text: "REG Study Guide",
        url: "https://cpaexamblueprint.com/blog/reg-section-complete-study-guide"
      },
      resources: [
        {
          title: "REG Section Complete Guide",
          url: "https://cpaexamblueprint.com/blog/reg-section-complete-study-guide",
          description: "Content breakdown and formulas"
        },
        {
          title: "REG Section Overview",
          url: "https://cpaexamblueprint.com/sections/reg",
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
        "You indicated you have 10-15 hours per week for studying. That's absolutely enough to pass—you'll just need a longer timeline.",
        "With limited hours, efficiency becomes critical. Every study session needs to count.",
        "The good news: research shows that spaced repetition (shorter, more frequent sessions) often produces better retention than marathon study days.",
        "Here's how to make your limited hours work harder."
      ],
      callToAction: {
        text: "Time Management Tips",
        url: "https://cpaexamblueprint.com/blog/cpa-exam-while-working-full-time"
      },
      resources: [
        {
          title: "Study Hours Calculator",
          url: "https://cpaexamblueprint.com/tools/study-hours-calculator",
          description: "Calculate your realistic timeline"
        },
        {
          title: "Working Full Time Guide",
          url: "https://cpaexamblueprint.com/blog/cpa-exam-while-working-full-time",
          description: "Strategies for busy schedules"
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
      headline: "Retaking a Section? You've Got This.",
      body: [
        "If you're retaking a section, first know this: you're not alone. Most successful CPAs didn't pass every section on the first try.",
        "The fact that you're back studying shows resilience. That matters more than a first-attempt pass.",
        "For retakes, strategy is everything. Identify what went wrong last time—was it content gaps, time management, or test anxiety?",
        "I've compiled our best resources for candidates in exactly your position."
      ],
      callToAction: {
        text: "I Failed, Now What?",
        url: "https://cpaexamblueprint.com/guides/failed-section"
      },
      resources: [
        {
          title: "I Failed, Now What? Guide",
          url: "https://cpaexamblueprint.com/guides/failed-section",
          description: "Complete recovery strategy"
        },
        {
          title: "Score Report Interpretation",
          url: "https://cpaexamblueprint.com/guides/failed-section#score-report",
          description: "What your score report tells you"
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
export function generateSegmentEmailHtml(email: SegmentEmail): string {
  const resourcesHtml = email.content.resources
    ? `<div class="resources">
        <h3>Recommended Resources</h3>
        ${email.content.resources.map(r => `
          <a href="${r.url}" class="resource-item">
            <div class="resource-title">${r.title}</div>
            <div class="resource-desc">${r.description}</div>
          </a>
        `).join('')}
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
      font-size: 24px;
      font-weight: 700;
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
    .resources {
      background: #f8fafc;
      padding: 20px;
      border-radius: 8px;
      margin: 24px 0;
    }
    .resources h3 {
      margin: 0 0 16px 0;
      color: #1e3a5f;
      font-size: 16px;
    }
    .resource-item {
      display: block;
      padding: 12px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      margin-bottom: 8px;
      text-decoration: none;
      color: inherit;
      transition: border-color 0.2s;
    }
    .resource-item:hover {
      border-color: #1e3a5f;
    }
    .resource-item:last-child {
      margin-bottom: 0;
    }
    .resource-title {
      font-weight: 600;
      color: #1e3a5f;
      margin-bottom: 4px;
    }
    .resource-desc {
      font-size: 14px;
      color: #64748b;
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
    }
    .footer a {
      color: #1e3a5f;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>${email.content.headline}</h1>
    </div>
    <div class="content">
      ${email.content.body.map(p => `<p>${p}</p>`).join('')}

      ${resourcesHtml}

      ${ctaHtml}
    </div>
    <div class="footer">
      <p>CPA Exam Blueprint — Affordable CPA exam study tools</p>
      <p><a href="https://cpaexamblueprint.com">cpaexamblueprint.com</a></p>
    </div>
  </div>
</body>
</html>
  `;
}
