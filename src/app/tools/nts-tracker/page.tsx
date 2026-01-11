"use client";

import { useState, useEffect } from"react";
import Link from"next/link";

interface CountdownTime {
 days: number;
 hours: number;
 minutes: number;
 seconds: number;
 isExpired: boolean;
}

function calculateCountdown(targetDate: Date): CountdownTime {
 const now = new Date();
 const difference = targetDate.getTime() - now.getTime();

 if (difference <= 0) {
 return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
 }

 return {
 days: Math.floor(difference / (1000 * 60 * 60 * 24)),
 hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
 minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
 seconds: Math.floor((difference % (1000 * 60)) / 1000),
 isExpired: false,
 };
}

function addMonths(date: Date, months: number): Date {
 const result = new Date(date);
 result.setMonth(result.getMonth() + months);
 return result;
}

function formatDate(date: Date): string {
 return date.toLocaleDateString("en-US", {
 weekday:"long",
 year:"numeric",
 month:"long",
 day:"numeric",
 });
}

export default function NTSTrackerPage() {
 const [ntsDate, setNtsDate] = useState("");
 const [expirationDate, setExpirationDate] = useState<Date | null>(null);
 const [countdown, setCountdown] = useState<CountdownTime | null>(null);
 const [email, setEmail] = useState("");
 const [isSubscribed, setIsSubscribed] = useState(false);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [showResults, setShowResults] = useState(false);

 useEffect(() => {
 if (!expirationDate) return;

 const updateCountdown = () => {
 setCountdown(calculateCountdown(expirationDate));
 };

 updateCountdown();
 const interval = setInterval(updateCountdown, 1000);

 return () => clearInterval(interval);
 }, [expirationDate]);

 const handleCalculate = () => {
 if (!ntsDate) return;

 const startDate = new Date(ntsDate);
 const expDate = addMonths(startDate, 6);
 setExpirationDate(expDate);
 setShowResults(true);
 };

 const handleSubscribe = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!email || !expirationDate) return;

 setIsSubmitting(true);

 try {
 const response = await fetch("/api/subscribe-nts", {
 method:"POST",
 headers: {"Content-Type":"application/json"},
 body: JSON.stringify({
 email,
 ntsDate,
 expirationDate: expirationDate.toISOString(),
 }),
 });

 if (response.ok) {
 setIsSubscribed(true);
 }
 } catch (error) {
 console.error("Error subscribing:", error);
 }

 setIsSubmitting(false);
 };

 const getUrgencyColor = () => {
 if (!countdown) return"var(--primary)";
 if (countdown.isExpired) return"#dc2626";
 if (countdown.days <= 7) return"#dc2626";
 if (countdown.days <= 14) return"#ea580c";
 if (countdown.days <= 30) return"#ca8a04";
 return"var(--secondary)";
 };

 const getUrgencyMessage = () => {
 if (!countdown) return"";
 if (countdown.isExpired) return"Your NTS has expired!";
 if (countdown.days <= 7) return"Critical: Less than a week remaining!";
 if (countdown.days <= 14) return"Urgent: Schedule your exam now!";
 if (countdown.days <= 30) return"Reminder: Schedule soon to ensure availability";
 return"You're in good shape - plan your exam date";
 };

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-[var(--background)]">
 {/* Hero Section */}
 <section className="bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <h1 className="text-4xl md:text-5xl font-bold mb-4">
 NTS Expiration Tracker
 </h1>
 <p className="text-xl text-white/80 max-w-2xl mx-auto">
 Never let your Notice to Schedule expire. Track your 6-month window and get reminded before it&apos;s too late.
 </p>
 </div>
 </section>

 {/* Calculator Section */}
 <section className="py-12">
 <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-white dark:bg-[var(--card)] rounded-2xl p-8 shadow-sm border border-gray-200">
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
 When does your NTS expire?
 </h2>

 <div className="space-y-6">
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
 NTS Issue Date
 </label>
 <p className="text-sm text-gray-600 dark:text-[var(--muted)] mb-3">
 Enter the date your Notice to Schedule was issued (found on your NTS document)
 </p>
 <input
 type="date"
 value={ntsDate}
 onChange={(e) => setNtsDate(e.target.value)}
 className="w-full px-4 py-3 border-2 border-gray-200 dark:border-[var(--border)] bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] rounded-xl focus:border-[var(--primary)] focus:outline-none transition-colors"
 />
 </div>

 <button
 onClick={handleCalculate}
 disabled={!ntsDate}
 className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
 >
 Calculate Expiration Date
 </button>
 </div>
 </div>

 {/* Results */}
 {showResults && expirationDate && countdown && (
 <div className="mt-8 space-y-6">
 {/* Countdown Card */}
 <div
 className="rounded-2xl p-8 text-white"
 style={{ backgroundColor: getUrgencyColor() }}
 >
 <p className="text-center text-white/80 mb-2">
 {countdown.isExpired ?"Expired":"Time Remaining"}
 </p>

 {!countdown.isExpired && (
 <div className="grid grid-cols-4 gap-4 text-center mb-6">
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
 )}

 <div className="text-center">
 <p className="font-medium text-lg mb-1">
 {countdown.isExpired ?"Expired on":"Expires on"}
 </p>
 <p className="text-xl font-bold">{formatDate(expirationDate)}</p>
 </div>

 <div className="mt-4 text-center">
 <p className="text-white/90 font-medium">
 {getUrgencyMessage()}
 </p>
 </div>
 </div>

 {/* Key Dates */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-gray-200">
 <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
 Important Dates
 </h3>
 <div className="space-y-3">
 <div className="flex justify-between items-center py-2 border-b border-gray-200">
 <span className="text-gray-600 dark:text-[var(--muted)]">NTS Issued</span>
 <span className="font-medium text-[var(--foreground)]">
 {formatDate(new Date(ntsDate))}
 </span>
 </div>
 <div className="flex justify-between items-center py-2 border-b border-gray-200">
 <span className="text-gray-600 dark:text-[var(--muted)]">30 Days Before</span>
 <span className="font-medium text-[var(--foreground)]">
 {formatDate(new Date(expirationDate.getTime() - 30 * 24 * 60 * 60 * 1000))}
 </span>
 </div>
 <div className="flex justify-between items-center py-2 border-b border-gray-200">
 <span className="text-gray-600 dark:text-[var(--muted)]">14 Days Before</span>
 <span className="font-medium text-[var(--foreground)]">
 {formatDate(new Date(expirationDate.getTime() - 14 * 24 * 60 * 60 * 1000))}
 </span>
 </div>
 <div className="flex justify-between items-center py-2">
 <span className="text-gray-600 dark:text-[var(--muted)]">7 Days Before</span>
 <span className="font-medium text-[var(--foreground)]">
 {formatDate(new Date(expirationDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
 </span>
 </div>
 </div>
 </div>

 {/* Email Subscription */}
 {!isSubscribed ? (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-gray-200">
 <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
 Get Expiration Reminders
 </h3>
 <p className="text-gray-600 dark:text-[var(--muted)] mb-4">
 We&apos;ll email you at 30, 14, and 7 days before your NTS expires.
 </p>
 <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
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
 {isSubmitting ?"Subscribing...":"Remind Me"}
 </button>
 </form>
 </div>
 ) : (
 <div className="bg-[var(--secondary)] bg-opacity-10 rounded-xl p-6 border border-[var(--secondary)]">
 <div className="flex items-center space-x-3">
 <div className="w-10 h-10 bg-[var(--secondary)] rounded-full flex items-center justify-center">
 <svg className="w-5 h-5 text-white"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 </div>
 <div>
 <p className="font-semibold text-[var(--foreground)]">Reminders Set!</p>
 <p className="text-sm text-gray-600 dark:text-[var(--muted)]">
 We&apos;ll notify you before your NTS expires.
 </p>
 </div>
 </div>
 </div>
 )}
 </div>
 )}
 </div>
 </section>

 {/* Info Section */}
 <section className="py-12 bg-white border-t border-gray-200">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8 text-center">
 About Your Notice to Schedule (NTS)
 </h2>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="bg-gray-100 dark:bg-[var(--card-hover)] rounded-xl p-6">
 <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
 What is an NTS?
 </h3>
 <p className="text-[var(--foreground)]">
 Your Notice to Schedule (NTS) is authorization from your state board to take the CPA exam. Once issued, you have <strong>6 months</strong> to schedule and take your exam section.
 </p>
 </div>

 <div className="bg-gray-100 dark:bg-[var(--card-hover)] rounded-xl p-6">
 <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
 What happens if it expires?
 </h3>
 <p className="text-[var(--foreground)]">
 If your NTS expires before you take the exam, you&apos;ll need to <strong>reapply and pay the fees again</strong>. There are no refunds for unused NTS periods.
 </p>
 </div>

 <div className="bg-gray-100 dark:bg-[var(--card-hover)] rounded-xl p-6">
 <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
 Best Practices
 </h3>
 <ul className="space-y-2 text-[var(--foreground)]">
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Schedule your exam within 30 days of receiving NTS</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Book popular dates early - they fill up fast</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Only apply for sections you&apos;re ready to take</span>
 </li>
 </ul>
 </div>

 <div className="bg-gray-100 dark:bg-[var(--card-hover)] rounded-xl p-6">
 <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
 NTS Fees by State
 </h3>
 <p className="text-[var(--foreground)] mb-3">
 NTS fees vary by state, typically ranging from $50-$200 per section. Check your state board for exact fees.
 </p>
 <Link
 href="/state-requirements"
 className="text-[var(--primary)] font-medium hover:underline inline-flex items-center"
 >
 View State Requirements
 <svg className="w-4 h-4 ml-1"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5l7 7-7 7"/>
 </svg>
 </Link>
 </div>
 </div>

 <div className="mt-8 text-center">
 <p className="text-gray-600 dark:text-[var(--muted)] mb-4">
 Ready to create your study plan?
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
