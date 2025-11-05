import type { ReactNode } from "react"
import "@/app/globals.css"
import { Inter, Fira_Code } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AnimatedCursor from "@/components/animated-cursor"
import { PortfolioProvider } from "@/context/portfolio-context"
import SidebarChat from "@/components/SidebarChat"

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
// Metadata (Updated for manishkandari.dev)
// ==========================
export const metadata = {
  title: "Manish Kandari - CS Student & Freelance Developer",
  description:
    "Personal portfolio of Manish Kandari, a Computer Science student and freelance developer specializing in modern web technologies, backend systems, and UI/UX design.",
  generator: "Next.js + Vercel",
  alternates: {
    canonical: "https://manishkandari.dev/", // ✅ Updated to your custom domain
  },
  openGraph: {
    title: "Manish Kandari - CS Student & Freelance Developer",
    description:
      "Explore the portfolio of Manish Kandari — Computer Science student, full-stack developer, and tech enthusiast.",
    url: "https://manishkandari.dev/",
    siteName: "Manish Kandari Portfolio",
    images: [
      {
        url: "https://manishkandari.dev/og-image.jpg", // ✅ Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Manish Kandari Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manish Kandari - CS Student & Freelance Developer",
    description:
      "Explore the personal portfolio of Manish Kandari, a passionate CS student and developer.",
    creator: "@manishkandari", // optional if you make a Twitter account
    images: ["https://manishkandari.dev/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
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
      <body className={`${inter.variable} ${firaCode.variable} font-sans`}>
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
      </body>
    </html>
  )
}
