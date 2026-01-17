# SEO Content Strategy - Status Update

**Last Updated:** January 16, 2026

---

## Overview

This document tracks the SEO content strategy implementation for Meridian CPA Review, including new pages, optimization efforts, and progress toward search visibility goals.

---

## Google Search Console

| Item | Status | Date |
|------|--------|------|
| Verification Code Added | Complete | Jan 15, 2026 |
| Site Verified | Complete | Jan 15, 2026 |
| Sitemap Submitted | Complete | Jan 15, 2026 |

**Verification Code:** `vs3HMtOl9i7etmk_YDAfVWYcN42Dqek0dKOVw9EQUdQ`

---

## SEO Infrastructure

| Component | Status | Location |
|-----------|--------|----------|
| Sitemap | Complete | `/sitemap.xml` (dynamic via `src/app/sitemap.ts`) |
| Robots.txt | Complete | `public/robots.txt` |
| Meta Description | Complete | `src/app/layout.tsx` |
| Open Graph Tags | Complete | `src/app/layout.tsx` |
| Twitter Cards | Complete | `src/app/layout.tsx` |
| JSON-LD (Organization) | Complete | `src/components/seo/JsonLd.tsx` |
| JSON-LD (Website) | Complete | `src/components/seo/JsonLd.tsx` |
| JSON-LD (FAQ) | Complete | `src/app/faq/page.tsx` |
| OG Image | Complete | `public/og-image.png` |
| Favicon/Icon | Complete | `src/app/icon.png`, `src/app/apple-icon.png` |

---

## Phase 1: High-Impact SEO Pages (Complete)

| Page | URL | Target Keywords | Status |
|------|-----|-----------------|--------|
| Resources Hub | `/resources` | CPA exam resources, CPA study guide | **Complete** |
| CPA Pass Rates | `/resources/cpa-pass-rates` | CPA pass rate, CPA exam pass rate | **Complete** |
| How to Become a CPA | `/guides/how-to-become-a-cpa` | how to become a CPA, CPA requirements | **Complete** |
| Best Order for CPA Exams | `/guides/best-order-cpa-exams` | CPA exam order, which CPA exam first | **Complete** |
| Becker vs Gleim | `/compare/becker-vs-gleim` | Becker vs Gleim, CPA review comparison | **Complete** |

### Compliance Features Added:
- Disclaimers on all pages with external data
- Source citations (AICPA, NASBA links)
- "Prices may change" warnings on comparison page
- "Not affiliated" statements
- No fabricated testimonials
- No guarantee language
- No fake team/staff references
- All data verifiable from public sources

---

## Phase 2: Topic Authority Pages (Complete)

### Topic Deep-Dive Pages by Section

**FAR Topics:**
| Page | URL | Status |
|------|-----|--------|
| Lease Accounting (ASC 842) | `/topics/far/lease-accounting` | **Complete** |
| Revenue Recognition (ASC 606) | `/topics/far/revenue-recognition` | **Complete** |
| Consolidations | `/topics/far/consolidations` | **Complete** |
| Government Accounting | `/topics/far/government-accounting` | **Complete** |
| Nonprofit Accounting | `/topics/far/nonprofit-accounting` | **Complete** |

**AUD Topics:**
| Page | URL | Status |
|------|-----|--------|
| Audit Evidence | `/topics/aud/audit-evidence` | **Complete** |
| Internal Controls | `/topics/aud/internal-controls` | **Complete** |
| Audit Reports | `/topics/aud/audit-reports` | **Complete** |

**REG Topics:**
| Page | URL | Status |
|------|-----|--------|
| Like-Kind Exchanges | `/topics/reg/like-kind-exchanges` | **Complete** |
| Basis Calculations | `/topics/reg/basis-calculations` | **Complete** |
| Partnership Taxation | `/topics/reg/partnership-taxation` | **Complete** |

---

## Phase 3: Programmatic SEO (Complete)

| Content Type | Template | Quantity | Status |
|--------------|----------|----------|--------|
| State Salary Pages | `/resources/cpa-salary/[state]` | 51 (index + 50 states) | **Complete** |
| "How to Become CPA in [State]" | `/guides/become-cpa-in/[state]` | 56 (index + 55 jurisdictions) | **Complete** |
| Additional Comparisons | `/compare/[provider1]-vs-[provider2]` | 4 | **Complete** |

