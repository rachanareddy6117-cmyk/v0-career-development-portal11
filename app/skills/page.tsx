"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SGAAssistant } from "@/components/sga-assistant"
import { SkillsIntro } from "@/components/skills/skills-intro"
import { SkillsChallenge } from "@/components/skills/skills-challenge"
import { SkillsResults } from "@/components/skills/skills-results"

interface SkillResult {
  score: number
  timeUsed: number
  totalTime: number
  problemsSolved: number
  totalProblems: number
  category: string
}

export default function SkillsPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [step, setStep] = useState<"intro" | "challenge" | "results">("intro")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [result, setResult] = useState<SkillResult | null>(null)

  const handleStart = (category: string) => {
    setSelectedCategory(category)
    setStep("challenge")
  }

  const handleComplete = (challengeResult: SkillResult) => {
    setResult(challengeResult)
    setStep("results")
  }

  const handleReset = () => {
    setSelectedCategory("")
    setResult(null)
    setStep("intro")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20">
        {step === "intro" && <SkillsIntro onStart={handleStart} />}
        {step === "challenge" && <SkillsChallenge category={selectedCategory} onComplete={handleComplete} />}
        {step === "results" && result && <SkillsResults result={result} onReset={handleReset} />}
      </div>
      <Footer />
      <SGAAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </main>
  )
}
