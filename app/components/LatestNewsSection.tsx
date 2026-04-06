import Link from "next/link"
import SectionHeader from "./SectionHeader"
import ShuffledPostGrid from "./ShuffledPostGrid"

type Post = {
  title?: string
  slug?: string
  mainImage?: { asset?: unknown; alt?: string }
  publishedAt?: string
  categoryTitle?: string
}

type Props = { posts?: Post[] }

export default function LatestNewsSection({ posts }: Props) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Mới nhất" title="Tin Tức" />
        <ShuffledPostGrid posts={posts} show={3} />
        <div className="flex justify-center mt-10">
          <Link
            href="/tin-tuc"
            className="inline-flex items-center gap-2 border border-navy text-navy font-medium px-7 py-3 rounded-full hover:bg-navy hover:text-white transition-colors text-sm"
          >
            Xem tất cả
          </Link>
        </div>
      </div>
    </section>
  )
}
