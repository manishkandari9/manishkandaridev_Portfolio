import type { ReactNode } from "react"
import "@/app/globals.css"
import { Inter, Fira_Code } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AnimatedCursor from "@/components/animated-cursor"
import { PortfolioProvider } from "@/context/portfolio-context"
import SidebarChat from "@/components/SidebarChat"

// Fonts
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

export const metadata = {
  title: "Manish Kandari - CS Student & Freelance Developer",
  description: "Personal portfolio of Manish Kandari, Computer Science student and freelance developer",
  generator: "v0.dev",
  verification: {
    google: "DC9RwBYsHzEw_9rl17b4knQk1Iyi1UpIXP3fl9_39do",
  },
  alternates: {
    canonical: "https://manishkandaridev-portfolio.vercel.app/",
  },
}

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
