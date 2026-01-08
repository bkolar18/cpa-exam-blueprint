import Link from "next/link";

export const metadata = {
  title: "CPA Exam While Working Full Time | CPA Exam Blueprint",
  description: "Learn how to pass the CPA exam while working full time. Real strategies from CPAs who did it themselves.",
};

export default function WorkingFullTimePage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Passing the CPA Exam While Working Full Time
            </h1>
            <p className="text-xl text-gray-200">
              Real strategies from CPAs who balanced busy season, client deadlines, and CPA exam prep. It&apos;s challenging, but absolutely doable.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* The Reality */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                The Reality of Studying While Working
              </h2>
              <p className="text-[var(--muted)] mb-6">
                Let&apos;s be honest: passing the CPA exam while working full time is one of the hardest things you&apos;ll do in your career. But thousands of candidates do it every year, and you can too.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[var(--card)] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Average Timeline</h3>
                    <p className="text-[var(--muted)]">
                      Most working candidates take 12-18 months to pass all four sections. This is normal and realistic.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[var(--card)] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Hours Required</h3>
                    <p className="text-[var(--muted)]">
                      Plan for 15-25 hours of study per week. Less than 15 hours makes progress too slow; more than 25 leads to burnout.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-[var(--card)] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--foreground)]">Key Success Factor</h3>
                    <p className="text-[var(--muted)]">
                      Consistency beats intensity. Studying 2 hours every day is more effective than 14 hours on Saturday.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Time Management Strategies */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                Time Management Strategies That Work
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    1. Morning Study Sessions
                  </h3>
                  <p className="text-[var(--muted)]">
                    Wake up 1-2 hours earlier than usual. Your mind is fresh, there are no distractions, and you start each day having already made progress. This is the #1 strategy recommended by CPAs who passed while working.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    2. Protect Your Weekends
                  </h3>
                  <p className="text-[var(--muted)]">
                    Block 4-6 hours on Saturday and Sunday mornings for deep study sessions. Use this time for new material and practice simulations. Don&apos;t schedule anything before noon on study days.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    3. Use Your Commute
                  </h3>
                  <p className="text-[var(--muted)]">
                    If you commute, use that time for audio lectures or flashcard review. A 30-minute commute each way adds 5 hours of study time per week without changing your schedule.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    4. Lunch Break Learning
                  </h3>
                  <p className="text-[var(--muted)]">
                    Use 30 minutes of your lunch break for quick MCQ practice. This keeps the material fresh and adds up to 2.5 hours per week of focused review.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                    5. Communicate with Your Employer
                  </h3>
                  <p className="text-[var(--muted)]">
                    Most accounting firms support CPA exam candidates. Talk to your manager about your study schedule and exam dates. Many firms offer study leave or reduced hours during exam periods.
                  </p>
                </div>
              </div>
            </div>

            {/* Busy Season Strategy */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                Surviving Busy Season
              </h2>
              <p className="text-[var(--muted)] mb-6">
                Busy season is brutal for CPA exam prep. Here&apos;s how to handle it:
              </p>
              <div className="space-y-4">
                <div className="bg-[var(--card)] p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--foreground)]">Option 1: Schedule Around It</h3>
                  <p className="text-[var(--muted)] text-sm mt-1">
                    Don&apos;t schedule exams during busy season. Focus on maintaining knowledge with light review (30 min/day), and resume heavy studying after April 15.
                  </p>
                </div>
                <div className="bg-[var(--card)] p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--foreground)]">Option 2: Take Exams Right Before</h3>
                  <p className="text-[var(--muted)] text-sm mt-1">
                    Schedule your exam in early January or February. Study intensively in November-December when work is slower, then maintain knowledge through busy season for your next exam.
                  </p>
                </div>
                <div className="bg-[var(--card)] p-4 rounded-lg">
                  <h3 className="font-semibold text-[var(--foreground)]">Option 3: Summer/Fall Focus</h3>
                  <p className="text-[var(--muted)] text-sm mt-1">
                    Many candidates take 2-3 exams between May and November when workload is lighter. Use this window strategically to make maximum progress.
                  </p>
                </div>
              </div>
            </div>

            {/* Study Tips */}
            <div className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">
                Tips from Working Professionals
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-[var(--primary)] pl-4">
                  <p className="text-[var(--foreground)] font-medium mb-2">
                    Morning Study Sessions
                  </p>
                  <p className="text-[var(--muted)]">
                    Many working candidates find that waking up 1-2 hours early to study before work is the most effective strategy. Your mind is fresh, and there are fewer distractions.
                  </p>
                </div>
                <div className="border-l-4 border-[var(--secondary)] pl-4">
                  <p className="text-[var(--foreground)] font-medium mb-2">
                    Quality Over Quantity
                  </p>
                  <p className="text-[var(--muted)]">
                    15 focused hours per week often beats 25 distracted hours. It&apos;s better to scale back your study time and maintain consistency than to burn out trying to do too much.
                  </p>
                </div>
                <div className="border-l-4 border-[var(--accent)] pl-4">
                  <p className="text-[var(--foreground)] font-medium mb-2">
                    Protect Your Study Time
                  </p>
                  <p className="text-[var(--muted)]">
                    Block your study time on your calendar and communicate boundaries with friends and family. When everyone respects your study schedule, you can actually focus.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA Card */}
            <div className="bg-white p-6 rounded-xl border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Get Your Personalized Schedule
              </h3>
              <p className="text-[var(--muted)] mb-6">
                Build a study plan designed around your work schedule and available hours.
              </p>
              <Link href="/study-plan" className="btn-secondary w-full text-center block">
                Build My Study Plan
              </Link>
              <div className="border-t border-[var(--border)] my-6" />
              <h4 className="font-medium text-[var(--foreground)] mb-3">
                Ready to Practice?
              </h4>
              <p className="text-sm text-[var(--muted)] mb-4">
                Access 6,000+ practice questions and track your progress.
              </p>
              <Link href="/signup" className="btn-outline w-full text-center block text-sm">
                Get Started
              </Link>
            </div>

            {/* Quick Tips */}
            <div className="bg-[var(--card)] p-6 rounded-xl border border-[var(--border)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">
                Quick Tips
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--foreground)]">Study at the same time every day</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--foreground)]">Take one full day off per week</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--foreground)]">Tell friends/family your study schedule</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--foreground)]">Use phone apps for quick review</span>
                </li>
                <li className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[var(--foreground)]">Don&apos;t sacrifice sleep for study</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