### State Salary Pages Details:
- **Index Page:** `/resources/cpa-salary` - Lists all 50 states with salary comparisons
- **Individual State Pages:** `/resources/cpa-salary/[state]` - 50 dynamic pages
- **Data Source:** `src/data/state-salaries.ts` - Comprehensive salary data for all 50 states
- **Features:** Salary by experience level, cost of living adjustment, top industries, job growth

### "How to Become CPA in [State]" Pages Details:
- **Index Page:** `/guides/become-cpa-in` - Lists all 50 states + DC & territories
- **Individual State Pages:** `/guides/become-cpa-in/[state]` - 55 dynamic pages (50 states + DC + 4 territories)
- **Data Source:** `src/lib/data/state-requirements.ts` - Comprehensive requirements data
- **Features:** Step-by-step process, education/experience requirements, fees, ethics exam, salary outlook links

### Additional Comparison Pages:
- `/compare/becker-vs-surgent` - Becker vs Surgent CPA Review
- `/compare/surgent-vs-roger` - Surgent vs Roger CPA Review
- `/compare/wiley-vs-uworld` - Wiley vs UWorld CPA Review

---

## Existing SEO Content Inventory

### Already Live:
- 13 Blog Posts
- 6 Section Guide Pages (FAR, AUD, REG, TCP, BAR, ISC)
- 55 State Requirement Pages
- 3 Tool Pages (Study Hours Calculator, NTS Tracker, Score Calendar)
- 2 Guide Pages (Failed Section, Exam Day)
- FAQ Page (10 items with schema)

### Newly Added (Jan 15, 2026):
- Resources Hub
- CPA Pass Rates
- How to Become a CPA
- Best Order for CPA Exams
- Becker vs Gleim Comparison
- Topic: Lease Accounting (ASC 842)
- Topic: Revenue Recognition (ASC 606)
- Topic: Like-Kind Exchanges (Section 1031)
- Topic: Basis Calculations
- Topic: Audit Reports & Opinions
- Topic: Internal Controls (COSO Framework)
- Topic: Audit Evidence
- Topic: Partnership Taxation
- Topic: Consolidations
- Topic: Government Accounting
- Topic: Nonprofit Accounting

### Newly Added (Jan 16, 2026):
- CPA Salary Index Page
- 50 State Salary Pages (programmatic)
- "How to Become CPA in [State]" Index Page
- 55 State-specific "How to Become a CPA" Pages (programmatic)
- Becker vs Surgent Comparison Page
- Surgent vs Roger Comparison Page
- Wiley vs UWorld Comparison Page

---

## Sitemap Status

**Location:** `src/app/sitemap.ts`

**Includes:**
- Static pages (home, about, pricing, FAQ, blog, state-requirements, login, signup)
- Section pages (6)
- Guide pages (3 - failed-section, how-to-become-a-cpa, best-order-cpa-exams)
- Resource pages (4 - /resources, /resources/cpa-pass-rates, /resources/free-cpa-videos, /resources/free-practice-materials)
- Comparison pages (6 - becker-vs-gleim, becker-vs-surgent, surgent-vs-roger, wiley-vs-uworld, roger-vs-wiley, becker-vs-roger)
- Topic pages (11 - lease-accounting, revenue-recognition, consolidations, government-accounting, nonprofit-accounting, like-kind-exchanges, basis-calculations, partnership-taxation, audit-reports, internal-controls, audit-evidence)
- State salary pages (51 - index + 50 state pages, dynamically generated from `src/data/state-salaries.ts`)
- "How to Become CPA in [State]" pages (56 - index + 55 jurisdiction pages, dynamically generated from `src/lib/data/state-requirements.ts`)
- Blog posts (13, dynamically generated)

**Total Pages in Sitemap:** ~152 pages

---

## Competitor Analysis Summary

**Research Conducted:** January 15, 2026

### What Big Providers Do (Becker, Gleim, Surgent):
- Extensive state-specific content pages
- Career/salary guides (high search volume)
- Credential comparisons (CPA vs CMA, CPA vs CFA)
- "How to Become a CPA" comprehensive guides
- Pass rate statistics pages
- Study plan templates by timeframe
- Topic deep-dive educational content
- Free resources as lead magnets
- FAQ pages with schema markup
- University partnership content

### Our Competitive Advantages:
- Free access during beta (no credit card)
- Large question bank (6,000+ MCQs, 500+ TBS)
- Affordable positioning
- Modern, clean UI
- State requirements already comprehensive

---

## UI/UX Improvements (Jan 16, 2026)

### Navigation Enhancements

