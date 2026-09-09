import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import CategoryQuickBar from "@/components/CategoryQuickBar";

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
      <CategoryQuickBar />

      <div className="section-line">
        <span className="section-tag-box">{categoryTitle}</span>
      </div>

      {posts.length === 0 ? (
        <div className="p-12 text-center bg-[#111827] rounded-lg border border-[#1f293d]">
          <h2 className="text-xl font-bold text-white mb-2">No articles found in this department yet.</h2>
          <p className="text-sm text-[#94a3b8] mb-6">Our automated pipeline will publish articles for this category soon.</p>
          <Link href="/blog" className="px-5 py-2.5 rounded bg-[#c1121e] text-white font-bold text-xs">
            Browse All Articles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-[#111827] rounded-lg overflow-hidden border border-[#1f293d] hover:border-[#c1121e] transition flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden bg-black">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold uppercase text-[#ef233c] mb-2">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-[#ef233c] transition line-clamp-2 leading-snug mb-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-[#94a3b8] line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-3 border-t border-[#1f293d] flex items-center justify-between text-[11px] text-[#64748b]">
                  <span>{post.author.name}</span>
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
