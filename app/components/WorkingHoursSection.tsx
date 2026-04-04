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
}

export default function WorkingHoursSection({ schedule, address, phone }: Props) {
  const mapsUrl = address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : null

  return (
    <section className="py-20 bg-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Thông tin" title="Giờ Làm Việc & Địa Chỉ" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          {/* Schedule */}
          <div className="sm:col-span-2 bg-white rounded-xl p-7 border border-border">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center text-lg shrink-0">🕐</div>
              <h3 className="font-serif font-semibold text-navy">Giờ Làm Việc</h3>
            </div>
            {schedule && schedule.length > 0 ? (
              <ScheduleDisplay schedule={schedule} />
            ) : (
              <p className="text-brown-muted text-sm">Vui lòng cập nhật trong Sanity Studio</p>
            )}
          </div>

          {/* Address + Phone */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-xl p-7 border border-border flex-1">
              <div className="flex items-center gap-3 mb-4">
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

            {phone && (
              <div className="bg-white rounded-xl p-7 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center text-lg shrink-0">📞</div>
                  <h3 className="font-serif font-semibold text-navy">Liên Hệ</h3>
                </div>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="text-sm text-navy font-medium hover:text-gold transition-colors"
                >
                  {phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
