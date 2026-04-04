type PortableTextBlock = {
  _type: string
  children?: { text?: string }[]
}

// Extract plain text from Sanity PortableText body
function extractText(body: PortableTextBlock[]): string {
  return body
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .flatMap((block) => block.children?.map((span) => span.text ?? "") ?? [])
    .join(" ")
}

// Vietnamese average reading speed ~200 wpm
export function estimateReadingTime(body?: PortableTextBlock[]): number {
  if (!body || body.length === 0) return 1
  const text = extractText(body)
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}
