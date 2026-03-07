"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { 
  ArrowLeft, 
  Send, 
  User, 
  RotateCcw, 
  Briefcase,
  GraduationCap,
  Users,
  UserCheck,
  Code,
  MessageSquare,
  Award,
  ChevronRight,
  Sparkles,
  Clock,
  Target,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AIMentorProps {
  onBack: () => void
}

// Mentor character with personality
const MENTOR = {
  name: "Professor Aria",
  title: "AI Interview Coach",
  avatar: "A",
  personality: "Encouraging yet professional",
  tagline: "Your path to interview success starts here"
}

const interviewRounds = [
  { id: "written", label: "Written Test", icon: Code, description: "Technical aptitude & coding challenges" },
  { id: "gd", label: "Group Discussion", icon: Users, description: "Communication & teamwork evaluation" },
  { id: "technical", label: "Technical Round", icon: GraduationCap, description: "In-depth technical knowledge" },
  { id: "hr", label: "HR Round", icon: UserCheck, description: "Culture fit & behavioral questions" },
]

const experienceLevels = [
  { id: "fresher", label: "Fresher", years: "0 years" },
  { id: "junior", label: "Junior", years: "1-2 years" },
  { id: "mid", label: "Mid-Level", years: "3-5 years" },
  { id: "senior", label: "Senior", years: "5+ years" },
]

const popularRoles = [
  "Software Engineer",
  "Data Scientist", 
  "Product Manager",
  "UX Designer",
  "DevOps Engineer",
  "Business Analyst",
  "Full Stack Developer",
  "Machine Learning Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Cloud Architect",
  "QA Engineer"
]

