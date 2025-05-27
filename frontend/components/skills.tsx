"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Code2,
  Server,
  Wrench,
  Users,
  Braces,
  Database,
  Palette,
  Layers,
  GitBranch,
  Cpu,
  Globe,
  MessageSquare,
} from "lucide-react"

type Skill = {
  name: string
  level: number
  category: "frontend" | "backend" | "tools" | "soft"
}

type SkillCategoryProps = {
  title: string
  icon: React.ReactNode
  skills: Skill[]
  index: number
}

const skills: Skill[] = [
  { name: "HTML/CSS", level: 90, category: "frontend" },
  { name: "JavaScript", level: 85, category: "frontend" },
  { name: "React", level: 80, category: "frontend" },
  { name: "Next.js", level: 75, category: "frontend" },
  { name: "TypeScript", level: 1, category: "frontend" },
  { name: "Tailwind CSS", level: 60, category: "frontend" },

  { name: "Node.js", level: 75, category: "backend" },
  { name: "Express", level: 70, category: "backend" },
  { name: "MongoDB", level: 65, category: "backend" },
  { name: "SQL", level: 60, category: "backend" },
  { name: "Firebase", level: 1, category: "backend" },
  { name: "REST APIs", level: 80, category: "backend" },

  { name: "Git", level: 85, category: "tools" },
  { name: "VS Code", level: 90, category: "tools" },
  { name: "Figma", level: 75, category: "tools" },
  { name: "Docker", level: 1, category: "tools" },
  { name: "AWS", level: 1, category: "tools" },
  { name: "CI/CD", level: 45, category: "tools" },

  { name: "Communication", level: 85, category: "soft" },
  { name: "Problem Solving", level: 60, category: "soft" },
  { name: "Time Management", level: 80, category: "soft" },
  { name: "Teamwork", level: 85, category: "soft" },
  { name: "Adaptability", level: 80, category: "soft" },
  { name: "Client Relations", level: 75, category: "soft" },
]

function SkillBar({ name, level, index }: Skill & { index: number }) {
  const skillRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(skillRef, { once: true, margin: "-50px" })

  return (
    <div ref={skillRef} className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      </div>
    </div>
  )
}

function SkillCategory({ title, icon, skills, index }: SkillCategoryProps) {
  const categoryRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(categoryRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={categoryRef}
      className="bg-card/30 backdrop-blur-sm rounded-xl border border-border p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div>
        {skills.map((skill, idx) => (
          <SkillBar key={skill.name} {...skill} index={idx} />
        ))}
      </div>
    </motion.div>
  )
}

function TechIcon({ icon, name }: { icon: React.ReactNode; name: string }) {
  const iconRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(iconRef, { once: true })

  return (
    <motion.div
      ref={iconRef}
      className="flex flex-col items-center group"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-16 h-16 flex items-center justify-center bg-card/30 backdrop-blur-sm rounded-xl border border-border mb-2 text-primary">
        {icon}
      </div>
      <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">{name}</span>
    </motion.div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const frontendSkills = skills.filter((skill) => skill.category === "frontend")
  const backendSkills = skills.filter((skill) => skill.category === "backend")
  const toolsSkills = skills.filter((skill) => skill.category === "tools")
  const softSkills = skills.filter((skill) => skill.category === "soft")

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I've developed a diverse set of skills throughout my journey as a developer. Here's a breakdown of my
            technical expertise and soft skills.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <SkillCategory title="Frontend" icon={<Code2 className="h-5 w-5" />} skills={frontendSkills} index={0} />
          <SkillCategory title="Backend" icon={<Server className="h-5 w-5" />} skills={backendSkills} index={1} />
          <SkillCategory title="Tools" icon={<Wrench className="h-5 w-5" />} skills={toolsSkills} index={2} />
          <SkillCategory title="Soft Skills" icon={<Users className="h-5 w-5" />} skills={softSkills} index={3} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Technologies I Work With</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
            <TechIcon icon={<Braces className="h-8 w-8" />} name="JavaScript" />
            <TechIcon icon={<Layers className="h-8 w-8" />} name="React" />
            <TechIcon icon={<Globe className="h-8 w-8" />} name="Next.js" />
            <TechIcon icon={<Database className="h-8 w-8" />} name="MongoDB" />
            <TechIcon icon={<Palette className="h-8 w-8" />} name="Tailwind" />
            <TechIcon icon={<GitBranch className="h-8 w-8" />} name="Git" />
            <TechIcon icon={<Cpu className="h-8 w-8" />} name="Node.js" />
            <TechIcon icon={<Server className="h-8 w-8" />} name="Express" />
            <TechIcon icon={<Database className="h-8 w-8" />} name="SQL" />
            <TechIcon icon={<Layers className="h-8 w-8" />} name="Firebase" />
            <TechIcon icon={<Palette className="h-8 w-8" />} name="Figma" />
            <TechIcon icon={<MessageSquare className="h-8 w-8" />} name="TypeScript" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
