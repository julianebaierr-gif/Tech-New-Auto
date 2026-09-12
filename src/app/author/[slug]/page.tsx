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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://compors.com";
  const authorUrl = `${siteUrl}/author/${author.slug}`;

  return {
    title: `${author.name} | Staff Journalist & Analyst`,
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://compors.com";
  const authorUrl = `${siteUrl}/author/${author.slug}`;

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
        href="/authors"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition"
      >
        <ArrowLeft className="h-4 w-4" /> Back to All Authors
      </Link>

      {/* Author Bio Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-8">
        <img
          src={author.avatar}
          alt={author.name}
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

          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            {author.bio}
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <BookOpen className="h-3.5 w-3.5 text-blue-600" /> {posts.length} Articles Published
            </span>
            <span>&bull;</span>
            <span>Com Pors Editorial Contributor</span>
          </div>
        </div>
      </div>

      {/* Published Articles Grid */}
      <section className="space-y-6">
        <div className="section-line flex items-center justify-between">
          <span className="section-tag-box">Articles By {author.name}</span>
          <span className="text-xs font-semibold text-slate-500">
            Showing {posts.length} Stories
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2">No articles published by this author yet.</h2>
            <p className="text-sm text-slate-500 mb-6">Upcoming technical coverage will appear here.</p>
            <Link href="/blog" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-sm hover:bg-blue-700">
              Browse All Articles
            </Link>
          </div>
        ) : (
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
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-md text-blue-700 text-[11px] font-bold px-2.5 py-1 rounded shadow-xs">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-2">
                    <Link href={`/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-600">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
