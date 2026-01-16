import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllStates, getStateByCode, StateRequirement } from '@/lib/data/state-requirements';
import { getStateSalaryBySlug, formatSalary, stateSalaries } from '@/data/state-salaries';

interface PageProps {
  params: Promise<{ state: string }>;
}

// Map state codes to slugs (lowercase full names with hyphens)
function stateCodeToSlug(code: string): string {
  const state = getStateByCode(code);
  return state ? state.name.toLowerCase().replace(/\s+/g, '-') : code.toLowerCase();
}

function slugToStateCode(slug: string): string | undefined {
  const states = getAllStates();
  const match = states.find(s => s.name.toLowerCase().replace(/\s+/g, '-') === slug.toLowerCase());
  return match?.code;
}

export async function generateStaticParams() {
  const states = getAllStates();
  return states.map((state) => ({
    state: state.name.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const stateCode = slugToStateCode(stateSlug);
  const stateData = stateCode ? getStateByCode(stateCode) : undefined;

  if (!stateData) {
    return { title: 'State Not Found' };
  }

  return {
    title: `How to Become a CPA in ${stateData.name} | ${new Date().getFullYear()} Guide | Meridian CPA Review`,
    description: `Complete guide to becoming a CPA in ${stateData.name}. Learn about ${stateData.name} CPA requirements, education (${stateData.educationRequirements.totalCredits} credits), experience (${stateData.experienceRequirements.yearsRequired} year${stateData.experienceRequirements.yearsRequired > 1 ? 's' : ''}), fees, and step-by-step process.`,
    keywords: `how to become a CPA in ${stateData.name}, ${stateData.name} CPA requirements, ${stateData.code} CPA license, ${stateData.name} accountant license`,
  };
}

export default async function BecomeCPAStatePage({ params }: PageProps) {
  const { state: stateSlug } = await params;
  const stateCode = slugToStateCode(stateSlug);
  const stateData = stateCode ? getStateByCode(stateCode) : undefined;

  if (!stateData) {
    notFound();
  }

  // Try to get salary data for this state
  const salarySlug = stateData.name.toLowerCase().replace(/\s+/g, '-');
  const salaryData = getStateSalaryBySlug(salarySlug);

  // Get neighboring/similar states for comparison
  const allStates = getAllStates().filter(s => s.code !== stateData.code);
  const compareStates = allStates.slice(0, 4);

  // Calculate total exam cost
  const totalExamCost = stateData.fees.initialApplication + (stateData.fees.perSection * 4);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
            <Link href="/guides" className="hover:text-white">Guides</Link>
            <span>/</span>
            <Link href="/guides/how-to-become-a-cpa" className="hover:text-white">How to Become a CPA</Link>
            <span>/</span>
            <span>{stateData.name}</span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-2xl font-bold">
              {stateData.code}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                How to Become a CPA in {stateData.name}
              </h1>
              <p className="text-lg text-gray-200 mt-2">
                Complete {new Date().getFullYear()} Requirements Guide
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="bg-white dark:bg-[var(--card)] border-b border-[var(--border)] py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {stateData.educationRequirements.totalCredits}
              </div>
              <div className="text-xs text-[var(--muted)]">Total Credits</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {stateData.educationRequirements.accountingCredits}
              </div>
              <div className="text-xs text-[var(--muted)]">Accounting</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {stateData.experienceRequirements.yearsRequired} yr
              </div>
              <div className="text-xs text-[var(--muted)]">Experience</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                ${totalExamCost.toLocaleString()}
              </div>
              <div className="text-xs text-[var(--muted)]">Est. Total Cost</div>
            </div>
            <div>
              <div className={`text-2xl font-bold ${stateData.examRequirements.canSitBeforeDegree ? 'text-green-600' : 'text-orange-600'}`}>
                {stateData.examRequirements.canSitBeforeDegree ? 'Yes' : 'No'}
              </div>
              <div className="text-xs text-[var(--muted)]">Early Exam</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Disclaimer:</strong> Requirements can change. Always verify current requirements with the{' '}
            <a href={stateData.boardUrl} target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
              {stateData.boardName}
            </a>. This guide is for informational purposes only.
          </p>
        </div>

        {/* Table of Contents */}
        <nav className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-[var(--foreground)] mb-3">Quick Navigation</h2>
          <div className="grid md:grid-cols-2 gap-2 text-sm">
            <a href="#overview" className="text-[var(--primary)] hover:underline">Overview</a>
            <a href="#step-by-step" className="text-[var(--primary)] hover:underline">Step-by-Step Process</a>
            <a href="#education" className="text-[var(--primary)] hover:underline">Education Requirements</a>
            <a href="#experience" className="text-[var(--primary)] hover:underline">Experience Requirements</a>
            <a href="#exam" className="text-[var(--primary)] hover:underline">CPA Exam Process</a>
            <a href="#fees" className="text-[var(--primary)] hover:underline">Fees & Costs</a>
            <a href="#ethics" className="text-[var(--primary)] hover:underline">Ethics Exam</a>
            {salaryData && <a href="#salary" className="text-[var(--primary)] hover:underline">Salary Outlook</a>}
          </div>
        </nav>

        {/* Overview */}
        <section id="overview" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Overview: Becoming a CPA in {stateData.name}
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-[var(--foreground)]">
              Becoming a Certified Public Accountant (CPA) in {stateData.name} requires meeting education,
              examination, and experience requirements set by the {stateData.boardName}. {stateData.name}{' '}
              {stateData.examRequirements.canSitBeforeDegree
                ? 'allows candidates to sit for the CPA exam before completing all 150 credit hours, making it easier to start the exam process earlier.'
                : 'requires candidates to complete all 150 credit hours before sitting for the CPA exam.'}
            </p>
            <p className="text-[var(--foreground)] mt-4">
              {stateData.name} requires {stateData.educationRequirements.accountingCredits} semester hours in
              accounting and {stateData.educationRequirements.businessCredits > 0
                ? `${stateData.educationRequirements.businessCredits} hours in business courses`
                : 'general business coursework'}, along with{' '}
              {stateData.experienceRequirements.yearsRequired} year{stateData.experienceRequirements.yearsRequired > 1 ? 's' : ''} of
              qualifying work experience{stateData.experienceRequirements.supervisionRequired ? ' under CPA supervision' : ''}.
            </p>
          </div>
        </section>

        {/* Step-by-Step Process */}
        <section id="step-by-step" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Step-by-Step Process to Become a CPA in {stateData.name}
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 flex-grow">
                <h3 className="font-semibold text-[var(--foreground)]">Complete Education Requirements</h3>
                <p className="text-sm text-[var(--muted)] mt-1">
                  Earn {stateData.educationRequirements.totalCredits} semester hours including {stateData.educationRequirements.accountingCredits} in accounting
                  {stateData.educationRequirements.businessCredits > 0 && ` and ${stateData.educationRequirements.businessCredits} in business courses`}.
                  {stateData.examRequirements.canSitBeforeDegree && ' You may sit for the exam with 120 credits.'}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 flex-grow">
                <h3 className="font-semibold text-[var(--foreground)]">Apply to the {stateData.boardName}</h3>
                <p className="text-sm text-[var(--muted)] mt-1">
                  Submit your application and pay the ${stateData.fees.initialApplication} application fee.
                  Provide official transcripts and any required documentation.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 flex-grow">
                <h3 className="font-semibold text-[var(--foreground)]">Pass All Four CPA Exam Sections</h3>
                <p className="text-sm text-[var(--muted)] mt-1">
                  Pass FAR, AUD, REG, and one discipline section (TCP, BAR, or ISC) within 30 months.
                  Each section costs ${stateData.fees.perSection} in AICPA fees.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 flex-grow">
                <h3 className="font-semibold text-[var(--foreground)]">Complete Experience Requirement</h3>
                <p className="text-sm text-[var(--muted)] mt-1">
                  Gain {stateData.experienceRequirements.totalHours.toLocaleString()} hours ({stateData.experienceRequirements.yearsRequired} year{stateData.experienceRequirements.yearsRequired > 1 ? 's' : ''})
                  of qualifying experience{stateData.experienceRequirements.supervisionRequired ? ' under CPA supervision' : ''}.
                </p>
              </div>
            </div>

            {stateData.ethicsExam.required && (
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[var(--primary)] text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 flex-grow">
                  <h3 className="font-semibold text-[var(--foreground)]">Pass the Ethics Exam</h3>
                  <p className="text-sm text-[var(--muted)] mt-1">
                    Complete the {stateData.ethicsExam.examName}. Required: {stateData.ethicsExam.whenRequired}.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                {stateData.ethicsExam.required ? '6' : '5'}
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-4 flex-grow">
                <h3 className="font-semibold text-green-700 dark:text-green-300">Apply for Your CPA License</h3>
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  Submit your license application to the {stateData.boardName} with all required documentation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education Requirements */}
        <section id="education" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Education Requirements in {stateData.name}
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-3xl font-bold text-[var(--primary)]">
                  {stateData.educationRequirements.totalCredits}
                </div>
                <div className="text-sm text-[var(--muted)]">Total Semester Hours</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-3xl font-bold text-[var(--primary)]">
                  {stateData.educationRequirements.accountingCredits}
                </div>
                <div className="text-sm text-[var(--muted)]">Accounting Credits</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-3xl font-bold text-[var(--primary)]">
                  {stateData.educationRequirements.businessCredits}
                </div>
                <div className="text-sm text-[var(--muted)]">Business Credits</div>
              </div>
            </div>

            <h3 className="font-semibold text-[var(--foreground)] mb-3">Additional Requirements:</h3>
            <ul className="space-y-2">
              {stateData.educationRequirements.notes.map((note, index) => (
                <li key={index} className="flex items-start gap-2 text-[var(--foreground)]">
                  <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Experience Requirements */}
        <section id="experience" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Experience Requirements in {stateData.name}
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-3xl font-bold text-[var(--primary)]">
                  {stateData.experienceRequirements.totalHours.toLocaleString()}
                </div>
                <div className="text-sm text-[var(--muted)]">
                  Total Hours ({stateData.experienceRequirements.yearsRequired} year{stateData.experienceRequirements.yearsRequired > 1 ? 's' : ''})
                </div>
              </div>
              <div className={`p-4 rounded-lg ${stateData.experienceRequirements.supervisionRequired
                ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'}`}>
                <div className={`text-lg font-bold ${stateData.experienceRequirements.supervisionRequired
                  ? 'text-amber-700 dark:text-amber-300'
                  : 'text-green-700 dark:text-green-300'}`}>
                  {stateData.experienceRequirements.supervisionRequired ? 'CPA Supervision Required' : 'No CPA Supervision Required'}
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-[var(--foreground)] mb-3">Qualifying Experience Types:</h3>
            <ul className="space-y-2">
              {stateData.experienceRequirements.acceptableExperience.map((exp, index) => (
                <li key={index} className="flex items-start gap-2 text-[var(--foreground)]">
                  <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CPA Exam */}
        <section id="exam" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            CPA Exam Process in {stateData.name}
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className={`p-4 rounded-lg ${stateData.examRequirements.canSitBeforeDegree
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800'}`}>
                <div className={`text-lg font-bold ${stateData.examRequirements.canSitBeforeDegree
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-orange-700 dark:text-orange-300'}`}>
                  {stateData.examRequirements.canSitBeforeDegree ? 'Early Sitting Allowed' : '150 Credits Required to Sit'}
                </div>
                <div className={`text-sm ${stateData.examRequirements.canSitBeforeDegree
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-orange-600 dark:text-orange-400'}`}>
                  {stateData.examRequirements.canSitBeforeDegree
                    ? 'Can sit before completing 150 credits'
                    : 'Must complete all education first'}
                </div>
              </div>
              <div className={`p-4 rounded-lg ${stateData.examRequirements.creditTransfer
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-gray-50 dark:bg-gray-800/50'}`}>
                <div className={`text-lg font-bold ${stateData.examRequirements.creditTransfer
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-[var(--foreground)]'}`}>
                  {stateData.examRequirements.creditTransfer ? 'Credit Transfer Accepted' : 'No Credit Transfer'}
                </div>
              </div>
            </div>

            {stateData.examRequirements.notes.length > 0 && (
              <>
                <h3 className="font-semibold text-[var(--foreground)] mb-3">Important Notes:</h3>
                <ul className="space-y-2">
                  {stateData.examRequirements.notes.map((note, index) => (
                    <li key={index} className="flex items-start gap-2 text-[var(--foreground)]">
                      <svg className="w-5 h-5 text-[var(--primary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-6 p-4 bg-[var(--primary)]/10 rounded-lg">
              <h4 className="font-semibold text-[var(--foreground)] mb-2">CPA Exam Sections</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-white dark:bg-[var(--card)] p-2 rounded text-center">
                  <div className="font-bold text-[var(--primary)]">FAR</div>
                  <div className="text-xs text-[var(--muted)]">Financial</div>
                </div>
                <div className="bg-white dark:bg-[var(--card)] p-2 rounded text-center">
                  <div className="font-bold text-[var(--primary)]">AUD</div>
                  <div className="text-xs text-[var(--muted)]">Auditing</div>
                </div>
                <div className="bg-white dark:bg-[var(--card)] p-2 rounded text-center">
                  <div className="font-bold text-[var(--primary)]">REG</div>
                  <div className="text-xs text-[var(--muted)]">Regulation</div>
                </div>
                <div className="bg-white dark:bg-[var(--card)] p-2 rounded text-center">
                  <div className="font-bold text-[var(--primary)]">Discipline</div>
                  <div className="text-xs text-[var(--muted)]">TCP/BAR/ISC</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fees */}
        <section id="fees" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            {stateData.name} CPA Exam Fees & Costs
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-[var(--primary)]">
                  ${stateData.fees.initialApplication}
                </div>
                <div className="text-sm text-[var(--muted)]">Application Fee</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-[var(--primary)]">
                  ${stateData.fees.perSection}
                </div>
                <div className="text-sm text-[var(--muted)]">Per Section (AICPA)</div>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-2xl font-bold text-[var(--primary)]">
                  ${stateData.fees.reexamFee}
                </div>
                <div className="text-sm text-[var(--muted)]">Re-exam Fee</div>
              </div>
              <div className="text-center p-4 bg-[var(--primary)]/10 rounded-lg">
                <div className="text-2xl font-bold text-[var(--primary)]">
                  ${totalExamCost.toLocaleString()}
                </div>
                <div className="text-sm text-[var(--muted)]">Est. Total (4 sections)</div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Note:</strong> Fees are subject to change. The AICPA exam fee (${stateData.fees.perSection}/section) is set nationally.
                Additional costs may include review courses, application processing, and license renewal fees.
                Always verify current fees with the {stateData.boardName}.
              </p>
            </div>
          </div>
        </section>

        {/* Ethics Exam */}
        <section id="ethics" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Ethics Exam Requirement
          </h2>
          <div className={`rounded-xl p-6 ${stateData.ethicsExam.required
            ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
            : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'}`}>
            <div className={`text-xl font-bold mb-2 ${stateData.ethicsExam.required
              ? 'text-amber-700 dark:text-amber-300'
              : 'text-green-700 dark:text-green-300'}`}>
              {stateData.ethicsExam.required ? 'Ethics Exam Required' : 'No Ethics Exam Required'}
            </div>
            {stateData.ethicsExam.required && (
              <div className="text-amber-700 dark:text-amber-300">
                <p><strong>Exam:</strong> {stateData.ethicsExam.examName}</p>
                <p><strong>Timing:</strong> {stateData.ethicsExam.whenRequired}</p>
              </div>
            )}
          </div>
        </section>

        {/* Salary Outlook */}
        {salaryData && (
          <section id="salary" className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
              CPA Salary Outlook in {stateData.name}
            </h2>
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formatSalary(salaryData.averageSalary)}
                  </div>
                  <div className="text-sm text-[var(--muted)]">Average Salary</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-[var(--primary)]">
                    {salaryData.jobGrowth}
                  </div>
                  <div className="text-sm text-[var(--muted)]">Job Growth</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-[var(--primary)]">
                    {salaryData.cpaCount.toLocaleString()}
                  </div>
                  <div className="text-sm text-[var(--muted)]">Licensed CPAs</div>
                </div>
              </div>
              <Link
                href={`/resources/cpa-salary/${salarySlug}`}
                className="text-[var(--primary)] hover:underline text-sm"
              >
                View detailed salary information for {stateData.name} →
              </Link>
            </div>
          </section>
        )}

        {/* Official Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Official Resources
          </h2>
          <div className="bg-[var(--primary)] rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">{stateData.boardName}</h3>
            <p className="text-white/80 mb-4">
              Always verify requirements directly with your state board. Requirements and fees can change.
            </p>
            <a
              href={stateData.boardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Visit Official Website
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </section>

        {/* Related Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Related Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href={`/state-requirements/${stateData.code.toLowerCase()}`}
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors"
            >
              <div className="font-semibold text-[var(--foreground)]">{stateData.name} CPA Requirements</div>
              <div className="text-sm text-[var(--muted)]">Detailed state requirements page</div>
            </Link>
            <Link
              href="/guides/how-to-become-a-cpa"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors"
            >
              <div className="font-semibold text-[var(--foreground)]">How to Become a CPA</div>
              <div className="text-sm text-[var(--muted)]">General guide for all states</div>
            </Link>
            <Link
              href="/guides/best-order-cpa-exams"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors"
            >
              <div className="font-semibold text-[var(--foreground)]">Best Order for CPA Exams</div>
              <div className="text-sm text-[var(--muted)]">Strategic exam ordering guide</div>
            </Link>
            <Link
              href="/resources/cpa-pass-rates"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors"
            >
              <div className="font-semibold text-[var(--foreground)]">CPA Exam Pass Rates</div>
              <div className="text-sm text-[var(--muted)]">Historical pass rate data</div>
            </Link>
          </div>
        </section>

        {/* Compare with Other States */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Compare with Other States
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {compareStates.map((state) => (
              <Link
                key={state.code}
                href={`/guides/become-cpa-in/${state.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4 hover:border-[var(--primary)] transition-colors text-center"
              >
                <div className="text-lg font-bold text-[var(--primary)]">{state.code}</div>
                <div className="text-sm text-[var(--foreground)]">{state.name}</div>
                <div className="text-xs text-[var(--muted)] mt-2">
                  {state.educationRequirements.totalCredits} credits • {state.experienceRequirements.yearsRequired} yr exp
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your CPA Journey in {stateData.name}?</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Get free access to practice questions, study tools, and personalized progress tracking
            to help you pass the CPA exam.
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
