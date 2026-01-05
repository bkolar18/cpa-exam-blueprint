import Link from "next/link";

export const metadata = {
  title: "Surgent CPA Review - Our Recommended Program | CPA Exam Blueprint",
  description: "See why we recommend Surgent CPA Review for CPA candidates. Featuring A.S.A.P. adaptive technology, 8,800+ practice questions, and a proven pass rate.",
};

export default function RecommendedProgramPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Our Recommended CPA Review: Surgent
            </h1>
            <p className="text-xl text-gray-200">
              After years of helping CPA candidates, we&apos;ve identified Surgent as the program that best aligns with our study methodology and delivers consistent results.
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
              <strong>Transparency Disclosure:</strong> We are an affiliate of Surgent CPA Review. This means we may receive a commission if you purchase through our link. However, we only recommend products we genuinely believe in and have personally vetted. Our recommendation is based on our professional experience, not compensation.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Why We Recommend Surgent */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                Why We Recommend Surgent CPA Review
              </h2>
              <p className="text-[var(--muted)] mb-6">
                We&apos;ve evaluated every major CPA review course on the market. Here&apos;s why Surgent stands out:
              </p>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[var(--secondary)] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">A.S.A.P. Adaptive Technology</h3>
                    <p className="text-[var(--muted)]">
                      Surgent&apos;s proprietary AI-powered adaptive learning system identifies your weak areas and creates a hyper-personalized study plan. This can reduce study time by up to 40% compared to traditional courses.
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
                    <h3 className="font-semibold text-[var(--foreground)]">ReadySCORE Technology</h3>
                    <p className="text-[var(--muted)]">
                      Know exactly when you&apos;re ready to pass. ReadySCORE predicts your actual exam score with 98-99% accuracy, falling within 4 points of actual CPA exam scores on average.
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
                    <h3 className="font-semibold text-[var(--foreground)]">Massive Question Bank</h3>
                    <p className="text-[var(--muted)]">
                      Practice with 8,800+ multiple-choice questions and 450+ task-based simulations. The Ultimate Pass adds 1,000+ exclusive additional MCQs for even more practice.
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
                    <h3 className="font-semibold text-[var(--foreground)]">350+ Video Lectures</h3>
                    <p className="text-[var(--muted)]">
                      Bite-sized lessons (10-20 minutes each, none over 30 minutes) from instructors with 15-20+ years of teaching experience. Audio lectures available for on-the-go studying.
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
                    <h3 className="font-semibold text-[var(--foreground)]">Unlimited Access + Pass Guarantee</h3>
                    <p className="text-[var(--muted)]">
                      Your access never expires until you pass. If you follow the program and don&apos;t pass, you get continued access at no additional cost. This shows Surgent&apos;s confidence in their product.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                Surgent CPA Review Pricing
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[var(--card)] p-5 rounded-lg border border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">Essentials Pass</h3>
                  <p className="text-2xl font-bold text-[var(--primary)] mb-2">$999</p>
                  <ul className="text-sm text-[var(--muted)] space-y-1">
                    <li>• A.S.A.P. adaptive learning</li>
                    <li>• 8,800+ MCQs & 450+ TBS</li>
                    <li>• 350+ video lectures</li>
                    <li>• ReadySCORE tracking</li>
                    <li>• Unlimited access</li>
                  </ul>
                </div>
                <div className="bg-[var(--card)] p-5 rounded-lg border-2 border-[var(--secondary)] relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[var(--secondary)] text-white text-xs font-bold px-3 py-1 rounded-full">
                    POPULAR
                  </div>
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">Premier Pass</h3>
                  <p className="text-2xl font-bold text-[var(--primary)] mb-2">$1,599</p>
                  <ul className="text-sm text-[var(--muted)] space-y-1">
                    <li>• Everything in Essentials</li>
                    <li>• Enhanced study materials</li>
                    <li>• Priority support</li>
                    <li>• Additional resources</li>
                    <li>• Pass guarantee</li>
                  </ul>
                </div>
                <div className="bg-[var(--card)] p-5 rounded-lg border border-[var(--border)]">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">Ultimate Pass</h3>
                  <p className="text-2xl font-bold text-[var(--primary)] mb-2">$1,999</p>
                  <ul className="text-sm text-[var(--muted)] space-y-1">
                    <li>• Everything in Premier</li>
                    <li>• Printed textbooks</li>
                    <li>• 1,000+ bonus MCQs</li>
                    <li>• Physical flashcards</li>
                    <li>• 1-on-1 coaching</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-[var(--muted)] mt-4">
                💡 <strong>Payment plans available</strong> through Surgent Pay (0% interest) and Affirm financing. Individual sections available for $599 each.
              </p>
            </div>

            {/* How It Supports Our Study Plans */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                How Surgent Supports Our Study Methodology
              </h2>
              <p className="text-[var(--muted)] mb-6">
                The study plans we create on this site are designed to work seamlessly with Surgent&apos;s platform:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[var(--card)] p-5 rounded-lg">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">Reduced Study Time</h3>
                  <p className="text-sm text-[var(--muted)]">
                    Surgent students average 46 hours per section vs 200+ hours with traditional courses. Perfect for working professionals with limited time.
                  </p>
                </div>
                <div className="bg-[var(--card)] p-5 rounded-lg">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">Section Order Flexibility</h3>
                  <p className="text-sm text-[var(--muted)]">
                    Access any section at any time, so you can follow our recommended section order without restrictions.
                  </p>
                </div>
                <div className="bg-[var(--card)] p-5 rounded-lg">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">Progress Tracking</h3>
                  <p className="text-sm text-[var(--muted)]">
                    Built-in analytics with ReadySCORE help you track progress and know exactly when you&apos;re ready to sit for the exam.
                  </p>
                </div>
                <div className="bg-[var(--card)] p-5 rounded-lg">
                  <h3 className="font-semibold text-[var(--foreground)] mb-2">Mobile Study</h3>
                  <p className="text-sm text-[var(--muted)]">
                    Free flashcard app with 2,200+ concepts for studying during commutes, lunch breaks, and downtime.
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
                    <li>• Industry-leading adaptive technology</li>
                    <li>• Significant time savings (40-80%)</li>
                    <li>• Unlimited access until you pass</li>
                    <li>• Large question bank (8,800+ MCQs)</li>
                    <li>• 88-92% pass rate for prepared students</li>
                    <li>• More affordable than Becker</li>
                    <li>• Quarterly textbook updates</li>
                    <li>• Free flashcard mobile app</li>
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
                    <li>• Video lectures can be dry (especially REG)</li>
                    <li>• Initial 400-question assessment takes time</li>
                    <li>• Textbooks can be technical</li>
                    <li>• Less brand recognition than Becker</li>
                    <li>• Only 3-day free trial period</li>
                    <li>• Printed materials cost extra</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Competitor Comparison */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                How Surgent Compares
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      <th className="text-left py-3 px-2 font-semibold text-[var(--foreground)]">Feature</th>
                      <th className="text-center py-3 px-2 font-semibold text-[var(--secondary)]">Surgent</th>
                      <th className="text-center py-3 px-2 font-semibold text-[var(--muted)]">Becker</th>
                      <th className="text-center py-3 px-2 font-semibold text-[var(--muted)]">Roger</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--muted)]">
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-3 px-2">Price Range</td>
                      <td className="text-center py-3 px-2 text-[var(--secondary)] font-medium">$999-$1,999</td>
                      <td className="text-center py-3 px-2">$2,500-$3,800</td>
                      <td className="text-center py-3 px-2">~$2,299</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-3 px-2">Adaptive Learning</td>
                      <td className="text-center py-3 px-2 text-[var(--secondary)] font-medium">A.S.A.P. (Best)</td>
                      <td className="text-center py-3 px-2">Adapt2U</td>
                      <td className="text-center py-3 px-2">SmartPath</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-3 px-2">MCQ Count</td>
                      <td className="text-center py-3 px-2 text-[var(--secondary)] font-medium">8,800+</td>
                      <td className="text-center py-3 px-2">~7,500</td>
                      <td className="text-center py-3 px-2">~6,000</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-3 px-2">Access Period</td>
                      <td className="text-center py-3 px-2 text-[var(--secondary)] font-medium">Unlimited</td>
                      <td className="text-center py-3 px-2">24 months</td>
                      <td className="text-center py-3 px-2">18 months</td>
                    </tr>
                    <tr className="border-b border-[var(--border)]">
                      <td className="py-3 px-2">Avg Study Hours/Section</td>
                      <td className="text-center py-3 px-2 text-[var(--secondary)] font-medium">~46 hours</td>
                      <td className="text-center py-3 px-2">~200 hours</td>
                      <td className="text-center py-3 px-2">~195 hours</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2">Best For</td>
                      <td className="text-center py-3 px-2 text-[var(--secondary)] font-medium">Time efficiency</td>
                      <td className="text-center py-3 px-2">Comprehensive prep</td>
                      <td className="text-center py-3 px-2">Engaging lectures</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-white p-6 rounded-xl border-2 border-[var(--secondary)]">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">
                  Our Top Pick
                </h3>
                <p className="text-[var(--primary)] font-semibold mt-2">
                  Surgent CPA Review
                </p>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Pass Rate</span>
                  <span className="font-semibold text-[var(--foreground)]">88-92%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Practice Questions</span>
                  <span className="font-semibold text-[var(--foreground)]">8,800+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Video Lectures</span>
                  <span className="font-semibold text-[var(--foreground)]">350+</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Access Period</span>
                  <span className="font-semibold text-[var(--foreground)]">Unlimited</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted)]">Starting Price</span>
                  <span className="font-semibold text-[var(--foreground)]">$999</span>
                </div>
              </div>
              <a
                href="https://www.surgent.com/cpa-review/"
                className="btn-secondary w-full text-center block mb-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started with Surgent
              </a>
              <p className="text-xs text-center text-[var(--muted)]">
                Affiliate link - see disclosure above
              </p>
            </div>

            {/* Special Offer */}
            <div className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] p-6 rounded-xl text-white">
              <h3 className="text-lg font-semibold mb-2">
                Save on Surgent
              </h3>
              <p className="text-sm text-gray-200 mb-4">
                Use promo codes at checkout for potential savings up to $700-$1,100 off. Check Surgent&apos;s website for current promotions.
              </p>
              <p className="text-xs text-gray-300">
                Promotions change frequently. Verify current offers on surgent.com
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
