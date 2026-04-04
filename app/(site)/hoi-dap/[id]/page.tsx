import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { faqByIdQuery } from "@/app/lib/queries"

export const revalidate = 60

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const faq = await client.fetch(faqByIdQuery, { id })
  if (!faq) return {}
  return {
    title: faq.question,
    description: faq.answer?.slice(0, 160),
  }
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ""
  return new Date(dateStr).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" })
}

export default async function FaqDetailPage({ params }: Props) {
  const { id } = await params
  const faq = await client.fetch(faqByIdQuery, { id })
  if (!faq) notFound()

  return (
    <div className="pt-16 bg-beige min-h-screen">
      <article className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back */}
        <div className="mb-8">
          <Link href="/hoi-dap" className="text-sm text-brown-muted hover:text-navy transition-colors">
            ← Hỏi Đáp
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-border p-8 sm:p-10">
          {/* Category badge */}
          {faq.categoryTitle && (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-gold bg-gold/10 px-2 py-0.5 rounded-full mb-6 inline-block">
              {faq.categoryTitle}
            </span>
          )}

          {/* Question */}
          <div className="flex items-start gap-4 mb-8 pb-8 border-b border-border">
            <span className="font-serif text-3xl text-gold leading-none shrink-0 mt-1">Q</span>
            <p className="font-serif text-xl font-semibold text-navy leading-snug">{faq.question}</p>
          </div>

          {/* Answer */}
          <div className="flex items-start gap-4">
            <span className="font-serif text-3xl text-brown-muted/40 leading-none shrink-0 mt-1">A</span>
            <p className="text-brown-muted leading-relaxed whitespace-pre-line">{faq.answer}</p>
          </div>

          {/* Meta */}
          {(faq.publishedAt || faq.submitterName) && (
            <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-x-6 gap-y-1 text-xs text-brown-muted/60">
              {faq.publishedAt && <span>Ngày đăng: {formatDate(faq.publishedAt)}</span>}
              {faq.submitterName && <span>Câu hỏi từ: {faq.submitterName}</span>}
            </div>
          )}
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/hoi-dap"
            className="inline-flex items-center gap-2 text-sm font-medium text-brown-muted hover:text-navy border border-border bg-white px-5 py-2.5 rounded-full hover:border-gold/40 transition-all"
          >
            ← Xem tất cả câu hỏi
          </Link>
        </div>
      </article>
    </div>
  )
}
