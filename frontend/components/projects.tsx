"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"

type Project = {
  id: number
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

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform with product management, cart functionality, and payment integration.",
    image: "/placeholder.svg?height=600&width=800",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    liveLink: "https://example.com",
    codeLink: "https://github.com",
    challenge: "Implementing a secure payment system and optimizing the performance of product filtering and search.",
    solution:
      "Utilized Stripe's secure payment API and implemented server-side filtering with pagination to improve performance.",
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A mobile-first task management application with real-time updates and offline capabilities.",
    image: "/placeholder.svg?height=600&width=800",
    category: "mobile",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    liveLink: "https://example.com",
    codeLink: "https://github.com",
    challenge: "Ensuring data synchronization between offline and online modes without conflicts.",
    solution: "Implemented a custom synchronization algorithm with timestamp-based conflict resolution.",
  },
  {
    id: 3,
    title: "API Gateway Service",
    description: "A microservice-based API gateway that handles authentication, rate limiting, and request routing.",
    image: "/placeholder.svg?height=600&width=800",
    category: "backend",
    technologies: ["Node.js", "Express", "Docker", "Redis", "JWT"],
    codeLink: "https://github.com",
    challenge: "Designing a scalable architecture that could handle high traffic loads without becoming a bottleneck.",
    solution: "Implemented a horizontally scalable design with Redis for distributed caching and rate limiting.",
  },
  {
    id: 4,
    title: "Finance Dashboard UI",
    description:
      "A comprehensive financial dashboard with interactive charts, data visualization, and responsive design.",
    image: "/placeholder.svg?height=600&width=800",
    category: "ui/ux",
    technologies: ["Figma", "React", "Chart.js", "Tailwind CSS"],
    liveLink: "https://example.com",
    challenge: "Creating an intuitive interface that could display complex financial data in an accessible way.",
    solution:
      "Conducted user research to inform the design and used progressive disclosure patterns to manage complexity.",
  },
  {
    id: 5,
    title: "Social Media Platform",
    description: "A social networking platform with real-time messaging, post sharing, and user connections.",
    image: "/placeholder.svg?height=600&width=800",
    category: "web",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "AWS S3"],
    liveLink: "https://example.com",
    codeLink: "https://github.com",
    challenge: "Building a scalable real-time communication system that could support thousands of concurrent users.",
    solution:
      "Implemented a microservice architecture with Socket.io for real-time features and optimized database queries.",
  },
  {
    id: 6,
    title: "Fitness Tracking App",
    description:
      "A mobile application for tracking workouts, nutrition, and fitness progress with personalized recommendations.",
    image: "/placeholder.svg?height=600&width=800",
    category: "mobile",
    technologies: ["Flutter", "Firebase", "TensorFlow Lite"],
    liveLink: "https://example.com",
    challenge: "Implementing accurate exercise recognition and providing meaningful insights from user data.",
    solution:
      "Used TensorFlow Lite for on-device pose estimation and developed custom algorithms for progress tracking.",
  },
]

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      whileHover={{ y: -10 }}
    >
      <div className="overflow-hidden rounded-xl bg-card/30 backdrop-blur-sm border border-border h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="outline" className="text-white border-white hover:bg-white/20">
              View Details
            </Button>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <Badge className="self-start mb-2" variant="outline">
            {project.category}
          </Badge>
          <h3 className="text-lg font-bold mb-2">{project.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 flex-1">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <DialogDescription>
            <Badge className="mt-2" variant="outline">
              {project.category}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        </div>

        <div className="space-y-4">
          <p>{project.description}</p>

          <div>
            <h4 className="font-bold mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">Challenge</h4>
            <p className="text-muted-foreground">{project.challenge}</p>
          </div>

          <div>
            <h4 className="font-bold mb-2">Solution</h4>
            <p className="text-muted-foreground">{project.solution}</p>
          </div>

          <div className="flex gap-4 pt-4">
            {project.liveLink && (
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </Link>
            )}

            {project.codeLink && (
              <Link href={project.codeLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              </Link>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter)

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeProjectModal = () => {
    setIsModalOpen(false)
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one presented unique challenges and opportunities to
            learn and grow as a developer.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center flex-wrap gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {["all", "web", "mobile", "backend", "ui/ux"].map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} onClick={() => openProjectModal(project)} />
            ))}
          </motion.div>
        </AnimatePresence>

        <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />
      </div>
    </section>
  )
}
