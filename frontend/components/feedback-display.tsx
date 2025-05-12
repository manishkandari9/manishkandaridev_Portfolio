"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"
import { format } from "date-fns"
import axios from "axios"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

interface FeedbackItem {
  id: string
  name: string
  message: string
  rating: number
  date: string
  approved: boolean
}

export default function FeedbackDisplay() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([])
  const [displayedFeedback, setDisplayedFeedback] = useState<FeedbackItem[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const isMobile = useMobile()

  // Placeholder feedback for when fewer than 6 items exist
  const placeholderFeedback: FeedbackItem = {
    id: "placeholder",
    name: "Anonymous",
    message: "No feedback yet. Be the first to share!",
    rating: 0,
    date: new Date().toISOString(),
    approved: true,
  }

  // Shuffle array helper function
  const shuffleArray = (array: FeedbackItem[]): FeedbackItem[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Fetch feedback from backend
  const fetchFeedback = async () => {
    try {
      const response = await axios.get("https://backend-cf0k.onrender.com/feedback")
      const mappedFeedback = response.data.map((item: any) => ({
        ...item,
        id: item._id, // Map _id to id
      }))
      const approvedFeedback = mappedFeedback.filter((item: FeedbackItem) => item.approved)

      // Ensure exactly 6 feedback items
      let newDisplayed: FeedbackItem[] = []
      if (approvedFeedback.length === 0) {
        // If no feedback, use 6 placeholders
        newDisplayed = Array(6).fill(placeholderFeedback)
      } else if (approvedFeedback.length < 6) {
        // If fewer than 6, repeat items to reach 6
        newDisplayed = []
        for (let i = 0; i < 6; i++) {
          newDisplayed.push(approvedFeedback[i % approvedFeedback.length])
        }
      } else {
        // If 6 or more, randomly select 6 and shuffle
        const shuffledFeedback = shuffleArray(approvedFeedback)
        newDisplayed = shuffledFeedback.slice(0, 6)
      }

      setFeedbackItems(mappedFeedback)
      setDisplayedFeedback(newDisplayed)
    } catch (error) {
      console.error("Error fetching feedback:", error)
      // Use placeholders if fetch fails
      setDisplayedFeedback(Array(6).fill(placeholderFeedback))
    }
  }

  // Initial fetch and set up interval for fetching every 7 seconds
  useEffect(() => {
    fetchFeedback() // Initial fetch
    const interval = setInterval(fetchFeedback, 7000) // Fetch every 7 seconds
    return () => clearInterval(interval) // Clean up interval on unmount
  }, [])

  // Define the bento grid layout for mobile and desktop
  const getBentoLayout = (index: number) => {
    // Mobile layout (2-column bento grid with no empty spaces)
    if (isMobile) {
      switch (index) {
        case 0:
          return "col-span-2 row-span-1" // Wide card at top
        case 1:
          return "col-span-1 row-span-1" // Regular card
        case 2:
          return "col-span-1 row-span-1" // Regular card (not tall on mobile)
        case 3:
          return "col-span-1 row-span-1" // Regular card
        case 4:
          return "col-span-1 row-span-1" // Regular card
        case 5:
          return "col-span-2 row-span-1" // Wide card at bottom (matching the top)
        default:
          return "col-span-1 row-span-1"
      }
    }

    // Desktop layout (3-column bento grid)
    switch (index) {
      case 0:
        return "sm:col-span-2 row-span-1" // Wide card at top-left
      case 1:
        return "col-span-1 row-span-1" // Regular card
      case 2:
        return "sm:row-span-2" // Tall card (only on desktop)
      case 3:
        return "col-span-1 row-span-1" // Regular card
      case 4:
        return "col-span-1 row-span-1" // Regular card
      case 5:
        return "sm:col-span-2 row-span-1" // Wide card at bottom (only on desktop)
      default:
        return "col-span-1 row-span-1"
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <section id="feedback-display" ref={sectionRef} className="py-12 bg-muted/20 overflow-hidden">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Feedback</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">Hear what others have to say about my work</p>
        </motion.div>

        <motion.div
          className={cn(
            "grid gap-4 auto-rows-fr",
            isMobile ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          )}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <AnimatePresence mode="popLayout">
            {displayedFeedback.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`} // Unique key for animations
                layout
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={cn(
                  getBentoLayout(index),
                  "bg-card/20 backdrop-blur-sm rounded-lg border border-border p-4 flex flex-col",
                  "transform transition-all duration-300 hover:shadow-lg hover:border-primary/30",
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
                  <span className="text-xs text-muted-foreground">{format(new Date(item.date), "MMM d, yyyy")}</span>
                </div>

                <blockquote
                  className={cn(
                    "flex-1 italic text-xs md:text-sm mb-3",
                    isMobile ? "line-clamp-3" : index === 2 ? "line-clamp-6" : "line-clamp-3",
                  )}
                >
                  "{item.message}"
                </blockquote>

                <div className="mt-auto">
                  <p className="font-semibold text-sm">{item.name}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
