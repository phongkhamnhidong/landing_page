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
  title: {
    default: "Phòng Khám Nhi Đồng Minh Nguyệt",
    template: "%s | Phòng Khám Nhi Đồng Minh Nguyệt",
  },
  description:
    "Phòng Khám Nhi Đồng Minh Nguyệt — chuyên khám và điều trị bệnh cho trẻ em từ sơ sinh đến 15 tuổi tại Bình Dương. Bác sĩ Chuyên Khoa II Nhi với hơn 30 năm kinh nghiệm.",
  keywords: ["phòng khám nhi", "bác sĩ nhi", "khám nhi Bình Dương", "Minh Nguyệt", "nhi đồng", "trẻ em"],
  authors: [{ name: "Phòng Khám Nhi Đồng Minh Nguyệt" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Phòng Khám Nhi Đồng Minh Nguyệt",
    title: "Phòng Khám Nhi Đồng Minh Nguyệt",
    description:
      "Chuyên khám và điều trị bệnh cho trẻ em từ sơ sinh đến 15 tuổi. Bác sĩ Chuyên Khoa II Nhi với hơn 30 năm kinh nghiệm tại Bình Dương.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${lora.variable} ${beVietnamPro.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
