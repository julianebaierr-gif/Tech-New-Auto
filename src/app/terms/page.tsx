export const metadata = {
  title: "Terms of Service & Editorial Usage | Com Pors",
  description: "Review the Com Pors terms of service, intellectual property guidelines, code snippet licensing, and editorial liability disclaimers.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-slate-700 leading-relaxed text-sm sm:text-base">
      <header className="border-b border-slate-200 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-200">
          Editorial Governance
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
        <p className="text-xs text-slate-500">Last Revised: September 2026 | Com Pors Media Group</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">1. Acceptance of Terms</h2>
        <p>
          By accessing, browsing, or citing materials published by <strong>Com Pors</strong> (the "Publication"), you enter into a binding agreement governed by these Terms of Service. If you do not accept these terms in full, your authorization to use this website, its API endpoints, or its syndicate feeds is immediately revoked.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">2. Editorial Standards and Nature of Technical Advice</h2>
        <p>
          Com Pors publishes research commentary, benchmark assessments, and investigative computing articles crafted by experienced engineering journalists:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
          <li><strong>Informational &amp; Research Scope:</strong> All content is provided strictly for educational, research, and informational purposes. It does not constitute certified legal, financial, or formal cybersecurity auditing counsel.</li>
          <li><strong>Production Implementations:</strong> While our code examples and architectural topologies are reviewed against modern industry standards, software developers and infrastructure engineers are responsible for performing independent testing and penetration reviews prior to live deployment.</li>
          <li><strong>Independent Journalism:</strong> Editorial opinions and product reviews are formulated independently. We maintain a clear wall between editorial coverage and any third-party commercial affiliations.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">3. Intellectual Property and Fair Use Citing</h2>
        <p>
          All original journalism, investigative graphics, and site branding published on Com Pors are protected under international copyright law:
        </p>
        <div className="space-y-3 pl-2 text-sm text-slate-600">
          <div>
            <h3 className="font-semibold text-slate-900">A. Code Snippets &amp; Architecture Patterns</h3>
            <p className="mt-1">
              Software samples, shell scripts, and configuration blocks published within our technical walkthroughs are made available under the permissive MIT Open Source License unless otherwise noted, allowing free use in your personal and commercial codebases.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">B. Editorial Text &amp; Quotations</h3>
            <p className="mt-1">
              Short quotations (up to 150 words) may be republished under Fair Use doctrine, provided that direct canonical attribution and an active hyperlink to the original Com Pors article URL are preserved. Automated whole-site scraping, mass mirroring, or unauthorized full-text syndication is strictly prohibited.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">4. Acceptable Access and Crawling Policies</h2>
        <p>
          We welcome verified search engine indexers and academic crawlers adhering to our published <code className="font-mono text-xs bg-slate-100 p-1 rounded">/robots.txt</code> specifications. Readers and automated clients agree not to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 text-sm">
          <li>Deploy distributed denial-of-service (DDoS) attempts or probe infrastructure vulnerabilities.</li>
          <li>Circumvent security headers, content security policies, or rate-limiting thresholds.</li>
          <li>Inject malicious scripts or exploit editorial contact forms for automated spam transmission.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">5. Disclaimer of Warranties and Limitation of Liability</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          The services, content, and code on Com Pors are provided on an "as is" and "as available" basis without express or implied warranties of any kind. In no event shall Com Pors, its editors, authors, or corporate affiliates be held liable for any direct, indirect, incidental, or consequential damages resulting from system downtime, reliance on published technical reports, or implementation outcomes.
        </p>
      </section>

      <section className="space-y-4 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">6. Newsroom Contact &amp; Legal Notices</h2>
        <p className="text-sm text-slate-600">
          Formal legal notices, DMCA inquiries, or copyright dispute submissions should be directed in writing to our legal desk at <a href="mailto:williamcheeke4@gmail.com" className="text-blue-600 underline">williamcheeke4@gmail.com</a> or via our <a href="/contact" className="text-blue-600 underline">contact page</a>.
        </p>
      </section>
    </div>
  );
}
