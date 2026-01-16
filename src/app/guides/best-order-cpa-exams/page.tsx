import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Order to Take the CPA Exam Sections | 2025-2026 Guide',
  description: 'Discover the optimal order to take your CPA exam sections. Compare different approaches and find a strategy that fits your background and schedule.',
  keywords: 'CPA exam order, which CPA exam first, best CPA exam order, FAR first, AUD first, CPA exam strategy',
};

const sectionOverview = [
  {
    code: 'FAR',
    name: 'Financial Accounting & Reporting',
    difficulty: 'Hardest',
    passRate: '~43%',
    studyHours: '120-150 hours',
    description: 'Covers financial accounting standards, governmental accounting, and nonprofit accounting. The broadest section with the most content.',
    commonFirst: true,
    pros: ['Foundational knowledge for other sections', 'Material stays fresh if you studied accounting recently', 'Getting the hardest section done early builds momentum'],
    cons: ['Highest volume of content', 'Lowest pass rate can be discouraging', 'Long study period before first win'],
  },
  {
    code: 'AUD',
    name: 'Auditing & Attestation',
    difficulty: 'Moderate-Hard',
    passRate: '~48%',
    studyHours: '90-120 hours',
    description: 'Covers audit procedures, attestation engagements, and professional responsibilities. Relies on understanding financial statements.',
    commonFirst: false,
    pros: ['Benefits from FAR knowledge', 'More conceptual than memorization-heavy', 'Moderate study time'],
    cons: ['Assumes familiarity with financial statements', 'Can feel abstract without audit experience', 'Multiple report formats to memorize'],
  },
  {
    code: 'REG',
    name: 'Regulation',
    difficulty: 'Moderate',
    passRate: '~55%',
    studyHours: '100-120 hours',
    description: 'Covers federal taxation (individual and business), business law, and ethics. Tax content is heavily tested.',
    commonFirst: false,
    pros: ['Highest core section pass rate', 'Good standalone section', 'Practical tax knowledge is useful'],
    cons: ['Tax law changes frequently', 'Study materials can become outdated', 'Heavy on rules and regulations'],
  },
  {
    code: 'TCP',
    name: 'Tax Compliance & Planning',
    difficulty: 'Moderate',
    passRate: '~51%',
    studyHours: '80-100 hours',
    description: 'Discipline section focusing on tax planning and research. Good choice if you work in or want to specialize in tax.',
    commonFirst: false,
    pros: ['Overlaps with REG content', 'Good for tax-focused careers', 'Shorter than core sections'],
    cons: ['Should be taken after REG', 'Specialized content'],
  },
  {
    code: 'BAR',
    name: 'Business Analysis & Reporting',
    difficulty: 'Hard',
    passRate: '~45%',
    studyHours: '100-120 hours',
    description: 'Discipline section covering technical accounting and data analytics. Good for those in financial reporting roles.',
    commonFirst: false,
    pros: ['Overlaps with FAR content', 'Good for reporting-focused careers', 'Builds on core accounting knowledge'],
    cons: ['Should be taken after FAR', 'Lower pass rate among disciplines'],
  },
  {
    code: 'ISC',
    name: 'Information Systems & Controls',
    difficulty: 'Moderate',
    passRate: '~58%',
    studyHours: '70-90 hours',
    description: 'Discipline section covering IT audit, cybersecurity, and system controls. Good for audit or IT-focused careers.',
    commonFirst: false,
    pros: ['Highest pass rate of all sections', 'Shorter study time', 'Growing demand for IT audit skills'],
    cons: ['May feel unfamiliar to traditional accountants', 'Requires IT knowledge'],
  },
];

const popularOrders = [
  {
    name: 'FAR First (Most Common)',
    order: ['FAR', 'AUD', 'REG', 'Discipline'],
    description: 'Start with the hardest section while your accounting knowledge is fresh. AUD benefits from FAR knowledge, then finish with REG and your discipline.',
    bestFor: ['Recent graduates', 'Those with strong accounting background', 'Candidates who want to tackle the hardest first'],
    timeline: '12-18 months typical',
  },
  {
    name: 'AUD First',
    order: ['AUD', 'FAR', 'REG', 'Discipline'],
    description: 'Start with AUD if you have audit experience or want an early win before tackling FAR. Still maintains logical progression.',
    bestFor: ['Those with audit work experience', 'Candidates who want a moderate first section', 'Those who understand audit concepts'],
    timeline: '12-18 months typical',
  },
  {
    name: 'REG First',
    order: ['REG', 'FAR', 'AUD', 'Discipline'],
    description: 'Start with the highest pass rate core section to build confidence. Good if you\'re uncertain about your exam readiness.',
    bestFor: ['Those who want an early confidence boost', 'Tax professionals', 'Candidates unsure about exam difficulty'],
    timeline: '12-18 months typical',
  },
];

const disciplineStrategy = [
  {
    discipline: 'TCP',
    takeAfter: 'REG',
    reason: 'TCP and REG share significant tax content overlap. Studying them in sequence reinforces the material.',
  },
  {
    discipline: 'BAR',
    takeAfter: 'FAR',
    reason: 'BAR builds on FAR content with additional financial analysis and reporting topics. Taking them together maximizes overlap.',
  },
  {
    discipline: 'ISC',
    takeAfter: 'AUD',
    reason: 'ISC and AUD share IT audit and controls content. The sections complement each other well.',
  },
];

