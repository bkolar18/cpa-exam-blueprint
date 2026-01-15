import Link from "next/link";

export const metadata = {
  title: "Contact Support | Meridian CPA Review",
  description: "Get help with your Meridian CPA Review account. Contact our support team for questions about practice questions, simulations, account issues, or technical support.",
};

export default function SupportPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">
              Contact Support
            </h1>
            <p className="text-xl text-gray-200 animate-fade-in-up animate-delay-100">
              We&apos;re here to help. Reach out with any questions about your account, study materials, or technical issues.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Email Support */}
          <div className="bg-white dark:bg-[var(--card)] p-8 rounded-xl border border-[var(--border)] hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-[var(--primary)] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Email Support</h2>
            <p className="text-[var(--muted)] mb-4">
              For account issues, technical problems, or general questions.
            </p>
            <a
              href="mailto:support@meridiancpareview.com"
              className="inline-flex items-center text-[var(--primary)] font-semibold hover:underline"
            >
              support@meridiancpareview.com
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          {/* Response Time */}
          <div className="bg-white dark:bg-[var(--card)] p-8 rounded-xl border border-[var(--border)]">
            <div className="w-12 h-12 bg-[var(--secondary)] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Response Time</h2>
            <p className="text-[var(--muted)] mb-4">
              We typically respond within 24-48 hours during business days.
            </p>
            <p className="text-sm text-[var(--muted)]">
              Monday - Friday, 9am - 5pm EST
            </p>
          </div>
        </div>

        {/* Common Questions */}
        <div className="bg-white dark:bg-[var(--card)] p-8 rounded-xl border border-[var(--border)] mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Before You Reach Out</h2>
          <p className="text-[var(--muted)] mb-6">
            Check if your question is answered in our FAQ or help resources:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link
              href="/faq"
              className="flex items-center p-4 bg-[var(--background)] rounded-lg hover:bg-[var(--primary)] hover:bg-opacity-5 transition-colors group"
            >
              <div className="w-10 h-10 bg-[var(--primary)] bg-opacity-10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[var(--primary)] group-hover:bg-opacity-20">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">FAQ</h3>
                <p className="text-sm text-[var(--muted)]">Frequently asked questions</p>
              </div>
            </Link>
            <Link
              href="/about"
              className="flex items-center p-4 bg-[var(--background)] rounded-lg hover:bg-[var(--primary)] hover:bg-opacity-5 transition-colors group"
            >
              <div className="w-10 h-10 bg-[var(--primary)] bg-opacity-10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[var(--primary)] group-hover:bg-opacity-20">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">About Us</h3>
                <p className="text-sm text-[var(--muted)]">Learn about our platform</p>
              </div>
            </Link>
            <Link
              href="/pricing"
              className="flex items-center p-4 bg-[var(--background)] rounded-lg hover:bg-[var(--primary)] hover:bg-opacity-5 transition-colors group"
            >
              <div className="w-10 h-10 bg-[var(--primary)] bg-opacity-10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[var(--primary)] group-hover:bg-opacity-20">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">Pricing</h3>
                <p className="text-sm text-[var(--muted)]">Plans and features</p>
              </div>
            </Link>
            <Link
              href="/blog"
              className="flex items-center p-4 bg-[var(--background)] rounded-lg hover:bg-[var(--primary)] hover:bg-opacity-5 transition-colors group"
            >
              <div className="w-10 h-10 bg-[var(--primary)] bg-opacity-10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-[var(--primary)] group-hover:bg-opacity-20">
                <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)]">Study Resources</h3>
                <p className="text-sm text-[var(--muted)]">Tips and guides</p>
              </div>
            </Link>
          </div>
        </div>

        {/* What to Include */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-8 rounded-xl">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">Help Us Help You Faster</h3>
              <p className="text-amber-700 dark:text-amber-400 mb-4">
                When contacting support, please include:
              </p>
              <ul className="space-y-2 text-amber-700 dark:text-amber-400">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Your account email address</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>A clear description of the issue</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Steps to reproduce the problem (if technical)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Screenshots if applicable</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
