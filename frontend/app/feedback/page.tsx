import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import FeedbackDisplay from "@/components/feedback-display"
import FeedbackForm from "@/components/feedback-form"

export const metadata = {
  title: "Feedback | Freelance Web Developer & SEO Expert in India - Manish Kandari",
  description:
    "Read client reviews and testimonials about Manish Kandari — a freelance web developer and SEO expert in India. See what clients say about web design, SEO, and responsive web development projects.",
  alternates: {
    canonical: "https://www.manishkandari.dev/feedback",
  },
  openGraph: {
    title: "Feedback | Freelance Web Developer & SEO Expert in India",
    description:
      "See what clients say about Manish Kandari — freelance web developer & SEO expert building responsive, SEO-optimized web applications.",
    url: "https://www.manishkandari.dev/feedback",
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
    title: "Feedback | Freelance Web Developer & SEO Expert in India",
    description:
      "Client reviews and feedback about freelance web developer Manish Kandari — expert in SEO, web development, and UI/UX design.",
    images: ["https://www.manishkandari.dev/og-image.jpg"],
  },
}

export default function FeedbackPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <FeedbackDisplay />
      <FeedbackForm />
      <Footer />
    </main>
  )
}
