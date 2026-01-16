import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CPA Exam Pass Rates 2025-2026 | Updated Statistics by Section',
  description: 'Current CPA exam pass rates for all sections: FAR, AUD, REG, TCP, BAR, and ISC. See historical trends, difficulty rankings, and what affects your chances of passing.',
  keywords: 'CPA pass rate, CPA exam pass rate, FAR pass rate, AUD pass rate, REG pass rate, CPA exam difficulty, CPA exam statistics',
};

// Note: Pass rate data based on publicly available AICPA reports
// These are approximate figures and may vary by testing window
// Always check aicpa.org for the most current official statistics
const passRateData = {
  lastUpdated: 'Q3 2025',
  source: 'AICPA (approximate)',
  disclaimer: 'Pass rates are approximate based on publicly available AICPA data. Individual results vary based on preparation.',
  sections: [
    {
      code: 'FAR',
      name: 'Financial Accounting & Reporting',
      passRate: 42.5,
      trend: 'stable',
      difficulty: 'Hardest',
      avgStudyHours: '120-150',
      color: 'bg-blue-500',
      tips: 'Heavy on governmental/nonprofit accounting and complex transactions. Requires consistent daily study.',
    },
    {
      code: 'AUD',
      name: 'Auditing & Attestation',
      passRate: 48.2,
      trend: 'up',
      difficulty: 'Moderate-Hard',
      avgStudyHours: '90-120',
      color: 'bg-purple-500',
      tips: 'Conceptual understanding is key. Focus on audit procedures and report modifications.',
    },
    {
      code: 'REG',
      name: 'Regulation',
      passRate: 55.8,
      trend: 'stable',
      difficulty: 'Moderate',
      avgStudyHours: '100-120',
      color: 'bg-green-500',
      tips: 'Tax rules change frequently. Use current-year materials and focus on basis calculations.',
    },
    {
      code: 'TCP',
      name: 'Tax Compliance & Planning',
      passRate: 51.3,
      trend: 'new',
      difficulty: 'Moderate',
      avgStudyHours: '80-100',
      color: 'bg-teal-500',
      tips: 'New discipline section. Emphasizes tax planning strategies and research skills.',
    },
    {
      code: 'BAR',
      name: 'Business Analysis & Reporting',
      passRate: 44.6,
      trend: 'new',
      difficulty: 'Hard',
      avgStudyHours: '100-120',
      color: 'bg-orange-500',
      tips: 'Combines technical accounting with data analytics. Strong in financial statement analysis.',
    },
    {
      code: 'ISC',
      name: 'Information Systems & Controls',
      passRate: 58.2,
      trend: 'new',
      difficulty: 'Moderate',
      avgStudyHours: '70-90',
      color: 'bg-indigo-500',
      tips: 'Highest pass rate discipline. IT audit and cybersecurity knowledge is essential.',
    },
  ],
};

const historicalData = [
  { year: '2024', far: 44.2, aud: 47.8, reg: 54.1, note: 'Last year of legacy BEC section' },
  { year: '2023', far: 43.5, aud: 46.9, reg: 55.2, note: '' },
  { year: '2022', far: 44.8, aud: 47.5, reg: 56.8, note: '' },
  { year: '2021', far: 47.0, aud: 49.1, reg: 59.9, note: 'COVID exam accommodations' },
  { year: '2020', far: 46.4, aud: 47.6, reg: 58.3, note: 'COVID exam accommodations' },
];

const factorsAffectingPassRate = [
  {
    factor: 'Study Hours',
    impact: 'High',
    description: 'Candidates who study 100+ hours per section pass at significantly higher rates than those who study less.',
  },
  {
    factor: 'Practice Questions',
    impact: 'High',
    description: 'Completing 2,000+ MCQs per section correlates strongly with passing. Quality over quantity matters.',
  },
  {
    factor: 'Time Since Graduation',
    impact: 'Medium',
    description: 'Recent graduates tend to have higher pass rates, but working professionals can succeed with structured study.',
  },
  {
    factor: 'Review Course Quality',
    impact: 'Medium',
    description: 'Candidates using comprehensive review courses pass at higher rates than self-study alone.',
  },
  {
    factor: 'Exam Timing',
    impact: 'Low',
    description: 'Pass rates are relatively consistent across testing windows. Pick what works for your schedule.',
  },
];

const faqs = [
  {
    question: 'What is the overall CPA exam pass rate?',
    answer: 'The cumulative pass rate across all sections typically ranges from 45-55%. This means roughly half of all exam attempts result in a passing score, though many candidates pass after multiple attempts.',
  },
  {
    question: 'Which CPA exam section has the lowest pass rate?',
    answer: 'FAR (Financial Accounting & Reporting) consistently has the lowest pass rate at around 42-45%. This is due to the breadth of content, including governmental, nonprofit, and complex corporate accounting topics.',
  },
  {
    question: 'Which CPA exam section has the highest pass rate?',
    answer: 'Among the discipline sections, ISC (Information Systems & Controls) has the highest pass rate at around 58%. Among core sections, REG typically has the highest pass rate at around 55%.',
  },
  {
    question: 'How many times does the average person take the CPA exam?',
    answer: 'Most successful candidates take each section 1-2 times on average. It\'s common to fail one or more sections before passing all four. The key is persistence and learning from each attempt.',
  },
  {
    question: 'Do pass rates vary by testing window?',
    answer: 'Pass rates are relatively consistent throughout the year. Some candidates believe certain windows are easier, but AICPA data shows minimal variation between quarters.',
  },
  {
    question: 'What percentage of people pass the CPA exam on their first try?',
    answer: 'Approximately 20-25% of candidates pass all sections on their first attempt. However, this varies significantly based on preparation quality and study time invested.',
  },
];

