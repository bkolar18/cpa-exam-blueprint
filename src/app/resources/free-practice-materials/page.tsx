import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free CPA Exam Practice Materials 2025 | AICPA Sample Tests & More',
  description: 'Official free CPA exam practice materials including AICPA sample tests, released questions, and exam blueprints. Links to legitimate free resources for CPA candidates.',
  keywords: 'free CPA practice questions, AICPA sample test, CPA exam released questions, free CPA study materials, AICPA practice exam',
};

const officialResources = [
  {
    name: 'AICPA Sample Tests',
    provider: 'AICPA',
    url: 'https://www.aicpa.org/resources/article/cpa-exam-sample-tests',
    type: 'Practice Tests',
    description: 'Official sample tests from the AICPA that simulate the actual CPA exam interface. Includes sample MCQs and TBS for all exam sections.',
    sections: ['FAR', 'AUD', 'REG', 'TCP', 'ISC', 'BAR'],
    cost: 'Free',
    highlights: [
      'Authentic exam interface experience',
      'Official AICPA content',
      'Covers all exam sections',
      'TBS and MCQ samples included',
    ],
    limitations: [
      'Limited number of questions',
      'Not updated frequently',
      'No explanations for answers',
    ],
  },
  {
    name: 'CPA Exam Blueprints',
    provider: 'AICPA',
    url: 'https://www.aicpa.org/resources/article/learn-what-is-tested-on-the-cpa-exam',
    type: 'Study Guide',
    description: 'The official exam blueprints outline exactly what topics are tested on each CPA exam section, including skill levels and representative tasks.',
    sections: ['FAR', 'AUD', 'REG', 'TCP', 'ISC', 'BAR'],
    cost: 'Free',
    highlights: [
      'Authoritative topic coverage list',
      'Skill level requirements',
      'Representative tasks for each area',
      'Essential for study planning',
    ],
    limitations: [
      'No practice questions',
      'Can be dense to read through',
    ],
  },
  {
    name: 'FASB Accounting Standards Codification',
    provider: 'FASB',
    url: 'https://asc.fasb.org/',
    type: 'Reference',
    description: 'The authoritative source of US GAAP. Basic view is free and provides access to all accounting standards tested on FAR.',
    sections: ['FAR'],
    cost: 'Free (Basic View)',
    highlights: [
      'Primary source of US GAAP',
      'Authoritative guidance',
      'Searchable database',
      'Updated with new standards',
    ],
    limitations: [
      'Not study-friendly format',
      'Technical language',
      'Professional view requires subscription',
    ],
  },
  {
    name: 'IRS Publications',
    provider: 'IRS',
    url: 'https://www.irs.gov/forms-pubs',
    type: 'Reference',
    description: 'Official IRS publications covering tax topics tested on REG and TCP sections. Publication 17 (individual taxes) is particularly useful.',
    sections: ['REG', 'TCP'],
    cost: 'Free',
    highlights: [
      'Authoritative tax guidance',
      'Updated annually',
      'Covers individual and business tax',
      'Examples included',
    ],
    limitations: [
      'Not exam-focused',
      'Very detailed and lengthy',
      'No practice questions',
    ],
  },
  {
    name: 'PCAOB Auditing Standards',
    provider: 'PCAOB',
    url: 'https://pcaobus.org/oversight/standards/auditing-standards',
    type: 'Reference',
    description: 'Official auditing standards for public company audits. Essential reference for AUD section topics.',
    sections: ['AUD'],
    cost: 'Free',
    highlights: [
      'Authoritative auditing standards',
      'Public company audit requirements',
      'Searchable database',
    ],
    limitations: [
      'Focuses on public company audits',
      'Technical reading',
      'No practice materials',
    ],
  },
  {
    name: 'AICPA Professional Standards',
    provider: 'AICPA',
    url: 'https://www.aicpa.org/research/standards',
    type: 'Reference',
    description: 'AICPA auditing standards (SASs) and other professional standards for non-public company audits and other engagements.',
    sections: ['AUD'],
    cost: 'Free (some content)',
    highlights: [
      'Non-public company audit standards',
      'Attestation standards',
      'Ethics requirements',
    ],
    limitations: [
      'Some content requires membership',
      'Technical language',
    ],
  },
];

