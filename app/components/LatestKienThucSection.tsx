import Link from "next/link"
import PostCard from "./PostCard"
import SectionHeader from "./SectionHeader"

type Post = {
  title?: string
  slug?: string
  mainImage?: { asset?: unknown; alt?: string }
  publishedAt?: string
  categoryTitle?: string
}

type Props = { posts?: Post[] }

export default function LatestKienThucSection({ posts }: Props) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeader label="Y khoa" title="Kiến Thức Sức Khỏe" center={false} />
          <Link href="/kien-thuc" className="text-sm text-navy font-medium hover:text-gold transition-colors shrink-0">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </div>
    </section>
  )
}
