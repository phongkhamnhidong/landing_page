type Props = {
  address?: string
}

export default function AboutSection({ address }: Props) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Về Phòng Khám</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Phòng khám nhi khoa của chúng tôi chuyên chăm sóc sức khỏe cho trẻ em từ sơ sinh đến 15 tuổi.
            Với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi cam kết mang lại
            dịch vụ y tế tốt nhất cho con em của bạn.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Chúng tôi đặt sức khỏe và sự an toàn của trẻ lên hàng đầu, với môi trường thân thiện và
            ấm áp giúp các bé cảm thấy thoải mái khi đến khám.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-700 mb-2">10+</div>
            <div className="text-gray-600 font-medium">Năm kinh nghiệm</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-700 mb-2">1000+</div>
            <div className="text-gray-600 font-medium">Bệnh nhân tin tưởng</div>
          </div>
          <div className="p-6">
            <div className="text-4xl font-bold text-blue-700 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Tận tâm với bệnh nhân</div>
          </div>
        </div>
      </div>
    </section>
  )
}
