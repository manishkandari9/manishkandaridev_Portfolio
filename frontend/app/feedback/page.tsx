import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FeedbackDisplay from "@/components/feedback-display"
import FeedbackForm from "@/components/feedback-form"

// ======================================================
// 🌍 High-Volume SEO Metadata (AI + Voice Search Ready)
// ======================================================
export const metadata = {
  title:
    "Client Reviews & Testimonials | Top Freelance Web Developer & SEO Expert in India - Manish Kandari",
  description:
    "Read client feedback and testimonials for Manish Kandari — a top-rated freelance web developer and SEO expert in India. Trusted for React, Next.js, and full-stack web development projects that deliver performance, design, and SEO results.",
  keywords: [
    "freelance web developer India",
    "best web developer in India",
    "React developer",
    "Next.js developer",
    "full stack web development",
    "website development services",
    "SEO expert in India",
    "website design and development",
    "top web development company",
    "hire web developer India",
    "responsive web development",
    "modern website design",
    "custom web app development",
    "UI UX designer India",
    "web development company Rishikesh",
    "web development company Dehradun",
    "hire React developer",
    "ecommerce website developer",
    "AI-powered website development",
    "client reviews freelance developer",
    "Manish Kandari reviews",
    "Manish Kandari testimonials",
    "trusted freelance web developer",
    "high performance web design",
    "affordable web development India"
  ],
  alternates: {
    canonical: "https://www.manishkandari.dev/feedback",
  },
  openGraph: {
    title:
      "Client Feedback | Freelance Web Developer & SEO Expert in India - Manish Kandari",
    description:
      "See what clients say about Manish Kandari — a freelance full stack developer and SEO expert from Rishikesh, India. Explore real reviews for web design, SEO, and React development projects.",
    url: "https://www.manishkandari.dev/feedback",
    siteName: "Manish Kandari Portfolio",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Client Reviews - Manish Kandari Freelance Web Developer & SEO Expert",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Feedback & Testimonials | Freelance Web Developer & SEO Expert in India - Manish Kandari",
    description:
      "Verified client reviews about freelance web developer and SEO expert Manish Kandari — delivering modern websites, SEO results, and UI/UX design excellence.",
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
// 🧩 Main Feedback Page (SEO + Schema + Internal Linking)
// ======================================================
export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />
      <FeedbackDisplay />
      <FeedbackForm />

      {/* ✅ Internal SEO Block */}
      <section className="py-16 text-center bg-muted/20">
        <h2 className="text-xl font-semibold text-primary mb-2">
          What Clients Say About Working With Me
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed">
          Explore how I help startups and businesses with{" "}
          <a href="/services" className="text-primary hover:underline font-medium">
            web development services
          </a>
          ,{" "}
          <a href="/projects" className="text-primary hover:underline font-medium">
            custom website design projects
          </a>
          , and{" "}
          <a href="/about" className="text-primary hover:underline font-medium">
            SEO optimization
          </a>{" "}
          to improve online visibility. Connect today via{" "}
          <a href="/contact" className="text-primary hover:underline font-medium">
            contact page
          </a>{" "}
          to hire India’s{" "}
          <strong>top freelance full stack web developer</strong> from{" "}
          <strong>Rishikesh, Dehradun</strong>.
        </p>
      </section>

      <Footer />

      {/* ✅ JSON-LD Structured Data for Google Reviews */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ReviewPage",
            name: "Client Reviews & Testimonials - Manish Kandari",
            description:
              "Read real client feedback about freelance web developer and SEO expert Manish Kandari from India.",
            url: "https://www.manishkandari.dev/feedback",
            mainEntity: {
              "@type": "Person",
              name: "Manish Kandari",
              jobTitle: "Freelance Web Developer & SEO Expert",
              worksFor: {
                "@type": "Organization",
                name: "Manish Kandari Portfolio",
                url: "https://www.manishkandari.dev",
              },
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
            review: [
              {
                "@type": "Review",
                author: "Business Owner",
                reviewBody:
                  "Manish built our website with modern UI and great SEO results. Highly recommend him for web development in India.",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                },
              },
              {
                "@type": "Review",
                author: "Startup Founder",
                reviewBody:
                  "Excellent full stack developer! React and SEO skills are top-notch. Our Google visibility improved within a month.",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                  bestRating: "5",
                },
              },
            ],
          }),
        }}
      />

      {/* ✅ BreadcrumbList Schema (Fixes “No Breadcrumb Found” Warning) */}
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
                name: "Feedback",
                item: "https://www.manishkandari.dev/feedback",
              },
            ],
          }),
        }}
      />
    </main>
  )
}
