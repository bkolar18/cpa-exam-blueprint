/**
 * AICPA Blueprint Alignment Check
 *
 * Compares our TBS content area distribution against AICPA blueprint weights.
 * Also checks topics against expected coverage areas.
 *
 * Run with: node scripts/check-blueprint-alignment.js
 */

const fs = require('fs');
const path = require('path');

// AICPA Blueprint Weight Allocations (2025-2026)
// Source: AICPA CPA Exam Blueprints
const BLUEPRINT_WEIGHTS = {
  FAR: {
    'FAR-I': { name: 'Conceptual Framework, Standard-Setting, Financial Reporting', min: 25, max: 35 },
    'FAR-II': { name: 'Select Financial Statement Accounts', min: 30, max: 40 },
    'FAR-III': { name: 'Select Transactions', min: 20, max: 30 },
    'FAR-IV': { name: 'State and Local Governments', min: 5, max: 15 }
  },
  AUD: {
    'AUD-I': { name: 'Ethics, Professional Responsibilities, General Principles', min: 15, max: 25 },
    'AUD-II': { name: 'Assessing Risk and Developing a Planned Response', min: 25, max: 35 },
    'AUD-III': { name: 'Performing Further Procedures and Obtaining Evidence', min: 30, max: 40 },
    'AUD-IV': { name: 'Forming Conclusions and Reporting', min: 10, max: 20 }
  },
  REG: {
    'REG-I': { name: 'Ethics, Professional Responsibilities, Federal Tax Procedures', min: 10, max: 20 },
    'REG-II': { name: 'Business Law', min: 15, max: 25 },
    'REG-III': { name: 'Federal Taxation of Property Transactions', min: 12, max: 22 },
    'REG-IV': { name: 'Federal Taxation of Individuals', min: 22, max: 32 },
    'REG-V': { name: 'Federal Taxation of Entities', min: 18, max: 28 }
  },
  TCP: {
    'TCP-I': { name: 'Tax Compliance and Planning for Individuals', min: 35, max: 45 },
    'TCP-II': { name: 'Tax Compliance and Planning for Entities', min: 30, max: 40 },
    'TCP-III': { name: 'Tax Compliance and Planning for Property Transactions', min: 7, max: 17 },
    'TCP-IV': { name: 'Special Tax Topics', min: 8, max: 18 }
  },
  BAR: {
    'BAR-I': { name: 'Business Analysis', min: 40, max: 50 },
    'BAR-II': { name: 'Technical Accounting and Reporting', min: 35, max: 45 },
    'BAR-III': { name: 'State and Local Governments', min: 10, max: 20 }
  },
  ISC: {
    'ISC-I': { name: 'Information Systems and Data Management', min: 35, max: 45 },
    'ISC-II': { name: 'Security, Confidentiality, and Privacy', min: 35, max: 45 },
    'ISC-III': { name: 'SOC Engagements', min: 15, max: 25 }
  }
};

// Key topics that should be covered per AICPA blueprints
const EXPECTED_TOPICS = {
  FAR: [
    'Revenue Recognition', 'Leases', 'Bonds and Long-term Debt', 'Equity',
    'Business Combinations', 'Consolidations', 'Derivatives and Hedging',
    'Inventory', 'Property, Plant and Equipment', 'Intangible Assets',
    'State and Local Governments', 'Not-for-Profit Organizations',
    'Cash Flow Statement', 'Financial Instruments', 'Income Taxes'
  ],
  AUD: [
    'Audit Planning', 'Risk Assessment', 'Internal Control', 'Audit Evidence',
    'Sampling', 'Audit Reports', 'Ethics and Independence', 'Quality Management',
    'Fraud', 'Going Concern', 'Related Parties', 'Subsequent Events',
    'Review and Compilation', 'Attestation Engagements'
  ],
  REG: [
    'Individual Taxation', 'Corporate Taxation', 'Partnership Taxation',
    'S Corporation Taxation', 'Property Transactions', 'Business Law',
    'Contracts', 'Agency', 'Ethics', 'Tax Procedures', 'Gift and Estate Tax'
  ],
  TCP: [
    'Individual Tax Planning', 'Entity Tax Planning', 'Business Tax Strategies',
    'Property Tax Planning', 'Estate Planning', 'Retirement Planning',
    'Alternative Minimum Tax', 'State Taxation'
  ],
  BAR: [
    'Financial Ratio Analysis', 'Variance Analysis', 'Cost Accounting',
    'Capital Budgeting', 'Performance Measurement', 'Risk Management',
    'Governmental Accounting', 'Technical Accounting'
  ],
  ISC: [
    'IT General Controls', 'Data Management', 'Cybersecurity', 'Privacy',
    'SOC Reports', 'Database Controls', 'Network Security', 'Business Continuity',
    'Access Controls', 'Change Management'
  ]
};

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const TBS_DIR = path.join(__dirname, '../src/lib/data/tbs');
const files = ['far-tbs.ts', 'aud-tbs.ts', 'reg-tbs.ts', 'tcp-tbs.ts', 'bar-tbs.ts', 'isc-tbs.ts'];

function extractContentAreas(content) {
  const contentAreas = [];
  const regex = /contentArea:\s*["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    contentAreas.push(match[1]);
  }
  return contentAreas;
}

function extractTopics(content) {
  const topics = [];
  const regex = /topic:\s*["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    topics.push(match[1]);
  }
  return topics;
}

