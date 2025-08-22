"use client"

import type React from "react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Code, Palette } from "lucide-react"
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
    description: "Beautiful, intuitive designs that engage users and elevate your brand.",
    tiers: [
      {
        title: "Basic",
        price: "₹4000",
        description: "Perfect for small businesses and startups",
        features: ["Responsive design", "3 page designs", "2 revision rounds", "Source files included"],
        cta: "Get Started",
      },
      {
        title: "Standard",
        price: "₹8000",
        description: "Ideal for growing businesses",
        features: [
          "Responsive design",
          "5-7 page designs",
          "3 revision rounds",
          "Source files included",
          "Interactive prototypes",
          "User flow diagrams",
        ],
        cta: "Get Started",
        popular: true,
      },
      {
        title: "Premium",
        price: "₹14,000",
        description: "For established businesses with complex needs",
        features: [
          "Responsive design",
          "10+ page designs",
          "Unlimited revisions",
          "Source files included",
          "Interactive prototypes",
          "User flow diagrams",
          "User testing",
          "Brand style guide",
        ],
        cta: "Get Started",
      },
    ],
  },
  {
    icon: <Code className="h-10 w-10" />,
    title: "Web Development",
    description: "Custom web applications and websites built with modern technologies.",
    tiers: [
      {
        title: "Basic",
        price: "₹12,000",
        description: "Simple websites for small businesses",
        features: ["Responsive design", "5 pages", "Contact form", "Basic SEO", "CMS integration"],
        cta: "Get Started",
      },
      {
        title: "Standard",
        price: "₹25,000",
        description: "Feature-rich websites for growing businesses",
        features: [
          "Responsive design",
          "Up to 10 pages",
          "Advanced contact forms",
          "SEO optimization",
          "CMS integration",
          "E-commerce functionality",
          "Performance optimization",
        ],
        cta: "Get Started",
        popular: true,
      },
      {
        title: "Premium",
        price: "₹50,000",
        description: "Custom web applications with advanced features",
        features: [
          "Responsive design",
          "Unlimited pages",
          "Custom functionality",
          "Advanced SEO",
          "CMS integration",
          "E-commerce with payment processing",
          "Performance optimization",
          "User authentication",
          "API integrations",
        ],
        cta: "Get Started",
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
                  <span className="text-3xl font-bold">{tier.price}</span>
                  {tier.title !== "Premium" && <span className="text-muted-foreground ml-1 text-sm">/ project</span>}
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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I offer a range of services to help businesses and individuals establish a strong online presence. From design to development to deployment, I've got you covered.
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
            I understand that every project is unique. Contact me for a personalized quote tailored to your specific requirements.
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