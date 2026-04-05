import Link from "next/link"

type Props = {
  page: number
  totalPages: number
  pageHref: (p: number) => string
}

export default function Pagination({ page, totalPages, pageHref }: Props) {
  if (totalPages <= 1) return null

  // Build the list of page numbers / ellipsis markers to render
  function getPages(): (number | "…")[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages: (number | "…")[] = [1]

    const rangeStart = Math.max(2, page - 2)
    const rangeEnd = Math.min(totalPages - 1, page + 2)

    if (rangeStart > 2) pages.push("…")
    for (let p = rangeStart; p <= rangeEnd; p++) pages.push(p)
    if (rangeEnd < totalPages - 1) pages.push("…")

    pages.push(totalPages)
    return pages
  }

  const pages = getPages()

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      {page > 1 && (
        <Link
          href={pageHref(page - 1)}
          className="px-3 py-2 text-sm font-medium text-brown-muted bg-white border border-border rounded-lg hover:border-gold/40 hover:text-navy transition-all"
        >
          ←
        </Link>
      )}

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="w-9 h-9 flex items-center justify-center text-sm text-brown-muted/40 select-none">
            …
          </span>
        ) : (
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
        )
      )}

      {page < totalPages && (
        <Link
          href={pageHref(page + 1)}
          className="px-3 py-2 text-sm font-medium text-brown-muted bg-white border border-border rounded-lg hover:border-gold/40 hover:text-navy transition-all"
        >
          →
        </Link>
      )}
    </div>
  )
}
