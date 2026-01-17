# Content Currency Audit Plan

## Overview

This document outlines the comprehensive plan to audit and update all CPA exam content to ensure alignment with the **2026 AICPA Blueprint** (effective January 1, 2026) and the **One Big Beautiful Bill Act (OBBBA / H.R. 1)** enacted July 4, 2025.

**Created:** 2026-01-16
**Priority:** HIGH - Tax law changes become testable July 1, 2026

---

## Executive Summary

### CRITICAL: Testing Timeline

| Testing Period | What's Tested | Your Content Status |
|----------------|---------------|---------------------|
| **Now - June 30, 2026** | Pre-OBBBA law (TCJA) | ✅ **CURRENT** |
| **July 1, 2026+** | OBBBA provisions | ⚠️ Updates needed |

**Students sitting before July 1, 2026 should use your current content as-is.**
**Students sitting July 1, 2026 or later will need updated content.**

### Content Currency Verification (Completed 2026-01-16)

| Section | Authoritative References | Tax Year Data | Status |
|---------|-------------------------|---------------|--------|
| FAR | ASC codification (current) | N/A | ✅ Current |
| AUD | AU-C, PCAOB, GAGAS (current) | N/A | ✅ Current |
| REG | IRC sections (pre-OBBBA) | 2024 | ✅ Current for pre-July 2026 |
| TCP | IRC sections (pre-OBBBA) | 2024 | ✅ Current for pre-July 2026 |
| BAR | ASC, valuation standards | N/A | ✅ Current |
| ISC | SOC, NIST, PCI, COBIT | N/A | ✅ Current |

---

### Key Legislative Changes

The **One Big Beautiful Bill Act (OBBBA)** enacted July 4, 2025, significantly changed tax law:

| Change | Old Law (TCJA 2018-2025) | New Law (OBBBA 2025+) |
|--------|--------------------------|----------------------|
| Standard Deduction | $14,600 single / $29,200 MFJ | **$15,750 single / $31,500 MFJ** |
| SALT Cap | $10,000 flat | **$40,000** (phases out over $500K MAGI) |
| Estate Tax Exemption | ~$13.61M (sunset 2026) | **Permanent** at TCJA levels |
| Child Tax Credit | $2,000 per child | **$2,200** per child (indexed) |
| Tips Deduction | Not deductible | **New: Up to $25,000** (2025-2028) |
| Overtime Deduction | Not deductible | **New: Up to $12,500** (2025-2028) |
| Senior Deduction | N/A | **New: $6,000 age 65+** (2025-2028) |
| Auto Loan Interest | Not deductible | **New: Up to $10,000** (2025-2028) |
| Personal Exemption | Suspended (returns 2026) | **Permanently eliminated** |

### AICPA Blueprint 2026 Changes

Minor refinements effective January 1, 2026:
- **AUD**: Quality Management standards updates, entity-level controls emphasis
- **FAR**: Fair value measurement scope clarifications
- **REG**: H.R. 1 provisions for AGI adjustments (testable July 1, 2026)
- **TCP**: H.R. 1 provisions, removed international tax task
- **BAR**: Investment valuation refinements
- **ISC**: SOC 1 Guide rename, HIPAA additions, PCI DSS update, Data Analytics added

---

## Phase 1: Immediate Updates (Before July 1, 2026)

### 1.1 Taxonomy Comment Update ✅ COMPLETED
- Updated `src/lib/data/practice-questions/taxonomy.ts` from 2024 to 2026
- Added "Last reviewed: 2026-01-16"

### 1.2 Dual-Track Infrastructure ✅ COMPLETED
- Database migration for `tax_content_version` field
- Settings page with version toggle (Auto/TCJA/OBBBA)
- Dashboard notification banner for transition period
- Practice quiz version indicator for REG/TCP
- Version-aware question loader infrastructure
- See "Dual-Track Content Strategy - IMPLEMENTED" section below for details

### 1.3 REG/TCP OBBBA Content Creation (Dual-Track Approach)

**IMPORTANT:** The current TCJA content is CORRECT for students testing before July 1, 2026.
We are NOT replacing existing content - we are ADDING a parallel OBBBA version.

#### Dual-Track Strategy

