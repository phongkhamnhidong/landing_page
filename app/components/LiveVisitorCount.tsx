"use client"

import { useEffect, useRef, useState } from "react"
import { trackVisitor } from "@/app/actions/trackVisitor"

export default function LiveVisitorCount() {
  const [count, setCount] = useState<number | null>(null)
  const sessionIdRef = useRef<string | null>(null)

  useEffect(() => {
    // Get or create a stable session ID
    let id = sessionStorage.getItem("visitor_session_id")
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem("visitor_session_id", id)
    }
    sessionIdRef.current = id

    async function ping() {
      if (!sessionIdRef.current) return
      const n = await trackVisitor(sessionIdRef.current)
      // Seed random offset on a 2-minute window so it drifts gradually, not every ping
      const seed = Math.floor(Date.now() / 120_000)
      const seededRandom = ((seed * 9301 + 49297) % 233280) / 233280
      const offset = Math.floor(seededRandom * 11) // 0–10
      setCount(Math.max(n * 7 + offset, n))
    }

    ping()
    const interval = setInterval(ping, 30_000)
    return () => clearInterval(interval)
  }, [])

  if (count === null) return null

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-cream/40">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
      </span>
      {count} người đang xem
    </span>
  )
}
