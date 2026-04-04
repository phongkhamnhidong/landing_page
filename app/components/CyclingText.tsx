"use client"

import { useEffect, useState } from "react"

const TYPE_SPEED = 50   // ms per character typed
const DELETE_SPEED = 30 // ms per character deleted
const PAUSE_AFTER = 2000 // ms to hold the full text before deleting

export default function CyclingText({ items }: { items: string[] }) {
  const [displayed, setDisplayed] = useState("")
  const [itemIndex, setItemIndex] = useState(0)
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing")

  useEffect(() => {
    if (!items.length) return

    const current = items[itemIndex]

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), TYPE_SPEED)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER)
        return () => clearTimeout(t)
      }
    }

    if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), DELETE_SPEED)
        return () => clearTimeout(t)
      } else {
        setItemIndex((i) => (i + 1) % items.length)
        setPhase("typing")
      }
    }
  }, [displayed, phase, itemIndex, items])

  if (!items.length) return null

  return (
    <p className="text-brown-muted text-sm sm:text-base leading-relaxed mb-5 min-h-[1.5em]">
      {displayed}
      <span className="inline-block w-0.5 h-4 bg-gold ml-0.5 align-middle animate-pulse" />
    </p>
  )
}
