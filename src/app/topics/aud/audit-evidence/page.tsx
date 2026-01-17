import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Audit Evidence for CPA Exam | Sufficiency, Appropriateness & Procedures | Meridian CPA Review',
  description: 'Master audit evidence concepts for the CPA exam. Learn about sufficiency, appropriateness, audit procedures, evidence types, and documentation requirements.',
  keywords: 'audit evidence CPA exam, audit procedures, sufficient appropriate evidence, audit documentation, substantive procedures',
};

const baseUrl = "https://meridiancpareview.com";

export default function AuditEvidencePage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "AUD", url: `${baseUrl}/sections/aud` },
          { name: "Audit Evidence", url: `${baseUrl}/topics/aud/audit-evidence` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <span>/</span>
            <Link href="/sections/aud" className="hover:text-white">AUD</Link>
            <span>/</span>
            <span>Audit Evidence</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Audit Evidence
            </h1>
            <p className="text-xl text-gray-200">
              Understanding the nature, sufficiency, and appropriateness of audit evidence
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why It Matters */}
        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">Why Audit Evidence Matters on the CPA Exam</h2>
            <p className="text-[var(--muted)]">
              Audit evidence is the foundation of the audit opinion. The auditor must obtain sufficient appropriate
              audit evidence to support conclusions. Understanding how to evaluate evidence quality and design
              effective audit procedures is essential for both the AUD exam section and audit practice.
            </p>
          </div>
        </section>

        {/* Sufficiency and Appropriateness */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Sufficiency and Appropriateness</h2>
          <p className="text-[var(--muted)] mb-6">
            The auditor&apos;s goal is to obtain <strong>sufficient appropriate audit evidence</strong>. These two
            characteristics must both be met - having lots of low-quality evidence is not acceptable, nor is having
            a small amount of high-quality evidence.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Sufficiency (Quantity)</h3>
              </div>
              <p className="text-[var(--muted)] mb-4">
                The measure of the <strong>quantity</strong> of audit evidence. The auditor must obtain enough evidence
                to support conclusions.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-medium text-[var(--foreground)] mb-2">Factors Affecting Sufficiency:</h4>
                <ul className="text-sm text-[var(--muted)] space-y-1">
                  <li>• Risk of material misstatement (higher risk = more evidence)</li>
                  <li>• Quality of evidence (higher quality = less quantity needed)</li>
                  <li>• Population characteristics</li>
                  <li>• Expected rate of deviation</li>
                  <li>• Tolerable rate of deviation</li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Appropriateness (Quality)</h3>
              </div>
              <p className="text-[var(--muted)] mb-4">
                The measure of the <strong>quality</strong> of audit evidence - its relevance and reliability in
                supporting the auditor&apos;s conclusions.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-medium text-[var(--foreground)] mb-2">Two Components:</h4>
                <div className="space-y-3 text-sm text-[var(--muted)]">
                  <div>
                    <strong className="text-[var(--foreground)]">Relevance:</strong> Does the evidence address the
                    assertion being tested? (Direction matters)
                  </div>
                  <div>
                    <strong className="text-[var(--foreground)]">Reliability:</strong> Can the evidence be trusted?
                    (Source and nature matter)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evidence Reliability */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Reliability of Audit Evidence</h2>
          <p className="text-[var(--muted)] mb-6">
            Not all evidence is equally reliable. The CPA exam frequently tests your understanding of what makes
            evidence more or less reliable. These factors should be considered when designing audit procedures.
          </p>

          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="p-4 text-left font-semibold text-[var(--foreground)]">Factor</th>
                    <th className="p-4 text-left font-semibold text-green-600 dark:text-green-400">More Reliable</th>
                    <th className="p-4 text-left font-semibold text-red-600 dark:text-red-400">Less Reliable</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="p-4 font-medium text-[var(--foreground)]">Source</td>
                    <td className="p-4 text-[var(--muted)]">External (independent third parties)</td>
                    <td className="p-4 text-[var(--muted)]">Internal (client-prepared)</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="p-4 font-medium text-[var(--foreground)]">Direct vs. Indirect</td>
                    <td className="p-4 text-[var(--muted)]">Direct personal knowledge (observation, inspection)</td>
                    <td className="p-4 text-[var(--muted)]">Indirect (inquiry, representations)</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[var(--foreground)]">Form</td>
                    <td className="p-4 text-[var(--muted)]">Documentary (written, electronic)</td>
                    <td className="p-4 text-[var(--muted)]">Oral</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="p-4 font-medium text-[var(--foreground)]">Original vs. Copy</td>
                    <td className="p-4 text-[var(--muted)]">Original documents</td>
                    <td className="p-4 text-[var(--muted)]">Copies, faxes, scans</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[var(--foreground)]">Internal Controls</td>
                    <td className="p-4 text-[var(--muted)]">Generated when controls are effective</td>
                    <td className="p-4 text-[var(--muted)]">Generated when controls are weak</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-800/50">
                    <td className="p-4 font-medium text-[var(--foreground)]">Timing</td>
                    <td className="p-4 text-[var(--muted)]">Obtained closer to balance sheet date</td>
                    <td className="p-4 text-[var(--muted)]">Obtained far from balance sheet date</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Key Exam Point</h3>
            <p className="text-[var(--muted)]">
              Internal evidence that has been exposed to parties external to the entity is more reliable than
              purely internal evidence. For example, a cancelled check (internal but sent to bank) is more reliable
              than an internal memo.
            </p>
          </div>
        </section>

        {/* Audit Procedures */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Types of Audit Procedures</h2>
          <p className="text-[var(--muted)] mb-6">
            Auditors use various procedures to gather evidence. Each procedure type provides different quality
            evidence and is appropriate for different situations.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-600 dark:text-purple-400 font-bold">I</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Inspection</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                Examining records, documents, or tangible assets. Provides evidence of existence but not necessarily
                ownership or valuation.
              </p>
              <div className="text-xs text-[var(--muted)] bg-gray-50 dark:bg-gray-800/50 rounded p-2">
                <strong>Examples:</strong> Examining invoices, counting inventory, reviewing contracts
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold">O</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Observation</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                Watching a process or procedure being performed. Limited to the point in time when observed.
              </p>
              <div className="text-xs text-[var(--muted)] bg-gray-50 dark:bg-gray-800/50 rounded p-2">
                <strong>Examples:</strong> Watching inventory count, observing segregation of duties
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-600 dark:text-green-400 font-bold">E</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">External Confirmation</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                Direct written response from third parties. Highly reliable because evidence is from independent source.
              </p>
              <div className="text-xs text-[var(--muted)] bg-gray-50 dark:bg-gray-800/50 rounded p-2">
                <strong>Examples:</strong> Bank confirmations, A/R confirmations, legal letters
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-orange-600 dark:text-orange-400 font-bold">R</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Recalculation</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                Checking mathematical accuracy. Highly reliable because auditor performs the calculation independently.
              </p>
              <div className="text-xs text-[var(--muted)] bg-gray-50 dark:bg-gray-800/50 rounded p-2">
                <strong>Examples:</strong> Footing journals, recalculating depreciation, verifying extensions
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-red-600 dark:text-red-400 font-bold">R</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Reperformance</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                Independently executing procedures or controls. Provides strong evidence about control operating effectiveness.
              </p>
              <div className="text-xs text-[var(--muted)] bg-gray-50 dark:bg-gray-800/50 rounded p-2">
                <strong>Examples:</strong> Re-aging receivables, reperforming bank reconciliation
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-yellow-600 dark:text-yellow-400 font-bold">A</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Analytical Procedures</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                Evaluating financial information through analysis of plausible relationships. Required in planning and
                overall review stages.
              </p>
              <div className="text-xs text-[var(--muted)] bg-gray-50 dark:bg-gray-800/50 rounded p-2">
                <strong>Examples:</strong> Ratio analysis, trend analysis, reasonableness tests
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-pink-600 dark:text-pink-400 font-bold">I</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Inquiry</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                Seeking information from knowledgeable persons. Generally not sufficient alone - must be corroborated
                with other evidence.
              </p>
              <div className="text-xs text-[var(--muted)] bg-gray-50 dark:bg-gray-800/50 rounded p-2">
                <strong>Examples:</strong> Asking about accounting policies, follow-up on unusual items
              </div>
            </div>
          </div>

          {/* Mnemonic */}
          <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Memory Aid: &quot;RIOT CAR&quot; or &quot;AEIOU RR&quot;</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {['Recalculation', 'Inquiry', 'Observation', 'Tracing', 'Confirmation', 'Analytical', 'Reperformance'].map((proc) => (
                <div key={proc} className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{proc[0]}</span>
                  <span className="text-sm text-[var(--muted)]">{proc.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Direction of Testing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Direction of Testing</h2>
          <p className="text-[var(--muted)] mb-6">
            The direction of testing determines which assertion you&apos;re testing. This is a frequently tested
            concept on the CPA exam.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                <span className="text-blue-600">→</span> Vouching (Recorded → Source)
              </h3>
              <div className="space-y-4">
                <p className="text-[var(--muted)]">
                  Start with recorded amounts and trace back to supporting documentation.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-[var(--foreground)] mb-2">Tests for:</h4>
                  <ul className="text-sm text-[var(--muted)] space-y-1">
                    <li>• <strong>Existence/Occurrence</strong> - Did this really happen?</li>
                    <li>• <strong>Accuracy</strong> - Is the amount correct?</li>
                    <li>• <strong>Valuation</strong> - Is it recorded at proper amount?</li>
                  </ul>
                </div>
                <div className="text-sm text-[var(--muted)]">
                  <strong>Example:</strong> Select sales from the sales journal and trace to shipping documents
                  and customer orders to verify the sales actually occurred.
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                <span className="text-green-600">←</span> Tracing (Source → Recorded)
              </h3>
              <div className="space-y-4">
                <p className="text-[var(--muted)]">
                  Start with source documents and trace forward to the accounting records.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-[var(--foreground)] mb-2">Tests for:</h4>
                  <ul className="text-sm text-[var(--muted)] space-y-1">
                    <li>• <strong>Completeness</strong> - Are all transactions recorded?</li>
                    <li>• <strong>Cutoff</strong> - Is it recorded in the right period?</li>
                  </ul>
                </div>
                <div className="text-sm text-[var(--muted)]">
                  <strong>Example:</strong> Select shipping documents and trace to the sales journal to verify
                  all shipments were recorded as sales.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Exam Tip: Direction Matters!</h3>
            <p className="text-[var(--muted)]">
              When an exam question asks how to test for <strong>completeness</strong> or <strong>understatement</strong>,
              the answer involves <strong>tracing</strong> from source to records. When testing for <strong>existence</strong>
              or <strong>overstatement</strong>, the answer involves <strong>vouching</strong> from records to source.
            </p>
          </div>
        </section>

        {/* Audit Documentation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Audit Documentation Requirements</h2>
          <p className="text-[var(--muted)] mb-6">
            Audit documentation (working papers) must be sufficient to enable an experienced auditor with no
            previous connection to the audit to understand the work performed.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Documentation Must Include</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Nature, timing, and extent of procedures performed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Results of procedures and evidence obtained</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Significant findings and issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Conclusions reached</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Significant professional judgments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Who performed and reviewed the work</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Retention Requirements</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-medium text-[var(--foreground)]">Issuers (Public Companies)</h4>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    <strong>7 years</strong> from report date (SEC/PCAOB requirement)
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-medium text-[var(--foreground)]">Non-Issuers (Private Companies)</h4>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    <strong>5 years</strong> from report date (AICPA requirement)
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <h4 className="font-medium text-[var(--foreground)]">Assembly Deadline</h4>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    <strong>60 days</strong> after report date to assemble the final file
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Management Representations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Management Representations</h2>
          <p className="text-[var(--muted)] mb-6">
            The representation letter is written evidence of management&apos;s assertions. While representations
            are a form of audit evidence, they do not substitute for other evidence the auditor should obtain.
          </p>

          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Key Requirements</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-2">Must Address:</h4>
                <ul className="text-sm text-[var(--muted)] space-y-1">
                  <li>• Financial statements prepared in accordance with framework</li>
                  <li>• Completeness of information provided</li>
                  <li>• Recognition, measurement, and disclosure of items</li>
                  <li>• All known actual or possible litigation and claims</li>
                  <li>• Related party transactions</li>
                  <li>• Subsequent events</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-2">Characteristics:</h4>
                <ul className="text-sm text-[var(--muted)] space-y-1">
                  <li>• Dated as of audit report date</li>
                  <li>• Signed by CEO and CFO (or equivalents)</li>
                  <li>• Covers all periods presented</li>
                  <li>• Refusal to sign = scope limitation</li>
                  <li>• May result in disclaimer of opinion</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Exam Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">CPA Exam Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Key Concepts to Master</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Difference between sufficiency and appropriateness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Factors affecting evidence reliability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Direction of testing (vouching vs. tracing)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Types of audit procedures and when to use each</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Documentation retention requirements (5 vs. 7 years)</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Common Exam Traps</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Thinking inquiry alone provides sufficient evidence</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Confusing vouching (tests existence) with tracing (tests completeness)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Thinking more evidence is always better (quality matters)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Assuming client-prepared documents are unreliable (depends on controls)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Mixing up retention periods for issuers vs. non-issuers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Topics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Related AUD Topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/topics/aud/internal-controls"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Internal Controls</h3>
              <p className="text-sm text-[var(--muted)]">
                How controls affect evidence quality and procedures
              </p>
            </Link>
            <Link
              href="/topics/aud/audit-reports"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Audit Reports</h3>
              <p className="text-sm text-[var(--muted)]">
                How evidence insufficiency affects the audit report
              </p>
            </Link>
            <Link
              href="/sections/aud"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">AUD Section Guide</h3>
              <p className="text-sm text-[var(--muted)]">
                Complete overview of the AUD exam section
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Practice Audit Evidence Questions</h2>
            <p className="text-gray-200 mb-6">
              Apply what you&apos;ve learned with practice MCQs and simulations covering evidence procedures,
              documentation, and direction of testing.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Practicing Free
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
