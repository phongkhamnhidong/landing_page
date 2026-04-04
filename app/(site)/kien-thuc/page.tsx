import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { categoriesQuery } from "@/app/lib/queries"
import SectionHeader from "@/app/components/SectionHeader"

export const revalidate = 60

export default async function KienThucPage() {
  const categories = await client.fetch(categoriesQuery)

  return (
    <div className="pt-16">
      <section className="py-20 bg-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Kiến thức y khoa" title="Danh Mục Sức Khỏe" />

          {categories && categories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-10">
              {categories.map((cat: { title: string; slug: string; description?: string }) => (
                <Link
                  key={cat.slug}
                  href={`/kien-thuc/${cat.slug}`}
                  className="group bg-white rounded-xl border border-border p-6 hover:shadow-md hover:border-gold/40 transition-all"
                >
                  <h3 className="font-serif font-semibold text-navy group-hover:text-gold transition-colors text-sm leading-snug mb-2">
                    {cat.title}
                  </h3>
                  {cat.description && (
                    <p className="text-xs text-brown-muted/70 line-clamp-2">{cat.description}</p>
                  )}
                  <div className="mt-3 text-gold text-xs font-medium">Xem bài →</div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-brown-muted mt-10">
              Chưa có danh mục nào. Vui lòng tạo danh mục trong Sanity Studio.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
