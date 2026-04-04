import { client } from "@/sanity/lib/client"
import { clinicInfoQuery, categoriesQuery, tinTucCategoriesQuery } from "@/app/lib/queries"
import NavbarClient from "./NavbarClient"

export default async function NavbarWrapper() {
  const [clinicInfo, kienThucCategories, tinTucCategories] = await Promise.all([
    client.fetch(clinicInfoQuery),
    client.fetch(categoriesQuery),
    client.fetch(tinTucCategoriesQuery),
  ])

  return (
    <NavbarClient
      clinicName={clinicInfo?.clinicName ?? "Phòng Khám Nhi Đồng"}
      phone={clinicInfo?.phone}
      categories={kienThucCategories ?? []}
      tinTucCategories={tinTucCategories ?? []}
    />
  )
}
