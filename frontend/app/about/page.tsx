import Navbar from "@/components/navbar"
import About from "@/components/about"
import Footer from "@/components/footer"

// ==============================
// 🚀 Ultra SEO-Optimized Metadata
// ==============================
export const metadata = {
  title:
    "About Manish Kandari | Freelance Full Stack Developer & Automation Expert in Rishikesh, Dehradun",
  description:
    "Know about Manish Kandari — a freelance full stack developer and automation expert from Rishikesh, Dehradun, India. Specialized in React, Next.js, Node.js, and AI-powered automation for startups and businesses.",
  keywords: [
    "Manish Kandari",
    "Freelance Full Stack Developer India",
    "Automation Expert Rishikesh",
    "Web Developer Dehradun",
    "React Next.js Developer India",
    "AI Web Developer",
    "Freelance Web Developer Rishikesh",
    "Full Stack Developer Uttarakhand",
    "Node.js Developer",
    "Frontend Developer India",
    "Backend Developer India",
    "Tech Freelancer India",
  ],
  alternates: {
    canonical: "https://www.manishkandari.dev/about",
  },
  openGraph: {
    title:
      "About Manish Kandari | Full Stack Developer & Automation Expert in Rishikesh, Dehradun",
    description:
      "Meet Manish Kandari — a freelance full stack developer and automation expert based in Rishikesh, Dehradun, India. Building AI-powered websites, automation workflows, and modern web applications using React, Next.js, and Node.js.",
    url: "https://www.manishkandari.dev/about",
    siteName: "Manish Kandari | Developer Portfolio",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manish Kandari - Freelance Full Stack Developer and Automation Expert in Rishikesh, Dehradun",
      },
    ],
    locale: "en_IN",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Manish Kandari — Full Stack Developer & Automation Expert",
    description:
      "Learn about Manish Kandari — freelance full stack developer & automation expert from Rishikesh, Dehradun, India. Expert in React, Next.js, Node.js, and web automation.",
    creator: "@manishkandari",
    images: ["https://www.manishkandari.dev/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // 🔹 Replace with your actual Search Console verification code
  },
}

// ==============================
// 🌍 About Page Component
// ==============================
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />
      <About />
      <Footer />

      {/* ✅ Google Knowledge Graph Schema (Structured Data) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Manish Kandari",
            alternateName: "Manish Kandari Developer",
            jobTitle: "Freelance Full Stack Developer & Automation Expert",
            worksFor: {
              "@type": "Organization",
              name: "Manish Kandari Web Solutions",
            },
            image: "https://www.manishkandari.dev/og-image.jpg",
            url: "https://www.manishkandari.dev/about",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Rishikesh",
              addressRegion: "Dehradun",
              addressCountry: "India",
            },
            sameAs: [
              "https://github.com/manishkandari9",
              "https://www.linkedin.com/in/manish-kandari-924907271/",
              "https://www.manishkandari.dev",
            ],
            knowsAbout: [
              "Web Development",
              "Automation",
              "React",
              "Next.js",
              "Node.js",
              "MongoDB",
              "AI Integration",
              "Frontend Development",
              "Backend Development",
              "UI/UX Design",
            ],
          }),
        }}
      />
    </main>
  )
}
