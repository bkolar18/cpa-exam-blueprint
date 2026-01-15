/**
 * Email Header Component
 * Full header with gradient + logo, or minimal header for transactional emails
 */

import { EMAIL_BRAND } from '../constants';

const { colors, fonts, urls } = EMAIL_BRAND;

export interface HeaderProps {
  /** Header style variant */
  type: 'full' | 'minimal';
  /** Main headline text */
  headline?: string;
  /** Optional subtitle below headline */
  subtitle?: string;
  /** Show logo in header */
  showLogo?: boolean;
}

/**
 * Full header with gradient background, logo, and headline
 * Used for nurture, segment, and marketing emails
 */
function fullHeader({ headline, subtitle, showLogo = true }: Omit<HeaderProps, 'type'>): string {
  const logoHtml = showLogo
    ? `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin-bottom:16px;">
        <tr>
          <td style="vertical-align:middle;padding-right:12px;">
            <img src="${urls.logoWhite}" alt="${EMAIL_BRAND.name}" width="48" height="48" style="width:48px;height:48px;display:block;">
          </td>
          <td style="vertical-align:middle;">
            <span style="font-size:22px;font-weight:${fonts.weights.bold};color:${colors.white};">Meridian</span>
            <span style="font-size:14px;font-weight:${fonts.weights.semibold};color:rgba(255,255,255,0.85);margin-left:4px;">CPA Review</span>
          </td>
        </tr>
      </table>
    `
    : '';

  const headlineHtml = headline
    ? `<h1 style="margin:0;font-size:${fonts.sizes.h1};font-weight:${fonts.weights.bold};color:${colors.white};">${headline}</h1>`
    : '';

  const subtitleHtml = subtitle
    ? `<p class="subtitle" style="margin:8px 0 0 0;opacity:0.9;font-size:15px;color:${colors.white};">${subtitle}</p>`
    : '';

  return `
    <div class="header" style="background:linear-gradient(135deg,${colors.primary},${colors.primaryDark});color:${colors.white};padding:30px;border-radius:12px 12px 0 0;text-align:center;">
      ${logoHtml}
      ${headlineHtml}
      ${subtitleHtml}
    </div>
  `.trim();
}

/**
 * Minimal header with white background and left-aligned logo
 * Used for transactional emails (password reset, verification)
 */
function minimalHeader({ showLogo = true }: Omit<HeaderProps, 'type' | 'headline' | 'subtitle'>): string {
  const logoHtml = showLogo
    ? `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
        <tr>
          <td style="vertical-align:middle;padding-right:10px;">
            <img src="${urls.logo}" alt="${EMAIL_BRAND.name}" width="36" height="36" style="width:36px;height:36px;display:block;">
          </td>
          <td style="vertical-align:middle;">
            <span style="font-size:18px;font-weight:${fonts.weights.bold};color:${colors.primary};">Meridian</span>
            <span style="font-size:12px;font-weight:${fonts.weights.semibold};color:${colors.muted};margin-left:4px;">CPA Review</span>
          </td>
        </tr>
      </table>
    `
    : '';

  return `
    <div class="header-minimal" style="background:${colors.white};padding:24px 30px;border-radius:12px 12px 0 0;text-align:left;">
      ${logoHtml}
    </div>
  `.trim();
}

/**
 * Generate email header HTML
 */
export function header(props: HeaderProps): string {
  if (props.type === 'minimal') {
    return minimalHeader(props);
  }
  return fullHeader(props);
}

/**
 * Header with brand subtitle (for nurture emails)
 */
export function brandHeader(headline: string): string {
  return header({
    type: 'full',
    headline,
    subtitle: EMAIL_BRAND.name,
    showLogo: true,
  });
}
