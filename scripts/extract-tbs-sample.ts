/**
 * Extract a statistically significant sample of TBS questions
 * for ChatGPT review.
 *
 * Statistical sampling:
 * - For a population of 500+, a sample of 50-80 provides ~90-95% confidence
 * - We stratify by TBS type to ensure all types are represented
 * - We also ensure section diversity
 */

import { allTBSQuestions } from "../src/lib/data/tbs";
import * as fs from "fs";

// Exclude TBS questions that were recently corrected (to ensure sample uses verified-correct questions)
const EXCLUDED_IDS = new Set([
  // HIGH severity errors that were corrected - exclude from sample
  "tbs-aud-080", // Component auditor reference - corrected
  "tbs-bar-006", // WIP credit calculation - corrected (in sample-tbs)
  "tbs-bar-008", // ABC overhead calculation - corrected
  "tbs-bar-015", // Segment elimination - corrected
  "tbs-bar-018", // Product mix optimization - corrected
  "tbs-bar-037", // Q4 production - corrected
  "tbs-bar-044", // EAC Machine B - corrected
  "tbs-bar-047", // Labor rate variance - corrected
  "tbs-reg-037", // Multi-state tax - corrected
  "tbs-reg-048", // Partner capital accounts - corrected
  "tbs-reg-042", // Hobby loss TCJA - corrected
  "tbs-reg-061", // Circular 230 - corrected
  "tbs-far-026", // FIFO ending inventory - corrected
  "tbs-far-027", // Allowance balance - corrected
  "tbs-far-030", // Diluted EPS - corrected
  "tbs-tcp-010", // Property tax timing - corrected
  "tbs-tcp-014", // Installment gross profit - corrected
  "tbs-reg-009", // MACRS mid-quarter - corrected (in sample-tbs)
  "tbs-isc-050", // RTO classification - corrected
]);

// Filter out excluded questions
const eligibleQuestions = allTBSQuestions.filter(tbs => !EXCLUDED_IDS.has(tbs.id));
console.log(`Excluding ${EXCLUDED_IDS.size} recently corrected questions from sample`);
console.log(`Eligible questions: ${eligibleQuestions.length} of ${allTBSQuestions.length}`);

// Count by type (use eligible questions for sampling)
const countByType: Record<string, number> = {};
const countBySection: Record<string, number> = {};

for (const tbs of eligibleQuestions) {
  countByType[tbs.tbsType] = (countByType[tbs.tbsType] || 0) + 1;
  countBySection[tbs.section] = (countBySection[tbs.section] || 0) + 1;
}

console.log("=== TBS Population (Eligible) ===");
console.log("Total:", eligibleQuestions.length);
console.log("\nBy Type:");
Object.entries(countByType).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
  console.log(`  ${type}: ${count} (${((count / eligibleQuestions.length) * 100).toFixed(1)}%)`);
});
console.log("\nBy Section:");
Object.entries(countBySection).forEach(([section, count]) => {
  console.log(`  ${section}: ${count}`);
});

// Stratified sampling: get proportional samples from each type
// Target: ~60 questions total (12% sample rate for 95% confidence at 10% margin)
const TARGET_SAMPLE = 60;
const samples: typeof eligibleQuestions = [];
const typeGroups: Record<string, typeof eligibleQuestions> = {};

// Group by type
for (const tbs of eligibleQuestions) {
  if (!typeGroups[tbs.tbsType]) {
    typeGroups[tbs.tbsType] = [];
  }
  typeGroups[tbs.tbsType].push(tbs);
}

// Calculate proportional samples per type (minimum 3 per type to ensure representation)
const typeSampleCounts: Record<string, number> = {};
let totalAllocated = 0;

for (const [type, questions] of Object.entries(typeGroups)) {
  const proportion = questions.length / eligibleQuestions.length;
  const proportionalCount = Math.round(proportion * TARGET_SAMPLE);
  // Minimum 3 per type for statistical validity, max based on proportion
  typeSampleCounts[type] = Math.max(3, Math.min(proportionalCount, questions.length));
  totalAllocated += typeSampleCounts[type];
}

console.log("\n=== Sample Allocation ===");
Object.entries(typeSampleCounts).forEach(([type, count]) => {
  console.log(`  ${type}: ${count} samples`);
});
console.log(`Total: ${totalAllocated}`);

// Select random samples from each type, ensuring section diversity
for (const [type, count] of Object.entries(typeSampleCounts)) {
  const pool = [...typeGroups[type]];

  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Try to get diversity across sections
  const sectionSeen: Set<string> = new Set();
  const selected: typeof allTBSQuestions = [];

  // First pass: one from each section
  for (const tbs of pool) {
    if (!sectionSeen.has(tbs.section) && selected.length < count) {
      selected.push(tbs);
      sectionSeen.add(tbs.section);
    }
  }

  // Second pass: fill remaining
  for (const tbs of pool) {
    if (selected.length >= count) break;
    if (!selected.includes(tbs)) {
      selected.push(tbs);
    }
  }

  samples.push(...selected);
}

