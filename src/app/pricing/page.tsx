"use client";

import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";

const tiers = [
  {
    name: "Free",
    id: "free",
    price: "$0",
    originalPrice: null,
    description: "Get started with the basics",
    features: [
      "50 practice questions",
      "1 exam section (FAR)",
      "Basic progress tracking",
      "Study hours logging",
      "Score release calendar",
    ],
    notIncluded: [
      "All 6 exam sections",
      "Full question bank",
      "Adaptive learning",
      "AI study assistant",
      "Priority support",
    ],
    cta: "Get Started Free",
    ctaLink: "/signup",
    highlighted: false,
  },
  {
    name: "Standard",
    id: "standard",
    price: "$79",
    originalPrice: "$99",
    period: "one-time",
    description: "Everything you need for core sections",
    features: [
      "300+ practice questions",
      "All 4 core sections (FAR, AUD, REG, TCP)",
      "Full progress tracking & analytics",
      "NTS expiration tracking",
      "Study plan builder",
      "Gamification & achievements",
      "Email support",
    ],
    notIncluded: [
      "Discipline sections (BAR, ISC)",
      "Adaptive learning",
      "AI study assistant",
    ],
    cta: "Get Standard",
    ctaLink: "/signup?plan=standard",
    highlighted: false,
    badge: "Early Access",
  },
  {
    name: "Pro",
    id: "pro",
    price: "$149",
    originalPrice: "$199",
    period: "one-time",
    description: "Complete prep for serious candidates",
    features: [
      "600+ practice questions",
      "All 6 exam sections",
      "Adaptive learning algorithm",
      "AI study assistant (coming soon)",
      "Advanced analytics & insights",
      "Full progress tracking",
      "NTS expiration tracking",
      "Study plan builder",
      "Gamification & achievements",
      "Priority email support",
    ],
    notIncluded: [],
    cta: "Get Pro",
    ctaLink: "/signup?plan=pro",
    highlighted: true,
    badge: "Best Value",
  },
];

const faqs = [
  {
    question: "Is this a subscription or one-time payment?",
    answer:
      "One-time payment! Pay once and get lifetime access to your chosen tier. No recurring charges, no hidden fees.",
  },
  {
    question: "Can I upgrade from Free to Standard or Pro later?",
    answer:
      "Absolutely! You can upgrade at any time. When you upgrade, you'll only pay the difference between your current tier and the new one.",
  },
  {
    question: "What's included in the practice questions?",
    answer:
      "Our questions cover all topics in the CPA exam blueprint, including multiple-choice questions with detailed explanations. Each question is tagged by topic and difficulty level.",
  },
  {
    question: "How does adaptive learning work?",
    answer:
      "Our adaptive learning algorithm (Pro tier) tracks your performance on each topic and prioritizes questions where you need the most practice. It focuses 60% on weak areas, 30% on moderate topics, and 10% on mastered topics to keep everything fresh.",
  },
  {
    question: "What is the AI study assistant?",
    answer:
      "Coming soon to Pro tier! The AI assistant helps explain difficult concepts, breaks down complex questions, and provides personalized study tips based on your progress.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes! If you're not satisfied within 30 days of purchase, we'll refund your payment in full. No questions asked.",
  },
];

