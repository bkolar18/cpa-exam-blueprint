/**
 * Meridian CPA Review Email System
 *
 * Centralized email template system with:
 * - Brand-consistent components
 * - Transactional emails (welcome, password reset)
 * - Nurture sequence (7-email welcome series)
 * - Segment-based content (personalized by user attributes)
 *
 * Usage:
 * ```ts
 * import { sendWelcomeEmail, sendPasswordResetEmail } from '@/lib/email';
 *
 * await sendWelcomeEmail('user@example.com', 'John');
 * await sendPasswordResetEmail('user@example.com', 'https://...');
 * ```
 */

// Send functions
export {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendNurtureEmail,
  sendSegmentEmail,
  sendCustomEmail,
  getNextNurtureEmail,
  getSegmentEmailToSend,
} from './send';

// Template generators (for preview/testing)
export { welcomeEmail, passwordResetEmail } from './templates/transactional';
export { generateNurtureEmailHtml, nurtureSequence, getEmailByDay, getEmailsUpToDay } from './nurture-sequence';
export { generateSegmentEmailHtml, segmentEmails, getSegmentEmail, determineSegments, segments } from './segment-content';

// Components (for custom emails)
export {
  baseLayout,
  header,
  footer,
  primaryButton,
  secondaryButton,
  card,
  tipBox,
  quoteBlock,
  resourceList,
} from './components';

// Utilities
export { generateUnsubscribeUrl, generateUnsubscribeHeaders } from './utils/unsubscribe';

// Constants
export { EMAIL_BRAND } from './constants';

// Types
export type {
  SendEmailResult,
  BaseEmailProps,
  WelcomeEmailProps,
  PasswordResetEmailProps,
  EmailVerificationProps,
  NurtureEmailContent,
  SegmentEmailContent,
  SegmentType,
  EmailTemplateType,
} from './types';

export type { NurtureEmail } from './nurture-sequence';
export type { SegmentEmail } from './segment-content';
