import { client } from "@/sanity/lib/client"
import { clinicInfoQuery, categoriesQuery } from "@/app/lib/queries"
import NavbarClient from "./NavbarClient"

export default async function NavbarWrapper() {
  const [clinicInfo, categories] = await Promise.all([
    client.fetch(clinicInfoQuery),
    client.fetch(categoriesQuery),
  ])

  return (
    <NavbarClient
      clinicName={clinicInfo?.clinicName ?? "Phòng Khám Nhi Đồng"}
      phone={clinicInfo?.phone}
      categories={categories ?? []}
    />
  )
}
