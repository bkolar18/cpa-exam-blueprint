export interface SuccessStory {
  slug: string;
  name: string;
  location: string;
  situation: string;
  photo?: string;
  sections: {
    name: string;
    score: number;
    attempts: number;
  }[];
  totalMonths: number;
  studyHoursPerWeek: number;
  quote: string;
  fullStory: string;
  tips: string[];
  featured?: boolean;
}

export const successStories: SuccessStory[] = [
  {
    slug: "sarah-working-mom",
    name: "Sarah M.",
    location: "Texas",
    situation: "Working Mom",
    sections: [
      { name: "FAR", score: 81, attempts: 2 },
      { name: "AUD", score: 78, attempts: 1 },
      { name: "REG", score: 84, attempts: 1 },
      { name: "TCP", score: 79, attempts: 1 },
    ],
    totalMonths: 14,
    studyHoursPerWeek: 15,
    quote: "I studied during nap times, lunch breaks, and after bedtime. It wasn't glamorous, but it worked.",
    fullStory: `When I decided to pursue my CPA, my daughter was 2 years old and I was working full-time as a staff accountant. Everyone told me to wait until she was older, but I knew if I kept waiting, I'd never do it.

My secret weapon was ruthless time management. I studied during her nap times on weekends (about 3 hours), during my lunch breaks at work (30 minutes of MCQs), and for 2 hours after she went to bed. It wasn't a lot each day, but it added up.

I failed FAR on my first attempt with a 71. I was devastated - I had studied so hard. But I analyzed my score report, realized I was weak on governmental accounting, and hit those topics hard for my retake. Passed with an 81 the second time.

The hardest part wasn't the material - it was the mom guilt. There were birthday parties I missed, weekends I couldn't fully be present. But I kept reminding myself this was temporary, and the career growth would benefit my whole family.

My advice to other parents: Don't aim for perfect study conditions. They don't exist. Aim for consistent, even if it's imperfect. 15 hours a week for 14 months got me my license.`,
    tips: [
      "Use every pocket of time - even 15 minutes of MCQs adds up",
      "Don't compare your timeline to childless candidates",
      "Get your partner/family on board with your schedule",
      "Forgive yourself when you miss study sessions",
      "Celebrate small wins along the way",
    ],
    featured: true,
  },
  {
    slug: "james-career-changer",
    name: "James T.",
    location: "California",
    situation: "Career Changer",
    sections: [
      { name: "FAR", score: 76, attempts: 1 },
      { name: "AUD", score: 82, attempts: 1 },
      { name: "REG", score: 75, attempts: 2 },
      { name: "BAR", score: 77, attempts: 1 },
    ],
    totalMonths: 11,
    studyHoursPerWeek: 25,
    quote: "At 35, I left a marketing career to become a CPA. Best decision I ever made.",
    fullStory: `I spent 10 years in marketing before realizing I wanted something different. I went back to school at 33 to get my accounting credits, and at 35, I started studying for the CPA exam.

Being a career changer meant I didn't have the same foundation as accounting majors. Concepts that were review for them were brand new to me. I had to put in extra time, especially on FAR.

I chose to study full-time while living off savings - a luxury I know not everyone has. But even with 25 hours a week, it took me 11 months. The CPA exam is no joke regardless of your background.

REG was my nemesis. I failed it the first time with a 72 - so close! The tax code felt like learning a foreign language. For my retake, I focused almost exclusively on individual taxation and property transactions, and barely squeaked by with a 75.

The career change has been worth every sacrifice. I'm now a senior associate at a mid-size firm, and my marketing background actually helps me communicate with clients better than some of my peers.`,
    tips: [
      "Your non-accounting experience is an asset, not a liability",
      "Expect to spend more time on fundamentals than accounting majors",
      "Consider studying full-time if financially possible",
      "Network with other career changers for support",
      "Don't let age be an excuse - I passed at 36",
    ],
    featured: true,
  },
  {
    slug: "michael-big4-grind",
    name: "Michael R.",
    location: "New York",
    situation: "Big 4 Associate",
    sections: [
      { name: "FAR", score: 85, attempts: 1 },
      { name: "AUD", score: 88, attempts: 1 },
      { name: "REG", score: 79, attempts: 1 },
      { name: "TCP", score: 91, attempts: 1 },
    ],
    totalMonths: 8,
    studyHoursPerWeek: 20,
    quote: "Busy season and CPA studying don't mix. Plan around it or you'll burn out.",
    fullStory: `I started at a Big 4 firm right out of college, and the pressure to pass the CPA exam quickly was intense. Partners would casually ask about your progress. It felt like my career depended on it - because honestly, it kind of did.

My strategy was to knock out as many sections as possible before my first busy season. I studied aggressively from June to January, passing FAR, AUD, and REG. Then busy season hit, and I barely looked at my review materials for 3 months.

After busy season, I was exhausted but pushed through to finish TCP in May. Looking back, I'm glad I front-loaded the hard sections. Trying to study during busy season would have broken me.

The firm paid for my review course and gave us study time, which helped. But the real key was having a study group with other first-years. We kept each other accountable and shared tips on what topics the exam was actually testing.

I passed all four sections on my first try, but I want to be honest - I had advantages. No kids, no mortgage, and employer support. Everyone's situation is different.`,
    tips: [
      "Pass as many sections as possible before your first busy season",
      "Take advantage of employer study time if offered",
      "Form a study group with colleagues",
      "AUD content directly applies to your job - use that synergy",
      "Don't neglect your mental health during the grind",
    ],
    featured: false,
  },
  {
    slug: "amanda-retaker-success",
    name: "Amanda K.",
    location: "Florida",
    situation: "Multiple Retaker",
    sections: [
      { name: "FAR", score: 78, attempts: 4 },
      { name: "AUD", score: 76, attempts: 2 },
      { name: "REG", score: 82, attempts: 1 },
      { name: "ISC", score: 80, attempts: 1 },
    ],
    totalMonths: 24,
    studyHoursPerWeek: 12,
    quote: "I failed FAR three times before passing. The fourth time, I completely changed my approach.",
    fullStory: `My CPA journey was not a straight line. I failed FAR three times - with scores of 68, 71, and 72. Each time I got closer, which was somehow more frustrating than failing badly.

After my third failure, I had to take a hard look at what I was doing wrong. I realized I was a passive studier - I watched lectures, read the book, and felt like I understood. But when exam questions came, I froze.

For my fourth attempt, I completely changed my approach. I stopped watching lectures entirely and spent 90% of my time on MCQs and simulations. Every wrong answer, I wrote down why I got it wrong in a notebook. I reviewed that notebook every morning.

I also switched review courses. My first course had great lectures but weak practice questions. My new course had a massive question bank, which is what I actually needed.

FAR attempt four: 78. I literally cried when I saw that score.

The rest of my sections went smoother because I had learned how to actually study for this exam. My message to repeat failers: You're not dumb. You might just need to change your method.`,
    tips: [
      "If you've failed twice with the same approach, change something",
      "Active recall (practice questions) beats passive studying",
      "Keep a wrong answer journal and review it regularly",
      "Don't be afraid to switch review courses",
      "A failing score close to 75 means you're almost there",
    ],
    featured: true,
  },
  {
    slug: "david-international",
    name: "David L.",
    location: "Illinois",
    situation: "International Candidate",
    sections: [
      { name: "FAR", score: 83, attempts: 1 },
      { name: "AUD", score: 79, attempts: 1 },
      { name: "REG", score: 77, attempts: 2 },
      { name: "TCP", score: 81, attempts: 1 },
    ],
    totalMonths: 16,
    studyHoursPerWeek: 18,
    quote: "Coming from China, US tax law felt like another language. But I made it work.",
    fullStory: `I moved to the US for my master's degree and decided to pursue the CPA license to establish my career here. The challenge was that my undergraduate accounting degree from China covered completely different standards.

FAR was actually okay because IFRS and US GAAP have similarities, and my program covered the differences. AUD was manageable because auditing concepts are somewhat universal.

REG was my nightmare. US tax law has no equivalent in my background. I had to learn it from scratch - individual taxation, corporate taxation, business law - all new concepts with new terminology. I failed my first attempt with a 69.

For my retake, I joined a study group specifically for international candidates. Hearing others struggle with the same concepts made me feel less alone. We would explain topics to each other in simpler terms, which helped the concepts stick.

I also spent extra time on business law, which is heavily tested but often overlooked. Understanding formation of entities and contracts was crucial.

To other international candidates: Yes, we have to work harder on certain sections. But our diverse perspective is valuable, and firms are increasingly looking for candidates with international experience.`,
    tips: [
      "Connect with other international candidates for support",
      "Budget extra time for REG if US tax law is new to you",
      "Don't skip business law - it's heavily tested",
      "Your international perspective is a career asset",
      "Consider states with easier credential evaluation processes",
    ],
    featured: false,
  },
];

export function getStoryBySlug(slug: string): SuccessStory | undefined {
  return successStories.find((story) => story.slug === slug);
}

export function getFeaturedStories(): SuccessStory[] {
  return successStories.filter((story) => story.featured);
}

export function getAllStorySlugs(): string[] {
  return successStories.map((story) => story.slug);
}
