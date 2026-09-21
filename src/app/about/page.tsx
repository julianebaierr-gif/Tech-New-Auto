import { Cpu, Zap, Database, RefreshCw, Shield, Layers, CheckCircle2, Award, FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: {
    absolute: "About Our Journal & Editorial Standards | Com Pors",
  },
  description: "Meet the Com Pors editorial team, our rigorous fact-checking policies, and our mission investigating modern computing and artificial intelligence.",
  alternates: {
    canonical: "https://www.compors.com/about/",
  },
  openGraph: {
    title: "About Our Journal & Editorial Standards | Com Pors",
    description: "Meet the Com Pors editorial team, our rigorous fact-checking policies, and our mission investigating modern computing and artificial intelligence.",
    url: "https://www.compors.com/about/",
    type: "website",
    images: [
      {
        url: "https://www.compors.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About Com Pors",
      },
    ],
  },
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
          About Com Pors Editorial
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Com Pors is an independent technology publication dedicated to deep technical reports, distributed systems breakdowns, software architecture guides, and artificial intelligence evaluations.
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
          In an era dominated by superficial headlines and ungrounded marketing hype, software engineers, DevOps leads, system architects, and technical decision-makers need clear, verified, and deeply practical analysis. Com Pors was established to bridge that divide.
        </p>
        <p>
          Our technical journalists do not simply summarize press releases. We examine GitHub commits, benchmark hardware throughput, evaluate cloud latency numbers, and construct reproducible architectural topologies. Every guide published on Com Pors is engineered to be an evergreen reference for engineers building distributed systems.
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
            href="/authors/"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 underline shrink-0"
          >
            View Complete Author Directory &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-xs flex items-start gap-5">
            <img
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&h=400&q=80"
              alt="Cora Lee"
              className="h-20 w-20 min-w-[5rem] aspect-square rounded-2xl object-cover shrink-0 border border-slate-200 shadow-xs"
            />
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
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
              src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&h=400&q=80"
              alt="Kellie Anne"
              className="h-20 w-20 min-w-[5rem] aspect-square rounded-2xl object-cover shrink-0 border border-slate-200 shadow-xs"
            />
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
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

      {/* Technical Review Methodology & Research Ethics */}
      <div className="space-y-6 border-t border-slate-200 pt-10 text-slate-700 text-sm leading-relaxed">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Benchmarking Methodologies &amp; Research Protocol
        </h2>
        <p>
          Technical accuracy requires structured testing environments and reproducible procedures. When our team conducts hardware evaluations or software architecture comparisons, we execute benchmarks on isolated bare-metal testbenches and standardized cloud instances. We document operating system versions, kernel build parameters, compiler optimization flags, and background process states to eliminate measurement noise.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Network &amp; Latency Auditing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Packet latency and bandwidth evaluations utilize synchronized hardware timestamping, round-trip packet inspection, and packet loss rate measurements under controlled synthetic traffic saturation. We isolate internal routing layers to provide realistic connection numbers rather than optimistic ping responses.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-base">Algorithmic &amp; Runtime Verification</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Algorithm performance profiles measure execution time, memory allocation patterns, garbage collection pauses, and cache hit ratios under varied data scale workloads. All code implementations are tested across clean runtime containers to verify reproducibility.
            </p>
          </div>
        </div>

        {/* Laboratory Instrumentation & Hardware Rigor */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 mt-8">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xl font-bold text-slate-900">
              Laboratory Instrumentation &amp; Measurement Standards
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              The physical infrastructure, telemetry tools, and analytical pipelines powering Com Pors investigations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Telemetry Stack &amp; Kernel Profiling</h4>
              <p>
                Our laboratory test rigs run mainline Linux kernels instrumented with extended Berkeley Packet Filter (eBPF) probes, perf profilers, and hardware performance counters. This enables non-invasive tracing of CPU instruction retiring rates, cache misses across L1, L2, and Last-Level Cache (LLC), and context switch frequency under load.
              </p>
              <p>
                When testing container orchestration engines or microservice meshes, our analysts employ distributed OpenTelemetry tracing collectors configured to measure tail latencies at the 99th and 99.9th percentiles, ensuring transient latency spikes are fully captured.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Hardware Verification Rig</h4>
              <p>
                Silicon and memory architecture investigations utilize dedicated workstations featuring dual-channel and quad-channel DDR5 platforms, PCIe 5.0 interconnect analyzers, and thermal monitoring thermocouple arrays. We log sustained socket power dissipation and VRM thermal stability to evaluate whether advertised turbo frequencies can be sustained indefinitely.
              </p>
              <p>
                By publishing raw telemetry datasets alongside our written analyses, we provide systems architects and software developers with verifiable ground truth that withstands rigorous peer examination.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 block font-bold">SPJ Code of Ethics</strong>
              <p>Our newsroom adheres strictly to the Society of Professional Journalists Code of Ethics for accuracy and independence.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 block font-bold">ACM Software Guidelines</strong>
              <p>Technical evaluations follow the Association for Computing Machinery standards for reproducible experimental computer science.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
              <strong className="text-slate-900 block font-bold">Open Errata Registry</strong>
              <p>All corrections are timestamped and preserved in our permanent editorial log for journalistic accountability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
