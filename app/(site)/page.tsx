import { client } from "@/sanity/lib/client"
import {
  clinicInfoQuery,
  doctorQuery,
  latestKienThucQuery,
  latestTinTucQuery,
  latestFaqQuery,
} from "@/app/lib/queries"
import HeroSection from "@/app/components/HeroSection"
import WorkingHoursSection from "@/app/components/WorkingHoursSection"
import DoctorSection from "@/app/components/DoctorSection"
import LatestKienThucSection from "@/app/components/LatestKienThucSection"
import LatestNewsSection from "@/app/components/LatestNewsSection"
import LatestFAQSection from "@/app/components/LatestFAQSection"
import ContactSection from "@/app/components/ContactSection"

export const revalidate = 60

export default async function HomePage() {
  const [clinicInfo, doctor, kienThucPosts, tinTucPosts, faqs] = await Promise.all([
    client.fetch(clinicInfoQuery),
    client.fetch(doctorQuery),
    client.fetch(latestKienThucQuery),
    client.fetch(latestTinTucQuery),
    client.fetch(latestFaqQuery),
  ])

  return (
    <>
      <HeroSection
        clinicName={clinicInfo?.clinicName}
        tagline={clinicInfo?.tagline}
        phone={clinicInfo?.phone}
      />
      <WorkingHoursSection
        openingHours={clinicInfo?.openingHours}
        address={clinicInfo?.address}
        phone={clinicInfo?.phone}
      />
      <DoctorSection doctor={doctor} />
      <LatestKienThucSection posts={kienThucPosts} />
      <LatestNewsSection posts={tinTucPosts} />
      <LatestFAQSection faqs={faqs} />
      <ContactSection
        phone={clinicInfo?.phone}
        email={clinicInfo?.email}
        address={clinicInfo?.address}
        openingHours={clinicInfo?.openingHours}
      />
    </>
  )
}
