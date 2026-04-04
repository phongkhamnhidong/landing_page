import type { Metadata } from "next"
import { Lora, Be_Vietnam_Pro } from "next/font/google"
import "./globals.css"

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
})

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Phòng Khám Nhi Đồng",
  description: "Phòng khám nhi khoa chuyên chăm sóc sức khỏe cho trẻ em.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${lora.variable} ${beVietnamPro.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
