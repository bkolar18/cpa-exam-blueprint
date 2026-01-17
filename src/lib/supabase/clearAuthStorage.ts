import { clearCachedClient } from './client';

/**
 * Utility to clear all Supabase auth-related storage
 * Used to recover from corrupted/stale sessions
 */
export function clearAllAuthStorage(): void {
  // Clear the cached Supabase client so a fresh one is created
  clearCachedClient();

  // Clear localStorage
  try {
    const localKeys = Object.keys(localStorage);
    localKeys.forEach(key => {
      if (key.startsWith('sb-') || key.includes('supabase')) {
        localStorage.removeItem(key);
      }
    });
  } catch {
    // localStorage might not be available
  }

  // Clear sessionStorage
  try {
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
      if (key.startsWith('sb-') || key.includes('supabase')) {
        sessionStorage.removeItem(key);
      }
    });
  } catch {
    // sessionStorage might not be available
  }

  // Clear cookies more thoroughly
  // Try multiple path and domain variations for better mobile compatibility
  const cookiesToClear: string[] = [];
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    if (name.startsWith('sb-') || name.includes('supabase') || name.includes('auth')) {
      cookiesToClear.push(name);
    }
  });

  // Get current domain and possible variations
  const hostname = window.location.hostname;
  const domains = [
    '', // no domain (current)
    hostname,
    `.${hostname}`, // with leading dot
  ];

  // If subdomain, also try parent domain
  const parts = hostname.split('.');
  if (parts.length > 2) {
    const parentDomain = parts.slice(1).join('.');
    domains.push(parentDomain);
    domains.push(`.${parentDomain}`);
  }

  const paths = ['/', ''];
  const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';

  cookiesToClear.forEach(name => {
    // Try all combinations of domain and path
    domains.forEach(domain => {
      paths.forEach(path => {
        const domainPart = domain ? `; domain=${domain}` : '';
        const pathPart = path ? `; path=${path}` : '; path=/';
        document.cookie = `${name}=${pathPart}${domainPart}; expires=${expires}`;
        document.cookie = `${name}=${pathPart}${domainPart}; expires=${expires}; secure`;
        document.cookie = `${name}=${pathPart}${domainPart}; expires=${expires}; samesite=lax`;
        document.cookie = `${name}=${pathPart}${domainPart}; expires=${expires}; secure; samesite=lax`;
      });
    });
  });
}
