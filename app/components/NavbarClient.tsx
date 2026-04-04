"use client"

import { useState } from "react"
import Link from "next/link"
import ClinicLogo from "./ClinicLogo"

type Category = { title: string; slug: string }

type Props = {
  clinicName: string
  phone?: string
  categories: Category[]
  tinTucCategories: Category[]
}

export default function NavbarClient({ clinicName, phone, categories, tinTucCategories }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [kienThucOpen, setKienThucOpen] = useState(false)
  const [tinTucOpen, setTinTucOpen] = useState(false)

  const navLinks = [
    { label: "Trang Chủ", href: "/" },
    { label: "Giới Thiệu", href: "/gioi-thieu" },
    { label: "Hỏi Đáp", href: "/hoi-dap" },
    { label: "Liên Hệ", href: "/lien-he" },
  ]

  const ChevronIcon = ({ open }: { open?: boolean }) => (
    <svg className={`w-3 h-3 mt-0.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )

  const DropdownMenu = ({ items, basePath }: { items: Category[]; basePath: string }) => (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      <div className="bg-white border border-border rounded-xl shadow-lg p-4 w-72">
        <div className="grid grid-cols-2 gap-1">
          {items.map((cat) => (
            <Link
              key={cat.slug}
              href={`${basePath}/${cat.slug}`}
              className="text-xs text-brown-muted hover:text-navy hover:bg-beige px-3 py-2 rounded-lg transition-colors"
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <ClinicLogo size={38} />
            <span className="font-serif text-navy font-semibold text-lg leading-tight">{clinicName}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-brown-muted">
            <Link href="/" className="hover:text-navy transition-colors">Trang Chủ</Link>
            <Link href="/gioi-thieu" className="hover:text-navy transition-colors">Giới Thiệu</Link>

            {/* Kiến Thức dropdown */}
            <div className="relative group">
              <Link href="/kien-thuc" className="flex items-center gap-1 hover:text-navy transition-colors">
                Kiến Thức <ChevronIcon />
              </Link>
              {categories.length > 0 && <DropdownMenu items={categories} basePath="/kien-thuc" />}
            </div>

            {/* Tin Tức dropdown */}
            <div className="relative group">
              <Link href="/tin-tuc" className="flex items-center gap-1 hover:text-navy transition-colors">
                Tin Tức <ChevronIcon />
              </Link>
              {tinTucCategories.length > 0 && <DropdownMenu items={tinTucCategories} basePath="/tin-tuc" />}
            </div>

            <Link href="/hoi-dap" className="hover:text-navy transition-colors">Hỏi Đáp</Link>
            <Link href="/lien-he" className="hover:text-navy transition-colors">Liên Hệ</Link>
          </div>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            {phone && (
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="hidden sm:flex items-center gap-1.5 bg-navy text-cream text-sm font-medium px-4 py-2 rounded-full hover:bg-navy-light transition-colors"
              >
                <span>📞</span> {phone}
              </a>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-brown-muted hover:bg-beige transition-colors"
              aria-label="Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border py-4 space-y-1">
            <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-brown-muted hover:text-navy hover:bg-beige rounded-lg transition-colors">Trang Chủ</Link>
            <Link href="/gioi-thieu" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-brown-muted hover:text-navy hover:bg-beige rounded-lg transition-colors">Giới Thiệu</Link>

            {/* Kiến Thức accordion */}
            <div>
              <button
                onClick={() => setKienThucOpen(!kienThucOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-brown-muted hover:text-navy hover:bg-beige rounded-lg transition-colors"
              >
                <span>Kiến Thức</span>
                <ChevronIcon open={kienThucOpen} />
              </button>
              {kienThucOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {categories.map((cat) => (
                    <Link key={cat.slug} href={`/kien-thuc/${cat.slug}`} onClick={() => setMobileOpen(false)}
                      className="block px-4 py-1.5 text-xs text-brown-muted hover:text-navy hover:bg-beige rounded-lg transition-colors">
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tin Tức accordion */}
            <div>
              <button
                onClick={() => setTinTucOpen(!tinTucOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-brown-muted hover:text-navy hover:bg-beige rounded-lg transition-colors"
              >
                <span>Tin Tức</span>
                <ChevronIcon open={tinTucOpen} />
              </button>
              {tinTucOpen && tinTucCategories.length > 0 && (
                <div className="ml-4 mt-1 space-y-1">
                  {tinTucCategories.map((cat) => (
                    <Link key={cat.slug} href={`/tin-tuc/${cat.slug}`} onClick={() => setMobileOpen(false)}
                      className="block px-4 py-1.5 text-xs text-brown-muted hover:text-navy hover:bg-beige rounded-lg transition-colors">
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/hoi-dap" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-brown-muted hover:text-navy hover:bg-beige rounded-lg transition-colors">Hỏi Đáp</Link>
            <Link href="/lien-he" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-brown-muted hover:text-navy hover:bg-beige rounded-lg transition-colors">Liên Hệ</Link>

            {phone && (
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="block mx-4 mt-3 text-center bg-navy text-cream text-sm font-medium py-2.5 rounded-full">
                📞 {phone}
              </a>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
