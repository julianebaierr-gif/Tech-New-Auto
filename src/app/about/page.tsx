import { Cpu, Zap, Database, RefreshCw, Shield, Layers } from "lucide-react";

export const metadata = {
  title: "About Us & Automation Architecture | TechPulse",
  description: "Learn how TechPulse operates completely autonomously using Google Sheets, Gemini AI, Unsplash, and GitHub Actions.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-200">
          Independent Tech Journal
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          About TechPulse Editorial
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          TechPulse is a modern technology intelligence publication delivering deep technical reports, computing breakdowns, and software architectural analysis.
        </p>
      </div>

      {/* Pipeline Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-center">
          <Database className="h-6 w-6 text-blue-600 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">Curated Topics</h2>
          <p className="text-xs text-slate-600">Continuous monitoring of computing trends and hardware developments.</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-center">
          <Cpu className="h-6 w-6 text-indigo-600 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">Deep Analysis</h2>
          <p className="text-xs text-slate-600">Technical precision covering AI architectures and distributed systems.</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-center">
          <Layers className="h-6 w-6 text-cyan-600 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">Visual Standards</h2>
          <p className="text-xs text-slate-600">Verified high-resolution imagery and clear diagramming.</p>
        </div>
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-center">
          <RefreshCw className="h-6 w-6 text-emerald-600 mx-auto" />
          <h2 className="text-sm font-bold text-slate-900">Real-Time Dispatch</h2>
          <p className="text-xs text-slate-600">Regular publications around the clock across 9 tech departments.</p>
        </div>
      </div>

      {/* Detailed Mission */}
      <div className="space-y-6 text-slate-700 text-sm sm:text-base leading-relaxed border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
        <p>
          In an era where artificial intelligence, quantum computing, cloud infrastructure, and semiconductors advance at breakneck speeds, readers require clear, concise, and technically grounded journalism.
        </p>
        <p>
          TechPulse bridges this gap by delivering rigorous, easy-to-digest analyses of emerging technical breakthroughs.
        </p>
      </div>
    </div>
  );
}
