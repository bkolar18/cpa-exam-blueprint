import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === 'development';

// Build CSP based on environment
function buildCSP(): string {
  const directives: string[] = [
    "default-src 'self'",
    // Style-src: unsafe-inline required for styled-components/emotion/CSS-in-JS
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "report-uri /api/csp-report",
    "report-to csp-endpoint",
  ];

  // Script sources - stricter in production
  const scriptSources = ["'self'"];

  // Google Analytics
  scriptSources.push('https://www.googletagmanager.com');
  scriptSources.push('https://www.google-analytics.com');

  if (isDevelopment) {
    // Development: allow eval for hot reloading and Vercel dev tools
    scriptSources.push("'unsafe-inline'");
    scriptSources.push("'unsafe-eval'");
    scriptSources.push('https://vercel.live');
    scriptSources.push('https://*.vercel-scripts.com');
  } else {
    // Production: use unsafe-inline only (needed for Next.js inline scripts)
    // TODO: Implement nonce-based CSP for true inline script protection
    scriptSources.push("'unsafe-inline'");
  }

  directives.push(`script-src ${scriptSources.join(' ')}`);

  // Connect sources
  const connectSources = [
    "'self'",
    'https://*.supabase.co',
    'wss://*.supabase.co',
    'https://api.anthropic.com',
    'https://api.resend.com',
    'https://www.google-analytics.com',
    'https://analytics.google.com',
  ];

  if (isDevelopment) {
    connectSources.push('https://vercel.live');
  }

  directives.push(`connect-src ${connectSources.join(' ')}`);

  return directives.join('; ');
}

const nextConfig: NextConfig = {
  // Security headers
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          {
            // Prevent clickjacking attacks
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            // Prevent MIME type sniffing
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // Enable XSS filter (legacy browsers)
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            // Control referrer information
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            // Permissions Policy (formerly Feature-Policy)
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            // Content Security Policy - environment-aware
            key: "Content-Security-Policy",
            value: buildCSP(),
          },
          {
            // Reporting API configuration
            key: "Report-To",
            value: JSON.stringify({
              group: "csp-endpoint",
              max_age: 10886400,
              endpoints: [{ url: "/api/csp-report" }],
            }),
          },
          {
            // Strict Transport Security (HTTPS only)
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
