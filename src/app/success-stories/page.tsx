import Link from 'next/link';
import { successStories, getFeaturedStories } from '@/lib/data/success-stories';
import StoryCard from '@/components/stories/StoryCard';

export const metadata = {
  title: 'CPA Exam Success Stories | Real Candidates, Real Results',
  description: 'Read inspiring stories from real CPA candidates who passed the exam. Learn from working parents, career changers, retakers, and more.',
};

export default function SuccessStoriesPage() {
  const featuredStories = getFeaturedStories();
  const otherStories = successStories.filter((s) => !s.featured);

  // Calculate aggregate stats
  const avgMonths = Math.round(
    successStories.reduce((sum, s) => sum + s.totalMonths, 0) / successStories.length
  );
  const avgHours = Math.round(
    successStories.reduce((sum, s) => sum + s.studyHoursPerWeek, 0) / successStories.length
  );
  const totalRetakes = successStories.reduce(
    (sum, s) => sum + s.sections.filter((sec) => sec.attempts > 1).length,
    0
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CPA Success Stories
            </h1>
            <p className="text-xl text-gray-200">
              Real stories from real candidates. Working parents, career changers, multiple retakers - they all made it, and so can you.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-[var(--border)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[var(--primary)]">
                {successStories.length}
              </div>
              <div className="text-sm text-[var(--muted)]">Success Stories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--primary)]">
                {avgMonths}
              </div>
              <div className="text-sm text-[var(--muted)]">Avg. Months to Pass</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--primary)]">
                {avgHours}
              </div>
              <div className="text-sm text-[var(--muted)]">Avg. Hours/Week</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[var(--primary)]">
                {totalRetakes}
              </div>
              <div className="text-sm text-[var(--muted)]">Section Retakes</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Stories */}
        {featuredStories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
              Featured Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredStories.map((story) => (
                <StoryCard key={story.slug} story={story} featured />
              ))}
            </div>
          </section>
        )}

        {/* All Stories */}
        {otherStories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
              More Stories
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherStories.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          </section>
        )}

        {/* Filter by Situation - Future Enhancement */}
        <section className="mb-12 bg-[var(--card)] rounded-xl p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">
            Find Stories Like Yours
          </h2>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(successStories.map((s) => s.situation))).map((situation) => (
              <span
                key={situation}
                className="px-4 py-2 bg-white rounded-lg border border-[var(--border)] text-sm text-[var(--foreground)] hover:border-[var(--primary)] cursor-pointer transition-colors"
              >
                {situation}
              </span>
            ))}
          </div>
        </section>

        {/* Share Your Story CTA */}
        <section className="bg-[var(--primary)] rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Passed the CPA Exam?
          </h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Your story could inspire the next generation of CPAs. We&apos;d love to feature your journey.
          </p>
          <Link
            href="mailto:stories@cpa-exam-blueprint.com?subject=CPA Success Story Submission"
            className="inline-block bg-white text-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Share Your Story
          </Link>
        </section>

        {/* CTA */}
        <section className="mt-12 bg-[var(--card)] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Start with a personalized study plan tailored to your schedule and goals.
          </p>
          <Link href="/study-plan" className="btn-secondary inline-block">
            Build My Free Study Plan
          </Link>
        </section>
      </div>
    </div>
  );
}
