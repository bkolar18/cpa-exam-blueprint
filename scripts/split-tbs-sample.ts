/**
 * Split TBS_SAMPLE_FOR_REVIEW_BATCH2.md into smaller chunks
 * for ChatGPT review (to avoid token limits)
 */

import * as fs from "fs";

const content = fs.readFileSync("./TBS_SAMPLE_FOR_REVIEW_BATCH2.md", "utf-8");
const lines = content.split("\n");

// Find the header section (before first TBS)
let headerEndIndex = 0;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].startsWith("## tbs-")) {
    headerEndIndex = i;
    break;
  }
}

// Split into individual TBS
const tbsBlocks: string[] = [];
let currentBlock: string[] = [];

for (let i = headerEndIndex; i < lines.length; i++) {
  if (lines[i].startsWith("## tbs-") && currentBlock.length > 0) {
    tbsBlocks.push(currentBlock.join("\n"));
    currentBlock = [];
  }
  currentBlock.push(lines[i]);
}
if (currentBlock.length > 0) {
  tbsBlocks.push(currentBlock.join("\n"));
}

console.log(`Found ${tbsBlocks.length} TBS blocks`);

// Split into chunks of 15 TBS each (smaller for ChatGPT)
const CHUNK_SIZE = 15;
const chunks: string[][] = [];

for (let i = 0; i < tbsBlocks.length; i += CHUNK_SIZE) {
  chunks.push(tbsBlocks.slice(i, i + CHUNK_SIZE));
}

console.log(`Creating ${chunks.length} chunk files (${CHUNK_SIZE} TBS each)`);

// Write each chunk to a separate file
for (let i = 0; i < chunks.length; i++) {
  const chunkHeader = `# TBS Sample for Review - Batch 2, Part ${i + 1} of ${chunks.length}
Generated: ${new Date().toISOString()}
TBS in this part: ${chunks[i].length}
TBS range: ${i * CHUNK_SIZE + 1} to ${Math.min((i + 1) * CHUNK_SIZE, tbsBlocks.length)} of ${tbsBlocks.length}

---

# TBS Questions

`;

  const chunkContent = chunkHeader + chunks[i].join("\n\n---\n\n");
  const filename = `./TBS_SAMPLE_BATCH2_PART${i + 1}.md`;
  fs.writeFileSync(filename, chunkContent);

  const stats = fs.statSync(filename);
  console.log(`  Part ${i + 1}: ${chunks[i].length} TBS, ${(stats.size / 1024).toFixed(1)} KB`);
}

console.log("\nDone! Files created:");
for (let i = 0; i < chunks.length; i++) {
  console.log(`  - TBS_SAMPLE_BATCH2_PART${i + 1}.md`);
}
