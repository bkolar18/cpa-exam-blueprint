"use client";

import { useAuth, type AuthErrorType } from "./AuthProvider";

interface ErrorConfig {
  title: string;
  message: string;
  canRetry: boolean;
  showLogin: boolean;
}

const ERROR_CONFIGS: Record<NonNullable<AuthErrorType>, ErrorConfig> = {
  network: {
    title: "Connection Problem",
    message: "Unable to connect to our servers. Please check your internet connection.",
    canRetry: true,
    showLogin: false,
  },
  service_unavailable: {
    title: "Service Temporarily Unavailable",
    message: "Our authentication service is temporarily unavailable. Please try again in a few moments.",
    canRetry: true,
    showLogin: false,
  },
  session_expired: {
    title: "Session Expired",
    message: "Your session has expired. Please sign in again to continue.",
    canRetry: false,
    showLogin: true,
  },
  unknown: {
    title: "Something Went Wrong",
    message: "An unexpected error occurred. Please try again.",
    canRetry: true,
    showLogin: true,
  },
};

interface AuthErrorBannerProps {
  className?: string;
  onLoginClick?: () => void;
}

export function AuthErrorBanner({ className = "", onLoginClick }: AuthErrorBannerProps) {
  const { error, loading, retryAuth } = useAuth();

  if (!error) return null;

  const config = ERROR_CONFIGS[error];

  const handleRetry = async () => {
    await retryAuth();
  };

  const handleLogin = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      window.location.href = "/login";
    }
  };

  return (
    <div
      className={`bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 ${className}`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <svg
            className="h-5 w-5 text-amber-500 dark:text-amber-400"
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
        <div className="flex-1">
          <h3 className="text-sm font-medium text-amber-800 dark:text-amber-200">
            {config.title}
          </h3>
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
            {config.message}
          </p>
          <div className="mt-3 flex gap-3">
            {config.canRetry && (
              <button
                onClick={handleRetry}
                disabled={loading}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-100 hover:bg-amber-200 dark:hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-0.5 mr-2 h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Retrying...
                  </>
                ) : (
                  "Try Again"
                )}
              </button>
            )}
            {config.showLogin && (
              <button
                onClick={handleLogin}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal inline error indicator for use in headers/navbars
 */
export function AuthStatusIndicator() {
  const { error, isServiceAvailable, loading, retryAuth } = useAuth();

  if (!error && isServiceAvailable) return null;

  return (
    <button
      onClick={() => retryAuth()}
      disabled={loading}
      className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
      title={error === 'network' ? 'Connection issue - click to retry' : 'Auth service issue - click to retry'}
    >
      {loading ? (
        <svg
          className="animate-spin h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      )}
      {error === 'network' ? 'Offline' : 'Auth Issue'}
    </button>
  );
}
