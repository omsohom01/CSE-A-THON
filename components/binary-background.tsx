"use client"

import { useEffect, useRef } from "react"

interface BinarySymbol {
  x: number
  y: number
  value: string
  size: number
  opacity: number
  blinkSpeed: number
  blinkPhase: number
}

export default function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Create binary symbols
    const symbols: BinarySymbol[] = []
    const binaryValues = ["0", "1"]

    for (let i = 0; i < 150; i++) {
      symbols.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: binaryValues[Math.floor(Math.random() * binaryValues.length)],
        size: Math.random() * 16 + 10,
        opacity: Math.random() * 0.3 + 0.1,
        blinkSpeed: Math.random() * 0.05 + 0.01,
        blinkPhase: Math.random() * Math.PI * 2,
      })
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw binary symbols
      symbols.forEach((symbol) => {
        // Calculate blinking effect
        const blinkFactor = Math.sin(time * symbol.blinkSpeed * 10 + symbol.blinkPhase)
        const currentOpacity = symbol.opacity * (0.5 + 0.5 * blinkFactor)

        // Randomly change value occasionally
        if (Math.random() < 0.005) {
          symbol.value = binaryValues[Math.floor(Math.random() * binaryValues.length)]
        }

        ctx.font = `${symbol.size}px monospace`
        ctx.fillStyle = `rgba(59, 130, 246, ${currentOpacity})`
        ctx.fillText(symbol.value, symbol.x, symbol.y)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}