| Content Version | File Location | For Students Testing |
|-----------------|---------------|---------------------|
| **TCJA (current)** | `reg.ts`, `tcp.ts` | Before July 1, 2026 |
| **OBBBA (new)** | `reg-obbba.ts`, `tcp-obbba.ts` | July 1, 2026 or later |

#### Questions Needing OBBBA Variants

These existing TCJA questions need parallel OBBBA versions with updated rules:

| Topic | TCJA Version (Keep) | OBBBA Version (Create) |
|-------|---------------------|------------------------|
| SALT Cap | "$10,000 (2018-2025)" | "$40,000 (2025-2029), phases out over $500K MAGI" |
| Standard Deduction | "$14,600 single / $29,200 MFJ" | "$15,750 single / $31,500 MFJ" |
| Estate Exemption | "~$13.61M, sunsets 2026" | "~$13.99M, PERMANENT" |
| Personal Exemption | "suspended 2018-2025" | "Permanently eliminated by OBBBA" |
| Anti-clawback | "before 2026 sunset" | "No longer applicable - exemption permanent" |
| Child Tax Credit | "$2,000 per child" | "$2,200 per child (indexed)" |

#### New OBBBA-Only Topics (Not in TCJA version)

These are entirely new provisions that only apply post-July 2026:

| Topic | Description | IRC Section |
|-------|-------------|-------------|
| Tips Deduction | Up to $25,000 for qualified tips (2025-2028) | §62(a)(22) |
| Overtime Deduction | Up to $12,500 ($25K MFJ) for FLSA overtime (2025-2028) | §62(a)(23) |
| Senior Deduction | $6,000 additional for age 65+ (2025-2028) | §63(f) |
| Auto Loan Interest | Up to $10,000 for vehicle purchases (2025-2028) | §163(h)(2)(F) |

### 1.4 Content File Structure

```
src/lib/data/practice-questions/
├── reg.ts              # TCJA version (KEEP AS-IS)
├── reg-obbba.ts        # OBBBA version (CREATE)
├── tcp.ts              # TCJA version (KEEP AS-IS)
├── tcp-obbba.ts        # OBBBA version (CREATE)
└── index.ts            # Version-aware loader (DONE)
```

The `versionedQuestionSets` in `index.ts` will point to:
- `tcja`: Current `regQuestions` / `tcpQuestions`
- `obbba`: New `regQuestionsOBBBA` / `tcpQuestionsOBBBA`

---

## Phase 2: OBBBA Content Creation

**Approach:** Create NEW question files for OBBBA content. Do NOT modify existing TCJA files.

### 2.1 REG-OBBBA Content Creation ✅ COMPLETE (23 Questions)

**Created:** `src/lib/data/practice-questions/reg-obbba.ts`
**Enhanced:** 2026-01-16 with IRC references, distractor analysis, difficulty balancing

#### Topics Covered
- [x] Standard Deduction - $15,750/$31,500 (2025)
- [x] Personal Exemption - permanently eliminated (§151(d)(5))
- [x] Tips Deduction (§62(a)(22)) - $25K limit
- [x] Overtime Deduction (§62(a)(23)) - $12.5K/$25K MFJ limit
- [x] Senior Deduction (§63(f)) - $6K additional
- [x] Auto Loan Interest (§163(h)(2)(F)) - $10K limit, US-manufactured
- [x] SALT cap $40K with $500K MAGI phaseout (§164(b)(6))
- [x] Child Tax Credit - $2,200 (§24)
- [x] Estate tax exemption - PERMANENT at ~$14M (§2010(c))
- [x] Gift tax exemption - unified at ~$14M (§2505)
- [x] C Corp rate - 21% flat (§11(b))
- [x] QBI deduction - 20% permanent (§199A)
- [x] 2% floor deductions - permanently eliminated (§67(g))
- [x] Hobby expenses - permanently non-deductible (§183)
- [x] Tax brackets - 10%-37% permanent (§1)
- [x] Section 179 - ~$1.25M limit permanent (§179)
- [x] Bonus depreciation calculation - 60% for 2026 (§168(k))
- [x] PTET SALT workaround (Notice 2020-75)

