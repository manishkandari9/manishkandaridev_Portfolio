"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

type Testimonial = {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechStart Inc.",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Working with Manish was a game-changer for our company. He delivered a website that exceeded our expectations in both design and functionality. His attention to detail and ability to understand our business needs made the process smooth and enjoyable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Marketing Director",
    company: "GrowthLabs",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Manish is an exceptional developer who goes above and beyond. He not only built our e-commerce platform but also provided valuable insights that improved our user experience. The site has received countless compliments and has significantly increased our conversion rates.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder",
    company: "DesignHub",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "I've worked with many developers, but Manish stands out for his creativity and technical expertise. He transformed our outdated website into a modern, responsive platform that perfectly represents our brand. His communication throughout the project was excellent.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Kim",
    role: "Product Manager",
    company: "InnovateTech",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Manish's ability to translate complex requirements into elegant solutions is remarkable. He built a custom web application for our team that streamlined our workflow and increased productivity. His code is clean, well-documented, and easy to maintain.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Patel",
    role: "Small Business Owner",
    company: "Bloom Boutique",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "As a small business owner with limited technical knowledge, I was nervous about creating an online store. Manish made the process simple and stress-free. He was patient with my questions and delivered a beautiful e-commerce site that has helped my business grow.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" ref={sectionRef} className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Testimonials</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
          </div>

          <div className="overflow-hidden py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-card/30 backdrop-blur-sm rounded-xl border border-border p-8 md:p-10"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                  <div className="flex-shrink-0">
                    <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-primary">
                      <Image
                        src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonials[currentIndex].rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>

                    <blockquote className="text-lg italic mb-6">"{testimonials[currentIndex].content}"</blockquote>

                    <div>
                      <h4 className="font-bold">{testimonials[currentIndex].name}</h4>
                      <p className="text-muted-foreground text-sm">
                        {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-background/80 backdrop-blur-sm"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
                onClick={() => setCurrentIndex(index)}
              >
                <span className="sr-only">Testimonial {index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
