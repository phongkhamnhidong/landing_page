type Props = {
  clinicName?: string
  phone?: string
}

export default function Navbar({ clinicName, phone }: Props) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-blue-700 font-bold text-lg tracking-tight">
            {clinicName ?? "Phòng Khám Nhi Đồng"}
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#about" className="hover:text-blue-700 transition-colors">Về chúng tôi</a>
            <a href="#doctor" className="hover:text-blue-700 transition-colors">Bác sĩ</a>
            <a href="#blog" className="hover:text-blue-700 transition-colors">Blog</a>
            <a href="#contact" className="hover:text-blue-700 transition-colors">Liên hệ</a>
          </div>
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-800 transition-colors"
            >
              Gọi ngay
            </a>
          )}
        </div>
      </div>
    </nav>
  )
}
