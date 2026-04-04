"use client"

import { useEffect, useState } from "react"
import { incrementView } from "@/app/actions/incrementView"

type Props = {
  viewKey: string
  initialCount?: number
}

export default function ViewCounter({ viewKey, initialCount = 0 }: Props) {
  const [count, setCount] = useState<number>(initialCount)

  useEffect(() => {
    incrementView(viewKey).then(setCount)
  }, [viewKey])

  return (
    <span className="inline-flex items-center gap-1 text-xs text-brown-muted/60">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
      </svg>
      {count.toLocaleString("vi-VN")} lượt xem
    </span>
  )
}
