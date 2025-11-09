import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Services from "@/components/services"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar"
import FeedbackForm from "@/components/feedback-form"
import FeedbackDisplay from "@/components/feedback-display"
// import { N8nAutomations } from "@/components/n8n-automations"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Toaster />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      {/* <N8nAutomations /> */}
      <FeedbackDisplay />
      <FeedbackForm />
      <Contact />
      <Footer />
    </main>
  )
}
