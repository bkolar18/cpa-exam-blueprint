import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-dark)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-[var(--primary)] font-bold text-sm">CPA</span>
              </div>
              <span className="text-xl font-bold">CPA Exam Blueprint</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Affordable CPA exam study aid with 600+ practice questions,
              progress tracking, and personalized study plans.
            </p>
            <p className="text-gray-400 text-sm mt-4">
              A budget-friendly alternative for CPA candidates.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/study-plan" className="text-gray-300 hover:text-white transition-colors">
                  Build My Study Plan
                </Link>
              </li>
              <li>
                <Link href="/working-full-time" className="text-gray-300 hover:text-white transition-colors">
                  CPA While Working
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-300 hover:text-white transition-colors">
                  Get Started
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Exam Sections */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Exam Sections</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sections/far" className="text-gray-300 hover:text-white transition-colors">
                  FAR Section
                </Link>
              </li>
              <li>
                <Link href="/sections/aud" className="text-gray-300 hover:text-white transition-colors">
                  AUD Section
                </Link>
              </li>
              <li>
                <Link href="/sections/reg" className="text-gray-300 hover:text-white transition-colors">
                  REG Section
                </Link>
              </li>
              <li>
                <Link href="/sections/tcp" className="text-gray-300 hover:text-white transition-colors">
                  TCP Section
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} CPA Exam Blueprint. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            <Link href="/about" className="hover:text-white transition-colors">
              About Us
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
