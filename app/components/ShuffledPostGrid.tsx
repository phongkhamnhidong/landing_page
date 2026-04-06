"use client"

import { useMemo } from "react"
import PostCard from "./PostCard"

type Post = {
  title?: string
  slug?: string
  mainImage?: { asset?: unknown; alt?: string }
  publishedAt?: string
  categoryTitle?: string
}

export default function ShuffledPostGrid({ posts, show = 3 }: { posts: Post[]; show?: number }) {
  const shuffled = useMemo(() => {
    const copy = [...posts]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy.slice(0, show)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
      {shuffled.map((post) => <PostCard key={post.slug} post={post} />)}
    </div>
  )
}
