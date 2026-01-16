import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Government Accounting for CPA Exam | Fund Accounting & GASB | Meridian CPA Review',
  description: 'Master government accounting for the CPA exam. Learn fund accounting, modified accrual basis, GASB standards, government-wide vs. fund financial statements.',
  keywords: 'government accounting CPA exam, fund accounting, GASB, modified accrual, governmental funds, proprietary funds',
};

export default function GovernmentAccountingPage() {
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
            <span>Government Accounting</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Government Accounting
            </h1>
            <p className="text-xl text-gray-200">
              Understanding fund accounting, measurement focus, and GASB reporting requirements
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why It Matters */}
        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">Why Government Accounting Matters on the CPA Exam</h2>
            <p className="text-[var(--muted)]">
              Government accounting is a significant portion of the FAR exam. You&apos;ll need to understand fund
              structures, measurement focus, basis of accounting differences, and how to prepare both fund and
              government-wide financial statements. This topic requires learning terminology and concepts that
              differ substantially from commercial GAAP.
            </p>
          </div>
        </section>

        {/* Fund Structure */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Fund Structure Overview</h2>
          <p className="text-[var(--muted)] mb-6">
            Governments use fund accounting to track resources restricted for specific purposes. There are three
            main categories of funds, each with different purposes and accounting treatments.
          </p>

          <div className="space-y-6">
            {/* Governmental Funds */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">G</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">Governmental Funds</h3>
                  <p className="text-sm text-[var(--muted)]">Modified accrual basis | Current financial resources</p>
                </div>
              </div>
              <div className="grid md:grid-cols-5 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">General Fund</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Main operating fund; accounts for all resources not in other funds
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Special Revenue</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Resources restricted for specific purposes (grants, gas tax)
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Debt Service</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Principal and interest payments on long-term debt
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Capital Projects</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Major capital asset acquisition or construction
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Permanent</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Resources where principal must remain intact (endowments)
                  </p>
                </div>
              </div>
            </div>

            {/* Proprietary Funds */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold">P</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">Proprietary Funds</h3>
                  <p className="text-sm text-[var(--muted)]">Full accrual basis | Economic resources</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Enterprise Funds</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Business-type activities financed by user charges (utilities, airports, parking)
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Internal Service Funds</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Services provided to other departments (motor pool, IT, printing)
                  </p>
                </div>
              </div>
            </div>

            {/* Fiduciary Funds */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">F</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)]">Fiduciary Funds</h3>
                  <p className="text-sm text-[var(--muted)]">Full accrual basis | Economic resources</p>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Pension Trust</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Employee retirement benefits
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Investment Trust</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    External investment pool participants
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Private-Purpose Trust</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Benefits individuals, organizations
                  </p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                  <h4 className="font-medium text-[var(--foreground)] text-sm">Custodial</h4>
                  <p className="text-xs text-[var(--muted)] mt-1">
                    Assets held temporarily for others
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fund Mnemonic */}
          <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Memory Aid: &quot;GRaSPP&quot; for Governmental Funds</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm text-center">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">G</span>
                <div className="text-xs text-[var(--muted)]">General</div>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm text-center">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">R</span>
                <div className="text-xs text-[var(--muted)]">special Revenue</div>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm text-center">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">S</span>
                <div className="text-xs text-[var(--muted)]">debt Service</div>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm text-center">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">P</span>
                <div className="text-xs text-[var(--muted)]">capital Projects</div>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm text-center">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">P</span>
                <div className="text-xs text-[var(--muted)]">Permanent</div>
              </div>
            </div>
          </div>
        </section>

        {/* Measurement Focus & Basis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Measurement Focus & Basis of Accounting</h2>
          <p className="text-[var(--muted)] mb-6">
            One of the most important concepts in government accounting is understanding the different measurement
            focuses and bases of accounting used for different fund types and financial statements.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-[var(--border)] p-3 text-left">Fund Type / Statement</th>
                  <th className="border border-[var(--border)] p-3 text-left">Measurement Focus</th>
                  <th className="border border-[var(--border)] p-3 text-left">Basis of Accounting</th>
                  <th className="border border-[var(--border)] p-3 text-left">Reports</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[var(--border)] p-3 font-semibold">Governmental Funds</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    <strong>Current financial resources</strong>
                    <p className="text-xs mt-1">(What&apos;s available to spend)</p>
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    <strong>Modified accrual</strong>
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Balance sheet; Statement of Revenues, Expenditures, and Changes in Fund Balances
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-[var(--border)] p-3 font-semibold">Proprietary Funds</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    <strong>Economic resources</strong>
                    <p className="text-xs mt-1">(All assets and liabilities)</p>
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    <strong>Full accrual</strong>
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Statement of Net Position; Statement of Revenues, Expenses, and Changes in Net Position; Statement of Cash Flows
                  </td>
                </tr>
                <tr>
                  <td className="border border-[var(--border)] p-3 font-semibold">Fiduciary Funds</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    <strong>Economic resources</strong>
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    <strong>Full accrual</strong>
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Statement of Fiduciary Net Position; Statement of Changes in Fiduciary Net Position
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-[var(--border)] p-3 font-semibold">Government-Wide Statements</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    <strong>Economic resources</strong>
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    <strong>Full accrual</strong>
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Statement of Net Position; Statement of Activities
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Key Point: Modified Accrual</h3>
            <p className="text-[var(--muted)] mb-3">
              Under modified accrual (governmental funds):
            </p>
            <ul className="text-sm text-[var(--muted)] space-y-1">
              <li>• <strong>Revenues</strong> are recognized when <em>measurable</em> and <em>available</em>
                (collectible within current period or soon enough to pay current liabilities, typically 60 days)</li>
              <li>• <strong>Expenditures</strong> are recognized when the related liability is incurred</li>
              <li>• <strong>Capital assets and long-term debt</strong> are NOT reported (only current assets/liabilities)</li>
            </ul>
          </div>
        </section>

        {/* Government-Wide Statements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Government-Wide Financial Statements</h2>
          <p className="text-[var(--muted)] mb-6">
            Government-wide statements present the entire government as a single entity, similar to commercial
            financial statements. They use full accrual accounting and report all assets and liabilities.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Statement of Net Position</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                Reports all assets, deferred outflows, liabilities, deferred inflows, and net position.
                Separated into governmental and business-type activities.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-medium text-[var(--foreground)] text-sm mb-2">Net Position Categories:</h4>
                <ul className="text-xs text-[var(--muted)] space-y-1">
                  <li>• <strong>Net Investment in Capital Assets</strong> - Capital assets less related debt</li>
                  <li>• <strong>Restricted</strong> - Subject to external or constitutional constraints</li>
                  <li>• <strong>Unrestricted</strong> - All other net position</li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Statement of Activities</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                Reports revenues and expenses in a unique format that shows the &quot;net cost&quot; of each function/program.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <h4 className="font-medium text-[var(--foreground)] text-sm mb-2">Format:</h4>
                <div className="text-xs text-[var(--muted)] space-y-1">
                  <div>Expenses (by function)</div>
                  <div className="ml-4">− Program revenues:</div>
                  <div className="ml-8">• Charges for services</div>
                  <div className="ml-8">• Operating grants</div>
                  <div className="ml-8">• Capital grants</div>
                  <div>= Net (Expense) Revenue</div>
                  <div className="mt-2">+ General revenues</div>
                  <div>= Change in Net Position</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conversion from Fund to Government-Wide */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Fund to Government-Wide Conversion</h2>
          <p className="text-[var(--muted)] mb-6">
            Converting governmental fund statements to government-wide statements requires several adjustments
            to go from modified accrual to full accrual basis.
          </p>

          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Common Conversion Adjustments</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-green-700 dark:text-green-400 text-sm">Add to Net Position:</h4>
                  <ul className="text-xs text-[var(--muted)] space-y-1 mt-2">
                    <li>+ Capital assets (net of accumulated depreciation)</li>
                    <li>+ Long-term receivables (not &quot;available&quot;)</li>
                    <li>+ Internal service fund net position</li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <h4 className="font-medium text-red-700 dark:text-red-400 text-sm">Subtract from Net Position:</h4>
                  <ul className="text-xs text-[var(--muted)] space-y-1 mt-2">
                    <li>− Long-term liabilities (bonds, compensated absences, pensions)</li>
                    <li>− Accrued interest on long-term debt</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <h4 className="font-medium text-[var(--foreground)] text-sm mb-2">Operating Statement Adjustments:</h4>
              <ul className="text-xs text-[var(--muted)] space-y-1">
                <li>• Capital outlay expenditures → Capitalize as assets</li>
                <li>• Add depreciation expense</li>
                <li>• Debt principal payments → Remove (not an expense)</li>
                <li>• Bond proceeds → Remove (not revenue)</li>
                <li>• Accrued interest → Recognize expense</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fund Balance */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Fund Balance Classifications</h2>
          <p className="text-[var(--muted)] mb-6">
            GASB 54 requires governmental funds to classify fund balance into five categories based on the
            extent to which the government is bound to honor constraints on specific purposes.
          </p>

          <div className="space-y-4">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded flex items-center justify-center text-red-600 font-bold text-sm">N</div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Nonspendable</h4>
                  <p className="text-sm text-[var(--muted)]">Not in spendable form or legally required to be maintained intact (inventory, prepaid items, permanent fund principal)</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded flex items-center justify-center text-orange-600 font-bold text-sm">R</div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Restricted</h4>
                  <p className="text-sm text-[var(--muted)]">Constraints imposed by external parties (creditors, grantors, laws) or by constitution</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900/30 rounded flex items-center justify-center text-yellow-600 font-bold text-sm">C</div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Committed</h4>
                  <p className="text-sm text-[var(--muted)]">Constraints imposed by government&apos;s highest level of decision-making authority (requires formal action to remove)</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center text-green-600 font-bold text-sm">A</div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Assigned</h4>
                  <p className="text-sm text-[var(--muted)]">Intended for specific purpose by government body or official (easier to change than committed)</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center text-blue-600 font-bold text-sm">U</div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Unassigned</h4>
                  <p className="text-sm text-[var(--muted)]">Residual classification for general fund only (or deficit in other governmental funds)</p>
                </div>
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
                  <span>Fund types and their purposes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Modified accrual vs. full accrual differences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Current vs. economic resources focus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Fund balance classifications (GASB 54)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Conversion adjustments for government-wide statements</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Common Exam Traps</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Recording capital assets in governmental fund statements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Recording long-term debt in governmental fund statements</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Confusing &quot;expenditures&quot; (fund) with &quot;expenses&quot; (government-wide)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Applying commercial GAAP revenue recognition to government</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Including fiduciary funds in government-wide statements</span>
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
              href="/topics/far/nonprofit-accounting"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Nonprofit Accounting</h3>
              <p className="text-sm text-[var(--muted)]">
                Net asset classifications and NFP reporting
              </p>
            </Link>
            <Link
              href="/topics/far/consolidations"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Consolidations</h3>
              <p className="text-sm text-[var(--muted)]">
                Elimination entries and NCI
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
            <h2 className="text-2xl font-bold mb-4">Practice Government Accounting Questions</h2>
            <p className="text-gray-200 mb-6">
              Apply what you&apos;ve learned with practice MCQs and simulations covering fund accounting,
              measurement focus, and government-wide conversion.
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
