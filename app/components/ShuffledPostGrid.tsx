"use client"

import { useEffect, useState } from "react"
import PostCard from "./PostCard"

type Post = {
  title?: string
  slug?: string
  mainImage?: { asset?: unknown; alt?: string }
  publishedAt?: string
  categoryTitle?: string
}

export default function ShuffledPostGrid({ posts, show = 3 }: { posts: Post[]; show?: number }) {
  // Start with the first `show` items (matches SSR), shuffle after mount
  const [display, setDisplay] = useState<Post[]>(posts.slice(0, show))

  useEffect(() => {
    const copy = [...posts]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    setDisplay(copy.slice(0, show))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {display.map((post) => <PostCard key={post.slug} post={post} />)}
    </div>
  )
}
