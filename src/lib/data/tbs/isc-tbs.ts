// ISC (Information Systems & Controls) Task-Based Simulations
// 12 new questions covering high-priority ISC topics

import { TBSQuestion } from "./types";

// =============================================================================
// IT GENERAL CONTROLS - High Priority Topic
// =============================================================================

export const iscITGCAccessControlsTBS: TBSQuestion = {
  id: "tbs-isc-001",
  section: "ISC",
  tbsType: "dropdown",
  topic: "IT General Controls",
  subtopic: "Access Controls",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "IT Access Control Evaluation",
  scenarioText: `Evaluate the effectiveness of IT access controls at ABC Corporation and identify control deficiencies.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-access-policies",
      order: 1,
      title: "Access Control Policies",
      type: "text",
      content: {
        type: "text",
        title: "ABC Corporation IT Access Policies",
        paragraphs: [
          "1. User accounts are created by IT upon receipt of email request from department manager",
          "2. Passwords must be at least 6 characters with no complexity requirements",
          "3. Passwords expire every 180 days",
          "4. User access reviews are performed annually by department managers",
          "5. Terminated employee accounts are disabled within 5 business days",
          "6. System administrators share a common administrative account for emergencies",
          "7. Remote access requires VPN but no multi-factor authentication",
          "8. Privileged access users log their activities in a manual spreadsheet",
        ],
      },
    },
    {
      id: "exhibit-best-practices",
      order: 2,
      title: "Industry Best Practices",
      type: "text",
      content: {
        type: "text",
        title: "Access Control Best Practices",
        paragraphs: [
          "Password length: Minimum 8-12 characters",
          "Password complexity: Uppercase, lowercase, numbers, symbols",
          "Password expiration: 60-90 days",
          "Access reviews: Quarterly for privileged users",
          "Termination: Same-day account disablement",
          "Shared accounts: Prohibited for accountability",
          "Remote access: Multi-factor authentication required",
          "Logging: Automated audit logging with integrity controls",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-password-length",
      order: 1,
      type: "dropdown",
      label: "Is the password length policy adequate?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inadequate-length",
      },
      explanation: "Per NIST SP 800-63B, 6 characters is below the minimum recommended password length of 8+ characters.",
      dropdownOptions: [
        { id: "opt-adequate-length", order: 1, text: "Adequate - meets requirements", isCorrect: false },
        { id: "opt-inadequate-length", order: 2, text: "Inadequate - should be 8+ characters", isCorrect: true },
        { id: "opt-excessive-length", order: 3, text: "Excessive - too restrictive", isCorrect: false },
      ],
    },
    {
      id: "req-termination-process",
      order: 2,
      type: "dropdown",
      label: "Is the termination access removal process adequate?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inadequate-term",
      },
      explanation: "Per COBIT/NIST guidelines, 5 business days is too long; same-day account disablement is required to prevent unauthorized access.",
      dropdownOptions: [
        { id: "opt-adequate-term", order: 1, text: "Adequate - reasonable timeframe", isCorrect: false },
        { id: "opt-inadequate-term", order: 2, text: "Inadequate - should be same-day", isCorrect: true },
        { id: "opt-acceptable-term", order: 3, text: "Acceptable with compensating controls", isCorrect: false },
      ],
    },
    {
      id: "req-shared-admin",
      order: 3,
      type: "dropdown",
      label: "What is the risk of shared administrative accounts?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-accountability",
      },
      explanation: "Per TSC CC6.1 and NIST AC-2, shared accounts eliminate individual accountability, violating access control principles.",
      dropdownOptions: [
        { id: "opt-efficiency", order: 1, text: "Reduced efficiency", isCorrect: false },
        { id: "opt-accountability", order: 2, text: "Loss of accountability", isCorrect: true },
        { id: "opt-complexity", order: 3, text: "Increased complexity", isCorrect: false },
      ],
    },
    {
      id: "req-mfa-risk",
      order: 4,
      type: "dropdown",
      label: "Primary risk of VPN without MFA?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-credential-theft",
      },
      explanation: "Per NIST SP 800-63B, without MFA, stolen credentials provide full remote access without additional verification factors.",
      dropdownOptions: [
        { id: "opt-slow-access", order: 1, text: "Slow access times", isCorrect: false },
        { id: "opt-credential-theft", order: 2, text: "Credential theft enables unauthorized access", isCorrect: true },
        { id: "opt-user-frustration", order: 3, text: "User frustration", isCorrect: false },
      ],
    },
    {
      id: "req-manual-logging",
      order: 5,
      type: "dropdown",
      label: "Main weakness of manual activity logging?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-manipulation",
      },
      explanation: "Per TSC CC7.2 and NIST AU-3, manual logs can be altered or omitted; automated logging ensures integrity and completeness.",
      dropdownOptions: [
        { id: "opt-time-consuming", order: 1, text: "Time consuming for users", isCorrect: false },
        { id: "opt-manipulation", order: 2, text: "Susceptible to manipulation", isCorrect: true },
        { id: "opt-storage", order: 3, text: "Storage requirements", isCorrect: false },
      ],
    },
    {
      id: "req-review-frequency",
      order: 6,
      type: "dropdown",
      label: "Recommended access review frequency for privileged users?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-quarterly",
      },
      explanation: "Per COBIT DSS05.04 and SOX best practices, privileged access should be reviewed quarterly due to elevated risk.",
      dropdownOptions: [
        { id: "opt-annually", order: 1, text: "Annually - current policy is adequate", isCorrect: false },
        { id: "opt-quarterly", order: 2, text: "Quarterly", isCorrect: true },
        { id: "opt-monthly", order: 3, text: "Monthly", isCorrect: false },
      ],
    },
  ],
};

// SOC Reports - Moderate
export const iscSOCReportsTBS: TBSQuestion = {
  id: "tbs-isc-002",
  section: "ISC",
  tbsType: "dropdown",
  topic: "SOC Reports",
  subtopic: "SOC Report Types and Usage",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "SOC Report Analysis",
  scenarioText: `Analyze SOC report types and determine appropriate usage for different scenarios.`,
  timeEstimateMinutes: 12,
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
        headers: ["Type", "Purpose", "Distribution"],
        rows: [
          { cells: ["SOC 1 Type I", "Controls at service organization (design only)", "Restricted - user entities and auditors"] },
          { cells: ["SOC 1 Type II", "Controls at service organization (design and operating effectiveness)", "Restricted - user entities and auditors"] },
          { cells: ["SOC 2 Type I", "Security, availability, processing integrity, confidentiality, privacy (design only)", "Restricted or general use"] },
          { cells: ["SOC 2 Type II", "Security, availability, processing integrity, confidentiality, privacy (design and effectiveness)", "Restricted or general use"] },
          { cells: ["SOC 3", "Trust services criteria (general use seal)", "Publicly available"] },
        ],
      },
    },
    {
      id: "exhibit-scenarios",
      order: 2,
      title: "Usage Scenarios",
      type: "text",
      content: {
        type: "text",
        title: "Scenario Descriptions",
        paragraphs: [
          "Scenario A: External auditor evaluating payroll processing outsourced to ADP",
          "Scenario B: Company evaluating cloud provider's security for customer data",
          "Scenario C: Marketing department wants to display security certification on website",
          "Scenario D: Management wants to understand if controls were tested over time",
          "Scenario E: Quick assessment of a new vendor's control design",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-payroll-audit",
      order: 1,
      type: "dropdown",
      label: "Best SOC report for Scenario A (payroll outsourcing audit)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-soc1-type2",
      },
      explanation: "Per SSAE 18/AT-C 320, SOC 1 Type II covers controls relevant to user entities' ICFR with operating effectiveness testing.",
      dropdownOptions: [
        { id: "opt-soc1-type1", order: 1, text: "SOC 1 Type I", isCorrect: false },
        { id: "opt-soc1-type2", order: 2, text: "SOC 1 Type II", isCorrect: true },
        { id: "opt-soc2-type2", order: 3, text: "SOC 2 Type II", isCorrect: false },
        { id: "opt-soc3", order: 4, text: "SOC 3", isCorrect: false },
      ],
    },
    {
      id: "req-cloud-security",
      order: 2,
      type: "dropdown",
      label: "Best SOC report for Scenario B (cloud provider security)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-soc2-type2-b",
      },
      explanation: "Per AT-C 205, SOC 2 Type II covers Trust Services Criteria (security, availability, etc.) with operating effectiveness testing.",
      dropdownOptions: [
        { id: "opt-soc1-type2-b", order: 1, text: "SOC 1 Type II", isCorrect: false },
        { id: "opt-soc2-type1-b", order: 2, text: "SOC 2 Type I", isCorrect: false },
        { id: "opt-soc2-type2-b", order: 3, text: "SOC 2 Type II", isCorrect: true },
        { id: "opt-soc3-b", order: 4, text: "SOC 3", isCorrect: false },
      ],
    },
    {
      id: "req-marketing",
      order: 3,
      type: "dropdown",
      label: "Best SOC report for Scenario C (website certification)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-soc3-c",
      },
      explanation: "Per AT-C 205, SOC 3 is a general use report designed for public distribution and marketing purposes.",
      dropdownOptions: [
        { id: "opt-soc1-type2-c", order: 1, text: "SOC 1 Type II", isCorrect: false },
        { id: "opt-soc2-type2-c", order: 2, text: "SOC 2 Type II", isCorrect: false },
        { id: "opt-soc3-c", order: 3, text: "SOC 3", isCorrect: true },
      ],
    },
    {
      id: "req-over-time",
      order: 4,
      type: "dropdown",
      label: "Type I vs Type II - which tests over a period?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-type2-period",
      },
      explanation: "Per SSAE 18, Type II reports test operating effectiveness over a period (typically 6-12 months) vs. Type I point-in-time.",
      dropdownOptions: [
        { id: "opt-type1-period", order: 1, text: "Type I - tests over a period", isCorrect: false },
        { id: "opt-type2-period", order: 2, text: "Type II - tests over a period", isCorrect: true },
        { id: "opt-both-period", order: 3, text: "Both test over periods", isCorrect: false },
      ],
    },
    {
      id: "req-quick-assessment",
      order: 5,
      type: "dropdown",
      label: "Best report for Scenario E (quick design assessment)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-type1-design",
      },
      explanation: "Per SSAE 18, Type I reports assess control design and implementation at a point in time (suitable for quick assessments).",
      dropdownOptions: [
        { id: "opt-type1-design", order: 1, text: "SOC 2 Type I", isCorrect: true },
        { id: "opt-type2-design", order: 2, text: "SOC 2 Type II", isCorrect: false },
        { id: "opt-soc3-design", order: 3, text: "SOC 3", isCorrect: false },
      ],
    },
    {
      id: "req-subservice-org",
      order: 6,
      type: "dropdown",
      label: "If service organization uses a subservice org, auditor should consider?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inclusive-carve",
      },
      explanation: "Per SSAE 18, inclusive vs carve-out method determines whether subservice organization controls are included in scope.",
      dropdownOptions: [
        { id: "opt-ignore", order: 1, text: "Ignore - not relevant", isCorrect: false },
        { id: "opt-inclusive-carve", order: 2, text: "Inclusive vs carve-out method", isCorrect: true },
        { id: "opt-separate-soc", order: 3, text: "Always requires separate SOC", isCorrect: false },
      ],
    },
  ],
};

// Cybersecurity - Moderate
export const iscCybersecurityTBS: TBSQuestion = {
  id: "tbs-isc-003",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Cybersecurity",
  subtopic: "Threat Identification and Response",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-I",
  title: "Cybersecurity Threat Analysis",
  scenarioText: `Identify cybersecurity threats and appropriate controls for the described scenarios.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-scenarios",
      order: 1,
      title: "Security Incidents",
      type: "text",
      content: {
        type: "text",
        title: "Incident Descriptions",
        paragraphs: [
          "Incident 1: Employee receives email appearing to be from CEO requesting wire transfer",
          "Incident 2: Website becomes unavailable due to flood of traffic from multiple sources",
          "Incident 3: Malicious code encrypts company files and demands payment",
          "Incident 4: Attacker exploits SQL query in login page to access database",
          "Incident 5: Disgruntled employee copies customer data before resignation",
          "Incident 6: Hacker intercepts data transmitted between user and server",
        ],
      },
    },
    {
      id: "exhibit-controls",
      order: 2,
      title: "Security Controls",
      type: "table",
      content: {
        type: "table",
        title: "Control Categories",
        headers: ["Control Type", "Examples"],
        rows: [
          { cells: ["Preventive", "Input validation, encryption, access controls"] },
          { cells: ["Detective", "IDS, logging, monitoring, anomaly detection"] },
          { cells: ["Corrective", "Incident response, backup restoration, patching"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-incident1-type",
      order: 1,
      type: "dropdown",
      label: "Incident 1 (CEO email) is what type of attack?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-spear-phishing",
      },
      explanation: "Per NIST/FBI guidance, targeted phishing impersonating an executive is spear phishing/Business Email Compromise (BEC).",
      dropdownOptions: [
        { id: "opt-spear-phishing", order: 1, text: "Spear phishing/Business Email Compromise", isCorrect: true },
        { id: "opt-malware", order: 2, text: "Malware infection", isCorrect: false },
        { id: "opt-social-eng", order: 3, text: "Physical social engineering", isCorrect: false },
      ],
    },
    {
      id: "req-incident2-type",
      order: 2,
      type: "dropdown",
      label: "Incident 2 (traffic flood) is what type of attack?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ddos",
      },
      explanation: "Per NIST SP 800-61, a flood of traffic from multiple sources is a Distributed Denial of Service (DDoS) attack.",
      dropdownOptions: [
        { id: "opt-dos", order: 1, text: "Simple Denial of Service", isCorrect: false },
        { id: "opt-ddos", order: 2, text: "Distributed Denial of Service (DDoS)", isCorrect: true },
        { id: "opt-mitm", order: 3, text: "Man-in-the-Middle", isCorrect: false },
      ],
    },
    {
      id: "req-incident3-type",
      order: 3,
      type: "dropdown",
      label: "Incident 3 (encrypted files, payment demand) is?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ransomware",
      },
      explanation: "Per CISA guidance, malware that encrypts files and demands payment for decryption is classified as ransomware.",
      dropdownOptions: [
        { id: "opt-virus", order: 1, text: "Computer virus", isCorrect: false },
        { id: "opt-ransomware", order: 2, text: "Ransomware", isCorrect: true },
        { id: "opt-trojan", order: 3, text: "Trojan horse", isCorrect: false },
      ],
    },
    {
      id: "req-incident4-control",
      order: 4,
      type: "dropdown",
      label: "Best preventive control for Incident 4 (SQL injection)?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-input-validation",
      },
      explanation: "Per OWASP guidelines, input validation and parameterized queries are the primary preventive controls for SQL injection.",
      dropdownOptions: [
        { id: "opt-firewall", order: 1, text: "Network firewall", isCorrect: false },
        { id: "opt-input-validation", order: 2, text: "Input validation/parameterized queries", isCorrect: true },
        { id: "opt-antivirus", order: 3, text: "Antivirus software", isCorrect: false },
      ],
    },
    {
      id: "req-incident5-type",
      order: 5,
      type: "dropdown",
      label: "Incident 5 (employee data theft) represents?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-insider-threat",
      },
      explanation: "Per NIST SP 800-53, a malicious actor with legitimate authorized access represents an insider threat.",
      dropdownOptions: [
        { id: "opt-external-hacker", order: 1, text: "External hacker", isCorrect: false },
        { id: "opt-insider-threat", order: 2, text: "Insider threat", isCorrect: true },
        { id: "opt-accidental", order: 3, text: "Accidental disclosure", isCorrect: false },
      ],
    },
    {
      id: "req-incident6-control",
      order: 6,
      type: "dropdown",
      label: "Best control for Incident 6 (data interception)?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-encryption-tls",
      },
      explanation: "Per NIST SP 800-52 and TSC CC6.7, TLS/SSL encryption protects data confidentiality and integrity in transit.",
      dropdownOptions: [
        { id: "opt-firewall-6", order: 1, text: "Firewall rules", isCorrect: false },
        { id: "opt-encryption-tls", order: 2, text: "TLS/SSL encryption", isCorrect: true },
        { id: "opt-ids", order: 3, text: "Intrusion detection system", isCorrect: false },
      ],
    },
  ],
};

// Data Analytics - Moderate
export const iscDataAnalyticsTBS: TBSQuestion = {
  id: "tbs-isc-004",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Data Analytics",
  subtopic: "Audit Data Analytics",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-III",
  title: "Data Analytics for Audit",
  scenarioText: `Apply data analytics techniques to identify potential anomalies in accounts payable data.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-ap-data",
      order: 1,
      title: "Accounts Payable Analysis",
      type: "table",
      content: {
        type: "table",
        title: "AP Transaction Summary",
        headers: ["Category", "Count", "Total Amount", "Average"],
        rows: [
          { cells: ["Total invoices processed", "45,000", "$28,500,000", "$633"] },
          { cells: ["Invoices just below approval threshold ($5,000)", "2,850", "$14,107,500", "$4,950"] },
          { cells: ["Duplicate invoice numbers", "127", "$892,000", "$7,024"] },
          { cells: ["Payments to new vendors (<90 days)", "340", "$1,870,000", "$5,500"] },
          { cells: ["Rush payment requests", "89", "$445,000", "$5,000"] },
          { cells: ["Weekend/holiday payments", "156", "$936,000", "$6,000"] },
        ],
      },
    },
    {
      id: "exhibit-thresholds",
      order: 2,
      title: "Control Thresholds",
      type: "text",
      content: {
        type: "text",
        title: "AP Control Information",
        paragraphs: [
          "Purchase order required: Over $1,000",
          "Manager approval required: Over $5,000",
          "VP approval required: Over $25,000",
          "Normal duplicate invoice rate: 0.1%",
          "Industry average new vendor percentage: 5%",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-pct-below-threshold",
      order: 1,
      type: "numeric",
      label: "Percentage of invoices just below $5K threshold",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6.33,
        tolerance: 0.1,
      },
      explanation: "Per data analytics, threshold analysis: 2,850 / 45,000 = 6.33% of invoices just below approval threshold.",
    },
    {
      id: "req-duplicate-rate",
      order: 2,
      type: "numeric",
      label: "Actual duplicate invoice rate (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0.28,
        tolerance: 0.02,
      },
      explanation: "Per data analytics, duplicate rate = Duplicates / Total = 127 / 45,000 = 0.28%.",
    },
    {
      id: "req-duplicate-multiple",
      order: 3,
      type: "numeric",
      label: "Duplicate rate is how many times normal rate?",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2.8,
        tolerance: 0.1,
      },
      explanation: "Per data analytics, rate comparison = Actual rate / Normal rate = 0.28% / 0.1% = 2.8 times normal.",
    },
    {
      id: "req-new-vendor-pct",
      order: 4,
      type: "numeric",
      label: "New vendor payment percentage (by count)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0.76,
        tolerance: 0.05,
      },
      explanation: "Per data analytics, new vendor percentage = New vendor payments / Total = 340 / 45,000 = 0.76%.",
    },
    {
      id: "req-threshold-risk",
      order: 5,
      type: "dropdown",
      label: "What risk does high volume just below $5K indicate?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-split-invoices",
      },
      explanation: "Per fraud analytics, concentration of invoices just below approval threshold is a red flag for invoice splitting fraud.",
      dropdownOptions: [
        { id: "opt-normal-business", order: 1, text: "Normal business operations", isCorrect: false },
        { id: "opt-split-invoices", order: 2, text: "Invoice splitting to avoid approval", isCorrect: true },
        { id: "opt-vendor-pricing", order: 3, text: "Vendor pricing strategy", isCorrect: false },
      ],
    },
    {
      id: "req-benford-application",
      order: 6,
      type: "dropdown",
      label: "Which analytics technique would detect invoice manipulation?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-benford",
      },
      explanation: "Per AICPA audit data analytics guidance, Benford's Law analysis detects unnatural digit distributions indicating manipulation.",
      dropdownOptions: [
        { id: "opt-ratio", order: 1, text: "Ratio analysis", isCorrect: false },
        { id: "opt-benford", order: 2, text: "Benford's Law analysis", isCorrect: true },
        { id: "opt-trend", order: 3, text: "Trend analysis", isCorrect: false },
      ],
    },
  ],
};

// Change Management - Moderate
export const iscChangeManagementTBS: TBSQuestion = {
  id: "tbs-isc-005",
  section: "ISC",
  tbsType: "dropdown",
  topic: "IT General Controls",
  subtopic: "Change Management",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Change Management Control Evaluation",
  scenarioText: `Evaluate the change management process at DEF Corporation for control weaknesses.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-process",
      order: 1,
      title: "Change Management Process",
      type: "text",
      content: {
        type: "text",
        title: "DEF Corporation Change Process",
        paragraphs: [
          "1. Developer submits change request via email to manager",
          "2. Manager approves change verbally in team meeting",
          "3. Developer codes change and tests in development environment",
          "4. Developer migrates code directly to production",
          "5. QA team performs testing after production deployment",
          "6. Change documentation updated within 30 days",
          "7. Emergency changes follow same process but with expedited approval",
          "8. No formal rollback procedures documented",
        ],
      },
    },
    {
      id: "exhibit-best-practices",
      order: 2,
      title: "Change Management Best Practices",
      type: "text",
      content: {
        type: "text",
        title: "Industry Standards",
        paragraphs: [
          "Formal change request with documented approval",
          "Segregation of duties: Developer cannot migrate to production",
          "Testing completed before production migration",
          "Independent migration by operations team",
          "Documented rollback procedures",
          "Post-implementation review",
          "Emergency change procedures with post-hoc documentation",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-approval-issue",
      order: 1,
      type: "dropdown",
      label: "Primary weakness in approval process?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-no-documentation",
      },
      explanation: "Per COBIT BAI06.01, verbal approval lacks documentation and audit trail required for change control evidence.",
      dropdownOptions: [
        { id: "opt-too-slow", order: 1, text: "Process is too slow", isCorrect: false },
        { id: "opt-no-documentation", order: 2, text: "No documented approval evidence", isCorrect: true },
        { id: "opt-too-many-approvers", order: 3, text: "Too many approval levels", isCorrect: false },
      ],
    },
    {
      id: "req-sod-violation",
      order: 2,
      type: "dropdown",
      label: "What segregation of duties violation exists?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-dev-migrates",
      },
      explanation: "Per COBIT BAI06.01 and SOX requirements, developers should not migrate their own code to production (SOD violation).",
      dropdownOptions: [
        { id: "opt-none", order: 1, text: "No SOD violation", isCorrect: false },
        { id: "opt-dev-migrates", order: 2, text: "Developer migrates to production", isCorrect: true },
        { id: "opt-manager-codes", order: 3, text: "Manager approves own team's work", isCorrect: false },
      ],
    },
    {
      id: "req-testing-issue",
      order: 3,
      type: "dropdown",
      label: "Primary testing process weakness?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-test-after-prod",
      },
      explanation: "Per ITIL/COBIT change management, QA testing must occur before production deployment; post-deployment testing defeats control purpose.",
      dropdownOptions: [
        { id: "opt-dev-tests", order: 1, text: "Developer performs testing", isCorrect: false },
        { id: "opt-test-after-prod", order: 2, text: "Testing occurs after production deployment", isCorrect: true },
        { id: "opt-no-test-env", order: 3, text: "No test environment exists", isCorrect: false },
      ],
    },
    {
      id: "req-rollback-risk",
      order: 4,
      type: "dropdown",
      label: "Risk from lack of rollback procedures?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-extended-outage",
      },
      explanation: "Per ITIL service management, failed changes without documented rollback procedures cause extended service disruption.",
      dropdownOptions: [
        { id: "opt-cost", order: 1, text: "Higher project costs", isCorrect: false },
        { id: "opt-extended-outage", order: 2, text: "Extended service disruption", isCorrect: true },
        { id: "opt-compliance", order: 3, text: "Compliance documentation gaps", isCorrect: false },
      ],
    },
    {
      id: "req-emergency-change",
      order: 5,
      type: "dropdown",
      label: "Recommended improvement for emergency changes?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-post-doc",
      },
      explanation: "Per COBIT BAI06.01, emergency changes require expedited approval but must include post-implementation documentation and review.",
      dropdownOptions: [
        { id: "opt-eliminate", order: 1, text: "Eliminate emergency changes", isCorrect: false },
        { id: "opt-post-doc", order: 2, text: "Require post-implementation documentation and review", isCorrect: true },
        { id: "opt-ceo-approval", order: 3, text: "Require CEO approval for all emergencies", isCorrect: false },
      ],
    },
    {
      id: "req-documentation-timing",
      order: 6,
      type: "dropdown",
      label: "Issue with 30-day documentation requirement?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-too-long",
      },
      explanation: "Per COBIT/SOX requirements, 30 days is too long; documentation should be contemporaneous to ensure accuracy and completeness.",
      dropdownOptions: [
        { id: "opt-adequate", order: 1, text: "Adequate - provides flexibility", isCorrect: false },
        { id: "opt-too-long", order: 2, text: "Too long - may forget details", isCorrect: true },
        { id: "opt-too-short", order: 3, text: "Too short - need more time", isCorrect: false },
      ],
    },
  ],
};

// ERP Systems - Moderate
export const iscERPSystemsTBS: TBSQuestion = {
  id: "tbs-isc-006",
  section: "ISC",
  tbsType: "dropdown",
  topic: "ERP Systems",
  subtopic: "ERP Controls and Configuration",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "ERP System Controls",
  scenarioText: `Evaluate ERP system controls and configuration settings at GHI Corporation.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-erp-config",
      order: 1,
      title: "ERP Configuration",
      type: "text",
      content: {
        type: "text",
        title: "SAP System Settings",
        paragraphs: [
          "1. Three-way match: Enabled (PO, receipt, invoice)",
          "2. Tolerance for three-way match variance: 15%",
          "3. Duplicate payment check: Enabled - checks vendor/invoice/amount",
          "4. Segregation of duties: Not enforced by system",
          "5. Master data changes: No approval workflow configured",
          "6. Audit logging: Enabled for financial transactions only",
          "7. User provisioning: Manual process outside ERP",
          "8. Period close controls: Soft close allows adjustments for 10 days",
        ],
      },
    },
    {
      id: "exhibit-transactions",
      order: 2,
      title: "Transaction Volume",
      type: "table",
      content: {
        type: "table",
        title: "Monthly Activity",
        headers: ["Transaction Type", "Volume", "Exceptions"],
        rows: [
          { cells: ["Purchase orders", "2,500", "N/A"] },
          { cells: ["Three-way match exceptions", "875", "35% exception rate"] },
          { cells: ["Vendor master changes", "45", "No approval workflow"] },
          { cells: ["Manual journal entries", "120", "Reviewed monthly"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-tolerance-issue",
      order: 1,
      type: "dropdown",
      label: "Is 15% three-way match tolerance appropriate?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-too-high",
      },
      explanation: "Per ERP control best practices, 15% tolerance is too high; typically 1-5% is appropriate to prevent payment fraud.",
      dropdownOptions: [
        { id: "opt-appropriate", order: 1, text: "Appropriate for the industry", isCorrect: false },
        { id: "opt-too-high", order: 2, text: "Too high - increases payment risk", isCorrect: true },
        { id: "opt-too-low", order: 3, text: "Too low - causes excessive exceptions", isCorrect: false },
      ],
    },
    {
      id: "req-exception-rate",
      order: 2,
      type: "dropdown",
      label: "What does 35% exception rate suggest?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-process-issue",
      },
      explanation: "Per process analytics, high exception rate (35%) despite high tolerance (15%) suggests underlying process or data quality issues.",
      dropdownOptions: [
        { id: "opt-normal", order: 1, text: "Normal business operations", isCorrect: false },
        { id: "opt-process-issue", order: 2, text: "Process or data quality issues", isCorrect: true },
        { id: "opt-good-controls", order: 3, text: "Strong controls catching errors", isCorrect: false },
      ],
    },
    {
      id: "req-sod-system",
      order: 3,
      type: "dropdown",
      label: "Risk of not enforcing SOD in system?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fraud-risk",
      },
      explanation: "Per COBIT DSS05.04, manual SOD enforcement is error-prone; system-enforced SOD reduces fraud and error risk.",
      dropdownOptions: [
        { id: "opt-efficiency", order: 1, text: "Reduced efficiency", isCorrect: false },
        { id: "opt-fraud-risk", order: 2, text: "Increased fraud risk", isCorrect: true },
        { id: "opt-user-frustration", order: 3, text: "User frustration", isCorrect: false },
      ],
    },
    {
      id: "req-master-data-risk",
      order: 4,
      type: "dropdown",
      label: "Risk of vendor master changes without approval?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fictitious-vendor",
      },
      explanation: "Per COSO/fraud prevention guidance, uncontrolled vendor master changes enable fictitious vendor fraud schemes.",
      dropdownOptions: [
        { id: "opt-data-errors", order: 1, text: "Data entry errors only", isCorrect: false },
        { id: "opt-fictitious-vendor", order: 2, text: "Fictitious vendor fraud", isCorrect: true },
        { id: "opt-system-performance", order: 3, text: "System performance issues", isCorrect: false },
      ],
    },
    {
      id: "req-audit-logging",
      order: 5,
      type: "dropdown",
      label: "Issue with financial transaction logging only?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-config-changes",
      },
      explanation: "Per NIST AU-2 and TSC CC7.2, audit logging must include configuration and master data changes, not just transactions.",
      dropdownOptions: [
        { id: "opt-adequate", order: 1, text: "Adequate - financial is most important", isCorrect: false },
        { id: "opt-config-changes", order: 2, text: "Misses configuration/master data changes", isCorrect: true },
        { id: "opt-storage", order: 3, text: "Storage concerns only", isCorrect: false },
      ],
    },
    {
      id: "req-period-close",
      order: 6,
      type: "dropdown",
      label: "Risk of 10-day soft close period?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-cutoff-errors",
      },
      explanation: "Per financial control best practices, extended soft close periods (10 days) increase cutoff errors and manipulation risk.",
      dropdownOptions: [
        { id: "opt-adequate-close", order: 1, text: "Adequate for adjustments", isCorrect: false },
        { id: "opt-cutoff-errors", order: 2, text: "Cutoff errors and manipulation risk", isCorrect: true },
        { id: "opt-too-short", order: 3, text: "Too short for proper close", isCorrect: false },
      ],
    },
  ],
};

// Business Continuity - Moderate
export const iscBusinessContinuityTBS: TBSQuestion = {
  id: "tbs-isc-007",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Business Continuity",
  subtopic: "Disaster Recovery Planning",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Business Continuity Analysis",
  scenarioText: `Evaluate business continuity metrics and recovery capabilities for critical systems.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-systems",
      order: 1,
      title: "Critical Systems",
      type: "table",
      content: {
        type: "table",
        title: "System Recovery Requirements",
        headers: ["System", "Business RTO", "Current RTO", "Business RPO", "Current RPO"],
        rows: [
          { cells: ["Order Processing", "4 hours", "8 hours", "1 hour", "4 hours"] },
          { cells: ["Financial Reporting", "24 hours", "24 hours", "4 hours", "4 hours"] },
          { cells: ["Customer Portal", "2 hours", "6 hours", "15 minutes", "1 hour"] },
          { cells: ["Email System", "8 hours", "4 hours", "24 hours", "24 hours"] },
          { cells: ["HR System", "72 hours", "48 hours", "24 hours", "12 hours"] },
        ],
      },
    },
    {
      id: "exhibit-definitions",
      order: 2,
      title: "DR Metrics",
      type: "text",
      content: {
        type: "text",
        title: "Recovery Definitions",
        paragraphs: [
          "RTO (Recovery Time Objective): Maximum acceptable downtime",
          "RPO (Recovery Point Objective): Maximum acceptable data loss",
          "System meets requirement if Current <= Business requirement",
          "Gap = Current - Business requirement",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-order-rto-gap",
      order: 1,
      type: "numeric",
      label: "Order Processing RTO gap (hours)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4,
        tolerance: 0,
      },
      explanation: "8 hours current - 4 hours required = 4 hour gap",
    },
    {
      id: "req-portal-rpo-gap",
      order: 2,
      type: "numeric",
      label: "Customer Portal RPO gap (minutes)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 45,
        tolerance: 0,
      },
      explanation: "60 minutes current - 15 minutes required = 45 minute gap",
    },
    {
      id: "req-systems-meeting-rto",
      order: 3,
      type: "numeric",
      label: "Number of systems meeting RTO requirement",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3,
        tolerance: 0,
      },
      explanation: "Financial (24=24), Email (4<8), HR (48<72) = 3 systems",
    },
    {
      id: "req-systems-meeting-rpo",
      order: 4,
      type: "numeric",
      label: "Number of systems meeting RPO requirement",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3,
        tolerance: 0,
      },
      explanation: "Financial (4=4), Email (24=24), HR (12<24) = 3 systems",
    },
    {
      id: "req-highest-priority",
      order: 5,
      type: "dropdown",
      label: "Highest priority system for improvement?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-customer-portal",
      },
      explanation: "Customer Portal has gaps in both RTO and RPO with short business requirements",
      dropdownOptions: [
        { id: "opt-order-processing", order: 1, text: "Order Processing", isCorrect: false },
        { id: "opt-customer-portal", order: 2, text: "Customer Portal", isCorrect: true },
        { id: "opt-hr-system", order: 3, text: "HR System", isCorrect: false },
      ],
    },
    {
      id: "req-backup-strategy",
      order: 6,
      type: "dropdown",
      label: "To achieve 15-minute RPO for Customer Portal, recommend?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-sync-replication",
      },
      explanation: "Synchronous replication needed for sub-hour RPO requirements",
      dropdownOptions: [
        { id: "opt-daily-backup", order: 1, text: "Daily backup", isCorrect: false },
        { id: "opt-hourly-backup", order: 2, text: "Hourly backup", isCorrect: false },
        { id: "opt-sync-replication", order: 3, text: "Synchronous replication", isCorrect: true },
      ],
    },
  ],
};

