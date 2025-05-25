"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Coffee, Code, Clock } from "lucide-react"
import Image from "next/image"
import { usePortfolio } from "@/context/portfolio-context"

type CounterProps = {
  icon: React.ReactNode
  value: number
  label: string
  duration?: number
}

function Counter({ icon, value, label, duration = 2 }: CounterProps) {
  const counterRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(counterRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={counterRef}
      className="flex flex-col items-center p-4 bg-card/30 backdrop-blur-sm rounded-xl border border-border"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="text-primary mb-2">{icon}</div>
      <motion.div
        className="text-3xl font-bold"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: duration }}
        >
          {value}
        </motion.span>
        +
      </motion.div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const { about } = usePortfolio()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Map icon strings to components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "Coffee":
        return <Coffee className="h-6 w-6" />
      case "Code":
        return <Code className="h-6 w-6" />
      case "Clock":
        return <Clock className="h-6 w-6" />
      default:
        return <Code className="h-6 w-6" />
    }
  }

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{about.title}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-xl">
              <Image src={about.image || "/img.jpg"} alt={about.title} fill className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 h-40 w-40 bg-primary/10 rounded-xl border border-primary"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">Hi, I'm {about.title}</h3>
            {about.description.map((paragraph, index) => (
              <p key={index} className="text-muted-foreground">
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-3 gap-4 pt-4">
              {about.counters.map((counter) => (
                <Counter
                  key={counter.id}
                  icon={getIconComponent(counter.icon)}
                  value={counter.value}
                  label={counter.label}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}