#### Difficulty Distribution
- Easy: 9 questions (39%)
- Medium: 10 questions (43%)
- Hard: 4 questions (17%)

### 2.2 TCP-OBBBA Content Creation ✅ COMPLETE (23 Questions)

**Created:** `src/lib/data/practice-questions/tcp-obbba.ts`
**Enhanced:** 2026-01-16 with IRC references, distractor analysis, difficulty balancing

#### Topics Covered
- [x] Filing threshold with permanent exemption elimination (§6012)
- [x] Standard deduction - $15,750/$31,500 (§63(c))
- [x] Tips Deduction - $25K limit (§62(a)(22))
- [x] Overtime Deduction - $12.5K/$25K limit (§62(a)(23))
- [x] Senior Deduction - $6K additional (§63(f))
- [x] Auto Loan Interest - $10K limit (§163(h)(2)(F))
- [x] SALT cap - $40K with MAGI phaseout (§164(b)(6))
- [x] Estate exemption - PERMANENT at ~$14M (§2010(c))
- [x] Clawback concern - eliminated (§2001(g))
- [x] Estate planning strategy post-OBBBA
- [x] Child Tax Credit - $2,200 (§24)
- [x] Personal exemption - permanently eliminated (§151(d))
- [x] QOZ deferral - unchanged 12/31/2026 (§1400Z-2)
- [x] Section 163(j) - 30% ATI limit (§163(j))
- [x] Bonus depreciation - 60% for 2026 (§168(k))
- [x] Bonus depreciation calculation with MACRS
- [x] 2% floor deductions - permanently eliminated (§67(g))
- [x] AMT exemption - permanent at higher levels (§55(d))
- [x] AMT preferences - ISO bargain element (§56, §57)
- [x] Comprehensive OBBBA planning scenarios
- [x] TCJA vs OBBBA comparison

#### Difficulty Distribution
- Easy: 9 questions (39%)
- Medium: 9 questions (39%)
- Hard: 5 questions (22%)

### 2.3 FAR Section Audit ✅ VERIFIED (2026-01-16)

**File:** `src/lib/data/practice-questions/far.ts` (1,835 questions, updated 2026-01-08)

#### 2026 Blueprint Changes - Review Findings
- [x] Fair value measurements - References ASC 820, ASC 805 appropriately ✅
- [x] Financial statement ratios - Examples current and comprehensive ✅
- [x] AICPA Practice Aid reference - No outdated references found ✅
- [x] Cash basis content - Only mentioned as incorrect answers (correct approach) ✅

**Status:** Content is current for 2026 Blueprint. No changes required.

### 2.4 AUD Section Audit ✅ VERIFIED (2026-01-16)

**File:** `src/lib/data/practice-questions/aud.ts` (1,015 questions, updated 2026-01-08)

#### 2026 Blueprint Changes - Review Findings
- [x] Quality Management - Content references SQMS 1 where appropriate ✅
- [x] Quality Control elements (LEAHPM) - Comprehensive coverage ✅
- [x] Internal Control - Entity-level controls topic exists with 2+ questions ✅
- [x] Risk Assessment - Current AU-C terminology used ✅

**Status:** Content is current for 2026 Blueprint. Quality Control/Management transition covered.

### 2.5 BAR Section Audit ✅ VERIFIED (2026-01-16)

**File:** `src/lib/data/practice-questions/bar.ts` (490 questions, updated 2026-01-08)

#### 2026 Blueprint Changes - Review Findings
- [x] Investment valuation models - Comprehensive DCF, comparables coverage ✅
- [x] Fair value measurement - ASC 805 business combinations ✅
- [x] Goodwill and intangibles - Full/partial goodwill methods covered ✅

**Status:** Content is current for 2026 Blueprint. No changes required.

### 2.6 ISC Section Audit

**File:** `src/lib/data/practice-questions/isc.ts`

#### 2026 Blueprint Changes - Detailed Analysis (2026-01-16)

**1. SOC Reports - SOC 1 Guide Updates**
- [x] Current content references SSAE 18 (AT-C 320) ✅ CORRECT
- [ ] AICPA updated SOC 1 Guide in 2025 with SSAE-20 and SSAE-21 updates
- [ ] Consider adding questions on:
  - SSAE-20 materiality concept changes
  - SSAE-21 Direct Examination Engagements (AT-C 206)
  - Updated CUECs and CSOCs guidance
  - Subservice organization identification

