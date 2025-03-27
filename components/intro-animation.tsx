"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function IntroAnimation({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stage, setStage] = useState(0)
  const [showTitle, setShowTitle] = useState(false)
  const [showEvents, setShowEvents] = useState(false)

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
        "rgba(30, 64, 175, 0.8)", // blue-800
        "rgba(67, 56, 202, 0.8)", // indigo-700
        "rgba(79, 70, 229, 0.8)", // indigo-600
        "rgba(99, 102, 241, 0.8)", // indigo-500
        "rgba(6, 182, 212, 0.8)", // cyan-500
      ]

      colors[i] = blueShades[Math.floor(Math.random() * blueShades.length)]
    }

    // Binary and tech characters
    const chars = "01"
    const techChars = "01{}[]()<>/\\|;:+-*=&%$#@!?"

    let frameCount = 0
    let animationFrameId: number

    // Stage timing
    const stageTimings = {
      binaryRain: 100,
      titleReveal: 150,
      eventsReveal: 200,
      complete: 300,
    }

    // Create grid effect
    const drawGrid = () => {
      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
    }

    // Create circuit pattern
    const drawCircuits = () => {
      ctx.strokeStyle = "rgba(59, 130, 246, 0.15)"
      ctx.lineWidth = 2

      const circuitPoints = []
      const numCircuits = Math.floor(canvas.width / 200)

      for (let i = 0; i < numCircuits; i++) {
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height

        circuitPoints.push({
          x: startX,
          y: startY,
          length: Math.random() * 5 + 3,
          angle: Math.random() * Math.PI * 2,
          width: Math.random() * 2 + 1,
        })
      }

      circuitPoints.forEach((circuit) => {
        let x = circuit.x
        let y = circuit.y
        let angle = circuit.angle

        ctx.beginPath()
        ctx.moveTo(x, y)

        for (let i = 0; i < circuit.length; i++) {
          const length = Math.random() * 100 + 50

          // 90 degree turns only for circuit-like appearance
          angle = Math.round(angle / (Math.PI / 2)) * (Math.PI / 2)

          x += Math.cos(angle) * length
          y += Math.sin(angle) * length

          ctx.lineTo(x, y)

          // Random chance to change direction
          if (Math.random() > 0.5) {
            angle += (Math.PI / 2) * (Math.random() > 0.5 ? 1 : -1)
          }
        }

        ctx.stroke()

        // Add circuit node at the end
        ctx.fillStyle = "rgba(59, 130, 246, 0.3)"
        ctx.beginPath()
        ctx.arc(x, y, circuit.width * 3, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Draw pulse waves
    const drawPulses = (time: number) => {
      const numPulses = 3

      for (let i = 0; i < numPulses; i++) {
        const pulseTime = (time + i * 1000) % 3000
        const size = (pulseTime / 3000) * Math.max(canvas.width, canvas.height) * 1.5

        if (size > 0) {
          const opacity = 1 - pulseTime / 3000
          ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.5})`
          ctx.lineWidth = 2

          ctx.beginPath()
          ctx.arc(canvas.width / 2, canvas.height / 2, size, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    }

    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid in background
      if (frameCount > 20) {
        drawGrid()
      }

      // Draw circuits after some frames
      if (frameCount > 40) {
        drawCircuits()
      }

      // Draw pulse waves
      if (frameCount > 60) {
        drawPulses(frameCount * 16)
      }

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Use tech chars after certain point
        const charSet = frameCount > 80 ? techChars : chars

        // Random character
        const text = charSet[Math.floor(Math.random() * charSet.length)]

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

      // Update stages based on frame count
      if (frameCount > stageTimings.binaryRain && stage === 0) {
        setStage(1)
        setShowTitle(true)
      } else if (frameCount > stageTimings.titleReveal && stage === 1) {
        setStage(2)
        setShowEvents(true)
      } else if (frameCount > stageTimings.eventsReveal && stage === 2) {
        setStage(3)
      } else if (frameCount > stageTimings.complete && stage === 3) {
        // End animation
        cancelAnimationFrame(animationFrameId)
        setTimeout(() => {
          onComplete()
        }, 1000)
        return
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [onComplete])

  // Event names for the animation
  const eventNames = ["Codathon", "Hackathon", "C Quiz", "Python Quiz", "Tech Quiz", "Circuit Building"]

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Central glowing orb */}
        <motion.div
          className="absolute rounded-full bg-blue-500/20 blur-3xl"
          initial={{ width: 0, height: 0 }}
          animate={{
            width: ["0vw", "30vw", "50vw", "70vw"],
            height: ["0vh", "30vh", "50vh", "70vh"],
            opacity: [0, 0.3, 0.5, 0],
          }}
          transition={{
            duration: 4,
            times: [0, 0.3, 0.6, 1],
          }}
        />

        {/* Title animation */}
        {showTitle && (
          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-indigo-500 mb-4"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{
                opacity: [0, 1, 1],
                y: [50, 0, 0],
                scale: [0.8, 1.2, 1],
              }}
              transition={{
                duration: 2,
                times: [0, 0.5, 1],
              }}
            >
              CSE-A-THON
            </motion.div>

            {/* Digital countdown effect */}
            <motion.div
              className="text-2xl md:text-3xl text-blue-400 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0, 1, 0, 1] }}
                transition={{ duration: 1.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
              >
                INITIALIZING...
              </motion.span>
            </motion.div>

            {/* Event names animation */}
            {showEvents && (
              <motion.div className="mt-8 flex flex-wrap justify-center gap-4 max-w-2xl">
                {eventNames.map((event, index) => (
                  <motion.div
                    key={event}
                    className="px-4 py-2 rounded-md bg-blue-900/30 text-blue-300 border border-blue-700/50 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                  >
                    {event}
                  </motion.div>
                ))}
              </motion.div>
            )}
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
            transition={{ duration: 5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
