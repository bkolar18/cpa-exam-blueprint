import Link from 'next/link';

export const metadata = {
  title: 'I Failed the CPA Exam - Now What? | Recovery Guide for Retakers',
  description: 'Failed a CPA exam section? Learn how to analyze your score report, adjust your study approach, and come back stronger. Practical advice from CPAs who have been there.',
};

const scoreRanges = [
  {
    range: '0-49',
    status: 'Significant Gap',
    description: 'Major content gaps exist. Consider a full re-study with a different approach.',
    color: 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800',
  },
  {
    range: '50-64',
    status: 'Moderate Gap',
    description: 'Core concepts need reinforcement. Focus on weak areas identified in your report.',
    color: 'bg-orange-100 dark:bg-orange-950/40 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-800',
  },
  {
    range: '65-74',
    status: 'Almost There',
    description: 'You&apos;re close! Targeted review of weak areas should get you over the line.',
    color: 'bg-yellow-100 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
  },
];

const commonMistakes = [
  {
    mistake: 'Not enough practice questions',
    fix: 'Aim for 2,000+ MCQs per section. Quality review courses offer 5,000+.',
    icon: '📝',
  },
  {
    mistake: 'Passive studying (reading/watching)',
    fix: 'Switch to active recall: practice questions, teaching concepts, flashcards.',
    icon: '📖',
  },
  {
    mistake: 'Ignoring weak areas',
    fix: 'Your score report shows exactly where to focus. Attack those topics first.',
    icon: '🎯',
  },
  {
    mistake: 'Poor time management on exam',
    fix: 'Practice timed sections. Know your pace for MCQs vs TBS.',
    icon: '⏰',
  },
  {
    mistake: 'Cramming instead of spacing',
    fix: 'Spread study over weeks, not days. Spaced repetition beats cramming.',
    icon: '📅',
  },
  {
    mistake: 'Neglecting simulations (TBS)',
    fix: 'TBS are worth 50% of your score. Practice them extensively.',
    icon: '💻',
  },
];

const retakeTimeline = [
  {
    phase: 'Days 1-3',
    title: 'Process & Analyze',
    tasks: [
      'Allow yourself to feel disappointed - it\'s normal',
      'Download and save your score report',
      'Identify your weak areas from the performance breakdown',
      'Don\'t start studying yet - you need perspective first',
    ],
  },
  {
    phase: 'Days 4-7',
    title: 'Plan Your Approach',
    tasks: [
      'Honestly assess what went wrong',
      'Create a targeted study plan focusing on weak areas',
      'Schedule your retake date (consider the 18-month clock)',
      'Gather fresh study materials if needed',
    ],
  },
  {
    phase: 'Weeks 2-6',
    title: 'Targeted Review',
    tasks: [
      'Focus 70% of time on weak areas, 30% on maintaining strengths',
      'Change up your study methods from last time',
      'Do more practice questions than before',
      'Simulate exam conditions with timed practice tests',
    ],
  },
  {
    phase: 'Final Week',
    title: 'Final Prep',
    tasks: [
      'Light review only - no cramming',
      'Focus on high-weight topics',
      'Get proper sleep and reduce stress',
      'Trust your preparation',
    ],
  },
];

