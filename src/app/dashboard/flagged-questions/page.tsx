"use client";

import { useState, useEffect } from"react";
import Link from"next/link";
import { useAuth } from"@/components/auth/AuthProvider";
import { createClient } from"@/lib/supabase/client";
import { getQuestionById, PracticeQuestion } from"@/lib/data/practice-questions";
import type { SectionCode } from"@/lib/supabase/types";

interface QuestionFlag {
 id: string;
 question_id: string;
 section: SectionCode;
 topic: string;
 subtopic: string | null;
 flag_return_to: boolean;
 flag_difficult: boolean;
 flag_easy: boolean;
 created_at: string;
 updated_at: string;
}

interface FlaggedQuestion extends QuestionFlag {
 question?: PracticeQuestion;
}

type FilterType ="all"|"return_to"|"difficult"|"easy";

const sectionNames: Record<string, string> = {
 FAR:"Financial Accounting & Reporting",
 AUD:"Auditing & Attestation",
 REG:"Regulation",
 TCP:"Tax Compliance & Planning",
 BAR:"Business Analysis & Reporting",
 ISC:"Information Systems & Controls",
};

const sectionColors: Record<string, string> = {
 FAR:"bg-blue-500",
 AUD:"bg-green-500",
 REG:"bg-purple-500",
 TCP:"bg-orange-500",
 BAR:"bg-pink-500",
 ISC:"bg-cyan-500",
};