function analyzeSection(filename, section) {
  const filePath = path.join(TBS_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`${colors.yellow}Skipping ${filename} (not found)${colors.reset}`);
    return null;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const contentAreas = extractContentAreas(content);
  const topics = extractTopics(content);

  // Count content areas
  const areaCounts = {};
  contentAreas.forEach(area => {
    areaCounts[area] = (areaCounts[area] || 0) + 1;
  });

  // Calculate percentages
  const total = contentAreas.length;
  const areaPercentages = {};
  Object.entries(areaCounts).forEach(([area, count]) => {
    areaPercentages[area] = Math.round((count / total) * 100);
  });

  // Count unique topics
  const uniqueTopics = [...new Set(topics)];

  return {
    section,
    total,
    areaCounts,
    areaPercentages,
    uniqueTopics,
    topics
  };
}

function checkAlignment(analysis, section) {
  const issues = [];
  const blueprintWeights = BLUEPRINT_WEIGHTS[section];
  const expectedTopics = EXPECTED_TOPICS[section];

  if (!blueprintWeights) {
    issues.push({ level: 'warning', msg: `No blueprint weights defined for ${section}` });
    return issues;
  }

  // Check content area distribution
  Object.entries(blueprintWeights).forEach(([area, spec]) => {
    const ourPercentage = analysis.areaPercentages[area] || 0;

    if (ourPercentage < spec.min) {
      issues.push({
        level: 'warning',
        msg: `${area} (${spec.name}): ${ourPercentage}% is below AICPA min ${spec.min}%`
      });
    } else if (ourPercentage > spec.max) {
      issues.push({
        level: 'warning',
        msg: `${area} (${spec.name}): ${ourPercentage}% exceeds AICPA max ${spec.max}%`
      });
    }
  });

  // Check for missing content areas
  Object.keys(blueprintWeights).forEach(area => {
    if (!analysis.areaCounts[area]) {
      issues.push({
        level: 'critical',
        msg: `Missing content area: ${area} (${blueprintWeights[area].name})`
      });
    }
  });

  // Check topic coverage
  if (expectedTopics) {
    const topicsLower = analysis.uniqueTopics.map(t => t.toLowerCase());
    expectedTopics.forEach(expected => {
      const found = topicsLower.some(t =>
        t.includes(expected.toLowerCase()) ||
        expected.toLowerCase().includes(t)
      );
      if (!found) {
        issues.push({
          level: 'info',
          msg: `Topic "${expected}" may not be adequately covered`
        });
      }
    });
  }

  return issues;
}

// Main execution
console.log(`${colors.bold}AICPA Blueprint Alignment Check${colors.reset}`);
console.log('================================\n');

const allResults = [];

files.forEach(filename => {
  const section = filename.replace('-tbs.ts', '').toUpperCase();
  const analysis = analyzeSection(filename, section);

  if (!analysis) return;

  allResults.push(analysis);

  console.log(`\n${colors.bold}${colors.blue}=== ${section} ===${colors.reset}`);
  console.log(`Total TBS: ${analysis.total}`);

  // Content Area Distribution
  console.log('\nContent Area Distribution:');
  const blueprintWeights = BLUEPRINT_WEIGHTS[section];

  Object.entries(analysis.areaPercentages).sort().forEach(([area, pct]) => {
    const spec = blueprintWeights?.[area];
    let status = '';
    if (spec) {
      if (pct >= spec.min && pct <= spec.max) {
        status = `${colors.green}✓ within ${spec.min}-${spec.max}%${colors.reset}`;
      } else if (pct < spec.min) {
        status = `${colors.yellow}↓ below ${spec.min}%${colors.reset}`;
      } else {
        status = `${colors.yellow}↑ above ${spec.max}%${colors.reset}`;
      }
    }
    console.log(`  ${area}: ${pct}% (${analysis.areaCounts[area]} questions) ${status}`);
  });

  // Topics
  console.log(`\nUnique Topics (${analysis.uniqueTopics.length}):`);
  analysis.uniqueTopics.slice(0, 10).forEach(t => console.log(`  • ${t}`));
  if (analysis.uniqueTopics.length > 10) {
    console.log(`  ... and ${analysis.uniqueTopics.length - 10} more`);
  }

  // Alignment Issues
  const issues = checkAlignment(analysis, section);
  if (issues.length > 0) {
    console.log('\nAlignment Issues:');
    issues.forEach(issue => {
      const color = issue.level === 'critical' ? colors.red :
                   issue.level === 'warning' ? colors.yellow : colors.blue;
      console.log(`  ${color}[${issue.level.toUpperCase()}]${colors.reset} ${issue.msg}`);
    });
  } else {
    console.log(`\n${colors.green}No alignment issues found${colors.reset}`);
  }
});

// Summary
console.log(`\n\n${colors.bold}${colors.blue}=== OVERALL SUMMARY ===${colors.reset}`);

const totalQuestions = allResults.reduce((sum, r) => sum + r.total, 0);
console.log(`\nTotal TBS Questions: ${totalQuestions}`);

console.log('\nQuestions per Section:');
allResults.forEach(r => {
  console.log(`  ${r.section}: ${r.total}`);
});

console.log('\nRecommendations:');
console.log('1. Review content areas marked as below/above AICPA ranges');
console.log('2. Consider adding more questions in underrepresented areas');
console.log('3. Verify tax-related content reflects current 2025/2026 law');
console.log('4. Reference: https://www.aicpa-cima.com/resources/download/learn-what-is-tested-on-the-cpa-exam');
