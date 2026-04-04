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
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Y khoa" title="Kiến Thức Sức Khỏe" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {posts.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
        <div className="flex justify-center mt-10">
          <Link
            href="/kien-thuc"
            className="inline-flex items-center gap-2 border border-navy text-navy font-medium px-7 py-3 rounded-full hover:bg-navy hover:text-white transition-colors text-sm"
          >
            Xem tất cả
          </Link>
        </div>
      </div>
    </section>
  )
}
