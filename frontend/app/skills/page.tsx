import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Skills from "@/components/skills"

export const metadata = {
  title: "Skills | Freelance Web Developer & SEO Expert in India - Manish Kandari",
  description:
    "Explore the technical and professional skills of Manish Kandari — a freelance web designer and web developer near you in India. Expert in React, Next.js, UI/UX, backend development, and SEO-optimized web solutions.",
  keywords: [
    // 🔹 Primary Keywords
    "freelance web designer near me",
    "freelance web developer near me",
    "freelance developer",
    "web developer freelance",
    "web developer",
    "responsive design",
    "web design",
    "page design",
    "freelance website",
    "creating websites",
    "web application development",
    "e commerce websites",
    "user flow",
    "web development projects",
    "ui ux design",
    "ui ux",
    "freelance react developer",
    "js react",
    "backend developer",
    "websites developer",
    "ui and ux design",
    "html css javascript",
    "web design websites",
    // 🔹 SEO/Location Based
    "seo expert in india",
    "web development services india",
    "website development company in india",
    "web development company in bangalore",
    "website developer delhi",
    "web design services",
    // 🔹 Secondary Keywords
    "off page seo services",
    "off page seo",
    "frontend freelance",
    "on page seo and off page seo",
    "on and off page seo"
  ],
  alternates: {
    canonical: "https://www.manishkandari.dev/skills",
  },
  openGraph: {
    title: "Skills | Manish Kandari - Freelance Web Developer & SEO Expert in India",
    description:
      "View the professional skills of Manish Kandari — freelance web developer and SEO expert from India specializing in React, Next.js, and full-stack web development.",
    url: "https://www.manishkandari.dev/skills",
    siteName: "Manish Kandari Portfolio",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manish Kandari - Skills in Web Development and SEO",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skills | Freelance Web Developer & SEO Expert in India",
    description:
      "Check out the skillset of Manish Kandari — freelance web developer and SEO expert specializing in React, Next.js, UI/UX, and modern web technologies.",
    creator: "@manishkandari",
    images: ["https://www.manishkandari.dev/og-image.jpg"],
  },
}

export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Skills />
      <Footer />
    </main>
  )
}
