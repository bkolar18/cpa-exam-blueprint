import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "FAR Section Guide | Meridian CPA Review",
  description: "Master the FAR (Financial Accounting & Reporting) section of the CPA exam with study strategies, key topics, and practical tips.",
};

export default function FARPage() {
  return (
    <SectionPage
      name="FAR"
      fullName="Financial Accounting & Reporting"
      color="bg-blue-600"
      description="FAR is often considered the most challenging and comprehensive section of the CPA exam. It tests your knowledge of financial accounting standards, governmental accounting, and not-for-profit accounting."
      difficulty="High"
      averageStudyTime="120-150 hours"
      topics={[
        "Financial statement preparation",
        "Revenue recognition (ASC 606)",
        "Leases (ASC 842)",
        "Business combinations",
        "Consolidations",
        "Governmental accounting (GASB)",
        "Not-for-profit accounting",
        "Foreign currency transactions",
        "Stock compensation",
        "Bonds and debt instruments",
        "Pensions and other post-employment benefits",
        "Statement of cash flows",
      ]}
      whyCandidatesFail={[
        "Underestimating the volume of material - FAR covers the most content of any section",
        "Spending too much time on governmental accounting early in their studies",
        "Not practicing enough simulations, especially consolidation problems",
        "Memorizing journal entries without understanding the underlying concepts",
        "Running out of time on exam day due to poor time management",
      ]}
      whatToPrioritize={[
        "Master financial statement preparation - this is the foundation for everything else",
        "Focus heavily on revenue recognition and leases - these standards receive significant exam coverage",
        "Practice consolidation simulations repeatedly until they become second nature",
        "Don't skip governmental and NFP accounting - they're easier points than most think",
        "Understand the conceptual framework - it helps you reason through unfamiliar problems",
      ]}
      studyAdvice={[
        "FAR should typically be your first section if you have a strong accounting background. The material is fresh from your coursework, and starting with FAR often helps build confidence for the remaining sections.",
        "Create a formula sheet for bond amortization, pension calculations, and lease computations. You'll use these formulas repeatedly, and having them memorized saves precious time on exam day.",
        "Don't just read about consolidations - work through 20-30 practice simulations. The elimination entries need to become automatic muscle memory.",
        "Governmental accounting seems overwhelming at first, but it's actually more straightforward than GAAP in many ways. Focus on understanding fund types and modified accrual basis.",
        "Take at least two full-length practice exams under timed conditions. FAR's length makes time management critical - you need to know your pacing.",
      ]}
    />
  );
}
