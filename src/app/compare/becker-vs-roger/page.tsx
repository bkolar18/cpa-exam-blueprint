import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Becker vs Roger CPA Review 2025 | Honest Comparison',
  description: 'Compare Becker and UWorld Roger CPA review courses. See pricing, features, study materials, and help decide which CPA prep course is right for you.',
  keywords: 'Becker vs Roger, Becker CPA review, Roger CPA review, UWorld Roger, CPA review comparison, best CPA prep course',
};

// Note: All information is based on publicly available data from each provider's website
// Prices and features may change - always verify with the provider directly
const lastUpdated = 'January 2026';

const comparisonData = {
  becker: {
    name: 'Becker CPA Review',
    website: 'becker.com',
    founded: '1957',
    priceRange: '$2,499 - $5,999',
    popularPlan: 'Pro (~$3,499)',
    mcqCount: '9,000+',
    tbsCount: '900+',
    videoHours: '400+',
    accessPeriod: '24 months (varies by plan)',
    mobileApp: 'Yes',
    liveClasses: 'Yes (with some plans)',
    passGuarantee: 'Yes (with conditions)',
    adaptiveLearning: 'Adapt2U Technology',
    strengths: [
      'Long-established industry reputation',
      'Extensive video lecture library',
      'Live class options available',
      'Wide university and employer partnerships',
    ],
    considerations: [
      'Highest price point in the market',
      'Access period limitations',
      'More traditional teaching style',
    ],
  },
  roger: {
    name: 'UWorld Roger CPA Review',
    website: 'uworld.com',
    founded: '2001 (acquired by UWorld 2021)',
    priceRange: '$1,999 - $2,999',
    popularPlan: 'Elite-Unlimited (~$2,999)',
    mcqCount: '6,000+',
    tbsCount: '400+',
    videoHours: '100+ (Roger Philipp lectures)',
    accessPeriod: '18-24 months (Unlimited with Elite)',
    mobileApp: 'Yes',
    liveClasses: 'No',
    passGuarantee: 'Yes (with Elite-Unlimited)',
    adaptiveLearning: 'SmartPath Technology',
    strengths: [
      'Engaging, memorable teaching style',
      'UWorld-quality practice questions',
      'Lower price than Becker',
      'Strong mobile experience',
    ],
    considerations: [
      'Fewer video hours than Becker',
      'Smaller question bank',
      'No live class options',
    ],
  },
};

const comparisonTable = [
  { feature: 'Price Range', becker: '$2,499 - $5,999', roger: '$1,999 - $2,999' },
  { feature: 'MCQ Questions', becker: '9,000+', roger: '6,000+' },
  { feature: 'Task-Based Simulations', becker: '900+', roger: '400+' },
  { feature: 'Video Lecture Hours', becker: '400+', roger: '100+' },
  { feature: 'Access Period', becker: '24 months (varies)', roger: '18-24 months' },
  { feature: 'Mobile App', becker: 'Yes', roger: 'Yes' },
  { feature: 'Live Classes', becker: 'Yes (some plans)', roger: 'No' },
  { feature: 'Adaptive Learning', becker: 'Yes', roger: 'Yes' },
  { feature: 'Pass Guarantee', becker: 'Yes (conditions apply)', roger: 'Yes (Elite plans)' },
  { feature: 'Flashcards', becker: 'Yes', roger: 'Yes' },
  { feature: 'Personal Counselor', becker: 'Yes (some plans)', roger: 'Yes' },
];

const buyerProfiles = [
  {
    title: 'Becker may be a better fit if you:',
    points: [
      'Want the most comprehensive video library',
      'Prefer live class options',
      'Value a long-established brand name',
      'Your employer or school offers a Becker discount',
      'Want the largest question bank from a premium provider',
    ],
  },
  {
    title: 'Roger may be a better fit if you:',
    points: [
      'Prefer engaging, entertaining lectures',
      'Want to save $500-$3,000 vs Becker',
      'Learn better with memorable mnemonics',
      'Value UWorld-quality questions',
      'Prefer self-paced study without live classes',
    ],
  },
];

