import type { ReactNode } from "react"
import "@/app/globals.css"
import { Inter, Fira_Code } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AnimatedCursor from "@/components/animated-cursor"
import { PortfolioProvider } from "@/context/portfolio-context"
import SidebarChat from "@/components/SidebarChat"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"



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
// 🌍 Fully Optimized Metadata
// ==========================
export const metadata = {
  title:
  "Full Stack Developer & Automation Expert | Manish Kandari",
    // "Freelance Full Stack Developer & Automation Expert in Rishikesh, Dehradun, India | AI Agents & Web Apps - Manish Kandari",
  description:
   "Hire Manish Kandari—a full-stack developer & automation expert from India. I create AI-powered web apps, workflow automation tools, and smart digital solutions.",

  keywords: [
    "freelance full stack developer",
    "automation expert",
    "AI agent developer",
    "n8n workflow developer",
    "web app developer",
    "freelance web developer",
    "React Node.js developer",
    "Python automation developer",
    "business workflow automation",
    "AI automation services",
    "remote full stack developer",
    "software developer for startups",
    "full stack developer in Rishikesh",
    "full stack developer in Dehradun",
    "automation expert in Rishikesh",
    "automation expert in Dehradun",
    "AI developer in Rishikesh",
    "AI developer in Dehradun",
    "web development company Rishikesh",
    "web development company Dehradun",
    "software developer in India",
    "website developer Rishikesh",
    "website developer Dehradun",
  ],
  generator: "Next.js + Vercel",
  alternates: {
    canonical: "https://www.manishkandari.dev/",
  },
  openGraph: {
    title:
      "Hire Full Stack Developer & Automation Expert in Rishikesh, Dehradun, India - Manish Kandari",
    description:
      "Manish Kandari — freelance full stack developer and automation expert offering AI agents, web apps, and n8n workflow automation for global clients.",
    url: "https://www.manishkandari.dev/",
    siteName: "Manish Kandari Web Solutions",
    images: [
      {
        url: "https://www.manishkandari.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Manish Kandari - Full Stack Developer & Automation Expert in Rishikesh, Dehradun, India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Freelance Full Stack Developer & Automation Expert - Manish Kandari",
    description:
      "Hire Manish Kandari — freelance full stack developer & automation expert from Rishikesh, Dehradun, India. Specialized in React, Node.js, AI agents & workflow automation.",
    creator: "@manishkandari",
    images: ["https://www.manishkandari.dev/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
    ],
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
}

// ==========================
// Root Layout
// ==========================
interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="author" content="Manish Kandari" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark light" />

        {/* 🌐 Geo & Local SEO Tags */}
        <meta name="geo.region" content="IN-UT" />
        <meta name="geo.placename" content="Rishikesh, Dehradun, India" />
        <meta name="geo.position" content="30.0869;78.2676" />
        <meta name="ICBM" content="30.0869, 78.2676" />

         <meta
          name="ai-topic"
            content="Full Stack Development, Automation, AI Web Solutions, React Developer in India"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link rel="preconnect" href="https://www.googletagmanager.com" />


        {/* ✅ Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Manish Kandari",
              jobTitle: "Freelance Full Stack Developer & Automation Expert",
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
                "Automation",
                "n8n",
                "AI Agents",
                "Workflow Automation",
              ],
            }),
          }}
        />

        {/* ✅ Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Manish Kandari Web Solutions",
              image: "https://www.manishkandari.dev/og-image.jpg",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Rishikesh",
                addressRegion: "Uttarakhand",
                addressCountry: "India",
              },
              areaServed: ["Rishikesh", "Dehradun", "India"],
              geo: {
                "@type": "GeoCoordinates",
                latitude: "30.0869",
                longitude: "78.2676",
              },
              url: "https://www.manishkandari.dev",
              sameAs: [
                "https://github.com/manishkandari9",
                "https://www.linkedin.com/in/manish-kandari-924907271/",
              ],
            }),
          }}
        />

        {/* ✅ Image Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ImageObject",
              contentUrl: "https://www.manishkandari.dev/og-image.jpg",
              creator: { "@type": "Person", name: "Manish Kandari" },
              creditText: "Manish Kandari Web Solutions",
              description:
                "Hire Manish Kandari — Freelance Full Stack Developer & Automation Expert in Rishikesh, Dehradun, India.",
              caption:
                "Manish Kandari | Full Stack Developer & Automation Expert in Rishikesh, Dehradun, India",
              license: "https://creativecommons.org/licenses/by/4.0/",
              copyrightNotice: "© 2025 Manish Kandari. All rights reserved.",
               acquireLicensePage: "https://www.manishkandari.dev/license", // ✅ Add this line
            }),
          }}
        />

        {/* ✅ Breadcrumb Schema Added */}
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
              ],
            }),
          }}
        />

        {/* ✅ Google Analytics (GA4) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />

        <link
          rel="sitemap"
          type="application/xml"
          href="https://www.manishkandari.dev/sitemap.xml"
        />
        <meta name="robots" content="index, follow" />
      </head>

      <body
        className={`${inter.variable} ${firaCode.variable} font-sans bg-background text-foreground`}
        aria-label="Manish Kandari Web Solutions"
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
