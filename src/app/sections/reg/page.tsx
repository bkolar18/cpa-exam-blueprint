import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "REG Section Guide | Meridian CPA Review",
  description: "Master the REG (Regulation) section of the CPA exam with study strategies, key topics, and practical tips.",
};

export default function REGPage() {
  return (
    <SectionPage
      name="REG"
      fullName="Regulation"
      color="bg-orange-600"
      description="REG covers federal taxation for individuals, entities, and property transactions, along with business law and ethics. This section requires both calculation skills and conceptual understanding."
      difficulty="Moderate-High"
      averageStudyTime="100-120 hours"
      topics={[
        "Individual taxation (Form 1040)",
        "Corporate taxation (Form 1120)",
        "Partnership taxation (Form 1065)",
        "S Corporation taxation (Form 1120-S)",
        "Property transactions (basis, gains, losses)",
        "Gift and estate taxation",
        "Tax-exempt organizations",
        "Business law fundamentals",
        "Contracts and agency",
        "Debtor-creditor relationships",
        "Business structures and formation",
        "Professional ethics (Circular 230)",
      ]}
      whyCandidatesFail={[
        "Trying to memorize tax rates and thresholds that change annually",
        "Not understanding basis concepts - these flow through every topic",
        "Underestimating business law - it's tested more heavily than most expect",
        "Getting lost in the details of complex entity transactions",
        "Poor calculation accuracy on tax computation simulations",
      ]}
      whatToPrioritize={[
        "Master basis calculations - original basis, adjusted basis, and basis in property received",
        "Understand individual tax calculation flow from gross income to taxable income to tax",
        "Focus on entity taxation differences - when income is taxed and how it flows to owners",
        "Don't skip business law - contracts and agency are frequently emphasized and often more approachable",
        "Practice property transaction calculations until they're automatic",
      ]}
      studyAdvice={[
        "REG is best taken after FAR if you have tax experience, or can be taken early if you're fresh from a tax class. The material is detailed but follows logical patterns.",
        "Create a flowchart for each entity type showing how income flows from the entity to the owner's return. Understanding this flow is more important than memorizing specific rules.",
        "Basis is the most important concept in REG. If you understand basis, you can work through almost any property or entity transaction. Make this your foundation.",
        "Business law topics follow common sense more than you'd expect. Think about what's fair and reasonable - contract law and agency often follow intuitive principles.",
        "The IRS publishes forms and instructions that are excellent study materials. Understanding how a real 1040 or 1065 works helps you answer exam questions.",
      ]}
    />
  );
}
