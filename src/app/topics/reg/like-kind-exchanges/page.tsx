import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Like-Kind Exchanges (Section 1031) Guide for CPA Exam | REG',
  description: 'Master IRC Section 1031 like-kind exchanges for the CPA exam. Learn qualifying property, boot recognition, basis calculations, and the 45/180-day rules.',
  keywords: 'Section 1031, like-kind exchange, 1031 exchange, CPA exam, boot, deferred exchange, qualified intermediary, REG exam',
};

const keyRequirements = [
  {
    title: 'Qualifying Property',
    description: 'Both relinquished and replacement property must be held for productive use in trade/business or investment.',
    qualifies: [
      'Real property held for business use',
      'Real property held for investment',
      'Rental properties',
      'Commercial buildings',
      'Land held for investment',
    ],
    doesNotQualify: [
      'Personal residence (primary home)',
      'Inventory or property held for sale',
      'Stocks, bonds, or securities',
      'Partnership interests',
      'Personal property (post-TCJA 2017)',
    ],
    examTip: 'After TCJA (2017), only REAL PROPERTY qualifies. Personal property exchanges are no longer tax-deferred.',
  },
  {
    title: 'Like-Kind Requirement',
    description: 'Properties must be of "like kind" - for real property, this is interpreted broadly.',
    qualifies: [
      'Improved real estate for unimproved land',
      'Commercial building for residential rental',
      'City property for rural property',
      'Fee simple for 30+ year lease',
    ],
    doesNotQualify: [
      'US real property for foreign real property',
      'Real property for personal property',
    ],
    examTip: 'For real property, "like-kind" is very broad - any real property for any real property (within US).',
  },
];

const timelineRules = [
  {
    rule: '45-Day Identification Rule',
    description: 'Replacement property must be identified within 45 days of transferring the relinquished property.',
    details: [
      'Must be in writing and signed',
      'Identify up to 3 properties (any value) OR',
      'Identify any number if total FMV ≤ 200% of relinquished property',
      'Cannot revoke after 45 days',
    ],
    consequence: 'Failure to identify = fully taxable exchange',
  },
  {
    rule: '180-Day Exchange Rule',
    description: 'Replacement property must be received by the earlier of 180 days OR the due date of the tax return.',
    details: [
      '180 calendar days (not business days)',
      'File extension if needed to get full 180 days',
      'Both dates start from transfer of relinquished property',
    ],
    consequence: 'Failure to receive = fully taxable exchange',
  },
];

const bootCalculations = [
  {
    scenario: 'Cash Boot Received',
    treatment: 'Gain recognized = lesser of (1) boot received or (2) realized gain',
    example: 'Taxpayer exchanges property with $100,000 realized gain and receives $30,000 cash. Recognized gain = $30,000.',
  },
  {
    scenario: 'Mortgage Relief (Boot Given Up)',
    treatment: 'Mortgage relief is treated as boot received. Mortgage assumed is boot given.',
    example: 'Old property had $50,000 mortgage, new property has $30,000 mortgage. Net mortgage relief = $20,000 boot received.',
  },
  {
    scenario: 'Net Boot Calculation',
    treatment: 'Net cash boot and mortgage relief. Additional cash paid offsets boot received.',
    example: 'Mortgage relief of $50,000 - Cash paid of $30,000 = Net boot of $20,000.',
  },
];

const basisRules = [
  {
    title: 'Basis of Replacement Property',
    formula: 'FMV of replacement property - Deferred gain (or + Deferred loss)',
    alternativeFormula: 'Adjusted basis of relinquished property + Boot paid - Boot received + Gain recognized',
    examTip: 'The basis ensures that deferred gain will be recognized when replacement property is eventually sold.',
  },
  {
    title: 'Quick Basis Check',
    formula: 'New Basis = Old Basis + Gain Recognized + Cash Paid - Cash Received',
    examTip: 'Use this formula for quick calculations, then verify with the full formula.',
  },
];

