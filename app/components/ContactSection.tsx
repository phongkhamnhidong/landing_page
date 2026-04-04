import SectionHeader from "./SectionHeader"

type Props = {
  phone?: string
  email?: string
  address?: string
  openingHours?: string
}

export default function ContactSection({ phone, email, address, openingHours }: Props) {
  return (
    <section id="lien-he" className="py-20 bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">Liên hệ</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-cream">Liên Hệ Với Chúng Tôi</h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="h-px w-10 bg-gold" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold" />
            <div className="h-px w-10 bg-gold" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-navy-light rounded-xl p-7 border border-cream/10">
            <div className="text-2xl mb-4">📍</div>
            <h3 className="font-serif font-semibold text-cream mb-3">Địa Chỉ</h3>
            <p className="text-cream/60 text-sm leading-relaxed whitespace-pre-line">
              {address ?? "Vui lòng cập nhật trong Sanity Studio"}
            </p>
          </div>

          <div className="bg-navy-light rounded-xl p-7 border border-cream/10">
            <div className="text-2xl mb-4">📞</div>
            <h3 className="font-serif font-semibold text-cream mb-3">Điện Thoại & Email</h3>
            {phone && (
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="block text-cream/60 text-sm hover:text-gold transition-colors mb-1">
                {phone}
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="block text-cream/60 text-sm hover:text-gold transition-colors">
                {email}
              </a>
            )}
            {!phone && !email && (
              <p className="text-cream/40 text-sm">Vui lòng cập nhật trong Sanity Studio</p>
            )}
          </div>

          <div className="bg-navy-light rounded-xl p-7 border border-cream/10">
            <div className="text-2xl mb-4">🕐</div>
            <h3 className="font-serif font-semibold text-cream mb-3">Giờ Làm Việc</h3>
            <p className="text-cream/60 text-sm leading-relaxed whitespace-pre-line">
              {openingHours ?? "Vui lòng cập nhật trong Sanity Studio"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
