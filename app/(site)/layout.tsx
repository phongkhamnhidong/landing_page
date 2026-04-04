import NavbarWrapper from "@/app/components/NavbarWrapper"
import Footer from "@/app/components/Footer"
import { client } from "@/sanity/lib/client"
import { clinicInfoQuery } from "@/app/lib/queries"

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const clinicInfo = await client.fetch(clinicInfoQuery)

  return (
    <>
      <NavbarWrapper />
      <main className="flex-1">{children}</main>
      <Footer clinicName={clinicInfo?.clinicName} />
    </>
  )
}
