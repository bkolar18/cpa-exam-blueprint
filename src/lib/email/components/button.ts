/**
 * Email Button Component
 * CTA buttons with Outlook-compatible table-based structure
 */

import { EMAIL_BRAND } from '../constants';

const { colors, fonts, layout } = EMAIL_BRAND;

export interface ButtonProps {
  /** Button text */
  text: string;
  /** Button URL */
  url: string;
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'outline';
  /** Button size */
  size?: 'default' | 'small' | 'large';
  /** Full width button */
  fullWidth?: boolean;
  /** Center the button */
  center?: boolean;
}

const buttonStyles = {
  primary: {
    background: colors.secondary,
    color: colors.white,
    border: 'none',
  },
  secondary: {
    background: colors.primary,
    color: colors.white,
    border: 'none',
  },
  outline: {
    background: 'transparent',
    color: colors.primary,
    border: `2px solid ${colors.primary}`,
  },
};

const buttonSizes = {
  small: {
    padding: '10px 20px',
    fontSize: fonts.sizes.small,
  },
  default: {
    padding: '14px 32px',
    fontSize: fonts.sizes.body,
  },
  large: {
    padding: '16px 40px',
    fontSize: '18px',
  },
};

/**
 * Generate a CTA button HTML
 * Uses table structure for maximum email client compatibility
 */
export function button({
  text,
  url,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  center = true,
}: ButtonProps): string {
  const style = buttonStyles[variant];
  const sizing = buttonSizes[size];

  const buttonHtml = `
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" ${fullWidth ? 'width="100%"' : ''}>
      <tr>
        <td style="border-radius:${layout.borderRadius.button};background:${style.background};${style.border ? `border:${style.border};` : ''}">
          <a href="${url}" target="_blank" style="display:inline-block;padding:${sizing.padding};color:${style.color};text-decoration:none;font-weight:${fonts.weights.semibold};font-size:${sizing.fontSize};font-family:${fonts.family};${fullWidth ? 'width:100%;text-align:center;box-sizing:border-box;' : ''}">${text}</a>
        </td>
      </tr>
    </table>
  `.trim();

  if (center && !fullWidth) {
    return `
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center">
        <tr>
          <td>
            ${buttonHtml}
          </td>
        </tr>
      </table>
    `.trim();
  }

  return buttonHtml;
}

/**
 * CTA section with button and optional top border
 */
export function ctaSection({
  text,
  url,
  variant = 'primary',
  showDivider = true,
}: ButtonProps & { showDivider?: boolean }): string {
  const dividerHtml = showDivider
    ? `<div style="height:1px;background:${colors.border};margin-bottom:${layout.spacing.lg};"></div>`
    : '';

  return `
    <div class="cta" style="text-align:center;margin-top:${layout.spacing.xl};padding-top:${layout.spacing.lg};">
      ${dividerHtml}
      ${button({ text, url, variant })}
    </div>
  `.trim();
}

/**
 * Primary CTA button (green)
 */
export function primaryButton(text: string, url: string): string {
  return button({ text, url, variant: 'primary' });
}

/**
 * Secondary CTA button (blue)
 */
export function secondaryButton(text: string, url: string): string {
  return button({ text, url, variant: 'secondary' });
}
