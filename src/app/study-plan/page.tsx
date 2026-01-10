"use client";

import { useState } from "react";
import Link from "next/link";

interface FormData {
  workingFullTime: string;
  hoursPerWeek: string;
  accountingBackground: string;
  disciplineSection: string;
  email: string;
}

interface StudyPlan {
  sectionOrder: string[];
  weeklySchedule: string;
  estimatedCompletion: string;
  tips: string[];
  disciplineInfo: {
    section: string;
    passRate: number;
    testingWindow: string;
    recommendation: string;
  };
}

const disciplineSections = {
  TCP: {
    name: "Tax Compliance and Planning",
    passRate: 77,
    difficulty: "Easiest Discipline",
    bestFor: "Those with tax background or interest in tax careers",
    testingWindows: "January, April, July, October",
    description: "Focuses on tax planning for individuals, entities, and transactions.",
  },
  BAR: {
    name: "Business Analysis and Reporting",
    passRate: 37,
    difficulty: "Hardest Discipline",
    bestFor: "Those strong in financial analysis and reporting",
    testingWindows: "January, April, July, October",
    description: "Covers technical accounting, financial statement analysis, and prospective analysis.",
  },
  ISC: {
    name: "Information Systems and Controls",
    passRate: 51,
    difficulty: "Moderate",
    bestFor: "Those with IT background or interest in systems/audit",
    testingWindows: "January, April, July, October",
    description: "Focuses on IT governance, security, and data management.",
  },
};

