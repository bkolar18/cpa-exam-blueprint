import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Surgent vs Roger CPA Review 2026 | Honest Comparison',
  description: 'Compare Surgent and Roger CPA review courses. Adaptive technology vs engaging video lectures. See pricing, features, and which course fits your learning style.',
  keywords: 'Surgent vs Roger, CPA review comparison, Surgent CPA review, Roger CPA review, best CPA prep course',
};

const lastUpdated = 'January 2026';

const comparisonData = {
  surgent: {
    name: 'Surgent CPA Review',
    website: 'surgent.com',
    founded: '1985',
    priceRange: '$1,599 - $2,999',
    popularPlan: 'Premier Pass (~$2,399)',
    mcqCount: '7,700+',
    tbsCount: '400+',
    videoHours: '350+',
    accessPeriod: 'Until you pass',
    mobileApp: 'Yes',
    liveClasses: 'No',
    passGuarantee: 'Yes (pass or money back)',
    adaptiveLearning: 'A.S.A.P. Technology',
    strengths: [
      'Highly adaptive learning technology',
      'Claims 74 hours average to exam readiness',
      'Unlimited access until you pass',
      'Strong money-back guarantee',
    ],
    considerations: [
      'Smaller question bank',
      'Less engaging video content',
      'No live class options',
    ],
  },
  roger: {
    name: 'Roger CPA Review (UWorld)',
    website: 'rogercpareview.com',
    founded: '2001',
    priceRange: '$1,999 - $3,499',
    popularPlan: 'Elite-Unlimited (~$2,999)',
    mcqCount: '6,000+',
    tbsCount: '400+',
    videoHours: '100+',
    accessPeriod: '18-24 months (unlimited option)',
    mobileApp: 'Yes',
    liveClasses: 'No',
    passGuarantee: 'Yes (with Elite plans)',
    adaptiveLearning: 'SmartPath Technology',
    strengths: [
      'Highly engaging video lectures',
      'Roger\'s memorable teaching style',
      'Strong visual learning approach',
      'Now integrated with UWorld questions',
    ],
    considerations: [
      'Fewer MCQs than competitors',
      'Shorter video content overall',
      'Higher price for unlimited access',
    ],
  },
};

const comparisonTable = [
  { feature: 'Price Range', surgent: '$1,599 - $2,999', roger: '$1,999 - $3,499' },
  { feature: 'MCQ Questions', surgent: '7,700+', roger: '6,000+' },
  { feature: 'Task-Based Simulations', surgent: '400+', roger: '400+' },
  { feature: 'Video Lecture Hours', surgent: '350+', roger: '100+' },
  { feature: 'Access Period', surgent: 'Until you pass', roger: '18-24 months' },
  { feature: 'Mobile App', surgent: 'Yes', roger: 'Yes' },
  { feature: 'Teaching Style', surgent: 'Efficient/Direct', roger: 'Engaging/Entertaining' },
  { feature: 'Adaptive Learning', surgent: 'A.S.A.P.', roger: 'SmartPath' },
  { feature: 'Pass Guarantee', surgent: 'Yes (money back)', roger: 'Yes (with Elite)' },
  { feature: 'Study Approach', surgent: 'Efficiency-focused', roger: 'Engagement-focused' },
];

const buyerProfiles = [
  {
    title: 'Surgent may be a better fit if you:',
    points: [
      'Want the most efficient path to passing',
      'Have limited study time available',
      'Prefer adaptive technology-driven learning',
      'Want guaranteed unlimited access',
      'Value a strong money-back guarantee',
    ],
  },
  {
    title: 'Roger may be a better fit if you:',
    points: [
      'Learn better through engaging video content',
      'Prefer an entertaining teaching style',
      'Need help staying motivated while studying',
      'Are a visual learner',
      'Want UWorld\'s question quality integration',
    ],
  },
];

const faqs = [
  {
    question: 'What makes Roger\'s teaching style unique?',
    answer: 'Roger Philipp is known for his energetic, memorable teaching style that uses mnemonics, humor, and visual aids to make complex accounting concepts stick. Many students find his approach helps them stay engaged during long study sessions. However, some candidates may prefer a more straightforward teaching approach.',
  },
  {
    question: 'Is Surgent\'s adaptive learning really more efficient?',
    answer: 'Surgent claims their A.S.A.P. technology identifies your weak areas and focuses study time where it\'s needed most, averaging 74 hours to exam readiness. However, individual results vary significantly. Some candidates may still need more study time depending on their accounting background.',
  },
  {
    question: 'What happened with Roger CPA and UWorld?',
    answer: 'UWorld acquired Roger CPA Review, combining Roger\'s engaging video lectures with UWorld\'s highly-regarded practice questions. This integration aims to provide both strong content delivery and quality practice materials.',
  },
  {
    question: 'Which has better video content?',
    answer: 'This depends on your learning style. Roger has fewer video hours but they\'re highly engaging and memorable. Surgent has more video hours but focuses on efficiency over entertainment. If you need help staying motivated, Roger might be better. If you prefer getting straight to the point, Surgent might be preferable.',
  },
];

