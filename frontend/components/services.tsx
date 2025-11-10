"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Code, Palette, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

type ServiceTier = {
  title: string
  price: string
  description: string
  features: string[]
  cta: string
  popular?: boolean
}

type ServiceProps = {
  icon: React.ReactNode
  title: string
  description: string
  tiers: ServiceTier[]
  index: number
}

const services = [
  {
    icon: <Palette className="h-10 w-10" />,
    title: "UI/UX Design",
    description: "Beautiful, user-friendly, and responsive designs that enhance user experience and brand identity.",
    tiers: [
      {
        title: "Basic",
        price: "₹4,000 – ₹6,000",
        description: "Perfect for small projects or personal portfolios",
        features: ["Responsive layouts", "3 custom page designs", "2 revisions", "Source files included"],
        cta: "Get Started",
      },
      {
        title: "Standard",
        price: "₹7,000 – ₹10,000",
        description: "Ideal for startups and small businesses",
        features: [
          "5–7 pages",
          "Interactive prototypes",
          "User flow diagrams",
          "Brand consistency design",
        ],
        cta: "Get Started",
        popular: true,
      },
      {
        title: "Premium",
        price: "₹12,000 – ₹18,000",
        description: "Advanced design system for professional companies",
        features: [
          "10+ custom pages",
          "Unlimited revisions",
          "Brand style guide",
          "UX testing & feedback",
        ],
        cta: "Get Started",
      },
    ],
  },
  {
    icon: <Code className="h-10 w-10" />,
    title: "Web Development",
    description: "Full-stack web development with modern frameworks like React, Next.js, and Node.js for scalable and secure web apps.",
    tiers: [
      {
        title: "Basic",
        price: "₹12,000 – ₹18,000",
        description: "Simple websites for individuals and small businesses",
        features: ["5 pages", "Responsive design", "Basic SEO", "Contact form", "Deployment support"],
        cta: "Get Started",
      },
      {
        title: "Standard",
        price: "₹25,000 – ₹35,000",
        description: "Feature-rich websites for growing businesses",
        features: [
          "10 pages",
          "Advanced SEO setup",
          "CMS integration",
          "E-commerce setup",
          "Performance optimization",
        ],
        cta: "Get Started",
        popular: true,
      },
      {
        title: "Premium",
        price: "₹45,000 – ₹80,000",
        description: "Enterprise-grade web apps with custom backend & APIs",
        features: [
          "Unlimited pages",
          "Custom backend development",
          "User authentication",
          "Payment gateways",
          "API integrations",
        ],
        cta: "Get Started",
      },
    ],
  },
  {
    icon: <Bot className="h-10 w-10" />,
    title: "Automation & AI Integration",
    description:
      "Boost productivity with intelligent automation workflows, AI bots, and data-driven systems designed for real business growth.",
    tiers: [
      {
        title: "Basic",
        price: "₹10,000 – ₹20,000",
        description: "For simple automation workflows",
        features: [
          "Email & task automation",
          "Google Sheets + Form workflows",
          "Zapier / n8n setup",
          "Basic reporting dashboard",
        ],
        cta: "Automate Now",
      },
      {
        title: "Standard",
        price: "₹25,000 – ₹40,000",
        description: "Smart automation with AI features",
        features: [
          "OpenAI / Gemini integration",
          "Slack & Discord bots",
          "Custom triggers & APIs",
          "Multi-step workflow automation",
        ],
        cta: "Automate Now",
        popular: true,
      },
      {
        title: "Premium",
        price: "₹45,000 – ₹1,20,000",
        description: "Full-scale business automation & AI systems",
        features: [
          "End-to-end automation pipelines",
          "Custom AI chatbot (trained on data)",
          "CRM / ERP system integration",
          "Cloud-based dashboard",
          "Advanced analytics & reports",
        ],
        cta: "Automate Now",
      },
    ],
  },
]

function ServiceCard({ icon, title, description, tiers, index }: ServiceProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-16"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.2 }}
          className="inline-flex p-3 rounded-full bg-primary/10 text-primary mb-4"
        >
          {icon}
        </motion.div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((tier, tierIndex) => (
          <motion.div
            key={tier.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 + tierIndex * 0.1 }}
            className={`relative ${tier.popular ? "md:-mt-4 md:mb-4" : ""}`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-0 right-0 text-center">
                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <Card className={`h-full ${tier.popular ? "border-primary shadow-lg" : ""}`}>
              <CardHeader>
                <CardTitle>{tier.title}</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl font-bold">{tier.price}</span>
                </div>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="#contact" passHref legacyBehavior>
                  <Button
                    className={`w-full ${tier.popular ? "bg-primary" : ""}`}
                    variant={tier.popular ? "default" : "outline"}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Services</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I offer modern web development, design, and automation services to help businesses grow online. 
            From responsive websites to AI-powered systems, every solution I build focuses on performance, scalability, and automation. 
            Let’s create something that saves time, boosts productivity, and looks amazing.
          </p>
        </motion.div>

        <div>
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              tiers={service.tiers}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-xl font-bold mb-4">Need a custom solution?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
             Whether you need a smart automation workflow, a powerful web app, or a professional website—I can build a customized solution that fits your business perfectly.
          </p>
          <Link href="#contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Get in Touch
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
