/**
 * Script to update generic company names to CPA exam-style names
 *
 * This script replaces generic placeholders like "Company A", "Company B"
 * with realistic company names that match the style used on actual CPA exams.
 *
 * Usage: node scripts/update-company-names.js
 */

const fs = require('fs');
const path = require('path');

// Define the question files to process
const QUESTION_FILES = [
  'src/lib/data/practice-questions/far.ts',
  'src/lib/data/practice-questions/aud.ts',
  'src/lib/data/practice-questions/reg.ts',
  'src/lib/data/practice-questions/tcp.ts',
  'src/lib/data/practice-questions/bar.ts',
  'src/lib/data/practice-questions/isc.ts',
];

// Name mappings - CPA exam style names
// These are designed to be:
// 1. Professional sounding
// 2. Easy to distinguish in multi-party scenarios
// 3. Similar to names used in actual CPA exam questions
const NAME_MAPPINGS = {
  // Primary company names (for acquirers, parents, main entities)
  'Company A': 'Apex Corp.',
  'company A': 'Apex Corp.',

  // Secondary company names (for targets, subsidiaries)
  'Company B': 'Beacon Inc.',
  'company B': 'Beacon Inc.',

  // Tertiary company names (for third parties)
  'Company C': 'Coastal Co.',
  'company C': 'Coastal Co.',

  // Exchange/transaction party names
  'Company X': 'Sterling Co.',
  'company X': 'Sterling Co.',
  'Company Y': 'Vista LLC',
  'company Y': 'Vista LLC',
  'Company Z': 'Zenith Corp.',
  'company Z': 'Zenith Corp.',

  // Entity names (for VIE, partnership scenarios)
  'Entity A': 'Metro Partners',
  'entity A': 'Metro Partners',
  'Entity B': 'Summit Holdings',
  'entity B': 'Summit Holdings',
  'Entity X': 'Delta Ventures',
  'entity X': 'Delta Ventures',
  'Entity Y': 'Horizon Group',
  'entity Y': 'Horizon Group',

  // Corporation names
  'Corporation A': 'Northern Industries',
  'corporation A': 'Northern Industries',
  'Corporation B': 'Pacific Manufacturing',
  'corporation B': 'Pacific Manufacturing',
  'Corporation X': 'Atlantic Holdings',
  'corporation X': 'Atlantic Holdings',

  // Firm names (for audit/professional services context)
  'Firm A': 'Anderson & Associates',
  'firm A': 'Anderson & Associates',
  'Firm B': 'Brooks & Partners',
  'firm B': 'Brooks & Partners',

  // Parent/Subsidiary specific
  'Parent A': 'Pinnacle Corp.',
  'parent A': 'Pinnacle Corp.',
  'Subsidiary A': 'Harbor Inc.',
  'subsidiary A': 'Harbor Inc.',
  'Subsidiary B': 'Ridge Co.',
  'subsidiary B': 'Ridge Co.',
};

// Patterns that should NOT be replaced (false positives)
const EXCLUSION_PATTERNS = [
  /Personal Holding Company/gi,
  /Investment Company/gi,
  /Private Company/gi,
  /Company Car/gi,
  /Company-owned/gi,
  /company's/gi,
  /Company Test/gi,
  /Holding Company/gi,
  /Insurance Company/gi,
  /Parent Company/gi,
  /Related Company/gi,
  /Affiliated Company/gi,
  /Company Governance/gi,
  /Company Audit/gi,
  /Company Stock/gi,
  /Company Plan/gi,
  /Company Policy/gi,
  /the company/gi,
  /a company/gi,
  /each company/gi,
  /both companies/gi,
  /Company Wide/gi,
  /Company Level/gi,
];

/**
 * Check if a match should be excluded
 */
