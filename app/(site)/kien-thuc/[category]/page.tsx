import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import {
  postsByCategoryQuery,
  categoryBySlugQuery,
  allCategorySlugsQuery,
} from "@/app/lib/queries"
import PostCard from "@/app/components/PostCard"
import SectionHeader from "@/app/components/SectionHeader"

export const revalidate = 60

type Props = { params: Promise<{ category: string }> }

export async function generateStaticParams() {
  const cats = await client.fetch(allCategorySlugsQuery)
  return cats.map((c: { slug: string }) => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = await client.fetch(categoryBySlugQuery, { slug: category })
  if (!cat) return {}
  return { title: `${cat.title} | Phòng Khám Nhi Đồng` }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const [cat, posts] = await Promise.all([
    client.fetch(categoryBySlugQuery, { slug: category }),
    client.fetch(postsByCategoryQuery, { categorySlug: category }),
  ])

  if (!cat) notFound()

  return (
    <div className="pt-16">
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Kiến Thức" title={cat.title} />
          {cat.description && (
            <p className="text-center text-brown-muted text-sm max-w-xl mx-auto mt-2">{cat.description}</p>
          )}

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {posts.map((post: Parameters<typeof PostCard>[0]["post"]) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-brown-muted mt-10">Chưa có bài viết nào trong danh mục này.</p>
          )}
        </div>
      </section>
    </div>
  )
}
