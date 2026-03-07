"use client"

import { useState, useEffect, useRef } from "react"
import { X, Volume2, VolumeX, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Message {
  id: number
  sender: "ai" | "user"
  text: string
  delay: number
}

const mockConversation: Message[] = [
  { id: 1, sender: "ai", text: "Hello! Welcome to sga.ai Interview Training. I'm your AI interviewer today. Let's start with a common question - Can you tell me about yourself?", delay: 0 },
  { id: 2, sender: "user", text: "Hi! I'm a computer science student with a passion for web development. I've worked on several projects including an e-commerce platform and a social media dashboard.", delay: 4000 },
  { id: 3, sender: "ai", text: "That's great! Your project experience sounds impressive. Now, what would you say is your greatest strength?", delay: 8000 },
  { id: 4, sender: "user", text: "I think my greatest strength is my ability to learn quickly and adapt to new technologies. I taught myself React in just two weeks for a project deadline.", delay: 12000 },
  { id: 5, sender: "ai", text: "Excellent example! Quick learning is highly valued. Let me ask you a technical question: Can you explain what REST APIs are and why they're important?", delay: 16000 },
  { id: 6, sender: "user", text: "REST APIs are a way for different software systems to communicate over HTTP. They use standard methods like GET, POST, PUT, and DELETE to perform operations on resources.", delay: 20000 },
  { id: 7, sender: "ai", text: "Perfect explanation! You've demonstrated good technical knowledge. Based on this interview, I'd rate your communication skills at 85% and technical clarity at 90%. Great job!", delay: 24000 },
  { id: 8, sender: "user", text: "Thank you! This mock interview was really helpful for practice.", delay: 28000 },
]

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null)
  const timeoutsRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    if (isOpen) {
      setMessages([])
      setProgress(0)
      setIsPlaying(true)
      startDemo()
    } else {
      // Cleanup when modal closes
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
      window.speechSynthesis?.cancel()
      setIsPlaying(false)
    }

    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
      window.speechSynthesis?.cancel()
    }
  }, [isOpen])

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const speakText = (text: string) => {
    if (isMuted || typeof window === "undefined" || !window.speechSynthesis) return

    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.1
    utterance.pitch = 1
    utterance.volume = 0.8
    
    // Try to get a natural sounding voice
    const voices = window.speechSynthesis.getVoices()
    const preferredVoice = voices.find(voice => 
      voice.name.includes("Google") || 
      voice.name.includes("Samantha") ||
      voice.name.includes("Microsoft")
    )
    if (preferredVoice) {
      utterance.voice = preferredVoice
    }
    
    speechSynthRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const startDemo = () => {
    const totalDuration = 30000 // 30 seconds
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + (100 / (totalDuration / 100))
      })
    }, 100)

    timeoutsRef.current.push(progressInterval as unknown as NodeJS.Timeout)

    // Schedule messages
    mockConversation.forEach((message) => {
      const timeout = setTimeout(() => {
        setMessages(prev => [...prev, message])
        
        // Speak AI messages
        if (message.sender === "ai") {
          speakText(message.text)
        }
      }, message.delay)
      
      timeoutsRef.current.push(timeout)
    })

    // End demo
    const endTimeout = setTimeout(() => {
      setIsPlaying(false)
    }, totalDuration)
    timeoutsRef.current.push(endTimeout)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      window.speechSynthesis?.cancel()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">sga.ai Mock Interview</h3>
              <p className="text-xs text-muted-foreground">Interview Training Demo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              className="text-muted-foreground hover:text-foreground"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-muted">
          <div 
            className="h-full bg-primary transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Chat container */}
        <div 
          ref={chatContainerRef}
          className="h-96 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Starting mock interview...</p>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                message.sender === "user" && "flex-row-reverse"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                message.sender === "ai" 
                  ? "bg-primary/20" 
                  : "bg-secondary/20"
              )}>
                {message.sender === "ai" ? (
                  <Bot className="w-4 h-4 text-primary" />
                ) : (
                  <User className="w-4 h-4 text-secondary" />
                )}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.sender === "ai" 
                  ? "bg-muted text-foreground rounded-tl-sm" 
                  : "bg-primary text-primary-foreground rounded-tr-sm"
              )}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                {message.sender === "ai" && !isMuted && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Volume2 className="w-3 h-3" />
                    <span>Voice message</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isPlaying && messages.length > 0 && messages.length < mockConversation.length && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {isPlaying ? "Demo in progress..." : "Demo complete!"}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
            >
              {isPlaying ? "Close" : "Try Interview Training"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
