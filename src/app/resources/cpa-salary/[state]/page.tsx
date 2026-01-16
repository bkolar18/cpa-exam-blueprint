import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { stateSalaries, getStateSalaryBySlug, formatSalary, formatSalaryRange } from '@/data/state-salaries';

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
  return stateSalaries.map((state) => ({
    state: state.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateData = getStateSalaryBySlug(stateSlug);

  if (!stateData) {
    return {
      title: 'State Not Found | Meridian CPA Review',
    };
  }

  return {
    title: `CPA Salary in ${stateData.state} ${new Date().getFullYear()} | Average Pay & Ranges | Meridian CPA Review`,
    description: `CPA salary guide for ${stateData.state}. Average salary: ${formatSalary(stateData.averageSalary)}. Entry-level to partner compensation, top industries, and job outlook for CPAs in ${stateData.abbreviation}.`,
    keywords: `CPA salary ${stateData.state}, accountant salary ${stateData.state}, ${stateData.abbreviation} CPA pay, CPA jobs ${stateData.state}`,
  };
}

export default async function StateSalaryPage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const stateData = getStateSalaryBySlug(stateSlug);

  if (!stateData) {
    notFound();
  }

  const nationalAverage = 82000;
  const salaryDiff = stateData.averageSalary - nationalAverage;
  const salaryDiffPercent = ((salaryDiff / nationalAverage) * 100).toFixed(1);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <span>/</span>
            <Link href="/resources/cpa-salary" className="hover:text-white">CPA Salaries</Link>
            <span>/</span>
            <span>{stateData.state}</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CPA Salary in {stateData.state}
            </h1>
            <p className="text-xl text-gray-200">
              Comprehensive guide to CPA compensation, job outlook, and top industries in {stateData.abbreviation}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Note:</strong> Salary data is approximate and based on publicly available sources including
            Bureau of Labor Statistics (BLS), Robert Half Salary Guide, and industry surveys. Actual compensation
            varies based on experience, certifications, employer, specific location within the state, and market conditions.
          </p>
        </div>

        {/* Key Stats */}
        <section className="mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 text-center">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {formatSalary(stateData.averageSalary)}
              </div>
              <div className="text-sm text-[var(--muted)]">Average CPA Salary</div>
              <div className={`text-xs mt-2 ${salaryDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {salaryDiff >= 0 ? '+' : ''}{salaryDiffPercent}% vs national average
              </div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 text-center">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {stateData.costOfLivingIndex}
              </div>
              <div className="text-sm text-[var(--muted)]">Cost of Living Index</div>
              <div className="text-xs text-[var(--muted)] mt-2">
                (100 = national average)
              </div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 text-center">
              <div className="text-3xl font-bold text-[var(--primary)] mb-2">
                {stateData.cpaCount.toLocaleString()}+
              </div>
              <div className="text-sm text-[var(--muted)]">Licensed CPAs</div>
              <div className="text-xs text-[var(--muted)] mt-2">
                in {stateData.state}
              </div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stateData.jobGrowth}
              </div>
              <div className="text-sm text-[var(--muted)]">Projected Job Growth</div>
              <div className="text-xs text-[var(--muted)] mt-2">
                (next 10 years)
              </div>
            </div>
          </div>
        </section>

        {/* Salary by Experience Level */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            CPA Salary by Experience Level in {stateData.state}
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-6 py-4 text-left font-semibold text-[var(--foreground)]">Experience Level</th>
                  <th className="px-6 py-4 text-left font-semibold text-[var(--foreground)]">Years</th>
                  <th className="px-6 py-4 text-left font-semibold text-[var(--foreground)]">Salary Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                <tr>
                  <td className="px-6 py-4">
                    <div className="font-medium text-[var(--foreground)]">Entry Level / Staff Accountant</div>
                    <div className="text-sm text-[var(--muted)]">CPA candidates, new CPAs</div>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted)]">0-2 years</td>
                  <td className="px-6 py-4 font-semibold text-[var(--foreground)]">
                    {formatSalaryRange(stateData.entryLevel.min, stateData.entryLevel.max)}
                  </td>
                </tr>
                <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[var(--foreground)]">Mid-Level / Senior Accountant</div>
                    <div className="text-sm text-[var(--muted)]">Experienced CPAs, team leads</div>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted)]">3-5 years</td>
                  <td className="px-6 py-4 font-semibold text-[var(--foreground)]">
                    {formatSalaryRange(stateData.midLevel.min, stateData.midLevel.max)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="font-medium text-[var(--foreground)]">Senior / Supervisor</div>
                    <div className="text-sm text-[var(--muted)]">Project leads, specialized roles</div>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted)]">5-8 years</td>
                  <td className="px-6 py-4 font-semibold text-[var(--foreground)]">
                    {formatSalaryRange(stateData.senior.min, stateData.senior.max)}
                  </td>
                </tr>
                <tr className="bg-gray-50/50 dark:bg-gray-800/30">
                  <td className="px-6 py-4">
                    <div className="font-medium text-[var(--foreground)]">Manager / Director</div>
                    <div className="text-sm text-[var(--muted)]">Department heads, practice leaders</div>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted)]">8-15 years</td>
                  <td className="px-6 py-4 font-semibold text-[var(--foreground)]">
                    {formatSalaryRange(stateData.manager.min, stateData.manager.max)}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4">
                    <div className="font-medium text-[var(--foreground)]">Partner / Principal</div>
                    <div className="text-sm text-[var(--muted)]">Firm owners, C-suite executives</div>
                  </td>
                  <td className="px-6 py-4 text-[var(--muted)]">15+ years</td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    {formatSalaryRange(stateData.partner.min, stateData.partner.max)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Cost of Living Adjusted */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Cost of Living Analysis
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Purchasing Power</h3>
              <p className="text-[var(--muted)] mb-4">
                {stateData.state}&apos;s cost of living index is <strong>{stateData.costOfLivingIndex}</strong> compared
                to the national average of 100. This means your dollar goes
                {stateData.costOfLivingIndex < 100
                  ? ` ${(((100 - stateData.costOfLivingIndex) / 100) * 100).toFixed(0)}% further`
                  : ` ${(((stateData.costOfLivingIndex - 100) / 100) * 100).toFixed(0)}% less far`}
                in {stateData.abbreviation} compared to the national average.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="text-sm text-[var(--muted)]">Adjusted Average Salary (purchasing power equivalent):</div>
                <div className="text-2xl font-bold text-[var(--primary)]">
                  {formatSalary(Math.round(stateData.averageSalary * (100 / stateData.costOfLivingIndex)))}
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Major Cities</h3>
              <p className="text-[var(--muted)] mb-4">
                Top employment areas for CPAs in {stateData.state}:
              </p>
              <div className="flex flex-wrap gap-2">
                {stateData.majorCities.map((city) => (
                  <span
                    key={city}
                    className="bg-[var(--primary)]/10 text-[var(--primary)] px-3 py-1 rounded-full text-sm"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top Industries */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Top Industries for CPAs in {stateData.state}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stateData.topIndustries.map((industry, index) => (
              <div
                key={industry}
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center">
                    <span className="text-[var(--primary)] font-bold">{index + 1}</span>
                  </div>
                  <span className="font-medium text-[var(--foreground)]">{industry}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Job Outlook */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            CPA Job Outlook in {stateData.state}
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">Growth Projection</h3>
                <p className="text-[var(--muted)]">
                  CPA employment in {stateData.state} is projected to grow by <strong>{stateData.jobGrowth}</strong> over
                  the next decade, {parseInt(stateData.jobGrowth) >= 5 ? 'outpacing' : 'on par with'} the national average.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">CPA Population</h3>
                <p className="text-[var(--muted)]">
                  {stateData.state} has approximately <strong>{stateData.cpaCount.toLocaleString()}</strong> licensed CPAs,
                  creating a {stateData.cpaCount > 20000 ? 'competitive' : 'moderate'} job market.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">Demand Drivers</h3>
                <p className="text-[var(--muted)]">
                  Strong demand in {stateData.topIndustries.slice(0, 2).join(' and ')} sectors continues to drive
                  CPA hiring in the region.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Maximizing Your CPA Salary in {stateData.state}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Salary Boosters</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Additional certifications (CFA, CFE, CISA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Industry specialization (tax, audit, forensic)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Big 4 or national firm experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Advanced degrees (MBA, MSA)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Technology skills (data analytics, automation)</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Career Path Options</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">→</span>
                  <span><strong>Public Accounting:</strong> Audit, tax, advisory services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">→</span>
                  <span><strong>Industry/Corporate:</strong> Controller, CFO track</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">→</span>
                  <span><strong>Government:</strong> IRS, state agencies, FBI</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">→</span>
                  <span><strong>Consulting:</strong> Financial advisory, M&A</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">→</span>
                  <span><strong>Entrepreneurship:</strong> Start your own practice</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* State Requirements Link */}
        <section className="mb-12">
          <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--foreground)]">
                  Becoming a CPA in {stateData.state}
                </h3>
                <p className="text-[var(--muted)]">
                  View the specific education, exam, and experience requirements for {stateData.abbreviation} licensure.
                </p>
              </div>
              <Link
                href={`/state-requirements/${stateData.slug}`}
                className="btn-primary whitespace-nowrap"
              >
                View {stateData.abbreviation} Requirements
              </Link>
            </div>
          </div>
        </section>

        {/* Other States */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Compare Salaries in Other States
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {stateSalaries
              .filter(s => s.slug !== stateData.slug)
              .slice(0, 12)
              .map((state) => (
                <Link
                  key={state.slug}
                  href={`/resources/cpa-salary/${state.slug}`}
                  className="bg-white dark:bg-[var(--card)] rounded-lg border border-[var(--border)] p-3 hover:border-[var(--primary)] transition-colors text-center"
                >
                  <div className="font-medium text-[var(--foreground)]">{state.abbreviation}</div>
                  <div className="text-xs text-[var(--muted)]">{formatSalary(state.averageSalary)}</div>
                </Link>
              ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/resources/cpa-salary" className="text-[var(--primary)] hover:underline">
              View all 50 states →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Start Your CPA Journey</h2>
            <p className="text-gray-200 mb-6">
              The first step to earning a CPA salary is passing the exam. Get started with free practice
              questions and track your progress toward licensure.
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
