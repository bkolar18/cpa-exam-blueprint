import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[var(--primary-dark)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              alt="Meridian CPA Review"
              width={28}
              height={28}
              className="w-7 h-7 brightness-0 invert"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Meridian</span>
              <span className="text-xs text-gray-300 -mt-0.5">CPA Review</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs">
            <Link href="/study-plan" className="text-gray-300 hover:text-white transition-colors">
              Study Plan
            </Link>
            <Link href="/working-full-time" className="text-gray-300 hover:text-white transition-colors">
              CPA While Working
            </Link>
            <Link href="/signup" className="text-gray-300 hover:text-white transition-colors">
              Get Started
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
          </div>

          {/* Exam Sections */}
          <div className="flex items-center gap-3 text-xs">
            <span className="text-gray-300">Sections:</span>
            <Link href="/sections/far" className="text-gray-300 hover:text-white transition-colors">
              FAR
            </Link>
            <Link href="/sections/aud" className="text-gray-300 hover:text-white transition-colors">
              AUD
            </Link>
            <Link href="/sections/reg" className="text-gray-300 hover:text-white transition-colors">
              REG
            </Link>
            <Link href="/sections/tcp" className="text-gray-300 hover:text-white transition-colors">
              TCP
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-300 text-xs">
            &copy; {new Date().getFullYear()} Meridian CPA Review
          </p>
        </div>
      </div>
    </footer>
  );
}
