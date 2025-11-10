"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowUp, Github, Linkedin, Mail, MapPin, Phone, Instagram, Facebook, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePortfolio } from "@/context/portfolio-context"

export default function Footer() {
  const { siteInfo, contact } = usePortfolio()
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: true })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      ref={footerRef}
      className="bg-muted/50 border-t border-border py-12"
      aria-label="Website Footer for Manish Kandari Web Solutions"
    >
      <div className="container px-4 md:px-6">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info + SEO Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="text-2xl font-bold mb-4 inline-block hover:text-primary transition-colors"
              aria-label="Go to homepage - Manish Kandari Web Solutions"
            >
              {siteInfo.name}
            </Link>

            <p className="text-muted-foreground mb-4 max-w-md leading-relaxed text-sm">
              <strong>Manish Kandari</strong> — a Freelance{" "}
              <strong>Full Stack Developer</strong> &{" "}
              <strong>Automation Expert</strong> from India.  
              I create AI-powered web apps, business automation tools, and modern
              websites that help brands grow online.
            </p>

            {/* 🌐 Social Media Links (Static) */}
            <div className="flex gap-4 mt-3">
              <a
                href="https://github.com/manishkandari9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit GitHub Profile"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/manishsinghkandari09/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit LinkedIn Profile"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://www.instagram.com/n8nminishtec/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Instagram Profile"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Facebook Page"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>

              <a
                href="https://www.reddit.com/user/Icy-Helicopter4891/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Reddit Profile"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4 text-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  aria-label="Learn more about Manish Kandari"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  aria-label="View my web development and automation services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  aria-label="See portfolio projects by Manish Kandari"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  aria-label="Contact Manish Kandari for web or automation projects"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info (SEO friendly) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4 text-foreground">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Rishikesh, Dehradun, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={`mailto:${contact.info.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {contact.info.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href={`tel:${contact.info.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {contact.info.phone}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-border"
        >
          <p className="text-muted-foreground text-sm mb-4 sm:mb-0">
            © {new Date().getFullYear()} {siteInfo.name}. All rights reserved. | Built with ❤️ using{" "}
            <Link href="https://nextjs.org" target="_blank" className="text-primary hover:underline">
              Next.js
            </Link>{" "}
            and Tailwind CSS.
          </p>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={scrollToTop}
              aria-label="Scroll back to top of the page"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          <p>
            {siteInfo.footerText} | Freelance Full Stack Developer in India | Automation, AI, and Web App Solutions
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
