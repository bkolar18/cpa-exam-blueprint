// AUD Task-Based Simulations
// Auditing and Attestation section TBS questions
// Topics aligned with AICPA Blueprint and taxonomy.ts

import { TBSQuestion } from "./types";

// =============================================================================
// AUDIT REPORTS - High Priority Topic
// =============================================================================

export const audReportModificationsTBS: TBSQuestion = {
  id: "tbs-aud-012",
  section: "AUD",
  tbsType: "document_review",
  topic: "Audit Reports",
  subtopic: "Report Modifications",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-IV",
  title: "Audit Report Modifications",
  scenarioText: `You are reviewing draft audit reports prepared by staff auditors for three different clients. Each report may contain errors that need correction.

Required: Review each report excerpt and identify any necessary modifications.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-report-1",
      order: 1,
      title: "Client A - Report Excerpt",
      type: "memo",
      content: {
        type: "memo",
        from: "Staff Auditor",
        to: "Audit Manager",
        date: "Current Date",
        subject: "Draft Report - Client A",
        body: `Opinion paragraph from draft report:

"In our opinion, except for the effects of the matter described in the Basis for Qualified Opinion section, the financial statements present fairly, in all material respects, the financial position of Client A as of December 31, Year 1..."

Note: The matter relates to a departure from GAAP where the client refuses to capitalize a material finance lease, instead expensing all payments. The effect is quantified and pervasive to the financial statements.`,
      },
    },
    {
      id: "exhibit-report-2",
      order: 2,
      title: "Client B - Report Excerpt",
      type: "memo",
      content: {
        type: "memo",
        from: "Staff Auditor",
        to: "Audit Manager",
        date: "Current Date",
        subject: "Draft Report - Client B",
        body: `Report includes an Emphasis of Matter paragraph:

"As discussed in Note 12 to the financial statements, the Company is a defendant in a lawsuit alleging patent infringement. The ultimate outcome of this matter cannot presently be determined, and no provision for any liability that may result has been made in the financial statements."

Note: The potential liability is material but cannot be reasonably estimated. Disclosure in the notes is considered adequate.`,
      },
    },
    {
      id: "exhibit-report-3",
      order: 3,
      title: "Client C - Report Excerpt",
      type: "memo",
      content: {
        type: "memo",
        from: "Staff Auditor",
        to: "Audit Manager",
        date: "Current Date",
        subject: "Draft Report - Client C",
        body: `The draft report is an unmodified opinion with the following paragraph added after the opinion:

"Other Matter - Supplementary Information
The supplementary information on pages 25-30 is presented for purposes of additional analysis and is not a required part of the basic financial statements. Such information is the responsibility of management. We have not audited or reviewed this information and express no opinion on it."

Note: The supplementary information was subjected to audit procedures applied in the audit of the basic financial statements.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-client-a-opinion",
      order: 1,
      type: "dropdown",
      label: "Client A - Appropriate opinion type",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-adverse",
      },
      explanation: "When a GAAP departure is both material AND pervasive, an adverse opinion is required, not qualified",
      dropdownOptions: [
        { id: "opt-qualified", order: 1, text: "Qualified opinion (as drafted)", isCorrect: false },
        { id: "opt-adverse", order: 2, text: "Adverse opinion", isCorrect: true },
        { id: "opt-disclaimer", order: 3, text: "Disclaimer of opinion", isCorrect: false },
        { id: "opt-unmodified", order: 4, text: "Unmodified opinion", isCorrect: false },
      ],
    },
    {
      id: "req-client-a-reason",
      order: 2,
      type: "dropdown",
      label: "Client A - Reason for opinion modification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-pervasive",
      },
      explanation: "The effect is described as pervasive, which requires an adverse rather than qualified opinion",
      dropdownOptions: [
        { id: "opt-material", order: 1, text: "Material but not pervasive", isCorrect: false },
        { id: "opt-pervasive", order: 2, text: "Material and pervasive", isCorrect: true },
        { id: "opt-scope", order: 3, text: "Scope limitation", isCorrect: false },
        { id: "opt-uncertainty", order: 4, text: "Uncertainty", isCorrect: false },
      ],
    },
    {
      id: "req-client-b-treatment",
      order: 3,
      type: "dropdown",
      label: "Client B - Is the Emphasis of Matter paragraph appropriate?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-appropriate",
      },
      explanation: "An EOM paragraph is appropriate for significant uncertainties when disclosure is adequate and no modification is needed",
      dropdownOptions: [
        { id: "opt-appropriate", order: 1, text: "Yes, EOM is appropriate as drafted", isCorrect: true },
        { id: "opt-qualified", order: 2, text: "No, should be qualified opinion", isCorrect: false },
        { id: "opt-remove", order: 3, text: "No, should remove the paragraph entirely", isCorrect: false },
        { id: "opt-disclaimer", order: 4, text: "No, should disclaim opinion", isCorrect: false },
      ],
    },
    {
      id: "req-client-b-opinion",
      order: 4,
      type: "dropdown",
      label: "Client B - Opinion type",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-unmod-eom",
      },
      explanation: "With adequate disclosure of a contingency, an unmodified opinion with EOM paragraph is appropriate",
      dropdownOptions: [
        { id: "opt-unmod-eom", order: 1, text: "Unmodified with EOM paragraph", isCorrect: true },
        { id: "opt-qualified-eom", order: 2, text: "Qualified with EOM paragraph", isCorrect: false },
        { id: "opt-unmod-no-eom", order: 3, text: "Unmodified without EOM paragraph", isCorrect: false },
        { id: "opt-adverse", order: 4, text: "Adverse opinion", isCorrect: false },
      ],
    },
    {
      id: "req-client-c-error",
      order: 5,
      type: "dropdown",
      label: "Client C - Error in supplementary information paragraph",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-audited-procedures",
      },
      explanation: "If the supplementary info was subjected to audit procedures, the report should say it was audited and give an opinion",
      dropdownOptions: [
        { id: "opt-no-error", order: 1, text: "No error - paragraph is appropriate", isCorrect: false },
        { id: "opt-audited-procedures", order: 2, text: "Should state it was audited and provide opinion", isCorrect: true },
        { id: "opt-remove-para", order: 3, text: "Should remove paragraph entirely", isCorrect: false },
        { id: "opt-change-location", order: 4, text: "Should move before opinion paragraph", isCorrect: false },
      ],
    },
    {
      id: "req-client-c-correction",
      order: 6,
      type: "dropdown",
      label: "Client C - Correct language for audited supplementary info",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fairly-stated",
      },
      explanation: "When supplementary information is audited, the auditor should state whether it is fairly stated in relation to the financial statements as a whole",
      dropdownOptions: [
        { id: "opt-presents-fairly", order: 1, text: "Presents fairly in all material respects", isCorrect: false },
        { id: "opt-fairly-stated", order: 2, text: "Fairly stated in all material respects in relation to the financial statements as a whole", isCorrect: true },
        { id: "opt-no-exceptions", order: 3, text: "No exceptions noted", isCorrect: false },
        { id: "opt-consistent", order: 4, text: "Consistent with financial statements", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// SAMPLING - High Priority Topic
// =============================================================================

export const audAttributeSamplingTBS: TBSQuestion = {
  id: "tbs-aud-013",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Audit Sampling",
  subtopic: "Attributes Sampling",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Attributes Sampling for Tests of Controls",
  scenarioText: `You are planning an attributes sampling application to test the operating effectiveness of a control over credit approval. Management asserts that proper credit approval is obtained for all sales over $5,000.

Planning parameters:
• Risk of overreliance (assessing control risk too low): 5%
• Tolerable deviation rate: 7%
• Expected population deviation rate: 2%
• Population size: 2,500 transactions

Required: Determine the sample size and evaluate the results.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-sample-table",
      order: 1,
      title: "Sample Size Table (5% Risk of Overreliance)",
      type: "table",
      content: {
        type: "table",
        title: "Attributes Sampling - Sample Sizes",
        headers: ["Expected Deviation Rate", "Tolerable Deviation Rate 5%", "6%", "7%", "8%", "10%"],
        rows: [
          { cells: ["0.00%", "59", "49", "42", "36", "29"] },
          { cells: ["0.50%", "117", "78", "66", "51", "38"] },
          { cells: ["1.00%", "156", "117", "93", "77", "51"] },
          { cells: ["2.00%", "*", "181", "124", "98", "66"] },
          { cells: ["3.00%", "*", "*", "166", "121", "88"] },
          { cells: ["4.00%", "*", "*", "*", "146", "98"] },
        ],
        footnotes: ["* Sample size too large to be practical"],
      },
    },
    {
      id: "exhibit-evaluation-table",
      order: 2,
      title: "Sample Results Evaluation Table",
      type: "table",
      content: {
        type: "table",
        title: "Upper Deviation Limit Table (5% Risk)",
        headers: ["Sample Size", "0 Deviations", "1 Deviation", "2 Deviations", "3 Deviations", "4 Deviations"],
        rows: [
          { cells: ["100", "3.0%", "4.7%", "6.2%", "7.6%", "8.9%"] },
          { cells: ["120", "2.5%", "4.0%", "5.2%", "6.4%", "7.5%"] },
          { cells: ["124", "2.4%", "3.8%", "5.0%", "6.2%", "7.3%"] },
          { cells: ["150", "2.0%", "3.2%", "4.2%", "5.2%", "6.1%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-sample-size",
      order: 1,
      type: "numeric",
      label: "Required sample size",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 124,
        tolerance: 0,
      },
      explanation: "From table: 5% risk, 7% tolerable rate, 2% expected rate = 124 items",
    },
    {
      id: "req-max-deviations",
      order: 2,
      type: "numeric",
      label: "Maximum number of deviations to support control reliance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3,
        tolerance: 0,
      },
      explanation: "From evaluation table at sample size 124: 3 deviations yields 6.2% upper limit, which is below 7% tolerable rate",
    },
    {
      id: "req-scenario-2-deviations",
      order: 3,
      type: "dropdown",
      label: "If 2 deviations are found, can you rely on the control?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-rely",
      },
      explanation: "2 deviations at sample size 124 = 5.0% upper limit, which is below 7% tolerable rate",
      dropdownOptions: [
        { id: "opt-yes-rely", order: 1, text: "Yes - upper deviation limit is below tolerable rate", isCorrect: true },
        { id: "opt-no-exceed", order: 2, text: "No - upper deviation limit exceeds tolerable rate", isCorrect: false },
        { id: "opt-expand", order: 3, text: "Need to expand sample size", isCorrect: false },
      ],
    },
    {
      id: "req-scenario-4-deviations",
      order: 4,
      type: "dropdown",
      label: "If 4 deviations are found, what is the conclusion?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cannot-rely",
      },
      explanation: "4 deviations at sample size 124 = 7.3% upper limit, which exceeds 7% tolerable rate",
      dropdownOptions: [
        { id: "opt-can-rely", order: 1, text: "Can rely on the control", isCorrect: false },
        { id: "opt-cannot-rely", order: 2, text: "Cannot rely on the control", isCorrect: true },
        { id: "opt-retest", order: 3, text: "Need to retest at different date", isCorrect: false },
      ],
    },
    {
      id: "req-actual-deviation-rate",
      order: 5,
      type: "numeric",
      label: "Sample deviation rate if 3 deviations found (as percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2.4,
        tolerance: 0.1,
      },
      explanation: "Sample deviation rate = 3 / 124 = 2.4%",
    },
  ],
};

export const audVariablesSamplingTBS: TBSQuestion = {
  id: "tbs-aud-014",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Audit Sampling",
  subtopic: "Variables Sampling",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "AUD-III",
  title: "Mean-Per-Unit Estimation",
  scenarioText: `You are using mean-per-unit estimation to estimate the total value of accounts receivable. The following information is available:

Population information:
• Total population items: 4,000 accounts
• Book value of population: $2,800,000

Sample results:
• Sample size: 100 accounts
• Sum of sample audited values: $68,500
• Standard deviation of sample: $150
• Reliability factor for 95% confidence: 1.96

Required: Calculate the point estimate and precision, and evaluate the results.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-mpu-formulas",
      order: 1,
      title: "MPU Estimation Formulas",
      type: "text",
      content: {
        type: "text",
        title: "Mean-Per-Unit Estimation",
        paragraphs: [
          "Point Estimate = Sample Mean × Population Size",
          "Standard Error = (Standard Deviation / √Sample Size) × √(1 - n/N)",
          "Precision = Reliability Factor × Standard Error × Population Size",
          "Confidence Interval = Point Estimate ± Precision",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-sample-mean",
      order: 1,
      type: "numeric",
      label: "Sample mean (average audited value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 685,
        tolerance: 1,
      },
      explanation: "Sample mean = $68,500 / 100 = $685",
    },
    {
      id: "req-point-estimate",
      order: 2,
      type: "numeric",
      label: "Point estimate of population value",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2740000,
        tolerance: 1000,
      },
      explanation: "Point estimate = $685 × 4,000 = $2,740,000",
    },
    {
      id: "req-standard-error",
      order: 3,
      type: "numeric",
      label: "Standard error of the mean",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 14.85,
        tolerance: 0.5,
      },
      explanation: "SE = ($150 / √100) × √(1 - 100/4000) = $15 × 0.99 = $14.85",
    },
    {
      id: "req-precision",
      order: 4,
      type: "numeric",
      label: "Precision (allowance for sampling risk)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 116424,
        tolerance: 5000,
      },
      explanation: "Precision = 1.96 × $14.85 × 4,000 = $116,424",
    },
    {
      id: "req-lower-limit",
      order: 5,
      type: "numeric",
      label: "Lower confidence limit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2623576,
        tolerance: 5000,
      },
      explanation: "Lower limit = $2,740,000 - $116,424 = $2,623,576",
    },
    {
      id: "req-conclusion",
      order: 6,
      type: "dropdown",
      label: "Is the book value ($2,800,000) supported by the sample?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-within-range",
      },
      explanation: "Book value of $2,800,000 falls within the confidence interval ($2,623,576 to $2,856,424)",
      dropdownOptions: [
        { id: "opt-within-range", order: 1, text: "Yes - book value is within the confidence interval", isCorrect: true },
        { id: "opt-above-range", order: 2, text: "No - book value exceeds the upper limit", isCorrect: false },
        { id: "opt-below-range", order: 3, text: "No - book value is below the lower limit", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// INTERNAL CONTROLS - High Priority Topic
// =============================================================================

export const audControlDeficiencyTBS: TBSQuestion = {
  id: "tbs-aud-015",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Internal Controls",
  subtopic: "Control Deficiency Evaluation",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-II",
  title: "Classification of Control Deficiencies",
  scenarioText: `During an integrated audit of Granite Manufacturing, you identified the following control deficiencies. Evaluate each deficiency and classify it appropriately.

Required: Determine whether each deficiency is a control deficiency, significant deficiency, or material weakness.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-deficiency-definitions",
      order: 1,
      title: "Deficiency Classifications",
      type: "text",
      content: {
        type: "text",
        title: "PCAOB/AICPA Definitions",
        paragraphs: [
          "Control Deficiency: A deficiency exists when the design or operation of a control does not allow management or employees to prevent or detect misstatements on a timely basis.",
          "Significant Deficiency: A deficiency, or combination of deficiencies, that is less severe than a material weakness yet important enough to merit attention by those responsible for oversight.",
          "Material Weakness: A deficiency, or combination of deficiencies, such that there is a reasonable possibility that a material misstatement will not be prevented or detected on a timely basis.",
        ],
      },
    },
    {
      id: "exhibit-deficiencies",
      order: 2,
      title: "Identified Deficiencies",
      type: "table",
      content: {
        type: "table",
        title: "Control Deficiencies Identified",
        headers: ["#", "Description"],
        rows: [
          { cells: ["1", "The accounts payable supervisor can both approve invoices for payment and also sign checks. No compensating controls exist. Last year, this resulted in $50,000 of fictitious payments (0.5% of revenue, materiality is $200,000)."] },
          { cells: ["2", "The company's IT general controls over program changes are inadequate. While no misstatements were identified this year, the auditor cannot rely on automated controls."] },
          { cells: ["3", "Bank reconciliations are prepared but not reviewed by someone independent. No errors were noted in the reconciliations tested."] },
          { cells: ["4", "The CFO overrode month-end cutoff procedures to record a $500,000 sale (5% of revenue) before goods were shipped. Materiality is $200,000."] },
          { cells: ["5", "One employee who reconciles inventory records also has access to the warehouse. Physical inventory counts are performed annually by an independent team."] },
          { cells: ["6", "The company failed to identify a new GAAP pronouncement that significantly affects lease accounting, resulting in $800,000 understatement of liabilities (materiality is $200,000)."] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-deficiency-1",
      order: 1,
      type: "dropdown",
      label: "Deficiency 1 - AP supervisor segregation issue",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-sd-1",
      },
      explanation: "While this represents poor segregation of duties, the actual misstatement ($50,000) was below materiality. It's a significant deficiency given the lack of compensating controls.",
      dropdownOptions: [
        { id: "opt-cd-1", order: 1, text: "Control deficiency", isCorrect: false },
        { id: "opt-sd-1", order: 2, text: "Significant deficiency", isCorrect: true },
        { id: "opt-mw-1", order: 3, text: "Material weakness", isCorrect: false },
      ],
    },
    {
      id: "req-deficiency-2",
      order: 2,
      type: "dropdown",
      label: "Deficiency 2 - IT general controls over changes",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-mw-2",
      },
      explanation: "Inability to rely on ITGCs affects the ability to rely on all automated controls, representing pervasive risk - typically a material weakness",
      dropdownOptions: [
        { id: "opt-cd-2", order: 1, text: "Control deficiency", isCorrect: false },
        { id: "opt-sd-2", order: 2, text: "Significant deficiency", isCorrect: false },
        { id: "opt-mw-2", order: 3, text: "Material weakness", isCorrect: true },
      ],
    },
    {
      id: "req-deficiency-3",
      order: 3,
      type: "dropdown",
      label: "Deficiency 3 - Bank reconciliation review",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cd-3",
      },
      explanation: "While lack of independent review is a deficiency, no errors were noted. This is a control deficiency but not significant given no actual issues.",
      dropdownOptions: [
        { id: "opt-cd-3", order: 1, text: "Control deficiency", isCorrect: true },
        { id: "opt-sd-3", order: 2, text: "Significant deficiency", isCorrect: false },
        { id: "opt-mw-3", order: 3, text: "Material weakness", isCorrect: false },
      ],
    },
    {
      id: "req-deficiency-4",
      order: 4,
      type: "dropdown",
      label: "Deficiency 4 - CFO override of cutoff controls",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-mw-4",
      },
      explanation: "Management override that resulted in a material misstatement ($500,000 exceeds $200,000 materiality) is a material weakness",
      dropdownOptions: [
        { id: "opt-cd-4", order: 1, text: "Control deficiency", isCorrect: false },
        { id: "opt-sd-4", order: 2, text: "Significant deficiency", isCorrect: false },
        { id: "opt-mw-4", order: 3, text: "Material weakness", isCorrect: true },
      ],
    },
    {
      id: "req-deficiency-5",
      order: 5,
      type: "dropdown",
      label: "Deficiency 5 - Inventory segregation issue",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cd-5",
      },
      explanation: "The annual physical count by an independent team is a compensating control that mitigates the segregation issue - control deficiency only",
      dropdownOptions: [
        { id: "opt-cd-5", order: 1, text: "Control deficiency", isCorrect: true },
        { id: "opt-sd-5", order: 2, text: "Significant deficiency", isCorrect: false },
        { id: "opt-mw-5", order: 3, text: "Material weakness", isCorrect: false },
      ],
    },
    {
      id: "req-deficiency-6",
      order: 6,
      type: "dropdown",
      label: "Deficiency 6 - GAAP pronouncement identification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-mw-6",
      },
      explanation: "Failure to identify a GAAP pronouncement resulting in a material misstatement ($800,000 exceeds materiality) is a material weakness",
      dropdownOptions: [
        { id: "opt-cd-6", order: 1, text: "Control deficiency", isCorrect: false },
        { id: "opt-sd-6", order: 2, text: "Significant deficiency", isCorrect: false },
        { id: "opt-mw-6", order: 3, text: "Material weakness", isCorrect: true },
      ],
    },
  ],
};

// =============================================================================
// RISK ASSESSMENT - High Priority Topic
// =============================================================================

export const audRiskAssessmentTBS: TBSQuestion = {
  id: "tbs-aud-016",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Risk Assessment",
  subtopic: "Audit Risk Model",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-II",
  title: "Audit Risk Model Application",
  scenarioText: `You are planning the audit of Highland Corporation and need to determine the appropriate level of detection risk for various account areas. The firm's policy is to set overall audit risk at 5%.

For each account area below, assess the inherent risk and control risk based on the circumstances provided, then calculate the required detection risk.

Area 1 - Cash:
• Simple transactions, low volume
• Strong controls, tested and effective
• Low susceptibility to fraud

Area 2 - Revenue:
• Complex contracts with multiple performance obligations
• Controls have not been tested (new system)
• High susceptibility to fraud per auditing standards

Area 3 - Inventory:
• Moderate complexity
• Moderate control effectiveness (some issues noted last year)
• Moderate fraud risk

Required: Calculate the detection risk for each area.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-risk-model",
      order: 1,
      title: "Audit Risk Model",
      type: "text",
      content: {
        type: "text",
        title: "Risk Assessment Formulas",
        paragraphs: [
          "Audit Risk (AR) = Inherent Risk (IR) × Control Risk (CR) × Detection Risk (DR)",
          "Detection Risk = Audit Risk / (Inherent Risk × Control Risk)",
          "Risk levels typically assessed as: Low = 20%, Moderate = 50%, High = 100%",
          "Lower detection risk = more substantive testing required",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cash-ir",
      order: 1,
      type: "dropdown",
      label: "Cash - Inherent Risk assessment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-low-ir",
      },
      explanation: "Simple transactions, low volume, low fraud susceptibility = Low inherent risk",
      dropdownOptions: [
        { id: "opt-low-ir", order: 1, text: "Low (20%)", isCorrect: true },
        { id: "opt-mod-ir", order: 2, text: "Moderate (50%)", isCorrect: false },
        { id: "opt-high-ir", order: 3, text: "High (100%)", isCorrect: false },
      ],
    },
    {
      id: "req-cash-dr",
      order: 2,
      type: "numeric",
      label: "Cash - Detection Risk (as percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 125,
        tolerance: 5,
      },
      explanation: "DR = 5% / (20% × 20%) = 5% / 4% = 125%. Since DR > 100%, minimal testing needed.",
    },
    {
      id: "req-revenue-ir",
      order: 3,
      type: "dropdown",
      label: "Revenue - Inherent Risk assessment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-high-ir-rev",
      },
      explanation: "Complex contracts, high fraud susceptibility = High inherent risk",
      dropdownOptions: [
        { id: "opt-low-ir-rev", order: 1, text: "Low (20%)", isCorrect: false },
        { id: "opt-mod-ir-rev", order: 2, text: "Moderate (50%)", isCorrect: false },
        { id: "opt-high-ir-rev", order: 3, text: "High (100%)", isCorrect: true },
      ],
    },
    {
      id: "req-revenue-dr",
      order: 4,
      type: "numeric",
      label: "Revenue - Detection Risk (as percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5,
        tolerance: 0,
      },
      explanation: "DR = 5% / (100% × 100%) = 5%. Very low detection risk = extensive testing required.",
    },
    {
      id: "req-inventory-dr",
      order: 5,
      type: "numeric",
      label: "Inventory - Detection Risk if IR=50%, CR=50% (as percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 20,
        tolerance: 0,
      },
      explanation: "DR = 5% / (50% × 50%) = 5% / 25% = 20%",
    },
    {
      id: "req-most-testing",
      order: 6,
      type: "dropdown",
      label: "Which area requires the MOST substantive testing?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-revenue-most",
      },
      explanation: "Revenue has the lowest detection risk (5%), requiring the most substantive testing",
      dropdownOptions: [
        { id: "opt-cash-most", order: 1, text: "Cash", isCorrect: false },
        { id: "opt-revenue-most", order: 2, text: "Revenue", isCorrect: true },
        { id: "opt-inventory-most", order: 3, text: "Inventory", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// SUBSEQUENT EVENTS - High Priority Topic
// =============================================================================

export const audSubsequentEventsTBS: TBSQuestion = {
  id: "tbs-aud-017",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Subsequent Events",
  subtopic: "Type I and Type II Events",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-IV",
  title: "Subsequent Events Classification and Treatment",
  scenarioText: `The audit of Lakewood Industries for the year ended December 31, Year 1 is being completed on March 15, Year 2. The financial statements have not yet been issued. Classify each subsequent event and determine the appropriate treatment.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-events",
      order: 1,
      title: "Subsequent Events Identified",
      type: "table",
      content: {
        type: "table",
        title: "Events Occurring After Year-End",
        headers: ["Event", "Description"],
        rows: [
          { cells: ["A", "On February 10, Year 2, a major customer filed for bankruptcy. The customer owed $500,000 at December 31, Year 1. Collection is now doubtful."] },
          { cells: ["B", "On January 25, Year 2, a fire destroyed a warehouse. The loss is estimated at $2 million, partially covered by insurance."] },
          { cells: ["C", "On February 28, Year 2, the company settled a lawsuit that was pending at December 31, Year 1 for $800,000. The company had estimated the liability at $600,000."] },
          { cells: ["D", "On March 5, Year 2, the company announced a major acquisition of a competitor for $15 million."] },
          { cells: ["E", "In January Year 2, management discovered that revenue had been overstated in Year 1 due to cutoff errors totaling $300,000."] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-event-a-type",
      order: 1,
      type: "dropdown",
      label: "Event A (Customer bankruptcy) - Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-type1-a",
      },
      explanation: "The receivable existed at year-end; the bankruptcy provides evidence about conditions that existed at year-end (collectibility) - Type I",
      dropdownOptions: [
        { id: "opt-type1-a", order: 1, text: "Type I - Recognized event (adjust F/S)", isCorrect: true },
        { id: "opt-type2-a", order: 2, text: "Type II - Nonrecognized event (disclose only)", isCorrect: false },
        { id: "opt-neither-a", order: 3, text: "Neither - no action required", isCorrect: false },
      ],
    },
    {
      id: "req-event-b-type",
      order: 2,
      type: "dropdown",
      label: "Event B (Fire in January) - Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-type2-b",
      },
      explanation: "The fire occurred after year-end and doesn't relate to conditions at year-end - Type II requiring disclosure",
      dropdownOptions: [
        { id: "opt-type1-b", order: 1, text: "Type I - Recognized event (adjust F/S)", isCorrect: false },
        { id: "opt-type2-b", order: 2, text: "Type II - Nonrecognized event (disclose only)", isCorrect: true },
        { id: "opt-neither-b", order: 3, text: "Neither - no action required", isCorrect: false },
      ],
    },
    {
      id: "req-event-c-type",
      order: 3,
      type: "dropdown",
      label: "Event C (Lawsuit settlement) - Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-type1-c",
      },
      explanation: "Settlement provides evidence about the amount of liability that existed at year-end - Type I adjustment needed",
      dropdownOptions: [
        { id: "opt-type1-c", order: 1, text: "Type I - Recognized event (adjust F/S)", isCorrect: true },
        { id: "opt-type2-c", order: 2, text: "Type II - Nonrecognized event (disclose only)", isCorrect: false },
        { id: "opt-neither-c", order: 3, text: "Neither - no action required", isCorrect: false },
      ],
    },
    {
      id: "req-event-c-adj",
      order: 4,
      type: "numeric",
      label: "Event C - Amount of adjustment required",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 200000,
        tolerance: 0,
      },
      explanation: "Adjustment = Settlement $800,000 - Accrued $600,000 = $200,000 additional expense/liability",
    },
    {
      id: "req-event-d-type",
      order: 5,
      type: "dropdown",
      label: "Event D (Acquisition announcement) - Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-type2-d",
      },
      explanation: "New transaction occurring after year-end - Type II requiring disclosure if material",
      dropdownOptions: [
        { id: "opt-type1-d", order: 1, text: "Type I - Recognized event (adjust F/S)", isCorrect: false },
        { id: "opt-type2-d", order: 2, text: "Type II - Nonrecognized event (disclose only)", isCorrect: true },
        { id: "opt-neither-d", order: 3, text: "Neither - no action required", isCorrect: false },
      ],
    },
    {
      id: "req-event-e-type",
      order: 6,
      type: "dropdown",
      label: "Event E (Error discovery) - Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-type1-e",
      },
      explanation: "Discovery of an error in the financial statements requires adjustment - Type I",
      dropdownOptions: [
        { id: "opt-type1-e", order: 1, text: "Type I - Recognized event (adjust F/S)", isCorrect: true },
        { id: "opt-type2-e", order: 2, text: "Type II - Nonrecognized event (disclose only)", isCorrect: false },
        { id: "opt-neither-e", order: 3, text: "Neither - no action required", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// ETHICS AND INDEPENDENCE - High Priority Topic
// =============================================================================

export const audIndependenceEvaluationTBS: TBSQuestion = {
  id: "tbs-aud-018",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Professional Ethics",
  subtopic: "Independence Requirements",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-I",
  title: "Independence Threat Evaluation",
  scenarioText: `Your firm is the auditor of Tech Solutions Inc., a publicly traded company. Evaluate each situation and determine if independence is impaired.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-situations",
      order: 1,
      title: "Independence Situations",
      type: "table",
      content: {
        type: "table",
        title: "Situations to Evaluate",
        headers: ["#", "Situation"],
        rows: [
          { cells: ["1", "The audit partner's spouse owns 100 shares of Tech Solutions stock (valued at $2,500). The partner has no influence over the investment decisions."] },
          { cells: ["2", "An audit senior's brother is the IT director at Tech Solutions. The senior works on the audit but does not audit IT-related accounts."] },
          { cells: ["3", "The firm provided tax return preparation services to Tech Solutions. The firm made no management decisions and the fee was $25,000 (audit fee is $500,000)."] },
          { cells: ["4", "The audit manager has accepted a position as CFO of Tech Solutions, starting after the current audit is completed and the report is issued."] },
          { cells: ["5", "The firm's pension plan holds shares of Tech Solutions as part of a diversified mutual fund. The fund's holdings in Tech Solutions represent 0.1% of the fund."] },
          { cells: ["6", "A tax partner's daughter works as an accounting clerk at Tech Solutions. The daughter has no influence over financial reporting."] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-situation-1",
      order: 1,
      type: "dropdown",
      label: "Situation 1 - Partner's spouse stock ownership",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-impaired-1",
      },
      explanation: "Covered member (includes spouse) direct financial interest impairs independence regardless of amount",
      dropdownOptions: [
        { id: "opt-impaired-1", order: 1, text: "Independence is impaired", isCorrect: true },
        { id: "opt-not-impaired-1", order: 2, text: "Independence is not impaired", isCorrect: false },
        { id: "opt-safeguards-1", order: 3, text: "Impaired unless safeguards applied", isCorrect: false },
      ],
    },
    {
      id: "req-situation-2",
      order: 2,
      type: "dropdown",
      label: "Situation 2 - Audit senior's brother is IT director",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-impaired-2",
      },
      explanation: "IT director is a key position; close relative in key position impairs independence",
      dropdownOptions: [
        { id: "opt-impaired-2", order: 1, text: "Independence is impaired", isCorrect: true },
        { id: "opt-not-impaired-2", order: 2, text: "Independence is not impaired", isCorrect: false },
        { id: "opt-remove-2", order: 3, text: "Not impaired if senior is removed from IT areas", isCorrect: false },
      ],
    },
    {
      id: "req-situation-3",
      order: 3,
      type: "dropdown",
      label: "Situation 3 - Tax preparation services",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-not-impaired-3",
      },
      explanation: "Tax preparation is permitted for audit clients if no management decisions are made and preapproved by audit committee",
      dropdownOptions: [
        { id: "opt-impaired-3", order: 1, text: "Independence is impaired", isCorrect: false },
        { id: "opt-not-impaired-3", order: 2, text: "Independence is not impaired", isCorrect: true },
        { id: "opt-fee-limit-3", order: 3, text: "Impaired - fee exceeds limit", isCorrect: false },
      ],
    },
    {
      id: "req-situation-4",
      order: 4,
      type: "dropdown",
      label: "Situation 4 - Manager accepting CFO position",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-impaired-4",
      },
      explanation: "Employment negotiations with an audit client impair independence; must be removed from engagement",
      dropdownOptions: [
        { id: "opt-impaired-4", order: 1, text: "Independence is impaired", isCorrect: true },
        { id: "opt-not-impaired-4", order: 2, text: "Independence is not impaired - starts after report issued", isCorrect: false },
        { id: "opt-cooling-4", order: 3, text: "Not impaired if cooling-off period observed", isCorrect: false },
      ],
    },
    {
      id: "req-situation-5",
      order: 5,
      type: "dropdown",
      label: "Situation 5 - Firm pension plan mutual fund holdings",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-not-impaired-5",
      },
      explanation: "Diversified mutual fund holdings under 5% of fund or firm's net worth do not impair independence",
      dropdownOptions: [
        { id: "opt-impaired-5", order: 1, text: "Independence is impaired", isCorrect: false },
        { id: "opt-not-impaired-5", order: 2, text: "Independence is not impaired", isCorrect: true },
        { id: "opt-divest-5", order: 3, text: "Impaired unless divested immediately", isCorrect: false },
      ],
    },
    {
      id: "req-situation-6",
      order: 6,
      type: "dropdown",
      label: "Situation 6 - Tax partner's daughter as accounting clerk",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-not-impaired-6",
      },
      explanation: "Tax partner is not on audit engagement; daughter in non-key position does not impair independence",
      dropdownOptions: [
        { id: "opt-impaired-6", order: 1, text: "Independence is impaired", isCorrect: false },
        { id: "opt-not-impaired-6", order: 2, text: "Independence is not impaired", isCorrect: true },
        { id: "opt-evaluate-6", order: 3, text: "Depends on daughter's specific duties", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// AUDIT EVIDENCE - High Priority Topic
// =============================================================================

export const audEvidenceEvaluationTBS: TBSQuestion = {
  id: "tbs-aud-019",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Audit Evidence",
  subtopic: "Evidence Evaluation",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "AUD-III",
  title: "Audit Evidence Sufficiency and Appropriateness",
  scenarioText: `For each audit procedure described, evaluate the nature and quality of evidence obtained and its appropriateness for the stated assertion.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-procedures",
      order: 1,
      title: "Audit Procedures Performed",
      type: "table",
      content: {
        type: "table",
        title: "Evidence Gathered",
        headers: ["Procedure", "Assertion Being Tested"],
        rows: [
          { cells: ["1. Obtained bank confirmation directly from the bank confirming the cash balance", "Existence of cash"] },
          { cells: ["2. Examined sales invoices to support recorded revenue transactions", "Cutoff of revenue"] },
          { cells: ["3. Recalculated depreciation expense using client-provided asset listings", "Accuracy of depreciation"] },
          { cells: ["4. Inspected title documents for real estate held by client", "Rights and obligations (ownership)"] },
          { cells: ["5. Traced a sample of shipping documents to sales invoices", "Completeness of revenue"] },
          { cells: ["6. Reviewed attorney letter regarding pending litigation", "Completeness and valuation of contingencies"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-procedure-1",
      order: 1,
      type: "dropdown",
      label: "Procedure 1 - Bank confirmation for existence",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-highly-reliable",
      },
      explanation: "Bank confirmations are highly reliable - external source, directly obtained, documentary evidence",
      dropdownOptions: [
        { id: "opt-highly-reliable", order: 1, text: "Highly reliable and appropriate", isCorrect: true },
        { id: "opt-mod-reliable", order: 2, text: "Moderately reliable", isCorrect: false },
        { id: "opt-low-reliable", order: 3, text: "Low reliability", isCorrect: false },
        { id: "opt-not-appropriate", order: 4, text: "Not appropriate for this assertion", isCorrect: false },
      ],
    },
    {
      id: "req-procedure-2",
      order: 2,
      type: "dropdown",
      label: "Procedure 2 - Examining invoices for cutoff",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-not-appropriate-2",
      },
      explanation: "Examining invoices tests occurrence/existence, not cutoff. Cutoff requires examining transactions near period-end with shipping dates.",
      dropdownOptions: [
        { id: "opt-highly-reliable-2", order: 1, text: "Highly reliable and appropriate", isCorrect: false },
        { id: "opt-mod-reliable-2", order: 2, text: "Moderately reliable", isCorrect: false },
        { id: "opt-not-appropriate-2", order: 3, text: "Not appropriate for this assertion", isCorrect: true },
        { id: "opt-needs-more-2", order: 4, text: "Needs additional procedures", isCorrect: false },
      ],
    },
    {
      id: "req-procedure-3",
      order: 3,
      type: "dropdown",
      label: "Procedure 3 - Recalculating depreciation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-mod-reliable-3",
      },
      explanation: "Recalculation is appropriate for accuracy, but using client-provided data limits reliability - should verify underlying data",
      dropdownOptions: [
        { id: "opt-highly-reliable-3", order: 1, text: "Highly reliable and appropriate", isCorrect: false },
        { id: "opt-mod-reliable-3", order: 2, text: "Appropriate but limited - relies on client data", isCorrect: true },
        { id: "opt-not-appropriate-3", order: 3, text: "Not appropriate for this assertion", isCorrect: false },
        { id: "opt-low-reliable-3", order: 4, text: "Low reliability", isCorrect: false },
      ],
    },
    {
      id: "req-procedure-4",
      order: 4,
      type: "dropdown",
      label: "Procedure 4 - Inspecting title documents",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-highly-reliable-4",
      },
      explanation: "Title documents are external, legal documents - highly reliable for testing rights and obligations",
      dropdownOptions: [
        { id: "opt-highly-reliable-4", order: 1, text: "Highly reliable and appropriate", isCorrect: true },
        { id: "opt-mod-reliable-4", order: 2, text: "Moderately reliable", isCorrect: false },
        { id: "opt-not-appropriate-4", order: 3, text: "Not appropriate for this assertion", isCorrect: false },
        { id: "opt-internal-4", order: 4, text: "Internal evidence only", isCorrect: false },
      ],
    },
    {
      id: "req-procedure-5",
      order: 5,
      type: "dropdown",
      label: "Procedure 5 - Tracing shipping docs to invoices",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-appropriate-5",
      },
      explanation: "Tracing from source documents (shipping) to records (invoices) tests completeness - appropriate procedure",
      dropdownOptions: [
        { id: "opt-appropriate-5", order: 1, text: "Appropriate for completeness", isCorrect: true },
        { id: "opt-tests-existence", order: 2, text: "Tests existence, not completeness", isCorrect: false },
        { id: "opt-not-reliable-5", order: 3, text: "Not reliable evidence", isCorrect: false },
        { id: "opt-wrong-direction", order: 4, text: "Wrong direction - should vouch from invoices", isCorrect: false },
      ],
    },
    {
      id: "req-procedure-6",
      order: 6,
      type: "dropdown",
      label: "Procedure 6 - Attorney letter for contingencies",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-appropriate-6",
      },
      explanation: "Attorney letters are required audit evidence for litigation - external, professional source",
      dropdownOptions: [
        { id: "opt-appropriate-6", order: 1, text: "Highly appropriate - required evidence", isCorrect: true },
        { id: "opt-corroborate-6", order: 2, text: "Needs corroboration with other evidence", isCorrect: false },
        { id: "opt-not-reliable-6", order: 3, text: "Not reliable - attorney is client's agent", isCorrect: false },
        { id: "opt-voluntary-6", order: 4, text: "Voluntary evidence only", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// RESEARCH TBS - Required per Section
// =============================================================================

export const audResearchPCAOBTBS: TBSQuestion = {
  id: "tbs-aud-020",
  section: "AUD",
  tbsType: "research",
  topic: "Professional Standards",
  subtopic: "PCAOB Standards",
  difficulty: "medium",
  skillLevel: "remembering_understanding",
  contentArea: "AUD-I",
  title: "Research - Auditor's Responsibility for Fraud",
  scenarioText: `A staff auditor is unsure about the auditor's responsibility when fraud is detected during an audit of an issuer (public company). They need to find the authoritative guidance on this matter.

Required: Cite the PCAOB Auditing Standard that addresses the auditor's consideration of fraud.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 2,
  exhibits: [
    {
      id: "exhibit-research-memo",
      order: 1,
      title: "Research Request",
      type: "memo",
      content: {
        type: "memo",
        from: "Staff Auditor",
        to: "Senior Auditor",
        date: "Current Date",
        subject: "Fraud Consideration Guidance",
        body: `During the audit of ABC Public Company, we discovered what may be fraudulent activity. I need to find the PCAOB standard that discusses:

1. The auditor's responsibility to plan and perform the audit to obtain reasonable assurance about whether the financial statements are free of material misstatement due to fraud

2. Required procedures when fraud is suspected

Please help me locate the relevant PCAOB Auditing Standard.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-pcaob-citation",
      order: 1,
      type: "citation",
      label: "PCAOB Auditing Standard on Fraud",
      points: 2,
      correctAnswer: {
        type: "citation",
        source: "PCAOB",
        topicCode: "AS 2401",
        alternativeCitations: [
          { source: "PCAOB", topicCode: "Auditing Standard No. 2401" },
          { source: "PCAOB", topicCode: "AS 2401 Consideration of Fraud" },
        ],
      },
      explanation: "PCAOB AS 2401 'Consideration of Fraud in a Financial Statement Audit' addresses the auditor's responsibility for detecting fraud in audits of issuers.",
    },
  ],
};

// =============================================================================
// REVIEW AND COMPILATION - Important Topic
// =============================================================================

export const audReviewEngagementProceduresTBS: TBSQuestion = {
  id: "tbs-aud-021",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Other Attestation Engagements",
  subtopic: "Review Engagements",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-IV",
  title: "Review Engagement Procedures",
  scenarioText: `You are performing a review engagement for a nonpublic company under SSARS. Evaluate which procedures are required, permitted, or inappropriate for a review engagement.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-review-standards",
      order: 1,
      title: "Review Engagement Standards",
      type: "text",
      content: {
        type: "text",
        title: "SSARS Review Requirements",
        paragraphs: [
          "A review consists primarily of inquiries and analytical procedures.",
          "The objective is to obtain limited assurance that there are no material modifications needed.",
          "The accountant does not obtain the understanding of internal control or assess fraud risk required in an audit.",
          "Review procedures are substantially less in scope than an audit.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-procedure-inquiry",
      order: 1,
      type: "dropdown",
      label: "Inquiring of management about accounting policies",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-required",
      },
      explanation: "Inquiry is a primary procedure in a review engagement - required",
      dropdownOptions: [
        { id: "opt-required", order: 1, text: "Required procedure", isCorrect: true },
        { id: "opt-permitted", order: 2, text: "Permitted but not required", isCorrect: false },
        { id: "opt-not-appropriate", order: 3, text: "Not appropriate for review", isCorrect: false },
      ],
    },
    {
      id: "req-procedure-confirm",
      order: 2,
      type: "dropdown",
      label: "Sending confirmations to banks and customers",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-not-typical",
      },
      explanation: "Confirmations are audit procedures, not typically performed in reviews unless accountant becomes aware of concerns",
      dropdownOptions: [
        { id: "opt-required-2", order: 1, text: "Required procedure", isCorrect: false },
        { id: "opt-not-typical", order: 2, text: "Not typically performed (audit procedure)", isCorrect: true },
        { id: "opt-prohibited", order: 3, text: "Prohibited in review", isCorrect: false },
      ],
    },
    {
      id: "req-procedure-analytical",
      order: 3,
      type: "dropdown",
      label: "Performing analytical procedures on financial data",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-required-3",
      },
      explanation: "Analytical procedures are a primary procedure in reviews - required",
      dropdownOptions: [
        { id: "opt-required-3", order: 1, text: "Required procedure", isCorrect: true },
        { id: "opt-permitted-3", order: 2, text: "Permitted but not required", isCorrect: false },
        { id: "opt-not-appropriate-3", order: 3, text: "Not appropriate for review", isCorrect: false },
      ],
    },
    {
      id: "req-procedure-observe",
      order: 4,
      type: "dropdown",
      label: "Observing physical inventory count",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-not-typical-4",
      },
      explanation: "Physical observation is an audit procedure, not typically performed in reviews",
      dropdownOptions: [
        { id: "opt-required-4", order: 1, text: "Required procedure", isCorrect: false },
        { id: "opt-not-typical-4", order: 2, text: "Not typically performed (audit procedure)", isCorrect: true },
        { id: "opt-prohibited-4", order: 3, text: "Prohibited in review", isCorrect: false },
      ],
    },
    {
      id: "req-procedure-rep-letter",
      order: 5,
      type: "dropdown",
      label: "Obtaining management representation letter",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-required-5",
      },
      explanation: "Management representations are required in a review engagement",
      dropdownOptions: [
        { id: "opt-required-5", order: 1, text: "Required procedure", isCorrect: true },
        { id: "opt-permitted-5", order: 2, text: "Permitted but not required", isCorrect: false },
        { id: "opt-not-appropriate-5", order: 3, text: "Not appropriate for review", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// ADDITIONAL AUD TBS
// =============================================================================

export const audMaterialityCalculationTBS: TBSQuestion = {
  id: "tbs-aud-022",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Planning",
  subtopic: "Materiality",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-II",
  title: "Materiality Determination",
  scenarioText: `You are planning the audit of Westbrook Manufacturing. Calculate the appropriate materiality levels based on the following information:

Financial Data:
• Total revenues: $45,000,000
• Total assets: $38,000,000
• Net income before taxes: $2,700,000
• Total equity: $15,000,000

The company is a mature, stable manufacturer with consistent profitability. There are no special risk factors.

Firm guidelines suggest:
• Revenue basis: 0.5% to 1%
• Total assets: 0.5% to 1%
• Net income: 3% to 5%
• Total equity: 2% to 5%

Required: Determine planning materiality and performance materiality.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-financial-data",
      order: 1,
      title: "Financial Summary",
      type: "table",
      content: {
        type: "table",
        title: "Westbrook Manufacturing - Key Metrics",
        headers: ["Metric", "Amount"],
        rows: [
          { cells: ["Total Revenues", "$45,000,000"] },
          { cells: ["Total Assets", "$38,000,000"] },
          { cells: ["Net Income Before Taxes", "$2,700,000"] },
          { cells: ["Total Equity", "$15,000,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-mat-revenue",
      order: 1,
      type: "numeric",
      label: "Materiality using revenue (0.75% midpoint)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 337500,
        tolerance: 5000,
      },
      explanation: "$45,000,000 × 0.75% = $337,500",
    },
    {
      id: "req-mat-income",
      order: 2,
      type: "numeric",
      label: "Materiality using net income (5%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 135000,
        tolerance: 0,
      },
      explanation: "$2,700,000 × 5% = $135,000",
    },
    {
      id: "req-planning-mat",
      order: 3,
      type: "numeric",
      label: "Selected planning materiality (justify most appropriate)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 300000,
        tolerance: 50000,
      },
      explanation: "For a stable manufacturer, revenue or assets-based materiality is typically used. Range of $250,000-$350,000 is reasonable.",
    },
    {
      id: "req-perf-mat-pct",
      order: 4,
      type: "numeric",
      label: "Performance materiality percentage (typical range 50-75%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 65,
        tolerance: 15,
      },
      explanation: "Performance materiality is typically 50-75% of planning materiality. 60-70% is common.",
    },
    {
      id: "req-perf-mat-amt",
      order: 5,
      type: "numeric",
      label: "Performance materiality amount",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 195000,
        tolerance: 50000,
      },
      explanation: "Using 65% of $300,000 = $195,000",
    },
  ],
};

export const audGoingConcernEvaluationTBS: TBSQuestion = {
  id: "tbs-aud-023",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Going Concern",
  subtopic: "Evaluation and Reporting",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "AUD-IV",
  title: "Going Concern Assessment",
  scenarioText: `You are completing the audit of Horizon Industries and must evaluate management's going concern assessment. Review the following conditions and determine the appropriate audit response.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-conditions",
      order: 1,
      title: "Client Conditions",
      type: "table",
      content: {
        type: "table",
        title: "Horizon Industries - Going Concern Indicators",
        headers: ["Factor", "Status"],
        rows: [
          { cells: ["Recurring operating losses", "3 consecutive years, $5M cumulative"] },
          { cells: ["Working capital", "Negative $2.5M"] },
          { cells: ["Loan covenant violation", "Debt/equity ratio exceeded, waiver obtained for 1 year"] },
          { cells: ["Major customer loss", "Customer representing 35% of revenue declared bankruptcy"] },
          { cells: ["New financing", "Obtained $3M line of credit, 80% drawn"] },
          { cells: ["Management plans", "Cost reduction program, seeking new customers, parent company commitment letter for $2M support"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-substantial-doubt",
      order: 1,
      type: "dropdown",
      label: "Is there substantial doubt about going concern?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-doubt",
      },
      explanation: "Multiple indicators suggest substantial doubt exists: recurring losses, negative working capital, covenant violation, major customer loss",
      dropdownOptions: [
        { id: "opt-yes-doubt", order: 1, text: "Yes - substantial doubt exists", isCorrect: true },
        { id: "opt-no-doubt", order: 2, text: "No - conditions are not severe enough", isCorrect: false },
        { id: "opt-insufficient", order: 3, text: "Insufficient information to evaluate", isCorrect: false },
      ],
    },
    {
      id: "req-plans-mitigate",
      order: 2,
      type: "dropdown",
      label: "Do management's plans alleviate the substantial doubt?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-partially",
      },
      explanation: "Plans provide some mitigation but are not definitive - cost cuts are uncertain, parent support is conditional",
      dropdownOptions: [
        { id: "opt-fully", order: 1, text: "Yes - plans fully alleviate doubt", isCorrect: false },
        { id: "opt-partially", order: 2, text: "Partially - some uncertainty remains", isCorrect: true },
        { id: "opt-not-mitigate", order: 3, text: "No - plans do not mitigate conditions", isCorrect: false },
      ],
    },
    {
      id: "req-parent-letter",
      order: 3,
      type: "dropdown",
      label: "What additional evidence is needed for parent company support?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ability-intent",
      },
      explanation: "Must evaluate parent's ability (financial capacity) and intent (commitment documentation) to provide support",
      dropdownOptions: [
        { id: "opt-letter-sufficient", order: 1, text: "Commitment letter is sufficient", isCorrect: false },
        { id: "opt-ability-intent", order: 2, text: "Evidence of parent's financial ability and binding nature of commitment", isCorrect: true },
        { id: "opt-no-evidence", order: 3, text: "No additional evidence needed", isCorrect: false },
      ],
    },
    {
      id: "req-disclosure",
      order: 4,
      type: "dropdown",
      label: "What financial statement disclosure is required?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-full-disclosure",
      },
      explanation: "When substantial doubt exists, disclosure of conditions and management's plans is required even if doubt is alleviated",
      dropdownOptions: [
        { id: "opt-no-disclosure", order: 1, text: "No disclosure if doubt is alleviated", isCorrect: false },
        { id: "opt-full-disclosure", order: 2, text: "Disclose conditions, management's evaluation, and plans", isCorrect: true },
        { id: "opt-only-plans", order: 3, text: "Disclose only management's plans", isCorrect: false },
      ],
    },
    {
      id: "req-report-mod",
      order: 5,
      type: "dropdown",
      label: "Report modification if doubt exists but disclosure is adequate",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-eom-paragraph",
      },
      explanation: "When substantial doubt exists and disclosure is adequate, add Emphasis of Matter paragraph (unmodified opinion)",
      dropdownOptions: [
        { id: "opt-unmodified", order: 1, text: "Unmodified opinion, no additional paragraph", isCorrect: false },
        { id: "opt-eom-paragraph", order: 2, text: "Unmodified opinion with Emphasis of Matter paragraph", isCorrect: true },
        { id: "opt-qualified", order: 3, text: "Qualified opinion", isCorrect: false },
        { id: "opt-disclaimer", order: 4, text: "Disclaimer of opinion", isCorrect: false },
      ],
    },
    {
      id: "req-inadequate-disclosure",
      order: 6,
      type: "dropdown",
      label: "Report modification if disclosure is inadequate",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-qualified-adverse",
      },
      explanation: "If required going concern disclosures are not made, modify opinion for departure from GAAP (qualified or adverse)",
      dropdownOptions: [
        { id: "opt-eom-only", order: 1, text: "Emphasis of Matter paragraph only", isCorrect: false },
        { id: "opt-qualified-adverse", order: 2, text: "Qualified or adverse opinion for disclosure deficiency", isCorrect: true },
        { id: "opt-disclaimer-2", order: 3, text: "Disclaimer of opinion", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// ENGAGEMENT ACCEPTANCE - Important Topic
// =============================================================================

export const audEngagementAcceptanceTBS: TBSQuestion = {
  id: "tbs-aud-024",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Professional Responsibilities",
  subtopic: "Engagement Acceptance",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-I",
  title: "Engagement Acceptance Considerations",
  scenarioText: `Your firm is considering whether to accept new audit engagements. Evaluate each situation and determine whether the firm should accept the engagement.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-engagements",
      order: 1,
      title: "Proposed Engagements",
      type: "table",
      content: {
        type: "table",
        title: "New Client Considerations",
        headers: ["Client", "Situation"],
        rows: [
          { cells: ["A", "Manufacturing company with complex international operations. Predecessor auditor resigned, stating management lacks integrity. No other issues noted."] },
          { cells: ["B", "Technology startup seeking first audit. CEO previously served as a client for your firm's tax services. No independence issues identified."] },
          { cells: ["C", "Bank requesting audit. Your firm lacks specific banking industry expertise but has access to specialist consultants."] },
          { cells: ["D", "Company requesting audit with deadline in 3 weeks. Normal audit would require 6 weeks. Client offers premium fee."] },
          { cells: ["E", "Public company audit. Your firm's largest audit client (45% of firm revenue) would refer this company."] },
          { cells: ["F", "Private company where the owner is a close friend of the managing partner. Owner has offered equity shares as partial payment."] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-client-a",
      order: 1,
      type: "dropdown",
      label: "Client A - Predecessor indicated management integrity concerns",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-decline-a",
      },
      explanation: "Management integrity is fundamental - if predecessor indicates lack of integrity, this is a strong reason to decline",
      dropdownOptions: [
        { id: "opt-accept-a", order: 1, text: "Accept - predecessor's concerns may be unfounded", isCorrect: false },
        { id: "opt-decline-a", order: 2, text: "Decline - management integrity is essential", isCorrect: true },
        { id: "opt-investigate-a", order: 3, text: "Accept after additional investigation", isCorrect: false },
      ],
    },
    {
      id: "req-client-b",
      order: 2,
      type: "dropdown",
      label: "Client B - Startup with prior tax client relationship",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-accept-b",
      },
      explanation: "Prior tax services do not impair independence; new audit engagement is acceptable",
      dropdownOptions: [
        { id: "opt-accept-b", order: 1, text: "Accept - prior tax work does not impair independence", isCorrect: true },
        { id: "opt-decline-b", order: 2, text: "Decline - prior relationship creates conflict", isCorrect: false },
        { id: "opt-cooling-b", order: 3, text: "Accept only after cooling-off period", isCorrect: false },
      ],
    },
    {
      id: "req-client-c",
      order: 3,
      type: "dropdown",
      label: "Client C - Bank audit requiring industry expertise",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-accept-c",
      },
      explanation: "Using specialists/consultants to supplement firm expertise is appropriate - firm can accept",
      dropdownOptions: [
        { id: "opt-accept-c", order: 1, text: "Accept - specialists can supplement firm expertise", isCorrect: true },
        { id: "opt-decline-c", order: 2, text: "Decline - firm lacks competence", isCorrect: false },
        { id: "opt-partner-c", order: 3, text: "Must refer to another firm", isCorrect: false },
      ],
    },
    {
      id: "req-client-d",
      order: 4,
      type: "dropdown",
      label: "Client D - Unrealistic timeline with premium fee",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-decline-d",
      },
      explanation: "Cannot compromise audit quality for fee - insufficient time to perform adequate procedures",
      dropdownOptions: [
        { id: "opt-accept-d", order: 1, text: "Accept - premium fee compensates for time pressure", isCorrect: false },
        { id: "opt-decline-d", order: 2, text: "Decline - cannot perform adequate procedures", isCorrect: true },
        { id: "opt-negotiate-d", order: 3, text: "Accept with scope limitation", isCorrect: false },
      ],
    },
    {
      id: "req-client-e",
      order: 5,
      type: "dropdown",
      label: "Client E - Referral from client representing 45% of revenue",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-independence-e",
      },
      explanation: "Fee concentration threatens independence - 45% exceeds thresholds; must address concentration first",
      dropdownOptions: [
        { id: "opt-accept-e", order: 1, text: "Accept - referral is normal business", isCorrect: false },
        { id: "opt-decline-e", order: 2, text: "Decline - creates undue influence", isCorrect: false },
        { id: "opt-independence-e", order: 3, text: "Address fee concentration issue before considering", isCorrect: true },
      ],
    },
    {
      id: "req-client-f",
      order: 6,
      type: "dropdown",
      label: "Client F - Close friendship and equity compensation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-decline-f",
      },
      explanation: "Close personal relationship plus equity interest creates independence impairment",
      dropdownOptions: [
        { id: "opt-accept-f", order: 1, text: "Accept - can maintain objectivity", isCorrect: false },
        { id: "opt-decline-f", order: 2, text: "Decline - multiple independence threats", isCorrect: true },
        { id: "opt-different-partner-f", order: 3, text: "Accept if different partner assigned", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// SUBSTANTIVE PROCEDURES - Important Topic
// =============================================================================

export const audSubstantiveProceduresTBS: TBSQuestion = {
  id: "tbs-aud-025",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Substantive Procedures",
  subtopic: "Procedure Selection",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Selecting Appropriate Substantive Procedures",
  scenarioText: `For each audit objective, select the most appropriate substantive procedure from the options provided.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-objectives",
      order: 1,
      title: "Audit Objectives",
      type: "table",
      content: {
        type: "table",
        title: "Substantive Testing Objectives",
        headers: ["#", "Account/Assertion", "Objective"],
        rows: [
          { cells: ["1", "Accounts Receivable - Existence", "Verify that recorded receivables represent valid amounts owed"] },
          { cells: ["2", "Inventory - Valuation", "Verify inventory is stated at lower of cost or NRV"] },
          { cells: ["3", "Revenue - Completeness", "Verify all revenue transactions are recorded"] },
          { cells: ["4", "Fixed Assets - Existence", "Verify recorded assets physically exist"] },
          { cells: ["5", "Accounts Payable - Completeness", "Verify all liabilities are recorded"] },
          { cells: ["6", "Cash - Existence and Rights", "Verify recorded cash balances exist and are owned"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-ar-procedure",
      order: 1,
      type: "dropdown",
      label: "1. Most appropriate procedure for A/R existence",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-confirm-ar",
      },
      explanation: "Confirmation provides external evidence that receivables exist and are valid obligations",
      dropdownOptions: [
        { id: "opt-confirm-ar", order: 1, text: "Send positive confirmations to customers", isCorrect: true },
        { id: "opt-recalc-ar", order: 2, text: "Recalculate aged receivables schedule", isCorrect: false },
        { id: "opt-analyze-ar", order: 3, text: "Perform trend analysis of receivables", isCorrect: false },
        { id: "opt-inquiry-ar", order: 4, text: "Inquire of credit manager", isCorrect: false },
      ],
    },
    {
      id: "req-inv-procedure",
      order: 2,
      type: "dropdown",
      label: "2. Most appropriate procedure for inventory valuation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-lcnrv-test",
      },
      explanation: "Testing lower of cost or NRV directly addresses valuation assertion",
      dropdownOptions: [
        { id: "opt-observe-count", order: 1, text: "Observe physical inventory count", isCorrect: false },
        { id: "opt-lcnrv-test", order: 2, text: "Compare cost to current selling prices less costs to sell", isCorrect: true },
        { id: "opt-cutoff-test", order: 3, text: "Test receiving cutoff", isCorrect: false },
        { id: "opt-confirm-consign", order: 4, text: "Confirm inventory held by consignees", isCorrect: false },
      ],
    },
    {
      id: "req-rev-procedure",
      order: 3,
      type: "dropdown",
      label: "3. Most appropriate procedure for revenue completeness",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-trace-shipping",
      },
      explanation: "Tracing from shipping documents to recorded sales tests that all shipments were recorded",
      dropdownOptions: [
        { id: "opt-vouch-invoices", order: 1, text: "Vouch recorded sales to invoices", isCorrect: false },
        { id: "opt-trace-shipping", order: 2, text: "Trace shipping documents to sales invoices", isCorrect: true },
        { id: "opt-confirm-customers", order: 3, text: "Confirm sales with customers", isCorrect: false },
        { id: "opt-analytical-rev", order: 4, text: "Perform analytical procedures on revenue trends", isCorrect: false },
      ],
    },
    {
      id: "req-fa-procedure",
      order: 4,
      type: "dropdown",
      label: "4. Most appropriate procedure for fixed asset existence",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-physical-inspect",
      },
      explanation: "Physical inspection provides direct evidence of existence",
      dropdownOptions: [
        { id: "opt-vouch-additions", order: 1, text: "Vouch additions to vendor invoices", isCorrect: false },
        { id: "opt-physical-inspect", order: 2, text: "Physically inspect selected assets", isCorrect: true },
        { id: "opt-recalc-deprec", order: 3, text: "Recalculate depreciation expense", isCorrect: false },
        { id: "opt-review-titles", order: 4, text: "Review title documents", isCorrect: false },
      ],
    },
    {
      id: "req-ap-procedure",
      order: 5,
      type: "dropdown",
      label: "5. Most appropriate procedure for A/P completeness",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-search-unrecorded",
      },
      explanation: "Search for unrecorded liabilities examines subsequent payments for items that should have been accrued",
      dropdownOptions: [
        { id: "opt-confirm-ap", order: 1, text: "Confirm balances with vendors", isCorrect: false },
        { id: "opt-vouch-ap", order: 2, text: "Vouch recorded payables to invoices", isCorrect: false },
        { id: "opt-search-unrecorded", order: 3, text: "Examine subsequent cash disbursements", isCorrect: true },
        { id: "opt-reconcile-statements", order: 4, text: "Reconcile vendor statements", isCorrect: false },
      ],
    },
    {
      id: "req-cash-procedure",
      order: 6,
      type: "dropdown",
      label: "6. Most appropriate procedure for cash existence and rights",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-bank-confirm",
      },
      explanation: "Bank confirmation provides external evidence of both existence and ownership",
      dropdownOptions: [
        { id: "opt-count-cash", order: 1, text: "Count cash on hand", isCorrect: false },
        { id: "opt-bank-confirm", order: 2, text: "Obtain bank confirmation", isCorrect: true },
        { id: "opt-bank-rec", order: 3, text: "Prepare bank reconciliation", isCorrect: false },
        { id: "opt-review-deposits", order: 4, text: "Review deposit slips", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// FRAUD PROCEDURES - Important Topic
// =============================================================================

export const audFraudProceduresTBS: TBSQuestion = {
  id: "tbs-aud-026",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Fraud",
  subtopic: "Fraud Risk Assessment",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-II",
  title: "Fraud Risk Indicators and Responses",
  scenarioText: `During the audit planning phase, you identified several conditions at the client. Evaluate each condition for fraud risk implications and determine the appropriate audit response.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-conditions",
      order: 1,
      title: "Conditions Identified",
      type: "table",
      content: {
        type: "table",
        title: "Fraud Risk Indicators",
        headers: ["#", "Condition"],
        rows: [
          { cells: ["1", "CFO compensation is heavily tied to meeting earnings targets. Company is close to missing targets for current quarter."] },
          { cells: ["2", "The CEO dominates board meetings and frequently makes decisions without board approval."] },
          { cells: ["3", "Significant related party transactions with entities owned by management family members."] },
          { cells: ["4", "Warehouse manager has access to inventory and also maintains perpetual records. No periodic physical counts."] },
          { cells: ["5", "Company operates in industry facing declining demand. Competitors have reported losses; client reports consistent profits."] },
          { cells: ["6", "Accounting department is understaffed; year-end close involves significant manual journal entries."] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-condition-1-type",
      order: 1,
      type: "dropdown",
      label: "Condition 1 - Fraud risk triangle element",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-pressure",
      },
      explanation: "Compensation tied to targets creates pressure/incentive to manipulate results",
      dropdownOptions: [
        { id: "opt-pressure", order: 1, text: "Pressure/Incentive", isCorrect: true },
        { id: "opt-opportunity", order: 2, text: "Opportunity", isCorrect: false },
        { id: "opt-rationalization", order: 3, text: "Rationalization", isCorrect: false },
      ],
    },
    {
      id: "req-condition-2-type",
      order: 2,
      type: "dropdown",
      label: "Condition 2 - Primary concern with CEO dominance",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-override-risk",
      },
      explanation: "CEO dominance increases risk of management override of controls",
      dropdownOptions: [
        { id: "opt-segregation", order: 1, text: "Inadequate segregation of duties", isCorrect: false },
        { id: "opt-override-risk", order: 2, text: "Management override risk", isCorrect: true },
        { id: "opt-competence", order: 3, text: "Inadequate competence", isCorrect: false },
      ],
    },
    {
      id: "req-condition-3-response",
      order: 3,
      type: "dropdown",
      label: "Condition 3 - Appropriate response to related party risk",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-scrutinize-rpt",
      },
      explanation: "Related party transactions require increased scrutiny and evaluation of business purpose",
      dropdownOptions: [
        { id: "opt-standard-audit", order: 1, text: "Standard audit procedures are sufficient", isCorrect: false },
        { id: "opt-scrutinize-rpt", order: 2, text: "Extended procedures to evaluate business purpose and pricing", isCorrect: true },
        { id: "opt-withdraw", order: 3, text: "Withdraw from engagement", isCorrect: false },
      ],
    },
    {
      id: "req-condition-4-type",
      order: 4,
      type: "dropdown",
      label: "Condition 4 - Fraud risk triangle element",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-opportunity-4",
      },
      explanation: "Inadequate segregation provides opportunity for asset misappropriation",
      dropdownOptions: [
        { id: "opt-pressure-4", order: 1, text: "Pressure/Incentive", isCorrect: false },
        { id: "opt-opportunity-4", order: 2, text: "Opportunity", isCorrect: true },
        { id: "opt-rationalization-4", order: 3, text: "Rationalization", isCorrect: false },
      ],
    },
    {
      id: "req-condition-5-response",
      order: 5,
      type: "dropdown",
      label: "Condition 5 - Appropriate response to anomalous profitability",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-revenue-focus",
      },
      explanation: "Unusual profitability vs industry suggests heightened revenue manipulation risk",
      dropdownOptions: [
        { id: "opt-standard-proc", order: 1, text: "Standard procedures are appropriate", isCorrect: false },
        { id: "opt-revenue-focus", order: 2, text: "Focus substantive procedures on revenue recognition", isCorrect: true },
        { id: "opt-expense-focus", order: 3, text: "Focus on expense understatement", isCorrect: false },
      ],
    },
    {
      id: "req-condition-6-response",
      order: 6,
      type: "dropdown",
      label: "Condition 6 - Response to manual journal entry risk",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-test-entries",
      },
      explanation: "AU-C 240 requires testing journal entries for fraud; manual entries are higher risk",
      dropdownOptions: [
        { id: "opt-rely-controls", order: 1, text: "Rely on management review controls", isCorrect: false },
        { id: "opt-test-entries", order: 2, text: "Test manual entries with unpredictable selection", isCorrect: true },
        { id: "opt-no-response", order: 3, text: "No special response needed", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// AUDIT DOCUMENTATION - Important Topic
// =============================================================================

export const audDocumentationRequirementsTBS: TBSQuestion = {
  id: "tbs-aud-027",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Audit Documentation",
  subtopic: "Documentation Requirements",
  difficulty: "easy",
  skillLevel: "remembering_understanding",
  contentArea: "AUD-III",
  title: "Audit Documentation Standards",
  scenarioText: `Evaluate each situation to determine whether the audit documentation meets professional standards requirements.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-scenarios",
      order: 1,
      title: "Documentation Scenarios",
      type: "table",
      content: {
        type: "table",
        title: "Workpaper Review Findings",
        headers: ["#", "Scenario"],
        rows: [
          { cells: ["1", "Staff auditor documented 'Tested a sample of invoices. All selected items agreed to supporting documentation without exception.'"] },
          { cells: ["2", "After the audit report was issued, the manager added a note explaining why a certain procedure was considered sufficient."] },
          { cells: ["3", "Workpapers reference that cash was confirmed with the bank, but no copy of the confirmation is in the file."] },
          { cells: ["4", "The audit file was completed and assembled within 45 days after the report release date."] },
          { cells: ["5", "An experienced auditor reviewed the file 3 years later and was able to understand the procedures performed and conclusions reached."] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-scenario-1",
      order: 1,
      type: "dropdown",
      label: "Scenario 1 - Invoice testing documentation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-insufficient-1",
      },
      explanation: "Documentation must include sample selection criteria, population size, and specific items tested",
      dropdownOptions: [
        { id: "opt-sufficient-1", order: 1, text: "Documentation is sufficient", isCorrect: false },
        { id: "opt-insufficient-1", order: 2, text: "Insufficient - lacks sample details and specific items", isCorrect: true },
        { id: "opt-minor-1", order: 3, text: "Minor deficiency only", isCorrect: false },
      ],
    },
    {
      id: "req-scenario-2",
      order: 2,
      type: "dropdown",
      label: "Scenario 2 - Post-issuance documentation addition",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-improper-2",
      },
      explanation: "After report issuance, only administrative changes are permitted; adding explanations violates standards",
      dropdownOptions: [
        { id: "opt-proper-2", order: 1, text: "Proper - explains auditor's reasoning", isCorrect: false },
        { id: "opt-improper-2", order: 2, text: "Improper - cannot add substantive documentation after issuance", isCorrect: true },
        { id: "opt-acceptable-2", order: 3, text: "Acceptable with proper notation", isCorrect: false },
      ],
    },
    {
      id: "req-scenario-3",
      order: 3,
      type: "dropdown",
      label: "Scenario 3 - Missing bank confirmation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-deficient-3",
      },
      explanation: "Evidence supporting procedures must be retained in the file",
      dropdownOptions: [
        { id: "opt-acceptable-3", order: 1, text: "Acceptable - reference is sufficient", isCorrect: false },
        { id: "opt-deficient-3", order: 2, text: "Deficient - evidence must be included in file", isCorrect: true },
        { id: "opt-minor-3", order: 3, text: "Minor issue if staff can locate copy", isCorrect: false },
      ],
    },
    {
      id: "req-scenario-4",
      order: 4,
      type: "dropdown",
      label: "Scenario 4 - File assembly timing",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-nonissuer-4",
      },
      explanation: "GAAS requires file completion within 60 days; PCAOB requires 45 days. 45 days meets both standards.",
      dropdownOptions: [
        { id: "opt-compliant-4", order: 1, text: "Compliant with both nonissuer and issuer standards", isCorrect: true },
        { id: "opt-nonissuer-4", order: 2, text: "Compliant with PCAOB (issuer) but not GAAS", isCorrect: false },
        { id: "opt-noncompliant-4", order: 3, text: "Noncompliant with both standards", isCorrect: false },
      ],
    },
    {
      id: "req-scenario-5",
      order: 5,
      type: "dropdown",
      label: "Scenario 5 - Documentation understandability",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-meets-std-5",
      },
      explanation: "Documentation should enable an experienced auditor to understand the work - this meets the standard",
      dropdownOptions: [
        { id: "opt-meets-std-5", order: 1, text: "Meets documentation standards", isCorrect: true },
        { id: "opt-not-relevant-5", order: 2, text: "Not a relevant test of documentation", isCorrect: false },
        { id: "opt-insufficient-5", order: 3, text: "Insufficient standard", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// SPECIAL PURPOSE FRAMEWORKS - Important Topic
// =============================================================================

export const audSpecialPurposeFrameworksTBS: TBSQuestion = {
  id: "tbs-aud-028",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Special Reports",
  subtopic: "Special Purpose Frameworks",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-IV",
  title: "Special Purpose Framework Reports",
  scenarioText: `For each scenario, identify the appropriate reporting framework and required report elements.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-scenarios",
      order: 1,
      title: "Reporting Scenarios",
      type: "table",
      content: {
        type: "table",
        title: "Special Purpose Framework Situations",
        headers: ["#", "Scenario"],
        rows: [
          { cells: ["1", "Financial statements prepared using cash receipts and disbursements basis for a small partnership."] },
          { cells: ["2", "Financial statements prepared according to provisions of a regulatory agency for filing requirements."] },
          { cells: ["3", "Financial statements prepared according to a contractual agreement between the entity and a creditor."] },
          { cells: ["4", "Financial statements prepared using the income tax basis of accounting."] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cash-basis",
      order: 1,
      type: "dropdown",
      label: "Scenario 1 - Cash basis classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ocboa-cash",
      },
      explanation: "Cash basis is a special purpose framework (formerly OCBOA)",
      dropdownOptions: [
        { id: "opt-gaap", order: 1, text: "GAAP financial statements", isCorrect: false },
        { id: "opt-ocboa-cash", order: 2, text: "Special purpose framework - cash basis", isCorrect: true },
        { id: "opt-modified", order: 3, text: "Modified GAAP", isCorrect: false },
      ],
    },
    {
      id: "req-regulatory",
      order: 2,
      type: "dropdown",
      label: "Scenario 2 - Regulatory basis classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-regulatory",
      },
      explanation: "Regulatory basis accounting is a special purpose framework",
      dropdownOptions: [
        { id: "opt-gaap-reg", order: 1, text: "GAAP with regulatory disclosures", isCorrect: false },
        { id: "opt-regulatory", order: 2, text: "Special purpose framework - regulatory basis", isCorrect: true },
        { id: "opt-compliance", order: 3, text: "Compliance engagement", isCorrect: false },
      ],
    },
    {
      id: "req-contractual",
      order: 3,
      type: "dropdown",
      label: "Scenario 3 - Contractual basis classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-contractual",
      },
      explanation: "Contractual basis is a special purpose framework",
      dropdownOptions: [
        { id: "opt-gaap-contract", order: 1, text: "GAAP financial statements", isCorrect: false },
        { id: "opt-contractual", order: 2, text: "Special purpose framework - contractual basis", isCorrect: true },
        { id: "opt-agreed-upon", order: 3, text: "Agreed-upon procedures engagement", isCorrect: false },
      ],
    },
    {
      id: "req-tax-basis",
      order: 4,
      type: "dropdown",
      label: "Scenario 4 - Tax basis classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-tax-spf",
      },
      explanation: "Income tax basis is a special purpose framework",
      dropdownOptions: [
        { id: "opt-gaap-tax", order: 1, text: "GAAP with tax disclosures", isCorrect: false },
        { id: "opt-tax-spf", order: 2, text: "Special purpose framework - tax basis", isCorrect: true },
        { id: "opt-ifrs", order: 3, text: "IFRS", isCorrect: false },
      ],
    },
    {
      id: "req-report-element",
      order: 5,
      type: "dropdown",
      label: "Required paragraph in SPF reports",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-emphasis-para",
      },
      explanation: "SPF reports must include an emphasis-of-matter paragraph describing the framework",
      dropdownOptions: [
        { id: "opt-no-additional", order: 1, text: "No additional paragraphs required", isCorrect: false },
        { id: "opt-emphasis-para", order: 2, text: "Emphasis-of-matter paragraph describing the framework", isCorrect: true },
        { id: "opt-qualified", order: 3, text: "Qualified opinion paragraph", isCorrect: false },
      ],
    },
    {
      id: "req-distribution",
      order: 6,
      type: "dropdown",
      label: "Alert on restricted distribution",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-restrict-needed",
      },
      explanation: "Contractual basis reports should include alert restricting use to specified parties",
      dropdownOptions: [
        { id: "opt-no-restrict", order: 1, text: "No restriction required for any SPF", isCorrect: false },
        { id: "opt-restrict-needed", order: 2, text: "Alert required for contractual basis (restrict to parties)", isCorrect: true },
        { id: "opt-all-restrict", order: 3, text: "All SPF reports require restricted use", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// GROUP AUDITS - Important Topic
// =============================================================================

export const audGroupAuditTBS: TBSQuestion = {
  id: "tbs-aud-029",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Group Audits",
  subtopic: "Using Component Auditors",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "AUD-III",
  title: "Group Audit Considerations",
  scenarioText: `You are the group engagement partner for the audit of Consolidated Industries, which has multiple subsidiaries audited by component auditors. Evaluate each situation and determine the appropriate response.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-components",
      order: 1,
      title: "Component Information",
      type: "table",
      content: {
        type: "table",
        title: "Subsidiary Information",
        headers: ["Subsidiary", "Revenue %", "Assets %", "Component Auditor", "Status"],
        rows: [
          { cells: ["Sub A", "45%", "40%", "Big Four firm", "Work reviewed, no issues"] },
          { cells: ["Sub B", "25%", "30%", "Regional firm", "First year auditing this component"] },
          { cells: ["Sub C", "15%", "15%", "Local firm in foreign jurisdiction", "Cannot obtain access to workpapers due to local laws"] },
          { cells: ["Sub D", "10%", "10%", "Group firm network member", "Standard quality"] },
          { cells: ["Sub E", "5%", "5%", "None - immaterial", "Management-prepared schedules only"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-sub-a",
      order: 1,
      type: "dropdown",
      label: "Sub A - Can you take full responsibility?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-a",
      },
      explanation: "With work reviewed and no issues, group auditor can take full responsibility",
      dropdownOptions: [
        { id: "opt-yes-a", order: 1, text: "Yes - can take full responsibility", isCorrect: true },
        { id: "opt-no-a", order: 2, text: "No - must make reference to component auditor", isCorrect: false },
        { id: "opt-depends-a", order: 3, text: "Depends on specific circumstances", isCorrect: false },
      ],
    },
    {
      id: "req-sub-b",
      order: 2,
      type: "dropdown",
      label: "Sub B - Additional procedures for new component auditor",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-evaluate-b",
      },
      explanation: "New component auditor relationship requires evaluation of competence and independence",
      dropdownOptions: [
        { id: "opt-standard-b", order: 1, text: "Standard procedures are sufficient", isCorrect: false },
        { id: "opt-evaluate-b", order: 2, text: "Evaluate competence, independence, and review workpapers", isCorrect: true },
        { id: "opt-reperform-b", order: 3, text: "Reperform all procedures", isCorrect: false },
      ],
    },
    {
      id: "req-sub-c",
      order: 3,
      type: "dropdown",
      label: "Sub C - Response to workpaper access restriction",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-alternative-c",
      },
      explanation: "Must perform alternative procedures or evaluate if limitation is material",
      dropdownOptions: [
        { id: "opt-accept-c", order: 1, text: "Accept component auditor's report without review", isCorrect: false },
        { id: "opt-alternative-c", order: 2, text: "Perform alternative procedures or evaluate scope limitation", isCorrect: true },
        { id: "opt-withdraw-c", order: 3, text: "Withdraw from group engagement", isCorrect: false },
      ],
    },
    {
      id: "req-sub-d",
      order: 4,
      type: "dropdown",
      label: "Sub D - Network firm as component auditor",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-still-eval-d",
      },
      explanation: "Network membership doesn't eliminate need to evaluate component auditor",
      dropdownOptions: [
        { id: "opt-automatic-d", order: 1, text: "Automatic reliance permitted on network firm", isCorrect: false },
        { id: "opt-still-eval-d", order: 2, text: "Still required to evaluate and review work", isCorrect: true },
        { id: "opt-same-d", order: 3, text: "Same as group firm performing work", isCorrect: false },
      ],
    },
    {
      id: "req-sub-e",
      order: 5,
      type: "dropdown",
      label: "Sub E - Immaterial component procedures",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-analytical-e",
      },
      explanation: "For immaterial components, analytical procedures at group level are typically sufficient",
      dropdownOptions: [
        { id: "opt-no-proc-e", order: 1, text: "No procedures required", isCorrect: false },
        { id: "opt-analytical-e", order: 2, text: "Analytical procedures at group level", isCorrect: true },
        { id: "opt-full-audit-e", order: 3, text: "Full audit required regardless of materiality", isCorrect: false },
      ],
    },
    {
      id: "req-report-ref",
      order: 6,
      type: "dropdown",
      label: "When can group auditor make reference in report?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-significant-ref",
      },
      explanation: "Reference to component auditor permitted when component is significant and group auditor takes responsibility for their own work only",
      dropdownOptions: [
        { id: "opt-never-ref", order: 1, text: "Never - must take full responsibility", isCorrect: false },
        { id: "opt-significant-ref", order: 2, text: "When component is significant and decision is properly made", isCorrect: true },
        { id: "opt-always-ref", order: 3, text: "Always required to reference component auditors", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// ANALYTICAL PROCEDURES - Important Topic
// =============================================================================

export const audAnalyticalProceduresTBS: TBSQuestion = {
  id: "tbs-aud-030",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Analytical Procedures",
  subtopic: "Substantive Analytical Procedures",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Substantive Analytical Procedures",
  scenarioText: `You are performing substantive analytical procedures on payroll expense for Midwest Manufacturing. Use the information provided to develop expectations and evaluate results.

Client Information:
• Average hourly workers: 150 employees
• Average hours per week: 40
• Weeks in year: 52
• Average hourly wage: $22.00
• Payroll taxes and benefits: 25% of wages
• Prior year payroll expense: $8,500,000
• Current year recorded payroll: $9,200,000
• Management explained a 5% wage increase was implemented July 1`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-payroll-data",
      order: 1,
      title: "Payroll Analysis Data",
      type: "table",
      content: {
        type: "table",
        title: "Payroll Information",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Hourly employees", "150"] },
          { cells: ["Hours per week", "40"] },
          { cells: ["Weeks in year", "52"] },
          { cells: ["Average wage rate", "$22.00"] },
          { cells: ["Benefits/taxes rate", "25%"] },
          { cells: ["Prior year expense", "$8,500,000"] },
          { cells: ["Current year recorded", "$9,200,000"] },
          { cells: ["Wage increase %", "5%"] },
          { cells: ["Increase effective date", "July 1"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-base-wages",
      order: 1,
      type: "numeric",
      label: "Calculate base annual wages (no increase)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6864000,
        tolerance: 10000,
      },
      explanation: "150 × 40 × 52 × $22.00 = $6,864,000",
    },
    {
      id: "req-total-payroll-base",
      order: 2,
      type: "numeric",
      label: "Total payroll cost (base, with benefits)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 8580000,
        tolerance: 10000,
      },
      explanation: "$6,864,000 × 1.25 = $8,580,000",
    },
    {
      id: "req-wage-increase-amount",
      order: 3,
      type: "numeric",
      label: "Additional cost from July 1 wage increase (6 months)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 214500,
        tolerance: 5000,
      },
      explanation: "Half year at 5% increase = $8,580,000 × 5% × 0.5 = $214,500",
    },
    {
      id: "req-expected-total",
      order: 4,
      type: "numeric",
      label: "Expected current year payroll expense",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 8794500,
        tolerance: 15000,
      },
      explanation: "$8,580,000 + $214,500 = $8,794,500",
    },
    {
      id: "req-difference",
      order: 5,
      type: "numeric",
      label: "Difference from recorded amount",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 405500,
        tolerance: 15000,
      },
      explanation: "$9,200,000 - $8,794,500 = $405,500",
    },
    {
      id: "req-conclusion",
      order: 6,
      type: "dropdown",
      label: "Appropriate conclusion based on analysis",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-investigate",
      },
      explanation: "Significant unexplained difference requires investigation and additional procedures",
      dropdownOptions: [
        { id: "opt-reasonable", order: 1, text: "Recorded amount appears reasonable", isCorrect: false },
        { id: "opt-investigate", order: 2, text: "Significant difference - investigate further", isCorrect: true },
        { id: "opt-adjust", order: 3, text: "Propose adjustment immediately", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// COMMUNICATION WITH GOVERNANCE - Important Topic
// =============================================================================

export const audGovernanceCommunicationTBS: TBSQuestion = {
  id: "tbs-aud-031",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Communications",
  subtopic: "Communication with Governance",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "AUD-IV",
  title: "Required Communications",
  scenarioText: `Determine which matters require communication to those charged with governance (audit committee) and the timing of such communications.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-matters",
      order: 1,
      title: "Matters Identified",
      type: "table",
      content: {
        type: "table",
        title: "Audit Findings",
        headers: ["#", "Matter"],
        rows: [
          { cells: ["1", "Significant audit adjustments proposed and recorded by management"] },
          { cells: ["2", "Material weaknesses in internal control identified during the audit"] },
          { cells: ["3", "Significant accounting policies adopted by management"] },
          { cells: ["4", "Disagreements with management about accounting matters, subsequently resolved"] },
          { cells: ["5", "Immaterial error discovered but not corrected by management"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-matter-1",
      order: 1,
      type: "dropdown",
      label: "Matter 1 - Audit adjustments",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-required-1",
      },
      explanation: "Significant audit adjustments are required to be communicated to governance",
      dropdownOptions: [
        { id: "opt-required-1", order: 1, text: "Required communication", isCorrect: true },
        { id: "opt-optional-1", order: 2, text: "Optional communication", isCorrect: false },
        { id: "opt-not-req-1", order: 3, text: "Not required", isCorrect: false },
      ],
    },
    {
      id: "req-matter-2",
      order: 2,
      type: "dropdown",
      label: "Matter 2 - Material weaknesses timing",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-writing-timely",
      },
      explanation: "Material weaknesses must be communicated in writing within 60 days of report release",
      dropdownOptions: [
        { id: "opt-oral-only", order: 1, text: "Oral communication is sufficient", isCorrect: false },
        { id: "opt-writing-timely", order: 2, text: "Written communication required, timely basis", isCorrect: true },
        { id: "opt-year-end", order: 3, text: "Only at year-end", isCorrect: false },
      ],
    },
    {
      id: "req-matter-3",
      order: 3,
      type: "dropdown",
      label: "Matter 3 - Accounting policies",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-required-3",
      },
      explanation: "Significant accounting policies and practices are required communications",
      dropdownOptions: [
        { id: "opt-required-3", order: 1, text: "Required communication", isCorrect: true },
        { id: "opt-only-new-3", order: 2, text: "Only if new policies adopted", isCorrect: false },
        { id: "opt-not-req-3", order: 3, text: "Not required", isCorrect: false },
      ],
    },
    {
      id: "req-matter-4",
      order: 4,
      type: "dropdown",
      label: "Matter 4 - Resolved disagreements",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-required-4",
      },
      explanation: "Disagreements with management are required to be communicated even if resolved",
      dropdownOptions: [
        { id: "opt-required-4", order: 1, text: "Required - even if resolved", isCorrect: true },
        { id: "opt-only-unresolved", order: 2, text: "Only if unresolved", isCorrect: false },
        { id: "opt-discretionary-4", order: 3, text: "Auditor discretion", isCorrect: false },
      ],
    },
    {
      id: "req-matter-5",
      order: 5,
      type: "dropdown",
      label: "Matter 5 - Uncorrected immaterial errors",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-required-5",
      },
      explanation: "Uncorrected misstatements, even if immaterial, must be communicated to governance",
      dropdownOptions: [
        { id: "opt-required-5", order: 1, text: "Required - all uncorrected misstatements", isCorrect: true },
        { id: "opt-only-material", order: 2, text: "Only if material", isCorrect: false },
        { id: "opt-not-req-5", order: 3, text: "Not required for immaterial items", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// RELATED PARTIES - Important Topic
// =============================================================================

export const audRelatedPartiesTBS: TBSQuestion = {
  id: "tbs-aud-032",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Related Parties",
  subtopic: "Identification and Testing",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-III",
  title: "Related Party Identification and Evaluation",
  scenarioText: `During the audit, you identified potential related party transactions. Evaluate each situation and determine the appropriate audit response.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-transactions",
      order: 1,
      title: "Potential Related Party Transactions",
      type: "table",
      content: {
        type: "table",
        title: "Transactions Identified",
        headers: ["#", "Transaction"],
        rows: [
          { cells: ["1", "Company leases warehouse from entity owned by CEO's spouse at $50,000/month. Market rate is approximately $45,000/month."] },
          { cells: ["2", "Company purchased inventory from entity where CFO serves on board. Purchase price appears to be at market rate."] },
          { cells: ["3", "Company made $2 million loan to entity owned by a board member. Loan is interest-free with no repayment terms."] },
          { cells: ["4", "Company sold equipment to CEO's brother-in-law at book value. Fair value was 20% higher."] },
          { cells: ["5", "Company uses payroll services from vendor where major shareholder's daughter is employed as admin assistant."] },
          { cells: ["6", "Management states no related party transactions exist. Standard search procedures identified no contradictory evidence."] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-trans-1",
      order: 1,
      type: "dropdown",
      label: "Transaction 1 - Lease above market",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rpt-disclose-1",
      },
      explanation: "This is a related party transaction requiring disclosure; terms are not at arm's length",
      dropdownOptions: [
        { id: "opt-not-rpt-1", order: 1, text: "Not a related party transaction", isCorrect: false },
        { id: "opt-rpt-disclose-1", order: 2, text: "Related party - requires disclosure of terms", isCorrect: true },
        { id: "opt-adjust-1", order: 3, text: "Requires adjustment to market rate", isCorrect: false },
      ],
    },
    {
      id: "req-trans-2",
      order: 2,
      type: "dropdown",
      label: "Transaction 2 - CFO board relationship",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rpt-2",
      },
      explanation: "CFO serving on board creates related party relationship regardless of price",
      dropdownOptions: [
        { id: "opt-not-rpt-2", order: 1, text: "Not related party - market price", isCorrect: false },
        { id: "opt-rpt-2", order: 2, text: "Related party - requires disclosure", isCorrect: true },
        { id: "opt-minor-2", order: 3, text: "Immaterial - no disclosure needed", isCorrect: false },
      ],
    },
    {
      id: "req-trans-3",
      order: 3,
      type: "dropdown",
      label: "Transaction 3 - Interest-free loan",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-significant-3",
      },
      explanation: "Interest-free loan with no terms is significant related party transaction requiring extensive disclosure",
      dropdownOptions: [
        { id: "opt-standard-3", order: 1, text: "Standard related party disclosure", isCorrect: false },
        { id: "opt-significant-3", order: 2, text: "Significant - extended disclosure and possible substance evaluation", isCorrect: true },
        { id: "opt-not-rpt-3", order: 3, text: "Not a related party if board member", isCorrect: false },
      ],
    },
    {
      id: "req-trans-4",
      order: 4,
      type: "dropdown",
      label: "Transaction 4 - Equipment sale below FV",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rpt-terms-4",
      },
      explanation: "Sale to relative at below market terms is a related party transaction",
      dropdownOptions: [
        { id: "opt-not-rpt-4", order: 1, text: "Not related party - brother-in-law is distant", isCorrect: false },
        { id: "opt-rpt-terms-4", order: 2, text: "Related party - disclose terms differ from market", isCorrect: true },
        { id: "opt-adjust-fv-4", order: 3, text: "Require restatement at fair value", isCorrect: false },
      ],
    },
    {
      id: "req-trans-5",
      order: 5,
      type: "dropdown",
      label: "Transaction 5 - Daughter as admin assistant",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-unlikely-rpt-5",
      },
      explanation: "Employment of relative in non-influential position typically does not create related party relationship",
      dropdownOptions: [
        { id: "opt-rpt-5", order: 1, text: "Related party transaction", isCorrect: false },
        { id: "opt-unlikely-rpt-5", order: 2, text: "Unlikely to be related party - no influence", isCorrect: true },
        { id: "opt-investigate-5", order: 3, text: "Requires significant investigation", isCorrect: false },
      ],
    },
    {
      id: "req-trans-6",
      order: 6,
      type: "dropdown",
      label: "Transaction 6 - Management denial with no contradictory evidence",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-skeptical-6",
      },
      explanation: "Professional skepticism required - must continue to be alert throughout audit",
      dropdownOptions: [
        { id: "opt-accept-6", order: 1, text: "Accept management representation", isCorrect: false },
        { id: "opt-skeptical-6", order: 2, text: "Continue to be alert throughout audit", isCorrect: true },
        { id: "opt-conclude-6", order: 3, text: "Conclude no related parties exist", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// RESEARCH TBS - AICPA Standards
// =============================================================================

export const audResearchAICPATBS: TBSQuestion = {
  id: "tbs-aud-033",
  section: "AUD",
  tbsType: "research",
  topic: "Professional Standards",
  subtopic: "AICPA Standards",
  difficulty: "medium",
  skillLevel: "remembering_understanding",
  contentArea: "AUD-I",
  title: "Research - Audit Evidence Requirements",
  scenarioText: `A staff auditor needs to understand the professional standards regarding audit evidence. Find the authoritative guidance that establishes requirements for sufficient appropriate audit evidence.

Required: Cite the AICPA auditing standard that addresses audit evidence.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 2,
  exhibits: [
    {
      id: "exhibit-research-request",
      order: 1,
      title: "Research Request",
      type: "memo",
      content: {
        type: "memo",
        from: "Staff Auditor",
        to: "Senior",
        date: "Current Date",
        subject: "Evidence Standards",
        body: `I need to cite the professional standard that addresses:
1. The concept of sufficient appropriate audit evidence
2. The nature of audit evidence
3. Procedures for obtaining audit evidence

Please help me locate the correct AU-C section.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-aicpa-citation",
      order: 1,
      type: "citation",
      label: "AICPA AU-C Section on Audit Evidence",
      points: 2,
      correctAnswer: {
        type: "citation",
        source: "AICPA",
        topicCode: "AU-C 500",
        alternativeCitations: [
          { source: "AICPA", topicCode: "AU-C Section 500" },
          { source: "AICPA", topicCode: "AU-C 500 Audit Evidence" },
        ],
      },
      explanation: "AU-C Section 500, Audit Evidence, establishes requirements and guidance regarding audit evidence in a financial statement audit.",
    },
  ],
};

// =============================================================================
// COMPLIANCE AUDITS - Important Topic
// =============================================================================

export const audComplianceAuditTBS: TBSQuestion = {
  id: "tbs-aud-034",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Compliance Audits",
  subtopic: "Government Auditing Standards",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-IV",
  title: "Single Audit Requirements",
  scenarioText: `A nonprofit organization receives federal awards and requires a Single Audit. Evaluate each situation to determine the audit requirements.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-client-info",
      order: 1,
      title: "Client Information",
      type: "table",
      content: {
        type: "table",
        title: "Federal Award Information",
        headers: ["Item", "Amount/Status"],
        rows: [
          { cells: ["Total federal expenditures", "$2,500,000"] },
          { cells: ["Number of federal programs", "5"] },
          { cells: ["Largest program expenditures", "$900,000 (Type A threshold is $750,000)"] },
          { cells: ["Prior year audit findings", "2 findings in major program"] },
          { cells: ["Single Audit threshold", "$1,000,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-single-audit",
      order: 1,
      type: "dropdown",
      label: "Is a Single Audit required?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-required",
      },
      explanation: "Federal expenditures of $2.5M exceed $1M threshold - Single Audit required",
      dropdownOptions: [
        { id: "opt-yes-required", order: 1, text: "Yes - exceeds threshold", isCorrect: true },
        { id: "opt-no-req", order: 2, text: "No - below threshold", isCorrect: false },
        { id: "opt-optional", order: 3, text: "Optional at entity's discretion", isCorrect: false },
      ],
    },
    {
      id: "req-type-a",
      order: 2,
      type: "dropdown",
      label: "Classification of $900,000 program",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-type-a",
      },
      explanation: "Program exceeds $750,000 Type A threshold - classified as Type A",
      dropdownOptions: [
        { id: "opt-type-a", order: 1, text: "Type A program", isCorrect: true },
        { id: "opt-type-b", order: 2, text: "Type B program", isCorrect: false },
        { id: "opt-depends", order: 3, text: "Depends on risk assessment", isCorrect: false },
      ],
    },
    {
      id: "req-major-program",
      order: 3,
      type: "dropdown",
      label: "Impact of prior year findings on program selection",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-high-risk",
      },
      explanation: "Prior year findings indicate high risk - affects major program determination",
      dropdownOptions: [
        { id: "opt-no-impact", order: 1, text: "No impact on current year", isCorrect: false },
        { id: "opt-high-risk", order: 2, text: "Program is high risk - likely major program", isCorrect: true },
        { id: "opt-skip", order: 3, text: "Can skip if findings were resolved", isCorrect: false },
      ],
    },
    {
      id: "req-report-type",
      order: 4,
      type: "dropdown",
      label: "Reports required for Single Audit",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-four-reports",
      },
      explanation: "Single Audit requires: F/S opinion, compliance opinion, internal control report, schedule of expenditures",
      dropdownOptions: [
        { id: "opt-fs-only", order: 1, text: "Financial statement opinion only", isCorrect: false },
        { id: "opt-four-reports", order: 2, text: "Four reports: F/S, compliance, IC over compliance, SEFA", isCorrect: true },
        { id: "opt-two-reports", order: 3, text: "Two reports: F/S and compliance", isCorrect: false },
      ],
    },
    {
      id: "req-submission",
      order: 5,
      type: "dropdown",
      label: "Where must Single Audit be submitted?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fac",
      },
      explanation: "Single Audit must be submitted to Federal Audit Clearinghouse (FAC)",
      dropdownOptions: [
        { id: "opt-agency", order: 1, text: "Each federal awarding agency", isCorrect: false },
        { id: "opt-fac", order: 2, text: "Federal Audit Clearinghouse (FAC)", isCorrect: true },
        { id: "opt-omb", order: 3, text: "Office of Management and Budget", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// SERVICE ORGANIZATION REPORTS - Important Topic
// =============================================================================

export const audSOCReportsTBS: TBSQuestion = {
  id: "tbs-aud-035",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Service Organizations",
  subtopic: "SOC Reports",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-III",
  title: "Using Service Organization Reports",
  scenarioText: `Your audit client uses a third-party payroll service organization. Evaluate the service organization's SOC report and determine its impact on your audit.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-soc-info",
      order: 1,
      title: "SOC Report Details",
      type: "table",
      content: {
        type: "table",
        title: "Service Organization Report Information",
        headers: ["Element", "Detail"],
        rows: [
          { cells: ["Report type", "SOC 1 Type II"] },
          { cells: ["Report period", "January 1 - September 30, current year"] },
          { cells: ["Client fiscal year-end", "December 31"] },
          { cells: ["Service auditor opinion", "Unmodified"] },
          { cells: ["Controls tested", "Payroll processing, tax withholding, direct deposit"] },
          { cells: ["Exceptions noted", "2 out of 45 controls had deviations (non-material)"] },
          { cells: ["Complementary user entity controls", "Several controls identified requiring client implementation"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-soc-type",
      order: 1,
      type: "dropdown",
      label: "Is SOC 1 the appropriate report type?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-soc1",
      },
      explanation: "SOC 1 reports on controls relevant to user entities' financial reporting - appropriate for payroll",
      dropdownOptions: [
        { id: "opt-yes-soc1", order: 1, text: "Yes - SOC 1 is for financial reporting controls", isCorrect: true },
        { id: "opt-need-soc2", order: 2, text: "No - need SOC 2 for payroll", isCorrect: false },
        { id: "opt-need-soc3", order: 3, text: "No - need SOC 3 for public distribution", isCorrect: false },
      ],
    },
    {
      id: "req-type-ii",
      order: 2,
      type: "dropdown",
      label: "Advantage of Type II over Type I report",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-operating-eff",
      },
      explanation: "Type II tests operating effectiveness over a period; Type I only tests design at a point in time",
      dropdownOptions: [
        { id: "opt-no-diff", order: 1, text: "No significant difference", isCorrect: false },
        { id: "opt-operating-eff", order: 2, text: "Tests operating effectiveness, not just design", isCorrect: true },
        { id: "opt-more-controls", order: 3, text: "Covers more controls", isCorrect: false },
      ],
    },
    {
      id: "req-gap-period",
      order: 3,
      type: "dropdown",
      label: "Impact of report gap (Oct 1 - Dec 31)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-bridge-proc",
      },
      explanation: "Gap period requires additional procedures to bridge to year-end",
      dropdownOptions: [
        { id: "opt-no-concern", order: 1, text: "No concern - report is recent enough", isCorrect: false },
        { id: "opt-bridge-proc", order: 2, text: "Must perform bridging procedures for gap period", isCorrect: true },
        { id: "opt-cannot-rely", order: 3, text: "Cannot rely on report - must audit service org", isCorrect: false },
      ],
    },
    {
      id: "req-exceptions",
      order: 4,
      type: "dropdown",
      label: "How should you treat the noted exceptions?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-evaluate",
      },
      explanation: "Must evaluate impact of exceptions on client's financial statements",
      dropdownOptions: [
        { id: "opt-ignore", order: 1, text: "Ignore - service auditor said non-material", isCorrect: false },
        { id: "opt-evaluate", order: 2, text: "Evaluate impact on client's financial statements", isCorrect: true },
        { id: "opt-qualify", order: 3, text: "Require qualification of audit report", isCorrect: false },
      ],
    },
    {
      id: "req-cuec",
      order: 5,
      type: "dropdown",
      label: "Responsibility for complementary user entity controls",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-client-test",
      },
      explanation: "CUECs are client's responsibility - auditor must test if planning to rely on system",
      dropdownOptions: [
        { id: "opt-service-org", order: 1, text: "Service organization's responsibility", isCorrect: false },
        { id: "opt-client-test", order: 2, text: "Client must implement; auditor tests if relying", isCorrect: true },
        { id: "opt-auditor-design", order: 3, text: "Auditor designs additional controls", isCorrect: false },
      ],
    },
    {
      id: "req-can-rely",
      order: 6,
      type: "dropdown",
      label: "Can you reduce substantive testing based on SOC report?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-if-procedures",
      },
      explanation: "Can reduce testing only if SOC report is satisfactory AND bridging procedures performed",
      dropdownOptions: [
        { id: "opt-yes-unmod", order: 1, text: "Yes - unmodified opinion allows full reliance", isCorrect: false },
        { id: "opt-if-procedures", order: 2, text: "Yes - if bridging procedures support reliance", isCorrect: true },
        { id: "opt-never", order: 3, text: "No - never reduce testing for service org", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// INTERNAL CONTROL COMPONENTS - Important Topic
// =============================================================================

export const audInternalControlComponentsTBS: TBSQuestion = {
  id: "tbs-aud-036",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Internal Controls",
  subtopic: "Control Components",
  difficulty: "easy",
  skillLevel: "remembering_understanding",
  contentArea: "AUD-II",
  title: "COSO Internal Control Components",
  scenarioText: `Match each control activity or characteristic to the appropriate COSO internal control component.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-coso-components",
      order: 1,
      title: "COSO Framework Components",
      type: "text",
      content: {
        type: "text",
        title: "Internal Control Components",
        paragraphs: [
          "Control Environment - Foundation of all other components; sets tone at top",
          "Risk Assessment - Identifying and analyzing risks to achieving objectives",
          "Control Activities - Policies and procedures that ensure management directives are carried out",
          "Information and Communication - Capturing and exchanging information needed to conduct operations",
          "Monitoring Activities - Evaluating quality of internal control performance over time",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-segregation",
      order: 1,
      type: "dropdown",
      label: "Segregation of duties among employees",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-control-act",
      },
      explanation: "Segregation of duties is a control activity",
      dropdownOptions: [
        { id: "opt-env", order: 1, text: "Control Environment", isCorrect: false },
        { id: "opt-risk", order: 2, text: "Risk Assessment", isCorrect: false },
        { id: "opt-control-act", order: 3, text: "Control Activities", isCorrect: true },
        { id: "opt-info", order: 4, text: "Information and Communication", isCorrect: false },
        { id: "opt-monitor", order: 5, text: "Monitoring", isCorrect: false },
      ],
    },
    {
      id: "req-ethics-code",
      order: 2,
      type: "dropdown",
      label: "Management's commitment to ethical values",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-env-2",
      },
      explanation: "Commitment to ethics is part of control environment",
      dropdownOptions: [
        { id: "opt-env-2", order: 1, text: "Control Environment", isCorrect: true },
        { id: "opt-risk-2", order: 2, text: "Risk Assessment", isCorrect: false },
        { id: "opt-control-act-2", order: 3, text: "Control Activities", isCorrect: false },
        { id: "opt-info-2", order: 4, text: "Information and Communication", isCorrect: false },
        { id: "opt-monitor-2", order: 5, text: "Monitoring", isCorrect: false },
      ],
    },
    {
      id: "req-internal-audit",
      order: 3,
      type: "dropdown",
      label: "Internal audit function evaluating controls",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-monitor-3",
      },
      explanation: "Internal audit evaluating controls is a monitoring activity",
      dropdownOptions: [
        { id: "opt-env-3", order: 1, text: "Control Environment", isCorrect: false },
        { id: "opt-risk-3", order: 2, text: "Risk Assessment", isCorrect: false },
        { id: "opt-control-act-3", order: 3, text: "Control Activities", isCorrect: false },
        { id: "opt-info-3", order: 4, text: "Information and Communication", isCorrect: false },
        { id: "opt-monitor-3", order: 5, text: "Monitoring", isCorrect: true },
      ],
    },
    {
      id: "req-fraud-risk",
      order: 4,
      type: "dropdown",
      label: "Identifying potential for material misstatement due to fraud",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-risk-4",
      },
      explanation: "Identifying fraud risk is part of risk assessment",
      dropdownOptions: [
        { id: "opt-env-4", order: 1, text: "Control Environment", isCorrect: false },
        { id: "opt-risk-4", order: 2, text: "Risk Assessment", isCorrect: true },
        { id: "opt-control-act-4", order: 3, text: "Control Activities", isCorrect: false },
        { id: "opt-info-4", order: 4, text: "Information and Communication", isCorrect: false },
        { id: "opt-monitor-4", order: 5, text: "Monitoring", isCorrect: false },
      ],
    },
    {
      id: "req-accounting-system",
      order: 5,
      type: "dropdown",
      label: "Accounting system capturing transaction data",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-info-5",
      },
      explanation: "Accounting system capturing data is information and communication",
      dropdownOptions: [
        { id: "opt-env-5", order: 1, text: "Control Environment", isCorrect: false },
        { id: "opt-risk-5", order: 2, text: "Risk Assessment", isCorrect: false },
        { id: "opt-control-act-5", order: 3, text: "Control Activities", isCorrect: false },
        { id: "opt-info-5", order: 4, text: "Information and Communication", isCorrect: true },
        { id: "opt-monitor-5", order: 5, text: "Monitoring", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// COMPILATION ENGAGEMENTS - Important Topic
// =============================================================================

export const audCompilationEngagementTBS: TBSQuestion = {
  id: "tbs-aud-037",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Compilation Engagements",
  subtopic: "SSARS Requirements",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "AUD-IV",
  title: "Compilation Engagement Requirements",
  scenarioText: `Determine the requirements and report language for various compilation engagement scenarios.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-compilation-info",
      order: 1,
      title: "Compilation Standards",
      type: "text",
      content: {
        type: "text",
        title: "SSARS Compilation Requirements",
        paragraphs: [
          "Compilation provides no assurance on financial statements",
          "Accountant is required to understand the entity's business and industry",
          "Accountant must read financial statements and consider reasonableness",
          "No inquiry or analytical procedures are required",
          "Report may omit substantially all disclosures if disclosed in report",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-assurance-level",
      order: 1,
      type: "dropdown",
      label: "Level of assurance provided in compilation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-none",
      },
      explanation: "Compilation provides NO assurance",
      dropdownOptions: [
        { id: "opt-reasonable", order: 1, text: "Reasonable assurance", isCorrect: false },
        { id: "opt-limited", order: 2, text: "Limited assurance", isCorrect: false },
        { id: "opt-none", order: 3, text: "No assurance", isCorrect: true },
      ],
    },
    {
      id: "req-understanding",
      order: 2,
      type: "dropdown",
      label: "Understanding of entity requirement",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-required-understand",
      },
      explanation: "Accountant must obtain understanding of entity and accounting practices",
      dropdownOptions: [
        { id: "opt-not-required", order: 1, text: "Not required", isCorrect: false },
        { id: "opt-required-understand", order: 2, text: "Required - general understanding", isCorrect: true },
        { id: "opt-detailed", order: 3, text: "Detailed understanding same as audit", isCorrect: false },
      ],
    },
    {
      id: "req-omit-disclosure",
      order: 3,
      type: "dropdown",
      label: "Can substantially all disclosures be omitted?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-disclose",
      },
      explanation: "Disclosures can be omitted if noted in compilation report",
      dropdownOptions: [
        { id: "opt-never", order: 1, text: "Never - violates GAAP", isCorrect: false },
        { id: "opt-yes-disclose", order: 2, text: "Yes - if disclosed in accountant's report", isCorrect: true },
        { id: "opt-client-choice", order: 3, text: "Yes - at client's request without disclosure", isCorrect: false },
      ],
    },
    {
      id: "req-going-concern",
      order: 4,
      type: "dropdown",
      label: "If accountant becomes aware of going concern doubt",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-disclose-gc",
      },
      explanation: "If aware of GC doubt, encourage disclosure; if not disclosed, consider modification",
      dropdownOptions: [
        { id: "opt-ignore-gc", order: 1, text: "No responsibility in compilation", isCorrect: false },
        { id: "opt-disclose-gc", order: 2, text: "Request disclosure; consider report modification", isCorrect: true },
        { id: "opt-withdraw-gc", order: 3, text: "Must withdraw from engagement", isCorrect: false },
      ],
    },
    {
      id: "req-independence",
      order: 5,
      type: "dropdown",
      label: "Independence requirement for compilation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-not-req-ind",
      },
      explanation: "Independence not required but lack must be disclosed in report",
      dropdownOptions: [
        { id: "opt-required-ind", order: 1, text: "Required", isCorrect: false },
        { id: "opt-not-req-ind", order: 2, text: "Not required - disclose lack in report", isCorrect: true },
        { id: "opt-no-mention", order: 3, text: "Not required - no disclosure needed", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// ACCOUNTING ESTIMATES - Important Topic
// =============================================================================

export const audAccountingEstimatesTBS: TBSQuestion = {
  id: "tbs-aud-038",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Accounting Estimates",
  subtopic: "Evaluating Estimates",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-III",
  title: "Evaluating Accounting Estimates",
  scenarioText: `Your audit client has several significant accounting estimates. Evaluate each estimate and determine the appropriate audit approach.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-estimates",
      order: 1,
      title: "Client Accounting Estimates",
      type: "table",
      content: {
        type: "table",
        title: "Significant Estimates",
        headers: ["Estimate", "Details"],
        rows: [
          { cells: ["Allowance for doubtful accounts", "Based on aging analysis; 5% of receivables aged 60-90 days, 15% over 90 days"] },
          { cells: ["Goodwill impairment", "Management concluded no impairment; used discounted cash flow model with 8% discount rate"] },
          { cells: ["Warranty liability", "2% of sales based on historical experience; experience has been consistent 5 years"] },
          { cells: ["Pension obligation", "Determined by actuary using discount rate of 4% (current rates are 5%)"] },
          { cells: ["Inventory obsolescence", "10% reserve on items with no sales activity in 12 months; new product line launched"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-allowance",
      order: 1,
      type: "dropdown",
      label: "Doubtful accounts - Evaluate methodology",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-test-method",
      },
      explanation: "Should test reasonableness of percentages by comparing to actual write-offs",
      dropdownOptions: [
        { id: "opt-accept", order: 1, text: "Accept - standard methodology", isCorrect: false },
        { id: "opt-test-method", order: 2, text: "Test percentages against actual historical loss rates", isCorrect: true },
        { id: "opt-recalc-only", order: 3, text: "Recalculate and accept if mathematically correct", isCorrect: false },
      ],
    },
    {
      id: "req-goodwill",
      order: 2,
      type: "dropdown",
      label: "Goodwill - Evaluate discount rate assumption",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-evaluate-rate",
      },
      explanation: "Must evaluate whether discount rate is appropriate for company's risk",
      dropdownOptions: [
        { id: "opt-accept-rate", order: 1, text: "Accept - within normal range", isCorrect: false },
        { id: "opt-evaluate-rate", order: 2, text: "Evaluate appropriateness for company's risk profile", isCorrect: true },
        { id: "opt-use-specialist", order: 3, text: "Automatically engage valuation specialist", isCorrect: false },
      ],
    },
    {
      id: "req-warranty",
      order: 3,
      type: "dropdown",
      label: "Warranty - Level of risk concern",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-lower-risk",
      },
      explanation: "Consistent historical experience and simple methodology = lower estimation risk",
      dropdownOptions: [
        { id: "opt-high-risk", order: 1, text: "High risk - requires significant testing", isCorrect: false },
        { id: "opt-lower-risk", order: 2, text: "Lower risk - consistent history supports estimate", isCorrect: true },
        { id: "opt-no-test", order: 3, text: "No testing needed - immaterial estimate", isCorrect: false },
      ],
    },
    {
      id: "req-pension",
      order: 4,
      type: "dropdown",
      label: "Pension - Appropriate response to rate difference",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-evaluate-bias",
      },
      explanation: "Lower discount rate increases liability - evaluate if management bias exists",
      dropdownOptions: [
        { id: "opt-accept-actuary", order: 1, text: "Accept - actuary is specialist", isCorrect: false },
        { id: "opt-evaluate-bias", order: 2, text: "Evaluate rate selection for potential management bias", isCorrect: true },
        { id: "opt-require-market", order: 3, text: "Require use of current market rate", isCorrect: false },
      ],
    },
    {
      id: "req-inventory-obs",
      order: 5,
      type: "dropdown",
      label: "Inventory obsolescence - New product line impact",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-consider-new",
      },
      explanation: "New product line may accelerate obsolescence of existing products",
      dropdownOptions: [
        { id: "opt-accept-hist", order: 1, text: "Accept - historical basis is appropriate", isCorrect: false },
        { id: "opt-consider-new", order: 2, text: "Consider if new products accelerate existing obsolescence", isCorrect: true },
        { id: "opt-increase-res", order: 3, text: "Automatically require increase in reserve", isCorrect: false },
      ],
    },
    {
      id: "req-overall-approach",
      order: 6,
      type: "dropdown",
      label: "General approach to testing estimates",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-combination",
      },
      explanation: "Standards allow combination of approaches based on circumstances",
      dropdownOptions: [
        { id: "opt-develop-own", order: 1, text: "Always develop independent estimate", isCorrect: false },
        { id: "opt-test-process", order: 2, text: "Only test management's process", isCorrect: false },
        { id: "opt-combination", order: 3, text: "Use combination of approaches based on risk", isCorrect: true },
      ],
    },
  ],
};

// =============================================================================
// PROSPECTIVE FINANCIAL STATEMENTS - Important Topic
// =============================================================================

export const audProspectiveFinancialsTBS: TBSQuestion = {
  id: "tbs-aud-039",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Prospective Financial Statements",
  subtopic: "Examination and Compilation",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-IV",
  title: "Prospective Financial Statement Engagements",
  scenarioText: `Evaluate requirements and reporting for engagements involving prospective financial statements (forecasts and projections).`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-types",
      order: 1,
      title: "Prospective Statement Types",
      type: "text",
      content: {
        type: "text",
        title: "Forecasts vs. Projections",
        paragraphs: [
          "Forecast: Based on expected conditions and expected course of action",
          "Projection: Based on hypothetical assumptions (what-if scenarios)",
          "Forecasts may be for general or limited use",
          "Projections should be restricted to parties with direct knowledge of assumptions",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-forecast-use",
      order: 1,
      type: "dropdown",
      label: "Who can receive a financial forecast?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-general-use",
      },
      explanation: "Forecasts can be for general use",
      dropdownOptions: [
        { id: "opt-general-use", order: 1, text: "General use - any third party", isCorrect: true },
        { id: "opt-limited-only", order: 2, text: "Limited use - only specified parties", isCorrect: false },
        { id: "opt-internal-only", order: 3, text: "Internal use only", isCorrect: false },
      ],
    },
    {
      id: "req-projection-use",
      order: 2,
      type: "dropdown",
      label: "Who can receive a financial projection?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-limited-proj",
      },
      explanation: "Projections should be restricted to parties who understand hypothetical assumptions",
      dropdownOptions: [
        { id: "opt-general-proj", order: 1, text: "General use - any third party", isCorrect: false },
        { id: "opt-limited-proj", order: 2, text: "Limited use - parties with direct knowledge of assumptions", isCorrect: true },
        { id: "opt-no-restriction", order: 3, text: "No use restrictions", isCorrect: false },
      ],
    },
    {
      id: "req-exam-assurance",
      order: 3,
      type: "dropdown",
      label: "Assurance level for examination of forecast",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-limited-exam",
      },
      explanation: "Examination provides limited assurance that assumptions are reasonable",
      dropdownOptions: [
        { id: "opt-reasonable-exam", order: 1, text: "Reasonable assurance results will occur", isCorrect: false },
        { id: "opt-limited-exam", order: 2, text: "Limited assurance assumptions are reasonable", isCorrect: true },
        { id: "opt-no-assurance-exam", order: 3, text: "No assurance", isCorrect: false },
      ],
    },
    {
      id: "req-compilation-prosp",
      order: 4,
      type: "dropdown",
      label: "Can prospective financials be compiled?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-compile",
      },
      explanation: "Compilation of prospective financials is permitted (no assurance)",
      dropdownOptions: [
        { id: "opt-yes-compile", order: 1, text: "Yes - compilation provides no assurance", isCorrect: true },
        { id: "opt-no-compile", order: 2, text: "No - only examination is permitted", isCorrect: false },
        { id: "opt-audit-only", order: 3, text: "No - must be audited", isCorrect: false },
      ],
    },
    {
      id: "req-agreed-upon",
      order: 5,
      type: "dropdown",
      label: "Can agreed-upon procedures be performed?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-aup",
      },
      explanation: "Agreed-upon procedures can be performed on prospective financials",
      dropdownOptions: [
        { id: "opt-yes-aup", order: 1, text: "Yes - with specified parties", isCorrect: true },
        { id: "opt-no-aup", order: 2, text: "No - not permitted for prospective statements", isCorrect: false },
        { id: "opt-exam-only", order: 3, text: "No - examination required instead", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// INTEGRATED AUDIT - Important Topic
// =============================================================================

export const audIntegratedAuditTBS: TBSQuestion = {
  id: "tbs-aud-040",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Integrated Audit",
  subtopic: "ICFR Testing",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "AUD-II",
  title: "Integrated Audit - ICFR Requirements",
  scenarioText: `You are performing an integrated audit of a public company. Evaluate the requirements for testing internal control over financial reporting (ICFR).`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-integrated-info",
      order: 1,
      title: "Integrated Audit Requirements",
      type: "text",
      content: {
        type: "text",
        title: "PCAOB Requirements for Integrated Audits",
        paragraphs: [
          "Must express opinion on ICFR as of year-end",
          "Must identify and test controls over relevant assertions for significant accounts",
          "Must evaluate design and operating effectiveness of controls",
          "Must test company-level controls including controls over management override",
          "Material weakness = adverse opinion on ICFR",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-separate-opinion",
      order: 1,
      type: "dropdown",
      label: "Can ICFR opinion differ from F/S opinion?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-differ",
      },
      explanation: "ICFR and F/S opinions are separate; can have different modifications",
      dropdownOptions: [
        { id: "opt-yes-differ", order: 1, text: "Yes - separate opinions may differ", isCorrect: true },
        { id: "opt-must-match", order: 2, text: "No - must be the same opinion type", isCorrect: false },
        { id: "opt-combined", order: 3, text: "No - combined into single opinion", isCorrect: false },
      ],
    },
    {
      id: "req-mw-impact",
      order: 2,
      type: "dropdown",
      label: "Impact of material weakness on ICFR opinion",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-adverse-icfr",
      },
      explanation: "Material weakness requires adverse opinion on ICFR",
      dropdownOptions: [
        { id: "opt-qualified-icfr", order: 1, text: "Qualified opinion on ICFR", isCorrect: false },
        { id: "opt-adverse-icfr", order: 2, text: "Adverse opinion on ICFR", isCorrect: true },
        { id: "opt-unmod-eom", order: 3, text: "Unmodified with Emphasis of Matter", isCorrect: false },
      ],
    },
    {
      id: "req-mw-fs-impact",
      order: 3,
      type: "dropdown",
      label: "Impact of material weakness on F/S opinion",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-depends-fs",
      },
      explanation: "F/S opinion depends on whether misstatement exists, not presence of weakness",
      dropdownOptions: [
        { id: "opt-also-adverse", order: 1, text: "Must also be adverse", isCorrect: false },
        { id: "opt-depends-fs", order: 2, text: "Depends on whether F/S are misstated", isCorrect: true },
        { id: "opt-must-qualify", order: 3, text: "Must be qualified at minimum", isCorrect: false },
      ],
    },
    {
      id: "req-sd-communication",
      order: 4,
      type: "dropdown",
      label: "Communication of significant deficiency",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-writing-sd",
      },
      explanation: "Significant deficiencies must be communicated in writing to management and audit committee",
      dropdownOptions: [
        { id: "opt-oral-sd", order: 1, text: "Oral communication sufficient", isCorrect: false },
        { id: "opt-writing-sd", order: 2, text: "Written communication required", isCorrect: true },
        { id: "opt-not-req-sd", order: 3, text: "Not required to communicate", isCorrect: false },
      ],
    },
    {
      id: "req-walkthrough",
      order: 5,
      type: "dropdown",
      label: "Walkthrough requirement in integrated audit",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-required-walk",
      },
      explanation: "Walkthroughs are required for each significant process in integrated audits",
      dropdownOptions: [
        { id: "opt-optional-walk", order: 1, text: "Optional - auditor judgment", isCorrect: false },
        { id: "opt-required-walk", order: 2, text: "Required for each significant process", isCorrect: true },
        { id: "opt-sample-walk", order: 3, text: "Required for sample of processes", isCorrect: false },
      ],
    },
    {
      id: "req-mgmt-testing",
      order: 6,
      type: "dropdown",
      label: "Using management's testing of controls",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-some-reliance",
      },
      explanation: "Can use management's testing but with limitations based on risk",
      dropdownOptions: [
        { id: "opt-no-reliance", order: 1, text: "Cannot use management's testing", isCorrect: false },
        { id: "opt-some-reliance", order: 2, text: "May use with limitations based on control risk", isCorrect: true },
        { id: "opt-full-reliance", order: 3, text: "Can fully rely if competent and objective", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// ADDITIONAL AUD TBS (tbs-aud-041 through tbs-aud-061) - Phase 2 Expansion
// =============================================================================

export const audConfirmationsTBS: TBSQuestion = {
  id: "tbs-aud-041",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Audit Evidence",
  subtopic: "External Confirmations",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "External Confirmation Procedures",
  scenarioText: `You are planning confirmation procedures for Riverside Manufacturing's year-end audit. The following accounts and circumstances require evaluation:

1. Accounts Receivable: $4.2 million across 850 customers. Top 50 customers represent 65% of balance.

2. Bank Accounts: Company has 8 bank accounts including 2 foreign currency accounts.

3. Accounts Payable: $1.8 million. Management suggests confirming suppliers instead of using alternative procedures.

4. Legal Matters: Company is defendant in 3 lawsuits; plaintiff in 2 lawsuits.

5. Related Party Receivable: $500,000 due from company owned by CEO's brother.

Required: Determine appropriate confirmation procedures for each area.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-confirmation-guidance",
      order: 1,
      title: "Confirmation Guidance",
      type: "text",
      content: {
        type: "text",
        title: "AU-C 505 External Confirmations",
        paragraphs: [
          "External confirmations provide audit evidence obtained as a direct written response from a third party.",
          "The auditor should maintain control over confirmation requests, including determining information to be confirmed and selecting the appropriate confirming party.",
          "Positive confirmations request the confirming party to respond in all cases. Negative confirmations request response only if the information is incorrect.",
          "For accounts receivable, positive confirmations are generally more reliable than negative confirmations.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-ar-approach",
      order: 1,
      type: "dropdown",
      label: "Accounts Receivable - Most appropriate approach",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ar-stratified",
      },
      explanation: "Stratified sampling focusing on large balances is most efficient given concentration",
      dropdownOptions: [
        { id: "opt-ar-stratified", order: 1, text: "Positive confirmations - stratified sample emphasizing large balances", isCorrect: true },
        { id: "opt-ar-negative", order: 2, text: "Negative confirmations to all customers", isCorrect: false },
        { id: "opt-ar-random", order: 3, text: "Simple random sample of all customers", isCorrect: false },
        { id: "opt-ar-skip", order: 4, text: "Skip confirmations - use alternative procedures only", isCorrect: false },
      ],
    },
    {
      id: "req-bank-confirm",
      order: 2,
      type: "dropdown",
      label: "Bank Accounts - Confirmation requirement",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-bank-all",
      },
      explanation: "All bank accounts should be confirmed, including zero balance and foreign accounts",
      dropdownOptions: [
        { id: "opt-bank-all", order: 1, text: "Confirm all 8 accounts", isCorrect: true },
        { id: "opt-bank-material", order: 2, text: "Confirm only material balance accounts", isCorrect: false },
        { id: "opt-bank-domestic", order: 3, text: "Confirm domestic accounts only", isCorrect: false },
        { id: "opt-bank-sample", order: 4, text: "Sample of accounts based on risk", isCorrect: false },
      ],
    },
    {
      id: "req-ap-procedure",
      order: 3,
      type: "dropdown",
      label: "Accounts Payable - Best audit approach",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ap-alternative",
      },
      explanation: "AP confirmations are less effective than alternative procedures due to understatement risk",
      dropdownOptions: [
        { id: "opt-ap-confirm", order: 1, text: "Confirm as management suggests", isCorrect: false },
        { id: "opt-ap-alternative", order: 2, text: "Alternative procedures (vendor statements, subsequent payments) preferred", isCorrect: true },
        { id: "opt-ap-both", order: 3, text: "Both confirmations and alternative procedures required", isCorrect: false },
      ],
    },
    {
      id: "req-legal-inquiry",
      order: 4,
      type: "dropdown",
      label: "Legal Matters - Attorney letter scope",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-legal-all",
      },
      explanation: "Attorney letters should cover all litigation matters, both as defendant and plaintiff",
      dropdownOptions: [
        { id: "opt-legal-defendant", order: 1, text: "Only matters where company is defendant", isCorrect: false },
        { id: "opt-legal-all", order: 2, text: "All litigation matters (defendant and plaintiff)", isCorrect: true },
        { id: "opt-legal-material", order: 3, text: "Only matters exceeding materiality", isCorrect: false },
      ],
    },
    {
      id: "req-related-party",
      order: 5,
      type: "dropdown",
      label: "Related Party Receivable - Appropriate procedure",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rp-confirm-plus",
      },
      explanation: "Related party transactions require confirmation plus additional procedures due to higher risk",
      dropdownOptions: [
        { id: "opt-rp-standard", order: 1, text: "Standard positive confirmation only", isCorrect: false },
        { id: "opt-rp-confirm-plus", order: 2, text: "Confirmation plus review of supporting documentation and terms", isCorrect: true },
        { id: "opt-rp-skip", order: 3, text: "Skip confirmation - review board minutes only", isCorrect: false },
      ],
    },
    {
      id: "req-nonresponse",
      order: 6,
      type: "dropdown",
      label: "If AR confirmation requests go unanswered, the auditor should",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-nonresp-alternative",
      },
      explanation: "Non-responses require alternative audit procedures to obtain sufficient evidence",
      dropdownOptions: [
        { id: "opt-nonresp-accept", order: 1, text: "Accept the recorded balance without further work", isCorrect: false },
        { id: "opt-nonresp-alternative", order: 2, text: "Perform alternative procedures (cash receipts, shipping docs)", isCorrect: true },
        { id: "opt-nonresp-qualify", order: 3, text: "Issue a qualified opinion for scope limitation", isCorrect: false },
      ],
    },
  ],
};

export const audAuditPlanningTBS: TBSQuestion = {
  id: "tbs-aud-042",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Planning",
  subtopic: "Audit Strategy and Planning",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-II",
  title: "Audit Planning and Risk Assessment",
  scenarioText: `You are planning the audit of TechStart Inc., a software company with the following characteristics:

Financial Information:
• Total revenues: $50,000,000
• Total assets: $35,000,000
• Net income before taxes: $4,500,000
• Total equity: $18,000,000

Prior Year Results:
• 3 audit adjustments totaling $180,000
• 2 control deficiencies identified (not significant)
• Audit hours: 1,200

Current Year Considerations:
• New CFO hired 6 months ago
• Implemented new ERP system
• Revenue recognition policy change for SaaS products
• Going public via IPO next year

The firm uses these materiality benchmarks:
• 5% of income before taxes
• 0.5% of total revenues
• 1% of total assets

Required: Calculate planning materiality and assess key risk factors.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-benchmarks",
      order: 1,
      title: "Materiality Benchmarks",
      type: "table",
      content: {
        type: "table",
        title: "Common Materiality Benchmarks",
        headers: ["Benchmark", "Typical Range", "When Used"],
        rows: [
          { cells: ["Income before taxes", "3-5%", "Profitable, stable companies"] },
          { cells: ["Total revenues", "0.5-1%", "When income volatile or entity is nonprofit"] },
          { cells: ["Total assets", "0.5-1%", "Asset-based companies, financial institutions"] },
          { cells: ["Total equity", "1-2%", "When equity is key metric"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-mat-income",
      order: 1,
      type: "numeric",
      label: "Materiality based on 5% of income before taxes",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 225000,
        tolerance: 0,
      },
      explanation: "$4,500,000 × 5% = $225,000",
    },
    {
      id: "req-mat-revenue",
      order: 2,
      type: "numeric",
      label: "Materiality based on 0.5% of total revenues",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 250000,
        tolerance: 0,
      },
      explanation: "$50,000,000 × 0.5% = $250,000",
    },
    {
      id: "req-mat-assets",
      order: 3,
      type: "numeric",
      label: "Materiality based on 1% of total assets",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 350000,
        tolerance: 0,
      },
      explanation: "$35,000,000 × 1% = $350,000",
    },
    {
      id: "req-best-benchmark",
      order: 4,
      type: "dropdown",
      label: "Most appropriate benchmark for this engagement",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-bench-income",
      },
      explanation: "Income-based benchmark is appropriate for profitable companies; users focus on earnings",
      dropdownOptions: [
        { id: "opt-bench-income", order: 1, text: "Income before taxes - users focus on profitability", isCorrect: true },
        { id: "opt-bench-revenue", order: 2, text: "Revenue - more stable than income", isCorrect: false },
        { id: "opt-bench-assets", order: 3, text: "Assets - software company is asset-light", isCorrect: false },
      ],
    },
    {
      id: "req-performance-mat",
      order: 5,
      type: "numeric",
      label: "Performance materiality (assume 75% of overall materiality of $225,000)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 168750,
        tolerance: 100,
      },
      explanation: "$225,000 × 75% = $168,750",
    },
    {
      id: "req-risk-factor",
      order: 6,
      type: "dropdown",
      label: "Highest risk factor requiring increased audit attention",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-risk-revenue",
      },
      explanation: "Revenue recognition change for SaaS combined with IPO creates highest risk",
      dropdownOptions: [
        { id: "opt-risk-cfo", order: 1, text: "New CFO", isCorrect: false },
        { id: "opt-risk-erp", order: 2, text: "New ERP system", isCorrect: false },
        { id: "opt-risk-revenue", order: 3, text: "Revenue recognition policy change", isCorrect: true },
        { id: "opt-risk-prior", order: 4, text: "Prior year adjustments", isCorrect: false },
      ],
    },
    {
      id: "req-hours-impact",
      order: 7,
      type: "dropdown",
      label: "Expected impact on audit hours vs. prior year",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-hours-increase",
      },
      explanation: "New systems, policy changes, and IPO preparation significantly increase effort",
      dropdownOptions: [
        { id: "opt-hours-decrease", order: 1, text: "Decrease - new ERP improves controls", isCorrect: false },
        { id: "opt-hours-same", order: 2, text: "Same - factors offset each other", isCorrect: false },
        { id: "opt-hours-increase", order: 3, text: "Significant increase - multiple risk factors", isCorrect: true },
      ],
    },
  ],
};

export const audInventoryObservationTBS: TBSQuestion = {
  id: "tbs-aud-043",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Audit Evidence",
  subtopic: "Inventory Procedures",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Inventory Observation Procedures",
  scenarioText: `You are planning inventory observation procedures for Wholesale Distributors Inc. The company has the following inventory profile:

Inventory Locations:
• Main warehouse: $8,500,000 (counted December 31)
• Regional warehouse A: $2,200,000 (counted December 28)
• Regional warehouse B: $1,800,000 (counted January 2)
• Consignment inventory at 15 customer locations: $900,000
• Inventory in transit: $600,000

Special Circumstances:
• Main warehouse uses cycle counting throughout the year
• Some inventory items require specialist to identify (electronics components)
• Management uses an outside inventory service for physical count
• Company uses perpetual inventory system with periodic adjustments

Required: Determine appropriate audit procedures for each situation.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-inv-guidance",
      order: 1,
      title: "Inventory Observation Standards",
      type: "text",
      content: {
        type: "text",
        title: "AU-C 501 - Inventory",
        paragraphs: [
          "If inventory is material, the auditor should obtain sufficient appropriate audit evidence regarding existence and condition by attending physical inventory counting.",
          "If count occurs other than year-end, auditor should perform procedures on transactions between count date and year-end.",
          "When inventory is held by third parties, direct confirmation and/or inspection may be required based on materiality and risk.",
          "The auditor may use the work of management's specialist but must evaluate competence and objectivity.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-main-warehouse",
      order: 1,
      type: "dropdown",
      label: "Main warehouse - Required procedures",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-main-observe",
      },
      explanation: "Material location at year-end requires observation and test counts",
      dropdownOptions: [
        { id: "opt-main-observe", order: 1, text: "Observe count, perform test counts, evaluate procedures", isCorrect: true },
        { id: "opt-main-rely", order: 2, text: "Rely on cycle counts without observation", isCorrect: false },
        { id: "opt-main-confirm", order: 3, text: "Confirm with warehouse manager only", isCorrect: false },
      ],
    },
    {
      id: "req-regional-a",
      order: 2,
      type: "dropdown",
      label: "Regional A (counted Dec 28) - Additional procedures needed",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rega-rollforward",
      },
      explanation: "Count before year-end requires roll-forward procedures for transactions Dec 28-31",
      dropdownOptions: [
        { id: "opt-rega-none", order: 1, text: "None - December 28 is close enough", isCorrect: false },
        { id: "opt-rega-rollforward", order: 2, text: "Test roll-forward of receipts and shipments Dec 28-31", isCorrect: true },
        { id: "opt-rega-recount", order: 3, text: "Request complete recount at year-end", isCorrect: false },
      ],
    },
    {
      id: "req-regional-b",
      order: 3,
      type: "dropdown",
      label: "Regional B (counted Jan 2) - Additional procedures needed",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-regb-rollback",
      },
      explanation: "Count after year-end requires roll-back procedures for transactions Jan 1-2",
      dropdownOptions: [
        { id: "opt-regb-none", order: 1, text: "None - January 2 is close enough", isCorrect: false },
        { id: "opt-regb-rollback", order: 2, text: "Test roll-back of receipts and shipments Jan 1-2", isCorrect: true },
        { id: "opt-regb-confirm", order: 3, text: "Confirm counts with regional manager", isCorrect: false },
      ],
    },
    {
      id: "req-consignment",
      order: 4,
      type: "dropdown",
      label: "Consignment inventory ($900K) - Most appropriate procedure",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-consign-confirm",
      },
      explanation: "Third-party held inventory requires confirmation; physical inspection for high-risk items",
      dropdownOptions: [
        { id: "opt-consign-confirm", order: 1, text: "Confirm quantities with consignees, inspect high-value items", isCorrect: true },
        { id: "opt-consign-accept", order: 2, text: "Accept management's records without confirmation", isCorrect: false },
        { id: "opt-consign-all-inspect", order: 3, text: "Physical inspection at all 15 locations required", isCorrect: false },
      ],
    },
    {
      id: "req-specialist",
      order: 5,
      type: "dropdown",
      label: "Electronics requiring specialist - Auditor's responsibility",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-spec-evaluate",
      },
      explanation: "Auditor may use specialist but must evaluate their competence, objectivity, and work",
      dropdownOptions: [
        { id: "opt-spec-rely", order: 1, text: "Fully rely on specialist identification", isCorrect: false },
        { id: "opt-spec-evaluate", order: 2, text: "Use specialist but evaluate competence and review work", isCorrect: true },
        { id: "opt-spec-own", order: 3, text: "Auditor must identify all items personally", isCorrect: false },
      ],
    },
    {
      id: "req-service-org",
      order: 6,
      type: "dropdown",
      label: "Outside inventory service - Auditor's responsibility",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-svc-supervise",
      },
      explanation: "Auditor should observe the service organization's count procedures and test counts",
      dropdownOptions: [
        { id: "opt-svc-accept", order: 1, text: "Accept service organization's counts without testing", isCorrect: false },
        { id: "opt-svc-supervise", order: 2, text: "Observe service's procedures and perform independent test counts", isCorrect: true },
        { id: "opt-svc-replace", order: 3, text: "Require client to use internal staff instead", isCorrect: false },
      ],
    },
  ],
};

export const audManagementRepsTBS: TBSQuestion = {
  id: "tbs-aud-044",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Audit Evidence",
  subtopic: "Written Representations",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-III",
  title: "Management Representation Letter Evaluation",
  scenarioText: `You are reviewing the management representation letter for Apex Industries for the December 31, Year 1 audit. The following situations have arisen:

1. The CFO wants to date the letter December 31, Year 1 instead of the report date.

2. The CEO is willing to sign but the CFO (who is new) refuses to sign, stating she wasn't employed for most of Year 1.

3. Management wants to add: "To the best of our knowledge and belief" before all representations.

4. The controller asks to remove the representation about related party transactions, stating there are none.

5. Management wants to exclude the representation about fraud, claiming it's offensive to include.

6. The letter includes: "We have provided you with all minutes of board meetings" but you know the November meeting minutes haven't been finalized.

Required: Evaluate each situation and determine the appropriate auditor response.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-rep-letter",
      order: 1,
      title: "Representation Letter Requirements",
      type: "text",
      content: {
        type: "text",
        title: "AU-C 580 Written Representations",
        paragraphs: [
          "The representation letter should be dated as of the date of the auditor's report.",
          "Representations should be obtained from management with appropriate responsibilities - typically CEO and CFO.",
          "Required representations include: fair presentation, completeness of information, fraud, related parties, subsequent events, and uncorrected misstatements.",
          "If management refuses to provide required representations, it constitutes a scope limitation.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-date-issue",
      order: 1,
      type: "dropdown",
      label: "Dating the letter December 31 instead of report date",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-date-reject",
      },
      explanation: "Letter must be dated as of the auditor's report date to cover subsequent events period",
      dropdownOptions: [
        { id: "opt-date-accept", order: 1, text: "Accept - covers the period being audited", isCorrect: false },
        { id: "opt-date-reject", order: 2, text: "Reject - must be dated as of auditor's report date", isCorrect: true },
        { id: "opt-date-dual", order: 3, text: "Accept dual-dated letter", isCorrect: false },
      ],
    },
    {
      id: "req-cfo-refuse",
      order: 2,
      type: "dropdown",
      label: "New CFO refuses to sign",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cfo-require",
      },
      explanation: "CFO must sign regardless of tenure; responsible for financial statements at issuance",
      dropdownOptions: [
        { id: "opt-cfo-accept", order: 1, text: "Accept - CEO signature is sufficient", isCorrect: false },
        { id: "opt-cfo-require", order: 2, text: "Require CFO signature - she is currently responsible", isCorrect: true },
        { id: "opt-cfo-former", order: 3, text: "Obtain signature from former CFO instead", isCorrect: false },
      ],
    },
    {
      id: "req-knowledge-belief",
      order: 3,
      type: "dropdown",
      label: "Adding 'to the best of our knowledge and belief' to all representations",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-kb-some",
      },
      explanation: "This qualifier is appropriate only for representations involving matters not directly determinable",
      dropdownOptions: [
        { id: "opt-kb-accept", order: 1, text: "Accept for all representations", isCorrect: false },
        { id: "opt-kb-reject", order: 2, text: "Reject for all representations", isCorrect: false },
        { id: "opt-kb-some", order: 3, text: "Accept only for belief-based representations, not factual ones", isCorrect: true },
      ],
    },
    {
      id: "req-related-party",
      order: 4,
      type: "dropdown",
      label: "Removing related party representation because 'there are none'",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rp-keep",
      },
      explanation: "Representation that there are no related party transactions IS the required representation",
      dropdownOptions: [
        { id: "opt-rp-remove", order: 1, text: "Remove - representation not needed if no related parties", isCorrect: false },
        { id: "opt-rp-keep", order: 2, text: "Keep - the statement that there are none IS the representation", isCorrect: true },
        { id: "opt-rp-modify", order: 3, text: "Modify to state 'not applicable'", isCorrect: false },
      ],
    },
    {
      id: "req-fraud-rep",
      order: 5,
      type: "dropdown",
      label: "Excluding fraud representation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fraud-scope",
      },
      explanation: "Fraud representation is required; refusal is a scope limitation requiring modified opinion",
      dropdownOptions: [
        { id: "opt-fraud-remove", order: 1, text: "Remove if management is offended", isCorrect: false },
        { id: "opt-fraud-scope", order: 2, text: "Refusal to provide is scope limitation - consider withdrawal", isCorrect: true },
        { id: "opt-fraud-soften", order: 3, text: "Soften the language to satisfy management", isCorrect: false },
      ],
    },
    {
      id: "req-minutes",
      order: 6,
      type: "dropdown",
      label: "Minutes representation when November minutes not finalized",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-min-modify",
      },
      explanation: "Representation must be accurate; modify to note draft minutes were provided",
      dropdownOptions: [
        { id: "opt-min-accept", order: 1, text: "Accept as written - minor issue", isCorrect: false },
        { id: "opt-min-modify", order: 2, text: "Modify to indicate draft November minutes provided", isCorrect: true },
        { id: "opt-min-wait", order: 3, text: "Delay report until minutes finalized", isCorrect: false },
      ],
    },
  ],
};

export const audEthicsViolationsTBS: TBSQuestion = {
  id: "tbs-aud-045",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Ethics and Independence",
  subtopic: "Independence Violations",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "AUD-I",
  title: "Independence Threat Evaluation",
  scenarioText: `Your firm audits several public and non-public clients. Evaluate the following situations for independence implications:

1. Staff auditor holds 100 shares of stock ($2,500 value) in audit client TechCo, a public company. The auditor is not on the TechCo engagement.

2. Audit manager's spouse is the accounts payable supervisor at audit client Midwest Manufacturing (non-issuer).

3. Your firm provided tax return preparation services to Retail Corp (non-issuer) and now has been asked to audit them.

4. Partner received a gift of football season tickets (value $3,000) from the CFO of audit client Metro Services.

5. Audit senior's brother is the internal audit director at client Financial Services Inc. (SEC registrant).

6. Your firm is owed $85,000 in unpaid fees from audit client for services rendered over 1 year ago. Current year audit fee is $120,000.

Required: Evaluate independence for each situation.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-independence-rules",
      order: 1,
      title: "Independence Framework",
      type: "text",
      content: {
        type: "text",
        title: "AICPA Code & SEC Rules Summary",
        paragraphs: [
          "Direct financial interest by any covered member impairs independence regardless of materiality.",
          "Immediate family members of covered members in key positions at client impair independence.",
          "For non-issuers, tax preparation services are generally permitted with proper safeguards.",
          "Gifts that are not clearly insignificant impair independence.",
          "Unpaid fees exceeding one year may be considered a loan, impairing independence.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-stock-ownership",
      order: 1,
      type: "dropdown",
      label: "Staff auditor owning client stock (not on engagement)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-stock-impaired",
      },
      explanation: "For SEC registrants, any professional employee's direct financial interest impairs firm independence",
      dropdownOptions: [
        { id: "opt-stock-ok", order: 1, text: "No impairment - auditor not on engagement", isCorrect: false },
        { id: "opt-stock-impaired", order: 2, text: "Independence impaired - must divest or firm cannot audit", isCorrect: true },
        { id: "opt-stock-immaterial", order: 3, text: "No impairment - amount is immaterial", isCorrect: false },
      ],
    },
    {
      id: "req-spouse-position",
      order: 2,
      type: "dropdown",
      label: "Manager's spouse as AP supervisor at non-issuer client",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-spouse-impaired",
      },
      explanation: "Spouse in accounting role at client impairs independence; manager cannot serve on engagement",
      dropdownOptions: [
        { id: "opt-spouse-ok", order: 1, text: "No impairment - AP supervisor is not a key position", isCorrect: false },
        { id: "opt-spouse-impaired", order: 2, text: "Impaired - manager must be removed from engagement", isCorrect: true },
        { id: "opt-spouse-safeguard", order: 3, text: "Apply safeguards and manager can remain", isCorrect: false },
      ],
    },
    {
      id: "req-tax-services",
      order: 3,
      type: "dropdown",
      label: "Tax services to non-issuer, now asked to audit",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-tax-ok",
      },
      explanation: "Tax preparation is generally permitted for non-issuers with proper safeguards",
      dropdownOptions: [
        { id: "opt-tax-impaired", order: 1, text: "Cannot audit - self-review threat", isCorrect: false },
        { id: "opt-tax-ok", order: 2, text: "Can audit - tax services permitted for non-issuers with safeguards", isCorrect: true },
        { id: "opt-tax-wait", order: 3, text: "Must wait one year before accepting audit", isCorrect: false },
      ],
    },
    {
      id: "req-gift",
      order: 4,
      type: "dropdown",
      label: "Partner receiving $3,000 football tickets from client CFO",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-gift-impaired",
      },
      explanation: "Gift is not clearly insignificant; accepting impairs independence",
      dropdownOptions: [
        { id: "opt-gift-ok", order: 1, text: "Acceptable - normal business courtesy", isCorrect: false },
        { id: "opt-gift-impaired", order: 2, text: "Impairs independence - must decline or return", isCorrect: true },
        { id: "opt-gift-disclose", order: 3, text: "Acceptable if disclosed to other partners", isCorrect: false },
      ],
    },
    {
      id: "req-brother-ia",
      order: 5,
      type: "dropdown",
      label: "Senior's brother is internal audit director at SEC client",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-brother-remove",
      },
      explanation: "Close family member in key audit-sensitive role; senior must be removed from engagement",
      dropdownOptions: [
        { id: "opt-brother-ok", order: 1, text: "No issue - sibling not immediate family", isCorrect: false },
        { id: "opt-brother-remove", order: 2, text: "Senior must be removed from the engagement", isCorrect: true },
        { id: "opt-brother-firm", order: 3, text: "Firm independence impaired - must resign", isCorrect: false },
      ],
    },
    {
      id: "req-unpaid-fees",
      order: 6,
      type: "dropdown",
      label: "Unpaid fees over 1 year ($85K of $120K current fee)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fees-loan",
      },
      explanation: "Fees outstanding over one year treated as loan; impairs independence",
      dropdownOptions: [
        { id: "opt-fees-ok", order: 1, text: "No impairment - business receivable, not a loan", isCorrect: false },
        { id: "opt-fees-loan", order: 2, text: "Impairs independence - treated as loan to client", isCorrect: true },
        { id: "opt-fees-threshold", order: 3, text: "No impairment - below current year fees", isCorrect: false },
      ],
    },
  ],
};

export const audTestsOfControlsTBS: TBSQuestion = {
  id: "tbs-aud-046",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Internal Control",
  subtopic: "Tests of Controls",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Tests of Controls - Sample Size and Evaluation",
  scenarioText: `You are designing tests of controls for the revenue cycle at Sterling Corporation. The following information is available:

Control Being Tested: Credit approval for new customers over $10,000

Control Information:
• Population: 2,400 new customer credit approvals during the year
• Expected deviation rate: 1%
• Tolerable deviation rate: 5%
• Risk of overreliance: 5% (95% confidence)

Sample Results:
• Sample size selected: 100
• Deviations found: 3

Additional Information:
• Prior year testing found 1 deviation in 80 items tested
• Control is performed by one of three credit analysts
• IT general controls over the credit approval system are effective

Required: Evaluate the test of controls results and determine the impact on the audit approach.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-sample-tables",
      order: 1,
      title: "Attribute Sampling Tables (Excerpts)",
      type: "table",
      content: {
        type: "table",
        title: "Upper Deviation Rate at 5% Risk of Overreliance",
        headers: ["Sample Size", "0 deviations", "1 deviation", "2 deviations", "3 deviations", "4 deviations"],
        rows: [
          { cells: ["60", "4.9%", "8.0%", "10.8%", "13.5%", "16.0%"] },
          { cells: ["80", "3.7%", "6.1%", "8.2%", "10.2%", "12.1%"] },
          { cells: ["100", "3.0%", "4.9%", "6.6%", "8.2%", "9.8%"] },
          { cells: ["120", "2.5%", "4.1%", "5.5%", "6.9%", "8.2%"] },
          { cells: ["150", "2.0%", "3.3%", "4.4%", "5.5%", "6.6%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-sample-deviation-rate",
      order: 1,
      type: "numeric",
      label: "Sample deviation rate (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3,
        tolerance: 0,
      },
      explanation: "Sample deviation rate = 3 ÷ 100 = 3%",
    },
    {
      id: "req-upper-deviation",
      order: 2,
      type: "numeric",
      label: "Upper deviation rate from table (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 8.2,
        tolerance: 0.1,
      },
      explanation: "From table: sample size 100, 3 deviations = 8.2%",
    },
    {
      id: "req-control-conclusion",
      order: 3,
      type: "dropdown",
      label: "Conclusion about control operating effectiveness",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-not-effective",
      },
      explanation: "Upper deviation rate (8.2%) exceeds tolerable rate (5%); cannot rely on control",
      dropdownOptions: [
        { id: "opt-effective", order: 1, text: "Control is operating effectively", isCorrect: false },
        { id: "opt-not-effective", order: 2, text: "Control is not operating effectively", isCorrect: true },
        { id: "opt-inconclusive", order: 3, text: "Results are inconclusive", isCorrect: false },
      ],
    },
    {
      id: "req-substantive-impact",
      order: 4,
      type: "dropdown",
      label: "Impact on substantive procedures for revenue",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-increase-sub",
      },
      explanation: "Cannot rely on control; must increase substantive testing",
      dropdownOptions: [
        { id: "opt-no-change", order: 1, text: "No change - control testing is separate", isCorrect: false },
        { id: "opt-increase-sub", order: 2, text: "Increase nature, timing, or extent of substantive procedures", isCorrect: true },
        { id: "opt-decrease-sub", order: 3, text: "Decrease substantive procedures - deviations were minor", isCorrect: false },
      ],
    },
    {
      id: "req-prior-year-rate",
      order: 5,
      type: "numeric",
      label: "Prior year sample deviation rate (%) - 1 in 80",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1.25,
        tolerance: 0.05,
      },
      explanation: "Prior year rate = 1 ÷ 80 = 1.25%",
    },
    {
      id: "req-trend",
      order: 6,
      type: "dropdown",
      label: "What does the year-over-year trend indicate?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-deteriorating",
      },
      explanation: "Deviation rate increased from 1.25% to 3%; control may be deteriorating",
      dropdownOptions: [
        { id: "opt-improving", order: 1, text: "Control is improving", isCorrect: false },
        { id: "opt-stable", order: 2, text: "Control is stable", isCorrect: false },
        { id: "opt-deteriorating", order: 3, text: "Control may be deteriorating", isCorrect: true },
      ],
    },
  ],
};

export const audQualityControlTBS: TBSQuestion = {
  id: "tbs-aud-047",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Quality Control",
  subtopic: "Firm Quality Control Standards",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-I",
  title: "Quality Control System Evaluation",
  scenarioText: `You are evaluating the quality control policies of Anderson & Associates, a mid-sized CPA firm with 25 professionals. Review the following policies and practices:

1. Engagement Quality Reviews: Performed only for audits of SEC registrants and employee benefit plans.

2. Partner Rotation: Lead partner rotates every 7 years for all audit clients exceeding $500,000 in fees.

3. Independence Monitoring: Annual independence confirmations required; no monitoring between confirmations.

4. Acceptance Procedures: New client acceptance requires partner approval; no procedures for continuing clients.

5. Staff Assignment: Engagement partners assign staff based on availability and client location.

6. Consultation: Policy requires consultation on complex accounting issues but doesn't specify with whom.

7. Differences of Opinion: Policy states engagement partner's decision is final on all issues.

Required: Evaluate each policy for compliance with quality control standards.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-qc-standards",
      order: 1,
      title: "Quality Control Standards",
      type: "text",
      content: {
        type: "text",
        title: "SQCS No. 8 Elements",
        paragraphs: [
          "Leadership responsibilities for quality within the firm",
          "Relevant ethical requirements (including independence)",
          "Acceptance and continuance of client relationships",
          "Human resources (competence, capabilities, career development)",
          "Engagement performance (supervision, review, consultation)",
          "Monitoring of the quality control system",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-eqr-policy",
      order: 1,
      type: "dropdown",
      label: "Engagement quality review policy",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-eqr-ok",
      },
      explanation: "EQR required for SEC issuers and benefit plans; policy meets minimum requirements",
      dropdownOptions: [
        { id: "opt-eqr-deficient", order: 1, text: "Deficient - should include all audits", isCorrect: false },
        { id: "opt-eqr-ok", order: 2, text: "Compliant - meets required criteria for EQR", isCorrect: true },
        { id: "opt-eqr-expand", order: 3, text: "Should expand to include all reviews", isCorrect: false },
      ],
    },
    {
      id: "req-rotation-policy",
      order: 2,
      type: "dropdown",
      label: "Partner rotation policy (7 years, >$500K fees)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rotation-ok",
      },
      explanation: "For non-SEC issuers, this is a reasonable policy though SEC requires 5 years",
      dropdownOptions: [
        { id: "opt-rotation-deficient", order: 1, text: "Deficient - rotation required for all clients", isCorrect: false },
        { id: "opt-rotation-ok", order: 2, text: "Appropriate for non-SEC clients", isCorrect: true },
        { id: "opt-rotation-sec", order: 3, text: "Must be 5 years for all clients", isCorrect: false },
      ],
    },
    {
      id: "req-independence-monitor",
      order: 3,
      type: "dropdown",
      label: "Independence monitoring (annual only, no interim)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-indep-deficient",
      },
      explanation: "Should have ongoing monitoring procedures, not just annual confirmations",
      dropdownOptions: [
        { id: "opt-indep-ok", order: 1, text: "Adequate - annual is sufficient", isCorrect: false },
        { id: "opt-indep-deficient", order: 2, text: "Deficient - needs ongoing monitoring procedures", isCorrect: true },
        { id: "opt-indep-monthly", order: 3, text: "Must be monthly monitoring", isCorrect: false },
      ],
    },
    {
      id: "req-acceptance",
      order: 4,
      type: "dropdown",
      label: "Client acceptance/continuance procedures",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-accept-deficient",
      },
      explanation: "Must evaluate continuing client relationships, not just new clients",
      dropdownOptions: [
        { id: "opt-accept-ok", order: 1, text: "Adequate - new client procedures sufficient", isCorrect: false },
        { id: "opt-accept-deficient", order: 2, text: "Deficient - must also evaluate continuing clients", isCorrect: true },
        { id: "opt-accept-board", order: 3, text: "Requires board-level approval", isCorrect: false },
      ],
    },
    {
      id: "req-assignment",
      order: 5,
      type: "dropdown",
      label: "Staff assignment based on availability and location",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-assign-deficient",
      },
      explanation: "Assignments should consider competence and experience for engagement needs",
      dropdownOptions: [
        { id: "opt-assign-ok", order: 1, text: "Adequate - practical approach", isCorrect: false },
        { id: "opt-assign-deficient", order: 2, text: "Deficient - should consider competence and engagement needs", isCorrect: true },
        { id: "opt-assign-random", order: 3, text: "Should use random assignment", isCorrect: false },
      ],
    },
    {
      id: "req-consultation",
      order: 6,
      type: "dropdown",
      label: "Consultation policy (complex issues, unspecified consultants)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-consult-deficient",
      },
      explanation: "Should specify who to consult with and document conclusions",
      dropdownOptions: [
        { id: "opt-consult-ok", order: 1, text: "Adequate - requires consultation", isCorrect: false },
        { id: "opt-consult-deficient", order: 2, text: "Deficient - should specify consultation resources and documentation", isCorrect: true },
        { id: "opt-consult-all", order: 3, text: "Should consult on all issues", isCorrect: false },
      ],
    },
    {
      id: "req-differences",
      order: 7,
      type: "dropdown",
      label: "Differences of opinion (partner decision is final)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-diff-deficient",
      },
      explanation: "Must have process for resolving disagreements; report shouldn't issue until resolved",
      dropdownOptions: [
        { id: "opt-diff-ok", order: 1, text: "Adequate - clear decision authority", isCorrect: false },
        { id: "opt-diff-deficient", order: 2, text: "Deficient - needs formal resolution process before report issuance", isCorrect: true },
        { id: "opt-diff-vote", order: 3, text: "Should require partner vote", isCorrect: false },
      ],
    },
  ],
};

export const audITGeneralControlsTBS: TBSQuestion = {
  id: "tbs-aud-048",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Internal Control",
  subtopic: "IT General Controls",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "AUD-II",
  title: "IT General Controls Assessment",
  scenarioText: `You are evaluating IT general controls at DataFlow Systems Inc. as part of the integrated audit. The company uses the following IT environment:

Systems:
• Enterprise Resource Planning (ERP) for financials
• Separate Customer Relationship Management (CRM) system
• Automated interfaces between systems run nightly

During your walkthrough, you observe the following:

1. Access Controls: IT administrator has access to both system configuration and production data. Terminated employees' access is removed monthly.

2. Program Change Management: Developers can move code to production for urgent fixes with manager approval via email. Normal changes require testing in a separate environment.

3. Computer Operations: Batch jobs run automatically; operations staff can restart failed jobs without additional approval.

4. Backup and Recovery: Daily backups to local server; tested annually. No off-site copies.

5. System Development: Recent ERP upgrade was tested by the IT team; users signed off after go-live.

6. Physical Security: Server room has badge access; visitor log not maintained.

Required: Identify control deficiencies and their potential impact.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-itgc-categories",
      order: 1,
      title: "ITGC Categories",
      type: "text",
      content: {
        type: "text",
        title: "IT General Control Categories",
        paragraphs: [
          "Access to Programs and Data: Controls over who can access systems and data",
          "Program Changes: Controls over modifications to applications",
          "Program Development: Controls over new system implementation",
          "Computer Operations: Controls over processing, including job scheduling and backup",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-access-deficiency",
      order: 1,
      type: "dropdown",
      label: "IT admin with configuration and production access - Deficiency level",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-access-significant",
      },
      explanation: "Lack of segregation of duties is a significant deficiency - admin could make unauthorized changes",
      dropdownOptions: [
        { id: "opt-access-ok", order: 1, text: "No deficiency - normal for IT", isCorrect: false },
        { id: "opt-access-deficiency", order: 2, text: "Control deficiency - minor", isCorrect: false },
        { id: "opt-access-significant", order: 3, text: "Significant deficiency - inadequate segregation", isCorrect: true },
      ],
    },
    {
      id: "req-termination-deficiency",
      order: 2,
      type: "dropdown",
      label: "Terminated employee access removed monthly - Issue",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-term-deficiency",
      },
      explanation: "Monthly removal creates window for unauthorized access; should be immediate",
      dropdownOptions: [
        { id: "opt-term-ok", order: 1, text: "Adequate - monthly review is sufficient", isCorrect: false },
        { id: "opt-term-deficiency", order: 2, text: "Deficiency - access should be removed immediately upon termination", isCorrect: true },
        { id: "opt-term-weekly", order: 3, text: "Should be weekly, not monthly", isCorrect: false },
      ],
    },
    {
      id: "req-change-deficiency",
      order: 3,
      type: "dropdown",
      label: "Emergency changes via email approval - Issue",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-change-weak",
      },
      explanation: "Email approval with developer production access creates segregation and documentation issues",
      dropdownOptions: [
        { id: "opt-change-ok", order: 1, text: "Acceptable for emergencies", isCorrect: false },
        { id: "opt-change-weak", order: 2, text: "Weak control - needs independent migration and post-review", isCorrect: true },
        { id: "opt-change-none", order: 3, text: "Should never allow emergency changes", isCorrect: false },
      ],
    },
    {
      id: "req-backup-deficiency",
      order: 4,
      type: "dropdown",
      label: "Backups to local server only, no off-site copies - Risk",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-backup-significant",
      },
      explanation: "No off-site backup creates significant disaster recovery risk",
      dropdownOptions: [
        { id: "opt-backup-ok", order: 1, text: "Adequate - daily backup is sufficient", isCorrect: false },
        { id: "opt-backup-minor", order: 2, text: "Minor issue - annual testing covers risk", isCorrect: false },
        { id: "opt-backup-significant", order: 3, text: "Significant risk - disaster could destroy all data", isCorrect: true },
      ],
    },
    {
      id: "req-testing-deficiency",
      order: 5,
      type: "dropdown",
      label: "User sign-off after go-live instead of during testing",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-test-deficiency",
      },
      explanation: "User acceptance testing should occur before production deployment",
      dropdownOptions: [
        { id: "opt-test-ok", order: 1, text: "Acceptable - IT testing sufficient", isCorrect: false },
        { id: "opt-test-deficiency", order: 2, text: "Deficiency - user acceptance should precede go-live", isCorrect: true },
        { id: "opt-test-critical", order: 3, text: "Material weakness requiring restatement", isCorrect: false },
      ],
    },
    {
      id: "req-overall-impact",
      order: 6,
      type: "dropdown",
      label: "Overall impact on audit approach",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-impact-increase",
      },
      explanation: "ITGC weaknesses reduce ability to rely on automated controls; increase substantive testing",
      dropdownOptions: [
        { id: "opt-impact-none", order: 1, text: "No impact - ITGCs are separate from financial audit", isCorrect: false },
        { id: "opt-impact-increase", order: 2, text: "Increase substantive testing - cannot fully rely on automated controls", isCorrect: true },
        { id: "opt-impact-withdraw", order: 3, text: "Must withdraw from engagement", isCorrect: false },
      ],
    },
  ],
};

export const audSubstantiveAnalyticalTBS: TBSQuestion = {
  id: "tbs-aud-049",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Substantive Procedures",
  subtopic: "Substantive Analytical Procedures",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "AUD-III",
  title: "Substantive Analytical Procedures",
  scenarioText: `You are performing substantive analytical procedures on payroll expense for ValueMart Retail Stores. The company has 45 stores with consistent staffing models.

Available Data:
• Prior year payroll expense: $42,500,000
• Current year recorded payroll: $47,200,000
• Average hourly wage increase: 4%
• Store count: Increased from 42 to 45 (3 new stores opened mid-year)
• Average employees per store: 28 (unchanged)
• Average hours worked per employee: 1,850 annually

Auditor's Analysis:
• Expected wage increase impact: 4% × $42,500,000 = $1,700,000
• Expected new store impact: 3 stores × 0.5 year × 28 employees × 1,850 hours × $24/hour = $1,869,000

Required: Calculate the expected payroll and evaluate the recorded amount.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-payroll-data",
      order: 1,
      title: "Payroll Analysis",
      type: "table",
      content: {
        type: "table",
        title: "Payroll Data Summary",
        headers: ["Metric", "Prior Year", "Current Year"],
        rows: [
          { cells: ["Number of stores", "42", "45"] },
          { cells: ["Employees per store", "28", "28"] },
          { cells: ["Average hourly wage", "$23.08", "$24.00"] },
          { cells: ["Hours per employee", "1,850", "1,850"] },
          { cells: ["Total payroll expense", "$42,500,000", "$47,200,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-base-expectation",
      order: 1,
      type: "numeric",
      label: "Expected payroll for existing 42 stores (with wage increase)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 44200000,
        tolerance: 100000,
      },
      explanation: "$42,500,000 × 1.04 = $44,200,000",
    },
    {
      id: "req-new-store-payroll",
      order: 2,
      type: "numeric",
      label: "Expected payroll for 3 new stores (half year)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1869000,
        tolerance: 50000,
      },
      explanation: "3 × 0.5 × 28 × 1,850 × $24 = $1,869,000",
    },
    {
      id: "req-total-expected",
      order: 3,
      type: "numeric",
      label: "Total expected payroll expense",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 46069000,
        tolerance: 100000,
      },
      explanation: "$44,200,000 + $1,869,000 = $46,069,000",
    },
    {
      id: "req-difference",
      order: 4,
      type: "numeric",
      label: "Difference (recorded minus expected)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1131000,
        tolerance: 100000,
      },
      explanation: "$47,200,000 - $46,069,000 = $1,131,000",
    },
    {
      id: "req-threshold-eval",
      order: 5,
      type: "dropdown",
      label: "If materiality is $500,000, is the difference significant?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-exceed-mat",
      },
      explanation: "Difference of $1,131,000 exceeds materiality of $500,000",
      dropdownOptions: [
        { id: "opt-below-mat", order: 1, text: "No - below materiality threshold", isCorrect: false },
        { id: "opt-exceed-mat", order: 2, text: "Yes - exceeds materiality, requires investigation", isCorrect: true },
        { id: "opt-acceptable", order: 3, text: "Acceptable variance for analytical procedure", isCorrect: false },
      ],
    },
    {
      id: "req-next-step",
      order: 6,
      type: "dropdown",
      label: "Appropriate next step given the difference",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-investigate",
      },
      explanation: "Must investigate unexpected difference exceeding threshold",
      dropdownOptions: [
        { id: "opt-accept", order: 1, text: "Accept recorded amount - analytical is sufficient", isCorrect: false },
        { id: "opt-investigate", order: 2, text: "Investigate difference - inquire of management, perform additional tests", isCorrect: true },
        { id: "opt-adjust", order: 3, text: "Propose adjustment to expected amount", isCorrect: false },
      ],
    },
  ],
};

export const audInterimTestingTBS: TBSQuestion = {
  id: "tbs-aud-050",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Audit Strategy",
  subtopic: "Interim vs. Year-End Testing",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-II",
  title: "Interim Testing Strategy",
  scenarioText: `Your firm is planning the audit of Consolidated Industries for the year ending December 31, Year 1. The interim audit work is scheduled for October. Consider the following areas and circumstances when determining the appropriate testing strategy:

1. Accounts Receivable: Strong internal controls; balance typically stable throughout the year.

2. Inventory: Significant year-end volume; physical count scheduled December 31.

3. Cash: Low risk account; client performs monthly bank reconciliations.

4. Revenue Recognition: New revenue standard implementation; significant judgment involved.

5. Fixed Asset Additions: Major expansion project completed in November; $5M in new assets.

6. Contingent Liabilities: Ongoing litigation with significant developments expected in December.

Required: For each area, determine whether interim testing is appropriate and what roll-forward procedures may be needed.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-interim-guidance",
      order: 1,
      title: "Interim Testing Considerations",
      type: "text",
      content: {
        type: "text",
        title: "Factors Affecting Interim Testing Decisions",
        paragraphs: [
          "Control environment effectiveness and testing results",
          "Nature, extent, and timing of changes in conditions",
          "Risk of material misstatement for the account",
          "Nature and amount of transactions in the remaining period",
          "Sufficiency of roll-forward procedures to extend audit conclusions",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-ar-interim",
      order: 1,
      type: "dropdown",
      label: "Accounts Receivable - Interim testing approach",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ar-interim-ok",
      },
      explanation: "Strong controls and stable balance support interim testing with roll-forward",
      dropdownOptions: [
        { id: "opt-ar-interim-ok", order: 1, text: "Test at interim; roll-forward with analytical procedures", isCorrect: true },
        { id: "opt-ar-yearend", order: 2, text: "All testing at year-end", isCorrect: false },
        { id: "opt-ar-both", order: 3, text: "Full substantive testing at both dates", isCorrect: false },
      ],
    },
    {
      id: "req-inventory-interim",
      order: 2,
      type: "dropdown",
      label: "Inventory - Interim testing approach",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inv-yearend",
      },
      explanation: "Physical count at year-end; observation and testing must be at count date",
      dropdownOptions: [
        { id: "opt-inv-interim", order: 1, text: "Test at interim with roll-forward", isCorrect: false },
        { id: "opt-inv-yearend", order: 2, text: "Substantive testing at year-end count date", isCorrect: true },
        { id: "opt-inv-cycle", order: 3, text: "Rely on cycle counts tested at interim", isCorrect: false },
      ],
    },
    {
      id: "req-cash-interim",
      order: 3,
      type: "dropdown",
      label: "Cash - Interim testing approach",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cash-interim-ok",
      },
      explanation: "Low risk account with monthly reconciliations supports interim testing",
      dropdownOptions: [
        { id: "opt-cash-interim-ok", order: 1, text: "Test reconciliations at interim; verify year-end balances only", isCorrect: true },
        { id: "opt-cash-yearend", order: 2, text: "All bank confirmations at year-end only", isCorrect: false },
        { id: "opt-cash-none", order: 3, text: "No cash testing needed - low risk", isCorrect: false },
      ],
    },
    {
      id: "req-revenue-interim",
      order: 4,
      type: "dropdown",
      label: "Revenue Recognition (new standard) - Interim testing approach",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rev-yearend",
      },
      explanation: "New standard with significant judgment requires year-end focus",
      dropdownOptions: [
        { id: "opt-rev-interim", order: 1, text: "Test at interim; minimal year-end work", isCorrect: false },
        { id: "opt-rev-yearend", order: 2, text: "Concentrate testing at year-end due to judgment and risk", isCorrect: true },
        { id: "opt-rev-split", order: 3, text: "Equal testing at interim and year-end", isCorrect: false },
      ],
    },
    {
      id: "req-fa-interim",
      order: 5,
      type: "dropdown",
      label: "Fixed Asset Additions (November project completion) - Approach",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fa-yearend",
      },
      explanation: "Major additions completed in November must be tested at/after completion",
      dropdownOptions: [
        { id: "opt-fa-interim", order: 1, text: "Test at interim; roll-forward to year-end", isCorrect: false },
        { id: "opt-fa-yearend", order: 2, text: "Test November additions at year-end", isCorrect: true },
        { id: "opt-fa-both", order: 3, text: "Test project in progress at interim; additions at year-end", isCorrect: false },
      ],
    },
    {
      id: "req-contingent-interim",
      order: 6,
      type: "dropdown",
      label: "Contingent Liabilities (December developments expected) - Approach",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cont-yearend",
      },
      explanation: "Expected developments require year-end evaluation and attorney letter",
      dropdownOptions: [
        { id: "opt-cont-interim", order: 1, text: "Obtain attorney letter at interim", isCorrect: false },
        { id: "opt-cont-yearend", order: 2, text: "Evaluate at year-end; attorney letter near report date", isCorrect: true },
        { id: "opt-cont-both", order: 3, text: "Attorney letters at both interim and year-end", isCorrect: false },
      ],
    },
  ],
};

export const audProfessionalSkepticismTBS: TBSQuestion = {
  id: "tbs-aud-051",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Professional Responsibilities",
  subtopic: "Professional Skepticism",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-I",
  title: "Professional Skepticism Scenarios",
  scenarioText: `During the audit of Mercury Electronics, you encounter the following situations. Evaluate each scenario from a professional skepticism perspective:

1. The CFO provides a detailed explanation for a large journal entry increasing revenue. The explanation is consistent with industry knowledge, but no supporting documentation is immediately available.

2. Confirmations received from a major customer show a balance $200,000 higher than the client's records. The customer's accounting department says it's a timing difference.

3. Management's revenue forecast shows 15% growth next year. The industry is experiencing 2-3% growth, but management cites a "game-changing new product."

4. The controller mentions casually that the CEO has been "very focused" on meeting analyst expectations this quarter.

5. You notice the same authorized signatures on all large disbursements, including those exceeding the signer's documented authority level.

6. Prior year workpapers document the same unusual transaction pattern you're seeing this year. Prior team accepted management's explanation without additional testing.

Required: Determine the appropriate skeptical response for each situation.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-skepticism",
      order: 1,
      title: "Professional Skepticism",
      type: "text",
      content: {
        type: "text",
        title: "Professional Skepticism Defined",
        paragraphs: [
          "An attitude that includes a questioning mind, being alert to conditions that may indicate possible misstatement due to fraud or error, and a critical assessment of audit evidence.",
          "The auditor should neither assume management is dishonest nor assume unquestioned honesty.",
          "Professional skepticism includes being alert to contradictory evidence and reliability of documents.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-je-explanation",
      order: 1,
      type: "dropdown",
      label: "CFO's explanation without documentation - Response",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-je-document",
      },
      explanation: "Must obtain and evaluate supporting documentation; explanation alone insufficient",
      dropdownOptions: [
        { id: "opt-je-accept", order: 1, text: "Accept explanation - CFO is credible source", isCorrect: false },
        { id: "opt-je-document", order: 2, text: "Require supporting documentation before concluding", isCorrect: true },
        { id: "opt-je-reject", order: 3, text: "Reject entry - lack of documentation indicates fraud", isCorrect: false },
      ],
    },
    {
      id: "req-confirm-difference",
      order: 2,
      type: "dropdown",
      label: "Confirmation $200K higher than records - Response",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-conf-investigate",
      },
      explanation: "Must investigate timing difference claim; customer could be colluding or explanation could be valid",
      dropdownOptions: [
        { id: "opt-conf-accept", order: 1, text: "Accept timing explanation - common occurrence", isCorrect: false },
        { id: "opt-conf-investigate", order: 2, text: "Investigate specific transactions creating difference", isCorrect: true },
        { id: "opt-conf-client", order: 3, text: "Accept client's records - they know their own books", isCorrect: false },
      ],
    },
    {
      id: "req-forecast",
      order: 3,
      type: "dropdown",
      label: "15% growth forecast vs. 2-3% industry - Response",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-forecast-challenge",
      },
      explanation: "Significant deviation from industry requires corroborating evidence",
      dropdownOptions: [
        { id: "opt-forecast-accept", order: 1, text: "Accept - management knows their business best", isCorrect: false },
        { id: "opt-forecast-challenge", order: 2, text: "Challenge assumptions; require evidence of new product impact", isCorrect: true },
        { id: "opt-forecast-reject", order: 3, text: "Reject forecast - clearly unrealistic", isCorrect: false },
      ],
    },
    {
      id: "req-pressure",
      order: 4,
      type: "dropdown",
      label: "CEO focused on meeting analyst expectations - Implication",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-pressure-fraud",
      },
      explanation: "Indicates fraud risk factor (incentive/pressure); heighten skepticism",
      dropdownOptions: [
        { id: "opt-pressure-normal", order: 1, text: "Normal management behavior - ignore", isCorrect: false },
        { id: "opt-pressure-fraud", order: 2, text: "Fraud risk factor - increase skepticism on revenue and adjustments", isCorrect: true },
        { id: "opt-pressure-discuss", order: 3, text: "Discuss with CEO to relieve pressure", isCorrect: false },
      ],
    },
    {
      id: "req-signatures",
      order: 5,
      type: "dropdown",
      label: "Same signatures exceeding authority - Response",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-sig-control",
      },
      explanation: "Indicates potential control override; investigate authorization process",
      dropdownOptions: [
        { id: "opt-sig-accept", order: 1, text: "Accept - signatures are authorized anyway", isCorrect: false },
        { id: "opt-sig-control", order: 2, text: "Potential override of controls - investigate and consider fraud risk", isCorrect: true },
        { id: "opt-sig-note", order: 3, text: "Note in workpapers for next year's audit", isCorrect: false },
      ],
    },
    {
      id: "req-prior-wp",
      order: 6,
      type: "dropdown",
      label: "Same pattern accepted without testing in prior year - Response",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-wp-test",
      },
      explanation: "Prior acceptance doesn't justify current acceptance; must independently evaluate",
      dropdownOptions: [
        { id: "opt-wp-accept", order: 1, text: "Follow prior year approach for consistency", isCorrect: false },
        { id: "opt-wp-test", order: 2, text: "Independently test; prior year may have been deficient", isCorrect: true },
        { id: "opt-wp-consult", order: 3, text: "Consult with prior year team about their conclusion", isCorrect: false },
      ],
    },
  ],
};

export const audAgreedUponProceduresTBS: TBSQuestion = {
  id: "tbs-aud-052",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Other Engagements",
  subtopic: "Agreed-Upon Procedures",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-IV",
  title: "Agreed-Upon Procedures Engagement",
  scenarioText: `Your firm has been engaged to perform agreed-upon procedures for First National Bank regarding loan covenant compliance of borrower MidWest Industries. Evaluate the following aspects of the engagement:

1. The bank drafted the procedures and wants the practitioner to simply perform them as written.

2. One procedure requires the practitioner to determine whether inventory "appears to be properly valued."

3. The bank wants the report distributed to other lenders who may join the lending syndicate.

4. MidWest's CFO asks to see the report before it's issued to identify any "surprises."

5. One procedure found that debt/equity ratio was 2.8:1 vs. covenant maximum of 2.5:1. The bank asks for your "conclusion on covenant compliance."

6. After procedures are complete, the bank asks you to add one more procedure.

Required: Evaluate each situation for compliance with AT-C 215 standards.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-aup-standards",
      order: 1,
      title: "AUP Standards",
      type: "text",
      content: {
        type: "text",
        title: "AT-C 215 Key Points",
        paragraphs: [
          "Practitioner must participate in establishing the procedures to be performed.",
          "Procedures must be sufficiently specific - subjective terms require clear criteria.",
          "Report use may be restricted or general use depending on circumstances.",
          "Practitioner reports findings, not conclusions or opinions.",
          "Responsible party acknowledgment is required.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-bank-procedures",
      order: 1,
      type: "dropdown",
      label: "Bank drafting procedures without practitioner input",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-proc-collaborate",
      },
      explanation: "Practitioner must participate in establishing procedures; cannot simply accept bank's draft",
      dropdownOptions: [
        { id: "opt-proc-accept", order: 1, text: "Accept - bank knows what they need", isCorrect: false },
        { id: "opt-proc-collaborate", order: 2, text: "Must collaborate with bank to establish appropriate procedures", isCorrect: true },
        { id: "opt-proc-decline", order: 3, text: "Decline engagement - bank cannot draft procedures", isCorrect: false },
      ],
    },
    {
      id: "req-subjective-procedure",
      order: 2,
      type: "dropdown",
      label: "Procedure requiring assessment if inventory 'appears properly valued'",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-subj-revise",
      },
      explanation: "Procedure is too subjective; must establish specific criteria for 'properly valued'",
      dropdownOptions: [
        { id: "opt-subj-perform", order: 1, text: "Perform as written - use professional judgment", isCorrect: false },
        { id: "opt-subj-revise", order: 2, text: "Revise to include specific, objective criteria", isCorrect: true },
        { id: "opt-subj-omit", order: 3, text: "Omit procedure - cannot be performed", isCorrect: false },
      ],
    },
    {
      id: "req-distribution",
      order: 3,
      type: "dropdown",
      label: "Distribution to other potential syndicate lenders",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-dist-allow",
      },
      explanation: "Under revised standards, AUP reports can be general use; distribution is permitted",
      dropdownOptions: [
        { id: "opt-dist-restrict", order: 1, text: "Not permitted - must restrict to engaging party only", isCorrect: false },
        { id: "opt-dist-allow", order: 2, text: "Permitted - AUP reports may be general use", isCorrect: true },
        { id: "opt-dist-consent", order: 3, text: "Requires written consent from each recipient", isCorrect: false },
      ],
    },
    {
      id: "req-cfo-preview",
      order: 4,
      type: "dropdown",
      label: "CFO requesting to preview report before issuance",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-preview-discuss",
      },
      explanation: "Appropriate to discuss findings with responsible party before issuance",
      dropdownOptions: [
        { id: "opt-preview-deny", order: 1, text: "Deny - report goes only to engaging party", isCorrect: false },
        { id: "opt-preview-discuss", order: 2, text: "Appropriate to discuss findings before issuing report", isCorrect: true },
        { id: "opt-preview-modify", order: 3, text: "Allow CFO to request modifications to findings", isCorrect: false },
      ],
    },
    {
      id: "req-conclusion",
      order: 5,
      type: "dropdown",
      label: "Bank requesting conclusion on covenant compliance",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-concl-findings",
      },
      explanation: "Practitioner reports findings only; cannot provide conclusions or opinions",
      dropdownOptions: [
        { id: "opt-concl-provide", order: 1, text: "Provide conclusion as requested", isCorrect: false },
        { id: "opt-concl-findings", order: 2, text: "Report finding (ratio was 2.8:1) without conclusion", isCorrect: true },
        { id: "opt-concl-noncompliance", order: 3, text: "State company is in noncompliance", isCorrect: false },
      ],
    },
    {
      id: "req-additional-proc",
      order: 6,
      type: "dropdown",
      label: "Adding procedure after other procedures complete",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-add-evaluate",
      },
      explanation: "Additional procedures can be added if parties agree; must evaluate appropriateness",
      dropdownOptions: [
        { id: "opt-add-deny", order: 1, text: "Deny - procedures were already agreed upon", isCorrect: false },
        { id: "opt-add-evaluate", order: 2, text: "May add if appropriate and parties agree", isCorrect: true },
        { id: "opt-add-separate", order: 3, text: "Requires separate engagement letter", isCorrect: false },
      ],
    },
  ],
};

export const audServiceOrganizationsTBS: TBSQuestion = {
  id: "tbs-aud-053",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Service Organizations",
  subtopic: "Using Service Organization Reports",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "AUD-II",
  title: "Service Organization Control Reports",
  scenarioText: `Your audit client, Regional Healthcare System, uses several service organizations. Evaluate the following situations regarding SOC reports:

1. Payroll is processed by PayrollPlus. You obtained their SOC 1 Type I report dated September 30. Client's year-end is December 31.

2. Patient records are stored with CloudMed, a cloud hosting provider. They provided a SOC 2 report covering security and availability.

3. Investment transactions are processed by BrokerServices. Their SOC 1 Type II report covers January 1 - October 31. Report has no exceptions noted.

4. IT infrastructure is managed by TechSupport Inc. Their SOC 1 report contains several exceptions related to access controls.

5. The CFO states that since all services are outsourced, "internal controls aren't our responsibility."

6. BillingCorp processes patient billing. They refuse to provide any SOC report, citing confidentiality.

Required: Determine appropriate audit responses for each situation.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-soc-types",
      order: 1,
      title: "SOC Report Types",
      type: "table",
      content: {
        type: "table",
        title: "SOC Report Comparison",
        headers: ["Type", "Coverage", "Key Characteristics"],
        rows: [
          { cells: ["SOC 1 Type I", "Design of controls at a point in time", "No testing of operating effectiveness"] },
          { cells: ["SOC 1 Type II", "Design and operating effectiveness over period", "Includes test results"] },
          { cells: ["SOC 2", "Security, availability, processing integrity, confidentiality, privacy", "Not for financial statement audits"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-type-i-gap",
      order: 1,
      type: "dropdown",
      label: "PayrollPlus Type I report dated September 30 for December year-end",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-type-i-limited",
      },
      explanation: "Type I provides no operating effectiveness evidence; 3-month gap requires additional procedures",
      dropdownOptions: [
        { id: "opt-type-i-sufficient", order: 1, text: "Sufficient - covers controls design", isCorrect: false },
        { id: "opt-type-i-limited", order: 2, text: "Limited use - Type I plus gap requires additional procedures", isCorrect: true },
        { id: "opt-type-i-reject", order: 3, text: "Cannot use - must be Type II", isCorrect: false },
      ],
    },
    {
      id: "req-soc-2",
      order: 2,
      type: "dropdown",
      label: "SOC 2 report for cloud storage provider",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-soc2-not-icfr",
      },
      explanation: "SOC 2 is not designed for financial statement audit reliance; may need additional procedures",
      dropdownOptions: [
        { id: "opt-soc2-sufficient", order: 1, text: "Sufficient for audit purposes", isCorrect: false },
        { id: "opt-soc2-not-icfr", order: 2, text: "Not designed for ICFR; evaluate relevance and need additional evidence", isCorrect: true },
        { id: "opt-soc2-ignore", order: 3, text: "Ignore - cloud storage doesn't affect financials", isCorrect: false },
      ],
    },
    {
      id: "req-coverage-gap",
      order: 3,
      type: "dropdown",
      label: "BrokerServices Type II covering Jan-Oct for Dec year-end",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-gap-bridge",
      },
      explanation: "Two-month gap requires bridge procedures or management inquiry about changes",
      dropdownOptions: [
        { id: "opt-gap-sufficient", order: 1, text: "Sufficient - covers most of the year", isCorrect: false },
        { id: "opt-gap-bridge", order: 2, text: "Perform procedures to bridge the gap (Nov-Dec)", isCorrect: true },
        { id: "opt-gap-request", order: 3, text: "Request new report covering full year", isCorrect: false },
      ],
    },
    {
      id: "req-exceptions",
      order: 4,
      type: "dropdown",
      label: "TechSupport report with access control exceptions",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-except-evaluate",
      },
      explanation: "Must evaluate whether exceptions affect audit; may require additional procedures",
      dropdownOptions: [
        { id: "opt-except-ignore", order: 1, text: "Ignore - service organization's issue", isCorrect: false },
        { id: "opt-except-evaluate", order: 2, text: "Evaluate impact and consider compensating controls or substantive tests", isCorrect: true },
        { id: "opt-except-adverse", order: 3, text: "Issue adverse opinion on client's ICFR", isCorrect: false },
      ],
    },
    {
      id: "req-cfo-statement",
      order: 5,
      type: "dropdown",
      label: "CFO's statement that internal controls aren't their responsibility",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cfo-incorrect",
      },
      explanation: "Management retains responsibility for controls even when using service organizations",
      dropdownOptions: [
        { id: "opt-cfo-correct", order: 1, text: "Correct - service org is responsible", isCorrect: false },
        { id: "opt-cfo-incorrect", order: 2, text: "Incorrect - management retains responsibility; must have monitoring controls", isCorrect: true },
        { id: "opt-cfo-shared", order: 3, text: "Shared responsibility between client and service org", isCorrect: false },
      ],
    },
    {
      id: "req-no-report",
      order: 6,
      type: "dropdown",
      label: "BillingCorp refusing to provide SOC report",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-no-rpt-alternative",
      },
      explanation: "Must obtain evidence through alternative procedures at service organization or user entity",
      dropdownOptions: [
        { id: "opt-no-rpt-accept", order: 1, text: "Accept - their prerogative", isCorrect: false },
        { id: "opt-no-rpt-alternative", order: 2, text: "Perform alternative procedures or scope limitation", isCorrect: true },
        { id: "opt-no-rpt-withdraw", order: 3, text: "Withdraw from engagement", isCorrect: false },
      ],
    },
  ],
};

export const audModifiedOpinionsTBS: TBSQuestion = {
  id: "tbs-aud-054",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Audit Reports",
  subtopic: "Modified Opinions",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "AUD-IV",
  title: "Audit Opinion Modifications",
  scenarioText: `For each scenario, determine the appropriate audit opinion modification:

1. Client uses LIFO for inventory ($50M). You conclude FIFO is required under GAAP. Effect is material but not pervasive to the financial statements.

2. Predecessor auditor audited opening balances. You couldn't obtain sufficient evidence about those balances, and they could materially affect current period comparability.

3. Client restricted access to plant location representing 35% of total assets due to "security concerns." No alternative procedures were possible.

4. Going concern doubt exists. Management included appropriate disclosure, but the uncertainty is severe and you believe disclosure may not be sufficient.

5. Departure from GAAP in a prior period was corrected in current period through restatement. Current period statements are fairly presented.

6. Management refused to provide written representation about litigation matters.

Required: Determine the appropriate opinion for each situation.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-opinion-types",
      order: 1,
      title: "Opinion Types",
      type: "table",
      content: {
        type: "table",
        title: "Modified Opinion Decision Matrix",
        headers: ["Nature of Matter", "Material but Not Pervasive", "Material and Pervasive"],
        rows: [
          { cells: ["GAAP departure", "Qualified", "Adverse"] },
          { cells: ["Scope limitation", "Qualified", "Disclaimer"] },
          { cells: ["Going concern (adequate disclosure)", "Unmodified with EOM", "Unmodified with EOM"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-lifo-departure",
      order: 1,
      type: "dropdown",
      label: "LIFO vs. required FIFO - material but not pervasive",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-lifo-qualified",
      },
      explanation: "GAAP departure that is material but not pervasive = Qualified opinion",
      dropdownOptions: [
        { id: "opt-lifo-unmod", order: 1, text: "Unmodified - accounting policy choice", isCorrect: false },
        { id: "opt-lifo-qualified", order: 2, text: "Qualified - except for LIFO departure", isCorrect: true },
        { id: "opt-lifo-adverse", order: 3, text: "Adverse opinion", isCorrect: false },
      ],
    },
    {
      id: "req-opening-balance",
      order: 2,
      type: "dropdown",
      label: "Cannot verify predecessor-audited opening balances",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-open-qualified",
      },
      explanation: "Scope limitation affecting opening balances = Qualified or disclaimer depending on pervasiveness",
      dropdownOptions: [
        { id: "opt-open-unmod", order: 1, text: "Unmodified - predecessor was responsible", isCorrect: false },
        { id: "opt-open-qualified", order: 2, text: "Qualified - scope limitation on opening balances", isCorrect: true },
        { id: "opt-open-predecessor", order: 3, text: "Reference predecessor in unmodified opinion", isCorrect: false },
      ],
    },
    {
      id: "req-restricted-access",
      order: 3,
      type: "dropdown",
      label: "Access restricted to 35% of assets - no alternatives possible",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-access-disclaim",
      },
      explanation: "Pervasive scope limitation (35% of assets) with no alternatives = Disclaimer",
      dropdownOptions: [
        { id: "opt-access-qualified", order: 1, text: "Qualified opinion", isCorrect: false },
        { id: "opt-access-disclaim", order: 2, text: "Disclaimer - scope limitation is pervasive", isCorrect: true },
        { id: "opt-access-adverse", order: 3, text: "Adverse opinion", isCorrect: false },
      ],
    },
    {
      id: "req-going-concern",
      order: 4,
      type: "dropdown",
      label: "Going concern with disclosure - severe uncertainty",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-gc-eom",
      },
      explanation: "Adequate going concern disclosure = Unmodified with Emphasis of Matter paragraph",
      dropdownOptions: [
        { id: "opt-gc-qualified", order: 1, text: "Qualified due to uncertainty", isCorrect: false },
        { id: "opt-gc-eom", order: 2, text: "Unmodified with Emphasis of Matter paragraph", isCorrect: true },
        { id: "opt-gc-disclaim", order: 3, text: "Disclaimer due to severe uncertainty", isCorrect: false },
      ],
    },
    {
      id: "req-restatement",
      order: 5,
      type: "dropdown",
      label: "Prior GAAP departure corrected through restatement",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-restate-unmod",
      },
      explanation: "Proper restatement corrects the departure; current statements are fairly stated",
      dropdownOptions: [
        { id: "opt-restate-qualified", order: 1, text: "Qualified - prior departure still affects", isCorrect: false },
        { id: "opt-restate-unmod", order: 2, text: "Unmodified - corrected through restatement", isCorrect: true },
        { id: "opt-restate-eom", order: 3, text: "Unmodified with EOM about restatement", isCorrect: false },
      ],
    },
    {
      id: "req-rep-refused",
      order: 6,
      type: "dropdown",
      label: "Management refused litigation representation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rep-disclaim",
      },
      explanation: "Refusal of required representation is scope limitation; typically results in disclaimer or withdrawal",
      dropdownOptions: [
        { id: "opt-rep-qualified", order: 1, text: "Qualified opinion", isCorrect: false },
        { id: "opt-rep-disclaim", order: 2, text: "Disclaimer or withdraw - fundamental representation refused", isCorrect: true },
        { id: "opt-rep-unmod", order: 3, text: "Unmodified if other evidence sufficient", isCorrect: false },
      ],
    },
  ],
};

export const audEBPAuditsTBS: TBSQuestion = {
  id: "tbs-aud-055",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Specialized Engagements",
  subtopic: "Employee Benefit Plan Audits",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "AUD-IV",
  title: "Employee Benefit Plan Audit Requirements",
  scenarioText: `Your firm has been engaged to audit a 401(k) plan sponsored by MegaCorp. The plan has 2,500 participants and $180 million in assets. Consider the following situations:

1. Plan assets are held by National Trust Bank. Management wants you to audit investment values using their quarterly statements only.

2. The plan allows participant-directed investments. Management is unsure if participant loans should be included in the audit scope.

3. Plan administrator wants to use a limited-scope audit, citing the DOL regulations that permit this.

4. You discover the plan filed Form 5500 showing 100 participants when there are actually 2,500.

5. The plan trustee provided a certification that meets DOL requirements for a limited scope audit.

6. During testing, you find that hardship withdrawals were processed without verifying participant eligibility as required by the plan document.

Required: Evaluate each situation for proper handling in an EBP audit.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-ebp-requirements",
      order: 1,
      title: "EBP Audit Requirements",
      type: "text",
      content: {
        type: "text",
        title: "DOL and AICPA Requirements",
        paragraphs: [
          "ERISA requires annual audit for plans with 100+ participants.",
          "Limited scope audit: Auditor may exclude testing investment information certified by qualified institution.",
          "Plan compliance with ERISA and plan document is within audit scope.",
          "Prohibited transactions must be evaluated and reported.",
          "Form 5500 filing accuracy is management's responsibility; discrepancies may indicate internal control issues.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-investment-audit",
      order: 1,
      type: "dropdown",
      label: "Auditing investments using bank statements only",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inv-confirm",
      },
      explanation: "In full-scope audit, must confirm or otherwise independently verify investment values",
      dropdownOptions: [
        { id: "opt-inv-accept", order: 1, text: "Accept bank statements - qualified custodian", isCorrect: false },
        { id: "opt-inv-confirm", order: 2, text: "Confirm investments independently or test bank reconciliation", isCorrect: true },
        { id: "opt-inv-limited", order: 3, text: "Automatically limited scope for investments", isCorrect: false },
      ],
    },
    {
      id: "req-participant-loans",
      order: 2,
      type: "dropdown",
      label: "Participant loans in audit scope",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-loans-include",
      },
      explanation: "Participant loans are plan assets and must be included in audit scope",
      dropdownOptions: [
        { id: "opt-loans-exclude", order: 1, text: "Exclude - personal obligation of participants", isCorrect: false },
        { id: "opt-loans-include", order: 2, text: "Include - participant loans are plan assets", isCorrect: true },
        { id: "opt-loans-limited", order: 3, text: "Can exclude in limited scope audit", isCorrect: false },
      ],
    },
    {
      id: "req-limited-scope",
      order: 3,
      type: "dropdown",
      label: "Administrator request for limited-scope audit",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-limited-allowed",
      },
      explanation: "DOL regulations allow limited scope when certified investment info from qualified institution",
      dropdownOptions: [
        { id: "opt-limited-deny", order: 1, text: "Deny - full scope required for large plans", isCorrect: false },
        { id: "opt-limited-allowed", order: 2, text: "Allowed if certification requirements are met", isCorrect: true },
        { id: "opt-limited-always", order: 3, text: "Limited scope is always preferable", isCorrect: false },
      ],
    },
    {
      id: "req-5500-error",
      order: 4,
      type: "dropdown",
      label: "Form 5500 shows 100 participants vs. actual 2,500",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-5500-control",
      },
      explanation: "Significant error indicates potential internal control deficiency; may require amended filing",
      dropdownOptions: [
        { id: "opt-5500-ignore", order: 1, text: "Ignore - 5500 is not audited", isCorrect: false },
        { id: "opt-5500-control", order: 2, text: "Evaluate controls; discuss correction with management", isCorrect: true },
        { id: "opt-5500-qualified", order: 3, text: "Qualify opinion for the error", isCorrect: false },
      ],
    },
    {
      id: "req-certification",
      order: 5,
      type: "dropdown",
      label: "Trustee certification meeting DOL requirements",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cert-accept",
      },
      explanation: "Proper certification allows exclusion of certified information from audit scope",
      dropdownOptions: [
        { id: "opt-cert-ignore", order: 1, text: "Ignore - still must test investments", isCorrect: false },
        { id: "opt-cert-accept", order: 2, text: "Can exclude certified info from scope; modify opinion accordingly", isCorrect: true },
        { id: "opt-cert-full", order: 3, text: "Allows full unmodified opinion", isCorrect: false },
      ],
    },
    {
      id: "req-hardship",
      order: 6,
      type: "dropdown",
      label: "Hardship withdrawals without eligibility verification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-hard-prohibited",
      },
      explanation: "May constitute prohibited transaction; must evaluate and consider reporting",
      dropdownOptions: [
        { id: "opt-hard-minor", order: 1, text: "Minor procedural issue - note in management letter", isCorrect: false },
        { id: "opt-hard-prohibited", order: 2, text: "Potential prohibited transaction - evaluate and consider reporting", isCorrect: true },
        { id: "opt-hard-participant", order: 3, text: "Participant responsibility, not plan's", isCorrect: false },
      ],
    },
  ],
};

export const audInternalAuditRelationshipTBS: TBSQuestion = {
  id: "tbs-aud-056",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Using Others' Work",
  subtopic: "Internal Auditors",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-III",
  title: "Using Internal Audit Work",
  scenarioText: `You are planning the audit of Consolidated Manufacturing and considering the extent to which you can use the work of their internal audit function. Evaluate the following aspects:

1. Internal audit reports administratively to the CFO but functionally to the Audit Committee.

2. Internal auditors completed inventory observations at 8 of 12 warehouse locations. You plan to observe the remaining 4 major locations.

3. The internal audit team includes 5 CPAs and 3 CIAs with an average of 8 years experience.

4. Internal audit performed tests of controls over purchasing. Their sample size was smaller than what you would use.

5. The chief audit executive was previously employed by your firm (left 4 years ago).

6. Internal audit's work on revenue cutoff testing was completed in October; fiscal year-end is December.

Required: Evaluate each factor's impact on your ability to use internal audit's work.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-ia-factors",
      order: 1,
      title: "Internal Audit Evaluation Factors",
      type: "text",
      content: {
        type: "text",
        title: "AU-C 610 Factors",
        paragraphs: [
          "Objectivity: Reporting relationships and organizational status",
          "Competence: Professional qualifications, knowledge, and skills",
          "Systematic and disciplined approach: Methodology, documentation, supervision",
          "Nature of work: Degree of judgment, risk, and materiality involved",
          "Extent of reliance depends on assessment of these factors",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-reporting",
      order: 1,
      type: "dropdown",
      label: "Reporting to CFO administratively, Audit Committee functionally",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rpt-adequate",
      },
      explanation: "Functional reporting to Audit Committee supports objectivity despite administrative line",
      dropdownOptions: [
        { id: "opt-rpt-concern", order: 1, text: "Objectivity concern - reports to management", isCorrect: false },
        { id: "opt-rpt-adequate", order: 2, text: "Adequate objectivity - functional reporting to AC is key", isCorrect: true },
        { id: "opt-rpt-perfect", order: 3, text: "Ideal structure - no concerns", isCorrect: false },
      ],
    },
    {
      id: "req-inventory-coverage",
      order: 2,
      type: "dropdown",
      label: "IA observed 8 of 12 locations; you will observe remaining 4 major",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inv-evaluate",
      },
      explanation: "Can use IA work for 8 locations after evaluating quality; you cover major/high-risk sites",
      dropdownOptions: [
        { id: "opt-inv-all", order: 1, text: "Must observe all 12 locations yourself", isCorrect: false },
        { id: "opt-inv-evaluate", order: 2, text: "Evaluate and potentially use IA work for 8 locations", isCorrect: true },
        { id: "opt-inv-accept", order: 3, text: "Fully accept IA observations without further work", isCorrect: false },
      ],
    },
    {
      id: "req-competence",
      order: 3,
      type: "dropdown",
      label: "5 CPAs, 3 CIAs, average 8 years experience",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-comp-strong",
      },
      explanation: "Strong professional credentials and experience indicate competence",
      dropdownOptions: [
        { id: "opt-comp-weak", order: 1, text: "Insufficient - need more CPAs", isCorrect: false },
        { id: "opt-comp-strong", order: 2, text: "Strong competence indicators", isCorrect: true },
        { id: "opt-comp-irrelevant", order: 3, text: "Credentials not relevant to audit use", isCorrect: false },
      ],
    },
    {
      id: "req-sample-size",
      order: 4,
      type: "dropdown",
      label: "IA sample size smaller than yours would be",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-sample-supplement",
      },
      explanation: "May need to supplement IA testing to achieve your required confidence level",
      dropdownOptions: [
        { id: "opt-sample-reject", order: 1, text: "Cannot use - insufficient sample", isCorrect: false },
        { id: "opt-sample-supplement", order: 2, text: "Can use but may need supplemental testing", isCorrect: true },
        { id: "opt-sample-accept", order: 3, text: "Accept as adequate - IA determines appropriate level", isCorrect: false },
      ],
    },
    {
      id: "req-former-employee",
      order: 5,
      type: "dropdown",
      label: "CAE was your firm's employee 4 years ago",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-former-ok",
      },
      explanation: "Four years is sufficient cooling-off period; no independence impairment",
      dropdownOptions: [
        { id: "opt-former-impair", order: 1, text: "Independence impairment - cannot use IA work", isCorrect: false },
        { id: "opt-former-ok", order: 2, text: "No concern - four years is adequate cooling off", isCorrect: true },
        { id: "opt-former-document", order: 3, text: "Document but proceed with extra scrutiny", isCorrect: false },
      ],
    },
    {
      id: "req-timing",
      order: 6,
      type: "dropdown",
      label: "Cutoff testing in October for December year-end",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-timing-update",
      },
      explanation: "October testing doesn't cover year-end cutoff; need updating procedures",
      dropdownOptions: [
        { id: "opt-timing-sufficient", order: 1, text: "Sufficient - close enough to year-end", isCorrect: false },
        { id: "opt-timing-update", order: 2, text: "Need year-end cutoff procedures; October work not sufficient", isCorrect: true },
        { id: "opt-timing-reject", order: 3, text: "Cannot use any of IA's cutoff work", isCorrect: false },
      ],
    },
  ],
};

export const audPCAOBDifferencesTBS: TBSQuestion = {
  id: "tbs-aud-057",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Professional Standards",
  subtopic: "PCAOB vs. AICPA Standards",
  difficulty: "medium",
  skillLevel: "remembering_understanding",
  contentArea: "AUD-I",
  title: "PCAOB and AICPA Standards Comparison",
  scenarioText: `Your firm audits both public companies (SEC registrants) and private companies. Compare the requirements under PCAOB and AICPA standards for the following situations:

1. Critical audit matters / Key audit matters: Which standards require disclosure in the auditor's report?

2. Partner rotation: What are the rotation requirements?

3. Engagement quality review: When is it required?

4. Auditor independence: Providing tax services to an audit client.

5. Internal control auditing: Requirements for reporting on ICFR.

6. Audit documentation retention: How long must workpapers be retained?

Required: Identify the correct requirement under each set of standards.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-standards-comparison",
      order: 1,
      title: "Standards Overview",
      type: "table",
      content: {
        type: "table",
        title: "PCAOB vs. AICPA Key Differences",
        headers: ["Area", "PCAOB (Issuers)", "AICPA (Non-issuers)"],
        rows: [
          { cells: ["Critical/Key Matters", "CAMs required", "KAMs optional"] },
          { cells: ["Partner Rotation", "5 years lead, 5 years concurring", "7 years suggested"] },
          { cells: ["Workpaper Retention", "7 years", "5 years"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cam-kam",
      order: 1,
      type: "dropdown",
      label: "Critical/Key Audit Matters reporting",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cam-pcaob",
      },
      explanation: "PCAOB requires CAMs for large accelerated filers; AICPA KAMs are optional",
      dropdownOptions: [
        { id: "opt-cam-both", order: 1, text: "Required under both standards", isCorrect: false },
        { id: "opt-cam-pcaob", order: 2, text: "PCAOB requires CAMs; AICPA KAMs optional", isCorrect: true },
        { id: "opt-cam-aicpa", order: 3, text: "AICPA requires; PCAOB optional", isCorrect: false },
      ],
    },
    {
      id: "req-rotation",
      order: 2,
      type: "dropdown",
      label: "Partner rotation requirements",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rot-pcaob-strict",
      },
      explanation: "PCAOB mandates 5-year rotation; AICPA suggests 7 years as best practice",
      dropdownOptions: [
        { id: "opt-rot-same", order: 1, text: "Same under both - 5 years", isCorrect: false },
        { id: "opt-rot-pcaob-strict", order: 2, text: "PCAOB: 5 years mandatory; AICPA: 7 years suggested", isCorrect: true },
        { id: "opt-rot-neither", order: 3, text: "Neither requires rotation", isCorrect: false },
      ],
    },
    {
      id: "req-eqr",
      order: 3,
      type: "dropdown",
      label: "Engagement quality review requirements",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-eqr-both",
      },
      explanation: "Both require EQR for SEC issuers; AICPA requires for certain engagements",
      dropdownOptions: [
        { id: "opt-eqr-pcaob", order: 1, text: "PCAOB only requires EQR", isCorrect: false },
        { id: "opt-eqr-both", order: 2, text: "Both require for SEC; AICPA also for certain others", isCorrect: true },
        { id: "opt-eqr-aicpa", order: 3, text: "AICPA has stricter EQR requirements", isCorrect: false },
      ],
    },
    {
      id: "req-tax-services",
      order: 4,
      type: "dropdown",
      label: "Providing tax services to audit client",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-tax-pcaob-restrict",
      },
      explanation: "PCAOB/SEC restrict tax services for issuers; AICPA permits with safeguards for non-issuers",
      dropdownOptions: [
        { id: "opt-tax-prohibit-both", order: 1, text: "Prohibited under both standards", isCorrect: false },
        { id: "opt-tax-pcaob-restrict", order: 2, text: "PCAOB restricts significantly; AICPA permits with safeguards", isCorrect: true },
        { id: "opt-tax-allow-both", order: 3, text: "Allowed under both with proper disclosure", isCorrect: false },
      ],
    },
    {
      id: "req-icfr",
      order: 5,
      type: "dropdown",
      label: "Integrated audit of ICFR",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-icfr-pcaob",
      },
      explanation: "PCAOB requires integrated audit for accelerated filers; not required under AICPA",
      dropdownOptions: [
        { id: "opt-icfr-both", order: 1, text: "Required under both standards", isCorrect: false },
        { id: "opt-icfr-pcaob", order: 2, text: "PCAOB: required for accelerated filers; AICPA: not required", isCorrect: true },
        { id: "opt-icfr-optional", order: 3, text: "Optional under both", isCorrect: false },
      ],
    },
    {
      id: "req-retention",
      order: 6,
      type: "dropdown",
      label: "Workpaper retention period",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ret-pcaob-longer",
      },
      explanation: "PCAOB requires 7 years; AICPA requires 5 years",
      dropdownOptions: [
        { id: "opt-ret-same", order: 1, text: "Same - 5 years under both", isCorrect: false },
        { id: "opt-ret-pcaob-longer", order: 2, text: "PCAOB: 7 years; AICPA: 5 years", isCorrect: true },
        { id: "opt-ret-aicpa-longer", order: 3, text: "AICPA: 7 years; PCAOB: 5 years", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// PHASE 2 EXPANSION - Batch 3 (tbs-aud-058 through tbs-aud-061)
// =============================================================================

// TBS-AUD-058: Letter of Inquiry to Legal Counsel
export const audLegalLetterTBS: TBSQuestion = {
  id: "tbs-aud-058",
  section: "AUD",
  tbsType: "document_review",
  topic: "Audit Evidence",
  subtopic: "Attorney Letter Responses",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "AUD-III",
  title: "Evaluating Attorney Letter Responses",
  scenarioText: `You are the senior auditor for Nextech Solutions Inc., a technology company. As part of year-end procedures, you sent an inquiry letter to the client's outside legal counsel. The response has been received and requires evaluation.

The company has three ongoing legal matters disclosed in the notes to the financial statements. Your task is to evaluate the attorney's responses and determine appropriate audit actions.

Required: Review the attorney letter response and evaluate the adequacy of the responses for each legal matter.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-attorney-response",
      order: 1,
      title: "Attorney Letter Response",
      type: "memo",
      content: {
        type: "memo",
        from: "Wilson & Parker LLP - Outside Legal Counsel",
        to: "Anderson & Associates CPAs",
        date: "January 15, Year 2",
        subject: "Response to Audit Inquiry - Nextech Solutions Inc.",
        body: `Per your request dated January 5, Year 2, we provide the following responses regarding pending litigation for Nextech Solutions Inc. for the year ended December 31, Year 1:

MATTER A - Patent Infringement Claim
A claim was filed against Nextech by TechRival Corp alleging infringement of their patent on data compression algorithms. The case is in early discovery phase. In our opinion, the outcome of this matter is uncertain, and we cannot provide an estimate of the potential loss or range of loss at this time.

MATTER B - Employment Discrimination
Former employee filed suit alleging wrongful termination. We believe the claim is without merit based on documentation reviewed. The probability of an unfavorable outcome is remote. If there were an adverse outcome, potential damages would not exceed $150,000.

MATTER C - Product Liability
Class action filed alleging defective software caused customer data breaches. Given the complexity and early stage, we are unable to express an opinion regarding the likelihood of an unfavorable outcome or estimate of potential loss.

We have advised management of all matters that require disclosure. Our response is limited to matters to which we have given substantive attention.`,
      },
    },
    {
      id: "exhibit-fs-disclosure",
      order: 2,
      title: "Financial Statement Disclosure",
      type: "memo",
      content: {
        type: "memo",
        from: "Client Management",
        to: "Audit File",
        date: "December 31, Year 1",
        subject: "Note 15 - Commitments and Contingencies",
        body: `The Company is involved in various legal proceedings in the ordinary course of business:

(a) A patent infringement claim with uncertain outcome. No loss accrual has been recorded.
(b) An employment matter with remote likelihood of loss.
(c) A class action product liability claim in early stages. Management believes it is reasonably possible that a loss could occur, but the amount cannot be estimated. No loss accrual has been recorded.

Management believes the ultimate resolution of these matters will not have a material adverse effect on the Company's financial position.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-matter-a-eval",
      order: 1,
      type: "dropdown",
      label: "Matter A response adequacy",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-matter-a-inadequate",
      },
      explanation: "Attorney stating they 'cannot provide an estimate' without indicating likelihood requires follow-up - this is a limitation",
      dropdownOptions: [
        { id: "opt-matter-a-adequate", order: 1, text: "Adequate - no further action needed", isCorrect: false },
        { id: "opt-matter-a-inadequate", order: 2, text: "Inadequate - requires follow-up with counsel", isCorrect: true },
        { id: "opt-matter-a-scope", order: 3, text: "Requires scope limitation in audit report", isCorrect: false },
      ],
    },
    {
      id: "req-matter-b-eval",
      order: 2,
      type: "dropdown",
      label: "Matter B response adequacy",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-matter-b-adequate",
      },
      explanation: "Remote likelihood with quantified maximum exposure is adequate for audit purposes",
      dropdownOptions: [
        { id: "opt-matter-b-adequate", order: 1, text: "Adequate - remote likelihood properly evaluated", isCorrect: true },
        { id: "opt-matter-b-inadequate", order: 2, text: "Inadequate - need probability assessment", isCorrect: false },
        { id: "opt-matter-b-accrual", order: 3, text: "Inadequate - requires loss accrual", isCorrect: false },
      ],
    },
    {
      id: "req-matter-c-eval",
      order: 3,
      type: "dropdown",
      label: "Matter C response adequacy",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-matter-c-conflict",
      },
      explanation: "Attorney says 'unable to express opinion' but management disclosed 'reasonably possible' - this conflict requires resolution",
      dropdownOptions: [
        { id: "opt-matter-c-adequate", order: 1, text: "Adequate - early stage matters are uncertain", isCorrect: false },
        { id: "opt-matter-c-conflict", order: 2, text: "Conflict between attorney and management assessment requires resolution", isCorrect: true },
        { id: "opt-matter-c-accrual", order: 3, text: "Inadequate - must record loss accrual", isCorrect: false },
      ],
    },
    {
      id: "req-limitation-language",
      order: 4,
      type: "dropdown",
      label: "Significance of 'substantive attention' limitation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-limitation-standard",
      },
      explanation: "'Substantive attention' limitation is standard and acceptable - it limits response to matters actively worked on",
      dropdownOptions: [
        { id: "opt-limitation-scope", order: 1, text: "Creates audit scope limitation requiring report modification", isCorrect: false },
        { id: "opt-limitation-standard", order: 2, text: "Standard limitation - acceptable for audit purposes", isCorrect: true },
        { id: "opt-limitation-reject", order: 3, text: "Unacceptable - must request comprehensive response", isCorrect: false },
      ],
    },
    {
      id: "req-mgmt-assertion",
      order: 5,
      type: "dropdown",
      label: "Management's 'no material adverse effect' assertion",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-assertion-question",
      },
      explanation: "Given uncertainties in Matters A and C, management's blanket assertion needs support or qualification",
      dropdownOptions: [
        { id: "opt-assertion-ok", order: 1, text: "Supported by attorney responses", isCorrect: false },
        { id: "opt-assertion-question", order: 2, text: "Questionable given uncertainties - requires management inquiry", isCorrect: true },
        { id: "opt-assertion-misstat", order: 3, text: "Clear misstatement requiring adjustment", isCorrect: false },
      ],
    },
    {
      id: "req-overall-action",
      order: 6,
      type: "dropdown",
      label: "Most appropriate overall audit response",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-action-followup",
      },
      explanation: "Matters A and C require follow-up with counsel and management before concluding",
      dropdownOptions: [
        { id: "opt-action-accept", order: 1, text: "Accept responses and complete audit", isCorrect: false },
        { id: "opt-action-followup", order: 2, text: "Follow up on Matters A and C before concluding", isCorrect: true },
        { id: "opt-action-qualify", order: 3, text: "Issue qualified opinion for scope limitation", isCorrect: false },
        { id: "opt-action-withdraw", order: 4, text: "Withdraw from engagement", isCorrect: false },
      ],
    },
  ],
};

// TBS-AUD-059: Audit Sampling - Stratified Sampling
export const audStratifiedSamplingTBS: TBSQuestion = {
  id: "tbs-aud-059",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Sampling",
  subtopic: "Stratified Sampling",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Stratified Sampling Design and Evaluation",
  scenarioText: `You are designing a stratified sampling approach for the audit of accounts receivable for Industrial Supply Corp. The population of 2,400 customer accounts totaling $15,600,000 has been stratified into three strata based on dollar value.

You need to determine sample sizes for each stratum, select the sample, and evaluate results.

Required: Calculate the appropriate sample sizes and evaluate the sampling results.`,
  timeEstimateMinutes: 16,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-strata-info",
      order: 1,
      title: "Population Stratification",
      type: "table",
      content: {
        type: "table",
        title: "Population Stratification",
        headers: ["Stratum", "Dollar Range", "# of Items", "Total Balance", "% of Population Value"],
        rows: [
          { cells: ["1 - High Value", "Over $50,000", "120", "$6,240,000", "40%"] },
          { cells: ["2 - Medium Value", "$10,000 - $50,000", "480", "$5,460,000", "35%"] },
          { cells: ["3 - Low Value", "Under $10,000", "1,800", "$3,900,000", "25%"] },
          { cells: ["TOTAL", "", "2,400", "$15,600,000", "100%"], isBold: true },
        ],
      },
    },
    {
      id: "exhibit-parameters",
      order: 2,
      title: "Sampling Parameters",
      type: "text",
      content: {
        type: "text",
        title: "Sampling Parameters",
        paragraphs: [
          "RISK AND MATERIALITY:",
          "- Performance materiality: $312,000",
          "- Tolerable misstatement for AR: $234,000",
          "- Risk of material misstatement: Moderate",
          "- Desired confidence level: 90%",
          "- Expected misstatement: $78,000",
          "",
          "SAMPLING APPROACH:",
          "- Stratum 1: Test 100% (all items examined individually)",
          "- Stratum 2: Statistical sampling with allocation proportional to value",
          "- Stratum 3: Statistical sampling with allocation proportional to value",
          "- Overall sample size (Strata 2 & 3): 180 items",
        ],
      },
    },
    {
      id: "exhibit-results",
      order: 3,
      title: "Sample Results",
      type: "table",
      content: {
        type: "table",
        title: "Sample Results",
        headers: ["Stratum", "Items Tested", "Misstatements Found", "Dollar Amount of Misstatements"],
        rows: [
          { cells: ["1 - High Value", "120", "3", "$45,000 (overstatement)"] },
          { cells: ["2 - Medium Value", "108", "5", "$18,500 (overstatement)"] },
          { cells: ["3 - Low Value", "72", "4", "$3,200 (overstatement)"] },
          { cells: ["TOTAL", "300", "12", "$66,700"], isBold: true },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-stratum2-size",
      order: 1,
      type: "numeric",
      label: "Calculate Stratum 2 sample size (proportional to value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 108,
        tolerance: 0,
      },
      explanation: "Stratum 2 = 35% of remaining 58.3% (since Stratum 1 is 100% tested), or 35/(35+25) × 180 = 105, rounded to 108",
    },
    {
      id: "req-stratum3-size",
      order: 2,
      type: "numeric",
      label: "Calculate Stratum 3 sample size",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 72,
        tolerance: 0,
      },
      explanation: "Stratum 3 = 25/(35+25) × 180 = 75, rounded to 72 to total 180",
    },
    {
      id: "req-stratum1-known",
      order: 3,
      type: "numeric",
      label: "Known misstatement from Stratum 1 (100% tested)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 45000,
        tolerance: 0,
      },
      explanation: "Stratum 1 is 100% tested, so all misstatements are known: $45,000",
    },
    {
      id: "req-stratum2-project",
      order: 4,
      type: "numeric",
      label: "Project misstatement for Stratum 2 to population",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 82292,
        tolerance: 500,
      },
      explanation: "Stratum 2 projection: ($18,500 ÷ 108) × 480 = $82,222 or ratio method",
    },
    {
      id: "req-stratum3-project",
      order: 5,
      type: "numeric",
      label: "Project misstatement for Stratum 3 to population",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 80000,
        tolerance: 500,
      },
      explanation: "Stratum 3 projection: ($3,200 ÷ 72) × 1,800 = $80,000",
    },
    {
      id: "req-total-likely",
      order: 6,
      type: "numeric",
      label: "Total likely (projected) misstatement",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 207292,
        tolerance: 1000,
      },
      explanation: "Total = $45,000 (known) + $82,222 (S2) + $80,000 (S3) = $207,222",
    },
    {
      id: "req-conclusion",
      order: 7,
      type: "dropdown",
      label: "Audit conclusion on accounts receivable",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-conclude-accept",
      },
      explanation: "Total likely misstatement of ~$207,000 is less than tolerable misstatement of $234,000",
      dropdownOptions: [
        { id: "opt-conclude-accept", order: 1, text: "Accept - likely misstatement less than tolerable", isCorrect: true },
        { id: "opt-conclude-extend", order: 2, text: "Extend testing - results inconclusive", isCorrect: false },
        { id: "opt-conclude-adjust", order: 3, text: "Request adjustment - misstatement exceeds materiality", isCorrect: false },
      ],
    },
  ],
};

// TBS-AUD-060: Compilation and Review Engagements
export const audCompilationReviewTBS: TBSQuestion = {
  id: "tbs-aud-060",
  section: "AUD",
  tbsType: "document_review",
  topic: "Review and Compilation Engagements",
  subtopic: "SSARS Engagements",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "AUD-IV",
  title: "Compilation vs Review Engagement Requirements",
  scenarioText: `You are a manager at a CPA firm evaluating two potential SSARS engagements. Management of each client has specific needs and limitations. You must determine the appropriate engagement type and required procedures for each.

Required: Evaluate each scenario and select the appropriate engagement type and procedures.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-client-a",
      order: 1,
      title: "Client A - New Medical Practice",
      type: "memo",
      content: {
        type: "memo",
        from: "Partner",
        to: "Manager",
        date: "Current Date",
        subject: "Potential Engagement - Valley Medical Associates",
        body: `Valley Medical Associates is a newly formed medical practice seeking bank financing for equipment purchases. The bank requires financial statements with some level of CPA association.

Key facts:
- First year of operations
- Three physician owners with limited accounting knowledge
- Bank requires "at minimum, CPA reviewed financial statements"
- Management wants the lowest cost option acceptable to bank
- Total revenues approximately $2.1 million
- Simple accrual basis accounting

Management can provide supporting schedules and has hired a bookkeeper to maintain records.`,
      },
    },
    {
      id: "exhibit-client-b",
      order: 2,
      title: "Client B - Established Manufacturing Company",
      type: "memo",
      content: {
        type: "memo",
        from: "Partner",
        to: "Manager",
        date: "Current Date",
        subject: "Potential Engagement - Precision Parts Inc.",
        body: `Precision Parts Inc. is seeking quarterly financial statements for internal management use only. No third party will rely on the statements.

Key facts:
- Established company, 15 years in operation
- Annual revenues of $8.5 million
- Experienced controller and accounting staff
- Management prepares its own monthly statements
- Wants CPA to present year-end financial statements
- Specifically requests "no assurance" engagement
- Prior year we performed a review engagement`,
      },
    },
    {
      id: "exhibit-ssars-summary",
      order: 3,
      title: "SSARS Engagement Summary",
      type: "text",
      content: {
        type: "text",
        title: "SSARS Engagement Summary",
        paragraphs: [
          "COMPILATION ENGAGEMENT:",
          "- No assurance provided",
          "- May omit substantially all disclosures if disclosed",
          "- Independence not required (must disclose lack of independence)",
          "- Management's representation not required",
          "- Report states no assurance is expressed",
          "",
          "REVIEW ENGAGEMENT:",
          "- Limited assurance provided",
          "- Independence required",
          "- Analytical procedures and inquiries required",
          "- Management's written representations required",
          "- Report states limited assurance (nothing came to attention)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-client-a-type",
      order: 1,
      type: "dropdown",
      label: "Client A - Appropriate engagement type",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-client-a-review",
      },
      explanation: "Bank requires minimum of review; compilation would not meet bank's requirements",
      dropdownOptions: [
        { id: "opt-client-a-compile", order: 1, text: "Compilation - lowest cost option", isCorrect: false },
        { id: "opt-client-a-review", order: 2, text: "Review - minimum required by bank", isCorrect: true },
        { id: "opt-client-a-audit", order: 3, text: "Audit - needed for bank financing", isCorrect: false },
      ],
    },
    {
      id: "req-client-a-procedure",
      order: 2,
      type: "dropdown",
      label: "Client A - Required procedure for review",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-proc-analytical",
      },
      explanation: "Review engagements require analytical procedures and inquiry - not detailed testing",
      dropdownOptions: [
        { id: "opt-proc-confirm", order: 1, text: "Confirm accounts receivable balances", isCorrect: false },
        { id: "opt-proc-analytical", order: 2, text: "Apply analytical procedures and make inquiries", isCorrect: true },
        { id: "opt-proc-observe", order: 3, text: "Observe physical inventory count", isCorrect: false },
      ],
    },
    {
      id: "req-client-b-type",
      order: 3,
      type: "dropdown",
      label: "Client B - Appropriate engagement type",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-client-b-compile",
      },
      explanation: "Client specifically requests no assurance for internal use - compilation is appropriate",
      dropdownOptions: [
        { id: "opt-client-b-compile", order: 1, text: "Compilation - no assurance as requested", isCorrect: true },
        { id: "opt-client-b-review", order: 2, text: "Review - continue prior year service", isCorrect: false },
        { id: "opt-client-b-prep", order: 3, text: "Preparation engagement only", isCorrect: false },
      ],
    },
    {
      id: "req-independence-b",
      order: 4,
      type: "dropdown",
      label: "Client B - Independence requirement",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-indep-not-required",
      },
      explanation: "Independence not required for compilation, but lack of independence must be disclosed",
      dropdownOptions: [
        { id: "opt-indep-required", order: 1, text: "Independence required", isCorrect: false },
        { id: "opt-indep-not-required", order: 2, text: "Independence not required but lack must be disclosed", isCorrect: true },
        { id: "opt-indep-none", order: 3, text: "No independence consideration needed", isCorrect: false },
      ],
    },
    {
      id: "req-rep-letter-a",
      order: 5,
      type: "dropdown",
      label: "Client A - Management representation letter",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rep-required",
      },
      explanation: "Management representation letter is required for review engagements",
      dropdownOptions: [
        { id: "opt-rep-required", order: 1, text: "Required for review engagement", isCorrect: true },
        { id: "opt-rep-optional", order: 2, text: "Optional but recommended", isCorrect: false },
        { id: "opt-rep-not", order: 3, text: "Not required for SSARS engagements", isCorrect: false },
      ],
    },
    {
      id: "req-report-lang-b",
      order: 6,
      type: "dropdown",
      label: "Client B - Key report language for compilation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-lang-no-assurance",
      },
      explanation: "Compilation report must clearly state that no assurance is provided",
      dropdownOptions: [
        { id: "opt-lang-limited", order: 1, text: "Limited assurance is provided", isCorrect: false },
        { id: "opt-lang-no-assurance", order: 2, text: "We do not express an opinion or provide any assurance", isCorrect: true },
        { id: "opt-lang-fairly", order: 3, text: "Presents fairly in all material respects", isCorrect: false },
      ],
    },
  ],
};

// TBS-AUD-061: Consideration of Fraud Risk Factors
export const audFraudRiskFactorsTBS: TBSQuestion = {
  id: "tbs-aud-061",
  section: "AUD",
  tbsType: "document_review",
  topic: "Audit Planning",
  subtopic: "Fraud Risk Assessment",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "AUD-II",
  title: "Fraud Risk Factor Evaluation",
  scenarioText: `You are planning the audit of Apex Distribution Inc. and must evaluate fraud risk factors as part of the risk assessment process. Information has been gathered from various sources including inquiry, observation, and analytical procedures.

Required: Evaluate the fraud risk factors and determine appropriate audit responses.`,
  timeEstimateMinutes: 16,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-background",
      order: 1,
      title: "Company Background",
      type: "text",
      content: {
        type: "text",
        title: "Company Background",
        paragraphs: [
          "INDUSTRY AND OPERATIONS:",
          "- Regional wholesale distribution company",
          "- Annual revenues of $45 million (up 28% from prior year)",
          "- Industry average growth is 8%",
          "- High volume of cash transactions at branch locations",
          "- Management bonus tied to achieving revenue and profit targets",
          "- CEO founded company and owns 65% of stock",
          "",
          "PERSONNEL AND CONTROL ENVIRONMENT:",
          "- CFO resigned unexpectedly 3 months ago",
          "- Interim CFO is CEO's nephew with limited experience",
          "- Accounting staff reduced by 40% due to 'efficiency initiatives'",
          "- Board consists of 3 members: CEO, CEO's spouse, and one independent member",
          "- No audit committee or internal audit function",
        ],
      },
    },
    {
      id: "exhibit-indicators",
      order: 2,
      title: "Observations and Inquiries",
      type: "memo",
      content: {
        type: "memo",
        from: "Staff Auditor",
        to: "Audit Senior",
        date: "Planning Phase",
        subject: "Observations from Preliminary Fieldwork",
        body: `The following observations were noted during our preliminary fieldwork:

1. Several large sales transactions recorded on the last day of the year with unusual terms (right of return extended to 120 days vs normal 30 days)

2. During warehouse walkthrough, observed significant inventory marked "customer hold" - approximately $2.8 million. Per inquiry, these are "sales awaiting delivery."

3. Related party sales to a company owned by CEO increased from $500,000 to $3.2 million

4. Bank reconciliations for 3 branches are 4+ months behind

5. Accounts receivable aging shows 45% over 90 days (vs 15% in prior year)

6. Journal entries recorded after preliminary field work began adjusting revenue recognition

7. Management initially reluctant to provide access to contracts with new major customers`,
      },
    },
    {
      id: "exhibit-fraud-triangle",
      order: 3,
      title: "Fraud Risk Triangle Reference",
      type: "text",
      content: {
        type: "text",
        title: "Fraud Risk Triangle Reference",
        paragraphs: [
          "INCENTIVE/PRESSURE:",
          "Conditions that create motivation to commit fraud (financial targets, compensation tied to results, financial difficulties, etc.)",
          "",
          "OPPORTUNITY:",
          "Conditions that allow fraud to occur (weak controls, override of controls, lack of oversight, complex transactions, etc.)",
          "",
          "RATIONALIZATION/ATTITUDE:",
          "Mindset that permits fraud (management attitudes, history of violations, strained relationship with auditors, etc.)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-incentive-factor",
      order: 1,
      type: "dropdown",
      label: "Primary incentive/pressure fraud risk factor",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-incentive-bonus",
      },
      explanation: "Management bonus tied to targets creates direct pressure to misstate results",
      dropdownOptions: [
        { id: "opt-incentive-bonus", order: 1, text: "Management compensation tied to financial targets", isCorrect: true },
        { id: "opt-incentive-cash", order: 2, text: "High volume of cash transactions", isCorrect: false },
        { id: "opt-incentive-rp", order: 3, text: "Increase in related party transactions", isCorrect: false },
      ],
    },
    {
      id: "req-opportunity-factor",
      order: 2,
      type: "dropdown",
      label: "Most significant opportunity fraud risk factor",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-opp-governance",
      },
      explanation: "Weak board composition and lack of audit committee creates significant opportunity through inadequate oversight",
      dropdownOptions: [
        { id: "opt-opp-staff", order: 1, text: "Reduced accounting staff", isCorrect: false },
        { id: "opt-opp-governance", order: 2, text: "Weak governance - board dominated by CEO/family", isCorrect: true },
        { id: "opt-opp-cfo", order: 3, text: "Inexperienced interim CFO", isCorrect: false },
      ],
    },
    {
      id: "req-attitude-indicator",
      order: 3,
      type: "dropdown",
      label: "Most concerning attitude/rationalization indicator",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-att-reluctant",
      },
      explanation: "Management reluctance to provide access suggests attitude concerns about auditor scrutiny",
      dropdownOptions: [
        { id: "opt-att-cfo", order: 1, text: "Sudden CFO departure", isCorrect: false },
        { id: "opt-att-reluctant", order: 2, text: "Reluctance to provide access to contracts", isCorrect: true },
        { id: "opt-att-late", order: 3, text: "Late journal entries after fieldwork began", isCorrect: false },
      ],
    },
    {
      id: "req-revenue-risk",
      order: 4,
      type: "dropdown",
      label: "Revenue recognition fraud risk assessment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rev-significant",
      },
      explanation: "Multiple indicators suggest significant fraud risk in revenue: unusual terms, bill-and-hold inventory, related party growth",
      dropdownOptions: [
        { id: "opt-rev-low", order: 1, text: "Low - routine transactions", isCorrect: false },
        { id: "opt-rev-moderate", order: 2, text: "Moderate - some unusual transactions", isCorrect: false },
        { id: "opt-rev-significant", order: 3, text: "Significant fraud risk - multiple indicators present", isCorrect: true },
      ],
    },
    {
      id: "req-bill-hold",
      order: 5,
      type: "dropdown",
      label: "Response to $2.8M 'customer hold' inventory",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-bh-criteria",
      },
      explanation: "Bill-and-hold arrangements have specific revenue recognition criteria that must be verified",
      dropdownOptions: [
        { id: "opt-bh-accept", order: 1, text: "Accept as normal business practice", isCorrect: false },
        { id: "opt-bh-criteria", order: 2, text: "Verify bill-and-hold criteria are met for revenue recognition", isCorrect: true },
        { id: "opt-bh-reverse", order: 3, text: "Require reversal of all related revenue", isCorrect: false },
      ],
    },
    {
      id: "req-response-overall",
      order: 6,
      type: "dropdown",
      label: "Overall audit response to fraud risk",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-resp-unpredictable",
      },
      explanation: "Increased professional skepticism and unpredictable audit procedures are appropriate responses",
      dropdownOptions: [
        { id: "opt-resp-standard", order: 1, text: "Standard audit procedures with increased sample sizes", isCorrect: false },
        { id: "opt-resp-unpredictable", order: 2, text: "Unpredictable audit procedures and heightened skepticism", isCorrect: true },
        { id: "opt-resp-withdraw", order: 3, text: "Withdraw from engagement due to fraud indicators", isCorrect: false },
      ],
    },
    {
      id: "req-journal-response",
      order: 7,
      type: "dropdown",
      label: "Response to late journal entries",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-je-review",
      },
      explanation: "Late adjusting entries require additional scrutiny and understanding of purpose",
      dropdownOptions: [
        { id: "opt-je-ignore", order: 1, text: "Accept if properly approved", isCorrect: false },
        { id: "opt-je-review", order: 2, text: "Examine entries in detail and inquire about purpose", isCorrect: true },
        { id: "opt-je-reverse", order: 3, text: "Require all entries after year-end to be reversed", isCorrect: false },
      ],
    },
  ],
};

// Phase 3 expansion - Batch 1 (tbs-aud-062 through tbs-aud-071)

export const audEngagementLetterTBS: TBSQuestion = {
  id: "tbs-aud-062",
  section: "AUD",
  tbsType: "document_review",
  topic: "Audit Engagement",
  subtopic: "Engagement Letter Requirements",
  difficulty: "easy",
  skillLevel: "remembering_understanding",
  contentArea: "AUD-I",
  title: "Engagement Letter Evaluation",
  scenarioText: `You are reviewing a draft engagement letter prepared for a new audit client, Meridian Technologies Inc. The engagement partner has asked you to evaluate whether all required elements are properly addressed.

Required: Evaluate each element of the engagement letter for compliance with professional standards.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-letter",
      order: 1,
      title: "Draft Engagement Letter",
      type: "memo",
      content: {
        type: "memo",
        from: "Audit Partner",
        to: "Meridian Technologies Inc.",
        date: "January 15, 2024",
        subject: "Audit Engagement for Year Ending December 31, 2024",
        body: `We are pleased to confirm our understanding of the services we will provide to Meridian Technologies Inc.

SCOPE OF SERVICES:
We will audit the financial statements of Meridian Technologies Inc. for the year ending December 31, 2024. Our audit will be conducted in accordance with generally accepted auditing standards (GAAS).

OBJECTIVES:
The objective of our audit is to express an opinion on whether the financial statements are presented fairly, in all material respects, in accordance with accounting principles generally accepted in the United States of America.

MANAGEMENT RESPONSIBILITIES:
Management is responsible for:
- The preparation and fair presentation of the financial statements
- Designing and maintaining internal control over financial reporting
- Making all financial records and related information available to us
- Providing us with written representations

AUDITOR RESPONSIBILITIES:
We will plan and perform the audit to obtain reasonable assurance about whether the financial statements are free from material misstatement. An audit involves examining evidence supporting the amounts and disclosures in the financial statements.

Because of the inherent limitations of an audit, together with the inherent limitations of internal control, an unavoidable risk exists that some material misstatements may not be detected.

FEES:
Estimated fees for this engagement will be provided separately.

Please sign and return one copy of this letter to indicate your acknowledgment.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-scope",
      order: 1,
      type: "dropdown",
      label: "Scope of services section",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-scope-adequate",
      },
      explanation: "The scope section adequately identifies the financial statements to be audited and applicable framework",
      dropdownOptions: [
        { id: "opt-scope-adequate", order: 1, text: "Adequate - identifies statements and framework", isCorrect: true },
        { id: "opt-scope-missing-period", order: 2, text: "Missing specific period coverage", isCorrect: false },
        { id: "opt-scope-wrong-framework", order: 3, text: "Incorrect auditing framework referenced", isCorrect: false },
      ],
    },
    {
      id: "req-mgmt-resp",
      order: 2,
      type: "dropdown",
      label: "Management responsibilities section",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-mgmt-missing",
      },
      explanation: "Missing acknowledgment that management will provide unrestricted access to persons within entity",
      dropdownOptions: [
        { id: "opt-mgmt-complete", order: 1, text: "Complete - all required elements included", isCorrect: false },
        { id: "opt-mgmt-missing", order: 2, text: "Missing access to personnel provision", isCorrect: true },
        { id: "opt-mgmt-wrong", order: 3, text: "Incorrectly assigns auditor responsibilities to management", isCorrect: false },
      ],
    },
    {
      id: "req-limitations",
      order: 3,
      type: "dropdown",
      label: "Inherent limitations disclosure",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-limit-adequate",
      },
      explanation: "Properly addresses inherent limitations of audit and internal control",
      dropdownOptions: [
        { id: "opt-limit-adequate", order: 1, text: "Adequate - addresses both audit and IC limitations", isCorrect: true },
        { id: "opt-limit-missing", order: 2, text: "Missing disclosure of audit limitations", isCorrect: false },
        { id: "opt-limit-guarantee", order: 3, text: "Inappropriately guarantees fraud detection", isCorrect: false },
      ],
    },
    {
      id: "req-fees",
      order: 4,
      type: "dropdown",
      label: "Fee arrangement section",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fees-defer",
      },
      explanation: "Fees provided separately is acceptable, but fee arrangement should generally be included in the letter",
      dropdownOptions: [
        { id: "opt-fees-adequate", order: 1, text: "Adequate - separate fee communication is acceptable", isCorrect: false },
        { id: "opt-fees-defer", order: 2, text: "Acceptable but best practice is to include fee basis in letter", isCorrect: true },
        { id: "opt-fees-required", order: 3, text: "Violation - fees must be in engagement letter", isCorrect: false },
      ],
    },
    {
      id: "req-fraud",
      order: 5,
      type: "dropdown",
      label: "Fraud responsibilities",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fraud-missing",
      },
      explanation: "Letter should include reference to auditor's responsibility regarding fraud detection and management's responsibility regarding fraud",
      dropdownOptions: [
        { id: "opt-fraud-included", order: 1, text: "Adequately addressed in scope section", isCorrect: false },
        { id: "opt-fraud-missing", order: 2, text: "Missing explicit fraud responsibility provisions", isCorrect: true },
        { id: "opt-fraud-none", order: 3, text: "Fraud not required in engagement letter", isCorrect: false },
      ],
    },
    {
      id: "req-signature",
      order: 6,
      type: "dropdown",
      label: "Signature and acknowledgment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-sig-adequate",
      },
      explanation: "Request for signed acknowledgment from management is appropriate",
      dropdownOptions: [
        { id: "opt-sig-adequate", order: 1, text: "Adequate - requests signed acknowledgment", isCorrect: true },
        { id: "opt-sig-missing", order: 2, text: "Should require board of directors signature", isCorrect: false },
        { id: "opt-sig-verbal", order: 3, text: "Verbal acknowledgment is sufficient", isCorrect: false },
      ],
    },
  ],
};

export const audSampleSizeCalcTBS: TBSQuestion = {
  id: "tbs-aud-063",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Audit Sampling",
  subtopic: "Sample Size Determination",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Audit Sample Size Calculation",
  scenarioText: `You are planning substantive tests of details for accounts receivable at Phoenix Manufacturing. Based on your risk assessment and materiality considerations, you need to determine appropriate sample sizes.

Required: Calculate the sample sizes for each testing approach using the information provided.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-ar-info",
      order: 1,
      title: "Accounts Receivable Information",
      type: "table",
      content: {
        type: "table",
        title: "Accounts Receivable Population",
        headers: ["Category", "Number of Accounts", "Dollar Value"],
        rows: [
          { cells: ["Over $100,000", "45", "$8,500,000"] },
          { cells: ["$50,000 - $100,000", "120", "$8,200,000"] },
          { cells: ["$10,000 - $50,000", "580", "$12,800,000"] },
          { cells: ["Under $10,000", "2,255", "$5,500,000"] },
          { cells: ["Total", "3,000", "$35,000,000"] },
        ],
      },
    },
    {
      id: "exhibit-params",
      order: 2,
      title: "Sampling Parameters",
      type: "text",
      content: {
        type: "text",
        title: "Testing Parameters",
        paragraphs: [
          "Performance materiality: $700,000",
          "Tolerable misstatement for AR: $350,000",
          "Expected misstatement: $75,000",
          "Confidence level required: 95% (reliability factor 3.0)",
          "All accounts over $100,000 will be tested 100%",
          "For remaining population, use ratio estimation approach",
          "Average account balance in sample stratum: $20,000",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-100-pct",
      order: 1,
      type: "numeric",
      label: "Number of accounts tested 100% (items over $100,000)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 45,
        tolerance: 0,
      },
      explanation: "All 45 accounts over $100,000 are tested 100% based on the strategy stated",
    },
    {
      id: "req-remaining-pop",
      order: 2,
      type: "numeric",
      label: "Dollar value of remaining population after 100% testing",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 26500000,
        tolerance: 0,
      },
      explanation: "$35,000,000 - $8,500,000 = $26,500,000 remaining after 100% tested items",
    },
    {
      id: "req-sample-size-formula",
      order: 3,
      type: "numeric",
      label: "Sample size using formula: (Population × Reliability Factor) ÷ (Tolerable - Expected)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 289,
        tolerance: 5,
      },
      explanation: "Sample size = ($26,500,000 × 3.0) ÷ ($350,000 - $75,000) = $79,500,000 ÷ $275,000 = 289 items",
    },
    {
      id: "req-sample-dollars",
      order: 4,
      type: "numeric",
      label: "Estimated dollar value of sample (sample size × average account)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5780000,
        tolerance: 100000,
      },
      explanation: "289 accounts × $20,000 average = $5,780,000 sample value",
    },
    {
      id: "req-coverage",
      order: 5,
      type: "numeric",
      label: "Total dollar coverage percentage of AR (100% tested + sample) - round to whole number",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 41,
        tolerance: 2,
      },
      explanation: "($8,500,000 + $5,780,000) ÷ $35,000,000 = 40.8%, rounds to 41%",
    },
  ],
};

export const audRMMAssessmentTBS: TBSQuestion = {
  id: "tbs-aud-064",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Risk Assessment",
  subtopic: "Risk of Material Misstatement",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "AUD-II",
  title: "Risk of Material Misstatement Assessment",
  scenarioText: `You are assessing the risk of material misstatement (RMM) for various account balances and assertions at Cascade Industries, a manufacturing company. Based on your understanding of the entity and its environment, evaluate the following risk factors.

Required: Assess the level of RMM for each scenario and identify the primary risk driver.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-company-info",
      order: 1,
      title: "Company Information",
      type: "text",
      content: {
        type: "text",
        title: "Cascade Industries Background",
        paragraphs: [
          "Manufacturing company producing industrial equipment",
          "Annual revenues: $125 million",
          "First year of new ERP system implementation",
          "Products sold with 2-year warranty",
          "Significant inventory of specialized components",
          "Management compensation tied to revenue growth",
          "Industry experiencing technology disruption",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-revenue-rmm",
      order: 1,
      type: "dropdown",
      label: "Revenue recognition: RMM assessment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rev-high",
      },
      explanation: "High RMM due to presumed fraud risk in revenue, management incentives tied to growth, and new ERP system",
      dropdownOptions: [
        { id: "opt-rev-low", order: 1, text: "Low - routine transactions", isCorrect: false },
        { id: "opt-rev-moderate", order: 2, text: "Moderate - normal manufacturing revenue", isCorrect: false },
        { id: "opt-rev-high", order: 3, text: "High - presumed fraud risk plus incentive/opportunity factors", isCorrect: true },
      ],
    },
    {
      id: "req-warranty-rmm",
      order: 2,
      type: "dropdown",
      label: "Warranty liability: Primary assertion at risk",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-war-valuation",
      },
      explanation: "Warranty estimation involves significant judgment affecting valuation/allocation assertion",
      dropdownOptions: [
        { id: "opt-war-existence", order: 1, text: "Existence - whether warranty obligations exist", isCorrect: false },
        { id: "opt-war-valuation", order: 2, text: "Valuation/Allocation - estimation of warranty costs", isCorrect: true },
        { id: "opt-war-completeness", order: 3, text: "Completeness - unrecorded warranty liabilities", isCorrect: false },
      ],
    },
    {
      id: "req-inventory-rmm",
      order: 3,
      type: "dropdown",
      label: "Specialized inventory: RMM assessment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inv-high",
      },
      explanation: "High RMM due to specialized nature (valuation complexity) and technology disruption (obsolescence risk)",
      dropdownOptions: [
        { id: "opt-inv-low", order: 1, text: "Low - standard manufacturing inventory", isCorrect: false },
        { id: "opt-inv-moderate", order: 2, text: "Moderate - normal inventory risks", isCorrect: false },
        { id: "opt-inv-high", order: 3, text: "High - specialized items plus obsolescence risk from disruption", isCorrect: true },
      ],
    },
    {
      id: "req-erp-rmm",
      order: 4,
      type: "dropdown",
      label: "ERP implementation: Impact on control risk",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-erp-elevated",
      },
      explanation: "First year of new ERP typically elevates control risk due to learning curve and potential issues",
      dropdownOptions: [
        { id: "opt-erp-lower", order: 1, text: "Lower control risk - new system has better controls", isCorrect: false },
        { id: "opt-erp-elevated", order: 2, text: "Elevated control risk - first year implementation risks", isCorrect: true },
        { id: "opt-erp-none", order: 3, text: "No impact - IT controls are separate from account risks", isCorrect: false },
      ],
    },
    {
      id: "req-inherent-factor",
      order: 5,
      type: "dropdown",
      label: "Technology disruption: Type of risk factor",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-tech-inherent",
      },
      explanation: "Industry disruption is an inherent risk factor affecting the business environment",
      dropdownOptions: [
        { id: "opt-tech-control", order: 1, text: "Control risk factor", isCorrect: false },
        { id: "opt-tech-inherent", order: 2, text: "Inherent risk factor at financial statement level", isCorrect: true },
        { id: "opt-tech-detection", order: 3, text: "Detection risk factor", isCorrect: false },
      ],
    },
    {
      id: "req-response",
      order: 6,
      type: "dropdown",
      label: "Appropriate overall response to elevated RMM",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-resp-substantive",
      },
      explanation: "Elevated RMM requires more extensive substantive procedures and experienced staff",
      dropdownOptions: [
        { id: "opt-resp-rely", order: 1, text: "Rely more on controls testing", isCorrect: false },
        { id: "opt-resp-substantive", order: 2, text: "More extensive substantive procedures with experienced staff", isCorrect: true },
        { id: "opt-resp-reduce", order: 3, text: "Reduce sample sizes to focus on key items", isCorrect: false },
      ],
    },
  ],
};

export const audReportModificationTypesTBS: TBSQuestion = {
  id: "tbs-aud-065",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Audit Reports",
  subtopic: "Report Modifications",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-IV",
  title: "Audit Report Modification Types",
  scenarioText: `For each of the following scenarios, determine the appropriate type of audit report modification or paragraph addition that would be required.

Required: Select the most appropriate report modification for each situation.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-mod-types",
      order: 1,
      title: "Report Modification Reference",
      type: "table",
      content: {
        type: "table",
        title: "Types of Report Modifications",
        headers: ["Modification Type", "When Used"],
        rows: [
          { cells: ["Emphasis of Matter", "Draw attention to matter adequately disclosed that is fundamental to understanding"] },
          { cells: ["Other Matter", "Relevant to understanding the audit, auditor's responsibilities, or report"] },
          { cells: ["Qualified Opinion", "Material but not pervasive GAAP departure or scope limitation"] },
          { cells: ["Adverse Opinion", "Material and pervasive GAAP departure"] },
          { cells: ["Disclaimer", "Material and pervasive scope limitation"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-gc-adequate",
      order: 1,
      type: "dropdown",
      label: "Substantial doubt about going concern with adequate disclosure in notes",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-gc-eom",
      },
      explanation: "Going concern with adequate disclosure requires Emphasis of Matter paragraph",
      dropdownOptions: [
        { id: "opt-gc-eom", order: 1, text: "Unmodified with Emphasis of Matter paragraph", isCorrect: true },
        { id: "opt-gc-qual", order: 2, text: "Qualified opinion", isCorrect: false },
        { id: "opt-gc-disclaimer", order: 3, text: "Disclaimer of opinion", isCorrect: false },
      ],
    },
    {
      id: "req-segment",
      order: 2,
      type: "dropdown",
      label: "Prior period statements audited by predecessor auditor",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-seg-om",
      },
      explanation: "Reference to predecessor auditor is reported in Other Matter paragraph",
      dropdownOptions: [
        { id: "opt-seg-eom", order: 1, text: "Emphasis of Matter paragraph", isCorrect: false },
        { id: "opt-seg-om", order: 2, text: "Other Matter paragraph", isCorrect: true },
        { id: "opt-seg-none", order: 3, text: "No modification needed", isCorrect: false },
      ],
    },
    {
      id: "req-restatement",
      order: 3,
      type: "dropdown",
      label: "Prior period restatement to correct material error, properly disclosed",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rest-eom",
      },
      explanation: "Corrected prior period error draws attention through Emphasis of Matter",
      dropdownOptions: [
        { id: "opt-rest-qual", order: 1, text: "Qualified opinion on prior period", isCorrect: false },
        { id: "opt-rest-eom", order: 2, text: "Emphasis of Matter paragraph", isCorrect: true },
        { id: "opt-rest-adverse", order: 3, text: "Adverse opinion", isCorrect: false },
      ],
    },
    {
      id: "req-scope-immaterial",
      order: 4,
      type: "dropdown",
      label: "Scope limitation on immaterial balance",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-scope-unmod",
      },
      explanation: "Immaterial scope limitations do not require report modification",
      dropdownOptions: [
        { id: "opt-scope-unmod", order: 1, text: "Unmodified - no modification required", isCorrect: true },
        { id: "opt-scope-qual", order: 2, text: "Qualified opinion", isCorrect: false },
        { id: "opt-scope-om", order: 3, text: "Other Matter paragraph", isCorrect: false },
      ],
    },
    {
      id: "req-inconsistency",
      order: 5,
      type: "dropdown",
      label: "Voluntary change from FIFO to weighted average, properly disclosed",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-change-eom",
      },
      explanation: "Material change in accounting principle properly applied requires Emphasis of Matter",
      dropdownOptions: [
        { id: "opt-change-qual", order: 1, text: "Qualified - consistency exception", isCorrect: false },
        { id: "opt-change-eom", order: 2, text: "Emphasis of Matter paragraph", isCorrect: true },
        { id: "opt-change-none", order: 3, text: "No modification - proper disclosure is sufficient", isCorrect: false },
      ],
    },
    {
      id: "req-supplementary",
      order: 6,
      type: "dropdown",
      label: "Required supplementary information (RSI) is omitted",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rsi-om",
      },
      explanation: "Omitted RSI is reported in Other Matter paragraph; does not affect opinion",
      dropdownOptions: [
        { id: "opt-rsi-qual", order: 1, text: "Qualified opinion", isCorrect: false },
        { id: "opt-rsi-om", order: 2, text: "Other Matter paragraph noting omission", isCorrect: true },
        { id: "opt-rsi-eom", order: 3, text: "Emphasis of Matter paragraph", isCorrect: false },
      ],
    },
  ],
};

export const audInternalControlEvalTBS: TBSQuestion = {
  id: "tbs-aud-066",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Internal Control",
  subtopic: "Control Deficiency Evaluation",
  difficulty: "easy",
  skillLevel: "remembering_understanding",
  contentArea: "AUD-II",
  title: "Internal Control Deficiency Classification",
  scenarioText: `During your audit of Brighton Corporation, you identified several internal control deficiencies. You need to evaluate each deficiency to determine its severity classification.

Required: Classify each control deficiency as a deficiency, significant deficiency, or material weakness.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-definitions",
      order: 1,
      title: "Deficiency Classification Definitions",
      type: "text",
      content: {
        type: "text",
        title: "Control Deficiency Classifications",
        paragraphs: [
          "DEFICIENCY: A control does not allow management or employees to prevent or detect misstatements on a timely basis. Individually or combined, reasonably possible but not reasonably likely to result in material misstatement.",
          "SIGNIFICANT DEFICIENCY: A deficiency or combination that is less severe than a material weakness but important enough to merit attention by those charged with governance.",
          "MATERIAL WEAKNESS: A deficiency or combination where there is a reasonable possibility that a material misstatement will not be prevented or detected on a timely basis.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-override",
      order: 1,
      type: "dropdown",
      label: "CEO routinely overrides purchasing approval limits for contracts over $50,000",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-over-mw",
      },
      explanation: "Management override of controls is typically a material weakness indicator",
      dropdownOptions: [
        { id: "opt-over-def", order: 1, text: "Deficiency", isCorrect: false },
        { id: "opt-over-sd", order: 2, text: "Significant deficiency", isCorrect: false },
        { id: "opt-over-mw", order: 3, text: "Material weakness", isCorrect: true },
      ],
    },
    {
      id: "req-restatement",
      order: 2,
      type: "dropdown",
      label: "Prior year financial statements required restatement due to revenue recognition errors",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rest-mw",
      },
      explanation: "Restatement of financial statements is a strong indicator of material weakness",
      dropdownOptions: [
        { id: "opt-rest-def", order: 1, text: "Deficiency", isCorrect: false },
        { id: "opt-rest-sd", order: 2, text: "Significant deficiency", isCorrect: false },
        { id: "opt-rest-mw", order: 3, text: "Material weakness", isCorrect: true },
      ],
    },
    {
      id: "req-minor-rec",
      order: 3,
      type: "dropdown",
      label: "Bank reconciliations are performed monthly but not reviewed by supervisor; no errors found in testing",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rec-def",
      },
      explanation: "Missing review is a deficiency, but no errors and likely compensating controls suggests lower severity",
      dropdownOptions: [
        { id: "opt-rec-def", order: 1, text: "Deficiency", isCorrect: true },
        { id: "opt-rec-sd", order: 2, text: "Significant deficiency", isCorrect: false },
        { id: "opt-rec-mw", order: 3, text: "Material weakness", isCorrect: false },
      ],
    },
    {
      id: "req-audit-adj",
      order: 4,
      type: "dropdown",
      label: "Auditors proposed $2M adjustment to inventory (5% of total assets), management agreed and corrected",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inv-sd",
      },
      explanation: "Material audit adjustment indicates significant deficiency; may be MW depending on facts",
      dropdownOptions: [
        { id: "opt-inv-def", order: 1, text: "Deficiency - corrected so no issue", isCorrect: false },
        { id: "opt-inv-sd", order: 2, text: "Significant deficiency", isCorrect: true },
        { id: "opt-inv-mw", order: 3, text: "Material weakness", isCorrect: false },
      ],
    },
    {
      id: "req-segregation",
      order: 5,
      type: "dropdown",
      label: "One employee handles receiving, recording payables, and signing checks for small vendor payments (< $1,000)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-seg-def",
      },
      explanation: "Limited segregation for small dollar amounts with other compensating controls is typically a deficiency",
      dropdownOptions: [
        { id: "opt-seg-def", order: 1, text: "Deficiency - small dollar amounts", isCorrect: true },
        { id: "opt-seg-sd", order: 2, text: "Significant deficiency", isCorrect: false },
        { id: "opt-seg-mw", order: 3, text: "Material weakness", isCorrect: false },
      ],
    },
    {
      id: "req-it-access",
      order: 6,
      type: "dropdown",
      label: "Former employees retained system access for 60+ days after termination; one accessed financial systems",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-it-sd",
      },
      explanation: "IT access control weakness with actual access by former employee is at least significant deficiency",
      dropdownOptions: [
        { id: "opt-it-def", order: 1, text: "Deficiency", isCorrect: false },
        { id: "opt-it-sd", order: 2, text: "Significant deficiency", isCorrect: true },
        { id: "opt-it-mw", order: 3, text: "Material weakness", isCorrect: false },
      ],
    },
  ],
};

export const audDocumentationStandardsTBS: TBSQuestion = {
  id: "tbs-aud-067",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Audit Documentation",
  subtopic: "Documentation Standards",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Audit Documentation Requirements",
  scenarioText: `You are reviewing audit workpapers prepared by staff auditors to ensure compliance with documentation standards. Evaluate each situation to determine if documentation requirements have been met.

Required: Determine whether each documentation practice complies with professional standards.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-doc-standards",
      order: 1,
      title: "Documentation Requirements",
      type: "text",
      content: {
        type: "text",
        title: "Key Documentation Principles",
        paragraphs: [
          "Documentation should enable an experienced auditor with no prior connection to understand:",
          "- Nature, timing, and extent of procedures performed",
          "- Results of procedures and evidence obtained",
          "- Significant matters, conclusions, and professional judgments",
          "Assembly deadline: 60 days after report release date",
          "Retention period: 5 years from report release date (7 years for issuers)",
          "Documentation may be modified after report date only to clarify or explain",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-tickmarks",
      order: 1,
      type: "dropdown",
      label: "Workpaper uses tickmarks but legend explaining meanings is on a separate unfiled workpaper",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-tick-noncompliant",
      },
      explanation: "Tickmark legends must be included in or referenced from the workpaper",
      dropdownOptions: [
        { id: "opt-tick-ok", order: 1, text: "Acceptable - tickmarks are standard", isCorrect: false },
        { id: "opt-tick-noncompliant", order: 2, text: "Noncompliant - legend must be included or cross-referenced", isCorrect: true },
        { id: "opt-tick-minor", order: 3, text: "Minor issue - can be corrected during review", isCorrect: false },
      ],
    },
    {
      id: "req-conclusion",
      order: 2,
      type: "dropdown",
      label: "Workpaper documents procedures performed but has no conclusion documented",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-conc-noncompliant",
      },
      explanation: "Documentation must include results and conclusions, not just procedures",
      dropdownOptions: [
        { id: "opt-conc-ok", order: 1, text: "Acceptable - conclusion can be inferred", isCorrect: false },
        { id: "opt-conc-noncompliant", order: 2, text: "Noncompliant - conclusions must be documented", isCorrect: true },
        { id: "opt-conc-partner", order: 3, text: "Partner review provides conclusion", isCorrect: false },
      ],
    },
    {
      id: "req-75-days",
      order: 3,
      type: "dropdown",
      label: "Workpaper file assembled 75 days after report release",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-75-noncompliant",
      },
      explanation: "60-day assembly deadline has been exceeded",
      dropdownOptions: [
        { id: "opt-75-ok", order: 1, text: "Acceptable - within reasonable period", isCorrect: false },
        { id: "opt-75-noncompliant", order: 2, text: "Noncompliant - exceeds 60-day assembly deadline", isCorrect: true },
        { id: "opt-75-extension", order: 3, text: "Can request extension from firm quality control", isCorrect: false },
      ],
    },
    {
      id: "req-delete",
      order: 4,
      type: "dropdown",
      label: "Staff deleted superseded draft workpapers from file after final review",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-del-potentially",
      },
      explanation: "Superseded documents may be deleted if properly documented, but could be issue if done improperly",
      dropdownOptions: [
        { id: "opt-del-ok", order: 1, text: "Acceptable practice - only final versions needed", isCorrect: false },
        { id: "opt-del-potentially", order: 2, text: "Potentially noncompliant - depends on timing and documentation", isCorrect: true },
        { id: "opt-del-required", order: 3, text: "Required - drafts should never be retained", isCorrect: false },
      ],
    },
    {
      id: "req-add-after",
      order: 5,
      type: "dropdown",
      label: "Partner added explanatory memo 45 days after report date clarifying judgment basis",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-add-compliant",
      },
      explanation: "Administrative additions clarifying or explaining are permitted within assembly period",
      dropdownOptions: [
        { id: "opt-add-compliant", order: 1, text: "Compliant - clarifying additions permitted within 60 days", isCorrect: true },
        { id: "opt-add-noncompliant", order: 2, text: "Noncompliant - cannot add after report date", isCorrect: false },
        { id: "opt-add-document", order: 3, text: "Must document why not added before report date", isCorrect: false },
      ],
    },
    {
      id: "req-oral",
      order: 6,
      type: "dropdown",
      label: "Complex accounting judgment discussed orally with partner but not documented",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-oral-noncompliant",
      },
      explanation: "Significant matters and professional judgments must be documented, not just discussed",
      dropdownOptions: [
        { id: "opt-oral-ok", order: 1, text: "Acceptable - partner participation is sufficient", isCorrect: false },
        { id: "opt-oral-noncompliant", order: 2, text: "Noncompliant - significant judgments require documentation", isCorrect: true },
        { id: "opt-oral-sign", order: 3, text: "Partner sign-off on workpaper is sufficient", isCorrect: false },
      ],
    },
  ],
};

export const audRevenueSubstantiveTBS: TBSQuestion = {
  id: "tbs-aud-068",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Substantive Procedures",
  subtopic: "Revenue Testing",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "AUD-III",
  title: "Revenue Substantive Procedure Design",
  scenarioText: `You are designing substantive audit procedures for revenue at TechStream Solutions, a software company with the following revenue streams:
- Perpetual software licenses (40% of revenue)
- Annual subscription services (35% of revenue)
- Implementation consulting services (25% of revenue)

The company has experienced rapid growth and management bonuses are tied to revenue targets.

Required: Select the most effective substantive procedure for each assertion/risk combination.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-rev-info",
      order: 1,
      title: "Revenue Recognition Policies",
      type: "text",
      content: {
        type: "text",
        title: "Recognition Policies",
        paragraphs: [
          "PERPETUAL LICENSES: Recognized when software is delivered and customer can use it",
          "SUBSCRIPTION: Recognized ratably over service period",
          "IMPLEMENTATION: Recognized as services are performed (milestone method)",
          "Contracts often bundle multiple elements requiring allocation",
          "Right of return period: 30 days from delivery",
          "Average deal size: $150,000 for enterprise contracts",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cutoff",
      order: 1,
      type: "dropdown",
      label: "Best procedure for cutoff assertion on perpetual licenses",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cut-delivery",
      },
      explanation: "For perpetual licenses, comparing delivery documentation to recording dates tests cutoff",
      dropdownOptions: [
        { id: "opt-cut-confirm", order: 1, text: "Confirm license purchases with customers", isCorrect: false },
        { id: "opt-cut-delivery", order: 2, text: "Compare delivery documentation dates to revenue recording dates", isCorrect: true },
        { id: "opt-cut-contract", order: 3, text: "Read contract terms for delivery provisions", isCorrect: false },
      ],
    },
    {
      id: "req-occurrence",
      order: 2,
      type: "dropdown",
      label: "Best procedure for occurrence assertion on subscription revenue",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-occur-confirm",
      },
      explanation: "Customer confirmations verify that subscription services are actually being received",
      dropdownOptions: [
        { id: "opt-occur-confirm", order: 1, text: "Confirm subscription terms and status with customers", isCorrect: true },
        { id: "opt-occur-recalc", order: 2, text: "Recalculate subscription amortization", isCorrect: false },
        { id: "opt-occur-deferred", order: 3, text: "Test deferred revenue rollforward", isCorrect: false },
      ],
    },
    {
      id: "req-accuracy",
      order: 3,
      type: "dropdown",
      label: "Best procedure for accuracy of bundled contract allocation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-acc-ssp",
      },
      explanation: "Testing standalone selling prices verifies appropriate allocation methodology",
      dropdownOptions: [
        { id: "opt-acc-total", order: 1, text: "Verify total contract price to signed agreement", isCorrect: false },
        { id: "opt-acc-ssp", order: 2, text: "Test standalone selling price basis for each element", isCorrect: true },
        { id: "opt-acc-payment", order: 3, text: "Trace to customer payment receipts", isCorrect: false },
      ],
    },
    {
      id: "req-completeness",
      order: 4,
      type: "dropdown",
      label: "Best procedure for completeness of implementation revenue",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-comp-timesheet",
      },
      explanation: "Comparing consulting hours worked to revenue recognized identifies unrecorded revenue",
      dropdownOptions: [
        { id: "opt-comp-contract", order: 1, text: "Review contracts for implementation provisions", isCorrect: false },
        { id: "opt-comp-timesheet", order: 2, text: "Compare consultant timesheet hours to revenue recognized", isCorrect: true },
        { id: "opt-comp-billing", order: 3, text: "Test billing completeness to contract schedule", isCorrect: false },
      ],
    },
    {
      id: "req-fraud-revenue",
      order: 5,
      type: "dropdown",
      label: "Addressing presumed fraud risk in revenue recognition",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fraud-combination",
      },
      explanation: "Presumed revenue fraud risk requires combination of unpredictable procedures",
      dropdownOptions: [
        { id: "opt-fraud-expand", order: 1, text: "Expand sample size for standard testing", isCorrect: false },
        { id: "opt-fraud-combination", order: 2, text: "Combine analytical procedures, cutoff testing, and journal entry testing", isCorrect: true },
        { id: "opt-fraud-confirm", order: 3, text: "100% confirmation of customer balances", isCorrect: false },
      ],
    },
    {
      id: "req-return-right",
      order: 6,
      type: "dropdown",
      label: "Testing for impact of 30-day return rights on year-end transactions",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ret-subsequent",
      },
      explanation: "Review subsequent returns to verify year-end revenue properly reflects return estimates",
      dropdownOptions: [
        { id: "opt-ret-policy", order: 1, text: "Read return policy for reasonableness", isCorrect: false },
        { id: "opt-ret-subsequent", order: 2, text: "Review January-February returns for year-end sales", isCorrect: true },
        { id: "opt-ret-estimate", order: 3, text: "Test management's historical return estimate only", isCorrect: false },
      ],
    },
  ],
};

export const audSubsequentEventsEvalTBS: TBSQuestion = {
  id: "tbs-aud-069",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Subsequent Events",
  subtopic: "Subsequent Events Evaluation",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Subsequent Events Classification",
  scenarioText: `You are evaluating subsequent events for the December 31, 2024 year-end audit. The audit report is expected to be dated March 15, 2025. For each event, determine the appropriate accounting and reporting treatment.

Required: Classify each event and determine the appropriate treatment.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-se-types",
      order: 1,
      title: "Subsequent Event Types",
      type: "table",
      content: {
        type: "table",
        title: "Classification and Treatment",
        headers: ["Type", "Description", "Treatment"],
        rows: [
          { cells: ["Type I (Recognized)", "Conditions existed at balance sheet date", "Adjust financial statements"] },
          { cells: ["Type II (Nonrecognized)", "Conditions arose after balance sheet date", "Disclose if material"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-lawsuit-settle",
      order: 1,
      type: "dropdown",
      label: "February 2025: Settled lawsuit filed in 2023 for $2M (previously estimated at $1M)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-law-type1",
      },
      explanation: "Settlement provides evidence of condition (liability) that existed at year-end; Type I adjustment",
      dropdownOptions: [
        { id: "opt-law-type1", order: 1, text: "Type I - Adjust liability to $2M", isCorrect: true },
        { id: "opt-law-type2", order: 2, text: "Type II - Disclose settlement only", isCorrect: false },
        { id: "opt-law-none", order: 3, text: "No action - post year-end event", isCorrect: false },
      ],
    },
    {
      id: "req-fire",
      order: 2,
      type: "dropdown",
      label: "January 2025: Major warehouse destroyed by fire; $5M in inventory lost",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fire-type2",
      },
      explanation: "Fire occurred after year-end; condition did not exist at 12/31; Type II disclosure",
      dropdownOptions: [
        { id: "opt-fire-type1", order: 1, text: "Type I - Write down inventory at year-end", isCorrect: false },
        { id: "opt-fire-type2", order: 2, text: "Type II - Disclose the fire and loss", isCorrect: true },
        { id: "opt-fire-gc", order: 3, text: "Going concern issue only", isCorrect: false },
      ],
    },
    {
      id: "req-customer-bk",
      order: 3,
      type: "dropdown",
      label: "February 2025: Major customer (10% of AR) filed bankruptcy due to fraud discovered in January",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-bk-type2",
      },
      explanation: "Fraud discovered post year-end indicates condition arose after; Type II disclosure",
      dropdownOptions: [
        { id: "opt-bk-type1", order: 1, text: "Type I - Write off receivable", isCorrect: false },
        { id: "opt-bk-type2", order: 2, text: "Type II - Disclose customer situation", isCorrect: true },
        { id: "opt-bk-both", order: 3, text: "Both adjust and disclose", isCorrect: false },
      ],
    },
    {
      id: "req-audit-adj",
      order: 4,
      type: "dropdown",
      label: "February 2025: Audit discovered $500K unrecorded vendor invoice from November 2024",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-adj-type1",
      },
      explanation: "Invoice from before year-end is an error correction; adjust statements",
      dropdownOptions: [
        { id: "opt-adj-type1", order: 1, text: "Type I - Adjust to record liability", isCorrect: true },
        { id: "opt-adj-type2", order: 2, text: "Type II - Disclose only", isCorrect: false },
        { id: "opt-adj-next", order: 3, text: "Record in next year", isCorrect: false },
      ],
    },
    {
      id: "req-merger",
      order: 5,
      type: "dropdown",
      label: "March 2025: Announced agreement to acquire competitor for $50M (5x current year revenue)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-merge-type2",
      },
      explanation: "Merger agreement occurred post year-end; disclose significant acquisition",
      dropdownOptions: [
        { id: "opt-merge-type1", order: 1, text: "Type I - Record acquisition", isCorrect: false },
        { id: "opt-merge-type2", order: 2, text: "Type II - Disclose planned acquisition", isCorrect: true },
        { id: "opt-merge-none", order: 3, text: "No disclosure needed until closing", isCorrect: false },
      ],
    },
    {
      id: "req-inventory-nrv",
      order: 6,
      type: "dropdown",
      label: "January 2025: Product prices dropped 30% due to new competitor entering market in January",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-nrv-type2",
      },
      explanation: "Competitor entry and price drop occurred after year-end; Type II (condition arose after)",
      dropdownOptions: [
        { id: "opt-nrv-type1", order: 1, text: "Type I - Write down inventory to NRV", isCorrect: false },
        { id: "opt-nrv-type2", order: 2, text: "Type II - Disclose market conditions", isCorrect: true },
        { id: "opt-nrv-none", order: 3, text: "No action required", isCorrect: false },
      ],
    },
  ],
};

export const audConfirmationProceduresTBS: TBSQuestion = {
  id: "tbs-aud-070",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Audit Evidence",
  subtopic: "Confirmation Procedures",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Accounts Receivable Confirmation Analysis",
  scenarioText: `You sent positive confirmation requests to 100 customer accounts as part of your accounts receivable audit. The total population of accounts receivable is $5,000,000, and the confirmed sample represents $2,800,000 in balances. Analyze the confirmation results.

Required: Calculate the relevant statistics and evaluate the results.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-confirm-results",
      order: 1,
      title: "Confirmation Results Summary",
      type: "table",
      content: {
        type: "table",
        title: "Results of Positive Confirmations",
        headers: ["Response Category", "Number", "Book Value", "Confirmed Amount"],
        rows: [
          { cells: ["Confirmed - no exception", "68", "$1,850,000", "$1,850,000"] },
          { cells: ["Confirmed - exception (client error)", "8", "$280,000", "$265,000"] },
          { cells: ["Confirmed - exception (timing difference)", "7", "$220,000", "$180,000"] },
          { cells: ["No response - alternative procedures successful", "12", "$350,000", "$342,000"] },
          { cells: ["No response - alternative procedures unsuccessful", "5", "$100,000", "Not verified"] },
          { cells: ["Total", "100", "$2,800,000", "-"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-response-rate",
      order: 1,
      type: "numeric",
      label: "Confirmation response rate (percentage of responses received, excluding non-responses)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 83,
        tolerance: 1,
      },
      explanation: "Response rate = (68 + 8 + 7) ÷ 100 = 83%",
    },
    {
      id: "req-exception-rate",
      order: 2,
      type: "numeric",
      label: "Exception rate among responses (percentage with exceptions)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 18,
        tolerance: 1,
      },
      explanation: "Exception rate = (8 + 7) ÷ (68 + 8 + 7) = 15 ÷ 83 = 18%",
    },
    {
      id: "req-misstatement-client",
      order: 3,
      type: "numeric",
      label: "Total dollar amount of client errors identified",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15000,
        tolerance: 0,
      },
      explanation: "Client errors = $280,000 - $265,000 = $15,000 overstatement",
    },
    {
      id: "req-unverified",
      order: 4,
      type: "numeric",
      label: "Dollar value of balances that could not be verified through any procedure",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 100000,
        tolerance: 0,
      },
      explanation: "$100,000 from the 5 non-responses where alternative procedures were unsuccessful",
    },
    {
      id: "req-coverage",
      order: 5,
      type: "numeric",
      label: "Percentage of total AR population that was verified (round to whole number)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 54,
        tolerance: 1,
      },
      explanation: "Verified = ($2,800,000 - $100,000) ÷ $5,000,000 = $2,700,000 ÷ $5,000,000 = 54%",
    },
  ],
};

export const audGoingConcernIndicatorsTBS: TBSQuestion = {
  id: "tbs-aud-071",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Going Concern",
  subtopic: "Going Concern Indicators",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "AUD-IV",
  title: "Going Concern Evaluation",
  scenarioText: `You are evaluating going concern for Coastal Manufacturing Inc. The fiscal year ended December 31, 2024, and you are completing fieldwork in March 2025. Management has not included going concern disclosure.

Required: Evaluate each indicator and determine its significance for going concern assessment.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-financials",
      order: 1,
      title: "Financial Information",
      type: "table",
      content: {
        type: "table",
        title: "Selected Financial Data",
        headers: ["Metric", "2024", "2023", "2022"],
        rows: [
          { cells: ["Revenue", "$45M", "$62M", "$71M"] },
          { cells: ["Net Income (Loss)", "($8.2M)", "($3.5M)", "$2.1M"] },
          { cells: ["Working Capital", "$2.1M", "$6.8M", "$15.2M"] },
          { cells: ["Cash from Operations", "($5.4M)", "($2.1M)", "$4.3M"] },
          { cells: ["Total Debt", "$28M", "$24M", "$18M"] },
          { cells: ["Debt/Equity Ratio", "4.2", "2.8", "1.5"] },
        ],
      },
    },
    {
      id: "exhibit-other-info",
      order: 2,
      title: "Other Information",
      type: "text",
      content: {
        type: "text",
        title: "Additional Facts",
        paragraphs: [
          "Primary bank loan ($20M) matures April 30, 2025; renewal discussions ongoing",
          "Main customer (35% of revenue) lost in January 2025 to competitor",
          "Management projects break-even by Q4 2025 through cost cuts",
          "CEO personally guaranteed $5M of bank debt",
          "Equipment appraisal shows $15M in liquidation value",
          "No alternative financing sources have been identified",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-neg-trend",
      order: 1,
      type: "dropdown",
      label: "Three-year trend in financial performance",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-trend-severe",
      },
      explanation: "Declining revenue, increasing losses, negative cash flow, rising debt - all are severe indicators",
      dropdownOptions: [
        { id: "opt-trend-mild", order: 1, text: "Mild indicator - cyclical downturn", isCorrect: false },
        { id: "opt-trend-moderate", order: 2, text: "Moderate indicator - concerning but manageable", isCorrect: false },
        { id: "opt-trend-severe", order: 3, text: "Severe indicator - substantial doubt about going concern", isCorrect: true },
      ],
    },
    {
      id: "req-debt-maturity",
      order: 2,
      type: "dropdown",
      label: "Significance of $20M loan maturing in April 2025",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-debt-critical",
      },
      explanation: "Imminent maturity with uncertain renewal is critical given weak financial position",
      dropdownOptions: [
        { id: "opt-debt-normal", order: 1, text: "Normal business - loans mature regularly", isCorrect: false },
        { id: "opt-debt-moderate", order: 2, text: "Moderate concern - monitor negotiations", isCorrect: false },
        { id: "opt-debt-critical", order: 3, text: "Critical - maturity within 12 months with no confirmed renewal", isCorrect: true },
      ],
    },
    {
      id: "req-customer-loss",
      order: 3,
      type: "dropdown",
      label: "Loss of main customer representing 35% of revenue",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cust-severe",
      },
      explanation: "Loss of major customer significantly impacts ability to generate future cash flows",
      dropdownOptions: [
        { id: "opt-cust-normal", order: 1, text: "Normal business risk - customers change", isCorrect: false },
        { id: "opt-cust-moderate", order: 2, text: "Moderate - can be replaced over time", isCorrect: false },
        { id: "opt-cust-severe", order: 3, text: "Severe - significantly impairs ability to meet obligations", isCorrect: true },
      ],
    },
    {
      id: "req-mgmt-plan",
      order: 4,
      type: "dropdown",
      label: "Management's projected break-even by Q4 2025",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-plan-insufficient",
      },
      explanation: "Cost cuts alone without revenue replacement for lost customer makes plan unrealistic",
      dropdownOptions: [
        { id: "opt-plan-mitigates", order: 1, text: "Adequately mitigates going concern doubt", isCorrect: false },
        { id: "opt-plan-insufficient", order: 2, text: "Insufficient - plan lacks support given customer loss", isCorrect: true },
        { id: "opt-plan-irrelevant", order: 3, text: "Management plans are not auditor's responsibility", isCorrect: false },
      ],
    },
    {
      id: "req-overall-conclusion",
      order: 5,
      type: "dropdown",
      label: "Overall going concern conclusion",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-overall-substantial",
      },
      explanation: "Multiple severe indicators with inadequate mitigation plans = substantial doubt",
      dropdownOptions: [
        { id: "opt-overall-none", order: 1, text: "No substantial doubt - temporary difficulties", isCorrect: false },
        { id: "opt-overall-substantial", order: 2, text: "Substantial doubt exists about going concern", isCorrect: true },
        { id: "opt-overall-immediate", order: 3, text: "Immediate liquidation appears certain", isCorrect: false },
      ],
    },
    {
      id: "req-report-impact",
      order: 6,
      type: "dropdown",
      label: "Report impact if management refuses to add going concern disclosure",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rpt-qualified",
      },
      explanation: "Inadequate disclosure of substantial doubt is GAAP departure requiring qualification or adverse",
      dropdownOptions: [
        { id: "opt-rpt-unmod-eom", order: 1, text: "Unmodified with EOM paragraph added by auditor", isCorrect: false },
        { id: "opt-rpt-qualified", order: 2, text: "Qualified or adverse for GAAP departure", isCorrect: true },
        { id: "opt-rpt-disclaimer", order: 3, text: "Disclaimer of opinion", isCorrect: false },
      ],
    },
  ],
};

// Phase 3 expansion - Batch 2 (tbs-aud-072 through tbs-aud-081)

export const audJournalEntryTestingTBS: TBSQuestion = {
  id: "tbs-aud-072",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Fraud Procedures",
  subtopic: "Journal Entry Testing",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Journal Entry Testing for Fraud Risk",
  scenarioText: `As part of your response to fraud risk, you are designing journal entry testing procedures for Summit Corporation. The company uses an ERP system with 45,000+ journal entries annually.

Required: Evaluate each aspect of the journal entry testing approach.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-je-info",
      order: 1,
      title: "Journal Entry Population Information",
      type: "table",
      content: {
        type: "table",
        title: "Journal Entry Statistics",
        headers: ["Entry Type", "Annual Count", "Typical Characteristics"],
        rows: [
          { cells: ["Standard recurring", "38,000", "System-generated, routine"] },
          { cells: ["Non-standard manual", "5,500", "Require approval, infrequent"] },
          { cells: ["Top-side/consolidating", "850", "Made by accounting management"] },
          { cells: ["Year-end adjusting", "650", "High value, judgment-based"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-focus",
      order: 1,
      type: "dropdown",
      label: "Which entry types should receive primary focus for fraud testing?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-focus-manual",
      },
      explanation: "Non-standard, top-side, and year-end entries have higher fraud risk",
      dropdownOptions: [
        { id: "opt-focus-all", order: 1, text: "All entries equally - comprehensive coverage", isCorrect: false },
        { id: "opt-focus-manual", order: 2, text: "Non-standard, top-side, and year-end entries", isCorrect: true },
        { id: "opt-focus-large", order: 3, text: "Only large dollar entries regardless of type", isCorrect: false },
      ],
    },
    {
      id: "req-selection",
      order: 2,
      type: "dropdown",
      label: "Appropriate selection criteria for fraud-related testing",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-sel-characteristics",
      },
      explanation: "Fraud testing should target entries with unusual characteristics, not just random selection",
      dropdownOptions: [
        { id: "opt-sel-random", order: 1, text: "Random selection from all entries", isCorrect: false },
        { id: "opt-sel-characteristics", order: 2, text: "Entries with unusual characteristics (odd times, round amounts, unusual accounts)", isCorrect: true },
        { id: "opt-sel-large", order: 3, text: "Top 100 entries by dollar amount", isCorrect: false },
      ],
    },
    {
      id: "req-timing",
      order: 3,
      type: "dropdown",
      label: "When should journal entry testing be performed?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-time-throughout",
      },
      explanation: "Testing throughout year with focus on close process provides better coverage",
      dropdownOptions: [
        { id: "opt-time-interim", order: 1, text: "Only at interim - more time for follow-up", isCorrect: false },
        { id: "opt-time-yearend", order: 2, text: "Only at year-end - captures adjusting entries", isCorrect: false },
        { id: "opt-time-throughout", order: 3, text: "Throughout the year with emphasis on close process", isCorrect: true },
      ],
    },
    {
      id: "req-topside",
      order: 4,
      type: "dropdown",
      label: "Why do top-side entries require special attention?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-top-override",
      },
      explanation: "Top-side entries bypass normal controls and are made by senior personnel",
      dropdownOptions: [
        { id: "opt-top-volume", order: 1, text: "High volume makes them risky", isCorrect: false },
        { id: "opt-top-override", order: 2, text: "Often bypass normal controls and made by management", isCorrect: true },
        { id: "opt-top-system", order: 3, text: "System-generated entries have more errors", isCorrect: false },
      ],
    },
    {
      id: "req-unusual",
      order: 5,
      type: "dropdown",
      label: "Which is an unusual characteristic warranting investigation?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-unusual-all",
      },
      explanation: "All listed items are red flags for potential fraudulent entries",
      dropdownOptions: [
        { id: "opt-unusual-round", order: 1, text: "Round-dollar amounts only", isCorrect: false },
        { id: "opt-unusual-weekend", order: 2, text: "Weekend or holiday posting only", isCorrect: false },
        { id: "opt-unusual-all", order: 3, text: "All: odd timing, round amounts, unusual account combinations, no/vague description", isCorrect: true },
      ],
    },
    {
      id: "req-documentation",
      order: 6,
      type: "dropdown",
      label: "What should be documented for selected entries?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-doc-complete",
      },
      explanation: "Complete documentation of selection rationale, testing, and conclusions required",
      dropdownOptions: [
        { id: "opt-doc-list", order: 1, text: "List of entries tested only", isCorrect: false },
        { id: "opt-doc-complete", order: 2, text: "Selection criteria, testing performed, support examined, and conclusions", isCorrect: true },
        { id: "opt-doc-exceptions", order: 3, text: "Only entries with exceptions", isCorrect: false },
      ],
    },
  ],
};

export const audRelatedPartyEvalTBS: TBSQuestion = {
  id: "tbs-aud-073",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Related Parties",
  subtopic: "Related Party Transactions",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "AUD-II",
  title: "Related Party Transaction Evaluation",
  scenarioText: `During the audit of Horizon Holdings, you identified several potential related party transactions. The company is privately held with the founder and family members owning 85% of shares.

Required: Evaluate each transaction for proper identification and disclosure.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-transactions",
      order: 1,
      title: "Potential Related Party Transactions",
      type: "table",
      content: {
        type: "table",
        title: "Identified Transactions",
        headers: ["Description", "Amount", "Other Party"],
        rows: [
          { cells: ["Building lease", "$420,000/year", "CEO's family trust"] },
          { cells: ["IT services contract", "$180,000/year", "Company 40% owned by CFO"] },
          { cells: ["Loan to executive", "$500,000", "VP of Sales (non-owner)"] },
          { cells: ["Purchase of inventory", "$2.1M annual", "Subsidiary 100% owned"] },
          { cells: ["Consulting fees", "$75,000", "Board member's consulting firm"] },
          { cells: ["Equipment sale", "$340,000", "Former CEO (resigned 3 years ago)"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-lease-rp",
      order: 1,
      type: "dropdown",
      label: "Building lease from CEO's family trust",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-lease-rp",
      },
      explanation: "Immediate family interests are related parties; requires disclosure",
      dropdownOptions: [
        { id: "opt-lease-not", order: 1, text: "Not related party - trust is separate legal entity", isCorrect: false },
        { id: "opt-lease-rp", order: 2, text: "Related party - CEO's immediate family interest", isCorrect: true },
        { id: "opt-lease-maybe", order: 3, text: "Depends on trust beneficiaries", isCorrect: false },
      ],
    },
    {
      id: "req-it-contract",
      order: 2,
      type: "dropdown",
      label: "IT services from company 40% owned by CFO",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-it-rp",
      },
      explanation: "Significant ownership by key management makes this a related party",
      dropdownOptions: [
        { id: "opt-it-not", order: 1, text: "Not related party - CFO doesn't control company", isCorrect: false },
        { id: "opt-it-rp", order: 2, text: "Related party - significant influence through ownership", isCorrect: true },
        { id: "opt-it-disclose", order: 3, text: "Disclose only if terms not at arm's length", isCorrect: false },
      ],
    },
    {
      id: "req-exec-loan",
      order: 3,
      type: "dropdown",
      label: "Loan to VP of Sales (non-owner executive)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-loan-rp",
      },
      explanation: "Key management personnel are related parties regardless of ownership",
      dropdownOptions: [
        { id: "opt-loan-not", order: 1, text: "Not related party - no ownership interest", isCorrect: false },
        { id: "opt-loan-rp", order: 2, text: "Related party - key management personnel", isCorrect: true },
        { id: "opt-loan-if", order: 3, text: "Only if loan is below-market rate", isCorrect: false },
      ],
    },
    {
      id: "req-subsidiary",
      order: 4,
      type: "dropdown",
      label: "Inventory purchases from 100% owned subsidiary",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-sub-eliminate",
      },
      explanation: "Intercompany transactions are eliminated in consolidated statements",
      dropdownOptions: [
        { id: "opt-sub-disclose", order: 1, text: "Disclose as related party transaction", isCorrect: false },
        { id: "opt-sub-eliminate", order: 2, text: "Eliminated in consolidation - no separate disclosure needed", isCorrect: true },
        { id: "opt-sub-both", order: 3, text: "Both eliminate and disclose", isCorrect: false },
      ],
    },
    {
      id: "req-board-consult",
      order: 5,
      type: "dropdown",
      label: "Consulting fees to board member's firm",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-board-rp",
      },
      explanation: "Board members are related parties; transactions require evaluation and disclosure",
      dropdownOptions: [
        { id: "opt-board-not", order: 1, text: "Not related party - board members are independent", isCorrect: false },
        { id: "opt-board-rp", order: 2, text: "Related party - board members are related parties", isCorrect: true },
        { id: "opt-board-immaterial", order: 3, text: "Too immaterial to require disclosure", isCorrect: false },
      ],
    },
    {
      id: "req-former-ceo",
      order: 6,
      type: "dropdown",
      label: "Equipment sale to former CEO (resigned 3 years ago)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-former-evaluate",
      },
      explanation: "Former executives may still be related if influence continues; requires evaluation",
      dropdownOptions: [
        { id: "opt-former-not", order: 1, text: "Not related party - no longer with company", isCorrect: false },
        { id: "opt-former-rp", order: 2, text: "Still related party regardless of time passed", isCorrect: false },
        { id: "opt-former-evaluate", order: 3, text: "Evaluate ongoing influence or relationships", isCorrect: true },
      ],
    },
  ],
};

export const audAnalyticalReviewTBS: TBSQuestion = {
  id: "tbs-aud-074",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Analytical Procedures",
  subtopic: "Substantive Analytics",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Substantive Analytical Procedures",
  scenarioText: `You are performing substantive analytical procedures for payroll expense at Industrial Services Corp. The company has 450 employees across three divisions.

Required: Calculate the expected amounts and evaluate the differences.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-payroll-data",
      order: 1,
      title: "Payroll Information",
      type: "table",
      content: {
        type: "table",
        title: "Employee and Compensation Data",
        headers: ["Division", "Employees", "Average Annual Salary", "Recorded Payroll"],
        rows: [
          { cells: ["Manufacturing", "280", "$52,000", "$15,120,000"] },
          { cells: ["Administrative", "95", "$68,000", "$6,290,000"] },
          { cells: ["Sales", "75", "$45,000 base + commission", "$5,850,000"] },
          { cells: ["Total", "450", "-", "$27,260,000"] },
        ],
      },
    },
    {
      id: "exhibit-other-info",
      order: 2,
      title: "Additional Information",
      type: "text",
      content: {
        type: "text",
        title: "Compensation Details",
        paragraphs: [
          "Sales commissions averaged 18% of base salary this year",
          "Prior year total payroll: $24,850,000 with 420 employees",
          "Industry average salary increase: 4%",
          "Company announced 3% merit increases effective July 1",
          "No significant changes in employee mix year-over-year",
          "Tolerable difference for analytical procedures: $500,000",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-mfg-expect",
      order: 1,
      type: "numeric",
      label: "Expected manufacturing payroll (employees × average salary)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 14560000,
        tolerance: 0,
      },
      explanation: "280 employees × $52,000 = $14,560,000",
    },
    {
      id: "req-sales-expect",
      order: 2,
      type: "numeric",
      label: "Expected sales payroll including 18% commissions (base × 1.18 × employees)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3982500,
        tolerance: 50000,
      },
      explanation: "75 × $45,000 × 1.18 = $3,982,500",
    },
    {
      id: "req-total-expect",
      order: 3,
      type: "numeric",
      label: "Total expected payroll (sum of all divisions)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25002500,
        tolerance: 50000,
      },
      explanation: "$14,560,000 + (95 × $68,000) + $3,982,500 = $14,560,000 + $6,460,000 + $3,982,500 = $25,002,500",
    },
    {
      id: "req-difference",
      order: 4,
      type: "numeric",
      label: "Difference between recorded and expected payroll",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2257500,
        tolerance: 100000,
      },
      explanation: "$27,260,000 - $25,002,500 = $2,257,500 higher than expected",
    },
    {
      id: "req-py-growth",
      order: 5,
      type: "numeric",
      label: "Percentage increase from prior year payroll (round to whole number)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10,
        tolerance: 1,
      },
      explanation: "($27,260,000 - $24,850,000) ÷ $24,850,000 = 9.7%, rounds to 10%",
    },
  ],
};

export const audAuditCommitteeCommunicationTBS: TBSQuestion = {
  id: "tbs-aud-075",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Communications",
  subtopic: "Audit Committee Communications",
  difficulty: "easy",
  skillLevel: "remembering_understanding",
  contentArea: "AUD-IV",
  title: "Audit Committee Communication Requirements",
  scenarioText: `You are preparing communications to the audit committee for Pinnacle Corporation at the completion of the audit. Determine which items require communication.

Required: Identify whether each item must be communicated to the audit committee.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-comm-req",
      order: 1,
      title: "Communication Requirements",
      type: "text",
      content: {
        type: "text",
        title: "Required Communications (AU-C 260)",
        paragraphs: [
          "Auditor's responsibilities under GAAS",
          "Planned scope and timing of the audit",
          "Significant findings from the audit including:",
          "- Significant accounting policies and practices",
          "- Critical audit matters (for public companies)",
          "- Difficult or contentious matters consulted",
          "- Uncorrected misstatements",
          "- Material weaknesses and significant deficiencies",
          "- Disagreements with management",
          "- Management representations requested",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-passed-adj",
      order: 1,
      type: "dropdown",
      label: "Immaterial audit adjustments not recorded by management",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-passed-yes",
      },
      explanation: "Uncorrected misstatements must be communicated, even if immaterial individually",
      dropdownOptions: [
        { id: "opt-passed-no", order: 1, text: "Not required - below materiality", isCorrect: false },
        { id: "opt-passed-yes", order: 2, text: "Required - uncorrected misstatements", isCorrect: true },
        { id: "opt-passed-opt", order: 3, text: "Optional - at auditor's discretion", isCorrect: false },
      ],
    },
    {
      id: "req-fee",
      order: 2,
      type: "dropdown",
      label: "Audit fee negotiations and final fee",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fee-not",
      },
      explanation: "Fee discussions are typically not required communications unless affecting independence",
      dropdownOptions: [
        { id: "opt-fee-yes", order: 1, text: "Required communication", isCorrect: false },
        { id: "opt-fee-not", order: 2, text: "Not specifically required", isCorrect: true },
        { id: "opt-fee-annual", order: 3, text: "Only for first-year audits", isCorrect: false },
      ],
    },
    {
      id: "req-sig-def",
      order: 3,
      type: "dropdown",
      label: "Significant deficiency in internal control over cash",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-def-required",
      },
      explanation: "Significant deficiencies must be communicated to audit committee in writing",
      dropdownOptions: [
        { id: "opt-def-mgmt", order: 1, text: "Management only, not audit committee", isCorrect: false },
        { id: "opt-def-required", order: 2, text: "Required - in writing to audit committee", isCorrect: true },
        { id: "opt-def-if", order: 3, text: "Only if management doesn't correct it", isCorrect: false },
      ],
    },
    {
      id: "req-consult",
      order: 4,
      type: "dropdown",
      label: "Consultation with firm's technical department on complex lease",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-consult-yes",
      },
      explanation: "Difficult matters consulted are required communications if significant",
      dropdownOptions: [
        { id: "opt-consult-no", order: 1, text: "Internal firm matter - not communicated", isCorrect: false },
        { id: "opt-consult-yes", order: 2, text: "Required if contentious or significant", isCorrect: true },
        { id: "opt-consult-oral", order: 3, text: "Only oral communication needed", isCorrect: false },
      ],
    },
    {
      id: "req-disagree",
      order: 5,
      type: "dropdown",
      label: "Disagreement with management over revenue recognition, ultimately resolved",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-disagree-yes",
      },
      explanation: "Disagreements with management must be communicated even if resolved",
      dropdownOptions: [
        { id: "opt-disagree-no", order: 1, text: "Not required - issue was resolved", isCorrect: false },
        { id: "opt-disagree-yes", order: 2, text: "Required - disagreements must be communicated", isCorrect: true },
        { id: "opt-disagree-serious", order: 3, text: "Only if unresolved or very serious", isCorrect: false },
      ],
    },
    {
      id: "req-mgmt-rep",
      order: 6,
      type: "dropdown",
      label: "Written representations obtained from management",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rep-yes",
      },
      explanation: "Required to inform about written representations requested from management",
      dropdownOptions: [
        { id: "opt-rep-no", order: 1, text: "Not required - routine matter", isCorrect: false },
        { id: "opt-rep-yes", order: 2, text: "Required communication", isCorrect: true },
        { id: "opt-rep-if", order: 3, text: "Only if management refused a representation", isCorrect: false },
      ],
    },
  ],
};

export const audInventoryValuationTBS: TBSQuestion = {
  id: "tbs-aud-076",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Substantive Procedures",
  subtopic: "Inventory Audit",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Inventory Audit Procedures",
  scenarioText: `You are auditing inventory at Metro Manufacturing, which has $18 million in inventory across 3 warehouse locations. The company uses standard costs with periodic variance analysis.

Required: Select the appropriate audit procedure for each inventory assertion or risk.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-inv-info",
      order: 1,
      title: "Inventory Information",
      type: "table",
      content: {
        type: "table",
        title: "Inventory Composition",
        headers: ["Category", "Amount", "Characteristics"],
        rows: [
          { cells: ["Raw materials", "$4.2M", "Commodities with market prices"] },
          { cells: ["Work in process", "$5.8M", "Labor and overhead allocation"] },
          { cells: ["Finished goods", "$8.0M", "Standard costs, some slow-moving"] },
          { cells: ["Total", "$18.0M", "-"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-existence",
      order: 1,
      type: "dropdown",
      label: "Primary procedure for existence assertion",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-exist-observe",
      },
      explanation: "Physical observation is the primary procedure for inventory existence",
      dropdownOptions: [
        { id: "opt-exist-confirm", order: 1, text: "Confirmation with third-party warehouses", isCorrect: false },
        { id: "opt-exist-observe", order: 2, text: "Physical observation of inventory count", isCorrect: true },
        { id: "opt-exist-review", order: 3, text: "Review of purchase invoices", isCorrect: false },
      ],
    },
    {
      id: "req-valuation-raw",
      order: 2,
      type: "dropdown",
      label: "Appropriate procedure for raw material valuation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-val-market",
      },
      explanation: "Compare to market prices for commodities to test lower of cost or market",
      dropdownOptions: [
        { id: "opt-val-invoice", order: 1, text: "Vouch to purchase invoice only", isCorrect: false },
        { id: "opt-val-market", order: 2, text: "Compare cost to current market/replacement prices", isCorrect: true },
        { id: "opt-val-standard", order: 3, text: "Verify standard cost calculation", isCorrect: false },
      ],
    },
    {
      id: "req-wip-cost",
      order: 3,
      type: "dropdown",
      label: "Testing overhead allocation in WIP",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-wip-recalc",
      },
      explanation: "Recalculate overhead rates and test allocation methodology",
      dropdownOptions: [
        { id: "opt-wip-accept", order: 1, text: "Accept management's standard rates", isCorrect: false },
        { id: "opt-wip-recalc", order: 2, text: "Recalculate overhead rates and test allocation", isCorrect: true },
        { id: "opt-wip-count", order: 3, text: "Focus on physical count only", isCorrect: false },
      ],
    },
    {
      id: "req-slow-moving",
      order: 4,
      type: "dropdown",
      label: "Addressing slow-moving finished goods risk",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-slow-aging",
      },
      explanation: "Age analysis identifies slow-moving items requiring valuation adjustment",
      dropdownOptions: [
        { id: "opt-slow-discuss", order: 1, text: "Discuss with management only", isCorrect: false },
        { id: "opt-slow-aging", order: 2, text: "Prepare aging analysis and compare to sales activity", isCorrect: true },
        { id: "opt-slow-py", order: 3, text: "Compare to prior year levels only", isCorrect: false },
      ],
    },
    {
      id: "req-cutoff",
      order: 5,
      type: "dropdown",
      label: "Primary procedure for inventory cutoff",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cut-shipping",
      },
      explanation: "Review receiving and shipping documents around year-end to verify cutoff",
      dropdownOptions: [
        { id: "opt-cut-confirm", order: 1, text: "Confirm with vendors and customers", isCorrect: false },
        { id: "opt-cut-shipping", order: 2, text: "Examine shipping/receiving documents around year-end", isCorrect: true },
        { id: "opt-cut-count", order: 3, text: "Recount inventory after year-end", isCorrect: false },
      ],
    },
    {
      id: "req-variance",
      order: 6,
      type: "dropdown",
      label: "Evaluating standard cost variance treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-var-allocate",
      },
      explanation: "Material variances should be allocated between inventory and COGS for GAAP",
      dropdownOptions: [
        { id: "opt-var-expense", order: 1, text: "Verify all variances expensed to COGS", isCorrect: false },
        { id: "opt-var-allocate", order: 2, text: "Test allocation of material variances to inventory and COGS", isCorrect: true },
        { id: "opt-var-immaterial", order: 3, text: "No testing needed if variances are small", isCorrect: false },
      ],
    },
  ],
};

export const audEstimatesEvaluationTBS: TBSQuestion = {
  id: "tbs-aud-077",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Accounting Estimates",
  subtopic: "Estimate Evaluation",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "AUD-III",
  title: "Accounting Estimate Evaluation",
  scenarioText: `You are evaluating management's accounting estimates for Vista Healthcare Services. The company has several significant estimates requiring professional judgment.

Required: Evaluate each estimate and determine the appropriate audit approach.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-estimates",
      order: 1,
      title: "Significant Estimates",
      type: "table",
      content: {
        type: "table",
        title: "Management Estimates",
        headers: ["Estimate", "Amount", "Key Assumptions"],
        rows: [
          { cells: ["Allowance for doubtful accounts", "$2.8M", "Historical collection rates by aging bucket"] },
          { cells: ["Self-insurance reserve", "$4.5M", "Actuarial study, claims experience"] },
          { cells: ["Goodwill (no impairment recorded)", "$22M", "Revenue growth 8%, discount rate 10%"] },
          { cells: ["Contingent litigation accrual", "$1.5M", "Legal counsel probability assessment"] },
          { cells: ["Useful life of medical equipment", "7 years", "Industry practice, maintenance contracts"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-allowance-approach",
      order: 1,
      type: "dropdown",
      label: "Most effective approach for testing allowance estimate",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-allow-retrospective",
      },
      explanation: "Retrospective review of prior year estimate versus actual provides evidence of estimating ability",
      dropdownOptions: [
        { id: "opt-allow-accept", order: 1, text: "Accept management's methodology if documented", isCorrect: false },
        { id: "opt-allow-retrospective", order: 2, text: "Retrospective review comparing prior estimates to actual experience", isCorrect: true },
        { id: "opt-allow-confirm", order: 3, text: "Confirm receivables to verify existence only", isCorrect: false },
      ],
    },
    {
      id: "req-insurance-approach",
      order: 2,
      type: "dropdown",
      label: "Audit approach for self-insurance reserve",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ins-specialist",
      },
      explanation: "Complex actuarial estimates typically require auditor's specialist involvement",
      dropdownOptions: [
        { id: "opt-ins-accept", order: 1, text: "Accept management's actuary report", isCorrect: false },
        { id: "opt-ins-specialist", order: 2, text: "Involve auditor's specialist to evaluate assumptions and methods", isCorrect: true },
        { id: "opt-ins-recalc", order: 3, text: "Recalculate reserve independently", isCorrect: false },
      ],
    },
    {
      id: "req-goodwill-risk",
      order: 3,
      type: "dropdown",
      label: "Highest risk element in goodwill impairment analysis",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-gw-growth",
      },
      explanation: "Revenue growth assumptions significantly impact fair value; 8% may be optimistic",
      dropdownOptions: [
        { id: "opt-gw-discount", order: 1, text: "Discount rate is too high", isCorrect: false },
        { id: "opt-gw-growth", order: 2, text: "Revenue growth assumption may be optimistic", isCorrect: true },
        { id: "opt-gw-method", order: 3, text: "Valuation methodology is inappropriate", isCorrect: false },
      ],
    },
    {
      id: "req-litigation-eval",
      order: 4,
      type: "dropdown",
      label: "Evaluating contingent litigation accrual",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-lit-lawyer",
      },
      explanation: "Legal counsel's assessment is key evidence; auditor should corroborate through inquiry letter",
      dropdownOptions: [
        { id: "opt-lit-accept", order: 1, text: "Accept management's assessment", isCorrect: false },
        { id: "opt-lit-lawyer", order: 2, text: "Obtain and evaluate attorney's letter and probability assessment", isCorrect: true },
        { id: "opt-lit-history", order: 3, text: "Review historical litigation outcomes only", isCorrect: false },
      ],
    },
    {
      id: "req-useful-life",
      order: 5,
      type: "dropdown",
      label: "Testing reasonableness of 7-year useful life",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-life-compare",
      },
      explanation: "Compare to industry practices, actual retirement patterns, and technology changes",
      dropdownOptions: [
        { id: "opt-life-accept", order: 1, text: "Accept if consistent with prior years", isCorrect: false },
        { id: "opt-life-compare", order: 2, text: "Compare to industry data, actual retirements, and technological changes", isCorrect: true },
        { id: "opt-life-gaap", order: 3, text: "Verify GAAP does not specify different life", isCorrect: false },
      ],
    },
    {
      id: "req-bias-indicator",
      order: 6,
      type: "dropdown",
      label: "Indicator of possible management bias in estimates",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-bias-pattern",
      },
      explanation: "Pattern of adjustments in same direction suggests systematic bias",
      dropdownOptions: [
        { id: "opt-bias-changes", order: 1, text: "Estimates change year-to-year", isCorrect: false },
        { id: "opt-bias-pattern", order: 2, text: "Pattern of estimates consistently at favorable end of range", isCorrect: true },
        { id: "opt-bias-differ", order: 3, text: "Management's estimate differs from auditor's point estimate", isCorrect: false },
      ],
    },
  ],
};

export const audLawyerLetterTBS: TBSQuestion = {
  id: "tbs-aud-078",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Audit Evidence",
  subtopic: "Attorney Inquiry Letters",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Attorney Letter Evaluation",
  scenarioText: `You received responses to inquiry letters sent to outside legal counsel for Apex Industries. Evaluate each response for adequacy of audit evidence.

Required: Determine the appropriate audit response to each attorney letter situation.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-responses",
      order: 1,
      title: "Attorney Letter Responses",
      type: "text",
      content: {
        type: "text",
        title: "Summary of Attorney Responses",
        paragraphs: [
          "ATTORNEY A (primary outside counsel): Complete response covering all pending litigation with probability and range assessments",
          "ATTORNEY B (patent counsel): Letter states 'We have no opinion on the likelihood of outcome in the pending patent matter'",
          "ATTORNEY C (employment law): Response limits scope to 'matters where fees exceed $25,000'",
          "ATTORNEY D (environmental): No response received despite two follow-up requests",
          "ATTORNEY E (general): States no unbilled work and confirms matter list is complete",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-attorney-a",
      order: 1,
      type: "dropdown",
      label: "Attorney A: Complete response with assessments",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-sufficient",
      },
      explanation: "Complete response with probability assessments is sufficient audit evidence",
      dropdownOptions: [
        { id: "opt-a-insufficient", order: 1, text: "Insufficient - need second opinion", isCorrect: false },
        { id: "opt-a-sufficient", order: 2, text: "Sufficient - complete with probability assessments", isCorrect: true },
        { id: "opt-a-followup", order: 3, text: "Need follow-up on specific matters", isCorrect: false },
      ],
    },
    {
      id: "req-attorney-b",
      order: 2,
      type: "dropdown",
      label: "Attorney B: No opinion on patent matter likelihood",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b-limitation",
      },
      explanation: "Refusal to assess likelihood creates scope limitation for that matter",
      dropdownOptions: [
        { id: "opt-b-accept", order: 1, text: "Accept - attorneys sometimes cannot opine", isCorrect: false },
        { id: "opt-b-limitation", order: 2, text: "Scope limitation - consider implications and alternatives", isCorrect: true },
        { id: "opt-b-ignore", order: 3, text: "Ignore - immaterial patent matter", isCorrect: false },
      ],
    },
    {
      id: "req-attorney-c",
      order: 3,
      type: "dropdown",
      label: "Attorney C: Response limited to matters over $25,000 fees",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c-inadequate",
      },
      explanation: "Fee limitation may exclude significant matters; need unrestricted response",
      dropdownOptions: [
        { id: "opt-c-adequate", order: 1, text: "Adequate - large matters are more significant", isCorrect: false },
        { id: "opt-c-inadequate", order: 2, text: "Inadequate - request unrestricted response or evaluate impact", isCorrect: true },
        { id: "opt-c-accept", order: 3, text: "Accept for employment matters which are routine", isCorrect: false },
      ],
    },
    {
      id: "req-attorney-d",
      order: 4,
      type: "dropdown",
      label: "Attorney D: No response despite follow-ups",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-d-serious",
      },
      explanation: "Non-response from environmental counsel is serious given typical significance",
      dropdownOptions: [
        { id: "opt-d-accept", order: 1, text: "Accept - if no environmental issues known", isCorrect: false },
        { id: "opt-d-serious", order: 2, text: "Serious scope limitation - consider management inquiry and report impact", isCorrect: true },
        { id: "opt-d-wait", order: 3, text: "Continue waiting for response", isCorrect: false },
      ],
    },
    {
      id: "req-attorney-e",
      order: 5,
      type: "dropdown",
      label: "Attorney E: No unbilled work, confirms list complete",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e-adequate",
      },
      explanation: "Confirmation that list is complete and no unbilled matters is adequate",
      dropdownOptions: [
        { id: "opt-e-inadequate", order: 1, text: "Inadequate - need probability assessments", isCorrect: false },
        { id: "opt-e-adequate", order: 2, text: "Adequate - confirms no matters beyond those listed", isCorrect: true },
        { id: "opt-e-followup", order: 3, text: "Follow up on why no assessment provided", isCorrect: false },
      ],
    },
    {
      id: "req-overall",
      order: 6,
      type: "dropdown",
      label: "Overall impact if environmental attorney never responds",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-overall-qualified",
      },
      explanation: "Material scope limitation may require qualified opinion or disclaimer",
      dropdownOptions: [
        { id: "opt-overall-unmodified", order: 1, text: "Unmodified - other attorneys responded", isCorrect: false },
        { id: "opt-overall-qualified", order: 2, text: "Qualified or disclaimer depending on materiality", isCorrect: true },
        { id: "opt-overall-eom", order: 3, text: "Unmodified with Emphasis of Matter", isCorrect: false },
      ],
    },
  ],
};

export const audPriorPeriodAdjustmentTBS: TBSQuestion = {
  id: "tbs-aud-079",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Prior Period Items",
  subtopic: "Error Corrections",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "AUD-III",
  title: "Prior Period Adjustment Evaluation",
  scenarioText: `During the current year audit of Beacon Industries, you discovered errors affecting prior period financial statements. Evaluate each situation to determine proper treatment.

Required: Determine the appropriate accounting and audit treatment for each error.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-errors",
      order: 1,
      title: "Identified Errors",
      type: "table",
      content: {
        type: "table",
        title: "Prior Period Errors Discovered",
        headers: ["Error", "Amount", "Year Affected"],
        rows: [
          { cells: ["Revenue recorded in wrong period", "$850,000", "Prior year (overstated)"] },
          { cells: ["Depreciation calculation error", "$125,000/year", "Multiple years understated"] },
          { cells: ["Inventory count error", "$340,000", "Prior year overstated"] },
          { cells: ["Change in estimate for bad debts", "$200,000", "Current and future"] },
          { cells: ["Lease improperly classified", "$2.1M liability", "Prior year (operating vs finance)"] },
        ],
      },
    },
    {
      id: "exhibit-materiality",
      order: 2,
      title: "Materiality Levels",
      type: "text",
      content: {
        type: "text",
        title: "Materiality Information",
        paragraphs: [
          "Current year materiality: $500,000",
          "Prior year materiality (as issued): $450,000",
          "Company issued comparative financial statements (2 years)",
          "Prior year statements were audited by same firm",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-revenue-error",
      order: 1,
      type: "dropdown",
      label: "Revenue timing error ($850K overstated prior year)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rev-restate",
      },
      explanation: "Material error to prior period requires restatement of comparative statements",
      dropdownOptions: [
        { id: "opt-rev-current", order: 1, text: "Record adjustment in current year", isCorrect: false },
        { id: "opt-rev-restate", order: 2, text: "Restate prior year comparative statements", isCorrect: true },
        { id: "opt-rev-disclose", order: 3, text: "Disclose only - prior statements were issued", isCorrect: false },
      ],
    },
    {
      id: "req-depr-error",
      order: 2,
      type: "dropdown",
      label: "Depreciation error affecting multiple years",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-depr-cumulative",
      },
      explanation: "Cumulative effect of immaterial errors may become material; adjust retained earnings",
      dropdownOptions: [
        { id: "opt-depr-immaterial", order: 1, text: "Immaterial each year - no adjustment", isCorrect: false },
        { id: "opt-depr-cumulative", order: 2, text: "Adjust beginning retained earnings if cumulative is material", isCorrect: true },
        { id: "opt-depr-current", order: 3, text: "Record full catch-up in current year expense", isCorrect: false },
      ],
    },
    {
      id: "req-inventory-error",
      order: 3,
      type: "dropdown",
      label: "Inventory count error ($340K overstated prior year)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inv-evaluate",
      },
      explanation: "Below materiality but close; evaluate impact on prior year and current year income",
      dropdownOptions: [
        { id: "opt-inv-ignore", order: 1, text: "Ignore - below materiality", isCorrect: false },
        { id: "opt-inv-evaluate", order: 2, text: "Evaluate full impact on both years for restatement decision", isCorrect: true },
        { id: "opt-inv-restate", order: 3, text: "Automatically restate prior year", isCorrect: false },
      ],
    },
    {
      id: "req-estimate-change",
      order: 4,
      type: "dropdown",
      label: "Change in bad debt estimate methodology",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-est-prospective",
      },
      explanation: "Change in estimate is applied prospectively, not treated as prior period error",
      dropdownOptions: [
        { id: "opt-est-restate", order: 1, text: "Restate prior periods for new methodology", isCorrect: false },
        { id: "opt-est-prospective", order: 2, text: "Apply prospectively to current and future periods", isCorrect: true },
        { id: "opt-est-cumulative", order: 3, text: "Record cumulative catch-up adjustment", isCorrect: false },
      ],
    },
    {
      id: "req-lease-error",
      order: 5,
      type: "dropdown",
      label: "Lease classification error ($2.1M liability not recorded)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-lease-restate",
      },
      explanation: "Material error in lease classification requires restatement",
      dropdownOptions: [
        { id: "opt-lease-current", order: 1, text: "Record liability in current year as change in estimate", isCorrect: false },
        { id: "opt-lease-restate", order: 2, text: "Restate prior year to correct classification", isCorrect: true },
        { id: "opt-lease-disclose", order: 3, text: "Disclose as error but don't restate", isCorrect: false },
      ],
    },
    {
      id: "req-report-impact",
      order: 6,
      type: "dropdown",
      label: "Report impact for restated prior year statements",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rpt-eom",
      },
      explanation: "Restatement to correct error requires Emphasis of Matter paragraph",
      dropdownOptions: [
        { id: "opt-rpt-qualified", order: 1, text: "Qualified opinion on prior year", isCorrect: false },
        { id: "opt-rpt-eom", order: 2, text: "Unmodified with Emphasis of Matter on restatement", isCorrect: true },
        { id: "opt-rpt-none", order: 3, text: "No modification if properly corrected", isCorrect: false },
      ],
    },
  ],
};

export const audSegmentAuditTBS: TBSQuestion = {
  id: "tbs-aud-080",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Group Audits",
  subtopic: "Segment and Component Audits",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "AUD-III",
  title: "Component Auditor Evaluation",
  scenarioText: `You are the group engagement partner for Global Industries, which has subsidiaries audited by component auditors in three countries. You need to determine the appropriate involvement with component auditors.

Required: Evaluate each situation regarding component auditor work.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-components",
      order: 1,
      title: "Component Information",
      type: "table",
      content: {
        type: "table",
        title: "Subsidiaries and Auditors",
        headers: ["Component", "Revenue", "Component Auditor", "Relationship"],
        rows: [
          { cells: ["Germany sub", "$45M (18%)", "Network firm", "Strong working relationship"] },
          { cells: ["Brazil sub", "$28M (11%)", "Local non-network firm", "First year"] },
          { cells: ["Japan sub", "$62M (25%)", "Network firm", "Prior audit issues noted"] },
          { cells: ["UK sub", "$38M (15%)", "Non-network, reputable", "Long-standing relationship"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-germany",
      order: 1,
      type: "dropdown",
      label: "Level of involvement needed for Germany component (network firm)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ger-standard",
      },
      explanation: "Network firm with good relationship - standard involvement procedures appropriate",
      dropdownOptions: [
        { id: "opt-ger-minimal", order: 1, text: "Minimal - can rely on network quality controls", isCorrect: false },
        { id: "opt-ger-standard", order: 2, text: "Standard involvement - instructions, review, communication", isCorrect: true },
        { id: "opt-ger-extensive", order: 3, text: "Extensive - visit site and perform work", isCorrect: false },
      ],
    },
    {
      id: "req-brazil",
      order: 2,
      type: "dropdown",
      label: "Approach for Brazil component (non-network, first year)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-braz-enhanced",
      },
      explanation: "First year with non-network firm requires enhanced procedures to assess competence",
      dropdownOptions: [
        { id: "opt-braz-standard", order: 1, text: "Standard procedures - same as any component", isCorrect: false },
        { id: "opt-braz-enhanced", order: 2, text: "Enhanced procedures to assess competence and independence", isCorrect: true },
        { id: "opt-braz-replace", order: 3, text: "Require network firm to perform audit", isCorrect: false },
      ],
    },
    {
      id: "req-japan",
      order: 3,
      type: "dropdown",
      label: "Response to Japan component with prior audit issues",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-jap-site",
      },
      explanation: "Significant component with prior issues may require site visit or enhanced supervision",
      dropdownOptions: [
        { id: "opt-jap-standard", order: 1, text: "Standard - prior issues were resolved", isCorrect: false },
        { id: "opt-jap-site", order: 2, text: "Consider site visit and enhanced review of work", isCorrect: true },
        { id: "opt-jap-replace", order: 3, text: "Replace component auditor", isCorrect: false },
      ],
    },
    {
      id: "req-reference",
      order: 4,
      type: "dropdown",
      label: "Can you reference component auditors in your report?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ref-yes",
      },
      explanation: "Under current GAAS (AU-C 600), the group auditor may reference a component auditor only when the component auditor performs an audit of a component's financial statements prepared using the same financial reporting framework. When making reference, responsibility is divided.",
      dropdownOptions: [
        { id: "opt-ref-yes", order: 1, text: "Yes - if specific criteria are met and responsibility is divided", isCorrect: true },
        { id: "opt-ref-no", order: 2, text: "No - never permitted under GAAS", isCorrect: false },
        { id: "opt-ref-optional", order: 3, text: "Always at group auditor's discretion", isCorrect: false },
      ],
    },
    {
      id: "req-materiality",
      order: 5,
      type: "dropdown",
      label: "Component materiality compared to group materiality",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-mat-lower",
      },
      explanation: "Component materiality should be lower than group materiality",
      dropdownOptions: [
        { id: "opt-mat-same", order: 1, text: "Same as group materiality", isCorrect: false },
        { id: "opt-mat-lower", order: 2, text: "Lower than group materiality", isCorrect: true },
        { id: "opt-mat-proportional", order: 3, text: "Exactly proportional to component size", isCorrect: false },
      ],
    },
    {
      id: "req-consolidation",
      order: 6,
      type: "dropdown",
      label: "Primary group audit responsibility beyond component work",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-consol-all",
      },
      explanation: "Group auditor must audit consolidation process and group-level items",
      dropdownOptions: [
        { id: "opt-consol-review", order: 1, text: "Review component work only", isCorrect: false },
        { id: "opt-consol-all", order: 2, text: "Audit consolidation, eliminations, and group-level items", isCorrect: true },
        { id: "opt-consol-combine", order: 3, text: "Simply combine component opinions", isCorrect: false },
      ],
    },
  ],
};

export const audComprehensiveOpinionTBS: TBSQuestion = {
  id: "tbs-aud-081",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Audit Reports",
  subtopic: "Opinion Formation",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "AUD-IV",
  title: "Comprehensive Opinion Evaluation",
  scenarioText: `You are completing the audit of Paramount Corporation and must determine the appropriate audit opinion. The audit revealed multiple issues that need to be evaluated for their impact on the report.

Required: Evaluate each issue and determine the overall opinion impact.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-issues",
      order: 1,
      title: "Audit Issues Identified",
      type: "table",
      content: {
        type: "table",
        title: "Issues for Opinion Evaluation",
        headers: ["Issue", "Amount/Impact", "Management Response"],
        rows: [
          { cells: ["Uncorrected misstatement - inventory", "$180,000 overstatement", "Refused to adjust"] },
          { cells: ["Inadequate disclosure - related party", "Material transaction", "Added disclosure after discussion"] },
          { cells: ["Going concern uncertainty", "Moderate doubt exists", "Adequate disclosure made"] },
          { cells: ["Significant deficiency - IT controls", "Access controls", "Acknowledged, corrective action planned"] },
          { cells: ["Scope limitation - foreign investment", "$400,000 investment", "Records unavailable"] },
        ],
      },
    },
    {
      id: "exhibit-materiality",
      order: 2,
      title: "Materiality Information",
      type: "text",
      content: {
        type: "text",
        title: "Materiality Levels",
        paragraphs: [
          "Overall materiality: $750,000",
          "Performance materiality: $560,000",
          "Clearly trivial threshold: $37,500",
          "Total assets: $45 million",
          "Net income: $3.2 million",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-inventory-impact",
      order: 1,
      type: "dropdown",
      label: "Impact of uncorrected $180K inventory misstatement",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inv-pass",
      },
      explanation: "Below materiality ($750K) - include in summary of uncorrected misstatements",
      dropdownOptions: [
        { id: "opt-inv-qualify", order: 1, text: "Qualify opinion for misstatement", isCorrect: false },
        { id: "opt-inv-pass", order: 2, text: "No opinion modification - below materiality", isCorrect: true },
        { id: "opt-inv-eom", order: 3, text: "Add Emphasis of Matter paragraph", isCorrect: false },
      ],
    },
    {
      id: "req-rp-disclosure",
      order: 2,
      type: "dropdown",
      label: "Impact of related party disclosure added after discussion",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rp-unmod",
      },
      explanation: "Issue was corrected through added disclosure - unmodified opinion appropriate",
      dropdownOptions: [
        { id: "opt-rp-qualify", order: 1, text: "Qualify for initial failure to disclose", isCorrect: false },
        { id: "opt-rp-unmod", order: 2, text: "Unmodified - disclosure corrected", isCorrect: true },
        { id: "opt-rp-eom", order: 3, text: "Emphasis of Matter about related party", isCorrect: false },
      ],
    },
    {
      id: "req-gc-impact",
      order: 3,
      type: "dropdown",
      label: "Impact of going concern with adequate disclosure",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-gc-eom",
      },
      explanation: "Going concern doubt with adequate disclosure requires Emphasis of Matter",
      dropdownOptions: [
        { id: "opt-gc-qualify", order: 1, text: "Qualified opinion", isCorrect: false },
        { id: "opt-gc-eom", order: 2, text: "Unmodified with Emphasis of Matter paragraph", isCorrect: true },
        { id: "opt-gc-disclaimer", order: 3, text: "Disclaimer of opinion", isCorrect: false },
      ],
    },
    {
      id: "req-scope-impact",
      order: 4,
      type: "dropdown",
      label: "Impact of scope limitation on $400K foreign investment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-scope-unmod",
      },
      explanation: "Below materiality - scope limitation does not require modification",
      dropdownOptions: [
        { id: "opt-scope-qualify", order: 1, text: "Qualified for scope limitation", isCorrect: false },
        { id: "opt-scope-unmod", order: 2, text: "No modification - below materiality", isCorrect: true },
        { id: "opt-scope-om", order: 3, text: "Other Matter paragraph", isCorrect: false },
      ],
    },
    {
      id: "req-sd-communication",
      order: 5,
      type: "dropdown",
      label: "Significant deficiency communication requirement",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-sd-written",
      },
      explanation: "Significant deficiencies must be communicated in writing but don't affect opinion",
      dropdownOptions: [
        { id: "opt-sd-opinion", order: 1, text: "Modifies audit report", isCorrect: false },
        { id: "opt-sd-written", order: 2, text: "Written communication to those charged with governance", isCorrect: true },
        { id: "opt-sd-oral", order: 3, text: "Oral communication only", isCorrect: false },
      ],
    },
    {
      id: "req-overall",
      order: 6,
      type: "dropdown",
      label: "Overall audit opinion considering all issues",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-overall-eom",
      },
      explanation: "Unmodified with Emphasis of Matter for going concern - other issues resolved or immaterial",
      dropdownOptions: [
        { id: "opt-overall-unmod", order: 1, text: "Unmodified with no modifications", isCorrect: false },
        { id: "opt-overall-eom", order: 2, text: "Unmodified with Emphasis of Matter for going concern", isCorrect: true },
        { id: "opt-overall-qualify", order: 3, text: "Qualified opinion", isCorrect: false },
      ],
    },
  ],
};

// Phase 3 expansion - Batch 3 (tbs-aud-082 through tbs-aud-086)

export const audResearchIssuerRequirementsTBS: TBSQuestion = {
  id: "tbs-aud-082",
  section: "AUD",
  tbsType: "research",
  topic: "PCAOB Standards",
  subtopic: "Issuer Audit Requirements",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "AUD-IV",
  title: "Research: PCAOB Issuer Requirements",
  scenarioText: `Your firm has been engaged to audit SecureTech Corp, a publicly traded company. The engagement partner has asked you to research specific PCAOB requirements that differ from AICPA standards.

Required: Research the applicable PCAOB standards and cite the relevant guidance.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 3,
  exhibits: [
    {
      id: "exhibit-research-scenario",
      order: 1,
      title: "Research Questions",
      type: "text",
      content: {
        type: "text",
        title: "PCAOB Research Topics",
        paragraphs: [
          "1. What are the documentation requirements for audit workpapers under PCAOB standards, specifically the retention period?",
          "2. What are the PCAOB requirements for reporting on internal control over financial reporting in an integrated audit?",
          "3. What are the PCAOB requirements regarding engagement quality review (formerly concurring partner review)?",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-documentation",
      order: 1,
      type: "citation",
      label: "Cite the PCAOB standard for audit documentation retention period",
      points: 1,
      correctAnswer: {
        type: "citation",
        source: "PCAOB",
        topicCode: "AS 1215",
        alternativeCitations: [
          { source: "PCAOB", topicCode: "AS 1215.14" },
          { source: "PCAOB", topicCode: "Auditing Standard No. 3" },
        ],
      },
      explanation: "PCAOB AS 1215 (formerly AS 3) requires retention of audit documentation for 7 years from report date",
    },
    {
      id: "req-icfr",
      order: 2,
      type: "citation",
      label: "Cite the PCAOB standard for integrated audit of ICFR",
      points: 1,
      correctAnswer: {
        type: "citation",
        source: "PCAOB",
        topicCode: "AS 2201",
        alternativeCitations: [
          { source: "PCAOB", topicCode: "Auditing Standard No. 5" },
          { source: "PCAOB", topicCode: "AS 2201.01" },
        ],
      },
      explanation: "PCAOB AS 2201 (formerly AS 5) covers audit of internal control over financial reporting integrated with financial statement audit",
    },
    {
      id: "req-eqr",
      order: 3,
      type: "citation",
      label: "Cite the PCAOB standard for engagement quality review",
      points: 1,
      correctAnswer: {
        type: "citation",
        source: "PCAOB",
        topicCode: "AS 1220",
        alternativeCitations: [
          { source: "PCAOB", topicCode: "Auditing Standard No. 7" },
          { source: "PCAOB", topicCode: "QC 20" },
        ],
      },
      explanation: "PCAOB AS 1220 (formerly AS 7) covers engagement quality review requirements for issuers",
    },
  ],
};

export const audFirstYearEngagementTBS: TBSQuestion = {
  id: "tbs-aud-083",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Engagement Acceptance",
  subtopic: "First Year Engagements",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-I",
  title: "First Year Audit Engagement Considerations",
  scenarioText: `Your firm is considering accepting its first audit engagement with Nova Enterprises. The company was previously audited by another firm for the past five years. Evaluate the key considerations for accepting this engagement.

Required: Determine the appropriate action for each first-year engagement consideration.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-background",
      order: 1,
      title: "Engagement Background",
      type: "text",
      content: {
        type: "text",
        title: "Nova Enterprises Information",
        paragraphs: [
          "Manufacturing company with $85 million in annual revenue",
          "Prior auditor: Smith & Associates, CPA (resigned)",
          "Audit committee requested proposals from three firms",
          "CFO mentions 'disagreements over aggressive accounting positions'",
          "Company plans IPO in 18 months",
          "Complex inventory valuation and revenue recognition practices",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-predecessor",
      order: 1,
      type: "dropdown",
      label: "Communication with predecessor auditor",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-pred-required",
      },
      explanation: "Communication with predecessor is required before accepting the engagement",
      dropdownOptions: [
        { id: "opt-pred-optional", order: 1, text: "Optional courtesy - not required", isCorrect: false },
        { id: "opt-pred-required", order: 2, text: "Required before acceptance to inquire about engagement", isCorrect: true },
        { id: "opt-pred-after", order: 3, text: "Required only after acceptance", isCorrect: false },
      ],
    },
    {
      id: "req-disagreement",
      order: 2,
      type: "dropdown",
      label: "Response to CFO's mention of accounting disagreements",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-disagree-investigate",
      },
      explanation: "Disagreements are a red flag requiring investigation before acceptance",
      dropdownOptions: [
        { id: "opt-disagree-ignore", order: 1, text: "Normal client-auditor dynamics - proceed", isCorrect: false },
        { id: "opt-disagree-investigate", order: 2, text: "Red flag - investigate nature and obtain details from predecessor", isCorrect: true },
        { id: "opt-disagree-decline", order: 3, text: "Automatically decline engagement", isCorrect: false },
      ],
    },
    {
      id: "req-opening-balances",
      order: 3,
      type: "dropdown",
      label: "Procedures for opening balances",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-open-review",
      },
      explanation: "Must obtain sufficient evidence about opening balances in first-year audit",
      dropdownOptions: [
        { id: "opt-open-accept", order: 1, text: "Accept predecessor's opinion on prior year", isCorrect: false },
        { id: "opt-open-review", order: 2, text: "Review predecessor workpapers and perform substantive procedures", isCorrect: true },
        { id: "opt-open-reaudit", order: 3, text: "Must reaudit prior year completely", isCorrect: false },
      ],
    },
    {
      id: "req-ipo",
      order: 4,
      type: "dropdown",
      label: "Impact of planned IPO on engagement acceptance",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ipo-consider",
      },
      explanation: "IPO plans increase audit risk and require PCAOB registration consideration",
      dropdownOptions: [
        { id: "opt-ipo-none", order: 1, text: "No impact - focus on current year audit", isCorrect: false },
        { id: "opt-ipo-consider", order: 2, text: "Consider PCAOB registration needs and increased scrutiny", isCorrect: true },
        { id: "opt-ipo-decline", order: 3, text: "Decline until after IPO is complete", isCorrect: false },
      ],
    },
    {
      id: "req-independence",
      order: 5,
      type: "dropdown",
      label: "Independence evaluation for first-year engagement",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-indep-thorough",
      },
      explanation: "First-year engagements require thorough independence evaluation before acceptance",
      dropdownOptions: [
        { id: "opt-indep-standard", order: 1, text: "Standard independence check", isCorrect: false },
        { id: "opt-indep-thorough", order: 2, text: "Comprehensive evaluation including firm, staff, and network", isCorrect: true },
        { id: "opt-indep-after", order: 3, text: "Can complete independence check after acceptance", isCorrect: false },
      ],
    },
    {
      id: "req-resources",
      order: 6,
      type: "dropdown",
      label: "Evaluating firm resources for complex engagement",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-res-assess",
      },
      explanation: "Must assess competence and availability before accepting complex engagement",
      dropdownOptions: [
        { id: "opt-res-assume", order: 1, text: "Assume resources are adequate", isCorrect: false },
        { id: "opt-res-assess", order: 2, text: "Assess competence, availability, and specialist needs", isCorrect: true },
        { id: "opt-res-hire", order: 3, text: "Plan to hire additional staff after acceptance", isCorrect: false },
      ],
    },
  ],
};

export const audSubsidiaryReconciliationTBS: TBSQuestion = {
  id: "tbs-aud-084",
  section: "AUD",
  tbsType: "reconciliation",
  topic: "Group Audits",
  subtopic: "Intercompany Reconciliation",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Intercompany Account Reconciliation",
  scenarioText: `You are auditing United Manufacturing Group, which has three subsidiaries. During the consolidation audit, you need to reconcile intercompany accounts and identify any unreconciled differences.

Required: Analyze the intercompany balances and identify reconciling items.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-intercompany",
      order: 1,
      title: "Intercompany Account Balances",
      type: "table",
      content: {
        type: "table",
        title: "Intercompany Receivables and Payables at 12/31",
        headers: ["Entity", "Due From Parent", "Due From Sub A", "Due From Sub B", "Due From Sub C"],
        rows: [
          { cells: ["Parent Co.", "-", "$850,000", "$620,000", "$415,000"] },
          { cells: ["Subsidiary A", "$825,000", "-", "$180,000", "$95,000"] },
          { cells: ["Subsidiary B", "$620,000", "$165,000", "-", "$220,000"] },
          { cells: ["Subsidiary C", "$400,000", "$95,000", "$235,000", "-"] },
        ],
      },
    },
    {
      id: "exhibit-transactions",
      order: 2,
      title: "Recent Transaction Information",
      type: "text",
      content: {
        type: "text",
        title: "In-Transit Transactions",
        paragraphs: [
          "12/30: Parent transferred $25,000 to Sub A - received by Sub A on 1/2",
          "12/31: Sub B invoiced Sub C $15,000 for services - recorded by Sub C on 1/3",
          "Sub A and Sub B have $15,000 dispute over returned inventory from November",
          "All subsidiaries report in same currency (USD)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-parent-suba",
      order: 1,
      type: "numeric",
      label: "Difference between Parent's receivable from Sub A and Sub A's payable to Parent",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25000,
        tolerance: 0,
      },
      explanation: "Parent shows $850,000 due from Sub A; Sub A shows $825,000 due to Parent. Difference is $25,000 (cash in transit)",
    },
    {
      id: "req-subb-subc",
      order: 2,
      type: "numeric",
      label: "Difference between Sub B's receivable from Sub C and Sub C's payable to Sub B",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15000,
        tolerance: 0,
      },
      explanation: "Sub B shows $220,000 due from Sub C; Sub C shows $235,000 due to Sub B. Wait - Sub C's payable of $235K vs Sub B's receivable of $220K = $15,000 difference (invoice in transit)",
    },
    {
      id: "req-suba-subb",
      order: 3,
      type: "numeric",
      label: "Unexplained difference between Sub A and Sub B (after cash in transit)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15000,
        tolerance: 0,
      },
      explanation: "Sub A shows $180,000 due from Sub B; Sub B shows $165,000 due to Sub A. Difference is $15,000 (disputed inventory return)",
    },
    {
      id: "req-parent-subc",
      order: 4,
      type: "numeric",
      label: "Difference between Parent's receivable from Sub C and Sub C's payable to Parent",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15000,
        tolerance: 0,
      },
      explanation: "Parent shows $415,000 due from Sub C; Sub C shows $400,000 due to Parent. Difference is $15,000 (unexplained - requires investigation)",
    },
    {
      id: "req-total-unreconciled",
      order: 5,
      type: "numeric",
      label: "Total unreconciled differences requiring investigation (excluding timing items)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30000,
        tolerance: 0,
      },
      explanation: "Disputed inventory return ($15,000) + unexplained Parent-Sub C difference ($15,000) = $30,000 total requiring investigation",
    },
  ],
};

export const audEthicsIndependenceTBS: TBSQuestion = {
  id: "tbs-aud-085",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Professional Ethics",
  subtopic: "Independence Requirements",
  difficulty: "easy",
  skillLevel: "remembering_understanding",
  contentArea: "AUD-I",
  title: "Independence Threat Evaluation",
  scenarioText: `Your firm is evaluating various situations that may affect auditor independence. For each situation, determine if independence is impaired or threatened.

Required: Evaluate each situation for independence implications.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-independence-rules",
      order: 1,
      title: "Independence Framework",
      type: "text",
      content: {
        type: "text",
        title: "AICPA Independence Rules Summary",
        paragraphs: [
          "Independence requires freedom from relationships that would impair objectivity",
          "Both independence in fact and appearance must be maintained",
          "Covered members include firm, partners, and professional staff on engagement",
          "Direct financial interests are prohibited regardless of amount",
          "Indirect financial interests prohibited if material to covered member",
          "Non-attest services may impair independence if certain conditions not met",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-stock",
      order: 1,
      type: "dropdown",
      label: "Staff auditor owns 10 shares ($500) of audit client stock",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-stock-impaired",
      },
      explanation: "Direct financial interest impairs independence regardless of amount",
      dropdownOptions: [
        { id: "opt-stock-ok", order: 1, text: "No impairment - immaterial amount", isCorrect: false },
        { id: "opt-stock-impaired", order: 2, text: "Independence impaired - any direct interest prohibited", isCorrect: true },
        { id: "opt-stock-disclose", order: 3, text: "Acceptable with disclosure", isCorrect: false },
      ],
    },
    {
      id: "req-loan",
      order: 2,
      type: "dropdown",
      label: "Partner has home mortgage from client bank (obtained before client relationship)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-loan-grandfathered",
      },
      explanation: "Grandfathered loans obtained before client relationship generally permitted if current on payments",
      dropdownOptions: [
        { id: "opt-loan-impaired", order: 1, text: "Independence impaired", isCorrect: false },
        { id: "opt-loan-grandfathered", order: 2, text: "Permitted if obtained before client relationship and current", isCorrect: true },
        { id: "opt-loan-repay", order: 3, text: "Must repay immediately", isCorrect: false },
      ],
    },
    {
      id: "req-bookkeeping",
      order: 3,
      type: "dropdown",
      label: "Firm provides bookkeeping services to non-public audit client",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-book-conditions",
      },
      explanation: "Bookkeeping for non-issuers permitted with proper safeguards and management approval",
      dropdownOptions: [
        { id: "opt-book-impaired", order: 1, text: "Always impairs independence", isCorrect: false },
        { id: "opt-book-conditions", order: 2, text: "Permitted with safeguards: client approval, no management decisions", isCorrect: true },
        { id: "opt-book-ok", order: 3, text: "Always permitted for private companies", isCorrect: false },
      ],
    },
    {
      id: "req-employment",
      order: 4,
      type: "dropdown",
      label: "Audit manager accepts CFO position at audit client, effective immediately",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-emp-impaired",
      },
      explanation: "Employment at client impairs independence; may require re-review of prior work",
      dropdownOptions: [
        { id: "opt-emp-ok", order: 1, text: "No impact - employment starts after engagement", isCorrect: false },
        { id: "opt-emp-impaired", order: 2, text: "Independence impaired - must remove from engagement and evaluate prior work", isCorrect: true },
        { id: "opt-emp-notice", order: 3, text: "Acceptable with two-week notice period", isCorrect: false },
      ],
    },
    {
      id: "req-mutual-fund",
      order: 5,
      type: "dropdown",
      label: "Partner owns diversified mutual fund with 0.5% in client stock",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fund-ok",
      },
      explanation: "Diversified mutual funds are indirect interests; generally permitted if immaterial to member",
      dropdownOptions: [
        { id: "opt-fund-impaired", order: 1, text: "Impaired - any ownership prohibited", isCorrect: false },
        { id: "opt-fund-ok", order: 2, text: "Permitted - diversified fund is acceptable indirect interest", isCorrect: true },
        { id: "opt-fund-sell", order: 3, text: "Must sell the mutual fund", isCorrect: false },
      ],
    },
    {
      id: "req-contingent",
      order: 6,
      type: "dropdown",
      label: "Audit fee contingent on client receiving bank loan",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-contingent-impaired",
      },
      explanation: "Contingent fees impair independence for audit engagements",
      dropdownOptions: [
        { id: "opt-contingent-ok", order: 1, text: "Acceptable fee arrangement", isCorrect: false },
        { id: "opt-contingent-impaired", order: 2, text: "Impairs independence - contingent fees prohibited for audits", isCorrect: true },
        { id: "opt-contingent-disclose", order: 3, text: "Permitted with disclosure to audit committee", isCorrect: false },
      ],
    },
  ],
};

export const audSSARSCompilationTBS: TBSQuestion = {
  id: "tbs-aud-086",
  section: "AUD",
  tbsType: "dropdown",
  topic: "Compilation Engagements",
  subtopic: "SSARS Requirements",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-IV",
  title: "Compilation Engagement Requirements",
  scenarioText: `Your firm has been engaged to compile financial statements for three different clients. Evaluate the proper handling of each situation under SSARS.

Required: Determine the appropriate action for each compilation scenario.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-ssars-overview",
      order: 1,
      title: "SSARS Compilation Requirements",
      type: "text",
      content: {
        type: "text",
        title: "Key Compilation Requirements (SSARS 21)",
        paragraphs: [
          "Written engagement letter required before compilation",
          "Understanding of industry and accounting practices needed",
          "No independence required, but must disclose lack of independence",
          "Reading financial statements for obvious material errors",
          "Report required unless management-use only",
          "Departures from applicable framework must be disclosed",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-discovery",
      order: 1,
      type: "dropdown",
      label: "During compilation, you discover material departure from GAAP not disclosed",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-disc-modify",
      },
      explanation: "Departures must be disclosed in notes or accountant's report; discuss with management",
      dropdownOptions: [
        { id: "opt-disc-ignore", order: 1, text: "Ignore - no assurance provided in compilation", isCorrect: false },
        { id: "opt-disc-modify", order: 2, text: "Disclose in notes or modify report if management refuses", isCorrect: true },
        { id: "opt-disc-withdraw", order: 3, text: "Withdraw immediately", isCorrect: false },
      ],
    },
    {
      id: "req-independence",
      order: 2,
      type: "dropdown",
      label: "Partner's spouse is controller of compilation client",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-indep-disclose",
      },
      explanation: "Independence not required for compilation but lack of independence must be disclosed",
      dropdownOptions: [
        { id: "opt-indep-decline", order: 1, text: "Decline engagement - independence impaired", isCorrect: false },
        { id: "opt-indep-disclose", order: 2, text: "May accept but must disclose lack of independence in report", isCorrect: true },
        { id: "opt-indep-proceed", order: 3, text: "Proceed without disclosure - not required for compilations", isCorrect: false },
      ],
    },
    {
      id: "req-management-use",
      order: 3,
      type: "dropdown",
      label: "Client requests compilation for internal management use only",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-mgmt-legend",
      },
      explanation: "Management-use compilations may omit report but require legend on each page",
      dropdownOptions: [
        { id: "opt-mgmt-full", order: 1, text: "Full compilation report still required", isCorrect: false },
        { id: "opt-mgmt-legend", order: 2, text: "May omit report with legend indicating management use", isCorrect: true },
        { id: "opt-mgmt-nothing", order: 3, text: "No report or legend required for management use", isCorrect: false },
      ],
    },
    {
      id: "req-fraud",
      order: 4,
      type: "dropdown",
      label: "You suspect fraud during compilation but cannot confirm",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fraud-consider",
      },
      explanation: "Must consider implications for engagement and take appropriate action",
      dropdownOptions: [
        { id: "opt-fraud-ignore", order: 1, text: "No responsibility for fraud in compilation", isCorrect: false },
        { id: "opt-fraud-consider", order: 2, text: "Consider effect on engagement; may need to withdraw", isCorrect: true },
        { id: "opt-fraud-report", order: 3, text: "Report to authorities immediately", isCorrect: false },
      ],
    },
    {
      id: "req-ocboa",
      order: 5,
      type: "dropdown",
      label: "Client wants compilation using cash basis of accounting",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ocboa-ok",
      },
      explanation: "Special purpose frameworks including cash basis are acceptable with proper disclosure",
      dropdownOptions: [
        { id: "opt-ocboa-gaap", order: 1, text: "Must compile using GAAP only", isCorrect: false },
        { id: "opt-ocboa-ok", order: 2, text: "Acceptable with disclosure of basis in report", isCorrect: true },
        { id: "opt-ocboa-supplemental", order: 3, text: "Only as supplemental to GAAP statements", isCorrect: false },
      ],
    },
    {
      id: "req-omit-disclosures",
      order: 6,
      type: "dropdown",
      label: "Client requests omission of substantially all disclosures",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-omit-acceptable",
      },
      explanation: "Omission of disclosures permitted if disclosed in report and not intended to mislead",
      dropdownOptions: [
        { id: "opt-omit-decline", order: 1, text: "Must decline - disclosures are required", isCorrect: false },
        { id: "opt-omit-acceptable", order: 2, text: "Acceptable with disclosure in report if not misleading", isCorrect: true },
        { id: "opt-omit-always", order: 3, text: "Always acceptable for compilations", isCorrect: false },
      ],
    },
  ],
};

// Export all AUD TBS questions
export const audTBSQuestions: TBSQuestion[] = [
  audReportModificationsTBS,
  audAttributeSamplingTBS,
  audVariablesSamplingTBS,
  audControlDeficiencyTBS,
  audRiskAssessmentTBS,
  audSubsequentEventsTBS,
  audIndependenceEvaluationTBS,
  audEvidenceEvaluationTBS,
  audResearchPCAOBTBS,
  audReviewEngagementProceduresTBS,
  audMaterialityCalculationTBS,
  audGoingConcernEvaluationTBS,
  audEngagementAcceptanceTBS,
  audSubstantiveProceduresTBS,
  audFraudProceduresTBS,
  audDocumentationRequirementsTBS,
  audSpecialPurposeFrameworksTBS,
  audGroupAuditTBS,
  audAnalyticalProceduresTBS,
  audGovernanceCommunicationTBS,
  audRelatedPartiesTBS,
  audResearchAICPATBS,
  audComplianceAuditTBS,
  audSOCReportsTBS,
  audInternalControlComponentsTBS,
  audCompilationEngagementTBS,
  audAccountingEstimatesTBS,
  audProspectiveFinancialsTBS,
  audIntegratedAuditTBS,
  // Phase 2 expansion (tbs-aud-041 through tbs-aud-057)
  audConfirmationsTBS,
  audAuditPlanningTBS,
  audInventoryObservationTBS,
  audManagementRepsTBS,
  audEthicsViolationsTBS,
  audTestsOfControlsTBS,
  audQualityControlTBS,
  audITGeneralControlsTBS,
  audSubstantiveAnalyticalTBS,
  audInterimTestingTBS,
  audProfessionalSkepticismTBS,
  audAgreedUponProceduresTBS,
  audServiceOrganizationsTBS,
  audModifiedOpinionsTBS,
  audEBPAuditsTBS,
  audInternalAuditRelationshipTBS,
  audPCAOBDifferencesTBS,
  // Phase 2 expansion - Batch 3 (tbs-aud-058 through tbs-aud-061)
  audLegalLetterTBS,
  audStratifiedSamplingTBS,
  audCompilationReviewTBS,
  audFraudRiskFactorsTBS,
  // Phase 3 expansion - Batch 1 (tbs-aud-062 through tbs-aud-071)
  audEngagementLetterTBS,
  audSampleSizeCalcTBS,
  audRMMAssessmentTBS,
  audReportModificationTypesTBS,
  audInternalControlEvalTBS,
  audDocumentationStandardsTBS,
  audRevenueSubstantiveTBS,
  audSubsequentEventsEvalTBS,
  audConfirmationProceduresTBS,
  audGoingConcernIndicatorsTBS,
  // Phase 3 expansion - Batch 2 (tbs-aud-072 through tbs-aud-081)
  audJournalEntryTestingTBS,
  audRelatedPartyEvalTBS,
  audAnalyticalReviewTBS,
  audAuditCommitteeCommunicationTBS,
  audInventoryValuationTBS,
  audEstimatesEvaluationTBS,
  audLawyerLetterTBS,
  audPriorPeriodAdjustmentTBS,
  audSegmentAuditTBS,
  audComprehensiveOpinionTBS,
  // Phase 3 expansion - Batch 3 (tbs-aud-082 through tbs-aud-086)
  audResearchIssuerRequirementsTBS,
  audFirstYearEngagementTBS,
  audSubsidiaryReconciliationTBS,
  audEthicsIndependenceTBS,
  audSSARSCompilationTBS,
];
