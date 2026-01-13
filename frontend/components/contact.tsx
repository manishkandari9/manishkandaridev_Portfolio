"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react"
import { z } from "zod"
import axios from "axios"

// ✅ Schema Validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type FormData = z.infer<typeof formSchema>

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validateForm = () => {
    try {
      formSchema.parse(formData)
      setErrors({})
      return true
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof FormData, string>> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) newErrors[err.path[0] as keyof FormData] = err.message
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    try {
      const response = await axios.post(
        "https://backend-cf0k.onrender.com/api/contact",
        formData,
        { headers: { "Content-Type": "application/json" } }
      )

      if (response.status !== 201) throw new Error("Failed to send message")

      setIsSuccess(true)
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      })

      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" })
        setIsSuccess(false)
      }, 2000)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 bg-muted/30"
      aria-labelledby="contact-heading"
    >
      <div className="container px-4 md:px-6">
        {/* ✅ Title + SEO Intro */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Have a project idea or want to collaborate with{" "}
            <strong>Manish Kandari</strong>, a{" "}
            <span className="text-primary font-medium">
              freelance full stack developer & automation expert
            </span>{" "}
            based in <strong>Rishikesh, Dehradun, India</strong>? Fill out the
            form or connect directly through email or WhatsApp.
          </p>
        </motion.div>

        {/* ✅ Main Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* 📞 Contact Info */}
          <motion.address
            className="not-italic"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <a
                    href="mailto:manishkandari168@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    manishkandari168@gmail.com
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Phone</h4>
                  <a
                    href="tel:+917830130183"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +91 7830130183
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">Location</h4>
                  <p className="text-muted-foreground">
                    Rishikesh Dehradun, Uttarakhand, India
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold">WhatsApp</h4>
                  <a
                    href="https://wa.me/917830130183"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Message me on WhatsApp
                  </a>
                </div>
              </li>
            </ul>

            {/* 🌐 Internal Links for SEO */}
            <div className="mt-10 text-sm text-muted-foreground">
              Learn more{" "}
              <a
                href="/about"
                className="text-primary hover:underline"
              >
                about me
              </a>{" "}
              or explore my{" "}
              <a
                href="/projects"
                className="text-primary hover:underline"
              >
                latest projects
              </a>{" "}
              and{" "}
              <a
                href="/services"
                className="text-primary hover:underline"
              >
                web development services
              </a>
              .
            </div>
          </motion.address>

          {/* 📨 Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="relative"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
              aria-label="Contact Form"
            >
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "border-red-500" : ""}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? "border-red-500" : ""}
                aria-invalid={!!errors.subject}
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}

              <Textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "border-red-500" : ""}
                aria-invalid={!!errors.message}
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}

              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                {isSubmitting
                  ? "Sending..."
                  : isSuccess
                  ? "Message Sent!"
                  : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                    )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
