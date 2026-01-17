// TBS Question Bank Index
// Consolidates all Task-Based Simulation exports from section-specific files
//
// IMPORTANT: Two separate TBS banks exist:
// 1. PRACTICE TBS (far-tbs, aud-tbs, etc.) - shown in TBS dashboard for drilling
// 2. EXAM TBS (exam-tbs) - used ONLY in exam simulations, never shown in practice
//
// This separation ensures students see fresh questions during exam simulations
//
// TAX CONTENT VERSIONING (REG/TCP):
// OBBBA versions available for post-July 2026 testing windows
// Students can select their tax content version in Settings

// Export types
export * from "./types";

// Import section-specific TBS arrays (PRACTICE bank)
import { farTBSQuestions } from "./far-tbs";
import { audTBSQuestions } from "./aud-tbs";
import { regTBSQuestions } from "./reg-tbs";
import { tcpTBSQuestions } from "./tcp-tbs";
import { barTBSQuestions } from "./bar-tbs";
import { iscTBSQuestions } from "./isc-tbs";

// OBBBA versions for tax-affected sections (post-July 2026)
import { regTBSQuestionsOBBBA } from "./reg-tbs-obbba";
import { tcpTBSQuestionsOBBBA } from "./tcp-tbs-obbba";

// Import exam TBS bank (separate from practice)
import { examTBSQuestions } from "./exam-tbs";

// Import tax content version utilities
import {
  type TaxContentVersion,
  isTaxAffectedSection,
} from "@/lib/utils/tax-content-version";

// Re-export section arrays for individual use (PRACTICE bank)
export { farTBSQuestions } from "./far-tbs";
export { audTBSQuestions } from "./aud-tbs";
export { regTBSQuestions } from "./reg-tbs";
export { tcpTBSQuestions } from "./tcp-tbs";
export { barTBSQuestions } from "./bar-tbs";
export { iscTBSQuestions } from "./isc-tbs";

// Re-export OBBBA TBS for tax-affected sections
export { regTBSQuestionsOBBBA } from "./reg-tbs-obbba";
export { tcpTBSQuestionsOBBBA } from "./tcp-tbs-obbba";

// Re-export exam TBS bank and helpers
export { examTBSQuestions, getExamTBSById, getExamTBSBySection } from "./exam-tbs";

// Legacy alias for backward compatibility
export { sampleTBSQuestions } from "./exam-tbs";

/**
 * Versioned TBS sets for tax-affected sections (REG/TCP).
 *
 * For TCJA (pre-July 2026): Uses current content (2024 tax year figures)
 * For OBBBA (post-July 2026): Uses OBBBA-specific content
 *
 * Students select their version via Settings > Tax Content Version
 * or automatically based on their target completion date.
 */
export const versionedTBSSets: Record<
  "REG" | "TCP",
  Record<TaxContentVersion, typeof regTBSQuestions>
> = {
  REG: {
    tcja: regTBSQuestions,       // Current TCJA content (pre-July 2026)
    obbba: regTBSQuestionsOBBBA, // OBBBA content (post-July 2026)
  },
  TCP: {
    tcja: tcpTBSQuestions,       // Current TCJA content (pre-July 2026)
    obbba: tcpTBSQuestionsOBBBA, // OBBBA content (post-July 2026)
  },
};

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
  // OBBBA versions (for post-July 2026 testing)
  bySection_OBBBA: {
    REG: regTBSQuestionsOBBBA.length,
    TCP: tcpTBSQuestionsOBBBA.length,
  },
  byDifficulty: {
    easy: allTBSQuestions.filter((q) => q.difficulty === "easy").length,
    medium: allTBSQuestions.filter((q) => q.difficulty === "medium").length,
    hard: allTBSQuestions.filter((q) => q.difficulty === "hard").length,
  },
  // TBS Types (CPA Evolution 2024 format)
  // Note: 'research' and 'written_communication' were ELIMINATED in 2024
  byType: {
    numeric_entry: allTBSQuestions.filter((q) => q.tbsType === "numeric_entry")
      .length,
    dropdown: allTBSQuestions.filter((q) => q.tbsType === "dropdown").length,
    document_review: allTBSQuestions.filter(
      (q) => q.tbsType === "document_review"
    ).length,
    journal_entry: allTBSQuestions.filter((q) => q.tbsType === "journal_entry")
      .length,
    reconciliation: allTBSQuestions.filter((q) => q.tbsType === "reconciliation")
      .length,
    exhibit_analysis: allTBSQuestions.filter((q) => q.tbsType === "exhibit_analysis")
      .length,
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

/**
 * Get TBS questions for a section with tax content version awareness.
 *
 * For tax-affected sections (REG, TCP), returns version-specific TBS.
 * For non-tax sections (FAR, AUD, BAR, ISC), returns standard TBS.
 *
 * @param section - The section code
 * @param taxContentVersion - The tax content version ('tcja' or 'obbba')
 * @returns Array of TBS questions for the section
 */
export function getTBSBySectionVersioned(
  section: "FAR" | "AUD" | "REG" | "TCP" | "BAR" | "ISC",
  taxContentVersion: TaxContentVersion
) {
  // For non-tax sections, return standard TBS
  if (!isTaxAffectedSection(section)) {
    return getTBSBySection(section);
  }

  // For REG/TCP, return version-specific TBS
  const versionedSet = versionedTBSSets[section as "REG" | "TCP"];
  const tbsQuestions = versionedSet?.[taxContentVersion];

  // Fallback to standard TBS if versioned set not available
  if (!tbsQuestions || tbsQuestions.length === 0) {
    console.warn(
      `Versioned TBS set not found for ${section}/${taxContentVersion}, falling back to default`
    );
    return getTBSBySection(section);
  }

  return tbsQuestions;
}

/**
 * Get TBS count for a section with version awareness.
 */
export function getTBSCountVersioned(
  section: "FAR" | "AUD" | "REG" | "TCP" | "BAR" | "ISC",
  taxContentVersion: TaxContentVersion
): number {
  return getTBSBySectionVersioned(section, taxContentVersion).length;
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
