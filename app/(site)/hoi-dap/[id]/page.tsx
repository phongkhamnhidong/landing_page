import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { faqByIdQuery, relatedFaqsQuery } from "@/app/lib/queries"
import { getView } from "@/app/actions/incrementView"
import ViewCounter from "@/app/components/ViewCounter"

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
  const [faq, initialCount] = await Promise.all([
    client.fetch(faqByIdQuery, { id }),
    getView(`views:faq:${id}`),
  ])
  if (!faq) notFound()

  const relatedFaqs = await client.fetch(relatedFaqsQuery, {
    id,
    categoryRef: faq.categoryRef ?? null,
  })

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
            <span className="font-serif text-3xl text-gold leading-none shrink-0 mt-1">CH</span>
            <p className="font-serif text-xl font-semibold text-navy leading-snug">{faq.question}</p>
          </div>

          {/* Answer */}
          <div className="flex items-start gap-4">
            <span className="font-serif text-3xl text-brown-muted/40 leading-none shrink-0 mt-1">TL</span>
            <p className="text-brown-muted leading-relaxed whitespace-pre-line">{faq.answer}</p>
          </div>

          {/* Meta */}
          <div className="mt-8 pt-6 border-t border-border flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-brown-muted/60">
            {faq.publishedAt && <span>Ngày đăng: {formatDate(faq.publishedAt)}</span>}
            {faq.submitterName && <span>Câu hỏi từ: {faq.submitterName}</span>}
            <ViewCounter viewKey={`views:faq:${id}`} initialCount={initialCount} />
          </div>
        </div>

        {/* Related questions */}
        {relatedFaqs && relatedFaqs.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brown-muted/60 shrink-0">Câu hỏi liên quan</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="space-y-2">
              {relatedFaqs.map((rel: { _id: string; question: string; categoryTitle?: string }) => (
                <Link
                  key={rel._id}
                  href={`/hoi-dap/${rel._id}`}
                  className="group flex items-center gap-3 bg-white rounded-xl border border-border px-5 py-3.5 hover:border-gold/40 hover:shadow-sm transition-all"
                >
                  <span className="font-serif text-base text-gold leading-none shrink-0">CH</span>
                  <p className="flex-1 text-sm font-medium text-navy group-hover:text-gold transition-colors leading-snug">
                    {rel.question}
                  </p>
                  <svg className="w-4 h-4 text-brown-muted/40 group-hover:text-gold shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  )
}
