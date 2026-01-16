"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ThemeToggleSimple } from "@/components/theme/ThemeToggle";

export default function Header() {
  const { user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  // Mobile accordion states
  const [mobileExamOpen, setMobileExamOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const sections = [
    { name: "FAR", description: "Financial Accounting & Reporting", href: "/sections/far" },
    { name: "AUD", description: "Auditing & Attestation", href: "/sections/aud" },
    { name: "REG", description: "Regulation", href: "/sections/reg" },
    { name: "TCP", description: "Tax Compliance & Planning", href: "/sections/tcp" },
    { name: "BAR", description: "Business Analysis & Reporting", href: "/sections/bar" },
    { name: "ISC", description: "Information Systems & Controls", href: "/sections/isc" },
  ];

  // Simplified resources for dropdown - key pages only
  const quickLinks = [
    { name: "How to Become a CPA", href: "/guides/how-to-become-a-cpa", description: "Complete guide to CPA licensure" },
    { name: "State Requirements", href: "/state-requirements", description: "Requirements by state" },
    { name: "CPA Salary Data", href: "/resources/cpa-salary", description: "Salary info by state" },
    { name: "Compare Courses", href: "/compare/becker-vs-gleim", description: "Becker vs Gleim & more" },
    { name: "CPA Pass Rates", href: "/resources/cpa-pass-rates", description: "Latest exam statistics" },
    { name: "Blog", href: "/blog", description: "Tips and insights" },
  ];

  return (
    <header className="bg-[var(--background)] border-b border-[var(--border)] sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="Meridian CPA Review"
              width={56}
              height={56}
              className="w-14 h-14 dark:brightness-0 dark:invert"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-blue-500 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Meridian
              </span>
              <span className="text-xs font-semibold text-[var(--muted)] dark:text-gray-300 -mt-0.5 tracking-wide">
                CPA Review
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Sections Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setSectionsOpen(!sectionsOpen);
                  setResourcesOpen(false);
                }}
                onBlur={() => setTimeout(() => setSectionsOpen(false), 150)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
                  sectionsOpen
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white"
                }`}
              >
                <span>Exam Sections</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${sectionsOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {sectionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg py-2">
                  {sections.map((section) => (
                    <Link
                      key={section.name}
                      href={section.href}
                      className="block px-5 py-3 hover:bg-[var(--primary)] hover:text-white transition-all duration-200"
                    >
                      <div className="font-medium">{section.name}</div>
                      <div className="text-sm opacity-80">{section.description}</div>
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
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-1 ${
                  resourcesOpen
                    ? "bg-[var(--primary)] text-white"
                    : "text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white"
                }`}
              >
                <span>Resources</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg p-4">
                  {/* CPA Academy - Featured */}
                  <Link
                    href="/cpa-academy"
                    className="block px-3 py-2 mb-2 bg-[var(--primary)]/10 hover:bg-[var(--primary)] hover:text-white rounded-lg transition-all duration-200"
                  >
                    <div className="font-medium text-[var(--foreground)]">Meridian CPA Academy</div>
                    <div className="text-xs text-[var(--muted)]">Start studying today</div>
                  </Link>

                  {/* Quick Links */}
                  <div className="border-t border-[var(--border)] pt-2 mt-2">
                    {quickLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-3 py-2 hover:bg-[var(--primary)] hover:text-white rounded transition-all duration-200"
                      >
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-xs text-[var(--muted)]">{item.description}</div>
                      </Link>
                    ))}
                  </div>

                  {/* View All Resources */}
                  <div className="border-t border-[var(--border)] pt-3 mt-2">
                    <Link
                      href="/resources"
                      className="flex items-center justify-between px-3 py-2 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white rounded transition-all duration-200 font-medium"
                    >
                      <span>View All Resources</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="px-4 py-2 rounded-lg font-medium text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-all duration-200"
            >
              About
            </Link>

            {!loading && (
              <>
                {user ? (
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-lg font-medium text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-all duration-200 flex items-center space-x-1"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    className="px-4 py-2 rounded-lg font-medium text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white transition-all duration-200"
                  >
                    Log In
                  </Link>
                )}
              </>
            )}

            <Link href="/signup" className="btn-primary">
              Create Free Account
            </Link>
            <ThemeToggleSimple />
          </div>

          {/* Mobile: Theme toggle + menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggleSimple />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-[var(--card)]"
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
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border)]">
            <div className="flex flex-col space-y-1">
              {/* Exam Sections - Collapsible */}
              <div>
                <button
                  onClick={() => setMobileExamOpen(!mobileExamOpen)}
                  className="w-full flex items-center justify-between py-3 text-[var(--foreground)] font-medium"
                >
                  <span>Exam Sections</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${mobileExamOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileExamOpen && (
                  <div className="pb-2 pl-4 space-y-2">
                    {sections.map((section) => (
                      <Link
                        key={section.name}
                        href={section.href}
                        className="block py-1 text-[var(--muted-foreground)] hover:text-[var(--primary)]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="font-medium text-[var(--foreground)]">{section.name}</span>
                        <span className="text-sm"> - {section.description}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources - Collapsible */}
              <div>
                <button
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  className="w-full flex items-center justify-between py-3 text-[var(--foreground)] font-medium"
                >
                  <span>Resources</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${mobileResourcesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileResourcesOpen && (
                  <div className="pb-2 pl-4 space-y-1">
                    <Link
                      href="/cpa-academy"
                      className="block py-2 text-[var(--primary)] font-medium hover:text-[var(--primary)]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Meridian CPA Academy
                    </Link>
                    {quickLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block py-2 text-[var(--foreground)] hover:text-[var(--primary)]"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      href="/resources"
                      className="block py-2 text-[var(--primary)] font-medium hover:text-[var(--primary)] flex items-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      View All Resources →
                    </Link>
                  </div>
                )}
              </div>

              {/* Direct links */}
              <Link
                href="/about"
                className="py-3 text-[var(--foreground)] hover:text-[var(--primary)] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>

              {!loading && (
                <>
                  {user ? (
                    <Link
                      href="/dashboard"
                      className="py-3 text-[var(--foreground)] hover:text-[var(--primary)] font-medium flex items-center space-x-2"
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
                      className="py-3 text-[var(--foreground)] hover:text-[var(--primary)] font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log In / Sign Up
                    </Link>
                  )}
                </>
              )}

              <div className="pt-4">
                <Link
                  href="/signup"
                  className="btn-primary text-center block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create Free Account
                </Link>
                <p className="text-xs text-[var(--muted)] text-center mt-2">
                  Free during beta • No credit card required
                </p>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
