import About from "@/components/about"
import Navbar from "@/components/navbar"

export const metadata = {
  title: "About | Manish Kandari",
  description:
    "Learn more about Manish Kandari — a freelance web developer and SEO expert from India. Specialized in React, Next.js, full-stack web development, and UI/UX design.",
  keywords: [
    "Manish Kandari",
    "freelance web developer India",
    "SEO expert India",
    "React developer",
    "Next.js developer",
    "UI/UX designer",
    "frontend developer",
    "backend developer",
  ],
  alternates: {
    canonical: "https://www.manishkandari.dev/about",
  },
  openGraph: {
    title: "About | Manish Kandari",
    description:
      "Meet Manish Kandari — freelance web developer & SEO expert from India, specializing in React, Next.js, and SEO-optimized web applications.",
    url: "https://www.manishkandari.dev/about",
    siteName: "Manish Kandari Portfolio",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manish Kandari - Freelance Web Developer and SEO Expert",
      },
    ],
    locale: "en_IN",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Manish Kandari",
    description:
      "Know more about Manish Kandari — freelance web developer & SEO expert building high-performance web apps using React & Next.js.",
    images: ["https://www.manishkandari.dev/og-image.jpg"],
  },
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* ✅ This imports your animated About component from components/about.tsx */}
      <Navbar />
      <About />
    </main>
  )
}
