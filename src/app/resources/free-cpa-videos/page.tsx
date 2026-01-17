import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Free CPA Exam Video Lectures 2025 | YouTube Channels & Resources',
  description: 'Curated list of free CPA exam video lectures on YouTube. Learn from Farhat Lectures, Edspira, Darius Clark, and other free accounting education channels.',
  keywords: 'free CPA videos, CPA exam YouTube, Farhat Lectures, Edspira, free accounting videos, CPA exam free resources',
};

const videoResources = [
  {
    name: 'Farhat Lectures',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@FarhatLectures',
    subscribers: '500K+',
    sections: ['FAR', 'AUD', 'REG'],
    description: 'Professor Farhat provides comprehensive accounting lectures covering financial accounting, auditing, and tax topics. Known for clear explanations and thorough coverage of complex topics.',
    strengths: [
      'In-depth conceptual explanations',
      'Covers intermediate and advanced accounting',
      'Professional teaching style',
      'Regularly updated content',
    ],
    bestFor: 'Students who want thorough, professor-style lectures on accounting concepts.',
    verified: true,
  },
  {
    name: 'Edspira',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@Edspira',
    subscribers: '300K+',
    sections: ['FAR', 'AUD'],
    description: 'Educational videos on financial accounting, managerial accounting, and auditing. Created by a CPA with experience in public accounting and academia.',
    strengths: [
      'Clear, concise explanations',
      'Good visual aids and examples',
      'Covers both basic and advanced topics',
      'Strong audit content',
    ],
    bestFor: 'Visual learners who appreciate well-organized, straightforward explanations.',
    verified: true,
  },
  {
    name: 'Darius Clark CPA',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@DariusClarkCPA',
    subscribers: '100K+',
    sections: ['FAR', 'AUD', 'REG', 'BEC'],
    description: 'CPA exam tips, motivation, and study advice from a CPA who passed all four sections. Focus on study strategies and exam-taking techniques.',
    strengths: [
      'Real CPA exam experience insights',
      'Study tips and motivation',
      'Score release reactions and advice',
      'Relatable student perspective',
    ],
    bestFor: 'Candidates looking for motivation, study tips, and real exam experience insights.',
    verified: true,
  },
  {
    name: 'Accounting Stuff',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@AccountingStuff',
    subscribers: '400K+',
    sections: ['FAR'],
    description: 'Engaging videos on accounting fundamentals with a focus on making accounting concepts accessible and interesting.',
    strengths: [
      'Entertaining presentation style',
      'Great for beginners',
      'Visual explanations of debits/credits',
      'Covers accounting basics thoroughly',
    ],
    bestFor: 'Those who need to strengthen foundational accounting knowledge.',
    verified: true,
  },
  {
    name: 'The Accounting Tutor',
    platform: 'YouTube',
    url: 'https://www.youtube.com/@TheAccountingTutor',
    subscribers: '50K+',
    sections: ['FAR', 'REG'],
    description: 'Step-by-step tutorials on accounting problems and tax calculations. Focuses on working through specific examples.',
    strengths: [
      'Problem-solving focused',
      'Step-by-step walkthroughs',
      'Good for practice problem review',
      'Tax calculation tutorials',
    ],
    bestFor: 'Candidates who learn best by watching problems being solved.',
    verified: true,
  },
  {
    name: 'Rutgers Accounting Web',
    platform: 'Website/YouTube',
    url: 'https://raw.rutgers.edu/',
    subscribers: 'N/A',
    sections: ['FAR', 'AUD'],
    description: 'Academic accounting resources from Rutgers University including video lectures and reference materials.',
    strengths: [
      'Academic quality content',
      'Research-backed information',
      'Professional standards coverage',
      'Free educational resources',
    ],
    bestFor: 'Those who prefer academic-style instruction.',
    verified: true,
  },
];

const usageTips = [
  {
    tip: 'Supplement, Don\'t Replace',
    description: 'Use free videos to supplement your primary study materials, not replace them. Free content may not cover all exam topics or be updated for recent changes.',
  },
  {
    tip: 'Check the Date',
    description: 'Accounting standards change. Always check when a video was published and verify that the content reflects current standards.',
  },
  {
    tip: 'Focus on Weak Areas',
    description: 'Use free videos strategically for topics you\'re struggling with rather than trying to watch everything.',
  },
  {
    tip: 'Take Notes Actively',
    description: 'Don\'t just passively watch - take notes, pause to work through examples, and test yourself afterward.',
  },
];

const baseUrl = "https://meridiancpareview.com";

export default function FreeCPAVideosPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "Resources", url: `${baseUrl}/resources` },
          { name: "Free CPA Videos", url: `${baseUrl}/resources/free-cpa-videos` },
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
              Free CPA Exam Video Lectures
            </h1>
            <p className="text-xl text-gray-200">
              A curated list of free YouTube channels and video resources to help supplement your CPA exam preparation.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-8">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-amber-800 dark:text-amber-300">
              <strong>Important:</strong> Free videos are a helpful supplement but should not be your only study resource.
              They may not cover all exam topics, may be outdated, and don&apos;t provide the practice questions essential for CPA exam success.
              Always verify content against current exam blueprints and accounting standards.
            </div>
          </div>
        </div>

        {/* Video Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Recommended YouTube Channels</h2>
          <div className="space-y-6">
            {videoResources.map((resource, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-[var(--foreground)]">{resource.name}</h3>
                      {resource.verified && (
                        <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-[var(--muted)]">
                      <span>{resource.platform}</span>
                      <span>•</span>
                      <span>{resource.subscribers} subscribers</span>
                    </div>
                  </div>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Visit Channel
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
                    <h4 className="font-medium text-[var(--foreground)] mb-2 text-sm">Strengths:</h4>
                    <ul className="space-y-1">
                      {resource.strengths.map((strength, strengthIdx) => (
                        <li key={strengthIdx} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-[var(--foreground)] mb-2 text-sm">Best For:</h4>
                    <p className="text-sm text-[var(--muted)]">{resource.bestFor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Use Effectively */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">How to Use Free Videos Effectively</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {usageTips.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
                <h3 className="font-semibold text-[var(--foreground)] mb-2">{item.tip}</h3>
                <p className="text-[var(--muted)] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Limitations of Free Video Content</h2>
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[var(--muted)]">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span><strong>No practice questions:</strong> Videos don&apos;t provide the essential MCQ and TBS practice needed for the exam.</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--muted)]">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span><strong>May be outdated:</strong> Accounting standards change frequently - older videos may contain incorrect information.</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--muted)]">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span><strong>Incomplete coverage:</strong> Free channels rarely cover all CPA exam topics comprehensively.</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--muted)]">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span><strong>No progress tracking:</strong> You can&apos;t track what you&apos;ve learned or identify weak areas.</span>
              </li>
              <li className="flex items-start gap-3 text-[var(--muted)]">
                <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span><strong>Not exam-focused:</strong> Academic content may not align with actual CPA exam format and question styles.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Need Practice Questions Too?
          </h2>
          <p className="text-gray-200 mb-6 max-w-2xl">
            Free videos are great for understanding concepts, but passing the CPA exam requires practice.
            Meridian CPA Review offers free access to thousands of MCQs and simulations during our beta period.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center bg-white text-[var(--primary)] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Practicing Free
            </Link>
            <Link
              href="/resources/free-practice-materials"
              className="inline-flex items-center justify-center bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              More Free Resources
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
