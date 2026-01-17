import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Best Budget CPA Review Courses 2025 | Affordable Options Compared',
  description: 'Compare the most affordable CPA review courses. Find budget-friendly options under $2,000 that can help you pass the CPA exam without breaking the bank.',
  keywords: 'budget CPA review, cheap CPA review course, affordable CPA prep, CPA review under 2000, best value CPA course',
};

// Note: All information is based on publicly available data from each provider's website
// Prices and features may change - always verify with the provider directly
const lastUpdated = 'January 2026';

const baseUrl = 'https://meridiancpareview.com';

interface CourseOption {
  name: string;
  priceRange: string;
  lowestPrice: number;
  website: string;
  mcqCount: string;
  tbsCount: string;
  accessPeriod: string;
  strengths: string[];
  considerations: string[];
  bestFor: string;
}

const budgetOptions: CourseOption[] = [
  {
    name: 'Surgent CPA Review',
    priceRange: '$1,599 - $2,999',
    lowestPrice: 1599,
    website: 'surgent.com',
    mcqCount: '7,700+',
    tbsCount: '400+',
    accessPeriod: 'Until you pass',
    strengths: [
      'A.S.A.P. Technology adapts to your knowledge level',
      'Unlimited access until you pass',
      'Frequent discounts available',
      'ReadySCORE predicts exam readiness',
    ],
    considerations: [
      'Fewer video lecture hours than competitors',
      'Less brand recognition than Becker/Wiley',
    ],
    bestFor: 'Self-motivated learners who want adaptive technology at a lower price',
  },
  {
    name: 'Gleim CPA Review',
    priceRange: '$1,999 - $2,499',
    lowestPrice: 1999,
    website: 'gleim.com',
    mcqCount: '10,000+',
    tbsCount: '1,300+',
    accessPeriod: 'Until you pass',
    strengths: [
      'Largest question bank in the industry',
      'Unlimited access until you pass',
      'Strong focus on practice questions',
      'Personal counselor included',
    ],
    considerations: [
      'Fewer video lecture hours (100+)',
      'No live class options',
    ],
    bestFor: 'Candidates who learn best through extensive practice questions',
  },
  {
    name: 'Wiley CPAexcel',
    priceRange: '$1,295 - $2,995',
    lowestPrice: 1295,
    website: 'efficientlearning.com',
    mcqCount: '12,000+',
    tbsCount: '500+',
    accessPeriod: 'Until you pass (Platinum)',
    strengths: [
      'Bite-sized video lessons',
      'Large question bank',
      'Frequent sales and discounts',
      'Mobile-friendly platform',
    ],
    considerations: [
      'Base plan has limited access period',
      'Need Platinum for unlimited access',
    ],
    bestFor: 'Busy professionals who prefer short, focused study sessions',
  },
];

const freeAlternatives = [
  {
    name: 'AICPA Sample Tests',
    description: 'Official practice exams directly from the exam creators',
    link: '/resources/free-practice-materials',
  },
  {
    name: 'YouTube Channels',
    description: 'Free lectures from Farhat Accounting, Edspira, and more',
    link: '/resources/free-cpa-videos',
  },
  {
    name: 'FASB Codification',
    description: 'Free access to accounting standards (academic access available)',
    link: '/resources/free-practice-materials',
  },
];

const savingTips = [
  {
    title: 'Wait for Sales',
    description: 'Most providers offer significant discounts during Black Friday, tax season (April), and back-to-school periods. Surgent and Wiley are known for frequent promotions.',
  },
  {
    title: 'Check Employer Benefits',
    description: 'Many accounting firms reimburse CPA review course costs. Ask your HR department about education benefits before purchasing.',
  },
  {
    title: 'University Partnerships',
    description: 'If you recently graduated, check if your university has partnerships with CPA review providers for alumni discounts.',
  },
  {
    title: 'Start with Free Resources',
    description: 'Use free AICPA sample tests and YouTube lectures to build a foundation before investing in a paid course.',
  },
  {
    title: 'Consider Payment Plans',
    description: 'Most providers offer 0% interest payment plans, making it easier to spread the cost over several months.',
  },
];

export default function BestBudgetCPAReviewPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: baseUrl },
          { name: 'Resources', url: `${baseUrl}/resources` },
          { name: 'Best Budget CPA Review Courses', url: `${baseUrl}/resources/best-budget-cpa-review` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full mb-4">
              Updated {lastUpdated}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Best Budget CPA Review Courses
            </h1>
            <p className="text-xl text-green-100">
              Quality CPA prep doesn&apos;t have to cost $5,000. Compare affordable options
              that can help you pass without breaking the bank.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Disclaimer:</strong> Prices and features are based on publicly available information from each provider&apos;s
            website as of {lastUpdated}. Prices, features, and offerings may change. Always verify current information
            directly with the provider before purchasing. Meridian CPA Review is not affiliated with any of the companies mentioned.
          </p>
        </div>

        {/* Key Takeaways */}
        <section className="mb-12">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Key Takeaways</h2>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-[var(--foreground)]"><strong>Surgent</strong> offers the lowest starting price at $1,599 with adaptive learning technology</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-[var(--foreground)]"><strong>Gleim</strong> has the largest question bank (10,000+ MCQs) with unlimited access</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-[var(--foreground)]"><strong>Wiley</strong> frequently runs sales, sometimes dropping below $1,300</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-[var(--foreground)]">All three budget options offer &quot;until you pass&quot; access (with certain plans)</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Budget Options */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Top Budget-Friendly Options</h2>
          <div className="space-y-6">
            {budgetOptions.map((course, index) => (
              <div key={course.name} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-green-100 text-sm">#{index + 1} Budget Pick</span>
                      <h3 className="text-xl font-bold text-white">{course.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-green-100 text-sm">Starting at</div>
                      <div className="text-2xl font-bold text-white">${course.lowestPrice.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-[var(--foreground)] mb-3">Quick Stats</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[var(--muted)]">Price Range:</span>
                          <span className="font-medium text-[var(--foreground)]">{course.priceRange}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--muted)]">MCQ Questions:</span>
                          <span className="font-medium text-[var(--foreground)]">{course.mcqCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--muted)]">Task-Based Sims:</span>
                          <span className="font-medium text-[var(--foreground)]">{course.tbsCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[var(--muted)]">Access Period:</span>
                          <span className="font-medium text-[var(--foreground)]">{course.accessPeriod}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[var(--foreground)] mb-3">Strengths</h4>
                      <ul className="space-y-1">
                        {course.strengths.map((strength) => (
                          <li key={strength} className="flex items-start gap-2 text-sm">
                            <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                            </svg>
                            <span className="text-[var(--muted)]">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <p className="text-sm text-[var(--muted)]">
                      <strong className="text-[var(--foreground)]">Best for:</strong> {course.bestFor}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Side-by-Side Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)]">
              <thead>
                <tr className="bg-[var(--card)] dark:bg-[var(--card-hover)]">
                  <th className="text-left p-4 font-semibold text-[var(--foreground)] border-b border-[var(--border)]">Feature</th>
                  <th className="text-center p-4 font-semibold text-[var(--foreground)] border-b border-[var(--border)]">Surgent</th>
                  <th className="text-center p-4 font-semibold text-[var(--foreground)] border-b border-[var(--border)]">Gleim</th>
                  <th className="text-center p-4 font-semibold text-[var(--foreground)] border-b border-[var(--border)]">Wiley</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-[var(--border)] font-medium text-[var(--foreground)]">Starting Price</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-green-600 dark:text-green-400 font-bold">$1,599</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-[var(--foreground)]">$1,999</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-[var(--foreground)]">$1,295</td>
                </tr>
                <tr className="bg-[var(--card)] dark:bg-[var(--card-hover)]">
                  <td className="p-4 border-b border-[var(--border)] font-medium text-[var(--foreground)]">MCQ Questions</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-[var(--foreground)]">7,700+</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-green-600 dark:text-green-400 font-bold">10,000+</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-green-600 dark:text-green-400 font-bold">12,000+</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-[var(--border)] font-medium text-[var(--foreground)]">Task-Based Sims</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-[var(--foreground)]">400+</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-green-600 dark:text-green-400 font-bold">1,300+</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-[var(--foreground)]">500+</td>
                </tr>
                <tr className="bg-[var(--card)] dark:bg-[var(--card-hover)]">
                  <td className="p-4 border-b border-[var(--border)] font-medium text-[var(--foreground)]">Adaptive Learning</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-green-600 dark:text-green-400">A.S.A.P.</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-green-600 dark:text-green-400">SmartAdapt</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-green-600 dark:text-green-400">Yes</td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-[var(--border)] font-medium text-[var(--foreground)]">Until You Pass</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-green-600 dark:text-green-400">Yes</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-green-600 dark:text-green-400">Yes</td>
                  <td className="p-4 border-b border-[var(--border)] text-center text-[var(--muted)]">Platinum only</td>
                </tr>
                <tr className="bg-[var(--card)] dark:bg-[var(--card-hover)]">
                  <td className="p-4 font-medium text-[var(--foreground)]">Mobile App</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400">Yes</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400">Yes</td>
                  <td className="p-4 text-center text-green-600 dark:text-green-400">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Money-Saving Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">How to Save Even More</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savingTips.map((tip) => (
              <div key={tip.title} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{tip.title}</h3>
                <p className="text-sm text-[var(--muted)]">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Free Alternatives */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Free Resources to Supplement Your Studies</h2>
          <p className="text-[var(--muted)] mb-4">
            Even with a budget course, you can supplement your studies with free resources:
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {freeAlternatives.map((resource) => (
              <Link
                key={resource.name}
                href={resource.link}
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 hover:border-[var(--primary)] transition-colors"
              >
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{resource.name}</h3>
                <p className="text-sm text-[var(--muted)]">{resource.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Related Comparisons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Detailed Comparisons</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/compare/becker-vs-surgent" className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors">
              <div className="font-semibold text-[var(--foreground)]">Becker vs Surgent</div>
              <div className="text-sm text-[var(--muted)]">Premium vs budget comparison</div>
            </Link>
            <Link href="/compare/becker-vs-gleim" className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors">
              <div className="font-semibold text-[var(--foreground)]">Becker vs Gleim</div>
              <div className="text-sm text-[var(--muted)]">Premium vs mid-tier comparison</div>
            </Link>
            <Link href="/compare/surgent-vs-roger" className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors">
              <div className="font-semibold text-[var(--foreground)]">Surgent vs Roger</div>
              <div className="text-sm text-[var(--muted)]">Budget vs mid-tier comparison</div>
            </Link>
          </div>
        </section>

        {/* Meridian CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl p-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-3">
              Try Meridian CPA Review Free
            </h2>
            <p className="text-white/80 mb-6">
              While you&apos;re comparing options, why not try our platform? Access 6,000+ practice
              questions and task-based simulations completely free during our beta period. No credit card required.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Practicing Free
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
