import NavbarWrapper from "@/app/components/NavbarWrapper"
import Footer from "@/app/components/Footer"
import PageTransition from "@/app/components/PageTransition"
import { client } from "@/sanity/lib/client"
import { clinicInfoQuery } from "@/app/lib/queries"

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const clinicInfo = await client.fetch(clinicInfoQuery)

  return (
    <>
      <NavbarWrapper />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer clinicName={clinicInfo?.clinicName} />
    </>
  )
}