**2. Regulatory - HIPAA Updates (December 2024 NPRM)**
- [ ] Add questions on PHI vs ePHI definitions
- [ ] Add HIPAA Security Rule basics (proposed 2025 update):
  - 72-hour system restoration requirement
  - 24-hour access change notification
  - Technology asset inventory requirements
  - Network mapping requirements
- [ ] Add Business Associate Agreement (BAA) questions
- Current coverage: Only 1 mention (SOC 2+ with HIPAA)

**3. Security Standards - PCI DSS Updates**
- [ ] Update references from "PCI-DSS" to "PCI DSS v4.0.1"
- [ ] Key PCI DSS 4.0 changes to add:
  - 12-character minimum password (was 7)
  - Script management on payment pages (Req 6.4.3)
  - Enhanced MFA requirements
  - 500+ requirements (up from 370)
- Current coverage: 2 questions reference PCI (HSM compliance, tokenization)

**4. Data Analytics - Coverage Verification**
- [x] Multiple data analytics questions exist ✅ ADEQUATE
- Topics covered: Big data ethics, data quality dimensions, analytics applications
- Question IDs: Multiple in "Data Management" and "Analytics" subtopics

#### Summary: ISC Questions Needing Updates/Additions

| Category | Current | Needed Action |
|----------|---------|---------------|
| SOC Reports | 15+ questions | Add SSAE-20/21 updates |
| HIPAA | 1 mention | Add 3-5 PHI/ePHI/Security Rule questions |
| PCI DSS | 2 questions | Update to v4.0.1, add new requirements |
| Data Analytics | 10+ questions | No changes needed |

#### ISC Updates Completed (2026-01-16) ✅

**New "Regulatory Compliance" topic added with 10 questions:**

| ID | Subtopic | Concept | Difficulty |
|----|----------|---------|------------|
| isc-reg-001 | HIPAA | PHI vs ePHI definition | easy |
| isc-reg-002 | HIPAA | Security Rule safeguards (APT) | medium |
| isc-reg-003 | HIPAA | Business Associate Agreements | medium |
| isc-reg-004 | HIPAA | 2025 Security Rule updates (72-hour restoration) | hard |
| isc-reg-005 | HIPAA | 18 HIPAA identifiers | medium |
| isc-reg-006 | PCI DSS | v4.0 overview (12-char passwords, customized approach) | medium |
| isc-reg-007 | PCI DSS | Scope (CHD/SAD) | easy |
| isc-reg-008 | PCI DSS | Requirement 6.4.3 (script management) | hard |
| isc-reg-009 | Privacy | GDPR extraterritorial scope | medium |
| isc-reg-010 | Privacy | GDPR 72-hour breach notification | medium |

**PCI DSS References Updated:**
- HSM question: Updated to "PCI DSS v4.0, FIPS 140-2/140-3"
- Tokenization question: Updated explanation for PCI DSS scope reduction

---

## Phase 3: TBS Content Audit

### 3.1 Exam TBS Questions

**Location:** `src/lib/data/exam-tbs/`

| Section | Count | Priority Topics |
|---------|-------|-----------------|
| FAR | 11 | Fair value, government accounting |
| AUD | 11 | Quality management, entity-level controls |
| REG | 10 | **HIGH: Tax calculations with OBBBA amounts** |
| TCP | 9 | **HIGH: Planning scenarios with new deductions** |
| BAR | 9 | Valuation models |
| ISC | 8 | SOC reports, security standards |

### 3.2 Practice TBS Questions

**Location:** `src/lib/data/tbs-questions/`

- [ ] Audit all TBS for tax calculations using outdated amounts
- [ ] Update tax form simulations for OBBBA
- [ ] Verify IRC references are current

---

## Phase 4: Implementation Checklist

### Immediate (Before July 1, 2026)

- [x] Update taxonomy.ts to reference 2026 blueprint
- [ ] Create OBBBA reference document with key provisions
- [ ] Update REG questions with sunset language
- [ ] Update TCP estate/gift planning questions
- [ ] Add new OBBBA deduction questions (tips, overtime, senior, auto)

