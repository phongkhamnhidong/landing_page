import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { tinTucCategoriesQuery, allTinTucQuery } from "@/app/lib/queries"
import PostCard from "@/app/components/PostCard"
import SectionHeader from "@/app/components/SectionHeader"

export const revalidate = 60

export default async function TinTucPage() {
  const [categories, posts] = await Promise.all([
    client.fetch(tinTucCategoriesQuery),
    client.fetch(allTinTucQuery),
  ])

  return (
    <div className="pt-16">
      {/* Categories */}
      {categories && categories.length > 0 && (
        <section className="py-20 bg-beige">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Chủ đề" title="Danh Mục Tin Tức" />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {categories.map((cat: { title: string; slug: string; description?: string }) => (
                <Link
                  key={cat.slug}
                  href={`/tin-tuc/${cat.slug}`}
                  className="group bg-white rounded-xl border border-border p-6 hover:shadow-md hover:border-gold/40 transition-all text-center"
                >
                  <h3 className="font-serif font-semibold text-navy group-hover:text-gold transition-colors text-sm leading-snug">
                    {cat.title}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-brown-muted/70 line-clamp-2 mt-2">{cat.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All posts */}
      <section className={`py-20 ${categories?.length > 0 ? "bg-cream" : "bg-beige"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Mới nhất" title="Tất Cả Tin Tức" />

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {posts.map((post: Parameters<typeof PostCard>[0]["post"]) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-brown-muted mt-10">Chưa có tin tức nào.</p>
          )}
        </div>
      </section>
    </div>
  )
}
