import Link from "next/link";

export const metadata = {
  title: "Recommended CPA Review Program | CPA Exam Blueprint",
  description: "See the CPA review program we recommend to our students. Clear disclosure of our affiliation and why we believe in this program.",
};

export default function RecommendedProgramPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              The CPA Review Program We Recommend
            </h1>
            <p className="text-xl text-gray-200">
              After years of helping CPA candidates, we&apos;ve identified one program that aligns with our study methodology and delivers consistent results.
            </p>
          </div>
        </div>
      </section>

      {/* Disclosure Banner */}
      <section className="bg-amber-50 border-b border-amber-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-amber-800">
              <strong>Transparency Disclosure:</strong> We are an affiliate of the program recommended below. This means we may receive a commission if you purchase through our link. However, we only recommend products we genuinely believe in and have personally vetted. Our recommendation is based on our professional experience, not compensation.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Why We Recommend This Program */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                Why We Recommend This Program
              </h2>
              <p className="text-[var(--muted)] mb-6">
                We&apos;ve evaluated every major CPA review course on the market. Here&apos;s why our recommended program stands out:
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[var(--secondary)] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Adaptive Learning Technology</h3>
                    <p className="text-[var(--muted)]">
                      The program identifies your weak areas and focuses your study time where it matters most. This is especially valuable for working professionals with limited study time.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[var(--secondary)] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Extensive Practice Questions</h3>
                    <p className="text-[var(--muted)]">
                      Thousands of MCQs and simulations that closely mirror the actual exam. The question bank is continuously updated to reflect current exam content.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[var(--secondary)] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Quality Video Lectures</h3>
                    <p className="text-[var(--muted)]">
                      Engaging instructors who explain complex concepts clearly. Lectures are concise and designed for efficient learning, not padding.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[var(--secondary)] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Mobile App Access</h3>
                    <p className="text-[var(--muted)]">
                      Study anywhere with a full-featured mobile app. Perfect for commute time, lunch breaks, and quick review sessions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[var(--secondary)] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Pass Guarantee</h3>
                    <p className="text-[var(--muted)]">
                      If you follow the program and don&apos;t pass, you get extended access at no additional cost. This shows the company&apos;s confidence in their product.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Supports Our Study Plans */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                How It Supports Our Study Methodology
              </h2>
              <p className="text-[var(--muted)] mb-6">
                The study plans we create on this site are designed to work seamlessly with this review course:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[var(--card)] p-5 rounded-lg">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">Section Order Flexibility</h3>
                  <p className="text-sm text-[var(--muted)]">
                    The course allows you to access any section at any time, so you can follow our recommended section order without restrictions.
                  </p>
                </div>
                <div className="bg-[var(--card)] p-5 rounded-lg">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">Progress Tracking</h3>
                  <p className="text-sm text-[var(--muted)]">
                    Built-in analytics help you track hours studied and topics completed, making it easy to follow your weekly schedule.
                  </p>
                </div>
                <div className="bg-[var(--card)] p-5 rounded-lg">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">Simulation Practice</h3>
                  <p className="text-sm text-[var(--muted)]">
                    Extensive simulation practice is included, which we emphasize heavily in our study recommendations.
                  </p>
                </div>
                <div className="bg-[var(--card)] p-5 rounded-lg">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">Working Professional Friendly</h3>
                  <p className="text-sm text-[var(--muted)]">
                    On-demand access means you can study at 5 AM or 11 PM - whenever your schedule allows.
                  </p>
                </div>
              </div>
            </div>

            {/* What We Like and Don't Like */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                Our Honest Assessment
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--secondary)] mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    What We Like
                  </h3>
                  <ul className="space-y-2 text-[var(--muted)]">
                    <li>• Adaptive learning saves study time</li>
                    <li>• Excellent mobile experience</li>
                    <li>• Strong pass rates</li>
                    <li>• Responsive customer support</li>
                    <li>• Regular content updates</li>
                    <li>• Affordable compared to competitors</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-500 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Areas for Improvement
                  </h3>
                  <ul className="space-y-2 text-[var(--muted)]">
                    <li>• Some lectures could be shorter</li>
                    <li>• Interface takes getting used to</li>
                    <li>• Would like more simulation variety</li>
                    <li>• Printed materials cost extra</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-white p-6 rounded-xl border-2 border-[var(--secondary)] sticky top-24">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  Our Top Pick
                </h3>
                <p className="text-[var(--muted)] mt-2">
                  [CPA Review Program Name]
                </p>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Pass Rate</span>
                  <span className="font-semibold text-[var(--foreground)]">90%+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Practice Questions</span>
                  <span className="font-semibold text-[var(--foreground)]">10,000+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Video Hours</span>
                  <span className="font-semibold text-[var(--foreground)]">100+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Access Period</span>
                  <span className="font-semibold text-[var(--foreground)]">24 months</span>
                </div>
              </div>
              <a
                href="#"
                className="btn-secondary w-full text-center block mb-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started Today
              </a>
              <p className="text-xs text-center text-[var(--muted)]">
                Affiliate link - see disclosure above
              </p>
            </div>

            {/* Not Ready? */}
            <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Not Ready to Buy?
              </h3>
              <p className="text-sm text-[var(--muted)] mb-4">
                That&apos;s okay. Start with our free resources:
              </p>
              <div className="space-y-3">
                <Link
                  href="/study-plan"
                  className="block p-3 bg-white rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors text-sm font-medium text-[var(--foreground)]"
                >
                  Build My Free Study Plan
                </Link>
                <Link
                  href="/sections/far"
                  className="block p-3 bg-white rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors text-sm font-medium text-[var(--foreground)]"
                >
                  Explore Section Guides
                </Link>
                <Link
                  href="/working-full-time"
                  className="block p-3 bg-white rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors text-sm font-medium text-[var(--foreground)]"
                >
                  Study Tips for Working Pros
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