### Short-term (Q2 2026)

- [ ] Complete REG section audit
- [ ] Complete TCP section audit
- [ ] Update TBS tax calculations
- [ ] Add ISC Data Analytics content

### Medium-term (Q3-Q4 2026)

- [ ] Complete FAR/AUD/BAR audits
- [ ] Add comprehensive OBBBA scenario questions
- [ ] Update all inflation-adjusted amounts for 2026

---

## Phase 5: Quality Assurance

### Verification Steps

1. **IRC Reference Check**
   - Verify all IRC section references are current
   - Note any sections modified by OBBBA

2. **Amount Verification**
   - All dollar thresholds should reflect 2025/2026 indexed amounts
   - Phase-out thresholds must be current

3. **Date Reference Check**
   - Remove "2018-2025" TCJA sunset references
   - Update planning horizon references

4. **Authoritative Source Verification**
   - ASC codification references current
   - AU-C references current (AICPA QM standards)
   - IRC references reflect OBBBA amendments

---

## Reference Materials

### OBBBA Key IRC Sections

| New/Modified Section | Description |
|---------------------|-------------|
| §62(a)(22) | Tips deduction (new) |
| §62(a)(23) | Overtime deduction (new) |
| §63(c) | Standard deduction amounts (modified) |
| §63(f) | Senior deduction (new) |
| §163(h)(2)(F) | Auto loan interest deduction (new) |
| §164(b)(6) | SALT cap increased to $40,000 |
| §2010(c) | Unified credit permanent |
| §151(d) | Personal exemption permanent elimination |

### Sources