// Privacy Controls - Simple
export const iscPrivacyControlsTBS: TBSQuestion = {
  id: "tbs-isc-008",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Privacy",
  subtopic: "Privacy Controls and Compliance",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Privacy Control Assessment",
  scenarioText: `Assess privacy controls for personal data handling at JKL Corporation.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-data-practices",
      order: 1,
      title: "Data Handling Practices",
      type: "text",
      content: {
        type: "text",
        title: "Current Privacy Practices",
        paragraphs: [
          "1. Customer data collected includes name, email, phone, SSN for credit checks",
          "2. Privacy policy last updated 3 years ago",
          "3. Data retained indefinitely 'for business purposes'",
          "4. No consent mechanism for marketing communications",
          "5. Customer data shared with third-party analytics provider",
          "6. Data breach notification plan: Notify within 90 days",
          "7. No data subject access request process documented",
        ],
      },
    },
    {
      id: "exhibit-regulations",
      order: 2,
      title: "Privacy Requirements",
      type: "text",
      content: {
        type: "text",
        title: "Regulatory Requirements (California example)",
        paragraphs: [
          "Data minimization: Collect only necessary data",
          "Purpose limitation: Use data only for stated purposes",
          "Consent: Obtain consent for marketing",
          "Retention limits: Define and enforce retention periods",
          "Breach notification: 72 hours (varies by regulation)",
          "Access rights: Enable data subject requests",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-data-minimization",
      order: 1,
      type: "dropdown",
      label: "Is collecting SSN for all customers appropriate?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-excessive",
      },
      explanation: "SSN should only be collected when necessary (credit checks, not all customers)",
      dropdownOptions: [
        { id: "opt-appropriate", order: 1, text: "Appropriate - common business practice", isCorrect: false },
        { id: "opt-excessive", order: 2, text: "Excessive - violates data minimization", isCorrect: true },
        { id: "opt-required", order: 3, text: "Required by law", isCorrect: false },
      ],
    },
    {
      id: "req-retention-issue",
      order: 2,
      type: "dropdown",
      label: "Issue with indefinite data retention?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-no-limits",
      },
      explanation: "Indefinite retention violates purpose limitation and increases breach risk",
      dropdownOptions: [
        { id: "opt-best-practice", order: 1, text: "Best practice for analytics", isCorrect: false },
        { id: "opt-no-limits", order: 2, text: "Violates retention limitation requirements", isCorrect: true },
        { id: "opt-storage-cost", order: 3, text: "Only concern is storage cost", isCorrect: false },
      ],
    },
    {
      id: "req-breach-notification",
      order: 3,
      type: "dropdown",
      label: "Is 90-day breach notification adequate?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-too-long",
      },
      explanation: "90 days far exceeds regulatory requirements (typically 72 hours)",
      dropdownOptions: [
        { id: "opt-adequate", order: 1, text: "Adequate - provides investigation time", isCorrect: false },
        { id: "opt-too-long", order: 2, text: "Too long - regulations require faster", isCorrect: true },
        { id: "opt-too-short", order: 3, text: "Too short - need more time", isCorrect: false },
      ],
    },
    {
      id: "req-third-party",
      order: 4,
      type: "dropdown",
      label: "Concern with sharing data with analytics provider?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-no-consent",
      },
      explanation: "Third-party sharing typically requires disclosure and consent",
      dropdownOptions: [
        { id: "opt-no-concern", order: 1, text: "No concern - normal business", isCorrect: false },
        { id: "opt-no-consent", order: 2, text: "Consent and disclosure may be required", isCorrect: true },
        { id: "opt-technical", order: 3, text: "Only technical security concerns", isCorrect: false },
      ],
    },
    {
      id: "req-access-rights",
      order: 5,
      type: "dropdown",
      label: "Impact of no data subject access process?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-compliance-violation",
      },
      explanation: "Many regulations require ability to respond to access/deletion requests",
      dropdownOptions: [
        { id: "opt-minimal", order: 1, text: "Minimal - few customers request", isCorrect: false },
        { id: "opt-compliance-violation", order: 2, text: "Regulatory non-compliance", isCorrect: true },
        { id: "opt-efficiency", order: 3, text: "Only efficiency concern", isCorrect: false },
      ],
    },
  ],
};

// Network Security - Simple
export const iscNetworkSecurityTBS: TBSQuestion = {
  id: "tbs-isc-009",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Cybersecurity",
  subtopic: "Network Security",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Network Security Controls",
  scenarioText: `Evaluate network security architecture and controls for MNO Corporation.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-network",
      order: 1,
      title: "Network Architecture",
      type: "text",
      content: {
        type: "text",
        title: "Current Network Configuration",
        paragraphs: [
          "1. Single firewall between internet and internal network",
          "2. All internal systems on same network segment (flat network)",
          "3. Wireless network uses WPA2 with company-wide shared password",
          "4. VPN uses split tunneling for remote workers",
          "5. Internal DNS server also accessible from internet",
          "6. Web servers located on internal network with database servers",
        ],
      },
    },
    {
      id: "exhibit-best-practices",
      order: 2,
      title: "Security Best Practices",
      type: "text",
      content: {
        type: "text",
        title: "Network Security Standards",
        paragraphs: [
          "Defense in depth: Multiple security layers",
          "Network segmentation: Separate sensitive systems",
          "DMZ: Place public-facing servers in demilitarized zone",
          "VPN: Full tunnel preferred for security",
          "Wireless: WPA2/3-Enterprise with individual credentials",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-flat-network",
      order: 1,
      type: "dropdown",
      label: "Risk of flat network architecture?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-lateral-movement",
      },
      explanation: "Flat networks allow attackers to move laterally after initial compromise",
      dropdownOptions: [
        { id: "opt-performance", order: 1, text: "Network performance issues", isCorrect: false },
        { id: "opt-lateral-movement", order: 2, text: "Easy lateral movement for attackers", isCorrect: true },
        { id: "opt-management", order: 3, text: "Difficult management", isCorrect: false },
      ],
    },
    {
      id: "req-shared-wifi",
      order: 2,
      type: "dropdown",
      label: "Risk of shared WiFi password?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-no-accountability",
      },
      explanation: "Shared password means no individual accountability and difficult revocation",
      dropdownOptions: [
        { id: "opt-convenience", order: 1, text: "Too convenient for users", isCorrect: false },
        { id: "opt-no-accountability", order: 2, text: "No individual accountability", isCorrect: true },
        { id: "opt-weak-encryption", order: 3, text: "Weak encryption", isCorrect: false },
      ],
    },
    {
      id: "req-split-tunnel",
      order: 3,
      type: "dropdown",
      label: "Security concern with split tunneling VPN?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-bypass-controls",
      },
      explanation: "Split tunneling allows internet traffic to bypass corporate security controls",
      dropdownOptions: [
        { id: "opt-bandwidth", order: 1, text: "Bandwidth consumption", isCorrect: false },
        { id: "opt-bypass-controls", order: 2, text: "Traffic bypasses security controls", isCorrect: true },
        { id: "opt-complexity", order: 3, text: "Configuration complexity", isCorrect: false },
      ],
    },
    {
      id: "req-web-servers",
      order: 4,
      type: "dropdown",
      label: "Where should web servers be located?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-dmz",
      },
      explanation: "Public-facing servers belong in a DMZ, isolated from internal network",
      dropdownOptions: [
        { id: "opt-internal", order: 1, text: "Internal network is fine", isCorrect: false },
        { id: "opt-dmz", order: 2, text: "Demilitarized Zone (DMZ)", isCorrect: true },
        { id: "opt-cloud", order: 3, text: "Must be in cloud", isCorrect: false },
      ],
    },
    {
      id: "req-dns-exposure",
      order: 5,
      type: "dropdown",
      label: "Risk of internal DNS exposed to internet?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-info-disclosure",
      },
      explanation: "Internal DNS can reveal network structure and enable targeted attacks",
      dropdownOptions: [
        { id: "opt-no-risk", order: 1, text: "No significant risk", isCorrect: false },
        { id: "opt-info-disclosure", order: 2, text: "Information disclosure about internal network", isCorrect: true },
        { id: "opt-performance-dns", order: 3, text: "Performance degradation only", isCorrect: false },
      ],
    },
  ],
};

// Cloud Security - Moderate
export const iscCloudSecurityTBS: TBSQuestion = {
  id: "tbs-isc-010",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Cloud Computing",
  subtopic: "Cloud Security and Compliance",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Cloud Security Assessment",
  scenarioText: `Evaluate cloud security considerations for a company migrating to cloud services.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-cloud-services",
      order: 1,
      title: "Cloud Services",
      type: "table",
      content: {
        type: "table",
        title: "Planned Cloud Migration",
        headers: ["Service", "Cloud Model", "Data Sensitivity"],
        rows: [
          { cells: ["Email", "SaaS (Office 365)", "Medium - business communications"] },
          { cells: ["CRM", "SaaS (Salesforce)", "High - customer PII"] },
          { cells: ["Development servers", "IaaS (AWS EC2)", "Low - test data only"] },
          { cells: ["Financial application", "PaaS (custom app on Azure)", "High - financial data"] },
        ],
      },
    },
    {
      id: "exhibit-shared-responsibility",
      order: 2,
      title: "Shared Responsibility Model",
      type: "text",
      content: {
        type: "text",
        title: "Cloud Security Responsibilities",
        paragraphs: [
          "IaaS: Customer manages OS, applications, data, access",
          "PaaS: Customer manages applications, data, access",
          "SaaS: Customer manages data and access configuration",
          "All models: Customer responsible for data classification and access management",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-iaas-responsibility",
      order: 1,
      type: "dropdown",
      label: "For IaaS (AWS EC2), who patches operating systems?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-customer-iaas",
      },
      explanation: "Per the cloud shared responsibility model (NIST SP 500-292), in IaaS the customer is responsible for OS management including patching.",
      dropdownOptions: [
        { id: "opt-provider-iaas", order: 1, text: "Cloud provider", isCorrect: false },
        { id: "opt-customer-iaas", order: 2, text: "Customer", isCorrect: true },
        { id: "opt-shared-iaas", order: 3, text: "Shared responsibility", isCorrect: false },
      ],
    },
    {
      id: "req-saas-responsibility",
      order: 2,
      type: "dropdown",
      label: "For SaaS (Salesforce), who manages application security patches?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-provider-saas",
      },
      explanation: "Per the cloud shared responsibility model, in SaaS the provider manages the application including security patches; customer only manages data and access.",
      dropdownOptions: [
        { id: "opt-provider-saas", order: 1, text: "Cloud provider", isCorrect: true },
        { id: "opt-customer-saas", order: 2, text: "Customer", isCorrect: false },
        { id: "opt-shared-saas", order: 3, text: "Shared responsibility", isCorrect: false },
      ],
    },
    {
      id: "req-data-residency",
      order: 3,
      type: "dropdown",
      label: "Key compliance concern with cloud for financial data?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-data-location",
      },
      explanation: "Per GDPR, SOX, and various financial regulations, data residency/location requirements are critical compliance concerns for cloud-hosted financial data.",
      dropdownOptions: [
        { id: "opt-cost", order: 1, text: "Cost management", isCorrect: false },
        { id: "opt-data-location", order: 2, text: "Data residency/location requirements", isCorrect: true },
        { id: "opt-performance", order: 3, text: "Performance concerns", isCorrect: false },
      ],
    },
    {
      id: "req-crm-pii",
      order: 4,
      type: "dropdown",
      label: "Primary security control for CRM with customer PII?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-encryption-access",
      },
      explanation: "Per NIST SP 800-122 (PII guidance) and TSC CC6.1, PII requires encryption at rest and in transit plus strict access controls.",
      dropdownOptions: [
        { id: "opt-firewall", order: 1, text: "Network firewall", isCorrect: false },
        { id: "opt-encryption-access", order: 2, text: "Encryption and access controls", isCorrect: true },
        { id: "opt-backup", order: 3, text: "Regular backups", isCorrect: false },
      ],
    },
    {
      id: "req-vendor-assessment",
      order: 5,
      type: "dropdown",
      label: "What should be obtained from cloud providers?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-soc-report",
      },
      explanation: "Per AICPA/AT-C 205, SOC 2 Type II reports provide independent assurance over cloud provider controls relevant to Trust Services Criteria.",
      dropdownOptions: [
        { id: "opt-marketing", order: 1, text: "Marketing materials", isCorrect: false },
        { id: "opt-soc-report", order: 2, text: "SOC 2 Type II report", isCorrect: true },
        { id: "opt-user-manual", order: 3, text: "User manual", isCorrect: false },
      ],
    },
    {
      id: "req-exit-strategy",
      order: 6,
      type: "dropdown",
      label: "Important contract consideration for cloud migration?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-data-portability",
      },
      explanation: "Per cloud governance best practices, data portability and exit provisions are critical contract elements to avoid vendor lock-in and ensure business continuity.",
      dropdownOptions: [
        { id: "opt-unlimited-use", order: 1, text: "Unlimited user licenses", isCorrect: false },
        { id: "opt-data-portability", order: 2, text: "Data portability and exit provisions", isCorrect: true },
        { id: "opt-free-training", order: 3, text: "Free training", isCorrect: false },
      ],
    },
  ],
};

// COSO Framework - Simple
export const iscCOSOFrameworkTBS: TBSQuestion = {
  id: "tbs-isc-011",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Internal Controls",
  subtopic: "COSO Framework",
  difficulty: "easy",
  skillLevel: "remembering_understanding",
  contentArea: "ISC-II",
  title: "COSO Framework Components",
  scenarioText: `Classify internal control activities according to COSO framework components.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-coso",
      order: 1,
      title: "COSO Components",
      type: "table",
      content: {
        type: "table",
        title: "COSO Internal Control Components",
        headers: ["Component", "Description"],
        rows: [
          { cells: ["Control Environment", "Tone at top, ethics, organizational structure"] },
          { cells: ["Risk Assessment", "Identifying and analyzing risks to objectives"] },
          { cells: ["Control Activities", "Policies and procedures that address risks"] },
          { cells: ["Information & Communication", "Relevant information identified and communicated"] },
          { cells: ["Monitoring", "Ongoing and separate evaluations of controls"] },
        ],
      },
    },
    {
      id: "exhibit-activities",
      order: 2,
      title: "Control Activities to Classify",
      type: "text",
      content: {
        type: "text",
        title: "Internal Control Examples",
        paragraphs: [
          "1. Board audit committee meets quarterly to review financial reporting",
          "2. Three-way match before payment processing",
          "3. Annual fraud risk assessment",
          "4. Management distributes monthly exception reports",
          "5. Code of conduct training for all employees",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-audit-committee",
      order: 1,
      type: "dropdown",
      label: "Audit committee oversight is part of?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-control-env",
      },
      explanation: "Per COSO 2013 Framework, board oversight is a key principle of the Control Environment component (Principle 2).",
      dropdownOptions: [
        { id: "opt-control-env", order: 1, text: "Control Environment", isCorrect: true },
        { id: "opt-risk-assess", order: 2, text: "Risk Assessment", isCorrect: false },
        { id: "opt-monitoring", order: 3, text: "Monitoring", isCorrect: false },
      ],
    },
    {
      id: "req-three-way-match",
      order: 2,
      type: "dropdown",
      label: "Three-way match before payment is?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-control-act",
      },
      explanation: "Per COSO 2013, three-way match (PO/receipt/invoice) is a Control Activity that mitigates payment risk (Principle 10: transaction-level controls).",
      dropdownOptions: [
        { id: "opt-risk-assess-2", order: 1, text: "Risk Assessment", isCorrect: false },
        { id: "opt-control-act", order: 2, text: "Control Activities", isCorrect: true },
        { id: "opt-info-comm", order: 3, text: "Information & Communication", isCorrect: false },
      ],
    },
    {
      id: "req-fraud-assessment",
      order: 3,
      type: "dropdown",
      label: "Annual fraud risk assessment is?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-risk-assess-3",
      },
      explanation: "Per COSO 2013 Principle 8, identifying and analyzing fraud risk is part of the Risk Assessment component.",
      dropdownOptions: [
        { id: "opt-control-env-3", order: 1, text: "Control Environment", isCorrect: false },
        { id: "opt-risk-assess-3", order: 2, text: "Risk Assessment", isCorrect: true },
        { id: "opt-control-act-3", order: 3, text: "Control Activities", isCorrect: false },
      ],
    },
    {
      id: "req-exception-reports",
      order: 4,
      type: "dropdown",
      label: "Monthly exception reports are?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-monitoring-4",
      },
      explanation: "Per COSO 2013 Principle 16, exception reports are ongoing evaluations (Monitoring component) that assess control operating effectiveness.",
      dropdownOptions: [
        { id: "opt-control-act-4", order: 1, text: "Control Activities", isCorrect: false },
        { id: "opt-info-comm-4", order: 2, text: "Information & Communication", isCorrect: false },
        { id: "opt-monitoring-4", order: 3, text: "Monitoring", isCorrect: true },
      ],
    },
    {
      id: "req-code-conduct",
      order: 5,
      type: "dropdown",
      label: "Code of conduct training is?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-control-env-5",
      },
      explanation: "Per COSO 2013 Principle 1, ethics training supports the Control Environment by demonstrating commitment to integrity and ethical values.",
      dropdownOptions: [
        { id: "opt-control-env-5", order: 1, text: "Control Environment", isCorrect: true },
        { id: "opt-control-act-5", order: 2, text: "Control Activities", isCorrect: false },
        { id: "opt-info-comm-5", order: 3, text: "Information & Communication", isCorrect: false },
      ],
    },
  ],
};

