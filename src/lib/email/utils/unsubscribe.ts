/**
 * Unsubscribe Utilities
 * Generate unsubscribe URLs and headers for email compliance
 */

import { EMAIL_BRAND } from '../constants';

/**
 * Generate an unsubscribe URL with encoded email
 */
export function generateUnsubscribeUrl(email: string): string {
  const encoded = encodeURIComponent(email);
  return `${EMAIL_BRAND.urls.unsubscribe}?email=${encoded}`;
}

/**
 * Generate List-Unsubscribe headers for one-click unsubscribe
 * Required by Gmail and other providers for bulk senders
 */
export function generateUnsubscribeHeaders(email: string): {
  'List-Unsubscribe': string;
  'List-Unsubscribe-Post': string;
} {
  const unsubscribeUrl = generateUnsubscribeUrl(email);
  return {
    'List-Unsubscribe': `<${unsubscribeUrl}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  };
}

/**
 * Generate mailto unsubscribe link (alternative for some providers)
 */
export function generateMailtoUnsubscribe(): string {
  return `mailto:${EMAIL_BRAND.supportEmail}?subject=Unsubscribe`;
}
