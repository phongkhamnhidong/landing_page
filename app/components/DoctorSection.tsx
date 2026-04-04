import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import SectionHeader from "./SectionHeader"

type Doctor = {
  name?: string
  title?: string
  qualifications?: string
  shortBio?: string
  achievements?: string[]
  photo?: { asset?: unknown; alt?: string }
}

type Props = { doctor?: Doctor }

export default function DoctorSection({ doctor }: Props) {
  if (!doctor) return null

  const photoUrl = doctor.photo?.asset
    ? urlFor(doctor.photo as Parameters<typeof urlFor>[0]).width(500).height(600).fit("crop").url()
    : null

  return (
    <section id="bac-si" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Đội ngũ" title="Bác Sĩ Phụ Trách" />

        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-border overflow-hidden shadow-sm mt-10">
          <div className="flex flex-col sm:flex-row">
            {/* Photo */}
            <div className="sm:w-56 shrink-0">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={doctor.photo?.alt ?? doctor.name ?? "Bác sĩ"}
                  width={500}
                  height={600}
                  className="w-full h-64 sm:h-full object-cover"
                />
              ) : (
                <div className="w-full h-64 sm:h-full bg-beige flex items-center justify-center">
                  <span className="text-5xl opacity-30">👩‍⚕️</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col justify-center">
              <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-1">
                {doctor.title ?? "Bác sĩ Nhi khoa"}
              </p>
              <h3 className="font-serif text-2xl font-semibold text-navy mb-1">
                {doctor.name}
              </h3>
              {doctor.qualifications && (
                <p className="text-brown-muted text-sm mb-4">{doctor.qualifications}</p>
              )}

              {/* Gold rule */}
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-6 bg-gold" />
                <div className="h-1 w-1 rounded-full bg-gold" />
              </div>

              {doctor.shortBio && (
                <p className="text-brown-muted text-sm leading-relaxed mb-4">{doctor.shortBio}</p>
              )}

              {doctor.achievements && doctor.achievements.length > 0 && (
                <ul className="space-y-1.5">
                  {doctor.achievements.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-brown-muted">
                      <span className="text-gold mt-0.5">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
