
// Define types for all dynamic content in the portfolio

// About Section
export type CounterItem = {
  id: string
  icon: string
  value: number
  label: string
}

export type AboutData = {
  title: string
  subtitle: string
  description: string[]
  image: string
  counters: CounterItem[]
}

// Skills Section
export type Skill = {
  id: string
  name: string
  level: number
  category: "frontend" | "backend" | "tools" | "soft"
}

export type TechIcon = {
  id: string
  name: string
  icon: string
}

export type SkillsData = {
  title: string
  subtitle: string
  skills: Skill[]
  techIcons: TechIcon[]
}

// Projects Section
export type Project = {
  id: string
  title: string
  description: string
  image: string
  category: "web" | "mobile" | "backend" | "ui/ux"
  technologies: string[]
  liveLink?: string
  codeLink?: string
  challenge: string
  solution: string
}

export type ProjectsData = {
  title: string
  subtitle: string
  projects: Project[]
}

// Services Section
export type ServiceTier = {
  id: string
  title: string
  price: string
  description: string
  features: string[]
  cta: string
  popular?: boolean
}

export type Service = {
  id: string
  icon: string
  title: string
  description: string
  tiers: ServiceTier[]
}

export type ServicesData = {
  title: string
  subtitle: string
  services: Service[]
  ctaTitle: string
  ctaText: string
  ctaButton: string
}

// Feedback Section
export type UserFeedback = {
  id: string
  name: string
  email: string
  rating: number
  message: string
  date: string
  approved?: boolean
}

export type FeedbackData = {
  title: string
  subtitle: string
  formTitle: string
  formSubtitle: string
  displayTitle: string
  displaySubtitle: string
  userFeedback: UserFeedback[]
}

// Contact Section
export type ContactInfo = {
  email: string
  phone: string
  location: string
  whatsapp: string
  socials: {
    github?: string
    linkedin?: string
    twitter?: string
    instagram?: string
  }
}

export type ContactData = {
  title: string
  subtitle: string
  info: ContactInfo
}

// Hero Section
export type HeroData = {
  name: string
  tagline: string
  cta: {
    primary: {
      text: string
      link: string
    }
    secondary: {
      text: string
      link: string
    }
  }
}

// Complete Portfolio Data
export type PortfolioData = {
  hero: HeroData
  about: AboutData
  skills: SkillsData
  projects: ProjectsData
  services: ServicesData
  feedback: FeedbackData
  contact: ContactData
  siteInfo: {
    name: string
    footerText: string
  }
}
