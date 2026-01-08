import Link from 'next/link';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog/posts';
import { categoryLabels, categoryColors } from '@/lib/blog/types';

export const metadata = {
  title: 'CPA Exam Blog | Study Tips, Strategies & Guides',
  description: 'CPA exam tips, study strategies, and section guides. Get the latest insights to help you prepare for the CPA exam.',
};

function PostCard({ post }: { post: ReturnType<typeof getAllPosts>[0] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-xl border border-[var(--border)] overflow-hidden hover-lift"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[post.category]}`}>
            {categoryLabels[post.category]}
          </span>
          <span className="text-sm text-[var(--muted)]">{post.readingTime} min read</span>
        </div>
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
          {post.title}
        </h2>
        <p className="text-[var(--muted)] mb-4 line-clamp-2">
          {post.description}
        </p>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--muted)]">{post.author}</span>
          <span className="text-[var(--muted)]">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}

function FeaturedPost({ post }: { post: ReturnType<typeof getAllPosts>[0] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl overflow-hidden hover-lift"
    >
      <div className="p-8 md:p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white">
            Featured
          </span>
          <span className="text-sm text-gray-200">{post.readingTime} min read</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-gray-200 transition-colors">
          {post.title}
        </h2>
        <p className="text-gray-200 mb-6 text-lg">
          {post.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <span>{post.author}</span>
          <span>•</span>
          <span>
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const regularPosts = allPosts.filter((post) => !post.featured);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CPA Exam Blog
            </h1>
            <p className="text-xl text-gray-200">
              Study tips, strategies, and insights to help you prepare for the CPA exam.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {allPosts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[var(--card)] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-2">
              Blog Coming Soon
            </h2>
            <p className="text-[var(--muted)] max-w-md mx-auto mb-6">
              We&apos;re working on creating valuable content to help you pass the CPA exam. Check back soon!
            </p>
            <Link
              href="/study-plan"
              className="btn-primary inline-block"
            >
              Build Your Study Plan
            </Link>
          </div>
        ) : (
          <>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <div className="grid gap-6">
                  {featuredPosts.map((post) => (
                    <FeaturedPost key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )}

            {/* All Posts */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                {featuredPosts.length > 0 ? 'Latest Articles' : 'All Articles'}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          </>
        )}

        {/* CTA Section */}
        <section className="mt-16 bg-[var(--card)] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
            Ready to Start Your CPA Journey?
          </h2>
          <p className="text-[var(--muted)] mb-6 max-w-2xl mx-auto">
            Get a personalized study plan based on your schedule, background, and goals.
          </p>
          <Link
            href="/study-plan"
            className="btn-secondary inline-block"
          >
            Build My Free Study Plan
          </Link>
        </section>
      </div>
    </div>
  );
}
