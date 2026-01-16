import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nonprofit Accounting for CPA Exam | Net Assets & Contributions | Meridian CPA Review',
  description: 'Master nonprofit accounting for the CPA exam. Learn net asset classifications, contribution recognition, donor restrictions, and NFP financial statement presentation.',
  keywords: 'nonprofit accounting CPA exam, net asset classifications, contribution accounting, donor restrictions, NFP financial statements',
};

export default function NonprofitAccountingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <span>/</span>
            <Link href="/sections/far" className="hover:text-white">FAR</Link>
            <span>/</span>
            <span>Nonprofit Accounting</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nonprofit Accounting
            </h1>
            <p className="text-xl text-gray-200">
              Understanding net asset classifications, contributions, and nonprofit financial statements
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why It Matters */}
        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">Why Nonprofit Accounting Matters on the CPA Exam</h2>
            <p className="text-[var(--muted)]">
              Nonprofit accounting is tested on the FAR section along with government accounting. You&apos;ll need to understand
              the unique net asset classifications, how to recognize and classify contributions, and the specific financial
              statements required for not-for-profit organizations. These concepts differ significantly from commercial GAAP.
            </p>
          </div>
        </section>

        {/* Key Differences */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">NFP vs. For-Profit Accounting</h2>
          <p className="text-[var(--muted)] mb-6">
            While nonprofits follow GAAP, several key differences exist in terminology, classification, and reporting.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-[var(--border)] p-3 text-left">Concept</th>
                  <th className="border border-[var(--border)] p-3 text-left">For-Profit</th>
                  <th className="border border-[var(--border)] p-3 text-left">Not-for-Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[var(--border)] p-3 font-semibold">Equity</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">Stockholders&apos; Equity</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">Net Assets</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-[var(--border)] p-3 font-semibold">Bottom Line</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">Net Income</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">Change in Net Assets</td>
                </tr>
                <tr>
                  <td className="border border-[var(--border)] p-3 font-semibold">Primary Revenue</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">Sales, Services</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">Contributions, Grants, Program Service Fees</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-[var(--border)] p-3 font-semibold">Financial Statements</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">Balance Sheet, Income Statement</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">Statement of Financial Position, Statement of Activities</td>
                </tr>
                <tr>
                  <td className="border border-[var(--border)] p-3 font-semibold">Basis of Accounting</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">Full Accrual</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">Full Accrual</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Net Asset Classifications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Net Asset Classifications</h2>
          <p className="text-[var(--muted)] mb-6">
            Under ASU 2016-14, nonprofit organizations classify net assets into two categories based on the
            presence or absence of donor-imposed restrictions. This replaced the previous three-category system.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">Without Donor Restrictions</h3>
              </div>
              <p className="text-[var(--muted)] mb-4">
                Resources available for any purpose the organization chooses. Previously called &quot;unrestricted.&quot;
              </p>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h4 className="font-medium text-[var(--foreground)] text-sm mb-2">Includes:</h4>
                <ul className="text-xs text-[var(--muted)] space-y-1">
                  <li>• Unrestricted contributions</li>
                  <li>• Investment income (unless restricted)</li>
                  <li>• Program service revenue</li>
                  <li>• Released restrictions (when conditions met)</li>
                  <li>• Board-designated funds (NOT donor restricted)</li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">With Donor Restrictions</h3>
              </div>
              <p className="text-[var(--muted)] mb-4">
                Resources subject to donor-imposed restrictions that limit use. Combines former &quot;temporarily&quot;
                and &quot;permanently&quot; restricted categories.
              </p>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                <h4 className="font-medium text-[var(--foreground)] text-sm mb-2">Types of Restrictions:</h4>
                <ul className="text-xs text-[var(--muted)] space-y-1">
                  <li>• <strong>Purpose restrictions:</strong> Must be used for specific purpose</li>
                  <li>• <strong>Time restrictions:</strong> Cannot be used until future period</li>
                  <li>• <strong>Perpetual restrictions:</strong> Principal must be maintained forever (endowments)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Key Point: Board Designations</h3>
            <p className="text-[var(--muted)]">
              <strong>Board-designated</strong> funds are NOT donor restricted. Even if the board sets aside funds
              for a specific purpose, these remain &quot;without donor restrictions&quot; because the board can change
              its mind at any time. Only <strong>external</strong> parties (donors, grantors, laws) can create restrictions.
            </p>
          </div>
        </section>

        {/* Contribution Recognition */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Contribution Recognition</h2>
          <p className="text-[var(--muted)] mb-6">
            Contributions are recognized when an unconditional promise to give is received, measured at fair value.
            Understanding the difference between conditional and unconditional promises is crucial.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Unconditional Promises</h3>
              <div className="space-y-3">
                <p className="text-[var(--muted)] text-sm">
                  Recognized immediately at fair value when the promise is made.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-[var(--foreground)] text-sm mb-2">Example:</h4>
                  <p className="text-xs text-[var(--muted)]">
                    &quot;I promise to give $10,000 to support your programs.&quot;
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 font-mono text-xs">
                  <div>Dr. Pledge Receivable.........10,000</div>
                  <div className="ml-4">Cr. Contribution Revenue.....10,000</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Conditional Promises</h3>
              <div className="space-y-3">
                <p className="text-[var(--muted)] text-sm">
                  NOT recognized until condition is met (has barrier + right of return/release).
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-[var(--foreground)] text-sm mb-2">Example:</h4>
                  <p className="text-xs text-[var(--muted)]">
                    &quot;I will give $10,000 if you raise matching funds from other donors.&quot;
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-xs text-[var(--muted)]">
                  <p>No entry until condition is met. Until then, may be disclosed in notes.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Types of Contributions */}
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Types of Contributions</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-[var(--foreground)] text-sm mb-2">Cash & Pledges</h4>
                <ul className="text-xs text-[var(--muted)] space-y-1">
                  <li>• Recognize at face value (cash)</li>
                  <li>• Present value for long-term pledges</li>
                  <li>• Allowance for uncollectible pledges</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-[var(--foreground)] text-sm mb-2">Donated Services</h4>
                <ul className="text-xs text-[var(--muted)] space-y-1">
                  <li>• Only recognize if:</li>
                  <li className="ml-2">− Creates/enhances nonfinancial asset, OR</li>
                  <li className="ml-2">− Requires specialized skills</li>
                  <li>• Measure at fair value</li>
                </ul>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium text-[var(--foreground)] text-sm mb-2">Donated Assets</h4>
                <ul className="text-xs text-[var(--muted)] space-y-1">
                  <li>• Recognize at fair value</li>
                  <li>• Securities, equipment, real estate</li>
                  <li>• Art/collections may use alternative treatment</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Release of Restrictions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Release of Restrictions</h2>
          <p className="text-[var(--muted)] mb-6">
            When donor-imposed restrictions are satisfied (purpose accomplished or time passes), the restriction
            is &quot;released&quot; and the amounts are reclassified from &quot;with donor restrictions&quot; to &quot;without donor restrictions.&quot;
          </p>

          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Release Entry</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-2">Journal Entry:</h4>
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 font-mono text-sm">
                  <div>Dr. Net Assets WITH Donor Restrictions........XXX</div>
                  <div className="ml-4">Cr. Net Assets WITHOUT Donor Restrictions...XXX</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-2">Impact on Statement of Activities:</h4>
                <ul className="text-sm text-[var(--muted)] space-y-1">
                  <li>• Decreases &quot;With Restrictions&quot; column</li>
                  <li>• Increases &quot;Without Restrictions&quot; column</li>
                  <li>• No effect on total change in net assets</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Implied Time Restriction</h3>
            <p className="text-[var(--muted)]">
              Contributions of long-lived assets (or cash to acquire them) are considered to have an implied time
              restriction unless the donor specifically states otherwise. The restriction is released over the
              asset&apos;s useful life (matched with depreciation expense).
            </p>
          </div>
        </section>

        {/* Financial Statements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">NFP Financial Statements</h2>
          <p className="text-[var(--muted)] mb-6">
            Not-for-profit organizations are required to present a complete set of financial statements including
            the following:
          </p>

          <div className="space-y-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Statement of Financial Position</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                Similar to a balance sheet, but classifies net assets by donor restrictions rather than equity components.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-sm">
                <div className="font-semibold text-[var(--foreground)]">Assets</div>
                <div className="text-[var(--muted)] ml-4">Current assets, Fixed assets, etc.</div>
                <div className="font-semibold text-[var(--foreground)] mt-2">Liabilities</div>
                <div className="text-[var(--muted)] ml-4">Current liabilities, Long-term debt, etc.</div>
                <div className="font-semibold text-[var(--foreground)] mt-2">Net Assets</div>
                <div className="text-[var(--muted)] ml-4">Without donor restrictions</div>
                <div className="text-[var(--muted)] ml-4">With donor restrictions</div>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Statement of Activities</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                Shows revenues, expenses, gains, and losses, with separate columns for net asset categories.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-sm">
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div></div>
                  <div className="text-center font-semibold">Without DR</div>
                  <div className="text-center font-semibold">With DR</div>
                  <div className="text-center font-semibold">Total</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs mt-2">
                  <div className="text-[var(--muted)]">Revenues & Support</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-[var(--muted)]">Net assets released</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">(XXX)</div>
                  <div className="text-center text-[var(--muted)]">-</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-[var(--muted)]">Expenses</div>
                  <div className="text-center text-[var(--muted)]">(XXX)</div>
                  <div className="text-center text-[var(--muted)]">-</div>
                  <div className="text-center text-[var(--muted)]">(XXX)</div>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs font-semibold border-t border-[var(--border)] pt-2 mt-2">
                  <div>Change in Net Assets</div>
                  <div className="text-center">XXX</div>
                  <div className="text-center">XXX</div>
                  <div className="text-center">XXX</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Statement of Functional Expenses</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                Required for voluntary health and welfare organizations; encouraged for all NFPs. Shows expenses
                by function AND by natural classification.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-sm">
                <div className="grid grid-cols-5 gap-2 text-xs">
                  <div></div>
                  <div className="text-center font-semibold">Program A</div>
                  <div className="text-center font-semibold">Program B</div>
                  <div className="text-center font-semibold">Mgmt & Gen</div>
                  <div className="text-center font-semibold">Fundraising</div>
                </div>
                <div className="grid grid-cols-5 gap-2 text-xs mt-2">
                  <div className="text-[var(--muted)]">Salaries</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                </div>
                <div className="grid grid-cols-5 gap-2 text-xs">
                  <div className="text-[var(--muted)]">Rent</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                </div>
                <div className="grid grid-cols-5 gap-2 text-xs">
                  <div className="text-[var(--muted)]">Supplies</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                  <div className="text-center text-[var(--muted)]">XXX</div>
                </div>
              </div>
              <p className="text-xs text-[var(--muted)] mt-3">
                <strong>Functional categories:</strong> Program services vs. Supporting services (Management & General, Fundraising)
              </p>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Statement of Cash Flows</h3>
              <p className="text-sm text-[var(--muted)]">
                Required using either direct or indirect method. NFPs may classify interest and dividends differently
                than for-profit entities (investing activities is common for NFPs).
              </p>
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
                  <span>Two net asset classifications (with/without donor restrictions)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Conditional vs. unconditional contributions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>When to recognize donated services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Release of restrictions mechanics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Statement of functional expenses format</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Common Exam Traps</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Treating board-designated funds as donor-restricted</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Recognizing all volunteer services (must meet criteria)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Recognizing conditional contributions before conditions met</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Using the old 3-category net asset system</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Reporting expenses in &quot;with restrictions&quot; column</span>
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
              href="/topics/far/government-accounting"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Government Accounting</h3>
              <p className="text-sm text-[var(--muted)]">
                Fund accounting and GASB standards
              </p>
            </Link>
            <Link
              href="/topics/far/revenue-recognition"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Revenue Recognition</h3>
              <p className="text-sm text-[var(--muted)]">
                ASC 606 for exchange transactions
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
            <h2 className="text-2xl font-bold mb-4">Practice Nonprofit Accounting Questions</h2>
            <p className="text-gray-200 mb-6">
              Apply what you&apos;ve learned with practice MCQs and simulations covering net assets,
              contributions, and nonprofit financial statements.
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
