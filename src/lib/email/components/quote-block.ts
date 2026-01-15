/**
 * Email Quote Block Component
 * Inspirational quotes with accent styling
 */

import { EMAIL_BRAND } from '../constants';

const { colors, layout } = EMAIL_BRAND;

export interface QuoteBlockProps {
  /** Quote text */
  text: string;
  /** Quote author/attribution */
  author: string;
}

/**
 * Generate a quote block HTML
 */
export function quoteBlock({ text, author }: QuoteBlockProps): string {
  return `
    <div class="quote" style="background:linear-gradient(135deg,#f0f9ff,#e0f2fe);padding:${layout.spacing.lg};border-radius:${layout.borderRadius.medium};margin:${layout.spacing.lg} 0;border-left:4px solid ${colors.accent};font-style:italic;">
      <p style="margin:0;font-size:17px;color:#0c4a6e;">"${text}"</p>
      <p class="quote-author" style="margin-top:12px;font-style:normal;font-weight:600;font-size:14px;color:#0c4a6e;">— ${author}</p>
    </div>
  `.trim();
}
