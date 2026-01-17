import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Audit Reports Guide for CPA Exam | AUD',
  description: 'Master audit report types for the CPA exam. Learn unmodified, qualified, adverse, and disclaimer opinions, plus report modifications and key audit matters.',
  keywords: 'audit report, audit opinion, unmodified opinion, qualified opinion, adverse opinion, disclaimer, CPA exam, AUD exam, auditor report',
};

const opinionTypes = [
  {
    type: 'Unmodified Opinion',
    also: '(Unqualified / Clean)',
    meaning: 'Financial statements are fairly presented in all material respects in accordance with the applicable framework.',
    when: 'No material misstatements, no scope limitations, proper application of GAAP.',
    keyPhrase: '"present fairly, in all material respects"',
    color: 'green',
  },
  {
    type: 'Qualified Opinion',
    also: '(Except For)',
    meaning: 'Financial statements are fairly presented EXCEPT FOR a specific matter.',
    when: 'Material but not pervasive misstatement OR inability to obtain sufficient evidence on specific area (scope limitation).',
    keyPhrase: '"except for the effects of..."',
    color: 'yellow',
  },
  {
    type: 'Adverse Opinion',
    also: '',
    meaning: 'Financial statements are NOT fairly presented.',
    when: 'Material AND pervasive misstatement. Management refuses to correct material issues that affect the financial statements as a whole.',
    keyPhrase: '"do not present fairly"',
    color: 'red',
  },
  {
    type: 'Disclaimer of Opinion',
    also: '',
    meaning: 'Auditor cannot express an opinion.',
    when: 'Material AND pervasive scope limitation. Auditor cannot obtain sufficient appropriate audit evidence.',
    keyPhrase: '"we do not express an opinion"',
    color: 'gray',
  },
];

const decisionMatrix = [
  { scenario: 'Material, Not Pervasive Misstatement', opinion: 'Qualified' },
  { scenario: 'Material, Pervasive Misstatement', opinion: 'Adverse' },
  { scenario: 'Material, Not Pervasive Scope Limitation', opinion: 'Qualified' },
  { scenario: 'Material, Pervasive Scope Limitation', opinion: 'Disclaimer' },
  { scenario: 'Immaterial Issue', opinion: 'Unmodified' },
];

const reportSections = [
  {
    section: 'Title',
    content: 'Must include "Independent" (e.g., "Report of Independent Auditor")',
    requirement: 'Required',
  },
  {
    section: 'Addressee',
    content: 'Usually shareholders/board of directors',
    requirement: 'Required',
  },
  {
    section: 'Opinion Section',
    content: 'States the opinion - must be FIRST section in the report',
    requirement: 'Required (First)',
  },
  {
    section: 'Basis for Opinion',
    content: 'States audit was conducted per GAAS, auditor is independent, evidence is sufficient',
    requirement: 'Required',
  },
  {
    section: 'Key Audit Matters (KAM)',
    content: 'Matters of most significance communicated to TCWG',
    requirement: 'Required for listed entities',
  },
  {
    section: 'Responsibilities of Management',
    content: 'Management is responsible for FS, internal control, and going concern assessment',
    requirement: 'Required',
  },
  {
    section: 'Auditor\'s Responsibilities',
    content: 'Obtain reasonable assurance, exercise professional judgment, evaluate internal control',
    requirement: 'Required',
  },
  {
    section: 'Other Reporting Responsibilities',
    content: 'If auditor has other reporting duties (e.g., report on IC)',
    requirement: 'If applicable',
  },
  {
    section: 'Signature',
    content: 'Firm name (manual or printed)',
    requirement: 'Required',
  },
  {
    section: 'Auditor\'s Address',
    content: 'City and state of auditor\'s office',
    requirement: 'Required',
  },
  {
    section: 'Date',
    content: 'Date sufficient appropriate evidence obtained (not before)',
    requirement: 'Required',
  },
];

const emphasisMatters = [
  {
    type: 'Emphasis-of-Matter Paragraph',
    purpose: 'Draw attention to a matter appropriately presented/disclosed in the FS that is fundamental to users\' understanding.',
    examples: [
      'Significant uncertainty (not going concern)',
      'Major catastrophic event',
      'Significant related party transactions',
      'Important subsequent events',
    ],
    effect: 'Does NOT affect the opinion',
    placement: 'After Opinion and Basis for Opinion sections',
  },
  {
    type: 'Other-Matter Paragraph',
    purpose: 'Draw attention to a matter NOT presented/disclosed in the FS that is relevant to understanding the audit.',
    examples: [
      'Prior period was audited by another auditor',
      'Supplementary information accompanies FS',
      'Restriction on distribution/use of report',
    ],
    effect: 'Does NOT affect the opinion',
    placement: 'After Opinion, Basis, and any EOM paragraphs',
  },
];

