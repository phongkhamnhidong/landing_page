import type { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"
import { allPostSlugsQuery, allCategorySlugsQuery, allTinTucCategorySlugsQuery } from "@/app/lib/queries"

const BASE_URL = "https://phongkhamnhidong.vn"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [postSlugs, kienThucCats, tinTucCats] = await Promise.all([
    client.fetch(allPostSlugsQuery),
    client.fetch(allCategorySlugsQuery),
    client.fetch(allTinTucCategorySlugsQuery),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1, changeFrequency: "weekly" },
    { url: `${BASE_URL}/gioi-thieu`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/kien-thuc`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/tin-tuc`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${BASE_URL}/hoi-dap`, priority: 0.7, changeFrequency: "weekly" },
    { url: `${BASE_URL}/lien-he`, priority: 0.6, changeFrequency: "monthly" },
  ]

  const postPages: MetadataRoute.Sitemap = postSlugs.map(({ slug }: { slug: string }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }))

  const kienThucCatPages: MetadataRoute.Sitemap = kienThucCats.map(({ slug }: { slug: string }) => ({
    url: `${BASE_URL}/kien-thuc/${slug}`,
    priority: 0.6,
    changeFrequency: "weekly" as const,
  }))

  const tinTucCatPages: MetadataRoute.Sitemap = tinTucCats.map(({ slug }: { slug: string }) => ({
    url: `${BASE_URL}/tin-tuc/${slug}`,
    priority: 0.6,
    changeFrequency: "weekly" as const,
  }))

  return [...staticPages, ...postPages, ...kienThucCatPages, ...tinTucCatPages]
}
