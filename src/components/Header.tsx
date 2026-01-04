"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [guidesOpen, setGuidesOpen] = useState(false);

  const sections = [
    { name: "FAR", href: "/sections/far" },
    { name: "AUD", href: "/sections/aud" },
    { name: "REG", href: "/sections/reg" },
    { name: "TCP", href: "/sections/tcp" },
  ];

  const tools = [
    { name: "Score Release Calendar", href: "/tools/score-release-calendar" },
    { name: "NTS Expiration Tracker", href: "/tools/nts-tracker" },
    { name: "Study Hours Calculator", href: "/tools/study-hours-calculator" },
    { name: "State Requirements", href: "/state-requirements" },
  ];

  const guides = [
    { name: "Exam Day Walkthrough", href: "/guides/exam-day" },
    { name: "I Failed, Now What?", href: "/guides/failed-section" },
    { name: "Success Stories", href: "/success-stories" },
  ];

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
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/study-plan"
              className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors"
            >
              Study Plan
            </Link>

            {/* Sections Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSectionsOpen(!sectionsOpen)}
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
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[var(--border)] rounded-lg shadow-lg py-2">
                  {sections.map((section) => (
                    <Link
                      key={section.name}
                      href={section.href}
                      className="block px-4 py-2 text-[var(--foreground)] hover:bg-[var(--card)] hover:text-[var(--primary)] transition-colors"
                    >
                      {section.name} Section
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                onBlur={() => setTimeout(() => setToolsOpen(false), 150)}
                className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors flex items-center space-x-1"
              >
                <span>Free Tools</span>
                <svg
                  className={`w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[var(--border)] rounded-lg shadow-lg py-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="block px-4 py-2 text-[var(--foreground)] hover:bg-[var(--card)] hover:text-[var(--primary)] transition-colors"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Guides Dropdown */}
            <div className="relative">
              <button
                onClick={() => setGuidesOpen(!guidesOpen)}
                onBlur={() => setTimeout(() => setGuidesOpen(false), 150)}
                className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors flex items-center space-x-1"
              >
                <span>Guides</span>
                <svg
                  className={`w-4 h-4 transition-transform ${guidesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {guidesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-[var(--border)] rounded-lg shadow-lg py-2">
                  {guides.map((guide) => (
                    <Link
                      key={guide.name}
                      href={guide.href}
                      className="block px-4 py-2 text-[var(--foreground)] hover:bg-[var(--card)] hover:text-[var(--primary)] transition-colors"
                    >
                      {guide.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/working-full-time"
              className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors"
            >
              Working Full Time
            </Link>

            <Link
              href="/blog"
              className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors"
            >
              Blog
            </Link>

            <Link
              href="/about"
              className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium transition-colors"
            >
              About
            </Link>

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
              <Link
                href="/study-plan"
                className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Study Plan
              </Link>
              <div className="space-y-2">
                <span className="text-[var(--muted)] text-sm font-medium">Exam Sections</span>
                {sections.map((section) => (
                  <Link
                    key={section.name}
                    href={section.href}
                    className="block pl-4 text-[var(--foreground)] hover:text-[var(--primary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {section.name}
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <span className="text-[var(--muted)] text-sm font-medium">Free Tools</span>
                {tools.map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="block pl-4 text-[var(--foreground)] hover:text-[var(--primary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <span className="text-[var(--muted)] text-sm font-medium">Guides</span>
                {guides.map((guide) => (
                  <Link
                    key={guide.name}
                    href={guide.href}
                    className="block pl-4 text-[var(--foreground)] hover:text-[var(--primary)]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {guide.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/working-full-time"
                className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Working Full Time
              </Link>
              <Link
                href="/blog"
                className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-[var(--foreground)] hover:text-[var(--primary)] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
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
