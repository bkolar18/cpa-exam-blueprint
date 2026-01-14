"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

// AI Feature config type
interface AIFeatureConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  action?: string;
  color: string;
  limit: string;
  proOnly: boolean;
}

// Beta badge component
function BetaBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm">
      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
      BETA
    </span>
  );
}

// Pro badge component
function ProBadge() {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm">
      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd"/>
      </svg>
      PRO
    </span>
  );
}

// Feature icons
const NavigatorIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
  </svg>
);

const StudyGuideIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
  </svg>
);

const FlashcardIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
  </svg>
);

const DebriefIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
  </svg>
);

const AssessmentIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
  </svg>
);

const WeeklyEmailIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);

// Feature configurations
const aiFeatures: AIFeatureConfig[] = [
  {
    id: "navigator",
    name: "Meridian Navigator",
    description: "AI tutor for questions and concepts",
    icon: NavigatorIcon,
    action: "Ask questions while practicing",
    color: "blue",
    limit: "10/day",
    proOnly: true,
  },
  {
    id: "study_guide",
    name: "AI Study Guide",
    description: "Personalized study plans",
    icon: StudyGuideIcon,
    href: "/dashboard/study-log?tab=study-guide",
    color: "purple",
    limit: "1/month",
    proOnly: true,
  },
  {
    id: "flashcard",
    name: "Flashcard Generator",
    description: "Auto-generate from missed questions",
    icon: FlashcardIcon,
    href: "/dashboard/flashcards",
    color: "teal",
    limit: "5/month",
    proOnly: true,
  },
  {
    id: "exam_debrief",
    name: "Exam Debrief",
    description: "AI analysis after simulations",
    icon: DebriefIcon,
    href: "/dashboard/exam-simulation",
    color: "orange",
    limit: "Unlimited",
    proOnly: true,
  },
  {
    id: "pre_exam_assessment",
    name: "Pre-Exam Assessment",
    description: "Comprehensive readiness check",
    icon: AssessmentIcon,
    href: "/dashboard/readiness",
    color: "green",
    limit: "1/exam",
    proOnly: true,
  },
  {
    id: "weekly_email",
    name: "Weekly Progress Email",
    description: "Weekly study summary to inbox",
    icon: WeeklyEmailIcon,
    href: "/dashboard/settings",
    color: "indigo",
    limit: "Weekly",
    proOnly: true,
  },
];

const colorClasses: Record<string, { bg: string; text: string; border: string; hover: string }> = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    hover: "hover:border-blue-400 dark:hover:border-blue-600",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
    hover: "hover:border-purple-400 dark:hover:border-purple-600",
  },
  teal: {
    bg: "bg-teal-50 dark:bg-teal-900/20",
    text: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200 dark:border-teal-800",
    hover: "hover:border-teal-400 dark:hover:border-teal-600",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-800",
    hover: "hover:border-orange-400 dark:hover:border-orange-600",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-200 dark:border-green-800",
    hover: "hover:border-green-400 dark:hover:border-green-600",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-200 dark:border-indigo-800",
    hover: "hover:border-indigo-400 dark:hover:border-indigo-600",
  },
};

interface AIFeaturesCardProps {
  isBeta?: boolean;
}

export default function AIFeaturesCard({ isBeta = true }: AIFeaturesCardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI-Powered Features</h2>
              <p className="text-sm text-white/80">Intelligent study assistance</p>
            </div>
          </div>
          {isBeta && <BetaBadge />}
        </div>
      </div>

      {/* Beta notice */}
      {isBeta && (
        <div className="px-6 py-3 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 border-b border-purple-100 dark:border-purple-800">
          <p className="text-sm text-purple-700 dark:text-purple-300 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
            </svg>
            <span>
              <strong>Beta Access:</strong> All AI features are available free during beta with reduced limits.
            </span>
          </p>
        </div>
      )}

      {/* Features Grid */}
      <div className="p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiFeatures.map((feature) => {
            const colors = colorClasses[feature.color] || colorClasses.blue;
            const Content = (
              <div
                className={`relative p-4 rounded-xl border ${colors.border} ${colors.bg} ${colors.hover} transition-all group cursor-pointer`}
              >
                {/* Pro badge (shown when not in beta) */}
                {!isBeta && feature.proOnly && (
                  <div className="absolute -top-2 -right-2">
                    <ProBadge />
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors.text} ${colors.bg} group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[var(--foreground)] text-sm">{feature.name}</h3>
                    <p className="text-xs text-[var(--muted)] mt-0.5 line-clamp-2">{feature.description}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                        {feature.limit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );

            if (feature.href) {
              return (
                <Link key={feature.id} href={feature.href}>
                  {Content}
                </Link>
              );
            }

            return <div key={feature.id}>{Content}</div>;
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-[var(--card-hover)] border-t border-[var(--border)]">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--muted)]">
            {isBeta ? (
              <>Powered by <span className="font-medium text-[var(--foreground)]">Claude AI</span></>
            ) : (
              <>Upgrade for unlimited AI features</>
            )}
          </p>
          {!isBeta && (
            <Link
              href="/pricing"
              className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center gap-1"
            >
              View Plans
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
