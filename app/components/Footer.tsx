import Link from "next/link"

type Props = {
  clinicName?: string
}

export default function Footer({ clinicName }: Props) {
  return (
    <footer className="bg-navy text-cream/80 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div>
            <h3 className="font-serif text-cream font-semibold text-base mb-3">
              {clinicName ?? "Phòng Khám Nhi Đồng"}
            </h3>
            <p className="text-cream/60 text-xs leading-relaxed">
              Chăm sóc sức khỏe toàn diện cho trẻ em với sự tận tâm và chuyên nghiệp.
            </p>
          </div>

          <div>
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

          <div>
            <h3 className="font-semibold text-cream mb-3">Theo dõi chúng tôi</h3>
            <Link
              href="/lien-ket-web"
              className="text-xs hover:text-gold transition-colors"
            >
              Xem các kênh mạng xã hội →
            </Link>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 text-center text-xs text-cream/40">
          © {new Date().getFullYear()} {clinicName ?? "Phòng Khám Nhi Đồng"}. Bảo lưu mọi quyền.
        </div>
      </div>
    </footer>
  )
}
