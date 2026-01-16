import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Become a CPA in 2025-2026 | Step-by-Step Guide',
  description: 'Complete guide to becoming a Certified Public Accountant. Learn about education requirements, the CPA exam, experience requirements, and licensing by state.',
  keywords: 'how to become a CPA, CPA requirements, CPA license, CPA exam requirements, become a certified public accountant',
};

const steps = [
  {
    number: 1,
    title: 'Meet Education Requirements',
    description: 'Most states require 150 semester hours of college education, including specific accounting and business courses.',
    details: [
      'Bachelor\'s degree required (accounting or related field)',
      '150 credit hours total (some states allow 120 to sit for exam)',
      'Typically 24-30 hours in accounting courses',
      'Typically 24 hours in business courses',
      'Requirements vary by state - check your state board',
    ],
    timeframe: '4-5 years (undergraduate + additional credits)',
    link: '/state-requirements',
    linkText: 'Check your state requirements',
  },
  {
    number: 2,
    title: 'Apply to Take the CPA Exam',
    description: 'Submit your application through your state board of accountancy and receive your Notice to Schedule (NTS).',
    details: [
      'Contact your state board of accountancy',
      'Submit official transcripts',
      'Pay application and exam fees',
      'Receive Notice to Schedule (NTS) - valid for a limited time',
      'Schedule your exam sections at a Prometric testing center',
    ],
    timeframe: '2-8 weeks for approval',
    link: 'https://nasba.org',
    linkText: 'Visit NASBA for application info',
    external: true,
  },
  {
    number: 3,
    title: 'Pass All Four CPA Exam Sections',
    description: 'Complete the three core sections (FAR, AUD, REG) plus one discipline section of your choice (TCP, BAR, or ISC).',
    details: [
      'FAR - Financial Accounting & Reporting',
      'AUD - Auditing & Attestation',
      'REG - Regulation (Tax & Business Law)',
      'Plus one discipline: TCP, BAR, or ISC',
      'Must pass all sections within 30 months (rolling window)',
      'Passing score is 75 on each section',
    ],
    timeframe: '12-18 months average',
    link: '/sections/far',
    linkText: 'Explore exam sections',
  },
  {
    number: 4,
    title: 'Gain Required Work Experience',
    description: 'Most states require 1-2 years of accounting experience under a licensed CPA\'s supervision.',
    details: [
      'Typically 1-2 years (1,800-2,000 hours) required',
      'Must be supervised by an active licensed CPA',
      'Experience in public, private, or government accounting',
      'Some states allow experience before or during exam',
      'Documentation required for verification',
    ],
    timeframe: '1-2 years',
    link: '/state-requirements',
    linkText: 'Check experience requirements by state',
  },
  {
    number: 5,
    title: 'Pass the Ethics Exam',
    description: 'Many states require passing an ethics exam covering professional standards and conduct.',
    details: [
      'AICPA Professional Ethics exam (most common)',
      'Open-book, self-study format',
      'Passing score typically 90%',
      'Some states have their own ethics requirements',
      'Required before or after other requirements',
    ],
    timeframe: '1-2 weeks of study',
    link: 'https://www.aicpa.org',
    linkText: 'AICPA Ethics information',
    external: true,
  },
  {
    number: 6,
    title: 'Apply for Your CPA License',
    description: 'Submit your license application to your state board after meeting all requirements.',
    details: [
      'Complete license application with your state board',
      'Submit verification of exam scores, education, and experience',
      'Pay licensing fees',
      'Some states require background check',
      'Receive your CPA certificate and license',
    ],
    timeframe: '2-6 weeks for processing',
    link: '/state-requirements',
    linkText: 'Find your state board',
  },
];

const costBreakdown = [
  { item: 'CPA Exam Application Fee', cost: '$50-$200', note: 'Varies by state' },
  { item: 'CPA Exam Fees (per section)', cost: '$200-$250', note: '4 sections total' },
  { item: 'CPA Review Course', cost: '$0-$3,500', note: 'Wide range of options' },
  { item: 'Ethics Exam', cost: '$150-$250', note: 'If required by state' },
  { item: 'License Application Fee', cost: '$50-$500', note: 'Varies by state' },
  { item: 'Total Estimated Cost', cost: '$1,500-$5,000+', note: 'Depending on choices' },
];

const faqs = [
  {
    question: 'How long does it take to become a CPA?',
    answer: 'The total time varies significantly. After completing your education (4-5 years), most candidates spend 12-18 months passing the CPA exam while also completing their experience requirement (1-2 years). If you work during your studies and exam prep, the total timeline from starting college to licensure is typically 6-8 years.',
  },
  {
    question: 'Can I take the CPA exam without 150 credit hours?',
    answer: 'Some states allow you to sit for the CPA exam with 120 credit hours (a bachelor\'s degree), but you\'ll need 150 hours before you can be licensed. Check your specific state\'s requirements, as this varies significantly.',
  },
  {
    question: 'Do I need a degree in accounting to become a CPA?',
    answer: 'Not necessarily. While an accounting degree is the most direct path, many states accept degrees in related fields (business, finance) combined with specific accounting coursework. You\'ll typically need a certain number of accounting and business credit hours regardless of your major.',
  },
  {
    question: 'Can I become a CPA without work experience?',
    answer: 'You can pass the CPA exam without work experience in most states, but you cannot receive your CPA license until you complete the required experience (typically 1-2 years under CPA supervision). Some states allow you to use the "CPA Exam Qualified" designation in the meantime.',
  },
  {
    question: 'Is the CPA exam difficult?',
    answer: 'The CPA exam is considered one of the most challenging professional exams. Pass rates typically range from 40-60% depending on the section. However, with adequate preparation (typically 300-400+ hours of study total), most dedicated candidates eventually pass all sections.',
  },
  {
    question: 'Can I transfer my CPA license to another state?',
    answer: 'Yes, most states have reciprocity agreements that allow licensed CPAs to obtain licenses in other states through a streamlined process. Requirements vary, so check with the state board where you want to practice.',
  },
];

