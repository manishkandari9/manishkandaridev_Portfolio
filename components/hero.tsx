"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import ParticleBackground from "@/components/particle-background"
import { usePortfolio } from "@/context/portfolio-context"

export default function Hero() {
  const { hero } = usePortfolio()
  const [text, setText] = useState("")
  const fullText = hero.tagline
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index])
        setIndex(index + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [index, fullText])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      <ParticleBackground />

      <div className="container relative z-10 px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {hero.name}
          </motion.h1>

          <motion.div
            className="h-8 md:h-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl text-primary font-mono">
              {text}
              <span className="animate-pulse">|</span>
            </h2>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link href={hero.cta.primary.link}>
              <Button size="lg" className="min-w-[150px] bg-primary hover:bg-primary/90 text-primary-foreground">
                {hero.cta.primary.text}
              </Button>
            </Link>
            <Link href={hero.cta.secondary.link}>
              <Button
                size="lg"
                variant="outline"
                className="min-w-[150px] border-primary text-primary hover:bg-primary/10"
              >
                {hero.cta.secondary.text}
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Link href="#about" scroll={false}>
          <ChevronDown className="h-8 w-8 text-primary animate-bounce" />
        </Link>
      </motion.div>
    </section>
  )
}
