import Link from"next/link";
import { getAllStates } from"@/lib/data/state-requirements";
import StateSelector from"./StateSelector";

export const metadata = {
 title:"CPA Requirements by State | Meridian CPA Review",
 description:"Find CPA exam requirements for your state including education, experience, fees, and ethics exam requirements.",
};

export default function StateRequirementsPage() {
 const states = getAllStates();

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-[var(--background)]">
 {/* Hero Section */}
 <section className="bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <h1 className="text-4xl md:text-5xl font-bold mb-4">
 CPA Requirements by State
 </h1>
 <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
 Each state has different education, experience, and examination requirements.
 Find the specific requirements for your state board of accountancy.
 </p>

 {/* State Dropdown Selector */}
 <StateSelector states={states} />
 </div>
 </section>

 {/* Quick Stats */}
 <section className="py-8 bg-white dark:bg-[var(--card)] border-b border-gray-200">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
 <div>
 <div className="text-3xl font-bold text-[var(--primary)]">55</div>
 <div className="text-sm text-gray-600 dark:text-[var(--muted)]">Jurisdictions</div>
 </div>
 <div>
 <div className="text-3xl font-bold text-[var(--primary)]">150</div>
 <div className="text-sm text-gray-600 dark:text-[var(--muted)]">Credit Hours (Most States)</div>
 </div>
 <div>
 <div className="text-3xl font-bold text-[var(--primary)]">1-2</div>
 <div className="text-sm text-gray-600 dark:text-[var(--muted)]">Years Experience</div>
 </div>
 <div>
 <div className="text-3xl font-bold text-[var(--primary)]">18</div>
 <div className="text-sm text-gray-600 dark:text-[var(--muted)]">Month Testing Window</div>
 </div>
 </div>
 </div>
 </section>

 {/* State Grid */}
 <section className="py-12">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">
 All 55 Jurisdictions
 </h2>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
 {states.map((state) => (
 <Link
 key={state.code}
 href={`/state-requirements/${state.code.toLowerCase()}`}
 className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-gray-200 hover:border-[var(--primary)] hover:shadow-md transition-all group"
 >
 <div className="flex items-start justify-between">
 <div>
 <h3 className="text-xl font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
 {state.name}
 </h3>
 <p className="text-sm text-gray-600 dark:text-[var(--muted)] mt-1">
 {state.boardName}
 </p>
 </div>
 <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center text-white font-bold text-sm">
 {state.code}
 </div>
 </div>

 <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
 <div>
 <span className="text-gray-600 dark:text-[var(--muted)]">Credits: </span>
 <span className="font-medium">{state.educationRequirements.totalCredits}</span>
 </div>
 <div>
 <span className="text-gray-600 dark:text-[var(--muted)]">Experience: </span>
 <span className="font-medium">{state.experienceRequirements.yearsRequired} yr</span>
 </div>
 <div>
 <span className="text-gray-600 dark:text-[var(--muted)]">Sit Early: </span>
 <span className="font-medium">{state.examRequirements.canSitBeforeDegree ?"Yes":"No"}</span>
 </div>
 <div>
 <span className="text-gray-600 dark:text-[var(--muted)]">Ethics: </span>
 <span className="font-medium">{state.ethicsExam.required ?"Required":"Not Required"}</span>
 </div>
 </div>

 <div className="mt-4 flex items-center text-[var(--primary)] text-sm font-medium">
 View Full Requirements
 <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5l7 7-7 7"/>
 </svg>
 </div>
 </Link>
 ))}
 </div>

 {/* Disclaimer Notice */}
 <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 text-center">
 <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
 Verify with Your State Board
 </h3>
 <p className="text-gray-600 dark:text-[var(--muted)]">
 Requirements may change. Always verify the latest requirements with your state board of accountancy
 before applying. Links to official board websites are included on each state&apos;s detail page.
 </p>
 </div>
 </div>
 </section>

 {/* Common Requirements */}
 <section className="py-12 bg-white dark:bg-[var(--card)] border-t border-gray-200">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8 text-center">
 Common CPA Requirements (Most States)
 </h2>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="bg-gray-100 dark:bg-[var(--card-hover)] rounded-xl p-6">
 <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
 Education Requirements
 </h3>
 <ul className="space-y-3 text-[var(--foreground)]">
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>150 semester hours total</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Bachelor&apos;s degree required</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>24-36 accounting credit hours</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>24+ business credit hours</span>
 </li>
 </ul>
 </div>

 <div className="bg-gray-100 dark:bg-[var(--card-hover)] rounded-xl p-6">
 <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
 Experience Requirements
 </h3>
 <ul className="space-y-3 text-[var(--foreground)]">
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>1-2 years work experience</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Supervision by licensed CPA</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Public, private, or government</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Accounting-related duties</span>
 </li>
 </ul>
 </div>
 </div>

 <div className="mt-8 text-center">
 <Link href="/study-plan"className="btn-primary inline-block">
 Get Your Free Study Plan
 </Link>
 </div>
 </div>
 </section>
 </div>
 );
}