const studyCommunities = [
  {
    name: 'r/CPA (Reddit)',
    url: 'https://www.reddit.com/r/CPA/',
    description: 'Active community of CPA candidates sharing study tips, score releases, and exam experiences.',
    members: '100K+',
  },
  {
    name: 'Another71 Forum',
    url: 'https://www.another71.com/cpa-exam-forum/',
    description: 'Long-running CPA exam forum with study groups, exam tips, and candidate discussions.',
    members: '50K+',
  },
  {
    name: 'CPA Exam Club (Facebook)',
    url: 'https://www.facebook.com/groups/cpaexamclub/',
    description: 'Facebook group for CPA candidates to share resources and support each other.',
    members: '30K+',
  },
];

const usageTips = [
  {
    title: 'Start with the Blueprints',
    description: 'Before diving into practice, understand what topics are tested by reviewing the official AICPA blueprints for each section.',
  },
  {
    title: 'Use AICPA Sample Tests Strategically',
    description: 'Save the official sample tests for closer to exam day to assess your readiness and familiarize yourself with the interface.',
  },
  {
    title: 'Reference Standards When Confused',
    description: 'When a concept isn\'t clear from your study materials, refer to the original FASB or IRS guidance for authoritative explanations.',
  },
  {
    title: 'Join a Community',
    description: 'Connect with other candidates for motivation, study tips, and answers to specific questions. Fellow candidates are a valuable resource.',
  },
];

const baseUrl = "https://meridiancpareview.com";

export default function FreePracticeMaterialsPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Resources", url: `${baseUrl}/resources` },
          { name: "Free Practice Materials", url: `${baseUrl}/resources/free-practice-materials` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/resources"
              className="inline-flex items-center text-gray-200 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Resources
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Free CPA Exam Practice Materials
            </h1>
            <p className="text-xl text-gray-200">
              Official free resources from AICPA, FASB, IRS, and other authoritative sources to supplement your CPA exam preparation.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Note:</strong> All links lead to external official websites. We do not host or redistribute any copyrighted materials.
              Links are provided for educational reference only and may change. Always verify information directly with the source.
            </div>
          </div>
        </div>

        {/* Official Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Official Free Resources</h2>
          <div className="space-y-6">
            {officialResources.map((resource, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-[var(--foreground)]">{resource.name}</h3>
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                        {resource.cost}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                      <span>{resource.provider}</span>
                      <span>•</span>
                      <span>{resource.type}</span>
                    </div>
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Visit Resource
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                <p className="text-[var(--muted)] mb-4">{resource.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {resource.sections.map((section, sectionIdx) => (
                    <span
                      key={sectionIdx}
                      className="text-xs bg-[var(--primary)] bg-opacity-10 text-[var(--primary)] px-2 py-1 rounded"
                    >
                      {section}
                    </span>
                  ))}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-[var(--foreground)] mb-2 text-sm">What It Offers:</h4>
                    <ul className="space-y-1">
                      {resource.highlights.map((highlight, highlightIdx) => (
                        <li key={highlightIdx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-[var(--foreground)] mb-2 text-sm">Limitations:</h4>
                    <ul className="space-y-1">
                      {resource.limitations.map((limitation, limitIdx) => (
                        <li key={limitIdx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                          <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span>{limitation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Study Communities */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Study Communities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {studyCommunities.map((community, idx) => (
              <a
                key={idx}
                href={community.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] transition-colors"
              >
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{community.name}</h3>
                <p className="text-sm text-[var(--muted)] mb-3">{community.description}</p>
                <span className="text-xs text-[var(--primary)]">{community.members} members</span>
              </a>
            ))}
          </div>
        </section>

        {/* Usage Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">How to Use These Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {usageTips.map((tip, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{tip.title}</h3>
                <p className="text-[var(--muted)] text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready for More Structured Practice?
          </h2>
          <p className="text-gray-200 mb-6 max-w-2xl">
            Official resources are great for reference, but passing the CPA exam requires extensive practice with
            exam-style questions. Meridian CPA Review offers free access to thousands of MCQs and simulations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center bg-white text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Practicing Free
            </Link>
            <Link
              href="/resources/free-cpa-videos"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Free Video Lectures
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