// IT Audit Procedures - Moderate
export const iscITAuditProceduresTBS: TBSQuestion = {
  id: "tbs-isc-012",
  section: "ISC",
  tbsType: "dropdown",
  topic: "IT Audit",
  subtopic: "IT Audit Procedures",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-III",
  title: "IT Audit Procedure Selection",
  scenarioText: `Select appropriate IT audit procedures to test controls over various IT processes.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-control-objectives",
      order: 1,
      title: "Control Objectives",
      type: "text",
      content: {
        type: "text",
        title: "Areas to Test",
        paragraphs: [
          "1. User access is appropriately authorized and provisioned",
          "2. Program changes are properly tested before production",
          "3. Batch jobs complete successfully",
          "4. Privileged access is limited and monitored",
          "5. Data backups are performed and recoverable",
        ],
      },
    },
    {
      id: "exhibit-procedures",
      order: 2,
      title: "Available Procedures",
      type: "text",
      content: {
        type: "text",
        title: "Audit Procedure Types",
        paragraphs: [
          "Inquiry: Interview personnel about processes",
          "Observation: Watch process being performed",
          "Inspection: Review documentation and evidence",
          "Reperformance: Re-execute the control",
          "Data analytics: Analyze population data",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-user-access-test",
      order: 1,
      type: "dropdown",
      label: "Best procedure to test user access authorization?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inspection-access",
      },
      explanation: "Per IT audit standards, inspection of authorization documentation provides evidence that access was properly approved before provisioning.",
      dropdownOptions: [
        { id: "opt-inquiry-access", order: 1, text: "Inquiry of IT manager", isCorrect: false },
        { id: "opt-inspection-access", order: 2, text: "Inspect authorization documentation", isCorrect: true },
        { id: "opt-observation-access", order: 3, text: "Observe user logging in", isCorrect: false },
      ],
    },
    {
      id: "req-change-testing",
      order: 2,
      type: "dropdown",
      label: "Best procedure to test program change testing?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inspection-change",
      },
      explanation: "Per COBIT BAI06 and IT audit guidance, inspection of test documentation and approvals provides evidence of proper change testing.",
      dropdownOptions: [
        { id: "opt-inquiry-change", order: 1, text: "Inquiry of developers", isCorrect: false },
        { id: "opt-inspection-change", order: 2, text: "Inspect test documentation and approvals", isCorrect: true },
        { id: "opt-reperform-change", order: 3, text: "Reperform all testing", isCorrect: false },
      ],
    },
    {
      id: "req-batch-job-test",
      order: 3,
      type: "dropdown",
      label: "Best procedure to test batch job completion?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-analytics-batch",
      },
      explanation: "Per data analytics audit techniques, analyzing batch job logs for the entire period provides comprehensive coverage to identify all failures.",
      dropdownOptions: [
        { id: "opt-inquiry-batch", order: 1, text: "Inquiry of operations staff", isCorrect: false },
        { id: "opt-observation-batch", order: 2, text: "Observe one batch job running", isCorrect: false },
        { id: "opt-analytics-batch", order: 3, text: "Analyze batch job completion logs", isCorrect: true },
      ],
    },
    {
      id: "req-privileged-access",
      order: 4,
      type: "dropdown",
      label: "Best procedure to test privileged access monitoring?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inspect-review",
      },
      explanation: "Per NIST AC-2 and TSC CC6.2, inspection of privileged access review documentation provides evidence that monitoring controls are operating.",
      dropdownOptions: [
        { id: "opt-inquiry-priv", order: 1, text: "Inquiry of security manager", isCorrect: false },
        { id: "opt-inspect-review", order: 2, text: "Inspect review documentation and follow-up", isCorrect: true },
        { id: "opt-observe-priv", order: 3, text: "Observe security monitoring", isCorrect: false },
      ],
    },
    {
      id: "req-backup-test",
      order: 5,
      type: "dropdown",
      label: "Best procedure to test backup recoverability?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-reperform-restore",
      },
      explanation: "Per NIST CP-10 and business continuity best practices, reperforming a test restore provides the strongest evidence that backups are actually recoverable.",
      dropdownOptions: [
        { id: "opt-inquiry-backup", order: 1, text: "Inquiry of backup administrator", isCorrect: false },
        { id: "opt-inspect-logs", order: 2, text: "Inspect backup completion logs", isCorrect: false },
        { id: "opt-reperform-restore", order: 3, text: "Reperform test restore from backup", isCorrect: true },
      ],
    },
  ],
};

// Database Security Controls
export const iscDatabaseSecurityTBS: TBSQuestion = {
  id: "tbs-isc-013",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Data Management",
  subtopic: "Database Security",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Database Security Assessment",
  scenarioText: `Evaluate database security controls and identify risks.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-db-config",
      order: 1,
      title: "Database Configuration",
      type: "text",
      content: {
        type: "text",
        title: "Current Database Settings",
        paragraphs: [
          "Database: Oracle 19c Production",
          "Authentication: Username/password (no MFA)",
          "Encryption at rest: Disabled",
          "Encryption in transit: TLS 1.2",
          "Audit logging: Failed logins only",
          "Backup encryption: Not encrypted",
          "Default accounts: SYS and SYSTEM passwords unchanged",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-default-accounts",
      order: 1,
      type: "dropdown",
      label: "Risk level of unchanged default passwords?",
      points: 1,
      dropdownOptions: [
        { id: "low-risk", order: 1, text: "Low - default accounts are rarely targeted", isCorrect: false },
        { id: "high-risk", order: 2, text: "High - well-known credentials easily exploited", isCorrect: true },
        { id: "medium-risk", order: 3, text: "Medium - compensating controls may exist", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high-risk" },
      explanation: "Per CIS Benchmarks and NIST hardening guidelines, default credentials are widely known and present an immediate, critical exploitation risk.",
    },
    {
      id: "req-encryption-rest",
      order: 2,
      type: "dropdown",
      label: "Impact of disabled encryption at rest?",
      points: 1,
      dropdownOptions: [
        { id: "minimal", order: 1, text: "Minimal - network encryption is sufficient", isCorrect: false },
        { id: "significant", order: 2, text: "Significant - data vulnerable if media is stolen", isCorrect: true },
        { id: "none", order: 3, text: "None - physical security compensates", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "significant" },
      explanation: "Per NIST SC-28 and PCI DSS, without encryption at rest, data is exposed if storage media is stolen or improperly disposed.",
    },
    {
      id: "req-audit-logging",
      order: 3,
      type: "dropdown",
      label: "Is the audit logging configuration adequate?",
      points: 1,
      dropdownOptions: [
        { id: "adequate", order: 1, text: "Adequate - captures security events", isCorrect: false },
        { id: "inadequate", order: 2, text: "Inadequate - should log successful access too", isCorrect: true },
        { id: "excessive", order: 3, text: "Excessive - generates too many logs", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "inadequate" },
      explanation: "Per NIST AU-2 and TSC CC7.2, logging only failed logins misses successful unauthorized access; comprehensive audit logging is required.",
    },
    {
      id: "req-priority-fix",
      order: 4,
      type: "dropdown",
      label: "Highest priority remediation?",
      points: 2,
      dropdownOptions: [
        { id: "enable-mfa", order: 1, text: "Enable MFA for database access", isCorrect: false },
        { id: "change-defaults", order: 2, text: "Change default account passwords", isCorrect: true },
        { id: "enable-encryption", order: 3, text: "Enable encryption at rest", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "change-defaults" },
      explanation: "Per security remediation priorities, default passwords present immediate exploitation risk and should be addressed before other control gaps.",
    },
  ],
};

// Incident Response
export const iscIncidentResponseTBS: TBSQuestion = {
  id: "tbs-isc-014",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Security Operations",
  subtopic: "Incident Response",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Security Incident Response",
  scenarioText: `Evaluate incident response procedures and prioritize actions.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-incident",
      order: 1,
      title: "Incident Report",
      type: "text",
      content: {
        type: "text",
        title: "Security Incident Details",
        paragraphs: [
          "Date/Time: 3:00 AM Saturday",
          "Detection: Security monitoring flagged unusual activity",
          "Finding: Large data transfer from HR database to external IP",
          "Affected: Employee PII (SSN, addresses, compensation)",
          "Volume: Approximately 50,000 records",
          "Source: Privileged IT account (Database Admin)",
          "Status: Transfer completed; connection closed",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-first-action",
      order: 1,
      type: "dropdown",
      label: "First priority action?",
      points: 2,
      dropdownOptions: [
        { id: "notify-management", order: 1, text: "Notify senior management", isCorrect: false },
        { id: "contain-incident", order: 2, text: "Contain - disable compromised account", isCorrect: true },
        { id: "investigate-source", order: 3, text: "Investigate external IP address", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "contain-incident" },
      explanation: "Per NIST SP 800-61 (Incident Response Guide), containment is the first priority to prevent further damage before investigation.",
    },
    {
      id: "req-breach-type",
      order: 2,
      type: "dropdown",
      label: "Classification of this incident?",
      points: 1,
      dropdownOptions: [
        { id: "security-event", order: 1, text: "Security event - no breach", isCorrect: false },
        { id: "data-breach", order: 2, text: "Data breach - requires notification", isCorrect: true },
        { id: "minor-incident", order: 3, text: "Minor incident - internal review only", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "data-breach" },
      explanation: "Per state breach notification laws and GDPR, PII exfiltration to external parties constitutes a reportable data breach.",
    },
    {
      id: "req-notification",
      order: 3,
      type: "dropdown",
      label: "Required notification under most state laws?",
      points: 2,
      dropdownOptions: [
        { id: "no-notification", order: 1, text: "No notification - data may be encrypted", isCorrect: false },
        { id: "affected-individuals", order: 2, text: "Affected individuals must be notified", isCorrect: true },
        { id: "optional", order: 3, text: "Notification is discretionary", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "affected-individuals" },
      explanation: "Per state breach notification laws (all 50 states), affected individuals must be notified when unencrypted PII is compromised.",
    },
    {
      id: "req-evidence",
      order: 4,
      type: "dropdown",
      label: "Critical evidence preservation step?",
      points: 1,
      dropdownOptions: [
        { id: "create-backup", order: 1, text: "Create backup of database", isCorrect: false },
        { id: "preserve-logs", order: 2, text: "Preserve all system and security logs", isCorrect: true },
        { id: "interview-admin", order: 3, text: "Interview the database administrator", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "preserve-logs" },
      explanation: "Per NIST SP 800-61 and forensic best practices, logs provide critical evidence and must be preserved immediately before automatic rotation or deletion.",
    },
  ],
};

// SOC 2 Report Analysis
export const iscSOC2AnalysisTBS: TBSQuestion = {
  id: "tbs-isc-015",
  section: "ISC",
  tbsType: "dropdown",
  topic: "SOC Engagements",
  subtopic: "SOC 2 Reports",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-III",
  title: "SOC 2 Report Evaluation",
  scenarioText: `Analyze a SOC 2 report and assess its adequacy for reliance.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-soc2-summary",
      order: 1,
      title: "SOC 2 Report Summary",
      type: "text",
      content: {
        type: "text",
        title: "Cloud Service Provider SOC 2",
        paragraphs: [
          "Report Type: SOC 2 Type 1",
          "Trust Services Criteria: Security and Availability",
          "Report Date: December 31, 2024",
          "Report Coverage Period: Point in time (December 31)",
          "Opinion: Unqualified",
          "Exceptions Noted: 2 control exceptions in Security criteria",
          "Complementary User Entity Controls: 8 specified",
          "Subservice Organizations: 2 using carve-out method",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-type-limitation",
      order: 1,
      type: "dropdown",
      label: "Primary limitation of Type 1 report?",
      points: 1,
      dropdownOptions: [
        { id: "no-testing", order: 1, text: "No testing of control operating effectiveness", isCorrect: true },
        { id: "limited-criteria", order: 2, text: "Limited trust services criteria covered", isCorrect: false },
        { id: "old-report", order: 3, text: "Report is outdated", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "no-testing" },
      explanation: "Per AT-C 205/SSAE 18, Type 1 reports only test design at a point in time, not operating effectiveness over a period.",
    },
    {
      id: "req-carve-out",
      order: 2,
      type: "dropdown",
      label: "Impact of carve-out method for subservice orgs?",
      points: 2,
      dropdownOptions: [
        { id: "no-impact", order: 1, text: "No impact - report covers all controls", isCorrect: false },
        { id: "gap-coverage", order: 2, text: "Gap - subservice controls not covered", isCorrect: true },
        { id: "enhanced", order: 3, text: "Enhanced - more detailed coverage", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "gap-coverage" },
      explanation: "Per AT-C 320, carve-out method excludes subservice organization controls from the report scope; user must separately assess those controls.",
    },
    {
      id: "req-cuec",
      order: 3,
      type: "dropdown",
      label: "User responsibility for complementary controls?",
      points: 2,
      dropdownOptions: [
        { id: "optional", order: 1, text: "Optional - provider handles security", isCorrect: false },
        { id: "required", order: 2, text: "Required - must implement for controls to work", isCorrect: true },
        { id: "covered", order: 3, text: "Already covered by provider controls", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "required" },
      explanation: "Per SOC reporting standards, Complementary User Entity Controls (CUECs) are assumed in the service organization's control design; users must implement them.",
    },
    {
      id: "req-exceptions",
      order: 4,
      type: "dropdown",
      label: "How should control exceptions be addressed?",
      points: 1,
      dropdownOptions: [
        { id: "ignore", order: 1, text: "Ignore - opinion is unqualified", isCorrect: false },
        { id: "assess-impact", order: 2, text: "Assess risk impact and compensating controls", isCorrect: true },
        { id: "reject-provider", order: 3, text: "Reject provider due to exceptions", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "assess-impact" },
      explanation: "Per user entity guidance, control exceptions require assessment of their materiality, impact, and whether compensating controls exist.",
    },
  ],
};

// Encryption Implementation
export const iscEncryptionTBS: TBSQuestion = {
  id: "tbs-isc-016",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Data Security",
  subtopic: "Encryption",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Encryption Implementation Review",
  scenarioText: `Evaluate encryption controls and key management practices.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-encryption",
      order: 1,
      title: "Encryption Configuration",
      type: "table",
      content: {
        type: "table",
        title: "Current Encryption Settings",
        headers: ["Component", "Encryption Method", "Key Length"],
        rows: [
          { cells: ["Data at rest", "AES", "128-bit"] },
          { cells: ["Data in transit", "TLS 1.0", "N/A"] },
          { cells: ["Email", "No encryption", "N/A"] },
          { cells: ["Backup tapes", "AES", "256-bit"] },
          { cells: ["Database fields (PII)", "3DES", "168-bit"] },
        ],
      },
    },
    {
      id: "exhibit-keys",
      order: 2,
      title: "Key Management",
      type: "text",
      content: {
        type: "text",
        title: "Key Management Practices",
        paragraphs: [
          "Key storage: Encrypted file on application server",
          "Key rotation: Annually",
          "Key backup: Stored with data backups",
          "Key access: Shared by IT team members",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-tls-version",
      order: 1,
      type: "dropdown",
      label: "Assessment of TLS 1.0 for data in transit?",
      points: 1,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable - widely supported", isCorrect: false },
        { id: "vulnerable", order: 2, text: "Vulnerable - deprecated protocol", isCorrect: true },
        { id: "best-practice", order: 3, text: "Best practice for compatibility", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "vulnerable" },
      explanation: "Per NIST SP 800-52 and PCI DSS, TLS 1.0 has known vulnerabilities (BEAST, POODLE); TLS 1.2 or 1.3 is required.",
    },
    {
      id: "req-3des",
      order: 2,
      type: "dropdown",
      label: "Assessment of 3DES for PII encryption?",
      points: 1,
      dropdownOptions: [
        { id: "secure", order: 1, text: "Secure - triple encryption provides protection", isCorrect: false },
        { id: "deprecated", order: 2, text: "Deprecated - should migrate to AES", isCorrect: true },
        { id: "overkill", order: 3, text: "Overkill - single DES sufficient", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "deprecated" },
      explanation: "Per NIST SP 800-131A, 3DES is deprecated due to small 64-bit block size vulnerabilities (Sweet32 attack); migration to AES required.",
    },
    {
      id: "req-key-storage",
      order: 3,
      type: "dropdown",
      label: "Key storage approach risk?",
      points: 2,
      dropdownOptions: [
        { id: "low-risk", order: 1, text: "Low - keys are encrypted", isCorrect: false },
        { id: "high-risk", order: 2, text: "High - keys on same server as data", isCorrect: true },
        { id: "medium-risk", order: 3, text: "Medium - acceptable with access controls", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high-risk" },
      explanation: "Per NIST key management guidelines, storing keys on the same server as encrypted data defeats encryption if the server is compromised.",
    },
    {
      id: "req-key-backup",
      order: 4,
      type: "dropdown",
      label: "Issue with key backup approach?",
      points: 1,
      dropdownOptions: [
        { id: "good-practice", order: 1, text: "Good practice - ensures key availability", isCorrect: false },
        { id: "security-risk", order: 2, text: "Security risk - exposes keys if backups stolen", isCorrect: true },
        { id: "redundant", order: 3, text: "Redundant - keys can be regenerated", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "security-risk" },
      explanation: "Per NIST SP 800-57, encryption keys should be backed up separately from encrypted data to prevent both being compromised together.",
    },
  ],
};

// Identity and Access Management
export const iscIdentityManagementTBS: TBSQuestion = {
  id: "tbs-isc-017",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Access Controls",
  subtopic: "Identity Management",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Identity and Access Management Review",
  scenarioText: `Evaluate IAM controls and provisioning processes.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-iam",
      order: 1,
      title: "IAM Process Description",
      type: "text",
      content: {
        type: "text",
        title: "Current IAM Processes",
        paragraphs: [
          "Provisioning: HR sends email to IT; IT creates accounts within 48 hours",
          "Authentication: Single sign-on with Active Directory",
          "Authorization: Role-based access; roles assigned by department heads",
          "Access Reviews: Quarterly reviews by IT department",
          "Deprovisioning: HR notifies IT upon termination; accounts disabled within 3 days",
          "Privileged Access: Separate admin accounts; no time-limited access",
          "Contractors: Same process as employees",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-access-reviews",
      order: 1,
      type: "dropdown",
      label: "Who should perform access reviews?",
      points: 1,
      dropdownOptions: [
        { id: "it-dept", order: 1, text: "IT department - they manage access", isCorrect: false },
        { id: "data-owners", order: 2, text: "Data/application owners - understand business need", isCorrect: true },
        { id: "external-audit", order: 3, text: "External auditors - independence required", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "data-owners" },
      explanation: "Per NIST AC-2 and access control best practices, data/application owners should perform access reviews as they understand legitimate business need.",
    },
    {
      id: "req-deprovision",
      order: 2,
      type: "dropdown",
      label: "Deprovisioning timing assessment?",
      points: 1,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable - allows for knowledge transfer", isCorrect: false },
        { id: "too-slow", order: 2, text: "Too slow - should be same day", isCorrect: true },
        { id: "aggressive", order: 3, text: "Too aggressive - consider 5 days", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "too-slow" },
      explanation: "Per NIST PS-4 and TSC CC6.2, account deprovisioning should occur same-day; 3 days creates a window for unauthorized access by terminated employees.",
    },
    {
      id: "req-privileged-access",
      order: 3,
      type: "dropdown",
      label: "Missing privileged access control?",
      points: 2,
      dropdownOptions: [
        { id: "more-admins", order: 1, text: "More admin accounts needed", isCorrect: false },
        { id: "jit-access", order: 2, text: "Just-in-time/time-limited privileged access", isCorrect: true },
        { id: "fewer-reviews", order: 3, text: "Less frequent reviews for efficiency", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "jit-access" },
      explanation: "Per NIST AC-2(2) and privileged access management best practices, just-in-time (JIT) time-limited access reduces attack surface vs. standing privileges.",
    },
    {
      id: "req-contractor",
      order: 4,
      type: "dropdown",
      label: "Issue with contractor access process?",
      points: 1,
      dropdownOptions: [
        { id: "good-consistency", order: 1, text: "Good - consistent with employee process", isCorrect: false },
        { id: "missing-controls", order: 2, text: "Missing - expiration dates and enhanced monitoring", isCorrect: true },
        { id: "too-restrictive", order: 3, text: "Too restrictive - limits productivity", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "missing-controls" },
      explanation: "Per NIST PS-7 and third-party access controls, contractor access should have automatic expiration dates and enhanced monitoring/review.",
    },
  ],
};

// Vendor Risk Management
export const iscVendorRiskTBS: TBSQuestion = {
  id: "tbs-isc-018",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Third-Party Risk",
  subtopic: "Vendor Management",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Vendor Risk Assessment",
  scenarioText: `Evaluate vendor risk management controls and due diligence.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-vendor",
      order: 1,
      title: "Critical Vendor Profile",
      type: "table",
      content: {
        type: "table",
        title: "Payroll Processing Vendor",
        headers: ["Attribute", "Value"],
        rows: [
          { cells: ["Service", "Payroll processing with direct deposit"] },
          { cells: ["Data Access", "Employee PII, bank accounts, compensation"] },
          { cells: ["Contract Term", "3 years, auto-renew"] },
          { cells: ["Last Assessment", "Initial due diligence (3 years ago)"] },
          { cells: ["SOC Report", "SOC 1 Type 2 from 2 years ago"] },
          { cells: ["Insurance", "$1M cyber liability"] },
          { cells: ["SLA", "99.5% availability"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-assessment-gap",
      order: 1,
      type: "dropdown",
      label: "Primary vendor assessment concern?",
      points: 2,
      dropdownOptions: [
        { id: "insurance-low", order: 1, text: "Insurance coverage is insufficient", isCorrect: false },
        { id: "no-ongoing", order: 2, text: "No ongoing assessment for 3 years", isCorrect: true },
        { id: "sla-weak", order: 3, text: "SLA availability target is too low", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "no-ongoing" },
      explanation: "Per third-party risk management guidance and regulatory expectations, critical/high-risk vendors require annual reassessment; 3 years creates unacceptable risk.",
    },
    {
      id: "req-soc-report",
      order: 2,
      type: "dropdown",
      label: "Issue with the SOC report?",
      points: 1,
      dropdownOptions: [
        { id: "wrong-type", order: 1, text: "Wrong type - should be SOC 2", isCorrect: false },
        { id: "outdated", order: 2, text: "Outdated - 2 years old", isCorrect: true },
        { id: "adequate", order: 3, text: "Adequate for payroll services", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "outdated" },
      explanation: "Per vendor due diligence best practices, SOC reports should be obtained annually; a 2-year-old report does not provide current assurance.",
    },
    {
      id: "req-risk-level",
      order: 3,
      type: "dropdown",
      label: "Risk tier for this vendor?",
      points: 1,
      dropdownOptions: [
        { id: "low", order: 1, text: "Low - established vendor relationship", isCorrect: false },
        { id: "high", order: 2, text: "High/Critical - access to sensitive data", isCorrect: true },
        { id: "medium", order: 3, text: "Medium - standard business service", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high" },
      explanation: "Per vendor risk tiering methodologies, access to sensitive PII and financial data classifies this as a high/critical risk vendor requiring enhanced oversight.",
    },
    {
      id: "req-action",
      order: 4,
      type: "dropdown",
      label: "Recommended immediate action?",
      points: 1,
      dropdownOptions: [
        { id: "terminate", order: 1, text: "Terminate contract immediately", isCorrect: false },
        { id: "request-soc", order: 2, text: "Request current SOC report and conduct assessment", isCorrect: true },
        { id: "increase-insurance", order: 3, text: "Request increased insurance coverage", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "request-soc" },
      explanation: "Per vendor management best practices, the immediate action is to request current SOC attestation and conduct a comprehensive risk reassessment.",
    },
  ],
};

// Application Security Testing
export const iscAppSecurityTBS: TBSQuestion = {
  id: "tbs-isc-019",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Application Controls",
  subtopic: "Security Testing",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-I",
  title: "Application Security Assessment",
  scenarioText: `Evaluate application security testing results and prioritize remediation.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-scan-results",
      order: 1,
      title: "Vulnerability Scan Results",
      type: "table",
      content: {
        type: "table",
        title: "Web Application Security Scan",
        headers: ["Vulnerability", "Severity", "CVSS", "Count"],
        rows: [
          { cells: ["SQL Injection", "Critical", "9.8", "3"] },
          { cells: ["Cross-Site Scripting (XSS)", "High", "7.5", "12"] },
          { cells: ["Insecure Direct Object Reference", "High", "7.1", "5"] },
          { cells: ["Missing Security Headers", "Medium", "5.3", "8"] },
          { cells: ["Information Disclosure", "Low", "3.7", "15"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-priority",
      order: 1,
      type: "dropdown",
      label: "Highest remediation priority?",
      points: 2,
      dropdownOptions: [
        { id: "xss", order: 1, text: "XSS - highest count", isCorrect: false },
        { id: "sql-injection", order: 2, text: "SQL Injection - critical severity", isCorrect: true },
        { id: "headers", order: 3, text: "Security headers - easy fix", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "sql-injection" },
      explanation: "Per OWASP and CVSSv3 prioritization, SQL injection (CVSS 9.8 Critical) has highest severity and can lead to complete database compromise.",
    },
    {
      id: "req-sql-risk",
      order: 2,
      type: "dropdown",
      label: "Primary risk of SQL injection?",
      points: 1,
      dropdownOptions: [
        { id: "dos", order: 1, text: "Denial of service", isCorrect: false },
        { id: "data-breach", order: 2, text: "Unauthorized data access/exfiltration", isCorrect: true },
        { id: "defacement", order: 3, text: "Website defacement", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "data-breach" },
      explanation: "Per OWASP Top 10, SQL injection's primary risk is unauthorized data access/exfiltration, potentially exposing entire database contents.",
    },
    {
      id: "req-xss-control",
      order: 3,
      type: "dropdown",
      label: "Primary control for XSS prevention?",
      points: 2,
      dropdownOptions: [
        { id: "firewall", order: 1, text: "Web application firewall", isCorrect: false },
        { id: "output-encoding", order: 2, text: "Input validation and output encoding", isCorrect: true },
        { id: "encryption", order: 3, text: "Data encryption", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "output-encoding" },
      explanation: "Per OWASP XSS Prevention Cheat Sheet, input validation and output encoding are primary controls; WAF is a compensating (not preventive) control.",
    },
    {
      id: "req-info-disclosure",
      order: 4,
      type: "dropdown",
      label: "Appropriate handling of low severity findings?",
      points: 1,
      dropdownOptions: [
        { id: "ignore", order: 1, text: "Ignore - too low risk", isCorrect: false },
        { id: "schedule", order: 2, text: "Schedule for future remediation", isCorrect: true },
        { id: "immediate", order: 3, text: "Remediate immediately", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "schedule" },
      explanation: "Per vulnerability management best practices, low severity items should be tracked and scheduled for remediation in normal development cycles.",
    },
  ],
};

// System Development Lifecycle
export const iscSDLCTBS: TBSQuestion = {
  id: "tbs-isc-020",
  section: "ISC",
  tbsType: "dropdown",
  topic: "System Development",
  subtopic: "SDLC Controls",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "SDLC Control Evaluation",
  scenarioText: `Evaluate system development lifecycle controls and identify gaps.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-sdlc",
      order: 1,
      title: "Development Process",
      type: "text",
      content: {
        type: "text",
        title: "Current SDLC Practices",
        paragraphs: [
          "Methodology: Agile with 2-week sprints",
          "Requirements: User stories captured in Jira",
          "Code Review: Peer review before merge (optional for hotfixes)",
          "Testing: Unit tests required; integration tests optional",
          "Deployment: Developers deploy directly to production",
          "Documentation: Wiki updated post-deployment",
          "Rollback: Manual database restore if issues arise",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-segregation",
      order: 1,
      type: "dropdown",
      label: "Segregation of duties concern?",
      points: 2,
      dropdownOptions: [
        { id: "peer-review", order: 1, text: "Peer review is sufficient control", isCorrect: false },
        { id: "dev-deploy", order: 2, text: "Developers should not deploy to production", isCorrect: true },
        { id: "no-concern", order: 3, text: "Agile methodology requires flexibility", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "dev-deploy" },
      explanation: "Per COBIT BAI06.01 and SOX IT controls, developers should not deploy their own code to production (segregation of duties violation).",
    },
    {
      id: "req-hotfix",
      order: 2,
      type: "dropdown",
      label: "Hotfix code review bypass risk?",
      points: 1,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable - speed is critical", isCorrect: false },
        { id: "high-risk", order: 2, text: "High - errors and malicious code possible", isCorrect: true },
        { id: "low-risk", order: 3, text: "Low - hotfixes are small changes", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high-risk" },
      explanation: "Per secure SDLC principles, bypassing code review (even for hotfixes) allows unauthorized or erroneous changes without independent verification.",
    },
    {
      id: "req-testing",
      order: 3,
      type: "dropdown",
      label: "Testing coverage concern?",
      points: 1,
      dropdownOptions: [
        { id: "adequate", order: 1, text: "Adequate - unit tests cover logic", isCorrect: false },
        { id: "integration-required", order: 2, text: "Integration tests should be mandatory", isCorrect: true },
        { id: "excessive", order: 3, text: "Current testing is excessive", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "integration-required" },
      explanation: "Per software testing best practices, unit tests alone miss integration and end-to-end issues; integration testing should be mandatory.",
    },
    {
      id: "req-rollback",
      order: 4,
      type: "dropdown",
      label: "Rollback procedure issue?",
      points: 1,
      dropdownOptions: [
        { id: "effective", order: 1, text: "Effective - database can be restored", isCorrect: false },
        { id: "no-automation", order: 2, text: "No automated rollback; slow and error-prone", isCorrect: true },
        { id: "overkill", order: 3, text: "Automated rollback is overkill", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "no-automation" },
      explanation: "Per DevOps and deployment best practices, manual rollback procedures are slow, error-prone, and may cause extended service outages.",
    },
  ],
};

// Network Segmentation
export const iscNetworkSegmentationTBS: TBSQuestion = {
  id: "tbs-isc-021",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Network Security",
  subtopic: "Network Segmentation",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Network Segmentation Review",
  scenarioText: `Evaluate network segmentation controls and identify gaps.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-network",
      order: 1,
      title: "Network Architecture",
      type: "table",
      content: {
        type: "table",
        title: "Network Zones",
        headers: ["Zone", "Systems", "Connectivity"],
        rows: [
          { cells: ["DMZ", "Web servers, email gateway", "Internet access allowed"] },
          { cells: ["Corporate", "Workstations, printers", "Full access to internal zones"] },
          { cells: ["Production", "Application servers, databases", "Access from corporate zone"] },
          { cells: ["PCI Zone", "Payment systems", "Flat network within zone"] },
          { cells: ["Development", "Dev servers, test databases", "Access to production for debugging"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-dev-prod",
      order: 1,
      type: "dropdown",
      label: "Development to production access risk?",
      points: 2,
      dropdownOptions: [
        { id: "necessary", order: 1, text: "Necessary for troubleshooting", isCorrect: false },
        { id: "high-risk", order: 2, text: "High - could allow unauthorized production changes", isCorrect: true },
        { id: "low-risk", order: 3, text: "Low - developers are trusted", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high-risk" },
      explanation: "Per COBIT and SOX IT controls, development access to production enables unauthorized changes and data access, violating segregation of duties.",
    },
    {
      id: "req-pci-flat",
      order: 2,
      type: "dropdown",
      label: "PCI zone flat network concern?",
      points: 2,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable - zone is already isolated", isCorrect: false },
        { id: "violation", order: 2, text: "Violates PCI-DSS microsegmentation requirements", isCorrect: true },
        { id: "best-practice", order: 3, text: "Best practice for PCI environments", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "violation" },
      explanation: "Per PCI-DSS requirement 1.3, network segmentation within the cardholder data environment (CDE) is required to limit scope and reduce risk.",
    },
    {
      id: "req-corporate-access",
      order: 3,
      type: "dropdown",
      label: "Corporate zone full internal access risk?",
      points: 1,
      dropdownOptions: [
        { id: "efficient", order: 1, text: "Efficient - reduces complexity", isCorrect: false },
        { id: "lateral-movement", order: 2, text: "Enables lateral movement if workstation compromised", isCorrect: true },
        { id: "standard", order: 3, text: "Standard corporate network design", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "lateral-movement" },
      explanation: "Per NIST SC-7 and zero-trust principles, flat corporate access enables lateral movement if a workstation is compromised.",
    },
    {
      id: "req-improvement",
      order: 4,
      type: "dropdown",
      label: "Most impactful segmentation improvement?",
      points: 1,
      dropdownOptions: [
        { id: "more-dmz", order: 1, text: "Add more DMZ servers", isCorrect: false },
        { id: "zero-trust", order: 2, text: "Implement zero-trust network access", isCorrect: true },
        { id: "remove-dev", order: 3, text: "Remove development zone", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "zero-trust" },
      explanation: "Per NIST SP 800-207 (Zero Trust Architecture), zero-trust eliminates implicit trust between zones and verifies every access request.",
    },
  ],
};

// Audit Log Management
export const iscAuditLogsTBS: TBSQuestion = {
  id: "tbs-isc-022",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Security Monitoring",
  subtopic: "Audit Logging",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Audit Log Management Review",
  scenarioText: `Evaluate audit logging controls and identify improvements.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-logging",
      order: 1,
      title: "Logging Configuration",
      type: "text",
      content: {
        type: "text",
        title: "Current Logging Practices",
        paragraphs: [
          "Log Sources: Application servers, firewalls, AD domain controllers",
          "Storage: Local disk on each server",
          "Retention: 30 days (auto-purge)",
          "Review: Weekly manual review by IT",
          "Alerting: Email alerts for failed login attempts (>5)",
          "SIEM: Not implemented",
          "Log Format: Various (application-specific)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-storage",
      order: 1,
      type: "dropdown",
      label: "Local log storage risk?",
      points: 1,
      dropdownOptions: [
        { id: "efficient", order: 1, text: "Efficient - reduces network traffic", isCorrect: false },
        { id: "tampering", order: 2, text: "Logs can be tampered/deleted by attackers", isCorrect: true },
        { id: "standard", order: 3, text: "Standard practice for most organizations", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "tampering" },
      explanation: "Per NIST AU-9, local log storage allows attackers with system access to modify or delete evidence; centralized logging is required.",
    },
    {
      id: "req-retention",
      order: 2,
      type: "dropdown",
      label: "30-day retention adequacy?",
      points: 1,
      dropdownOptions: [
        { id: "adequate", order: 1, text: "Adequate for operational needs", isCorrect: false },
        { id: "insufficient", order: 2, text: "Insufficient for breach investigation (90+ days typical)", isCorrect: true },
        { id: "excessive", order: 3, text: "Excessive - causes storage issues", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "insufficient" },
      explanation: "Per NIST AU-11 and incident response guidance, breaches are often discovered months later; 90+ days retention is typical minimum.",
    },
    {
      id: "req-review",
      order: 3,
      type: "dropdown",
      label: "Weekly manual review effectiveness?",
      points: 2,
      dropdownOptions: [
        { id: "effective", order: 1, text: "Effective - human review catches anomalies", isCorrect: false },
        { id: "ineffective", order: 2, text: "Ineffective - too infrequent and volume too high", isCorrect: true },
        { id: "excessive", order: 3, text: "Excessive - daily would be better", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "ineffective" },
      explanation: "Per security operations best practices, manual log review cannot scale to handle high volumes; automated correlation and alerting is required.",
    },
    {
      id: "req-improvement",
      order: 4,
      type: "dropdown",
      label: "Most impactful improvement?",
      points: 1,
      dropdownOptions: [
        { id: "more-sources", order: 1, text: "Add more log sources", isCorrect: false },
        { id: "implement-siem", order: 2, text: "Implement centralized SIEM", isCorrect: true },
        { id: "standardize-format", order: 3, text: "Standardize log formats", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "implement-siem" },
      explanation: "Per NIST SI-4 and TSC CC7.2, a SIEM provides centralized storage, automated correlation, and real-time alerting for security events.",
    },
  ],
};

// Disaster Recovery Planning
export const iscDisasterRecoveryTBS: TBSQuestion = {
  id: "tbs-isc-023",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Business Continuity",
  subtopic: "Disaster Recovery",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Disaster Recovery Plan Assessment",
  scenarioText: `Evaluate disaster recovery planning and testing procedures.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-drp",
      order: 1,
      title: "DR Plan Summary",
      type: "text",
      content: {
        type: "text",
        title: "Disaster Recovery Plan",
        paragraphs: [
          "Recovery Time Objective (RTO): 24 hours",
          "Recovery Point Objective (RPO): 4 hours",
          "Backup Frequency: Daily full, hourly incremental",
          "Backup Location: Same data center, different floor",
          "DR Site: Cold site 50 miles away",
          "Last DR Test: Tabletop exercise 18 months ago",
          "Plan Update: Last updated 2 years ago",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-backup-location",
      order: 1,
      type: "dropdown",
      label: "Risk of backup location?",
      points: 2,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable - different floor provides separation", isCorrect: false },
        { id: "high-risk", order: 2, text: "High - same building vulnerable to site disaster", isCorrect: true },
        { id: "optimal", order: 3, text: "Optimal - fast recovery time", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high-risk" },
      explanation: "Per NIST CP-6 and business continuity best practices, backups in the same building are vulnerable to site-wide disasters (fire, flood, etc.).",
    },
    {
      id: "req-rpo-alignment",
      order: 2,
      type: "dropdown",
      label: "Are backups aligned with RPO?",
      points: 1,
      dropdownOptions: [
        { id: "aligned", order: 1, text: "Yes - hourly backups meet 4-hour RPO", isCorrect: true },
        { id: "misaligned", order: 2, text: "No - daily backups exceed 4-hour RPO", isCorrect: false },
        { id: "exceeds", order: 3, text: "Exceeds requirements unnecessarily", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "aligned" },
      explanation: "Per recovery planning, hourly incremental backups support a 4-hour RPO by ensuring maximum data loss is within the defined objective.",
    },
    {
      id: "req-dr-site",
      order: 3,
      type: "dropdown",
      label: "Can cold site meet 24-hour RTO?",
      points: 2,
      dropdownOptions: [
        { id: "yes", order: 1, text: "Yes - 24 hours is sufficient to provision", isCorrect: false },
        { id: "unlikely", order: 2, text: "Unlikely - cold sites typically need 48-72 hours", isCorrect: true },
        { id: "definitely", order: 3, text: "Definitely - modern automation enables fast recovery", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "unlikely" },
      explanation: "Per DR planning guidance, cold sites typically require 48-72 hours for hardware procurement, installation, and configuration to achieve operational status.",
    },
    {
      id: "req-testing",
      order: 4,
      type: "dropdown",
      label: "DR testing adequacy?",
      points: 1,
      dropdownOptions: [
        { id: "adequate", order: 1, text: "Adequate - tabletop exercises are sufficient", isCorrect: false },
        { id: "inadequate", order: 2, text: "Inadequate - need actual failover testing annually", isCorrect: true },
        { id: "excessive", order: 3, text: "Excessive - testing is expensive", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "inadequate" },
      explanation: "Per NIST CP-4 and DR testing standards, tabletop exercises alone don't validate actual recovery capability; functional failover testing is required annually.",
    },
  ],
};

// Mobile Device Security
export const iscMobileSecurityTBS: TBSQuestion = {
  id: "tbs-isc-024",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Endpoint Security",
  subtopic: "Mobile Devices",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Mobile Device Security Assessment",
  scenarioText: `Evaluate mobile device management and security controls.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-mdm",
      order: 1,
      title: "MDM Configuration",
      type: "text",
      content: {
        type: "text",
        title: "Mobile Device Policy",
        paragraphs: [
          "Device Types: Company-owned and BYOD allowed",
          "MDM Solution: Microsoft Intune",
          "Enrollment: Optional for BYOD users",
          "Device Encryption: Required for company devices only",
          "PIN Policy: 4-digit PIN required",
          "Remote Wipe: Enabled for enrolled devices",
          "App Installation: Unrestricted on BYOD",
          "VPN: Optional for remote access",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-byod-enrollment",
      order: 1,
      type: "dropdown",
      label: "BYOD optional enrollment risk?",
      points: 2,
      dropdownOptions: [
        { id: "appropriate", order: 1, text: "Appropriate - respects employee privacy", isCorrect: false },
        { id: "high-risk", order: 2, text: "High - unmanaged devices can access corporate data", isCorrect: true },
        { id: "balanced", order: 3, text: "Balanced approach to security and usability", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high-risk" },
      explanation: "Per mobile security best practices, unmanaged BYOD devices cannot be secured, remotely wiped, or monitored for compliance if lost or compromised.",
    },
    {
      id: "req-pin-strength",
      order: 2,
      type: "dropdown",
      label: "4-digit PIN adequacy?",
      points: 1,
      dropdownOptions: [
        { id: "adequate", order: 1, text: "Adequate - standard mobile security", isCorrect: false },
        { id: "weak", order: 2, text: "Weak - should require 6+ digits or alphanumeric", isCorrect: true },
        { id: "strong", order: 3, text: "Strong - prevents casual access", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "weak" },
      explanation: "Per NIST SP 800-63B, 4-digit PINs have only 10,000 combinations and are easily brute-forced; 6+ digits or alphanumeric is recommended.",
    },
    {
      id: "req-encryption",
      order: 3,
      type: "dropdown",
      label: "Encryption policy gap?",
      points: 1,
      dropdownOptions: [
        { id: "none", order: 1, text: "None - company devices are protected", isCorrect: false },
        { id: "byod-gap", order: 2, text: "BYOD devices may store corporate data unencrypted", isCorrect: true },
        { id: "excessive", order: 3, text: "Policy is too restrictive", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "byod-gap" },
      explanation: "Per NIST SC-28 and data protection requirements, BYOD devices accessing corporate data should be required to have encryption enabled.",
    },
    {
      id: "req-vpn",
      order: 4,
      type: "dropdown",
      label: "Optional VPN concern?",
      points: 1,
      dropdownOptions: [
        { id: "flexible", order: 1, text: "Flexible - users can choose when needed", isCorrect: false },
        { id: "risky", order: 2, text: "Risky - traffic on public WiFi is unencrypted", isCorrect: true },
        { id: "appropriate", order: 3, text: "Appropriate for modern cloud apps", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "risky" },
      explanation: "Per NIST SC-8, without mandatory VPN, sensitive corporate traffic may traverse untrusted public networks without encryption.",
    },
  ],
};

// Penetration Testing
export const iscPenetrationTestingTBS: TBSQuestion = {
  id: "tbs-isc-025",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Security Testing",
  subtopic: "Penetration Testing",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Penetration Test Results Analysis",
  scenarioText: `Analyze penetration testing results and prioritize remediation.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-pentest",
      order: 1,
      title: "Penetration Test Findings",
      type: "table",
      content: {
        type: "table",
        title: "External Penetration Test Results",
        headers: ["Finding", "Risk", "Exploited"],
        rows: [
          { cells: ["Default admin credentials on firewall", "Critical", "Yes"] },
          { cells: ["Outdated SSL certificate", "Medium", "No"] },
          { cells: ["Open SMTP relay", "High", "Yes"] },
          { cells: ["Missing HTTP security headers", "Low", "N/A"] },
          { cells: ["Internal IP disclosure", "Low", "N/A"] },
          { cells: ["Unpatched web server (CVE-2024-1234)", "Critical", "Yes"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-first-priority",
      order: 1,
      type: "dropdown",
      label: "Highest remediation priority?",
      points: 2,
      dropdownOptions: [
        { id: "smtp", order: 1, text: "Open SMTP relay - actively being exploited", isCorrect: false },
        { id: "firewall", order: 2, text: "Default firewall credentials - perimeter control", isCorrect: true },
        { id: "webserver", order: 3, text: "Unpatched web server - critical CVE", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "firewall" },
      explanation: "Per security prioritization, firewall with default credentials is highest priority as compromise gives attackers control of the network perimeter.",
    },
    {
      id: "req-smtp-impact",
      order: 2,
      type: "dropdown",
      label: "Impact of open SMTP relay?",
      points: 1,
      dropdownOptions: [
        { id: "minor", order: 1, text: "Minor - only affects email", isCorrect: false },
        { id: "significant", order: 2, text: "Significant - enables spam and phishing from your domain", isCorrect: true },
        { id: "critical", order: 3, text: "Critical - direct data breach", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "significant" },
      explanation: "Per email security standards, an open SMTP relay damages domain reputation and enables attackers to send spam/phishing from your domain.",
    },
    {
      id: "req-low-findings",
      order: 3,
      type: "dropdown",
      label: "Treatment of low-risk findings?",
      points: 1,
      dropdownOptions: [
        { id: "ignore", order: 1, text: "Ignore - not worth the effort", isCorrect: false },
        { id: "track", order: 2, text: "Track and remediate in normal patching cycle", isCorrect: true },
        { id: "immediate", order: 3, text: "Remediate immediately after critical items", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "track" },
      explanation: "Per vulnerability management practices, low-risk findings should be tracked and remediated in normal patching cycles rather than ignored.",
    },
    {
      id: "req-test-frequency",
      order: 4,
      type: "dropdown",
      label: "Recommended testing frequency?",
      points: 2,
      dropdownOptions: [
        { id: "quarterly", order: 1, text: "Quarterly - frequent enough to catch issues", isCorrect: false },
        { id: "annual-plus", order: 2, text: "Annual plus after major changes", isCorrect: true },
        { id: "biennial", order: 3, text: "Every two years for cost efficiency", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "annual-plus" },
      explanation: "Per PCI-DSS and security testing best practices, annual penetration testing is recommended, with additional testing after significant infrastructure changes.",
    },
  ],
};

// Data Classification
export const iscDataClassificationTBS: TBSQuestion = {
  id: "tbs-isc-026",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Data Governance",
  subtopic: "Data Classification",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Data Classification Review",
  scenarioText: `Evaluate data classification scheme and handling procedures.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-classification",
      order: 1,
      title: "Data Classification Scheme",
      type: "table",
      content: {
        type: "table",
        title: "Classification Levels",
        headers: ["Level", "Description", "Example", "Controls"],
        rows: [
          { cells: ["Public", "No restrictions", "Marketing materials", "None required"] },
          { cells: ["Internal", "Employee access only", "Org charts", "Login required"] },
          { cells: ["Confidential", "Need-to-know basis", "Financial data", "Encryption at rest"] },
          { cells: ["Restricted", "Highly sensitive", "Trade secrets", "Encryption + MFA"] },
        ],
      },
    },
    {
      id: "exhibit-gaps",
      order: 2,
      title: "Current Issues",
      type: "text",
      content: {
        type: "text",
        title: "Observed Issues",
        paragraphs: [
          "Customer PII is classified as 'Confidential'",
          "No data classification labels on documents",
          "Classification assigned by data creators",
          "No DLP solution implemented",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-pii-level",
      order: 1,
      type: "dropdown",
      label: "Is PII classification appropriate?",
      points: 2,
      dropdownOptions: [
        { id: "yes", order: 1, text: "Yes - Confidential provides adequate protection", isCorrect: false },
        { id: "no", order: 2, text: "No - PII should be Restricted due to regulatory requirements", isCorrect: true },
        { id: "lower", order: 3, text: "Could be Internal with encryption", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "no" },
      explanation: "Per GDPR/CCPA and data protection regulations, PII should be classified as Restricted due to significant breach notification requirements and reputation impact.",
    },
    {
      id: "req-labeling",
      order: 2,
      type: "dropdown",
      label: "Impact of missing labels?",
      points: 1,
      dropdownOptions: [
        { id: "minor", order: 1, text: "Minor - users know what's sensitive", isCorrect: false },
        { id: "significant", order: 2, text: "Significant - users can't identify handling requirements", isCorrect: true },
        { id: "none", order: 3, text: "None - labels are cosmetic", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "significant" },
      explanation: "Per data governance best practices, without visible classification labels users cannot identify appropriate handling requirements for sensitive data.",
    },
    {
      id: "req-classification-owner",
      order: 3,
      type: "dropdown",
      label: "Issue with creator-assigned classification?",
      points: 1,
      dropdownOptions: [
        { id: "efficient", order: 1, text: "Efficient - creators know data best", isCorrect: false },
        { id: "inconsistent", order: 2, text: "Inconsistent - may under-classify to avoid restrictions", isCorrect: true },
        { id: "appropriate", order: 3, text: "Appropriate with training", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "inconsistent" },
      explanation: "Per data classification frameworks, users may under-classify for convenience; data owners should verify and approve classification levels.",
    },
    {
      id: "req-dlp",
      order: 4,
      type: "dropdown",
      label: "DLP importance for classification program?",
      points: 1,
      dropdownOptions: [
        { id: "optional", order: 1, text: "Optional - classification alone is sufficient", isCorrect: false },
        { id: "essential", order: 2, text: "Essential - enforces classification rules", isCorrect: true },
        { id: "redundant", order: 3, text: "Redundant - encryption is enough", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "essential" },
      explanation: "Per data protection strategy, DLP is essential to enforce classification rules, prevent unauthorized sharing, and detect misclassified data.",
    },
  ],
};

// API Security
export const iscAPISecurityTBS: TBSQuestion = {
  id: "tbs-isc-027",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Application Security",
  subtopic: "API Security",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-I",
  title: "API Security Assessment",
  scenarioText: `Evaluate API security controls and identify vulnerabilities.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-api",
      order: 1,
      title: "API Configuration",
      type: "text",
      content: {
        type: "text",
        title: "Customer API Settings",
        paragraphs: [
          "Authentication: API keys in URL parameters",
          "Rate Limiting: None implemented",
          "Input Validation: Client-side only",
          "Logging: Request/response logged with API keys visible",
          "Versioning: No version control",
          "Documentation: Public Swagger documentation",
          "Error Handling: Detailed error messages returned",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-api-keys",
      order: 1,
      type: "dropdown",
      label: "API keys in URL parameters risk?",
      points: 2,
      dropdownOptions: [
        { id: "standard", order: 1, text: "Standard - common implementation", isCorrect: false },
        { id: "high-risk", order: 2, text: "High - keys logged in server logs and browser history", isCorrect: true },
        { id: "acceptable", order: 3, text: "Acceptable with HTTPS", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high-risk" },
      explanation: "Per OWASP API Security guidelines, API keys in URL parameters are high-risk as they appear in server logs, referrer headers, and browser history.",
    },
    {
      id: "req-rate-limiting",
      order: 2,
      type: "dropdown",
      label: "No rate limiting impact?",
      points: 1,
      dropdownOptions: [
        { id: "minor", order: 1, text: "Minor - affects performance only", isCorrect: false },
        { id: "significant", order: 2, text: "Significant - enables brute force and DoS attacks", isCorrect: true },
        { id: "none", order: 3, text: "None - WAF handles this", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "significant" },
      explanation: "Per OWASP API Security Top 10, lack of rate limiting enables credential stuffing, brute force attacks, and resource exhaustion (DoS).",
    },
    {
      id: "req-validation",
      order: 3,
      type: "dropdown",
      label: "Client-side only validation risk?",
      points: 2,
      dropdownOptions: [
        { id: "adequate", order: 1, text: "Adequate - catches most errors", isCorrect: false },
        { id: "critical", order: 2, text: "Critical - easily bypassed; enables injection attacks", isCorrect: true },
        { id: "acceptable", order: 3, text: "Acceptable with WAF protection", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "critical" },
      explanation: "Per OWASP input validation guidance, client-side validation is easily bypassed; server-side validation is required to prevent injection attacks.",
    },
    {
      id: "req-error-messages",
      order: 4,
      type: "dropdown",
      label: "Detailed error message concern?",
      points: 1,
      dropdownOptions: [
        { id: "helpful", order: 1, text: "Helpful - aids debugging", isCorrect: false },
        { id: "info-leak", order: 2, text: "Information leakage - reveals system details", isCorrect: true },
        { id: "standard", order: 3, text: "Standard API behavior", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "info-leak" },
      explanation: "Per OWASP secure error handling, detailed error messages can reveal stack traces, system paths, and other information useful to attackers.",
    },
  ],
};

// Physical Security Controls
export const iscPhysicalSecurityTBS: TBSQuestion = {
  id: "tbs-isc-028",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Physical Security",
  subtopic: "Data Center Security",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Physical Security Assessment",
  scenarioText: `Evaluate physical security controls for the data center.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-physical",
      order: 1,
      title: "Physical Security Controls",
      type: "text",
      content: {
        type: "text",
        title: "Data Center Security Measures",
        paragraphs: [
          "Location: Shared building with other tenants",
          "Access: Badge reader at data center door",
          "Visitor Policy: Visitors logged but not escorted",
          "Cameras: Entrance only; footage retained 14 days",
          "Environmental: Fire suppression and HVAC",
          "Server Racks: Unlocked for easy maintenance",
          "Media Destruction: Drives stored for recycling",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-visitor-escort",
      order: 1,
      type: "dropdown",
      label: "Unescorted visitor risk?",
      points: 2,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable - logging provides accountability", isCorrect: false },
        { id: "high", order: 2, text: "High - visitors could access/install unauthorized devices", isCorrect: true },
        { id: "low", order: 3, text: "Low - cameras provide monitoring", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high" },
      explanation: "Per NIST PE-7 and physical security best practices, unescorted visitors can install rogue devices, steal data, or observe sensitive information.",
    },
    {
      id: "req-rack-locks",
      order: 2,
      type: "dropdown",
      label: "Unlocked server rack concern?",
      points: 1,
      dropdownOptions: [
        { id: "efficient", order: 1, text: "Efficient - enables fast maintenance", isCorrect: false },
        { id: "risky", order: 2, text: "Risky - physical access to servers enables attacks", isCorrect: true },
        { id: "adequate", order: 3, text: "Adequate - room is secured", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "risky" },
      explanation: "Per NIST PE-5 and data center standards, unlocked server racks allow unauthorized hardware access, enabling physical attacks or data theft.",
    },
    {
      id: "req-media",
      order: 3,
      type: "dropdown",
      label: "Drive recycling storage risk?",
      points: 1,
      dropdownOptions: [
        { id: "none", order: 1, text: "None - drives will be wiped", isCorrect: false },
        { id: "data-breach", order: 2, text: "High - stored drives contain recoverable data", isCorrect: true },
        { id: "minor", order: 3, text: "Minor - encrypted data is protected", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "data-breach" },
      explanation: "Per NIST MP-6 media sanitization requirements, drives containing sensitive data should be destroyed immediately; stored drives remain vulnerable to theft.",
    },
    {
      id: "req-camera",
      order: 4,
      type: "dropdown",
      label: "Camera coverage adequacy?",
      points: 1,
      dropdownOptions: [
        { id: "adequate", order: 1, text: "Adequate - covers main access point", isCorrect: false },
        { id: "insufficient", order: 2, text: "Insufficient - need coverage of server aisles", isCorrect: true },
        { id: "excessive", order: 3, text: "Current coverage is sufficient", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "insufficient" },
      explanation: "Per physical security standards, entrance-only cameras miss internal activity at server racks where data theft or tampering could occur.",
    },
  ],
};

// IT Governance
export const iscITGovernanceTBS: TBSQuestion = {
  id: "tbs-isc-029",
  section: "ISC",
  tbsType: "dropdown",
  topic: "IT Governance",
  subtopic: "Control Frameworks",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-III",
  title: "IT Governance Framework Assessment",
  scenarioText: `Evaluate IT governance structure and control frameworks.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-governance",
      order: 1,
      title: "Governance Structure",
      type: "text",
      content: {
        type: "text",
        title: "Current IT Governance",
        paragraphs: [
          "Framework: None formally adopted",
          "IT Reporting: CIO reports to CFO",
          "Risk Assessment: Annual informal review",
          "Policy Review: Policies last updated 3 years ago",
          "Steering Committee: IT decisions made by CIO alone",
          "Metrics: No defined IT performance metrics",
          "Audit Committee: IT not regularly discussed",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-reporting",
      order: 1,
      type: "dropdown",
      label: "CIO reporting to CFO concern?",
      points: 1,
      dropdownOptions: [
        { id: "appropriate", order: 1, text: "Appropriate - CFO oversees all operations", isCorrect: false },
        { id: "conflict", order: 2, text: "Potential conflict - IT needs may be subordinated to cost", isCorrect: true },
        { id: "optimal", order: 3, text: "Optimal reporting structure", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "conflict" },
      explanation: "Per IT governance best practices, CIO reporting to CFO can create conflict where IT strategic priorities are subordinated to cost-cutting objectives.",
    },
    {
      id: "req-steering",
      order: 2,
      type: "dropdown",
      label: "No steering committee impact?",
      points: 2,
      dropdownOptions: [
        { id: "efficient", order: 1, text: "Efficient - faster decision making", isCorrect: false },
        { id: "risky", order: 2, text: "Risky - no business input on IT priorities", isCorrect: true },
        { id: "acceptable", order: 3, text: "Acceptable for small organizations", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "risky" },
      explanation: "Per COBIT governance principles, IT decisions made without a steering committee lack business input and may not align with organizational needs.",
    },
    {
      id: "req-metrics",
      order: 3,
      type: "dropdown",
      label: "Missing metrics impact?",
      points: 1,
      dropdownOptions: [
        { id: "minor", order: 1, text: "Minor - IT performance is visible", isCorrect: false },
        { id: "significant", order: 2, text: "Significant - cannot measure or improve performance", isCorrect: true },
        { id: "none", order: 3, text: "None - qualitative assessment is sufficient", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "significant" },
      explanation: "Per COBIT MEA01, without defined metrics, IT performance, value delivery, and emerging issues cannot be objectively measured or communicated.",
    },
    {
      id: "req-framework",
      order: 4,
      type: "dropdown",
      label: "Recommended framework adoption?",
      points: 1,
      dropdownOptions: [
        { id: "sox", order: 1, text: "SOX - required for public companies", isCorrect: false },
        { id: "cobit", order: 2, text: "COBIT or ITIL - IT governance best practices", isCorrect: true },
        { id: "none", order: 3, text: "Continue without framework", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "cobit" },
      explanation: "Per industry standards, COBIT or ITIL provide comprehensive IT governance frameworks that align IT with business objectives and ensure value delivery.",
    },
  ],
};

// Configuration Management
export const iscConfigManagementTBS: TBSQuestion = {
  id: "tbs-isc-030",
  section: "ISC",
  tbsType: "dropdown",
  topic: "IT Operations",
  subtopic: "Configuration Management",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Configuration Management Review",
  scenarioText: `Evaluate configuration management database and processes.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-cmdb",
      order: 1,
      title: "CMDB Status",
      type: "text",
      content: {
        type: "text",
        title: "Configuration Management",
        paragraphs: [
          "CMDB Tool: Excel spreadsheets per team",
          "Updates: Manual updates when remembered",
          "Baseline: No defined security baselines",
          "Drift Detection: None automated",
          "Change Tracking: Email notifications only",
          "Relationships: Not tracked between CIs",
          "Last Audit: CMDB never audited",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cmdb-tool",
      order: 1,
      type: "dropdown",
      label: "Spreadsheet CMDB risk?",
      points: 2,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable for small environments", isCorrect: false },
        { id: "high-risk", order: 2, text: "High - no version control, integrity, or automation", isCorrect: true },
        { id: "efficient", order: 3, text: "Efficient and cost-effective", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high-risk" },
      explanation: "Per ITIL/COBIT configuration management, spreadsheets lack version control, integrity validation, and automation; a proper CMDB tool is required.",
    },
    {
      id: "req-baselines",
      order: 2,
      type: "dropdown",
      label: "Missing baselines impact?",
      points: 1,
      dropdownOptions: [
        { id: "minor", order: 1, text: "Minor - systems are configured correctly", isCorrect: false },
        { id: "significant", order: 2, text: "Significant - no standard for secure configuration", isCorrect: true },
        { id: "none", order: 3, text: "None - each system is unique", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "significant" },
      explanation: "Per CIS Benchmarks and NIST CM-2, without defined security baselines, consistent secure configuration cannot be enforced or verified.",
    },
    {
      id: "req-drift",
      order: 3,
      type: "dropdown",
      label: "No drift detection consequence?",
      points: 1,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable - changes are tracked via email", isCorrect: false },
        { id: "critical", order: 2, text: "Unauthorized changes go undetected", isCorrect: true },
        { id: "minor", order: 3, text: "Minor inconvenience", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "critical" },
      explanation: "Per NIST CM-3 and security hardening standards, without drift detection, unauthorized configuration changes go undetected, introducing security gaps.",
    },
    {
      id: "req-relationships",
      order: 4,
      type: "dropdown",
      label: "Missing CI relationships impact?",
      points: 1,
      dropdownOptions: [
        { id: "none", order: 1, text: "None - systems work independently", isCorrect: false },
        { id: "impact-analysis", order: 2, text: "Cannot perform change impact analysis", isCorrect: true },
        { id: "minor", order: 3, text: "Minor - relationships are obvious", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "impact-analysis" },
      explanation: "Per ITIL configuration management, without CI relationship mapping, change impact analysis cannot be performed to assess downstream effects.",
    },
  ],
};

// Patch Management
export const iscPatchManagementTBS: TBSQuestion = {
  id: "tbs-isc-031",
  section: "ISC",
  tbsType: "dropdown",
  topic: "IT Operations",
  subtopic: "Patch Management",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Patch Management Assessment",
  scenarioText: `Evaluate patch management processes and identify gaps.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-patching",
      order: 1,
      title: "Patch Management Process",
      type: "text",
      content: {
        type: "text",
        title: "Current Patching Practices",
        paragraphs: [
          "Frequency: Monthly patching cycle",
          "Testing: Patches tested in dev for 2 weeks",
          "Critical Patches: Same monthly cycle",
          "Servers: 85% compliance rate",
          "Workstations: Windows Update automatic",
          "Third-party Apps: Not in patch scope",
          "Exceptions: No formal exception process",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-critical",
      order: 1,
      type: "dropdown",
      label: "Critical patches in monthly cycle risk?",
      points: 2,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable - testing is important", isCorrect: false },
        { id: "high-risk", order: 2, text: "High - critical vulnerabilities exploited within days", isCorrect: true },
        { id: "appropriate", order: 3, text: "Appropriate risk-based approach", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high-risk" },
      explanation: "Per vulnerability management best practices, critical patches with active exploits need emergency deployment within 24-48 hours, not monthly cycles.",
    },
    {
      id: "req-compliance",
      order: 2,
      type: "dropdown",
      label: "85% server compliance assessment?",
      points: 1,
      dropdownOptions: [
        { id: "good", order: 1, text: "Good - above industry average", isCorrect: false },
        { id: "concerning", order: 2, text: "Concerning - 15% unpatched servers are vulnerable", isCorrect: true },
        { id: "acceptable", order: 3, text: "Acceptable with exceptions documented", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "concerning" },
      explanation: "Per patch compliance standards, 85% compliance means 15% of servers remain vulnerable; each unpatched server is a potential breach vector.",
    },
    {
      id: "req-third-party",
      order: 3,
      type: "dropdown",
      label: "Third-party apps exclusion risk?",
      points: 1,
      dropdownOptions: [
        { id: "low", order: 1, text: "Low - OS patches are most important", isCorrect: false },
        { id: "high", order: 2, text: "High - third-party apps often have critical vulnerabilities", isCorrect: true },
        { id: "acceptable", order: 3, text: "Acceptable - users update their apps", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high" },
      explanation: "Per vulnerability research, third-party applications (Java, Adobe, browsers) are among the most exploited attack vectors and must be in patch scope.",
    },
    {
      id: "req-exceptions",
      order: 4,
      type: "dropdown",
      label: "No exception process concern?",
      points: 1,
      dropdownOptions: [
        { id: "efficient", order: 1, text: "Efficient - all systems must be patched", isCorrect: false },
        { id: "risky", order: 2, text: "Untracked exceptions accumulate risk", isCorrect: true },
        { id: "appropriate", order: 3, text: "Appropriate - exceptions shouldn't exist", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "risky" },
      explanation: "Per patch management frameworks, undocumented exceptions accumulate risk over time as they aren't tracked, reviewed, or remediated.",
    },
  ],
};

// Cloud Security Posture
export const iscCloudPostureTBS: TBSQuestion = {
  id: "tbs-isc-032",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Cloud Security",
  subtopic: "Cloud Posture",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Cloud Security Posture Assessment",
  scenarioText: `Evaluate cloud security configuration and identify misconfigurations.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-cloud",
      order: 1,
      title: "AWS Configuration",
      type: "table",
      content: {
        type: "table",
        title: "AWS Security Settings",
        headers: ["Setting", "Current State"],
        rows: [
          { cells: ["S3 Bucket Default", "Public access enabled"] },
          { cells: ["Root Account", "Used for daily administration"] },
          { cells: ["MFA", "Enabled for root, optional for IAM users"] },
          { cells: ["CloudTrail", "Enabled for management events only"] },
          { cells: ["Security Groups", "0.0.0.0/0 on SSH and RDP"] },
          { cells: ["IAM Policies", "Admin policy broadly assigned"] },
          { cells: ["Encryption", "Default encryption disabled"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-s3-public",
      order: 1,
      type: "dropdown",
      label: "S3 public access default risk?",
      points: 2,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable - developers need flexibility", isCorrect: false },
        { id: "critical", order: 2, text: "Critical - data can be accidentally exposed", isCorrect: true },
        { id: "manageable", order: 3, text: "Manageable with monitoring", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "critical" },
      explanation: "Per AWS security best practices and data breach analysis, publicly accessible S3 buckets are a leading cause of cloud data exposures.",
    },
    {
      id: "req-root-account",
      order: 2,
      type: "dropdown",
      label: "Root account daily use concern?",
      points: 1,
      dropdownOptions: [
        { id: "efficient", order: 1, text: "Efficient - avoids permission issues", isCorrect: false },
        { id: "high-risk", order: 2, text: "High - root should only be used for emergencies", isCorrect: true },
        { id: "acceptable", order: 3, text: "Acceptable with MFA", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high-risk" },
      explanation: "Per AWS security guidance, the root account should only be used for initial setup and emergencies; daily use bypasses IAM controls and audit trails.",
    },
    {
      id: "req-security-groups",
      order: 3,
      type: "dropdown",
      label: "0.0.0.0/0 on SSH/RDP severity?",
      points: 2,
      dropdownOptions: [
        { id: "moderate", order: 1, text: "Moderate - password protection is in place", isCorrect: false },
        { id: "critical", order: 2, text: "Critical - exposed to internet-wide attacks", isCorrect: true },
        { id: "acceptable", order: 3, text: "Acceptable for remote work", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "critical" },
      explanation: "Per CIS AWS Benchmarks, security groups allowing 0.0.0.0/0 on SSH/RDP expose instances to internet-wide brute force and credential attacks.",
    },
    {
      id: "req-cloudtrail",
      order: 4,
      type: "dropdown",
      label: "Management events only logging gap?",
      points: 1,
      dropdownOptions: [
        { id: "sufficient", order: 1, text: "Sufficient - captures important changes", isCorrect: false },
        { id: "gap", order: 2, text: "Gap - data events needed for S3 and Lambda", isCorrect: true },
        { id: "excessive", order: 3, text: "Data events generate too many logs", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "gap" },
      explanation: "Per AWS logging best practices, data events in CloudTrail capture critical S3 object access and Lambda invocations needed for security monitoring.",
    },
  ],
};

// SOC 1 Report Understanding
export const iscSOC1UnderstandingTBS: TBSQuestion = {
  id: "tbs-isc-033",
  section: "ISC",
  tbsType: "dropdown",
  topic: "SOC Engagements",
  subtopic: "SOC 1 Reports",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-III",
  title: "SOC 1 Report Analysis",
  scenarioText: `Evaluate the appropriate use and limitations of SOC 1 reports.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-soc1",
      order: 1,
      title: "SOC 1 Report Details",
      type: "text",
      content: {
        type: "text",
        title: "Payroll Service Provider SOC 1",
        paragraphs: [
          "Report Type: SOC 1 Type 2",
          "Period: January 1 - December 31, 2024",
          "Opinion: Unqualified",
          "Control Objectives: 12 objectives tested",
          "Testing: All controls tested with no deviations",
          "User Auditor Guidance: Extensive guidance provided",
          "CUEC: 6 complementary user entity controls",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-purpose",
      order: 1,
      type: "dropdown",
      label: "Primary purpose of SOC 1 report?",
      points: 1,
      dropdownOptions: [
        { id: "security", order: 1, text: "Evaluate security controls", isCorrect: false },
        { id: "icfr", order: 2, text: "Support user auditor's ICFR assessment", isCorrect: true },
        { id: "compliance", order: 3, text: "Demonstrate regulatory compliance", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "icfr" },
      explanation: "Per SSAE 18/AT-C 320, SOC 1 reports are designed to support user auditors' assessment of controls relevant to internal control over financial reporting.",
    },
    {
      id: "req-type2-benefit",
      order: 2,
      type: "dropdown",
      label: "Type 2 advantage over Type 1?",
      points: 2,
      dropdownOptions: [
        { id: "more-controls", order: 1, text: "More control objectives tested", isCorrect: false },
        { id: "operating-effectiveness", order: 2, text: "Tests operating effectiveness over time", isCorrect: true },
        { id: "broader-scope", order: 3, text: "Broader scope of IT general controls", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "operating-effectiveness" },
      explanation: "Per SOC reporting standards, Type 2 reports test that controls operated effectively over a period, not just that they are designed properly at a point in time.",
    },
    {
      id: "req-cuec-responsibility",
      order: 3,
      type: "dropdown",
      label: "Who is responsible for CUECs?",
      points: 1,
      dropdownOptions: [
        { id: "service-org", order: 1, text: "Service organization", isCorrect: false },
        { id: "user-entity", order: 2, text: "User entity (client)", isCorrect: true },
        { id: "auditor", order: 3, text: "External auditor", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "user-entity" },
      explanation: "Per SOC report guidance, Complementary User Entity Controls (CUECs) must be implemented by the user entity for the service organization's controls to function as intended.",
    },
    {
      id: "req-distribution",
      order: 4,
      type: "dropdown",
      label: "Who can receive a SOC 1 report?",
      points: 1,
      dropdownOptions: [
        { id: "public", order: 1, text: "Publicly available to anyone", isCorrect: false },
        { id: "restricted", order: 2, text: "User entities and their auditors only", isCorrect: true },
        { id: "regulators", order: 3, text: "Regulators and management only", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "restricted" },
      explanation: "Per SSAE 18, SOC 1 reports are restricted-use reports intended only for management, user entities, and their financial statement auditors.",
    },
  ],
};

// Ransomware Response
export const iscRansomwareResponseTBS: TBSQuestion = {
  id: "tbs-isc-034",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Incident Response",
  subtopic: "Ransomware",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Ransomware Incident Response",
  scenarioText: `Evaluate ransomware response procedures and decision-making.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-ransomware",
      order: 1,
      title: "Incident Details",
      type: "text",
      content: {
        type: "text",
        title: "Ransomware Attack Summary",
        paragraphs: [
          "Discovered: Monday 8:00 AM; encryption started Friday night",
          "Affected: 80% of production servers encrypted",
          "Demand: $500,000 in Bitcoin within 72 hours",
          "Backups: Most recent backup is 7 days old",
          "DR Site: Available but never tested",
          "Insurance: Cyber insurance with $1M ransomware coverage",
          "Impact: Core business systems offline",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-first-action",
      order: 1,
      type: "dropdown",
      label: "Immediate first action?",
      points: 2,
      dropdownOptions: [
        { id: "pay-ransom", order: 1, text: "Pay ransom to restore quickly", isCorrect: false },
        { id: "isolate", order: 2, text: "Isolate affected systems to prevent spread", isCorrect: true },
        { id: "restore", order: 3, text: "Begin restoring from backup", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "isolate" },
      explanation: "Per NIST SP 800-61 and CISA guidance, containment (isolating affected systems) is the first priority to prevent spread and preserve forensic evidence.",
    },
    {
      id: "req-ransom-payment",
      order: 2,
      type: "dropdown",
      label: "Ransom payment recommendation?",
      points: 2,
      dropdownOptions: [
        { id: "pay", order: 1, text: "Pay - fastest recovery option", isCorrect: false },
        { id: "avoid", order: 2, text: "Avoid - no guarantee and funds criminals", isCorrect: true },
        { id: "negotiate", order: 3, text: "Negotiate lower amount then pay", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "avoid" },
      explanation: "Per FBI and CISA guidance, ransom payment is discouraged: it funds criminal enterprises, provides no guarantee of decryption, and may violate OFAC sanctions.",
    },
    {
      id: "req-backup-concern",
      order: 3,
      type: "dropdown",
      label: "7-day-old backup concern?",
      points: 1,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable - can recover most data", isCorrect: false },
        { id: "data-loss", order: 2, text: "Significant data loss for a week of transactions", isCorrect: true },
        { id: "minor", order: 3, text: "Minor issue - manual re-entry possible", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "data-loss" },
      explanation: "Per business continuity planning, 7 days of data loss likely exceeds acceptable RPO and represents significant business transaction and operational data loss.",
    },
    {
      id: "req-notification",
      order: 4,
      type: "dropdown",
      label: "Required notifications?",
      points: 1,
      dropdownOptions: [
        { id: "internal-only", order: 1, text: "Internal management only", isCorrect: false },
        { id: "multiple", order: 2, text: "Insurance, law enforcement, potentially regulators", isCorrect: true },
        { id: "after-recovery", order: 3, text: "Notify after recovery is complete", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "multiple" },
      explanation: "Per incident response requirements, cyber insurance typically requires prompt notice; FBI reporting is recommended; regulators must be notified if data breach occurred.",
    },
  ],
};

// Privacy Impact Assessment
export const iscPrivacyImpactTBS: TBSQuestion = {
  id: "tbs-isc-035",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Privacy",
  subtopic: "Privacy Assessments",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Privacy Impact Assessment",
  scenarioText: `Evaluate when and how to conduct privacy impact assessments.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-project",
      order: 1,
      title: "New Project Description",
      type: "text",
      content: {
        type: "text",
        title: "Customer Analytics Platform",
        paragraphs: [
          "Purpose: Analyze customer behavior for targeted marketing",
          "Data Collected: Purchase history, browsing behavior, location data",
          "Data Sources: Website, mobile app, third-party data providers",
          "Processing: Machine learning for behavior prediction",
          "Storage: Cloud-based data warehouse",
          "Retention: Indefinite for analytics purposes",
          "Sharing: Marketing partners and affiliates",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-pia-required",
      order: 1,
      type: "dropdown",
      label: "Is a PIA required for this project?",
      points: 2,
      dropdownOptions: [
        { id: "no", order: 1, text: "No - standard marketing analytics", isCorrect: false },
        { id: "yes", order: 2, text: "Yes - profiling and location data processing", isCorrect: true },
        { id: "optional", order: 3, text: "Optional - depends on volume", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "yes" },
      explanation: "Per GDPR Article 35, processing involving profiling, location data, and automated decision-making (ML) triggers mandatory Data Protection Impact Assessment requirements.",
    },
    {
      id: "req-retention",
      order: 2,
      type: "dropdown",
      label: "Indefinite retention concern?",
      points: 1,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable for analytics", isCorrect: false },
        { id: "violation", order: 2, text: "Violates data minimization principles", isCorrect: true },
        { id: "standard", order: 3, text: "Standard industry practice", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "violation" },
      explanation: "Per GDPR's data minimization principle (Article 5), personal data retention must be limited to what is necessary for the specified purpose; indefinite retention violates this.",
    },
    {
      id: "req-third-party",
      order: 3,
      type: "dropdown",
      label: "Third-party data sharing requirement?",
      points: 1,
      dropdownOptions: [
        { id: "none", order: 1, text: "No special requirements", isCorrect: false },
        { id: "consent", order: 2, text: "Explicit consent and data processing agreements", isCorrect: true },
        { id: "notice", order: 3, text: "Privacy notice mention only", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "consent" },
      explanation: "Per GDPR Articles 6-7 and CCPA, sharing personal data with third parties requires explicit consent or legitimate basis plus data processing agreements.",
    },
    {
      id: "req-rights",
      order: 4,
      type: "dropdown",
      label: "Data subject rights consideration?",
      points: 1,
      dropdownOptions: [
        { id: "not-applicable", order: 1, text: "Not applicable for analytics", isCorrect: false },
        { id: "must-support", order: 2, text: "Must support access, deletion, and opt-out rights", isCorrect: true },
        { id: "optional", order: 3, text: "Optional enhancement", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "must-support" },
      explanation: "Per GDPR (Articles 15-22) and CCPA, data subjects have rights to access, deletion, and opt-out that must be supported regardless of processing purpose.",
    },
  ],
};

// Risk Assessment Process
export const iscRiskAssessmentTBS: TBSQuestion = {
  id: "tbs-isc-036",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Risk Management",
  subtopic: "Risk Assessment",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-I",
  title: "IT Risk Assessment Process",
  scenarioText: `Evaluate the IT risk assessment methodology and results.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-risk",
      order: 1,
      title: "Risk Assessment Summary",
      type: "table",
      content: {
        type: "table",
        title: "Top IT Risks Identified",
        headers: ["Risk", "Likelihood", "Impact", "Score", "Response"],
        rows: [
          { cells: ["Data breach", "Medium", "High", "12", "Mitigate"] },
          { cells: ["System outage", "High", "Medium", "12", "Accept"] },
          { cells: ["Insider threat", "Low", "High", "8", "Monitor"] },
          { cells: ["Vendor failure", "Medium", "Medium", "9", "Transfer"] },
          { cells: ["Compliance violation", "High", "High", "16", "Avoid"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-accept-outage",
      order: 1,
      type: "dropdown",
      label: "Accept response for system outage appropriate?",
      points: 2,
      dropdownOptions: [
        { id: "yes", order: 1, text: "Yes - cost of mitigation exceeds impact", isCorrect: false },
        { id: "no", order: 2, text: "No - high likelihood requires mitigation", isCorrect: true },
        { id: "depends", order: 3, text: "Depends on business requirements", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "no" },
      explanation: "Per risk management frameworks (NIST/COSO ERM), high likelihood risks should typically be mitigated rather than accepted, regardless of medium impact.",
    },
    {
      id: "req-transfer",
      order: 2,
      type: "dropdown",
      label: "Transfer for vendor failure means?",
      points: 1,
      dropdownOptions: [
        { id: "eliminate", order: 1, text: "Eliminate the vendor relationship", isCorrect: false },
        { id: "insurance", order: 2, text: "Insurance or contractual risk transfer", isCorrect: true },
        { id: "outsource", order: 3, text: "Outsource to another vendor", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "insurance" },
      explanation: "Per risk management terminology, risk transfer involves using insurance policies or contractual provisions to shift the financial impact to another party.",
    },
    {
      id: "req-avoid",
      order: 3,
      type: "dropdown",
      label: "Avoid response for compliance means?",
      points: 1,
      dropdownOptions: [
        { id: "ignore", order: 1, text: "Ignore the regulation", isCorrect: false },
        { id: "eliminate", order: 2, text: "Eliminate activities causing risk", isCorrect: true },
        { id: "strong-controls", order: 3, text: "Implement stronger controls", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "eliminate" },
      explanation: "Per NIST risk response options, risk avoidance means eliminating the activity or condition that creates the risk (not ignoring regulations).",
    },
    {
      id: "req-highest-priority",
      order: 4,
      type: "dropdown",
      label: "Highest priority risk for attention?",
      points: 1,
      dropdownOptions: [
        { id: "data-breach", order: 1, text: "Data breach - score of 12", isCorrect: false },
        { id: "compliance", order: 2, text: "Compliance violation - score of 16", isCorrect: true },
        { id: "system-outage", order: 3, text: "System outage - high likelihood", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "compliance" },
      explanation: "Per risk prioritization methodology, the highest risk score (16 = High Likelihood x High Impact) should receive highest priority for attention and resources.",
    },
  ],
};

// Endpoint Detection and Response
export const iscEDRTBS: TBSQuestion = {
  id: "tbs-isc-037",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Endpoint Security",
  subtopic: "EDR Solutions",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Endpoint Detection and Response",
  scenarioText: `Evaluate EDR implementation and alert investigation.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-edr",
      order: 1,
      title: "EDR Alert",
      type: "text",
      content: {
        type: "text",
        title: "EDR Alert Details",
        paragraphs: [
          "Alert Type: Suspicious PowerShell Activity",
          "Host: FINANCE-WS-042 (Finance department workstation)",
          "User: jsmith (Finance Analyst)",
          "Command: Encoded PowerShell downloading external script",
          "Time: 2:30 AM (user typically works 9-5)",
          "Network: Connection attempt to known C2 IP blocked",
          "File Activity: Unusual access to sensitive financial files",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-severity",
      order: 1,
      type: "dropdown",
      label: "Alert severity assessment?",
      points: 2,
      dropdownOptions: [
        { id: "low", order: 1, text: "Low - PowerShell is normal tool", isCorrect: false },
        { id: "critical", order: 2, text: "Critical - multiple indicators of compromise", isCorrect: true },
        { id: "medium", order: 3, text: "Medium - investigate during business hours", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "critical" },
      explanation: "Per threat detection indicators, off-hours activity, encoded PowerShell commands, and C2 connection attempts are critical indicators of compromise (IOCs).",
    },
    {
      id: "req-c2-indicator",
      order: 2,
      type: "dropdown",
      label: "C2 connection attempt indicates?",
      points: 1,
      dropdownOptions: [
        { id: "false-positive", order: 1, text: "Likely false positive", isCorrect: false },
        { id: "malware", order: 2, text: "Potential malware or attacker presence", isCorrect: true },
        { id: "network-error", order: 3, text: "Network misconfiguration", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "malware" },
      explanation: "Per threat intelligence, command and control (C2) communication indicates malware has established a connection with attacker infrastructure for commands.",
    },
    {
      id: "req-immediate-action",
      order: 3,
      type: "dropdown",
      label: "Recommended immediate action?",
      points: 1,
      dropdownOptions: [
        { id: "contact-user", order: 1, text: "Contact user for explanation", isCorrect: false },
        { id: "isolate", order: 2, text: "Isolate workstation from network", isCorrect: true },
        { id: "monitor", order: 3, text: "Continue monitoring for more evidence", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "isolate" },
      explanation: "Per NIST SP 800-61, network isolation prevents lateral movement and data exfiltration while preserving evidence for investigation.",
    },
    {
      id: "req-evidence",
      order: 4,
      type: "dropdown",
      label: "Critical evidence to preserve?",
      points: 1,
      dropdownOptions: [
        { id: "user-interview", order: 1, text: "User interview transcript", isCorrect: false },
        { id: "memory-image", order: 2, text: "Memory image and disk forensics", isCorrect: true },
        { id: "access-logs", order: 3, text: "Building access logs", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "memory-image" },
      explanation: "Per digital forensics best practices, memory imaging is critical as volatile memory contains evidence of running malware, encryption keys, and attacker tools.",
    },
  ],
};

// Database Activity Monitoring
export const iscDAMTBS: TBSQuestion = {
  id: "tbs-isc-038",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Data Security",
  subtopic: "Database Monitoring",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Database Activity Monitoring",
  scenarioText: `Evaluate database activity monitoring configuration and alerts.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-dam",
      order: 1,
      title: "DAM Configuration",
      type: "text",
      content: {
        type: "text",
        title: "Current DAM Settings",
        paragraphs: [
          "Monitored: All production databases",
          "Logging: SELECT queries on PII tables only",
          "Alerts: Failed logins (>10 attempts)",
          "Baseline: No behavioral baseline established",
          "Masking: PII visible in logs",
          "Real-time: Batch processing every hour",
          "Retention: 30 days of logs",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-pii-masking",
      order: 1,
      type: "dropdown",
      label: "PII visible in logs concern?",
      points: 2,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable - logs are secured", isCorrect: false },
        { id: "critical", order: 2, text: "Critical - creates additional data exposure risk", isCorrect: true },
        { id: "minor", order: 3, text: "Minor - only DBAs see logs", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "critical" },
      explanation: "Per data protection principles, logging PII in clear text creates additional exposure risk; sensitive data in logs should be masked or tokenized.",
    },
    {
      id: "req-batch-processing",
      order: 2,
      type: "dropdown",
      label: "Hourly batch processing limitation?",
      points: 1,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable for most threats", isCorrect: false },
        { id: "delayed", order: 2, text: "Delayed detection allows damage before response", isCorrect: true },
        { id: "efficient", order: 3, text: "Efficient use of resources", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "delayed" },
      explanation: "Per security monitoring best practices, hourly batch processing creates detection delays; real-time monitoring is needed to detect and respond to threats promptly.",
    },
    {
      id: "req-select-only",
      order: 3,
      type: "dropdown",
      label: "SELECT-only monitoring gap?",
      points: 1,
      dropdownOptions: [
        { id: "sufficient", order: 1, text: "Sufficient - captures data access", isCorrect: false },
        { id: "gap", order: 2, text: "Misses INSERT, UPDATE, DELETE activities", isCorrect: true },
        { id: "appropriate", order: 3, text: "Appropriate for read-focused threats", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "gap" },
      explanation: "Per database security monitoring, monitoring only SELECT queries misses critical INSERT, UPDATE, DELETE activities that could indicate data tampering or destruction.",
    },
    {
      id: "req-baseline",
      order: 4,
      type: "dropdown",
      label: "Missing baseline impact?",
      points: 1,
      dropdownOptions: [
        { id: "minor", order: 1, text: "Minor - alerts still work", isCorrect: false },
        { id: "significant", order: 2, text: "Cannot detect anomalous behavior patterns", isCorrect: true },
        { id: "none", order: 3, text: "Baselines are optional", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "significant" },
      explanation: "Per behavioral analytics, without an established baseline of normal activity, anomalous query patterns and potential insider threats cannot be detected.",
    },
  ],
};

// Secure Coding Practices
export const iscSecureCodingTBS: TBSQuestion = {
  id: "tbs-isc-039",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Application Security",
  subtopic: "Secure Coding",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-I",
  title: "Secure Coding Practice Review",
  scenarioText: `Evaluate secure coding practices and identify vulnerabilities.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-code-review",
      order: 1,
      title: "Code Review Findings",
      type: "table",
      content: {
        type: "table",
        title: "Security Code Review Results",
        headers: ["Finding", "Location", "Risk"],
        rows: [
          { cells: ["User input concatenated into SQL", "UserService.java:145", "Critical"] },
          { cells: ["Hardcoded API key", "ConfigManager.java:23", "High"] },
          { cells: ["MD5 used for password hashing", "AuthService.java:89", "High"] },
          { cells: ["No input length validation", "FormHandler.java:67", "Medium"] },
          { cells: ["Verbose error messages returned", "ExceptionHandler.java:34", "Medium"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-sql-fix",
      order: 1,
      type: "dropdown",
      label: "Fix for SQL concatenation vulnerability?",
      points: 2,
      dropdownOptions: [
        { id: "input-validation", order: 1, text: "Input validation and sanitization", isCorrect: false },
        { id: "parameterized", order: 2, text: "Parameterized queries or prepared statements", isCorrect: true },
        { id: "waf", order: 3, text: "Web application firewall", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "parameterized" },
      explanation: "Per OWASP SQL Injection Prevention Cheat Sheet, parameterized queries (prepared statements) prevent SQL injection by separating code from data.",
    },
    {
      id: "req-md5-issue",
      order: 2,
      type: "dropdown",
      label: "MD5 password hashing problem?",
      points: 1,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable with salt", isCorrect: false },
        { id: "broken", order: 2, text: "Cryptographically broken; use bcrypt/Argon2", isCorrect: true },
        { id: "slow", order: 3, text: "Too slow for authentication", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "broken" },
      explanation: "Per NIST SP 800-131A and OWASP, MD5 is cryptographically broken with known collisions; password-specific algorithms like bcrypt, scrypt, or Argon2 are required.",
    },
    {
      id: "req-hardcoded-key",
      order: 3,
      type: "dropdown",
      label: "Hardcoded API key remediation?",
      points: 2,
      dropdownOptions: [
        { id: "encrypt", order: 1, text: "Encrypt the key in code", isCorrect: false },
        { id: "secrets-manager", order: 2, text: "Use secrets manager or environment variables", isCorrect: true },
        { id: "obfuscate", order: 3, text: "Obfuscate the code", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "secrets-manager" },
      explanation: "Per secure coding standards, secrets should never be hardcoded; use environment variables, secrets managers (AWS Secrets Manager, HashiCorp Vault), or key vaults.",
    },
    {
      id: "req-error-messages",
      order: 4,
      type: "dropdown",
      label: "Verbose error message risk?",
      points: 1,
      dropdownOptions: [
        { id: "helpful", order: 1, text: "Helpful for user support", isCorrect: false },
        { id: "info-disclosure", order: 2, text: "Information disclosure aids attackers", isCorrect: true },
        { id: "standard", order: 3, text: "Standard debugging practice", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "info-disclosure" },
      explanation: "Per OWASP error handling guidance, detailed error messages can reveal stack traces, paths, and system configuration details useful for reconnaissance.",
    },
  ],
};

// Trust Services Criteria
export const iscTrustServicesTBS: TBSQuestion = {
  id: "tbs-isc-040",
  section: "ISC",
  tbsType: "dropdown",
  topic: "SOC Engagements",
  subtopic: "Trust Services Criteria",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-III",
  title: "Trust Services Criteria Selection",
  scenarioText: `Evaluate appropriate trust services criteria for SOC 2 engagement.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-service",
      order: 1,
      title: "Service Description",
      type: "text",
      content: {
        type: "text",
        title: "Healthcare Data Analytics SaaS",
        paragraphs: [
          "Service: Cloud-based analytics for patient outcomes",
          "Data: Protected Health Information (PHI)",
          "Users: Hospitals and healthcare providers",
          "SLA: 99.9% uptime guarantee",
          "Compliance: HIPAA Business Associate",
          "Operations: 24/7 processing with real-time dashboards",
          "Integration: HL7 FHIR APIs for data exchange",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-security",
      order: 1,
      type: "dropdown",
      label: "Is Security criteria required?",
      points: 1,
      dropdownOptions: [
        { id: "optional", order: 1, text: "Optional - can choose other criteria", isCorrect: false },
        { id: "required", order: 2, text: "Required - mandatory for all SOC 2", isCorrect: true },
        { id: "depends", order: 3, text: "Depends on service type", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "required" },
      explanation: "Per AICPA TSC, Security (Common Criteria) is mandatory for all SOC 2 engagements; other criteria (Availability, Confidentiality, Processing Integrity, Privacy) are optional.",
    },
    {
      id: "req-availability",
      order: 2,
      type: "dropdown",
      label: "Should Availability be included?",
      points: 1,
      dropdownOptions: [
        { id: "no", order: 1, text: "No - not relevant for analytics", isCorrect: false },
        { id: "yes", order: 2, text: "Yes - SLA and 24/7 operations require it", isCorrect: true },
        { id: "optional", order: 3, text: "Optional nice-to-have", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "yes" },
      explanation: "Per SOC 2 scoping guidance, a 99.9% SLA commitment and 24/7 operations make Availability criteria essential for demonstrating control over uptime commitments.",
    },
    {
      id: "req-confidentiality",
      order: 3,
      type: "dropdown",
      label: "Should Confidentiality be included?",
      points: 2,
      dropdownOptions: [
        { id: "no", order: 1, text: "No - Security covers data protection", isCorrect: false },
        { id: "yes", order: 2, text: "Yes - PHI requires explicit confidentiality controls", isCorrect: true },
        { id: "redundant", order: 3, text: "Redundant with Privacy criteria", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "yes" },
      explanation: "Per HIPAA and TSC mapping, PHI requires explicit confidentiality controls; the Confidentiality criteria demonstrates these controls to healthcare customers.",
    },
    {
      id: "req-privacy",
      order: 4,
      type: "dropdown",
      label: "Should Privacy criteria be included?",
      points: 1,
      dropdownOptions: [
        { id: "no", order: 1, text: "No - HIPAA covers privacy", isCorrect: false },
        { id: "yes", order: 2, text: "Yes - PHI is personal information", isCorrect: true },
        { id: "covered", order: 3, text: "Covered by Confidentiality", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "yes" },
      explanation: "Per AICPA Privacy criteria, PHI contains personal health information requiring Privacy controls for collection, use, retention, disclosure, and disposal.",
    },
  ],
};

// Service Level Management
export const iscSLMTBS: TBSQuestion = {
  id: "tbs-isc-041",
  section: "ISC",
  tbsType: "dropdown",
  topic: "IT Service Management",
  subtopic: "Service Levels",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Service Level Agreement Review",
  scenarioText: `Evaluate SLA terms and monitoring practices.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-sla",
      order: 1,
      title: "SLA Terms",
      type: "table",
      content: {
        type: "table",
        title: "Cloud Service SLA",
        headers: ["Metric", "Target", "Measurement", "Penalty"],
        rows: [
          { cells: ["Availability", "99.5%", "Monthly average", "5% credit per 0.1% below"] },
          { cells: ["Response time", "< 500ms", "95th percentile", "None specified"] },
          { cells: ["Support response", "< 4 hours", "Business hours only", "None specified"] },
          { cells: ["Data recovery", "< 24 hours", "After incident reported", "10% credit"] },
          { cells: ["Security incidents", "Report in 72 hours", "From discovery", "None specified"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-availability-target",
      order: 1,
      type: "dropdown",
      label: "99.5% availability assessment?",
      points: 1,
      dropdownOptions: [
        { id: "excellent", order: 1, text: "Excellent - above industry standard", isCorrect: false },
        { id: "average", order: 2, text: "Average - allows ~3.6 hours downtime/month", isCorrect: true },
        { id: "poor", order: 3, text: "Poor - unacceptable for production", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "average" },
      explanation: "Per service level benchmarks, 99.5% availability allows ~3.6 hours monthly downtime; 99.9% (~43 min/month) or higher is standard for mission-critical systems.",
    },
    {
      id: "req-no-penalty",
      order: 2,
      type: "dropdown",
      label: "Missing penalty for response time concern?",
      points: 2,
      dropdownOptions: [
        { id: "minor", order: 1, text: "Minor - metric is still tracked", isCorrect: false },
        { id: "significant", order: 2, text: "Significant - no incentive for provider compliance", isCorrect: true },
        { id: "acceptable", order: 3, text: "Acceptable - availability is more important", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "significant" },
      explanation: "Per contract best practices, SLA metrics without penalties are merely aspirational goals; financial consequences create provider accountability.",
    },
    {
      id: "req-security-notification",
      order: 3,
      type: "dropdown",
      label: "72-hour security incident notification adequacy?",
      points: 1,
      dropdownOptions: [
        { id: "adequate", order: 1, text: "Adequate - matches GDPR requirement", isCorrect: false },
        { id: "slow", order: 2, text: "Too slow - immediate notification preferred", isCorrect: true },
        { id: "fast", order: 3, text: "Too fast - investigation needed first", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "slow" },
      explanation: "Per incident response best practices, while GDPR allows 72 hours for breach notification to authorities, customers need faster notification to take protective actions.",
    },
    {
      id: "req-business-hours",
      order: 4,
      type: "dropdown",
      label: "Business hours only support issue?",
      points: 1,
      dropdownOptions: [
        { id: "acceptable", order: 1, text: "Acceptable for most applications", isCorrect: false },
        { id: "gap", order: 2, text: "Gap - critical issues may wait until morning", isCorrect: true },
        { id: "standard", order: 3, text: "Standard support model", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "gap" },
      explanation: "Per ITIL service management, business-hours-only support creates a gap where critical issues occurring overnight or weekends won't be addressed until the next business day.",
    },
  ],
};

// Blockchain Controls
export const iscBlockchainTBS: TBSQuestion = {
  id: "tbs-isc-042",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Emerging Technology",
  subtopic: "Blockchain",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-I",
  title: "Blockchain Implementation Controls",
  scenarioText: `Evaluate blockchain implementation controls and risks.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-blockchain",
      order: 1,
      title: "Blockchain Implementation",
      type: "text",
      content: {
        type: "text",
        title: "Supply Chain Blockchain",
        paragraphs: [
          "Platform: Private permissioned blockchain",
          "Participants: 50 supply chain partners",
          "Consensus: Practical Byzantine Fault Tolerance (PBFT)",
          "Smart Contracts: Automated payment triggers",
          "Key Management: Partners manage own keys",
          "Immutability: All transactions permanent",
          "Oracle Integration: External data feeds for IoT sensors",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-key-management",
      order: 1,
      type: "dropdown",
      label: "Partner key management risk?",
      points: 2,
      dropdownOptions: [
        { id: "appropriate", order: 1, text: "Appropriate - partners responsible for their keys", isCorrect: false },
        { id: "high-risk", order: 2, text: "High - inconsistent security across partners", isCorrect: true },
        { id: "standard", order: 3, text: "Standard blockchain practice", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high-risk" },
      explanation: "Per blockchain security principles, decentralized key management across partners creates a 'weakest link' vulnerability where security depends on the least secure participant.",
    },
    {
      id: "req-smart-contract",
      order: 2,
      type: "dropdown",
      label: "Smart contract payment risk?",
      points: 2,
      dropdownOptions: [
        { id: "efficient", order: 1, text: "Efficient - removes human error", isCorrect: false },
        { id: "critical", order: 2, text: "Critical - bugs are permanent and expensive", isCorrect: true },
        { id: "low", order: 3, text: "Low - code can be updated", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "critical" },
      explanation: "Per blockchain audit guidance, smart contract bugs on immutable blockchains cannot be patched like traditional software; errors can result in permanent financial losses.",
    },
    {
      id: "req-oracle",
      order: 3,
      type: "dropdown",
      label: "Oracle integration concern?",
      points: 1,
      dropdownOptions: [
        { id: "none", order: 1, text: "None - extends blockchain utility", isCorrect: false },
        { id: "trust", order: 2, text: "Introduces centralized trust point", isCorrect: true },
        { id: "minor", order: 3, text: "Minor operational concern", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "trust" },
      explanation: "Per blockchain security analysis, oracles introduce centralized trust points that can be compromised or manipulated, undermining blockchain's decentralized trust model.",
    },
    {
      id: "req-immutability",
      order: 4,
      type: "dropdown",
      label: "Immutability compliance consideration?",
      points: 1,
      dropdownOptions: [
        { id: "benefit", order: 1, text: "Benefit - provides audit trail", isCorrect: false },
        { id: "challenge", order: 2, text: "Challenge - conflicts with right to deletion", isCorrect: true },
        { id: "neutral", order: 3, text: "Neutral - depends on data type", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "challenge" },
      explanation: "Per GDPR Article 17 (Right to Erasure), blockchain immutability creates compliance challenges since personal data cannot be deleted once recorded on-chain.",
    },
  ],
};

// ISC Batch 4: tbs-isc-043 to tbs-isc-050 (Final 8 questions)

// ISC-043: Zero Trust Architecture
export const iscZeroTrustTBS: TBSQuestion = {
  id: "tbs-isc-043",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Security Architecture",
  subtopic: "Zero Trust",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Zero Trust Architecture Assessment",
  scenarioText: `A financial services firm is implementing Zero Trust architecture. Evaluate the implementation against Zero Trust principles.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-zerotrust",
      order: 1,
      title: "Zero Trust Implementation",
      type: "table",
      content: {
        type: "table",
        title: "Zero Trust Gap Analysis",
        headers: ["Component", "Current State", "Zero Trust Target"],
        rows: [
          { cells: ["Network Access", "VPN for remote users only", "Universal identity verification"] },
          { cells: ["Authentication", "Single sign-on with password", "Continuous MFA verification"] },
          { cells: ["Authorization", "Role-based at login", "Per-request policy evaluation"] },
          { cells: ["Data Access", "Network perimeter protection", "Data-centric encryption"] },
          { cells: ["Device Trust", "Corporate devices allowed", "Real-time device posture"] },
          { cells: ["Microsegmentation", "VLAN-based separation", "Application-level isolation"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-network-gap",
      order: 1,
      type: "dropdown",
      label: "Network access gap severity?",
      points: 2,
      dropdownOptions: [
        { id: "minor", order: 1, text: "Minor - VPN provides adequate protection", isCorrect: false },
        { id: "critical", order: 2, text: "Critical - violates never trust always verify", isCorrect: true },
        { id: "moderate", order: 3, text: "Moderate - acceptable interim state", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "critical" },
      explanation: "Per NIST SP 800-207 (Zero Trust Architecture), the core principle is 'never trust, always verify' regardless of network location; VPN-only protection violates this.",
    },
    {
      id: "req-auth-improvement",
      order: 2,
      type: "dropdown",
      label: "Authentication improvement priority?",
      points: 2,
      dropdownOptions: [
        { id: "low", order: 1, text: "Low - SSO is sufficient", isCorrect: false },
        { id: "high", order: 2, text: "High - continuous verification needed", isCorrect: true },
        { id: "medium", order: 3, text: "Medium - add MFA at login only", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high" },
      explanation: "Per NIST Zero Trust principles, authentication must be continuous throughout the session, not just at login; user/device posture should be reevaluated for each access request.",
    },
    {
      id: "req-microseg",
      order: 3,
      type: "dropdown",
      label: "Microsegmentation approach adequacy?",
      points: 2,
      dropdownOptions: [
        { id: "adequate", order: 1, text: "Adequate - VLANs provide separation", isCorrect: false },
        { id: "insufficient", order: 2, text: "Insufficient - need application-level controls", isCorrect: true },
        { id: "excessive", order: 3, text: "Excessive - adds unnecessary complexity", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "insufficient" },
      explanation: "Per Zero Trust microsegmentation principles, VLAN-based separation is insufficient; true microsegmentation requires application/workload-level isolation with east-west traffic controls.",
    },
  ],
};

// ISC-044: Security Metrics and KPIs
export const iscSecurityMetricsTBS: TBSQuestion = {
  id: "tbs-isc-044",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Security Management",
  subtopic: "Security Metrics",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Security Program Metrics Analysis",
  scenarioText: `The CISO needs to report security program effectiveness metrics to the board. Calculate and analyze key security KPIs.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-metrics",
      order: 1,
      title: "Security Operations Data",
      type: "table",
      content: {
        type: "table",
        title: "Quarterly Security Metrics",
        headers: ["Metric", "Q1", "Q2", "Q3", "Q4"],
        rows: [
          { cells: ["Security incidents detected", "145", "162", "138", "155"] },
          { cells: ["Mean time to detect (hours)", "4.2", "3.8", "3.1", "2.5"] },
          { cells: ["Mean time to respond (hours)", "8.5", "7.2", "6.8", "5.4"] },
          { cells: ["Vulnerabilities identified", "892", "756", "634", "521"] },
          { cells: ["Vulnerabilities remediated", "823", "698", "612", "498"] },
          { cells: ["Phishing tests sent", "5000", "5000", "5000", "5000"] },
          { cells: ["Employees who clicked", "450", "380", "290", "215"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-mttd-improvement",
      order: 1,
      type: "numeric",
      label: "MTTD improvement Q1 to Q4 (percentage)?",
      points: 2,
      correctAnswer: { type: "numeric", value: 40.5, tolerance: 0.5 },
      explanation: "((4.2 - 2.5) / 4.2) × 100 = 40.5% improvement",
    },
    {
      id: "req-vuln-remediation",
      order: 2,
      type: "numeric",
      label: "Q4 vulnerability remediation rate (percentage)?",
      points: 2,
      correctAnswer: { type: "numeric", value: 95.6, tolerance: 0.5 },
      explanation: "(498 / 521) × 100 = 95.6%",
    },
    {
      id: "req-phishing-q4",
      order: 3,
      type: "numeric",
      label: "Q4 phishing susceptibility rate (percentage)?",
      points: 1,
      correctAnswer: { type: "numeric", value: 4.3, tolerance: 0.1 },
      explanation: "(215 / 5000) × 100 = 4.3%",
    },
  ],
};

// ISC-045: SOC Report Bridge Letter
export const iscSOCBridgeLetterTBS: TBSQuestion = {
  id: "tbs-isc-045",
  section: "ISC",
  tbsType: "dropdown",
  topic: "SOC Reports",
  subtopic: "Bridge Letter",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-III",
  title: "SOC 2 Bridge Letter Evaluation",
  scenarioText: `A service organization's SOC 2 report covers Jan 1 - Sep 30, but your client's fiscal year ends Dec 31. Evaluate the bridge letter provided.`,
  timeEstimateMinutes: 13,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-bridgeletter",
      order: 1,
      title: "Management Bridge Letter",
      type: "text",
      content: {
        type: "text",
        title: "Bridge Letter Content",
        paragraphs: [
          "We confirm that from October 1 through December 31:",
          "1. There have been no significant changes to the system described in the SOC 2 report",
          "2. No control exceptions have been identified",
          "3. All controls continue to operate as described",
          "4. There have been no changes to key service commitments",
          "Signed: CFO, December 31",
        ],
      },
    },
    {
      id: "exhibit-changes",
      order: 2,
      title: "System Change Log (Oct-Dec)",
      type: "table",
      content: {
        type: "table",
        title: "Bridge Period Changes",
        headers: ["Date", "Change", "Impact"],
        rows: [
          { cells: ["Oct 15", "Upgraded firewall firmware", "Security enhancement"] },
          { cells: ["Nov 1", "Migrated database to new cloud region", "Infrastructure change"] },
          { cells: ["Nov 20", "Implemented new access control system", "Control change"] },
          { cells: ["Dec 10", "Added new payment processing vendor", "Third-party change"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-letter-accuracy",
      order: 1,
      type: "dropdown",
      label: "Bridge letter accuracy assessment?",
      points: 2,
      dropdownOptions: [
        { id: "accurate", order: 1, text: "Accurate - changes are minor enhancements", isCorrect: false },
        { id: "inaccurate", order: 2, text: "Inaccurate - contradicts change log evidence", isCorrect: true },
        { id: "acceptable", order: 3, text: "Acceptable - within management discretion", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "inaccurate" },
      explanation: "Per SOC bridge letter requirements, database migration and new access control systems are significant changes that contradict the 'no significant changes' assertion.",
    },
    {
      id: "req-most-concerning",
      order: 2,
      type: "dropdown",
      label: "Most concerning undisclosed change?",
      points: 2,
      dropdownOptions: [
        { id: "firewall", order: 1, text: "Firewall upgrade - security change", isCorrect: false },
        { id: "access-control", order: 2, text: "New access control system - control change", isCorrect: true },
        { id: "database", order: 3, text: "Database migration - infrastructure change", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "access-control" },
      explanation: "Per SOC 2 scope considerations, access control system changes directly affect the control environment and security criteria tested in the report.",
    },
    {
      id: "req-auditor-response",
      order: 3,
      type: "dropdown",
      label: "Appropriate auditor response?",
      points: 2,
      dropdownOptions: [
        { id: "accept", order: 1, text: "Accept the bridge letter as provided", isCorrect: false },
        { id: "additional", order: 2, text: "Request updated SOC 2 or perform additional procedures", isCorrect: true },
        { id: "disclaim", order: 3, text: "Disclaim reliance on service organization", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "additional" },
      explanation: "Per user auditor guidance (AU-C 402), material changes in the bridge period require additional procedures, inquiry of service organization, or an updated SOC report.",
    },
  ],
};

// ISC-046: Privileged Access Management
export const iscPrivilegedAccessTBS: TBSQuestion = {
  id: "tbs-isc-046",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Access Controls",
  subtopic: "Privileged Access",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-I",
  title: "Privileged Access Management Review",
  scenarioText: `Evaluate the effectiveness of a company's privileged access management (PAM) program.`,
  timeEstimateMinutes: 13,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-pam",
      order: 1,
      title: "PAM Configuration",
      type: "table",
      content: {
        type: "table",
        title: "PAM Settings Comparison",
        headers: ["Setting", "Configuration", "Best Practice"],
        rows: [
          { cells: ["Password vault", "Centralized, encrypted", "Centralized, encrypted"] },
          { cells: ["Session recording", "Enabled for production", "All privileged sessions"] },
          { cells: ["Password rotation", "Every 90 days", "After each use"] },
          { cells: ["Access approval", "Manager approval", "Dual approval required"] },
          { cells: ["Emergency access", "Break-glass accounts exist", "With automatic alerts"] },
          { cells: ["Service accounts", "Static passwords", "Managed credentials"] },
        ],
      },
    },
    {
      id: "exhibit-incidents",
      order: 2,
      title: "Recent Privileged Access Incidents",
      type: "text",
      content: {
        type: "text",
        title: "Incident Summary",
        paragraphs: [
          "Incident 1: Database admin used cached credentials 3 months after termination",
          "Incident 2: Service account compromise led to lateral movement",
          "Incident 3: Unauthorized access via break-glass account not detected for 48 hours",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-password-rotation",
      order: 1,
      type: "dropdown",
      label: "Password rotation adequacy?",
      points: 2,
      dropdownOptions: [
        { id: "adequate", order: 1, text: "Adequate - 90 days is reasonable", isCorrect: false },
        { id: "inadequate", order: 2, text: "Inadequate - caused Incident 1", isCorrect: true },
        { id: "excessive", order: 3, text: "Excessive - too frequent rotation", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "inadequate" },
      explanation: "Per PAM best practices, 90-day password rotation is inadequate for privileged accounts; Incident 1 demonstrates credentials remained valid after termination.",
    },
    {
      id: "req-service-account",
      order: 2,
      type: "dropdown",
      label: "Service account control deficiency?",
      points: 2,
      dropdownOptions: [
        { id: "minor", order: 1, text: "Minor - static passwords are common", isCorrect: false },
        { id: "significant", order: 2, text: "Significant - enabled Incident 2", isCorrect: true },
        { id: "none", order: 3, text: "None - service accounts need stability", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "significant" },
      explanation: "Per NIST SP 800-53 (AC-2) and PAM guidance, static service account passwords enabled the Incident 2 lateral movement; managed/rotated credentials are required.",
    },
    {
      id: "req-breakglass",
      order: 3,
      type: "dropdown",
      label: "Break-glass control gap?",
      points: 2,
      dropdownOptions: [
        { id: "detection", order: 1, text: "Detection - alerts not functioning properly", isCorrect: true },
        { id: "access", order: 2, text: "Access - break-glass too easy to obtain", isCorrect: false },
        { id: "documentation", order: 3, text: "Documentation - procedures unclear", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "detection" },
      explanation: "Per PAM control requirements, break-glass account usage should trigger immediate alerts; the 48-hour detection delay in Incident 3 indicates monitoring failure.",
    },
  ],
};

// ISC-047: Third-Party Risk Scoring
export const iscThirdPartyRiskScoringTBS: TBSQuestion = {
  id: "tbs-isc-047",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Vendor Management",
  subtopic: "Risk Scoring",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Third-Party Risk Score Calculation",
  scenarioText: `Calculate risk scores for third-party vendors using the company's risk scoring methodology.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-methodology",
      order: 1,
      title: "Risk Scoring Methodology",
      type: "text",
      content: {
        type: "text",
        title: "Scoring Rules",
        paragraphs: [
          "Risk Score = (Impact × 0.4) + (Likelihood × 0.3) + (Control Gaps × 0.3)",
          "Impact Scale: 1-5 (5 = highest)",
          "Likelihood Scale: 1-5 (5 = most likely)",
          "Control Gaps: Number of deficiencies × 2 (max 10)",
          "High Risk: Score > 7.0",
          "Medium Risk: Score 4.0-7.0",
          "Low Risk: Score < 4.0",
        ],
      },
    },
    {
      id: "exhibit-vendors",
      order: 2,
      title: "Vendor Assessment Results",
      type: "table",
      content: {
        type: "table",
        title: "Vendor Risk Assessment",
        headers: ["Vendor", "Data Access", "Impact", "Likelihood", "Control Deficiencies"],
        rows: [
          { cells: ["Cloud Provider A", "PII + Financial", "5", "2", "1"] },
          { cells: ["Payment Processor B", "Financial only", "4", "3", "3"] },
          { cells: ["Marketing Platform C", "Contact info", "2", "4", "2"] },
          { cells: ["HR System D", "Employee PII", "4", "2", "4"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-vendor-a-score",
      order: 1,
      type: "numeric",
      label: "Cloud Provider A risk score?",
      points: 2,
      correctAnswer: { type: "numeric", value: 3.2, tolerance: 0.1 },
      explanation: "(5 × 0.4) + (2 × 0.3) + (2 × 0.3) = 2.0 + 0.6 + 0.6 = 3.2",
    },
    {
      id: "req-vendor-b-score",
      order: 2,
      type: "numeric",
      label: "Payment Processor B risk score?",
      points: 2,
      correctAnswer: { type: "numeric", value: 5.3, tolerance: 0.1 },
      explanation: "(4 × 0.4) + (3 × 0.3) + (6 × 0.3) = 1.6 + 0.9 + 1.8 = 5.3 (Medium Risk)",
    },
    {
      id: "req-highest-risk",
      order: 3,
      type: "dropdown",
      label: "Which vendor is highest risk?",
      points: 1,
      dropdownOptions: [
        { id: "vendor-a", order: 1, text: "Cloud Provider A", isCorrect: false },
        { id: "vendor-d", order: 2, text: "HR System D", isCorrect: true },
        { id: "vendor-b", order: 3, text: "Payment Processor B", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "vendor-d" },
      explanation: "HR System D: (4×0.4)+(2×0.3)+(8×0.3) = 1.6+0.6+2.4 = 4.6, but has most control gaps",
    },
  ],
};

// ISC-048: Security Awareness Program
export const iscSecurityAwarenessTBS: TBSQuestion = {
  id: "tbs-isc-048",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Security Training",
  subtopic: "Awareness Program",
  difficulty: "medium",
  skillLevel: "evaluation",
  contentArea: "ISC-I",
  title: "Security Awareness Program Effectiveness",
  scenarioText: `Evaluate the effectiveness of an organization's security awareness training program.`,
  timeEstimateMinutes: 11,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-program",
      order: 1,
      title: "Awareness Program Details",
      type: "table",
      content: {
        type: "table",
        title: "Program Components",
        headers: ["Element", "Current State"],
        rows: [
          { cells: ["Training frequency", "Annual online course (30 minutes)"] },
          { cells: ["Phishing simulations", "Quarterly, same template"] },
          { cells: ["Metrics tracked", "Completion rate only"] },
          { cells: ["Remediation training", "Repeat same course if failed"] },
          { cells: ["Role-based content", "Same content for all roles"] },
          { cells: ["Executive participation", "Exempt from program"] },
        ],
      },
    },
    {
      id: "exhibit-results",
      order: 2,
      title: "Program Results",
      type: "table",
      content: {
        type: "table",
        title: "Annual Results",
        headers: ["Metric", "Year 1", "Year 2", "Year 3"],
        rows: [
          { cells: ["Training completion", "95%", "97%", "98%"] },
          { cells: ["Phishing click rate", "18%", "16%", "15%"] },
          { cells: ["Reported incidents", "45", "42", "38"] },
          { cells: ["Social engineering attacks", "12", "15", "18"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-phishing-sim",
      order: 1,
      type: "dropdown",
      label: "Phishing simulation deficiency?",
      points: 2,
      dropdownOptions: [
        { id: "frequency", order: 1, text: "Frequency - quarterly is insufficient", isCorrect: false },
        { id: "template", order: 2, text: "Template - same template enables pattern recognition", isCorrect: true },
        { id: "none", order: 3, text: "None - 15% click rate is acceptable", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "template" },
      explanation: "Per security awareness best practices, using the same phishing template allows users to recognize patterns rather than developing actual threat detection skills.",
    },
    {
      id: "req-executive-risk",
      order: 2,
      type: "dropdown",
      label: "Executive exemption risk level?",
      points: 2,
      dropdownOptions: [
        { id: "low", order: 1, text: "Low - executives have assistants filter email", isCorrect: false },
        { id: "high", order: 2, text: "High - executives are prime targets", isCorrect: true },
        { id: "medium", order: 3, text: "Medium - acceptable business accommodation", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "high" },
      explanation: "Per threat intelligence and FBI guidance, executives are high-value targets for spear-phishing and whaling attacks; exempting them creates significant organizational risk.",
    },
    {
      id: "req-trend-concern",
      order: 3,
      type: "dropdown",
      label: "Most concerning trend?",
      points: 1,
      dropdownOptions: [
        { id: "phishing", order: 1, text: "Phishing click rate plateau", isCorrect: false },
        { id: "social", order: 2, text: "Rising social engineering attacks", isCorrect: true },
        { id: "incidents", order: 3, text: "Declining incident reports", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "social" },
      explanation: "Per security metrics analysis, the 50% increase in social engineering attacks (12→18) despite training indicates awareness gaps not being addressed by the current program.",
    },
  ],
};

// ISC-049: IT Audit Sampling
export const iscAuditSamplingTBS: TBSQuestion = {
  id: "tbs-isc-049",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "IT Audit",
  subtopic: "Sampling",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-III",
  title: "IT Audit Sample Size Determination",
  scenarioText: `Determine appropriate sample sizes for IT general controls testing based on control frequency and risk assessment.

Per AU-C 530 (Audit Sampling), sample sizes depend on: (1) acceptable level of sampling risk (related to control risk assessment), (2) tolerable rate of deviation, and (3) expected population deviation rate. For IT controls, frequency of occurrence and risk level are key determinants. Higher risk = larger samples needed to achieve sufficient assurance.`,
  timeEstimateMinutes: 11,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-guidance",
      order: 1,
      title: "Sample Size Guidance",
      type: "table",
      content: {
        type: "table",
        title: "Sample Size Matrix",
        headers: ["Control Frequency", "Low Risk", "Moderate Risk", "High Risk"],
        rows: [
          { cells: ["Annual (1)", "1", "1", "1"] },
          { cells: ["Quarterly (4)", "1", "2", "2"] },
          { cells: ["Monthly (12)", "2", "3", "4"] },
          { cells: ["Weekly (52)", "5", "10", "15"] },
          { cells: ["Daily (250)", "15", "25", "40"] },
          { cells: ["Multiple daily (500+)", "25", "40", "60"] },
        ],
      },
    },
    {
      id: "exhibit-controls",
      order: 2,
      title: "Controls to Test",
      type: "table",
      content: {
        type: "table",
        title: "Controls for Testing",
        headers: ["Control", "Frequency", "Risk Level", "Population"],
        rows: [
          { cells: ["User access reviews", "Quarterly", "High", "4"] },
          { cells: ["Backup verification", "Daily", "Moderate", "250"] },
          { cells: ["Change approvals", "Multiple daily", "High", "1,200"] },
          { cells: ["Firewall rule reviews", "Monthly", "Moderate", "12"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-access-review",
      order: 1,
      type: "numeric",
      label: "User access review sample size?",
      points: 1,
      correctAnswer: { type: "numeric", value: 2, tolerance: 0 },
      explanation: "Per AU-C 530: Quarterly (4 occurrences) + High Risk requires 2 samples to achieve sufficient assurance given low tolerable deviation",
    },
    {
      id: "req-backup",
      order: 2,
      type: "numeric",
      label: "Backup verification sample size?",
      points: 1,
      correctAnswer: { type: "numeric", value: 25, tolerance: 0 },
      explanation: "Per AU-C 530: Daily (250 occurrences) + Moderate Risk = 25 samples; larger population with moderate risk allows larger tolerable deviation",
    },
    {
      id: "req-change",
      order: 3,
      type: "numeric",
      label: "Change approval sample size?",
      points: 2,
      correctAnswer: { type: "numeric", value: 60, tolerance: 0 },
      explanation: "Per AU-C 530: Multiple daily (500+ occurrences) + High Risk = 60 samples; high frequency with high risk requires lower tolerable deviation and more samples",
    },
    {
      id: "req-firewall",
      order: 4,
      type: "numeric",
      label: "Firewall rule review sample size?",
      points: 1,
      correctAnswer: { type: "numeric", value: 3, tolerance: 0 },
      explanation: "Per AU-C 530: Monthly (12 occurrences) + Moderate Risk = 3 samples; moderate frequency and risk allows higher tolerable deviation with smaller sample",
    },
  ],
};

// ISC-050: Business Impact Analysis
export const iscBusinessImpactTBS: TBSQuestion = {
  id: "tbs-isc-050",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Business Continuity",
  subtopic: "Business Impact Analysis",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Business Impact Analysis Calculations",
  scenarioText: `Perform business impact analysis calculations to determine recovery priorities and maximum tolerable downtime.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-systems",
      order: 1,
      title: "Critical System Assessment",
      type: "table",
      content: {
        type: "table",
        title: "System Impact Assessment",
        headers: ["System", "Hourly Revenue Impact", "Regulatory Penalty/Day", "Reputation Score (1-10)"],
        rows: [
          { cells: ["E-commerce Platform", "$45,000", "$0", "9"] },
          { cells: ["Payment Processing", "$35,000", "$50,000", "10"] },
          { cells: ["Customer Portal", "$5,000", "$0", "7"] },
          { cells: ["Regulatory Reporting", "$0", "$100,000", "3"] },
        ],
      },
    },
    {
      id: "exhibit-formula",
      order: 2,
      title: "BIA Scoring Formula",
      type: "text",
      content: {
        type: "text",
        title: "Impact Calculation",
        paragraphs: [
          "Total Daily Impact = (Hourly Revenue × 8 hours) + Regulatory Penalty + (Reputation × $10,000)",
          "Recovery Priority Score = Total Daily Impact / $100,000",
          "Systems with Priority Score > 5 require RTO < 4 hours",
          "Systems with Priority Score 2-5 require RTO < 24 hours",
          "Systems with Priority Score < 2 require RTO < 72 hours",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-ecommerce-impact",
      order: 1,
      type: "numeric",
      label: "E-commerce daily impact ($thousands)?",
      points: 2,
      correctAnswer: { type: "numeric", value: 450, tolerance: 1 },
      explanation: "($45,000 × 8) + $0 + (9 × $10,000) = $360,000 + $90,000 = $450,000",
    },
    {
      id: "req-payment-priority",
      order: 2,
      type: "numeric",
      label: "Payment Processing priority score?",
      points: 2,
      correctAnswer: { type: "numeric", value: 4.3, tolerance: 0.1 },
      explanation: "($35,000 × 8) + $50,000 + (10 × $10,000) = $430,000 / $100,000 = 4.3",
    },
    {
      id: "req-regulatory-rto",
      order: 3,
      type: "dropdown",
      label: "Regulatory Reporting required RTO?",
      points: 2,
      dropdownOptions: [
        { id: "4hours", order: 1, text: "< 4 hours", isCorrect: false },
        { id: "24hours", order: 2, text: "< 24 hours", isCorrect: false },
        { id: "72hours", order: 3, text: "< 72 hours", isCorrect: true },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "72hours" },
      explanation: "Priority = ($0 + $100,000 + $30,000) / $100,000 = 1.3. Per the scoring formula, systems with Priority Score < 2 require RTO < 72 hours.",
    },
  ],
};

// Export all ISC TBS questions
export const iscTBSQuestions: TBSQuestion[] = [
  iscITGCAccessControlsTBS,
  iscSOCReportsTBS,
  iscCybersecurityTBS,
  iscDataAnalyticsTBS,
  iscChangeManagementTBS,
  iscERPSystemsTBS,
  iscBusinessContinuityTBS,
  iscPrivacyControlsTBS,
  iscNetworkSecurityTBS,
  iscCloudSecurityTBS,
  iscCOSOFrameworkTBS,
  iscITAuditProceduresTBS,
  iscDatabaseSecurityTBS,
  iscIncidentResponseTBS,
  iscSOC2AnalysisTBS,
  iscEncryptionTBS,
  iscIdentityManagementTBS,
  iscVendorRiskTBS,
  iscAppSecurityTBS,
  iscSDLCTBS,
  iscNetworkSegmentationTBS,
  iscAuditLogsTBS,
  iscDisasterRecoveryTBS,
  iscMobileSecurityTBS,
  iscPenetrationTestingTBS,
  iscDataClassificationTBS,
  iscAPISecurityTBS,
  iscPhysicalSecurityTBS,
  iscITGovernanceTBS,
  iscConfigManagementTBS,
  iscPatchManagementTBS,
  iscCloudPostureTBS,
  iscSOC1UnderstandingTBS,
  iscRansomwareResponseTBS,
  iscPrivacyImpactTBS,
  iscRiskAssessmentTBS,
  iscEDRTBS,
  iscDAMTBS,
  iscSecureCodingTBS,
  iscTrustServicesTBS,
  iscSLMTBS,
  iscBlockchainTBS,
  iscZeroTrustTBS,
  iscSecurityMetricsTBS,
  iscSOCBridgeLetterTBS,
  iscPrivilegedAccessTBS,
  iscThirdPartyRiskScoringTBS,
  iscSecurityAwarenessTBS,
  iscAuditSamplingTBS,
  iscBusinessImpactTBS,
];

// ============================================================
// ISC BATCH 1 - Questions 051-060
// ============================================================

export const iscCertificateManagementTBS: TBSQuestion = {
  id: "tbs-isc-051",
  section: "ISC",
  tbsType: "document_review",
  topic: "Cryptography",
  subtopic: "PKI and Certificates",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "SSL/TLS Certificate Management Audit",
  scenarioText: "During an IT controls audit, you are reviewing the organization's SSL/TLS certificate management practices. The IT security team has provided documentation on their certificate inventory and renewal procedures. You need to evaluate whether certificate management controls are operating effectively.",
  timeEstimateMinutes: 16,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Certificate Inventory",
      content: {
        type: "table",
        title: "Certificate Inventory",
        headers: ["Certificate Name", "Domain", "Expiry Date", "Key Length", "CA", "Auto-Renew"],
        rows: [
          { cells: ["Web Portal", "portal.company.com", "2025-03-15", "2048-bit RSA", "DigiCert", "Yes"] },
          { cells: ["API Gateway", "api.company.com", "2025-01-30", "4096-bit RSA", "Let's Encrypt", "Yes"] },
          { cells: ["Internal App", "internal.company.local", "2024-12-01", "1024-bit RSA", "Self-signed", "No"] },
          { cells: ["Payment Portal", "pay.company.com", "2025-06-20", "256-bit ECC", "DigiCert", "Yes"] },
          { cells: ["Dev Server", "dev.company.com", "2024-11-15", "2048-bit RSA", "Internal CA", "No"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "dropdown",
      label: "Which certificate represents the highest security risk based on expiration?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Web Portal", isCorrect: false },
        { id: "opt2", order: 2, text: "API Gateway", isCorrect: false },
        { id: "opt3", order: 3, text: "Internal App", isCorrect: false },
        { id: "opt4", order: 4, text: "Dev Server", isCorrect: true }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt4" },
      points: 2,
      explanation: "Dev Server has expiry date of 2024-11-15 which would be expired (assuming current audit date), making it the highest risk."
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "Which certificate has an inadequate key length by current standards?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Web Portal - 2048-bit RSA", isCorrect: false },
        { id: "opt2", order: 2, text: "Internal App - 1024-bit RSA", isCorrect: true },
        { id: "opt3", order: 3, text: "Payment Portal - 256-bit ECC", isCorrect: false },
        { id: "opt4", order: 4, text: "API Gateway - 4096-bit RSA", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt2" },
      points: 2,
      explanation: "1024-bit RSA is considered deprecated and insecure. Current standards require minimum 2048-bit RSA or 256-bit ECC."
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "Which combination represents certificate management weaknesses identified?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Self-signed cert, expired certs, inadequate key length", isCorrect: true },
        { id: "opt2", order: 2, text: "Self-signed cert, external CA usage, inadequate key length", isCorrect: false },
        { id: "opt3", order: 3, text: "External CA usage only", isCorrect: false },
        { id: "opt4", order: 4, text: "All items listed are weaknesses", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 3,
      explanation: "Self-signed certs, expired certs without auto-renew, and 1024-bit keys are all weaknesses. Using trusted external CAs for public certs is a good practice."
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "How many certificates lack automated renewal capability?",
      correctAnswer: { type: "numeric", value: 2, tolerance: 0 },
      points: 1,
      explanation: "Internal App and Dev Server both have Auto-Renew set to 'No'."
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "What is the recommended minimum RSA key length for certificates today?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "1024 bits", isCorrect: false },
        { id: "opt2", order: 2, text: "2048 bits", isCorrect: true },
        { id: "opt3", order: 3, text: "4096 bits", isCorrect: false },
        { id: "opt4", order: 4, text: "512 bits", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt2" },
      points: 2,
      explanation: "2048 bits is the minimum recommended RSA key length. While 4096 provides more security, 2048 is the baseline standard."
    }
  ]
};

export const iscSIEMAnalysisTBS: TBSQuestion = {
  id: "tbs-isc-052",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Security Monitoring",
  subtopic: "SIEM and Log Analysis",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "SIEM Alert Analysis and Metrics",
  scenarioText: "As part of the IT controls assessment, you are evaluating the effectiveness of the organization's Security Information and Event Management (SIEM) system. The security operations center has provided weekly metrics for your analysis. Calculate key performance indicators to assess SIEM effectiveness.",
  timeEstimateMinutes: 18,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Weekly SIEM Metrics",
      content: {
        type: "table",
        title: "Weekly SIEM Metrics",
        headers: ["Metric", "Week 1", "Week 2", "Week 3", "Week 4"],
        rows: [
          { cells: ["Total alerts generated", "4,500", "5,200", "4,800", "5,500"] },
          { cells: ["True positive alerts", "450", "520", "480", "550"] },
          { cells: ["False positive alerts", "3,600", "4,160", "3,840", "4,400"] },
          { cells: ["Alerts investigated", "900", "1,040", "960", "1,100"] },
          { cells: ["Mean time to detect (hours)", "2.5", "2.8", "2.2", "3.0"] },
          { cells: ["Mean time to respond (hours)", "4.5", "5.2", "4.0", "5.5"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Average false positive rate across all weeks (as percentage)",
      correctAnswer: { type: "numeric", value: 80, tolerance: 1 },
      points: 2,
      explanation: "FP rate = Total FP / Total alerts. Week 1: 3600/4500=80%, Week 2: 4160/5200=80%, Week 3: 3840/4800=80%, Week 4: 4400/5500=80%. Average = 80%"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Total true positive alerts over the 4-week period",
      correctAnswer: { type: "numeric", value: 2000, tolerance: 0 },
      points: 2,
      explanation: "Total TP = 450 + 520 + 480 + 550 = 2,000 alerts"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Average mean time to respond (MTTR) across all weeks in hours",
      correctAnswer: { type: "numeric", value: 4.8, tolerance: 0.1 },
      points: 2,
      explanation: "MTTR = (4.5 + 5.2 + 4.0 + 5.5) / 4 = 19.2 / 4 = 4.8 hours"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Percentage of alerts that were investigated in Week 2",
      correctAnswer: { type: "numeric", value: 20, tolerance: 0.5 },
      points: 2,
      explanation: "Investigation rate = 1,040 / 5,200 × 100 = 20%"
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "Which week showed the best detection and response performance?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Week 1", isCorrect: false },
        { id: "opt2", order: 2, text: "Week 2", isCorrect: false },
        { id: "opt3", order: 3, text: "Week 3", isCorrect: true },
        { id: "opt4", order: 4, text: "Week 4", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt3" },
      points: 2,
      explanation: "Week 3 has the lowest MTTD (2.2 hours) and lowest MTTR (4.0 hours), indicating best overall performance."
    }
  ]
};

export const iscContainerSecurityTBS: TBSQuestion = {
  id: "tbs-isc-053",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Cloud Security",
  subtopic: "Container Security",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "ISC-III",
  title: "Container Security Assessment",
  scenarioText: "You are assessing the security controls for an organization's containerized application environment running on Kubernetes. The DevOps team has provided their container security configuration and practices. Evaluate the security posture and identify potential vulnerabilities.",
  timeEstimateMinutes: 20,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Container Security Configuration",
      content: {
        type: "table",
        title: "Container Security Configuration",
        headers: ["Control Area", "Current State", "Industry Best Practice"],
        rows: [
          { cells: ["Container runtime", "Docker 20.10", "Latest stable version"] },
          { cells: ["Base image source", "Public Docker Hub", "Private registry with scanning"] },
          { cells: ["Container privileges", "Some containers run as root", "Non-root users only"] },
          { cells: ["Network policies", "Allow all by default", "Default deny with explicit allow"] },
          { cells: ["Secrets management", "Environment variables", "Dedicated secrets manager"] },
          { cells: ["Image scanning", "Weekly manual scans", "Automated CI/CD scanning"] },
          { cells: ["Resource limits", "Not configured", "CPU/Memory limits required"] },
          { cells: ["Pod security policies", "Disabled", "Enforce restricted policies"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "How many control areas show non-compliance with best practices?",
      correctAnswer: { type: "numeric", value: 7, tolerance: 0 },
      points: 2,
      explanation: "7 areas are non-compliant: Base image source, Container privileges, Network policies, Secrets management, Image scanning, Resource limits, and Pod security policies. Only Docker runtime version appears acceptable."
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "Which vulnerability presents the highest immediate risk?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Containers running as root", isCorrect: true },
        { id: "opt2", order: 2, text: "Public Docker Hub images", isCorrect: false },
        { id: "opt3", order: 3, text: "Manual image scanning", isCorrect: false },
        { id: "opt4", order: 4, text: "Resource limits not configured", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Root containers pose the highest immediate risk as they allow container escape attacks that could compromise the host system."
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "What is the primary security concern with storing secrets in environment variables?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Environment variables are logged in container orchestration systems", isCorrect: true },
        { id: "opt2", order: 2, text: "Environment variables are encrypted by default", isCorrect: false },
        { id: "opt3", order: 3, text: "Environment variables cannot be accessed by applications", isCorrect: false },
        { id: "opt4", order: 4, text: "Environment variables expire automatically", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Environment variables often appear in logs, process listings, and orchestration dashboards, exposing secrets to unauthorized users."
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Which actions are recommended remediation priorities?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Non-root containers, default-deny network, secrets manager", isCorrect: true },
        { id: "opt2", order: 2, text: "Non-root containers, continue using Docker Hub", isCorrect: false },
        { id: "opt3", order: 3, text: "Default-deny network policies only", isCorrect: false },
        { id: "opt4", order: 4, text: "All listed options including Docker Hub", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "All three mitigations address critical security gaps. Public Docker Hub should be replaced with private registry with scanning."
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "What Kubernetes feature should be enabled to enforce container security policies?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Pod Security Standards/Pod Security Admission", isCorrect: true },
        { id: "opt2", order: 2, text: "Horizontal Pod Autoscaler", isCorrect: false },
        { id: "opt3", order: 3, text: "Ingress Controller", isCorrect: false },
        { id: "opt4", order: 4, text: "Service Mesh", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Pod Security Standards (replacing deprecated Pod Security Policies) enforce security contexts and restrict privileged operations."
    }
  ]
};

export const iscIAMPolicyTBS: TBSQuestion = {
  id: "tbs-isc-054",
  section: "ISC",
  tbsType: "document_review",
  topic: "Identity and Access Management",
  subtopic: "IAM Policy Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Cloud IAM Policy Review",
  scenarioText: "You are auditing the cloud IAM policies for a financial services organization. The security team has provided excerpts from their AWS IAM policies for review. Identify policy weaknesses and recommend improvements.",
  timeEstimateMinutes: 18,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "text",
      title: "Developer Role Policy",
      content: {
        type: "text",
        title: "Developer Role Policy",
        paragraphs: [
          "Policy Name: DeveloperFullAccess",
          "Effect: Allow",
          "Actions: ec2:*, s3:*, lambda:*, rds:*, iam:PassRole",
          "Resources: *",
          "Condition: None",
          "",
          "Attached to: 47 developer accounts",
          "Last reviewed: 18 months ago"
        ]
      }
    },
    {
      id: "ex2",
      order: 2,
      type: "text",
      title: "S3 Bucket Policy",
      content: {
        type: "text",
        title: "S3 Bucket Policy",
        paragraphs: [
          "Bucket: company-financial-data",
          "Policy Statement:",
          "Effect: Allow",
          "Principal: *",
          "Actions: s3:GetObject",
          "Resource: arn:aws:s3:::company-financial-data/*",
          "Condition: None"
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "dropdown",
      label: "What is the primary violation of least privilege in the Developer Role Policy?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Wildcard (*) on all actions and resources", isCorrect: true },
        { id: "opt2", order: 2, text: "Using ec2 permissions", isCorrect: false },
        { id: "opt3", order: 3, text: "Attaching to developer accounts", isCorrect: false },
        { id: "opt4", order: 4, text: "Including iam:PassRole", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Using wildcards for actions (ec2:*, s3:*, etc.) and resources (*) violates least privilege by granting far more access than needed."
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "What critical security risk does the S3 bucket policy introduce?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Public access to financial data via Principal: *", isCorrect: true },
        { id: "opt2", order: 2, text: "Using s3:GetObject action", isCorrect: false },
        { id: "opt3", order: 3, text: "Missing bucket versioning", isCorrect: false },
        { id: "opt4", order: 4, text: "No MFA requirement", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Principal: * allows anyone on the internet to read objects from this bucket containing financial data - a critical data exposure risk."
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "How many months overdue is the Developer Role policy for review (assuming annual reviews)?",
      correctAnswer: { type: "numeric", value: 6, tolerance: 0 },
      points: 2,
      explanation: "Last reviewed 18 months ago, with annual reviews required = 18 - 12 = 6 months overdue"
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Which combination of IAM policy improvements is recommended?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Role-based access, restricted S3 principals, MFA for privileged actions", isCorrect: true },
        { id: "opt2", order: 2, text: "Maintain wildcard permissions for flexibility", isCorrect: false },
        { id: "opt3", order: 3, text: "Role-based access only", isCorrect: false },
        { id: "opt4", order: 4, text: "All options including wildcards", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Role-based specific permissions, restricted S3 principals, and MFA are essential improvements. Wildcards should be eliminated."
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "Which AWS service can help identify unused permissions for right-sizing policies?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "IAM Access Analyzer", isCorrect: true },
        { id: "opt2", order: 2, text: "AWS Config", isCorrect: false },
        { id: "opt3", order: 3, text: "CloudWatch", isCorrect: false },
        { id: "opt4", order: 4, text: "VPC Flow Logs", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "IAM Access Analyzer identifies unused permissions and generates least-privilege policy recommendations based on actual usage."
    }
  ]
};

export const iscVulnManagementTBS: TBSQuestion = {
  id: "tbs-isc-055",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Vulnerability Management",
  subtopic: "Vulnerability Scoring and Prioritization",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Vulnerability Remediation Prioritization",
  scenarioText: "The IT security team has completed a vulnerability scan and needs to prioritize remediation efforts based on risk. Using CVSS scores and environmental factors, calculate risk-adjusted priority scores to determine remediation order.",
  timeEstimateMinutes: 15,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Vulnerability Scan Results",
      content: {
        type: "table",
        title: "Vulnerability Scan Results",
        headers: ["Vulnerability", "CVSS Base Score", "Asset Criticality (1-5)", "Internet Exposed", "Exploit Available"],
        rows: [
          { cells: ["CVE-2024-1234 - SQL Injection", "9.8", "5", "Yes", "Yes"] },
          { cells: ["CVE-2024-2345 - XSS", "6.1", "3", "Yes", "No"] },
          { cells: ["CVE-2024-3456 - RCE", "9.0", "4", "No", "Yes"] },
          { cells: ["CVE-2024-4567 - DoS", "7.5", "2", "No", "No"] },
          { cells: ["CVE-2024-5678 - Auth Bypass", "8.8", "5", "Yes", "Yes"] }
        ]
      }
    },
    {
      id: "ex2",
      order: 2,
      type: "text",
      title: "Priority Score Formula",
      content: {
        type: "text",
        title: "Priority Score Formula",
        paragraphs: [
          "Priority Score = CVSS × Asset Criticality × Exposure Multiplier × Exploit Multiplier",
          "",
          "Where:",
          "- Exposure Multiplier: Internet Exposed = 1.5, Not Exposed = 1.0",
          "- Exploit Multiplier: Exploit Available = 1.3, No Exploit = 1.0"
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Priority score for CVE-2024-1234 (SQL Injection)",
      correctAnswer: { type: "numeric", value: 95.55, tolerance: 0.5 },
      points: 2,
      explanation: "Score = 9.8 × 5 × 1.5 × 1.3 = 95.55"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Priority score for CVE-2024-3456 (RCE)",
      correctAnswer: { type: "numeric", value: 46.8, tolerance: 0.5 },
      points: 2,
      explanation: "Score = 9.0 × 4 × 1.0 × 1.3 = 46.8"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Priority score for CVE-2024-5678 (Auth Bypass)",
      correctAnswer: { type: "numeric", value: 85.8, tolerance: 0.5 },
      points: 2,
      explanation: "Score = 8.8 × 5 × 1.5 × 1.3 = 85.8"
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Which vulnerability should be remediated first?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "CVE-2024-1234 - SQL Injection", isCorrect: true },
        { id: "opt2", order: 2, text: "CVE-2024-3456 - RCE", isCorrect: false },
        { id: "opt3", order: 3, text: "CVE-2024-5678 - Auth Bypass", isCorrect: false },
        { id: "opt4", order: 4, text: "CVE-2024-2345 - XSS", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "SQL Injection has the highest priority score (95.55) due to critical CVSS, high asset criticality, internet exposure, and available exploit."
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "Priority score for CVE-2024-4567 (DoS)",
      correctAnswer: { type: "numeric", value: 15, tolerance: 0.5 },
      points: 2,
      explanation: "Score = 7.5 × 2 × 1.0 × 1.0 = 15"
    }
  ]
};

export const iscDLPControlsTBS: TBSQuestion = {
  id: "tbs-isc-056",
  section: "ISC",
  tbsType: "document_review",
  topic: "Data Protection",
  subtopic: "Data Loss Prevention",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "DLP Policy Effectiveness Assessment",
  scenarioText: "You are evaluating the effectiveness of an organization's Data Loss Prevention (DLP) controls. The IT security team has provided their DLP policy configuration and recent incident data for analysis.",
  timeEstimateMinutes: 16,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "DLP Policy Rules",
      content: {
        type: "table",
        title: "DLP Policy Rules",
        headers: ["Rule Name", "Data Pattern", "Channel", "Action", "Status"],
        rows: [
          { cells: ["Credit Card Detection", "16-digit card numbers", "Email, Web", "Block & Alert", "Active"] },
          { cells: ["SSN Detection", "XXX-XX-XXXX pattern", "Email only", "Alert only", "Active"] },
          { cells: ["Source Code", ".java, .py, .js files", "USB, Cloud", "Block & Alert", "Disabled"] },
          { cells: ["Medical Records", "PHI keywords", "All channels", "Block & Alert", "Active"] },
          { cells: ["Financial Reports", "Classified docs", "Email, USB", "Alert only", "Active"] }
        ]
      }
    },
    {
      id: "ex2",
      order: 2,
      type: "table",
      title: "DLP Incidents - Last 30 Days",
      content: {
        type: "table",
        title: "DLP Incidents - Last 30 Days",
        headers: ["Incident Type", "Blocked", "Alerted Only", "Channel"],
        rows: [
          { cells: ["Credit Card", "45", "0", "Email"] },
          { cells: ["SSN", "0", "128", "Email"] },
          { cells: ["Source Code", "0", "0", "USB/Cloud"] },
          { cells: ["Medical Records", "23", "0", "Web upload"] },
          { cells: ["Financial Reports", "0", "67", "Email"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Total number of DLP incidents blocked in the last 30 days",
      correctAnswer: { type: "numeric", value: 68, tolerance: 0 },
      points: 2,
      explanation: "Blocked incidents = 45 (Credit Card) + 0 (SSN) + 0 (Source Code) + 23 (Medical) + 0 (Financial) = 68"
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "Which DLP rule represents the greatest control gap?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Source Code rule - Disabled", isCorrect: true },
        { id: "opt2", order: 2, text: "SSN Detection - Alert only", isCorrect: false },
        { id: "opt3", order: 3, text: "Financial Reports - Alert only", isCorrect: false },
        { id: "opt4", order: 4, text: "Credit Card Detection - Block & Alert", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "The Source Code rule is completely disabled, providing zero protection for intellectual property via USB and cloud channels."
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "What percentage of SSN incidents were actually blocked?",
      correctAnswer: { type: "numeric", value: 0, tolerance: 0 },
      points: 2,
      explanation: "SSN rule is set to 'Alert only', so 0 out of 128 incidents (0%) were blocked."
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Which DLP policy improvements should be implemented?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Enable Source Code rule, block SSN, extend SSN to all channels", isCorrect: true },
        { id: "opt2", order: 2, text: "Disable Credit Card detection to reduce alerts", isCorrect: false },
        { id: "opt3", order: 3, text: "Enable Source Code rule only", isCorrect: false },
        { id: "opt4", order: 4, text: "No changes needed", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Source Code rule should be enabled, SSN should block (not just alert), and SSN detection should cover all exfiltration channels."
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "Total DLP incidents (blocked + alerted) in the last 30 days",
      correctAnswer: { type: "numeric", value: 263, tolerance: 0 },
      points: 2,
      explanation: "Total = (45+0) + (0+128) + (0+0) + (23+0) + (0+67) = 45 + 128 + 0 + 23 + 67 = 263"
    }
  ]
};

export const iscBCDRTestingTBS: TBSQuestion = {
  id: "tbs-isc-057",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Business Continuity",
  subtopic: "DR Testing and Metrics",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-I",
  title: "Disaster Recovery Test Results Analysis",
  scenarioText: "The IT department has completed their annual disaster recovery test. As part of the IT audit, you need to analyze the test results against the organization's defined recovery objectives to identify gaps and calculate recovery metrics.",
  timeEstimateMinutes: 18,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "DR Test Results vs. Objectives",
      content: {
        type: "table",
        title: "DR Test Results vs. Objectives",
        headers: ["System", "RTO Objective", "Actual Recovery", "RPO Objective", "Actual Data Loss"],
        rows: [
          { cells: ["ERP System", "4 hours", "6.5 hours", "1 hour", "45 minutes"] },
          { cells: ["Email", "2 hours", "1.5 hours", "15 minutes", "20 minutes"] },
          { cells: ["Website", "1 hour", "45 minutes", "5 minutes", "3 minutes"] },
          { cells: ["Database", "4 hours", "8 hours", "30 minutes", "2 hours"] },
          { cells: ["File Server", "8 hours", "12 hours", "24 hours", "18 hours"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "How many systems failed to meet their RTO objective?",
      correctAnswer: { type: "numeric", value: 3, tolerance: 0 },
      points: 2,
      explanation: "ERP (6.5 > 4), Database (8 > 4), and File Server (12 > 8) failed RTO. Email (1.5 < 2) and Website (0.75 < 1) met RTO."
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "How many systems failed to meet their RPO objective?",
      correctAnswer: { type: "numeric", value: 2, tolerance: 0 },
      points: 2,
      explanation: "Email (20 min > 15 min) and Database (2 hours > 30 min) failed RPO. Others met their objectives."
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "By how many hours did the ERP system exceed its RTO?",
      correctAnswer: { type: "numeric", value: 2.5, tolerance: 0.1 },
      points: 2,
      explanation: "ERP RTO variance = 6.5 - 4 = 2.5 hours"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Database RPO exceeded by how many minutes?",
      correctAnswer: { type: "numeric", value: 90, tolerance: 0 },
      points: 2,
      explanation: "Database: Actual 2 hours (120 min) - Objective 30 min = 90 minutes exceeded"
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "Which system has the most significant RTO gap relative to its objective?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "ERP System - 2.5 hours over", isCorrect: false },
        { id: "opt2", order: 2, text: "Database - 4 hours over", isCorrect: true },
        { id: "opt3", order: 3, text: "File Server - 4 hours over", isCorrect: false },
        { id: "opt4", order: 4, text: "Email - met objective", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt2" },
      points: 2,
      explanation: "Database is 4 hours over (8-4=4), same as File Server (12-8=4), but Database has 100% variance vs 50% for File Server, making it more significant relative to objective."
    }
  ]
};

export const iscSQLInjectionTBS: TBSQuestion = {
  id: "tbs-isc-058",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Application Security",
  subtopic: "Secure Coding Practices",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "ISC-III",
  title: "SQL Injection Vulnerability Assessment",
  scenarioText: "During a code review as part of the IT controls audit, you are examining database query code samples from a web application. Identify vulnerable code patterns and recommend secure alternatives.",
  timeEstimateMinutes: 18,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "text",
      title: "Code Sample A - User Authentication",
      content: {
        type: "text",
        title: "Code Sample A - User Authentication",
        paragraphs: [
          "// Authentication query",
          "String query = \"SELECT * FROM users WHERE username = '\" + username + \"' AND password = '\" + password + \"'\";",
          "ResultSet rs = statement.executeQuery(query);"
        ]
      }
    },
    {
      id: "ex2",
      order: 2,
      type: "text",
      title: "Code Sample B - Product Search",
      content: {
        type: "text",
        title: "Code Sample B - Product Search",
        paragraphs: [
          "// Product search with prepared statement",
          "String query = \"SELECT * FROM products WHERE category = ? AND price < ?\";",
          "PreparedStatement pstmt = connection.prepareStatement(query);",
          "pstmt.setString(1, category);",
          "pstmt.setDouble(2, maxPrice);",
          "ResultSet rs = pstmt.executeQuery();"
        ]
      }
    },
    {
      id: "ex3",
      order: 3,
      type: "text",
      title: "Code Sample C - Report Generation",
      content: {
        type: "text",
        title: "Code Sample C - Report Generation",
        paragraphs: [
          "// Dynamic report query",
          "String orderBy = request.getParameter(\"sort\");",
          "String query = \"SELECT * FROM sales WHERE year = 2024 ORDER BY \" + orderBy;",
          "ResultSet rs = statement.executeQuery(query);"
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "dropdown",
      label: "Which code sample is most vulnerable to SQL injection?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Code Sample A - String concatenation with user input", isCorrect: true },
        { id: "opt2", order: 2, text: "Code Sample B - Prepared statement with parameters", isCorrect: false },
        { id: "opt3", order: 3, text: "Code Sample C - Dynamic ORDER BY clause", isCorrect: false },
        { id: "opt4", order: 4, text: "All samples are equally secure", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Sample A directly concatenates username and password inputs into the query, allowing full SQL injection attacks including authentication bypass."
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "Which code sample follows secure coding practices?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Code Sample A", isCorrect: false },
        { id: "opt2", order: 2, text: "Code Sample B", isCorrect: true },
        { id: "opt3", order: 3, text: "Code Sample C", isCorrect: false },
        { id: "opt4", order: 4, text: "None of the samples", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt2" },
      points: 2,
      explanation: "Sample B uses parameterized queries (PreparedStatement with ? placeholders), which is the correct defense against SQL injection."
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "What attack could succeed against Code Sample A?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Entering ' OR '1'='1 as username to bypass authentication", isCorrect: true },
        { id: "opt2", order: 2, text: "Cross-site scripting (XSS)", isCorrect: false },
        { id: "opt3", order: 3, text: "Buffer overflow attack", isCorrect: false },
        { id: "opt4", order: 4, text: "Denial of service attack", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "The classic SQL injection ' OR '1'='1 makes the WHERE clause always true, bypassing authentication entirely."
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Which vulnerabilities apply to Code Sample C?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "ORDER BY injection, unsanitized input, UNION injection risk", isCorrect: true },
        { id: "opt2", order: 2, text: "Uses prepared statements with parameters", isCorrect: false },
        { id: "opt3", order: 3, text: "ORDER BY injection only", isCorrect: false },
        { id: "opt4", order: 4, text: "No vulnerabilities present", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Sample C is vulnerable because ORDER BY clause uses unsanitized input. Attackers can inject additional SQL or use techniques like blind SQL injection."
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "How many code samples have SQL injection vulnerabilities?",
      correctAnswer: { type: "numeric", value: 2, tolerance: 0 },
      points: 2,
      explanation: "Samples A and C are vulnerable. Only Sample B uses proper parameterized queries."
    }
  ]
};

export const iscFirewallAnalysisTBS: TBSQuestion = {
  id: "tbs-isc-059",
  section: "ISC",
  tbsType: "document_review",
  topic: "Network Security",
  subtopic: "Firewall Rules and Network Segmentation",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Firewall Rule Analysis",
  scenarioText: "You are reviewing the organization's firewall rules as part of the IT controls audit. The network security team has provided a subset of their firewall ruleset for the DMZ segment. Analyze the rules for security weaknesses and compliance issues.",
  timeEstimateMinutes: 16,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "DMZ Firewall Rules",
      content: {
        type: "table",
        title: "DMZ Firewall Rules",
        headers: ["Rule #", "Source", "Destination", "Port/Protocol", "Action", "Last Hit"],
        rows: [
          { cells: ["1", "Any", "Web Server", "443/TCP", "Allow", "Today"] },
          { cells: ["2", "Any", "Web Server", "80/TCP", "Allow", "Today"] },
          { cells: ["3", "Any", "Any", "Any", "Allow", "6 months ago"] },
          { cells: ["4", "DMZ", "Internal DB", "1433/TCP", "Allow", "Today"] },
          { cells: ["5", "Any", "Mail Server", "25/TCP", "Allow", "Today"] },
          { cells: ["6", "Internal", "DMZ", "22/TCP", "Allow", "Today"] },
          { cells: ["7", "Any", "Web Server", "23/TCP", "Allow", "Never"] },
          { cells: ["8", "Any", "Any", "Any", "Deny", "Always"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "dropdown",
      label: "Which rule represents the most critical security violation?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Rule 3 - Any to Any Allow", isCorrect: true },
        { id: "opt2", order: 2, text: "Rule 4 - DMZ to Internal DB", isCorrect: false },
        { id: "opt3", order: 3, text: "Rule 7 - Telnet allowed", isCorrect: false },
        { id: "opt4", order: 4, text: "Rule 5 - SMTP allowed", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Rule 3 allows Any source to Any destination on Any port, completely bypassing firewall protection."
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "Why is Rule 7 (Telnet) a security concern even though it has never been hit?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Telnet transmits credentials in cleartext", isCorrect: true },
        { id: "opt2", order: 2, text: "Telnet uses too much bandwidth", isCorrect: false },
        { id: "opt3", order: 3, text: "Telnet is faster than SSH", isCorrect: false },
        { id: "opt4", order: 4, text: "Rule has never been used so no concern", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Telnet transmits all data including passwords in cleartext, making it vulnerable to eavesdropping. SSH should be used instead."
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "Which firewall rules should be removed or modified?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Rule 3 (Any-Any), Rule 7 (Telnet), Rule 4 (DMZ-DB)", isCorrect: true },
        { id: "opt2", order: 2, text: "Rule 1 (HTTPS access)", isCorrect: false },
        { id: "opt3", order: 3, text: "Rule 3 only", isCorrect: false },
        { id: "opt4", order: 4, text: "No rules need modification", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 3,
      explanation: "Rule 3 is overly permissive, Rule 7 allows insecure protocol, Rule 4 allows DMZ to internal DB which violates segmentation principles."
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "How many rules allow access from 'Any' source?",
      correctAnswer: { type: "numeric", value: 5, tolerance: 0 },
      points: 1,
      explanation: "Rules 1, 2, 3, 5, and 7 all have 'Any' as source = 5 rules"
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "What security principle does Rule 4 potentially violate?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Network segmentation - DMZ should not directly access internal databases", isCorrect: true },
        { id: "opt2", order: 2, text: "Encryption in transit", isCorrect: false },
        { id: "opt3", order: 3, text: "Multi-factor authentication", isCorrect: false },
        { id: "opt4", order: 4, text: "Password complexity", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "DMZ servers should not have direct database access. A web application firewall or API gateway in a separate tier should mediate access."
    }
  ]
};

export const iscITGCChangeMetricsTBS: TBSQuestion = {
  id: "tbs-isc-060",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "IT General Controls",
  subtopic: "Change Management",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Change Management Compliance Metrics",
  scenarioText: "You are assessing the organization's IT change management process as part of the ITGC audit. The change management team has provided metrics on their change requests for the quarter. Analyze the data to evaluate process compliance and effectiveness.",
  timeEstimateMinutes: 14,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Q4 Change Management Metrics",
      content: {
        type: "table",
        title: "Q4 Change Management Metrics",
        headers: ["Metric", "Standard Changes", "Normal Changes", "Emergency Changes"],
        rows: [
          { cells: ["Total changes requested", "245", "180", "35"] },
          { cells: ["Changes approved", "240", "165", "32"] },
          { cells: ["Changes with proper documentation", "238", "155", "18"] },
          { cells: ["Changes tested before deployment", "235", "160", "12"] },
          { cells: ["Changes with post-implementation review", "220", "145", "8"] },
          { cells: ["Failed changes (rolled back)", "5", "12", "8"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Total number of changes requested in Q4",
      correctAnswer: { type: "numeric", value: 460, tolerance: 0 },
      points: 2,
      explanation: "Total = 245 + 180 + 35 = 460 changes"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Overall change approval rate (as percentage)",
      correctAnswer: { type: "numeric", value: 95, tolerance: 0.5 },
      points: 2,
      explanation: "Approval rate = (240 + 165 + 32) / (245 + 180 + 35) = 437 / 460 = 95%"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Percentage of emergency changes with proper documentation",
      correctAnswer: { type: "numeric", value: 51.4, tolerance: 1 },
      points: 2,
      explanation: "Emergency documentation rate = 18 / 35 = 51.4%"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Total number of failed changes across all categories",
      correctAnswer: { type: "numeric", value: 25, tolerance: 0 },
      points: 2,
      explanation: "Failed changes = 5 + 12 + 8 = 25"
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "Which change category shows the weakest compliance with change management controls?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Standard Changes", isCorrect: false },
        { id: "opt2", order: 2, text: "Normal Changes", isCorrect: false },
        { id: "opt3", order: 3, text: "Emergency Changes", isCorrect: true },
        { id: "opt4", order: 4, text: "All categories show equal compliance", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt3" },
      points: 2,
      explanation: "Emergency changes show lowest documentation (51%), testing (34%), post-implementation review (23%), and highest failure rate (23%)."
    }
  ]
};

// Add Batch 1 questions to the export array
iscTBSQuestions.push(
  iscCertificateManagementTBS,
  iscSIEMAnalysisTBS,
  iscContainerSecurityTBS,
  iscIAMPolicyTBS,
  iscVulnManagementTBS,
  iscDLPControlsTBS,
  iscBCDRTestingTBS,
  iscSQLInjectionTBS,
  iscFirewallAnalysisTBS,
  iscITGCChangeMetricsTBS
);

// ============================================================
// ISC BATCH 2 - Questions 061-070
// ============================================================

export const iscAccessReviewTBS: TBSQuestion = {
  id: "tbs-isc-061",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Identity and Access Management",
  subtopic: "User Access Reviews",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "User Access Review Compliance Analysis",
  scenarioText: "You are auditing the organization's user access review process. The IT security team conducts quarterly access reviews and has provided summary data for the past year. Analyze the access review metrics to assess compliance and identify areas for improvement.",
  timeEstimateMinutes: 15,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Quarterly Access Review Results",
      content: {
        type: "table",
        title: "Quarterly Access Review Results",
        headers: ["Quarter", "Accounts Reviewed", "Exceptions Found", "Exceptions Remediated", "Days to Complete"],
        rows: [
          { cells: ["Q1", "2,450", "185", "170", "42"] },
          { cells: ["Q2", "2,520", "210", "195", "38"] },
          { cells: ["Q3", "2,480", "225", "180", "55"] },
          { cells: ["Q4", "2,550", "195", "190", "35"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Total accounts reviewed across all quarters",
      correctAnswer: { type: "numeric", value: 10000, tolerance: 0 },
      points: 2,
      explanation: "Total = 2,450 + 2,520 + 2,480 + 2,550 = 10,000 accounts"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Overall exception remediation rate (as percentage)",
      correctAnswer: { type: "numeric", value: 90.2, tolerance: 0.5 },
      points: 2,
      explanation: "Total exceptions = 815, Total remediated = 735. Rate = 735/815 × 100 = 90.2%"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Average days to complete access reviews",
      correctAnswer: { type: "numeric", value: 42.5, tolerance: 0.5 },
      points: 2,
      explanation: "Average = (42 + 38 + 55 + 35) / 4 = 170 / 4 = 42.5 days"
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Which quarter had the weakest access review performance?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Q1", isCorrect: false },
        { id: "opt2", order: 2, text: "Q2", isCorrect: false },
        { id: "opt3", order: 3, text: "Q3", isCorrect: true },
        { id: "opt4", order: 4, text: "Q4", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt3" },
      points: 2,
      explanation: "Q3 had lowest remediation rate (180/225 = 80%) and longest completion time (55 days)."
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "How many exceptions remain unremediated from Q3?",
      correctAnswer: { type: "numeric", value: 45, tolerance: 0 },
      points: 2,
      explanation: "Q3 unremediated = 225 - 180 = 45 exceptions"
    }
  ]
};

export const iscMFAImplementationTBS: TBSQuestion = {
  id: "tbs-isc-062",
  section: "ISC",
  tbsType: "document_review",
  topic: "Authentication",
  subtopic: "Multi-Factor Authentication",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "MFA Coverage Assessment",
  scenarioText: "The organization is implementing multi-factor authentication (MFA) across all systems. You are reviewing the current MFA deployment status to identify coverage gaps and prioritize remaining implementations.",
  timeEstimateMinutes: 16,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "MFA Implementation Status",
      content: {
        type: "table",
        title: "MFA Implementation Status",
        headers: ["System", "Users", "MFA Enabled", "MFA Method", "Risk Level"],
        rows: [
          { cells: ["Corporate VPN", "3,500", "Yes", "Hardware Token", "High"] },
          { cells: ["Email (O365)", "4,200", "Yes", "Authenticator App", "High"] },
          { cells: ["HR System", "850", "No", "N/A", "High"] },
          { cells: ["CRM Application", "1,200", "Yes", "SMS", "Medium"] },
          { cells: ["Financial System", "450", "No", "N/A", "Critical"] },
          { cells: ["Development Portal", "280", "Yes", "Authenticator App", "Medium"] },
          { cells: ["Admin Consoles", "45", "Yes", "Hardware Token", "Critical"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Total number of users without MFA protection",
      correctAnswer: { type: "numeric", value: 1300, tolerance: 0 },
      points: 2,
      explanation: "Users without MFA = HR System (850) + Financial System (450) = 1,300 users"
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "Which system represents the highest priority for MFA implementation?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "HR System - High risk, no MFA", isCorrect: false },
        { id: "opt2", order: 2, text: "Financial System - Critical risk, no MFA", isCorrect: true },
        { id: "opt3", order: 3, text: "CRM Application - Medium risk, SMS MFA", isCorrect: false },
        { id: "opt4", order: 4, text: "Development Portal - Medium risk", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt2" },
      points: 2,
      explanation: "Financial System is Critical risk with no MFA, making it highest priority."
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "Which MFA method is considered weakest against phishing attacks?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Hardware Token", isCorrect: false },
        { id: "opt2", order: 2, text: "Authenticator App", isCorrect: false },
        { id: "opt3", order: 3, text: "SMS", isCorrect: true },
        { id: "opt4", order: 4, text: "All methods are equally secure", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt3" },
      points: 2,
      explanation: "SMS is vulnerable to SIM swapping and interception attacks, making it the weakest MFA method."
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Percentage of total users with MFA enabled",
      correctAnswer: { type: "numeric", value: 87.6, tolerance: 0.5 },
      points: 2,
      explanation: "Total users = 10,525. With MFA = 9,225. Rate = 9,225/10,525 × 100 = 87.6%"
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "How many systems use Hardware Token as MFA method?",
      correctAnswer: { type: "numeric", value: 2, tolerance: 0 },
      points: 2,
      explanation: "Corporate VPN and Admin Consoles use Hardware Token = 2 systems"
    }
  ]
};

export const iscLogRetentionTBS: TBSQuestion = {
  id: "tbs-isc-063",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Security Monitoring",
  subtopic: "Log Management",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Log Retention Compliance Analysis",
  scenarioText: "You are reviewing the organization's log retention practices against regulatory requirements. The IT team has provided their current log retention configuration for various system types. Evaluate compliance with the 7-year retention requirement for financial systems and 1-year for general systems.",
  timeEstimateMinutes: 12,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Log Retention Configuration",
      content: {
        type: "table",
        title: "Log Retention Configuration",
        headers: ["Log Type", "System Category", "Current Retention", "Required Retention", "Daily Volume (GB)"],
        rows: [
          { cells: ["Authentication Logs", "Financial", "5 years", "7 years", "2.5"] },
          { cells: ["Transaction Logs", "Financial", "7 years", "7 years", "8.2"] },
          { cells: ["Access Logs", "General", "6 months", "1 year", "15.0"] },
          { cells: ["Firewall Logs", "Security", "2 years", "1 year", "45.0"] },
          { cells: ["Database Audit", "Financial", "7 years", "7 years", "4.8"] },
          { cells: ["Application Logs", "General", "1 year", "1 year", "12.5"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "How many log types are non-compliant with retention requirements?",
      correctAnswer: { type: "numeric", value: 2, tolerance: 0 },
      points: 2,
      explanation: "Authentication Logs (5yr < 7yr required) and Access Logs (6mo < 1yr required) are non-compliant."
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Total daily log volume in GB",
      correctAnswer: { type: "numeric", value: 88, tolerance: 0.5 },
      points: 2,
      explanation: "Total = 2.5 + 8.2 + 15.0 + 45.0 + 4.8 + 12.5 = 88.0 GB"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Annual storage required for financial system logs in TB (assume 365 days)",
      correctAnswer: { type: "numeric", value: 5.66, tolerance: 0.1 },
      points: 2,
      explanation: "Financial logs = (2.5 + 8.2 + 4.8) × 365 = 15.5 × 365 = 5,657.5 GB = 5.66 TB"
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Which non-compliant log type poses the greater regulatory risk?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Authentication Logs - Financial system, 2 years short", isCorrect: true },
        { id: "opt2", order: 2, text: "Access Logs - General system, 6 months short", isCorrect: false },
        { id: "opt3", order: 3, text: "Both pose equal risk", isCorrect: false },
        { id: "opt4", order: 4, text: "Neither poses significant risk", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Authentication logs for financial systems have stricter regulatory requirements and longer gap (2 years vs 6 months)."
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "How many additional years of retention are needed for Authentication Logs?",
      correctAnswer: { type: "numeric", value: 2, tolerance: 0 },
      points: 2,
      explanation: "Required 7 years - Current 5 years = 2 additional years needed"
    }
  ]
};

export const iscPenTestResultsTBS: TBSQuestion = {
  id: "tbs-isc-064",
  section: "ISC",
  tbsType: "document_review",
  topic: "Security Testing",
  subtopic: "Penetration Testing",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "ISC-III",
  title: "Penetration Test Findings Analysis",
  scenarioText: "The organization recently completed an annual penetration test. As part of the IT audit, you are reviewing the findings to assess the security posture and evaluate management's remediation plans.",
  timeEstimateMinutes: 18,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Penetration Test Findings Summary",
      content: {
        type: "table",
        title: "Penetration Test Findings Summary",
        headers: ["Finding ID", "Vulnerability", "CVSS Score", "Exploited", "Remediation Status"],
        rows: [
          { cells: ["PT-001", "Default admin credentials on network device", "9.8", "Yes", "In Progress"] },
          { cells: ["PT-002", "Unpatched Apache Struts (RCE)", "9.0", "Yes", "Remediated"] },
          { cells: ["PT-003", "SQL injection in web application", "8.5", "Yes", "Not Started"] },
          { cells: ["PT-004", "Weak TLS configuration", "5.3", "No", "Remediated"] },
          { cells: ["PT-005", "Missing HTTP security headers", "4.3", "No", "Not Started"] },
          { cells: ["PT-006", "Exposed internal API endpoints", "7.5", "Yes", "In Progress"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "How many critical/high severity findings (CVSS >= 7.0)?",
      correctAnswer: { type: "numeric", value: 4, tolerance: 0 },
      points: 2,
      explanation: "PT-001 (9.8), PT-002 (9.0), PT-003 (8.5), PT-006 (7.5) = 4 findings with CVSS >= 7.0"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "What percentage of findings were successfully exploited?",
      correctAnswer: { type: "numeric", value: 66.7, tolerance: 1 },
      points: 2,
      explanation: "Exploited = 4 out of 6 = 66.7%"
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "Which unremediated finding presents the highest risk?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "PT-001 - Default credentials (CVSS 9.8, In Progress)", isCorrect: false },
        { id: "opt2", order: 2, text: "PT-003 - SQL injection (CVSS 8.5, Not Started)", isCorrect: true },
        { id: "opt3", order: 3, text: "PT-005 - Missing headers (CVSS 4.3, Not Started)", isCorrect: false },
        { id: "opt4", order: 4, text: "PT-006 - Exposed APIs (CVSS 7.5, In Progress)", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt2" },
      points: 2,
      explanation: "PT-003 has high CVSS (8.5), was exploited, and remediation hasn't started, making it highest risk among unremediated items."
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "How many findings have remediation not yet started?",
      correctAnswer: { type: "numeric", value: 2, tolerance: 0 },
      points: 2,
      explanation: "PT-003 and PT-005 have 'Not Started' status = 2 findings"
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "What is the appropriate audit response to the unremediated SQL injection?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Issue finding with immediate remediation requirement", isCorrect: true },
        { id: "opt2", order: 2, text: "Accept the risk as low priority", isCorrect: false },
        { id: "opt3", order: 3, text: "Wait for next year's penetration test", isCorrect: false },
        { id: "opt4", order: 4, text: "Recommend deprecating the application", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "SQL injection with CVSS 8.5 that was exploited requires immediate remediation action and should be escalated."
    }
  ]
};

export const iscThirdPartySOCTBS: TBSQuestion = {
  id: "tbs-isc-065",
  section: "ISC",
  tbsType: "document_review",
  topic: "Third Party Risk",
  subtopic: "SOC Report Analysis",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "ISC-I",
  title: "Service Organization SOC 2 Report Review",
  scenarioText: "You are reviewing a SOC 2 Type II report from a critical cloud service provider that hosts the organization's customer data. Evaluate the report for any exceptions or concerns that should be addressed.",
  timeEstimateMinutes: 20,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "text",
      title: "SOC 2 Report Summary",
      content: {
        type: "text",
        title: "SOC 2 Report Summary",
        paragraphs: [
          "Report Type: SOC 2 Type II",
          "Trust Service Categories: Security, Availability, Confidentiality",
          "Examination Period: January 1 - December 31, 2024",
          "Report Date: February 15, 2025",
          "Auditor Opinion: Qualified",
          "",
          "Control Exceptions Noted:",
          "1. Access reviews not completed within 90-day requirement for 2 of 4 quarters",
          "2. One backup restoration test failed during the period",
          "3. Security awareness training completion rate was 78% (below 95% threshold)"
        ]
      }
    },
    {
      id: "ex2",
      order: 2,
      type: "table",
      title: "Complementary User Entity Controls",
      content: {
        type: "table",
        title: "Complementary User Entity Controls",
        headers: ["Control", "Responsibility", "Status at Your Organization"],
        rows: [
          { cells: ["User access provisioning/deprovisioning", "User Entity", "Implemented"] },
          { cells: ["Password complexity requirements", "User Entity", "Implemented"] },
          { cells: ["Monitoring of user activity logs", "User Entity", "Not Implemented"] },
          { cells: ["Encryption of data before transmission", "User Entity", "Implemented"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "dropdown",
      label: "What does the qualified opinion indicate?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Controls operated effectively with noted exceptions", isCorrect: true },
        { id: "opt2", order: 2, text: "All controls operated effectively", isCorrect: false },
        { id: "opt3", order: 3, text: "Controls were not tested", isCorrect: false },
        { id: "opt4", order: 4, text: "Service organization should not be used", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "A qualified opinion indicates controls generally operated effectively but with specific exceptions noted."
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "How many control exceptions were noted in the report?",
      correctAnswer: { type: "numeric", value: 3, tolerance: 0 },
      points: 2,
      explanation: "Three exceptions: access reviews timing, backup test failure, and training completion rate."
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "Which complementary user entity control gap poses the greatest risk?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Monitoring of user activity logs - Not Implemented", isCorrect: true },
        { id: "opt2", order: 2, text: "Password complexity - Implemented", isCorrect: false },
        { id: "opt3", order: 3, text: "Encryption before transmission - Implemented", isCorrect: false },
        { id: "opt4", order: 4, text: "Access provisioning - Implemented", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "User activity log monitoring is not implemented, reducing ability to detect unauthorized access."
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Security awareness training completion gap (percentage points below threshold)",
      correctAnswer: { type: "numeric", value: 17, tolerance: 0 },
      points: 2,
      explanation: "Gap = 95% threshold - 78% actual = 17 percentage points"
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "Is this SOC report still within its useful period for reliance?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Yes, report is less than 12 months old", isCorrect: true },
        { id: "opt2", order: 2, text: "No, report has expired", isCorrect: false },
        { id: "opt3", order: 3, text: "Cannot determine from information provided", isCorrect: false },
        { id: "opt4", order: 4, text: "SOC 2 reports never expire", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Report dated Feb 2025 covering through Dec 2024 is within the typical 12-month reliance period."
    }
  ]
};

export const iscEncryptionStandardsTBS: TBSQuestion = {
  id: "tbs-isc-066",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Cryptography",
  subtopic: "Encryption Standards",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Encryption Standards Compliance Review",
  scenarioText: "You are assessing the organization's encryption implementations against current security standards. The IT team has provided their current encryption configurations for various use cases.",
  timeEstimateMinutes: 14,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Current Encryption Configuration",
      content: {
        type: "table",
        title: "Current Encryption Configuration",
        headers: ["Use Case", "Algorithm", "Key Length", "Protocol/Mode"],
        rows: [
          { cells: ["Data at Rest (Database)", "AES", "256-bit", "GCM"] },
          { cells: ["Data in Transit (Web)", "TLS", "1.2", "ECDHE-RSA"] },
          { cells: ["File Encryption", "3DES", "168-bit", "CBC"] },
          { cells: ["Email Encryption", "RSA", "2048-bit", "PKCS#1 v1.5"] },
          { cells: ["Password Storage", "SHA-1", "N/A", "Salted"] },
          { cells: ["API Authentication", "HMAC", "SHA-256", "Token-based"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "dropdown",
      label: "Which encryption configuration is deprecated and should be replaced immediately?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "File Encryption - 3DES is deprecated", isCorrect: true },
        { id: "opt2", order: 2, text: "Data at Rest - AES-256 is deprecated", isCorrect: false },
        { id: "opt3", order: 3, text: "Data in Transit - TLS 1.2 is deprecated", isCorrect: false },
        { id: "opt4", order: 4, text: "API Authentication - HMAC-SHA256 is deprecated", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "3DES (Triple DES) is officially deprecated by NIST as of 2023 and should be replaced with AES."
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "What is the critical vulnerability in the Password Storage configuration?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "SHA-1 is cryptographically weak for password hashing", isCorrect: true },
        { id: "opt2", order: 2, text: "Salt is not needed for passwords", isCorrect: false },
        { id: "opt3", order: 3, text: "SHA-1 is the strongest hash algorithm", isCorrect: false },
        { id: "opt4", order: 4, text: "Configuration is secure as-is", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "SHA-1 is cryptographically broken and not suitable for password hashing. Should use bcrypt, scrypt, or Argon2."
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "How many encryption configurations meet current best practices?",
      correctAnswer: { type: "numeric", value: 3, tolerance: 0 },
      points: 2,
      explanation: "AES-256-GCM, TLS 1.2 with ECDHE, and HMAC-SHA256 meet current standards. 3DES, SHA-1, and RSA PKCS#1 v1.5 do not."
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "What should replace SHA-1 for password storage?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "bcrypt, scrypt, or Argon2", isCorrect: true },
        { id: "opt2", order: 2, text: "MD5 with salt", isCorrect: false },
        { id: "opt3", order: 3, text: "SHA-256 alone", isCorrect: false },
        { id: "opt4", order: 4, text: "AES-256 encryption", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Password-specific hashing algorithms like bcrypt, scrypt, or Argon2 are designed to be slow and resistant to brute-force attacks."
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "Which RSA padding scheme would be more secure for email encryption?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "OAEP (Optimal Asymmetric Encryption Padding)", isCorrect: true },
        { id: "opt2", order: 2, text: "PKCS#1 v1.5 is already optimal", isCorrect: false },
        { id: "opt3", order: 3, text: "No padding is needed", isCorrect: false },
        { id: "opt4", order: 4, text: "ECB mode padding", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "OAEP is more secure than PKCS#1 v1.5 as it's resistant to padding oracle attacks."
    }
  ]
};

export const iscCloudConfigTBS: TBSQuestion = {
  id: "tbs-isc-067",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Cloud Security",
  subtopic: "Cloud Security Posture",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-III",
  title: "Cloud Security Configuration Assessment",
  scenarioText: "You are reviewing the organization's cloud security posture using output from a cloud security posture management (CSPM) tool. Analyze the findings to prioritize remediation efforts.",
  timeEstimateMinutes: 16,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "CSPM Findings Summary",
      content: {
        type: "table",
        title: "CSPM Findings Summary",
        headers: ["Finding Category", "Critical", "High", "Medium", "Low"],
        rows: [
          { cells: ["Identity & Access", "3", "12", "25", "40"] },
          { cells: ["Network Security", "5", "8", "18", "22"] },
          { cells: ["Data Protection", "2", "6", "15", "30"] },
          { cells: ["Logging & Monitoring", "0", "4", "12", "18"] },
          { cells: ["Compute Security", "1", "9", "20", "35"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Total number of Critical severity findings",
      correctAnswer: { type: "numeric", value: 11, tolerance: 0 },
      points: 2,
      explanation: "Critical = 3 + 5 + 2 + 0 + 1 = 11 findings"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Total number of High and Critical findings combined",
      correctAnswer: { type: "numeric", value: 50, tolerance: 0 },
      points: 2,
      explanation: "Critical (11) + High (12+8+6+4+9 = 39) = 11 + 39 = 50 findings"
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "Which category should be prioritized first for remediation?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Network Security - 5 Critical findings", isCorrect: true },
        { id: "opt2", order: 2, text: "Identity & Access - 3 Critical findings", isCorrect: false },
        { id: "opt3", order: 3, text: "Data Protection - 2 Critical findings", isCorrect: false },
        { id: "opt4", order: 4, text: "Compute Security - 1 Critical finding", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Network Security has the highest number of Critical findings (5), making it the top priority."
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Total findings across all categories and severities",
      correctAnswer: { type: "numeric", value: 285, tolerance: 0 },
      points: 2,
      explanation: "Identity (80) + Network (53) + Data (53) + Logging (34) + Compute (65) = 285 findings"
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "What percentage of Identity & Access findings are High or Critical?",
      correctAnswer: { type: "numeric", value: 18.75, tolerance: 0.5 },
      points: 2,
      explanation: "Identity total = 80, High+Critical = 15. Percentage = 15/80 × 100 = 18.75%"
    }
  ]
};

export const iscSecurityIncidentTBS: TBSQuestion = {
  id: "tbs-isc-068",
  section: "ISC",
  tbsType: "document_review",
  topic: "Incident Response",
  subtopic: "Security Incident Analysis",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "ISC-I",
  title: "Security Incident Timeline Analysis",
  scenarioText: "A security incident was detected and the incident response team has documented the timeline. As part of the post-incident review, analyze the response effectiveness against industry benchmarks.",
  timeEstimateMinutes: 18,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Incident Timeline",
      content: {
        type: "table",
        title: "Incident Timeline",
        headers: ["Event", "Timestamp", "Action Taken"],
        rows: [
          { cells: ["Initial compromise (phishing)", "Mon 09:15 AM", "Employee clicked malicious link"] },
          { cells: ["Malware execution", "Mon 09:18 AM", "Credential harvester installed"] },
          { cells: ["Lateral movement detected", "Mon 02:45 PM", "Attacker accessed file server"] },
          { cells: ["SIEM alert generated", "Mon 03:12 PM", "Anomalous behavior detected"] },
          { cells: ["SOC analyst review", "Mon 04:30 PM", "Alert triaged as potential incident"] },
          { cells: ["Incident declared", "Mon 05:15 PM", "IR team activated"] },
          { cells: ["Containment initiated", "Mon 06:00 PM", "Affected systems isolated"] },
          { cells: ["Containment complete", "Mon 08:30 PM", "All compromised systems contained"] },
          { cells: ["Eradication complete", "Tue 11:00 AM", "Malware removed, credentials reset"] },
          { cells: ["Recovery complete", "Tue 04:00 PM", "Systems restored to production"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Time from initial compromise to detection (in hours)",
      correctAnswer: { type: "numeric", value: 5.95, tolerance: 0.1 },
      points: 2,
      explanation: "From 09:15 to 03:12 = 5 hours 57 minutes ≈ 5.95 hours"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Time from detection to containment initiation (in minutes)",
      correctAnswer: { type: "numeric", value: 168, tolerance: 5 },
      points: 2,
      explanation: "From 03:12 PM to 06:00 PM = 2 hours 48 minutes = 168 minutes"
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "What phase took the longest during this incident?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Detection (compromise to SIEM alert)", isCorrect: true },
        { id: "opt2", order: 2, text: "Triage (SIEM alert to incident declared)", isCorrect: false },
        { id: "opt3", order: 3, text: "Containment (initiated to complete)", isCorrect: false },
        { id: "opt4", order: 4, text: "Recovery (eradication to recovery)", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Detection took ~6 hours (9:15 to 3:12), longer than other phases."
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Total incident duration from compromise to recovery (in hours)",
      correctAnswer: { type: "numeric", value: 30.75, tolerance: 0.5 },
      points: 2,
      explanation: "From Mon 09:15 AM to Tue 04:00 PM = 30 hours 45 minutes ≈ 30.75 hours"
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "Which control improvement would most reduce future incident impact?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Improved email filtering and user awareness training", isCorrect: true },
        { id: "opt2", order: 2, text: "Faster recovery procedures", isCorrect: false },
        { id: "opt3", order: 3, text: "More SOC analysts for faster triage", isCorrect: false },
        { id: "opt4", order: 4, text: "Better malware removal tools", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "The root cause was a phishing email. Preventing the initial compromise through better email security and training would eliminate the incident entirely."
    }
  ]
};

export const iscDataMaskingTBS: TBSQuestion = {
  id: "tbs-isc-069",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Data Protection",
  subtopic: "Data Masking and Tokenization",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-II",
  title: "Data Protection Technique Selection",
  scenarioText: "The organization needs to implement data protection controls for various use cases. Evaluate the proposed techniques and recommend appropriate solutions based on the requirements.",
  timeEstimateMinutes: 14,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Data Protection Requirements",
      content: {
        type: "table",
        title: "Data Protection Requirements",
        headers: ["Use Case", "Data Type", "Requirement", "Proposed Technique"],
        rows: [
          { cells: ["Development Testing", "Production Customer Data", "Data must be realistic but not reversible", "Dynamic Masking"] },
          { cells: ["Payment Processing", "Credit Card Numbers", "Must support original value retrieval for transactions", "Format-Preserving Encryption"] },
          { cells: ["Analytics Dashboard", "Social Security Numbers", "Hide from unauthorized viewers in real-time", "Static Masking"] },
          { cells: ["Data Warehouse", "Medical Records", "Permanent de-identification for research", "Tokenization"] },
          { cells: ["Customer Service Display", "Account Numbers", "Partial visibility (last 4 digits)", "Truncation/Redaction"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "dropdown",
      label: "Is the proposed technique correct for Development Testing?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "No - Static masking should be used for non-reversible test data", isCorrect: true },
        { id: "opt2", order: 2, text: "Yes - Dynamic masking is appropriate", isCorrect: false },
        { id: "opt3", order: 3, text: "No - Encryption should be used", isCorrect: false },
        { id: "opt4", order: 4, text: "No - Tokenization is required", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Static masking permanently replaces data, which is appropriate for test environments. Dynamic masking is for real-time viewing restrictions."
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "Is Format-Preserving Encryption correct for Payment Processing?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Yes - FPE allows reversible protection while maintaining format", isCorrect: true },
        { id: "opt2", order: 2, text: "No - Tokenization should be used", isCorrect: false },
        { id: "opt3", order: 3, text: "No - Dynamic masking is better", isCorrect: false },
        { id: "opt4", order: 4, text: "No - Static masking is required", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "FPE maintains the 16-digit format needed for processing while allowing decryption for actual transactions."
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "What technique should replace the Analytics Dashboard proposal?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Dynamic Masking - for real-time access control", isCorrect: true },
        { id: "opt2", order: 2, text: "Static Masking is correct as proposed", isCorrect: false },
        { id: "opt3", order: 3, text: "Tokenization - for lookup capability", isCorrect: false },
        { id: "opt4", order: 4, text: "Full Encryption - for security", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Dynamic masking applies rules in real-time based on user authorization, hiding data from unauthorized viewers while allowing authorized access."
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "How many proposed techniques are correctly matched to their use case?",
      correctAnswer: { type: "numeric", value: 2, tolerance: 0 },
      points: 2,
      explanation: "Only Format-Preserving Encryption (Payment) and Truncation/Redaction (Customer Service) are correct matches."
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "What should replace tokenization for Medical Records de-identification?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Data anonymization with k-anonymity techniques", isCorrect: true },
        { id: "opt2", order: 2, text: "Tokenization is correct for research data", isCorrect: false },
        { id: "opt3", order: 3, text: "Static masking for permanent changes", isCorrect: false },
        { id: "opt4", order: 4, text: "Dynamic masking for flexibility", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "For research requiring permanent de-identification, anonymization techniques (k-anonymity, differential privacy) are appropriate. Tokenization is reversible."
    }
  ]
};

export const iscSecurityAwarenessMetricsTBS: TBSQuestion = {
  id: "tbs-isc-070",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Security Governance",
  subtopic: "Security Awareness Program",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Security Awareness Program Metrics",
  scenarioText: "You are evaluating the effectiveness of the organization's security awareness program. The security team has provided annual metrics from their phishing simulations and training completion data.",
  timeEstimateMinutes: 12,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Annual Security Awareness Metrics",
      content: {
        type: "table",
        title: "Annual Security Awareness Metrics",
        headers: ["Quarter", "Phishing Tests Sent", "Clicked Link", "Reported Phish", "Training Complete %"],
        rows: [
          { cells: ["Q1", "5,000", "750", "320", "82%"] },
          { cells: ["Q2", "5,200", "520", "480", "88%"] },
          { cells: ["Q3", "5,100", "408", "612", "91%"] },
          { cells: ["Q4", "5,300", "318", "795", "94%"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Q1 phishing click rate (as percentage)",
      correctAnswer: { type: "numeric", value: 15, tolerance: 0.1 },
      points: 2,
      explanation: "Click rate = 750 / 5,000 × 100 = 15%"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Q4 phishing click rate (as percentage)",
      correctAnswer: { type: "numeric", value: 6, tolerance: 0.1 },
      points: 2,
      explanation: "Click rate = 318 / 5,300 × 100 = 6%"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Improvement in click rate from Q1 to Q4 (percentage points)",
      correctAnswer: { type: "numeric", value: 9, tolerance: 0.2 },
      points: 2,
      explanation: "Improvement = 15% - 6% = 9 percentage points reduction"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Q4 phishing report rate (percentage of tests that were reported)",
      correctAnswer: { type: "numeric", value: 15, tolerance: 0.2 },
      points: 2,
      explanation: "Report rate = 795 / 5,300 × 100 = 15%"
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "What trend does the data show for program effectiveness?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Positive - decreasing clicks, increasing reports and training", isCorrect: true },
        { id: "opt2", order: 2, text: "Negative - program is not working", isCorrect: false },
        { id: "opt3", order: 3, text: "Neutral - no significant change", isCorrect: false },
        { id: "opt4", order: 4, text: "Cannot determine from data provided", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "All metrics show improvement: click rate down (15%→6%), report rate up, training completion up (82%→94%)."
    }
  ]
};

// ============================================================
// ISC BATCH 3 - Questions 071-075
// ============================================================

export const iscAPISecurityAuditTBS: TBSQuestion = {
  id: "tbs-isc-071",
  section: "ISC",
  tbsType: "document_review",
  topic: "Application Security",
  subtopic: "API Security",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "ISC-III",
  title: "API Security Assessment",
  scenarioText: "You are conducting a security assessment of the organization's external APIs. The development team has provided documentation on their API security controls. Evaluate the implementation against OWASP API Security Top 10 best practices.",
  timeEstimateMinutes: 18,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "API Security Controls",
      content: {
        type: "table",
        title: "API Security Controls",
        headers: ["Control Area", "Implementation", "Status"],
        rows: [
          { cells: ["Authentication", "API Keys in URL parameters", "Active"] },
          { cells: ["Authorization", "Role-based access control", "Active"] },
          { cells: ["Rate Limiting", "100 requests per minute per IP", "Active"] },
          { cells: ["Input Validation", "Client-side validation only", "Active"] },
          { cells: ["Error Handling", "Detailed error messages with stack traces", "Active"] },
          { cells: ["Logging", "Request/response logging without PII masking", "Active"] },
          { cells: ["Transport Security", "TLS 1.2 with certificate pinning", "Active"] },
          { cells: ["Versioning", "URL path versioning (v1, v2)", "Active"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "dropdown",
      label: "What is the critical vulnerability in the Authentication implementation?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "API Keys in URL parameters can be logged and exposed in browser history", isCorrect: true },
        { id: "opt2", order: 2, text: "API Keys are too short", isCorrect: false },
        { id: "opt3", order: 3, text: "API Keys should be replaced with passwords", isCorrect: false },
        { id: "opt4", order: 4, text: "API Key authentication is inherently secure", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "API keys in URL parameters appear in server logs, browser history, and referrer headers. Should use Authorization headers."
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "What security risk does the Error Handling implementation create?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Information disclosure - stack traces reveal internal architecture", isCorrect: true },
        { id: "opt2", order: 2, text: "No risk - detailed errors help debugging", isCorrect: false },
        { id: "opt3", order: 3, text: "Performance issues only", isCorrect: false },
        { id: "opt4", order: 4, text: "Compliance violation only", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Detailed error messages with stack traces expose internal implementation details that attackers can use to plan attacks."
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "How many API security controls have significant vulnerabilities?",
      correctAnswer: { type: "numeric", value: 4, tolerance: 0 },
      points: 2,
      explanation: "Authentication (URL keys), Input Validation (client-side only), Error Handling (stack traces), Logging (no PII masking) = 4 vulnerabilities"
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "What is wrong with client-side only input validation?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Can be bypassed by directly calling API endpoints", isCorrect: true },
        { id: "opt2", order: 2, text: "Client-side validation is sufficient", isCorrect: false },
        { id: "opt3", order: 3, text: "Causes performance issues", isCorrect: false },
        { id: "opt4", order: 4, text: "Increases development complexity", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Client-side validation is easily bypassed using tools like curl or Postman. Server-side validation is required."
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "Which control is properly implemented?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Transport Security - TLS 1.2 with certificate pinning", isCorrect: true },
        { id: "opt2", order: 2, text: "Authentication - API Keys in URL", isCorrect: false },
        { id: "opt3", order: 3, text: "Error Handling - Detailed errors", isCorrect: false },
        { id: "opt4", order: 4, text: "Logging - Without PII masking", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "TLS 1.2 with certificate pinning is a strong implementation that prevents MITM attacks."
    }
  ]
};

export const iscPrivilegeEscalationTBS: TBSQuestion = {
  id: "tbs-isc-072",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Identity and Access Management",
  subtopic: "Privileged Access Management",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Privileged Account Analysis",
  scenarioText: "You are auditing the organization's privileged account management. The IT security team has provided data on privileged accounts and their usage patterns. Analyze the data to identify potential risks and compliance issues.",
  timeEstimateMinutes: 15,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Privileged Account Inventory",
      content: {
        type: "table",
        title: "Privileged Account Inventory",
        headers: ["Account Type", "Count", "Shared", "MFA Enabled", "Last Password Change", "PAM Managed"],
        rows: [
          { cells: ["Domain Admin", "12", "No", "Yes", "45 days ago", "Yes"] },
          { cells: ["Local Admin", "85", "Yes", "No", "180 days ago", "No"] },
          { cells: ["Database Admin", "8", "No", "Yes", "30 days ago", "Yes"] },
          { cells: ["Service Accounts", "156", "N/A", "N/A", "365+ days ago", "No"] },
          { cells: ["Root/Super User", "4", "Yes", "No", "90 days ago", "No"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Total number of privileged accounts in the inventory",
      correctAnswer: { type: "numeric", value: 265, tolerance: 0 },
      points: 2,
      explanation: "Total = 12 + 85 + 8 + 156 + 4 = 265 accounts"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "How many accounts are not managed by PAM?",
      correctAnswer: { type: "numeric", value: 245, tolerance: 0 },
      points: 2,
      explanation: "Not PAM managed = Local Admin (85) + Service Accounts (156) + Root (4) = 245"
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "Which account type poses the highest security risk?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Service Accounts - Stale passwords, not PAM managed, high count", isCorrect: true },
        { id: "opt2", order: 2, text: "Domain Admin - MFA enabled and PAM managed", isCorrect: false },
        { id: "opt3", order: 3, text: "Database Admin - Recently changed passwords", isCorrect: false },
        { id: "opt4", order: 4, text: "Local Admin - Lower privilege level", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Service accounts have the highest risk: 156 accounts with passwords unchanged for over a year, not managed by PAM."
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "How many shared privileged accounts exist?",
      correctAnswer: { type: "numeric", value: 89, tolerance: 0 },
      points: 2,
      explanation: "Shared accounts = Local Admin (85) + Root (4) = 89 accounts"
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "Percentage of privileged accounts managed by PAM",
      correctAnswer: { type: "numeric", value: 7.5, tolerance: 0.5 },
      points: 2,
      explanation: "PAM managed = 12 + 8 = 20. Percentage = 20/265 × 100 = 7.5%"
    }
  ]
};

export const iscComplianceGapTBS: TBSQuestion = {
  id: "tbs-isc-073",
  section: "ISC",
  tbsType: "document_review",
  topic: "IT Governance",
  subtopic: "Compliance Management",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "IT Compliance Gap Assessment",
  scenarioText: "The organization must comply with multiple regulatory frameworks. You are reviewing the current compliance status to identify gaps that need to be addressed before the upcoming audit.",
  timeEstimateMinutes: 16,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Compliance Requirements Status",
      content: {
        type: "table",
        title: "Compliance Requirements Status",
        headers: ["Requirement", "Framework", "Control Status", "Evidence Status", "Gap"],
        rows: [
          { cells: ["Annual penetration testing", "PCI DSS", "Implemented", "Complete", "None"] },
          { cells: ["Encryption of data at rest", "HIPAA", "Implemented", "Incomplete", "Documentation"] },
          { cells: ["Access review quarterly", "SOX", "Partial", "Incomplete", "Process & Evidence"] },
          { cells: ["Security awareness training", "All", "Implemented", "Complete", "None"] },
          { cells: ["Incident response plan", "HIPAA", "Not Implemented", "None", "Full Implementation"] },
          { cells: ["Vendor risk assessment", "SOX", "Partial", "Partial", "Process Enhancement"] },
          { cells: ["Data retention policy", "PCI DSS", "Implemented", "Complete", "None"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "How many requirements have no gaps?",
      correctAnswer: { type: "numeric", value: 3, tolerance: 0 },
      points: 2,
      explanation: "Annual penetration testing, Security awareness training, and Data retention policy have 'None' in Gap column = 3"
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "Which requirement represents the most critical gap?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Incident response plan - Full implementation needed", isCorrect: true },
        { id: "opt2", order: 2, text: "Encryption - Documentation gap only", isCorrect: false },
        { id: "opt3", order: 3, text: "Access review - Process improvement needed", isCorrect: false },
        { id: "opt4", order: 4, text: "Vendor risk - Enhancement needed", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Incident response plan is 'Not Implemented' with no evidence, requiring full implementation - the most severe gap."
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "How many requirements have evidence gaps?",
      correctAnswer: { type: "numeric", value: 4, tolerance: 0 },
      points: 2,
      explanation: "Incomplete or None evidence: Encryption (Incomplete), Access review (Incomplete), Incident response (None), Vendor risk (Partial) = 4"
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Which framework has the most compliance gaps?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "HIPAA - 2 gaps (Encryption docs, Incident response)", isCorrect: true },
        { id: "opt2", order: 2, text: "SOX - 2 gaps but less severe", isCorrect: false },
        { id: "opt3", order: 3, text: "PCI DSS - All requirements met", isCorrect: false },
        { id: "opt4", order: 4, text: "All frameworks have equal gaps", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "HIPAA has 2 gaps including the most critical one (incident response not implemented)."
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "How many requirements are only partially implemented?",
      correctAnswer: { type: "numeric", value: 2, tolerance: 0 },
      points: 2,
      explanation: "Access review quarterly and Vendor risk assessment have 'Partial' control status = 2"
    }
  ]
};

export const iscSecureSDLCTBS: TBSQuestion = {
  id: "tbs-isc-074",
  section: "ISC",
  tbsType: "dropdown",
  topic: "Application Security",
  subtopic: "Secure Development Lifecycle",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "ISC-III",
  title: "Secure SDLC Maturity Assessment",
  scenarioText: "You are evaluating the organization's Secure Software Development Lifecycle (SSDLC) practices. The development team has described their current security activities at each phase of development.",
  timeEstimateMinutes: 18,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "SDLC Security Activities",
      content: {
        type: "table",
        title: "SDLC Security Activities",
        headers: ["SDLC Phase", "Security Activity", "Frequency", "Responsible Team"],
        rows: [
          { cells: ["Requirements", "Security requirements gathering", "Sometimes", "Business Analysts"] },
          { cells: ["Design", "Threat modeling", "Never", "N/A"] },
          { cells: ["Development", "Secure coding training", "Annual", "Security Team"] },
          { cells: ["Development", "Static code analysis (SAST)", "Per commit", "Automated"] },
          { cells: ["Testing", "Dynamic testing (DAST)", "Before release", "QA Team"] },
          { cells: ["Testing", "Penetration testing", "Annual", "Third Party"] },
          { cells: ["Deployment", "Security configuration review", "Sometimes", "DevOps"] },
          { cells: ["Operations", "Vulnerability scanning", "Weekly", "Security Team"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "dropdown",
      label: "Which SDLC phase has the most significant security gap?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Design - Threat modeling never performed", isCorrect: true },
        { id: "opt2", order: 2, text: "Development - SAST performed per commit", isCorrect: false },
        { id: "opt3", order: 3, text: "Testing - DAST performed before release", isCorrect: false },
        { id: "opt4", order: 4, text: "Operations - Weekly vulnerability scanning", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Threat modeling is never performed, meaning security risks are not identified in the design phase before code is written."
    },
    {
      id: "req2",
      order: 2,
      type: "dropdown",
      label: "What is the risk of 'Sometimes' frequency for security requirements?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Inconsistent security coverage across applications", isCorrect: true },
        { id: "opt2", order: 2, text: "No risk - flexibility is beneficial", isCorrect: false },
        { id: "opt3", order: 3, text: "Reduced development speed only", isCorrect: false },
        { id: "opt4", order: 4, text: "Documentation overhead only", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "'Sometimes' means security requirements are not consistently gathered, leading to applications with varying security levels."
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "How many security activities are performed consistently (Always/Per commit/Weekly)?",
      correctAnswer: { type: "numeric", value: 3, tolerance: 0 },
      points: 2,
      explanation: "SAST (Per commit), DAST (Before release), Vulnerability scanning (Weekly) = 3 consistent activities"
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Which activity would provide the best ROI for security improvement?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Implement threat modeling in Design phase", isCorrect: true },
        { id: "opt2", order: 2, text: "Increase penetration testing frequency", isCorrect: false },
        { id: "opt3", order: 3, text: "Add more vulnerability scanning", isCorrect: false },
        { id: "opt4", order: 4, text: "More security training", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Threat modeling in Design phase catches security issues early when they're cheapest to fix (shift-left security)."
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "What is the security implication of Security Team owning secure coding training?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Appropriate - Security team has expertise to train developers", isCorrect: true },
        { id: "opt2", order: 2, text: "Inappropriate - Development team should own training", isCorrect: false },
        { id: "opt3", order: 3, text: "Inappropriate - QA should own training", isCorrect: false },
        { id: "opt4", order: 4, text: "No implication - ownership doesn't matter", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Security team ownership is appropriate as they have specialized knowledge to provide effective secure coding training."
    }
  ]
};

export const iscRiskQuantificationTBS: TBSQuestion = {
  id: "tbs-isc-075",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Risk Management",
  subtopic: "Risk Quantification",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "ISC-I",
  title: "IT Risk Quantification Analysis",
  scenarioText: "The IT risk management team is quantifying cyber risks using the FAIR (Factor Analysis of Information Risk) methodology. Calculate the annualized risk values based on the provided threat and impact data.",
  timeEstimateMinutes: 20,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Risk Scenario Data",
      content: {
        type: "table",
        title: "Risk Scenario Data",
        headers: ["Scenario", "Annual Frequency", "Min Loss", "Most Likely Loss", "Max Loss"],
        rows: [
          { cells: ["Ransomware Attack", "0.3", "$500,000", "$2,000,000", "$10,000,000"] },
          { cells: ["Data Breach (External)", "0.5", "$1,000,000", "$3,500,000", "$8,000,000"] },
          { cells: ["Insider Threat", "0.2", "$100,000", "$500,000", "$2,000,000"] },
          { cells: ["System Outage", "2.0", "$50,000", "$150,000", "$500,000"] }
        ]
      }
    },
    {
      id: "ex2",
      order: 2,
      type: "text",
      title: "PERT Formula for Expected Loss",
      content: {
        type: "text",
        title: "PERT Formula for Expected Loss",
        paragraphs: [
          "Expected Loss = (Min + 4×Most Likely + Max) / 6",
          "",
          "Annualized Loss Expectancy (ALE) = Annual Frequency × Expected Loss"
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Expected loss for a single Ransomware Attack (in millions)",
      correctAnswer: { type: "numeric", value: 3.08, tolerance: 0.1 },
      points: 2,
      explanation: "Expected = (0.5 + 4×2 + 10) / 6 = 18.5 / 6 = $3.08 million"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Annualized Loss Expectancy (ALE) for Data Breach (in millions)",
      correctAnswer: { type: "numeric", value: 1.92, tolerance: 0.1 },
      points: 2,
      explanation: "Expected = (1 + 4×3.5 + 8) / 6 = 23 / 6 = $3.83M. ALE = 0.5 × $3.83M = $1.92 million"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Annualized Loss Expectancy (ALE) for System Outage (in thousands)",
      correctAnswer: { type: "numeric", value: 350, tolerance: 20 },
      points: 2,
      explanation: "Expected = (50 + 4×150 + 500) / 6 = 1150 / 6 = $175K. ALE = 2.0 × $175K = $350K"
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Which scenario has the highest Annualized Loss Expectancy?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Data Breach - $1.92M ALE", isCorrect: true },
        { id: "opt2", order: 2, text: "Ransomware - Higher single loss but lower frequency", isCorrect: false },
        { id: "opt3", order: 3, text: "System Outage - Highest frequency", isCorrect: false },
        { id: "opt4", order: 4, text: "Insider Threat - Lowest ALE", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Data Breach ALE ($1.92M) > Ransomware ALE (0.3 × $3.08M = $0.92M) > System Outage ($0.35M) > Insider ($0.12M)"
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "Total combined ALE for all scenarios (in millions)",
      correctAnswer: { type: "numeric", value: 3.31, tolerance: 0.2 },
      points: 2,
      explanation: "Total = $0.92M + $1.92M + $0.12M + $0.35M = $3.31 million"
    }
  ]
};

// Add Batch 2 and Batch 3 questions to the export array
iscTBSQuestions.push(
  iscAccessReviewTBS,
  iscMFAImplementationTBS,
  iscLogRetentionTBS,
  iscPenTestResultsTBS,
  iscThirdPartySOCTBS,
  iscEncryptionStandardsTBS,
  iscCloudConfigTBS,
  iscSecurityIncidentTBS,
  iscDataMaskingTBS,
  iscSecurityAwarenessMetricsTBS,
  iscAPISecurityAuditTBS,
  iscPrivilegeEscalationTBS,
  iscComplianceGapTBS,
  iscSecureSDLCTBS,
  iscRiskQuantificationTBS
);
