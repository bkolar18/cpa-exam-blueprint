'use client';

import { useState, useEffect, useCallback } from 'react';

const CSRF_HEADER_NAME = 'x-csrf-token';

/**
 * Hook to manage CSRF token for secure API requests
 * Fetches token on mount and provides it for use in fetch requests
 */
export function useCSRFToken() {
  const [csrfToken, setCSRFToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/csrf');
      if (response.ok) {
        const data = await response.json();
        setCSRFToken(data.csrfToken);
      }
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  /**
   * Get headers object with CSRF token included
   * Use this when making POST/PUT/DELETE requests
   */
  const getHeaders = useCallback((additionalHeaders?: Record<string, string>): Record<string, string> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    };

    if (csrfToken) {
      headers[CSRF_HEADER_NAME] = csrfToken;
    }

    return headers;
  }, [csrfToken]);

  /**
   * Make a secure fetch request with CSRF token
   */
  const secureFetch = useCallback(async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    const headers = new Headers(options.headers);

    if (csrfToken && !['GET', 'HEAD', 'OPTIONS'].includes(options.method?.toUpperCase() || 'GET')) {
      headers.set(CSRF_HEADER_NAME, csrfToken);
    }

    return fetch(url, {
      ...options,
      headers,
    });
  }, [csrfToken]);

  return {
    csrfToken,
    isLoading,
    getHeaders,
    secureFetch,
    refreshToken: fetchToken,
  };
}

/**
 * Utility function to get CSRF token from cookie (for non-hook contexts)
 */
export function getCSRFTokenFromCookie(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(/csrf_token=([^;]+)/);
  return match ? match[1] : null;
}
