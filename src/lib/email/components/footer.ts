/**
 * Email Footer Component
 * Includes brand info, unsubscribe link, and legal text
 */

import { EMAIL_BRAND } from '../constants';
import { generateUnsubscribeUrl } from '../utils/unsubscribe';

const { colors, fonts, urls } = EMAIL_BRAND;

export interface FooterProps {
  /** Footer style variant */
  type: 'full' | 'minimal';
  /** User's email for unsubscribe link */
  email: string;
  /** Custom message above links */
  customMessage?: string;
  /** Hide unsubscribe link (only for critical transactional emails) */
  hideUnsubscribe?: boolean;
}

/**
 * Full footer with brand info and unsubscribe
 * Used for nurture, segment, and marketing emails
 */
function fullFooter({ email, customMessage, hideUnsubscribe }: Omit<FooterProps, 'type'>): string {
  const unsubscribeUrl = generateUnsubscribeUrl(email);

  const customMessageHtml = customMessage
    ? `<p style="margin-bottom:16px;">${customMessage}</p>`
    : `<p style="margin-bottom:16px;">You received this email because you signed up at ${EMAIL_BRAND.name}.</p>`;

  const unsubscribeLinkHtml = hideUnsubscribe
    ? ''
    : `<p class="footer-links" style="margin-top:16px;">
        <a href="${unsubscribeUrl}" style="color:${colors.primary};text-decoration:none;">Unsubscribe</a>
        <span style="color:${colors.border};margin:0 8px;">|</span>
        <a href="${urls.support}" style="color:${colors.primary};text-decoration:none;">Contact Support</a>
      </p>`;

  return `
    <div class="footer" style="text-align:center;color:${colors.muted};font-size:${fonts.sizes.tiny};margin-top:24px;padding:0 20px;">
      <p style="margin:0;font-weight:${fonts.weights.medium};">${EMAIL_BRAND.name}</p>
      <p style="margin:4px 0 0 0;">${EMAIL_BRAND.tagline}</p>
      <p style="margin:8px 0 0 0;">
        <a href="${urls.base}" style="color:${colors.primary};text-decoration:none;">meridiancpareview.com</a>
        <span style="color:${colors.border};margin:0 8px;">|</span>
        <a href="${urls.academy}" style="color:${colors.primary};text-decoration:none;">Meridian CPA Academy</a>
      </p>
      <div style="margin-top:16px;padding-top:16px;border-top:1px solid ${colors.border};">
        ${customMessageHtml}
        ${unsubscribeLinkHtml}
      </div>
    </div>
  `.trim();
}

/**
 * Minimal footer for transactional emails
 * Used for password reset, email verification
 */
function minimalFooter({ email, hideUnsubscribe }: Omit<FooterProps, 'type' | 'customMessage'>): string {
  const supportLinkHtml = `
    <p style="margin-top:16px;">
      <a href="${urls.support}" style="color:${colors.primary};text-decoration:none;">Contact Support</a>
    </p>
  `;

  return `
    <div class="footer" style="text-align:center;color:${colors.muted};font-size:${fonts.sizes.tiny};margin-top:24px;padding:0 20px;">
      <p style="margin:0;">This is a transactional email from ${EMAIL_BRAND.name}.</p>
      <p style="margin:8px 0 0 0;">If you didn't request this, please ignore it or contact support.</p>
      ${supportLinkHtml}
    </div>
  `.trim();
}

/**
 * Generate email footer HTML
 */
export function footer(props: FooterProps): string {
  if (props.type === 'minimal') {
    return minimalFooter(props);
  }
  return fullFooter(props);
}

/**
 * Standard footer for marketing/nurture emails
 */
export function standardFooter(email: string): string {
  return footer({ type: 'full', email });
}

/**
 * Transactional footer (no unsubscribe needed)
 */
export function transactionalFooter(email: string): string {
  return footer({ type: 'minimal', email, hideUnsubscribe: true });
}
