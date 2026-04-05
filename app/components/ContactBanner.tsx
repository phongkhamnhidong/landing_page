import Link from "next/link"

type Props = {
  phone?: string
  address?: string
}

export default function ContactBanner({ phone, address }: Props) {
  return (
    <div className="my-12 rounded-2xl bg-navy px-6 py-7 text-center">
      <p className="text-cream text-sm leading-relaxed">
        Liên hệ <span className="font-semibold text-gold">Bác sĩ Minh Nguyệt</span> để được tư vấn và điều trị sớm nhất qua{" "}
        {phone ? (
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold text-gold hover:underline">
            {phone}
          </a>
        ) : (
          <span className="font-semibold text-gold">SĐT</span>
        )}
        .
      </p>
      <Link
        href="/#gio-lam-viec"
        className="inline-flex items-center gap-2 mt-4 text-xs font-semibold uppercase tracking-widest text-gold border border-gold/40 px-5 py-2 rounded-full hover:bg-gold/10 transition-colors"
      >
        Xem giờ làm việc & địa chỉ
      </Link>
    </div>
  )
}
