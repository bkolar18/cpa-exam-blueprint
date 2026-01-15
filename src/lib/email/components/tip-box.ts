/**
 * Email Tip Box Component
 * Display tips with checkmark icons
 */

import { EMAIL_BRAND } from '../constants';

const { colors, layout } = EMAIL_BRAND;

export interface TipBoxProps {
  /** Array of tip strings */
  tips: string[];
  /** Optional section title */
  title?: string;
  /** Icon to use (default: checkmark) */
  icon?: string;
}

/**
 * Generate a tip box HTML
 */
export function tipBox({ tips, title = 'Quick Tips', icon = '✓' }: TipBoxProps): string {
  const tipsHtml = tips
    .map(
      (tip, index) => `
      <div class="tip" style="padding:8px 0;${index < tips.length - 1 ? `border-bottom:1px solid ${colors.border};` : ''}font-size:15px;">
        <span style="color:${colors.secondary};margin-right:8px;">${icon}</span>
        ${tip}
      </div>
    `
    )
    .join('');

  return `
    <div class="section" style="background:${colors.card};padding:20px;border-radius:${layout.borderRadius.medium};margin:${layout.spacing.lg} 0;border-left:4px solid ${colors.primary};">
      <h3 style="margin:0 0 12px 0;color:${colors.primary};font-size:16px;font-weight:600;">${title}</h3>
      ${tipsHtml}
    </div>
  `.trim();
}

/**
 * Simple tip list without box styling
 */
export function tipList(tips: string[], icon = '✓'): string {
  return tips
    .map(
      (tip) => `
      <div style="padding:4px 0;font-size:15px;">
        <span style="color:${colors.secondary};margin-right:8px;">${icon}</span>
        ${tip}
      </div>
    `
    )
    .join('');
}
