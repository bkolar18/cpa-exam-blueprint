import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
              Smart CPA Exam Prep — Without the High Price Tag
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-up animate-delay-100">
              6,000+ practice questions, 500+ task-based simulations, progress tracking, and unlimited access until you pass.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animate-delay-200">
              <Link
                href="/study-plan"
                className="bg-white text-[var(--primary)] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Build My Free CPA Study Plan
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[var(--primary)] transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 bg-[var(--card)] border-b border-[var(--border)] animate-fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-center">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--foreground)] font-medium">6,000+ Practice Questions</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--foreground)] font-medium">Unlimited Access Until You Pass</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-[var(--foreground)] font-medium">500+ Task-Based Simulations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 animate-fade-in-up">
              Comprehensive Tools for CPA Exam Success
            </h2>
            <p className="text-lg text-[var(--muted)] max-w-2xl mx-auto">
              Our study dashboard tracks your progress, identifies weak areas, and keeps you organized — all in one place, without the $2,000+ price tag.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Personalized Study Guidance */}
            <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] hover-lift">
              <div className="w-12 h-12 bg-[var(--primary)] bg-opacity-10 dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                Personalized Study Plans
              </h3>
              <p className="text-[var(--muted-light)] dark:text-[var(--muted-light)]">
                Get a customized study schedule based on your work schedule, background, and timeline.
              </p>
            </div>

            {/* Section Strategies */}
            <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] hover-lift">
              <div className="w-12 h-12 bg-[var(--secondary)] bg-opacity-10 dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                Section-by-Section Strategies
              </h3>
              <p className="text-[var(--muted-light)] dark:text-[var(--muted-light)]">
                Deep-dive into FAR, AUD, REG, and TCP with targeted strategies for each section.
              </p>
            </div>

            {/* Progress Tracking */}
            <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] hover-lift">
              <div className="w-12 h-12 bg-[var(--accent)] bg-opacity-10 dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                Progress Tracking
              </h3>
              <p className="text-[var(--muted-light)] dark:text-[var(--muted-light)]">
                Track your study hours, earn badges, and stay motivated with streaks.
              </p>
            </div>

            {/* Time-Saving Frameworks */}
            <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] hover-lift">
              <div className="w-12 h-12 bg-purple-500 bg-opacity-10 dark:bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-500 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                Time-Saving Frameworks
              </h3>
              <p className="text-[var(--muted-light)] dark:text-[var(--muted-light)]">
                Skip the trial and error. Follow proven frameworks that actually work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meridian CPA Academy Promo */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                Free Study Dashboard
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-up">
                Track Your Progress with Meridian CPA Academy
              </h2>
              <p className="text-xl text-blue-100 mb-6">
                Your personal command center for conquering the CPA exam. Log study hours,
                earn achievements, and stay motivated throughout your journey.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Track study hours across all sections",
                  "Earn badges and unlock achievements",
                  "Build and maintain study streaks",
                  "Never miss an NTS expiration",
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/cpa-academy"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Learn More
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold">FAR Progress</div>
                        <div className="text-sm text-blue-200">75 / 150 hours</div>
                      </div>
                    </div>
                    <span className="text-2xl font-bold">50%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-xl">
                        🔥
                      </div>
                      <div>
                        <div className="font-semibold">Study Streak</div>
                        <div className="text-sm text-blue-200">Keep it going!</div>
                      </div>
                    </div>
                    <span className="text-2xl font-bold">7 days</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-xl">
                        ⭐
                      </div>
                      <div>
                        <div className="font-semibold">Total Points</div>
                        <div className="text-sm text-blue-200">3 badges earned</div>
                      </div>
                    </div>
                    <span className="text-2xl font-bold">245</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20 bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-6 animate-fade-in-up">
                Feeling Overwhelmed by the CPA Exam?
              </h2>
              <p className="text-lg text-[var(--muted)] mb-8">
                You&apos;re not alone. Every CPA candidate faces the same questions:
              </p>
              <ul className="space-y-4">
                {[
                  "Where do I even start?",
                  "Which section should I take first?",
                  "How long will this realistically take?",
                  "How do I study while working full time?",
                  "What mistakes cause people to fail?",
                  "How do I avoid wasting time and money?",
                ].map((question, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-6 h-6 text-[var(--primary)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[var(--foreground)] text-lg">{question}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[var(--card)] p-8 rounded-2xl border border-[var(--border)] shadow-lg">
              <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                We Answer These Questions Before Selling Anything
              </h3>
              <p className="text-[var(--muted-light)] dark:text-[var(--muted-light)] mb-6">
                Our goal is to give you clarity and confidence first. Build your free personalized study plan and get the answers you need.
              </p>
              <Link
                href="/study-plan"
                className="btn-secondary inline-block w-full text-center"
              >
                Build My Free Study Plan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CPA Sections Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4 animate-fade-in-up">
              Master Each CPA Exam Section
            </h2>
            <p className="text-lg text-[var(--muted)]">
              Get targeted strategies for every section of the CPA exam.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "FAR", title: "Financial Accounting & Reporting", color: "bg-blue-500", href: "/sections/far" },
              { name: "AUD", title: "Auditing & Attestation", color: "bg-green-500", href: "/sections/aud" },
              { name: "REG", title: "Regulation", color: "bg-orange-500", href: "/sections/reg" },
              { name: "TCP", title: "Tax Compliance & Planning", color: "bg-purple-500", href: "/sections/tcp" },
            ].map((section) => (
              <Link
                key={section.name}
                href={section.href}
                className="group bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] hover-lift text-center"
              >
                <div className={`w-16 h-16 ${section.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-xl">{section.name}</span>
                </div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {section.title}
                </h3>
                <p className="text-[var(--muted-light)] dark:text-[var(--muted-light)] text-sm mt-2">
                  Learn what it takes to pass
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--primary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animate-fade-in-up">
            Ready to Start Studying?
          </h2>
          <p className="text-gray-200 mb-8 text-lg">
            Get access to 6,000+ practice questions and 500+ task-based simulations — free during beta.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-white text-[var(--primary)] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
