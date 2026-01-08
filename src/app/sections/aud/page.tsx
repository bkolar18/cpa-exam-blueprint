import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "AUD Section Guide | CPA Exam Blueprint",
  description: "Master the AUD (Auditing & Attestation) section of the CPA exam with study strategies, key topics, and practical tips.",
};

export default function AUDPage() {
  return (
    <SectionPage
      name="AUD"
      fullName="Auditing & Attestation"
      color="bg-green-600"
      description="AUD tests your understanding of the entire audit process, from planning through reporting. This section is heavily conceptual and requires strong critical thinking skills."
      difficulty="Moderate"
      averageStudyTime="80-100 hours"
      topics={[
        "Audit planning and risk assessment",
        "Internal control evaluation",
        "Audit evidence and procedures",
        "Audit sampling",
        "Audit reports and modifications",
        "Review and compilation engagements",
        "Attestation engagements",
        "Professional responsibilities and ethics",
        "Quality control standards",
        "Government auditing standards",
        "PCAOB standards for public companies",
        "Information technology in audits",
      ]}
      whyCandidatesFail={[
        "Approaching AUD like FAR - this section requires understanding, not memorization",
        "Not understanding the flow of the audit process from planning to reporting",
        "Confusing similar-sounding terms and concepts (e.g., types of audit reports)",
        "Ignoring SSARS, SSAE, and other non-audit engagement standards",
        "Struggling with the heavily simulation-based format of recent exams",
      ]}
      whatToPrioritize={[
        "Understand the audit process flow - planning, risk assessment, evidence, and reporting",
        "Master audit report modifications - know when each type applies and exact wording",
        "Focus on internal control concepts - COSO framework appears throughout the exam",
        "Learn the differences between audits, reviews, compilations, and attestation engagements",
        "Practice document review simulations - these are increasingly common on the exam",
      ]}
      studyAdvice={[
        "AUD is a great section to take early if you're working in audit. The concepts will be familiar, and passing it reinforces what you do at work every day.",
        "Think like an auditor when studying. Ask yourself: What could go wrong? What evidence would I need? What would I conclude? This mindset helps you reason through questions.",
        "Create comparison charts for similar concepts: types of opinions, types of engagements, types of sampling. The exam loves testing your ability to distinguish between similar items.",
        "The AICPA releases old exam questions. Use these extensively for AUD - the question style is unique and takes practice to master.",
        "Don't underestimate ethics and professional responsibilities. These topics appear throughout the exam and in simulations. AICPA Code of Professional Conduct is fair game.",
      ]}
    />
  );
}
