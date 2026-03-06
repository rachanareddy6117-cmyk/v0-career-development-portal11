"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ChatBot } from "@/components/chat-bot"
import { InterviewHub } from "@/components/interview/interview-hub"
import { ResumeBuilder } from "@/components/interview/resume-builder"
import { MockInterview } from "@/components/interview/mock-interview"
import { PersonalityDev } from "@/components/interview/personality-dev"

type Section = "hub" | "resume" | "mock" | "personality"

export default function InterviewPage() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<Section>("hub")

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-20">
        {activeSection === "hub" && <InterviewHub onNavigate={setActiveSection} />}
        {activeSection === "resume" && <ResumeBuilder onBack={() => setActiveSection("hub")} />}
        {activeSection === "mock" && <MockInterview onBack={() => setActiveSection("hub")} />}
        {activeSection === "personality" && <PersonalityDev onBack={() => setActiveSection("hub")} />}
      </div>
      <Footer />
      <ChatBot isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </main>
  )
}