// Sort by section then type for readability
samples.sort((a, b) => {
  if (a.section !== b.section) return a.section.localeCompare(b.section);
  if (a.tbsType !== b.tbsType) return a.tbsType.localeCompare(b.tbsType);
  return a.title.localeCompare(b.title);
});

console.log("\n=== Final Sample ===");
console.log(`Selected ${samples.length} TBS questions\n`);

// Create output for ChatGPT review
let output = `# TBS Sample for Review
Generated: ${new Date().toISOString()}
Total TBS in bank: ${allTBSQuestions.length}
Excluded (recently corrected): ${EXCLUDED_IDS.size}
Eligible for sampling: ${eligibleQuestions.length}
Sample size: ${samples.length} (${((samples.length / eligibleQuestions.length) * 100).toFixed(1)}% of eligible)

## Sample Distribution
`;

// Add distribution stats
const sampleByType: Record<string, number> = {};
const sampleBySection: Record<string, number> = {};
for (const tbs of samples) {
  sampleByType[tbs.tbsType] = (sampleByType[tbs.tbsType] || 0) + 1;
  sampleBySection[tbs.section] = (sampleBySection[tbs.section] || 0) + 1;
}

output += "\n### By Type:\n";
Object.entries(sampleByType).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
  output += `- ${type}: ${count}\n`;
});

output += "\n### By Section:\n";
Object.entries(sampleBySection).forEach(([section, count]) => {
  output += `- ${section}: ${count}\n`;
});

output += "\n---\n\n# TBS Questions\n\n";

// Add each TBS
for (const tbs of samples) {
  output += `## ${tbs.id}\n`;
  output += `**Section:** ${tbs.section} | **Type:** ${tbs.tbsType} | **Difficulty:** ${tbs.difficulty}\n`;
  output += `**Topic:** ${tbs.topic}${tbs.subtopic ? ` - ${tbs.subtopic}` : ""}\n`;
  output += `**Time Estimate:** ${tbs.timeEstimateMinutes} min | **Max Points:** ${tbs.maxScorePoints}\n\n`;
  output += `### Title\n${tbs.title}\n\n`;
  output += `### Scenario\n${tbs.scenarioText}\n\n`;

  // Exhibits
  if (tbs.exhibits && tbs.exhibits.length > 0) {
    output += `### Exhibits (${tbs.exhibits.length})\n`;
    for (const exhibit of tbs.exhibits) {
      output += `\n#### ${exhibit.title} (${exhibit.type})\n`;
      const content = exhibit.content as unknown as Record<string, unknown>;
      if (content) {
        if (content.type === "text" && content.paragraphs) {
          const paragraphs = content.paragraphs as string[];
          output += paragraphs.slice(0, 2).join("\n").substring(0, 500) + "...\n";
        } else if (content.type === "memo" || content.type === "email") {
          output += `From: ${content.from || "N/A"}\n`;
          output += `To: ${content.to || "N/A"}\n`;
          output += `Subject: ${content.subject || "N/A"}\n`;
          const body = (content.body as string) || "";
          output += `Body: ${body.substring(0, 300)}...\n`;
        } else if (content.type === "table" || content.headers) {
          if (content.title) output += `Table: ${content.title}\n`;
          if (content.headers) output += `Headers: ${(content.headers as string[]).join(" | ")}\n`;
          const rows = content.rows as { cells: (string | number | null)[] }[] | undefined;
          if (rows && rows.length > 0) {
            output += `Rows: ${rows.length} rows\n`;
            for (let i = 0; i < Math.min(3, rows.length); i++) {
              output += `  ${rows[i].cells.join(" | ")}\n`;
            }
            if (rows.length > 3) output += `  ... (${rows.length - 3} more rows)\n`;
          }
        } else if (content.type === "financial_statement") {
          output += `Statement: ${content.statementType || "Financial Statement"}\n`;
          output += `Period: ${content.period || "N/A"}\n`;
          const rows = content.rows as { label: string; values: (number | string | null)[] }[] | undefined;
          if (rows && rows.length > 0) {
            output += `Rows: ${rows.length} line items\n`;
          }
        }
      }
    }
    output += "\n";
  }

  // Requirements
  if (tbs.requirements && tbs.requirements.length > 0) {
    output += `### Requirements (${tbs.requirements.length})\n`;
    for (const req of tbs.requirements) {
      output += `\n**${req.id}:** ${req.label}\n`;
      if (req.description) output += `Description: ${req.description}\n`;
      output += `Type: ${req.type}`;
      if (req.points) output += ` | Points: ${req.points}`;
      output += "\n";

      // Show expected answer structure
      if (req.correctAnswer !== undefined) {
        const answerStr = JSON.stringify(req.correctAnswer);
        if (answerStr.length > 200) {
          output += `Expected: ${answerStr.substring(0, 200)}...\n`;
        } else {
          output += `Expected: ${answerStr}\n`;
        }
      }
    }
    output += "\n";
  }

  output += "\n---\n\n";
}

// Write to file
const outputPath = "./TBS_SAMPLE_FOR_REVIEW.md";
fs.writeFileSync(outputPath, output);
console.log(`Output written to: ${outputPath}`);
console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