**Header Updates (`src/components/Header.tsx`):**
- Simplified Resources dropdown from complex 3-column layout to single-column design (320px width)
- Added "Meridian CPA Academy" featured link at top of dropdown
- Created `quickLinks` array with 6 key pages:
  - How to Become a CPA
  - State Requirements
  - CPA Salary Data
  - Compare Courses
  - CPA Pass Rates
  - Blog
- Added "View All Resources" link to Resources Hub
- Mobile menu updated to match simplified structure

**Footer Updates (`src/components/Footer.tsx`):**
- Added SEO page links: Resources, Become a CPA, State Requirements, CPA Salary, Compare Courses
- All 6 exam section links (FAR, AUD, REG, TCP, BAR, ISC)
- Compact, responsive layout

### Authentication Fix

**Login Page (`src/app/login/page.tsx`):**
- Fixed race condition where users were redirected back to login after successful authentication
- Added session confirmation check (`if (data.session)`) before redirect
- Added 150ms delay to ensure cookies are set and auth state is updated
- Added error handling for edge case where login succeeds but no session is created

---

## Next Steps

1. ~~**Immediate:** Add favicon for Google search results~~ **Done**
2. ~~**Short-term:** Expand footer with Resources link~~ **Done** (Jan 16, 2026)
3. ~~**Medium-term:** Complete remaining Phase 2 topic pages~~ **Done** (11 topic pages complete)
4. ~~**Long-term:** Implement programmatic SEO for state-specific content~~ **Done** (111 programmatic pages created)

## Summary of Total Pages Created (Jan 15-16, 2026)

| Category | Count |
|----------|-------|
| Phase 1: High-Impact SEO Pages | 5 |
| Phase 2: Topic Authority Pages | 11 |
| Phase 3: State Salary Pages | 51 |
| Phase 3: "How to Become CPA" State Pages | 56 |
| Phase 3: Comparison Pages | 3 (new) |
| **Total New SEO Pages** | **126** |

---

## Phase 4: SEO Schema & Content Extension (Jan 16, 2026)

### JSON-LD Schema Enhancements

| Component | Status | Location |
|-----------|--------|----------|
| ArticleJsonLd | **Complete** | `src/components/seo/JsonLd.tsx` |
| HowToJsonLd | **Complete** | `src/components/seo/JsonLd.tsx` |
| BreadcrumbJsonLd (topic pages) | **Complete** | All 11 topic pages |
| BreadcrumbJsonLd (resources) | **Complete** | `/resources`, `/resources/free-cpa-videos`, `/resources/free-practice-materials` |

### Schema Implementation Details:

**Blog Posts (`src/app/blog/[slug]/page.tsx`):**
- ArticleJsonLd with headline, description, author, dates
- BreadcrumbJsonLd: Home > Blog > [Post Title]

**How to Become a CPA (`src/app/guides/how-to-become-a-cpa/page.tsx`):**
- HowToJsonLd with 6 steps, totalTime (PT6Y), estimatedCost
- BreadcrumbJsonLd: Home > Resources > How to Become a CPA
- FAQPageJsonLd for FAQ section

**All 11 Topic Pages:**
- BreadcrumbJsonLd: Home > [Section] > [Topic Name]
- FAR: lease-accounting, consolidations, government-accounting, nonprofit-accounting, revenue-recognition
- AUD: audit-evidence, audit-reports, internal-controls
- REG: basis-calculations, like-kind-exchanges, partnership-taxation

### New Comparison Pages

| Page | URL | Status |
|------|-----|--------|
| Roger vs Wiley | `/compare/roger-vs-wiley` | **Complete** |
| Becker vs Roger | `/compare/becker-vs-roger` | **Complete** |

### Free Resources Section

| Page | URL | Content | Status |
|------|-----|---------|--------|
| Free CPA Videos | `/resources/free-cpa-videos` | YouTube channels (Farhat, Edspira, Darius Clark, etc.) | **Complete** |
| Free Practice Materials | `/resources/free-practice-materials` | AICPA sample tests, FASB, IRS publications | **Complete** |

### Resources Page Updates

**Updated:** `src/app/resources/page.tsx`
- Added "Compare CPA Review Courses" category
- Added "Free Study Resources" category
- Added BreadcrumbJsonLd
- Fixed TypeScript typing issues

---

## Notes

- All comparison pages use Option B approach (competitor vs competitor, not us vs them)
- Subtle CTA for Meridian at bottom of comparison pages
- All content reviewed for legal compliance:
  - No fabricated testimonials
  - No pass rate guarantees
  - No fake team members
  - All data from public sources with citations
- Free resources pages use LINK-ONLY approach (no republishing AICPA content)
