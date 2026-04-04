import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { webLinksQuery } from "@/app/lib/queries"
import SectionHeader from "@/app/components/SectionHeader"

export const revalidate = 60

const platformIcon: Record<string, string> = {
  facebook: "📘",
  youtube: "📺",
  zalo: "💬",
  website: "🌐",
  other: "🔗",
}

export default async function LienKetWebPage() {
  const links = await client.fetch(webLinksQuery)

  return (
    <div className="pt-16">
      <section className="py-20 bg-beige">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Mạng xã hội" title="Liên Kết Web" />

          {links && links.length > 0 ? (
            <div className="space-y-4 mt-10">
              {links.map((link: { _id: string; name: string; url: string; platform?: string; description?: string }) => (
                <Link
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white rounded-xl border border-border p-5 hover:shadow-md hover:border-gold/40 transition-all group"
                >
                  <span className="text-2xl shrink-0">
                    {platformIcon[link.platform ?? "other"] ?? "🔗"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy group-hover:text-gold transition-colors text-sm">
                      {link.name}
                    </p>
                    {link.description && (
                      <p className="text-xs text-brown-muted mt-0.5 truncate">{link.description}</p>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-brown-muted shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-brown-muted mt-10">
              Chưa có liên kết nào. Vui lòng thêm trong Sanity Studio.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
