import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wiley vs UWorld CPA Review 2026 | Honest Comparison',
  description: 'Compare Wiley and UWorld CPA review courses. Comprehensive traditional approach vs question-focused learning. See pricing, features, and which fits your study style.',
  keywords: 'Wiley vs UWorld, CPA review comparison, Wiley CPA review, UWorld CPA review, best CPA prep course',
};

const lastUpdated = 'January 2026';

const comparisonData = {
  wiley: {
    name: 'Wiley CPA Review',
    website: 'efficientlearning.com/cpa',
    founded: '1807 (CPA since 2012)',
    priceRange: '$1,950 - $3,000',
    popularPlan: 'Platinum (~$2,500)',
    mcqCount: '12,000+',
    tbsCount: '600+',
    videoHours: '200+',
    accessPeriod: 'Until you pass',
    mobileApp: 'Yes',
    liveClasses: 'Yes (virtual)',
    passGuarantee: 'Yes (with Platinum)',
    adaptiveLearning: 'Yes',
    strengths: [
      'Largest question bank available',
      'Unlimited access until you pass',
      'Live virtual classes included',
      'Long-established educational publisher',
      'Comprehensive textbook content',
    ],
    considerations: [
      'Interface can feel dated',
      'Video lectures less engaging than some competitors',
      'Large amount of content can be overwhelming',
    ],
  },
  uworld: {
    name: 'UWorld CPA Review',
    website: 'accounting.uworld.com',
    founded: '2003 (CPA launched 2021)',
    priceRange: '$1,999 - $2,999',
    popularPlan: 'CPA Elite (~$2,499)',
    mcqCount: '2,500+',
    tbsCount: '200+',
    videoHours: '100+ (Roger integration)',
    accessPeriod: '18-24 months',
    mobileApp: 'Yes',
    liveClasses: 'No',
    passGuarantee: 'Yes (with Elite)',
    adaptiveLearning: 'Yes',
    strengths: [
      'Exceptional question explanations',
      'Clean, modern interface',
      'High-quality visual aids',
      'Integrated Roger video lectures',
      'Strong medical exam reputation',
    ],
    considerations: [
      'Smaller question bank',
      'Newer to CPA market',
      'Access period limitations',
    ],
  },
};

const comparisonTable = [
  { feature: 'Price Range', wiley: '$1,950 - $3,000', uworld: '$1,999 - $2,999' },
  { feature: 'MCQ Questions', wiley: '12,000+', uworld: '2,500+' },
  { feature: 'Task-Based Simulations', wiley: '600+', uworld: '200+' },
  { feature: 'Video Lecture Hours', wiley: '200+', uworld: '100+ (Roger)' },
  { feature: 'Access Period', wiley: 'Until you pass', uworld: '18-24 months' },
  { feature: 'Mobile App', wiley: 'Yes', uworld: 'Yes' },
  { feature: 'Live Classes', wiley: 'Yes (virtual)', uworld: 'No' },
  { feature: 'Adaptive Learning', wiley: 'Yes', uworld: 'Yes' },
  { feature: 'Pass Guarantee', wiley: 'Yes', uworld: 'Yes' },
  { feature: 'Question Explanations', wiley: 'Good', uworld: 'Exceptional' },
  { feature: 'Interface', wiley: 'Traditional', uworld: 'Modern' },
];

const buyerProfiles = [
  {
    title: 'Wiley may be a better fit if you:',
    points: [
      'Want the largest question bank available',
      'Prefer unlimited access with no time pressure',
      'Want live virtual class options',
      'Like comprehensive textbook-style content',
      'Value an established educational publisher',
    ],
  },
  {
    title: 'UWorld may be a better fit if you:',
    points: [
      'Value quality over quantity in questions',
      'Want detailed, visual explanations',
      'Prefer a modern, clean interface',
      'Learn best through understanding "why"',
      'Want Roger\'s engaging video lectures',
    ],
  },
];

const faqs = [
  {
    question: 'Is UWorld\'s smaller question bank a problem?',
    answer: 'Not necessarily. UWorld\'s approach focuses on quality over quantity, with each question designed to teach a concept through detailed explanations. Their success in medical exam prep (where they\'re highly regarded) suggests this approach works. However, if you prefer extensive drilling with many variations, Wiley\'s larger bank might be more appealing.',
  },
  {
    question: 'Are UWorld\'s question explanations really better?',
    answer: 'UWorld is known for exceptionally detailed explanations that explain not just why the correct answer is right, but why wrong answers are wrong. This approach helps candidates understand underlying concepts rather than just memorizing answers. Many candidates find this learning approach more effective for exam success.',
  },
  {
    question: 'Why does Wiley have so many more questions?',
    answer: 'Wiley has been developing CPA content since 2012 and acquired multiple question databases over time. More questions allow for greater variety and more drilling opportunities. However, some candidates find the sheer volume overwhelming. The best approach depends on your learning style.',
  },
  {
    question: 'Is UWorld too new for CPA prep?',
    answer: 'While UWorld launched CPA prep in 2021, they have decades of experience in medical and nursing exam prep where they\'re highly respected. Their acquisition of Roger CPA Review brought established CPA content and video lectures. They\'ve combined their learning methodology expertise with Roger\'s CPA-specific content.',
  },
];

export default function WileyVsUWorldPage() {
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
              Wiley vs UWorld CPA Review
            </h1>
            <p className="text-xl text-gray-200">
              Comparing comprehensive quantity with focused quality in CPA prep.
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
          <a href="https://www.efficientlearning.com/cpa" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
            Wiley
          </a>{' '}
          and{' '}
          <a href="https://accounting.uworld.com" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
            UWorld
          </a>{' '}
          before purchasing. This site is not affiliated with either provider.
        </div>

        {/* Quick Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Quick Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[comparisonData.wiley, comparisonData.uworld].map((provider) => (
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
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--foreground)]">Wiley</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--foreground)]">UWorld</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-[var(--foreground)]">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-[var(--muted)]">{row.wiley}</td>
                      <td className="px-6 py-4 text-center text-[var(--muted)]">{row.uworld}</td>
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
            <Link href="/compare/surgent-vs-roger" className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors">
              <div className="font-semibold text-[var(--foreground)]">Surgent vs Roger</div>
              <div className="text-sm text-[var(--muted)]">Adaptive vs engaging lectures</div>
            </Link>
          </div>
        </section>

        {/* Alternative CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Looking for an Affordable Alternative?
          </h2>
          <p className="text-gray-200 mb-6 max-w-2xl">
            While Wiley and UWorld are established options, they may not fit every budget. Meridian CPA Review
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
            Free during beta. No affiliation with Wiley or UWorld.
          </p>
        </section>
      </div>
    </div>
  );
}
