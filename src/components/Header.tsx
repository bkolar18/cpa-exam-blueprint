"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

export default function Header() {
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const sections = [
    { name: "FAR", description: "Financial Accounting & Reporting", href: "/sections/far" },
    { name: "AUD", description: "Auditing & Attestation", href: "/sections/aud" },
    { name: "REG", description: "Regulation", href: "/sections/reg" },
    { name: "TCP", description: "Tax Compliance & Planning", href: "/sections/tcp" },
  ];

  const resources = {
    tools: [
      { name: "Score Release Calendar", href: "/tools/score-release-calendar" },
      { name: "NTS Expiration Tracker", href: "/tools/nts-tracker" },
      { name: "Study Hours Calculator", href: "/tools/study-hours-calculator" },
      { name: "State Requirements", href: "/state-requirements" },
    ],
    guides: [
      { name: "Exam Day Walkthrough", href: "/guides/exam-day" },
      { name: "I Failed, Now What?", href: "/guides/failed-section" },
      { name: "Working Full Time", href: "/working-full-time" },
    ],
    learn: [
      { name: "Blog", href: "/blog" },
      { name: "Success Stories", href: "/success-stories" },
    ],
  };

  return (
    <header className="bg-white border-b border-[var(--border)] sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[var(--primary)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CPA</span>
            </div>
            <span className="text-xl font-bold text-[var(--primary)]">
              CPA Exam Blueprint
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Sections Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setSectionsOpen(!sectionsOpen);
                  setResourcesOpen(false);
                }}
                onBlur={() => setTimeout(() => setSectionsOpen(false), 150)}
                className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors flex items-center space-x-1"
              >
                <span>Exam Sections</span>
                <svg
                  className={`w-4 h-4 transition-transform ${sectionsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {sectionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-[var(--border)] rounded-lg shadow-lg py-3">
                  {sections.map((section, index) => (
                    <Link
                      key={section.name}
                      href={section.href}
                      className={`block px-5 py-3 hover:bg-[var(--card)] transition-colors ${index !== sections.length - 1 ? 'border-b border-[var(--border)]' : ''}`}
                    >
                      <div className="font-medium text-[var(--foreground)]">{section.name}</div>
                      <div className="text-sm text-[var(--muted)]">{section.description}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setResourcesOpen(!resourcesOpen);
                  setSectionsOpen(false);
                }}
                onBlur={() => setTimeout(() => setResourcesOpen(false), 150)}
                className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors flex items-center space-x-1"
              >
                <span>Resources</span>
                <svg
                  className={`w-4 h-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-[var(--border)] rounded-lg shadow-lg p-5">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Tools Column */}
                    <div>
                      <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
                        Free Tools
                      </div>
                      {resources.tools.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block py-2.5 text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    {/* Guides & Learn Column */}
                    <div>
                      <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3">
                        Guides
                      </div>
                      {resources.guides.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block py-2.5 text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                      <div className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider mb-3 mt-5">
                        Learn
                      </div>
                      {resources.learn.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block py-2.5 text-sm text-[var(--foreground)] hover:text-[var(--primary)] transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors"
            >
              About
            </Link>

            {!loading && (
              <>
                {user ? (
                  <Link
                    href="/dashboard"
                    className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors flex items-center space-x-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors"
                  >
                    Log In
                  </Link>
                )}
              </>
            )}

            <Link href="/study-plan" className="btn-primary">
              Build My Study Plan
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--card)]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border)]">
            <div className="flex flex-col space-y-4">
              {/* Exam Sections */}
              <div className="space-y-2">
                <span className="text-[var(--muted)] text-sm font-semibold uppercase tracking-wider">
                  Exam Sections
                </span>
                {sections.map((section) => (
                  <Link
                    key={section.name}
                    href={section.href}
                    className="block pl-4 text-[var(--foreground)] hover:text-[var(--primary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {section.name} - {section.description}
                  </Link>
                ))}
              </div>

              {/* Free Tools */}
              <div className="space-y-2">
                <span className="text-[var(--muted)] text-sm font-semibold uppercase tracking-wider">
                  Free Tools
                </span>
                {resources.tools.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block pl-4 text-[var(--foreground)] hover:text-[var(--primary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Guides */}
              <div className="space-y-2">
                <span className="text-[var(--muted)] text-sm font-semibold uppercase tracking-wider">
                  Guides
                </span>
                {resources.guides.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block pl-4 text-[var(--foreground)] hover:text-[var(--primary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Learn */}
              <div className="space-y-2">
                <span className="text-[var(--muted)] text-sm font-semibold uppercase tracking-wider">
                  Learn
                </span>
                {resources.learn.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block pl-4 text-[var(--foreground)] hover:text-[var(--primary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <Link
                href="/about"
                className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              {!loading && (
                <>
                  {user ? (
                    <Link
                      href="/dashboard"
                      className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium flex items-center space-x-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>My Dashboard</span>
                    </Link>
                  ) : (
                    <Link
                      href="/login"
                      className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log In / Sign Up
                    </Link>
                  )}
                </>
              )}

              <Link
                href="/study-plan"
                className="btn-primary text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Build My Study Plan
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
