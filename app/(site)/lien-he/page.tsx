import { client } from "@/sanity/lib/client"
import { clinicInfoQuery } from "@/app/lib/queries"
import SectionHeader from "@/app/components/SectionHeader"
import Image from "next/image"

export const revalidate = 60

export default async function LienHePage() {
  const clinicInfo = await client.fetch(clinicInfoQuery)

  const zaloHref = clinicInfo?.zalo
    ? clinicInfo.zalo.startsWith("http")
      ? clinicInfo.zalo
      : `https://zalo.me/${clinicInfo.zalo.replace(/\s/g, "")}`
    : null

  return (
    <div className="pt-16 bg-beige">
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Liên hệ" title="Liên Hệ Với Chúng Tôi" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
            {/* Phone */}
            <a
              href={clinicInfo?.phone ? `tel:${clinicInfo.phone.replace(/\s/g, "")}` : undefined}
              className="group bg-white rounded-2xl border border-border p-7 flex flex-col items-center text-center hover:shadow-md hover:border-gold/40 transition-all"
            >
              <div className="w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center text-2xl mb-4">📞</div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">Điện Thoại</p>
              <p className="text-sm font-semibold text-navy group-hover:text-gold transition-colors">
                {clinicInfo?.phone ?? "—"}
              </p>
            </a>

            {/* Zalo */}
            {zaloHref ? (
              <a
                href={zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-border p-7 flex flex-col items-center text-center hover:shadow-md hover:border-gold/40 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-[#0068FF]/10 flex items-center justify-center mb-4">
                  <Image src="/zalo_logo.png" alt="Zalo" width={36} height={36} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">Zalo</p>
                <p className="text-sm font-semibold text-navy group-hover:text-gold transition-colors">
                  {clinicInfo?.zalo}
                </p>
              </a>
            ) : (
              <div className="bg-white rounded-2xl border border-border p-7 flex flex-col items-center text-center opacity-40">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 48 48" className="w-7 h-7" fill="none">
                    <rect width="48" height="48" rx="12" fill="#0068FF"/>
                    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">Z</text>
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">Zalo</p>
                <p className="text-sm text-brown-muted">Chưa cập nhật</p>
              </div>
            )}

            {/* Facebook */}
            {clinicInfo?.facebook ? (
              <a
                href={clinicInfo.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border border-border p-7 flex flex-col items-center text-center hover:shadow-md hover:border-gold/40 transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-[#1877F2]/10 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">Facebook</p>
                <p className="text-sm font-semibold text-navy group-hover:text-gold transition-colors">
                  Trang Facebook
                </p>
              </a>
            ) : (
              <div className="bg-white rounded-2xl border border-border p-7 flex flex-col items-center text-center opacity-40">
                <div className="w-14 h-14 rounded-full bg-[#1877F2]/10 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold mb-2">Facebook</p>
                <p className="text-sm text-brown-muted">Chưa cập nhật</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
