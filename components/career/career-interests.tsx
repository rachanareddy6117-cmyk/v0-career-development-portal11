"use client"

import { useState } from "react"
import { ArrowRight, Check, Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CareerInterestsProps {
  onSubmit: (interests: string[]) => void
  initialInterests: string[]
}

const interestCategories = [
  {
    id: "technology",
    name: "Technology & Software",
    icon: "💻",
    description: "Coding, AI, cybersecurity, software development",
  },
  {
    id: "healthcare",
    name: "Healthcare & Medicine",
    icon: "🏥",
    description: "Medical science, patient care, pharmaceuticals",
  },
  {
    id: "business",
    name: "Business & Finance",
    icon: "📊",
    description: "Entrepreneurship, marketing, accounting, investment",
  },
  {
    id: "arts",
    name: "Arts & Design",
    icon: "🎨",
    description: "Graphic design, fine arts, photography, animation",
  },
  {
    id: "science",
    name: "Science & Research",
    icon: "🔬",
    description: "Physics, chemistry, biology, research",
  },
  {
    id: "education",
    name: "Education & Teaching",
    icon: "📚",
    description: "Teaching, training, curriculum development",
  },
  {
    id: "engineering",
    name: "Engineering",
    icon: "⚙️",
    description: "Mechanical, civil, electrical, aerospace",
  },
  {
    id: "media",
    name: "Media & Communication",
    icon: "📱",
    description: "Journalism, content creation, public relations",
  },
  {
    id: "law",
    name: "Law & Government",
    icon: "⚖️",
    description: "Legal practice, public policy, administration",
  },
  {
    id: "environment",
    name: "Environment & Sustainability",
    icon: "🌍",
    description: "Environmental science, renewable energy, conservation",
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    icon: "🏃",
    description: "Athletic training, sports management, wellness",
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎬",
    description: "Film, music, gaming, events management",
  },
  {
    id: "hospitality",
    name: "Hospitality & Tourism",
    icon: "✈️",
    description: "Hotels, travel, food service, event planning",
  },
  {
    id: "psychology",
    name: "Psychology & Counseling",
    icon: "🧠",
    description: "Mental health, therapy, human behavior",
  },
  {
    id: "agriculture",
    name: "Agriculture & Food",
    icon: "🌾",
    description: "Farming, food technology, agribusiness",
  },
]

export function CareerInterests({ onSubmit, initialInterests }: CareerInterestsProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialInterests)

  const handleInterestToggle = (interestId: string) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(i => i !== interestId)
        : [...prev, interestId]
    )
  }

  const canProceed = selectedInterests.length >= 5

  const handleSubmit = () => {
    if (canProceed) {
      onSubmit(selectedInterests)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
          <Heart className="w-4 h-4 text-secondary" />
          <span className="text-sm text-secondary font-medium">Interest Selection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          What Interests You?
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Select at least 5 areas that excite and interest you. Your choices will help us create personalized assessments.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm text-muted-foreground">Basic Info</span>
        </div>
        <div className="w-12 h-0.5 bg-primary"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-medium">2</div>
          <span className="text-sm font-medium text-foreground">Interests</span>
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

      {/* Selection Counter */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">
                Selected: <span className={selectedInterests.length >= 5 ? "text-primary" : "text-muted-foreground"}>{selectedInterests.length}</span> / 5 minimum
              </span>
            </div>
            {selectedInterests.length >= 5 && (
              <span className="text-sm text-primary font-medium">Ready to continue!</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Interests Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {interestCategories.map((interest) => (
          <button
            key={interest.id}
            onClick={() => handleInterestToggle(interest.id)}
            className={`p-5 rounded-xl border text-left transition-all group ${
              selectedInterests.includes(interest.id)
                ? "bg-primary/10 border-primary"
                : "bg-card border-border hover:border-primary/30"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-2xl">{interest.icon}</span>
              {selectedInterests.includes(interest.id) && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              )}
            </div>
            <div className="font-semibold text-foreground mb-1">{interest.name}</div>
            <div className="text-sm text-muted-foreground">{interest.description}</div>
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!canProceed}
          size="lg"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-8"
        >
          Continue to Assessments
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {!canProceed && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Please select at least {5 - selectedInterests.length} more interest{5 - selectedInterests.length !== 1 ? 's' : ''} to continue
        </p>
      )}
    </div>
  )
}