export default function FailedSectionGuidePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-200 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Resources
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              I Failed the CPA Exam. Now What?
            </h1>
            <p className="text-xl text-gray-200">
              A practical guide to analyzing what went wrong, adjusting your approach, and passing on your next attempt.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Empathy Section */}
        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-200 mb-3">
              First, Take a Breath
            </h2>
            <p className="text-blue-800 dark:text-blue-300 mb-4">
              Failing a CPA exam section is disappointing, but it&apos;s not the end of your CPA journey. Here are some facts to put things in perspective:
            </p>
            <ul className="space-y-2 text-blue-700 dark:text-blue-300">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Pass rates range from 33-64%</strong> depending on the section. Many candidates need multiple attempts.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Nearly every CPA has failed at least one section.</strong> It&apos;s part of the journey for most.</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>You now have valuable data</strong> about what you need to improve.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Understanding Your Score */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Understanding Your Score Report
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Your score report is a roadmap for improvement. Here&apos;s how to interpret it:
          </p>

          <div className="space-y-4 mb-8">
            {scoreRanges.map((range) => (
              <div key={range.range} className={`rounded-xl border p-4 ${range.color}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Score: {range.range}</span>
                  <span className="text-sm font-medium">{range.status}</span>
                </div>
                <p className="text-sm opacity-90">{range.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">How to Read Your Performance Report</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-1">Content Area Breakdown</h4>
                <p className="text-[var(--muted)] text-sm">
                  Your report shows performance as &quot;Stronger,&quot; &quot;Comparable,&quot; or &quot;Weaker&quot; for each content area. Focus on the &quot;Weaker&quot; areas first.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-1">MCQ vs. TBS Performance</h4>
                <p className="text-[var(--muted)] text-sm">
                  The report shows your performance on multiple choice questions separately from simulations. If one is significantly weaker, adjust your study approach accordingly.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-1">Skill Level Performance</h4>
                <p className="text-[var(--muted)] text-sm">
                  Performance is broken down by skill level (Remembering, Understanding, Application, Analysis). Lower scores in Application/Analysis suggest you need more practice applying concepts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Common Mistakes (And How to Fix Them)
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Be honest with yourself about which of these might apply to you:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {commonMistakes.map((item, index) => (
              <div key={index} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)] mb-1">{item.mistake}</h3>
                    <p className="text-sm text-[var(--muted)]">{item.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Retake Timeline */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Your Retake Timeline
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Most candidates benefit from a 4-6 week targeted study period before retaking. Here&apos;s a suggested approach:
          </p>
          <div className="space-y-6">
            {retakeTimeline.map((phase, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  {index < retakeTimeline.length - 1 && (
                    <div className="w-0.5 h-full bg-[var(--border)] my-2" />
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="text-sm text-[var(--primary)] font-medium mb-1">{phase.phase}</div>
                  <h3 className="font-semibold text-[var(--foreground)] mb-3">{phase.title}</h3>
                  <ul className="space-y-2">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start gap-2 text-[var(--muted)]">
                        <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* The 18-Month Clock */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Managing the 18-Month Clock
          </h2>
          <div className="bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
            <p className="text-yellow-800 dark:text-yellow-300 mb-4">
              Remember: Your 18-month clock started when you passed your first section. If you fail a section, you need to pass it before any previously passed sections expire.
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-yellow-900 dark:text-yellow-200">Priority Order for Retakes:</h4>
                <ol className="list-decimal list-inside text-yellow-800 dark:text-yellow-300 mt-2 space-y-1">
                  <li>If a passed section is about to expire, prioritize that section area knowledge</li>
                  <li>If you have plenty of time, focus on the failed section</li>
                  <li>Some candidates strategically take a different section first if they&apos;re more confident</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Mental Game */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            The Mental Game
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Reframe the Failure</h3>
              <p className="text-[var(--muted)]">
                This isn&apos;t a reflection of your intelligence or future as a CPA. It&apos;s data about what you need to study differently. Many successful CPAs failed multiple times before passing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Avoid Comparison</h3>
              <p className="text-[var(--muted)]">
                Everyone&apos;s journey is different. Some people pass on their first try; others need several attempts. What matters is that you keep going.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Take Real Breaks</h3>
              <p className="text-[var(--muted)]">
                Burnout is real. If you&apos;ve been grinding for months, a few days completely away from studying can help you return with fresh perspective and energy.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Find Your Support System</h3>
              <p className="text-[var(--muted)]">
                Talk to other candidates, join study groups, or find an accountability partner. The CPA journey is easier when you&apos;re not alone.
              </p>
            </div>
          </div>
        </section>

        {/* Success Stories Teaser */}
        <section className="mb-12">
          <div className="bg-[var(--primary)] rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-3">
              You&apos;re in Good Company
            </h2>
            <p className="text-gray-200 mb-4">
              Countless CPAs have faced exactly what you&apos;re facing right now - and came out the other side with their license. The difference between those who pass and those who give up? They kept going.
            </p>
            <blockquote className="border-l-4 border-white/50 pl-4 italic text-gray-200">
              &quot;I failed FAR twice before passing with a 79. Each failure taught me what didn&apos;t work. The third time, I changed everything about how I studied - and it worked.&quot;
            </blockquote>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--card)] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            Ready to Build Your Comeback Plan?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Get a personalized study plan that accounts for your retake timeline and weak areas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/study-plan" className="btn-secondary">
              Build My Study Plan
            </Link>
            <Link href="/tools/study-hours-calculator" className="btn-primary">
              Calculate Study Hours
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
