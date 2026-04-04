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
import FadeInView from "@/app/components/FadeInView"

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
        motto={clinicInfo?.motto}
        tagline={clinicInfo?.tagline}
        phone={clinicInfo?.phone}
      />
      <FadeInView>
        <DoctorSection doctor={doctor} />
      </FadeInView>
      <FadeInView>
        <WorkingHoursSection
          openingHours={clinicInfo?.openingHours}
          address={clinicInfo?.address}
          phone={clinicInfo?.phone}
        />
      </FadeInView>
      <FadeInView>
        <LatestKienThucSection posts={kienThucPosts} />
      </FadeInView>
      <FadeInView>
        <LatestNewsSection posts={tinTucPosts} />
      </FadeInView>
      <FadeInView>
        <LatestFAQSection faqs={faqs} />
      </FadeInView>
      <FadeInView>
        <ContactSection
          phone={clinicInfo?.phone}
          email={clinicInfo?.email}
          address={clinicInfo?.address}
          openingHours={clinicInfo?.openingHours}
        />
      </FadeInView>
    </>
  )
}
