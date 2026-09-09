export const metadata = {
  title: "Privacy Policy | TechPulse",
  description: "Comprehensive privacy statement regarding user data, cookies, analytics, and autonomous automation.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-xs text-slate-400">Effective Date: September 2026 | Last Updated: Autonomous Engine Release</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">1. Overview</h2>
        <p>
          At <strong>TechPulse</strong> (accessible via our Vercel-hosted deployment), safeguarding your privacy is of paramount importance. This Privacy Policy details the types of information we collect, how it is processed, and your rights in accordance with worldwide data protection standards (including GDPR and CCPA guidelines).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">2. Autonomous Content Generation & Information Sourced</h2>
        <p>
          Our platform operates an autonomous content pipeline integrating Google Sheets, Gemini AI models, and Unsplash public APIs. We do NOT harvest or collect sensitive personal identifiable information (PII) from our readers during standard browsing sessions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">3. Log Files & Performance Analytics</h2>
        <p>
          Like modern web services hosted on serverless infrastructure (Vercel), standard access log information is captured automatically:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-400">
          <li>Internet Protocol (IP) address</li>
          <li>Browser type and device profile</li>
          <li>Referring/exit pages and timestamp metrics</li>
          <li>Core Web Vitals performance benchmarks</li>
        </ul>
        <p>This technical telemetry is utilized exclusively for uptime maintenance, abuse prevention, and page delivery acceleration.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">4. Cookies and Web Storage</h2>
        <p>
          We employ minimal, privacy-centric cookies strictly for maintaining user theme preferences (e.g., dark mode settings) and optimizing serverless edge caching. We do not engage in third-party cross-site behavioral tracking or sell user browsing records.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">5. Third-Party Integrations & APIs</h2>
        <p>
          Our platform integrates with trusted cloud providers:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-400">
          <li><strong>Vercel</strong>: Cloud deployment and Edge network delivery.</li>
          <li><strong>GitHub Actions</strong>: CI/CD automation and cron trigger execution.</li>
          <li><strong>Unsplash</strong>: High-resolution media asset resolution.</li>
          <li><strong>Google APIs</strong>: Structured spreadsheet synchronization and Gemini model inferences.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">6. Contact Our Data Officer</h2>
        <p>
          If you have questions or inquiries regarding this Privacy Policy, you may contact our legal operations team at <code className="text-cyan-400 font-mono">privacy@techpulse-auto.com</code>.
        </p>
      </section>
    </div>
  );
}
