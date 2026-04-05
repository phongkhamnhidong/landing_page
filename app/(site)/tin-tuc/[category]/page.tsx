import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import {
  tinTucPostsByCategoryQuery,
  tinTucPostsByCategoryCountQuery,
  tinTucPostsByCategorySearchQuery,
  categoryBySlugQuery,
  allTinTucCategorySlugsQuery,
} from "@/app/lib/queries"
import PostCard from "@/app/components/PostCard"
import SectionHeader from "@/app/components/SectionHeader"
import SearchInput from "@/app/components/SearchInput"
import Pagination from "@/app/components/Pagination"

export const revalidate = 60

const PAGE_SIZE = 9

type Props = {
  params: Promise<{ category: string }>
  searchParams: Promise<{ page?: string; q?: string }>
}

export async function generateStaticParams() {
  const cats = await client.fetch(allTinTucCategorySlugsQuery)
  return cats.map((c: { slug: string }) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = await client.fetch(categoryBySlugQuery, { slug: category })
  if (!cat) return {}
  return { title: `${cat.title} | Phòng Khám Nhi Đồng` }
}

export default async function TinTucCategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const { page: pageParam, q } = await searchParams
  const query = q?.trim() ?? ""
  const isSearching = query.length > 0
  const searchTerm = query + "*"
  const page = Math.max(1, parseInt(pageParam ?? "1", 10))
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE

  const [cat, posts, total] = await Promise.all([
    client.fetch(categoryBySlugQuery, { slug: category }),
    isSearching
      ? client.fetch(tinTucPostsByCategorySearchQuery, { categorySlug: category, q: searchTerm })
      : client.fetch(tinTucPostsByCategoryQuery, { categorySlug: category, from, to }),
    isSearching
      ? Promise.resolve(0)
      : client.fetch(tinTucPostsByCategoryCountQuery, { categorySlug: category }),
  ])

  if (!cat) notFound()

  const totalPages = isSearching ? 1 : Math.ceil(total / PAGE_SIZE)

  function pageHref(p: number) {
    const params = new URLSearchParams()
    if (p > 1) params.set("page", String(p))
    const qs = params.toString()
    return `/tin-tuc/${category}${qs ? `?${qs}` : ""}`
  }

  return (
    <div className="pt-16">
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Tin Tức" title={cat.title} />
          {cat.description && (
            <p className="text-center text-brown-muted text-sm max-w-xl mx-auto mt-2">{cat.description}</p>
          )}

          <div className="max-w-xl mx-auto mt-8">
            <SearchInput defaultValue={query} placeholder="Tìm kiếm trong danh mục này..." />
          </div>

          {isSearching && (
            <p className="text-xs text-brown-muted/60 text-center mt-4">
              {posts.length} kết quả cho &ldquo;<span className="text-navy font-medium">{query}</span>&rdquo;
            </p>
          )}

          {posts && posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {posts.map((post: Parameters<typeof PostCard>[0]["post"]) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>

              <Pagination page={page} totalPages={totalPages} pageHref={pageHref} />
            </>
          ) : (
            <p className="text-center text-brown-muted mt-10">
              {isSearching ? `Không tìm thấy bài viết nào cho "${query}".` : "Chưa có bài viết nào trong danh mục này."}
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
