import SectionHeader from "./SectionHeader"

type Props = {
  openingHours?: string
  address?: string
  phone?: string
}

export default function WorkingHoursSection({ openingHours, address, phone }: Props) {
  return (
    <section id="gioi-thieu" className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Thông tin" title="Giờ Làm Việc & Địa Chỉ" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {/* Hours */}
          <div className="bg-white rounded-xl p-7 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center text-lg">🕐</div>
              <h3 className="font-serif font-semibold text-navy">Giờ Làm Việc</h3>
            </div>
            <p className="text-brown-muted text-sm leading-relaxed whitespace-pre-line">
              {openingHours ?? "Vui lòng cập nhật trong Sanity Studio"}
            </p>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl p-7 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center text-lg">📍</div>
              <h3 className="font-serif font-semibold text-navy">Địa Chỉ</h3>
            </div>
            <p className="text-brown-muted text-sm leading-relaxed whitespace-pre-line">
              {address ?? "Vui lòng cập nhật trong Sanity Studio"}
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-xl p-7 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center text-lg">📞</div>
              <h3 className="font-serif font-semibold text-navy">Liên Hệ</h3>
            </div>
            {phone ? (
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-navy font-medium text-sm hover:text-gold transition-colors">
                {phone}
              </a>
            ) : (
              <p className="text-brown-muted text-sm">Vui lòng cập nhật trong Sanity Studio</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
