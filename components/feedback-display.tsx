"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star } from "lucide-react"
import { format } from "date-fns"
import axios from "axios"

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
  const [error, setError] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  // Fetch feedback from backend
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get("http://localhost:3000/feedback")
        setFeedbackItems(response.data)
      } catch (err) {
        setError("Failed to load feedback. Please try again later.")
      }
    }
    fetchFeedback()
  }, [])

  // Show up to 6 approved feedback items
  const approvedFeedback = feedbackItems.filter((item) => item.approved).slice(0, 6)

  return (
    <section id="feedback-display" ref={sectionRef} className="py-12 bg-muted/20">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Feedback</h2>
          <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Hear what others have to say about my work
          </p>
        </motion.div>

        {error ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">{error}</p>
          </div>
        ) : approvedFeedback.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
            {approvedFeedback.map((item, index) => {
              const isWide = index === 0 || index === 5
              const isTall = index === 2
              const gridClass = isWide ? "sm:col-span-2" : isTall ? "sm:row-span-2" : ""

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${gridClass} bg-card/20 backdrop-blur-sm rounded-lg border border-border p-4 flex flex-col min-h-[120px]`}
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

                  <blockquote className="flex-1 italic text-xs md:text-sm mb-3 line-clamp-3">"{item.message}"</blockquote>

                  <div className="mt-auto">
                    <p className="font-semibold text-sm">{item.name}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">No feedback available yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </section>
  )
}