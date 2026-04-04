type Props = {
  clinicName?: string
  tagline?: string
  phone?: string
}

export default function HeroSection({ clinicName, tagline, phone }: Props) {
  return (
    <section className="pt-16 min-h-[85vh] flex items-center bg-gradient-to-br from-cream via-beige to-beige-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-6">
            Phòng Khám Nhi Khoa
          </p>

          {/* Heading */}
          <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-navy leading-tight mb-4">
            {clinicName ?? "Phòng Khám Nhi Đồng"}
          </h1>

          {/* Gold rule */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold" />
            <div className="h-px w-6 bg-gold/50" />
          </div>

          {/* Tagline */}
          <p className="text-brown-muted text-lg leading-relaxed mb-10 max-w-lg">
            {tagline ?? "Chăm sóc sức khỏe toàn diện cho trẻ em với sự tận tâm và chuyên nghiệp."}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 bg-navy text-cream font-medium px-7 py-3.5 rounded-full hover:bg-navy-light transition-colors text-sm"
              >
                <span>📞</span> Gọi ngay: {phone}
              </a>
            )}
            <a
              href="#gioi-thieu"
              className="inline-flex items-center gap-2 border border-navy text-navy font-medium px-7 py-3.5 rounded-full hover:bg-navy hover:text-cream transition-colors text-sm"
            >
              Tìm hiểu thêm
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
