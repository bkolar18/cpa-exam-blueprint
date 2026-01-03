import Link from "next/link";

interface SectionPageProps {
  name: string;
  fullName: string;
  color: string;
  description: string;
  topics: string[];
  whyCandidatesFail: string[];
  whatToPrioritize: string[];
  studyAdvice: string[];
  difficulty: string;
  averageStudyTime: string;
}

export default function SectionPage({
  name,
  fullName,
  color,
  description,
  topics,
  whyCandidatesFail,
  whatToPrioritize,
  studyAdvice,
  difficulty,
  averageStudyTime,
}: SectionPageProps) {
  return (
    <div>
      {/* Hero */}
      <section className={`${color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">{name}</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">{fullName}</h1>
              <p className="text-lg opacity-90">CPA Exam Section Guide</p>
            </div>
          </div>
          <p className="text-xl max-w-3xl opacity-90">{description}</p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-[var(--card)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-sm text-[var(--muted)]">Section Code</p>
              <p className="text-xl font-bold text-[var(--foreground)]">{name}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Difficulty</p>
              <p className="text-xl font-bold text-[var(--foreground)]">{difficulty}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Avg. Study Time</p>
              <p className="text-xl font-bold text-[var(--foreground)]">{averageStudyTime}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Topics Covered</p>
              <p className="text-xl font-bold text-[var(--foreground)]">{topics.length}+</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What This Section Tests */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                What This Section Tests
              </h2>
              <p className="text-[var(--muted)] mb-6">
                The {name} section covers the following key topics:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {topics.map((topic, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[var(--foreground)]">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Candidates Fail */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                Why Candidates Fail {name}
              </h2>
              <p className="text-[var(--muted)] mb-6">
                Based on our experience as CPAs, here are the most common reasons candidates struggle:
              </p>
              <ul className="space-y-4">
                {whyCandidatesFail.map((reason, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-[var(--foreground)]">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What to Prioritize */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                What to Prioritize
              </h2>
              <p className="text-[var(--muted)] mb-6">
                Focus your study time on these high-impact areas:
              </p>
              <ul className="space-y-4">
                {whatToPrioritize.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[var(--primary)] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    <span className="text-[var(--foreground)]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CPA Study Advice */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                CPA-Authored Study Advice
              </h2>
              <div className="space-y-6">
                {studyAdvice.map((advice, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-[var(--card)] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <p className="text-[var(--foreground)]">{advice}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-white p-6 rounded-xl border border-[var(--border)] sticky top-24">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Get Your {name} Study Plan
              </h3>
              <p className="text-[var(--muted)] mb-6">
                Build a personalized study plan that includes {name} timing and strategy.
              </p>
              <Link href="/study-plan" className="btn-secondary w-full text-center block">
                Build My Study Plan
              </Link>
              <div className="border-t border-[var(--border)] my-6" />
              <h4 className="font-medium text-[var(--foreground)] mb-3">
                How We Recommend Studying {name}
              </h4>
              <p className="text-sm text-[var(--muted)] mb-4">
                See the CPA review program that aligns with our study methodology.
              </p>
              <Link href="/recommended-program" className="btn-outline w-full text-center block text-sm">
                See Recommendation
              </Link>
            </div>

            {/* Other Sections */}
            <div className="bg-white p-6 rounded-xl border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Other CPA Sections
              </h3>
              <div className="space-y-3">
                {[
                  { code: "FAR", name: "Financial Accounting", href: "/sections/far", color: "bg-blue-500" },
                  { code: "AUD", name: "Auditing & Attestation", href: "/sections/aud", color: "bg-green-500" },
                  { code: "REG", name: "Regulation", href: "/sections/reg", color: "bg-orange-500" },
                  { code: "TCP", name: "Tax Compliance", href: "/sections/tcp", color: "bg-purple-500" },
                ]
                  .filter((s) => s.code !== name)
                  .map((section) => (
                    <Link
                      key={section.code}
                      href={section.href}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[var(--card)] transition-colors"
                    >
                      <div className={`w-8 h-8 ${section.color} rounded-full flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{section.code}</span>
                      </div>
                      <span className="text-[var(--foreground)]">{section.name}</span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