export default function CPAPassRatesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="inline-flex items-center text-gray-200 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CPA Exam Pass Rates 2025-2026
            </h1>
            <p className="text-xl text-gray-200 mb-4">
              Current statistics for all CPA exam sections including the new discipline options under CPA Evolution.
            </p>
            <p className="text-sm text-gray-300">
              Last updated: {passRateData.lastUpdated} | Source: {passRateData.source}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-8 text-sm text-[var(--muted)]">
          <strong>Disclaimer:</strong> {passRateData.disclaimer} For official statistics, visit{' '}
          <a href="https://www.aicpa.org" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
            aicpa.org
          </a>.
        </div>

        {/* Pass Rate Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Current Pass Rates by Section
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {passRateData.sections.map((section) => (
              <div
                key={section.code}
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`${section.color} h-2`} />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-[var(--foreground)]">{section.code}</h3>
                      <p className="text-sm text-[var(--muted)]">{section.name}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-[var(--primary)]">
                        {section.passRate}%
                      </div>
                      <div className="text-xs text-[var(--muted)]">
                        {section.trend === 'up' && '↑ Trending up'}
                        {section.trend === 'down' && '↓ Trending down'}
                        {section.trend === 'stable' && '→ Stable'}
                        {section.trend === 'new' && '★ New section'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Difficulty:</span>
                      <span className="font-medium text-[var(--foreground)]">{section.difficulty}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--muted)]">Avg Study Hours:</span>
                      <span className="font-medium text-[var(--foreground)]">{section.avgStudyHours}</span>
                    </div>
                  </div>

                  {/* Visual pass rate bar */}
                  <div className="mb-4">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${section.color} transition-all duration-500`}
                        style={{ width: `${section.passRate}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-[var(--muted)]">{section.tips}</p>

                  <Link
                    href={`/sections/${section.code.toLowerCase()}`}
                    className="inline-flex items-center text-[var(--primary)] hover:underline mt-4 text-sm font-medium"
                  >
                    Study {section.code}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Insights */}
        <section className="mb-16">
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-blue-900 dark:text-blue-200 mb-4">
              Key Insights from 2025-2026 Data
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Core Sections</h3>
                <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    FAR remains the most challenging with the lowest pass rate
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    AUD pass rates have improved slightly with CPA Evolution
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    REG maintains the highest core section pass rate
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Discipline Sections</h3>
                <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    ISC has the highest pass rate among all sections
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    BAR is the most challenging discipline option
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500">•</span>
                    TCP falls in the middle for difficulty
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Historical Data */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Historical Pass Rate Trends
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Year</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--foreground)]">FAR</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--foreground)]">AUD</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--foreground)]">REG</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {historicalData.map((row) => (
                    <tr key={row.year} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-[var(--foreground)]">{row.year}</td>
                      <td className="px-6 py-4 text-center text-[var(--muted)]">{row.far}%</td>
                      <td className="px-6 py-4 text-center text-[var(--muted)]">{row.aud}%</td>
                      <td className="px-6 py-4 text-center text-[var(--muted)]">{row.reg}%</td>
                      <td className="px-6 py-4 text-sm text-[var(--muted)]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-[var(--muted)] mt-4">
            Note: 2025 introduced the new CPA Evolution exam format with discipline sections (TCP, BAR, ISC) replacing BEC.
          </p>
        </section>

        {/* Factors Affecting Pass Rate */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            What Affects Your Chances of Passing?
          </h2>
          <div className="space-y-4">
            {factorsAffectingPassRate.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-[var(--foreground)]">{item.factor}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.impact === 'High'
                            ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                            : item.impact === 'Medium'
                            ? 'bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {item.impact} Impact
                      </span>
                    </div>
                    <p className="text-[var(--muted)]">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
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

        {/* Improve Your Odds */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              How to Beat the Average Pass Rate
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">2,000+</div>
                <div className="text-sm text-gray-200">Practice questions per section</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">100-150</div>
                <div className="text-sm text-gray-200">Study hours minimum</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="text-3xl mb-2">50%</div>
                <div className="text-sm text-gray-200">Time on simulations (TBS)</div>
              </div>
            </div>
            <p className="text-gray-200 mb-6">
              Candidates who follow a structured study plan with adequate practice pass at rates well above the national average.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center bg-white text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Practicing Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        {/* Related Resources */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Related Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/guides/failed-section"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] transition-colors"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Failed a Section?</h3>
              <p className="text-sm text-[var(--muted)]">
                Practical guide to analyzing what went wrong and passing on your next attempt.
              </p>
            </Link>
            <Link
              href="/tools/study-hours-calculator"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] transition-colors"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Study Hours Calculator</h3>
              <p className="text-sm text-[var(--muted)]">
                Find out how many hours you need to study based on your background and goals.
              </p>
            </Link>
            <Link
              href="/state-requirements"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] transition-colors"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">State Requirements</h3>
              <p className="text-sm text-[var(--muted)]">
                Check the CPA exam requirements for your state including education and experience.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
