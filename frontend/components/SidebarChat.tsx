"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mic, Send, Smile, Paperclip, Volume2, VolumeX, MessageCircle, X } from "lucide-react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

export default function AIChatbotWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your Best AI Agent. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      // 🔗 Backend को call करो (जो n8n से जुड़ा है)
      const response = await fetch("https://backend-cf0k.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.content, userId: "frontend-user" }),
      })

      const data = await response.json()

      // मान लो backend reply में { reply: "..." } return करता है
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: data.reply || "No response from AI",
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "⚠️ Error: Unable to connect to backend",
          isUser: false,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => setIsRecording(!isRecording)
  const toggleSpeaking = () => setIsSpeaking(!isSpeaking)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Widget */}
        {isOpen && (
          <Card className="w-96 h-[500px] mb-4 glass-effect transition-all duration-500 ease-in-out flex flex-col overflow-hidden neon-glow animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-glass-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="w-10 h-10 animate-pulse-glow">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  {isSpeaking && <div className="absolute inset-0 rounded-full border-2 border-accent animate-ping" />}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Manish Agent</h3>
                  <p className="text-xs text-muted-foreground">{isTyping ? "Typing..." : "Online"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSpeaking}
                  className="w-8 h-8 p-0 hover:neon-accent-glow transition-all duration-300"
                >
                  {isSpeaking ? (
                    <Volume2 className="w-4 h-4 text-accent" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-muted-foreground" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 p-0 hover:neon-glow transition-all duration-300"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-primary" />
                </Button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"} animate-slide-up`}
                >
                  {message.isUser ? (
                    <div className="flex flex-col items-end max-w-[75%]">
                      <div className="relative bg-muted text-muted-foreground rounded-lg px-4 py-2 shadow-sm">
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1 mr-2 select-none">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 max-w-[75%]">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                        <span className="text-xs">M</span>
                      </div>
                      <div className="flex flex-col">
                        <div className="relative bg-muted text-muted-foreground rounded-lg px-4 py-2 shadow-sm">
                          <p className="whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground mt-1 ml-2 select-none">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="bg-muted p-3 rounded-2xl mr-4">
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-2 h-2 bg-primary rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="pr-20 focus:ring-2 focus:ring-primary transition-all duration-300"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-accent transition-all duration-300">
                      <Smile className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-accent transition-all duration-300">
                      <Paperclip className="w-4 h-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? "default" : "outline"}
                  size="sm"
                  className={`w-10 h-10 p-0 rounded-full transition-all duration-300 ${
                    isRecording ? "bg-red-500 text-white animate-pulse" : "hover:bg-accent"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </Button>

                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  size="sm"
                  className="w-10 h-10 p-0 rounded-full bg-primary hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 group"
          >
            <div className="relative">
              <MessageCircle className="w-6 h-6 text-white animate-bounce group-hover:animate-pulse transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" />
              <div className="absolute -inset-1 rounded-full border border-white/20 animate-pulse" />
            </div>
          </Button>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .neon-glow { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
      `}</style>
    </>
  )
}
