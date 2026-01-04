import Link from 'next/link';

export const metadata = {
  title: 'CPA Exam Day Walkthrough | What to Expect at Prometric',
  description: 'Complete guide to CPA exam day: what to bring, Prometric procedures, exam interface tips, time management strategies, and what to do after your exam.',
};

const checklistItems = {
  weekBefore: [
    'Confirm your exam appointment (check email confirmation)',
    'Visit Prometric website to review testing center location',
    'Do a practice drive to the testing center if unfamiliar',
    'Review the AICPA sample tests one more time',
    'Focus on weak areas but avoid cramming new material',
    'Get your sleep schedule consistent (aim for 7-8 hours)',
    'Prepare your ID documents (two forms required)',
  ],
  dayBefore: [
    'Stop studying by early evening - rest your brain',
    'Lay out your clothes and ID documents',
    'Set multiple alarms (phone + backup)',
    'Eat a normal dinner - nothing too heavy or unusual',
    'Avoid alcohol and excessive caffeine',
    'Go to bed at your normal time',
    'Review your confirmation email one more time',
  ],
  whatToBring: [
    'Primary ID: Valid driver\'s license or passport',
    'Secondary ID: Credit card with signature or another government ID',
    'Confirmation email (printed or on phone - just in case)',
  ],
  whatToLeave: [
    'Phone (leave in car or locker)',
    'Smart watch or fitness tracker',
    'Notes, books, or study materials',
    'Food or drinks (except during breaks)',
    'Wallet (beyond required IDs)',
    'Jacket with large pockets (may be asked to remove)',
  ],
};

const timelineSteps = [
  {
    time: '30 min before',
    title: 'Arrive at Prometric',
    description: 'Arrive early to allow time for check-in. Late arrivals may forfeit their exam.',
    icon: '🚗',
  },
  {
    time: '15-20 min',
    title: 'Check-In Process',
    description: 'Present IDs, store belongings in locker, palm vein scan, photo taken.',
    icon: '📋',
  },
  {
    time: '5 min',
    title: 'Seated at Workstation',
    description: 'Prometric staff escorts you. You\'ll receive scratch paper and calculator.',
    icon: '💺',
  },
  {
    time: '15 min',
    title: 'Tutorial & Survey',
    description: 'Optional intro tutorial and pre-exam survey. Use this time to settle in.',
    icon: '📝',
  },
  {
    time: '4 hours',
    title: 'Exam Time',
    description: 'The actual exam. You control when to start after the tutorial.',
    icon: '⏱️',
  },
  {
    time: '5 min',
    title: 'Post-Exam Survey',
    description: 'Brief survey after exam. Your score is NOT shown immediately.',
    icon: '✅',
  },
];

const examSections = [
  {
    name: 'FAR',
    testlets: [
      { name: 'Testlet 1', type: 'MCQ', questions: 33, time: '45-50 min' },
      { name: 'Testlet 2', type: 'MCQ', questions: 33, time: '45-50 min' },
      { name: 'Testlet 3', type: 'TBS', questions: 2, time: '25-30 min' },
      { name: 'Testlet 4', type: 'TBS', questions: 3, time: '35-40 min' },
      { name: 'Testlet 5', type: 'TBS', questions: 3, time: '35-40 min' },
    ],
    totalTime: '4 hours',
  },
  {
    name: 'AUD',
    testlets: [
      { name: 'Testlet 1', type: 'MCQ', questions: 36, time: '50-55 min' },
      { name: 'Testlet 2', type: 'MCQ', questions: 36, time: '50-55 min' },
      { name: 'Testlet 3', type: 'TBS', questions: 2, time: '20-25 min' },
      { name: 'Testlet 4', type: 'TBS', questions: 3, time: '30-35 min' },
      { name: 'Testlet 5', type: 'TBS', questions: 3, time: '30-35 min' },
    ],
    totalTime: '4 hours',
  },
];

