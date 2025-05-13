
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: "web" | "mobile" | "backend" | "ui/ux";
  technologies: string[];
  liveLink?: string;
  codeLink?: string;
  challenge: string;
  solution: string;
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

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
            priority
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
  );
}

function ProjectModal({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <div className="mt-2">
            <Badge variant="outline">{project.category}</Badge>
          </div>
        </DialogHeader>

        <div className="relative h-48 md:h-64 overflow-hidden rounded-lg">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
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
            {project.liveLink ? (
              <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Button>
              </Link>
            ) : (
              <Button className="gap-2" disabled>
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
            )}

            {project.codeLink ? (
              <Link href={project.codeLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2">
                  <Github className="h-4 w-4" />
                  View Code
                </Button>
              </Link>
            ) : (
              <Button variant="outline" className="gap-2" disabled>
                <Github className="h-4 w-4" />
                View Code
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Fetch projects from Node.js backend
  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const response = await fetch("https://backend-cf0k.onrender.com/api/projects");
        const data = await response.json();
        const mappedData = data.map((item: any) => ({
          _id: item._id,
          title: item.title,
          description: item.description,
          image: item.image || "/placeholder.svg",
          category: item.category,
          technologies: item.technologies || [],
          liveLink: item.liveLink,
          codeLink: item.codeLink,
          challenge: item.challenge || "No challenge provided",
          solution: item.solution || "No solution provided",
        }));
        console.log("Fetched projects:", mappedData); // Debug log
        setProjects(mappedData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredProjects = filter === "all" ? projects : projects.filter((project) => project.category === filter);

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
  };

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

        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No projects found for this category.
          </div>
        ) : (
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
                <ProjectCard key={project._id} project={project} onClick={() => openProjectModal(project)} />
              ))}
            </motion.div >
          </AnimatePresence>
        )}

        <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={closeProjectModal} />
      </div>
    </section>
  );
}