export default function StudyPlanPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    workingFullTime: "",
    hoursPerWeek: "",
    accountingBackground: "",
    disciplineSection: "",
    email: "",
  });
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 5;

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const generateStudyPlan = (): StudyPlan => {
    const hours = parseInt(formData.hoursPerWeek) || 15;
    const hasBackground = formData.accountingBackground === "strong";
    const isWorking = formData.workingFullTime === "yes";
    const discipline = formData.disciplineSection as keyof typeof disciplineSections;

    let sectionOrder: string[];
    let weeklySchedule: string;
    const tips: string[] = [];

    // Determine section order based on background and discipline choice
    if (hasBackground) {
      sectionOrder = ["FAR", "AUD", "REG", discipline];
      tips.push("With your strong accounting background, starting with FAR makes sense - you can build momentum quickly.");
    } else {
      sectionOrder = ["AUD", "FAR", "REG", discipline];
      tips.push("Starting with AUD allows you to build confidence with more conceptual material before tackling FAR.");
    }

    // Add discipline-specific tips
    if (discipline === "TCP") {
      tips.push("TCP has the highest pass rate (77%). If you have any tax experience, you'll have an advantage.");
    } else if (discipline === "BAR") {
      tips.push("BAR is the hardest discipline (37% pass rate). Give yourself extra study time and focus on financial analysis.");
    } else if (discipline === "ISC") {
      tips.push("ISC requires understanding IT concepts. Review IT governance frameworks and security controls thoroughly.");
    }

    // Calculate weekly schedule
    if (isWorking) {
      if (hours < 15) {
        weeklySchedule = "2-3 hours on weekdays, 4-5 hours on weekends";
        tips.push("Consider waking up 1 hour earlier on weekdays for focused study time.");
      } else if (hours < 25) {
        weeklySchedule = "2-3 hours on weekdays, 5-6 hours on each weekend day";
        tips.push("Block your weekend mornings for deep study sessions when you're fresh.");
      } else {
        weeklySchedule = "3-4 hours on weekdays, 6+ hours on weekends";
        tips.push("This is an aggressive schedule - make sure to build in rest days to avoid burnout.");
      }
    } else {
      weeklySchedule = "4-6 hours daily with one rest day per week";
      tips.push("Take advantage of your flexibility to study during your peak focus hours.");
    }

    // Estimate completion time
    const weeksPerSection = isWorking ? (hours < 20 ? 10 : 8) : 6;
    const totalWeeks = weeksPerSection * 4;
    const months = Math.ceil(totalWeeks / 4);
    const estimatedCompletion = `${months}-${months + 2} months to complete all four sections`;

    tips.push("Focus on understanding concepts, not memorizing. The exam tests application.");
    tips.push("Take at least one full practice exam per section before your real exam.");

    // Discipline info
    const disciplineData = disciplineSections[discipline];
    const disciplineInfo = {
      section: discipline,
      passRate: disciplineData.passRate,
      testingWindow: disciplineData.testingWindows,
      recommendation: disciplineData.bestFor,
    };

    return { sectionOrder, weeklySchedule, estimatedCompletion, tips, disciplineInfo };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const plan = generateStudyPlan();

    try {
      const response = await fetch("/api/submit-study-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          workingFullTime: formData.workingFullTime,
          hoursPerWeek: formData.hoursPerWeek,
          accountingBackground: formData.accountingBackground,
          disciplineSection: formData.disciplineSection,
          studyPlan: plan,
        }),
      });

      if (!response.ok) {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setStudyPlan(plan);
    setIsSubmitting(false);
    setStep(6);
  };

  const getSectionColor = (section: string) => {
    const colors: Record<string, string> = {
      FAR: "#1e3a5f",
      AUD: "#0891b2",
      REG: "#7c3aed",
      TCP: "#16a34a",
      BAR: "#dc2626",
      ISC: "#ea580c",
    };
    return colors[section] || "#1e3a5f";
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Are you working full-time?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              This helps us create a realistic study schedule for you.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  handleInputChange("workingFullTime", "yes");
                  setStep(2);
                }}
                className={`p-6 border-2 rounded-xl text-left transition-all hover:border-[var(--primary)] ${
                  formData.workingFullTime === "yes"
                    ? "border-[var(--primary)] bg-[var(--primary)]/5"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white">Yes</span>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  I work 40+ hours per week
                </p>
              </button>
              <button
                onClick={() => {
                  handleInputChange("workingFullTime", "no");
                  setStep(2);
                }}
                className={`p-6 border-2 rounded-xl text-left transition-all hover:border-[var(--primary)] ${
                  formData.workingFullTime === "no"
                    ? "border-[var(--primary)] bg-[var(--primary)]/5"
                    : "border-gray-200 dark:border-gray-600"
                }`}
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white">No</span>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  I can study full-time
                </p>
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              How many hours per week can you dedicate to studying?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Be realistic - consistency beats intensity.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "10", label: "10-15 hours", desc: "Part-time commitment" },
                { value: "20", label: "15-25 hours", desc: "Moderate commitment" },
                { value: "30", label: "25-35 hours", desc: "Serious commitment" },
                { value: "40", label: "35+ hours", desc: "Full-time commitment" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    handleInputChange("hoursPerWeek", option.value);
                    setStep(3);
                  }}
                  className={`p-6 border-2 rounded-xl text-left transition-all hover:border-[var(--primary)] ${
                    formData.hoursPerWeek === option.value
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{option.label}</span>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              What&apos;s your accounting background?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              This helps us recommend the best section order for you.
            </p>
            <div className="space-y-4">
              {[
                {
                  value: "strong",
                  label: "Strong background",
                  desc: "Accounting degree + work experience in accounting/audit",
                },
                {
                  value: "moderate",
                  label: "Moderate background",
                  desc: "Some accounting courses or related work experience",
                },
                {
                  value: "limited",
                  label: "Limited background",
                  desc: "New to accounting or career changer",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    handleInputChange("accountingBackground", option.value);
                    setStep(4);
                  }}
                  className={`w-full p-6 border-2 rounded-xl text-left transition-all hover:border-[var(--primary)] ${
                    formData.accountingBackground === option.value
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">{option.label}</span>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{option.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Which discipline section will you take?
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Under CPA Evolution, you choose one discipline section (BAR, TCP, or ISC) to complete alongside the three core sections.
            </p>
            <div className="space-y-4">
              {(Object.entries(disciplineSections) as [keyof typeof disciplineSections, typeof disciplineSections[keyof typeof disciplineSections]][]).map(
                ([code, section]) => (
                  <button
                    key={code}
                    onClick={() => {
                      handleInputChange("disciplineSection", code);
                      setStep(5);
                    }}
                    className={`w-full p-6 border-2 rounded-xl text-left transition-all hover:border-[var(--primary)] ${
                      formData.disciplineSection === code
                        ? "border-[var(--primary)] bg-[var(--primary)]/5"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span
                            className="px-2 py-1 rounded text-white text-sm font-bold"
                            style={{ backgroundColor: getSectionColor(code) }}
                          >
                            {code}
                          </span>
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">{section.name}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{section.description}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          <strong>Best for:</strong> {section.bestFor}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            section.passRate >= 70
                              ? "text-green-600"
                              : section.passRate >= 50
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {section.passRate}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Pass Rate</div>
                      </div>
                    </div>
                  </button>
                )
              )}
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-sm text-gray-600 dark:text-gray-300">
              <strong>Note:</strong> Discipline sections are only offered during quarterly testing windows (January, April, July, October).
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Get your personalized study plan
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Enter your email to receive your customized CPA study plan with
              section order, weekly schedule, and study tips.
            </p>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-[var(--primary)] focus:outline-none transition-colors"
              />
              <button
                onClick={handleSubmit}
                disabled={!formData.email || isSubmitting}
                className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Generating Your Plan..." : "Get My Free Study Plan"}
              </button>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--secondary)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Your Personalized CPA Study Plan
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                We&apos;ve also sent this to {formData.email}
              </p>
            </div>

            {studyPlan && (
              <div className="space-y-6">
                {/* Section Order */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recommended Section Order
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {studyPlan.sectionOrder.map((section, index) => (
                      <div key={section} className="flex items-center">
                        <div className="text-center">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
                            style={{ backgroundColor: getSectionColor(section) }}
                          >
                            <span className="text-white font-bold text-sm">{section}</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                            {index === 0 ? "Start" : index === 3 ? "Finish" : `Step ${index + 1}`}
                          </span>
                        </div>
                        {index < studyPlan.sectionOrder.length - 1 && (
                          <svg className="w-6 h-6 text-gray-400 dark:text-gray-500 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Discipline Section Info */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Your Discipline Section: {studyPlan.disciplineInfo.section}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="bg-white dark:bg-gray-600 rounded-lg p-4">
                      <div
                        className={`text-2xl font-bold ${
                          studyPlan.disciplineInfo.passRate >= 70
                            ? "text-green-600"
                            : studyPlan.disciplineInfo.passRate >= 50
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {studyPlan.disciplineInfo.passRate}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Pass Rate</div>
                    </div>
                    <div className="bg-white dark:bg-gray-600 rounded-lg p-4 md:col-span-2">
                      <div className="text-sm text-gray-900 dark:text-white">
                        <strong>Testing Windows:</strong> {studyPlan.disciplineInfo.testingWindow}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weekly Schedule */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Weekly Study Schedule
                  </h3>
                  <p className="text-gray-900 dark:text-white">{studyPlan.weeklySchedule}</p>
                </div>

                {/* Estimated Completion */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Estimated Timeline
                  </h3>
                  <p className="text-gray-900 dark:text-white">{studyPlan.estimatedCompletion}</p>
                </div>

                {/* Tips */}
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Study Tips
                  </h3>
                  <ul className="space-y-3">
                    {studyPlan.tips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <svg className="w-5 h-5 text-[var(--secondary)] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-900 dark:text-white">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Ready to start studying?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Track your progress and unlock achievements with your CPA Academy dashboard.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/signup" className="btn-primary inline-block">
                      Sign Up for CPA Academy
                    </Link>
                    <Link href="/dashboard" className="btn-secondary inline-block">
                      Go to Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress bar */}
        {step <= totalSteps && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}% complete</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--primary)] transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Back button */}
        {step > 1 && step <= totalSteps && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
          {renderStepContent()}
        </div>

        {/* Trust signal */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Study planning tools developed by an accounting graduate
        </p>
      </div>
    </div>
  );
}
