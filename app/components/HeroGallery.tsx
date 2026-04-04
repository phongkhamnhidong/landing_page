"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

type GalleryImage = {
  url: string
  alt?: string
}

export default function HeroGallery({ images }: { images: GalleryImage[] }) {
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

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Large featured image */}
      <div className="relative flex-1 min-h-[280px] rounded-2xl overflow-hidden border border-border/60 shadow-lg">
        <Image
          src={shuffled[activeIndex].url}
          alt={shuffled[activeIndex].alt ?? "Hình ảnh phòng khám"}
          fill
          className={`object-cover transition-opacity duration-350 ${fading ? "opacity-0" : "opacity-100"}`}
          sizes="(max-width: 1024px) 100vw, 600px"
          priority
        />
      </div>

      {/* Thumbnails */}
      {shuffled.length > 1 && (() => {
        const thumbCount = Math.min(shuffled.length, 4)
        const thumbStart = Math.max(0, Math.min(activeIndex - 1, shuffled.length - thumbCount))
        const thumbs = shuffled.slice(thumbStart, thumbStart + thumbCount)
        return (
          <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${thumbCount}, 1fr)` }}>
            {thumbs.map((img, i) => {
              const globalIndex = thumbStart + i
              return (
                <button
                  key={img.url + globalIndex}
                  onClick={() => advance(globalIndex)}
                  className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 focus:outline-none ${
                    globalIndex === activeIndex
                      ? "border-gold scale-[1.04] shadow-md"
                      : "border-border/60 opacity-65 hover:opacity-100 hover:border-gold/40"
                  }`}
                >
                  <Image src={img.url} alt={img.alt ?? ""} fill className="object-cover" sizes="160px" />
                </button>
              )
            })}
          </div>
        )
      })()}

      {/* Dots for overflow images */}
      {shuffled.length > 4 && (
        <div className="flex justify-center gap-1.5">
          {shuffled.map((_, i) => (
            <button
              key={i}
              onClick={() => advance(i)}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-4 h-1.5 bg-gold" : "w-1.5 h-1.5 bg-border hover:bg-gold/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
