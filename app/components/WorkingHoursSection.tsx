import SectionHeader from "./SectionHeader"
import ScheduleDisplay from "./ScheduleDisplay"

type DaySchedule = {
  day: string
  openTime?: string
  closeTime?: string
  isClosed?: boolean
}

type Props = {
  schedule?: DaySchedule[]
  address?: string
  phone?: string
  zalo?: string
  facebook?: string
}

export default function WorkingHoursSection({ schedule, address, phone, zalo, facebook }: Props) {
  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : null

  const embedUrl = address
    ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&hl=vi`
    : null

  const zaloHref = zalo
    ? zalo.startsWith("http") ? zalo : `https://zalo.me/${zalo.replace(/\s/g, "")}`
    : null

  return (
    <section id="gio-lam-viec" className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Thông tin" title="Giờ Làm Việc & Địa Chỉ" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Schedule */}
          <div className="lg:col-span-1 bg-white rounded-xl p-7 border border-border">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center text-lg shrink-0">🕐</div>
              <h3 className="font-serif font-semibold text-navy">Giờ Làm Việc</h3>
            </div>
            {schedule && schedule.length > 0 ? (
              <ScheduleDisplay schedule={schedule} />
            ) : (
              <p className="text-brown-muted text-sm">Vui lòng cập nhật trong Sanity Studio</p>
            )}
          </div>

          {/* Map + Address + Contact */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Map */}
            {embedUrl && (
              <div className="rounded-xl overflow-hidden border border-border h-56 sm:h-72">
                <iframe
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ phòng khám"
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Address */}
              <div className="bg-white rounded-xl p-7 border border-border text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center text-lg shrink-0">📍</div>
                  <h3 className="font-serif font-semibold text-navy">Địa Chỉ</h3>
                </div>
                {address ? (
                  <a
                    href={mapsUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-brown-muted hover:text-navy transition-colors leading-relaxed block"
                  >
                    {address}
                  </a>
                ) : (
                  <p className="text-brown-muted text-sm">Vui lòng cập nhật trong Sanity Studio</p>
                )}
              </div>

              {/* Contact: Phone */}
              <div className="bg-white rounded-xl p-7 border border-border text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center text-lg shrink-0">📞</div>
                  <h3 className="font-serif font-semibold text-navy">Liên Hệ</h3>
                </div>
                {phone ? (
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm font-medium text-navy hover:text-gold transition-colors">
                    {phone}
                  </a>
                ) : (
                  <p className="text-brown-muted text-sm">Vui lòng cập nhật trong Sanity Studio</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
