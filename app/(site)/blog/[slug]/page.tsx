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

// Custom PortableText components
const portableTextComponents = {
  types: {
    image: ({ value }: { value: { url?: string; alt?: string; dimensions?: { width: number; height: number } } }) => {
      if (!value?.url) return null
      const { width = 800, height = 600 } = value.dimensions ?? {}
      return (
        <figure className="my-8">
          <Image
            src={value.url}
            alt={value.alt ?? ""}
            width={width}
            height={height}
            className="rounded-xl border border-border"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          {value.alt && (
            <figcaption className="text-center text-xs text-brown-muted/60 mt-2 italic">{value.alt}</figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    underline: ({ children }: { children?: React.ReactNode }) => <span className="underline">{children}</span>,
    link: ({ value, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
        {children}
      </a>
    ),
  },
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

        <header className="mb-10 text-center lg:text-left">
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
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <div className="h-px w-10 bg-gold" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold" />
            <div className="h-px w-10 bg-gold" />
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
            <PortableText value={post.body} components={portableTextComponents} />
          </div>
        )}

        {/* References */}
        {post.references && post.references.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="font-serif text-lg font-semibold text-navy mb-4">Tài Liệu Tham Khảo</h2>
            <ol className="space-y-2">
              {post.references.map((ref: { title?: string; url?: string }, i: number) => (
                <li key={i} className="flex gap-2 text-sm text-brown-muted">
                  <span className="text-gold font-semibold shrink-0">[{i + 1}]</span>
                  {ref.url ? (
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="hover:text-navy hover:underline transition-colors break-all">
                      {ref.title ?? ref.url}
                    </a>
                  ) : (
                    <span>{ref.title}</span>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}
      </article>
    </div>
  )
}
