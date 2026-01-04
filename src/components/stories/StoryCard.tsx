import Link from 'next/link';
import { SuccessStory } from '@/lib/data/success-stories';

interface StoryCardProps {
  story: SuccessStory;
  featured?: boolean;
}

export default function StoryCard({ story, featured = false }: StoryCardProps) {
  const totalAttempts = story.sections.reduce((sum, s) => sum + s.attempts, 0);
  const avgScore = Math.round(
    story.sections.reduce((sum, s) => sum + s.score, 0) / story.sections.length
  );

  if (featured) {
    return (
      <Link
        href={`/success-stories/${story.slug}`}
        className="group block bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl overflow-hidden hover-lift"
      >
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white">
              {story.situation}
            </span>
            <span className="text-sm text-gray-200">{story.location}</span>
          </div>

          <blockquote className="text-xl md:text-2xl font-medium text-white mb-4 leading-relaxed">
            &ldquo;{story.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {story.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="font-semibold text-white">{story.name}</div>
              <div className="text-sm text-gray-200">
                Passed in {story.totalMonths} months
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {story.sections.map((section) => (
              <div
                key={section.name}
                className="px-3 py-1 bg-white/10 rounded-full text-sm text-white"
              >
                {section.name}: {section.score}
                {section.attempts > 1 && (
                  <span className="text-gray-300 ml-1">
                    ({section.attempts} attempts)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/success-stories/${story.slug}`}
      className="group block bg-white rounded-xl border border-[var(--border)] overflow-hidden hover-lift"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center">
            <span className="text-white font-bold">
              {story.name.charAt(0)}
            </span>
          </div>
          <div>
            <div className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
              {story.name}
            </div>
            <div className="text-sm text-[var(--muted)]">
              {story.situation} • {story.location}
            </div>
          </div>
        </div>

        <blockquote className="text-[var(--foreground)] mb-4 line-clamp-3">
          &ldquo;{story.quote}&rdquo;
        </blockquote>

        <div className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
          <div>
            <span className="font-medium text-[var(--foreground)]">{story.totalMonths}</span> months
          </div>
          <div>
            <span className="font-medium text-[var(--foreground)]">{story.studyHoursPerWeek}</span> hrs/week
          </div>
          <div>
            <span className="font-medium text-[var(--foreground)]">{avgScore}</span> avg score
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[var(--border)] flex gap-2 flex-wrap">
          {story.sections.map((section) => (
            <span
              key={section.name}
              className={`px-2 py-0.5 rounded text-xs font-medium ${
                section.attempts > 1
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {section.name}
              {section.attempts > 1 && ` (${section.attempts}x)`}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
