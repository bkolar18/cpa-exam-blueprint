import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CPA Exam Resources & Guides | Meridian CPA Review',
  description: 'Free CPA exam resources including study guides, pass rate statistics, state requirements, comparison tools, and exam preparation strategies.',
  keywords: 'CPA exam resources, CPA study guide, CPA exam help, CPA preparation, free CPA resources',
};

const resourceCategories = [
  {
    title: 'Getting Started',
    description: 'Everything you need to know before starting your CPA journey.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    resources: [
      { title: 'How to Become a CPA', href: '/guides/how-to-become-a-cpa', description: 'Step-by-step guide to CPA licensure' },
      { title: 'State Requirements', href: '/state-requirements', description: 'Education, exam, and experience by state' },
      { title: 'CPA Exam Pass Rates', href: '/resources/cpa-pass-rates', description: 'Current statistics for all sections' },
    ],
  },
  {
    title: 'Exam Sections',
    description: 'Detailed guides for each CPA exam section.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    resources: [
      { title: 'FAR Study Guide', href: '/sections/far', description: 'Financial Accounting & Reporting' },
      { title: 'AUD Study Guide', href: '/sections/aud', description: 'Auditing & Attestation' },
      { title: 'REG Study Guide', href: '/sections/reg', description: 'Regulation (Tax & Business Law)' },
      { title: 'TCP Study Guide', href: '/sections/tcp', description: 'Tax Compliance & Planning' },
      { title: 'BAR Study Guide', href: '/sections/bar', description: 'Business Analysis & Reporting' },
      { title: 'ISC Study Guide', href: '/sections/isc', description: 'Information Systems & Controls' },
    ],
  },
  {
    title: 'Study Planning',
    description: 'Tools and guides to plan your CPA exam preparation.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    resources: [
      { title: 'Study Hours Calculator', href: '/tools/study-hours-calculator', description: 'Estimate your study time needs' },
      { title: 'NTS Expiration Tracker', href: '/tools/nts-tracker', description: 'Track your Notice to Schedule' },
      { title: 'Score Release Calendar', href: '/tools/score-release-calendar', description: 'When to expect your scores' },
      { title: 'Studying While Working', href: '/guides/cpa-exam-working-full-time', description: 'Balance work and exam prep', comingSoon: true },
    ],
  },
  {
    title: 'Exam Day & Recovery',
    description: 'Prepare for test day and handle setbacks.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    resources: [
      { title: 'Exam Day Guide', href: '/guides/exam-day', description: 'What to expect and how to prepare' },
      { title: 'Failed a Section?', href: '/guides/failed-section', description: 'Recovery guide for retakers' },
    ],
  },
  {
    title: 'Compare & Decide',
    description: 'Compare CPA review courses and make informed decisions.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    resources: [
      { title: 'Becker vs Gleim', href: '/compare/becker-vs-gleim', description: 'Compare two popular CPA review courses' },
      { title: 'Best Order for CPA Exams', href: '/guides/best-order-cpa-exams', description: 'Which section to take first' },
    ],
  },
];

const featuredResources = [
  {
    title: 'How to Become a CPA',
    description: 'Complete step-by-step guide covering education, exam, experience, and licensing requirements.',
    href: '/guides/how-to-become-a-cpa',
    color: 'bg-blue-500',
  },
  {
    title: 'CPA Exam Pass Rates',
    description: 'Current statistics for all exam sections with historical trends and insights.',
    href: '/resources/cpa-pass-rates',
    color: 'bg-green-500',
  },
  {
    title: 'State Requirements',
    description: 'Find the specific CPA requirements for your state including education and experience.',
    href: '/state-requirements',
    color: 'bg-purple-500',
  },
];

export default function ResourcesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CPA Exam Resources
            </h1>
            <p className="text-xl text-gray-200">
              Free guides, tools, and information to help you navigate your CPA journey.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Resources */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Popular Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="group bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden hover:shadow-lg transition-all hover:border-[var(--primary)]"
              >
                <div className={`${resource.color} h-2`} />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-[var(--muted)] text-sm">{resource.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Resource Categories */}
        <section>
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">
            All Resources
          </h2>
          <div className="space-y-12">
            {resourceCategories.map((category) => (
              <div key={category.title}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-[var(--primary)]">{category.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">{category.title}</h3>
                    <p className="text-[var(--muted)] text-sm">{category.description}</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ml-12">
                  {category.resources.map((resource) => (
                    <div key={resource.title}>
                      {resource.comingSoon ? (
                        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-[var(--border)] p-4 opacity-60">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-[var(--foreground)]">{resource.title}</h4>
                            <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
                              Coming Soon
                            </span>
                          </div>
                          <p className="text-sm text-[var(--muted)]">{resource.description}</p>
                        </div>
                      ) : (
                        <Link
                          href={resource.href}
                          className="block bg-white dark:bg-[var(--card)] rounded-lg border border-[var(--border)] p-4 hover:border-[var(--primary)] hover:shadow-md transition-all"
                        >
                          <h4 className="font-medium text-[var(--foreground)] mb-1">{resource.title}</h4>
                          <p className="text-sm text-[var(--muted)]">{resource.description}</p>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            Ready to Start Practicing?
          </h2>
          <p className="text-[var(--muted)] mb-6 max-w-2xl mx-auto">
            Access thousands of practice questions and track your progress as you prepare for the CPA exam.
          </p>
          <Link href="/signup" className="btn-primary">
            Get Started Free
          </Link>
        </section>
      </div>
    </div>
  );
}
