"use client";

import Link from "next/link";
import {
  shouldShowOBBBABanner,
  getVersionLabel,
  getEffectiveTaxContentVersion,
  type TaxContentPreference,
} from "@/lib/utils/tax-content-version";

interface OBBBATransitionBannerProps {
  targetDate: string | null;
  disciplineChoice: "TCP" | "BAR" | "ISC" | null;
  taxContentVersion: TaxContentPreference | null;
  dismissedAt: string | null;
  onDismiss: () => void;
}

export function OBBBATransitionBanner({
  targetDate,
  disciplineChoice,
  taxContentVersion,
  dismissedAt,
  onDismiss,
}: OBBBATransitionBannerProps) {
  // Check if banner should be displayed
  if (!shouldShowOBBBABanner(taxContentVersion, dismissedAt, disciplineChoice)) {
    return null;
  }

  const effectiveVersion = getEffectiveTaxContentVersion(
    taxContentVersion,
    targetDate,
    null
  );

  return (
    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="flex items-start space-x-4">
          {/* Warning/Info Icon */}
          <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-amber-600 dark:text-amber-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-300">
              Important: Tax Law Changes Affect REG &amp; TCP
            </h3>
            <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">
              The OBBBA Act changed major tax provisions. The CPA Exam tests these changes
              starting <strong>July 1, 2026</strong>.
            </p>

            <div className="mt-3 space-y-2">
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                <strong>Your studies are set for:</strong>{" "}
                <span className="font-medium">{getVersionLabel(effectiveVersion)}</span>
              </p>

              <p className="text-amber-600 dark:text-amber-500 text-xs">
                Only REG and TCP sections are affected. FAR, AUD, BAR, and ISC content is unchanged.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <Link
            href="/dashboard/settings#tax-content-version"
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium whitespace-nowrap"
          >
            Set My Exam Date
          </Link>
          <button
            onClick={onDismiss}
            className="p-2 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-colors"
            aria-label="Dismiss banner"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
