import Link from"next/link";

export const metadata = {
 title:"About Us | Meridian CPA Review",
 description:"Learn about Meridian CPA Review - affordable CPA exam prep with 6,000+ practice questions, 500+ task-based simulations, progress tracking, and unlimited access until you pass.",
};

export default function AboutPage() {
 return (
 <div>
 {/* Hero */}
 <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="max-w-3xl">
 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
 About Meridian CPA Review
 </h1>
 <p className="text-xl text-gray-200">
 Comprehensive CPA exam prep with 6,000+ practice questions and 500+ task-based simulations - everything you need to pass.
 </p>
 </div>
 </div>
 </section>

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 {/* Mission Statement */}
 <div className="relative bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] p-8 md:p-10 rounded-2xl mb-12 overflow-hidden">
 {/* Decorative elements */}
 <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"/>
 <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"/>

 <div className="relative">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
 <svg className="w-5 h-5 text-white"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
 </svg>
 </div>
 <h2 className="text-2xl font-bold text-white">Our Mission</h2>
 </div>
 <p className="text-xl text-white/90 leading-relaxed max-w-3xl">
 We believe CPA exam preparation should be accessible to everyone. Our mission is to provide everything you need to pass - 6,000+ practice questions, 500+ task-based simulations, study tools, progress tracking, and unlimited access until you pass.
 </p>
 </div>
 </div>

 {/* The Story */}
 <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-8 md:p-10 rounded-2xl border border-amber-200 dark:border-amber-800 mb-12 overflow-hidden">
 {/* Decorative quote */}
 <div className="absolute top-4 right-8 text-amber-200/50 dark:text-amber-700/30 text-8xl font-serif">&ldquo;</div>

 <div className="relative">
 <div className="flex items-center gap-3 mb-6">
 <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
 <svg className="w-5 h-5 text-white"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
 </svg>
 </div>
 <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-200">Why We Built This</h2>
 </div>
 <div className="space-y-4 text-amber-800 dark:text-amber-300 text-lg leading-relaxed">
 <p>
 Meridian CPA Review was created because we saw too many candidates struggling to afford quality study materials. With traditional CPA review courses costing $2,500-$3,000 or more, many aspiring CPAs are forced to choose between financial strain and their career goals.
 </p>
 <p>
 We believe the best way to prepare for the CPA exam is through active practice - answering questions, working through simulations, and getting immediate feedback on your performance.
 </p>
 <p className="font-medium text-amber-900 dark:text-amber-200">
 With 6,000+ practice questions, 500+ task-based simulations covering all CPA exam topics, intelligent progress tracking, and unlimited access until you pass, we offer everything you need to succeed - completely free during our beta period.
 </p>
 </div>
 </div>
 </div>

 {/* What We Offer */}
 <div className="bg-white dark:bg-[var(--card)] p-8 rounded-xl border border-[var(--border)] mb-12">
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">What We Offer</h2>
 <div className="grid md:grid-cols-2 gap-6">
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-[var(--primary)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5 text-[var(--primary)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
 </svg>
 </div>
 <div>
 <h3 className="font-semibold text-[var(--foreground)] mb-1">6,000+ Practice Questions</h3>
 <p className="text-[var(--muted)] text-sm">Comprehensive question bank across all six CPA exam sections with detailed explanations.</p>
 </div>
 </div>
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-[var(--secondary)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5 text-[var(--secondary)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
 </svg>
 </div>
 <div>
 <h3 className="font-semibold text-[var(--foreground)] mb-1">Progress Tracking</h3>
 <p className="text-[var(--muted)] text-sm">Track study hours, section progress, and quiz performance over time.</p>
 </div>
 </div>
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-emerald-500 bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5 text-emerald-500"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
 </svg>
 </div>
 <div>
 <h3 className="font-semibold text-[var(--foreground)] mb-1">SmartPath Adaptive Learning</h3>
 <p className="text-[var(--muted)] text-sm">Our intelligent algorithm analyzes your performance and prioritizes questions in areas where you need the most practice.</p>
 </div>
 </div>
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-[var(--accent)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5 text-[var(--accent)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 </div>
 <div>
 <h3 className="font-semibold text-[var(--foreground)] mb-1">Study Planning</h3>
 <p className="text-[var(--muted)] text-sm">Personalized study plans based on your schedule and timeline.</p>
 </div>
 </div>
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-purple-500 bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5 text-purple-500"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
 </svg>
 </div>
 <div>
 <h3 className="font-semibold text-[var(--foreground)] mb-1">Gamification</h3>
 <p className="text-[var(--muted)] text-sm">Earn badges, maintain study streaks, and stay motivated throughout your journey.</p>
 </div>
 </div>
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-rose-500 bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5 text-rose-500"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
 </svg>
 </div>
 <div>
 <h3 className="font-semibold text-[var(--foreground)] mb-1">Unlimited Access</h3>
 <p className="text-[var(--muted)] text-sm">All tiers include unlimited access until you pass - study at your own pace.</p>
 </div>
 </div>
 </div>
 </div>

 {/* Access Options */}
 <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-8 rounded-xl mb-12">
 <div className="flex items-start space-x-4">
 <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
 <svg className="w-5 h-5 text-green-600 dark:text-green-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 </div>
 <div>
 <h3 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-2">Free During Beta - Full Access</h3>
 <p className="text-green-700 dark:text-green-400 mb-4">
 During our beta period, you get complete access to everything - no time limits, no pressure:
 </p>
 <ul className="space-y-3 text-green-700 dark:text-green-400">
 <li className="flex items-start gap-3">
 <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"fill="currentColor"viewBox="0 0 20 20"><path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/></svg>
 <span>6,000+ practice questions across all six CPA exam sections</span>
 </li>
 <li className="flex items-start gap-3">
 <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"fill="currentColor"viewBox="0 0 20 20"><path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/></svg>
 <span>500+ task-based simulations with instant scoring</span>
 </li>
 <li className="flex items-start gap-3">
 <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"fill="currentColor"viewBox="0 0 20 20"><path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/></svg>
 <span>SmartPath adaptive learning algorithm</span>
 </li>
 <li className="flex items-start gap-3">
 <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"fill="currentColor"viewBox="0 0 20 20"><path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/></svg>
 <span>Progress tracking, gamification, and study analytics</span>
 </li>
 </ul>
 <p className="mt-4 text-green-700 dark:text-green-400 text-sm">
 Like other CPA review providers, our questions are based on the official CPA Exam Blueprints published by the AICPA. Study at your own pace with no time pressure.
 </p>
 </div>
 </div>
 </div>

 {/* Comparison Table */}
 <div className="bg-white dark:bg-[var(--card)] p-8 rounded-xl border border-[var(--border)] mb-12">
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">How We Compare</h2>
 <p className="text-[var(--muted)] mb-6">
 Here&apos;s an honest comparison with major CPA review providers. Choose what fits your budget and needs.
 </p>
 <div className="overflow-x-auto">
 <table className="w-full text-sm">
 <thead>
 <tr className="border-b-2 border-[var(--border)]">
 <th className="text-left py-4 px-3 font-semibold text-[var(--foreground)]">Feature</th>
 <th className="text-center py-4 px-3 font-semibold text-[var(--primary)] bg-[var(--primary)]/5">
 <div className="flex flex-col items-center">
 <span>Meridian CPA Review</span>
 <span className="text-xs font-normal text-[var(--primary)] mt-1">Free during beta</span>
 </div>
 </th>
 <th className="text-center py-4 px-3 font-semibold text-[var(--foreground)]">
 <span>Becker</span>
 </th>
 <th className="text-center py-4 px-3 font-semibold text-[var(--foreground)]">
 <span>Surgent</span>
 </th>
 <th className="text-center py-4 px-3 font-semibold text-[var(--foreground)]">
 <span>Roger CPA</span>
 </th>
 </tr>
 </thead>
 <tbody className="divide-y divide-[var(--border)]">
 <tr>
 <td className="py-4 px-3 text-[var(--foreground)] font-medium">Price</td>
 <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
 <span className="text-[var(--foreground)] font-semibold">Free (Beta)</span>
 </td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">$2,499-$5,999</td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">$1,599-$2,999</td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">$1,899-$3,099</td>
 </tr>
 <tr>
 <td className="py-4 px-3 text-[var(--foreground)] font-medium">Practice Questions</td>
 <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
 <span className="text-[var(--foreground)] font-semibold">6,000+</span>
 </td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">9,000+</td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">7,700+</td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">6,000+</td>
 </tr>
 <tr>
 <td className="py-4 px-3 text-[var(--foreground)] font-medium">Video Lectures</td>
 <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
 <svg className="w-5 h-5 text-gray-400 mx-auto"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 </tr>
 <tr>
 <td className="py-4 px-3 text-[var(--foreground)] font-medium">Task-Based Simulations</td>
 <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
 <span className="text-[var(--foreground)] font-semibold">500+</span>
 </td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">400+</td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">500+</td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">400+</td>
 </tr>
 <tr>
 <td className="py-4 px-3 text-[var(--foreground)] font-medium">Progress Tracking</td>
 <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 </tr>
 <tr>
 <td className="py-4 px-3 text-[var(--foreground)] font-medium">Study Planning Tools</td>
 <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 </tr>
 <tr>
 <td className="py-4 px-3 text-[var(--foreground)] font-medium">Gamification & Streaks</td>
 <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-gray-400 mx-auto"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-gray-400 mx-auto"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-gray-400 mx-auto"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </td>
 </tr>
 <tr>
 <td className="py-4 px-3 text-[var(--foreground)] font-medium">NTS Expiration Tracking</td>
 <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
 <svg className="w-5 h-5 text-green-500 mx-auto"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-gray-400 mx-auto"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-gray-400 mx-auto"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </td>
 <td className="py-4 px-3 text-center">
 <svg className="w-5 h-5 text-gray-400 mx-auto"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
 </svg>
 </td>
 </tr>
 <tr>
 <td className="py-4 px-3 text-[var(--foreground)] font-medium">Access Period (Top Tier)</td>
 <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
 <span className="text-[var(--foreground)] font-semibold">Unlimited</span>
 </td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">Unlimited</td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">Unlimited</td>
 <td className="py-4 px-3 text-center text-[var(--foreground)]">Unlimited</td>
 </tr>
  </tbody>
 </table>
 </div>
 <div className="mt-6 p-4 bg-[var(--card)] rounded-lg">
 <p className="text-sm text-[var(--muted)]">
 <strong className="text-[var(--foreground)]">Bottom line:</strong> We offer the same number of practice questions as Roger CPA, 500+ task-based simulations (matching Surgent!), and unlimited access until you pass. The main difference is we don&apos;t have video lectures. If you learn best from reading and practice, we&apos;re the smart choice.
 </p>
 <p className="text-xs text-[var(--muted)] mt-3 opacity-70">
 *Features are based on publicly available information as of January 2025. Verify current offerings directly with each provider.
 </p>
 </div>
 </div>

 {/* Our Commitment */}
 <div className="bg-white dark:bg-[var(--card)] p-8 rounded-xl border border-[var(--border)] mb-12">
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Our Commitment to You</h2>
 <div className="space-y-4">
 <div className="flex items-start space-x-3">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <p className="text-[var(--muted)]">
 <strong className="text-[var(--foreground)]">Honest pricing.</strong> No hidden fees, no surprise charges. What you see is what you pay.
 </p>
 </div>
 <div className="flex items-start space-x-3">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <p className="text-[var(--muted)]">
 <strong className="text-[var(--foreground)]">Quality content.</strong> Our practice questions are created using AI technology based on official Meridian CPA Reviews, with automated review for accuracy and relevance.
 </p>
 </div>
 <div className="flex items-start space-x-3">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <p className="text-[var(--muted)]">
 <strong className="text-[var(--foreground)]">Continuous improvement.</strong> We regularly update content based on exam changes and user feedback.
 </p>
 </div>
 <div className="flex items-start space-x-3">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <p className="text-[var(--muted)]">
 <strong className="text-[var(--foreground)]">We don&apos;t sell your data.</strong> Your email is used only for account access and occasional updates. We never sell or share your information.
 </p>
 </div>
 </div>
 </div>

 {/* CTA */}
 <div className="bg-[var(--primary)] p-8 rounded-xl text-white text-center">
 <h2 className="text-2xl font-bold mb-4">Ready to Start Studying?</h2>
 <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
 Get access to 6,000+ practice questions, 500+ task-based simulations, progress tracking, and unlimited access until you pass - free during beta.
 </p>
 <Link
 href="/signup"
 className="inline-block bg-white text-[var(--primary)] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
 >
 Create Free Account
 </Link>
 </div>
 </div>
 </div>
 );
}
