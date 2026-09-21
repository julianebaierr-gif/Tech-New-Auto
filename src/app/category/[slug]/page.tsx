import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";

import { categories as configuredCategories } from "@/lib/categories";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allPosts = getAllPosts();
  const postCategories = allPosts.map(p => p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  const configuredSlugs = configuredCategories.map(c => c.slug);
  // Also include legacy/alias slugs like 'cloud', 'software', 'hardware', 'ai' so old links or shortened URLs never 404
  const aliases = ["cloud", "software", "hardware", "ai", "quantum", "chips"];
  
  const allCategorySlugs = Array.from(new Set([...postCategories, ...configuredSlugs, ...aliases]));
  return allCategorySlugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const cleanSlug = slug.toLowerCase();
  const matched = configuredCategories.find(
    c => c.slug === cleanSlug || cleanSlug.includes(c.slug) || c.slug.includes(cleanSlug)
  );

  const titleName = matched ? matched.name : slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  
  // Custom bespoke meta description strictly under 155 characters
  const description = matched
    ? matched.description
    : `Explore in-depth technical analysis, architecture blueprints, and engineering insights on ${titleName} published by Com Pors.`; // < 145 chars

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.compors.com";
  const catUrl = `${siteUrl}/category/${slug}/`;

  return {
    title: {
      absolute: `${titleName} | Com Pors`,
    },
    description,
    alternates: {
      canonical: catUrl,
    },
    openGraph: {
      title: `${titleName} | Com Pors`,
      description,
      url: catUrl,
      type: "website",
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${titleName} - Com Pors`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleName} | Com Pors`,
      description,
    },
  };
}

