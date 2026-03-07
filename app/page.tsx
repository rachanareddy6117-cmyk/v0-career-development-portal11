"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeatureCards } from "@/components/feature-cards"
import { SGAAssistant } from "@/components/sga-assistant"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <FeatureCards />
      <Footer />
      <SGAAssistant isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
    </main>
  )
}