export default function PricingPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
            <span className="mr-2">🎉</span>
            Launch Special - Save up to $50!
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Affordable CPA Exam Prep
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Quality study materials at a fraction of the cost. No subscriptions,
            no recurring fees - just one-time payment for lifetime access.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-8 ${
                  tier.highlighted
                    ? "bg-[var(--primary)] text-white ring-4 ring-[var(--primary)]/30 scale-105"
                    : "bg-white border border-[var(--border)]"
                }`}
              >
                {tier.badge && (
                  <div
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold ${
                      tier.highlighted
                        ? "bg-yellow-400 text-yellow-900"
                        : "bg-[var(--primary)] text-white"
                    }`}
                  >
                    {tier.badge}
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3
                    className={`text-2xl font-bold mb-2 ${
                      tier.highlighted ? "text-white" : "text-[var(--foreground)]"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      tier.highlighted ? "text-white/80" : "text-[var(--muted)]"
                    }`}
                  >
                    {tier.description}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    {tier.originalPrice && (
                      <span
                        className={`text-2xl line-through ${
                          tier.highlighted ? "text-white/50" : "text-[var(--muted)]"
                        }`}
                      >
                        {tier.originalPrice}
                      </span>
                    )}
                    <span
                      className={`text-5xl font-bold ${
                        tier.highlighted ? "text-white" : "text-[var(--foreground)]"
                      }`}
                    >
                      {tier.price}
                    </span>
                  </div>
                  {tier.period && (
                    <span
                      className={`text-sm ${
                        tier.highlighted ? "text-white/70" : "text-[var(--muted)]"
                      }`}
                    >
                      {tier.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? "text-green-300" : "text-green-500"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className={`text-sm ${
                          tier.highlighted ? "text-white" : "text-[var(--foreground)]"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                  {tier.notIncluded.map((feature, index) => (
                    <li
                      key={`not-${index}`}
                      className="flex items-start gap-3 opacity-50"
                    >
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? "text-white/50" : "text-[var(--muted)]"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span
                        className={`text-sm ${
                          tier.highlighted ? "text-white/50" : "text-[var(--muted)]"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={user ? tier.ctaLink.replace("/signup", "/dashboard") : tier.ctaLink}
                  className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 ${
                    tier.highlighted
                      ? "bg-white text-[var(--primary)] hover:bg-white/90"
                      : tier.id === "free"
                      ? "bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--border)]"
                      : "bg-[var(--primary)] text-white hover:opacity-90"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison with competitors */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--card)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
            Save Thousands on CPA Prep
          </h2>
          <p className="text-lg text-[var(--muted)] mb-12">
            Compare our pricing to traditional CPA review courses
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[var(--primary)] text-white rounded-xl p-6 ring-4 ring-[var(--primary)]/30">
              <h3 className="font-bold text-lg mb-2">CPA Exam Blueprint</h3>
              <div className="text-3xl font-bold mb-1">$79 - $149</div>
              <p className="text-sm opacity-80">One-time payment</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">
                Becker
              </h3>
              <div className="text-3xl font-bold mb-1 text-[var(--foreground)]">
                $2,499+
              </div>
              <p className="text-sm text-[var(--muted)]">Premium courses</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">
                Surgent
              </h3>
              <div className="text-3xl font-bold mb-1 text-[var(--foreground)]">
                $1,599+
              </div>
              <p className="text-sm text-[var(--muted)]">Full review</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-[var(--border)]">
              <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">
                Roger CPA
              </h3>
              <div className="text-3xl font-bold mb-1 text-[var(--foreground)]">
                $1,899+
              </div>
              <p className="text-sm text-[var(--muted)]">Complete package</p>
            </div>
          </div>

          <p className="mt-8 text-[var(--muted)]">
            That&apos;s up to <span className="font-bold text-[var(--primary)]">95% savings</span> compared to
            traditional CPA review courses.
          </p>
        </div>
      </section>

      {/* What you get section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--foreground)] text-center mb-12">
            What&apos;s Included in Every Plan
          </h2>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-[var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">
                  Practice Questions
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Multiple-choice questions covering all blueprint topics with
                  detailed explanations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-[var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">
                  Progress Tracking
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Track your study hours, section progress, and practice
                  question accuracy over time.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-[var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">
                  Study Planning Tools
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Build a personalized study plan based on your target date,
                  available hours, and current progress.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-[var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">
                  NTS Tracking
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Never miss an NTS expiration date with our tracking and
                  reminder system.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-[var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">
                  Gamification
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Stay motivated with points, badges, streaks, and achievements
                  as you study.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-[var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-1">
                  Mobile Friendly
                </h3>
                <p className="text-sm text-[var(--muted)]">
                  Study anywhere with our responsive design that works on all
                  devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--card)]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--foreground)] text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 border border-[var(--border)]"
              >
                <h3 className="font-semibold text-[var(--foreground)] mb-2">
                  {faq.question}
                </h3>
                <p className="text-[var(--muted)]">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">
            Ready to Start Your CPA Journey?
          </h2>
          <p className="text-lg text-[var(--muted)] mb-8">
            Join thousands of candidates who are studying smarter, not harder.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={user ? "/dashboard" : "/signup"}
              className="btn-primary text-lg px-8 py-4"
            >
              Get Started Free
            </Link>
            <Link
              href={user ? "/dashboard?plan=pro" : "/signup?plan=pro"}
              className="bg-[var(--card)] text-[var(--foreground)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--border)] transition-all duration-200 text-lg"
            >
              Get Pro - Save $50
            </Link>
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">
            30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </section>
    </div>
  );
}
