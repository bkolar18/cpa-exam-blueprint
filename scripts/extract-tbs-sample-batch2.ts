/**
 * Extract a second statistically significant sample of TBS questions
 * for ChatGPT review - EXCLUDING the first batch.
 *
 * Statistical sampling:
 * - For a population of 500+, a sample of 50-80 provides ~90-95% confidence
 * - We stratify by TBS type to ensure all types are represented
 * - We also ensure section diversity
 */

import { allTBSQuestions } from "../src/lib/data/tbs";
import * as fs from "fs";

// Exclude TBS questions that were recently corrected
const EXCLUDED_CORRECTED = new Set([
  "tbs-aud-080", "tbs-bar-006", "tbs-bar-008", "tbs-bar-015", "tbs-bar-018",
  "tbs-bar-037", "tbs-bar-044", "tbs-bar-047", "tbs-reg-037", "tbs-reg-048",
  "tbs-reg-042", "tbs-reg-061", "tbs-far-026", "tbs-far-027", "tbs-far-030",
  "tbs-tcp-010", "tbs-tcp-014", "tbs-reg-009", "tbs-isc-050",
]);

// Exclude TBS from FIRST SAMPLE (64 questions) - these already have been reviewed
const FIRST_SAMPLE_IDS = new Set([
  "tbs-aud-061", "tbs-aud-078", "tbs-aud-015", "tbs-aud-037", "tbs-aud-024",
  "tbs-aud-029", "tbs-aud-057", "tbs-aud-039", "tbs-aud-005", "tbs-aud-074",
  "tbs-bar-064", "tbs-bar-020", "tbs-bar-057", "tbs-bar-066", "tbs-bar-063",
  "tbs-bar-053", "tbs-bar-003", "tbs-bar-071", "tbs-bar-070", "tbs-bar-069",
  "tbs-bar-030", "tbs-bar-032", "tbs-bar-017", "tbs-bar-012", "tbs-bar-049",
  "tbs-bar-062", "tbs-bar-007", "tbs-bar-056",
  "tbs-far-011", "tbs-far-018", "tbs-far-040", "tbs-far-014", "tbs-far-070",
  "tbs-far-045", "tbs-far-021", "tbs-far-080", "tbs-far-066", "tbs-far-015",
  "tbs-far-012", "tbs-far-062", "tbs-far-024",
  "tbs-isc-062", "tbs-isc-013", "tbs-isc-036", "tbs-isc-009", "tbs-isc-031",
  "tbs-isc-049",
  "tbs-reg-010", "tbs-reg-024", "tbs-reg-021", "tbs-reg-015", "tbs-reg-060",
  "tbs-reg-032", "tbs-reg-047", "tbs-reg-062", "tbs-reg-031",
  "tbs-tcp-075", "tbs-tcp-032", "tbs-tcp-033", "tbs-tcp-039", "tbs-tcp-002",
  "tbs-tcp-040", "tbs-tcp-023", "tbs-tcp-028",
]);

// Combine all exclusions
const ALL_EXCLUDED = new Set([...EXCLUDED_CORRECTED, ...FIRST_SAMPLE_IDS]);

// Filter out excluded questions
const eligibleQuestions = allTBSQuestions.filter(tbs => !ALL_EXCLUDED.has(tbs.id));
console.log(`Total TBS in bank: ${allTBSQuestions.length}`);
console.log(`Excluding ${EXCLUDED_CORRECTED.size} recently corrected questions`);
console.log(`Excluding ${FIRST_SAMPLE_IDS.size} questions from first sample`);
console.log(`Eligible questions for second sample: ${eligibleQuestions.length}`);

// Count by type
const countByType: Record<string, number> = {};
const countBySection: Record<string, number> = {};

for (const tbs of eligibleQuestions) {
  countByType[tbs.tbsType] = (countByType[tbs.tbsType] || 0) + 1;
  countBySection[tbs.section] = (countBySection[tbs.section] || 0) + 1;
}

console.log("\n=== Eligible TBS Population ===");
console.log("Total:", eligibleQuestions.length);
console.log("\nBy Type:");
Object.entries(countByType).sort((a, b) => b[1] - a[1]).forEach(([type, count]) => {
  console.log(`  ${type}: ${count} (${((count / eligibleQuestions.length) * 100).toFixed(1)}%)`);
});
console.log("\nBy Section:");
Object.entries(countBySection).forEach(([section, count]) => {
  console.log(`  ${section}: ${count}`);
});

// Stratified sampling
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

// Calculate proportional samples per type (minimum 3 per type)
const typeSampleCounts: Record<string, number> = {};
let totalAllocated = 0;

for (const [type, questions] of Object.entries(typeGroups)) {
  const proportion = questions.length / eligibleQuestions.length;
  const proportionalCount = Math.round(proportion * TARGET_SAMPLE);
  typeSampleCounts[type] = Math.max(3, Math.min(proportionalCount, questions.length));
  totalAllocated += typeSampleCounts[type];
}

console.log("\n=== Sample Allocation ===");
Object.entries(typeSampleCounts).forEach(([type, count]) => {
  console.log(`  ${type}: ${count} samples`);
});
console.log(`Total: ${totalAllocated}`);

// Select random samples with section diversity
for (const [type, count] of Object.entries(typeSampleCounts)) {
  const pool = [...typeGroups[type]];

  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // First pass: one from each section
  const sectionSeen: Set<string> = new Set();
  const selected: typeof allTBSQuestions = [];

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

// Sort by section then type
samples.sort((a, b) => {
  if (a.section !== b.section) return a.section.localeCompare(b.section);
  if (a.tbsType !== b.tbsType) return a.tbsType.localeCompare(b.tbsType);
  return a.title.localeCompare(b.title);
});

console.log(`\n=== Final Sample ===`);
console.log(`Selected ${samples.length} TBS questions\n`);

// Create output
let output = `# TBS Sample for Review - Batch 2
Generated: ${new Date().toISOString()}
Total TBS in bank: ${allTBSQuestions.length}
Excluded (recently corrected): ${EXCLUDED_CORRECTED.size}
Excluded (first sample): ${FIRST_SAMPLE_IDS.size}
Eligible for sampling: ${eligibleQuestions.length}
Sample size: ${samples.length} (${((samples.length / eligibleQuestions.length) * 100).toFixed(1)}% of eligible)

## Sample Distribution
`;

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

      if (req.correctAnswer !== undefined) {
        const answerStr = JSON.stringify(req.correctAnswer);
        if (answerStr.length > 200) {
          output += `Expected: ${answerStr.substring(0, 200)}...\n`;
        } else {
          output += `Expected: ${answerStr}\n`;
        }
      }

      // Include explanation for review
      if (req.explanation) {
        output += `Explanation: ${req.explanation}\n`;
      }
    }
    output += "\n";
  }

  // Journal accounts if present
  if (tbs.journalAccounts && tbs.journalAccounts.length > 0) {
    output += `### Journal Accounts Available (${tbs.journalAccounts.length})\n`;
    for (const acc of tbs.journalAccounts) {
      output += `- ${acc.name} (${acc.type}, normal ${acc.normalBalance})${acc.isDistractor ? " [distractor]" : ""}\n`;
    }
    output += "\n";
  }

  output += "\n---\n\n";
}

// Write to file
const outputPath = "./TBS_SAMPLE_FOR_REVIEW_BATCH2.md";
fs.writeFileSync(outputPath, output);
console.log(`Output written to: ${outputPath}`);
console.log(`File size: ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB`);
