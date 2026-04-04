import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

type Post = {
  title?: string
  slug?: string
  mainImage?: { asset?: { _ref?: string }; alt?: string }
  publishedAt?: string
}

type Props = {
  posts?: Post[]
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export default function BlogSection({ posts }: Props) {
  if (!posts || posts.length === 0) return null

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Tin Tức & Sức Khỏe</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const imageUrl = post.mainImage?.asset
              ? urlFor(post.mainImage).width(600).height(400).fit("crop").url()
              : null

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-blue-50 overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={post.mainImage?.alt ?? post.title ?? "Blog image"}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      📰
                    </div>
                  )}
                </div>
                <div className="p-5">
                  {post.publishedAt && (
                    <p className="text-xs text-gray-400 mb-2">{formatDate(post.publishedAt)}</p>
                  )}
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
