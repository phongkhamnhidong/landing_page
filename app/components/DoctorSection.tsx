import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import SectionHeader from "./SectionHeader"

type Doctor = {
  name?: string
  title?: string
  titles?: string[]
  qualifications?: string
  shortBio?: string
  treatmentAreas?: string[]
  achievements?: string[]
  photo?: { asset?: unknown; alt?: string }
}

type Props = { doctor?: Doctor }

export default function DoctorSection({ doctor }: Props) {
  if (!doctor) return null

  const photoUrl = doctor.photo?.asset
    ? urlFor(doctor.photo as Parameters<typeof urlFor>[0]).width(600).height(700).fit("crop").url()
    : null

  return (
    <section id="bac-si" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Đội ngũ" title="Bác Sĩ Phụ Trách" />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-0 bg-beige rounded-2xl border border-border overflow-hidden shadow-sm">

          {/* Photo — 2/5 width */}
          <div className="lg:col-span-2">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={doctor.photo?.alt ?? doctor.name ?? "Bác sĩ"}
                width={600}
                height={700}
                className="w-full h-96 lg:h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-96 lg:h-full bg-beige-dark flex items-center justify-center">
                <span className="text-6xl opacity-20">👩‍⚕️</span>
              </div>
            )}
          </div>

          {/* Info — 3/5 width */}
          <div className="lg:col-span-3 p-8 lg:p-10 bg-white text-center lg:text-left">
            {/* Titles as badges */}
            {(doctor.titles && doctor.titles.length > 0) ? (
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-3">
                {doctor.titles.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-semibold uppercase tracking-[0.15em] text-white bg-navy px-3 py-1.5 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            ) : doctor.title ? (
              <p className="text-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">
                {doctor.title}
              </p>
            ) : null}
            <h3 className="font-serif text-3xl font-semibold text-navy mb-1">
              {doctor.name ?? "Bác sĩ Minh Nguyệt"}
            </h3>
            {doctor.qualifications && (
              <p className="text-brown-muted text-sm mb-4">{doctor.qualifications}</p>
            )}

            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="h-px w-10 bg-gold" />
              <div className="h-1.5 w-1.5 rounded-full bg-gold" />
              <div className="h-px w-10 bg-gold" />
            </div>

            {doctor.shortBio && (
              <p className="text-brown-muted text-sm leading-relaxed mb-6">{doctor.shortBio}</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Treatment areas */}
              {doctor.treatmentAreas && doctor.treatmentAreas.length > 0 && (
                <div>
                  <h4 className="font-semibold text-navy text-xs uppercase tracking-widest mb-3">
                    Lĩnh vực điều trị
                  </h4>
                  <ul className="space-y-1.5">
                    {doctor.treatmentAreas.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-brown-muted">
                        <span className="text-gold text-xs mt-1 shrink-0">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements */}
              {doctor.achievements && doctor.achievements.length > 0 && (
                <div>
                  <h4 className="font-semibold text-navy text-xs uppercase tracking-widest mb-3">
                    Thành tích
                  </h4>
                  <ul className="space-y-1.5">
                    {doctor.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-brown-muted">
                        <span className="text-gold text-xs mt-1 shrink-0">✦</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
