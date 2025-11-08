import type { ReactNode } from "react"
import "@/app/globals.css"
import { Inter, Fira_Code } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AnimatedCursor from "@/components/animated-cursor"
import { PortfolioProvider } from "@/context/portfolio-context"
import SidebarChat from "@/components/SidebarChat"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

// ==========================
// Fonts Setup
// ==========================
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
})

// ==========================
// 🚀 Fully Optimized SEO Metadata
// ==========================
export const metadata = {
  title: "Freelance Web Developer & SEO Expert in India | Manish Kandari",
  description:
    "Hire Manish Kandari — a freelance web developer and SEO expert from India. Specializing in responsive websites, React development, UI/UX design, e-commerce websites, and on-page & off-page SEO services.",
  keywords: [
    "freelance web developer India",
    "freelance web designer near me",
    "SEO expert in India",
    "web development services India",
    "website development company in India",
    "web development company in Bangalore",
    "website developer Delhi",
    "web design services",
    "off page SEO services",
    "frontend freelance",
    "ui ux design",
    "responsive design",
    "e-commerce websites",
    "react developer",
    "html css javascript",
    "backend developer",
  ],
  generator: "Next.js + Vercel",
  alternates: {
    canonical: "https://www.manishkandari.dev/",
  },
  openGraph: {
    title: "Hire Freelance Web Developer & SEO Expert in India | Manish Kandari",
    description:
      "Hire Manish Kandari — a freelance web developer and SEO expert from India offering responsive websites, React applications, UI/UX design, and complete on-page & off-page SEO solutions.",
    url: "https://www.manishkandari.dev/",
    siteName: "Manish Kandari Portfolio",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manish Kandari - Freelance Web Developer and SEO Expert Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelance Web Developer & SEO Expert — Manish Kandari",
    description:
      "Manish Kandari — freelance web developer and SEO expert from India specializing in React, responsive design, and web application development.",
    creator: "@manishkandari",
    images: ["https://www.manishkandari.dev/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // optional
  },
}

// ==========================
// Root Layout (100% Optimized)
// ==========================
interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Author and Theme Color Meta Tags */}
        <meta name="author" content="Manish Kandari" />
        <meta name="theme-color" content="#0a0a0a" />

        {/* ✅ Schema Markup for Person (Knowledge Graph) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Manish Kandari",
              jobTitle: "Freelance Web Developer & SEO Expert",
              url: "https://www.manishkandari.dev",
              image: "https://www.manishkandari.dev/og-image.jpg",
              sameAs: [
                "https://www.linkedin.com/in/manish-kandari-924907271/",
                "https://github.com/manishkandari9",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Manish Kandari Web Solutions",
              },
              knowsAbout: [
                "Web Development",
                "React",
                "Node.js",
                "MongoDB",
                "UI/UX Design",
                "SEO",
                "Digital Marketing",
              ],
            }),
          }}
        />

        {/* ✅ Image Schema (Rich Result + Copyright) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageObject",
              contentUrl: "https://www.manishkandari.dev/og-image.jpg",
              creator: {
                "@type": "Person",
                name: "Manish Kandari",
              },
              creditText: "Manish Kandari Portfolio",
              description:
                "Hire Manish Kandari — Freelance Web Developer and SEO Expert in India specializing in responsive web design, UI/UX development, and SEO-optimized websites.",
              caption:
                "Manish Kandari | Freelance Web Developer & SEO Expert in India",
              license: "https://creativecommons.org/licenses/by/4.0/",
              copyrightNotice: "© 2025 Manish Kandari. All rights reserved.",
              acquireLicensePage: "https://www.manishkandari.dev/",
            }),
          }}
        />

        {/* ✅ Sitemap & Robots.txt */}
        <link
          rel="sitemap"
          type="application/xml"
          href="https://www.manishkandari.dev/sitemap.xml"
        />
        <meta name="robots" content="index, follow" />
      </head>

      <body
        className={`${inter.variable} ${firaCode.variable} font-sans bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PortfolioProvider>
            {children}
            <SidebarChat />
            <AnimatedCursor />
          </PortfolioProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
