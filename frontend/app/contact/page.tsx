import Navbar from "@/components/navbar"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

// ======================================================
// 🚀 100% SEO Optimized Metadata (Local + Global Target)
// ======================================================
export const metadata = {
  title:
    "Contact | Freelance Full Stack Developer & SEO Expert in Rishikesh, Dehradun - Manish Kandari",
  description:
    "Contact Manish Kandari — a freelance full stack web developer, automation expert, and SEO specialist based in Rishikesh, Dehradun (India). Expert in React, Next.js, UI/UX design, and modern web development services for startups and businesses.",
  keywords: [
    // 🔹 Core SEO Keywords
    "Manish Kandari",
    "freelance full stack developer India",
    "web developer Rishikesh",
    "web developer Dehradun",
    "automation expert India",
    "React developer",
    "Next.js developer",
    "SEO expert India",
    "freelance web developer near me",
    "UI UX designer",
    "frontend developer",
    "backend developer",
    "freelance web designer India",
    "responsive web design",
    "AI web automation",
    "web development services India",
    "custom website development",
    "modern web apps",
    "portfolio web developer India",
    "hire freelance web developer",
    "contact freelance developer",
    "hire web developer in India",
    // 🔹 Support Keywords
    "web design Rishikesh",
    "web development Dehradun",
    "SEO and web design services",
    "website development company in India",
    "freelancer near Rishikesh",
  ],
  alternates: {
    canonical: "https://www.manishkandari.dev/contact",
  },
  openGraph: {
    title:
      "Contact | Manish Kandari - Freelance Full Stack Developer & Automation Expert",
    description:
      "Get in touch with Manish Kandari — freelance full stack web developer & SEO expert from Rishikesh, Dehradun, India. Offering modern React, Next.js, and AI-powered automation solutions.",
    url: "https://www.manishkandari.dev/contact",
    siteName: "Manish Kandari Portfolio",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Manish Kandari - Freelance Web Developer and SEO Expert in India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Contact | Manish Kandari - Freelance Full Stack Developer & SEO Expert in India",
    description:
      "Contact Manish Kandari — freelance full stack web developer and SEO expert from Rishikesh, Dehradun, India. Expert in React, Next.js, and automation.",
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
    google: "your-google-verification-code", // ✅ Replace with your real GSC verification ID
  },
}

// ======================================================
// 🧠 Main Contact Page Component
// ======================================================
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />
      <Contact />

      {/* ✅ Internal SEO Section for Link Building */}
      <section className="py-16 text-center bg-muted/20">
        <h2 className="text-xl font-semibold text-primary mb-2">
          Let's Build Something Great Together
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
          Have a project idea or want to collaborate with{" "}
          <a
            href="/about"
            className="text-primary hover:underline font-medium"
          >
            Manish Kandari
          </a>{" "}
          — a{" "}
          <a
            href="/"
            className="text-primary hover:underline font-medium"
          >
            freelance full stack web developer
          </a>{" "}
          and{" "}
          <a
            href="/services"
            className="text-primary hover:underline font-medium"
          >
            automation expert
          </a>{" "}
          from{" "}
          <strong>Rishikesh, Dehradun (India)</strong>? Explore{" "}
          <a
            href="/projects"
            className="text-primary hover:underline font-medium"
          >
            my projects
          </a>{" "}
          or{" "}
          <a
            href="/services"
            className="text-primary hover:underline font-medium"
          >
            services
          </a>{" "}
          and let’s turn your idea into reality.
        </p>
      </section>

      <Footer />

      {/* ✅ JSON-LD Schema for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Manish Kandari",
            description:
              "Contact Manish Kandari — freelance full stack developer & SEO expert in India. Reach out for web development, automation, and React/Next.js projects.",
            url: "https://www.manishkandari.dev/contact",
            mainEntity: {
              "@type": "Person",
              name: "Manish Kandari",
              jobTitle:
                "Freelance Full Stack Developer & Automation Expert",
              image: "https://www.manishkandari.dev/og-image.jpg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Rishikesh",
                addressRegion: "Dehradun",
                addressCountry: "India",
              },
              email: "mailto:manishkandari168@gmail.com",
              telephone: "+91-7830130183",
              sameAs: [
                "https://github.com/manishkandari9",
                "https://www.linkedin.com/in/manish-kandari-924907271/",
                "https://www.instagram.com/manishkandari09/",
                "https://www.manishkandari.dev",
              ],
            },
          }),
        }}
      />
    </main>
  )
}