export function AIMentor({ onBack }: AIMentorProps) {
  const [step, setStep] = useState<"setup" | "interview" | "analysis">("setup")
  const [jobRole, setJobRole] = useState("")
  const [customRole, setCustomRole] = useState("")
  const [selectedRound, setSelectedRound] = useState("")
  const [experience, setExperience] = useState("")
  const [questionCount, setQuestionCount] = useState(0)
  const [interviewComplete, setInterviewComplete] = useState(false)
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: "/api/mentor-interview" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Count questions asked by the mentor
  useEffect(() => {
    const mentorMessages = messages.filter(m => m.role === "assistant")
    setQuestionCount(mentorMessages.length)
    
    // Check if interview is complete (after ~5 questions)
    if (mentorMessages.length >= 6 && messages[messages.length - 1]?.role === "assistant") {
      const lastMessage = getMessageText(messages[messages.length - 1])
      if (lastMessage.toLowerCase().includes("interview complete") || 
          lastMessage.toLowerCase().includes("that concludes") ||
          lastMessage.toLowerCase().includes("final assessment")) {
        setInterviewComplete(true)
      }
    }
  }, [messages])

  const startInterview = () => {
    const role = jobRole || customRole
    if (!role || !selectedRound || !experience) return
    
    setStep("interview")
    
    const roundInfo = interviewRounds.find(r => r.id === selectedRound)
    const expInfo = experienceLevels.find(e => e.id === experience)
    
    sendMessage({ 
      text: `Start a ${roundInfo?.label} mock interview for a ${role} position. I have ${expInfo?.years} of experience. Please introduce yourself as Professor Aria, my AI interview mentor, and begin the interview with an appropriate opening question.`
    }, {
      body: {
        context: {
          jobRole: role,
          interviewRound: selectedRound,
          experience: experience,
          mentorName: MENTOR.name
        }
      }
    })
  }

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    sendMessage({ text: input }, {
      body: {
        context: {
          jobRole: jobRole || customRole,
          interviewRound: selectedRound,
          experience: experience,
          mentorName: MENTOR.name,
          questionNumber: questionCount
        }
      }
    })
    setInput("")
  }

  const restartInterview = () => {
    setMessages([])
    setStep("setup")
    setJobRole("")
    setCustomRole("")
    setSelectedRound("")
    setExperience("")
    setQuestionCount(0)
    setInterviewComplete(false)
  }

  const getMessageText = (message: typeof messages[0]) => {
    return message.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") || ""
  }

  // Setup Screen
  if (step === "setup") {
    return (
      <div className="max-w-3xl mx-auto px-4 pb-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Interview Mentor</h1>
            <p className="text-sm text-muted-foreground">Practice with {MENTOR.name}</p>
          </div>
        </div>

        {/* Mentor Intro Card */}
        <Card className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-500/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Mentor Avatar */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">{MENTOR.avatar}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-foreground text-lg">{MENTOR.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 text-xs font-medium">
                    {MENTOR.title}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-3">
                  "{MENTOR.tagline}"
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 rounded-lg bg-background/50 text-xs text-muted-foreground flex items-center gap-1">
                    <Award className="w-3 h-3" /> Expert Interviewer
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-background/50 text-xs text-muted-foreground flex items-center gap-1">
                    <Target className="w-3 h-3" /> Personalized Feedback
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-background/50 text-xs text-muted-foreground flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Skill Analysis
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Role Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-500" />
            Select Job Role
          </h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {popularRoles.map((role) => (
              <button
                key={role}
                onClick={() => { setJobRole(role); setCustomRole(""); }}
                className={`px-4 py-2 rounded-full border transition-all text-sm ${
                  jobRole === role
                    ? "border-indigo-500 bg-indigo-500/20 text-indigo-600"
                    : "border-border bg-card text-muted-foreground hover:border-indigo-500/50"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              value={customRole}
              onChange={(e) => { setCustomRole(e.target.value); setJobRole(""); }}
              placeholder="Or enter a custom role..."
              className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Interview Round Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-500" />
            Select Interview Round
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {interviewRounds.map((round) => (
              <button
                key={round.id}
                onClick={() => setSelectedRound(round.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedRound === round.id
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-border bg-card hover:border-purple-500/50"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedRound === round.id ? "bg-purple-500/20" : "bg-muted"
                  }`}>
                    <round.icon className={`w-5 h-5 ${selectedRound === round.id ? "text-purple-500" : "text-muted-foreground"}`} />
                  </div>
                  <span className="font-medium text-foreground">{round.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{round.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-pink-500" />
            Your Experience Level
          </h3>
          <div className="flex flex-wrap gap-3">
            {experienceLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => setExperience(level.id)}
                className={`px-5 py-3 rounded-xl border-2 transition-all ${
                  experience === level.id
                    ? "border-pink-500 bg-pink-500/10"
                    : "border-border bg-card hover:border-pink-500/50"
                }`}
              >
                <div className="font-medium text-foreground">{level.label}</div>
                <div className="text-xs text-muted-foreground">{level.years}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <Button
          onClick={startInterview}
          disabled={!(jobRole || customRole) || !selectedRound || !experience}
          className="w-full py-6 text-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:from-slate-500 disabled:to-slate-600"
        >
          <span className="flex items-center gap-2">
            Start Interview with {MENTOR.name}
            <ChevronRight className="w-5 h-5" />
          </span>
        </Button>
      </div>
    )
  }

  // Interview Screen
  return (
    <div className="max-w-3xl mx-auto px-4 h-[calc(100vh-180px)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-lg font-bold text-white">{MENTOR.avatar}</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">{MENTOR.name}</h1>
              <p className="text-xs text-muted-foreground">
                {interviewRounds.find(r => r.id === selectedRound)?.label} | {jobRole || customRole}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Progress */}
          <div className="hidden sm:block">
            <div className="text-xs text-muted-foreground mb-1">Progress</div>
            <div className="w-24">
              <Progress value={Math.min(questionCount * 20, 100)} className="h-2" />
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={restartInterview} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Restart
          </Button>
        </div>
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
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                msg.role === "user" 
                  ? "bg-slate-600" 
                  : "bg-gradient-to-br from-indigo-600 to-purple-600"
              }`}>
                {msg.role === "user" ? (
                  <User className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-sm font-bold text-white">{MENTOR.avatar}</span>
                )}
              </div>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user" 
                  ? "bg-slate-600 text-white rounded-br-md" 
                  : "bg-muted text-foreground rounded-bl-md"
              }`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{getMessageText(msg)}</p>
              </div>
            </div>
          ))}

          {/* Loading */}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <span className="text-sm font-bold text-white">{MENTOR.avatar}</span>
              </div>
              <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card">
          {interviewComplete ? (
            <div className="text-center py-4">
              <div className="text-lg font-semibold text-foreground mb-2">Interview Complete!</div>
              <p className="text-sm text-muted-foreground mb-4">Review your feedback above and practice again to improve.</p>
              <Button onClick={restartInterview} className="bg-gradient-to-r from-indigo-600 to-purple-600">
                Start New Interview
              </Button>
            </div>
          ) : (
            <>
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
                  className="flex-1 bg-muted border-0 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none disabled:opacity-50"
                />
                <Button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Press Enter to send, Shift+Enter for new line
              </p>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}
