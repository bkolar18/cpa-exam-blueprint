# SEO Content Strategy - Status Update

**Last Updated:** January 15, 2026

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

## Phase 3: Programmatic SEO (Planned)

| Content Type | Template | Quantity | Status |
|--------------|----------|----------|--------|
| State Salary Pages | `/resources/cpa-salary-[state]` | 50 | Pending |
| "How to Become CPA in [State]" | `/guides/become-cpa-[state]` | 50 | Pending |
| Additional Comparisons | `/compare/[provider1]-vs-[provider2]` | 5-10 | Pending |

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

---

## Sitemap Status

**Location:** `src/app/sitemap.ts`

**Includes:**
- Static pages (home, about, pricing, FAQ, blog, state-requirements, login, signup)
- Section pages (6)
- Guide pages (3 - failed-section, how-to-become-a-cpa, best-order-cpa-exams)
- Resource pages (2 - /resources, /resources/cpa-pass-rates)
- Comparison pages (1 - /compare/becker-vs-gleim)
- Topic pages (11 - lease-accounting, revenue-recognition, consolidations, government-accounting, nonprofit-accounting, like-kind-exchanges, basis-calculations, partnership-taxation, audit-reports, internal-controls, audit-evidence)
- Blog posts (13, dynamically generated)

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

## Next Steps

1. ~~**Immediate:** Add favicon for Google search results~~ **Done**
2. **Short-term:** Expand footer with Resources link
3. ~~**Medium-term:** Complete remaining Phase 2 topic pages~~ **Done** (11 topic pages complete)
4. **Long-term:** Implement programmatic SEO for state-specific content

---

## Notes

- All comparison pages use Option B approach (competitor vs competitor, not us vs them)
- Subtle CTA for Meridian at bottom of comparison pages
- All content reviewed for legal compliance:
  - No fabricated testimonials
  - No pass rate guarantees
  - No fake team members
  - All data from public sources with citations
