import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

type Post = {
  title?: string
  slug?: string
  mainImage?: { asset?: unknown; alt?: string }
  publishedAt?: string
  categoryTitle?: string
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function PostCard({ post }: { post: Post }) {
  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage as Parameters<typeof urlFor>[0]).width(600).height(400).fit("crop").url()
    : null

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow"
    >
      <div className="h-44 bg-beige overflow-hidden shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt ?? post.title ?? ""}
            width={600}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-beige-dark flex items-center justify-center">
              <svg className="w-5 h-5 text-brown-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        {(post.categoryTitle || post.publishedAt) && (
          <div className="flex items-center gap-2 mb-2">
            {post.categoryTitle && (
              <span className="text-[10px] font-semibold uppercase tracking-wide text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                {post.categoryTitle}
              </span>
            )}
            {post.publishedAt && (
              <span className="text-xs text-brown-muted/60">{formatDate(post.publishedAt)}</span>
            )}
          </div>
        )}
        <h3 className="text-sm font-semibold text-brown group-hover:text-navy transition-colors line-clamp-2 leading-snug">
          {post.title}
        </h3>
      </div>
    </Link>
  )
}
