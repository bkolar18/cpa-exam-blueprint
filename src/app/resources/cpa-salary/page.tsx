import Link from 'next/link';
import { Metadata } from 'next';
import { stateSalaries, formatSalary } from '@/data/state-salaries';

export const metadata: Metadata = {
  title: 'CPA Salary by State 2026 | Complete Salary Guide | Meridian CPA Review',
  description: 'Compare CPA salaries across all 50 states. Find average salaries, entry-level to partner pay ranges, cost of living adjustments, and job outlook for CPAs.',
  keywords: 'CPA salary by state, accountant salary comparison, CPA pay, CPA compensation, accountant wages',
};

// Sort states by average salary for the top earners section
const topPayingStates = [...stateSalaries].sort((a, b) => b.averageSalary - a.averageSalary).slice(0, 10);
const lowestCostStates = [...stateSalaries].sort((a, b) => a.costOfLivingIndex - b.costOfLivingIndex).slice(0, 10);

export default function CPASalaryIndexPage() {
  const nationalAverage = 82000;

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <span>/</span>
            <span>CPA Salaries by State</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CPA Salary by State
            </h1>
            <p className="text-xl text-gray-200">
              Compare CPA salaries, cost of living, and job outlook across all 50 states
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Data Sources:</strong> Salary estimates are compiled from Bureau of Labor Statistics (BLS),
            Robert Half Salary Guide, AICPA surveys, and industry reports. Figures are approximate and actual
            compensation varies based on experience, employer, specific location, and market conditions.
          </p>
        </div>

        {/* Key Stats */}
        <section className="mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 text-center">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {formatSalary(nationalAverage)}
              </div>
              <div className="text-sm text-[var(--muted)]">National Average</div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {formatSalary(topPayingStates[0].averageSalary)}
              </div>
              <div className="text-sm text-[var(--muted)]">Highest Paying State</div>
              <div className="text-xs text-[var(--primary)]">{topPayingStates[0].state}</div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 text-center">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                5%
              </div>
              <div className="text-sm text-[var(--muted)]">Average Job Growth</div>
              <div className="text-xs text-[var(--muted)]">(next 10 years)</div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 text-center">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                670K+
              </div>
              <div className="text-sm text-[var(--muted)]">Licensed CPAs</div>
              <div className="text-xs text-[var(--muted)]">in the United States</div>
            </div>
          </div>
        </section>

        {/* Top Paying States */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Top 10 Highest Paying States for CPAs
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">Rank</th>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">State</th>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">Avg. Salary</th>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">COL Index</th>
                  <th className="px-4 py-3 text-left font-semibold text-[var(--foreground)]">Job Growth</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {topPayingStates.map((state, index) => (
                  <tr key={state.slug} className={index % 2 === 1 ? 'bg-gray-50/50 dark:bg-gray-800/30' : ''}>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold
                        ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                          index === 1 ? 'bg-gray-200 text-gray-700' :
                          index === 2 ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-600'}`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--foreground)]">{state.state}</td>
                    <td className="px-4 py-3 font-semibold text-green-600">{formatSalary(state.averageSalary)}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{state.costOfLivingIndex}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{state.jobGrowth}</td>
                    <td className="px-4 py-3">
                      <Link href={`/resources/cpa-salary/${state.slug}`} className="text-[var(--primary)] hover:underline text-sm">
                        Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Best Value States */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Best Value: High Salary + Low Cost of Living
          </h2>
          <p className="text-[var(--muted)] mb-6">
            These states offer strong CPA salaries relative to their cost of living, providing excellent purchasing power.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {lowestCostStates
              .filter(s => s.averageSalary > 70000)
              .slice(0, 5)
              .map((state) => (
                <Link
                  key={state.slug}
                  href={`/resources/cpa-salary/${state.slug}`}
                  className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors"
                >
                  <div className="text-lg font-bold text-[var(--foreground)] mb-1">{state.state}</div>
                  <div className="text-sm text-[var(--muted)] mb-2">COL: {state.costOfLivingIndex}</div>
                  <div className="text-lg font-semibold text-green-600">{formatSalary(state.averageSalary)}</div>
                  <div className="text-xs text-[var(--muted)] mt-1">
                    Adjusted: {formatSalary(Math.round(state.averageSalary * (100 / state.costOfLivingIndex)))}
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* All States */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            CPA Salary by State - Complete List
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stateSalaries.map((state) => {
              const diff = state.averageSalary - nationalAverage;
              const diffPercent = ((diff / nationalAverage) * 100).toFixed(0);
              return (
                <Link
                  key={state.slug}
                  href={`/resources/cpa-salary/${state.slug}`}
                  className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-[var(--foreground)]">{state.state}</div>
                      <div className="text-xs text-[var(--muted)]">{state.abbreviation}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[var(--primary)]">{formatSalary(state.averageSalary)}</div>
                      <div className={`text-xs ${diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {diff >= 0 ? '+' : ''}{diffPercent}%
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-[var(--muted)]">
                    <span>COL: {state.costOfLivingIndex}</span>
                    <span>Growth: {state.jobGrowth}</span>
                    <span>{state.cpaCount.toLocaleString()} CPAs</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Factors Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Factors Affecting CPA Salary
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Experience Level</h3>
              <p className="text-[var(--muted)] text-sm">
                CPAs with 10+ years of experience can earn 2-3x more than entry-level accountants.
                Partner-level compensation can exceed $300,000 in major markets.
              </p>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Industry & Employer</h3>
              <p className="text-[var(--muted)] text-sm">
                Big 4 firms typically pay premium salaries. Finance, technology, and pharmaceutical
                industries often offer higher compensation than average.
              </p>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Specialization</h3>
              <p className="text-[var(--muted)] text-sm">
                CPAs with specialized skills in forensic accounting, international tax, or IT audit
                command higher salaries than generalists.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Become a CPA?</h2>
            <p className="text-gray-200 mb-6">
              Start your journey to a rewarding CPA career. Get free access to practice questions
              and exam preparation tools.
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
