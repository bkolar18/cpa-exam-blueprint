import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Partnership Taxation for CPA Exam | Formation, Allocations & Distributions | Meridian CPA Review',
  description: 'Master partnership taxation for the CPA exam. Learn partnership formation, basis calculations, special allocations, distributions, and liquidations under Subchapter K.',
  keywords: 'partnership taxation CPA exam, Subchapter K, partnership basis, special allocations, partnership distributions, 704(b)',
};

const baseUrl = "https://meridiancpareview.com";

export default function PartnershipTaxationPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "REG", url: `${baseUrl}/sections/reg` },
          { name: "Partnership Taxation", url: `${baseUrl}/topics/reg/partnership-taxation` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <span>/</span>
            <Link href="/sections/reg" className="hover:text-white">REG</Link>
            <span>/</span>
            <span>Partnership Taxation</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Partnership Taxation
            </h1>
            <p className="text-xl text-gray-200">
              Understanding Subchapter K: Formation, operations, distributions, and liquidations
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why It Matters */}
        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">Why Partnership Taxation Matters on the CPA Exam</h2>
            <p className="text-[var(--muted)]">
              Partnership taxation (Subchapter K) is heavily tested on the REG section. Understanding the pass-through nature
              of partnerships, basis calculations, and the treatment of distributions is essential. The exam frequently tests
              formation transactions, basis adjustments, and the difference between current and liquidating distributions.
            </p>
          </div>
        </section>

        {/* Key Concepts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Partnership Fundamentals</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Pass-Through Taxation</h3>
              <p className="text-[var(--muted)] mb-4">
                Partnerships are not taxed at the entity level. Income, deductions, gains, losses, and credits
                &quot;pass through&quot; to partners and are reported on their individual returns.
              </p>
              <ul className="text-sm text-[var(--muted)] space-y-2">
                <li>• Partnership files Form 1065 (informational return)</li>
                <li>• Partners receive Schedule K-1</li>
                <li>• Partners report their share on personal returns</li>
                <li>• Character of items is preserved (e.g., capital gains remain capital gains)</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">What Is a Partnership?</h3>
              <p className="text-[var(--muted)] mb-4">
                For tax purposes, a partnership includes any unincorporated entity with two or more members
                that is not classified as a corporation.
              </p>
              <ul className="text-sm text-[var(--muted)] space-y-2">
                <li>• General partnerships</li>
                <li>• Limited partnerships (LPs)</li>
                <li>• Limited liability partnerships (LLPs)</li>
                <li>• Limited liability companies (LLCs) with 2+ members (default)</li>
                <li>• Joint ventures</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Formation */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Partnership Formation</h2>
          <p className="text-[var(--muted)] mb-6">
            Under IRC §721, no gain or loss is generally recognized when property is contributed to a partnership
            in exchange for a partnership interest. This is similar to the §351 rule for corporations.
          </p>

          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 mb-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Contribution of Property</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-2">Partner&apos;s Outside Basis</h4>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <ul className="text-sm text-[var(--muted)] space-y-1">
                    <li>= Adjusted basis of property contributed</li>
                    <li>+ Cash contributed</li>
                    <li>+ Partner&apos;s share of partnership liabilities</li>
                    <li>− Liabilities assumed by partnership</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-2">Partnership&apos;s Inside Basis</h4>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <ul className="text-sm text-[var(--muted)] space-y-1">
                    <li>= Carryover basis from contributing partner</li>
                    <li>(Partner&apos;s adjusted basis in property)</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Exception: Gain Recognition on Formation</h3>
            <p className="text-[var(--muted)] mb-3">
              A partner may recognize gain if the liabilities assumed by the partnership exceed the partner&apos;s
              basis in contributed property:
            </p>
            <div className="bg-white dark:bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm font-mono text-[var(--foreground)]">
                Gain = Liabilities relieved − Adjusted basis of property contributed
              </p>
            </div>
            <p className="text-sm text-[var(--muted)] mt-3">
              This gain is typically capital gain (if the property was a capital asset) and increases the partner&apos;s basis.
            </p>
          </div>
        </section>

        {/* Partner&apos;s Basis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Partner&apos;s Outside Basis</h2>
          <p className="text-[var(--muted)] mb-6">
            The partner&apos;s outside basis is crucial for determining the tax consequences of distributions,
            the deductibility of losses, and gain on disposition of the partnership interest.
          </p>

          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 mb-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Basis Adjustments</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-green-600 dark:text-green-400 mb-2">Increases to Basis</h4>
                <ul className="text-sm text-[var(--muted)] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">+</span>
                    <span>Partner&apos;s share of partnership income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">+</span>
                    <span>Partner&apos;s share of tax-exempt income</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">+</span>
                    <span>Additional contributions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">+</span>
                    <span>Increase in share of partnership liabilities</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-red-600 dark:text-red-400 mb-2">Decreases to Basis</h4>
                <ul className="text-sm text-[var(--muted)] space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">−</span>
                    <span>Partner&apos;s share of partnership losses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">−</span>
                    <span>Partner&apos;s share of nondeductible expenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">−</span>
                    <span>Distributions received</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600">−</span>
                    <span>Decrease in share of partnership liabilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Key Point: Order of Adjustments</h3>
            <p className="text-[var(--muted)]">
              For year-end calculations, basis is increased by income items <strong>before</strong> being
              decreased by losses and distributions. This ordering can affect whether a partner can deduct
              current-year losses.
            </p>
          </div>
        </section>

        {/* Allocations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Partnership Allocations</h2>
          <p className="text-[var(--muted)] mb-6">
            Partners can agree to allocate income, gain, loss, and deductions differently than their
            ownership percentages (special allocations), but these allocations must have &quot;substantial
            economic effect&quot; under §704(b).
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Substantial Economic Effect</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                An allocation has substantial economic effect if it affects the dollar amounts received
                by partners independent of tax consequences.
              </p>
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Economic Effect:</h4>
                  <ul className="text-xs text-[var(--muted)] space-y-1 mt-1">
                    <li>• Capital accounts maintained properly</li>
                    <li>• Liquidating distributions per capital accounts</li>
                    <li>• Deficit restoration obligation (or qualified income offset)</li>
                  </ul>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Substantiality:</h4>
                  <ul className="text-xs text-[var(--muted)] space-y-1 mt-1">
                    <li>• Reasonable possibility allocation affects amounts</li>
                    <li>• Not shifting or transitory allocations</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Contributed Property: §704(c)</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                When property is contributed with built-in gain or loss, the tax consequences
                must be allocated to the contributing partner.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-medium text-[var(--foreground)] text-sm mb-2">Example:</h4>
                <p className="text-xs text-[var(--muted)]">
                  Partner A contributes land with FMV of $100,000 and basis of $40,000.
                  If partnership later sells for $100,000, the $60,000 built-in gain is allocated
                  entirely to Partner A (not shared with other partners).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Distributions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Partnership Distributions</h2>
          <p className="text-[var(--muted)] mb-6">
            The tax treatment of distributions depends on whether they are current (operating) distributions
            or liquidating distributions, and whether cash or property is distributed.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-[var(--border)] p-3 text-left">Type</th>
                  <th className="border border-[var(--border)] p-3 text-left">Gain Recognition</th>
                  <th className="border border-[var(--border)] p-3 text-left">Loss Recognition</th>
                  <th className="border border-[var(--border)] p-3 text-left">Basis of Property Received</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[var(--border)] p-3 font-semibold">Current Distribution</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Only if cash exceeds outside basis
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    <span className="text-red-600 font-semibold">Never</span>
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Lesser of partnership&apos;s basis OR partner&apos;s remaining outside basis
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-[var(--border)] p-3 font-semibold">Liquidating Distribution</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Only if cash exceeds outside basis
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Only if ONLY cash, inventory, and unrealized receivables are distributed
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Partner&apos;s remaining outside basis (basis is allocated)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Current Distribution Example</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                Partner has $50,000 outside basis. Partnership distributes land with inside basis of $30,000
                and FMV of $45,000.
              </p>
              <ul className="text-sm text-[var(--muted)] space-y-1">
                <li>• Gain recognized: <strong>$0</strong></li>
                <li>• Partner&apos;s basis in land: <strong>$30,000</strong> (carryover)</li>
                <li>• Partner&apos;s remaining outside basis: <strong>$20,000</strong></li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Liquidating Distribution Example</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                Partner has $50,000 outside basis. Partnership distributes land with inside basis of $30,000
                and FMV of $45,000 in complete liquidation.
              </p>
              <ul className="text-sm text-[var(--muted)] space-y-1">
                <li>• Gain recognized: <strong>$0</strong></li>
                <li>• Partner&apos;s basis in land: <strong>$50,000</strong> (substituted basis)</li>
                <li>• Partner&apos;s remaining outside basis: <strong>$0</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Hot Assets */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Hot Assets (§751)</h2>
          <p className="text-[var(--muted)] mb-6">
            &quot;Hot assets&quot; receive special treatment to prevent converting ordinary income into capital gain.
            The two categories of hot assets are unrealized receivables and substantially appreciated inventory.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Unrealized Receivables</h3>
              <ul className="text-sm text-[var(--muted)] space-y-2">
                <li>• Accounts receivable (cash method)</li>
                <li>• Services performed but not billed</li>
                <li>• Depreciation recapture potential</li>
                <li>• Certain other recapture items</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Substantially Appreciated Inventory</h3>
              <p className="text-sm text-[var(--muted)] mb-3">
                Inventory is substantially appreciated if its FMV exceeds 120% of its adjusted basis.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <p className="text-sm font-mono">FMV of inventory &gt; 120% × Basis</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Impact on Sales and Distributions</h3>
            <p className="text-[var(--muted)]">
              When a partner sells their partnership interest or receives certain distributions, the portion
              of gain attributable to hot assets is treated as ordinary income, not capital gain. This prevents
              partners from converting the partnership&apos;s ordinary income items into capital gain.
            </p>
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
                  <span>Outside basis calculation and adjustments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Formation rules under §721</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Current vs. liquidating distribution rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Treatment of liabilities (recourse vs. nonrecourse)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Hot asset definitions and impact</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Common Exam Traps</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Forgetting that losses cannot exceed basis (loss limitation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Mixing up current and liquidating distribution basis rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Forgetting to add liabilities to basis on formation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Ignoring §704(c) built-in gain allocations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Thinking losses can be recognized on current distributions</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Topics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Related REG Topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/topics/reg/basis-calculations"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Basis Calculations</h3>
              <p className="text-sm text-[var(--muted)]">
                Cost, gift, and inherited basis rules
              </p>
            </Link>
            <Link
              href="/topics/reg/like-kind-exchanges"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Like-Kind Exchanges</h3>
              <p className="text-sm text-[var(--muted)]">
                Section 1031 nonrecognition rules
              </p>
            </Link>
            <Link
              href="/sections/reg"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">REG Section Guide</h3>
              <p className="text-sm text-[var(--muted)]">
                Complete overview of the REG exam section
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Practice Partnership Tax Questions</h2>
            <p className="text-gray-200 mb-6">
              Apply what you&apos;ve learned with practice MCQs and simulations covering partnership formation,
              basis calculations, distributions, and hot assets.
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
