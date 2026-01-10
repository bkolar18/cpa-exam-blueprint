"use client";

import { memo } from "react";

export type TBSType =
  | "numeric_entry"
  | "journal_entry"
  | "document_review"
  | "research"
  | "reconciliation"
  | "dropdown"
  | "written_communication";

interface TBSTypeIconProps {
  type: TBSType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const typeConfig: Record<
  TBSType,
  { label: string; shortLabel: string; bgColor: string; textColor: string }
> = {
  numeric_entry: {
    label: "Numeric Entry",
    shortLabel: "NE",
    bgColor: "bg-blue-100 dark:bg-blue-900/40",
    textColor: "text-blue-700 dark:text-blue-300",
  },
  journal_entry: {
    label: "Journal Entry",
    shortLabel: "JE",
    bgColor: "bg-green-100 dark:bg-green-900/40",
    textColor: "text-green-700 dark:text-green-300",
  },
  document_review: {
    label: "Document Review",
    shortLabel: "DR",
    bgColor: "bg-purple-100 dark:bg-purple-900/40",
    textColor: "text-purple-700 dark:text-purple-300",
  },
  research: {
    label: "Research",
    shortLabel: "RS",
    bgColor: "bg-orange-100 dark:bg-orange-900/40",
    textColor: "text-orange-700 dark:text-orange-300",
  },
  reconciliation: {
    label: "Reconciliation",
    shortLabel: "RC",
    bgColor: "bg-teal-100 dark:bg-teal-900/40",
    textColor: "text-teal-700 dark:text-teal-300",
  },
  dropdown: {
    label: "Dropdown",
    shortLabel: "DD",
    bgColor: "bg-indigo-100 dark:bg-indigo-900/40",
    textColor: "text-indigo-700 dark:text-indigo-300",
  },
  written_communication: {
    label: "Written Communication",
    shortLabel: "WC",
    bgColor: "bg-pink-100 dark:bg-pink-900/40",
    textColor: "text-pink-700 dark:text-pink-300",
  },
};

const sizeClasses = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2 py-0.5 text-xs",
  lg: "px-2.5 py-1 text-sm",
};

export const TBSTypeIcon = memo(function TBSTypeIcon({
  type,
  size = "md",
  showLabel = false,
}: TBSTypeIconProps) {
  const config = typeConfig[type] || typeConfig.numeric_entry;

  return (
    <span
      className={`inline-flex items-center font-medium rounded ${config.bgColor} ${config.textColor} ${sizeClasses[size]}`}
    >
      {showLabel ? config.label : config.shortLabel}
    </span>
  );
});

export function getTBSTypeLabel(type: string): string {
  const config = typeConfig[type as TBSType];
  return config?.label || type;
}