- [IRS One Big Beautiful Bill Provisions](https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions)
- [AICPA H.R. 1 Tax Provision Summary](https://www.aicpa-cima.com/resources/download/h-r-1-the-one-big-beautiful-bill-act-tax-provision-summary-and-insights)
- [AICPA 2026 CPA Exam Blueprints](https://www.aicpa-cima.com/resources/download/learn-what-is-tested-on-the-cpa-exam)
- [Congress.gov H.R. 1](https://www.congress.gov/bill/119th-congress/house-bill/1)

---

## Timeline

| Date | Milestone |
|------|-----------|
| 2026-01-16 | Plan created, taxonomy updated, content verified current |
| 2026-03-01 | REG sunset language updated |
| 2026-04-01 | TCP estate/planning questions updated |
| 2026-05-01 | New OBBBA deduction questions added |
| 2026-06-15 | All content ready for July 1 testing window |
| 2026-07-01 | OBBBA provisions testable on CPA Exam |
| 2026-09-01 | Complete audit of all sections |

---

## Notes

- OBBBA provisions become testable on REG/TCP starting **July 1, 2026**
- Tips/Overtime/Senior/Auto deductions are temporary (2025-2028) - note in explanations
- Estate exemption is now PERMANENT - remove sunset language
- SALT $40K cap phases down to $10K after 2029
- QOZ deferral still ends December 31, 2026 (unchanged by OBBBA)

---

## Dual-Track Content Strategy - IMPLEMENTED

✅ **Implementation completed 2026-01-16**

### Infrastructure Created

1. **Database Migration** (`supabase/migrations/20260117_dual_track_content.sql`)
   - Added `tax_content_version` field to profiles ('tcja', 'obbba', 'auto')
   - Added `obbba_banner_dismissed_at` for notification tracking
   - Added `tax_content_version` to practice_attempts for analytics

2. **Tax Content Version Utility** (`src/lib/utils/tax-content-version.ts`)
   - `getEffectiveTaxContentVersion()` - determines version from preference + dates
   - `isTaxAffectedSection()` - checks if section is REG/TCP
   - `shouldShowOBBBABanner()` - banner display logic
   - `OBBBA_CUTOFF_DATE = '2026-07-01'`

3. **Settings Page** (`src/app/dashboard/settings/page.tsx`)
   - New "Tax Content Version" section with radio buttons
   - Options: Automatic (recommended), Pre-July 2026 (TCJA), Post-July 2026 (OBBBA)
   - Shows current effective version indicator
   - Badge: "Affects REG & TCP only"

4. **Dashboard Banner** (`src/components/dashboard/OBBBATransitionBanner.tsx`)
   - Dismissible amber banner explaining tax law changes
   - Link to settings to set preference
   - Shows during transition period (March-September 2026)
   - Integrated in `src/app/dashboard/page.tsx`

5. **Practice Quiz Page** (`src/app/dashboard/practice/[section]/page.tsx`)
   - Version indicator banner for REG/TCP sections
   - Shows current tax law version being used
   - Link to change in settings

6. **Question Loader** (`src/lib/data/practice-questions/index.ts`)
   - `versionedQuestionSets` - holds TCJA/OBBBA versions for REG/TCP
   - `getQuestionsBySectionVersioned()` - version-aware question loading
   - Currently both versions point to same content (OBBBA content to be created)

### How It Works

1. **User sets preference** in Settings → Tax Content Version
2. **Automatic mode** (default) determines version from:
   - Scheduled exam date (from NTS) - highest priority
   - Target completion date (from profile)
   - Current date (TCJA until July 1, 2026, then OBBBA)
3. **Practice quiz** shows version indicator for REG/TCP
4. **Questions** load based on effective version

### Content Versions

| Version | Rules | When Used |
|---------|-------|-----------|
| **TCJA** | 2024 tax amounts, $10K SALT, sunset language | Testing before July 1, 2026 |
| **OBBBA** | 2025+ amounts, $40K SALT, new deductions | Testing July 1, 2026 or later |

### Remaining Work

- [x] ~~Create OBBBA-specific question content for REG~~ ✅ COMPLETE (23 questions)
- [x] ~~Create OBBBA-specific question content for TCP~~ ✅ COMPLETE (23 questions)
- [x] ~~Update `versionedQuestionSets` to use separate OBBBA content~~ ✅ COMPLETE
- [x] ~~Create OBBBA questions for new deductions (tips, overtime, senior, auto)~~ ✅ COMPLETE
- [x] ~~Update TBS questions with dual-track support~~ ✅ COMPLETE (see section 3.3)
- [ ] Complete FAR/AUD/BAR/ISC 2026 Blueprint audits (Phase 2.3-2.6)

### 3.3 TBS Dual-Track Implementation ✅ COMPLETE (2026-01-16)

**Files Created:**
- `src/lib/data/tbs/reg-tbs-obbba.ts` - 6 OBBBA TBS for REG
- `src/lib/data/tbs/tcp-tbs-obbba.ts` - 6 OBBBA TBS for TCP

**Files Updated:**
- `src/lib/data/tbs/index.ts` - Added version-aware TBS loading
- `src/lib/data/tbs/types.ts` - Updated TBS types for CPA Evolution 2024

**OBBBA TBS Created:**

| Section | TBS | Topics Covered |
|---------|-----|----------------|
| REG | regItemizedDeductionsTBS_OBBBA | $40K SALT cap, $31.5K standard deduction |
| REG | regAMTCalculationTBS_OBBBA | AMT with OBBBA provisions |
| REG | regEstateTaxTBS_OBBBA | $14M permanent exemption |
| REG | regGiftTaxTBS_OBBBA | Permanent unified credit |
| REG | regTaxCreditsTBS_OBBBA | $2,200 child tax credit |
| REG | regOBBBANewDeductionsTBS | Tips/overtime/senior/auto deductions |
| TCP | tcpTaxPlanningIndividualTBS_OBBBA | New OBBBA planning strategies |
| TCP | tcpEstatePlanningTBS_OBBBA | Permanent exemption planning |
| TCP | tcpAMTPlanningTBS_OBBBA | AMT with higher SALT cap |
| TCP | tcpDepreciationPlanningTBS_OBBBA | Restored 100% bonus depreciation |
| TCP | tcpGiftSplittingTBS_OBBBA | Gift splitting with OBBBA |
| TCP | tcpServiceWorkerPlanningTBS_OBBBA | Tips/overtime deduction planning |

**CPA Evolution 2024 TBS Changes:**
- Standalone research simulations **ELIMINATED** from actual CPA Exam
- Written communication questions **ELIMINATED** from most sections
- Authoritative literature now appears as **exhibits** within simulations
- Legacy types retained in code for backward compatibility with existing content
