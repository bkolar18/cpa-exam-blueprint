'use client';

import { useState, useEffect } from 'react';
import { checkAdminStatus, clearAdminStatusCache } from '@/lib/admin/client';

/**
 * Hook to check if the current user is an admin
 * Fetches from secure server endpoint - no email exposure
 */
export function useAdminStatus() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchAdminStatus() {
      try {
        const status = await checkAdminStatus();
        if (mounted) {
          setIsAdmin(status);
          setIsLoading(false);
        }
      } catch {
        if (mounted) {
          setIsAdmin(false);
          setIsLoading(false);
        }
      }
    }

    fetchAdminStatus();

    return () => {
      mounted = false;
    };
  }, []);

  return { isAdmin, isLoading, clearCache: clearAdminStatusCache };
}
