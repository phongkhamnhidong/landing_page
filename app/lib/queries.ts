// Clinic info (nav, hero, contact)
export const clinicInfoQuery = `*[_type == "clinicInfo"][0]{
  clinicName,
  motto,
  tagline,
  phone,
  email,
  zalo,
  facebook,
  address,
  schedule[]{day, isClosed, openTime, closeTime, slots[]{openTime, closeTime}},
  galleryImages[]{ "url": asset->url, alt },
  about
}`

// Kiến Thức categories for nav dropdown + listing page
export const categoriesQuery = `*[_type == "category" && section == "kienThuc"] | order(title asc){
  title,
  "slug": slug.current,
  description
}`

// Tin Tức categories for nav dropdown + listing page
export const tinTucCategoriesQuery = `*[_type == "category" && section == "tinTuc"] | order(title asc){
  title,
  "slug": slug.current,
  description
}`

// Doctor (homepage card + gioi-thieu page)
export const doctorQuery = `*[_type == "doctor"][0]{
  name,
  title,
  titles,
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

// Kiến Thức post search
export const kienThucSearchQuery = `*[_type == "post" && section == "kienThuc" && title match $q] | order(publishedAt desc){
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categoryTitle": categories[0]->title,
  "categorySlug": categories[0]->slug.current
}`

// Tin Tức post search
export const tinTucSearchQuery = `*[_type == "post" && section == "tinTuc" && title match $q] | order(publishedAt desc){
  title,
  "slug": slug.current,
  mainImage,
  publishedAt
}`

// All kienThuc posts (listing page)
export const allKienThucQuery = `*[_type == "post" && section == "kienThuc"] | order(publishedAt desc)[0...9]{
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categoryTitle": categories[0]->title,
  "categorySlug": categories[0]->slug.current
}`

// Posts by category slug (Kiến Thức) — paginated
export const postsByCategoryQuery = `*[_type == "post" && section == "kienThuc" && $categorySlug in categories[]->slug.current] | order(publishedAt desc)[$from...$to]{
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categoryTitle": categories[0]->title,
  "categorySlug": categories[0]->slug.current
}`
export const postsByCategoryCountQuery = `count(*[_type == "post" && section == "kienThuc" && $categorySlug in categories[]->slug.current])`
export const postsByCategorySearchQuery = `*[_type == "post" && section == "kienThuc" && $categorySlug in categories[]->slug.current && title match $q] | order(publishedAt desc){
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categoryTitle": categories[0]->title,
  "categorySlug": categories[0]->slug.current
}`

// Posts by category slug (Tin Tức) — paginated
export const tinTucPostsByCategoryQuery = `*[_type == "post" && section == "tinTuc" && $categorySlug in categories[]->slug.current] | order(publishedAt desc)[$from...$to]{
  title,
  "slug": slug.current,
  mainImage,
  publishedAt
}`
export const tinTucPostsByCategoryCountQuery = `count(*[_type == "post" && section == "tinTuc" && $categorySlug in categories[]->slug.current])`
export const tinTucPostsByCategorySearchQuery = `*[_type == "post" && section == "tinTuc" && $categorySlug in categories[]->slug.current && title match $q] | order(publishedAt desc){
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
export const allTinTucQuery = `*[_type == "post" && section == "tinTuc"] | order(publishedAt desc)[0...9]{
  title,
  "slug": slug.current,
  mainImage,
  publishedAt
}`

// FAQ count (for pagination, no search)
export const faqCountQuery = `count(*[_type == "faq"])`

// FAQ count with search
export const faqSearchCountQuery = `count(*[_type == "faq" && question match $q])`

// Paginated FAQs (questions only, no answer)
export const faqPageQuery = `*[_type == "faq"] | order(publishedAt desc)[$from...$to]{
  _id,
  question,
  publishedAt,
  "categoryTitle": category->title
}`

// Paginated FAQs with search
export const faqSearchPageQuery = `*[_type == "faq" && question match $q] | order(publishedAt desc)[$from...$to]{
  _id,
  question,
  publishedAt,
  "categoryTitle": category->title
}`

// Related FAQs (same category, fallback any, exclude current)
export const relatedFaqsQuery = `*[
  _type == "faq" &&
  _id != $id &&
  ($categoryRef == null || category._ref == $categoryRef)
] | order(publishedAt desc)[0...4]{
  _id,
  question,
  "categoryTitle": category->title
}`

// Single FAQ by id (detail page)
export const faqByIdQuery = `*[_type == "faq" && _id == $id][0]{
  _id,
  question,
  answer[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions
    }
  },
  publishedAt,
  submitterName,
  "categoryTitle": category->title,
  "categoryRef": category._ref
}`

// All FAQs (legacy, used by homepage widget)
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
  body[]{
    ...,
    _type == "image" => {
      ...,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions
    }
  },
  references[]{title, url},
  "authorName": author->name,
  isExternalSource,
  sourceName,
  "categoryTitle": categories[0]->title,
  "categorySlug": categories[0]->slug.current
}`

// Related posts (same category first, fallback same section, exclude current)
export const relatedPostsQuery = `*[
  _type == "post" &&
  slug.current != $slug &&
  section == $section &&
  ($categorySlug == null || $categorySlug in categories[]->slug.current)
] | order(publishedAt desc)[0...3]{
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  "categoryTitle": categories[0]->title,
  "categorySlug": categories[0]->slug.current
}`

// All post slugs (for generateStaticParams)
export const allPostSlugsQuery = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`

// All Kiến Thức category slugs (for generateStaticParams)
export const allCategorySlugsQuery = `*[_type == "category" && section == "kienThuc" && defined(slug.current)]{ "slug": slug.current }`

// All Tin Tức category slugs (for generateStaticParams)
export const allTinTucCategorySlugsQuery = `*[_type == "category" && section == "tinTuc" && defined(slug.current)]{ "slug": slug.current }`
