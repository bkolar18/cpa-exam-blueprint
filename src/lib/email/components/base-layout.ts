/**
 * Base Email Layout
 * Master HTML wrapper for all email templates
 */

import { EMAIL_BRAND } from '../constants';

const { colors, fonts, layout } = EMAIL_BRAND;

export interface BaseLayoutProps {
  /** Hidden preview text shown in email clients */
  preheader?: string;
  /** Main content HTML */
  content: string;
  /** Email subject for title tag */
  subject?: string;
}

/**
 * Base CSS styles shared across all emails
 */
export const baseStyles = `
  /* Reset */
  body, table, td, p, a, li, blockquote {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
  table, td {
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
  }
  img {
    -ms-interpolation-mode: bicubic;
    border: 0;
    height: auto;
    line-height: 100%;
    outline: none;
    text-decoration: none;
  }

  /* Base */
  body {
    font-family: ${fonts.family};
    line-height: ${fonts.lineHeight};
    color: ${colors.text};
    margin: 0;
    padding: 0;
    background-color: ${colors.background};
    width: 100% !important;
    height: 100% !important;
  }

  /* Wrapper */
  .wrapper {
    max-width: ${layout.maxWidth};
    margin: 0 auto;
    padding: ${layout.padding.wrapper};
  }

  /* Header */
  .header {
    background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark});
    color: ${colors.white};
    padding: ${layout.padding.header};
    border-radius: ${layout.borderRadius.large} ${layout.borderRadius.large} 0 0;
    text-align: center;
  }
  .header-minimal {
    background: ${colors.white};
    padding: ${layout.padding.header};
    border-radius: ${layout.borderRadius.large} ${layout.borderRadius.large} 0 0;
    text-align: left;
  }
  .header h1 {
    margin: 0;
    font-size: ${fonts.sizes.h1};
    font-weight: ${fonts.weights.bold};
    color: ${colors.white};
  }
  .header .subtitle {
    margin: 8px 0 0 0;
    opacity: 0.9;
    font-size: 15px;
  }
  .header-logo {
    width: 56px;
    height: 56px;
    margin-bottom: 16px;
  }

  /* Content */
  .content {
    background: ${colors.white};
    padding: ${layout.padding.content};
    border-radius: 0 0 ${layout.borderRadius.large} ${layout.borderRadius.large};
  }
  .content p {
    margin: 0 0 ${layout.spacing.md} 0;
    font-size: ${fonts.sizes.body};
  }
  .content p:last-child {
    margin-bottom: 0;
  }

  /* Sections */
  .section {
    background: ${colors.card};
    padding: 20px;
    border-radius: ${layout.borderRadius.medium};
    margin: ${layout.spacing.lg} 0;
    border-left: 4px solid ${colors.primary};
  }
  .section h3 {
    margin: 0 0 12px 0;
    color: ${colors.primary};
    font-size: ${fonts.sizes.h3};
    font-weight: ${fonts.weights.semibold};
  }

  /* Tips */
  .tip {
    padding: 8px 0;
    border-bottom: 1px solid ${colors.border};
    font-size: 15px;
  }
  .tip:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  /* Quote */
  .quote {
    background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
    padding: ${layout.spacing.lg};
    border-radius: ${layout.borderRadius.medium};
    margin: ${layout.spacing.lg} 0;
    border-left: 4px solid ${colors.accent};
    font-style: italic;
  }
  .quote p {
    margin: 0;
    font-size: 17px;
    color: #0c4a6e;
  }
  .quote-author {
    margin-top: 12px !important;
    font-style: normal;
    font-weight: ${fonts.weights.semibold};
    font-size: ${fonts.sizes.small} !important;
  }

  /* Resources */
  .resources {
    background: ${colors.card};
    padding: 20px;
    border-radius: ${layout.borderRadius.medium};
    margin: ${layout.spacing.lg} 0;
  }
  .resources h3 {
    margin: 0 0 ${layout.spacing.md} 0;
    color: ${colors.primary};
    font-size: ${fonts.sizes.h3};
    font-weight: ${fonts.weights.semibold};
  }
  .resource-item {
    display: block;
    padding: 12px;
    background: ${colors.white};
    border: 1px solid ${colors.border};
    border-radius: ${layout.borderRadius.small};
    margin-bottom: 8px;
    text-decoration: none;
    color: inherit;
  }
  .resource-item:last-child {
    margin-bottom: 0;
  }
  .resource-title {
    font-weight: ${fonts.weights.semibold};
    color: ${colors.primary};
    margin-bottom: 4px;
  }
  .resource-desc {
    font-size: ${fonts.sizes.small};
    color: ${colors.muted};
  }

  /* Buttons */
  .cta {
    text-align: center;
    margin-top: ${layout.spacing.xl};
    padding-top: ${layout.spacing.lg};
    border-top: 1px solid ${colors.border};
  }
  .button {
    display: inline-block;
    background: ${colors.secondary};
    color: ${colors.white} !important;
    padding: 14px 32px;
    text-decoration: none;
    border-radius: ${layout.borderRadius.button};
    font-weight: ${fonts.weights.semibold};
    font-size: ${fonts.sizes.body};
  }
  .button-secondary {
    background: ${colors.primary};
  }
  .button-outline {
    background: transparent;
    border: 2px solid ${colors.primary};
    color: ${colors.primary} !important;
  }

  /* Footer */
  .footer {
    text-align: center;
    color: ${colors.muted};
    font-size: ${fonts.sizes.tiny};
    margin-top: ${layout.spacing.lg};
    padding: 0 20px;
  }
  .footer a {
    color: ${colors.primary};
    text-decoration: none;
  }
  .footer-links {
    margin-top: ${layout.spacing.md};
  }
  .footer-links a {
    margin: 0 8px;
  }

  /* Divider */
  .divider {
    height: 1px;
    background: ${colors.border};
    margin: ${layout.spacing.lg} 0;
  }

  /* Card */
  .card {
    background: ${colors.card};
    padding: 20px;
    border-radius: ${layout.borderRadius.medium};
    margin: ${layout.spacing.md} 0;
  }
  .card-highlight {
    border-left: 4px solid ${colors.secondary};
  }
  .card-warning {
    border-left: 4px solid ${colors.warning};
    background: ${colors.warningBg};
  }

  /* Dark Mode Support */
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #1a1a2e !important;
    }
    .wrapper {
      background-color: #1a1a2e !important;
    }
    .content {
      background-color: #252541 !important;
    }
    .content p, .content li {
      color: #e2e8f0 !important;
    }
    .section, .card, .resources {
      background-color: #1f2937 !important;
    }
    .resource-item {
      background-color: #374151 !important;
      border-color: #4b5563 !important;
    }
    .footer {
      color: #94a3b8 !important;
    }
  }

  /* Mobile Responsive */
  @media only screen and (max-width: 620px) {
    .wrapper {
      width: 100% !important;
      padding: 10px !important;
    }
    .content {
      padding: 20px !important;
    }
    .header {
      padding: 20px !important;
    }
    .header h1 {
      font-size: 22px !important;
    }
    .button {
      display: block !important;
      width: 100% !important;
      text-align: center !important;
      box-sizing: border-box !important;
    }
    .cta {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
`;

/**
 * Generate the base email layout HTML
 */
export function baseLayout({ preheader, content, subject }: BaseLayoutProps): string {
  const preheaderHtml = preheader
    ? `<div style="display:none;font-size:1px;color:#f5f5f5;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>`
    : '';

  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
  <title>${subject || EMAIL_BRAND.name}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    table, td, div, p, a { font-family: Arial, sans-serif; }
  </style>
  <![endif]-->
  <style>
    ${baseStyles}
  </style>
</head>
<body>
  ${preheaderHtml}
  <div class="wrapper">
    ${content}
  </div>
</body>
</html>
  `.trim();
}