export default function HowToBecomeCPAPage() {
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
              How to Become a CPA
            </h1>
            <p className="text-xl text-gray-200">
              A complete step-by-step guide to earning your Certified Public Accountant license in 2025-2026.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-8 text-sm text-[var(--muted)]">
          <strong>Note:</strong> CPA requirements vary significantly by state. This guide provides general information only.
          Always verify current requirements with your state board of accountancy and{' '}
          <a href="https://nasba.org" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">
            NASBA
          </a>{' '}
          before making decisions.
        </div>

        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Overview: The Path to CPA Licensure
          </h2>
          <p className="text-[var(--muted)] mb-4">
            Becoming a Certified Public Accountant (CPA) requires meeting education requirements, passing the
            Uniform CPA Examination, gaining supervised work experience, and obtaining your license from a state
            board of accountancy. The specific requirements vary by state, but the general pathway is similar across the U.S.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">150</div>
              <div className="text-sm text-[var(--muted)]">Credit Hours (typical)</div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">4</div>
              <div className="text-sm text-[var(--muted)]">Exam Sections</div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">1-2</div>
              <div className="text-sm text-[var(--muted)]">Years Experience</div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">75</div>
              <div className="text-sm text-[var(--muted)]">Passing Score</div>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            6 Steps to Become a CPA
          </h2>
          <div className="space-y-8">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[var(--muted)] mb-4">{step.description}</p>

                  <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 mb-4">
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                          <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--muted)]">
                      <strong>Typical timeframe:</strong> {step.timeframe}
                    </span>
                    {step.external ? (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--primary)] hover:underline inline-flex items-center"
                      >
                        {step.linkText}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <Link href={step.link} className="text-[var(--primary)] hover:underline inline-flex items-center">
                        {step.linkText}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cost Breakdown */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Cost to Become a CPA
          </h2>
          <p className="text-[var(--muted)] mb-6">
            The total cost varies widely depending on your state, educational path, and choice of study materials.
            Here&apos;s a general breakdown of expenses:
          </p>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Expense</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Estimated Cost</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {costBreakdown.map((row, idx) => (
                  <tr key={idx} className={idx === costBreakdown.length - 1 ? 'bg-gray-50 dark:bg-gray-800 font-semibold' : ''}>
                    <td className="px-6 py-4 text-[var(--foreground)]">{row.item}</td>
                    <td className="px-6 py-4 text-[var(--foreground)]">{row.cost}</td>
                    <td className="px-6 py-4 text-[var(--muted)] text-sm">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-[var(--muted)] mt-4">
            * These are estimated ranges. Actual costs vary by state and individual circumstances.
            Does not include education costs (college tuition).
          </p>
        </section>

        {/* The CPA Exam */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Understanding the CPA Exam
          </h2>
          <p className="text-[var(--muted)] mb-6">
            The Uniform CPA Examination consists of three core sections that all candidates must pass,
            plus one discipline section of your choice. The exam tests entry-level competencies required
            for CPAs.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Core Sections (Required)</h3>
              <ul className="space-y-1 text-blue-800 dark:text-blue-300 text-sm">
                <li>FAR - Financial Accounting & Reporting</li>
                <li>AUD - Auditing & Attestation</li>
                <li>REG - Regulation</li>
              </ul>
            </div>
            <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-xl p-4">
              <h3 className="font-semibold text-green-900 dark:text-green-200 mb-2">Discipline Sections (Choose One)</h3>
              <ul className="space-y-1 text-green-800 dark:text-green-300 text-sm">
                <li>TCP - Tax Compliance & Planning</li>
                <li>BAR - Business Analysis & Reporting</li>
                <li>ISC - Information Systems & Controls</li>
              </ul>
            </div>
          </div>

          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <h3 className="font-semibold text-[var(--foreground)] mb-4">Key Exam Facts</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[var(--muted)]">Passing score:</span>
                <span className="text-[var(--foreground)] ml-2">75 (on a scale of 0-99)</span>
              </div>
              <div>
                <span className="text-[var(--muted)]">Time limit per section:</span>
                <span className="text-[var(--foreground)] ml-2">4 hours</span>
              </div>
              <div>
                <span className="text-[var(--muted)]">Credit validity:</span>
                <span className="text-[var(--foreground)] ml-2">30 months from first passed section</span>
              </div>
              <div>
                <span className="text-[var(--muted)]">Testing windows:</span>
                <span className="text-[var(--foreground)] ml-2">Year-round (continuous testing)</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/resources/cpa-pass-rates"
              className="inline-flex items-center text-[var(--primary)] hover:underline font-medium"
            >
              View current CPA exam pass rates
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
            Practice with thousands of CPA exam questions and track your progress as you prepare.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary">
              Start Practicing Free
            </Link>
            <Link href="/state-requirements" className="btn-secondary">
              Check Your State Requirements
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
