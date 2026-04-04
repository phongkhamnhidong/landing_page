"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import SectionHeader from "./SectionHeader"

type GalleryImage = { url: string; alt?: string }

export default function MobileGallery({ images }: { images: GalleryImage[] }) {
  const [shuffled, setShuffled] = useState<GalleryImage[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const copy = [...images]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    setShuffled(copy)
  }, [images])

  useEffect(() => {
    if (shuffled.length < 2) return
    timerRef.current = setTimeout(() => advance((activeIndex + 1) % shuffled.length), 3500)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeIndex, shuffled])

  function advance(next: number) {
    if (timerRef.current) clearTimeout(timerRef.current)
    setFading(true)
    setTimeout(() => { setActiveIndex(next); setFading(false) }, 350)
  }

  if (!shuffled.length) return null

  const thumbCount = Math.min(shuffled.length, 4)

  return (
    // Only visible on mobile (hidden on lg+)
    <section className="lg:hidden py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader label="Hình Ảnh" title="Phòng Khám Của Chúng Tôi" />

        <div className="mt-8 flex flex-col gap-3">
          {/* Large image */}
          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-border shadow-md">
            <Image
              src={shuffled[activeIndex].url}
              alt={shuffled[activeIndex].alt ?? "Hình ảnh phòng khám"}
              fill
              className={`object-cover transition-opacity duration-350 ${fading ? "opacity-0" : "opacity-100"}`}
              sizes="100vw"
              priority
            />
          </div>

          {/* Thumbnails */}
          {shuffled.length > 1 && (
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${thumbCount}, 1fr)` }}>
              {shuffled.slice(0, thumbCount).map((img, i) => (
                <button
                  key={i}
                  onClick={() => advance(i)}
                  className={`relative h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 focus:outline-none ${
                    i === activeIndex % thumbCount
                      ? "border-gold scale-[1.04] shadow-md"
                      : "border-border/60 opacity-65 hover:opacity-100"
                  }`}
                >
                  <Image src={img.url} alt={img.alt ?? ""} fill className="object-cover" sizes="120px" />
                </button>
              ))}
            </div>
          )}

          {shuffled.length > thumbCount && (
            <div className="flex justify-center gap-1.5 mt-1">
              {shuffled.map((_, i) => (
                <button
                  key={i}
                  onClick={() => advance(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex ? "w-4 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-border"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
