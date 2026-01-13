"use client";

import { useState } from"react";
import Link from"next/link";

// Recommended study hours per section based on industry data
const sectionData = {
 FAR: {
 name:"Financial Accounting and Reporting",
 recommendedHours: 350,
 passRate: 42,
 difficulty:"Hardest Core",
 color:"#1e3a5f",
 },
 AUD: {
 name:"Auditing and Attestation",
 recommendedHours: 280,
 passRate: 48,
 difficulty:"Moderate",
 color:"#0891b2",
 },
 REG: {
 name:"Taxation and Regulation",
 recommendedHours: 280,
 passRate: 61,
 difficulty:"Moderate",
 color:"#7c3aed",
 },
 BAR: {
 name:"Business Analysis and Reporting",
 recommendedHours: 180,
 passRate: 37,
 difficulty:"Hardest Discipline",
 color:"#dc2626",
 },
 TCP: {
 name:"Tax Compliance and Planning",
 recommendedHours: 150,
 passRate: 77,
 difficulty:"Easiest",
 color:"#16a34a",
 },
 ISC: {
 name:"Information Systems and Controls",
 recommendedHours: 160,
 passRate: 51,
 difficulty:"Moderate",
 color:"#ea580c",
 },
};

type SectionKey = keyof typeof sectionData;

interface CalculationResult {
 section: SectionKey;
 weeksNeeded: number;
 targetDate: Date;
 hoursPerDay: number;
 feasibility:"comfortable"|"challenging"|"aggressive"|"unrealistic";
}

