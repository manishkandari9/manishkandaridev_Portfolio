import Contact from "@/components/contact"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export const metadata = {
  title: "Contact | Freelance Web Developer & SEO Expert in India - Manish Kandari",
  description:
    "Get in touch with Manish Kandari — a freelance web designer and web developer near you in India. Expert in responsive web design, UI/UX, React development, and SEO-optimized web applications including e-commerce websites and modern web development services.",
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
    canonical: "https://www.manishkandari.dev/contact",
  },
  openGraph: {
    title: "Contact | Manish Kandari - Freelance Web Developer & SEO Expert in India",
    description:
      "Contact Manish Kandari — a freelance web developer, SEO expert, and UI/UX designer from India. Offering responsive web design, React and Next.js development, SEO-optimized websites, and e-commerce web solutions.",
    url: "https://www.manishkandari.dev/contact",
    siteName: "Manish Kandari Portfolio",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manish Kandari - Freelance Web Developer and SEO Expert in India",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Freelance Web Developer & SEO Expert in India",
    description:
      "Get in touch with Manish Kandari — freelance web developer & SEO expert in India specializing in responsive websites, UI/UX, and React web apps.",
    creator: "@manishkandari",
    images: ["https://www.manishkandari.dev/og-image.jpg"],
  },
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
        <Navbar />
      <Contact />
      <Footer/>
    </main>
  )
}
