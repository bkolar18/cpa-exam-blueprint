import Link from"next/link";
import { notFound } from"next/navigation";
import { getStateByCode, getAllStates } from"@/lib/data/state-requirements";

interface PageProps {
 params: Promise<{ state: string }>;
}

export async function generateStaticParams() {
 const states = getAllStates();
 return states.map((state) => ({
 state: state.code.toLowerCase(),
 }));
}

export async function generateMetadata({ params }: PageProps) {
 const { state: stateCode } = await params;
 const state = getStateByCode(stateCode);

 if (!state) {
 return { title:"State Not Found"};
 }

 return {
 title: `${state.name} CPA Requirements | Meridian CPA Review`,
 description: `Complete guide to ${state.name} CPA exam requirements including education, experience, fees, and ethics requirements.`,
 };
}

export default async function StatePage({ params }: PageProps) {
 const { state: stateCode } = await params;
 const state = getStateByCode(stateCode);

 if (!state) {
 notFound();
 }

 return (
 <div className="min-h-screen bg-[var(--card)]">
 {/* Hero Section */}
 <section className="bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <Link
 href="/state-requirements"
 className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
 >
 <svg className="w-5 h-5 mr-1"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M15 19l-7-7 7-7"/>
 </svg>
 All States
 </Link>

 <div className="flex items-center space-x-4">
 <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center text-2xl font-bold">
 {state.code}
 </div>
 <div>
 <h1 className="text-4xl md:text-5xl font-bold">
 {state.name} CPA Requirements
 </h1>
 <p className="text-xl text-white/80 mt-2">
 {state.boardName}
 </p>
 </div>
 </div>
 </div>
 </section>

 {/* Quick Summary */}
 <section className="py-8 bg-white dark:bg-[var(--card)] border-b border-[var(--border)]">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
 <div>
 <div className="text-3xl font-bold text-[var(--primary)]">
 {state.educationRequirements.totalCredits}
 </div>
 <div className="text-sm text-[var(--muted)]">Total Credits</div>
 </div>
 <div>
 <div className="text-3xl font-bold text-[var(--primary)]">
 {state.experienceRequirements.yearsRequired} yr
 </div>
 <div className="text-sm text-[var(--muted)]">Experience</div>
 </div>
 <div>
 <div className="text-3xl font-bold text-[var(--primary)]">
 ${state.fees.initialApplication}
 </div>
 <div className="text-sm text-[var(--muted)]">Application Fee</div>
 </div>
 <div>
 <div className="text-3xl font-bold text-[var(--primary)]">
 {state.examRequirements.canSitBeforeDegree ?"Yes":"No"}
 </div>
 <div className="text-sm text-[var(--muted)]">Early Sitting</div>
 </div>
 </div>
 </div>
 </section>

 {/* Detailed Requirements */}
 <section className="py-12">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
 {/* Education Requirements */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-[var(--border)]">
 <h2 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center">
 <svg className="w-6 h-6 text-[var(--primary)] mr-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z"/>
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 7l9-5-9-5-9 5 9 5z"/>
 </svg>
 Education Requirements
 </h2>

 <div className="grid md:grid-cols-3 gap-6 mb-6">
 <div className="bg-[var(--card)] rounded-lg p-4 text-center">
 <div className="text-2xl font-bold text-[var(--primary)]">
 {state.educationRequirements.totalCredits}
 </div>
 <div className="text-sm text-[var(--muted)]">Total Credits</div>
 </div>
 <div className="bg-[var(--card)] rounded-lg p-4 text-center">
 <div className="text-2xl font-bold text-[var(--primary)]">
 {state.educationRequirements.accountingCredits}
 </div>
 <div className="text-sm text-[var(--muted)]">Accounting Credits</div>
 </div>
 <div className="bg-[var(--card)] rounded-lg p-4 text-center">
 <div className="text-2xl font-bold text-[var(--primary)]">
 {state.educationRequirements.businessCredits}
 </div>
 <div className="text-sm text-[var(--muted)]">Business Credits</div>
 </div>
 </div>

 <h3 className="font-semibold text-[var(--foreground)] mb-2">Additional Notes:</h3>
 <ul className="space-y-2">
 {state.educationRequirements.notes.map((note, index) => (
 <li key={index} className="flex items-start space-x-2 text-[var(--foreground)]">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>{note}</span>
 </li>
 ))}
 </ul>
 </div>

 {/* Experience Requirements */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-[var(--border)]">
 <h2 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center">
 <svg className="w-6 h-6 text-[var(--primary)] mr-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
 </svg>
 Experience Requirements
 </h2>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div className="bg-[var(--card)] rounded-lg p-4">
 <div className="text-2xl font-bold text-[var(--primary)]">
 {state.experienceRequirements.totalHours.toLocaleString()} hours
 </div>
 <div className="text-sm text-[var(--muted)]">
 ({state.experienceRequirements.yearsRequired} year{state.experienceRequirements.yearsRequired > 1 ?"s":""})
 </div>
 </div>
 <div className="bg-[var(--card)] rounded-lg p-4">
 <div className="text-lg font-bold text-[var(--primary)]">
 {state.experienceRequirements.supervisionRequired ?"CPA Supervision Required":"No CPA Supervision Required"}
 </div>
 </div>
 </div>

 <h3 className="font-semibold text-[var(--foreground)] mb-2">Acceptable Experience:</h3>
 <ul className="space-y-2">
 {state.experienceRequirements.acceptableExperience.map((exp, index) => (
 <li key={index} className="flex items-start space-x-2 text-[var(--foreground)]">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>{exp}</span>
 </li>
 ))}
 </ul>
 </div>

 {/* Exam Requirements */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-[var(--border)]">
 <h2 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center">
 <svg className="w-6 h-6 text-[var(--primary)] mr-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 Exam Requirements
 </h2>

 <div className="grid md:grid-cols-2 gap-6 mb-6">
 <div className={`rounded-lg p-4 ${state.examRequirements.canSitBeforeDegree ?"bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700":"bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700"}`}>
 <div className={`text-lg font-bold ${state.examRequirements.canSitBeforeDegree ?"text-green-700 dark:text-green-300":"text-red-700 dark:text-red-300"}`}>
 {state.examRequirements.canSitBeforeDegree ?"Can Sit Early":"Cannot Sit Early"}
 </div>
 <div className={`text-sm ${state.examRequirements.canSitBeforeDegree ?"text-green-600 dark:text-green-400":"text-red-600 dark:text-red-400"}`}>
 {state.examRequirements.canSitBeforeDegree ?"Before completing 150 credits":"Must have 150 credits to sit"}
 </div>
 </div>
 <div className="bg-[var(--card)] rounded-lg p-4">
 <div className="text-lg font-bold text-[var(--primary)]">
 {state.examRequirements.creditTransfer ?"Credit Transfer Allowed":"No Credit Transfer"}
 </div>
 </div>
 </div>

 {state.examRequirements.notes.length > 0 && (
 <>
 <h3 className="font-semibold text-[var(--foreground)] mb-2">Notes:</h3>
 <ul className="space-y-2">
 {state.examRequirements.notes.map((note, index) => (
 <li key={index} className="flex items-start space-x-2 text-[var(--foreground)]">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"clipRule="evenodd"/>
 </svg>
 <span>{note}</span>
 </li>
 ))}
 </ul>
 </>
 )}
 </div>

 {/* Fees */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-[var(--border)]">
 <h2 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center">
 <svg className="w-6 h-6 text-[var(--primary)] mr-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 Fees
 </h2>

 <div className="grid md:grid-cols-3 gap-6 mb-6">
 <div className="bg-[var(--card)] rounded-lg p-4 text-center">
 <div className="text-2xl font-bold text-[var(--primary)]">
 ${state.fees.initialApplication}
 </div>
 <div className="text-sm text-[var(--muted)]">Initial Application</div>
 </div>
 <div className="bg-[var(--card)] rounded-lg p-4 text-center">
 <div className="text-2xl font-bold text-[var(--primary)]">
 ${state.fees.perSection}
 </div>
 <div className="text-sm text-[var(--muted)]">Per Section (AICPA)</div>
 </div>
 <div className="bg-[var(--card)] rounded-lg p-4 text-center">
 <div className="text-2xl font-bold text-[var(--primary)]">
 ${state.fees.reexamFee}
 </div>
 <div className="text-sm text-[var(--muted)]">Re-exam Fee</div>
 </div>
 </div>

 <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
 <p className="text-yellow-800 dark:text-yellow-300 text-sm">
 <strong>Note:</strong> Fees are subject to change. The AICPA exam fee (${state.fees.perSection}/section) is set nationally. Always verify current fees with your state board.
 </p>
 </div>
 </div>

 {/* Ethics Exam */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-[var(--border)]">
 <h2 className="text-xl font-bold text-[var(--foreground)] mb-4 flex items-center">
 <svg className="w-6 h-6 text-[var(--primary)] mr-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
 </svg>
 Ethics Exam
 </h2>

 <div className={`rounded-lg p-4 ${state.ethicsExam.required ?"bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700":"bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700"}`}>
 <div className={`text-lg font-bold ${state.ethicsExam.required ?"text-yellow-700 dark:text-yellow-300":"text-green-700 dark:text-green-300"}`}>
 {state.ethicsExam.required ?"Ethics Exam Required":"No Ethics Exam Required"}
 </div>
 {state.ethicsExam.required && (
 <div className="mt-2 text-yellow-700 dark:text-yellow-300">
 <p><strong>Exam:</strong> {state.ethicsExam.examName}</p>
 <p><strong>When:</strong> {state.ethicsExam.whenRequired}</p>
 </div>
 )}
 </div>
 </div>

 {/* Official Resources */}
 <div className="bg-[var(--primary)] rounded-xl p-6 text-white">
 <h2 className="text-xl font-bold mb-4">Official Resources</h2>
 <p className="text-white/80 mb-4">
 Always verify requirements directly with your state board. Requirements can change.
 </p>
 <a
 href={state.boardUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center bg-white text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors"
 >
 Visit {state.boardName}
 <svg className="w-5 h-5 ml-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
 </svg>
 </a>
 </div>

 {/* CTA */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-[var(--border)] text-center">
 <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
 Ready to Start Studying?
 </h3>
 <p className="text-[var(--muted)] mb-4">
 Get a personalized CPA study plan based on your schedule and background.
 </p>
 <Link href="/study-plan"className="btn-primary inline-block">
 Get Your Free Study Plan
 </Link>
 </div>
 </div>
 </section>
 </div>
 );
}
