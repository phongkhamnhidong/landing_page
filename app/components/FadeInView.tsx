"use client"

import { motion } from "framer-motion"

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "left" | "none"
}

export default function FadeInView({ children, className, delay = 0, direction = "up" }: Props) {
  const initial =
    direction === "up"   ? { opacity: 0, y: 28 } :
    direction === "left" ? { opacity: 0, x: -20 } :
                           { opacity: 0 }

  const animate =
    direction === "up"   ? { opacity: 1, y: 0 } :
    direction === "left" ? { opacity: 1, x: 0 } :
                           { opacity: 1 }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
