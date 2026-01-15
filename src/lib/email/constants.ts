/**
 * Email Brand Constants
 * Centralized configuration for all email templates
 */

export const EMAIL_BRAND = {
  // Brand Identity
  name: 'Meridian CPA Review',
  tagline: 'Smart CPA Exam Prep',
  supportEmail: 'support@meridiancpareview.com',

  // Colors
  colors: {
    primary: '#1e3a5f',
    primaryLight: '#2d5a87',
    primaryDark: '#152a45',
    secondary: '#16a34a',
    secondaryLight: '#22c55e',
    accent: '#0ea5e9',
    text: '#1a1a2e',
    muted: '#64748b',
    mutedLight: '#94a3b8',
    border: '#e2e8f0',
    background: '#f5f5f5',
    card: '#f8fafc',
    white: '#ffffff',
    // Status colors
    success: '#16a34a',
    successBg: '#dcfce7',
    error: '#dc2626',
    errorBg: '#fee2e2',
    warning: '#d97706',
    warningBg: '#fef3c7',
  },

  // Typography
  fonts: {
    family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    sizes: {
      h1: '26px',
      h2: '22px',
      h3: '18px',
      body: '16px',
      small: '14px',
      tiny: '12px',
    },
    lineHeight: '1.7',
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },

  // Layout
  layout: {
    maxWidth: '600px',
    padding: {
      wrapper: '20px',
      content: '35px',
      header: '30px',
      section: '24px',
    },
    borderRadius: {
      large: '12px',
      medium: '8px',
      small: '6px',
      button: '8px',
    },
    spacing: {
      xs: '8px',
      sm: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  },

  // URLs
  urls: {
    base: 'https://meridiancpareview.com',
    logo: 'https://meridiancpareview.com/logo.png',
    logoWhite: 'https://meridiancpareview.com/logo-white.png',
    unsubscribe: 'https://meridiancpareview.com/unsubscribe',
    dashboard: 'https://meridiancpareview.com/dashboard',
    academy: 'https://meridiancpareview.com/cpa-academy',
    practice: 'https://meridiancpareview.com/dashboard/practice',
    support: 'https://meridiancpareview.com/support',
    blog: 'https://meridiancpareview.com/blog',
    studyPlan: 'https://meridiancpareview.com/study-plan',
    tools: 'https://meridiancpareview.com/tools',
  },

  // Sender addresses
  senders: {
    system: {
      name: 'Meridian CPA Review',
      email: 'no-reply@meridiancpareview.com',
    },
    support: {
      name: 'Meridian CPA Review Support',
      email: 'support@meridiancpareview.com',
    },
    general: {
      name: 'Meridian CPA Review',
      email: 'hello@meridiancpareview.com',
    },
    marketing: {
      name: 'Meridian CPA Review',
      email: 'hello@meridiancpareview.com',
    },
  },
} as const;

// Type exports for use in other files
export type EmailColors = typeof EMAIL_BRAND.colors;
export type EmailFonts = typeof EMAIL_BRAND.fonts;
export type EmailLayout = typeof EMAIL_BRAND.layout;
export type EmailUrls = typeof EMAIL_BRAND.urls;
