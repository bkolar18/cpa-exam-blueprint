/**
 * Email Components Index
 * Central export for all email components
 */

// Layout
export { baseLayout, baseStyles, type BaseLayoutProps } from './base-layout';

// Header
export { header, brandHeader, type HeaderProps } from './header';

// Footer
export {
  footer,
  standardFooter,
  transactionalFooter,
  type FooterProps,
} from './footer';

// Buttons
export {
  button,
  ctaSection,
  primaryButton,
  secondaryButton,
  type ButtonProps,
} from './button';

// Content blocks
export {
  card,
  highlightCard,
  warningCard,
  successCard,
  type CardProps,
} from './card';

export { tipBox, tipList, type TipBoxProps } from './tip-box';

export { quoteBlock, type QuoteBlockProps } from './quote-block';

export {
  resourceList,
  resourceLink,
  type Resource,
  type ResourceListProps,
} from './resource-list';
