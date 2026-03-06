"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { ArrowLeft, Send, Bot, User, Sparkles, Mic, MicOff, RotateCcw, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface MockInterviewProps {
  onBack: () => void
}

const interviewTypes = [
  { id: "technical", label: "Technical", description: "Coding & problem-solving questions" },
  { id: "behavioral", label: "Behavioral", description: "Experience & soft skills" },
  { id: "hr", label: "HR Round", description: "Culture fit & career goals" },
  { id: "case", label: "Case Study", description: "Business scenario analysis" },
]

const jobRoles = [
  "Software Engineer",
  "Data Scientist",
  "Product Manager",
  "UX Designer",
  "Marketing Manager",
  "Business Analyst",
  "DevOps Engineer",
  "Full Stack Developer",
]

export function MockInterview({ onBack }: MockInterviewProps) {
  const [selectedType, setSelectedType] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/interview" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const startInterview = () => {
    if (!selectedType || !selectedRole) return
    setInterviewStarted(true)
    
    // Send initial context to start the interview
    sendMessage({ 
      text: `I want to practice for a ${selectedType} interview for a ${selectedRole} position. Please start the mock interview by introducing yourself as the interviewer and asking me the first question.`
    }, {
      body: {
        context: {
          jobRole: selectedRole,
          interviewType: selectedType
        }
      }
    })
  }

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    sendMessage({ text: input }, {
      body: {
        context: {
          jobRole: selectedRole,
          interviewType: selectedType
        }
      }
    })
    setInput("")
  }

  const restartInterview = () => {
    setMessages([])
    setInterviewStarted(false)
    setSelectedType("")
    setSelectedRole("")
  }

  const getMessageText = (message: typeof messages[0]) => {
    return message.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") || ""
  }

  // Setup screen
  if (!interviewStarted) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Mock Interview</h1>
            <p className="text-sm text-muted-foreground">Practice with our intelligent interviewer</p>
          </div>
        </div>

        {/* AI Intro Card */}
        <Card className="bg-primary/10 border-primary/30 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Powered by AI</h3>
                <p className="text-muted-foreground text-sm">
                  Our AI interviewer adapts to your responses, provides instant feedback, and helps you improve with each answer. Get scored on your performance and receive personalized tips.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Type Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Select Interview Type</h3>
          <div className="grid grid-cols-2 gap-4">
            {interviewTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedType === type.id
                    ? "border-primary bg-primary/10"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="font-medium text-foreground">{type.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Job Role Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Select Job Role</h3>
          <div className="flex flex-wrap gap-2">
            {jobRoles.map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-full border transition-all ${
                  selectedRole === role
                    ? "border-secondary bg-secondary text-secondary-foreground"
                    : "border-border bg-card text-foreground hover:border-secondary/50"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={startInterview}
          disabled={!selectedType || !selectedRole}
          className="w-full py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          <Briefcase className="w-5 h-5 mr-2" />
          Start Interview
        </Button>
      </div>
    )
  }

  // Interview in progress
  return (
    <div className="max-w-3xl mx-auto px-4 h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">AI Mock Interview</h1>
            <p className="text-xs text-muted-foreground">{selectedRole} - {selectedType} Interview</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={restartInterview} className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Restart
        </Button>
      </div>

      {/* Chat Area */}
      <Card className="flex-1 bg-card border-border overflow-hidden flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === "user" ? "bg-secondary/20" : "bg-primary/20"
              }`}>
                {msg.role === "user" ? (
                  <User className="w-5 h-5 text-secondary" />
                ) : (
                  <Bot className="w-5 h-5 text-primary" />
                )}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user" 
                  ? "bg-secondary/20 text-foreground rounded-br-md" 
                  : "bg-muted text-foreground rounded-bl-md"
              }`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{getMessageText(msg)}</p>
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Type your answer..."
              rows={2}
              disabled={isLoading}
              className="flex-1 bg-muted border-0 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none disabled:opacity-50"
            />
            <div className="flex flex-col gap-2">
              <Button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="w-12 h-12 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </Card>
    </div>
  )
}
