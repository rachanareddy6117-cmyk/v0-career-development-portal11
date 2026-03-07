"use client"

import { useState } from "react"
import { ArrowRight, Sparkles, User, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CareerBasicInfoProps {
  onSubmit: (age: string, education: string) => void
}

const ageRanges = [
  { value: "under18", label: "Under 18", description: "High school student" },
  { value: "18-22", label: "18-22", description: "College/University age" },
  { value: "23-30", label: "23-30", description: "Early career professional" },
  { value: "31-40", label: "31-40", description: "Mid-career professional" },
  { value: "40+", label: "40+", description: "Experienced professional" },
]

const educationLevels = [
  { value: "highschool", label: "High School", description: "10th/12th Standard" },
  { value: "undergraduate", label: "Undergraduate", description: "Bachelor's Degree" },
  { value: "graduate", label: "Graduate", description: "Master's Degree" },
  { value: "postgraduate", label: "Post Graduate", description: "PhD/Doctorate" },
  { value: "professional", label: "Professional", description: "Certifications/Diplomas" },
]

export function CareerBasicInfo({ onSubmit }: CareerBasicInfoProps) {
  const [age, setAge] = useState("")
  const [education, setEducation] = useState("")

  const canProceed = age && education

  const handleSubmit = () => {
    if (canProceed) {
      onSubmit(age, education)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Career Discovery Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Start Your Career Journey
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Tell us about yourself and we will guide you through a personalized career assessment
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</div>
          <span className="text-sm font-medium text-foreground">Basic Info</span>
        </div>
        <div className="w-12 h-0.5 bg-muted"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">2</div>
          <span className="text-sm text-muted-foreground">Interests</span>
        </div>
        <div className="w-12 h-0.5 bg-muted"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">3</div>
          <span className="text-sm text-muted-foreground">Assessment</span>
        </div>
        <div className="w-12 h-0.5 bg-muted"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">4</div>
          <span className="text-sm text-muted-foreground">Results</span>
        </div>
      </div>

      {/* Age Selection */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Your Age Range</h2>
              <p className="text-sm text-muted-foreground">Select your current age group</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ageRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setAge(range.value)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  age === range.value
                    ? "bg-primary/10 border-primary"
                    : "bg-muted/50 border-transparent hover:border-primary/30"
                }`}
              >
                <div className="font-medium text-foreground">{range.label}</div>
                <div className="text-xs text-muted-foreground">{range.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Education Selection */}
      <Card className="bg-card border-border mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Education Level</h2>
              <p className="text-sm text-muted-foreground">Select your highest education</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {educationLevels.map((level) => (
              <button
                key={level.value}
                onClick={() => setEducation(level.value)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  education === level.value
                    ? "bg-secondary/10 border-secondary"
                    : "bg-muted/50 border-transparent hover:border-secondary/30"
                }`}
              >
                <div className="font-medium text-foreground">{level.label}</div>
                <div className="text-xs text-muted-foreground">{level.description}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!canProceed}
          size="lg"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8"
        >
          Continue to Interests
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
