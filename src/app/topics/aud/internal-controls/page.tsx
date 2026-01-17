import Link from 'next/link';
import { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Internal Controls for CPA Exam | COSO Framework & SOC Reports | Meridian CPA Review',
  description: 'Master internal controls for the CPA exam. Learn the COSO framework, five components of internal control, control activities, SOC reports, and testing procedures.',
  keywords: 'internal controls CPA exam, COSO framework, internal control components, SOC 1 SOC 2, control activities, control deficiencies',
};

const baseUrl = "https://meridiancpareview.com";

export default function InternalControlsPage() {
  return (
    <div>
      {/* Structured Data */}
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseUrl },
          { name: "AUD", url: `${baseUrl}/sections/aud` },
          { name: "Internal Controls", url: `${baseUrl}/topics/aud/internal-controls` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
            <Link href="/resources" className="hover:text-white">Resources</Link>
            <span>/</span>
            <Link href="/sections/aud" className="hover:text-white">AUD</Link>
            <span>/</span>
            <span>Internal Controls</span>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Internal Controls
            </h1>
            <p className="text-xl text-gray-200">
              Understanding the COSO framework, control components, and audit procedures for internal controls
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Why It Matters */}
        <section className="mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">Why Internal Controls Matter on the CPA Exam</h2>
            <p className="text-[var(--muted)]">
              Internal controls are fundamental to the audit process and appear throughout the AUD section. You&apos;ll need to understand
              how to evaluate, test, and report on internal controls for both integrated audits and audits of financial statements only.
              The COSO framework provides the foundation for understanding control design and implementation.
            </p>
          </div>
        </section>

        {/* COSO Framework */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">The COSO Internal Control Framework</h2>
          <p className="text-[var(--muted)] mb-6">
            The Committee of Sponsoring Organizations (COSO) framework is the most widely used framework for designing,
            implementing, and evaluating internal control systems. The 2013 framework (updated from 1992) includes five
            components and 17 principles.
          </p>

          <div className="space-y-6">
            {/* Control Environment */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-600 dark:text-red-400 font-bold text-xl">1</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Control Environment</h3>
                  <p className="text-[var(--muted)] mb-3">
                    The &quot;tone at the top&quot; - the foundation for all other components. Sets the organizational culture
                    regarding internal control.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-medium text-[var(--foreground)] mb-2">Key Elements:</h4>
                    <ul className="text-sm text-[var(--muted)] space-y-1">
                      <li>• Commitment to integrity and ethical values</li>
                      <li>• Board of directors exercises oversight responsibility</li>
                      <li>• Management establishes structure and reporting lines</li>
                      <li>• Commitment to competence (hiring, training, retention)</li>
                      <li>• Accountability for internal control responsibilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 dark:text-orange-400 font-bold text-xl">2</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Risk Assessment</h3>
                  <p className="text-[var(--muted)] mb-3">
                    The process of identifying and analyzing risks to achieving objectives, forming a basis for how risks
                    should be managed.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-medium text-[var(--foreground)] mb-2">Key Elements:</h4>
                    <ul className="text-sm text-[var(--muted)] space-y-1">
                      <li>• Specifies objectives with sufficient clarity</li>
                      <li>• Identifies and analyzes risks to achieving objectives</li>
                      <li>• Considers potential for fraud</li>
                      <li>• Identifies and assesses changes that could impact controls</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Activities */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-yellow-600 dark:text-yellow-400 font-bold text-xl">3</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Control Activities</h3>
                  <p className="text-[var(--muted)] mb-3">
                    The policies and procedures that help ensure management directives are carried out and risks are mitigated.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-medium text-[var(--foreground)] mb-2">Types of Control Activities:</h4>
                    <div className="grid md:grid-cols-2 gap-4 text-sm text-[var(--muted)]">
                      <div>
                        <p className="font-medium text-[var(--foreground)]">Preventive Controls:</p>
                        <ul className="space-y-1 mt-1">
                          <li>• Segregation of duties</li>
                          <li>• Authorization requirements</li>
                          <li>• Physical controls (locks, passwords)</li>
                          <li>• Input validation</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-[var(--foreground)]">Detective Controls:</p>
                        <ul className="space-y-1 mt-1">
                          <li>• Bank reconciliations</li>
                          <li>• Physical inventory counts</li>
                          <li>• Exception reports</li>
                          <li>• Variance analysis</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Information & Communication */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 dark:text-green-400 font-bold text-xl">4</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Information & Communication</h3>
                  <p className="text-[var(--muted)] mb-3">
                    The systems that support the identification, capture, and exchange of information needed to conduct,
                    manage, and control operations.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-medium text-[var(--foreground)] mb-2">Key Elements:</h4>
                    <ul className="text-sm text-[var(--muted)] space-y-1">
                      <li>• Uses relevant, quality information</li>
                      <li>• Communicates internally (up, down, across)</li>
                      <li>• Communicates externally (regulators, investors, vendors)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Monitoring */}
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-xl">5</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">Monitoring Activities</h3>
                  <p className="text-[var(--muted)] mb-3">
                    Ongoing evaluations, separate evaluations, or a combination of both to ascertain whether components
                    of internal control are present and functioning.
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                    <h4 className="font-medium text-[var(--foreground)] mb-2">Key Elements:</h4>
                    <ul className="text-sm text-[var(--muted)] space-y-1">
                      <li>• Ongoing monitoring (built into operations)</li>
                      <li>• Separate evaluations (internal audit, management reviews)</li>
                      <li>• Evaluates and communicates deficiencies</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COSO Mnemonic */}
          <div className="mt-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Memory Aid: CRIME</h3>
            <div className="grid grid-cols-5 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">C</div>
                <div className="text-sm text-[var(--muted)]">Control Environment</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">R</div>
                <div className="text-sm text-[var(--muted)]">Risk Assessment</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">I</div>
                <div className="text-sm text-[var(--muted)]">Information & Communication</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">M</div>
                <div className="text-sm text-[var(--muted)]">Monitoring</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">E</div>
                <div className="text-sm text-[var(--muted)]">Existing control activities</div>
              </div>
            </div>
          </div>
        </section>

        {/* Control Deficiencies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Control Deficiencies</h2>
          <p className="text-[var(--muted)] mb-6">
            Understanding the hierarchy of control deficiencies is critical for the CPA exam. The severity of
            deficiencies affects both the audit report and management communications.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-[var(--border)] p-3 text-left">Type</th>
                  <th className="border border-[var(--border)] p-3 text-left">Definition</th>
                  <th className="border border-[var(--border)] p-3 text-left">Communication Required</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[var(--border)] p-3 font-semibold text-red-600 dark:text-red-400">Material Weakness</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    A deficiency (or combination) such that there is a <strong>reasonable possibility</strong> that a
                    <strong> material misstatement</strong> will not be prevented or detected on a timely basis
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Written communication to management and those charged with governance; included in auditor&apos;s report (integrated audit)
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-[var(--border)] p-3 font-semibold text-orange-600 dark:text-orange-400">Significant Deficiency</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    A deficiency (or combination) that is <strong>less severe</strong> than a material weakness but
                    important enough to merit attention by those charged with governance
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Written communication to management and those charged with governance
                  </td>
                </tr>
                <tr>
                  <td className="border border-[var(--border)] p-3 font-semibold text-yellow-600 dark:text-yellow-400">Deficiency</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    A control does not allow management or employees to prevent or detect misstatements on a timely basis
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    May be communicated to management (auditor&apos;s judgment)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Key Exam Point: Aggregation</h3>
            <p className="text-[var(--muted)]">
              Individual deficiencies that are not significant by themselves may be significant when aggregated.
              The auditor must consider whether multiple deficiencies affecting the same account or assertion
              represent a significant deficiency or material weakness in aggregate.
            </p>
          </div>
        </section>

        {/* Testing Controls */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Testing Internal Controls</h2>
          <p className="text-[var(--muted)] mb-6">
            The auditor must test the operating effectiveness of controls to determine whether they can rely
            on them to reduce substantive testing. The nature, timing, and extent of testing depends on the
            type of control and the desired level of reliance.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Types of Control Tests</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Inquiry</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Asking personnel about their duties and procedures. Weakest form of evidence - must be
                    corroborated with other procedures.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Observation</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Watching procedures being performed. Limited to point in time observed.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Inspection</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Examining documents for evidence of control operation (initials, stamps, signatures).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Re-performance</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Independently executing the control procedure. Strongest form of control testing evidence.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Sample Size Considerations</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Automated Controls</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Test once if IT general controls are effective. The computer performs the same way every time.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Manual Controls</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Larger sample size needed. Frequency affects sample size (daily controls need more samples
                    than monthly controls).
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Dual-Purpose Tests</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Test controls and substantive procedures simultaneously on the same sample. Efficient but
                    requires larger sample size.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOC Reports */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Service Organization Controls (SOC) Reports</h2>
          <p className="text-[var(--muted)] mb-6">
            When clients use service organizations (payroll processors, cloud providers, etc.), the auditor must
            consider controls at the service organization. SOC reports provide information about these controls.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="border border-[var(--border)] p-3 text-left">Report Type</th>
                  <th className="border border-[var(--border)] p-3 text-left">Purpose</th>
                  <th className="border border-[var(--border)] p-3 text-left">Coverage Period</th>
                  <th className="border border-[var(--border)] p-3 text-left">Key Characteristics</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-[var(--border)] p-3 font-semibold">SOC 1</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Controls relevant to user entities&apos; internal control over financial reporting (ICFR)
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Type 1: Point in time<br />
                    Type 2: Period of time
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Restricted use; for auditors and management
                  </td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <td className="border border-[var(--border)] p-3 font-semibold">SOC 2</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Controls related to security, availability, processing integrity, confidentiality, privacy
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Type 1: Point in time<br />
                    Type 2: Period of time
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Restricted use; based on Trust Services Criteria
                  </td>
                </tr>
                <tr>
                  <td className="border border-[var(--border)] p-3 font-semibold">SOC 3</td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Same criteria as SOC 2 but summarized for general use
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    Period of time only
                  </td>
                  <td className="border border-[var(--border)] p-3 text-[var(--muted)]">
                    General use; can be displayed publicly
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h3 className="font-bold text-[var(--foreground)] mb-3">Type 1 vs. Type 2 Reports</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-2">Type 1</h4>
                <ul className="text-sm text-[var(--muted)] space-y-1">
                  <li>• Reports on design of controls</li>
                  <li>• As of a specific date</li>
                  <li>• Does NOT test operating effectiveness</li>
                  <li>• Less useful for reliance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-[var(--foreground)] mb-2">Type 2</h4>
                <ul className="text-sm text-[var(--muted)] space-y-1">
                  <li>• Reports on design AND operating effectiveness</li>
                  <li>• Covers a period of time (usually 6-12 months)</li>
                  <li>• Includes testing results</li>
                  <li>• More useful for reliance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* IT General Controls */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">IT General Controls (ITGCs)</h2>
          <p className="text-[var(--muted)] mb-6">
            IT general controls are policies and procedures that support the effective functioning of
            application controls. If ITGCs are ineffective, application controls cannot be relied upon.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Common ITGC Categories</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Access Controls</h4>
                  <p className="text-sm text-[var(--muted)]">
                    User authentication, authorization levels, password policies, access reviews
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Change Management</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Program changes, testing requirements, approvals, documentation
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Computer Operations</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Job scheduling, backup procedures, incident management, disaster recovery
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">System Development</h4>
                  <p className="text-sm text-[var(--muted)]">
                    SDLC methodology, testing standards, implementation procedures
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Application Controls</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Input Controls</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Edit checks, validation rules, batch totals, sequence checks
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Processing Controls</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Reasonableness tests, limit checks, programmed calculations
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-[var(--foreground)]">Output Controls</h4>
                  <p className="text-sm text-[var(--muted)]">
                    Report distribution lists, reconciliations, output reviews
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-sm text-[var(--muted)]">
                  <strong>Key Point:</strong> Application controls depend on ITGCs. If ITGCs fail, automated
                  application controls cannot be trusted, regardless of their design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Exam Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">CPA Exam Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Key Concepts to Master</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Know all five COSO components and their principles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Understand the difference between material weakness and significant deficiency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Know when to use Type 1 vs. Type 2 SOC reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Understand the relationship between ITGCs and application controls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Know communication requirements for different deficiency levels</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
              <h3 className="font-bold text-[var(--foreground)] mb-3">Common Exam Traps</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Confusing &quot;reasonable possibility&quot; (material weakness) with &quot;remote likelihood&quot;</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Thinking inquiry alone is sufficient evidence for control effectiveness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Assuming SOC 2 reports cover financial statement controls (that&apos;s SOC 1)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Forgetting that deficiencies can be aggregated to material weakness level</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600">✗</span>
                  <span>Thinking observation provides evidence beyond the specific time observed</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Topics */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Related AUD Topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/topics/aud/audit-reports"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Audit Reports</h3>
              <p className="text-sm text-[var(--muted)]">
                How control deficiencies affect audit report modifications
              </p>
            </Link>
            <Link
              href="/sections/aud"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">AUD Section Guide</h3>
              <p className="text-sm text-[var(--muted)]">
                Complete overview of the AUD exam section
              </p>
            </Link>
            <Link
              href="/sections/isc"
              className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 hover:border-[var(--primary)] hover:shadow-md transition-all"
            >
              <h3 className="font-semibold text-[var(--foreground)] mb-2">ISC Section Guide</h3>
              <p className="text-sm text-[var(--muted)]">
                Deep dive into Information Systems & Controls
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-2xl p-8 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Practice Internal Control Questions</h2>
            <p className="text-gray-200 mb-6">
              Apply what you&apos;ve learned with practice MCQs and simulations covering COSO, control deficiencies,
              SOC reports, and IT controls.
            </p>
            <Link
              href="/signup"
              className="inline-block bg-white text-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Practicing Free
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
