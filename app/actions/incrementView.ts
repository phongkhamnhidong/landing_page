"use server"

import { redis } from "@/app/lib/redis"

export async function incrementView(key: string): Promise<number> {
  try {
    const client = await redis()
    const count = await client.incr(key)
    return count
  } catch {
    return 0
  }
}

export async function getView(key: string): Promise<number> {
  try {
    const client = await redis()
    const count = await client.get(key)
    return count ? parseInt(count as string, 10) : 0
  } catch {
    return 0
  }
}
