/**
 * Email Types
 * TypeScript interfaces for all email templates
 */

/** Result from sending an email */
export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/** Base props for all email templates */
export interface BaseEmailProps {
  /** Recipient email address */
  to: string;
}

/** Welcome email props */
export interface WelcomeEmailProps extends BaseEmailProps {
  /** User's name (optional) */
  name?: string;
}

/** Password reset email props */
export interface PasswordResetEmailProps extends BaseEmailProps {
  /** Password reset URL with token */
  resetUrl: string;
  /** Token expiration time in hours */
  expiresInHours?: number;
}

/** Email verification props */
export interface EmailVerificationProps extends BaseEmailProps {
  /** Verification URL with token */
  verificationUrl: string;
}

/** Nurture email content structure */
export interface NurtureEmailContent {
  id: number;
  dayOffset: number;
  subject: string;
  previewText: string;
  category: 'welcome' | 'tips' | 'motivation' | 'section-guide' | 'soft-cta' | 'check-in';
  content: {
    headline: string;
    body: string[];
    callToAction?: {
      text: string;
      url: string;
    };
    tips?: string[];
    quote?: {
      text: string;
      author: string;
    };
  };
}

/** Segment email content structure */
export interface SegmentEmailContent {
  id: string;
  segment: string;
  subject: string;
  previewText: string;
  content: {
    headline: string;
    body: string[];
    callToAction?: {
      text: string;
      url: string;
    };
    resources?: {
      title: string;
      url: string;
      description: string;
    }[];
  };
}

/** User segment types */
export type SegmentType =
  | 'working-full-time'
  | 'student'
  | 'career-changer'
  | 'retaker'
  | 'far-first'
  | 'reg-first'
  | 'aud-first'
  | 'limited-hours';

/** Email template types for preview/testing */
export type EmailTemplateType =
  | 'welcome'
  | 'password-reset'
  | 'email-verification'
  | 'nurture'
  | 'segment';
