"use client";

import Link from"next/link";
import { useAuth } from"@/components/auth/AuthProvider";

export default function CPAAcademyPage() {
 const { user, loading } = useAuth();

 const features = [
 {
 icon: (
 <svg className="w-8 h-8"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
 </svg>
 ),
 title:"Track Your Progress",
 description:"Monitor your study hours across all exam sections. See exactly where you stand and how close you are to your goals.",
 },
 {
 icon: (
 <svg className="w-8 h-8"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 ),
 title:"Study Log",
 description:"Log your daily study sessions with notes. Build consistency and maintain your streak to stay motivated.",
 },
 {
 icon: (
 <svg className="w-8 h-8"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
 </svg>
 ),
 title:"NTS Tracker",
 description:"Never miss an NTS expiration again. Track your Notice to Schedule and get reminders before deadlines.",
 },
 {
 icon: (
 <svg className="w-8 h-8"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
 </svg>
 ),
 title:"Practice Sessions",
 description:"Track your practice question performance. Monitor accuracy across sections and identify weak areas.",
 },
 {
 icon: (
 <svg className="w-8 h-8"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 3h14M5 3v4a7 7 0 0014 0V3M5 3H3m16 0h2M12 14v7m-4 0h8M8 21v-4m8 4v-4"/>
 </svg>
 ),
 title:"Achievements & Badges",
 description:"Earn badges and achievements as you progress. Unlock rewards and stay motivated with gamified milestones.",
 },
 {
 icon: (
 <svg className="w-8 h-8"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"/>
 </svg>
 ),
 title:"Study Streaks",
 description:"Build and maintain study streaks. Consistency is key to passing the CPA exam, and we help you stay on track.",
 },
 ];

 return (
 <div className="min-h-screen bg-[var(--background)]">
 {/* Hero Section */}
 <section className="bg-gradient-to-br from-[var(--primary)] to-blue-700 text-white py-20">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center">
 <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-6">
 Free Study Dashboard
 </span>
 <h1 className="text-4xl md:text-5xl font-bold mb-6">
 Meridian CPA Academy
 </h1>
 <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8">
 Your personal CPA exam command center. Track progress, earn achievements,
 and stay organized throughout your entire CPA journey.
 </p>
 {!loading && (
 <div className="flex flex-col sm:flex-row gap-4 justify-center">
 {user ? (
 <Link
 href="/dashboard"
 className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--primary)] font-bold rounded-lg hover:bg-blue-50 transition-colors"
 >
 Go to My Dashboard
 <svg className="w-5 h-5 ml-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
 </svg>
 </Link>
 ) : (
 <>
 <Link
 href="/signup"
 className="inline-flex items-center justify-center px-8 py-4 bg-white text-[var(--primary)] font-bold rounded-lg hover:bg-blue-50 transition-colors"
 >
 Create Free Account
 </Link>
 <Link
 href="/login"
 className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
 >
 Log In
 </Link>
 </>
 )}
 </div>
 )}
 </div>
 </div>
 </section>

 {/* Features Grid */}
 <section className="py-20">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center mb-16">
 <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
 Everything You Need to Pass
 </h2>
 <p className="text-lg text-gray-600 dark:text-[var(--muted-light)] max-w-2xl mx-auto">
 Our free dashboard gives you all the tools to stay organized, motivated,
 and on track to becoming a CPA.
 </p>
 </div>

 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
 {features.map((feature, index) => (
 <div
 key={index}
 className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
 >
 <div className="w-14 h-14 bg-[var(--primary)]/10 rounded-xl flex items-center justify-center text-[var(--primary)] mb-4">
 {feature.icon}
 </div>
 <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">
 {feature.title}
 </h3>
 <p className="text-gray-600 dark:text-[var(--muted-light)]">
 {feature.description}
 </p>
 </div>
 ))}
 </div>
 </div>
 </section>

 {/* Screenshot/Preview Section */}
 <section className="py-20 bg-gray-50 dark:bg-[var(--background)]">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid md:grid-cols-2 gap-12 items-center">
 <div>
 <h2 className="text-3xl font-bold text-[var(--foreground)] mb-6">
 Stay Motivated with Gamification
 </h2>
 <p className="text-lg text-gray-600 dark:text-[var(--muted-light)] mb-6">
 Studying for the CPA exam is a marathon, not a sprint. Our achievement
 system keeps you engaged with badges, streaks, and milestones that
 celebrate your progress.
 </p>
 <ul className="space-y-4">
 <li className="flex items-start space-x-3">
 <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
 <svg className="w-4 h-4 text-white"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 </div>
 <span className="text-[var(--foreground)]">Earn badges for study hour milestones</span>
 </li>
 <li className="flex items-start space-x-3">
 <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
 <svg className="w-4 h-4 text-white"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 </div>
 <span className="text-[var(--foreground)]">Unlock hidden achievements for special accomplishments</span>
 </li>
 <li className="flex items-start space-x-3">
 <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
 <svg className="w-4 h-4 text-white"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 </div>
 <span className="text-[var(--foreground)]">Build and maintain study streaks</span>
 </li>
 <li className="flex items-start space-x-3">
 <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
 <svg className="w-4 h-4 text-white"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 </div>
 <span className="text-[var(--foreground)]">Unlock exclusive rewards as you progress</span>
 </li>
 </ul>
 </div>
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-gray-200 p-8 shadow-lg">
 <div className="space-y-4">
 {/* Mock achievement cards */}
 <div className="flex items-center space-x-4 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
 <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
 ✓
 </div>
 <div>
 <div className="font-bold text-green-700 dark:text-green-300">First Steps</div>
 <div className="text-sm text-green-600 dark:text-green-400">Log your first study session</div>
 </div>
 <div className="ml-auto font-bold text-green-600 dark:text-green-400">+15 pts</div>
 </div>
 <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg border border-gray-200 dark:border-[var(--border)] opacity-60">
 <div className="w-12 h-12 bg-gray-300 dark:bg-gray-500 rounded-full flex items-center justify-center text-gray-500 dark:text-[var(--muted-light)] text-xl">
 🔒
 </div>
 <div>
 <div className="font-bold text-gray-600 dark:text-[var(--muted-light)]">Century Club</div>
 <div className="text-sm text-gray-500 dark:text-[var(--muted)]">Log 100 total study hours</div>
 </div>
 <div className="ml-auto font-bold text-gray-400 dark:text-[var(--muted)]">+30 pts</div>
 </div>
 <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-[var(--card-hover)] rounded-lg border border-gray-200 dark:border-[var(--border)] opacity-60">
 <div className="w-12 h-12 bg-gray-300 dark:bg-gray-500 rounded-full flex items-center justify-center text-gray-500 dark:text-[var(--muted-light)] text-xl">
 🔒
 </div>
 <div>
 <div className="font-bold text-gray-600 dark:text-[var(--muted-light)]">Night Owl</div>
 <div className="text-sm text-gray-500 dark:text-[var(--muted)] italic">???</div>
 </div>
 <div className="ml-auto font-bold text-gray-400 dark:text-[var(--muted)]">+15 pts</div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* CTA Section */}
 <section className="py-20">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
 Ready to Get Started?
 </h2>
 <p className="text-lg text-gray-600 dark:text-[var(--muted-light)] mb-8">
 Join thousands of CPA candidates using Meridian CPA Academy to stay organized and motivated.
 </p>
 {!loading && (
 <>
 {user ? (
 <Link
 href="/dashboard"
 className="btn-primary inline-flex items-center text-lg px-8 py-4"
 >
 Go to My Dashboard
 <svg className="w-5 h-5 ml-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
 </svg>
 </Link>
 ) : (
 <Link
 href="/signup"
 className="btn-primary inline-flex items-center text-lg px-8 py-4"
 >
 Create Your Free Account
 <svg className="w-5 h-5 ml-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
 </svg>
 </Link>
 )}
 </>
 )}
 <p className="mt-4 text-sm text-gray-500 dark:text-[var(--muted)]">
 100% free. No credit card required.
 </p>
 </div>
 </section>
 </div>
 );
}
