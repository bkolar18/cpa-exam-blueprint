import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Consolidations for CPA Exam | Eliminations & NCI | Meridian CPA Review',
  description: 'Master consolidation accounting for the CPA exam. Learn parent-subsidiary relationships, elimination entries, noncontrolling interest, and intercompany transactions.',
  keywords: 'consolidations CPA exam, consolidated financial statements, elimination entries, noncontrolling interest, intercompany transactions',
};

const baseUrl = "https://meridiancpareview.com";

export default function ConsolidationsPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "FAR", url: `${baseUrl}/sections/far` },
          { name: "Consolidations", url: `${baseUrl}/topics/far/consolidations` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <span>/</span>
            <Link href="/sections/far" className="hover:text-white">FAR</Link>
            <span>/</span>
            <span>Consolidations</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Consolidations
            </h1>
            <p className="text-xl text-gray-200">
              Understanding consolidated financial statements, elimination entries, and noncontrolling interest
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why It Matters */}
        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">Why Consolidations Matter on the CPA Exam</h2>
            <p className="text-[var(--muted)]">
              Consolidations are a heavily tested topic on the FAR section. You&apos;ll need to understand when to
              consolidate, how to prepare elimination entries, and the proper treatment of noncontrolling interest.
              Task-based simulations often require preparing consolidation worksheets and calculating consolidated
              balances.
            </p>
          </div>
        </section>

        {/* When to Consolidate */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">When Is Consolidation Required?</h2>
          <p className="text-[var(--muted)] mb-6">
            A parent company must consolidate all subsidiaries it controls. Control is generally presumed when
            the parent owns more than 50% of the voting stock, but can exist with less ownership in certain
            circumstances.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-green-600 dark:text-green-400 font-bold text-xl">&gt;50%</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Consolidation</h3>
              <p className="text-sm text-[var(--muted)]">
                Controlling interest (typically &gt;50% voting stock). Combine all assets, liabilities, revenues,
                and expenses.
              </p>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">20-50%</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Equity Method</h3>
              <p className="text-sm text-[var(--muted)]">
                Significant influence (typically 20-50%). Report one-line investment and share of investee income.
              </p>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-600 dark:text-gray-400 font-bold text-lg">&lt;20%</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Fair Value</h3>
              <p className="text-sm text-[var(--muted)]">
                No significant influence (&lt;20%). Report at fair value with changes in income (or OCI for certain
                equity securities).
              </p>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Variable Interest Entities (VIEs)</h3>
            <p className="text-[var(--muted)]">
              Consolidation may be required even without majority ownership if the entity is the &quot;primary beneficiary&quot;
              of a VIE. The primary beneficiary has (1) power to direct activities that most significantly affect
              economic performance and (2) obligation to absorb losses or right to receive benefits that could be significant.
            </p>
          </div>
        </section>

        {/* Basic Elimination Entries */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Basic Elimination Entries</h2>
          <p className="text-[var(--muted)] mb-6">
            Consolidation requires eliminating intercompany accounts and transactions to present the combined
            entity as if it were a single economic unit.
          </p>

          <div className="space-y-6">
            {/* Entry S */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">S</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Eliminate Stockholders&apos; Equity</h3>
              </div>
              <p className="text-[var(--muted)] mb-4">
                Eliminate the subsidiary&apos;s stockholders&apos; equity accounts against the parent&apos;s investment account.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-[var(--foreground)]">Dr. Common Stock (Sub)............XXX</div>
                <div className="text-[var(--foreground)]">Dr. APIC (Sub).....................XXX</div>
                <div className="text-[var(--foreground)]">Dr. Retained Earnings (Sub)........XXX</div>
                <div className="text-[var(--foreground)] ml-8">Cr. Investment in Sub............XXX</div>
                <div className="text-[var(--foreground)] ml-8">Cr. NCI in Sub...................XXX</div>
              </div>
            </div>

            {/* Entry A */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">A</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Allocate Excess to Fair Value</h3>
              </div>
              <p className="text-[var(--muted)] mb-4">
                Adjust subsidiary assets and liabilities from book value to fair value at acquisition date.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-[var(--foreground)]">Dr. Land (FV adjustment)...........XXX</div>
                <div className="text-[var(--foreground)]">Dr. Equipment (FV adjustment)......XXX</div>
                <div className="text-[var(--foreground)]">Dr. Goodwill......................XXX</div>
                <div className="text-[var(--foreground)] ml-8">Cr. Investment in Sub............XXX</div>
                <div className="text-[var(--foreground)] ml-8">Cr. NCI in Sub...................XXX</div>
              </div>
            </div>

            {/* Entry I */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold">I</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Eliminate Intercompany Income</h3>
              </div>
              <p className="text-[var(--muted)] mb-4">
                Eliminate the parent&apos;s share of subsidiary income and dividends.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-[var(--foreground)]">Dr. Equity in Sub Income...........XXX</div>
                <div className="text-[var(--foreground)] ml-8">Cr. Investment in Sub............XXX</div>
                <div className="text-[var(--foreground)]">Dr. Investment in Sub..............XXX</div>
                <div className="text-[var(--foreground)] ml-8">Cr. Dividends Declared (Sub).....XXX</div>
              </div>
            </div>

            {/* Entry D */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 dark:text-orange-400 font-bold">D</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Depreciation/Amortization of FV Adjustments</h3>
              </div>
              <p className="text-[var(--muted)] mb-4">
                Record additional depreciation or amortization on fair value adjustments to depreciable/amortizable assets.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                <div className="text-[var(--foreground)]">Dr. Depreciation Expense...........XXX</div>
                <div className="text-[var(--foreground)] ml-8">Cr. Equipment (Accum. Depr.).....XXX</div>
              </div>
            </div>
          </div>

          {/* Mnemonic */}
          <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Memory Aid: &quot;SAID&quot;</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">S</div>
                <div className="text-sm text-[var(--muted)]">Stockholders&apos; Equity</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">A</div>
                <div className="text-sm text-[var(--muted)]">Allocate to FV</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">I</div>
                <div className="text-sm text-[var(--muted)]">Intercompany Income</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">D</div>
                <div className="text-sm text-[var(--muted)]">Depreciation Adj.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Noncontrolling Interest */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Noncontrolling Interest (NCI)</h2>
          <p className="text-[var(--muted)] mb-6">
            When a parent owns less than 100% of a subsidiary, the portion not owned is called noncontrolling
            interest (formerly &quot;minority interest&quot;). NCI is reported as a separate component of equity.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">NCI on Balance Sheet</h3>
              <ul className="space-y-3 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Reported in stockholders&apos; equity section</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Separate from parent&apos;s equity</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Initially measured at fair value</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Adjusted for NCI share of income, dividends, and OCI</span>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">NCI on Income Statement</h3>
              <ul className="space-y-3 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Consolidated net income includes 100% of subsidiary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>NCI share is deducted to arrive at NI attributable to parent</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Both amounts must be presented on face of income statement</span>
                </li>
              </ul>
              <div className="mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-sm">
                <div className="text-[var(--foreground)]">Consolidated Net Income.....XXX</div>
                <div className="text-[var(--muted)]">Less: NCI in Net Income......(XX)</div>
                <div className="text-[var(--foreground)] font-semibold">NI Attributable to Parent...XXX</div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">NCI and Goodwill</h3>
            <p className="text-[var(--muted)]">
              Under current U.S. GAAP, NCI is measured at <strong>fair value</strong> at acquisition date. This means
              goodwill is calculated on a &quot;full goodwill&quot; basis - both the parent&apos;s and NCI&apos;s share of goodwill
              are recognized. (Note: IFRS allows either full goodwill or proportionate share method.)
            </p>
          </div>
        </section>

        {/* Intercompany Transactions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Intercompany Transactions</h2>
          <p className="text-[var(--muted)] mb-6">
            Intercompany transactions must be eliminated to avoid double-counting revenues, expenses, assets,
            and liabilities in the consolidated financial statements.
          </p>

          <div className="space-y-6">
            {/* Intercompany Sales */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Intercompany Sales (Inventory)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-[var(--foreground)] mb-2">Eliminate Sales/COGS</h4>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                    <div>Dr. Sales.............XXX</div>
                    <div className="ml-4">Cr. COGS............XXX</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)] mb-2">Eliminate Unrealized Profit</h4>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                    <div>Dr. COGS..............XXX</div>
                    <div className="ml-4">Cr. Inventory.......XXX</div>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-2">
                    (For inventory still on hand at year-end)
                  </p>
                </div>
              </div>
            </div>

            {/* Fixed Asset Transfers */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Intercompany Fixed Asset Transfers</h3>
              <p className="text-[var(--muted)] mb-4">
                When one company sells a fixed asset to an affiliate at a gain, the gain must be eliminated
                and recognized over the asset&apos;s remaining useful life through depreciation adjustments.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-[var(--foreground)] mb-2">Eliminate Gain on Sale</h4>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                    <div>Dr. Gain on Sale........XXX</div>
                    <div className="ml-4">Cr. Equipment.........XXX</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)] mb-2">Adjust Depreciation</h4>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                    <div>Dr. Accum. Depr.........XXX</div>
                    <div className="ml-4">Cr. Depr. Expense.....XXX</div>
                  </div>
                  <p className="text-xs text-[var(--muted)] mt-2">
                    (Reduces excess depreciation from inflated asset basis)
                  </p>
                </div>
              </div>
            </div>

            {/* Intercompany Debt */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Intercompany Debt</h3>
              <p className="text-[var(--muted)] mb-4">
                Receivables and payables between consolidated entities must be eliminated.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                <div>Dr. Accounts Payable (to Parent).......XXX</div>
                <div className="ml-4">Cr. Accounts Receivable (from Sub)....XXX</div>
                <div className="mt-2">Dr. Interest Revenue....................XXX</div>
                <div className="ml-4">Cr. Interest Expense...................XXX</div>
              </div>
            </div>
          </div>
        </section>

        {/* Upstream vs Downstream */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Upstream vs. Downstream Transactions</h2>
          <p className="text-[var(--muted)] mb-6">
            The direction of an intercompany sale affects how unrealized profit is allocated between the
            controlling and noncontrolling interests.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">↓</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Downstream</h3>
              </div>
              <p className="text-[var(--muted)] mb-3">
                <strong>Parent sells to Subsidiary</strong>
              </p>
              <ul className="text-sm text-[var(--muted)] space-y-2">
                <li>• 100% of unrealized profit attributable to parent</li>
                <li>• NCI is not affected by elimination</li>
                <li>• Eliminates against parent&apos;s share only</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-green-600">↑</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Upstream</h3>
              </div>
              <p className="text-[var(--muted)] mb-3">
                <strong>Subsidiary sells to Parent</strong>
              </p>
              <ul className="text-sm text-[var(--muted)] space-y-2">
                <li>• Unrealized profit is split between parent and NCI</li>
                <li>• Based on ownership percentages</li>
                <li>• Affects both controlling and NCI share of income</li>
              </ul>
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
                  <span>The &quot;SAID&quot; elimination entries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>NCI calculation and presentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Goodwill calculation (full goodwill method)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Intercompany elimination for inventory, fixed assets, debt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Upstream vs. downstream transaction treatment</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Common Exam Traps</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Forgetting to eliminate intercompany transactions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Not adjusting for FV differences at acquisition</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Confusing upstream and downstream profit allocation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Forgetting to depreciate/amortize FV adjustments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Putting NCI in the wrong section of the balance sheet</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Topics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Related FAR Topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/topics/far/lease-accounting"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Lease Accounting</h3>
              <p className="text-sm text-[var(--muted)]">
                ASC 842 classification and recognition
              </p>
            </Link>
            <Link
              href="/topics/far/revenue-recognition"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Revenue Recognition</h3>
              <p className="text-sm text-[var(--muted)]">
                ASC 606 five-step model
              </p>
            </Link>
            <Link
              href="/sections/far"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">FAR Section Guide</h3>
              <p className="text-sm text-[var(--muted)]">
                Complete overview of the FAR exam section
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Practice Consolidation Questions</h2>
            <p className="text-gray-200 mb-6">
              Apply what you&apos;ve learned with practice MCQs and simulations covering elimination entries,
              NCI calculations, and intercompany transactions.
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
