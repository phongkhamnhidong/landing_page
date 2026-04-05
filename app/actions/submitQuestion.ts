"use server"

import { headers } from "next/headers"
import { createClient } from "@sanity/client"
import { redis } from "@/app/lib/redis"

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

const RATE_LIMIT = 3       // max submissions
const WINDOW_SECS = 3600   // per hour

export type SubmitResult = { success: true } | { success: false; error: string }

export async function submitQuestion(formData: FormData): Promise<SubmitResult> {
  // Honeypot — bots fill this, humans leave it empty
  const honeypot = (formData.get("website") as string | null) ?? ""
  if (honeypot.length > 0) {
    // Silently succeed so bots don't know they were blocked
    return { success: true }
  }

  const name = (formData.get("name") as string | null)?.trim()
  const question = (formData.get("question") as string | null)?.trim()

  if (!question || question.length < 5) {
    return { success: false, error: "Vui lòng nhập câu hỏi (ít nhất 5 ký tự)." }
  }

  // Rate limit by IP
  try {
    const headersList = await headers()
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headersList.get("x-real-ip") ??
      "unknown"

    const key = `rate:question:${ip}`
    const r = await redis()
    const count = await r.incr(key)
    if (count === 1) {
      // First request in this window — set TTL
      await r.expire(key, WINDOW_SECS)
    }
    if (count > RATE_LIMIT) {
      return { success: false, error: "Bạn đã gửi quá nhiều câu hỏi. Vui lòng thử lại sau 1 giờ." }
    }
  } catch {
    // If Redis is unavailable, allow the submission through
  }

  try {
    await writeClient.create({
      _type: "faq",
      submitterName: name || "Ẩn danh",
      question,
      // answer left empty — doctor fills it in Studio before publishing
    })
    return { success: true }
  } catch {
    return { success: false, error: "Có lỗi xảy ra. Vui lòng thử lại sau." }
  }
}
