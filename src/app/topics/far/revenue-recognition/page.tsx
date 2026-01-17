import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Revenue Recognition (ASC 606) Guide for CPA Exam | FAR',
  description: 'Master the 5-step revenue recognition model under ASC 606 for the CPA exam. Learn performance obligations, transaction price allocation, and timing of recognition.',
  keywords: 'ASC 606, revenue recognition, CPA exam revenue, 5-step model, performance obligation, transaction price, FAR exam',
};

const fiveSteps = [
  {
    step: 1,
    title: 'Identify the Contract with a Customer',
    description: 'A contract exists when it has commercial substance, parties have approved it, rights and payment terms are identifiable, and collection is probable.',
    criteria: [
      'Approved by parties (written, oral, or implied)',
      'Rights of each party are identifiable',
      'Payment terms are identifiable',
      'Contract has commercial substance',
      'Collection is probable',
    ],
    examTip: 'If collection is NOT probable, recognize revenue only when cash received AND no remaining obligations.',
  },
  {
    step: 2,
    title: 'Identify Performance Obligations',
    description: 'A performance obligation is a promise to transfer a distinct good or service to the customer.',
    criteria: [
      'Good/service is capable of being distinct (customer can benefit on its own or with readily available resources)',
      'Promise is distinct within the context of the contract (not highly interrelated with other promises)',
    ],
    examTip: 'Think "can the customer use this on its own?" If yes, it\'s likely a separate performance obligation.',
  },
  {
    step: 3,
    title: 'Determine the Transaction Price',
    description: 'The amount of consideration expected in exchange for transferring goods/services.',
    criteria: [
      'Fixed consideration',
      'Variable consideration (estimate using expected value or most likely amount)',
      'Significant financing component (adjust if >1 year)',
      'Noncash consideration (measure at fair value)',
      'Consideration payable to customer (reduce transaction price)',
    ],
    examTip: 'Variable consideration is constrained - only include amounts where reversal is NOT probable.',
  },
  {
    step: 4,
    title: 'Allocate the Transaction Price',
    description: 'Allocate to each performance obligation based on relative standalone selling prices.',
    criteria: [
      'Observable standalone selling price (best evidence)',
      'Adjusted market assessment approach',
      'Expected cost plus margin approach',
      'Residual approach (limited circumstances)',
    ],
    examTip: 'Discounts are allocated proportionally unless evidence shows discount relates to specific obligations.',
  },
  {
    step: 5,
    title: 'Recognize Revenue When (or As) Performance Obligation is Satisfied',
    description: 'Revenue is recognized when control transfers to the customer.',
    criteria: [
      'Point in time: Control transfers at a specific point',
      'Over time: One of three criteria met - customer simultaneously receives/consumes benefits, asset has no alternative use + right to payment, or customer controls asset as created',
    ],
    examTip: 'Over time recognition requires measuring progress (output or input methods).',
  },
];

const overTimeVsPointInTime = [
  {
    type: 'Over Time Recognition',
    criteria: 'Customer simultaneously receives and consumes benefits (e.g., cleaning services)',
    examples: ['Consulting services', 'Construction on customer land', 'Software customization'],
  },
  {
    type: 'Over Time Recognition',
    criteria: 'Asset has no alternative use to seller + enforceable right to payment for work completed',
    examples: ['Custom manufacturing', 'Specialized equipment'],
  },
  {
    type: 'Over Time Recognition',
    criteria: 'Customer controls asset as it\'s created or enhanced',
    examples: ['Construction on customer property', 'Work in process owned by customer'],
  },
  {
    type: 'Point in Time Recognition',
    criteria: 'None of the over-time criteria are met',
    examples: ['Retail sales', 'Standard product sales', 'Equipment delivery'],
  },
];

const commonScenarios = [
  {
    scenario: 'Bill-and-Hold Arrangements',
    treatment: 'Revenue recognized before delivery if: customer requests arrangement, risk of ownership transferred, product is identified and ready, and seller cannot use product for other purposes.',
    examTip: 'All four criteria must be met for bill-and-hold revenue recognition.',
  },
  {
    scenario: 'Consignment Arrangements',
    treatment: 'Consignor does NOT recognize revenue until consignee sells to end customer. Product remains consignor\'s inventory.',
    examTip: 'Look for indicators: consignee can return without penalty, consignor controls pricing.',
  },
  {
    scenario: 'Principal vs. Agent',
    treatment: 'Principal recognizes gross revenue; Agent recognizes net (commission only). Principal controls goods/services before transfer.',
    examTip: 'Key question: Who has primary responsibility and inventory risk?',
  },
  {
    scenario: 'Right of Return',
    treatment: 'Recognize revenue for amount expected to receive (not expected returns). Record refund liability and asset for expected returns.',
    examTip: 'Use expected value or most likely amount to estimate returns.',
  },
  {
    scenario: 'Warranties',
    treatment: 'Assurance warranties (defect coverage) = expense/liability. Service warranties (extended coverage) = separate performance obligation.',
    examTip: 'Can customer purchase warranty separately? If yes, it\'s a service warranty.',
  },
  {
    scenario: 'Licensing',
    treatment: 'Right to access (over time) vs. Right to use (point in time). Functional IP with significant standalone functionality = point in time.',
    examTip: 'Symbolic IP (brand) = over time. Functional IP (software, patent) = point in time.',
  },
];