const goingConcern = {
  title: 'Going Concern',
  standard: 'AU-C 570',
  auditorResponsibility: 'Evaluate whether substantial doubt exists about entity\'s ability to continue as a going concern for reasonable period (12 months from FS date or date report issued, whichever is later).',
  scenarios: [
    {
      situation: 'Substantial doubt exists but adequately disclosed',
      action: 'Unmodified opinion with Emphasis-of-Matter paragraph',
    },
    {
      situation: 'Substantial doubt exists, disclosure is inadequate',
      action: 'Qualified or Adverse opinion (depending on materiality/pervasiveness)',
    },
    {
      situation: 'Management unwilling to make or extend assessment',
      action: 'Qualified or Disclaimer (scope limitation)',
    },
  ],
  examTip: 'Going concern doubt with proper disclosure = EOM paragraph (NOT modified opinion). Only modify if disclosure is inadequate.',
};

const commonMistakes = [
  {
    mistake: 'Confusing scope limitation with misstatement outcomes',
    correction: 'Scope limitation (can\'t get evidence) → Qualified or Disclaimer. Misstatement (wrong) → Qualified or Adverse.',
  },
  {
    mistake: 'Thinking EOM paragraph modifies the opinion',
    correction: 'Emphasis-of-Matter and Other-Matter paragraphs do NOT modify the opinion. They just highlight important matters.',
  },
  {
    mistake: 'Placing Opinion section in wrong location',
    correction: 'Opinion section must be FIRST in the report (changed from old standards where it came after scope paragraph).',
  },
  {
    mistake: 'Confusing material vs. pervasive',
    correction: 'Pervasive = affects many accounts, a substantial portion of FS, or fundamental to users\' understanding. Material but not pervasive = affects specific area only.',
  },
  {
    mistake: 'Using "subject to" or "with the foregoing explanation"',
    correction: 'These phrases are NOT allowed in audit reports. They create inappropriate qualified opinions.',
  },
];

const faqs = [
  {
    question: 'What is the difference between "material" and "pervasive"?',
    answer: 'Material means the misstatement or scope limitation is significant enough to influence users\' decisions. Pervasive means it affects the financial statements as a whole - either by affecting many accounts, representing a substantial portion of the FS, or being fundamental to understanding. A single misstatement can be material but not pervasive if it only affects one area.',
  },
  {
    question: 'When does the auditor date the report?',
    answer: 'The report is dated no earlier than the date the auditor has obtained sufficient appropriate audit evidence. This is typically when fieldwork is complete and the auditor has obtained written representations from management and reviewed subsequent events through that date.',
  },
  {
    question: 'What are Key Audit Matters (KAM)?',
    answer: 'KAMs are matters communicated to those charged with governance that required significant auditor attention. They\'re required for audits of listed entities. They might include areas of significant risk, complex accounting, or areas requiring significant judgment. KAMs are NOT opinion modifiers.',
  },
  {
    question: 'Can an auditor issue an unmodified opinion with an EOM paragraph about going concern?',
    answer: 'Yes. If management has made adequate disclosures about the going concern uncertainty in the financial statements, the auditor issues an unmodified opinion and adds an Emphasis-of-Matter paragraph to draw attention to the disclosure. The opinion is only modified if disclosure is inadequate.',
  },
];

const baseUrl = "https://meridiancpareview.com";

