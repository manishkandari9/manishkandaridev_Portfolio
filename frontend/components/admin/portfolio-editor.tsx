"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { InfoIcon, PlusCircle, Trash2, Star, LayoutGrid, FilePlus, Edit } from "lucide-react"
import { Upload, Menu, X, MoreVertical, ChevronRight, Check } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { format, parseISO } from "date-fns"
import { cn } from "@/lib/utils"

interface FeedbackItem {
  id: string
  name: string
  message: string
  rating: number
  date: string
  approved: boolean
}

interface ProjectItem {
  id: string
  title: string
  description: string
  image: string // URL from Cloudinary
  category: "web" | "mobile" | "backend" | "ui/ux"
  technologies: string[]
  liveLink: string
  codeLink: string
  challenge: string
  solution: string
}

export default function PortfolioEditor() {
  const { toast } = useToast()
  const [activeSection, setActiveSection] = useState<"project" | "feedback" | "manage-projects">("project")
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: null as File | null,
    category: "web" as "web" | "mobile" | "backend" | "ui/ux",
    technologies: "",
    liveLink: "",
    codeLink: "",
    challenge: "",
    solution: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [filter, setFilter] = useState<"all" | "approved" | "pending">("all")
  const [sort, setSort] = useState<"date-asc" | "date-desc" | "rating-asc" | "rating-desc">("date-desc")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // New state for Manage Projects
  const [projects, setProjects] = useState<ProjectItem[]>([])
  const [editProjectForm, setEditProjectForm] = useState<ProjectItem | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeletingProject, setIsDeletingProject] = useState<string | null>(null)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Define interface for CustomFileInput props
  interface CustomFileInputProps {
    id: string;
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    className?: string;
  }

  // Custom file input component with icon
 const CustomFileInput = ({ id, label, onChange, required = false, className = "" }: CustomFileInputProps) => {
    const [fileName, setFileName] = useState("")

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) {
        setFileName(file.name)
        onChange(e)
      }
    }

    return (
      <div className={className}>
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        <div className="mt-1 relative">
          <div className="flex items-center">
            <label
              htmlFor={id}
              className="flex-1 flex items-center gap-2 px-4 py-2 bg-card/70 hover:bg-card/90 border border-border rounded-md cursor-pointer transition-all duration-300 hover:border-primary/50 group"
            >
              <Upload className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm truncate">{fileName ? fileName : "Choose file..."}</span>
            </label>
            {fileName && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-2"
                onClick={() => {
                  setFileName("")
                  // Reset the file input
                  const fileInput = document.getElementById(id) as HTMLInputElement
                  if (fileInput) fileInput.value = ""
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <input
            id={id}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required={required}
            className="sr-only"
          />
        </div>
      </div>
    )
  }

  // Fetch feedback from backend
  const fetchFeedback = async () => {
    try {
      const response = await axios.get("https://backend-cf0k.onrender.com/feedback")
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid response format")
      }
      const mappedFeedback = response.data.map((item: any) => ({
        id: item._id,
        name: item.name,
        message: item.message,
        rating: item.rating,
        date: item.date,
        approved: item.approved,
      }))
      setFeedbackItems(mappedFeedback)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch feedback. Please check your network or try again later.",
        variant: "destructive",
      })
      console.error("Fetch feedback error:", error)
    }
  }

  // Fetch projects from backend
  const fetchProjects = async () => {
    try {
      const response = await axios.get("https://backend-cf0k.onrender.com/api/projects")
      if (!Array.isArray(response.data)) {
        throw new Error("Invalid response format")
      }
      const mappedProjects = response.data.map((item: any) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        image: item.image,
        category: item.category,
        technologies: item.technologies,
        liveLink: item.liveLink,
        codeLink: item.codeLink,
        challenge: item.challenge,
        solution: item.solution,
      }))
      setProjects(mappedProjects)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects. Please check your network or try again later.",
        variant: "destructive",
      })
      console.error("Fetch projects error:", error)
    }
  }

  // Initial fetch
  useEffect(() => {
    fetchFeedback()
    fetchProjects()
  }, [])

  // Handle project form submission (Add Project)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("title", projectForm.title)
      formData.append("description", projectForm.description)
      if (projectForm.image) {
        formData.append("image", projectForm.image)
      }
      formData.append("category", projectForm.category)
      formData.append("technologies", JSON.stringify(projectForm.technologies.split(",").map((tech) => tech.trim())))
      formData.append("liveLink", projectForm.liveLink)
      formData.append("codeLink", projectForm.codeLink)
      formData.append("challenge", projectForm.challenge)
      formData.append("solution", projectForm.solution)

      const response = await axios.post("https://backend-cf0k.onrender.com/api/projects/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 201) {
        toast({
          title: "Project Added",
          description: "Your project has been successfully added to the portfolio.",
          className: "bg-green-500 text-white",
        })
        setProjectForm({
          title: "",
          description: "",
          image: null,
          category: "web",
          technologies: "",
          liveLink: "",
          codeLink: "",
          challenge: "",
          solution: "",
        })
        fetchProjects() // Refresh projects list
      } else {
        throw new Error("Failed to add project")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding the project. Please try again.",
        variant: "destructive",
      })
      console.error("Add project error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle project form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value })
  }

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setProjectForm({ ...projectForm, image: file })
  }

  // Handle edit project form input changes
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (editProjectForm) {
      setEditProjectForm({ ...editProjectForm, [e.target.name]: e.target.value })
    }
  }

  // Handle edit project file change
  const handleEditFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (editProjectForm) {
      setEditProjectForm({ ...editProjectForm, image: file ? URL.createObjectURL(file) : editProjectForm.image })
    }
  }

  // Handle project update
  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editProjectForm) return
    setIsUpdating(true)

    try {
      const formData = new FormData()
      formData.append("title", editProjectForm.title)
      formData.append("description", editProjectForm.description)
      if (editProjectForm.image && editProjectForm.image.startsWith("blob:")) {
        const response = await fetch(editProjectForm.image)
        const blob = await response.blob()
        formData.append("image", blob, "project-image.jpg")
      } else {
        formData.append("image", editProjectForm.image)
      }
      formData.append("category", editProjectForm.category)
      formData.append("technologies", JSON.stringify(editProjectForm.technologies))
      formData.append("liveLink", editProjectForm.liveLink)
      formData.append("codeLink", editProjectForm.codeLink)
      formData.append("challenge", editProjectForm.challenge)
      formData.append("solution", editProjectForm.solution)

      const response = await axios.patch(
        `https://backend-cf0k.onrender.com/api/projects/${editProjectForm.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )

      if (response.status === 200) {
        toast({
          title: "Project Updated",
          description: "Your project has been successfully updated.",
          className: "bg-green-500 text-white",
        })
        setEditProjectForm(null)
        fetchProjects()
      } else {
        throw new Error("Failed to update project")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while updating the project. Please try again.",
        variant: "destructive",
      })
      console.error("Update project error:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  // Handle project deletion
  const handleDeleteProject = async (id: string) => {
    setIsDeletingProject(id)
    try {
      await axios.delete(`https://backend-cf0k.onrender.com/api/projects/${id}`)
      setProjects(projects.filter((project) => project.id !== id))
      toast({
        title: "Project Deleted",
        description: "The project has been successfully removed.",
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete project. Please check your network or try again later.",
        variant: "destructive",
      })
      console.error("Delete project error:", error)
    } finally {
      setIsDeletingProject(null)
    }
  }

  // Handle feedback deletion
  const handleDeleteFeedback = async (id: string) => {
    setIsDeleting(id)
    try {
      await axios.delete(`https://backend-cf0k.onrender.com/feedback/${id}`)
      setFeedbackItems(feedbackItems.filter((item) => item.id !== id))
      toast({
        title: "Feedback Deleted",
        description: "The feedback has been successfully removed.",
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete feedback. Please check your network or try again later.",
        variant: "destructive",
      })
      console.error("Delete feedback error:", error)
    } finally {
      setIsDeleting(null)
    }
  }

  // Handle feedback approval status edit
  const handleEditFeedback = async (id: string, approved: boolean) => {
    setIsEditing(id)
    try {
      await axios.patch(`https://backend-cf0k.onrender.com/feedback/${id}`, { approved })
      setFeedbackItems(feedbackItems.map((item) => (item.id === id ? { ...item, approved } : item)))
      toast({
        title: "Feedback Updated",
        description: `Feedback has been marked as ${approved ? "approved" : "pending"}.`,
        className: "bg-green-500 text-white",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feedback. Please try again.",
        variant: "destructive",
      })
      console.error("Edit feedback error:", error)
    } finally {
      setIsEditing(null)
    }
  }

  // Filter and sort feedback
  const filteredAndSortedFeedback = feedbackItems
    .filter((item) => {
      if (filter === "approved") return item.approved
      if (filter === "pending") return !item.approved
      return true
    })
    .sort((a, b) => {
      if (sort === "date-asc") return parseISO(a.date).getTime() - parseISO(b.date).getTime()
      if (sort === "date-desc") return parseISO(b.date).getTime() - parseISO(a.date).getTime()
      if (sort === "rating-asc") return a.rating - b.rating
      if (sort === "rating-desc") return b.rating - a.rating
      return 0
    })

  // Pagination logic for feedback
  const totalPages = Math.ceil(filteredAndSortedFeedback.length / itemsPerPage)
  const paginatedFeedback = filteredAndSortedFeedback.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // Improved bento grid layout for better responsiveness
  const getBentoLayout = (index: number) => {
    // For smaller screens: simpler layout
    const smallScreen = typeof window !== "undefined" && window.innerWidth < 640

    if (smallScreen) {
      return "col-span-full xs:col-span-1"
    }

    // For medium screens and larger: more complex layout
    switch (index % 6) {
      case 0:
        return "col-span-full sm:col-span-2 row-span-1"
      case 1:
        return "col-span-1 row-span-1"
      case 2:
        return "col-span-1 row-span-2"
      case 3:
        return "col-span-1 row-span-1"
      case 4:
        return "col-span-1 row-span-1"
      case 5:
        return "col-span-full sm:col-span-2 row-span-1"
      default:
        return "col-span-1 row-span-1"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-purple-500/10">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-card/80 backdrop-blur-md border-b border-border/30 sticky top-0 z-50 shadow-md">
        <h2 className="text-lg font-bold text-primary">Portfolio Admin</h2>
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="relative">
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-40 md:hidden flex flex-col p-6 pt-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Button
              variant="ghost"
              className="absolute top-4 right-4"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
            <div className="flex flex-col gap-2">
              <Button
                variant={activeSection === "project" ? "default" : "ghost"}
                className={cn(
                  "justify-start gap-2 transition-all duration-300",
                  activeSection === "project" &&
                    "bg-gradient-to-r from-primary/90 to-purple-600/90 text-white shadow-md",
                )}
                onClick={() => {
                  setActiveSection("project")
                  setMobileMenuOpen(false)
                }}
              >
                <FilePlus className="h-5 w-5" />
                Add Project
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button
                variant={activeSection === "feedback" ? "default" : "ghost"}
                className={cn(
                  "justify-start gap-2 transition-all duration-300",
                  activeSection === "feedback" &&
                    "bg-gradient-to-r from-primary/90 to-purple-600/90 text-white shadow-md",
                )}
                onClick={() => {
                  setActiveSection("feedback")
                  setMobileMenuOpen(false)
                }}
              >
                <LayoutGrid className="h-5 w-5" />
                Feedback
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button
                variant={activeSection === "manage-projects" ? "default" : "ghost"}
                className={cn(
                  "justify-start gap-2 transition-all duration-300",
                  activeSection === "manage-projects" &&
                    "bg-gradient-to-r from-primary/90 to-purple-600/90 text-white shadow-md",
                )}
                onClick={() => {
                  setActiveSection("manage-projects")
                  setMobileMenuOpen(false)
                }}
              >
                <Edit className="h-5 w-5" />
                Manage Projects
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Desktop Sidebar */}
        <motion.div
          className="w-64 bg-card/40 backdrop-blur-md border-r border-border/30 p-6 flex-col gap-4 fixed h-full shadow-xl z-10 hidden md:flex"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h2 className="text-2xl font-bold text-primary">Admin Dashboard</h2>
          <div className="flex flex-col gap-2">
            <Button
              variant={activeSection === "project" ? "default" : "ghost"}
              className={cn(
                "justify-start gap-2 transition-all duration-300 hover:translate-x-1",
                activeSection === "project" && "bg-gradient-to-r from-primary/90 to-purple-600/90 text-white shadow-md",
              )}
              onClick={() => setActiveSection("project")}
            >
              <FilePlus className="h-5 w-5" />
              Add Project
            </Button>
            <Button
              variant={activeSection === "feedback" ? "default" : "ghost"}
              className={cn(
                "justify-start gap-2 transition-all duration-300 hover:translate-x-1",
                activeSection === "feedback" &&
                  "bg-gradient-to-r from-primary/90 to-purple-600/90 text-white shadow-md",
              )}
              onClick={() => setActiveSection("feedback")}
            >
              <LayoutGrid className="h-5 w-5" />
              Feedback
            </Button>
            <Button
              variant={activeSection === "manage-projects" ? "default" : "ghost"}
              className={cn(
                "justify-start gap-2 transition-all duration-300 hover:translate-x-1",
                activeSection === "manage-projects" &&
                  "bg-gradient-to-r from-primary/90 to-purple-600/90 text-white shadow-md",
              )}
              onClick={() => setActiveSection("manage-projects")}
            >
              <Edit className="h-5 w-5" />
              Manage Projects
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64 p-4 md:p-6 lg:p-10 overflow-hidden w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Alert className="mb-8 shadow-xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm">
              <InfoIcon className="h-5 w-5 text-blue-500" />
              <AlertTitle className="text-lg font-semibold">Manage Your Portfolio</AlertTitle>
              <AlertDescription>
                Add new projects, manage existing ones, and handle feedback with this intuitive interface.
              </AlertDescription>
            </Alert>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeSection === "project" && (
              <motion.div
                key="project"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Card className="shadow-xl md:shadow-2xl border border-primary/10 bg-card/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-primary">Add New Project</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Complete the form below to add a new project to your portfolio.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="title" className="text-sm font-medium">
                            Project Title
                          </Label>
                          <Input
                            id="title"
                            name="title"
                            value={projectForm.title}
                            onChange={handleChange}
                            placeholder="E.g., E-commerce Platform"
                            required
                            className="mt-1 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                          />
                        </div>

                        <div>
                          <Label htmlFor="category" className="text-sm font-medium">
                            Category
                          </Label>
                          <Select
                            value={projectForm.category}
                            onValueChange={(value) =>
                              setProjectForm({
                                ...projectForm,
                                category: value as "web" | "mobile" | "backend" | "ui/ux",
                              })
                            }
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="web">Web</SelectItem>
                              <SelectItem value="mobile">Mobile</SelectItem>
                              <SelectItem value="backend">Backend</SelectItem>
                              <SelectItem value="ui/ux">UI/UX</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-sm font-medium">
                          Description
                        </Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={projectForm.description}
                          onChange={handleChange}
                          placeholder="E.g., A full-stack e-commerce platform with product management..."
                          required
                          className="mt-1 h-32 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                        />
                      </div>

                      <CustomFileInput id="image" label="Project Image" onChange={handleFileChange} required={true} />

                      <div>
                        <Label htmlFor="technologies" className="text-sm font-medium">
                          Technologies (comma-separated)
                        </Label>
                        <Input
                          id="technologies"
                          name="technologies"
                          value={projectForm.technologies}
                          onChange={handleChange}
                          placeholder="E.g., React, Node.js, MongoDB"
                          required
                          className="mt-1 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="liveLink" className="text-sm font-medium">
                            Live Link (optional)
                          </Label>
                          <Input
                            id="liveLink"
                            name="liveLink"
                            value={projectForm.liveLink}
                            onChange={handleChange}
                            placeholder="E.g., https://example.com"
                            className="mt-1 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                          />
                        </div>

                        <div>
                          <Label htmlFor="codeLink" className="text-sm font-medium">
                            Code Link (optional)
                          </Label>
                          <Input
                            id="codeLink"
                            name="codeLink"
                            value={projectForm.codeLink}
                            onChange={handleChange}
                            placeholder="E.g., https://github.com"
                            className="mt-1 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="challenge" className="text-sm font-medium">
                          Challenge
                        </Label>
                        <Textarea
                          id="challenge"
                          name="challenge"
                          value={projectForm.challenge}
                          onChange={handleChange}
                          placeholder="E.g., Implementing a secure payment system..."
                          required
                          className="mt-1 h-24 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="solution" className="text-sm font-medium">
                          Solution
                        </Label>
                        <Textarea
                          id="solution"
                          name="solution"
                          value={projectForm.solution}
                          onChange={handleChange}
                          placeholder="E.g., Utilized Stripe's secure payment API..."
                          required
                          className="mt-1 h-24 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="group flex items-center gap-2 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/80 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:translate-y-[-2px]"
                        >
                          <PlusCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                          {isSubmitting ? "Adding..." : "Add Project"}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === "feedback" && (
              <motion.div
                key="feedback"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Card className="shadow-xl md:shadow-2xl border border-primary/10 bg-card/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-primary">Manage Feedback</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Review, edit, and delete feedback submitted by users.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <Select value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
                        <SelectTrigger className="w-full md:w-40">
                          <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={sort} onValueChange={(value) => setSort(value as typeof sort)}>
                        <SelectTrigger className="w-full md:w-40">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="date-desc">Date (Newest)</SelectItem>
                          <SelectItem value="date-asc">Date (Oldest)</SelectItem>
                          <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
                          <SelectItem value="rating-asc">Rating (Low to High)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {paginatedFeedback.length === 0 ? (
                      <p className="text-muted-foreground">No feedback available.</p>
                    ) : (
                      <motion.div
                        className={cn(
                          "grid gap-4 auto-rows-fr",
                          "grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
                        )}
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                          },
                        }}
                        initial="hidden"
                        animate="show"
                      >
                        {paginatedFeedback.map((item: FeedbackItem, index: number) => (
                          <motion.div
                            key={item.id}
                            variants={{
                              hidden: { opacity: 0, y: 30, scale: 0.95 },
                              show: {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: { type: "spring", stiffness: 300, damping: 20 },
                              },
                            }}
                            whileHover={{
                              scale: 1.03,
                              y: -5,
                              transition: { type: "spring", stiffness: 400, damping: 17 },
                            }}
                            className={cn(
                              getBentoLayout(index),
                              "relative bg-card/30 backdrop-blur-md rounded-lg border border-border/50 p-4 flex flex-col",
                              "transform transition-all duration-300 hover:shadow-xl hover:border-primary/40",
                              "min-h-[120px]",
                            )}
                          >
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-3 w-3 ${
                                      star <= item.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {format(parseISO(item.date), "MMM d, yyyy")}
                              </span>
                            </div>

                            <blockquote
                              className={cn(
                                "flex-1 italic text-xs md:text-sm mb-3",
                                window.innerWidth < 768
                                  ? "line-clamp-3"
                                  : index === 2
                                    ? "line-clamp-6"
                                    : "line-clamp-3",
                              )}
                            >
                              "{item.message}"
                            </blockquote>

                            <div className="mt-auto flex justify-between items-center">
                              <p className="font-semibold text-sm">{item.name}</p>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditFeedback(item.id, !item.approved)}
                                  disabled={isEditing === item.id}
                                  className="flex items-center gap-2"
                                >
                                  {isEditing === item.id ? "Updating..." : item.approved ? "Unapprove" : "Approve"}
                                </Button>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      disabled={isDeleting === item.id}
                                      className="flex items-center gap-2"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                      {isDeleting === item.id ? "Deleting..." : "Delete"}
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-md md:max-w-lg bg-card/95 backdrop-blur-md border-primary/10 shadow-2xl">
                                    <DialogHeader>
                                      <DialogTitle>Are you sure?</DialogTitle>
                                      <DialogDescription>
                                        This action cannot be undone. This will permanently delete the feedback from{" "}
                                        {item.name}.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter>
                                      <Button variant="outline" onClick={() => {}}>
                                        Cancel
                                      </Button>
                                      <Button variant="destructive" onClick={() => handleDeleteFeedback(item.id)}>
                                        Delete
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                            <p
                              className={cn(
                                "text-xs mt-2 inline-flex items-center px-2 py-1 rounded-full",
                                item.approved
                                  ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                  : "bg-amber-500/10 text-amber-500 border border-amber-500/20",
                              )}
                            >
                              <span
                                className={cn(
                                  "w-2 h-2 rounded-full mr-1",
                                  item.approved ? "bg-green-500 animate-pulse" : "bg-amber-500 animate-pulse",
                                )}
                              ></span>
                              {item.approved ? "Approved" : "Pending"}
                            </p>
                            <div className="absolute top-2 right-2 sm:hidden">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="w-72">
                                  <DialogHeader>
                                    <DialogTitle>Actions</DialogTitle>
                                  </DialogHeader>
                                  <div className="flex flex-col gap-2 pt-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleEditFeedback(item.id, !item.approved)}
                                      disabled={isEditing === item.id}
                                      className="justify-start"
                                    >
                                      <Check className="mr-2 h-4 w-4" />
                                      {item.approved ? "Unapprove" : "Approve"}
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => {
                                        if (confirm("Are you sure you want to delete this feedback?")) {
                                          handleDeleteFeedback(item.id)
                                        }
                                      }}
                                      disabled={isDeleting === item.id}
                                      className="justify-start"
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    {totalPages > 1 && (
                      <div className="flex justify-center gap-2 mt-6">
                        <Button
                          variant="outline"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                          Previous
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeSection === "manage-projects" && (
              <motion.div
                key="manage-projects"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Card className="shadow-xl md:shadow-2xl border border-primary/10 bg-card/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-primary">Manage Projects</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      View, edit, and delete your portfolio projects.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {projects.length === 0 ? (
                      <p className="text-muted-foreground">No projects available.</p>
                    ) : (
                      <motion.div
                        className={cn(
                          "grid gap-4 auto-rows-fr",
                          "grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
                        )}
                        variants={{
                          hidden: { opacity: 0 },
                          show: {
                            opacity: 1,
                            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                          },
                        }}
                        initial="hidden"
                        animate="show"
                      >
                        {projects.map((project, index) => (
                          <motion.div
                            key={project.id}
                            variants={{
                              hidden: { opacity: 0, y: 30, scale: 0.95 },
                              show: {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: { type: "spring", stiffness: 300, damping: 20 },
                              },
                            }}
                            whileHover={{
                              scale: 1.03,
                              y: -5,
                              transition: { type: "spring", stiffness: 400, damping: 17 },
                            }}
                            className={cn(
                              getBentoLayout(index),
                              "relative bg-card/30 backdrop-blur-md rounded-lg border border-border/50 p-4 flex flex-col",
                              "transform transition-all duration-300 hover:shadow-xl hover:border-primary/40",
                              "min-h-[200px]",
                            )}
                          >
                            <img
                              src={project.image || "/placeholder.svg"}
                              alt={project.title}
                              className="h-24 object-cover rounded-md mb-3"
                            />
                            <h3 className="font-semibold text-sm mb-2">{project.title}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{project.description}</p>
                            <p className="text-xs text-muted-foreground mb-3">Category: {project.category}</p>
                            <div className="mt-auto flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-2"
                                    onClick={() => setEditProjectForm(project)}
                                  >
                                    <Edit className="h-4 w-4" />
                                    Edit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md md:max-w-lg bg-card/95 backdrop-blur-md border-primary/10 shadow-2xl max-h-[80vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Edit Project</DialogTitle>
                                    <DialogDescription>Update the project details below.</DialogDescription>
                                  </DialogHeader>
                                  {editProjectForm && (
                                    <form onSubmit={handleUpdateProject} className="space-y-6">
                                      <div>
                                        <Label htmlFor="title" className="text-sm font-medium">
                                          Project Title
                                        </Label>
                                        <Input
                                          id="title"
                                          name="title"
                                          value={editProjectForm.title}
                                          onChange={handleEditChange}
                                          required
                                          className="mt-1 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="description" className="text-sm font-medium">
                                          Description
                                        </Label>
                                        <Textarea
                                          id="description"
                                          name="description"
                                          value={editProjectForm.description}
                                          onChange={handleEditChange}
                                          required
                                          className="mt-1 h-32 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                                        />
                                      </div>
                                      <div>
                                        <CustomFileInput
                                          id="editImage"
                                          label="Project Image"
                                          onChange={handleEditFileChange}
                                          className="mb-2"
                                        />
                                        <img
                                          src={editProjectForm.image || "/placeholder.svg"}
                                          alt="Preview"
                                          className="mt-2 h-32 object-cover rounded-md"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="category" className="text-sm font-medium">
                                          Category
                                        </Label>
                                        <Select
                                          value={editProjectForm.category}
                                          onValueChange={(value) =>
                                            setEditProjectForm({
                                              ...editProjectForm,
                                              category: value as "web" | "mobile" | "backend" | "ui/ux",
                                            })
                                          }
                                        >
                                          <SelectTrigger className="mt-1">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="web">Web</SelectItem>
                                            <SelectItem value="mobile">Mobile</SelectItem>
                                            <SelectItem value="backend">Backend</SelectItem>
                                            <SelectItem value="ui/ux">UI/UX</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                      <div>
                                        <Label htmlFor="technologies" className="text-sm font-medium">
                                          Technologies (comma-separated)
                                        </Label>
                                        <Input
                                          id="technologies"
                                          name="technologies"
                                          value={editProjectForm.technologies.join(", ")}
                                          onChange={(e) =>
                                            setEditProjectForm({
                                              ...editProjectForm,
                                              technologies: e.target.value.split(",").map((tech) => tech.trim()),
                                            })
                                          }
                                          required
                                          className="mt-1 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="liveLink" className="text-sm font-medium">
                                          Live Link (optional)
                                        </Label>
                                        <Input
                                          id="liveLink"
                                          name="liveLink"
                                          value={editProjectForm.liveLink}
                                          onChange={handleEditChange}
                                          className="mt-1 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="codeLink" className="text-sm font-medium">
                                          Code Link (optional)
                                        </Label>
                                        <Input
                                          id="codeLink"
                                          name="codeLink"
                                          value={editProjectForm.codeLink}
                                          onChange={handleEditChange}
                                          className="mt-1 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="challenge" className="text-sm font-medium">
                                          Challenge
                                        </Label>
                                        <Textarea
                                          id="challenge"
                                          name="challenge"
                                          value={editProjectForm.challenge}
                                          onChange={handleEditChange}
                                          required
                                          className="mt-1 h-24 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                                        />
                                      </div>
                                      <div>
                                        <Label htmlFor="solution" className="text-sm font-medium">
                                          Solution
                                        </Label>
                                        <Textarea
                                          id="solution"
                                          name="solution"
                                          value={editProjectForm.solution}
                                          onChange={handleEditChange}
                                          required
                                          className="mt-1 h-24 focus:ring-2 focus:ring-primary/70 focus:border-primary/70 transition-all duration-300 shadow-sm"
                                        />
                                      </div>
                                      <DialogFooter>
                                        <Button variant="outline" onClick={() => setEditProjectForm(null)}>
                                          Cancel
                                        </Button>
                                        <Button type="submit" disabled={isUpdating}>
                                          {isUpdating ? "Updating..." : "Update Project"}
                                        </Button>
                                      </DialogFooter>
                                    </form>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    disabled={isDeletingProject === project.id}
                                    className="flex items-center gap-2"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    {isDeletingProject === project.id ? "Deleting..." : "Delete"}
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md md:max-w-lg bg-card/95 backdrop-blur-md border-primary/10 shadow-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Are you sure?</DialogTitle>
                                    <DialogDescription>
                                      This action cannot be undone. This will permanently delete the project "
                                      {project.title}".
                                    </DialogDescription>
                                  </DialogHeader>
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => {}}>
                                      Cancel
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                                      Delete
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                            <div className="absolute top-2 right-2 sm:hidden">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="w-72">
                                  <DialogHeader>
                                    <DialogTitle>Actions</DialogTitle>
                                  </DialogHeader>
                                  <div className="flex flex-col gap-2 pt-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="justify-start"
                                      onClick={() => setEditProjectForm(project)}
                                    >
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit Project
                                    </Button>
                                    <Button
                                      variant="destructive"
                                      size="sm"
                                      className="justify-start"
                                      onClick={() => {
                                        if (confirm("Are you sure you want to delete this project?")) {
                                          handleDeleteProject(project.id)
                                        }
                                      }}
                                      disabled={isDeletingProject === project.id}
                                    >
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete Project
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
