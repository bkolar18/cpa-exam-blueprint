import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Basis Calculations Guide for CPA Exam | REG',
  description: 'Master property basis calculations for the CPA exam. Learn cost basis, adjusted basis, gifted property, inherited property, and basis in converted property.',
  keywords: 'property basis, adjusted basis, cost basis, gift basis, inherited basis, CPA exam, stepped-up basis, carryover basis, REG exam',
};

const basisTypes = [
  {
    type: 'Cost Basis',
    rule: 'Purchase price + acquisition costs',
    formula: 'Amount paid + Sales tax + Freight + Installation + Legal fees',
    examples: [
      'Purchase price: $100,000',
      'Closing costs: $5,000',
      'Legal fees: $2,000',
      'Cost basis: $107,000',
    ],
    examTip: 'Include ALL costs to acquire and place property in service. Do NOT include financing costs.',
  },
  {
    type: 'Gifted Property',
    rule: 'Basis depends on whether gain or loss and relationship of FMV to donor\'s basis',
    formula: 'Gain basis: Donor\'s adjusted basis (carryover) | Loss basis: Lesser of donor\'s basis or FMV at gift date',
    examples: [
      'Donor\'s basis: $50,000, FMV at gift: $40,000',
      'Sale at $60,000: Gain = $60,000 - $50,000 = $10,000 gain',
      'Sale at $30,000: Loss = $30,000 - $40,000 = $10,000 loss',
      'Sale at $45,000: No gain or loss (in the "dead zone")',
    ],
    examTip: 'DUAL BASIS for gifts when FMV < Donor\'s basis. Watch for the "no gain/no loss" range!',
  },
  {
    type: 'Inherited Property',
    rule: 'Stepped-up (or stepped-down) to FMV at date of death',
    formula: 'FMV at date of death OR Alternate valuation date (6 months later)',
    examples: [
      'Decedent\'s basis: $20,000, FMV at death: $150,000',
      'Heir\'s basis: $150,000 (stepped-up)',
      'Immediate sale: NO gain or loss',
    ],
    examTip: 'Inherited property gets a NEW basis (stepped-up). All prior gains are ELIMINATED. Holding period is automatically long-term.',
  },
  {
    type: 'Converted Property',
    rule: 'Personal to business: Lesser of FMV or adjusted basis at conversion',
    formula: 'Gain basis: Adjusted basis at conversion | Loss basis: Lesser of AB or FMV at conversion',
    examples: [
      'Personal car converted to business use',
      'Personal home converted to rental',
      'Basis = lesser of original cost or FMV at conversion',
    ],
    examTip: 'Personal-to-business conversions use the LESSER of cost or FMV for depreciation purposes.',
  },
];

const adjustedBasisRules = [
  {
    category: 'Increases to Basis',
    items: [
      'Capital improvements (roof, additions)',
      'Legal fees to defend title',
      'Special assessments for improvements',
      'Restoration costs after casualty (not covered by insurance)',
    ],
  },
  {
    category: 'Decreases to Basis',
    items: [
      'Depreciation (allowed or allowable)',
      'Casualty losses claimed',
      'Insurance reimbursements',
      'Deferred gain from like-kind exchange',
      'Section 179 expense deduction',
      'Nontaxable distributions',
    ],
  },
];

const specialScenarios = [
  {
    scenario: 'Property Received for Services',
    basis: 'FMV at date received (amount included in income)',
    note: 'The FMV is both income and basis.',
  },
  {
    scenario: 'Property Received in Divorce',
    basis: 'Transferor\'s adjusted basis (carryover)',
    note: 'No gain/loss on transfer; basis carries over.',
  },
  {
    scenario: 'Stock Dividends (Same Class)',
    basis: 'Allocate original basis across all shares',
    note: 'Original basis ÷ Total shares (old + new).',
  },
  {
    scenario: 'Stock Splits',
    basis: 'Allocate original basis across new shares',
    note: 'Same as stock dividends for same-class stock.',
  },
  {
    scenario: 'Wash Sale Stock',
    basis: 'Cost of new stock + Disallowed loss',
    note: 'Loss is added to basis of replacement stock.',
  },
  {
    scenario: 'Related Party Purchase',
    basis: 'Cost paid (but watch for loss disallowance)',
    note: 'Buyer may get benefit of seller\'s disallowed loss.',
  },
];

