"use server"

import { createClient } from "@sanity/client"

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

export type SubmitResult = { success: true } | { success: false; error: string }

export async function submitQuestion(formData: FormData): Promise<SubmitResult> {
  const name = (formData.get("name") as string | null)?.trim()
  const question = (formData.get("question") as string | null)?.trim()

  if (!question || question.length < 5) {
    return { success: false, error: "Vui lòng nhập câu hỏi (ít nhất 5 ký tự)." }
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
