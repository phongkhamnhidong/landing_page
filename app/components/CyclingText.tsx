"use client"

import { useEffect, useState } from "react"

export default function CyclingText({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (items.length < 2) return
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % items.length)
        setVisible(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [items])

  if (!items.length) return null

  return (
    <p
      className="text-brown-muted text-sm sm:text-base leading-relaxed mb-10 transition-opacity duration-400"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {items[index]}
    </p>
  )
}
