import HeroGallery from "./HeroGallery"

type GalleryImage = {
  url: string
  alt?: string
}

type Props = {
  clinicName?: string
  motto?: string
  tagline?: string
  phone?: string
  galleryImages?: GalleryImage[]
}

export default function HeroSection({ clinicName, motto, tagline, phone, galleryImages }: Props) {
  const hasImages = galleryImages && galleryImages.length > 0

  return (
    <section className="pt-16 min-h-[88vh] flex items-center bg-gradient-to-br from-white via-beige to-beige-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className={`grid gap-12 lg:gap-16 items-center ${hasImages ? "grid-cols-1 lg:grid-cols-2" : ""}`}>

          {/* Left: text content */}
          <div className={hasImages ? "" : "max-w-2xl"}>
            <h1 className="font-serif text-5xl sm:text-6xl font-semibold text-navy leading-tight mb-5">
              {clinicName ?? "Phòng Khám Nhi Đồng Minh Nguyệt"}
            </h1>

            {/* Gold ornament */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-gold" />
              <div className="h-1.5 w-1.5 rounded-full bg-gold" />
              <div className="h-px w-10 bg-gold" />
            </div>

            {/* Motto */}
            <p className="text-gold font-semibold text-sm sm:text-base tracking-[0.18em] uppercase mb-5">
              {motto ?? "CHẤT LƯỢNG – HIỆU QUẢ – TẬN TÂM"}
            </p>

            {/* Tagline */}
            {tagline && (
              <p className="text-brown-muted text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
                {tagline}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              {phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 bg-navy text-white font-medium px-7 py-3.5 rounded-full hover:bg-navy-light transition-colors text-sm"
                >
                  <span>📞</span> Gọi ngay: {phone}
                </a>
              )}
              <a
                href="#bac-si"
                className="inline-flex items-center gap-2 border border-navy text-navy font-medium px-7 py-3.5 rounded-full hover:bg-navy hover:text-white transition-colors text-sm"
              >
                Tìm hiểu thêm
              </a>
            </div>
          </div>

          {/* Right: gallery */}
          {hasImages && (
            <div className="hidden lg:block h-[480px]">
              <HeroGallery images={galleryImages} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