export default function AuditReportsPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "AUD", url: `${baseUrl}/sections/aud` },
          { name: "Audit Reports", url: `${baseUrl}/topics/aud/audit-reports` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/sections/aud"
                className="text-purple-200 hover:text-white transition-colors"
              >
                AUD
              </Link>
              <span className="text-purple-300">/</span>
              <span className="text-purple-200">Topics</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Audit Reports & Opinions
            </h1>
            <p className="text-xl text-purple-100">
              Master the four types of audit opinions and report modifications for the CPA exam.
              Learn when to issue each type and how to structure the audit report.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Reference */}
        <div className="bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl p-6 mb-12">
          <h2 className="text-lg font-semibold text-purple-900 dark:text-purple-200 mb-3">
            Opinion Types at a Glance
          </h2>
          <div className="grid md:grid-cols-4 gap-3 text-center text-sm">
            <div className="bg-green-100 dark:bg-green-900/50 rounded-lg p-3">
              <div className="font-bold text-green-800 dark:text-green-200">Unmodified</div>
              <div className="text-green-700 dark:text-green-300">Clean - No issues</div>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/50 rounded-lg p-3">
              <div className="font-bold text-yellow-800 dark:text-yellow-200">Qualified</div>
              <div className="text-yellow-700 dark:text-yellow-300">Except for (Material, not pervasive)</div>
            </div>
            <div className="bg-red-100 dark:bg-red-900/50 rounded-lg p-3">
              <div className="font-bold text-red-800 dark:text-red-200">Adverse</div>
              <div className="text-red-700 dark:text-red-300">Not fairly presented (Pervasive misstatement)</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-3">
              <div className="font-bold text-gray-800 dark:text-gray-200">Disclaimer</div>
              <div className="text-gray-700 dark:text-gray-300">No opinion (Pervasive scope limit)</div>
            </div>
          </div>
        </div>

        {/* Opinion Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Types of Audit Opinions
          </h2>
          <div className="space-y-4">
            {opinionTypes.map((opinion, idx) => (
              <div key={idx} className={`rounded-xl border p-6 ${
                opinion.color === 'green' ? 'bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800' :
                opinion.color === 'yellow' ? 'bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800' :
                opinion.color === 'red' ? 'bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800' :
                'bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700'
              }`}>
                <h3 className={`text-xl font-semibold mb-1 ${
                  opinion.color === 'green' ? 'text-green-800 dark:text-green-200' :
                  opinion.color === 'yellow' ? 'text-yellow-800 dark:text-yellow-200' :
                  opinion.color === 'red' ? 'text-red-800 dark:text-red-200' :
                  'text-gray-800 dark:text-gray-200'
                }`}>
                  {opinion.type} {opinion.also && <span className="text-sm font-normal">{opinion.also}</span>}
                </h3>
                <p className={`mb-3 ${
                  opinion.color === 'green' ? 'text-green-700 dark:text-green-300' :
                  opinion.color === 'yellow' ? 'text-yellow-700 dark:text-yellow-300' :
                  opinion.color === 'red' ? 'text-red-700 dark:text-red-300' :
                  'text-gray-700 dark:text-gray-300'
                }`}>
                  <strong>Meaning:</strong> {opinion.meaning}
                </p>
                <p className={`mb-3 text-sm ${
                  opinion.color === 'green' ? 'text-green-600 dark:text-green-300' :
                  opinion.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-300' :
                  opinion.color === 'red' ? 'text-red-600 dark:text-red-300' :
                  'text-gray-600 dark:text-gray-300'
                }`}>
                  <strong>When:</strong> {opinion.when}
                </p>
                <p className={`text-sm font-mono ${
                  opinion.color === 'green' ? 'text-green-800 dark:text-green-200' :
                  opinion.color === 'yellow' ? 'text-yellow-800 dark:text-yellow-200' :
                  opinion.color === 'red' ? 'text-red-800 dark:text-red-200' :
                  'text-gray-800 dark:text-gray-200'
                }`}>
                  Key phrase: {opinion.keyPhrase}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Decision Matrix */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Opinion Decision Matrix
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Scenario</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[var(--foreground)]">Opinion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {decisionMatrix.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-6 py-4 text-[var(--foreground)]">{row.scenario}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          row.opinion === 'Unmodified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          row.opinion === 'Qualified' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          row.opinion === 'Adverse' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {row.opinion}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Report Sections */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Audit Report Structure
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <p className="text-[var(--muted)] mb-4">
              The audit report follows a specific order. Note that the <strong>Opinion section must come FIRST</strong>.
            </p>
            <ol className="space-y-3">
              {reportSections.map((section, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[var(--foreground)]">{section.section}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        section.requirement.includes('Required') ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' :
                        'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                      }`}>
                        {section.requirement}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--muted)]">{section.content}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* EOM and OM Paragraphs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Emphasis-of-Matter & Other-Matter Paragraphs
          </h2>
          <div className="space-y-4">
            {emphasisMatters.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{item.type}</h3>
                <p className="text-[var(--muted)] mb-3">{item.purpose}</p>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-[var(--foreground)] mb-2">Examples:</h4>
                    <ul className="space-y-1">
                      {item.examples.map((ex, exIdx) => (
                        <li key={exIdx} className="text-sm text-[var(--muted)] flex items-start gap-2">
                          <span className="text-[var(--primary)]">•</span>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-green-50 dark:bg-green-950/40 rounded p-3 text-sm">
                      <span className="text-green-700 dark:text-green-300 font-medium">Effect:</span>{' '}
                      <span className="text-green-600 dark:text-green-300">{item.effect}</span>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/40 rounded p-3 text-sm">
                      <span className="text-blue-700 dark:text-blue-300 font-medium">Placement:</span>{' '}
                      <span className="text-blue-600 dark:text-blue-300">{item.placement}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Going Concern */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Going Concern Considerations
          </h2>
          <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
            <p className="text-[var(--muted)] mb-4">{goingConcern.auditorResponsibility}</p>
            <div className="space-y-3 mb-4">
              {goingConcern.scenarios.map((s, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                  <div className="font-medium text-[var(--foreground)] mb-1">{s.situation}</div>
                  <div className="text-sm text-[var(--muted)]">→ {s.action}</div>
                </div>
              ))}
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-950/40 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <span className="text-yellow-600 dark:text-yellow-400 font-bold">Exam Tip:</span>{' '}
              <span className="text-yellow-800 dark:text-yellow-300">{goingConcern.examTip}</span>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Common Exam Mistakes
          </h2>
          <div className="space-y-4">
            {commonMistakes.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-4">
                <div className="flex items-start gap-3">
                  <div className="text-red-500 mt-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-[var(--foreground)] mb-1">{item.mistake}</h3>
                    <p className="text-sm text-[var(--muted)]">{item.correction}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6"
              >
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{faq.question}</h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Practice Audit Report Questions
          </h2>
          <p className="text-purple-100 mb-6">
            Reinforce your understanding with practice MCQs covering audit opinions, report modifications, and going concern.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Start Practicing Free
            </Link>
            <Link
              href="/sections/aud"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View All AUD Topics
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
