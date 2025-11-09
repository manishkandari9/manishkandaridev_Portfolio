import Navbar from "@/components/navbar"
import Services from "@/components/services"
import Footer from "@/components/footer"

// ======================================================
// 🧠 AI + SEO Optimized Metadata (High-Intent Keywords)
// ======================================================
export const metadata = {
  title:
    "Services | AI Web Development, Automation & SEO Solutions - Manish Kandari | Freelance Full Stack Developer India",
  description:
    "Hire Manish Kandari — a freelance full stack web developer and SEO expert in India. Offering AI-powered web development, automation workflows, React and Next.js services, responsive UI/UX design, and SEO optimization for startups and businesses.",
  keywords: [
    "AI web development services",
    "full stack developer India",
    "hire web developer India",
    "custom web application development",
    "automation workflow solutions",
    "React developer services",
    "Next.js developer services",
    "SEO optimization services",
    "responsive web design",
    "ecommerce website development",
    "AI automation for business",
    "modern website design India",
    "professional portfolio websites",
    "web development for startups",
    "freelance full stack developer",
    "frontend and backend services",
    "website redesign and SEO",
    "UI UX design and branding",
    "web development company India",
    "SEO expert in India",
    "website speed optimization",
    "AI chatbots for websites",
    "digital transformation developer",
    "data-driven website development",
    "API integration and backend automation",
    "cloud web app development",
  ],
  alternates: {
    canonical: "https://www.manishkandari.dev/services",
  },
  openGraph: {
    title:
      "Services | AI Web Development, Automation & SEO Solutions - Manish Kandari",
    description:
      "Explore AI web development, SEO, and automation services by freelance full stack developer Manish Kandari. Expert in React, Next.js, MongoDB, and workflow automation.",
    url: "https://www.manishkandari.dev/services",
    siteName: "Manish Kandari Portfolio",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Web Development and SEO Services by Manish Kandari",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AI Web Development & SEO Services | Freelance Developer - Manish Kandari",
    description:
      "Freelance full stack developer and SEO expert from India — delivering automation workflows, React & Next.js web apps, and AI-powered solutions.",
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
// 🚀 Main Services Page
// ======================================================
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />
      <Services />

      {/* ✅ Internal SEO Section for Deep Linking */}
      <section className="py-16 text-center bg-muted/20">
        <h2 className="text-xl font-semibold text-primary mb-3">
          Build Smarter Websites with AI & Automation
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
          I offer{" "}
          <strong>AI-powered web development</strong>,{" "}
          <strong>automation workflow solutions</strong>, and{" "}
          <strong>SEO-driven websites</strong> designed to grow your brand.{" "}
          Whether you need a{" "}
          <a
            href="/projects"
            className="text-primary hover:underline font-medium"
          >
            full stack project
          </a>
          ,{" "}
          <a
            href="/contact"
            className="text-primary hover:underline font-medium"
          >
            a custom web app
          </a>
          , or{" "}
          <a
            href="/about"
            className="text-primary hover:underline font-medium"
          >
            consultation with a freelance developer
          </a>
          , I help businesses in{" "}
          <strong>Rishikesh, Dehradun, and across India</strong> scale faster
          with technology and design that perform.
        </p>
      </section>

      <Footer />

      {/* ✅ JSON-LD Schema for ServiceList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "AI Web Development & SEO Services - Manish Kandari",
            provider: {
              "@type": "Person",
              name: "Manish Kandari",
              jobTitle: "Freelance Full Stack Web Developer & SEO Expert",
              url: "https://www.manishkandari.dev",
              sameAs: [
                "https://github.com/manishkandari9",
                "https://www.linkedin.com/in/manish-kandari-924907271/",
                "https://www.instagram.com/manishkandari09/",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Rishikesh",
                addressRegion: "Dehradun",
                addressCountry: "India",
              },
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Freelance Web Development Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "AI Web Development",
                    description:
                      "Building intelligent websites and web apps using AI integration, automation, and modern frameworks like Next.js and Node.js.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "SEO Optimization",
                    description:
                      "On-page and off-page SEO services to boost visibility, speed, and performance across Google and AI search engines.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "UI/UX Design",
                    description:
                      "Modern and responsive UI/UX design for high-converting websites and digital platforms.",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* ✅ BreadcrumbList Schema (Fixes GSC Warning) */}
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
                name: "Services",
                item: "https://www.manishkandari.dev/services",
              },
            ],
          }),
        }}
      />
    </main>
  )
}
