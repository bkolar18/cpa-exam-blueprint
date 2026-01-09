/**
 * Analyze subtopics across all question files
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_DIR = path.join(__dirname, '../src/lib/data/practice-questions');

const files = ['far.ts', 'aud.ts', 'reg.ts', 'tcp.ts', 'bar.ts', 'isc.ts'];

files.forEach(file => {
  const filePath = path.join(QUESTIONS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract subtopics with counts
  const subtopicCounts = {};
  const subtopicRegex = /"subtopic":\s*"([^"]+)"/g;
  let match;
  while ((match = subtopicRegex.exec(content)) !== null) {
    const subtopic = match[1];
    subtopicCounts[subtopic] = (subtopicCounts[subtopic] || 0) + 1;
  }

  const sorted = Object.entries(subtopicCounts).sort((a, b) => b[1] - a[1]);

  console.log(`\n=== ${file.toUpperCase().replace('.TS', '')} (${sorted.length} subtopics) ===`);
  sorted.forEach(([subtopic, count]) => {
    console.log(`  ${count.toString().padStart(3)} - ${subtopic}`);
  });
});
