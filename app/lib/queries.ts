// Clinic info (nav, hero, contact)
export const clinicInfoQuery = `*[_type == "clinicInfo"][0]{
  clinicName,
  motto,
  tagline,
  phone,
  email,
  address,
  schedule[]{day, isClosed, openTime, closeTime, slots[]{openTime, closeTime}}
}`

// Categories for nav dropdown + listing page
export const categoriesQuery = `*[_type == "category"] | order(title asc){
  title,
  "slug": slug.current,
  description
}`

// Doctor (homepage card + gioi-thieu page)
export const doctorQuery = `*[_type == "doctor"][0]{
  name,
  title,
  qualifications,
  shortBio,
  treatmentAreas,
  achievements,
  photo
}`

// Latest 3 kienThuc posts for homepage
export const latestKienThucQuery = `*[_type == "post" && section == "kienThuc"] | order(publishedAt desc)[0...3]{
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categoryTitle": categories[0]->title
}`

// Latest 3 tinTuc posts for homepage
export const latestTinTucQuery = `*[_type == "post" && section == "tinTuc"] | order(publishedAt desc)[0...3]{
  title,
  "slug": slug.current,
  mainImage,
  publishedAt
}`

// Latest 3 FAQs for homepage
export const latestFaqQuery = `*[_type == "faq"] | order(publishedAt desc)[0...3]{
  _id,
  question,
  answer
}`

// All kienThuc posts (listing page)
export const allKienThucQuery = `*[_type == "post" && section == "kienThuc"] | order(publishedAt desc){
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categoryTitle": categories[0]->title,
  "categorySlug": categories[0]->slug.current
}`

// Posts by category slug
export const postsByCategoryQuery = `*[_type == "post" && section == "kienThuc" && $categorySlug in categories[]->slug.current] | order(publishedAt desc){
  title,
  "slug": slug.current,
  mainImage,
  publishedAt
}`

// Category by slug (for page title)
export const categoryBySlugQuery = `*[_type == "category" && slug.current == $slug][0]{
  title,
  description
}`

// All tinTuc posts (listing page)
export const allTinTucQuery = `*[_type == "post" && section == "tinTuc"] | order(publishedAt desc){
  title,
  "slug": slug.current,
  mainImage,
  publishedAt
}`

// All FAQs
export const allFaqQuery = `*[_type == "faq"] | order(publishedAt desc){
  _id,
  question,
  answer,
  publishedAt,
  "categoryTitle": category->title
}`

// All web links
export const webLinksQuery = `*[_type == "webLink"] | order(order asc){
  _id,
  name,
  url,
  platform,
  description
}`

// Single post by slug
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  section,
  mainImage,
  publishedAt,
  body,
  "authorName": author->name,
  "categoryTitle": categories[0]->title,
  "categorySlug": categories[0]->slug.current
}`

// All post slugs (for generateStaticParams)
export const allPostSlugsQuery = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`

// All category slugs (for generateStaticParams)
export const allCategorySlugsQuery = `*[_type == "category" && defined(slug.current)]{ "slug": slug.current }`
