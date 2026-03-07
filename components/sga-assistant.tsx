"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { 
  MessageCircle, 
  X, 
  Send, 
  User, 
  Sparkles, 
  Minimize2,
  Maximize2,
  GraduationCap,
  Lightbulb,
  Target,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SGAAssistantProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const quickActions = [
  { label: "Career Guidance", icon: Target, query: "Help me discover my ideal career path based on my interests" },
  { label: "Learn Coding", icon: Lightbulb, query: "I want to start learning programming, where should I begin?" },
  { label: "Interview Tips", icon: Zap, query: "Give me tips to ace my next job interview" },
  { label: "Resume Help", icon: GraduationCap, query: "Help me create a standout resume" },
]

export function SGAAssistant({ isOpen, setIsOpen }: SGAAssistantProps) {
  const [input, setInput] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/sga-chat" }),
    initialMessages: []
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    setShowWelcome(false)
    sendMessage({ text: input })
    setInput("")
  }

  const handleQuickAction = (query: string) => {
    if (isLoading) return
    setShowWelcome(false)
    sendMessage({ text: query })
  }

  const getMessageText = (message: typeof messages[0]) => {
    return message.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") || ""
  }

  return (
    <>
      {/* SGA.ai Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          {/* Animated rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 animate-ping opacity-20" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 opacity-70 blur-sm group-hover:opacity-100 transition-opacity" />
          
          {/* Main button */}
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-600 to-teal-700 shadow-lg flex items-center justify-center transition-transform group-hover:scale-105">
            {isOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <div className="relative">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            )}
          </div>
          
          {/* Label */}
          {!isOpen && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-background border border-border text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              SGA.ai Assistant
            </div>
          )}
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed z-50 bg-background border border-border rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isExpanded 
            ? "bottom-4 right-4 left-4 top-20 md:left-auto md:w-[500px] md:top-4" 
            : "bottom-24 right-6 w-[400px] max-w-[calc(100vw-3rem)]"
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-300 to-teal-400 flex items-center justify-center">
                      <span className="text-lg font-bold text-teal-900">S</span>
                    </div>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center">
                    <Sparkles className="w-2 h-2 text-white" />
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">SGA.ai</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white/20 text-white">BETA</span>
                  </div>
                  <div className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Your Personal Learning Guide
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4 text-white" />
                  ) : (
                    <Maximize2 className="w-4 h-4 text-white" />
                  )}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className={`overflow-y-auto p-4 space-y-4 ${isExpanded ? "h-[calc(100%-200px)]" : "h-80"}`}>
            {/* Welcome Message */}
            {showWelcome && messages.length === 0 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-cyan-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Hey there! I'm SGA.ai
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
                  Your AI-powered guide to discovering your dream career and mastering new skills. How can I help you today?
                </p>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.query)}
                      className="flex items-center gap-2 p-3 rounded-xl bg-muted hover:bg-cyan-500/10 border border-border hover:border-cyan-500/30 transition-all text-left group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-teal-500/30 transition-colors">
                        <action.icon className="w-4 h-4 text-cyan-600" />
                      </div>
                      <span className="text-xs font-medium text-foreground">{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-slate-600 to-slate-700" 
                    : "bg-gradient-to-br from-cyan-500 to-teal-600"
                }`}>
                  {msg.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <span className="text-sm font-bold text-white">S</span>
                  )}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user" 
                    ? "bg-gradient-to-br from-slate-600 to-slate-700 text-white rounded-br-md" 
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{getMessageText(msg)}</p>
                </div>
              </div>
            ))}

            {/* Loading */}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-white">S</span>
                </div>
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask me anything..."
                disabled={isLoading}
                className="flex-1 bg-muted border-0 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
              />
              <Button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-teal-600 text-white hover:from-cyan-500 hover:to-teal-500 disabled:opacity-50 disabled:from-slate-500 disabled:to-slate-600"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-[10px] text-muted-foreground text-center mt-2">
              Powered by SGA.ai | Your journey starts here
            </p>
          </div>
        </div>
      )}
    </>
  )
}
