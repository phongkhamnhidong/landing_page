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
import MobileGallery from "@/app/components/MobileGallery"
import LatestKienThucSection from "@/app/components/LatestKienThucSection"
import LatestNewsSection from "@/app/components/LatestNewsSection"
import LatestFAQSection from "@/app/components/LatestFAQSection"
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
        galleryImages={clinicInfo?.galleryImages}
      />
      <FadeInView>
        <DoctorSection doctor={doctor} />
      </FadeInView>
      {clinicInfo?.galleryImages?.length > 0 && (
        <FadeInView>
          <MobileGallery images={clinicInfo.galleryImages} />
        </FadeInView>
      )}
      <FadeInView>
        <WorkingHoursSection
          schedule={clinicInfo?.schedule}
          address={clinicInfo?.address}
          phone={clinicInfo?.phone}
          zalo={clinicInfo?.zalo}
          facebook={clinicInfo?.facebook}
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
    </>
  )
}
