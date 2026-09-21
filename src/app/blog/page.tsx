import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: {
    absolute: "All Articles & Research | Com Pors",
  },
  description: "Browse the complete archive of technical analyses, computing benchmarks, and engineering breakdowns published by Com Pors.",
  alternates: {
    canonical: "https://www.compors.com/blog/",
  },
  openGraph: {
    title: "All Articles & Research | Com Pors",
    description: "Browse the complete archive of technical analyses, computing benchmarks, and engineering breakdowns published by Com Pors.",
    url: "https://www.compors.com/blog/",
    type: "website",
    images: [
      {
        url: "https://www.compors.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "All Articles & Research | Com Pors",
      },
    ],
  },
};

export default function BlogListPage() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 6);
  const archivePosts = posts.slice(6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Magazine Editorial Masthead */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
              Dispatch &bull; The Complete Archive
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Com Pors Newsroom &amp; Technical Archive
            </h1>
          </div>
          <p className="max-w-md text-sm text-slate-500 leading-relaxed">
            Investigative reports, system teardowns, and engineering perspectives across modern computing.
          </p>
        </div>

        {/* Editorial Archive & Systems Engineering Index Guide */}
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-600 leading-relaxed space-y-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Systems Engineering Index &amp; Research Repository
          </h2>
          <p>
            Welcome to the Com Pors publishing archive. Every investigation in this repository represents an in-depth breakdown of computing infrastructure, software architecture, hardware engineering, or algorithmic performance. Our staff journalists evaluate real-world engineering constraints rather than recycling superficial product announcements.
          </p>
          <p className="text-xs sm:text-sm text-slate-600">
            Articles in our repository undergo periodic technical re-benchmarking when major kernel versions, compiler toolchains, or hardware microarchitectures enter production. We maintain explicit change logs and code repositories, allowing practitioners to verify our findings against their own server fleets and local workstations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <strong className="block text-slate-900 font-bold mb-1">Systems &amp; Kernel Architecture</strong>
              Low-level memory management, process scheduling, distributed consensus, and Linux kernel execution boundaries.
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <strong className="block text-slate-900 font-bold mb-1">Hardware &amp; Microprocessors</strong>
              Transistor lithography, high-bandwidth memory interfaces, cache latency benchmarks, and multi-die chiplet interconnects.
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <strong className="block text-slate-900 font-bold mb-1">Network &amp; Cyber Defense</strong>
              Zero-trust perimeter enforcement, TLS 1.3 optimization, cryptographic agility, and packet routing diagnostics.
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <strong className="block text-slate-900 font-bold mb-1">Cloud &amp; Distributed Systems</strong>
              Multi-region consensus, CAP theorem trade-offs, object storage compaction, and zero-trust service meshes.
            </div>
          </div>
        </div>
      </div>

      {/* Featured Technical Dispatches */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Recent Technical Dispatches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-blue-400 hover:shadow-xl transition duration-300"
            >
              <div className="h-52 relative overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.coverImageAlt || post.title}
                  width={600}
                  height={350}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 text-xs font-bold uppercase px-2.5 py-1 rounded bg-white/90 text-blue-700 backdrop-blur-md shadow-xs">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                  <Link href={`/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <span className="text-slate-700 font-semibold">{post.author.name}</span>
                  <Link
                    href={`/${post.slug}/`}
                    className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    Full Story &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Comprehensive Historical Engineering Archive Index */}
      {archivePosts.length > 0 && (
        <section className="border-t border-slate-200 pt-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                Complete Historical Repository
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Architectural Reports &amp; Computing Case Studies
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Showing all {posts.length} published technical dispatches
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {archivePosts.map((post) => (
              <article
                key={post.slug}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-bold uppercase text-blue-600 text-[11px]">{post.category}</span>
                    <span>{post.date} &bull; {post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition leading-snug mb-2">
                    <Link href={`/${post.slug}/`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{post.author.name}</span>
                  <Link
                    href={`/${post.slug}/`}
                    className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform"
                  >
                    Read Analysis &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Comprehensive Newsroom Archival Methodology & Research Framework */}
      <section className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 text-slate-700 leading-relaxed">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
            Archival Preservation &amp; Editorial Methodology
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Com Pors Technical Documentation &amp; Peer Review Standards
          </h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            The Com Pors technical archive is curated to serve as a permanent, authoritative record of computing infrastructure evolution. Unlike fast-moving general tech news aggregators that discard historical articles, our editorial board treats every published dispatch as living technical documentation. When operating systems receive major kernel releases or when industry standards (such as TLS, HTTP, or CXL) evolve, our analysts update existing technical teardowns with timestamped revisions.
          </p>
          <p>
            Our investigative methodology requires all empirical claims to be backed by verifiable test datasets. Whether benchmarking memory allocation latencies across NUMA nodes, measuring container cold-start durations across serverless platforms, or assessing post-quantum cryptographic handshake overhead, our authors construct isolated, repeatable testbeds. Hardware specifications, kernel flags, and measurement scripts are documented to enable independent verification by researchers worldwide.
          </p>
          <p>
            Before any technical analysis enters our permanent newsroom repository, it undergoes a two-stage peer-review process. Primary technical claims, mathematical formulas, and algorithmic time complexity proofs are verified by staff engineers. We cross-reference implementation steps with official RFC standards, Linux kernel documentation, and open IEEE proceedings to prevent inaccurate architectural assumptions.
          </p>
          <p>
            Transparency is paramount in systems engineering. If an independent researcher discovers a discrepancy in our published benchmarks or code samples, our newsroom investigates the finding in our laboratory test environment. Confirmed updates and corrections are published directly to the article with explicit timestamped errata notices, preserving full historical transparency for our readership.
          </p>
          <p>
            Editorial independence remains our core foundation. Com Pors does not accept vendor funding, sponsored article placements, or undisclosed promotional agreements. Software tool reviews, cloud platform evaluations, and semiconductor teardowns are authored with zero commercial bias. By maintaining uncompromising technical standards, we ensure our archive provides systems architects, software engineers, and IT leaders with dependable, peer-reviewed engineering intelligence.
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Verifiable Benchmarks</strong>
            <span>All latency and throughput numbers are measured in reproducible laboratory testbeds.</span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Living Documentation</strong>
            <span>Articles are updated with errata notes when industry specifications or protocols change.</span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Zero Sponsored Bias</strong>
            <span>Complete editorial independence across all software reviews and hardware teardowns.</span>
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
            <strong className="text-slate-900 block font-bold">Peer-Reviewed Quality</strong>
            <span>Every submission is vetted by verified system architects before publication.</span>
          </div>
        </div>
      </section>

      {/* Systems Engineering Tracks & Investigation Focus */}
      <section className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 space-y-6 text-slate-700 leading-relaxed shadow-xs">
        <div className="border-b border-slate-200 pb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
            Technical Architecture Repository Structure
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Systems Engineering Tracks &amp; Investigation Focus
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Low-Latency Runtime &amp; Kernel Diagnostics</h3>
            <p>
              Our systems architecture track investigates how operating system kernels schedule threads, manage virtual memory pages, and handle high-throughput network interfaces. From Linux epoll socket multiplexing to eBPF packet filtering and io_uring ring-buffer IO, our articles document production profiling techniques that minimize kernel context switches and eliminate memory allocations in hot paths.
            </p>
            <p>
              We evaluate synchronous and asynchronous programming paradigms under high concurrency. Articles provide concrete metrics on thread contention, lock-free data structures, atomic memory operations, and memory barriers across x86_64 and ARM64 server architectures.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Microprocessor Floorplans &amp; Compute Accelerators</h3>
            <p>
              Our hardware analysis covers silicon manufacturing processes, packaging interconnects, cache coherency protocols, and dedicated compute accelerators. We dissect architectural whitepapers, die shot schematics, and transistor lithography roadmaps to explain how hardware innovations influence software performance.
            </p>
            <p>
              We examine matrix multiplication units, systolic arrays, high-bandwidth memory (HBM3e) buses, and PCIe Gen 5/6 interconnect bandwidth. Our teardowns clarify the trade-offs between precision quantization (FP8, INT4) and numerical accuracy in high-performance computing workloads.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Distributed Consensus &amp; Cloud Reliability</h3>
            <p>
              Building fault-tolerant software requires rigorous understanding of network partitions, state machine replication, and distributed consensus algorithms like Raft and Paxos. Our analyses explore quorum configurations, clock drift mitigation, write-ahead log compaction, and cross-datacenter replication topologies.
            </p>
            <p>
              We benchmark distributed key-value engines, relational database shards, and object storage tiers. Every guide outlines real-world trade-offs between consistency, availability, and partition tolerance, helping engineering leads architect resilient multi-region infrastructure.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Zero-Trust Cryptography &amp; Threat Mitigation</h3>
            <p>
              Security analysis at Com Pors focuses on cryptographic primitives, hardware security modules (HSM), mutual TLS authentication, and memory-safe software transitions. We analyze threat models, side-channel attacks, supply chain dependencies, and formal verification frameworks.
            </p>
            <p>
              Our articles guide security engineers through post-quantum cryptography transition timelines, kernel-level memory isolation mechanisms, and verifiable audit logging architectures.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
