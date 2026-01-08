import Link from "next/link";

export const metadata = {
  title: "About Us | CPA Exam Blueprint",
  description: "Learn about CPA Exam Blueprint - an affordable CPA exam study aid created by an accounting graduate to help candidates prepare without breaking the bank.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              About CPA Exam Blueprint
            </h1>
            <p className="text-xl text-gray-200">
              An affordable study companion for CPA candidates who want quality practice without the premium price tag.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Statement */}
        <div className="bg-white p-8 rounded-xl border border-[var(--border)] mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Our Mission</h2>
          <p className="text-lg text-[var(--muted)]">
            We believe CPA exam preparation shouldn&apos;t cost $2,000-$3,500. Our mission is to provide an affordable alternative with quality practice questions, study tools, and progress tracking - at a fraction of what the big review courses charge.
          </p>
        </div>

        {/* The Story */}
        <div className="bg-[var(--card)] p-8 rounded-xl border border-[var(--border)] mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Why We Built This</h2>
          <div className="prose prose-lg max-w-none text-[var(--muted)]">
            <p className="mb-4">
              CPA Exam Blueprint was created by an accounting and business information systems graduate who saw a gap in the market: candidates who couldn&apos;t afford premium review courses but still wanted structured study materials.
            </p>
            <p className="mb-4">
              The big CPA review courses are excellent, but they&apos;re expensive. Not everyone has $2,500+ to spend on exam prep, especially when you&apos;re already paying for exam fees, applications, and potentially retakes.
            </p>
            <p>
              We built CPA Exam Blueprint as a budget-friendly supplement - not a replacement for comprehensive courses, but a solid study aid with practice questions, progress tracking, and study planning tools.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-white p-8 rounded-xl border border-[var(--border)] mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[var(--primary)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">600+ Practice Questions</h3>
                <p className="text-[var(--muted)] text-sm">Multiple choice questions across all six CPA exam sections with detailed explanations.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[var(--secondary)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">Progress Tracking</h3>
                <p className="text-[var(--muted)] text-sm">Track study hours, section progress, and quiz performance over time.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-[var(--accent)] bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">Study Planning</h3>
                <p className="text-[var(--muted)] text-sm">Personalized study plans based on your schedule and timeline.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-purple-500 bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">Gamification</h3>
                <p className="text-[var(--muted)] text-sm">Earn badges, maintain study streaks, and stay motivated throughout your journey.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 p-8 rounded-xl mb-12">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Important: What We Are (and Aren&apos;t)</h3>
              <ul className="space-y-2 text-amber-700">
                <li className="flex items-start space-x-2">
                  <span className="font-bold">✓</span>
                  <span>We ARE an affordable study aid with practice questions and tracking tools</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold">✓</span>
                  <span>Our questions are designed to help you practice accounting concepts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold">✗</span>
                  <span>We are NOT an official CPA review course</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold">✗</span>
                  <span>Our questions are NOT sourced from or reviewed by the AICPA</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="font-bold">✗</span>
                  <span>We do NOT guarantee exam passage</span>
                </li>
              </ul>
              <p className="mt-4 text-amber-700 text-sm">
                We&apos;re transparent about what we offer. If you need a comprehensive review course with official exam simulations, we recommend looking at established providers like Becker, Surgent, or Roger CPA Review.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white p-8 rounded-xl border border-[var(--border)] mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">How We Compare</h2>
          <p className="text-[var(--muted)] mb-6">
            Here&apos;s an honest comparison with major CPA review providers. Choose what fits your budget and needs.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[var(--border)]">
                  <th className="text-left py-4 px-3 font-semibold text-[var(--foreground)]">Feature</th>
                  <th className="text-center py-4 px-3 font-semibold text-[var(--primary)] bg-[var(--primary)]/5">
                    <div className="flex flex-col items-center">
                      <span>CPA Exam Blueprint</span>
                      <span className="text-xs font-normal mt-1">
                        <span className="line-through text-[var(--muted)]">$99-$199</span>{" "}
                        <span className="text-[var(--primary)] font-semibold">$79-$149</span>
                      </span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-[var(--foreground)]">
                    <div className="flex flex-col items-center">
                      <span>Becker</span>
                      <span className="text-xs font-normal text-[var(--muted)] mt-1">$2,499-$3,799</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-[var(--foreground)]">
                    <div className="flex flex-col items-center">
                      <span>Surgent</span>
                      <span className="text-xs font-normal text-[var(--muted)] mt-1">$1,599-$2,999</span>
                    </div>
                  </th>
                  <th className="text-center py-4 px-3 font-semibold text-[var(--foreground)]">
                    <div className="flex flex-col items-center">
                      <span>Roger CPA</span>
                      <span className="text-xs font-normal text-[var(--muted)] mt-1">$1,899-$3,499</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                <tr>
                  <td className="py-4 px-3 text-[var(--foreground)] font-medium">Practice Questions</td>
                  <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
                    <span className="text-[var(--foreground)]">600+</span>
                  </td>
                  <td className="py-4 px-3 text-center text-[var(--foreground)]">9,000+</td>
                  <td className="py-4 px-3 text-center text-[var(--foreground)]">7,700+</td>
                  <td className="py-4 px-3 text-center text-[var(--foreground)]">6,000+</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 text-[var(--foreground)] font-medium">Video Lectures</td>
                  <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
                    <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-3 text-[var(--foreground)] font-medium">Task-Based Simulations</td>
                  <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
                    <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-3 text-[var(--foreground)] font-medium">Progress Tracking</td>
                  <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-3 text-[var(--foreground)] font-medium">Study Planning Tools</td>
                  <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-3 text-[var(--foreground)] font-medium">Gamification & Streaks</td>
                  <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-3 text-[var(--foreground)] font-medium">NTS Expiration Tracking</td>
                  <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-3 text-[var(--foreground)] font-medium">Pass Guarantee</td>
                  <td className="py-4 px-3 text-center bg-[var(--primary)]/5">
                    <svg className="w-5 h-5 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <svg className="w-5 h-5 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-4 px-3 text-[var(--foreground)] font-bold">Price</td>
                  <td className="py-4 px-3 text-center bg-[var(--primary)]/10">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm line-through text-[var(--muted)]">$99-$199</span>
                      <span className="text-xl font-bold text-[var(--primary)]">$79-$149</span>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <span className="text-lg font-semibold text-[var(--foreground)]">$2,499-$3,799</span>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <span className="text-lg font-semibold text-[var(--foreground)]">$1,599-$2,999</span>
                  </td>
                  <td className="py-4 px-3 text-center">
                    <span className="text-lg font-semibold text-[var(--foreground)]">$1,899-$3,499</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-[var(--card)] rounded-lg">
            <p className="text-sm text-[var(--muted)]">
              <strong className="text-[var(--foreground)]">Bottom line:</strong> If you need comprehensive video lectures, task-based simulations, and a pass guarantee, the premium courses are worth considering. But if you&apos;re looking for affordable practice questions and study tools to supplement your learning, CPA Exam Blueprint offers great value at a fraction of the cost.
            </p>
          </div>
        </div>

        {/* Our Commitment */}
        <div className="bg-white p-8 rounded-xl border border-[var(--border)] mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Our Commitment to You</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-[var(--muted)]">
                <strong className="text-[var(--foreground)]">Honest pricing.</strong> No hidden fees, no surprise charges. What you see is what you pay.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-[var(--muted)]">
                <strong className="text-[var(--foreground)]">Quality content.</strong> All questions are reviewed for accuracy and relevance to current CPA exam topics.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-[var(--muted)]">
                <strong className="text-[var(--foreground)]">Continuous improvement.</strong> We regularly update content based on exam changes and user feedback.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-[var(--muted)]">
                <strong className="text-[var(--foreground)]">We don&apos;t sell your data.</strong> Your email is used only for account access and occasional updates. We never sell or share your information.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[var(--primary)] p-8 rounded-xl text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Studying?</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Get access to 600+ practice questions and study tools at a price that won&apos;t break the bank.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-[var(--primary)] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
}
