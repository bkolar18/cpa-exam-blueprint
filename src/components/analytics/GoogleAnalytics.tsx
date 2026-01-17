'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Helper function to track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

// Pre-defined event helpers for common actions
export const analytics = {
  // Page view tracking (automatic, but can be called manually for SPA navigation)
  pageView: (url: string, title?: string) => {
    if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
      (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag?.('config', GA_MEASUREMENT_ID, {
        page_path: url,
        page_title: title,
      });
    }
  },

  // Blog interactions
  blogPostView: (postSlug: string, postTitle: string) => {
    trackEvent('view_blog_post', 'Blog', postTitle);
  },

  blogPostClick: (postSlug: string, postTitle: string) => {
    trackEvent('click_blog_post', 'Blog', postTitle);
  },

  // User engagement
  signUp: (method: string = 'email') => {
    trackEvent('sign_up', 'User', method);
  },

  login: (method: string = 'email') => {
    trackEvent('login', 'User', method);
  },

  // Practice questions
  startPractice: (section: string, mode: string) => {
    trackEvent('start_practice', 'Practice', `${section}_${mode}`);
  },

  completePractice: (section: string, score: number) => {
    trackEvent('complete_practice', 'Practice', section, score);
  },

  // TBS
  startTBS: (tbsId: string, section: string) => {
    trackEvent('start_tbs', 'TBS', `${section}_${tbsId}`);
  },

  completeTBS: (tbsId: string, score: number) => {
    trackEvent('complete_tbs', 'TBS', tbsId, score);
  },

  // Exam simulations
  startExam: (section: string) => {
    trackEvent('start_exam', 'Exam', section);
  },

  completeExam: (section: string, score: number) => {
    trackEvent('complete_exam', 'Exam', section, score);
  },

  // AI features
  useAIFeature: (feature: string) => {
    trackEvent('use_ai_feature', 'AI', feature);
  },

  // Conversion events
  viewPricing: () => {
    trackEvent('view_pricing', 'Conversion');
  },

  startCheckout: (plan: string, value: number) => {
    trackEvent('begin_checkout', 'Conversion', plan, value);
  },

  completePurchase: (plan: string, value: number) => {
    trackEvent('purchase', 'Conversion', plan, value);
  },

  // Navigation
  clickCTA: (ctaName: string, location: string) => {
    trackEvent('click_cta', 'CTA', `${ctaName}_${location}`);
  },

  // Study guide
  downloadStudyGuide: (section: string, topic: string) => {
    trackEvent('download_study_guide', 'StudyGuide', `${section}_${topic}`);
  },
};
