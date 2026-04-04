import { client } from "@/sanity/lib/client"
import { clinicInfoQuery } from "@/app/lib/queries"
import SectionHeader from "@/app/components/SectionHeader"

export const revalidate = 60

export default async function GioiThieuPage() {
  const clinicInfo = await client.fetch(clinicInfoQuery)

  return (
    <div className="pt-16">
      <section className="py-20 bg-beige">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-4">Về chúng tôi</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-navy mb-4">Giới Thiệu</h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-px w-10 bg-gold" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold" />
            <div className="h-px w-10 bg-gold" />
          </div>
          <p className="text-brown-muted leading-relaxed">
            {clinicInfo?.clinicName ?? "Phòng Khám Nhi Đồng"}
          </p>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Về Phòng Khám" label="Giới thiệu" />
          <div className="prose prose-lg max-w-none text-brown-muted leading-relaxed mt-8">
            <p>
              Phòng khám nhi khoa của chúng tôi chuyên chăm sóc sức khỏe cho trẻ em từ sơ sinh đến 15 tuổi.
              Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang lại
              dịch vụ y tế tốt nhất cho con em của bạn.
            </p>
            <p>
              Chúng tôi đặt sức khỏe và sự an toàn của trẻ lên hàng đầu, với môi trường thân thiện và
              ấm áp giúp các bé cảm thấy thoải mái khi đến khám.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
