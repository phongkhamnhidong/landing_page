import { client } from "@/sanity/lib/client"
import { clinicInfoQuery, doctorQuery } from "@/app/lib/queries"
import { PortableText } from "@portabletext/react"
import SectionHeader from "@/app/components/SectionHeader"
import DoctorSection from "@/app/components/DoctorSection"
import ClinicGallery from "@/app/components/ClinicGallery"

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
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-gold" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold" />
            <div className="h-px w-10 bg-gold" />
          </div>
          {clinicInfo?.motto && (
            <p className="text-gold font-semibold text-sm tracking-[0.18em] uppercase">
              {clinicInfo.motto}
            </p>
          )}
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
                  Trong cuộc sống hiện đại ngày nay, sức khỏe của con trẻ đang là một trong những vấn đề quan tâm hàng đầu.
                  Nhu cầu khám chữa bệnh, phòng bệnh cũng như nhanh chóng phát hiện sớm các bệnh lý nguy hiểm để có hướng
                  điều trị kịp thời, phù hợp, cách nuôi con, dinh dưỡng cho trẻ nhỏ… và nhu cầu tư vấn sức khỏe luôn làm
                  đau đầu các bậc làm cha, làm mẹ.
                </p>
                <p>
                  Các bậc phụ huynh luôn trăn trở, đắn đo tìm một nơi đáng tin cậy để chăm sóc sức khỏe cho đứa con yêu quý
                  của mình trước quá nhiều thông tin quảng cáo, chỉ dẫn trên các phương tiện truyền thông, báo chí, internet…
                  Thấu hiểu được nỗi lo âu của các bậc cha mẹ, Phòng Khám Nhi Đồng Minh Nguyệt hoạt động với phương châm:
                  &ldquo;CHẤT LƯỢNG - HIỆU QUẢ - TẬN TÂM&rdquo;
                </p>
                <ul>
                  <li>
                    Phòng Khám Nhi Đồng Minh Nguyệt được phụ trách bởi Bác sĩ Trần Thị Minh Nguyệt — Tốt nghiệp Chuyên khoa II,
                    Chuyên ngành Nhi Hô hấp tại Đại học Y Dược TP. Hồ Chí Minh, với trên 30 năm kinh nghiệm chuyên môn,
                    hiện đang là Giám đốc Trung tâm Y tế Khu vực Dĩ An — cùng với đội ngũ điều dưỡng nhiều năm kinh nghiệm,
                    liên tục được cập nhật kiến thức chuyên môn.
                  </li>
                  <li>
                    Không ngừng áp dụng những thành tựu mới, những tiến bộ tiên tiến của Y khoa trong khám chữa bệnh nhi.
                  </li>
                  <li>
                    Luôn chú trọng thái độ phục vụ: Thân thiện, niềm nở, chu đáo, luôn lắng nghe, chia sẻ và giải đáp kịp thời
                    những thắc mắc của các bậc cha mẹ.
                  </li>
                  <li>
                    Cơ sở vật chất, trang thiết bị hiện đại, quản lý bệnh nhi bằng hệ thống phần mềm chuyên nghiệp.
                    Không gian rộng rãi, thoáng mát, sạch sẽ với tổng diện tích sử dụng trên 500m², gồm: Phòng khám Nhi
                    (Tim Mạch, Hô hấp, Tiêu hoá, Nội tiết, Thần kinh, Dinh dưỡng), Phòng siêu âm, Phòng xét nghiệm,
                    Phòng vật lý trị liệu hô hấp, Phòng phun khí dung.
                  </li>
                </ul>
                <p>
                  Trải qua trên 28 năm hoạt động, Phòng Khám Nhi Đồng Minh Nguyệt ngày càng tạo được sự tín nhiệm cao
                  của các quý phụ huynh trong và ngoài tỉnh — từng bước khẳng định phương châm:
                  &ldquo;CHẤT LƯỢNG - HIỆU QUẢ - TẬN TÂM&rdquo;
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* About the Doctor */}
      <DoctorSection doctor={doctor} />

      {/* Clinic gallery */}
      {clinicInfo?.galleryImages?.length > 0 && (
        <ClinicGallery images={clinicInfo.galleryImages} />
      )}
    </div>
  )
}
