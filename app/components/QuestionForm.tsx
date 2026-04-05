"use client"

import { useRef, useState, useTransition } from "react"
import { submitQuestion } from "@/app/actions/submitQuestion"

export default function QuestionForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")
  const [isPending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await submitQuestion(formData)
      if (result.success) {
        setStatus("success")
        formRef.current?.reset()
      } else {
        setStatus("error")
        setErrorMsg(result.error)
      }
    })
  }

  return (
    <div className="bg-white rounded-2xl border border-border p-8">
      <h3 className="font-serif text-lg font-semibold text-navy mb-1">Gửi câu hỏi của bạn</h3>
      <p className="text-xs text-brown-muted/70 mb-6">
        Bác sĩ sẽ trả lời và đăng câu hỏi lên trang. Câu hỏi không xuất hiện ngay lập tức.
      </p>

      {status === "success" ? (
        <div className="text-center py-8">
          <div className="text-3xl mb-3">✅</div>
          <p className="font-semibold text-navy mb-1">Câu hỏi đã được gửi!</p>
          <p className="text-sm text-brown-muted">Bác sĩ sẽ trả lời sớm nhất có thể.</p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-5 text-xs text-gold hover:underline"
          >
            Gửi câu hỏi khác
          </button>
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot — hidden from real users, bots fill this in */}
          <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              Tên của bạn <span className="text-brown-muted/50 font-normal">(không bắt buộc)</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Ví dụ: Nguyễn Thị Lan"
              maxLength={80}
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm text-navy placeholder:text-brown-muted/40 focus:outline-none focus:border-gold/60 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-navy mb-1.5">
              Câu hỏi <span className="text-red-400">*</span>
            </label>
            <textarea
              name="question"
              required
              rows={4}
              placeholder="Nhập câu hỏi của bạn..."
              maxLength={1000}
              className="w-full border border-border rounded-xl px-4 py-2.5 text-sm text-navy placeholder:text-brown-muted/40 focus:outline-none focus:border-gold/60 transition-colors resize-none"
            />
          </div>

          {status === "error" && (
            <p className="text-xs text-red-500">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-navy text-white font-medium py-3 rounded-full hover:bg-navy-light transition-colors text-sm disabled:opacity-60"
          >
            {isPending ? "Đang gửi..." : "Gửi câu hỏi"}
          </button>
        </form>
      )}
    </div>
  )
}
