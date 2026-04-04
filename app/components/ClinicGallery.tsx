"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import SectionHeader from "./SectionHeader"

type GalleryImage = {
  url: string
  alt?: string
}

type Props = {
  images: GalleryImage[]
}

export default function ClinicGallery({ images }: Props) {
  const [shuffled, setShuffled] = useState<GalleryImage[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Shuffle once on mount
  useEffect(() => {
    const copy = [...images]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    setShuffled(copy)
  }, [images])

  // Auto-advance every 3.5s
  useEffect(() => {
    if (shuffled.length < 2) return

    timerRef.current = setTimeout(() => {
      advance((activeIndex + 1) % shuffled.length)
    }, 3500)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeIndex, shuffled])

  function advance(nextIndex: number) {
    if (timerRef.current) clearTimeout(timerRef.current)
    setFading(true)
    setTimeout(() => {
      setActiveIndex(nextIndex)
      setFading(false)
    }, 350)
  }

  if (!images || images.length === 0) return null
  if (shuffled.length === 0) return null

  const featured = shuffled[activeIndex]
  // Show up to 5 thumbnails (others beyond that are still cycled but not shown simultaneously)
  const thumbCount = Math.min(shuffled.length, 5)
  const thumbs = shuffled.slice(0, thumbCount)

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Hình Ảnh" title="Phòng Khám Của Chúng Tôi" />

        <div className="mt-10 flex flex-col gap-4">
          {/* Featured large image */}
          <div className="relative w-full h-[320px] sm:h-[480px] rounded-2xl overflow-hidden border border-border bg-beige-dark">
            <Image
              key={featured.url}
              src={featured.url}
              alt={featured.alt ?? "Hình ảnh phòng khám"}
              fill
              className={`object-cover transition-opacity duration-350 ${fading ? "opacity-0" : "opacity-100"}`}
              sizes="(max-width: 768px) 100vw, 1280px"
              priority
            />
            {/* Subtle gradient overlay at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Thumbnail strip */}
          {thumbs.length > 1 && (
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${thumbs.length}, 1fr)` }}>
              {thumbs.map((img, i) => {
                const isActive = i === activeIndex % thumbCount
                return (
                  <button
                    key={img.url + i}
                    onClick={() => advance(i)}
                    className={`relative h-20 sm:h-28 rounded-xl overflow-hidden border-2 transition-all duration-300 focus:outline-none ${
                      isActive
                        ? "border-gold scale-[1.03] shadow-md"
                        : "border-border opacity-70 hover:opacity-100 hover:border-gold/50"
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt ?? "Hình ảnh phòng khám"}
                      fill
                      className="object-cover"
                      sizes="256px"
                    />
                  </button>
                )
              })}
            </div>
          )}

          {/* Dot indicators when more images than shown thumbnails */}
          {shuffled.length > thumbCount && (
            <div className="flex justify-center gap-2 mt-1">
              {shuffled.map((_, i) => (
                <button
                  key={i}
                  onClick={() => advance(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "w-5 h-2 bg-gold"
                      : "w-2 h-2 bg-border hover:bg-gold/50"
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
