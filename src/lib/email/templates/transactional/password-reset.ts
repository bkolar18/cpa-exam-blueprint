/**
 * Password Reset Email Template
 * Sent when user requests a password reset
 */

import { EMAIL_BRAND } from '../../constants';
import {
  baseLayout,
  header,
  footer,
  primaryButton,
  warningCard,
} from '../../components';
import type { PasswordResetEmailProps } from '../../types';

const { colors } = EMAIL_BRAND;

/**
 * Generate password reset email HTML
 */
export function passwordResetEmail({
  to,
  resetUrl,
  expiresInHours = 1,
}: PasswordResetEmailProps): string {
  const content = `
    ${header({
      type: 'minimal',
      showLogo: true,
    })}

    <div class="content" style="background:#ffffff;padding:35px;border-radius:0 0 12px 12px;">
      <h2 style="margin:0 0 16px 0;font-size:22px;color:${colors.text};">Reset Your Password</h2>

      <p style="margin:0 0 16px 0;font-size:16px;">
        We received a request to reset your password for your Meridian CPA Review account.
      </p>

      <p style="margin:0 0 24px 0;font-size:16px;">
        Click the button below to create a new password:
      </p>

      <div style="text-align:center;margin:32px 0;">
        ${primaryButton('Reset Password', resetUrl)}
      </div>

      ${warningCard(
        `<p style="margin:0;font-size:14px;color:${colors.text};">
          <strong>This link expires in ${expiresInHours} hour${expiresInHours > 1 ? 's' : ''}.</strong>
          If you don't reset your password within this time, you'll need to request a new link.
        </p>`,
        '⏰ Time Sensitive'
      )}

      <div style="margin-top:24px;padding-top:24px;border-top:1px solid ${colors.border};">
        <p style="margin:0 0 8px 0;font-size:14px;color:${colors.muted};">
          <strong>Didn't request this?</strong>
        </p>
        <p style="margin:0;font-size:14px;color:${colors.muted};">
          If you didn't request a password reset, you can safely ignore this email.
          Your password will remain unchanged.
        </p>
      </div>

      <div style="margin-top:24px;">
        <p style="margin:0;font-size:13px;color:${colors.muted};">
          For security, this link can only be used once. If you need to reset your password again,
          please request a new link.
        </p>
      </div>
    </div>

    ${footer({ type: 'minimal', email: to, hideUnsubscribe: true })}
  `;

  return baseLayout({
    preheader: 'Reset your Meridian CPA Review password',
    subject: 'Reset Your Password',
    content,
  });
}

/**
 * Password reset email subject line
 */
export const passwordResetSubject = 'Reset Your Password';
