import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Roger CPA vs Wiley CPA Review 2025 | Honest Comparison',
  description: 'Compare UWorld Roger CPA and Wiley CPA review courses. See pricing, features, study materials, and help decide which CPA prep course is right for you.',
  keywords: 'Roger vs Wiley, UWorld Roger CPA, Wiley CPA review, CPA review comparison, best CPA prep course',
};

// Note: All information is based on publicly available data from each provider's website
// Prices and features may change - always verify with the provider directly
const lastUpdated = 'January 2026';

const comparisonData = {
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
      'Engaging video lectures by Roger Philipp',
      'UWorld-quality practice questions',
      'Strong mobile app experience',
      'Memorable teaching style',
    ],
    considerations: [
      'Smaller question bank than some competitors',
      'Single instructor style may not suit everyone',
    ],
  },
  wiley: {
    name: 'Wiley CPA Review',
    website: 'efficientlearning.com',
    founded: '1807 (publisher), CPA program established',
    priceRange: '$1,295 - $2,995',
    popularPlan: 'Platinum (~$2,495)',
    mcqCount: '12,000+',
    tbsCount: '700+',
    videoHours: '200+',
    accessPeriod: 'Until you pass (Platinum)',
    mobileApp: 'Yes',
    liveClasses: 'Yes (with some plans)',
    passGuarantee: 'Yes (access until you pass)',
    adaptiveLearning: 'Personalized Study Planner',
    strengths: [
      'Largest question bank available',
      'Unlimited access until you pass',
      'Multiple instructor perspectives',
      'Comprehensive study materials',
    ],
    considerations: [
      'Interface can feel dated to some users',
      'Less engaging video style compared to Roger',
    ],
  },
};

const comparisonTable = [
  { feature: 'Price Range', roger: '$1,999 - $2,999', wiley: '$1,295 - $2,995' },
  { feature: 'MCQ Questions', roger: '6,000+', wiley: '12,000+' },
  { feature: 'Task-Based Simulations', roger: '400+', wiley: '700+' },
  { feature: 'Video Lecture Hours', roger: '100+', wiley: '200+' },
  { feature: 'Access Period', roger: '18-24 months', wiley: 'Until you pass' },
  { feature: 'Mobile App', roger: 'Yes', wiley: 'Yes' },
  { feature: 'Live Classes', roger: 'No', wiley: 'Yes (some plans)' },
  { feature: 'Adaptive Learning', roger: 'Yes', wiley: 'Yes' },
  { feature: 'Pass Guarantee', roger: 'Yes (Elite plans)', wiley: 'Yes (access until pass)' },
  { feature: 'Flashcards', roger: 'Yes', wiley: 'Yes' },
  { feature: 'Audio Lectures', roger: 'Yes', wiley: 'Yes' },
];

const buyerProfiles = [
  {
    title: 'Roger CPA may be a better fit if you:',
    points: [
      'Prefer engaging, entertaining lecture content',
      'Learn better with a single consistent instructor',
      'Value UWorld-quality practice questions',
      'Want a strong mobile study experience',
      'Appreciate humor and mnemonics in teaching',
    ],
  },
  {
    title: 'Wiley may be a better fit if you:',
    points: [
      'Want the largest question bank available',
      'Prefer unlimited access with no time pressure',
      'Like having multiple instructor perspectives',
      'Need live class options',
      'Want more comprehensive written materials',
    ],
  },
];

const faqs = [
  {
    question: 'Is UWorld Roger the same as the original Roger CPA Review?',
    answer: 'Yes, UWorld acquired Roger CPA Review in 2021. The course still features Roger Philipp\'s signature teaching style, but now includes UWorld\'s enhanced question development methodology and technology platform. Many consider this acquisition to have improved the question quality.',
  },
  {
    question: 'Which course has better video lectures?',
    answer: 'This is subjective and depends on your learning style. Roger Philipp is known for his energetic, entertaining teaching style with memorable mnemonics. Wiley offers a more traditional, straightforward approach with multiple instructors. We recommend watching sample lectures from both to see which resonates with you.',
  },
  {
    question: 'Why does Wiley have so many more questions?',
    answer: 'Wiley has built one of the largest CPA question banks in the industry over many years. However, more questions doesn\'t necessarily mean better preparation. UWorld Roger focuses on high-quality, carefully crafted questions. Success depends more on how well you understand concepts than the raw number of questions you complete.',
  },
  {
    question: 'What about time pressure with Roger\'s limited access?',
    answer: 'Roger\'s Elite-Unlimited plan offers extended access, while standard plans have 18-24 month limits. If you\'re concerned about time, Wiley\'s unlimited access may provide peace of mind. However, most dedicated candidates complete the exam within 18 months.',
  },
];

const baseUrl = "https://meridiancpareview.com";

export default function RogerVsWileyPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Resources", url: `${baseUrl}/resources` },
          { name: "Roger vs Wiley CPA Review", url: `${baseUrl}/compare/roger-vs-wiley` },
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
              Roger CPA vs Wiley CPA Review
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
          <a href="https://www.uworld.com" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
            UWorld Roger CPA
          </a>{' '}
          and{' '}
          <a href="https://www.efficientlearning.com" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
            Wiley
          </a>{' '}
          before purchasing. This site is not affiliated with either provider.
        </div>

        {/* Quick Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Quick Overview</h2>
          <div className="grid md:grid-cols-2 gap-6">
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

            {/* Wiley Card */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{comparisonData.wiley.name}</h3>
              <p className="text-sm text-[var(--muted)] mb-4">Founded {comparisonData.wiley.founded}</p>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Price Range:</span>
                  <span className="font-medium text-[var(--foreground)]">{comparisonData.wiley.priceRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Popular Plan:</span>
                  <span className="font-medium text-[var(--foreground)]">{comparisonData.wiley.popularPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--muted)]">Access Period:</span>
                  <span className="font-medium text-[var(--foreground)]">{comparisonData.wiley.accessPeriod}</span>
                </div>
              </div>

              <h4 className="font-semibold text-[var(--foreground)] mb-2">Key Strengths</h4>
              <ul className="space-y-1 mb-4">
                {comparisonData.wiley.strengths.map((strength, idx) => (
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
                {comparisonData.wiley.considerations.map((consideration, idx) => (
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
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--foreground)]">Roger</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[var(--foreground)]">Wiley</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-[var(--foreground)]">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-[var(--muted)]">{row.roger}</td>
                      <td className="px-6 py-4 text-center text-[var(--muted)]">{row.wiley}</td>
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
            While Roger and Wiley are established options, they may not fit every budget. Meridian CPA Review
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
            Free during beta. No affiliation with UWorld Roger or Wiley.
          </p>
        </section>
      </div>
    </div>
  );
}
