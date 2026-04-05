"use server"

import { redis } from "@/app/lib/redis"

const KEY = "active_visitors"
const WINDOW_MS = 60_000 // 60 seconds

export async function trackVisitor(sessionId: string): Promise<number> {
  try {
    const r = await redis()
    const now = Date.now()
    const cutoff = now - WINDOW_MS

    await r.zAdd(KEY, { score: now, value: sessionId })
    await r.zRemRangeByScore(KEY, "-inf", cutoff)
    const count = await r.zCard(KEY)
    // Expire the key after 2 minutes of no activity
    await r.expire(KEY, 120)
    return count
  } catch {
    return 0
  }
}

export async function getLiveVisitorCount(): Promise<number> {
  try {
    const r = await redis()
    const cutoff = Date.now() - WINDOW_MS
    await r.zRemRangeByScore(KEY, "-inf", cutoff)
    return await r.zCard(KEY)
  } catch {
    return 0
  }
}
