import { notFound } from "next/navigation";
import Link from "next/link";
import { getAuthorBySlug, getAuthors, getPostsByAuthor } from "@/lib/posts";
import { ArrowLeft, BookOpen, Calendar, Clock, Tag } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = getAuthors();
  return authors.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found" };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.compors.com";
  const authorUrl = `${siteUrl}/author/${author.slug}/`;

  return {
    title: {
      absolute: `${author.name} | Com Pors Analyst`,
    },
    description: author.bio,
    alternates: {
      canonical: authorUrl,
    },
    openGraph: {
      type: "profile",
      url: authorUrl,
      title: `${author.name} | Staff Journalist & Analyst | Com Pors`,
      description: author.bio,
      images: [
        {
          url: author.avatar,
          width: 400,
          height: 400,
          alt: `${author.name} - ${author.role}`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${author.name} | Staff Journalist & Analyst`,
      description: author.bio,
      images: [author.avatar],
    },
  };
}

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = getPostsByAuthor(author.name);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.compors.com";
  const authorUrl = `${siteUrl}/author/${author.slug}/`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    image: author.avatar,
    url: authorUrl,
    worksFor: {
      "@type": "NewsMediaOrganization",
      name: "Com Pors",
      url: siteUrl,
    },
    sameAs: [author.twitter, author.github].filter(Boolean),
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Link
        href="/authors/"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
      >
        <ArrowLeft className="h-4 w-4" /> Back to All Authors
      </Link>

      {/* Author Bio Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-8">
        <img
          src={author.avatar}
          alt={author.name}
          width={128}
          height={128}
          className="h-28 w-28 sm:h-32 sm:w-32 min-w-[7rem] sm:min-w-[8rem] aspect-square rounded-2xl object-cover shrink-0 border-2 border-slate-200 shadow-md"
        />
        <div className="space-y-3 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {author.name}
            </h1>
            <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Editorial Staff
            </span>
          </div>

            <p className="text-sm sm:text-base font-semibold text-blue-600">
              {author.role}
            </p>

            <div className="space-y-3 text-sm text-slate-600 leading-relaxed max-w-3xl">
              <p>{author.bio}</p>
              {author.slug === "cora-lee" ? (
                <>
                  <p>
                    As lead systems architect, Cora Lee directs technical investigations into distributed state machines, container network interfaces, zero-trust cryptographic boundaries, and Linux kernel scheduler tuning. She constructs isolated bare-metal testbenches to evaluate network packet transport, socket buffer saturation, and memory-safe systems software under sustained multi-gigabit traffic loads.
                  </p>
                  <p>
                    Her analytical methodology emphasizes reproducible RFC conformance, tail-latency mitigation at the 99.9th percentile, and fault-injection drills. Cora verifies all system architecture blueprints against open-source implementations to ensure readers receive battle-tested production guidance.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    As principal silicon and AI analyst, Kellie Anne leads our laboratory evaluations of microprocessor die floorplans, tensor accelerator architectures, and large language model quantization runtimes. She designs reproducible benchmarking pipelines measuring KV-cache memory pressure, instruction dispatch latencies, and sustained socket thermal dissipation envelopes.
                  </p>
                  <p>
                    Her research combines microarchitecture die teardowns with empirical token throughput metrics. Kellie works closely with academic preprints and open hardware consortia to provide software developers with practical guidelines for optimizing tensor execution pipelines.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <BookOpen className="h-4 w-4 text-blue-600" /> {posts.length} Verified Technical Dispatches
              </span>
              <span>&bull;</span>
              <span className="text-slate-600 font-medium">Peer-Reviewed Editorial Masthead</span>
              <span>&bull;</span>
              <span className="text-slate-600 font-medium">Independent Empirical Research</span>
            </div>
          </div>
        </div>

      {/* Author Articles Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-lg font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
            Articles by {author.name}
          </h2>
          <span className="text-xs font-semibold text-slate-500">
            Showing {posts.length} stories
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-500 mb-6">Upcoming technical coverage will appear here.</p>
            <Link href="/" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700">
              Return to Homepage
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.slice(0, 3).map((post) => (
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
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded shadow-xs">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-2">
                      <Link href={`/${post.slug}/`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-600">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {posts.length > 3 && (
              <div className="border-t border-slate-200 pt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                    Complete Technical Research Archive by {author.name}
                  </h3>
                  <span className="text-xs text-slate-500 font-semibold">
                    {posts.length - 3} additional reports
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {posts.slice(3).map((post) => (
                    <article
                      key={post.slug}
                      className="p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                          <span className="font-bold uppercase text-blue-600 text-[11px]">{post.category}</span>
                          <span>{post.date} &bull; {post.readTime}</span>
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition leading-snug mb-1.5">
                          <Link href={`/${post.slug}/`}>{post.title}</Link>
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-end text-xs">
                        <Link href={`/${post.slug}/`} className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform">
                          Read Report &rarr;
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Author Editorial Standards & Verification Process */}
        <section className="mt-12 p-8 sm:p-10 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-6 text-slate-700 leading-relaxed">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
              Editorial Methodology &amp; E-E-A-T Accountability
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Reporting Standards, Benchmarking &amp; Technical Verification by {author.name}
            </h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            As a lead technical analyst at Com Pors, {author.name} conducts empirical investigations into software architectures, distributed computing frameworks, and semiconductor innovations. Every dispatch published under this masthead adheres to strict investigative protocols, ensuring technical accuracy, full reproducible testing data, and absolute independence from corporate sponsorship.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
              <strong className="text-slate-900 block text-sm">Primary Source Review</strong>
              <p>Validates RFC specifications, Linux kernel patches, IEEE microprocessor papers, and vendor documentation before formulating architectural conclusions.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
              <strong className="text-slate-900 block text-sm">Empirical Benchmarks</strong>
              <p>Reproduces latency bounds, resource footprints, memory allocation patterns, and scaling limits in isolated physical test environments.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1.5">
              <strong className="text-slate-900 block text-sm">Editorial Independence</strong>
              <p>Zero sponsored placement, maintaining complete objectivity in software tool reviews, cloud platform analyses, and chip comparisons.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h3 className="text-base font-bold text-slate-900">Laboratory Instrumentation &amp; Measurement Standards</h3>
            <p>
              In our computing laboratory, {author.name} designs repeatable testing pipelines to evaluate system throughput, memory saturation, and CPU instruction cycles. Rather than relying on vendor-supplied synthetic marketing numbers, all evaluations use standardized telemetry suites, eBPF kernel tracing, and open hardware performance counters.
            </p>
            <p>
              Whether analyzing zero-trust cloud communication protocols, microservice failover cascades, or extreme ultraviolet lithography roadmaps, {author.name} emphasizes architectural clarity and practical engineering tradeoffs for systems architects and developers. Each guide provides code examples verified against stable runtime versions and open-source implementation standards.
            </p>
            <p>
              All benchmarks include explicit hardware configurations, kernel runtime flags, and measurement error tolerances. If an independent researcher discovers an anomaly in our published figures, our editorial team re-runs the benchmark suite in our lab and publishes transparent errata updates within 24 business hours.
            </p>
            <p>
              Software code samples accompanying analyses by {author.name} are validated using automated continuous integration pipelines, memory leak sanitizers, and static analysis linters. Whether demonstrating asynchronous concurrency patterns, socket multiplexing, or post-quantum cryptographic primitives, code snippets are provided with complete dependency manifests and execution instructions.
            </p>
            <p>
              In accordance with Com Pors newsroom policy, {author.name} maintains complete financial and advisory independence from technology vendors covered in our dispatches. All hardware and software products evaluated are tested without pre-publication editorial review by vendors or commercial sponsors.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-bold">Tested Code Samples</strong>
              <p>Every snippet is compiled and verified against current runtime versions.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-bold">Open Errata Registry</strong>
              <p>Transparent public updates within 24 hours of verified technical feedback.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
              <strong className="text-slate-900 block font-bold">SPJ Ethics Grounded</strong>
              <p>Absolute editorial independence from hardware and cloud vendors.</p>
            </div>
          </div>
        </section>

        {/* Laboratory Toolchains & Measurement Rig Specifications */}
        <section className="p-8 sm:p-10 bg-slate-50 rounded-2xl border border-slate-200 space-y-6 text-slate-700 leading-relaxed">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
              Instrumentation &amp; Laboratory Testbeds
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Benchmarking Protocols &amp; Reproducible Test Environments
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">System Telemetry &amp; Kernel Tracing</h4>
              <p>
                When conducting system performance audits, {author.name} deploys non-invasive eBPF programs, Linux perf counters, and kernel ftrace probes. This approach measures instruction retiring rates, branch prediction accuracy, memory controller bandwidth, and page faults without altering CPU execution dynamics or introducing instrumentation skew.
              </p>
              <p>
                All networking investigations evaluate real packet latency distributions across TCP, UDP, and QUIC protocols using high-precision hardware timestamping interfaces. Tail latency distributions (p95, p99, p99.9) are analyzed alongside average throughput to document worst-case execution bounds.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Compiler Optimization &amp; Runtime Profiling</h4>
              <p>
                Analyses authored by {author.name} evaluate software compilation across Clang/LLVM, GCC, and language-specific compilers including Rustc and Go. Benchmark suites assess the impact of vectorization flags (AVX-512, NEON), link-time optimization (LTO), and profile-guided optimization (PGO) on binary size and execution efficiency.
              </p>
              <p>
                Memory safety and thread safety are verified using AddressSanitizer, ThreadSanitizer, and memory leak detection suites. Readers can inspect published test configurations to replicate findings in their own continuous integration systems.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
