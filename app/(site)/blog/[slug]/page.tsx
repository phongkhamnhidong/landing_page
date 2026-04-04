import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { postBySlugQuery, allPostSlugsQuery } from "@/app/lib/queries"

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await client.fetch(allPostSlugsQuery)
  return posts.map((post: { slug: string }) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(postBySlugQuery, { slug })
  if (!post) return {}
  return { title: `${post.title} | Phòng Khám Nhi Đồng` }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await client.fetch(postBySlugQuery, { slug })
  if (!post) notFound()

  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(600).fit("crop").url()
    : null

  const backHref = post.section === "tinTuc" ? "/tin-tuc" : post.categorySlug ? `/kien-thuc/${post.categorySlug}` : "/kien-thuc"
  const backLabel = post.section === "tinTuc" ? "← Tin Tức" : `← ${post.categoryTitle ?? "Kiến Thức"}`

  return (
    <div className="pt-16 bg-cream min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href={backHref} className="text-sm text-brown-muted hover:text-navy transition-colors">
            {backLabel}
          </Link>
        </div>

        <header className="mb-10">
          {post.categoryTitle && (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-gold bg-gold/10 px-2 py-0.5 rounded-full mb-4 inline-block">
              {post.categoryTitle}
            </span>
          )}
          {post.publishedAt && (
            <p className="text-xs text-brown-muted/60 mb-3">{formatDate(post.publishedAt)}</p>
          )}
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-navy leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-gold" />
            <div className="h-1 w-1 rounded-full bg-gold" />
          </div>
          {post.authorName && (
            <p className="text-sm text-brown-muted">Bởi <span className="font-medium text-brown">{post.authorName}</span></p>
          )}
        </header>

        {imageUrl && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-border">
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt ?? post.title}
              width={1200}
              height={600}
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        {post.body && (
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-navy prose-a:text-gold max-w-none text-brown-muted">
            <PortableText value={post.body} />
          </div>
        )}
      </article>
    </div>
  )
}