function shouldExclude(content, match, index) {
  // Get surrounding context (50 chars before and after)
  const start = Math.max(0, index - 50);
  const end = Math.min(content.length, index + match.length + 50);
  const context = content.substring(start, end);

  // Check against exclusion patterns
  for (const pattern of EXCLUSION_PATTERNS) {
    if (pattern.test(context)) {
      // Reset lastIndex for global patterns
      pattern.lastIndex = 0;

      // Make sure the exclusion pattern actually overlaps with our match
      const matchInContext = context.indexOf(match);
      if (matchInContext !== -1) {
        // Check if this is part of a compound term
        const beforeMatch = context.substring(0, matchInContext);
        const afterMatch = context.substring(matchInContext + match.length);

        // If there's a word character immediately before, it's part of a larger term
        if (/\w$/.test(beforeMatch) || /^\w/.test(afterMatch)) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Replace company names in content
 */
function replaceCompanyNames(content, filename) {
  let updatedContent = content;
  let replacementCount = 0;
  const replacements = [];

  // Sort mappings by length (longest first) to avoid partial replacements
  const sortedMappings = Object.entries(NAME_MAPPINGS)
    .sort((a, b) => b[0].length - a[0].length);

  for (const [original, replacement] of sortedMappings) {
    // Create a regex that matches the original as a whole word
    // But be careful with special characters
    const escapedOriginal = original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Match as whole word (not part of larger word)
    // Allow for possessives and punctuation after
    const regex = new RegExp(`\\b${escapedOriginal}(?='s|\\b)`, 'g');

    let match;
    const tempContent = updatedContent;

    while ((match = regex.exec(tempContent)) !== null) {
      // Check if this match should be excluded
      if (!shouldExclude(tempContent, match[0], match.index)) {
        replacementCount++;
        replacements.push({
          original: match[0],
          replacement: replacement,
          context: tempContent.substring(
            Math.max(0, match.index - 20),
            Math.min(tempContent.length, match.index + match[0].length + 20)
          )
        });
      }
    }

    // Perform the replacement (excluding false positives handled by context)
    updatedContent = updatedContent.replace(regex, (match, offset) => {
      if (shouldExclude(content, match, offset)) {
        return match; // Keep original
      }
      return replacement;
    });
  }

  return { updatedContent, replacementCount, replacements };
}

/**
 * Process a single file
 */
function processFile(filepath) {
  const fullPath = path.join(process.cwd(), filepath);

  if (!fs.existsSync(fullPath)) {
    console.log(`  Skipping ${filepath} (file not found)`);
    return { replacements: 0, details: [] };
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const { updatedContent, replacementCount, replacements } = replaceCompanyNames(content, filepath);

  if (replacementCount > 0) {
    fs.writeFileSync(fullPath, updatedContent, 'utf8');
    console.log(`  ✓ ${filepath}: ${replacementCount} replacements`);

    // Show sample replacements
    if (replacements.length > 0 && replacements.length <= 5) {
      replacements.forEach(r => {
        console.log(`    "${r.original}" → "${r.replacement}"`);
      });
    } else if (replacements.length > 5) {
      replacements.slice(0, 3).forEach(r => {
        console.log(`    "${r.original}" → "${r.replacement}"`);
      });
      console.log(`    ... and ${replacements.length - 3} more`);
    }
  } else {
    console.log(`  - ${filepath}: No changes needed`);
  }

  return { replacements: replacementCount, details: replacements };
}

/**
 * Main execution
 */
function main() {
  console.log('='.repeat(60));
  console.log('CPA Exam Question Company Name Updater');
  console.log('='.repeat(60));
  console.log('');
  console.log('Replacing generic names with CPA exam-style names:');
  console.log('');

  // Show mapping summary
  console.log('Name Mappings:');
  const uniqueMappings = {};
  for (const [orig, repl] of Object.entries(NAME_MAPPINGS)) {
    if (!uniqueMappings[repl]) {
      uniqueMappings[repl] = orig;
      console.log(`  ${orig} → ${repl}`);
    }
  }
  console.log('');
  console.log('-'.repeat(60));
  console.log('Processing files...');
  console.log('');

  let totalReplacements = 0;

  for (const file of QUESTION_FILES) {
    const result = processFile(file);
    totalReplacements += result.replacements;
  }

  console.log('');
  console.log('-'.repeat(60));
  console.log(`Total replacements: ${totalReplacements}`);
  console.log('');

  if (totalReplacements > 0) {
    console.log('✓ Company names updated successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('  1. Run "npm run build" to verify no errors');
    console.log('  2. Review a few questions manually');
    console.log('  3. Commit the changes');
  } else {
    console.log('No replacements were made.');
  }
}

main();
