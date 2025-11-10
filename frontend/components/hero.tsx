"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import ParticleBackground from "@/components/particle-background"

export default function Hero() {
  const [text, setText] = useState("")
  const fullText =
    "Designing intelligent web solutions powered by AI and automation."

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + fullText[index])
        setIndex(index + 1)
      }, 45)
      return () => clearTimeout(timeout)
    }
  }, [index])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4 pt-20 md:pt-28"
    >
      {/* 🔹 Background Animation */}
     <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1.2 }}
>
  <ParticleBackground aria-hidden="true" />
</motion.div>


      <div className="relative z-10 flex flex-col items-center justify-center max-w-7xl w-full mx-auto space-y-6">
        
        {/* 🌍 Location Tag */}
        <motion.span
          className="text-xs sm:text-lg tracking-widest uppercase text-yellow-400 font-medium"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Based in Rishikesh, Dehradun, India
        </motion.span>

        {/*  Main H1 - SEO optimized + responsive */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-300 leading-tight break-words px-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Freelance Full Stack Developer <br />
          & <span className="text-blue-400">Automation Expert</span>
        </motion.h1>

        {/* 🔹 Typing Animation (controlled width + mobile safe) */}
        <motion.div
          className="min-h-[2rem] sm:min-h-[2.5rem] md:min-h-[3rem] w-full max-w-[90%] sm:max-w-[600px] mx-auto px-2 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-primary font-mono tracking-wide break-words leading-snug">
  {text}
  <span className="animate-pulse">|</span>
</p>

        </motion.div>

        {/* ✅ SEO Optimized Paragraph (auto-wraps cleanly) */}
      <motion.p
  className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed px-4 sm:px-2"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.6, duration: 0.8 }}
>
  I’m <strong>Manish Kandari</strong> — a{" "}
  <span className="text-blue-400 font-medium">
    freelance full-stack developer
  </span>{" "}
  and{" "}
  <span className="text-blue-400 font-medium">automation expert</span>{" "}
  from <strong>Rishikesh, Dehradun</strong>. I create{" "}
   <Link
    href="/projects"
  >
    <strong>AI-powered websites</strong>
  </Link>{" "} and{" "}
  <strong>smart automation tools</strong> that help <Link href="/contact"><strong>businesses</strong></Link> grow.
</motion.p>

<span className="sr-only">
  Freelance full-stack developer and automation expert from Rishikesh, Dehradun.  
  Building AI-powered websites and smart automation tools.
</span>



        {/* ✅ CTA Buttons (perfectly centered + mobile stacked) */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.9, ease: "easeOut" }}
        >
          <Link href="/projects">
            <Button
              size="lg"
              className="w-[160px] sm:w-[180px] bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base font-semibold transform hover:scale-105 transition-transform"
              aria-label="See My Projects"
            >
              See My Projects
            </Button>
          </Link>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="w-[160px] sm:w-[180px] border-primary text-primary hover:bg-primary/10 text-sm sm:text-base font-semibold transform hover:scale-105 transition-transform"
              aria-label="Work With Me"
            >
              Work With Me
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* 🔹 Scroll-down icon (mobile safe + centered) */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}

      >
        <Link href="/about" scroll={false} aria-label="Scroll to About Section">
         <ChevronDown className="h-6 w-6 text-primary animate-bounce drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        </Link>
      </motion.div>
    </section>
  )
}