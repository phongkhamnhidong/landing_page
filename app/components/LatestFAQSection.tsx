import Link from "next/link"
import SectionHeader from "./SectionHeader"

type FAQ = {
  _id: string
  question: string
  answer: string
}

type Props = { faqs?: FAQ[] }

export default function LatestFAQSection({ faqs }: Props) {
  if (!faqs || faqs.length === 0) return null

  return (
    <section className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeader label="Giải đáp" title="Hỏi Đáp" center={false} />
          <Link href="/hoi-dap" className="text-sm text-navy font-medium hover:text-gold transition-colors shrink-0">
            Xem tất cả →
          </Link>
        </div>

        <div className="space-y-4 max-w-3xl">
          {faqs.map((faq) => (
            <div key={faq._id} className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-start gap-3">
                <span className="text-gold font-serif text-xl leading-none mt-0.5">Q</span>
                <div>
                  <p className="font-semibold text-navy text-sm mb-2">{faq.question}</p>
                  <p className="text-brown-muted text-sm leading-relaxed line-clamp-3">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
