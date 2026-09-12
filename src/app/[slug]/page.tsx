import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/posts";
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Tag, BookOpen, ChevronRight, Bookmark } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  if (!posts || posts.length === 0) {
    return [{ slug: "_empty" }];
  }
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.compors.com";
  const postUrl = `${siteUrl}/${post.slug}/`;
  let desc = post.excerpt.trim();
  if (desc.length > 155) {
    const lastSpace = desc.slice(0, 155).lastIndexOf(" ");
    desc = (lastSpace > 140 ? desc.slice(0, lastSpace) : desc.slice(0, 152)).replace(/[.,;:-]+$/, "") + "...";
  }

  const imageAlt = post.coverImageAlt || `${post.title} - ${post.category}`;

  return {
    title: post.title,
    description: desc,
    alternates: {
      canonical: postUrl,
    },
    keywords: post.tags,
    openGraph: {
      type: "article",
      url: postUrl,
      title: post.title,
      description: desc,
      publishedTime: post.date,
      authors: [post.author.name],
      section: post.category,
      tags: post.tags,
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: desc,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, 6);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.compors.com";
  const postUrl = `${siteUrl}/${post.slug}/`;
  const authorSlug = post.author.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const authorUrl = `${siteUrl}/author/${authorSlug}/`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    image: [post.coverImage],
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    author: [
      {
        "@type": "Person",
        name: post.author.name,
        url: authorUrl,
        jobTitle: post.author.role,
      },
    ],
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "Com Pors",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
      },
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.category,
        item: `${siteUrl}/category/${post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Newsroom
      </Link>

      <header className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="section-tag-box text-[11px]">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
          <span className="flex items-center gap-1 text-slate-500"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-y border-slate-200 py-3.5 text-xs">
          <Link
            href={`/author/${post.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className="flex items-center gap-3 group"
          >
            <img
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-slate-300 object-cover group-hover:ring-2 group-hover:ring-blue-500 transition"
            />
            <div>
              <p className="font-bold text-slate-900 group-hover:text-blue-600 transition">{post.author.name}</p>
              <p className="text-slate-500 text-[11px]">{post.author.role}</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Published in</span>
            <Link
              href={`/category/${post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="font-bold uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 hover:bg-blue-100 transition"
            >
              {post.category}
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 mb-10 shadow-lg bg-slate-100">
        <img
          src={post.coverImage}
          alt={post.coverImageAlt || post.title}
          width={1200}
          height={630}
          className="w-full max-h-[500px] object-cover"
        />
      </div>

      {/* Post Body */}
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-base sm:text-lg">
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="article-content space-y-6 [&>h2]:text-2xl sm:[&>h2]:text-3xl [&>h2]:font-black [&>h2]:text-slate-900 [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:tracking-tight [&>h3]:text-xl sm:[&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-blue-800 [&>h3]:mt-8 [&>h3]:mb-3 [&>h4]:text-lg sm:[&>h4]:text-xl [&>h4]:font-semibold [&>h4]:text-slate-800 [&>h4]:mt-6 [&>h4]:mb-2 [&>p]:leading-relaxed [&>p]:text-slate-700 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>blockquote]:bg-blue-50/50 [&>blockquote]:py-2 [&>blockquote]:rounded-r"
        />

        {/* Dedicated "Read Also This / Related Technical Reports" Box matching sample UI */}
        {relatedPosts.length > 0 && (
          <aside className="my-10 rounded-2xl border-l-4 border-l-red-600 border border-slate-200 bg-slate-50/80 p-6 sm:p-7 shadow-xs not-prose">
            <div className="mb-3">
              <h3 className="text-sm sm:text-base font-black tracking-wider uppercase text-red-700 flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-red-600" />
                READ ALSO THIS &bull; RELATED INVESTIGATIVE REPORTS
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Continue reading in-depth engineering coverage from Com Pors:
              </p>
            </div>
            <ul className="divide-y divide-slate-200/80 mt-4 text-sm sm:text-base">
              {relatedPosts.slice(0, 5).map((rel) => (
                <li key={rel.slug} className="py-2.5 flex items-start gap-2.5 group">
                  <span className="text-red-600 font-bold text-base leading-none mt-1 shrink-0">
                    &bull;
                  </span>
                  <div className="leading-snug">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800 mr-2 inline-block">
                      {rel.category}:
                    </span>
                    <Link
                      href={`/${rel.slug}`}
                      className="font-semibold text-red-700 hover:text-red-800 hover:underline transition group-hover:text-red-900"
                    >
                      {rel.title}
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Interactive FAQ Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-14 pt-10 border-t-2 border-slate-100 not-prose">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-7 w-2 bg-blue-600 rounded-full" />
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {post.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 transition"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-start gap-2.5">
                    <span className="text-blue-600 font-black">Q:</span>
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Author Bio Box */}
      <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start gap-4 group">
        <Link href={`/author/${post.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="shrink-0">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="h-16 w-16 min-w-[4rem] aspect-square rounded-xl object-cover border border-slate-300 group-hover:ring-2 group-hover:ring-blue-500 transition"
          />
        </Link>
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm hover:text-blue-600 transition">
                <Link href={`/author/${post.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
                  {post.author.name}
                </Link>
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700">Editorial Staff</span>
            </div>
            <Link
              href={`/author/${post.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 transition hidden sm:inline"
            >
              All Articles &rarr;
            </Link>
          </div>
          <p className="text-xs text-blue-600 font-semibold">{post.author.role}</p>
          <p className="text-xs text-slate-600 leading-relaxed">
            {post.author.bio || "Engineering journalist and technology specialist covering modern computing paradigms, semiconductors, and architectural design."}
          </p>
        </div>
      </div>

      {/* Related Technical Analyses & Internal Cross-Links */}
      {relatedPosts.length > 0 && (
        <section className="mt-14 pt-10 border-t-2 border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">Internal Reference &amp; Research</span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Related Technical Analyses
              </h2>
            </div>
            <Link
              href="/blog"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hidden sm:inline-flex items-center gap-1"
            >
              Browse Newsroom <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedPosts.map((rel) => (
              <article
                key={rel.slug}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-blue-400 hover:shadow-lg transition duration-300"
              >
                <div className="h-40 relative overflow-hidden bg-slate-100">
                  <img
                    src={rel.coverImage}
                    alt={rel.coverImageAlt || rel.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white/95 text-blue-700 backdrop-blur-md shadow-xs">
                    {rel.category}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[11px] text-slate-600 font-medium mb-2">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {rel.date}</span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {rel.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 leading-snug">
                    <Link href={`/${rel.slug}`}>{rel.title}</Link>
                  </h3>
                  <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed mb-4 flex-1">
                    {rel.excerpt}
                  </p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-semibold text-[11px]">{rel.author.name}</span>
                    <Link
                      href={`/${rel.slug}`}
                      className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px]"
                    >
                      Read Analysis <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Tags Section */}
      <footer className="mt-10 pt-8 border-t border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-4 w-4 text-blue-600 mr-2" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 transition font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
