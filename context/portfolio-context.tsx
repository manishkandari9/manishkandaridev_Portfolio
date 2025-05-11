"use client"

import { createContext, useContext, type ReactNode } from "react"
import { portfolioData } from "@/data/portfolio-data"
import type { PortfolioData } from "@/types/portfolio"

// Create the context
const PortfolioContext = createContext<PortfolioData | undefined>(undefined)

// Create a provider component
export function PortfolioProvider({ children }: { children: ReactNode }) {
  return <PortfolioContext.Provider value={portfolioData}>{children}</PortfolioContext.Provider>
}

// Create a hook to use the context
export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider")
  }
  return context
}
