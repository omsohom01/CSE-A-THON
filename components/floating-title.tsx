"use client"

import { motion } from "framer-motion"

interface FloatingTitleProps {
  text: string
  className?: string
}

export default function FloatingTitle({ text, className = "" }: FloatingTitleProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [0, -10, 0],
        filter: [
          "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
          "drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))",
          "drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))",
        ],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.div>
  )
}