const categoryGuides: Record<string, { summary: string; pillars: string[]; standard: string }> = {
  'artificial-intelligence': {
    summary:
      'Artificial intelligence coverage at Com Pors examines the mathematical foundations and production realities of deep learning systems. We analyze parameter optimization, activation dynamics, backpropagation efficiency, and transformer self-attention mechanisms. Beyond theoretical models, our technical dispatches evaluate inference latency on specialized tensor hardware, token caching trade-offs, model quantization methods (including 4-bit and 8-bit quantization), and context window scaling constraints in production software.',
    pillars: [
      'Inference Efficiency: Benchmarking token generation throughput, latency budgets, and GPU memory saturation.',
      'Quantization & Execution: Running quantized open weights on consumer hardware without intelligence loss.',
      'Evaluation & Alignment: Measuring perplexity, burstiness heuristics, hallucination mitigation, and safety filters.'
    ],
    standard:
      'Every artificial intelligence article undergoes empirical verification against published academic literature, reproducible code repositories, and public benchmark evaluations before editorial release.'
  },
  'cloud-computing': {
    summary:
      'Cloud computing reporting at Com Pors focuses on distributed systems architecture, multi-tenant infrastructure, and enterprise scalability. Our editorial desk tracks Kubernetes orchestration patterns, container network interfaces, zero-trust service meshes, and serverless runtime cold-start characteristics. We dissect the trade-offs between managed hyperscaler solutions and bare-metal deployments, providing software architects with actionable criteria for high-availability cloud deployments.',
    pillars: [
      'High-Availability Architecture: Multi-region failover, quorum consensus algorithms, and distributed database replication.',
      'Resource Management: Microservices provisioning, autoscaling policies, and network egress optimizations.',
      'Observability & Diagnostics: Distributed telemetry tracing, structured logging frameworks, and synthetic latency probing.'
    ],
    standard:
      'Our cloud computing coverage adheres to open standards, vendor-neutral evaluation protocols, and enterprise reliability guidelines defined by the Cloud Native Computing Foundation.'
  },
  'cybersecurity': {
    summary:
      'Cybersecurity analysis at Com Pors investigates defensive system design, threat intelligence protocols, and cryptographic resilience. We evaluate zero-trust network architectures, TLS 1.3 implementation details, memory-safe programming paradigms, and endpoint isolation mechanisms. Our research provides systems administrators and security engineers with pragmatic guidance on threat mitigation, runtime application protection, and rapid incident recovery.',
    pillars: [
      'Cryptographic Protocols: Post-quantum encryption schemes, lattice cryptography, and key lifecycle management.',
      'Zero-Trust Enforcement: Identity-aware proxies, least-privilege role design, and microsegmentation strategies.',
      'Threat Mitigation: Polymorphic payload detection, memory injection defenses, and continuous vulnerability audits.'
    ],
    standard:
      'All security advisories and defense blueprints are grounded in standards published by NIST, IETF RFCs, and validated vulnerability research repositories.'
  },
  'software-engineering': {
    summary:
      'Software engineering coverage at Com Pors examines architectural patterns, clean interface boundaries, and high-throughput systems design. We investigate algorithmic efficiency, time and space complexity trade-offs, asynchronous concurrency runtimes, and distributed cache invalidation strategies. Our articles break down complex codebases to provide software developers with reproducible insights for building reliable, production-grade applications.',
    pillars: [
      'Concurrency & Async Runtimes: Event loop mechanics, non-blocking I/O operations, and thread pool scaling.',
      'System Complexity: Big-O evaluation of data structures, sorting algorithms, and graph traversal routines.',
      'API & Interface Design: Resilient contract definitions, backward compatibility guarantees, and schema validation.'
    ],
    standard:
      'Articles feature production-grade code samples, verified dependency specs, and architectural decisions benchmarked under realistic production workloads.'
  },
  'hardware-semiconductors': {
    summary:
      'Hardware and semiconductor reporting at Com Pors analyzes microprocessor architectures, silicon fabrication advancements, and high-bandwidth interconnect technologies. We explore extreme ultraviolet lithography scaling, multi-die chiplet packaging, thermal design envelopes, and memory bus latency across DDR5 and high-bandwidth memory architectures. Our dispatches connect physical silicon constraints with software execution performance.',
    pillars: [
      'Silicon Fabrication: Lithography process nodes, transistor gate geometry, and foundry capacity trends.',
      'Memory Architectures: Memory bus bandwidth, cache hierarchy latency (L1/L2/L3), and NUMA topology impacts.',
      'Accelerated Silicon: Neural processing units, tensor accelerators, and custom ASIC co-processor designs.'
    ],
    standard:
      'Hardware analysis is verified using public die teardowns, official foundry whitepapers, and standardized IEEE microprocessor research publications.'
  },
  'future-tech': {
    summary:
      'Future technology reporting at Com Pors evaluates experimental computing paradigms on the horizon. We track quantum computing advantage milestones, variational quantum eigensolvers, qubit decoherence mitigation, and post-quantum cryptographic standards. Our investigative coverage separates genuine physical breakthroughs from speculative marketing claims, giving technical leaders a clear view of emerging frontiers.',
    pillars: [
      'Quantum Processing: Superconducting qubits, ion-trap systems, and quantum error correction codes.',
      'Alternative Paradigms: Neuromorphic processors, optical computing interconnects, and biological data storage.',
      'Long-Term Viability: Bridge technologies combining classical high-performance computing with early quantum processors.'
    ],
    standard:
      'Future technology reviews are reviewed against peer-reviewed preprints, national laboratory findings, and verified experimental data.'
  },
  'web-development': {
    summary:
      'Web development analysis at Com Pors covers full-stack web architecture, frontend performance engineering, and modern web standards. We evaluate static site generation, server-side rendering pipelines, Core Web Vitals optimization, and edge computing runtimes. Our guides help engineering teams deliver accessible, resilient, and blazing-fast user interfaces across global content delivery networks.',
    pillars: [
      'Performance Engineering: Minimizing Largest Contentful Paint, optimizing Interaction to Next Paint, and layout stability.',
      'Modern Protocols: HTTP/3 multiplexing, TLS session resumption, and edge serverless caching layers.',
      'Component Architecture: Declarative state management, CSS container queries, and WCAG accessibility standards.'
    ],
    standard:
      'All web standards and client-side architecture guides comply with W3C recommendations and modern web browser platform specifications.'
  }
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const allPosts = getAllPosts();
  
  // Find matching posts with intelligent fallback/alias mapping
  const posts = allPosts.filter(p => {
    const pSlug = p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    if (pSlug === slug) return true;
    
    // Check keyword inclusion (e.g. 'cloud' matches 'Cloud Computing', 'software' matches 'Software Engineering')
    const cleanCategory = p.category.toLowerCase();
    const cleanSearch = slug.replace(/-/g, " ").toLowerCase();
    return cleanCategory.includes(cleanSearch) || cleanSearch.includes(cleanCategory);
  });

  const matched = configuredCategories.find(
    c => c.slug === slug.toLowerCase() || slug.toLowerCase().includes(c.slug) || c.slug.includes(slug.toLowerCase())
  );
  const categoryTitle = matched ? matched.name : slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  const categoryDesc = matched
    ? matched.description
    : `Explore in-depth technical analysis, architecture blueprints, and engineering insights on ${categoryTitle} published by Com Pors.`;

  const guide = categoryGuides[slug.toLowerCase()] || {
    summary: `Technical reporting in the ${categoryTitle} track at Com Pors covers core system architecture, performance benchmarks, and production implementation criteria. Our analysts break down emerging engineering paradigms into actionable frameworks for system architects and developers.`,
    pillars: [
      'Core Principles: Foundational system patterns and production requirements.',
      'Engineering Benchmarks: Scalability metrics, latency bounds, and operational efficiency.',
      'Best Practices: Resilient design, security integration, and maintainability.'
    ],
    standard: `All ${categoryTitle} reports undergo rigorous technical review against verified specifications and open-source benchmarks before publication.`
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 mb-2">
          {matched?.emoji && <span className="text-xl">{matched.emoji}</span>}
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{categoryTitle}</h1>
        </div>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">{categoryDesc}</p>
      </div>

      {posts.length === 0 ? (
        <div className="space-y-8">
          <div className="p-8 sm:p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {categoryTitle} Research &amp; Engineering Desk
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Our technical newsroom is actively conducting benchmarks, compiling architectural teardowns, and preparing investigative reporting for the {categoryTitle} track. All dispatches undergo strict peer-review and fact-checking before publication.
            </p>
            <div className="pt-2">
              <Link href="/blog/" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700 transition">
                Browse All Published Research
              </Link>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 text-slate-700 text-sm leading-relaxed">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Editorial Scope &amp; Coverage Criteria
            </h3>
            <p>
              At <strong>Com Pors</strong>, our {categoryTitle} beat focuses on core system fundamentals, open standards, scalable system design, and production engineering tradeoffs. Rather than regurgitating press releases, our analysts evaluate real-world infrastructure metrics, reliability trade-offs, and emerging paradigms shaping modern digital ecosystems.
            </p>
            <p>
              Key inquiry tracks include high-throughput frameworks, continuous deployment pipelines, enterprise reliability engineering, and system governance standards. Readers and software practitioners can explore our broader technology archives, review our verified masthead, or submit research pitches to our editorial board.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="section-line flex items-center justify-between">
            <h2 className="section-tag-box">Featured {categoryTitle} Dispatches</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-lg transition flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.coverImageAlt || post.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold uppercase text-blue-600 mb-2">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-2">
                  <Link href={`/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-800">{post.author.name}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
          </div>

          {/* Domain Architecture Reference Guide Section */}
          <section className="mt-12 p-7 sm:p-9 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-6 text-slate-700 leading-relaxed">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                Technical Architecture Guide
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {categoryTitle} Engineering Scope &amp; Research Foundations
              </h2>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {guide.summary}
            </p>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Core Architectural Pillars &amp; Operational Benchmarks
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {guide.pillars.map((pillar, idx) => {
                  const [title, ...rest] = pillar.split(':');
                  return (
                    <li key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                      <strong className="text-slate-900 font-bold block text-sm">{title}</strong>
                      <span className="leading-relaxed block">{rest.join(':')}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="pt-3 text-xs text-slate-500 border-t border-slate-100 flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
              <span><strong className="text-slate-700 font-semibold">Verification Standard: </strong>{guide.standard}</span>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
