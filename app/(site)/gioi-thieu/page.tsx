import { client } from "@/sanity/lib/client"
import { clinicInfoQuery, doctorQuery } from "@/app/lib/queries"
import { PortableText } from "@portabletext/react"
import SectionHeader from "@/app/components/SectionHeader"
import DoctorSection from "@/app/components/DoctorSection"

export const revalidate = 60

export default async function GioiThieuPage() {
  const [clinicInfo, doctor] = await Promise.all([
    client.fetch(clinicInfoQuery),
    client.fetch(doctorQuery),
  ])

  return (
    <div className="pt-16">
      {/* Hero banner */}
      <section className="py-20 bg-beige">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Về chúng tôi</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-navy mb-4">Giới Thiệu</h1>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 bg-gold" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold" />
            <div className="h-px w-10 bg-gold" />
          </div>
        </div>
      </section>

      {/* About the Clinic */}
      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Về Phòng Khám" label="Giới thiệu" />
          <div className="prose prose-lg max-w-none text-brown-muted leading-relaxed mt-8">
            {clinicInfo?.about ? (
              <PortableText value={clinicInfo.about} />
            ) : (
              <>
                <p>
                  Phòng khám nhi khoa của chúng tôi chuyên chăm sóc sức khỏe cho trẻ em từ sơ sinh đến 15 tuổi.
                  Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang lại
                  dịch vụ y tế tốt nhất cho con em của bạn.
                </p>
                <p>
                  Chúng tôi đặt sức khỏe và sự an toàn của trẻ lên hàng đầu, với môi trường thân thiện và
                  ấm áp giúp các bé cảm thấy thoải mái khi đến khám.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About the Doctor */}
      <DoctorSection doctor={doctor} />
    </div>
  )
}
