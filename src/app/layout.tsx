import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavbar from "@/components/MainNavbar";
import BreakingTicker from "@/components/BreakingTicker";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechPulse | Leading Tech Intelligence, AI & Software Architecture",
  description: "Independent tech journalism reporting on emerging AI models, software architecture, semiconductors, cybersecurity, and future computing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col bg-[#f8fafc] text-[#0f172a] antialiased selection:bg-blue-600 selection:text-white">
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
