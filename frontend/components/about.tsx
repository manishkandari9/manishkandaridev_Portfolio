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
      className="flex flex-col items-center p-4 bg-card/30 backdrop-blur-sm rounded-xl border border-border shadow-sm"
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
        {value}+
      </motion.div>
      <div className="text-muted-foreground text-sm">{label}</div>
    </motion.div>
  )
}

export default function About() {
  const { about } = usePortfolio()
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

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
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-background text-foreground relative overflow-hidden"
    >
      <div className="container px-4 md:px-8 lg:px-12">
        {/* ✅ Title Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 tracking-tight">About Me</h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            <strong>Freelance Web Developer</strong> &{" "}
            <strong>SEO Expert in India</strong> — crafting{" "}
            <em>responsive websites, UI/UX designs</em>, and{" "}
            <strong>high-performance web applications</strong> optimized for
            both users and search engines.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* ✅ Main Grid */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* 🖼️ Left Side Image */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/40 to-purple-500/20 blur-2xl opacity-40 group-hover:opacity-60 transition duration-500"></div>

              <Image
                src={about.image || "/my.jpg"}
                alt="Freelance Web Developer and SEO Expert in India"
                width={450}
                height={450}
                className="rounded-2xl shadow-2xl object-cover object-center relative z-10 transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>

          {/* 🧠 Right Side Text */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold">
              Hi, I'm <span className="text-primary">Manish Kandari</span>
            </h3>

            <p className="text-muted-foreground leading-relaxed text-base">
              I’m a <strong>freelance web developer</strong> and{" "}
              <strong>SEO expert from India</strong> specializing in{" "}
              <em>responsive design, UI/UX, and full-stack development</em> using{" "}
              <strong>React, Next.js, Node.js,</strong> and{" "}
              <strong>MongoDB</strong>. I create visually engaging, fast-loading
              websites that rank high on Google.
            </p>

            <p className="text-muted-foreground leading-relaxed text-base">
              My expertise includes <strong>on-page SEO</strong>,{" "}
              <strong>off-page SEO services</strong>,{" "}
              <strong>web application development</strong>, and{" "}
              <strong>e-commerce website design</strong>. I help brands achieve
              digital success through scalable, SEO-friendly web solutions.
            </p>

            <p className="text-muted-foreground leading-relaxed text-base">
              Whether you’re searching for a{" "}
              <strong>freelance web designer near you</strong> or need{" "}
              <strong>web development services in India</strong>, I deliver
              performance-driven solutions to boost your online presence.
            </p>

            {/* ✅ Counter Section */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {about.counters.map((counter) => (
                <Counter
                  key={counter.id}
                  icon={getIconComponent(counter.icon)}
                  value={counter.value}
                  label={counter.label}
                />
              ))}
            </div>

            {/* ✅ CTA - “Let’s Collaborate” */}
            <div className="pt-8 flex justify-start md:justify-start">
              <motion.a
                href="#contact"
                className="relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold 
                text-white rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 
                hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 
                transition-all duration-300 shadow-lg hover:shadow-indigo-500/40 
                group overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                Let’s Collaborate
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
