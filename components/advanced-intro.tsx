"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function AdvancedIntro({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [stage, setStage] = useState(0)
  const [showTitle, setShowTitle] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [showFinalTitle, setShowFinalTitle] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create WebGL context for more advanced effects
    const gl = canvas.getContext("webgl")
    if (!gl) {
      // Fallback to 2D canvas if WebGL not supported
      createCanvasAnimation(ctx, canvas)
      return
    }

    // WebGL setup and animation
    createWebGLAnimation(gl, canvas)

    return () => {
      // Cleanup
    }
  }, [onComplete])

  // Canvas 2D animation fallback
  const createCanvasAnimation = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    // Binary rain effect
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []
    const speeds: number[] = []
    const colors: string[] = []
    const opacities: number[] = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100
      speeds[i] = Math.random() * 1.5 + 0.5
      opacities[i] = Math.random() * 0.5 + 0.5

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
      finalTitle: 250,
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

    // Draw hexagon grid
    const drawHexGrid = () => {
      const hexSize = 30
      const hexHeight = hexSize * Math.sqrt(3)
      const hexWidth = hexSize * 2
      const rows = Math.ceil(canvas.height / hexHeight) + 1
      const cols = Math.ceil(canvas.width / (hexWidth * 0.75)) + 1

      ctx.strokeStyle = "rgba(59, 130, 246, 0.1)"
      ctx.lineWidth = 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth * 0.75
          const y = row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2)

          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const xPos = x + hexSize * Math.cos(angle)
            const yPos = y + hexSize * Math.sin(angle)

            if (i === 0) {
              ctx.moveTo(xPos, yPos)
            } else {
              ctx.lineTo(xPos, yPos)
            }
          }
          ctx.closePath()
          ctx.stroke()

          // Randomly fill some hexagons
          if (Math.random() < 0.05) {
            ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
            ctx.fill()
          }
        }
      }
    }

    // Draw data streams
    const drawDataStreams = (time: number) => {
      const numStreams = 10

      for (let i = 0; i < numStreams; i++) {
        const streamLength = Math.random() * 100 + 50
        const x = (Math.sin(time * 0.001 + i) * 0.5 + 0.5) * canvas.width
        const y = (Math.cos(time * 0.001 + i * 0.5) * 0.5 + 0.5) * canvas.height

        ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
        ctx.lineWidth = 2

        ctx.beginPath()
        ctx.moveTo(x, y)

        let currentX = x
        let currentY = y

        for (let j = 0; j < streamLength; j++) {
          const angle = Math.sin(time * 0.002 + i + j * 0.1) * Math.PI * 2
          currentX += Math.cos(angle) * 2
          currentY += Math.sin(angle) * 2

          ctx.lineTo(currentX, currentY)
        }

        ctx.stroke()
      }
    }

    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw different background elements based on stage
      if (frameCount > 20) {
        drawGrid()
      }

      if (frameCount > 40) {
        drawCircuits()
      }

      if (frameCount > 60) {
        drawPulses(frameCount * 16)
      }

      if (frameCount > 80) {
        drawHexGrid()
      }

      if (frameCount > 100) {
        drawDataStreams(frameCount * 16)
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

        // Draw the character with varying opacity
        ctx.fillStyle = colors[i].replace("0.8", opacities[i].toString())
        ctx.font = `${fontSize}px monospace`
        ctx.fillText(text, x, y)

        // Randomly change color for some characters to create highlight effect
        if (Math.random() > 0.98) {
          ctx.fillStyle = "rgba(96, 165, 250, 1)" // Brighter blue
          ctx.fillText(text, x, y)
        }

        // Move drops down at different speeds
        drops[i] += speeds[i]

        // Reset drop to top when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
          // Randomize opacity for new drops
          opacities[i] = Math.random() * 0.5 + 0.5
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
        setShowFinalTitle(true)
      } else if (frameCount > stageTimings.finalTitle && stage === 3) {
        setStage(4)
      } else if (frameCount > stageTimings.complete && stage === 4) {
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
  }

  // WebGL animation
  const createWebGLAnimation = (gl: WebGLRenderingContext, canvas: HTMLCanvasElement) => {
    // Set up WebGL
    gl.clearColor(0.0, 0.0, 0.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    // Vertex shader program
    const vsSource = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      
      uniform mat4 uModelViewMatrix;
      uniform mat4 uProjectionMatrix;
      
      varying highp vec2 vTextureCoord;
      
      void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;
      }
    `

    // Fragment shader program
    const fsSource = `
      precision highp float;
      varying highp vec2 vTextureCoord;
      
      uniform float uTime;
      
      // Hash function for randomness
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main() {
        vec2 uv = vTextureCoord;
        
        // Grid effect
        vec2 grid = fract(uv * 20.0);
        float gridLine = max(
          smoothstep(0.95, 1.0, grid.x) + smoothstep(0.0, 0.05, grid.x),
          smoothstep(0.95, 1.0, grid.y) + smoothstep(0.0, 0.05, grid.y)
        );
        
        // Binary rain
        float speed = 0.2;
        float rainY = fract(uv.y + uTime * speed);
        float rain = step(0.98, hash(vec2(uv.x, floor(uv.y * 20.0 - uTime * speed * 20.0))));
        
        // Pulse waves
        float dist = length(uv - 0.5);
        float pulse1 = smoothstep(0.4, 0.5, dist) * smoothstep(0.6, 0.5, dist) * 0.5;
        float pulse2 = smoothstep(fract(uTime * 0.1), fract(uTime * 0.1) + 0.1, dist) * 0.3;
        
        // Data streams
        float stream = 0.0;
        for (int i = 0; i < 5; i++) {
          float fi = float(i) / 5.0;
          float streamX = sin(uTime * (0.1 + fi * 0.1) + fi * 6.28) * 0.4 + 0.5;
          float streamY = cos(uTime * (0.1 + fi * 0.1) + fi * 6.28) * 0.4 + 0.5;
          stream += smoothstep(0.02, 0.0, length(uv - vec2(streamX, streamY)));
        }
        
        // Combine effects
        vec3 color = vec3(0.0);
        color += vec3(0.2, 0.4, 0.8) * gridLine * 0.3;
        color += vec3(0.3, 0.6, 1.0) * rain;
        color += vec3(0.2, 0.5, 0.9) * pulse1;
        color += vec3(0.1, 0.3, 0.7) * pulse2;
        color += vec3(0.4, 0.7, 1.0) * stream;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `

    // Initialize shader program
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource)

    if (!shaderProgram) {
      console.error("Unable to initialize shader program")
      // Fallback to canvas animation
      const ctx = canvas.getContext("2d")
      if (ctx) createCanvasAnimation(ctx, canvas)
      return
    }

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
      },
      uniformLocations: {
        projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
        modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
        time: gl.getUniformLocation(shaderProgram, "uTime"),
      },
    }

    // Create buffers
    const buffers = initBuffers(gl)

    // Animation timing
    let then = 0
    let time = 0
    let frameCount = 0

    // Stage timing
    const stageTimings = {
      binaryRain: 2.0,
      titleReveal: 3.0,
      eventsReveal: 4.0,
      finalTitle: 5.0,
      complete: 7.0,
    }

    // Render loop
    const render = useCallback(
      (now: number) => {
        now *= 0.001 // Convert to seconds
        const deltaTime = now - then
        then = now

        time += deltaTime
        frameCount++

        // Update stages based on time
        if (time > stageTimings.binaryRain && stage === 0) {
          setStage(1)
          setShowTitle(true)
        } else if (time > stageTimings.titleReveal && stage === 1) {
          setStage(2)
          setShowEvents(true)
        } else if (time > stageTimings.eventsReveal && stage === 2) {
          setStage(3)
          setShowFinalTitle(true)
        } else if (time > stageTimings.finalTitle && stage === 3) {
          setStage(4)
        } else if (time > stageTimings.complete && stage === 4) {
          // End animation
          setTimeout(() => {
            onComplete()
          }, 1000)
          return
        }

        drawScene(gl, programInfo, buffers, time)

        requestAnimationFrame(render)
      },
      [gl, onComplete, setStage, setShowTitle, setShowEvents, setShowFinalTitle, stage],
    )

    useEffect(() => {
      requestAnimationFrame(render)

      return () => {
        // Cleanup function (if needed)
      }
    }, [render])

    // Helper functions for WebGL
    function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
      const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
      const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

      if (!vertexShader || !fragmentShader) return null

      // Create the shader program
      const shaderProgram = gl.createProgram()
      if (!shaderProgram) return null

      gl.attachShader(shaderProgram, vertexShader)
      gl.attachShader(shaderProgram, fragmentShader)
      gl.linkProgram(shaderProgram)

      // Check if it linked
      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram))
        return null
      }

      return shaderProgram
    }

    function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)
      if (!shader) return null

      // Send the source to the shader object
      gl.shaderSource(shader, source)

      // Compile the shader program
      gl.compileShader(shader)

      // See if it compiled successfully
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    function initBuffers(gl: WebGLRenderingContext) {
      // Create a buffer for the square's positions
      const positionBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

      // Create a square
      const positions = [-1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0]

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

      // Create texture coordinate buffer
      const textureCoordBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer)

      const textureCoordinates = [0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0]

      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW)

      // Create index buffer
      const indexBuffer = gl.createBuffer()
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)

      const indices = [0, 1, 2, 0, 2, 3]

      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

      return {
        position: positionBuffer,
        textureCoord: textureCoordBuffer,
        indices: indexBuffer,
      }
    }

    function drawScene(gl: WebGLRenderingContext, programInfo: any, buffers: any, time: number) {
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.clearDepth(1.0)
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LEQUAL)

      // Clear the canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      // Create projection matrix (orthographic for 2D)
      const projectionMatrix = mat4.create()
      mat4.ortho(projectionMatrix, -1, 1, -1, 1, 0.1, 100)

      // Set the drawing position to the "identity" point
      const modelViewMatrix = mat4.create()
      mat4.translate(modelViewMatrix, modelViewMatrix, [0.0, 0.0, -1.0])

      // Tell WebGL how to pull out the positions from the position buffer
      {
        const numComponents = 2
        const type = gl.FLOAT
        const normalize = false
        const stride = 0
        const offset = 0
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
        gl.vertexAttribPointer(
          programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset,
        )
        gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
      }

      // Tell WebGL how to pull out the texture coordinates
      {
        const numComponents = 2
        const type = gl.FLOAT
        const normalize = false
        const stride = 0
        const offset = 0
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord)
        gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, numComponents, type, normalize, stride, offset)
        gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord)
      }

      // Tell WebGL which indices to use to index the vertices
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices)

      // Tell WebGL to use our program when drawing
      gl.useProgram(programInfo.program)

      // Set the shader uniforms
      gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix)
      gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix)
      gl.uniform1f(programInfo.uniformLocations.time, time)

      // Draw the elements
      const vertexCount = 6
      const type = gl.UNSIGNED_SHORT
      const offset = 0
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset)
    }
  }

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

            {/* Final title reveal */}
            {showFinalTitle && (
              <motion.div
                className="mt-8 text-xl text-blue-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                GET READY FOR THE ULTIMATE TECH FEST
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

// Simple mat4 implementation for WebGL
const mat4 = {
  create: () => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),

  ortho: (out: Float32Array, left: number, right: number, bottom: number, top: number, near: number, far: number) => {
    const lr = 1 / (left - right)
    const bt = 1 / (bottom - top)
    const nf = 1 / (near - far)

    out[0] = -2 * lr
    out[1] = 0
    out[2] = 0
    out[3] = 0
    out[4] = 0
    out[5] = -2 * bt
    out[6] = 0
    out[7] = 0
    out[8] = 0
    out[9] = 0
    out[10] = 2 * nf
    out[11] = 0
    out[12] = (left + right) * lr
    out[13] = (top + bottom) * bt
    out[14] = (far + near) * nf
    out[15] = 1

    return out
  },

  translate: (out: Float32Array, a: Float32Array, v: number[]) => {
    const x = v[0],
      y = v[1],
      z = v[2]

    out[12] = a[0] * x + a[4] * y + a[8] * z + a[12]
    out[13] = a[1] * x + a[5] * y + a[9] * z + a[13]
    out[14] = a[2] * x + a[6] * y + a[10] * z + a[14]
    out[15] = a[3] * x + a[7] * y + a[11] * z + a[15]

    return out
  },
}
