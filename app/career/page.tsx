"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChatBot } from "@/components/chat-bot"
import { CareerForm } from "@/components/career/career-form"
import { CareerResults } from "@/components/career/career-results"

interface CareerData {
  age: string
  education: string
  interests: string[]
  skills: string[]
  personality: string
  workStyle: string
}

export default function CareerPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [step, setStep] = useState<"form" | "results">("form")
  const [careerData, setCareerData] = useState<CareerData | null>(null)

  const handleFormSubmit = (data: CareerData) => {
    setCareerData(data)
    setStep("results")
  }

  const handleReset = () => {
    setCareerData(null)
    setStep("form")
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20">
        {step === "form" ? (
          <CareerForm onSubmit={handleFormSubmit} />
        ) : (
          <CareerResults data={careerData!} onReset={handleReset} />
        )}
      </div>
      <Footer />
      <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </main>
  )
}