export default function SurgentVsRogerPage() {
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
              Surgent vs Roger CPA Review
            </h1>
            <p className="text-xl text-gray-200">
              Comparing adaptive efficiency with engaging entertainment in CPA prep.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-8 text-sm text-[var(--muted)]">
          <strong>Disclaimer:</strong> This comparison is based on publicly available information from each provider&apos;s
          website as of {lastUpdated}. Prices, features, and offerings may change. Always verify current information
          directly with{' '}
          <a href="https://www.surgent.com" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
            Surgent
          </a>{' '}
          and{' '}
          <a href="https://www.rogercpareview.com" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
            Roger CPA Review
          </a>{' '}
          before purchasing. This site is not affiliated with either provider.
        </div>

        {/* Quick Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Quick Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[comparisonData.surgent, comparisonData.roger].map((provider) => (
              <div key={provider.name} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{provider.name}</h3>
                <p className="text-sm text-[var(--muted)] mb-4">Founded {provider.founded}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Price Range:</span>
                    <span className="font-medium text-[var(--foreground)]">{provider.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Popular Plan:</span>
                    <span className="font-medium text-[var(--foreground)]">{provider.popularPlan}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--muted)]">Access Period:</span>
                    <span className="font-medium text-[var(--foreground)]">{provider.accessPeriod}</span>
                  </div>
                </div>

                <h4 className="font-semibold text-[var(--foreground)] mb-2">Key Strengths</h4>
                <ul className="space-y-1 mb-4">
                  {provider.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="font-semibold text-[var(--foreground)] mb-2">Considerations</h4>
                <ul className="space-y-1">
                  {provider.considerations.map((consideration, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                      <svg className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{consideration}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Feature Comparison</h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--foreground)]">Surgent</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--foreground)]">Roger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-[var(--foreground)]">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-[var(--muted)]">{row.surgent}</td>
                      <td className="px-6 py-4 text-center text-[var(--muted)]">{row.roger}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-[var(--muted)] mt-4">
            * Information based on publicly available data. Features and pricing subject to change.
          </p>
        </section>

        {/* Which is Right for You */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Which Course Fits Your Learning Style?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {buyerProfiles.map((profile, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="font-semibold text-[var(--foreground)] mb-4">{profile.title}</h3>
                <ul className="space-y-2">
                  {profile.points.map((point, pointIdx) => (
                    <li key={pointIdx} className="flex items-start gap-2 text-[var(--muted)]">
                      <svg className="w-5 h-5 text-[var(--primary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Frequently Asked Questions</h2>
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

        {/* More Comparisons */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">More CPA Review Comparisons</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/compare/becker-vs-gleim" className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors">
              <div className="font-semibold text-[var(--foreground)]">Becker vs Gleim</div>
              <div className="text-sm text-[var(--muted)]">Compare features and pricing</div>
            </Link>
            <Link href="/compare/becker-vs-surgent" className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors">
              <div className="font-semibold text-[var(--foreground)]">Becker vs Surgent</div>
              <div className="text-sm text-[var(--muted)]">Traditional vs adaptive</div>
            </Link>
            <Link href="/compare/wiley-vs-uworld" className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors">
              <div className="font-semibold text-[var(--foreground)]">Wiley vs UWorld</div>
              <div className="text-sm text-[var(--muted)]">Traditional vs question-focused</div>
            </Link>
          </div>
        </section>

        {/* Alternative CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Looking for an Affordable Alternative?
          </h2>
          <p className="text-gray-200 mb-6 max-w-2xl">
            While Surgent and Roger are established options, they may not fit every budget. Meridian CPA Review
            offers free access to thousands of practice questions during our beta period - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center bg-white text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Try Free Practice Questions
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Learn About Meridian
            </Link>
          </div>
          <p className="text-sm text-gray-300 mt-4">
            Free during beta. No affiliation with Surgent or Roger.
          </p>
        </section>
      </div>
    </div>
  );
}
