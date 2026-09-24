import Link from "next/link";
import { ShieldCheck, Award, CheckCircle2, FileCode, Cpu, Layers } from "lucide-react";

export const metadata = {
  title: {
    absolute: "Editorial Policy & Systems Testing Standards | Com Pors",
  },
  description: "Our newsroom guidelines: All technical articles are independently researched, benchmarked against real server environments, and reviewed prior to publication.",
  alternates: {
    canonical: "https://www.compors.com/editorial-policy/",
  },
  openGraph: {
    title: "Editorial Policy & Systems Testing Standards | Com Pors",
    description: "Our newsroom guidelines: All technical articles are independently researched, benchmarked against real server environments, and reviewed prior to publication.",
    url: "https://www.compors.com/editorial-policy/",
    type: "website",
    images: [
      {
        url: "https://www.compors.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Com Pors Editorial Policy",
      },
    ],
  },
};

export default function EditorialPolicyPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.compors.com";
  const policyUrl = `${siteUrl}/editorial-policy/`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Editorial Policy & Systems Testing Standards",
    url: policyUrl,
    description: "Editorial guidelines, laboratory testing procedures, and independent reporting standards for Com Pors.",
    publisher: {
      "@type": "Organization",
      name: "Com Pors",
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <header className="border-b border-slate-200 pb-8 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
          Newsroom Governance &amp; Ethics Standards
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Editorial Scope &amp; Engineering Testing Manifesto
        </h1>
        <p className="text-lg text-slate-700 leading-relaxed max-w-3xl">
          All technical articles are independently researched, benchmarked against real server environments, and reviewed prior to publication.
        </p>
      </header>

      <section className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-600" /> 1. Core Editorial Principles
        </h2>
        <p>
          Com Pors publishes technical analyses, architecture teardowns, and engineering guides for software developers, systems architects, and infrastructure teams. We operate with complete editorial autonomy. We maintain a strict separation between research teams and commercial stakeholders.
        </p>
        <p>
          We strictly prohibit sponsored content disguised as objective technical evaluations. Our writers and analysts purchase commercial services or utilize open-source software under standard retail licensing to reproduce the exact experience encountered by practicing engineering professionals.
        </p>
      </section>

      <section className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Cpu className="h-5 w-5 text-blue-600" /> 2. Empirical Laboratory Testing Methodology
        </h2>
        <p>
          Every benchmark, latency measurement, and runtime comparison published on Com Pors is generated on dedicated physical lab servers. We isolate test suites from noisy neighbor virtualized instances to eliminate clock throttling and measurement distortion.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Dedicated Bare-Metal Hardware
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We execute latency and memory benchmarks on standardized bare-metal hardware running minimal Linux installations to prevent hypervisor scheduling jitter.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Open Test Scripts &amp; Repositories
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Test scripts, compiler flags, and configuration manifests are documented in full so software engineers can reproduce published findings on their own machines.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <FileCode className="h-5 w-5 text-blue-600" /> 3. Code Verification &amp; Technical Fact-Checking
        </h2>
        <p>
          All published shell commands, configuration snippets, and application code undergo verification prior to release. Our technical review desk verifies that code adheres to current compiler standards, language specifications, and memory safety best practices.
        </p>
        <p>
          If a code example introduces potential security implications or memory leakage vectors, our authors explicitly document boundary limits and remediation techniques.
        </p>
      </section>

      <section className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Layers className="h-5 w-5 text-blue-600" /> 4. Conflict of Interest &amp; Disclosure Policy
        </h2>
        <p>
          Our staff analysts must declare any relevant commercial consulting contracts or investments prior to covering particular software platforms or hardware vendors. We prohibit authors from authoring reviews on companies in which they possess personal equity holdings.
        </p>
        <p>
          Every technical piece undergoes peer review by a separate senior editor before publication. If a vendor supplies hardware for lab benchmarking, we disclose that arrangement prominently at the top of the report. We do not guarantee positive reviews or favorable benchmarks under any circumstance.
        </p>
      </section>

      <section className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-blue-600" /> 5. Error Correction &amp; Revision Transparency
        </h2>
        <p>
          Accuracy is the foundation of trustworthy technical journalism. When errors of fact, flawed command syntax, or outdated performance metrics are identified in published articles, we issue clear corrections promptly.
        </p>
        <p>
          Minor typographical fixes are made directly to the source text. Substantive corrections to benchmark data, code examples, or architectural recommendations are accompanied by an explicit revision notice at the base of the article, specifying the exact nature of the change and the timestamp of update.
        </p>
      </section>

      <section className="space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Award className="h-5 w-5 text-blue-600" /> 6. Original Research Standards &amp; Anti-Spam Commitment
        </h2>
        <p>
          Com Pors stands strictly against mass-generated, automated summary content that adds no original value. In accordance with the latest search quality and helpful content guidelines, our technical reports must provide first-hand verification, original code implementations, and reproducible telemetry.
        </p>
        <p>
          We do not publish regurgitated press releases or superficial tool roundups. Every technical analysis represents genuine engineering investigation designed to solve concrete problems for systems architects and software developers.
        </p>
        <p>
          Learn more about our verified authors on our <Link href="/authors/" className="text-blue-600 font-semibold hover:underline">Editorial Masthead &amp; Authors Directory</Link>, or consult our <Link href="/about/" className="text-blue-600 font-semibold hover:underline">About Com Pors</Link> page. Readers can report technical corrections or submit benchmark replication telemetry directly to our newsroom through our <Link href="/contact/" className="text-blue-600 font-semibold hover:underline">Contact Desk</Link>.
        </p>
      </section>
    </article>
  );
}
