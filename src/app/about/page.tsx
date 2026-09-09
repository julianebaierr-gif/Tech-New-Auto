import { Cpu, Zap, Database, RefreshCw, Shield, Layers } from "lucide-react";

export const metadata = {
  title: "About Us & Automation Architecture | TechPulse",
  description: "Learn how TechPulse operates completely autonomously using Google Sheets, Gemini AI, Unsplash, and GitHub Actions.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold uppercase tracking-wider border border-cyan-800">
          Autonomous Platform
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          About TechPulse Editorial
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
          TechPulse is a fully automated technology intelligence blog engineered to transform live spreadsheet keyword curation into deep, professional, and SEO-optimized technical articles.
        </p>
      </div>

      {/* Pipeline Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60">
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-center">
          <Database className="h-6 w-6 text-emerald-400 mx-auto" />
          <h2 className="text-sm font-bold text-white">1. Google Sheets</h2>
          <p className="text-xs text-neutral-400">Pulls target keywords, categories, and publication queues.</p>
        </div>
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-center">
          <Cpu className="h-6 w-6 text-cyan-400 mx-auto" />
          <h2 className="text-sm font-bold text-white">2. Gemini AI</h2>
          <p className="text-xs text-neutral-400">Deep technical research, structured analysis, and SEO generation.</p>
        </div>
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-center">
          <Layers className="h-6 w-6 text-purple-400 mx-auto" />
          <h2 className="text-sm font-bold text-white">3. Unsplash API</h2>
          <p className="text-xs text-neutral-400">High-resolution, license-cleared tech photography.</p>
        </div>
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-center">
          <RefreshCw className="h-6 w-6 text-indigo-400 mx-auto" />
          <h2 className="text-sm font-bold text-white">4. 4-Hour Cron</h2>
          <p className="text-xs text-neutral-400">GitHub Actions commits and Vercel automatically deploys.</p>
        </div>
      </div>

      {/* Detailed Mission */}
      <div className="space-y-6 text-neutral-300 text-sm sm:text-base leading-relaxed border-t border-neutral-800 pt-10">
        <h2 className="text-2xl font-bold text-white">Our Mission</h2>
        <p>
          In a rapidly evolving digital era where artificial intelligence, quantum computing, cybersecurity, and cloud architectures advance by the hour, conventional journalism struggles to keep pace. TechPulse was engineered to bridge that latency.
        </p>
        <p>
          By pairing deterministic spreadsheet queues with state-of-the-art Large Language Models (Google Gemini), we deliver accurate, insightful, and accessible tech briefings around the clock without manual intervention.
        </p>

        <h2 className="text-2xl font-bold text-white pt-6">Quality Control & Verification</h2>
        <p>
          Every article generated through our automated pipeline complies with strict editorial guardrails:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-400">
          <li>Factual consistency and technical precision in AI & software development topics.</li>
          <li>Proper attribution and open-license image sourcing through official APIs.</li>
          <li>Continuous schema validation to prevent malformed metadata or broken links.</li>
          <li>Strict adherence to international data privacy and terms of use.</li>
        </ul>
      </div>
    </div>
  );
}