const faqs = [
  {
    question: 'Is Becker worth the premium price over Roger?',
    answer: 'It depends on your learning style and budget. Becker offers significantly more video content and live class options, which may justify the higher price for candidates who learn better through extensive lectures. However, Roger\'s engaging teaching style and UWorld-quality questions provide excellent preparation at a lower price point. Consider whether you\'ll actually use the additional Becker content before paying the premium.',
  },
  {
    question: 'Which has better video lectures?',
    answer: 'Becker has more video hours (400+ vs 100+), but Roger\'s lectures are known for being more engaging and entertaining. Roger Philipp uses humor and mnemonics to make complex topics memorable. Becker\'s approach is more traditional and comprehensive. The "better" option depends entirely on how you learn best.',
  },
  {
    question: 'Does the UWorld acquisition make Roger better?',
    answer: 'Many candidates and reviewers believe so. UWorld is renowned for its high-quality practice questions in medical and other professional exams. Since the acquisition, Roger has enhanced its question bank with UWorld\'s rigorous question development methodology while maintaining Roger Philipp\'s signature teaching style.',
  },
  {
    question: 'Which is better for someone who needs live classes?',
    answer: 'Becker is the clear choice if you need live class options. Roger does not offer live classes. If having access to live instruction is important to your study style, this may be a deciding factor regardless of price.',
  },
];

const baseUrl = "https://meridiancpareview.com";

export default function BeckerVsRogerPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Resources", url: `${baseUrl}/resources` },
          { name: "Becker vs Roger CPA Review", url: `${baseUrl}/compare/becker-vs-roger` },
        ]}
      />
      <FAQPageJsonLd faqs={faqs} />

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
              Becker vs Roger CPA Review
            </h1>
            <p className="text-xl text-gray-200">
              An objective comparison of two popular CPA review courses to help you make an informed decision.
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
          <a href="https://www.becker.com" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
            Becker
          </a>{' '}
          and{' '}
          <a href="https://www.uworld.com" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
            UWorld Roger CPA
          </a>{' '}
          before purchasing. This site is not affiliated with either provider.
        </div>

        {/* Quick Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Quick Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Becker Card */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{comparisonData.becker.name}</h3>
              <p className="text-sm text-[var(--muted)] mb-4">Founded {comparisonData.becker.founded}</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Price Range:</span>
                  <span className="font-medium text-[var(--foreground)]">{comparisonData.becker.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Popular Plan:</span>
                  <span className="font-medium text-[var(--foreground)]">{comparisonData.becker.popularPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Access Period:</span>
                  <span className="font-medium text-[var(--foreground)]">{comparisonData.becker.accessPeriod}</span>
                </div>
              </div>

              <h4 className="font-semibold text-[var(--foreground)] mb-2">Key Strengths</h4>
              <ul className="space-y-1 mb-4">
                {comparisonData.becker.strengths.map((strength, idx) => (
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
                {comparisonData.becker.considerations.map((consideration, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <svg className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{consideration}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Roger Card */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{comparisonData.roger.name}</h3>
              <p className="text-sm text-[var(--muted)] mb-4">Founded {comparisonData.roger.founded}</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Price Range:</span>
                  <span className="font-medium text-[var(--foreground)]">{comparisonData.roger.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Popular Plan:</span>
                  <span className="font-medium text-[var(--foreground)]">{comparisonData.roger.popularPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Access Period:</span>
                  <span className="font-medium text-[var(--foreground)]">{comparisonData.roger.accessPeriod}</span>
                </div>
              </div>

              <h4 className="font-semibold text-[var(--foreground)] mb-2">Key Strengths</h4>
              <ul className="space-y-1 mb-4">
                {comparisonData.roger.strengths.map((strength, idx) => (
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
                {comparisonData.roger.considerations.map((consideration, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <svg className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{consideration}</span>
                  </li>
                ))}
              </ul>
            </div>
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
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--foreground)]">Becker</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--foreground)]">Roger</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-[var(--foreground)]">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-[var(--muted)]">{row.becker}</td>
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

        {/* Alternative CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Looking for an Affordable Alternative?
          </h2>
          <p className="text-gray-200 mb-6 max-w-2xl">
            While Becker and Roger are established options, they may not fit every budget. Meridian CPA Review
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
            Free during beta. No affiliation with Becker or UWorld Roger.
          </p>
        </section>
      </div>
    </div>
  );
}