const commonMistakes = [
  {
    mistake: 'Including personal property in exchange',
    correction: 'Post-TCJA (2017), only real property qualifies. Personal property exchanges are fully taxable.',
  },
  {
    mistake: 'Missing the 45-day identification deadline',
    correction: 'The 45 days starts from transfer of relinquished property. Mark your calendar - this is a hard deadline.',
  },
  {
    mistake: 'Forgetting mortgage relief is boot',
    correction: 'When your mortgage decreases in the exchange, the relief is treated as cash received (boot).',
  },
  {
    mistake: 'Recognizing gain when loss is deferred',
    correction: 'In a pure like-kind exchange, LOSSES are also deferred (not recognized), not just gains.',
  },
  {
    mistake: 'Confusing realized vs. recognized gain',
    correction: 'Realized gain = FMV received - Adjusted basis. Recognized gain = amount currently taxable (limited by boot).',
  },
];

const journalEntryExample = {
  scenario: 'Exchange building (AB $200,000, FMV $350,000) plus $50,000 cash for new building (FMV $400,000)',
  calculations: [
    { label: 'Realized Gain', calc: '$350,000 - $200,000 = $150,000' },
    { label: 'Boot Paid', calc: '$50,000 cash' },
    { label: 'Recognized Gain', calc: '$0 (paid boot, no boot received)' },
    { label: 'Deferred Gain', calc: '$150,000' },
    { label: 'Basis in New Property', calc: '$400,000 - $150,000 = $250,000' },
  ],
  verification: 'Verify: $200,000 (old basis) + $50,000 (cash paid) + $0 (gain recognized) = $250,000 ✓',
};

const faqs = [
  {
    question: 'Can I do a like-kind exchange on my primary residence?',
    answer: 'No, your primary residence does not qualify for Section 1031 treatment because it\'s not held for productive use in trade/business or investment. However, you may qualify for the Section 121 exclusion ($250,000/$500,000) on the sale of your primary residence.',
  },
  {
    question: 'What is a qualified intermediary and why do I need one?',
    answer: 'A qualified intermediary (QI) is a third party who holds the proceeds from the sale of your relinquished property and uses them to acquire the replacement property. Using a QI prevents constructive receipt of the proceeds, which would disqualify the exchange. The QI cannot be your agent, attorney, or accountant.',
  },
  {
    question: 'Can I exchange property with a related party?',
    answer: 'Yes, but there\'s a 2-year holding requirement. If either party disposes of the property within 2 years, the deferred gain becomes immediately taxable. There are exceptions for death, involuntary conversion, and certain non-tax-avoidance transactions.',
  },
  {
    question: 'What happens if I receive cash in addition to property?',
    answer: 'Cash received (boot) triggers gain recognition. You\'ll recognize gain equal to the lesser of the boot received or your total realized gain. You can never recognize more gain than your realized gain, and you can never recognize a loss in a like-kind exchange.',
  },
];

const baseUrl = "https://meridiancpareview.com";

