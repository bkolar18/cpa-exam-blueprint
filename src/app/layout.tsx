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
  title: "CPA Exam Blueprint | Affordable CPA Exam Study Aid",
  description: "Affordable CPA exam prep with 600+ practice questions, study tracking, and personalized study plans. Quality study materials at a fraction of the cost.",
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
