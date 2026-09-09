import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavbar from "@/components/MainNavbar";
import BreakingTicker from "@/components/BreakingTicker";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechPulse Magazine | Independent Tech Journalism, Hardware & AI",
  description: "In-depth reporting on artificial intelligence, software architecture, semiconductors, cybersecurity, and future tech developments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-[#0b0f19] text-[#f1f5f9] antialiased selection:bg-[#ef233c] selection:text-white">
        <TopUtilityBar />
        <MainHeader />
        <MainNavbar />
        <BreakingTicker />
        <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
