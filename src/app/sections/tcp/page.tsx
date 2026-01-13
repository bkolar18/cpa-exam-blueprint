import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "TCP Section Guide | Meridian CPA Review",
  description: "Master the TCP (Tax Compliance & Planning) section of the CPA exam with study strategies, key topics, and practical tips.",
};

export default function TCPPage() {
  return (
    <SectionPage
      name="TCP"
      fullName="Tax Compliance & Planning"
      color="bg-purple-600"
      description="TCP is one of the newer discipline sections focusing on advanced tax compliance and planning strategies. It tests your ability to apply tax knowledge to real-world planning scenarios and complex compliance situations."
      difficulty="Moderate"
      averageStudyTime="90-110 hours"
      topics={[
        "Tax planning strategies for individuals",
        "Tax planning for business entities",
        "Retirement plan contributions and distributions",
        "Estate and gift tax planning",
        "Compensation and benefits planning",
        "Choice of entity considerations",
        "Multi-state taxation issues",
        "International tax basics",
        "Tax credits and incentives",
        "Compliance procedures and penalties",
        "IRS practice and procedure",
        "Tax research methodology",
      ]}
      whyCandidatesFail={[
        "Treating TCP like another version of REG - this section emphasizes planning over compliance",
        "Not understanding the practical application of tax concepts to client scenarios",
        "Ignoring retirement plan rules - these are frequently emphasized and require detailed knowledge",
        "Failing to consider multiple tax years in planning scenarios",
        "Struggling with open-ended planning simulations that require judgment",
      ]}
      whatToPrioritize={[
        "Focus on entity selection and restructuring - understand when each entity type is advantageous",
        "Master retirement plan contribution limits, distributions, and penalties",
        "Learn estate and gift tax planning strategies including annual exclusions and lifetime exemptions",
        "Understand compensation alternatives - qualified plans, stock options, deferred compensation",
        "Practice applying tax concepts to multi-year planning scenarios",
      ]}
      studyAdvice={[
        "TCP requires you to think like a tax advisor, not just a tax preparer. Every question should prompt you to ask: What would I recommend to this client and why?",
        "If you've worked in tax, draw on that experience. TCP tests practical knowledge that experienced tax professionals use daily. Your work experience is valuable here.",
        "Create comparison charts for retirement plans: contribution limits, catch-up provisions, distribution rules, and employer matching. These details are frequently emphasized.",
        "Entity selection questions often have multiple acceptable answers. Focus on understanding the trade-offs rather than looking for one right answer.",
        "Practice simulations that require you to analyze a client's situation and recommend planning strategies. The exam increasingly tests application over memorization.",
      ]}
    />
  );
}
