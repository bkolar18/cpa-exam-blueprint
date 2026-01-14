"use client";

import { useAuthOptional } from "@/components/auth/AuthProvider";

interface NavigatorToggleButtonProps {
  /** Whether the Navigator is currently open */
  isOpen: boolean;
  /** Toggle the Navigator open/closed */
  onClick: () => void;
  /** Current mode */
  mode: "practice" | "review";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  /** Custom class name */
  className?: string;
  /** Show compact version (icon only) */
  compact?: boolean;
}

/**
 * Toggle Button for the Meridian Navigator
 *
 * A prominent button that opens/closes the Navigator chat.
 * Displays different states based on mode and authentication.
 */
export default function NavigatorToggleButton({
  isOpen,
  onClick,
  mode,
  size = "md",
  className = "",
  compact = false,
}: NavigatorToggleButtonProps) {
  const { user } = useAuthOptional();

  const sizeClasses = {
    sm: compact ? "p-2" : "px-3 py-2 text-sm",
    md: compact ? "p-2.5" : "px-4 py-2.5 text-sm",
    lg: compact ? "p-3" : "px-5 py-3 text-base",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  if (compact) {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center justify-center rounded-xl transition-all ${
          isOpen
            ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
            : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
        } ${sizeClasses[size]} ${className}`}
        title={isOpen ? "Close Navigator" : "Open Navigator"}
        aria-label={isOpen ? "Close Meridian Navigator" : "Open Meridian Navigator"}
      >
        {isOpen ? (
          <svg
            className={iconSizes[size]}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className={iconSizes[size]}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl font-medium transition-all ${
        isOpen
          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg"
      } ${sizeClasses[size]} ${className}`}
      aria-label={isOpen ? "Close Meridian Navigator" : "Open Meridian Navigator"}
    >
      {/* Icon */}
      {isOpen ? (
        <svg
          className={iconSizes[size]}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          className={iconSizes[size]}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      )}

      {/* Label */}
      <span>
        {isOpen ? "Close Navigator" : user ? "Ask Navigator" : "Navigator"}
      </span>

      {/* Mode badge */}
      {!isOpen && (
        <span
          className={`px-1.5 py-0.5 rounded text-xs font-medium ${
            mode === "practice"
              ? "bg-white/20 text-white"
              : "bg-white/20 text-white"
          }`}
        >
          {mode === "practice" ? "Hints" : "Review"}
        </span>
      )}
    </button>
  );
}

/**
 * Floating Action Button version of the Navigator toggle
 *
 * A fixed-position circular button typically placed in the bottom-right corner.
 */
export function NavigatorFAB({
  isOpen,
  onClick,
  className = "",
}: {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 ${
        isOpen
          ? "bg-gray-700 text-white"
          : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-blue-500/30"
      } ${className}`}
      aria-label={isOpen ? "Close Navigator" : "Open Navigator"}
    >
      {isOpen ? (
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      )}
    </button>
  );
}
