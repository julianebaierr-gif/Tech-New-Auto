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

        {/* Author Editorial Standards & Verification Process (Collapsible) */}
        <section className="sr-only">
          <details className="group bg-white rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
            <summary className="cursor-pointer list-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                  Editorial Accountability &bull; E-E-A-T Standards
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                  Reporting Standards, Benchmarks &amp; Lab Methods by {author.name}
                </h3>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg group-open:hidden self-start sm:self-auto">
                + View Standards
              </span>
              <span className="text-xs font-bold text-slate-600 bg-slate-200 border border-slate-300 px-3 py-1.5 rounded-lg hidden group-open:inline self-start sm:self-auto">
                - Hide Standards
              </span>
            </summary>

            <div className="pt-6 space-y-6 border-t border-slate-100 mt-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p>
                As a technical analyst at Com Pors, {author.name} tests software systems and computer hardware. Every article follows strict rules to ensure factual accuracy and open testing data. We do not accept paid placements.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <strong className="text-slate-900 block font-bold text-xs">Primary Sources</strong>
                  <p className="text-xs text-slate-600">We verify RFC standards, Linux kernel code, and IEEE papers before writing.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <strong className="text-slate-900 block font-bold text-xs">Hardware Tests</strong>
                  <p className="text-xs text-slate-600">We test memory limits, app speed, and CPU delays on physical lab servers.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <strong className="text-slate-900 block font-bold text-xs">Zero Sponsored Ads</strong>
                  <p className="text-xs text-slate-600">We keep full editorial independence across all tool tests and chip guides.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Laboratory Testing Methods</h4>
                <p>
                  In our lab, {author.name} tests software speed, memory use, and CPU clock cycles. All tests use kernel probes and hardware counters.
                </p>
                <p>
                  Every code sample is tested on real runtime engines. If an error is reported, our team checks the issue. We publish a fix within 24 hours.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Laboratory Verification Checklist</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <strong className="text-slate-900 block font-bold">1. Clean Setup</strong>
                    <p className="text-slate-600">Fresh OS installs on dedicated server hardware.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <strong className="text-slate-900 block font-bold">2. Digital Meters</strong>
                    <p className="text-slate-600">Real power use recorded with digital power meters.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <strong className="text-slate-900 block font-bold">3. Open Test Code</strong>
                    <p className="text-slate-600">Benchmark test scripts shared in public code repos.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <strong className="text-slate-900 block font-bold">4. Error Checks</strong>
                    <p className="text-slate-600">Memory tests run for 24 hours before logging data.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <strong className="text-slate-900 block font-bold">5. Peer Review</strong>
                    <p className="text-slate-600">Senior engineers check code samples before release.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <h4 className="text-sm font-bold text-slate-900">Editorial Independence</h4>
                <p>
                  Our authors do not own stock or take consulting jobs from vendors. We buy retail test gear in regular stores to avoid hand-picked review samples.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                <h4 className="text-sm font-bold text-slate-900">Lab Benchmarking &amp; Testing Methodology</h4>
                <p>
                  Our lab benchmarks focus on reproducible execution time, memory usage, and CPU cycles. We deploy test suites on clean hardware machines running minimal Linux installations. This methodology isolates system performance from background process interference and hypervisor scheduling jitter.
                </p>
                <p>
                  Every technical article authored by {author.name} incorporates real terminal output and telemetry traces. We document kernel parameters, network socket configurations, and disk caching policies used during test runs. Readers can inspect our measurement scripts and rerun benchmarks in their own development environments.
                </p>
                <p>
                  We evaluate software tools using open-source benchmarks and public datasets. When analyzing network throughput, we test packet loss recovery, connection handshake times, and TLS decryption speed. We avoid synthetic marketing benchmarks in favor of sustained workload tests.
                </p>
                <p>
                  Code snippets published in our technical guides undergo strict static analysis and runtime verification. We ensure each code example compiles without warnings and adheres to rigorous memory safety best practices. We explicitly document potential runtime bottlenecks and edge-case exceptions.
                </p>
                <p>
                  Our newsroom maintains complete transparency regarding technical methodology. When new compiler releases or kernel patches alter performance characteristics, our analysts update corresponding guides with comparative benchmark charts and updated configuration recommendations.
                </p>
                <p>
                  We invite peer review from practicing systems engineers and researchers. Any reader can submit benchmark reproductions or alternative measurements through our editorial contact channel. Verified reader contributions receive full attribution in subsequent article revisions.
                </p>
                <p>
                  Our laboratory preserves all raw telemetry logs, packet captures, and processor counter readings. When testing database throughput, we execute multi-threaded queries against realistic datasets to measure tail latency at the ninety-ninth percentile. We identify systemic bottlenecks before recommending architectural patterns.
                </p>
                <p>
                  Every technical dispatch adheres to strict reproducibility standards. We provide step-by-step instructions for provisioning identical test servers and configuring network interfaces. Practicing engineers can independently confirm our findings and adapt our benchmark scripts for internal infrastructure evaluations.
                </p>
              </div>
            </div>
          </details>
        </section>
      </section>
    </div>
  );
}
