"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { usePortfolio } from "@/context/portfolio-context"
import axios from "axios"

export default function FeedbackForm() {
  const { feedback } = usePortfolio()
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [feedbackText, setFeedbackText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { toast } = useToast()
  const formRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(formRef, { once: true, margin: "-100px" })

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating)
  }

  const handleRatingHover = (hoveredRating: number) => {
    setHoveredRating(hoveredRating)
  }

  const handleRatingLeave = () => {
    setHoveredRating(0)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "You must provide a star rating before submitting feedback.",
        variant: "destructive",
      })
      return
    }

    if (!name || !email || !feedbackText) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await axios.post("https://backend-cf0k.onrender.com/feedback", {
        name,
        email,
        message: feedbackText,
        rating,
        date: new Date().toISOString(),
      })

      setIsSuccess(true)

      toast({
        title: "Feedback submitted!",
        description: "Thank you for your feedback. I appreciate your input!",
        variant: "default",
        className: "bg-green-500/20 text-green-900 border-green-500/50",
      })

      setTimeout(() => {
        setRating(0)
        setName("")
        setEmail("")
        setFeedbackText("")
        setIsSuccess(false)
      }, 1500)
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Your feedback couldn't be sent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="feedback-form" ref={formRef} className="py-16 bg-gradient-to-b from-muted/10 to-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {feedback.formTitle}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-6"></div>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">{feedback.formSubtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-lg mx-auto bg-card/50 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-border/50"
        >
          <form onSubmit={handleSubmit} className="space-y-5 relative">
            <div className="flex flex-col items-center mb-6">
              <p className="text-base font-medium mb-3 text-foreground/90">How would you rate my work?</p>
              <div className="flex gap-2" onMouseLeave={handleRatingLeave}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => handleRatingHover(star)}
                    className="focus:outline-none"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Star
                      className={`h-7 w-7 transition-colors duration-200 ${
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-muted-foreground/50"
                      }`}
                    />
                    <span className="sr-only">{star} stars</span>
                  </motion.button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {rating > 0 ? `Selected ${rating} star${rating > 1 ? "s" : ""}` : "Click to rate"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-background/50 border-border/50 focus:ring-primary/50 rounded-lg"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/50 border-border/50 focus:ring-primary/50 rounded-lg"
              />
            </div>

            <Textarea
              placeholder="Your Feedback"
              rows={4}
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              required
              className="bg-background/50 border-border/50 focus:ring-primary/50 rounded-lg resize-none"
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block mr-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </motion.span>
              ) : null}
              {isSubmitting ? "Submitting..." : isSuccess ? "Feedback Sent!" : "Submit Feedback"}
            </Button>

            {isSuccess && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-600/20 backdrop-blur-md rounded-xl flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <svg
                    className="w-16 h-16 text-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  )
}