"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Randomly trigger glitch effect
    const glitchInterval = setInterval(
      () => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      },
      Math.random() * 5000 + 3000,
    )

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <div className={`relative ${className}`}>
      {/* Base text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-blue-400 z-0"
            animate={{
              x: [0, -3, 1, -2, 0],
              opacity: [1, 0.8, 0.9, 0.7, 1],
            }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-red-400 z-0"
            animate={{
              x: [0, 2, -1, 3, 0],
              opacity: [1, 0.7, 0.9, 0.8, 1],
            }}
            transition={{ duration: 0.2 }}
          >
            {text}
          </motion.span>
        </>
      )}
    </div>
  )
}

// This component is no longer needed, but we'll keep it in the codebase
// in case we want to use it for other elements in the future
