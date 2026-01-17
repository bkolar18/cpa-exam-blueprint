# Google Analytics 4 Setup for Meridian CPA Review

This guide walks you through setting up Google Analytics 4 (GA4) to track visitor usage, page views, blog post clicks, and custom events.

---

## Step 1: Create a Google Analytics Account

1. Go to [analytics.google.com](https://analytics.google.com)
2. Sign in with your Google account
3. Click **Start measuring** (or **Admin** gear icon if you already have an account)

---

## Step 2: Create a GA4 Property

1. In the Admin panel, click **Create Property**
2. Fill in property details:
   - **Property name**: `Meridian CPA Review`
   - **Reporting time zone**: Your timezone (e.g., `United States - Eastern Time`)
   - **Currency**: `US Dollar ($)`
3. Click **Next**
4. Select your business details:
   - **Industry category**: `Education`
   - **Business size**: Select appropriate option
5. Click **Next**
6. Select business objectives (recommended):
   - ✅ Generate leads
   - ✅ Examine user behavior
   - ✅ Get baseline reports
7. Click **Create**
8. Accept the terms of service

---

## Step 3: Set Up a Web Data Stream

1. After creating the property, select **Web** as your platform
2. Enter your website details:
   - **Website URL**: `https://meridiancpareview.com`
   - **Stream name**: `Meridian CPA Review - Production`
3. Enable **Enhanced measurement** (recommended) - this automatically tracks:
   - Page views
   - Scrolls
   - Outbound clicks
   - Site search
   - Video engagement
   - File downloads
4. Click **Create stream**
5. **Copy your Measurement ID** (format: `G-XXXXXXXXXX`)
   - You'll find this at the top of the stream details page
   - Keep this page open - you'll need this ID in the next step

---

## Step 4: Add Measurement ID to Your App

### Local Development (.env.local)

1. Open your project's `.env.local` file
2. Add the following line:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID

### Production (Vercel)

1. Go to [vercel.com](https://vercel.com) and select your project
2. Navigate to **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key**: `NEXT_PUBLIC_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX` (your Measurement ID)
   - **Environment**: Select all (Production, Preview, Development)
4. Click **Save**
5. **Redeploy** your application for changes to take effect:
   - Go to **Deployments** tab
   - Click the three dots on the latest deployment
   - Select **Redeploy**

---

## Step 5: Verify Installation

### Method 1: Real-Time Reports
1. Go to your website in a new browser tab
2. In Google Analytics, go to **Reports** → **Realtime**
3. You should see your visit appear within 30 seconds

### Method 2: Google Tag Assistant
1. Install the [Google Tag Assistant](https://tagassistant.google.com/) Chrome extension
2. Visit your website
3. Click the Tag Assistant icon
4. Verify that your GA4 tag is detected and showing a green checkmark

### Method 3: Browser DevTools
1. Open your website
2. Press F12 to open DevTools
3. Go to **Network** tab
4. Filter by `google-analytics` or `gtag`
5. You should see requests being made to Google Analytics

---

## Step 6: Configure GA4 Settings (Recommended)

### Enable Google Signals
1. Go to **Admin** → **Data Settings** → **Data Collection**
2. Enable **Google signals data collection**
3. This enables demographics, interests, and cross-device tracking

### Set Up Conversions
1. Go to **Admin** → **Events**
2. Mark important events as conversions:
   - `sign_up` - User registration
   - `purchase` - Completed purchase
   - `begin_checkout` - Started checkout

### Link Google Search Console (Optional)
1. Go to **Admin** → **Product Links** → **Search Console Links**
2. Click **Link**
3. Follow the prompts to connect your Search Console property

---

## Using Custom Event Tracking

The Google Analytics integration includes pre-built event helpers. Here's how to use them:

### Import the Analytics Module
```typescript
import { analytics } from '@/components/analytics/GoogleAnalytics';
```

### Available Event Helpers

#### Blog Tracking
```typescript
// When a user views a blog post
analytics.blogPostView('cpa-exam-tips', 'Top 10 CPA Exam Tips');

// When a user clicks on a blog post link
analytics.blogPostClick('cpa-exam-tips', 'Top 10 CPA Exam Tips');
```

#### User Events
```typescript
// User signs up
analytics.signUp('email');  // or 'google'

// User logs in
analytics.login('email');
```

#### Practice Questions
```typescript
// User starts a practice session
analytics.startPractice('FAR', 'adaptive');

// User completes practice (with score)
analytics.completePractice('FAR', 85);
```

#### Task-Based Simulations
```typescript
// User starts a TBS
analytics.startTBS('tbs-far-001', 'FAR');

// User completes a TBS (with score)
analytics.completeTBS('tbs-far-001', 78);
```

#### Exam Simulations
```typescript
// User starts an exam
analytics.startExam('FAR');

// User completes an exam
analytics.completeExam('FAR', 82);
```

#### AI Features
```typescript
// User uses an AI feature
analytics.useAIFeature('navigator');
analytics.useAIFeature('study_guide');
analytics.useAIFeature('explanation');
```

#### Conversion Events
```typescript
// User views pricing page
analytics.viewPricing();

// User starts checkout
analytics.startCheckout('premium', 9900);  // value in cents

// User completes purchase
analytics.completePurchase('premium', 9900);
```

#### CTA Clicks
```typescript
// User clicks a call-to-action
analytics.clickCTA('Start Free Trial', 'homepage_hero');
analytics.clickCTA('Get Started', 'pricing_page');
```

#### Custom Events
```typescript
import { trackEvent } from '@/components/analytics/GoogleAnalytics';

// Track any custom event
trackEvent('action_name', 'category', 'label', value);

// Examples:
trackEvent('download', 'Resources', 'FAR Study Guide', 1);
trackEvent('share', 'Social', 'Twitter', 1);
```

---

## Viewing Reports

### Key Reports to Monitor

1. **Realtime** → See current active users
2. **Acquisition** → **Traffic acquisition** → See where users come from
3. **Engagement** → **Pages and screens** → See most popular pages
4. **Engagement** → **Events** → See all tracked events
5. **Monetization** → **Ecommerce purchases** → Track conversions (if configured)

### Create Custom Reports

1. Go to **Explore** (left sidebar)
2. Click **Blank** to create a custom exploration
3. Add dimensions (e.g., Page path, Event name)
4. Add metrics (e.g., Event count, Users)
5. Build your custom report

---

## Troubleshooting

### Analytics Not Tracking

1. **Check environment variable**: Ensure `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
2. **Check for ad blockers**: Disable ad blockers and try again
3. **Check console errors**: Open browser DevTools and look for JavaScript errors
4. **Verify deployment**: Make sure Vercel has been redeployed after adding the env variable

### Data Not Appearing in Reports

- **Real-time**: Should appear within 30 seconds
- **Standard reports**: May take 24-48 hours to populate
- **Debug mode**: Use [GA4 Debug View](https://support.google.com/analytics/answer/7201382) for testing

### Events Not Firing

1. Check that the component is imported correctly
2. Verify the function is being called (add console.log for testing)
3. Use the GA4 DebugView to see events in real-time

### "No Data" in Reports

- Wait 24-48 hours for initial data
- Ensure Enhanced Measurement is enabled
- Check that your website is receiving traffic

---

## Privacy Considerations

### Cookie Consent
For GDPR/CCPA compliance, consider implementing a cookie consent banner. GA4 can be configured to respect user consent:

```typescript
// In GoogleAnalytics.tsx, you can modify to check consent
if (userHasConsented) {
  gtag('config', GA_MEASUREMENT_ID);
}
```

### IP Anonymization
GA4 anonymizes IP addresses by default in most regions.

### Data Retention
1. Go to **Admin** → **Data Settings** → **Data Retention**
2. Set retention period (default: 2 months, max: 14 months)

---

## Quick Reference

| Item | Value |
|------|-------|
| Analytics URL | [analytics.google.com](https://analytics.google.com) |
| Environment Variable | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| Measurement ID Format | `G-XXXXXXXXXX` |
| Real-time Data Delay | ~30 seconds |
| Standard Reports Delay | 24-48 hours |
| Component Location | `src/components/analytics/GoogleAnalytics.tsx` |

---

## Need Help?

- [GA4 Help Center](https://support.google.com/analytics)
- [GA4 Developer Guide](https://developers.google.com/analytics/devguides/collection/ga4)
- [Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/ga4)