const giftBasisFlowchart = [
  {
    step: 1,
    question: 'Is FMV at gift date ≥ Donor\'s adjusted basis?',
    yesAnswer: 'Donee\'s basis = Donor\'s adjusted basis (carryover)',
    noAnswer: 'Go to Step 2 - DUAL BASIS applies',
  },
  {
    step: 2,
    question: 'Did donee sell for GAIN (above donor\'s basis)?',
    yesAnswer: 'Use DONOR\'S BASIS for gain calculation',
    noAnswer: 'Go to Step 3',
  },
  {
    step: 3,
    question: 'Did donee sell for LOSS (below FMV at gift)?',
    yesAnswer: 'Use FMV AT GIFT DATE for loss calculation',
    noAnswer: 'Sale is in "dead zone" - NO GAIN OR LOSS',
  },
];

const commonMistakes = [
  {
    mistake: 'Using donor\'s basis for gift when FMV < basis and selling at a loss',
    correction: 'When FMV < donor\'s basis, use FMV for calculating LOSSES. Use donor\'s basis only for gains.',
  },
  {
    mistake: 'Forgetting that inherited property gets stepped-up basis',
    correction: 'Inherited = FMV at death (new basis). This eliminates all unrealized gain. Holding period is automatic long-term.',
  },
  {
    mistake: 'Including land in depreciation calculations',
    correction: 'Land is NEVER depreciated. Allocate purchase price between land and building.',
  },
  {
    mistake: 'Using "allowable" vs "allowed" depreciation incorrectly',
    correction: 'Basis is reduced by depreciation ALLOWED OR ALLOWABLE, whichever is greater. You can\'t avoid basis reduction by not claiming depreciation.',
  },
  {
    mistake: 'Forgetting gift tax paid increases basis',
    correction: 'Donor\'s gift tax paid × (appreciation/taxable gift) is added to donee\'s basis.',
  },
];

const practiceProblems = [
  {
    problem: 'Amy received stock as a gift when FMV was $8,000. Donor\'s basis was $12,000. No gift tax was paid. Amy sold the stock for $10,000. What is Amy\'s gain or loss?',
    answer: 'No gain or loss. The sale price ($10,000) is between donor\'s basis ($12,000) and FMV at gift ($8,000), creating a "dead zone."',
  },
  {
    problem: 'Bob inherited land from his father. Father\'s basis was $50,000. FMV at death was $200,000. Bob sold immediately for $200,000. What is Bob\'s gain?',
    answer: '$0 gain. Bob\'s basis is stepped up to $200,000 (FMV at death). Sale at FMV = no gain or loss.',
  },
  {
    problem: 'Carol purchased equipment for $100,000. She claimed $30,000 depreciation. She then made $15,000 in capital improvements. What is her adjusted basis?',
    answer: '$85,000. Calculation: $100,000 - $30,000 + $15,000 = $85,000.',
  },
];

const baseUrl = "https://meridiancpareview.com";

