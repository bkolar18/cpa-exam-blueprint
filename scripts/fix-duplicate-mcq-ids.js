#!/usr/bin/env node

/**
 * Fix Duplicate MCQ IDs in FAR
 *
 * Renames the second occurrence of each duplicate ID series:
 * - far-cf-001 to far-cf-030 → far-cf-041 to far-cf-070
 * - far-gov-adv-001 to far-gov-adv-030 → far-gov-adv-036 to far-gov-adv-065
 * - far-nfp-adv-001 to far-nfp-adv-025 → far-nfp-adv-036 to far-nfp-adv-060
 * - far-ifrs-001 to far-ifrs-025 → far-ifrs-036 to far-ifrs-060
 */

const fs = require('fs');
const path = require('path');

const FAR_FILE = path.join(__dirname, '..', 'src', 'lib', 'data', 'practice-questions', 'far.ts');

// Define the renaming rules
const RENAME_RULES = [
  { prefix: 'far-cf', oldRange: [1, 30], newStart: 41 },
  { prefix: 'far-gov-adv', oldRange: [1, 30], newStart: 36 },
  { prefix: 'far-nfp-adv', oldRange: [1, 25], newStart: 36 },
  { prefix: 'far-ifrs', oldRange: [1, 25], newStart: 36 },
];

console.log('Reading FAR file...');
let content = fs.readFileSync(FAR_FILE, 'utf-8');

let totalReplacements = 0;

for (const rule of RENAME_RULES) {
  const { prefix, oldRange, newStart } = rule;
  console.log(`\nProcessing ${prefix} series...`);

  for (let i = oldRange[0]; i <= oldRange[1]; i++) {
    const oldId = `${prefix}-${String(i).padStart(3, '0')}`;
    const newNum = newStart + (i - oldRange[0]);
    const newId = `${prefix}-${String(newNum).padStart(3, '0')}`;

    // Find the pattern: "id": "far-cf-001"
    const pattern = `"id": "${oldId}"`;

    // Find first occurrence
    const firstIndex = content.indexOf(pattern);
    if (firstIndex === -1) {
      console.log(`  Warning: ${oldId} not found`);
      continue;
    }

    // Find second occurrence
    const secondIndex = content.indexOf(pattern, firstIndex + pattern.length);
    if (secondIndex === -1) {
      console.log(`  Warning: ${oldId} has no duplicate (only 1 occurrence)`);
      continue;
    }

    // Replace only the second occurrence
    const before = content.substring(0, secondIndex);
    const after = content.substring(secondIndex);
    content = before + after.replace(pattern, `"id": "${newId}"`);

    console.log(`  ${oldId} → ${newId}`);
    totalReplacements++;
  }
}

console.log(`\nWriting fixed content...`);
fs.writeFileSync(FAR_FILE, content);

console.log(`\n=== SUMMARY ===`);
console.log(`Total IDs renamed: ${totalReplacements}`);

// Verify no duplicates remain
console.log('\nVerifying no duplicates remain...');
const verifyContent = fs.readFileSync(FAR_FILE, 'utf-8');
const idPattern = /"id":\s*"([^"]+)"/g;
const idCounts = new Map();
let match;

while ((match = idPattern.exec(verifyContent)) !== null) {
  const id = match[1];
  idCounts.set(id, (idCounts.get(id) || 0) + 1);
}

let duplicatesRemaining = 0;
for (const [id, count] of idCounts) {
  if (count > 1) {
    console.log(`  Still duplicate: ${id} (${count} occurrences)`);
    duplicatesRemaining++;
  }
}

if (duplicatesRemaining === 0) {
  console.log('\n✓ All duplicates fixed successfully!');
} else {
  console.log(`\n✗ ${duplicatesRemaining} duplicates still remain`);
}
