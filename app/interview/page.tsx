"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { SGAAssistant } from "@/components/sga-assistant"
import { InterviewHub } from "@/components/interview/interview-hub"
import { ResumeBuilder } from "@/components/interview/resume-builder"
import { AIMentor } from "@/components/interview/ai-mentor"
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
        {activeSection === "mock" && <AIMentor onBack={() => setActiveSection("hub")} />}
        {activeSection === "personality" && <PersonalityDev onBack={() => setActiveSection("hub")} />}
      </div>
      <Footer />
      <SGAAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </main>
  )
}
