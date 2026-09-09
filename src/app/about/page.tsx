import { Cpu, Zap, Database, RefreshCw, Shield, Layers, CheckCircle2, Award, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Our Journal & Editorial Standards | TechPulse",
  description: "Meet the TechPulse editorial team, our rigorous fact-checking policies, E-E-A-T technical journalism standards, and our mission investigating modern computing frontiers.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-200">
          Independent Tech Journal &amp; Laboratory
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About TechPulse Editorial
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          TechPulse is an independent technology publication dedicated to deep technical reports, distributed systems breakdowns, software architecture guides, and artificial intelligence evaluations.
        </p>
      </div>

      {/* Editorial Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-6 rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-center">
          <Database className="h-6 w-6 text-blue-600 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">Empirical Research</h2>
          <p className="text-xs text-slate-600">Investigating raw engineering benchmarks, kernel specs, and verified open-source pull requests.</p>
        </div>
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-center">
          <Cpu className="h-6 w-6 text-indigo-600 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">Technical Rigor</h2>
          <p className="text-xs text-slate-600">Strict architectural analysis with code snippets vetted against modern industry patterns.</p>
        </div>
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-center">
          <Award className="h-6 w-6 text-amber-600 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">E-E-A-T Grounded</h2>
          <p className="text-xs text-slate-600">Authored exclusively by experienced systems engineers and computing domain analysts.</p>
        </div>
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-center">
          <RefreshCw className="h-6 w-6 text-emerald-600 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">Continuous Sync</h2>
          <p className="text-xs text-slate-600">Daily autonomous updates tracking enterprise technology, cloud platforms, and security disclosures.</p>
        </div>
      </div>

      {/* Detailed Mission and Story */}
      <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-slate-200 pt-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Our Mission &amp; Purpose</h2>
        <p>
          In an era dominated by superficial headlines and ungrounded marketing hype, software engineers, DevOps leads, system architects, and technical decision-makers need clear, verified, and deeply practical analysis. TechPulse was established to bridge that divide.
        </p>
        <p>
          Our technical journalists do not simply summarize press releases. We examine GitHub commits, benchmark hardware throughput, evaluate cloud latency numbers, and construct reproducible architectural topologies. Every guide published on TechPulse is engineered to be an evergreen reference for engineers building distributed systems.
        </p>
      </div>

      {/* Fact-Checking & Editorial Policy (Crucial for Google Trust / E-E-A-T) */}
      <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">Journalistic Integrity</span>
          <h2 className="text-2xl font-bold text-slate-900">Editorial &amp; Fact-Checking Standards</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Primary Source Verification
            </div>
            <p>
              We source directly from official documentation, academic papers (arXiv, IEEE), and vendor source code before publishing claims.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Independent Reviews
            </div>
            <p>
              We maintain full editorial independence. We do not accept sponsored link placements, pay-to-play reviews, or undisclosed advertorials.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Corrections Policy
            </div>
            <p>
              When technical inaccuracies or version breaks occur, we issue immediate transparent updates with changelog annotations.
            </p>
          </div>
        </div>
      </div>

      {/* Editorial Team Profiles */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">Editorial Masthead</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Lead Editors &amp; Contributing Architects</h2>
            <p className="text-sm text-slate-500 mt-1">Our technical analyses are guided by verified industry specialists.</p>
          </div>
          <Link
            href="/authors"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 underline shrink-0"
          >
            View Complete Author Directory &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-5">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80"
              alt="Cora Lee"
              className="h-20 w-20 rounded-2xl object-cover shrink-0 border border-slate-200"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-lg">Cora Lee</h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Lead Editor
                </span>
              </div>
              <p className="text-xs font-semibold text-blue-600">Lead Systems Architect &amp; Cloud Infrastructure Editor</p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Former kernel engineer and distributed systems researcher writing on microarchitectures, zero-trust cloud infrastructure, and enterprise automation.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-5">
            <img
              src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80"
              alt="Kellie Anne"
              className="h-20 w-20 rounded-2xl object-cover shrink-0 border border-slate-200"
            />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-lg">Kellie Anne</h3>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Principal Analyst
                </span>
              </div>
              <p className="text-xs font-semibold text-blue-600">Principal AI &amp; Silicon Research Analyst</p>
              <p className="text-xs text-slate-600 leading-relaxed pt-1">
                Hardware benchmark specialist and AI infrastructure journalist tracking frontier LLM architectures, neuromorphic chips, and quantum engineering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
