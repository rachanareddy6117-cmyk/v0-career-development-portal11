"use client"

import { FileText, MessageSquare, Video, ArrowRight, Star, Lock, Briefcase } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type Section = "hub" | "resume" | "mock" | "personality"

interface InterviewHubProps {
  onNavigate: (section: Section) => void
}

const sections = [
  {
    id: "resume" as const,
    title: "Resume Builder",
    description: "Create a professional resume with AI assistance. Enter your details, choose a template, and get expert verification.",
    icon: FileText,
    color: "primary",
    free: true,
    features: ["AI-Powered Suggestions", "Multiple Templates", "Expert Review"]
  },
  {
    id: "mock" as const,
    title: "Mock Interview",
    description: "Practice with realistic interview questions. Get instant AI feedback on your answers and improve your skills.",
    icon: MessageSquare,
    color: "secondary",
    free: true,
    features: ["Industry Questions", "AI Feedback", "Skill Analysis"]
  },
  {
    id: "personality" as const,
    title: "Personality Development",
    description: "Upload video or audio clips for analysis. Get feedback on tone, posture, confidence, and communication style.",
    icon: Video,
    color: "accent",
    free: false,
    features: ["Video Analysis", "Voice Assessment", "Body Language Tips"]
  },
]

export function InterviewHub({ onNavigate }: InterviewHubProps) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Briefcase className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Interview Training</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Ace Your Next Interview
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive preparation with resume building, mock interviews, 
          and personality development - all in one place.
        </p>
      </div>

      {/* Free Sessions Info */}
      <Card className="bg-primary/10 border-primary/30 mb-8">
        <CardContent className="p-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Star className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold text-foreground">3 Free Sessions Available</div>
              <div className="text-sm text-muted-foreground">Resume, Mock Interview, and one Personality Session</div>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
            Limited Offer
          </span>
        </CardContent>
      </Card>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Card 
            key={section.id}
            className="bg-card border-border hover:border-primary/30 transition-all cursor-pointer group h-full"
            onClick={() => onNavigate(section.id)}
          >
            <CardContent className="p-6 flex flex-col h-full">
              {/* Icon & Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl bg-${section.color}/20 flex items-center justify-center group-hover:bg-${section.color}/30 transition-colors`}>
                  <section.icon className={`w-7 h-7 text-${section.color}`} />
                </div>
                {section.free ? (
                  <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">Free</span>
                ) : (
                  <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Premium
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                {section.title}
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {section.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {section.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className={`w-1.5 h-1.5 rounded-full bg-${section.color}`} />
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        After your free sessions, unlock unlimited access with our premium plan
      </div>
    </div>
  )
}
