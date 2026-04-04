import Link from "next/link"
import Image from "next/image"

type Props = {
  clinicName?: string
  motto?: string
  phone?: string
  zalo?: string
  facebook?: string
}

export default function Footer({ clinicName, motto, phone, zalo, facebook }: Props) {
  const zaloHref = zalo
    ? zalo.startsWith("http") ? zalo : `https://zalo.me/${zalo.replace(/\s/g, "")}`
    : null

  return (
    <footer className="bg-navy text-cream/80 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Clinic info */}
          <div className="text-center sm:text-left">
            <h3 className="font-serif text-cream font-semibold text-base mb-3">
              {clinicName ?? "Phòng Khám Nhi Đồng"}
            </h3>
            {motto && (
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">{motto}</p>
            )}
          </div>

          {/* Quick links */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-cream mb-3">Liên kết nhanh</h3>
            <ul className="space-y-2 text-xs">
              {[
                ["Trang Chủ", "/"],
                ["Giới Thiệu", "/gioi-thieu"],
                ["Kiến Thức", "/kien-thuc"],
                ["Tin Tức", "/tin-tuc"],
                ["Hỏi Đáp", "/hoi-dap"],
                ["Liên Hệ", "/lien-he"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-gold transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social / contact */}
          <div className="text-center sm:text-left">
            <h3 className="font-semibold text-cream mb-3">Theo dõi chúng tôi</h3>
            <ul className="space-y-3 text-xs">
              {phone && (
                <li>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center justify-center sm:justify-start gap-2 hover:text-gold transition-colors">
                    <span className="text-sm">📞</span> {phone}
                  </a>
                </li>
              )}
              {zaloHref && (
                <li>
                  <a href={zaloHref} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 hover:text-gold transition-colors">
                    <Image src="/zalo_logo.png" alt="Zalo" width={16} height={16} className="shrink-0" />
                    Zalo: {zalo}
                  </a>
                </li>
              )}
              {facebook && (
                <li>
                  <a href={facebook} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:justify-start gap-2 hover:text-gold transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                </li>
              )}
              {!phone && !zaloHref && !facebook && (
                <li className="text-cream/40">Chưa cập nhật</li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          © {new Date().getFullYear()} {clinicName ?? "Phòng Khám Nhi Đồng"}. Bảo lưu mọi quyền.
        </div>
      </div>
    </footer>
  )
}
