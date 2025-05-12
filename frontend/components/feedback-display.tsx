"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

interface FeedbackItem {
  id: string;
  name: string;
  message: string;
  rating: number;
  date: string;
  approved: boolean;
}

export default function FeedbackDisplay() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [displayedFeedback, setDisplayedFeedback] = useState<FeedbackItem[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Placeholder feedback for when fewer than 6 items exist
  const placeholderFeedback: FeedbackItem = {
    id: "placeholder",
    name: "Anonymous",
    message: "No feedback yet. Be the first to share!",
    rating: 0,
    date: new Date().toISOString(),
    approved: true,
  };

  // Shuffle array helper function
  const shuffleArray = (array: FeedbackItem[]): FeedbackItem[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Fetch feedback from backend
  const fetchFeedback = async () => {
    const response = await axios.get("https://backend-cf0k.onrender.com/feedback");
    const mappedFeedback = response.data.map((item: any) => ({
      ...item,
      id: item._id, // Map _id to id
    }));
    const approvedFeedback = mappedFeedback.filter((item: FeedbackItem) => item.approved);

    // Ensure exactly 6 feedback items
    let newDisplayed: FeedbackItem[] = [];
    if (approvedFeedback.length === 0) {
      // If no feedback, use 6 placeholders
      newDisplayed = Array(6).fill(placeholderFeedback);
    } else if (approvedFeedback.length < 6) {
      // If fewer than 6, repeat items to reach 6
      newDisplayed = [];
      for (let i = 0; i < 6; i++) {
        newDisplayed.push(approvedFeedback[i % approvedFeedback.length]);
      }
    } else {
      // If 6 or more, randomly select 6 and shuffle
      const shuffledFeedback = shuffleArray(approvedFeedback);
      newDisplayed = shuffledFeedback.slice(0, 6);
    }

    setFeedbackItems(mappedFeedback);
    setDisplayedFeedback(newDisplayed);
  };

  // Initial fetch and set up interval for fetching every 7 seconds
  useEffect(() => {
    fetchFeedback(); // Initial fetch
    const interval = setInterval(fetchFeedback, 7000); // Fetch every 7 seconds
    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          <AnimatePresence mode="popLayout">
            {displayedFeedback.map((item, index) => {
              const isWide = index === 0 || index === 5;
              const isTall = index === 2;
              const gridClass = isWide ? "sm:col-span-2" : isTall ? "sm:row-span-2" : "";

              return (
                <motion.div
                  key={`${item.id}-${index}`} // Unique key for animations
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
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
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(item.date), "MMM d, yyyy")}
                    </span>
                  </div>

                  <blockquote className="flex-1 italic text-xs md:text-sm mb-3 line-clamp-3">
                    "{item.message}"
                  </blockquote>

                  <div className="mt-auto">
                    <p className="font-semibold text-sm">{item.name}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}