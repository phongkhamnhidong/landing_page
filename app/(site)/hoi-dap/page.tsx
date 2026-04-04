import type { Metadata } from "next"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { faqPageQuery, faqCountQuery, faqSearchPageQuery, faqSearchCountQuery } from "@/app/lib/queries"
import SectionHeader from "@/app/components/SectionHeader"
import QuestionForm from "@/app/components/QuestionForm"
import FaqSearchInput from "@/app/components/FaqSearchInput"

export const metadata: Metadata = {
  title: "Hỏi Đáp",
  description:
    "Giải đáp các thắc mắc về sức khỏe trẻ em. Gửi câu hỏi để bác sĩ Minh Nguyệt tư vấn trực tiếp.",
}

export const revalidate = 60

const PAGE_SIZE = 10

type Props = { searchParams: Promise<{ page?: string; q?: string }> }

export default async function HoiDapPage({ searchParams }: Props) {
  const { page: pageParam, q } = await searchParams
  const query = q?.trim() ?? ""
  const page = Math.max(1, parseInt(pageParam ?? "1", 10))
  const from = (page - 1) * PAGE_SIZE
  const to = from + PAGE_SIZE

  const isSearching = query.length > 0
  const searchTerm = query + "*" // Sanity match supports wildcard suffix

  const [faqs, total] = await Promise.all([
    isSearching
      ? client.fetch(faqSearchPageQuery, { q: searchTerm, from, to })
      : client.fetch(faqPageQuery, { from, to }),
    isSearching
      ? client.fetch(faqSearchCountQuery, { q: searchTerm })
      : client.fetch(faqCountQuery),
  ])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  function pageHref(p: number) {
    const params = new URLSearchParams()
    if (query) params.set("q", query)
    if (p > 1) params.set("page", String(p))
    const qs = params.toString()
    return `/hoi-dap${qs ? `?${qs}` : ""}`
  }

  return (
    <div className="pt-16 bg-beige">
      {/* FAQ list */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Giải đáp thắc mắc" title="Hỏi Đáp" />

          <FaqSearchInput defaultValue={query} />

          {faqs && faqs.length > 0 ? (
            <>
              {isSearching && (
                <p className="text-xs text-brown-muted/60 mt-4 mb-1">
                  {total} kết quả cho &ldquo;<span className="text-navy font-medium">{query}</span>&rdquo;
                </p>
              )}

              <div className="space-y-3 mt-4">
                {faqs.map((faq: { _id: string; question: string; categoryTitle?: string }) => (
                  <Link
                    key={faq._id}
                    href={`/hoi-dap/${faq._id}`}
                    className="group flex items-center gap-4 bg-white rounded-xl border border-border px-6 py-4 hover:border-gold/40 hover:shadow-sm transition-all"
                  >
                    <span className="font-serif text-xl text-gold leading-none shrink-0">CH</span>
                    <div className="flex-1 min-w-0">
                      {faq.categoryTitle && (
                        <span className="text-[10px] font-semibold uppercase tracking-wide text-gold bg-gold/10 px-2 py-0.5 rounded-full mb-1.5 inline-block">
                          {faq.categoryTitle}
                        </span>
                      )}
                      <p className="font-medium text-navy text-sm group-hover:text-gold transition-colors leading-snug">
                        {faq.question}
                      </p>
                    </div>
                    <svg className="w-4 h-4 text-brown-muted/40 group-hover:text-gold shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {page > 1 && (
                    <Link href={pageHref(page - 1)} className="px-4 py-2 text-sm font-medium text-brown-muted bg-white border border-border rounded-lg hover:border-gold/40 hover:text-navy transition-all">
                      ← Trước
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <Link
                      key={p}
                      href={pageHref(p)}
                      className={`w-9 h-9 flex items-center justify-center text-sm font-medium rounded-lg border transition-all ${
                        p === page
                          ? "bg-navy text-cream border-navy"
                          : "bg-white text-brown-muted border-border hover:border-gold/40 hover:text-navy"
                      }`}
                    >
                      {p}
                    </Link>
                  ))}
                  {page < totalPages && (
                    <Link href={pageHref(page + 1)} className="px-4 py-2 text-sm font-medium text-brown-muted bg-white border border-border rounded-lg hover:border-gold/40 hover:text-navy transition-all">
                      Tiếp →
                    </Link>
                  )}
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-brown-muted mt-10">
              {isSearching
                ? `Không tìm thấy câu hỏi nào cho "${query}".`
                : "Chưa có câu hỏi nào. Vui lòng thêm trong Sanity Studio."}
            </p>
          )}
        </div>
      </section>

      {/* Submit question form */}
      <section className="py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Đặt câu hỏi" title="Bạn Có Thắc Mắc?" />
          <div className="mt-10">
            <QuestionForm />
          </div>
        </div>
      </section>
    </div>
  )
}
