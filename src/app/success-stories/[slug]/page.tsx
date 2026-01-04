import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getStoryBySlug, getAllStorySlugs, successStories } from '@/lib/data/success-stories';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllStorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return { title: 'Story Not Found' };
  }

  return {
    title: `${story.name}'s CPA Success Story | ${story.situation}`,
    description: story.quote,
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const avgScore = Math.round(
    story.sections.reduce((sum, s) => sum + s.score, 0) / story.sections.length
  );

  // Get related stories (same situation or different for variety)
  const relatedStories = successStories
    .filter((s) => s.slug !== story.slug)
    .slice(0, 2);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/success-stories"
            className="inline-flex items-center text-gray-200 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Success Stories
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">
                {story.name.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{story.name}</h1>
              <div className="flex items-center gap-2 text-gray-200 mt-1">
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-sm">
                  {story.situation}
                </span>
                <span>•</span>
                <span>{story.location}</span>
              </div>
            </div>
          </div>

          <blockquote className="text-xl md:text-2xl font-medium italic text-gray-100">
            &ldquo;{story.quote}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-[var(--border)] py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {story.totalMonths}
              </div>
              <div className="text-sm text-[var(--muted)]">Months to Pass</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {story.studyHoursPerWeek}
              </div>
              <div className="text-sm text-[var(--muted)]">Hours/Week</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {avgScore}
              </div>
              <div className="text-sm text-[var(--muted)]">Avg. Score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary)]">
                {story.sections.length}
              </div>
              <div className="text-sm text-[var(--muted)]">Sections Passed</div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Scores */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
            Exam Results
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {story.sections.map((section) => (
              <div
                key={section.name}
                className="bg-white rounded-xl border border-[var(--border)] p-4 text-center"
              >
                <div className="text-3xl font-bold text-[var(--primary)] mb-1">
                  {section.score}
                </div>
                <div className="font-semibold text-[var(--foreground)]">
                  {section.name}
                </div>
                {section.attempts > 1 ? (
                  <div className="text-sm text-orange-600 mt-1">
                    {section.attempts} attempts
                  </div>
                ) : (
                  <div className="text-sm text-green-600 mt-1">
                    First attempt
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Full Story */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
            {story.name}&apos;s Story
          </h2>
          <div className="bg-white rounded-xl border border-[var(--border)] p-6 md:p-8">
            <div className="prose prose-lg max-w-none">
              {story.fullStory.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-[var(--foreground)] leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
            {story.name}&apos;s Top Tips
          </h2>
          <div className="bg-[var(--card)] rounded-xl p-6">
            <ul className="space-y-3">
              {story.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[var(--secondary)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <span className="text-[var(--foreground)]">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
              More Success Stories
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedStories.map((relatedStory) => (
                <Link
                  key={relatedStory.slug}
                  href={`/success-stories/${relatedStory.slug}`}
                  className="group bg-white rounded-xl border border-[var(--border)] p-6 hover-lift"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {relatedStory.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {relatedStory.name}
                      </div>
                      <div className="text-sm text-[var(--muted)]">
                        {relatedStory.situation}
                      </div>
                    </div>
                  </div>
                  <p className="text-[var(--muted)] text-sm line-clamp-2">
                    &ldquo;{relatedStory.quote}&rdquo;
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[var(--card)] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            Start Your Success Story
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Get a personalized study plan based on your schedule, just like {story.name} did.
          </p>
          <Link href="/study-plan" className="btn-secondary inline-block">
            Build My Free Study Plan
          </Link>
        </section>
      </div>
    </div>
  );
}
