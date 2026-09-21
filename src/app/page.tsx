import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.compors.com/",
  },
  openGraph: {
    url: "https://www.compors.com/",
    title: "Com Pors | Tech Intelligence & Systems",
    description: "Independent tech journalism reporting on emerging AI models, software architecture, semiconductors, cybersecurity, and future computing.",
    type: "website",
    images: [
      {
        url: "https://www.compors.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Com Pors - Tech Intelligence & Systems",
      },
    ],
  },
};

export default function HomePage() {
  const posts = getAllPosts();
  const leadPost = posts[0];
  const sideArticles = posts.slice(1, 7);

  // Group by category for magazine sections
  const aiPosts = posts.filter(p => p.category.toLowerCase().includes("ai") || p.category.toLowerCase().includes("artificial") || p.category.toLowerCase().includes("agent")).slice(0, 3);
  const webPosts = posts.filter(p => p.category.toLowerCase().includes("web") || p.category.toLowerCase().includes("software")).slice(0, 3);
  const hardwarePosts = posts.filter(p => p.category.toLowerCase().includes("hardware") || p.category.toLowerCase().includes("quantum") || p.category.toLowerCase().includes("semiconductor")).slice(0, 3);
  const generalPosts = posts.slice(4, 10);

  return (
    <div className="space-y-12">

      {/* 1. LATEST STORIES (Pattern A: Big Lead Feature + Side Stories) */}
      <section>
        <div className="section-line flex items-center justify-between">
          <h1 className="section-tag-box">Latest Stories &amp; Tech Intelligence</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Big Lead Article */}
          {leadPost && (
            <article className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 flex flex-col group">
              <div className="h-72 sm:h-96 relative overflow-hidden bg-slate-100 aspect-16/9">
                <img
                  src={leadPost.coverImage}
                  alt={leadPost.coverImageAlt || leadPost.title}
                  width={800}
                  height={450}
                  // @ts-ignore
                  fetchPriority="high"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                  {leadPost.category} &bull; Editorial Lead Feature
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition leading-snug mb-3">
                  <Link href={`/${leadPost.slug}/`}>{leadPost.title}</Link>
                </h2>
                {(() => {
                  const content = leadPost.content || "";
                  const pMatch = content.match(/<p>([\s\S]*?)<\/p>/);
                  const rawText = pMatch
                    ? pMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
                    : content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
                  const sentences = rawText.split(/\.\s+/);
                  let leadSnippet = "";
                  if (sentences.length >= 2) {
                    leadSnippet = `${sentences[0]}. ${sentences[1].replace(/\.+$/, "")}.`;
                  } else if (sentences.length === 1 && sentences[0]) {
                    leadSnippet = `${sentences[0].replace(/\.+$/, "")}.`;
                  } else {
                    leadSnippet = leadPost.excerpt;
                  }

                  return (
                    <div className="space-y-3 mb-6">
                      <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
                        {leadPost.excerpt}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed border-l-2 border-blue-500 pl-3">
                        {leadSnippet}
                      </p>
                    </div>
                  );
                })()}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-600">
                  <span>By <strong className="text-slate-900 font-semibold">{leadPost.author.name}</strong></span>
                  <span className="font-medium text-slate-600">{leadPost.date}</span>
                </div>
              </div>
            </article>
          )}

          {/* Mini Side List */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {sideArticles.map((post) => (
              <article
                key={post.slug}
                className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex items-center gap-4 group"
              >
                <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage}
                    alt={post.coverImageAlt || post.title}
                    width={96}
                    height={80}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase text-blue-600 block mb-1">
                    {post.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-1">
                    <Link href={`/${post.slug}/`}>{post.title}</Link>
                  </h3>
                  <span className="text-[11px] font-medium text-slate-600">{post.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ARTIFICIAL INTELLIGENCE & AGENTS */}
      <section>
        <div className="section-line flex items-center justify-between">
          <span className="section-tag-box">Artificial Intelligence &amp; Computing</span>
          <Link href="/category/artificial-intelligence/" className="text-xs font-bold text-blue-600 hover:underline">
            View All AI Dispatches &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {(() => {
            const list = aiPosts.length > 0 ? aiPosts : generalPosts.slice(0, 3);
            const featured = list[0];
            const secondary = list.slice(1);
            return (
              <>
                {featured && (
                  <article className="md:col-span-6 bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-lg transition flex flex-col group">
                    <div className="h-52 relative overflow-hidden bg-slate-100">
                      <img
                        src={featured.coverImage}
                        alt={featured.coverImageAlt || featured.title}
                        width={600}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-3 left-3 text-[11px] font-bold uppercase px-2.5 py-1 rounded bg-white/95 text-blue-700 shadow-xs">
                        {featured.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-2">
                        <Link href={`/${featured.slug}/`}>{featured.title}</Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                        {featured.excerpt}
                      </p>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>{featured.author.name}</span>
                        <span>{featured.date}</span>
                      </div>
                    </div>
                  </article>
                )}
                <div className="md:col-span-6 flex flex-col gap-4 justify-between">
                  {secondary.map((post) => (
                    <article
                      key={post.slug}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between flex-1 group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span className="font-bold uppercase text-blue-600 text-[11px]">{post.category}</span>
                          <span>{post.date}</span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition leading-snug mb-2">
                          <Link href={`/${post.slug}/`}>{post.title}</Link>
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-2">
                        <span>{post.author.name}</span>
                        <Link href={`/${post.slug}/`} className="text-blue-600 font-bold hover:underline">
                          Read &rarr;
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* 3. SOFTWARE ARCHITECTURE & CLOUD */}
      <section>
        <div className="section-line flex items-center justify-between">
          <span className="section-tag-box">Software Engineering &amp; Distributed Systems</span>
          <Link href="/category/software-engineering/" className="text-xs font-bold text-blue-600 hover:underline">
            View All Software Guides &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {(() => {
            const list = webPosts.length > 0 ? webPosts : generalPosts.slice(3, 6);
            const featured = list[0];
            const secondary = list.slice(1);
            return (
              <>
                {featured && (
                  <article className="md:col-span-6 bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-lg transition flex flex-col group">
                    <div className="h-52 relative overflow-hidden bg-slate-100">
                      <img
                        src={featured.coverImage}
                        alt={featured.coverImageAlt || featured.title}
                        width={600}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-3 left-3 text-[11px] font-bold uppercase px-2.5 py-1 rounded bg-white/95 text-blue-700 shadow-xs">
                        {featured.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-2">
                        <Link href={`/${featured.slug}/`}>{featured.title}</Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                        {featured.excerpt}
                      </p>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>{featured.author.name}</span>
                        <span>{featured.date}</span>
                      </div>
                    </div>
                  </article>
                )}
                <div className="md:col-span-6 flex flex-col gap-4 justify-between">
                  {secondary.map((post) => (
                    <article
                      key={post.slug}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between flex-1 group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span className="font-bold uppercase text-blue-600 text-[11px]">{post.category}</span>
                          <span>{post.date}</span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition leading-snug mb-2">
                          <Link href={`/${post.slug}/`}>{post.title}</Link>
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-2">
                        <span>{post.author.name}</span>
                        <Link href={`/${post.slug}/`} className="text-blue-600 font-bold hover:underline">
                          Read &rarr;
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* 4. HARDWARE, CHIPS & QUANTUM */}
      <section>
        <div className="section-line flex items-center justify-between">
          <span className="section-tag-box">Hardware, Semiconductors &amp; Silicon</span>
          <Link href="/category/hardware-semiconductors/" className="text-xs font-bold text-blue-600 hover:underline">
            View All Hardware Reports &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {(() => {
            const list = hardwarePosts.length > 0 ? hardwarePosts : generalPosts.slice(0, 3);
            const featured = list[0];
            const secondary = list.slice(1);
            return (
              <>
                {featured && (
                  <article className="md:col-span-6 bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-lg transition flex flex-col group">
                    <div className="h-52 relative overflow-hidden bg-slate-100">
                      <img
                        src={featured.coverImage}
                        alt={featured.coverImageAlt || featured.title}
                        width={600}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-3 left-3 text-[11px] font-bold uppercase px-2.5 py-1 rounded bg-white/95 text-blue-700 shadow-xs">
                        {featured.category}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-2">
                        <Link href={`/${featured.slug}/`}>{featured.title}</Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                        {featured.excerpt}
                      </p>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>{featured.author.name}</span>
                        <span>{featured.date}</span>
                      </div>
                    </div>
                  </article>
                )}
                <div className="md:col-span-6 flex flex-col gap-4 justify-between">
                  {secondary.map((post) => (
                    <article
                      key={post.slug}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between flex-1 group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span className="font-bold uppercase text-blue-600 text-[11px]">{post.category}</span>
                          <span>{post.date}</span>
                        </div>
                        <h4 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition leading-snug mb-2">
                          <Link href={`/${post.slug}/`}>{post.title}</Link>
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 mt-2">
                        <span>{post.author.name}</span>
                        <Link href={`/${post.slug}/`} className="text-blue-600 font-bold hover:underline">
                          Read &rarr;
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* 5. EDITORIAL STANDARDS & SYSTEMS INTELLIGENCE OVERVIEW */}
      <section className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="border-b border-slate-200 pb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-2">
            Engineering Publishing Manifesto &bull; Com Pors Technical Desk
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Systems Architecture, Microprocessors, and Infrastructure Intelligence
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Com Pors operates as an independent technical publication tracking foundational shifts across digital infrastructure, computing hardware, and software protocols. Our newsroom rejects superficial marketing summaries in favor of reproducible benchmarks and production-ready system teardowns.
          </p>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 max-w-3xl leading-relaxed">
            Our engineering coverage is designed to provide senior software architects, DevOps practitioners, and systems engineers with enduring technical ground truth. By dissecting memory layout alignment, non-blocking asynchronous socket architectures, post-quantum cryptographic primitives, and high-concurrency database transaction pipelines, Com Pors bridges the gap between academic research and production infrastructure realities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-600 leading-relaxed">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              Empirical Hardware &amp; Silicon Benchmarking
            </h3>
            <p>
              Microprocessor performance cannot be understood through manufacturer press releases alone. Our hardware desk analyzes transistor density, thermal design power envelopes, cache hierarchy latencies, and bus throughput across x86, ARM, and RISC-V architectures. We track foundry process nodes from extreme ultraviolet lithography through advanced multi-die packaging to give engineers objective performance visibility.
            </p>
            <p className="text-xs text-slate-500">
              Laboratory evaluations measure instructions per cycle, memory controller contention, and PCIe bus saturation under sustained heavy compute workloads.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-indigo-600" />
              Distributed Systems &amp; Cloud Reliability
            </h3>
            <p>
              Operating resilient multi-tenant services requires rigorous architectural discipline. Our distributed systems reporting investigates packet serialization overhead, network partition handling, consensus mechanisms, and zero-trust service mesh configurations. We evaluate data center power efficiency, storage tiering protocols, and edge compute execution models to identify real engineering bottlenecks.
            </p>
            <p className="text-xs text-slate-500">
              Coverage tracks cloud-native orchestration frameworks, container runtime isolation, and distributed database replication topologies.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600" />
              Defensive Cybersecurity &amp; Network Protocols
            </h3>
            <p>
              Information security requires verifiable engineering boundaries rather than superficial compliance checkboxes. Our analysts break down TLS cipher suites, memory-safe runtime execution, endpoint isolation techniques, and cryptographic key management lifecycle practices. Each security breakdown is verified against published RFCs, NIST guidelines, and open CVE disclosures.
            </p>
            <p className="text-xs text-slate-500">
              We inspect packet capture dumps, firewall rule trees, and cryptographic signature algorithms to evaluate production defensive postures.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-500">
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <strong className="block text-slate-800 font-bold mb-1">Peer-Reviewed Analysis</strong>
            Every report is cross-checked by experienced systems engineers before publication.
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <strong className="block text-slate-800 font-bold mb-1">Zero Vendor Influence</strong>
            We do not accept sponsored reviews, paid placements, or unverified claims.
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <strong className="block text-slate-800 font-bold mb-1">Reproducible Metrics</strong>
            Benchmark methodologies and testing scripts are documented for transparent review.
          </div>
          <div className="p-4 rounded-xl bg-white border border-slate-200">
            <strong className="block text-slate-800 font-bold mb-1">Evergreen Value</strong>
            Our teardowns focus on core computing fundamentals that outlast temporary hype cycles.
          </div>
        </div>

        {/* 6 Core Architectural Computing Pillars */}
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
              Technical Research Index &amp; Focus Domains
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Foundational Research Tracks at Com Pors
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">1. Microarchitectures &amp; Silicon Topologies</h4>
              <p>
                Transistor density scaling, backside power delivery networks, gate-all-around (GAA) nanosheets, and advanced multi-die packaging. We evaluate how physical layout constraints impact register file latencies, instruction dispatch width, and cache hierarchy bandwidth under intense computational workloads.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">2. High-Bandwidth Interconnects &amp; Fabrics</h4>
              <p>
                Compute Express Link (CXL) memory pooling, PCIe 5.0 and 6.0 physical layer signaling, non-blocking leaf-spine network top-of-rack architectures, and optical chiplet interconnects. We measure fabric transit latency and packet loss resilience in multi-accelerator training clusters.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">3. Kernel Scheduling &amp; Asynchronous Concurrency</h4>
              <p>
                Operating system task scheduling, NUMA-aware memory allocation, eBPF telemetry hooks, and non-blocking asynchronous event loops. Understanding how kernel context-switch frequency and thread-pool saturation dictate application latency at the 99th percentile.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">4. Distributed Consensus &amp; Table Formats</h4>
              <p>
                Raft and Paxos state machine replication, quorum stability, Apache Iceberg and Delta Lake storage engine compaction, and distributed transaction atomicity. Balancing the CAP theorem trade-offs between consistency and partition tolerance across geo-distributed nodes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">5. Cryptographic Agility &amp; Zero-Trust</h4>
              <p>
                Post-quantum lattice cryptography, hardware-enforced trusted execution environments (TEEs), mutual TLS handshakes, and microsegmented ephemeral network perimeters. Transitioning enterprise infrastructure from legacy perimeter defense to continuous cryptographic verification.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">6. Machine Learning Inference &amp; Quantization</h4>
              <p>
                KV-cache memory saturation, FlashAttention runtime kernels, INT4 and INT8 post-training quantization, and continuous batching schedulers. Benchmarking effective token throughput per watt across server-grade and consumer workstation silicon.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">7. Observability, Telemetry &amp; Kernel eBPF</h4>
              <p>
                OpenTelemetry distributed trace propagation, structured log aggregation, synthetic latency probing, and non-invasive eBPF tracing probes. Monitoring runtime system health, page-fault spikes, and thread-pool execution delays under high concurrency.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">8. Edge Computing &amp; High-Throughput Network Transport</h4>
              <p>
                HTTP/3 multiplexing over QUIC, TLS 1.3 0-RTT session resumption, edge serverless compute runtimes, and intelligent caching hierarchies. Slashing round-trip latency and mitigating packet retransmission stalls over congested global network backbones.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">9. Microservice Resilience &amp; Fault Domain Isolation</h4>
              <p>
                Circuit breaker pattern implementations, adaptive rate limiting, exponential backoff with jitter, and bulkhead isolation architectures. Mitigating cascading outages across multi-tiered microservices and distributed database backends.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">10. Memory-Safe Systems &amp; Low-Level Runtimes</h4>
              <p>
                Rust kernel modules, memory safety verification, borrow checker guarantees, and zero-overhead abstractions. Evaluating the gradual migration of critical systems infrastructure away from legacy C/C++ codebases without throughput penalties.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              All published articles, benchmark datasets, and architectural diagrams are licensed under independent journalistic principles for the global computing community.
            </p>
            <Link href="/blog/" className="font-bold text-blue-600 hover:text-blue-700 whitespace-nowrap">
              Explore Complete Newsroom Archive &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
