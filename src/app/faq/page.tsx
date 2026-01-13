import Link from "next/link";

export const metadata = {
  title: "FAQ | Meridian CPA Review",
  description: "Frequently asked questions about Meridian CPA Review - learn about our practice questions, study tools, and CPA exam preparation resources.",
};

const faqs = [
  {
    question: "How are questions created?",
    answer: "Questions are generated through AI-assisted processes guided by the CPA Exam Blueprints, which define tested topics and skill levels. All questions are original, designed for practice purposes, and periodically reviewed and refined based on performance data and user feedback.",
  },
  {
    question: "Is Meridian CPA Review affiliated with the AICPA or NASBA?",
    answer: "No. Meridian CPA Review is an independent exam preparation platform and is not affiliated with the AICPA, NASBA, or any state board of accountancy. Our content is based on the publicly available CPA Exam Blueprints.",
  },
  {
    question: "How many practice questions do you offer?",
    answer: "We offer 6,000+ multiple-choice questions and 500+ task-based simulations across all six CPA exam sections (FAR, AUD, REG, TCP, BAR, and ISC).",
  },
  {
    question: "Is Meridian CPA Review really free?",
    answer: "Yes, during our beta period you get complete access to all features at no cost. This includes all practice questions, task-based simulations, progress tracking, and study tools. We'll announce any pricing changes well in advance.",
  },
  {
    question: "How does the Prime Meridian adaptive learning system work?",
    answer: "Prime Meridian analyzes your performance across AICPA content areas, identifies gaps in your knowledge, and recommends which topics to focus on. It uses the official AICPA blueprint weightings to calculate an exam readiness score, helping you understand when you're prepared to take each section.",
  },
  {
    question: "Do you offer video lectures?",
    answer: "No, we focus on active learning through practice questions and simulations. If you prefer learning through video lectures, you may want to supplement with another review course. Many candidates use Meridian alongside other resources.",
  },
  {
    question: "How long do I have access?",
    answer: "All tiers include unlimited access until you pass. There's no time limit or expiration date on your account.",
  },
  {
    question: "Can I use Meridian CPA Review on mobile devices?",
    answer: "Yes, our platform is fully responsive and works on smartphones, tablets, and desktop computers. Study wherever and whenever works best for you.",
  },
  {
    question: "How do I report an error in a question?",
    answer: "Each question has a feedback button that allows you to report errors or suggest improvements. Our team reviews all feedback and makes corrections as needed.",
  },
  {
    question: "What CPA exam sections do you cover?",
    answer: "We cover all six sections of the CPA exam: Financial Accounting & Reporting (FAR), Auditing & Attestation (AUD), Regulation (REG), Tax Compliance & Planning (TCP), Business Analysis & Reporting (BAR), and Information Systems & Controls (ISC).",
  },
];

export default function FAQPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fade-in-up">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-200 animate-fade-in-up animate-delay-100">
              Find answers to common questions about Meridian CPA Review.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[var(--card)] p-6 rounded-xl border border-[var(--border)] animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3 flex items-start gap-3">
                <span className="w-6 h-6 bg-[var(--primary)] bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[var(--primary)] text-sm font-bold">Q</span>
                </span>
                {faq.question}
              </h2>
              <p className="text-[var(--muted)] pl-9">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 bg-[var(--primary)] p-8 rounded-xl text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            We&apos;re here to help. Reach out to us and we&apos;ll get back to you as soon as possible.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-[var(--muted)] mt-8 text-center opacity-70">
          Meridian CPA Review is an independent exam preparation platform and is not affiliated with the AICPA or NASBA.
        </p>
      </div>
    </div>
  );
}
