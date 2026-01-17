/**
 * Tax Content Version Utilities
 *
 * Handles dual-track content for OBBBA tax law changes.
 * OBBBA provisions become testable on CPA Exam starting July 1, 2026.
 * Only REG and TCP sections are affected by these changes.
 */

import type { SectionCode } from '@/lib/supabase/types';

export type TaxContentVersion = 'tcja' | 'obbba';
export type TaxContentPreference = 'tcja' | 'obbba' | 'auto';

/** OBBBA provisions become testable on this date */
export const OBBBA_CUTOFF_DATE = '2026-07-01';

/** Sections affected by OBBBA tax law changes */
export const TAX_AFFECTED_SECTIONS: SectionCode[] = ['REG', 'TCP'];

/**
 * Determines which tax content version to use based on user preferences and dates.
 *
 * Priority order:
 * 1. Explicit user preference (tcja or obbba)
 * 2. Scheduled exam date (if provided)
 * 3. Target completion date (from profile)
 * 4. Current date (TCJA until July 1, 2026, then OBBBA)
 *
 * @param preference - User's content version preference ('tcja', 'obbba', or 'auto')
 * @param targetCompletionDate - User's target completion date from profile
 * @param scheduledExamDate - Optional scheduled exam date from NTS
 * @returns The effective tax content version to use
 */
export function getEffectiveTaxContentVersion(
  preference: TaxContentPreference | null,
  targetCompletionDate: string | null,
  scheduledExamDate?: string | null
): TaxContentVersion {
  // Explicit preference takes priority
  if (preference === 'tcja' || preference === 'obbba') {
    return preference;
  }

  // Auto mode: determine based on dates
  const cutoff = new Date(OBBBA_CUTOFF_DATE);

  // Priority: scheduled exam date > target completion date
  const referenceDate = scheduledExamDate || targetCompletionDate;

  if (referenceDate) {
    const examDate = new Date(referenceDate);
    return examDate >= cutoff ? 'obbba' : 'tcja';
  }

  // No date set: default based on current date
  const today = new Date();
  return today >= cutoff ? 'obbba' : 'tcja';
}

/**
 * Checks if a section is affected by OBBBA tax law changes.
 * Only REG and TCP sections have different content between versions.
 *
 * @param section - The section code to check
 * @returns true if the section is affected by OBBBA changes
 */
export function isTaxAffectedSection(section: SectionCode | string): boolean {
  return section === 'REG' || section === 'TCP';
}

/**
 * Gets a human-readable label for the content version.
 *
 * @param version - The tax content version
 * @returns User-friendly label for the version
 */
export function getVersionLabel(version: TaxContentVersion): string {
  return version === 'tcja'
    ? 'Pre-July 2026 (TCJA)'
    : 'Post-July 2026 (OBBBA)';
}

/**
 * Gets a detailed description of the content version.
 *
 * @param version - The tax content version
 * @returns Detailed description of what the version includes
 */
export function getVersionDescription(version: TaxContentVersion): string {
  if (version === 'tcja') {
    return 'Tax Cuts and Jobs Act provisions through 2025. Includes $10,000 SALT cap, 2024 tax year amounts, and sunset provisions.';
  }
  return 'One Big Beautiful Bill Act provisions starting 2025. Includes $40,000 SALT cap, permanent estate exemption, and new deductions for tips, overtime, and seniors.';
}

/**
 * Determines if the OBBBA transition banner should be shown to the user.
 *
 * @param preference - User's current content version preference
 * @param dismissedAt - Timestamp when user dismissed the banner (or null)
 * @param disciplineChoice - User's chosen discipline section
 * @returns true if the banner should be displayed
 */
export function shouldShowOBBBABanner(
  preference: TaxContentPreference | null,
  dismissedAt: string | null,
  disciplineChoice: 'TCP' | 'BAR' | 'ISC' | null
): boolean {
  // Don't show if user has explicit preference set
  if (preference === 'tcja' || preference === 'obbba') {
    return false;
  }

  // Don't show if user only studies non-tax sections
  // (If discipline is BAR or ISC, they're not studying TCP which is tax-affected)
  // Note: User might still study REG even if discipline is BAR/ISC
  // So we show banner unless we know they're only doing non-tax sections

  // Check if banner was dismissed recently (within 7 days for soft dismiss)
  if (dismissedAt) {
    const dismissedDate = new Date(dismissedAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    if (dismissedDate > sevenDaysAgo) {
      return false;
    }
  }

  // Show banner during transition awareness period (March 2026 - September 2026)
  const today = new Date();
  const startDate = new Date('2026-03-01');
  const endDate = new Date('2026-09-30');

  return today >= startDate && today <= endDate;
}

/**
 * Gets the list of sections that are NOT affected by OBBBA changes.
 * Useful for informing users their other studies are unaffected.
 *
 * @returns Array of section codes not affected by OBBBA
 */
export function getNonTaxAffectedSections(): SectionCode[] {
  return ['FAR', 'AUD', 'BAR', 'ISC'];
}

/**
 * Formats text explaining which sections are affected for user messaging.
 *
 * @returns Formatted string for UI display
 */
export function getAffectedSectionsMessage(): string {
  return 'Only REG and TCP sections are affected by OBBBA tax law changes. FAR, AUD, BAR, and ISC content remains unchanged.';
}
