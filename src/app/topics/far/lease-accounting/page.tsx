import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Lease Accounting (ASC 842) Guide for CPA Exam | FAR',
  description: 'Master lease accounting under ASC 842 for the CPA exam. Learn lessee and lessor accounting, lease classification, ROU assets, and lease liabilities with examples.',
  keywords: 'ASC 842, lease accounting, CPA exam lease, right of use asset, lease liability, operating lease, finance lease, FAR exam',
};

const keyTopics = [
  {
    title: 'Lease Classification',
    description: 'Determine whether a lease is a finance lease or operating lease based on the five classification criteria.',
    criteria: [
      'Transfer of ownership at end of lease term',
      'Purchase option reasonably certain to be exercised',
      'Lease term is major part (≥75%) of asset\'s economic life',
      'Present value of payments is substantially all (≥90%) of fair value',
      'Asset is specialized with no alternative use to lessor',
    ],
    examTip: 'If ANY of these criteria are met, it\'s a finance lease. Otherwise, it\'s an operating lease.',
  },
  {
    title: 'Right-of-Use (ROU) Asset',
    description: 'The lessee\'s right to use the underlying asset for the lease term.',
    components: [
      'Initial measurement of lease liability',
      'Lease payments made at or before commencement',
      'Initial direct costs incurred by lessee',
      'Less: Lease incentives received',
    ],
    examTip: 'ROU asset is NOT the fair value of the leased asset - it\'s based on the lease liability plus adjustments.',
  },
  {
    title: 'Lease Liability',
    description: 'Present value of lease payments not yet paid, discounted at the appropriate rate.',
    components: [
      'Fixed payments (less incentives)',
      'Variable payments based on index or rate',
      'Exercise price of purchase option (if reasonably certain)',
      'Penalties for termination (if lease term reflects termination)',
      'Residual value guarantees',
    ],
    examTip: 'Use implicit rate if known; otherwise use lessee\'s incremental borrowing rate.',
  },
];

const journalEntries = [
  {
    title: 'Initial Recognition (Both Lease Types)',
    entries: [
      { debit: 'Right-of-Use Asset', credit: '', amount: 'XXX' },
      { debit: '', credit: 'Lease Liability', amount: 'XXX' },
    ],
    note: 'Initial ROU asset equals lease liability plus any prepayments and initial direct costs, less incentives.',
  },
  {
    title: 'Finance Lease - Subsequent Measurement',
    entries: [
      { debit: 'Interest Expense', credit: '', amount: 'XXX' },
      { debit: 'Lease Liability', credit: '', amount: 'XXX' },
      { debit: '', credit: 'Cash', amount: 'XXX' },
      { debit: 'Amortization Expense', credit: '', amount: 'XXX' },
      { debit: '', credit: 'Accumulated Amortization - ROU Asset', amount: 'XXX' },
    ],
    note: 'Finance leases have FRONT-LOADED expense (higher total expense in early years).',
  },
  {
    title: 'Operating Lease - Subsequent Measurement',
    entries: [
      { debit: 'Lease Expense', credit: '', amount: 'XXX' },
      { debit: '', credit: 'Lease Liability', amount: 'XXX' },
      { debit: '', credit: 'Right-of-Use Asset', amount: 'XXX' },
    ],
    note: 'Operating leases have STRAIGHT-LINE expense over the lease term.',
  },
];

const comparisonTable = [
  { aspect: 'Balance Sheet', finance: 'ROU Asset + Lease Liability', operating: 'ROU Asset + Lease Liability' },
  { aspect: 'Income Statement', finance: 'Interest + Amortization (separate)', operating: 'Single lease expense (straight-line)' },
  { aspect: 'Cash Flow - Operating', finance: 'Interest portion only', operating: 'Entire lease payment' },
  { aspect: 'Cash Flow - Financing', finance: 'Principal portion', operating: 'None' },
  { aspect: 'Expense Pattern', finance: 'Front-loaded (higher early)', operating: 'Straight-line (level)' },
  { aspect: 'Total Expense', finance: 'Same over lease term', operating: 'Same over lease term' },
];

const commonMistakes = [
  {
    mistake: 'Confusing old vs. new standards',
    correction: 'ASC 842 requires ALL leases (>12 months) on the balance sheet. The old standard (ASC 840) kept operating leases off-balance sheet.',
  },
  {
    mistake: 'Using fair value for ROU asset',
    correction: 'ROU asset is based on the lease liability, not the fair value of the underlying asset.',
  },
  {
    mistake: 'Wrong discount rate',
    correction: 'Use the rate implicit in the lease if determinable. If not, use the lessee\'s incremental borrowing rate.',
  },
  {
    mistake: 'Forgetting the short-term lease exception',
    correction: 'Leases of 12 months or less can be expensed straight-line without recognizing ROU asset/liability.',
  },
  {
    mistake: 'Misclassifying variable payments',
    correction: 'Only variable payments based on an index or rate are included in lease liability. Other variable payments are expensed as incurred.',
  },
];

