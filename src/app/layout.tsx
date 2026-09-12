import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopUtilityBar from "@/components/TopUtilityBar";
import MainHeader from "@/components/MainHeader";
import MainNavbar from "@/components/MainNavbar";
import BreakingTicker from "@/components/BreakingTicker";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://compors.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Com Pors | Leading Tech Intelligence, AI & Systems Architecture",
    template: "%s | Com Pors",
  },
  description: "Independent tech journalism reporting on emerging AI models, software architecture, semiconductors, cybersecurity, and future computing.",

  authors: [
    { name: "Cora Lee", url: `${siteUrl}/author/cora-lee` },
    { name: "Kellie Anne", url: `${siteUrl}/author/kellie-anne` },
  ],
  creator: "Com Pors",
  publisher: "Com Pors Editorial Board",
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
    siteName: "Com Pors",
    title: "Com Pors | Leading Tech Intelligence, AI & Systems Architecture",
    description: "Independent tech journalism reporting on emerging AI models, software architecture, semiconductors, cybersecurity, and future computing.",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Com Pors - Leading Tech Intelligence and Engineering Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Com Pors | Leading Tech Intelligence, AI & Systems Architecture",
    description: "Independent tech journalism reporting on emerging AI models, software architecture, semiconductors, cybersecurity, and future computing.",
    creator: "@compors",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "Com Pors",
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
