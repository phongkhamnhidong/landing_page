"use client"

import { useRouter, usePathname } from "next/navigation"
import { useRef } from "react"

export default function FaqSearchInput({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = inputRef.current?.value.trim() ?? ""
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    router.push(`${pathname}?${params.toString()}`)
  }

  function handleClear() {
    if (inputRef.current) inputRef.current.value = ""
    router.push(pathname)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-8">
      <div className="relative flex-1">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-muted/50"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          defaultValue={defaultValue}
          placeholder="Tìm kiếm câu hỏi..."
          className="w-full bg-white border border-border rounded-xl pl-10 pr-10 py-3 text-sm text-navy placeholder:text-brown-muted/50 focus:outline-none focus:border-gold/60 transition-colors"
        />
        {defaultValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-muted/50 hover:text-navy transition-colors"
            aria-label="Xóa tìm kiếm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-5 py-3 bg-navy text-cream text-sm font-medium rounded-xl hover:bg-navy/90 transition-colors shrink-0"
      >
        Tìm kiếm
      </button>
    </form>
  )
}
