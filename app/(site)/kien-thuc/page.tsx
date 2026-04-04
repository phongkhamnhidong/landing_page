import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Kiến Thức Sức Khỏe",
  description:
    "Kiến thức y khoa về sức khỏe trẻ em — dinh dưỡng, hô hấp, tiêu hóa, thần kinh và nhiều chủ đề khác từ bác sĩ Minh Nguyệt.",
}
import { client } from "@/sanity/lib/client"
import { categoriesQuery, allKienThucQuery, kienThucSearchQuery } from "@/app/lib/queries"
import PostCard from "@/app/components/PostCard"
import SectionHeader from "@/app/components/SectionHeader"
import SearchInput from "@/app/components/SearchInput"

export const revalidate = 60

type Props = { searchParams: Promise<{ q?: string }> }

export default async function KienThucPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q?.trim() ?? ""
  const isSearching = query.length > 0
  const searchTerm = query + "*"

  const [categories, posts] = await Promise.all([
    client.fetch(categoriesQuery),
    isSearching
      ? client.fetch(kienThucSearchQuery, { q: searchTerm })
      : client.fetch(allKienThucQuery),
  ])

  return (
    <div className="pt-16">
      {/* Categories — hide when searching */}
      {!isSearching && categories && categories.length > 0 && (
        <section className="py-20 bg-beige">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader label="Kiến thức y khoa" title="Danh Mục Sức Khỏe" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {categories.map((cat: { title: string; slug: string; description?: string }) => (
                <Link
                  key={cat.slug}
                  href={`/kien-thuc/${cat.slug}`}
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

      {/* Posts */}
      <section className={`py-20 ${!isSearching && categories?.length > 0 ? "bg-cream" : "bg-beige"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label={isSearching ? "Kết quả tìm kiếm" : "Mới nhất"}
            title={isSearching ? "Tìm Kiếm Bài Viết" : "Bài Viết Gần Đây"}
          />

          <div className="max-w-xl mx-auto">
            <SearchInput defaultValue={query} placeholder="Tìm kiếm bài viết..." />
          </div>

          {isSearching && (
            <p className="text-xs text-brown-muted/60 text-center mt-4">
              {posts.length} kết quả cho &ldquo;<span className="text-navy font-medium">{query}</span>&rdquo;
            </p>
          )}

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {posts.map((post: Parameters<typeof PostCard>[0]["post"]) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-brown-muted mt-10">
              {isSearching ? `Không tìm thấy bài viết nào cho "${query}".` : "Chưa có bài viết nào."}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