export default function StudyHoursCalculatorPage() {
 const [selectedSection, setSelectedSection] = useState<SectionKey |"">("");
 const [examDate, setExamDate] = useState("");
 const [hoursPerWeek, setHoursPerWeek] = useState("");
 const [accountingBackground, setAccountingBackground] = useState<"strong"|"moderate"|"limited">("moderate");
 const [result, setResult] = useState<CalculationResult | null>(null);
 const [showResult, setShowResult] = useState(false);

 const calculateStudyPlan = () => {
 if (!selectedSection || !examDate || !hoursPerWeek) return;

 const section = sectionData[selectedSection];
 const weeklyHours = parseInt(hoursPerWeek);
 const targetDate = new Date(examDate);
 const today = new Date();

 // Adjust recommended hours based on background
 let adjustedHours = section.recommendedHours;
 if (accountingBackground ==="strong") {
 adjustedHours = Math.round(section.recommendedHours * 0.8);
 } else if (accountingBackground ==="limited") {
 adjustedHours = Math.round(section.recommendedHours * 1.2);
 }

 const weeksNeeded = Math.ceil(adjustedHours / weeklyHours);
 const weeksAvailable = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 7));

 // Calculate hours per day (assuming 7 days a week)
 const hoursPerDay = weeklyHours / 7;

 // Determine feasibility
 let feasibility: CalculationResult["feasibility"];
 const weekRatio = weeksAvailable / weeksNeeded;

 if (weekRatio >= 1.2) {
 feasibility ="comfortable";
 } else if (weekRatio >= 0.9) {
 feasibility ="challenging";
 } else if (weekRatio >= 0.6) {
 feasibility ="aggressive";
 } else {
 feasibility ="unrealistic";
 }

 setResult({
 section: selectedSection,
 weeksNeeded,
 targetDate,
 hoursPerDay,
 feasibility,
 });
 setShowResult(true);
 };

 const getFeasibilityColor = (feasibility: CalculationResult["feasibility"]) => {
 switch (feasibility) {
 case"comfortable":
 return"#16a34a";
 case"challenging":
 return"#ca8a04";
 case"aggressive":
 return"#ea580c";
 case"unrealistic":
 return"#dc2626";
 }
 };

 const getFeasibilityMessage = (feasibility: CalculationResult["feasibility"]) => {
 switch (feasibility) {
 case"comfortable":
 return"You have plenty of time! This is a comfortable study schedule.";
 case"challenging":
 return"This is doable but will require consistent effort. Stay disciplined!";
 case"aggressive":
 return"This is an aggressive timeline. Consider moving your exam date if possible.";
 case"unrealistic":
 return"This timeline may not be realistic. We strongly recommend rescheduling your exam.";
 }
 };

 return (
 <div className="min-h-screen bg-gray-50 dark:bg-[var(--background)]">
 {/* Hero Section */}
 <section className="bg-gradient-to-b from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
 <h1 className="text-4xl md:text-5xl font-bold mb-4">
 Study Hours Calculator
 </h1>
 <p className="text-xl text-white/80 max-w-2xl mx-auto">
 Find out exactly how many hours per day you need to prepare for your CPA exam section.
 </p>
 </div>
 </section>

 {/* Calculator Section */}
 <section className="py-12">
 <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="bg-white dark:bg-[var(--card)] rounded-2xl p-8 shadow-sm border border-gray-200">
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
 Calculate Your Study Schedule
 </h2>

 <div className="space-y-6">
 {/* Section Selection */}
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
 Which section are you studying for?
 </label>
 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
 {(Object.keys(sectionData) as SectionKey[]).map((section) => (
 <button
 key={section}
 onClick={() => setSelectedSection(section)}
 className={`p-3 border-2 rounded-xl text-center transition-all ${
 selectedSection === section
 ?"border-[var(--primary)] bg-[var(--primary)] text-white"
 :"border-[var(--border)] hover:border-[var(--primary)]"
 }`}
 >
 <span className="font-semibold">{section}</span>
 </button>
 ))}
 </div>
 </div>

 {/* Exam Date */}
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
 When is your exam date?
 </label>
 <input
 type="date"
 value={examDate}
 onChange={(e) => setExamDate(e.target.value)}
 min={new Date().toISOString().split("T")[0]}
 className="w-full px-4 py-3 border-2 border-gray-200 dark:border-[var(--border)] rounded-xl focus:border-[var(--primary)] focus:outline-none transition-colors"
 />
 </div>

 {/* Hours Per Week */}
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
 How many hours per week can you study?
 </label>
 <select
 value={hoursPerWeek}
 onChange={(e) => setHoursPerWeek(e.target.value)}
 className="w-full px-4 py-3 border-2 border-gray-200 dark:border-[var(--border)] rounded-xl focus:border-[var(--primary)] focus:outline-none transition-colors"
 >
 <option value="">Select hours per week</option>
 <option value="10">10 hours (light schedule)</option>
 <option value="15">15 hours (part-time)</option>
 <option value="20">20 hours (moderate)</option>
 <option value="25">25 hours (committed)</option>
 <option value="30">30 hours (intensive)</option>
 <option value="40">40 hours (full-time)</option>
 </select>
 </div>

 {/* Background */}
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
 What&apos;s your accounting background?
 </label>
 <div className="space-y-2">
 {[
 { value:"strong", label:"Strong", desc:"Degree + work experience"},
 { value:"moderate", label:"Moderate", desc:"Some coursework or experience"},
 { value:"limited", label:"Limited", desc:"New to accounting"},
 ].map((option) => (
 <button
 key={option.value}
 onClick={() => setAccountingBackground(option.value as typeof accountingBackground)}
 className={`w-full p-3 border-2 rounded-xl text-left transition-all ${
 accountingBackground === option.value
 ?"border-[var(--primary)] bg-[var(--primary)] text-white"
 :"border-[var(--border)] hover:border-[var(--primary)]"
 }`}
 >
 <span className="font-medium">{option.label}</span>
 <span className={`text-sm ml-2 ${accountingBackground === option.value ?"text-white/80":"text-gray-600 dark:text-[var(--muted)]"}`}>- {option.desc}</span>
 </button>
 ))}
 </div>
 </div>

 <button
 onClick={calculateStudyPlan}
 disabled={!selectedSection || !examDate || !hoursPerWeek}
 className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
 >
 Calculate My Schedule
 </button>
 </div>
 </div>

 {/* Results */}
 {showResult && result && selectedSection && (
 <div className="mt-8 space-y-6">
 {/* Feasibility Card */}
 <div
 className="rounded-2xl p-8 text-white"
 style={{ backgroundColor: getFeasibilityColor(result.feasibility) }}
 >
 <div className="text-center">
 <h3 className="text-2xl font-bold mb-2">
 {result.feasibility ==="comfortable"&&"You're Set!"}
 {result.feasibility ==="challenging"&&"Challenging but Doable"}
 {result.feasibility ==="aggressive"&&"Aggressive Timeline"}
 {result.feasibility ==="unrealistic"&&"Timeline Concerns"}
 </h3>
 <p className="text-white/90">
 {getFeasibilityMessage(result.feasibility)}
 </p>
 </div>
 </div>

 {/* Detailed Breakdown */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-gray-200">
 <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
 Your {selectedSection} Study Plan
 </h3>

 <div className="space-y-4">
 <div className="flex justify-between items-center py-3 border-b border-gray-200">
 <span className="text-gray-600 dark:text-[var(--muted)]">Recommended Study Hours</span>
 <span className="font-semibold text-[var(--foreground)]">
 {sectionData[selectedSection].recommendedHours} hours
 </span>
 </div>

 <div className="flex justify-between items-center py-3 border-b border-gray-200">
 <span className="text-gray-600 dark:text-[var(--muted)]">
 Adjusted for Your Background
 </span>
 <span className="font-semibold text-[var(--foreground)]">
 {accountingBackground ==="strong"
 ? Math.round(sectionData[selectedSection].recommendedHours * 0.8)
 : accountingBackground ==="limited"
 ? Math.round(sectionData[selectedSection].recommendedHours * 1.2)
 : sectionData[selectedSection].recommendedHours}{""}
 hours
 </span>
 </div>

 <div className="flex justify-between items-center py-3 border-b border-gray-200">
 <span className="text-gray-600 dark:text-[var(--muted)]">Weeks Needed</span>
 <span className="font-semibold text-[var(--foreground)]">
 {result.weeksNeeded} weeks
 </span>
 </div>

 <div className="flex justify-between items-center py-3 border-b border-gray-200">
 <span className="text-gray-600 dark:text-[var(--muted)]">Average Hours Per Day</span>
 <span className="font-semibold text-[var(--foreground)]">
 {result.hoursPerDay.toFixed(1)} hours
 </span>
 </div>

 <div className="flex justify-between items-center py-3">
 <span className="text-gray-600 dark:text-[var(--muted)]">Section Pass Rate</span>
 <span className="font-semibold text-[var(--foreground)]">
 {sectionData[selectedSection].passRate}%
 </span>
 </div>
 </div>
 </div>

 {/* Section Comparison */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl p-6 border border-gray-200">
 <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
 All Sections Comparison
 </h3>
 <div className="space-y-3">
 {(Object.entries(sectionData) as [SectionKey, typeof sectionData[SectionKey]][]).map(
 ([key, section]) => (
 <div key={key} className="flex items-center space-x-4">
 <div
 className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm"
 style={{ backgroundColor: section.color }}
 >
 {key}
 </div>
 <div className="flex-1">
 <div className="flex justify-between items-center mb-1">
 <span className="font-medium text-[var(--foreground)]">{section.name}</span>
 <span className="text-sm text-gray-600 dark:text-[var(--muted)]">{section.recommendedHours}h</span>
 </div>
 <div className="w-full bg-[var(--border)] rounded-full h-2">
 <div
 className="h-2 rounded-full"
 style={{
 width: `${(section.recommendedHours / 350) * 100}%`,
 backgroundColor: section.color,
 }}
 />
 </div>
 </div>
 </div>
 )
 )}
 </div>
 </div>

 {/* CTA */}
 <div className="bg-gray-100 dark:bg-[var(--card-hover)] rounded-xl p-6 border border-gray-200 text-center">
 <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
 Need a Complete Study Plan?
 </h3>
 <p className="text-gray-600 dark:text-[var(--muted)] mb-4">
 Get a personalized study schedule for all four sections based on your unique situation.
 </p>
 <Link href="/study-plan"className="btn-primary inline-block">
 Get Your Free Study Plan
 </Link>
 </div>
 </div>
 )}
 </div>
 </section>

 {/* Info Section */}
 <section className="py-12 bg-white dark:bg-[var(--background)] border-t border-gray-200 dark:border-[var(--border)]">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
 <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8 text-center">
 How We Calculate Study Hours
 </h2>

 <div className="grid md:grid-cols-2 gap-8">
 <div className="bg-gray-100 dark:bg-[var(--card-hover)] rounded-xl p-6">
 <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
 Industry Recommendations
 </h3>
 <p className="text-[var(--foreground)] mb-4">
 Our study hour estimates are based on data from CPA review courses and successful candidates:
 </p>
 <ul className="space-y-2 text-[var(--foreground)]">
 <li>• <strong>FAR:</strong> 300-400 hours (largest content area)</li>
 <li>• <strong>AUD:</strong> 250-300 hours</li>
 <li>• <strong>REG:</strong> 250-300 hours</li>
 <li>• <strong>Disciplines:</strong> 120-200 hours</li>
 </ul>
 </div>

 <div className="bg-gray-100 dark:bg-[var(--card-hover)] rounded-xl p-6">
 <h3 className="text-lg font-semibold text-[var(--primary)] mb-4">
 Factors That Affect Your Timeline
 </h3>
 <ul className="space-y-3 text-[var(--foreground)]">
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Prior accounting knowledge reduces study time</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Quality of study matters more than quantity</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Practice questions are crucial for success</span>
 </li>
 <li className="flex items-start space-x-2">
 <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0"fill="currentColor"viewBox="0 0 20 20">
 <path fillRule="evenodd"d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"clipRule="evenodd"/>
 </svg>
 <span>Consistency beats cramming every time</span>
 </li>
 </ul>
 </div>
 </div>
 </div>
 </section>
 </div>
 );
}
