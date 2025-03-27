"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showTitle, setShowTitle] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Binary rain effect
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []
    const speeds: number[] = []
    const colors: string[] = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
      speeds[i] = Math.random() * 1.5 + 0.5

      // Different blue shades for variety
      const blueShades = [
        "rgba(59, 130, 246, 0.8)", // blue-500
        "rgba(37, 99, 235, 0.8)", // blue-600
        "rgba(29, 78, 216, 0.8)", // blue-700
      ]

      colors[i] = blueShades[Math.floor(Math.random() * blueShades.length)]
    }

    // Binary characters
    const chars = "01"

    let frameCount = 0
    let animationFrameId: number

    // Animation timing
    const titleShowFrame = 60
    const animationEndFrame = 180

    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random binary character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // x coordinate of the drop
        const x = i * fontSize
        // y coordinate of the drop
        const y = drops[i] * fontSize

        // Draw the character
        ctx.fillStyle = colors[i]
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(text, x, y)

        // Randomly change color for some characters to create highlight effect
        if (Math.random() > 0.98) {
          ctx.fillStyle = "#60a5fa" // Brighter blue
          ctx.fillText(text, x, y)
        }

        // Move drops down at different speeds
        drops[i] += speeds[i]

        // Reset drop to top when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
      }

      frameCount++

      // Show title after certain number of frames
      if (frameCount === titleShowFrame) {
        setShowTitle(true)
      }

      // End animation after certain number of frames
      if (frameCount < animationEndFrame) {
        animationFrameId = requestAnimationFrame(draw)
      } else {
        // Fade out and complete
        setAnimationComplete(true)
        setTimeout(() => {
          onComplete()
        }, 1000) // Wait for fade out animation
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!animationComplete ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <canvas ref={canvasRef} className="absolute inset-0" />

          {showTitle && (
            <motion.div
              className="relative z-10 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 mb-6"
                animate={{
                  textShadow: [
                    "0 0 7px rgba(59, 130, 246, 0.6)",
                    "0 0 10px rgba(59, 130, 246, 0.8)",
                    "0 0 7px rgba(59, 130, 246, 0.6)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                CSE-A-THON
              </motion.div>

              <motion.div
                className="text-xl text-blue-400 font-mono"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                LOADING...
              </motion.div>
            </motion.div>
          )}

          {/* Loading bar at bottom */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-64 h-2 bg-gray-800 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
