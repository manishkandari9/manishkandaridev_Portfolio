import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Footer from "@/components/footer"

export const metadata = {
  title: "Services | Freelance Web Developer & SEO Expert in India - Manish Kandari",
  description:
    "Explore professional web development, SEO, and UI/UX design services by Manish Kandari — a freelance web developer and SEO expert in India. Offering responsive websites, React web apps, e-commerce solutions, and on-page & off-page SEO optimization.",
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
    canonical: "https://www.manishkandari.dev/services",
  },
  openGraph: {
    title: "Services | Freelance Web Developer & SEO Expert in India - Manish Kandari",
    description:
      "Hire Manish Kandari — freelance web developer and SEO expert in India. Get web development, React app creation, UI/UX design, and SEO-optimized websites to boost your brand.",
    url: "https://www.manishkandari.dev/services",
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
    title: "Services | Freelance Web Developer & SEO Expert in India",
    description:
      "Manish Kandari — freelance web developer & SEO expert from India. Providing responsive web design, React web development, and SEO-optimized solutions.",
    creator: "@manishkandari",
    images: ["https://www.manishkandari.dev/og-image.jpg"],
  },
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      <Navbar />

   
      <Services />

     
      <Footer />
    </main>
  )
}