export default function FlaggedQuestionsPage() {
 const { user } = useAuth();
 const supabase = createClient();
 const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestion[]>([]);
 const [isLoading, setIsLoading] = useState(true);
 const [selectedSection, setSelectedSection] = useState<string>("all");
 const [filterType, setFilterType] = useState<FilterType>("all");

 useEffect(() => {
 const loadFlaggedQuestions = async () => {
 if (!user || !supabase) {
 setIsLoading(false);
 return;
 }

 try {
 const { data, error } = await supabase
 .from("question_flags")
 .select("*")
 .eq("user_id", user.id)
 .order("updated_at", { ascending: false });

 if (error) throw error;

 // Debug: Log the raw data from database
 console.log("[FlaggedQuestions] Raw flags from DB:", data?.length || 0, "flags");
 if (data && data.length > 0) {
 console.log("[FlaggedQuestions] Sample flag IDs:", data.slice(0, 3).map((f: QuestionFlag) => f.question_id));
 }

 // Enrich with question data
 const enriched: FlaggedQuestion[] = (data || []).map((flag: QuestionFlag) => {
 const question = getQuestionById(flag.question_id);
 if (!question) {
 console.warn("[FlaggedQuestions] Question not found for ID:", flag.question_id);
 }
 return {
 ...flag,
 question,
 };
 });

 // Debug: Count how many questions were found
 const foundCount = enriched.filter(f => f.question).length;
 console.log(`[FlaggedQuestions] Found ${foundCount}/${enriched.length} questions in static data`);

 setFlaggedQuestions(enriched);
 } catch (error) {
 console.error("Failed to load flagged questions:", error);
 } finally {
 setIsLoading(false);
 }
 };

 loadFlaggedQuestions();
 }, [user, supabase]);

 const handleRemoveFlag = async (flagId: string, flagType:"flag_return_to"|"flag_difficult"|"flag_easy") => {
 if (!user || !supabase) return;

 // Optimistic update
 setFlaggedQuestions((prev) =>
 prev.map((f) =>
 f.id === flagId ? { ...f, [flagType]: false } : f
 ).filter((f) => f.flag_return_to || f.flag_difficult || f.flag_easy)
 );

 try {
 // Check if any flags remain
 const flag = flaggedQuestions.find((f) => f.id === flagId);
 if (!flag) return;

 const remainingFlags = {
 flag_return_to: flagType ==="flag_return_to"? false : flag.flag_return_to,
 flag_difficult: flagType ==="flag_difficult"? false : flag.flag_difficult,
 flag_easy: flagType ==="flag_easy"? false : flag.flag_easy,
 };

 if (!remainingFlags.flag_return_to && !remainingFlags.flag_difficult && !remainingFlags.flag_easy) {
 // Delete the record entirely
 await supabase.from("question_flags").delete().eq("id", flagId);
 } else {
 // Just update the specific flag
 await supabase
 .from("question_flags")
 .update({ [flagType]: false, updated_at: new Date().toISOString() })
 .eq("id", flagId);
 }
 } catch (error) {
 console.error("Failed to remove flag:", error);
 }
 };

 // Filter questions
 const filteredQuestions = flaggedQuestions.filter((fq) => {
 // Section filter
 if (selectedSection !=="all"&& fq.section !== selectedSection) return false;

 // Flag type filter
 if (filterType ==="return_to"&& !fq.flag_return_to) return false;
 if (filterType ==="difficult"&& !fq.flag_difficult) return false;
 if (filterType ==="easy"&& !fq.flag_easy) return false;

 return true;
 });

 // Count by type
 const counts = {
 all: flaggedQuestions.length,
 return_to: flaggedQuestions.filter((f) => f.flag_return_to).length,
 difficult: flaggedQuestions.filter((f) => f.flag_difficult).length,
 easy: flaggedQuestions.filter((f) => f.flag_easy).length,
 };

 // Count by section
 const sectionCounts = flaggedQuestions.reduce((acc, fq) => {
 acc[fq.section] = (acc[fq.section] || 0) + 1;
 return acc;
 }, {} as Record<string, number>);

 if (isLoading) {
 return (
 <div className="flex items-center justify-center min-h-[400px]">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
 </div>
 );
 }

 return (
 <div className="space-y-6">
 {/* Header */}
 <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white">
 <div className="flex items-center space-x-4">
 <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
 <svg className="w-7 h-7"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
 </svg>
 </div>
 <div>
 <h1 className="text-2xl font-bold">Flagged Questions</h1>
 <p className="text-white/80">
 {flaggedQuestions.length} question{flaggedQuestions.length !== 1 ?"s":""} flagged for review
 </p>
 </div>
 </div>
 </div>

 {flaggedQuestions.length === 0 ? (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 text-center">
 <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-purple-600 dark:text-purple-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
 </svg>
 </div>
 <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">No Flagged Questions</h2>
 <p className="text-[var(--muted)] mb-6">
 Flag questions during practice to return to them later, or mark them as difficult/easy.
 </p>
 <Link
 href="/dashboard/practice"
 className="inline-flex items-center px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
 >
 Start Practicing
 <svg className="w-4 h-4 ml-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
 </svg>
 </Link>
 </div>
 ) : (
 <>
 {/* Filters */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
 <div className="flex flex-col gap-4">
 {/* Flag type filter */}
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
 Filter by Flag Type
 </label>
 <div className="flex flex-wrap gap-2">
 <button
 onClick={() => setFilterType("all")}
 className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
 filterType ==="all"
 ?"bg-[var(--primary)] text-white"
 :"bg-gray-100 dark:bg-[var(--card-hover)] text-[var(--foreground)] hover:bg-gray-200 dark:hover:bg-gray-600"
 }`}
 >
 All ({counts.all})
 </button>
 <button
 onClick={() => setFilterType("return_to")}
 className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
 filterType ==="return_to"
 ?"bg-blue-500 text-white"
 :"bg-gray-100 dark:bg-[var(--card-hover)] text-[var(--foreground)] hover:bg-blue-100 dark:hover:bg-blue-900/30"
 }`}
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
 </svg>
 <span>Return To ({counts.return_to})</span>
 </button>
 <button
 onClick={() => setFilterType("difficult")}
 className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
 filterType ==="difficult"
 ?"bg-red-500 text-white"
 :"bg-gray-100 dark:bg-[var(--card-hover)] text-[var(--foreground)] hover:bg-red-100 dark:hover:bg-red-900/30"
 }`}
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
 </svg>
 <span>Difficult ({counts.difficult})</span>
 </button>
 <button
 onClick={() => setFilterType("easy")}
 className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
 filterType ==="easy"
 ?"bg-green-500 text-white"
 :"bg-gray-100 dark:bg-[var(--card-hover)] text-[var(--foreground)] hover:bg-green-100 dark:hover:bg-green-900/30"
 }`}
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 <span>Easy ({counts.easy})</span>
 </button>
 </div>
 </div>

 {/* Section filter */}
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
 Filter by Section
 </label>
 <div className="flex flex-wrap gap-2">
 <button
 onClick={() => setSelectedSection("all")}
 className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
 selectedSection ==="all"
 ?"bg-[var(--primary)] text-white"
 :"bg-gray-100 dark:bg-[var(--card-hover)] text-[var(--foreground)] hover:bg-gray-200 dark:hover:bg-gray-600"
 }`}
 >
 All Sections
 </button>
 {Object.keys(sectionCounts).map((section) => (
 <button
 key={section}
 onClick={() => setSelectedSection(section)}
 className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
 selectedSection === section
 ?"bg-[var(--primary)] text-white"
 :"bg-gray-100 dark:bg-[var(--card-hover)] text-[var(--foreground)] hover:bg-gray-200 dark:hover:bg-gray-600"
 }`}
 >
 {section} ({sectionCounts[section]})
 </button>
 ))}
 </div>
 </div>
 </div>
 </div>

 {/* Questions List */}
 <div className="space-y-4">
 {filteredQuestions.length === 0 ? (
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 text-center">
 <p className="text-[var(--muted)]">No questions match your filters.</p>
 </div>
 ) : (
 filteredQuestions.map((fq) => (
 <div
 key={fq.id}
 className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4"
 >
 {/* Header */}
 <div className="flex items-start justify-between mb-3">
 <div className="flex items-center space-x-2">
 <span className={`px-2 py-1 rounded text-xs font-bold text-white ${sectionColors[fq.section]}`}>
 {fq.section}
 </span>
 <span className="text-sm text-[var(--primary)] font-medium">{fq.topic}</span>
 {fq.subtopic && (
 <>
 <span className="text-[var(--muted)]">›</span>
 <span className="text-sm text-[var(--muted)]">{fq.subtopic}</span>
 </>
 )}
 </div>
 <div className="flex items-center space-x-1">
 {fq.flag_return_to && (
 <button
 onClick={() => handleRemoveFlag(fq.id,"flag_return_to")}
 className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
 title="Remove 'Return To' flag"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
 </svg>
 </button>
 )}
 {fq.flag_difficult && (
 <button
 onClick={() => handleRemoveFlag(fq.id,"flag_difficult")}
 className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
 title="Remove 'Difficult' flag"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
 </svg>
 </button>
 )}
 {fq.flag_easy && (
 <button
 onClick={() => handleRemoveFlag(fq.id,"flag_easy")}
 className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
 title="Remove 'Easy' flag"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M5 13l4 4L19 7"/>
 </svg>
 </button>
 )}
 </div>
 </div>

 {/* Question */}
 {fq.question ? (
 <div>
 <p className="text-[var(--foreground)] mb-2">{fq.question.question}</p>
 <div className="flex items-center justify-end">
 {/* Difficulty badge removed - let adaptive model handle question selection */}
 <span className="text-xs text-[var(--muted)]">
 Flagged {new Date(fq.updated_at).toLocaleDateString()}
 </span>
 </div>
 </div>
 ) : (
 <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
 <p className="text-amber-700 dark:text-amber-300 text-sm">
 Question data unavailable (ID: {fq.question_id})
 </p>
 <p className="text-xs text-[var(--muted)] mt-1">
 Flagged {new Date(fq.updated_at).toLocaleDateString()} • This question may have been updated or removed.
 </p>
 </div>
 )}
 </div>
 ))
 )}
 </div>
 </>
 )}
 </div>
 );
}
