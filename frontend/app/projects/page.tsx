import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Projects from "@/components/projects"

export const metadata = {
  title: "Projects | Freelance Web Developer & SEO Expert in India - Manish Kandari",
  description:
    "Explore the projects by Manish Kandari — a freelance web designer and web developer near you in India. Expert in responsive web design, React, Next.js, UI/UX, and SEO-optimized web applications including e-commerce websites and full-stack projects.",
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
    // 🔹 SEO / Location Based
    "seo expert in india",
    "web development services india",
    "website development company in india",
    "web development company in bangalore",
    "website developer delhi",
    "web design services",
    "web design services",
    // 🔹 Secondary Keywords
    "off page seo services",
    "off page seo",
    "frontend freelance",
    "on page seo and off page seo",
    "on and off page seo"
  ],
  alternates: {
    canonical: "https://www.manishkandari.dev/projects",
  },
  openGraph: {
    title: "Projects | Manish Kandari - Freelance Web Developer & SEO Expert in India",
    description:
      "View the portfolio projects of Manish Kandari — freelance web developer and SEO expert from India. Specializing in React, Next.js, UI/UX, and SEO-optimized modern web applications.",
    url: "https://www.manishkandari.dev/projects",
    siteName: "Manish Kandari Portfolio",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manish Kandari - Freelance Web Developer Portfolio Projects",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Freelance Web Developer & SEO Expert in India",
    description:
      "Explore the best portfolio projects by Manish Kandari — freelance web developer and SEO expert from India specializing in React, Next.js, and modern web design.",
    creator: "@manishkandari",
    images: ["https://www.manishkandari.dev/og-image.jpg"],
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Projects />
      <Footer />
    </main>
  )
}
