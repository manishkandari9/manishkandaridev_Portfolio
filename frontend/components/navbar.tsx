"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, X, Github, Linkedin } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { usePortfolio } from "@/context/portfolio-context"

// ✅ Lazy load SidebarChat (if needed later)
const SidebarChat = dynamic(() => import("@/components/SidebarChat"), { ssr: false })

export default function Navbar() {
  const { siteInfo, contact } = usePortfolio()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isMobile = useMobile()

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // ✅ Optimized Scroll Handler (throttled)
  useEffect(() => {
    let lastScroll = 0
    const handleScroll = () => {
      if (Date.now() - lastScroll > 150) {
        setScrolled(window.scrollY > 50)
        lastScroll = Date.now()
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ✅ SEO-friendly internal navigation structure
  const navLinks = [
    { href: "about", label: "About" },
    { href: "skills", label: "Skills" },
    { href: "projects", label: "Projects" },
    { href: "services", label: "Services" },
    { href: "feedback", label: "Feedback" },
    { href: "contact", label: "Contact" },
    
  ]

  // ✅ External social links (with SEO-safe nofollow)
 const socialLinks = [
  {
    href: "https://github.com/manishkandari9",
    icon: <Github className="h-5 w-5" />,
    label: "GitHub - Manish Kandari",
  },
  {
    href: "https://www.linkedin.com/in/manish-kandari-924907271/",
    icon: <Linkedin className="h-5 w-5" />,
    label: "LinkedIn - Manish Kandari",
  },
]


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* ✅ Logo / Site Name */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold tracking-tight hover:text-primary transition-colors"
            onClick={closeMenu}
            aria-label="Go to homepage"
          >
            {siteInfo.name || "Manish Kandari"}
          </Link>

          {/* ✅ Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-1"
            role="navigation"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                onClick={closeMenu}
                aria-label={`Navigate to ${link.label} section`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ✅ Desktop Social Links + Theme Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="p-2 hover:text-primary transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* ✅ Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* ✅ Mobile Menu (with animation) */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="container px-4 py-4">
              <nav
                className="flex flex-col space-y-4"
                role="navigation"
                aria-label="Mobile Navigation"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={false}
                    className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
                    onClick={closeMenu}
                    aria-label={`Go to ${link.label}`}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* ✅ Mobile Social Links */}
                <div className="flex space-x-4 pt-4 border-t border-border">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="p-2 hover:text-primary transition-colors"
                      aria-label={link.label}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
