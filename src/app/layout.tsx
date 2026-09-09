import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavbar from "@/components/MainNavbar";
import BreakingTicker from "@/components/BreakingTicker";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techpulse-journal.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TechPulse | Leading Tech Intelligence, AI & Software Architecture",
    template: "%s | TechPulse",
  },
  description: "Independent tech journalism reporting on emerging AI models, software architecture, semiconductors, cybersecurity, and future computing.",
  keywords: [
    "Artificial Intelligence",
    "Machine Learning",
    "Software Architecture",
    "Semiconductors",
    "Cybersecurity",
    "Cloud Computing",
    "Quantum Computing",
    "DevOps Automation",
  ],
  authors: [
    { name: "Cora Lee", url: `${siteUrl}/author/cora-lee` },
    { name: "Kellie Anne", url: `${siteUrl}/author/kellie-anne` },
  ],
  creator: "TechPulse Magazine",
  publisher: "TechPulse Editorial Board",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TechPulse Magazine",
    title: "TechPulse | Leading Tech Intelligence, AI & Software Architecture",
    description: "Independent tech journalism reporting on emerging AI models, software architecture, semiconductors, cybersecurity, and future computing.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "TechPulse Magazine - Leading Tech Intelligence and Engineering Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TechPulse | Leading Tech Intelligence, AI & Software Architecture",
    description: "Independent tech journalism reporting on emerging AI models, software architecture, semiconductors, cybersecurity, and future computing.",
    creator: "@techpulse",
    images: [`${siteUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "TechPulse Magazine",
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: `${siteUrl}/logo.png`,
    width: 600,
    height: 60,
  },
  publishingPrinciples: `${siteUrl}/about`,
  ethicsPolicy: `${siteUrl}/about`,
  diversityPolicy: `${siteUrl}/about`,
  correctionsPolicy: `${siteUrl}/about`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
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
