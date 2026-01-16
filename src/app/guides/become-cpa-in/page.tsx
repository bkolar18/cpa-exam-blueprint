import Link from 'next/link';
import { Metadata } from 'next';
import { getAllStates } from '@/lib/data/state-requirements';

export const metadata: Metadata = {
  title: 'How to Become a CPA by State | Complete State Guides | Meridian CPA Review',
  description: 'Find your state\'s CPA requirements. Complete guides for becoming a CPA in all 50 states plus DC and US territories. Education, experience, exam, and licensing requirements.',
  keywords: 'how to become a CPA by state, CPA requirements by state, state CPA license, become an accountant',
};

export default function BecomeCPAIndexPage() {
  const allStates = getAllStates();

  // Separate states and territories
  const states = allStates.filter(s => !['GU', 'PR', 'VI', 'CNMI', 'DC'].includes(s.code));
  const territories = allStates.filter(s => ['GU', 'PR', 'VI', 'CNMI', 'DC'].includes(s.code));

  // Popular states (top 10 by population)
  const popularStateCodes = ['CA', 'TX', 'FL', 'NY', 'PA', 'IL', 'OH', 'GA', 'NC', 'MI'];
  const popularStates = popularStateCodes.map(code => allStates.find(s => s.code === code)).filter(Boolean);

  // States that allow early sitting
  const earlySitStates = allStates.filter(s => s.examRequirements.canSitBeforeDegree);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
            <Link href="/guides" className="hover:text-white">Guides</Link>
            <span>/</span>
            <span>Become a CPA by State</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              How to Become a CPA by State
            </h1>
            <p className="text-xl text-gray-200">
              Complete requirements guides for all 50 states plus DC and US territories
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Note:</strong> CPA requirements vary by state and can change. Each guide links to the official
            state board website. Always verify current requirements directly with your state board before applying.
          </p>
        </div>

        {/* Popular States */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Popular States</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {popularStates.map((state) => state && (
              <Link
                key={state.code}
                href={`/guides/become-cpa-in/${state.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] hover:shadow-md transition-all text-center"
              >
                <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-[var(--primary)]">{state.code}</span>
                </div>
                <div className="font-semibold text-[var(--foreground)]">{state.name}</div>
                <div className="text-xs text-[var(--muted)] mt-1">
                  {state.educationRequirements.totalCredits} credits • {state.experienceRequirements.yearsRequired} yr
                </div>
                <div className={`text-xs mt-1 ${state.examRequirements.canSitBeforeDegree ? 'text-green-600' : 'text-orange-600'}`}>
                  {state.examRequirements.canSitBeforeDegree ? 'Early sitting allowed' : '150 credits to sit'}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* States Allowing Early Exam Sitting */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">States Allowing Early Exam Sitting</h2>
          <p className="text-[var(--muted)] mb-6">
            These states allow you to sit for the CPA exam before completing all 150 credit hours.
          </p>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6">
            <div className="flex flex-wrap gap-2">
              {earlySitStates.map((state) => (
                <Link
                  key={state.code}
                  href={`/guides/become-cpa-in/${state.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-white dark:bg-[var(--card)] px-3 py-2 rounded-lg text-sm font-medium text-[var(--foreground)] hover:bg-green-100 dark:hover:bg-green-800/30 transition-colors"
                >
                  {state.name}
                </Link>
              ))}
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mt-4">
              {earlySitStates.length} states allow candidates to sit for the CPA exam with 120 credits
            </p>
          </div>
        </section>

        {/* All States A-Z */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">All States (A-Z)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {states.map((state) => (
              <Link
                key={state.code}
                href={`/guides/become-cpa-in/${state.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-[var(--foreground)]">{state.name}</div>
                    <div className="text-xs text-[var(--muted)]">{state.code}</div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${state.examRequirements.canSitBeforeDegree
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'}`}>
                    {state.examRequirements.canSitBeforeDegree ? 'Early sit' : '150 req'}
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <div className="font-bold text-[var(--primary)]">{state.educationRequirements.totalCredits}</div>
                    <div className="text-[var(--muted)]">Credits</div>
                  </div>
                  <div>
                    <div className="font-bold text-[var(--primary)]">{state.educationRequirements.accountingCredits}</div>
                    <div className="text-[var(--muted)]">Accounting</div>
                  </div>
                  <div>
                    <div className="font-bold text-[var(--primary)]">{state.experienceRequirements.yearsRequired} yr</div>
                    <div className="text-[var(--muted)]">Experience</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Territories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">DC & US Territories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {territories.map((territory) => (
              <Link
                key={territory.code}
                href={`/guides/become-cpa-in/${territory.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors text-center"
              >
                <div className="font-semibold text-[var(--foreground)]">{territory.name}</div>
                <div className="text-xs text-[var(--muted)] mt-1">
                  {territory.educationRequirements.totalCredits} credits
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Key Differences Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Key Differences Between States</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Education Credits</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                While all states require 150 semester hours for licensure, accounting credit requirements
                vary from 15 to 36 hours depending on the state.
              </p>
              <div className="text-sm">
                <div className="flex justify-between py-1 border-b border-[var(--border)]">
                  <span>Lowest (Alaska, Maine)</span>
                  <span className="font-bold text-[var(--primary)]">15 credits</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Highest (FL, SC, CT)</span>
                  <span className="font-bold text-[var(--primary)]">36 credits</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Experience Requirements</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                Most states require 1 year (2,000 hours) of experience, but some require more.
                CPA supervision requirements also vary.
              </p>
              <div className="text-sm">
                <div className="flex justify-between py-1 border-b border-[var(--border)]">
                  <span>Most states</span>
                  <span className="font-bold text-[var(--primary)]">1 year</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>AK, IN, NV</span>
                  <span className="font-bold text-[var(--primary)]">2 years</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">Ethics Exam</h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                Most states require an ethics exam (usually the AICPA Ethics Exam), but several
                states have no ethics exam requirement.
              </p>
              <div className="text-sm">
                <div className="flex justify-between py-1 border-b border-[var(--border)]">
                  <span>Required</span>
                  <span className="font-bold text-[var(--primary)]">{allStates.filter(s => s.ethicsExam.required).length} states</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Not required</span>
                  <span className="font-bold text-green-600">{allStates.filter(s => !s.ethicsExam.required).length} states</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Related Resources</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/guides/how-to-become-a-cpa"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors"
            >
              <div className="font-semibold text-[var(--foreground)]">How to Become a CPA</div>
              <div className="text-sm text-[var(--muted)]">General overview guide</div>
            </Link>
            <Link
              href="/state-requirements"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors"
            >
              <div className="font-semibold text-[var(--foreground)]">State Requirements</div>
              <div className="text-sm text-[var(--muted)]">Quick reference pages</div>
            </Link>
            <Link
              href="/resources/cpa-salary"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors"
            >
              <div className="font-semibold text-[var(--foreground)]">CPA Salary by State</div>
              <div className="text-sm text-[var(--muted)]">Compensation data</div>
            </Link>
            <Link
              href="/guides/best-order-cpa-exams"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors"
            >
              <div className="font-semibold text-[var(--foreground)]">Best CPA Exam Order</div>
              <div className="text-sm text-[var(--muted)]">Strategic exam planning</div>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your CPA Journey?</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Get free access to 6,000+ practice questions, study tools, and personalized progress
            tracking to help you pass the CPA exam.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Practicing Free
          </Link>
          <p className="text-xs text-white/70 mt-3">Free during beta • No credit card required</p>
        </section>
      </div>
    </div>
  );
}