export default function BasisCalculationsPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "REG", url: `${baseUrl}/sections/reg` },
          { name: "Basis Calculations", url: `${baseUrl}/topics/reg/basis-calculations` },
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
              Basis Calculations
            </h1>
            <p className="text-xl text-green-100">
              Master property basis rules for the CPA exam. Learn cost basis, adjusted basis,
              and special rules for gifted, inherited, and converted property.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Reference */}
        <div className="bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-green-900 dark:text-green-200 mb-3">
            Basis Quick Reference
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-white dark:bg-green-900/50 rounded-lg p-3">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">Purchased</div>
              <div className="text-sm text-green-600 dark:text-green-300">Cost + Acquisition costs</div>
            </div>
            <div className="bg-white dark:bg-green-900/50 rounded-lg p-3">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">Gifted</div>
              <div className="text-sm text-green-600 dark:text-green-300">Carryover (dual basis rules)</div>
            </div>
            <div className="bg-white dark:bg-green-900/50 rounded-lg p-3">
              <div className="text-lg font-bold text-green-700 dark:text-green-300">Inherited</div>
              <div className="text-sm text-green-600 dark:text-green-300">FMV at death (stepped-up)</div>
            </div>
          </div>
        </div>

        {/* Basis Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Types of Basis
          </h2>
          <div className="space-y-6">
            {basisTypes.map((basis, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">{basis.type}</h3>
                <p className="text-[var(--muted)] mb-2"><strong>Rule:</strong> {basis.rule}</p>

                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 mb-4 font-mono text-sm">
                  <p className="text-[var(--foreground)]">{basis.formula}</p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950/40 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Example:</h4>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    {basis.examples.map((ex, exIdx) => (
                      <li key={exIdx}>{ex}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start gap-2 text-sm bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold">Exam Tip:</span>
                  <span className="text-yellow-800 dark:text-yellow-300">{basis.examTip}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gift Basis Flowchart */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Gift Basis Decision Flowchart
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <div className="space-y-4">
              {giftBasisFlowchart.map((step) => (
                <div key={step.step} className="border-l-4 border-[var(--primary)] pl-4">
                  <h4 className="font-semibold text-[var(--foreground)] mb-2">
                    Step {step.step}: {step.question}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <div className="bg-green-50 dark:bg-green-950/40 rounded p-2">
                      <span className="text-green-700 dark:text-green-300 font-medium">YES:</span>{' '}
                      <span className="text-green-600 dark:text-green-300">{step.yesAnswer}</span>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/40 rounded p-2">
                      <span className="text-red-700 dark:text-red-300 font-medium">NO:</span>{' '}
                      <span className="text-red-600 dark:text-red-300">{step.noAnswer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Adjusted Basis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Adjusted Basis: Increases and Decreases
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {adjustedBasisRules.map((rule, idx) => (
              <div key={idx} className={`rounded-xl border p-6 ${
                rule.category.includes('Increases')
                  ? 'bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800'
              }`}>
                <h3 className={`font-semibold mb-3 ${
                  rule.category.includes('Increases')
                    ? 'text-green-800 dark:text-green-200'
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {rule.category}
                </h3>
                <ul className="space-y-2">
                  {rule.items.map((item, itemIdx) => (
                    <li key={itemIdx} className={`flex items-start gap-2 text-sm ${
                      rule.category.includes('Increases')
                        ? 'text-green-700 dark:text-green-300'
                        : 'text-red-700 dark:text-red-300'
                    }`}>
                      <span className="font-bold">{rule.category.includes('Increases') ? '+' : '−'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-sm text-[var(--muted)] mt-4">
            <strong>Formula:</strong> Adjusted Basis = Original Basis + Increases − Decreases
          </p>
        </section>

        {/* Special Scenarios */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Special Scenarios
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Scenario</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Basis Rule</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {specialScenarios.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 font-medium text-[var(--foreground)]">{row.scenario}</td>
                      <td className="px-6 py-4 text-[var(--muted)]">{row.basis}</td>
                      <td className="px-6 py-4 text-sm text-[var(--muted)]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

        {/* Practice Problems */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Practice Problems
          </h2>
          <div className="space-y-4">
            {practiceProblems.map((prob, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="font-semibold text-[var(--foreground)] mb-3">Problem {idx + 1}</h3>
                <p className="text-[var(--muted)] mb-4">{prob.problem}</p>
                <details className="group">
                  <summary className="cursor-pointer text-[var(--primary)] font-medium hover:underline">
                    Show Answer
                  </summary>
                  <div className="mt-3 bg-green-50 dark:bg-green-950/40 rounded-lg p-4 text-green-800 dark:text-green-300">
                    {prob.answer}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Practice Basis Calculation Questions
          </h2>
          <p className="text-green-100 mb-6">
            Reinforce your understanding with practice MCQs covering basis calculations, gifts, inheritances, and conversions.
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
