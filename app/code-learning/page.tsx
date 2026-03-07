"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SGAAssistant } from "@/components/sga-assistant"
import { CodeQuiz } from "@/components/code-learning/code-quiz"
import { CodeResults } from "@/components/code-learning/code-results"
import { CodeLearningIntro } from "@/components/code-learning/code-intro"

interface QuizResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  level: "beginner" | "intermediate" | "advanced"
  language: string
}

export default function CodeLearningPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [step, setStep] = useState<"intro" | "quiz" | "results">("intro")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  const handleStartQuiz = (language: string) => {
    setSelectedLanguage(language)
    setStep("quiz")
  }

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result)
    setStep("results")
  }

  const handleReset = () => {
    setSelectedLanguage("")
    setQuizResult(null)
    setStep("intro")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20">
        {step === "intro" && <CodeLearningIntro onStart={handleStartQuiz} />}
        {step === "quiz" && <CodeQuiz language={selectedLanguage} onComplete={handleQuizComplete} />}
        {step === "results" && quizResult && <CodeResults result={quizResult} onReset={handleReset} />}
      </div>
      <Footer />
      <SGAAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </main>
  )
}
