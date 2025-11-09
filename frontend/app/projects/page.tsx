import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Projects from "@/components/projects"

// ======================================================
// 🧠 SEO Optimized Metadata (AI + Portfolio + Developer Keywords)
// ======================================================
export const metadata = {
  title:
    "Projects | Full Stack & AI Web Development Portfolio - Manish Kandari | Freelance Developer in India",
  description:
    "Discover portfolio projects by Manish Kandari — a top-rated freelance full stack and AI web developer in India. Expert in React, Next.js, Node.js, MongoDB, and modern responsive web development. Explore real-world apps, SEO-optimized websites, and automation solutions.",
  keywords: [
    "freelance web developer India",
    "full stack developer portfolio",
    "AI web development projects",
    "React developer projects",
    "Next.js portfolio",
    "Node.js developer projects",
    "best freelance web developer",
    "frontend and backend developer",
    "modern web design projects",
    "custom website development",
    "responsive web applications",
    "hire web developer India",
    "SEO optimized web projects",
    "web development case studies",
    "ecommerce website development",
    "real world web apps",
    "UI UX design portfolio",
    "automation web apps",
    "Rishikesh web developer",
    "Dehradun web developer",
    "top freelance web developer in India",
    "professional portfolio websites",
    "freelance developer React Node",
    "AI project development India",
    "next js web developer",
    "web design company India",
    "website development agency",
  ],
  alternates: {
    canonical: "https://www.manishkandari.dev/projects",
  },
  openGraph: {
    title:
      "Projects | Full Stack & AI Web Developer Portfolio - Manish Kandari (India)",
    description:
      "Explore professional web development and AI automation projects by freelance full stack developer Manish Kandari from India. Building responsive websites with React, Next.js, and Node.js.",
    url: "https://www.manishkandari.dev/projects",
    siteName: "Manish Kandari Portfolio",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manish Kandari - Full Stack & AI Web Developer Portfolio",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Projects | Full Stack & AI Web Development Portfolio - Manish Kandari",
    description:
      "Discover real-world AI and web development projects by freelance developer Manish Kandari — React, Next.js, Node.js, and SEO-friendly design.",
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
}

// ======================================================
// 🚀 Projects Page (SEO + BreadcrumbList Schema)
// ======================================================
export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />
      <Projects />

      {/* ✅ Internal SEO Section */}
      <section className="py-16 text-center bg-muted/20">
        <h2 className="text-xl font-semibold text-primary mb-2">
          Explore My Full Stack Web Development Projects
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
          Browse real-world{" "}
          <strong>React, Next.js, and AI-based web applications</strong> built
          for businesses and startups in{" "}
          <strong>Rishikesh, Dehradun, and across India</strong>. Want to
          collaborate?{" "}
          <a href="/contact" className="text-primary hover:underline font-medium">
            Contact me
          </a>{" "}
          or check my{" "}
          <a href="/services" className="text-primary hover:underline font-medium">
            web development services
          </a>{" "}
          to start your next{" "}
          <strong>SEO-optimized, fast-loading digital project</strong>.
        </p>
      </section>

      <Footer />

      {/* ✅ JSON-LD: Portfolio Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Portfolio",
            name: "Web Development Projects - Manish Kandari",
            description:
              "Portfolio of freelance web developer and SEO expert Manish Kandari from India. Featuring React, Next.js, and AI-based web development projects.",
            url: "https://www.manishkandari.dev/projects",
            creator: {
              "@type": "Person",
              name: "Manish Kandari",
              jobTitle: "Full Stack Web Developer & SEO Expert",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Rishikesh",
                addressRegion: "Dehradun",
                addressCountry: "India",
              },
              sameAs: [
                "https://github.com/manishkandari9",
                "https://www.linkedin.com/in/manish-kandari-924907271/",
                "https://www.instagram.com/manishkandari09/",
                "https://www.manishkandari.dev",
              ],
            },
            hasPart: [
              {
                "@type": "CreativeWork",
                name: "AI Automation Dashboard",
                description:
                  "A web app that automates workflow management using AI and backend logic built in Node.js and React.",
                programmingLanguage: ["JavaScript", "Node.js", "React"],
              },
              {
                "@type": "CreativeWork",
                name: "E-commerce Storefront",
                description:
                  "SEO-optimized e-commerce website developed with Next.js and integrated with Stripe payment gateway.",
                programmingLanguage: ["Next.js", "MongoDB", "CSS"],
              },
            ],
          }),
        }}
      />

      {/* ✅ JSON-LD: BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.manishkandari.dev/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Projects",
                item: "https://www.manishkandari.dev/projects",
              },
            ],
          }),
        }}
      />
    </main>
  )
}
