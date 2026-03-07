"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SGAAssistant } from "@/components/sga-assistant"
import { CareerBasicInfo } from "@/components/career/career-basic-info"
import { CareerInterests } from "@/components/career/career-interests"
import { CareerAssignments } from "@/components/career/career-assignments"
import { CareerAnalysis } from "@/components/career/career-analysis"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export interface CareerData {
  age: string
  education: string
  interests: string[]
  assignmentScores: Record<string, number>
}

export type CareerStep = "basic-info" | "interests" | "assignments" | "analysis"

export default function CareerPage() {
  const router = useRouter()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [step, setStep] = useState<CareerStep>("basic-info")
  const [careerData, setCareerData] = useState<CareerData>({
    age: "",
    education: "",
    interests: [],
    assignmentScores: {},
  })

  const handleBasicInfoSubmit = (age: string, education: string) => {
    setCareerData(prev => ({ ...prev, age, education }))
    setStep("interests")
  }

  const handleInterestsSubmit = (interests: string[]) => {
    setCareerData(prev => ({ ...prev, interests }))
    setStep("assignments")
  }

  const handleAssignmentsComplete = (scores: Record<string, number>) => {
    setCareerData(prev => ({ ...prev, assignmentScores: scores }))
    setStep("analysis")
  }

  const handleReset = () => {
    setCareerData({
      age: "",
      education: "",
      interests: [],
      assignmentScores: {},
    })
    setStep("basic-info")
  }

  const handleBack = () => {
    if (step === "interests") setStep("basic-info")
    else if (step === "assignments") setStep("interests")
    else if (step === "analysis") setStep("assignments")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20">
        {/* Back Button */}
        {step === "basic-info" ? (
          <div className="max-w-4xl mx-auto px-4 mb-6">
            <Link href="/">
              <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        ) : step !== "analysis" && (
          <div className="max-w-4xl mx-auto px-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={handleBack}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        )}

        {step === "basic-info" && (
          <CareerBasicInfo onSubmit={handleBasicInfoSubmit} />
        )}
        {step === "interests" && (
          <CareerInterests 
            onSubmit={handleInterestsSubmit}
            initialInterests={careerData.interests}
          />
        )}
        {step === "assignments" && (
          <CareerAssignments 
            interests={careerData.interests}
            onComplete={handleAssignmentsComplete}
          />
        )}
        {step === "analysis" && (
          <CareerAnalysis 
            data={careerData}
            onReset={handleReset}
          />
        )}
      </div>
      <Footer />
      <SGAAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </main>
  )
}
