"use client"

import { FileText, MessageSquare, Video, ArrowRight, Star, Lock, Briefcase, GraduationCap, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Section = "hub" | "resume" | "mock" | "personality"

interface InterviewHubProps {
  onNavigate: (section: Section) => void
}

const sections = [
  {
    id: "resume" as const,
    title: "Resume Builder",
    description: "Create a professional resume with multiple templates. Enter your details step-by-step and download as PDF.",
    icon: FileText,
    gradient: "from-cyan-500 to-teal-500",
    free: true,
    features: ["6 Professional Templates", "Multi-Step Wizard", "PDF Download & Share"]
  },
  {
    id: "mock" as const,
    title: "AI Mock Interview",
    description: "Practice with Professor Aria, your AI mentor. Get real-time feedback, scores, and personalized improvement tips.",
    icon: GraduationCap,
    gradient: "from-indigo-500 to-purple-500",
    free: true,
    features: ["Character.ai Style Mentor", "4 Interview Rounds", "Detailed Analysis"]
  },
  {
    id: "personality" as const,
    title: "Personality Development",
    description: "Upload video or audio clips for analysis. Get feedback on tone, posture, confidence, and communication style.",
    icon: Video,
    gradient: "from-pink-500 to-rose-500",
    free: false,
    features: ["Video Analysis", "Voice Assessment", "Body Language Tips"]
  },
]

export function InterviewHub({ onNavigate }: InterviewHubProps) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-6">
          <Briefcase className="w-4 h-4 text-indigo-500" />
          <span className="text-sm text-indigo-600 font-medium">Interview Training</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Ace Your Next Interview
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive preparation with resume building, AI-powered mock interviews with Professor Aria, 
          and personality development - all in one place.
        </p>
      </div>

      {/* AI Mentor Highlight */}
      <Card className="bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-500/20 mb-8">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 flex-wrap md:flex-nowrap">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-xl font-bold text-white">A</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="font-bold text-foreground">Meet Professor Aria</span>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 text-xs font-medium">
                  AI Interview Mentor
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your personal AI coach who conducts realistic mock interviews, provides instant feedback, 
                and helps you improve with every answer. Choose from Written Tests, Group Discussions, 
                Technical Rounds, or HR Interviews.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded-lg bg-background/50 text-xs text-muted-foreground">
                  Written Test
                </span>
                <span className="px-2 py-1 rounded-lg bg-background/50 text-xs text-muted-foreground">
                  Group Discussion
                </span>
                <span className="px-2 py-1 rounded-lg bg-background/50 text-xs text-muted-foreground">
                  Technical Round
                </span>
                <span className="px-2 py-1 rounded-lg bg-background/50 text-xs text-muted-foreground">
                  HR Round
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Card 
            key={section.id}
            className="bg-card border-border hover:border-indigo-500/30 transition-all cursor-pointer group h-full overflow-hidden"
            onClick={() => onNavigate(section.id)}
          >
            <CardContent className="p-6 flex flex-col h-full">
              {/* Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                  <section.icon className="w-7 h-7 text-white" />
                </div>
                {section.free ? (
                  <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-600 text-xs font-medium">Free</span>
                ) : (
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Premium
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                {section.title}
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {section.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {section.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${section.gradient}`} />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SGA.ai Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Need help? Click the <span className="text-cyan-500 font-medium">SGA.ai</span> button in the corner to chat with your personal assistant.
        </p>
      </div>
    </div>
  )
}
