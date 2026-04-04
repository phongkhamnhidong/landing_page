import { client } from "@/sanity/lib/client"
import { allTinTucQuery } from "@/app/lib/queries"
import PostCard from "@/app/components/PostCard"
import SectionHeader from "@/app/components/SectionHeader"

export const revalidate = 60

export default async function TinTucPage() {
  const posts = await client.fetch(allTinTucQuery)

  return (
    <div className="pt-16">
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Mới nhất" title="Tin Tức" />

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
