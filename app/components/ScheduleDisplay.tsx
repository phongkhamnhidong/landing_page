"use client"

type Slot = { openTime?: string; closeTime?: string }

type DaySchedule = {
  day: string
  slots?: Slot[]
  openTime?: string   // legacy field
  closeTime?: string  // legacy field
  isClosed?: boolean
}

type Props = {
  schedule: DaySchedule[]
}

const DAY_LABELS: Record<string, string> = {
  monday:    "Thứ Hai",
  tuesday:   "Thứ Ba",
  wednesday: "Thứ Tư",
  thursday:  "Thứ Năm",
  friday:    "Thứ Sáu",
  saturday:  "Thứ Bảy",
  sunday:    "Chủ Nhật",
}

const DAY_INDEX: Record<number, string> = {
  0: "sunday", 1: "monday", 2: "tuesday", 3: "wednesday",
  4: "thursday", 5: "friday", 6: "saturday",
}

function formatCurrentDate() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, "0")
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const year = now.getFullYear()
  const weekday = DAY_LABELS[DAY_INDEX[now.getDay()]] ?? ""
  return `${weekday}, ngày ${day} tháng ${month} năm ${year}`
}

export default function ScheduleDisplay({ schedule }: Props) {
  const todayKey = DAY_INDEX[new Date().getDay()]

  // Normalise: prefer slots[] if present, otherwise fall back to legacy openTime/closeTime
  const normalised = schedule.map((item) => {
    const slots =
      item.slots && item.slots.length > 0
        ? item.slots
        : item.openTime || item.closeTime
          ? [{ openTime: item.openTime, closeTime: item.closeTime }]
          : []
    return { ...item, slots }
  })

  // Merge entries with the same day
  const merged = normalised.reduce<DaySchedule[]>((acc, item) => {
    const existing = acc.find((e) => e.day === item.day)
    if (existing) {
      existing.slots = [...(existing.slots ?? []), ...(item.slots ?? [])]
    } else {
      acc.push({ ...item })
    }
    return acc
  }, [])

  return (
    <div>
      {/* Current date */}
      <p className="text-xs text-brown-muted/60 mb-4 font-medium text-center lg:text-left">{formatCurrentDate()}</p>

      <div className="divide-y divide-border">
        {merged.map((item) => {
          const isToday = item.day === todayKey
          return (
            <div
              key={item.day}
              className={`flex items-start justify-between py-2.5 px-3 rounded-lg ${
                isToday ? "bg-gold/10" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                {isToday && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-0.5" />}
                <span className={`text-sm ${isToday ? "text-navy font-semibold" : "text-brown-muted"}`}>
                  {DAY_LABELS[item.day] ?? item.day}
                </span>
              </div>

              <div className="text-right">
                {item.isClosed ? (
                  <span className="text-sm text-brown-muted/50 italic">Nghỉ</span>
                ) : item.slots && item.slots.length > 0 ? (
                  item.slots.map((slot, i) => (
                    <div
                      key={i}
                      className={`text-sm ${isToday ? "text-navy font-semibold" : "text-brown-muted"}`}
                    >
                      {slot.openTime ?? "?"} – {slot.closeTime ?? "?"}
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-brown-muted/50 italic">—</span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
