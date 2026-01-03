import Link from "next/link";

export const metadata = {
  title: "About Our CPAs | CPA Exam Blueprint",
  description: "Meet the licensed CPAs behind CPA Exam Blueprint. Real professionals sharing real advice to help you pass the CPA exam.",
};

export default function AboutPage() {
  const team = [
    {
      name: "Sarah Mitchell, CPA",
      title: "Founder & Lead Content Creator",
      license: "California CPA License #XXXXXX",
      bio: "Sarah passed all four CPA exam sections on her first attempt while working full-time at a Big 4 firm. With over 10 years of experience in public accounting and financial reporting, she now dedicates her time to helping the next generation of CPAs succeed.",
      experience: ["Big 4 Audit Senior Manager", "10+ years in public accounting", "Specialized in SEC reporting"],
      passedSections: ["FAR: 89", "AUD: 85", "REG: 82", "TCP: 87"],
    },
    {
      name: "Michael Chen, CPA",
      title: "Tax Content Specialist",
      license: "New York CPA License #XXXXXX",
      bio: "Michael brings deep expertise in individual and corporate taxation from his career at regional and national firms. He understands the challenges of balancing CPA exam prep with demanding client work and brings practical insights to our tax content.",
      experience: ["Tax Partner at Regional Firm", "15+ years in tax practice", "Specialized in partnership taxation"],
      passedSections: ["FAR: 78", "AUD: 81", "REG: 91", "TCP: 88"],
    },
    {
      name: "Jennifer Park, CPA",
      title: "Audit & Attestation Specialist",
      license: "Texas CPA License #XXXXXX",
      bio: "Jennifer has spent her career in audit, from staff accountant to audit manager. She passed the CPA exam while raising two young children and working full-time, and she's passionate about helping working parents achieve their CPA goals.",
      experience: ["Audit Manager at Big 4", "8+ years in public accounting", "Specialized in financial services"],
      passedSections: ["FAR: 84", "AUD: 92", "REG: 79", "TCP: 83"],
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Meet the CPAs Behind This Site
            </h1>
            <p className="text-xl text-gray-200">
              We&apos;re licensed CPAs who remember how challenging the exam was. We built this site to give you the guidance we wish we had.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission Statement */}
        <div className="bg-white p-8 rounded-xl border border-[var(--border)] mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">Our Mission</h2>
          <p className="text-lg text-[var(--muted)]">
            We believe every CPA candidate deserves access to quality guidance - not just those who can afford expensive courses or have connections in the industry. Our mission is to provide free, expert-level CPA exam advice that helps you study smarter, avoid common mistakes, and pass the exam faster.
          </p>
        </div>

        {/* Why We Built This */}
        <div className="bg-[var(--card)] p-8 rounded-xl border border-[var(--border)] mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Why We Built CPA Exam Blueprint</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-[var(--primary)] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Too Much Conflicting Advice</h3>
              <p className="text-[var(--muted)]">
                Reddit, forums, and influencers all say different things. We wanted to provide one clear, CPA-vetted source of truth.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[var(--secondary)] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Guidance Shouldn&apos;t Cost Thousands</h3>
              <p className="text-[var(--muted)]">
                The CPA exam is already expensive. Basic guidance on how to study shouldn&apos;t add to that burden.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-[var(--accent)] bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">We Remember Being There</h3>
              <p className="text-[var(--muted)]">
                We know how stressful and confusing the CPA exam journey is. We want to make it easier for those who come after us.
              </p>
            </div>
          </div>
        </div>

        {/* Team */}
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-8">Our Team</h2>
        <div className="space-y-8 mb-12">
          {team.map((member, index) => (
            <div key={index} className="bg-white p-8 rounded-xl border border-[var(--border)]">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-[var(--primary)] rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-[var(--foreground)]">{member.name}</h3>
                  <p className="text-[var(--primary)] font-medium">{member.title}</p>
                  <p className="text-sm text-[var(--muted)] mb-4">{member.license}</p>
                  <p className="text-[var(--muted)] mb-4">{member.bio}</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">Experience</h4>
                      <ul className="space-y-1">
                        {member.experience.map((exp, i) => (
                          <li key={i} className="text-sm text-[var(--muted)] flex items-center space-x-2">
                            <svg className="w-4 h-4 text-[var(--secondary)]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">CPA Exam Scores</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.passedSections.map((score, i) => (
                          <span key={i} className="px-3 py-1 bg-[var(--card)] rounded-full text-sm text-[var(--foreground)]">
                            {score}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credentials & Transparency */}
        <div className="bg-white p-8 rounded-xl border border-[var(--border)] mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Our Commitment to Transparency</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-[var(--muted)]">
                <strong className="text-[var(--foreground)]">All content is reviewed by licensed CPAs.</strong> Every article, study guide, and recommendation on this site has been written or reviewed by a CPA with active credentials.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-[var(--muted)]">
                <strong className="text-[var(--foreground)]">We clearly disclose affiliate relationships.</strong> When we recommend a product and receive compensation, we tell you. Our recommendations are based on quality, not commissions.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-[var(--muted)]">
                <strong className="text-[var(--foreground)]">We don&apos;t sell your data.</strong> Your email is used only to deliver your study plan and occasional helpful updates. We never sell or share your information with third parties.
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-[var(--muted)]">
                <strong className="text-[var(--foreground)]">We update content regularly.</strong> The CPA exam changes, and so do we. We review and update our content to ensure it reflects current exam standards and best practices.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[var(--primary)] p-8 rounded-xl text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your CPA Journey?</h2>
          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Get your personalized study plan created with the methodology we wish we had when we started.
          </p>
          <Link
            href="/study-plan"
            className="inline-block bg-white text-[var(--primary)] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Build My Free Study Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
