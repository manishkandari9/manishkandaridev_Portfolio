"use client"

import { useCallback, useRef, useEffect } from "react"
import { useTheme } from "next-themes"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D, particles: Particle[]) => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

      particles.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x > ctx.canvas.width || particle.x < 0) {
          particle.speedX *= -1
        }

        if (particle.y > ctx.canvas.height || particle.y < 0) {
          particle.speedY *= -1
        }
      })

      // Draw connections
      particles.forEach((particle, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particle.x - particles[j].x
          const dy = particle.y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${theme === "dark" ? "138, 43, 226" : "75, 0, 130"}, ${0.2 - distance / 750})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })
    },
    [theme],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Create particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100)
    const particles: Particle[] = []

    const primaryColor = theme === "dark" ? "rgba(138, 43, 226, 0.8)" : "rgba(75, 0, 130, 0.8)"
    const secondaryColor = theme === "dark" ? "rgba(0, 191, 255, 0.8)" : "rgba(0, 128, 255, 0.8)"

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: Math.random() > 0.5 ? primaryColor : secondaryColor,
      })
    }

    // Animation loop
    let animationId: number

    const animate = () => {
      drawParticles(ctx, particles)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
    }
  }, [drawParticles, theme])

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full bg-transparent" />
}
