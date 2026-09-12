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

  return {
    title: `${titleName} | Com Pors`,
    description,
    openGraph: {
      title: `${titleName} | Com Pors`,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${titleName} | Com Pors`,
      description,
    },
  };
}

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
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 mb-2">No articles in this department yet.</h2>
          <p className="text-sm text-slate-500 mb-6">Our editors are preparing new investigative coverage and guides for this section.</p>
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
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold uppercase text-blue-600 mb-2">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-2">
                  <Link href={`/${post.slug}`}>{post.title}</Link>
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
      )}
    </div>
  );
}
