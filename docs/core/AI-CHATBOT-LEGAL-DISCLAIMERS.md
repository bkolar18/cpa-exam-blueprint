# AI Study Tutor - Legal Disclaimers & Policy Addendums

**Created:** January 2026
**Status:** DRAFT - Requires attorney review before implementation

> **IMPORTANT:** This document outlines all legal language required for the AI Study Tutor feature. Have a licensed attorney review and approve before publishing.

---

## Table of Contents

1. [In-App Disclaimers](#1-in-app-disclaimers)
2. [Terms of Service Addendum](#2-terms-of-service-addendum)
3. [Privacy Policy Addendum](#3-privacy-policy-addendum)
4. [API Provider Compliance](#4-api-provider-compliance)
5. [Implementation Checklist](#5-implementation-checklist)

---

## 1. In-App Disclaimers

These disclaimers should be displayed within the AI Study Tutor interface.

### 1.1 Initial Disclaimer (First Use)

Display once when user first accesses the AI Study Tutor:

```
AI Study Tutor Disclaimer

This AI-powered study assistant is designed to help you understand
CPA exam concepts. Please note:

- AI responses are for educational purposes only and may contain errors
- Always verify important information with authoritative sources
  (FASB, IRS, AICPA publications)
- This tool is NOT a substitute for comprehensive exam preparation
- Not affiliated with the AICPA, NASBA, or Prometric

The AI tutor cannot guarantee exam success. Your results depend on
your individual effort, preparation, and circumstances.

By using this feature, you acknowledge these limitations.

[I Understand] [Learn More]
```

### 1.2 Persistent Footer Disclaimer

Display at the bottom of the chat interface at all times:

```
AI responses are for educational purposes only and may contain errors.
Verify with authoritative sources. Not affiliated with AICPA/NASBA.
```

### 1.3 Practice Mode Disclaimer

Display when AI is in "hints only" mode during active practice:

```
Hint Mode: The tutor will guide you without revealing answers.
For full explanations, complete the question first.
```

### 1.4 Error/Uncertainty Disclaimer

The AI should include this when uncertain:

```
Note: This explanation reflects general principles. Tax laws and
accounting standards change frequently. Verify current rules with
authoritative sources for your exam date.
```

---

## 2. Terms of Service Addendum

Add the following section to DRAFT-TERMS-OF-SERVICE.md (replace existing Section 14.3):

### Section 14.3 - AI Study Tutor (Full Replacement)

```markdown
### 14.3 AI Study Tutor

The AI Study Tutor is an optional feature that uses artificial intelligence
to provide educational assistance during your CPA exam preparation. By using
this feature, you agree to the following:

#### 14.3.1 Nature of AI Responses

- AI-generated responses are for **educational purposes only**
- Responses may contain errors, inaccuracies, or outdated information
- The AI is NOT a licensed CPA, attorney, or financial advisor
- AI responses do NOT constitute professional accounting, tax, legal, or
  financial advice
- You should independently verify all information with authoritative sources
  including but not limited to: FASB Accounting Standards Codification, IRS
  publications, AICPA professional standards, and relevant state board
  regulations

#### 14.3.2 No Affiliation

The AI Study Tutor is NOT affiliated with, endorsed by, or officially
connected to:
- The American Institute of Certified Public Accountants (AICPA)
- The National Association of State Boards of Accountancy (NASBA)
- Prometric
- Any State Board of Accountancy
- Any official CPA examination body

#### 14.3.3 No Guarantee of Accuracy or Results

- We do NOT guarantee the accuracy, completeness, or currentness of AI
  responses
- AI assistance does NOT guarantee improved exam performance or passing scores
- Tax laws, accounting standards (GAAP, IFRS), and regulations change
  frequently; AI responses may not reflect the most current rules
- The AI may occasionally produce responses that sound plausible but are
  incorrect ("hallucinations")

#### 14.3.4 Usage Limitations

- Daily message limits may apply based on your subscription tier
- We reserve the right to modify, limit, suspend, or discontinue AI features
  at any time without prior notice
- Abuse of the AI feature (including but not limited to: attempts to extract
  training data, automated queries, sharing access, or using the feature for
  purposes other than personal CPA exam study) may result in feature
  suspension or account termination

#### 14.3.5 Data and Privacy

- Conversations with the AI Study Tutor may be logged for quality improvement
  and abuse prevention
- We may use anonymized conversation data to improve the service
- See our Privacy Policy for complete information on data handling
- Do NOT share sensitive personal information (SSN, financial account
  numbers, client data) with the AI tutor

#### 14.3.6 Third-Party AI Provider

The AI Study Tutor is powered by third-party artificial intelligence
technology (currently Anthropic's Claude). By using this feature, you
acknowledge that:
- Your queries are processed by third-party AI systems
- Third-party providers have their own terms of service and privacy policies
- We are not responsible for the availability or performance of third-party
  AI services

#### 14.3.7 Practice Mode vs. Review Mode

- **Practice Mode:** When enabled, the AI provides hints and guidance without
  revealing correct answers. This is designed to encourage active learning.
- **Review Mode:** After submitting answers, the AI can provide full
  explanations and walkthroughs.
- Mode availability may vary based on subscription tier and feature updates.

#### 14.3.8 Limitation of Liability for AI Features

TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR:
- Any errors, inaccuracies, or omissions in AI-generated content
- Any decisions made or actions taken based on AI responses
- Any exam results, scores, or outcomes influenced by AI assistance
- Any professional, financial, or legal consequences arising from reliance
  on AI responses
- Any damages arising from AI feature unavailability or discontinuation

YOUR USE OF THE AI STUDY TUTOR IS ENTIRELY AT YOUR OWN RISK.
```

---

## 3. Privacy Policy Addendum

Add the following sections to DRAFT-PRIVACY-POLICY.md:

### Section 1.1 Addition - AI Study Tutor Data

Add to "Information You Provide Directly":

```markdown
**AI Study Tutor Interactions:**
- Questions and messages you send to the AI tutor
- Context data sent with queries (current question, section, topic)
- Conversation history within sessions
- Feedback on AI responses (if provided)
```

### Section 2.1 Addition - AI Data Usage

Add to "Provide and Improve the Service":

```markdown
**AI Study Tutor:**
- Process your queries and generate educational responses
- Maintain conversation context within study sessions
- Analyze anonymized conversation patterns to improve AI responses
- Monitor for abuse and ensure appropriate usage
- Improve the quality and accuracy of AI-generated content
```

### Section 3.1 Addition - AI Service Provider

Add a new row to the Service Providers table:

```markdown
| Anthropic | AI response generation | Query text, conversation context |
```

### New Section - AI-Specific Data Practices

Add as Section 6.5 or similar:

```markdown
### AI Study Tutor Data Practices

**What We Collect:**
- Text of your queries to the AI tutor
- Contextual information (current question, topic, section)
- Session conversation history (limited to improve response quality)
- Response ratings and feedback (if you provide them)

**How Long We Keep It:**
- Active session data: Duration of your study session
- Conversation logs: 90 days (for quality improvement and abuse prevention)
- Anonymized/aggregated data: May be retained indefinitely for service
  improvement

**What We Share:**
- Query text is sent to our AI provider (Anthropic) for processing
- Anthropic's data handling is governed by their privacy policy:
  https://www.anthropic.com/privacy
- We do not sell or share your AI conversation data for advertising purposes

**Your Choices:**
- You may choose not to use the AI Study Tutor feature
- You may request deletion of your conversation history by contacting
  [privacy email]
- Note: Anonymized data used for service improvement may not be deletable

**Security:**
- AI queries are transmitted over encrypted connections (HTTPS)
- We implement rate limiting to prevent abuse
- Access to conversation logs is restricted to authorized personnel
```

---

## 4. API Provider Compliance

### 4.1 Anthropic Usage Policy Compliance

Our use of Claude for the AI Study Tutor complies with Anthropic's Acceptable Use Policy:

| Requirement | Our Compliance |
|-------------|----------------|
| Educational use | Primary purpose is CPA exam education |
| No harmful content | Restricted to accounting/exam topics |
| No impersonation | AI clearly identified as AI assistant |
| User consent | Users agree to terms before using |
| Data handling | Follows Anthropic's API terms |

### 4.2 Prohibited Uses (Enforce in Implementation)

The AI Study Tutor must NOT be used to:
- Generate content for actual client work
- Provide advice intended to be relied upon professionally
- Complete actual coursework or assignments for academic credit
- Circumvent exam security or integrity measures
- Generate harmful, illegal, or inappropriate content

Implementation should include content filtering and topic restriction to CPA exam-related queries.

---

## 5. Implementation Checklist

### 5.1 Before Launch

- [ ] Attorney review of all disclaimer language
- [ ] Update DRAFT-TERMS-OF-SERVICE.md with Section 14.3 replacement
- [ ] Update DRAFT-PRIVACY-POLICY.md with AI-specific sections
- [ ] Implement in-app disclaimer modal (first use)
- [ ] Add persistent footer disclaimer to chat UI
- [ ] Configure rate limiting (30 messages/day beta)
- [ ] Implement conversation logging with 90-day retention
- [ ] Set up content filtering for off-topic queries
- [ ] Add "AI-generated content" indicator on all responses
- [ ] Test disclaimer display on mobile and desktop

### 5.2 UI Elements Required

1. **First-Use Modal:** Blocking modal with disclaimer, requires acknowledgment
2. **Chat Footer:** Persistent small-text disclaimer
3. **Response Attribution:** Each AI response should indicate it's AI-generated
4. **Settings Toggle:** Allow users to enable/disable AI hints during practice
5. **Usage Indicator:** Show remaining daily messages (if limited)

### 5.3 Database Requirements

```sql
-- Track user acknowledgment of AI disclaimer
ALTER TABLE users ADD COLUMN ai_disclaimer_acknowledged_at TIMESTAMP;

-- Track daily usage for rate limiting
CREATE TABLE ai_tutor_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  message_count INTEGER DEFAULT 0,
  usage_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, usage_date)
);

-- Optional: Store conversation logs
CREATE TABLE ai_tutor_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  session_id UUID NOT NULL,
  role VARCHAR(20) NOT NULL, -- 'user' or 'assistant'
  content TEXT NOT NULL,
  context JSONB, -- question_id, section, topic, mode
  created_at TIMESTAMP DEFAULT NOW()
);

-- Auto-delete after 90 days (set up as cron job or Supabase function)
-- DELETE FROM ai_tutor_conversations WHERE created_at < NOW() - INTERVAL '90 days';
```

### 5.4 Consent Flow

```
User clicks "AI Study Tutor" button
         |
         v
Has user acknowledged disclaimer?
         |
    No --+-- Yes
    |         |
    v         v
Show disclaimer modal    Open AI chat
    |
    v
User clicks "I Understand"
    |
    v
Save acknowledgment timestamp
    |
    v
Open AI chat
```

---

## 6. Sample System Prompt (For Reference)

The AI should be instructed with appropriate limitations:

```
You are a CPA exam study tutor helping students prepare for the Uniform CPA
Examination. Your role is to explain accounting concepts, walk through
practice problems, and clarify misconceptions.

IMPORTANT LIMITATIONS:
- You provide educational guidance only, NOT professional advice
- You are NOT affiliated with the AICPA, NASBA, or any official body
- Tax laws and accounting standards change; encourage users to verify current
  rules
- If uncertain, acknowledge uncertainty and recommend authoritative sources
- Do NOT guarantee exam results or make promises about passing
- Stay on topic: CPA exam content only (FAR, AUD, REG, TCP, BAR, ISC)
- Do NOT help with actual client work, assignments, or anything outside exam
  preparation

If asked about topics outside CPA exam preparation, politely redirect to
exam-related content.

[MODE INSTRUCTIONS INSERTED HERE - Practice vs Review]
```

---

## 7. Revision History

| Date | Version | Changes |
|------|---------|---------|
| Jan 2026 | 1.0 | Initial draft |

---

## NOTES FOR ATTORNEY REVIEW

1. **Disclaimer Sufficiency:** Verify in-app disclaimers provide adequate legal protection
2. **Liability Caps:** Ensure AI-specific liability limitations are enforceable
3. **Third-Party Terms:** Review Anthropic's API terms for any conflicting obligations
4. **Data Retention:** Verify 90-day retention period complies with applicable laws
5. **International Users:** Consider GDPR implications for EU users (AI data processing)
6. **Accessibility:** Ensure disclaimer modals are accessible (screen readers, etc.)
7. **Age Verification:** Existing 18+ requirement should cover AI feature
8. **State-Specific Laws:** Review any state laws regarding AI-generated content disclosures
9. **FTC Guidelines:** Verify compliance with FTC guidelines on AI disclosure
10. **Professional Practice:** Confirm language adequately distinguishes from professional CPA advice
