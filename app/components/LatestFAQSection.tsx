"use client"

import { useMemo } from "react"
import Link from "next/link"
import SectionHeader from "./SectionHeader"

type FAQ = {
  _id: string
  question: string
  answer: string
}

type Props = { faqs?: FAQ[] }

export default function LatestFAQSection({ faqs }: Props) {
  const shuffled = useMemo(() => {
    if (!faqs || faqs.length === 0) return []
    const copy = [...faqs]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy.slice(0, 3)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (shuffled.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Giải đáp" title="Hỏi Đáp" />

        <div className="space-y-4 max-w-3xl mx-auto mt-10">
          {shuffled.map((faq) => (
            <Link key={faq._id} href={`/hoi-dap/${faq._id}`} className="group block bg-white rounded-xl border border-border p-6 hover:border-gold/40 hover:shadow-sm transition-all">
              <div className="flex items-start gap-3">
                <span className="text-gold font-serif text-xl leading-none mt-0.5">CH</span>
                <div>
                  <p className="font-semibold text-navy text-sm mb-3 group-hover:text-gold transition-colors">{faq.question}</p>
                  <div className="flex items-start gap-3">
                    <span className="font-serif text-xl text-brown-muted/50 leading-none shrink-0">TL</span>
                    <p className="text-brown-muted text-sm leading-relaxed line-clamp-3">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/hoi-dap"
            className="inline-flex items-center gap-2 border border-navy text-navy font-medium px-7 py-3 rounded-full hover:bg-navy hover:text-white transition-colors text-sm"
          >
            Xem tất cả
          </Link>
        </div>
      </div>
    </section>
  )
}