export default function ExamDayGuidePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-200 hover:text-white mb-6 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Resources
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CPA Exam Day Walkthrough
            </h1>
            <p className="text-xl text-gray-200">
              Everything you need to know about what to expect at Prometric, from arrival to walking out the door.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Navigation */}
        <nav className="bg-[var(--card)] rounded-xl p-6 mb-12">
          <h2 className="font-semibold text-[var(--foreground)] mb-4">Quick Navigation</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              { label: 'Week Before Checklist', href: '#week-before' },
              { label: 'Day Before Checklist', href: '#day-before' },
              { label: 'What to Bring', href: '#what-to-bring' },
              { label: 'Exam Day Timeline', href: '#timeline' },
              { label: 'Prometric Procedures', href: '#prometric' },
              { label: 'Exam Interface', href: '#interface' },
              { label: 'Time Management', href: '#time-management' },
              { label: 'After the Exam', href: '#after-exam' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[var(--accent)] hover:underline"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Week Before */}
        <section id="week-before" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Week Before the Exam
          </h2>
          <p className="text-[var(--muted)] mb-6">
            The week before your exam is about finalizing your preparation and reducing stress, not cramming.
          </p>
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <ul className="space-y-3">
              {checklistItems.weekBefore.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-[var(--border)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--foreground)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Day Before */}
        <section id="day-before" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Day Before the Exam
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Trust your preparation. Last-minute cramming does more harm than good.
          </p>
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <ul className="space-y-3">
              {checklistItems.dayBefore.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full border-2 border-[var(--border)] flex-shrink-0 mt-0.5" />
                  <span className="text-[var(--foreground)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* What to Bring */}
        <section id="what-to-bring" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            What to Bring (and Leave Behind)
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl border border-green-200 p-6">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Bring These
              </h3>
              <ul className="space-y-2">
                {checklistItems.whatToBring.map((item, index) => (
                  <li key={index} className="text-green-700">{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl border border-red-200 p-6">
              <h3 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Leave These Behind
              </h3>
              <ul className="space-y-2">
                {checklistItems.whatToLeave.map((item, index) => (
                  <li key={index} className="text-red-700">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Pro tip:</strong> Leave valuables in your car, not the Prometric locker. Lockers are small and you can&apos;t access them during the exam.
            </p>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Exam Day Timeline
          </h2>
          <div className="space-y-4">
            {timelineSteps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-[var(--primary)] rounded-full flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className="w-0.5 h-full bg-[var(--border)] my-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="text-sm text-[var(--muted)] mb-1">{step.time}</div>
                  <h3 className="font-semibold text-[var(--foreground)] mb-1">{step.title}</h3>
                  <p className="text-[var(--muted)]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Prometric Procedures */}
        <section id="prometric" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Prometric Check-In Procedures
          </h2>
          <div className="bg-white rounded-xl border border-[var(--border)] p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">1. ID Verification</h3>
              <p className="text-[var(--muted)]">
                You&apos;ll need two forms of ID. Your primary ID (driver&apos;s license or passport) must have your photo and signature. The name must exactly match your NTS - even middle names matter.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">2. Biometric Scan</h3>
              <p className="text-[var(--muted)]">
                Prometric uses palm vein scanning technology. You&apos;ll scan your palm each time you leave and return to the testing room (including breaks).
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">3. Belongings Storage</h3>
              <p className="text-[var(--muted)]">
                Everything except your IDs goes in a small locker. This includes your phone, watch, wallet, and any other items. You&apos;ll keep the locker key with you.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">4. Pocket Check</h3>
              <p className="text-[var(--muted)]">
                Staff will ask you to turn out your pockets and may check glasses frames. This happens every time you enter the testing room.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">5. Photo & Signature</h3>
              <p className="text-[var(--muted)]">
                Your photo is taken and you&apos;ll sign digitally. This is used to verify your identity if you leave for breaks.
              </p>
            </div>
          </div>
        </section>

        {/* Exam Interface */}
        <section id="interface" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Exam Interface Overview
          </h2>
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">Calculator</h3>
                <p className="text-[var(--muted)]">
                  An on-screen calculator is available. It&apos;s a basic calculator, similar to the Windows calculator. Practice with the AICPA sample tests to get comfortable with it.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">Scratch Paper</h3>
                <p className="text-[var(--muted)]">
                  You&apos;ll receive two double-sided noteboards (laminated paper) with markers. You can request more if needed by raising your hand.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">Question Navigation</h3>
                <p className="text-[var(--muted)]">
                  You can flag questions for review within a testlet. Once you submit a testlet, you cannot go back to it.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[var(--foreground)] mb-2">Exhibit Spreadsheets</h3>
                <p className="text-[var(--muted)]">
                  TBS questions include Excel-like spreadsheets. You can sort and filter data, but functionality is limited compared to actual Excel.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Important:</strong> Take the AICPA sample tests at <a href="https://aicpa.org" className="underline" target="_blank" rel="noopener noreferrer">aicpa.org</a> to familiarize yourself with the exact interface before exam day.
            </p>
          </div>
        </section>

        {/* Time Management */}
        <section id="time-management" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Time Management Strategies
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">General Time Guidelines</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li>• <strong>MCQs:</strong> Average 1.5 minutes per question</li>
                <li>• <strong>TBS:</strong> Average 10-15 minutes per simulation</li>
                <li>• <strong>Break:</strong> Take your optional break between testlets 3 and 4</li>
                <li>• <strong>Buffer:</strong> Aim to finish with 15-20 minutes to spare for review</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl border border-[var(--border)] p-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-4">If You&apos;re Running Out of Time</h3>
              <ul className="space-y-2 text-[var(--muted)]">
                <li>• Never leave a question blank - guess if needed</li>
                <li>• On TBS, fill in what you can - partial credit exists</li>
                <li>• Skip time-consuming questions and return if time permits</li>
                <li>• Remember: Some questions are pretest (unscored), so don&apos;t panic</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Breaks */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Taking Breaks
          </h2>
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
            <p className="text-[var(--muted)] mb-4">
              You get one official 15-minute break that doesn&apos;t count against your exam time. This occurs after the first set of TBS questions.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-[var(--foreground)] mb-2">During Your Break:</h4>
                <ul className="text-[var(--muted)] space-y-1">
                  <li>• Use the restroom</li>
                  <li>• Have a quick snack from your locker</li>
                  <li>• Drink water</li>
                  <li>• Take deep breaths and reset mentally</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--foreground)] mb-2">Break Reminders:</h4>
                <ul className="text-[var(--muted)] space-y-1">
                  <li>• You must re-scan your palm when returning</li>
                  <li>• Time over 15 minutes counts against your exam</li>
                  <li>• You can take unofficial breaks, but time keeps running</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* After the Exam */}
        <section id="after-exam" className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            After the Exam
          </h2>
          <div className="bg-white rounded-xl border border-[var(--border)] p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Immediately After</h3>
              <p className="text-[var(--muted)]">
                You&apos;ll complete a brief survey. You will NOT see your score - scores are released by NASBA according to the score release calendar. Collect your belongings and head out.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Don&apos;t Second-Guess</h3>
              <p className="text-[var(--muted)]">
                Resist the urge to look up answers when you get home. It won&apos;t change anything and will only increase anxiety. What&apos;s done is done.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Celebrate the Effort</h3>
              <p className="text-[var(--muted)]">
                Regardless of outcome, you just completed a 4-hour professional exam. Do something nice for yourself - you earned it.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] mb-2">Score Release</h3>
              <p className="text-[var(--muted)]">
                Core section scores are released every 1-2 weeks. Discipline section scores are released quarterly. Check our Score Release Calendar for specific dates.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[var(--card)] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
            Track Your Score Release Date
          </h2>
          <p className="text-[var(--muted)] mb-6">
            Get notified when scores are released so you&apos;re not constantly refreshing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/score-release-calendar" className="btn-secondary">
              Score Release Calendar
            </Link>
            <Link href="/study-plan" className="btn-primary">
              Build My Study Plan
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
