"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [hidden, setHidden] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    if (isMobile) return

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY)
      const isLinkHovered = hoveredElement?.closest("a, button, [role=button]")
      setLinkHovered(!!isLinkHovered)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    addEventListeners()
    return () => removeEventListeners()
  }, [isMobile])

  if (isMobile) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none"
      animate={{
        x: position.x - (linkHovered ? 16 : 4),
        y: position.y - (linkHovered ? 16 : 4),
        scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      <div
        className={`rounded-full ${
          linkHovered ? "w-8 h-8 border-2 border-primary bg-transparent" : "w-4 h-4 bg-primary"
        }`}
      />
    </motion.div>
  )
}
