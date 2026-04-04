import { client } from "@/sanity/lib/client"
import { allFaqQuery } from "@/app/lib/queries"
import SectionHeader from "@/app/components/SectionHeader"

export const revalidate = 60

export default async function HoiDapPage() {
  const faqs = await client.fetch(allFaqQuery)

  return (
    <div className="pt-16">
      <section className="py-20 bg-beige">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Giải đáp thắc mắc" title="Hỏi Đáp" />

          {faqs && faqs.length > 0 ? (
            <div className="space-y-5 mt-10">
              {faqs.map((faq: { _id: string; question: string; answer: string; categoryTitle?: string }) => (
                <div key={faq._id} className="bg-white rounded-xl border border-border p-6">
                  {faq.categoryTitle && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-gold bg-gold/10 px-2 py-0.5 rounded-full mb-3 inline-block">
                      {faq.categoryTitle}
                    </span>
                  )}
                  <div className="flex items-start gap-3">
                    <span className="font-serif text-xl text-gold leading-none mt-0.5 shrink-0">Q</span>
                    <div>
                      <p className="font-semibold text-navy text-sm mb-3">{faq.question}</p>
                      <div className="flex items-start gap-3">
                        <span className="font-serif text-xl text-brown-muted/50 leading-none shrink-0">A</span>
                        <p className="text-brown-muted text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-brown-muted mt-10">
              Chưa có câu hỏi nào. Vui lòng thêm trong Sanity Studio.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
