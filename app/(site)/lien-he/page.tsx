import { client } from "@/sanity/lib/client"
import { clinicInfoQuery } from "@/app/lib/queries"
import SectionHeader from "@/app/components/SectionHeader"

export const revalidate = 60

export default async function LienHePage() {
  const clinicInfo = await client.fetch(clinicInfoQuery)

  return (
    <div className="pt-16">
      <section className="py-20 bg-beige">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader label="Liên hệ" title="Liên Hệ Với Chúng Tôi" />

          <div className="space-y-5 mt-10">
            {[
              { icon: "📍", label: "Địa Chỉ", value: clinicInfo?.address },
              { icon: "📞", label: "Điện Thoại", value: clinicInfo?.phone, href: clinicInfo?.phone ? `tel:${clinicInfo.phone.replace(/\s/g, "")}` : undefined },
              { icon: "✉️", label: "Email", value: clinicInfo?.email, href: clinicInfo?.email ? `mailto:${clinicInfo.email}` : undefined },
              { icon: "🕐", label: "Giờ Làm Việc", value: clinicInfo?.openingHours },
            ].map(({ icon, label, value, href }) => (
              <div key={label} className="bg-white rounded-xl border border-border p-6 flex items-start gap-4">
                <span className="text-xl shrink-0">{icon}</span>
                <div>
                  <p className="text-xs text-brown-muted/60 font-semibold uppercase tracking-wide mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm text-navy hover:text-gold transition-colors font-medium whitespace-pre-line">
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-brown whitespace-pre-line">
                      {value ?? "Vui lòng cập nhật trong Sanity Studio"}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
