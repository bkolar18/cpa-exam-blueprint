import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "BAR Section Guide | Meridian CPA Review",
  description: "Master the BAR (Business Analysis & Reporting) section of the CPA exam with study strategies, key topics, and practical tips.",
};

export default function BARPage() {
  return (
    <SectionPage
      name="BAR"
      fullName="Business Analysis & Reporting"
      color="bg-teal-600"
      description="BAR is one of the discipline sections that combines financial analysis, data analytics, and technical accounting topics. It tests your ability to analyze financial data, apply managerial accounting concepts, and evaluate business performance using various metrics and tools."
      difficulty="Moderate"
      averageStudyTime="80-100 hours"
      topics={[
        "Financial statement analysis and ratios",
        "Cost accounting and variance analysis",
        "Budgeting and forecasting",
        "Performance metrics and KPIs",
        "Data analytics and visualization",
        "Capital budgeting decisions",
        "Transfer pricing concepts",
        "Segment reporting",
        "Prospective financial information",
        "Economic concepts and analysis",
        "Financial modeling techniques",
        "Managerial decision-making",
      ]}
      whyCandidatesFail={[
        "Underestimating the data analytics component - this section requires comfort with analyzing data sets",
        "Not mastering variance analysis formulas - these are frequently tested in multiple formats",
        "Focusing solely on calculation without understanding interpretation and business implications",
        "Neglecting segment reporting and transfer pricing rules - these appear regularly",
        "Poor time management on data-heavy simulations that require analysis across multiple exhibits",
      ]}
      whatToPrioritize={[
        "Master ratio analysis - liquidity, profitability, solvency, and activity ratios with interpretation",
        "Understand all variance formulas - price, quantity, rate, efficiency, spending, and volume variances",
        "Practice budgeting concepts - flexible budgets, static budgets, and variance reporting",
        "Learn capital budgeting methods - NPV, IRR, payback period, and profitability index",
        "Develop comfort with data analytics scenarios - trend analysis, outlier detection, and visualization interpretation",
      ]}
      studyAdvice={[
        "BAR combines quantitative analysis with business judgment. Don't just memorize formulas - understand what the results mean for business decisions.",
        "Create formula sheets for variance analysis and practice until the calculations become second nature. You'll need speed to finish simulations.",
        "Data analytics questions often present large data sets. Practice scanning data efficiently and identifying relevant information quickly.",
        "Ratio interpretation is as important as calculation. Know what each ratio measures and what high/low values indicate about business health.",
        "Review segment reporting rules carefully - intercompany transactions and transfer pricing frequently appear in simulations.",
        "Practice interpreting charts and graphs. The exam may ask you to draw conclusions from visualized data without requiring calculations.",
      ]}
    />
  );
}
