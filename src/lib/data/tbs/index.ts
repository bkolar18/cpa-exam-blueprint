// TBS Question Bank Index
// Consolidates all Task-Based Simulation exports from section-specific files
//
// IMPORTANT: Two separate TBS banks exist:
// 1. PRACTICE TBS (far-tbs, aud-tbs, etc.) - shown in TBS dashboard for drilling
// 2. EXAM TBS (exam-tbs) - used ONLY in exam simulations, never shown in practice
//
// This separation ensures students see fresh questions during exam simulations

// Export types
export * from "./types";

// Import section-specific TBS arrays (PRACTICE bank)
import { farTBSQuestions } from "./far-tbs";
import { audTBSQuestions } from "./aud-tbs";
import { regTBSQuestions } from "./reg-tbs";
import { tcpTBSQuestions } from "./tcp-tbs";
import { barTBSQuestions } from "./bar-tbs";
import { iscTBSQuestions } from "./isc-tbs";

// Import exam TBS bank (separate from practice)
import { examTBSQuestions } from "./exam-tbs";

// Re-export section arrays for individual use (PRACTICE bank)
export { farTBSQuestions } from "./far-tbs";
export { audTBSQuestions } from "./aud-tbs";
export { regTBSQuestions } from "./reg-tbs";
export { tcpTBSQuestions } from "./tcp-tbs";
export { barTBSQuestions } from "./bar-tbs";
export { iscTBSQuestions } from "./isc-tbs";

// Re-export exam TBS bank and helpers
export { examTBSQuestions, getExamTBSById, getExamTBSBySection } from "./exam-tbs";

// Legacy alias for backward compatibility
export { sampleTBSQuestions } from "./exam-tbs";

// Combined array of all PRACTICE TBS questions (shown in TBS dashboard)
// Note: examTBSQuestions are kept separate and not included here
export const allTBSQuestions = [
  ...farTBSQuestions,
  ...audTBSQuestions,
  ...regTBSQuestions,
  ...tcpTBSQuestions,
  ...barTBSQuestions,
  ...iscTBSQuestions,
];

// Statistics for question bank
export const tbsStatistics = {
  totalQuestions: allTBSQuestions.length,
  bySection: {
    FAR: farTBSQuestions.length,
    AUD: audTBSQuestions.length,
    REG: regTBSQuestions.length,
    TCP: tcpTBSQuestions.length,
    BAR: barTBSQuestions.length,
    ISC: iscTBSQuestions.length,
  },
  byDifficulty: {
    easy: allTBSQuestions.filter((q) => q.difficulty === "easy").length,
    medium: allTBSQuestions.filter((q) => q.difficulty === "medium").length,
    hard: allTBSQuestions.filter((q) => q.difficulty === "hard").length,
  },
  byType: {
    numeric_entry: allTBSQuestions.filter((q) => q.tbsType === "numeric_entry")
      .length,
    dropdown: allTBSQuestions.filter((q) => q.tbsType === "dropdown").length,
    document_review: allTBSQuestions.filter(
      (q) => q.tbsType === "document_review"
    ).length,
    journal_entry: allTBSQuestions.filter((q) => q.tbsType === "journal_entry")
      .length,
    research: allTBSQuestions.filter((q) => q.tbsType === "research").length,
  },
};

// Helper function to get TBS questions by section
export function getTBSBySection(
  section: "FAR" | "AUD" | "REG" | "TCP" | "BAR" | "ISC"
) {
  switch (section) {
    case "FAR":
      return farTBSQuestions;
    case "AUD":
      return audTBSQuestions;
    case "REG":
      return regTBSQuestions;
    case "TCP":
      return tcpTBSQuestions;
    case "BAR":
      return barTBSQuestions;
    case "ISC":
      return iscTBSQuestions;
  }
}

// Helper function to get a TBS by ID from ALL TBS banks
// Searches practice TBS first, then exam TBS (for historical exam reviews)
export function getTBSById(id: string) {
  return allTBSQuestions.find((tbs) => tbs.id === id)
    || examTBSQuestions.find((tbs) => tbs.id === id);
}

// Helper function to get random TBS questions for practice
export function getRandomTBS(count: number, section?: string) {
  const pool = section
    ? allTBSQuestions.filter((q) => q.section === section)
    : allTBSQuestions;

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