const faqs = [
  {
    question: 'Does the order I take the CPA exam really matter?',
    answer: 'The order can affect your success, but there\'s no universally "best" order. What matters most is choosing an order that fits your background, schedule, and learning style. Most candidates start with FAR or AUD, but starting with REG is also a valid approach. The key is maintaining momentum and passing all sections within the 30-month window.',
  },
  {
    question: 'Should I take FAR first if I hate accounting?',
    answer: 'Not necessarily. If you dread FAR, starting with it might hurt your motivation if you struggle. Consider starting with a section you\'re more confident in to build momentum and prove to yourself you can pass. Just be aware that FAR is foundational for AUD and BAR, so you\'ll need to take it eventually.',
  },
  {
    question: 'How do I choose my discipline section?',
    answer: 'Consider your career goals and which discipline aligns with your work experience. If you\'re in tax, TCP makes sense. If you\'re in financial reporting or audit, BAR or ISC might be better fits. Also consider pass rates and study time - ISC has the highest pass rate and shortest study time, which some candidates find appealing.',
  },
  {
    question: 'Can I take sections out of the suggested order?',
    answer: 'Absolutely. The suggested orders are guidelines, not requirements. You can take sections in any order you prefer. Some candidates even take multiple sections in parallel. The most important factor is passing all four sections within 30 months of your first passed section.',
  },
  {
    question: 'What happens if I fail a section early in my order?',
    answer: 'If you fail, you can retake that section after your score is released (typically 2-3 weeks). Many candidates reassess their study approach and retake within 4-8 weeks. Failing early is common and doesn\'t derail your journey - adjust your strategy and keep going.',
  },
];

export default function BestOrderCPAExamsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/resources"
              className="inline-flex items-center text-gray-200 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Resources
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Best Order to Take the CPA Exam
            </h1>
            <p className="text-xl text-gray-200">
              Strategies for sequencing your CPA exam sections to maximize your chances of success.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Key Point */}
        <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-2">
            The Most Important Thing to Know
          </h2>
          <p className="text-blue-800 dark:text-blue-300">
            There is no single &quot;best&quot; order that works for everyone. The right order depends on your background,
            career goals, study schedule, and learning preferences. What matters most is starting, maintaining momentum,
            and passing all sections within the 30-month credit window.
          </p>
        </div>

        {/* Section Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            CPA Exam Sections at a Glance
          </h2>
          <div className="space-y-4">
            {sectionOverview.map((section) => (
              <div key={section.code} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <h3 className="text-xl font-bold text-[var(--foreground)]">{section.code}</h3>
                  <span className="text-sm text-[var(--muted)]">{section.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    section.difficulty === 'Hardest' ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300' :
                    section.difficulty === 'Hard' ? 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300' :
                    'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300'
                  }`}>
                    {section.difficulty}
                  </span>
                  <span className="text-sm text-[var(--muted)]">Pass rate: {section.passRate}</span>
                  <span className="text-sm text-[var(--muted)]">{section.studyHours}</span>
                </div>
                <p className="text-[var(--muted)] mb-4">{section.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-green-700 dark:text-green-400 mb-2 text-sm">Reasons to take early:</h4>
                    <ul className="space-y-1">
                      {section.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-[var(--muted)] flex items-start gap-2">
                          <span className="text-green-500">+</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-yellow-700 dark:text-yellow-400 mb-2 text-sm">Considerations:</h4>
                    <ul className="space-y-1">
                      {section.cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-[var(--muted)] flex items-start gap-2">
                          <span className="text-yellow-500">-</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Orders */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Popular Exam Order Strategies
          </h2>
          <div className="space-y-6">
            {popularOrders.map((strategy, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <h3 className="text-lg font-bold text-[var(--foreground)]">{strategy.name}</h3>
                  <div className="flex items-center gap-2">
                    {strategy.order.map((section, sectionIdx) => (
                      <span key={sectionIdx} className="flex items-center">
                        <span className="bg-[var(--primary)] text-white text-sm px-3 py-1 rounded-full">
                          {section}
                        </span>
                        {sectionIdx < strategy.order.length - 1 && (
                          <svg className="w-4 h-4 mx-1 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[var(--muted)] mb-4">{strategy.description}</p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-[var(--muted)]">Best for: </span>
                    <span className="text-[var(--foreground)]">{strategy.bestFor.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-[var(--muted)]">Timeline: </span>
                    <span className="text-[var(--foreground)]">{strategy.timeline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Discipline Section Strategy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            When to Take Your Discipline Section
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Your discipline section should generally be scheduled to maximize content overlap with related core sections:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {disciplineStrategy.map((item) => (
              <div key={item.discipline} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-[var(--secondary)] text-white text-sm px-3 py-1 rounded-full">
                    {item.discipline}
                  </span>
                  <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                  <span className="text-sm text-[var(--muted)]">after {item.takeAfter}</span>
                </div>
                <p className="text-sm text-[var(--muted)]">{item.reason}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 30-Month Window Reminder */}
        <section className="mb-12">
          <div className="bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
              Remember: The 30-Month Clock
            </h2>
            <p className="text-yellow-800 dark:text-yellow-300 mb-4">
              Once you pass your first section, you have 30 months to pass all remaining sections. If a section credit
              expires before you pass all four, you&apos;ll need to retake it. Plan your order and timeline with this
              window in mind.
            </p>
            <Link
              href="/tools/nts-tracker"
              className="inline-flex items-center text-yellow-700 dark:text-yellow-300 hover:underline text-sm font-medium"
            >
              Track your timeline with our NTS Tracker
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6"
              >
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            Ready to Start Preparing?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Whatever order you choose, consistent practice is key. Start with thousands of free practice questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary">
              Start Practicing Free
            </Link>
            <Link href="/resources/cpa-pass-rates" className="btn-secondary">
              View Section Pass Rates
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
