"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"

type BlogPost = {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Essential Tips for Freelance Web Developers",
    excerpt:
      "Learn the key strategies that have helped me succeed as a freelance developer, from client management to pricing your services.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 15, 2023",
    readTime: "8 min read",
    category: "Freelancing",
    slug: "essential-tips-freelance-developers",
  },
  {
    id: 2,
    title: "Building Responsive Layouts with Modern CSS Grid",
    excerpt:
      "Discover how to create complex, responsive layouts using CSS Grid with practical examples and best practices.",
    image: "/placeholder.svg?height=400&width=600",
    date: "April 22, 2023",
    readTime: "6 min read",
    category: "Web Development",
    slug: "responsive-layouts-css-grid",
  },
  {
    id: 3,
    title: "How to Optimize React Applications for Performance",
    excerpt:
      "A deep dive into techniques for improving the performance of your React applications, from code splitting to memoization.",
    image: "/placeholder.svg?height=400&width=600",
    date: "March 10, 2023",
    readTime: "10 min read",
    category: "React",
    slug: "optimize-react-applications-performance",
  },
]

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {post.category}
            </Badge>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>

          <p className="text-muted-foreground mb-4 flex-1">{post.excerpt}</p>

          <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-primary font-medium">
            Read More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function Blog() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section id="blog" ref={sectionRef} className="py-20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Articles</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I share my knowledge and experiences through articles on web development, freelancing, and technology. Check
            out my latest posts below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/blog">
            <Button variant="outline" size="lg" className="gap-2">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