const faqs = [
  {
    question: 'What changed from ASC 840 to ASC 842?',
    answer: 'The biggest change is that operating leases now appear on the balance sheet as ROU assets and lease liabilities. Under the old standard (ASC 840), operating leases were off-balance sheet with only footnote disclosure. The income statement treatment for operating leases remains similar (straight-line expense).',
  },
  {
    question: 'How do I determine the discount rate for a lease?',
    answer: 'First, try to determine the rate implicit in the lease (the rate that makes PV of lease payments + residual value = fair value of asset). If this rate cannot be readily determined (which is common for lessees), use the lessee\'s incremental borrowing rate - the rate the lessee would pay to borrow funds to purchase a similar asset.',
  },
  {
    question: 'What is included in lease payments for the liability calculation?',
    answer: 'Include: fixed payments, variable payments tied to an index/rate, purchase option exercise price (if reasonably certain), termination penalties (if term reflects termination), and residual value guarantees. Exclude: variable payments not tied to an index/rate and most executory costs.',
  },
  {
    question: 'How does lease accounting differ for lessors?',
    answer: 'Lessors classify leases as sales-type, direct financing, or operating. Sales-type and direct financing leases result in derecognition of the asset and recognition of a receivable. Operating leases keep the asset on the lessor\'s books with rental income recognized straight-line.',
  },
];

const baseUrl = "https://meridiancpareview.com";

export default function LeaseAccountingPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "FAR", url: `${baseUrl}/sections/far` },
          { name: "Lease Accounting (ASC 842)", url: `${baseUrl}/topics/far/lease-accounting` },
        ]}
      />
      <FAQPageJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/sections/far"
                className="text-blue-200 hover:text-white transition-colors"
              >
                FAR
              </Link>
              <span className="text-blue-300">/</span>
              <span className="text-blue-200">Topics</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Lease Accounting (ASC 842)
            </h1>
            <p className="text-xl text-blue-100">
              Master the lease accounting standards for the CPA exam, including lessee and lessor accounting,
              lease classification, and the recognition of ROU assets and lease liabilities.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Reference */}
        <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
            Quick Reference: ASC 842 Key Points
          </h2>
          <ul className="grid md:grid-cols-2 gap-3 text-blue-800 dark:text-blue-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              ALL leases &gt;12 months go on balance sheet
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              Finance lease = any of 5 criteria met
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              Operating lease = none of 5 criteria met
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              ROU Asset = Lease Liability + adjustments
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              Finance: front-loaded expense pattern
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              Operating: straight-line expense pattern
            </li>
          </ul>
        </div>

        {/* Key Topics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Key Topics for the CPA Exam
          </h2>
          <div className="space-y-6">
            {keyTopics.map((topic, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">{topic.title}</h3>
                <p className="text-[var(--muted)] mb-4">{topic.description}</p>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-[var(--foreground)] mb-2">
                    {topic.title === 'Lease Classification' ? 'Finance Lease Criteria (OWNES):' : 'Components:'}
                  </h4>
                  <ul className="space-y-1">
                    {(topic.criteria || topic.components)?.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                        <span className="text-[var(--primary)] font-bold">{itemIdx + 1}.</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start gap-2 text-sm bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold">Exam Tip:</span>
                  <span className="text-yellow-800 dark:text-yellow-300">{topic.examTip}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Finance vs Operating Comparison */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Finance Lease vs. Operating Lease
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Aspect</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Finance Lease</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Operating Lease</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-[var(--foreground)]">{row.aspect}</td>
                      <td className="px-6 py-4 text-[var(--muted)]">{row.finance}</td>
                      <td className="px-6 py-4 text-[var(--muted)]">{row.operating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Journal Entries */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Key Journal Entries
          </h2>
          <div className="space-y-6">
            {journalEntries.map((entry, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="font-semibold text-[var(--foreground)] mb-4">{entry.title}</h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm mb-3">
                  {entry.entries.map((line, lineIdx) => (
                    <div key={lineIdx} className="flex">
                      <span className={`${line.debit ? '' : 'pl-8'} flex-1 text-[var(--foreground)]`}>
                        {line.debit || line.credit}
                      </span>
                      <span className="w-20 text-right text-[var(--muted)]">{line.amount}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[var(--muted)] italic">{entry.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Common Exam Mistakes to Avoid
          </h2>
          <div className="space-y-4">
            {commonMistakes.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
                <div className="flex items-start gap-3">
                  <div className="text-red-500 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--foreground)] mb-1">{item.mistake}</h3>
                    <p className="text-sm text-[var(--muted)]">{item.correction}</p>
                  </div>
                </div>
              </div>
            ))}
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
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Practice Lease Accounting Questions
          </h2>
          <p className="text-blue-100 mb-6">
            Reinforce your understanding with practice MCQs and task-based simulations covering ASC 842 lease accounting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Practicing Free
            </Link>
            <Link
              href="/sections/far"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View All FAR Topics
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
