import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import { AuthProvider } from "@/components/auth/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CPA Exam Blueprint | Pass the CPA Exam for Less",
  description: "Affordable CPA exam prep with 6,000+ practice questions, progress tracking, and unlimited access until you pass. Quality study materials at 95% less than the competition.",
  keywords: "CPA exam, CPA study plan, CPA practice questions, CPA study aid, affordable CPA prep, FAR, AUD, REG, TCP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
