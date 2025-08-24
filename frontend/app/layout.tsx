import type React from "react"
import "@/app/globals.css"
import { Inter, Fira_Code } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AnimatedCursor from "@/components/animated-cursor"
import { PortfolioProvider } from "@/context/portfolio-context"
import SidebarChat from "@/components/SidebarChat"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
})

export const metadata = {
  title: "Manish Kandari - CS Student & Freelance Developer",
  description: "Personal portfolio of Manish Kandari, Computer Science student and freelance developer",
  generator: "v0.dev",
  verification: {
    google: "RPZscNG2IE6ilwk9ucg1i_1k78MOUuRerNtQkbwpoos", // Google Search Console verification
  },
  alternates: {
    canonical: "https://manishkandaridev-portfolio.vercel.app/", // 👈 Canonical URL   
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
