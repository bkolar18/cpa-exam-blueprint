/**
 * Email Card Component
 * Content sections with optional styling variants
 */

import { EMAIL_BRAND } from '../constants';

const { colors, layout } = EMAIL_BRAND;

export interface CardProps {
  /** Card content HTML */
  content: string;
  /** Optional card title */
  title?: string;
  /** Card style variant */
  variant?: 'default' | 'highlight' | 'warning' | 'success';
}

const cardVariants = {
  default: {
    background: colors.card,
    borderLeft: 'none',
  },
  highlight: {
    background: colors.card,
    borderLeft: `4px solid ${colors.secondary}`,
  },
  warning: {
    background: colors.warningBg,
    borderLeft: `4px solid ${colors.warning}`,
  },
  success: {
    background: colors.successBg,
    borderLeft: `4px solid ${colors.success}`,
  },
};

/**
 * Generate a card component HTML
 */
export function card({ content, title, variant = 'default' }: CardProps): string {
  const style = cardVariants[variant];

  const titleHtml = title
    ? `<h3 style="margin:0 0 12px 0;color:${colors.primary};font-size:18px;font-weight:600;">${title}</h3>`
    : '';

  return `
    <div class="card" style="background:${style.background};padding:20px;border-radius:${layout.borderRadius.medium};margin:${layout.spacing.md} 0;${style.borderLeft ? `border-left:${style.borderLeft};` : ''}">
      ${titleHtml}
      ${content}
    </div>
  `.trim();
}

/**
 * Highlight card with green left border
 */
export function highlightCard(content: string, title?: string): string {
  return card({ content, title, variant: 'highlight' });
}

/**
 * Warning card with amber styling
 */
export function warningCard(content: string, title?: string): string {
  return card({ content, title, variant: 'warning' });
}

/**
 * Success card with green styling
 */
export function successCard(content: string, title?: string): string {
  return card({ content, title, variant: 'success' });
}
