import SectionPage from "@/components/SectionPage";

export const metadata = {
  title: "ISC Section Guide | Meridian CPA Review",
  description: "Master the ISC (Information Systems & Controls) section of the CPA exam with study strategies, key topics, and practical tips.",
};

export default function ISCPage() {
  return (
    <SectionPage
      name="ISC"
      fullName="Information Systems & Controls"
      color="bg-indigo-600"
      description="ISC is the technology-focused discipline section that tests IT governance, security, data management, and technology controls. It combines traditional IT audit concepts with modern data analytics, cloud computing, and emerging technology considerations relevant to financial reporting."
      difficulty="Moderate to Challenging"
      averageStudyTime="80-100 hours"
      topics={[
        "IT governance frameworks (COBIT, COSO)",
        "General IT controls and application controls",
        "Information security and cybersecurity",
        "Data management and database concepts",
        "Business continuity and disaster recovery",
        "System development life cycle (SDLC)",
        "Cloud computing models and controls",
        "SOC reports (Types 1, 2, and 3)",
        "Data analytics tools and techniques",
        "Encryption and authentication",
        "Network security concepts",
        "Emerging technologies and risks",
      ]}
      whyCandidatesFail={[
        "Approaching this section without any IT background - terminology and concepts can be overwhelming",
        "Not understanding the difference between IT general controls and application controls",
        "Memorizing control types without understanding when and why each is appropriate",
        "Ignoring SOC report requirements - these are heavily tested and require detailed knowledge",
        "Underestimating business continuity planning concepts like RPO, RTO, MTPD, and WRT",
      ]}
      whatToPrioritize={[
        "Master IT control categories - preventive, detective, and corrective controls with examples of each",
        "Understand SOC 1, SOC 2, and SOC 3 reports - purpose, audience, types, and differences",
        "Learn business continuity metrics thoroughly - RPO, RTO, MTPD, MSLO, WRT definitions and relationships",
        "Focus on data analytics concepts - Benford's Law, sampling techniques, and data visualization",
        "Study cloud computing models (IaaS, PaaS, SaaS) and the shared responsibility model",
      ]}
      studyAdvice={[
        "If you don't have an IT background, invest extra time learning fundamental concepts before diving into exam-specific material. Understanding the 'why' makes memorization easier.",
        "Create a matrix of control types: map preventive, detective, and corrective controls to specific business processes and systems. This helps with simulation scenarios.",
        "SOC reports appear frequently. Know the differences between Type 1 and Type 2, and understand when a company would use each SOC report type.",
        "Business continuity planning questions often involve matching metrics to scenarios. Create flashcards for RPO, RTO, MTPD, WRT with real-world examples.",
        "Data analytics on this section differs from BAR - here it focuses more on audit applications like testing for fraud or control effectiveness.",
        "Don't skip emerging technology topics like blockchain, AI, and IoT. While not deeply tested, you need basic understanding for application questions.",
      ]}
    />
  );
}
