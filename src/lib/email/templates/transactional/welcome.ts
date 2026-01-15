/**
 * Welcome Email Template
 * Sent when a new user creates an account
 */

import { EMAIL_BRAND } from '../../constants';
import {
  baseLayout,
  header,
  footer,
  primaryButton,
  tipBox,
  card,
} from '../../components';
import type { WelcomeEmailProps } from '../../types';

const { urls } = EMAIL_BRAND;

/**
 * Generate welcome email HTML
 */
export function welcomeEmail({ to, name }: WelcomeEmailProps): string {
  const greeting = name ? `Hi ${name},` : 'Hi there,';

  const content = `
    ${header({
      type: 'full',
      headline: 'Welcome to Meridian CPA Review!',
      showLogo: true,
    })}

    <div class="content" style="background:#ffffff;padding:35px;border-radius:0 0 12px 12px;">
      <p style="margin:0 0 16px 0;font-size:16px;">${greeting}</p>

      <p style="margin:0 0 16px 0;font-size:16px;">
        Welcome to Meridian CPA Review! You've taken an important step in your CPA exam preparation journey.
      </p>

      <p style="margin:0 0 16px 0;font-size:16px;">
        We're here to help you study smarter, not harder. Meridian CPA Academy offers 6,000+ practice questions,
        500+ task-based simulations, and personalized progress tracking—all designed around the official
        AICPA exam blueprints.
      </p>

      ${card({
        variant: 'highlight',
        title: 'Get Started',
        content: `
          <p style="margin:0 0 8px 0;font-size:15px;"><strong>1.</strong> Create your personalized study plan</p>
          <p style="margin:0 0 8px 0;font-size:15px;"><strong>2.</strong> Start with practice questions in your first section</p>
          <p style="margin:0;font-size:15px;"><strong>3.</strong> Track your progress on your dashboard</p>
        `,
      })}

      ${tipBox({
        title: 'Pro Tips for Success',
        tips: [
          'Consistency beats intensity—study a little every day',
          'Focus on understanding concepts, not memorizing answers',
          'Use the explanation for every question, even ones you get right',
          'Take breaks—your brain needs time to consolidate learning',
        ],
      })}

      <div style="text-align:center;margin-top:32px;">
        ${primaryButton('Go to Dashboard', urls.dashboard)}
      </div>
    </div>

    ${footer({ type: 'full', email: to })}
  `;

  return baseLayout({
    preheader: 'Your CPA journey starts now. Here\'s how to get started.',
    subject: 'Welcome to Meridian CPA Review!',
    content,
  });
}

/**
 * Welcome email subject line
 */
export const welcomeSubject = 'Welcome to Meridian CPA Review!';
