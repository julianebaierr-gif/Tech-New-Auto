export const metadata = {
  title: "Terms & Conditions | TechPulse",
  description: "Terms and conditions governing access and usage of the TechPulse website.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Terms & Conditions</h1>
        <p className="mt-2 text-xs text-slate-400">Last Revised: September 2026</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">1. Agreement to Terms</h2>
        <p>
          By accessing or using <strong>TechPulse</strong>, you acknowledge and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must refrain from utilizing this platform.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">2. Editorial Integrity & Technical Information</h2>
        <p>
          Articles, research commentaries, and architectural reviews published on TechPulse are created following comprehensive technical research and rigorous industry analysis:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600">
          <li>Information is provided for educational, analytical, and informational purposes.</li>
          <li>Our content does not constitute certified legal, investment, or enterprise cybersecurity advisory.</li>
          <li>Engineers and technology professionals should evaluate architecture decisions based on their specific systems.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">3. Intellectual Property Rights</h2>
        <p>
          The layout, code architecture, styling, and branding of TechPulse are protected under international copyright and open-source licensing standards. Blog content, code snippets, and summaries may be quoted with standard canonical attribution.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">4. Acceptable Use Policy</h2>
        <p>
          You agree not to attempt denial-of-service disruptions, scrape the website with aggressive request rates exceeding standard robots.txt policies, or exploit any automated endpoint.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">5. Limitation of Liability</h2>
        <p>
          In no event shall TechPulse or its contributors be held liable for any damages arising out of the use or inability to use the materials on this website.
        </p>
      </section>
    </div>
  );
}
