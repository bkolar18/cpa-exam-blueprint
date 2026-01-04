// Score release dates for CPA Exam
// Core sections (FAR, AUD, REG): Continuous testing, scores released every 1-2 weeks
// Discipline sections (BAR, TCP, ISC): Quarterly testing windows

export interface ScoreReleaseDate {
  date: string; // ISO date string
  type: "core" | "discipline";
  testingWindow?: string; // For discipline sections
  sections: string[];
  notes?: string;
}

// 2025-2026 Score Release Schedule
// Based on AICPA patterns - Core sections have rolling releases, Discipline quarterly
export const scoreReleaseDates: ScoreReleaseDate[] = [
  // 2025 Core Section Releases (approximately every 2 weeks)
  { date: "2025-01-14", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-01-28", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-02-11", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-02-25", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-03-11", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-03-25", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-04-08", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-04-22", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-05-06", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-05-20", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-06-03", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-06-17", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-07-01", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-07-15", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-07-29", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-08-12", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-08-26", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-09-09", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-09-23", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-10-07", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-10-21", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-11-04", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-11-18", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-12-02", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2025-12-16", type: "core", sections: ["FAR", "AUD", "REG"] },

  // 2025 Discipline Section Releases (quarterly)
  {
    date: "2025-02-20",
    type: "discipline",
    sections: ["BAR", "TCP", "ISC"],
    testingWindow: "Q1 2025 (January)",
    notes: "Scores for exams taken in January 2025"
  },
  {
    date: "2025-05-22",
    type: "discipline",
    sections: ["BAR", "TCP", "ISC"],
    testingWindow: "Q2 2025 (April)",
    notes: "Scores for exams taken in April 2025"
  },
  {
    date: "2025-08-21",
    type: "discipline",
    sections: ["BAR", "TCP", "ISC"],
    testingWindow: "Q3 2025 (July)",
    notes: "Scores for exams taken in July 2025"
  },
  {
    date: "2025-11-20",
    type: "discipline",
    sections: ["BAR", "TCP", "ISC"],
    testingWindow: "Q4 2025 (October)",
    notes: "Scores for exams taken in October 2025"
  },

  // 2026 Core Section Releases
  { date: "2026-01-13", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-01-27", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-02-10", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-02-24", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-03-10", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-03-24", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-04-07", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-04-21", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-05-05", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-05-19", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-06-02", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-06-16", type: "core", sections: ["FAR", "AUD", "REG"] },
  { date: "2026-06-30", type: "core", sections: ["FAR", "AUD", "REG"] },

  // 2026 Discipline Section Releases
  {
    date: "2026-02-19",
    type: "discipline",
    sections: ["BAR", "TCP", "ISC"],
    testingWindow: "Q1 2026 (January)",
    notes: "Scores for exams taken in January 2026"
  },
  {
    date: "2026-05-21",
    type: "discipline",
    sections: ["BAR", "TCP", "ISC"],
    testingWindow: "Q2 2026 (April)",
    notes: "Scores for exams taken in April 2026"
  },
];

// Helper function to get the next score release
export function getNextScoreRelease(type?: "core" | "discipline"): ScoreReleaseDate | null {
  const now = new Date();
  const upcoming = scoreReleaseDates
    .filter(release => new Date(release.date) > now)
    .filter(release => !type || release.type === type)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return upcoming[0] || null;
}

// Helper function to get upcoming releases within a date range
export function getUpcomingReleases(days: number = 90): ScoreReleaseDate[] {
  const now = new Date();
  const endDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return scoreReleaseDates
    .filter(release => {
      const releaseDate = new Date(release.date);
      return releaseDate > now && releaseDate <= endDate;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

// Section info for display
export const sectionInfo = {
  FAR: { name: "Financial Accounting and Reporting", color: "#1e3a5f" },
  AUD: { name: "Auditing and Attestation", color: "#0891b2" },
  REG: { name: "Taxation and Regulation", color: "#7c3aed" },
  BAR: { name: "Business Analysis and Reporting", color: "#dc2626" },
  TCP: { name: "Tax Compliance and Planning", color: "#16a34a" },
  ISC: { name: "Information Systems and Controls", color: "#ea580c" },
};
