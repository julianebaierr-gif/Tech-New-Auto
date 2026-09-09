import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const formatted = slug.replace(/-/g, " ").toUpperCase();
  return {
    title: `${formatted} Articles | TechPulse Magazine`,
    description: `Latest news, analysis, and engineering reports on ${formatted}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const allPosts = getAllPosts();
  
  // Find matching posts
  const posts = allPosts.filter(p => {
    const pSlug = p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return pSlug === slug || p.category.toLowerCase().includes(slug.replace(/-/g, " "));
  });

  const categoryTitle = slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="space-y-8">
      <div className="section-line">
        <span className="section-tag-box">{categoryTitle}</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{post.author.name}</span>
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