export default function LikeKindExchangesPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "REG", url: `${baseUrl}/sections/reg` },
          { name: "Like-Kind Exchanges (Section 1031)", url: `${baseUrl}/topics/reg/like-kind-exchanges` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/sections/reg"
                className="text-green-200 hover:text-white transition-colors"
              >
                REG
              </Link>
              <span className="text-green-300">/</span>
              <span className="text-green-200">Topics</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Like-Kind Exchanges (§1031)
            </h1>
            <p className="text-xl text-green-100">
              Master IRC Section 1031 for the CPA exam. Learn the requirements for tax-deferred exchanges,
              boot recognition rules, and basis calculations for replacement property.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Reference */}
        <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-3">
            Section 1031 Quick Reference
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-green-800 dark:text-green-300 text-sm">
            <div>
              <strong className="text-green-900 dark:text-green-200">Requirements:</strong>
              <ul className="mt-1 space-y-1">
                <li>• Real property only (post-TCJA)</li>
                <li>• Held for business or investment</li>
                <li>• Like-kind (broadly interpreted)</li>
                <li>• Same taxpayer on both sides</li>
              </ul>
            </div>
            <div>
              <strong className="text-green-900 dark:text-green-200">Key Deadlines:</strong>
              <ul className="mt-1 space-y-1">
                <li>• 45 days to identify replacement</li>
                <li>• 180 days to complete exchange</li>
                <li>• Both from relinquished property transfer</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Qualifying Property */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Property Requirements
          </h2>
          <div className="space-y-6">
            {keyRequirements.map((req, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">{req.title}</h3>
                <p className="text-[var(--muted)] mb-4">{req.description}</p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 dark:bg-green-950/40 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 dark:text-green-300 mb-2">Qualifies:</h4>
                    <ul className="space-y-1">
                      {req.qualifies.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-sm text-green-700 dark:text-green-300">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950/40 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 dark:text-red-300 mb-2">Does NOT Qualify:</h4>
                    <ul className="space-y-1">
                      {req.doesNotQualify.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2 text-sm text-red-700 dark:text-red-300">
                          <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-sm bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold">Exam Tip:</span>
                  <span className="text-yellow-800 dark:text-yellow-300">{req.examTip}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline Rules */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Critical Timeline Rules
          </h2>
          <div className="space-y-4">
            {timelineRules.map((rule, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">{rule.rule}</h3>
                <p className="text-[var(--muted)] mb-4">{rule.description}</p>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
                  <ul className="space-y-1">
                    {rule.details.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                        <span className="text-[var(--primary)] font-bold">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm">
                  <span className="text-red-700 dark:text-red-300 font-medium">Consequence of failure: </span>
                  <span className="text-red-800 dark:text-red-300">{rule.consequence}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Boot Recognition */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Boot Recognition Rules
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Scenario</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Treatment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {bootCalculations.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-[var(--foreground)]">{row.scenario}</td>
                      <td className="px-6 py-4">
                        <p className="text-[var(--muted)] mb-1">{row.treatment}</p>
                        <p className="text-xs text-[var(--muted)] italic">Example: {row.example}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-sm text-[var(--muted)] mt-4">
            <strong>Key Rule:</strong> Gain recognized = Lesser of (1) boot received or (2) realized gain.
            You can NEVER recognize more gain than your realized gain.
          </p>
        </section>

        {/* Basis Calculation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Basis of Replacement Property
          </h2>
          <div className="space-y-4">
            {basisRules.map((rule, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="font-semibold text-[var(--foreground)] mb-3">{rule.title}</h3>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm mb-3">
                  <p className="text-[var(--foreground)]">{rule.formula}</p>
                  {rule.alternativeFormula && (
                    <p className="text-[var(--muted)] mt-2">OR: {rule.alternativeFormula}</p>
                  )}
                </div>
                <p className="text-sm text-[var(--muted)]">{rule.examTip}</p>
              </div>
            ))}
          </div>

          {/* Worked Example */}
          <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mt-6">
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">Worked Example</h3>
            <p className="text-blue-800 dark:text-blue-300 mb-4">{journalEntryExample.scenario}</p>
            <div className="bg-white dark:bg-blue-900/50 rounded-lg p-4 mb-3">
              {journalEntryExample.calculations.map((calc, idx) => (
                <div key={idx} className="flex justify-between py-1 text-sm">
                  <span className="text-blue-800 dark:text-blue-200">{calc.label}:</span>
                  <span className="font-mono text-blue-900 dark:text-blue-100">{calc.calc}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300 italic">{journalEntryExample.verification}</p>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Common Exam Mistakes
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
        <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Practice Section 1031 Questions
          </h2>
          <p className="text-green-100 mb-6">
            Reinforce your understanding with practice MCQs covering like-kind exchanges, boot calculations, and basis rules.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
            >
              Start Practicing Free
            </Link>
            <Link
              href="/sections/reg"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View All REG Topics
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
