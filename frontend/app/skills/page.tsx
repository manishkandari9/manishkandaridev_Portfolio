import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Skills from "@/components/skills"

// ======================================================
// 🧠 SEO Optimized Metadata for Global Ranking
// ======================================================
export const metadata = {
  title:
    "Skills | Full Stack Developer, AI Automation & SEO Expert in India - Manish Kandari",
  description:
    "Discover the core technical and professional skills of Manish Kandari — a freelance full stack web developer and SEO expert from India. Skilled in React, Next.js, Node.js, MongoDB, Python, and AI automation for modern business websites.",
  keywords: [
    // 🌍 High-Volume + Semantic Keywords
    "full stack web developer skills",
    "AI automation developer",
    "React and Next.js developer India",
    "freelance web developer skills",
    "technical skills of a web developer",
    "SEO and web development expertise",
    "frontend and backend developer",
    "JavaScript developer India",
    "Next.js and Node.js skills",
    "React developer skillset",
    "Python backend developer",
    "MongoDB and API development",
    "UI UX design skills",
    "responsive web design",
    "web performance optimization",
    "AI-powered web development",
    "web development tools and frameworks",
    "freelance full stack developer India",
    "software development skills",
    "digital marketing and SEO knowledge",
    "coding skills for web developers",
    "cloud integration skills",
    "automation and AI workflow developer",
    "freelance developer portfolio",
    "website optimization expert",
  ],
  alternates: {
    canonical: "https://www.manishkandari.dev/skills",
  },
  openGraph: {
    title:
      "Skills | Full Stack Developer, AI Automation & SEO Expert - Manish Kandari",
    description:
      "View the professional skillset of freelance full stack developer and SEO expert Manish Kandari from Rishikesh, India — expert in React, Next.js, Node.js, Python, and AI automation.",
    url: "https://www.manishkandari.dev/skills",
    siteName: "Manish Kandari Portfolio",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manish Kandari - Full Stack Developer & SEO Expert Skills",
      },
    ],
    locale: "en_IN",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Skills | Full Stack Developer & AI Automation Expert - Manish Kandari",
    description:
      "Explore skills in React, Next.js, Node.js, Python, MongoDB, SEO, and AI automation by freelance developer Manish Kandari from India.",
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
// 🚀 Main Skills Page with Internal SEO Link Section
// ======================================================
export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />
      <Skills />

      {/* ✅ Internal SEO Section (Keyword-Boost + Crawl Flow) */}
      <section className="py-16 text-center bg-muted/20">
        <h2 className="text-xl font-semibold text-primary mb-3">
          My Technical & Professional Expertise
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
          I specialize in{" "}
          <strong>React, Next.js, Node.js, and Python</strong> for{" "}
          <strong>full stack web development</strong>.  
          My expertise also includes{" "}
          <strong>AI automation workflows</strong>,{" "}
          <strong>SEO optimization</strong>, and{" "}
          <strong>responsive UI/UX design</strong> that help brands grow faster online.  
          Check out my{" "}
          <a href="/projects" className="text-primary hover:underline font-medium">
            web development projects
          </a>{" "}
          or learn about{" "}
          <a href="/services" className="text-primary hover:underline font-medium">
            services I offer
          </a>{" "}
          as a{" "}
          <strong>freelance full stack developer</strong> from{" "}
          <strong>Rishikesh, Dehradun (India)</strong>.
        </p>
      </section>

      <Footer />

      {/* ✅ Structured Data for Developer Skill Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Manish Kandari",
            jobTitle: "Freelance Full Stack Developer & SEO Expert",
            url: "https://www.manishkandari.dev",
            sameAs: [
              "https://github.com/manishkandari9",
              "https://www.linkedin.com/in/manish-kandari-924907271/",
              "https://www.instagram.com/manishkandari09/",
            ],
            description:
              "Freelance full stack web developer skilled in React, Next.js, Node.js, MongoDB, Python, UI/UX design, and AI automation solutions.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Rishikesh",
              addressRegion: "Dehradun",
              addressCountry: "India",
            },
            knowsAbout: [
              "React.js",
              "Next.js",
              "Node.js",
              "Python",
              "MongoDB",
              "UI/UX design",
              "SEO optimization",
              "AI automation",
              "JavaScript",
              "Frontend development",
              "Backend development",
              "APIs",
              "Web performance",
            ],
          }),
        }}
      />
    </main>
  )
}
