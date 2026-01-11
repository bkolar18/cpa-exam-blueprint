"use client";

import { useState, useEffect } from"react";
import Link from"next/link";
import {
 getNextScoreRelease,
 getUpcomingReleases,
 sectionInfo,
} from"@/lib/data/score-release-dates";

interface CountdownTime {
 days: number;
 hours: number;
 minutes: number;
 seconds: number;
}

function calculateCountdown(targetDate: Date): CountdownTime {
 const now = new Date();
 const difference = targetDate.getTime() - now.getTime();

 if (difference <= 0) {
 return { days: 0, hours: 0, minutes: 0, seconds: 0 };
 }

 return {
 days: Math.floor(difference / (1000 * 60 * 60 * 24)),
 hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
 minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
 seconds: Math.floor((difference % (1000 * 60)) / 1000),
 };
}

function formatDate(dateString: string): string {
 const date = new Date(dateString);
 return date.toLocaleDateString("en-US", {
 weekday:"long",
 year:"numeric",
 month:"long",
 day:"numeric",
 });
}

function formatShortDate(dateString: string): string {
 const date = new Date(dateString);
 return date.toLocaleDateString("en-US", {
 month:"short",
 day:"numeric",
 });
}

export default function ScoreReleaseCalendarPage() {
 const [filter, setFilter] = useState<"all"|"core"|"discipline">("all");
 const [countdown, setCountdown] = useState<CountdownTime | null>(null);
 const [email, setEmail] = useState("");
 const [isSubscribed, setIsSubscribed] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const nextRelease = getNextScoreRelease();
 const nextCoreRelease = getNextScoreRelease("core");
 const nextDisciplineRelease = getNextScoreRelease("discipline");

 const upcomingReleases = getUpcomingReleases(180).filter((release) => {
 if (filter ==="all") return true;
 return release.type === filter;
 });

 useEffect(() => {
 if (!nextRelease) return;

 const targetDate = new Date(nextRelease.date);

 const updateCountdown = () => {
 setCountdown(calculateCountdown(targetDate));
 };

 updateCountdown();
 const interval = setInterval(updateCountdown, 1000);

 return () => clearInterval(interval);
 }, [nextRelease]);

 const handleSubscribe = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!email) return;

 setIsSubmitting(true);

 try {
 const response = await fetch("/api/subscribe-score-release", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({ email }),
 });

 if (response.ok) {
 setIsSubscribed(true);
 }
 } catch (error) {
 console.error("Error subscribing:", error);
 }

 setIsSubmitting(false);
 };

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-[var(--background)]">
 {/* Hero Section */}
 <section className="bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="text-center">
 <h1 className="text-4xl md:text-5xl font-bold mb-4">
 CPA Exam Score Release Calendar
 </h1>
 <p className="text-xl text-white/80 max-w-2xl mx-auto">
 Track when your CPA exam scores will be released. Get notified
 before each release date.
 </p>
 </div>

 {/* Countdown Timer */}
 {nextRelease && countdown && (
 <div className="mt-12 max-w-3xl mx-auto">
 <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
 <p className="text-center text-white/80 mb-4">
 Next Score Release ({nextRelease.type ==="core"?"Core Sections":"Discipline Sections"})
 </p>
 <div className="grid grid-cols-4 gap-4 text-center">
 {[
 { label:"Days", value: countdown.days },
 { label:"Hours", value: countdown.hours },
 { label:"Minutes", value: countdown.minutes },
 { label:"Seconds", value: countdown.seconds },
 ].map((item) => (
 <div key={item.label}>
 <div className="text-4xl md:text-5xl font-bold">
 {item.value.toString().padStart(2,"0")}
 </div>
 <div className="text-sm text-white/70 mt-1">
 {item.label}
 </div>
 </div>
 ))}
 </div>
 <p className="text-center text-white/90 mt-6 font-medium">
 {formatDate(nextRelease.date)}
 </p>
 </div>
 </div>
 )}
 </div>
 </section>

 {/* Quick Stats */}
 <section className="py-8 border-b border-gray-200">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid md:grid-cols-2 gap-6">
 {/* Next Core Release */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-gray-200">
 <div className="flex items-center space-x-3 mb-3">
 <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center">
 <svg className="w-5 h-5 text-white"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
 </svg>
 </div>
 <div>
 <h3 className="font-semibold text-[var(--foreground)]">Next Core Section Release</h3>
 <p className="text-sm text-gray-600 dark:text-[var(--muted)]">FAR, AUD, REG</p>
 </div>
 </div>
 {nextCoreRelease && (
 <p className="text-lg font-medium text-[var(--primary)]">
 {formatDate(nextCoreRelease.date)}
 </p>
 )}
 </div>

 {/* Next Discipline Release */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-gray-200">
 <div className="flex items-center space-x-3 mb-3">
 <div className="w-10 h-10 bg-[var(--secondary)] rounded-lg flex items-center justify-center">
 <svg className="w-5 h-5 text-white"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
 </svg>
 </div>
 <div>
 <h3 className="font-semibold text-[var(--foreground)]">Next Discipline Release</h3>
 <p className="text-sm text-gray-600 dark:text-[var(--muted)]">BAR, TCP, ISC</p>
 </div>
 </div>
 {nextDisciplineRelease && (
 <div>
 <p className="text-lg font-medium text-[var(--secondary)]">
 {formatDate(nextDisciplineRelease.date)}
 </p>
 {nextDisciplineRelease.testingWindow && (
 <p className="text-sm text-gray-600 dark:text-[var(--muted)] mt-1">
 {nextDisciplineRelease.testingWindow}
 </p>
 )}
 </div>
 )}
 </div>
 </div>
 </div>
 </section>

 {/* Email Subscription */}
 <section className="py-8 bg-white border-b border-gray-200">
 <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
 {!isSubscribed ? (
 <div className="text-center">
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
 Get Score Release Reminders
 </h2>
 <p className="text-gray-600 dark:text-[var(--muted)] mb-6">
 We&apos;ll email you 3 days before each score release so you&apos;re never caught off guard.
 </p>
 <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
 <input
 type="email"
 placeholder="Enter your email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] rounded-xl focus:border-[var(--primary)] focus:outline-none"
 required
 />
 <button
 type="submit"
 disabled={isSubmitting}
 className="btn-secondary whitespace-nowrap disabled:opacity-50"
 >
 {isSubmitting ?"Subscribing...":"Notify Me"}
 </button>
 </form>
 <p className="text-sm text-gray-600 dark:text-[var(--muted)] mt-3">
 No spam. Unsubscribe anytime.
 </p>
 </div>
 ) : (
 <div className="text-center">
 <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-white"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 </div>
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
 You&apos;re All Set!
 </h2>
 <p className="text-gray-600 dark:text-[var(--muted)]">
 We&apos;ll notify you before each score release date.
 </p>
 </div>
 )}
 </div>
 </section>

 {/* Calendar View */}
 <section className="py-12">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
 <h2 className="text-2xl font-bold text-[var(--foreground)]">
 Upcoming Score Releases
 </h2>
 <div className="flex space-x-2">
 {[
 { value:"all", label:"All Sections"},
 { value:"core", label:"Core Only"},
 { value:"discipline", label:"Discipline Only"},
 ].map((option) => (
 <button
 key={option.value}
 onClick={() => setFilter(option.value as typeof filter)}
 className={`px-4 py-2 rounded-lg font-medium transition-colors ${
 filter === option.value
 ?"bg-[var(--primary)] text-white"
 :"bg-white text-[var(--foreground)] border border-gray-200 hover:bg-gray-100 dark:bg-[var(--card-hover)]"
 }`}
 >
 {option.label}
 </button>
 ))}
 </div>
 </div>

 <div className="space-y-4">
 {upcomingReleases.map((release, index) => (
 <div
 key={`${release.date}-${release.type}`}
 className={`bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-gray-200 ${
 index === 0 ?"ring-2 ring-[var(--primary)]":""
 }`}
 >
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
 <div className="flex items-center space-x-4">
 <div
 className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center ${
 release.type ==="core"
 ?"bg-[var(--primary)]"
 :"bg-[var(--secondary)]"
 }`}
 >
 <span className="text-white text-lg font-bold">
 {formatShortDate(release.date).split("")[1]}
 </span>
 <span className="text-white/80 text-xs">
 {formatShortDate(release.date).split("")[0]}
 </span>
 </div>
 <div>
 <h3 className="font-semibold text-[var(--foreground)]">
 {formatDate(release.date)}
 </h3>
 <p className="text-sm text-gray-600 dark:text-[var(--muted)]">
 {release.type ==="core"
 ?"Core Section Release"
 :"Discipline Section Release"}
 </p>
 {release.testingWindow && (
 <p className="text-sm text-gray-600 dark:text-[var(--muted)]">
 {release.testingWindow}
 </p>
 )}
 </div>
 </div>
 <div className="flex flex-wrap gap-2">
 {release.sections.map((section) => (
 <span
 key={section}
 className="px-3 py-1 rounded-full text-sm font-medium"
 style={{
 backgroundColor: `${sectionInfo[section as keyof typeof sectionInfo]?.color}15`,
 color: sectionInfo[section as keyof typeof sectionInfo]?.color,
 }}
 >
 {section}
 </span>
 ))}
 </div>
 </div>
 {index === 0 && (
 <div className="mt-4 pt-4 border-t border-gray-200">
 <span className="inline-flex items-center text-sm text-[var(--primary)] font-medium">
 <svg className="w-4 h-4 mr-1"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"clipRule="evenodd"/>
 </svg>
 Next Release
 </span>
 </div>
 )}
 </div>
 ))}
 </div>

 {upcomingReleases.length === 0 && (
 <div className="text-center py-12">
 <p className="text-gray-600 dark:text-[var(--muted)]">
 No upcoming releases found for the selected filter.
 </p>
 </div>
 )}
 </div>
 </section>

 {/* Info Section */}
 <section className="py-12 bg-white border-t border-gray-200">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8 text-center">
 Understanding CPA Exam Score Releases
 </h2>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="bg-gray-100 dark:bg-[var(--card-hover)] rounded-xl p-6">
 <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
 Core Sections (FAR, AUD, REG)
 </h3>
 <ul className="space-y-3 text-[var(--foreground)]">
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Continuous testing available year-round</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Scores released approximately every 2 weeks</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Typical wait: 2-3 weeks after exam</span>
 </li>
 </ul>
 </div>

 <div className="bg-gray-100 dark:bg-[var(--card-hover)] rounded-xl p-6">
 <h3 className="text-lg font-semibold text-[var(--secondary)] mb-4">
 Discipline Sections (BAR, TCP, ISC)
 </h3>
 <ul className="space-y-3 text-[var(--foreground)]">
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--primary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Quarterly testing windows (Jan, Apr, Jul, Oct)</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--primary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Scores released once per quarter</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--primary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Longer wait: 4-8 weeks after exam</span>
 </li>
 </ul>
 </div>
 </div>

 <div className="mt-8 text-center">
 <p className="text-gray-600 dark:text-[var(--muted)] mb-4">
 Ready to start preparing for your exam?
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