const journalEntries = [
  {
    title: 'Basic Revenue Recognition',
    debit: 'Accounts Receivable (or Cash)',
    credit: 'Revenue',
    note: 'When performance obligation is satisfied and control transfers to customer.',
  },
  {
    title: 'Contract Asset (Unbilled Revenue)',
    debit: 'Contract Asset',
    credit: 'Revenue',
    note: 'When revenue is earned but not yet billed (e.g., percentage of completion).',
  },
  {
    title: 'Contract Liability (Deferred Revenue)',
    debit: 'Cash',
    credit: 'Contract Liability',
    note: 'When payment received before performance obligation is satisfied.',
  },
  {
    title: 'Right of Return - Refund Liability',
    debit: 'Revenue',
    credit: 'Refund Liability',
    note: 'Reduce revenue for expected returns and record refund liability.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a contract asset and a receivable?',
    answer: 'A receivable is an unconditional right to payment - only the passage of time is required before payment is due. A contract asset is a conditional right to payment - additional performance is required before payment is due. For example, if you\'ve completed 50% of a project and can bill for it, you have a receivable. If you\'ve completed 50% but can only bill at project completion, you have a contract asset.',
  },
  {
    question: 'How do I measure progress for over-time recognition?',
    answer: 'Use output methods (units delivered, milestones reached, surveys of work performed) or input methods (costs incurred, labor hours, machine hours). Input methods are acceptable when they reasonably depict progress. The method chosen should be applied consistently and updated each reporting period.',
  },
  {
    question: 'What is the constraint on variable consideration?',
    answer: 'Variable consideration is included in the transaction price only to the extent that it is probable that a significant reversal will NOT occur. This means you should be conservative in estimating variable consideration like bonuses, rebates, or performance-based fees.',
  },
  {
    question: 'How do I handle contract modifications?',
    answer: 'Modifications are treated as: (1) a separate contract if additional distinct goods/services at standalone selling price, (2) termination of old contract and creation of new one if remaining goods/services are distinct, or (3) continuation of existing contract if remaining goods/services are not distinct.',
  },
];

const baseUrl = "https://meridiancpareview.com";

export default function RevenueRecognitionPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "FAR", url: `${baseUrl}/sections/far` },
          { name: "Revenue Recognition (ASC 606)", url: `${baseUrl}/topics/far/revenue-recognition` },
        ]}
      />

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
              Revenue Recognition (ASC 606)
            </h1>
            <p className="text-xl text-blue-100">
              Master the 5-step revenue recognition model for the CPA exam. Learn how to identify
              performance obligations, determine transaction prices, and recognize revenue properly.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Reference */}
        <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-200 mb-3">
            The 5-Step Model at a Glance
          </h2>
          <ol className="grid md:grid-cols-5 gap-4 text-center">
            {['Identify Contract', 'Identify Obligations', 'Determine Price', 'Allocate Price', 'Recognize Revenue'].map((step, idx) => (
              <li key={idx} className="bg-white dark:bg-blue-900/50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-300 mb-1">{idx + 1}</div>
                <div className="text-sm text-blue-800 dark:text-blue-200">{step}</div>
              </li>
            ))}
          </ol>
        </div>

        {/* Five Steps Detail */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            The 5-Step Revenue Recognition Model
          </h2>
          <div className="space-y-6">
            {fiveSteps.map((step) => (
              <div key={step.step} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">{step.title}</h3>
                    <p className="text-[var(--muted)] mb-4">{step.description}</p>

                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-[var(--foreground)] mb-2">Key Criteria:</h4>
                      <ul className="space-y-1">
                        {step.criteria.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                            <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-start gap-2 text-sm bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                      <span className="text-yellow-600 dark:text-yellow-400 font-bold">Exam Tip:</span>
                      <span className="text-yellow-800 dark:text-yellow-300">{step.examTip}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Over Time vs Point in Time */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Over Time vs. Point in Time Recognition
          </h2>
          <div className="space-y-4">
            {overTimeVsPointInTime.map((item, idx) => (
              <div key={idx} className={`rounded-xl border p-4 ${
                item.type === 'Over Time Recognition'
                  ? 'bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800'
                  : 'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
              }`}>
                <div className="flex items-start gap-3">
                  <span className={`text-sm font-medium px-2 py-1 rounded ${
                    item.type === 'Over Time Recognition'
                      ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}>
                    {item.type}
                  </span>
                </div>
                <p className="text-[var(--foreground)] mt-2 mb-2">{item.criteria}</p>
                <p className="text-sm text-[var(--muted)]">
                  <strong>Examples:</strong> {item.examples.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Scenarios */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Common Exam Scenarios
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {commonScenarios.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{item.scenario}</h3>
                <p className="text-sm text-[var(--muted)] mb-3">{item.treatment}</p>
                <div className="text-xs bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded p-2">
                  <span className="text-yellow-700 dark:text-yellow-300 font-medium">Tip: </span>
                  <span className="text-yellow-800 dark:text-yellow-300">{item.examTip}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key Journal Entries */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Key Journal Entries
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {journalEntries.map((entry, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
                <h3 className="font-semibold text-[var(--foreground)] mb-3">{entry.title}</h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 font-mono text-sm mb-2">
                  <div className="text-[var(--foreground)]">Dr. {entry.debit}</div>
                  <div className="text-[var(--foreground)] pl-4">Cr. {entry.credit}</div>
                </div>
                <p className="text-xs text-[var(--muted)]">{entry.note}</p>
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
            Practice Revenue Recognition Questions
          </h2>
          <p className="text-blue-100 mb-6">
            Reinforce your understanding with practice MCQs and task-based simulations covering ASC 606 revenue recognition.
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
