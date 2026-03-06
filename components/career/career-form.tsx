"use client"

import { useState } from "react"
import { ArrowRight, ArrowLeft, Sparkles, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CareerFormProps {
  onSubmit: (data: {
    age: string
    education: string
    interests: string[]
    skills: string[]
    personality: string
    workStyle: string
  }) => void
}

const interestOptions = [
  "Technology & Software", "Healthcare & Medicine", "Business & Finance",
  "Arts & Design", "Science & Research", "Education & Teaching",
  "Engineering", "Media & Communication", "Law & Government",
  "Environment & Sustainability", "Sports & Fitness", "Entertainment"
]

const skillOptions = [
  "Problem Solving", "Communication", "Leadership", "Creativity",
  "Technical Skills", "Analytical Thinking", "Teamwork", "Time Management",
  "Adaptability", "Public Speaking", "Writing", "Data Analysis"
]

const personalityTypes = [
  { value: "analytical", label: "Analytical", desc: "Logical, detail-oriented, data-driven" },
  { value: "creative", label: "Creative", desc: "Innovative, artistic, imaginative" },
  { value: "social", label: "Social", desc: "People-oriented, empathetic, collaborative" },
  { value: "practical", label: "Practical", desc: "Hands-on, results-focused, efficient" },
]

const workStyles = [
  { value: "remote", label: "Remote Work", desc: "Work from anywhere, flexible schedule" },
  { value: "office", label: "Office Based", desc: "Traditional workplace, team presence" },
  { value: "hybrid", label: "Hybrid", desc: "Mix of remote and office" },
  { value: "field", label: "Field Work", desc: "Travel, outdoor, on-site work" },
]

export function CareerForm({ onSubmit }: CareerFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    age: "",
    education: "",
    interests: [] as string[],
    skills: [] as string[],
    personality: "",
    workStyle: "",
  })

  const totalSteps = 4

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
    else onSubmit(formData)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.age && formData.education
      case 2: return formData.interests.length >= 2
      case 3: return formData.skills.length >= 3
      case 4: return formData.personality && formData.workStyle
      default: return false
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Career Discovery</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Discover Your Perfect Career
        </h1>
        <p className="text-muted-foreground">
          Answer a few questions and let AI guide you to your ideal career path
        </p>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
          <span className="text-sm text-primary font-medium">{Math.round((step / totalSteps) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-foreground mb-6">Tell us about yourself</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Your Age</label>
                <select
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  className="w-full bg-muted border-0 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select your age range</option>
                  <option value="under18">Under 18</option>
                  <option value="18-22">18-22</option>
                  <option value="23-30">23-30</option>
                  <option value="31-40">31-40</option>
                  <option value="40+">40+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Education Level</label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                  className="w-full bg-muted border-0 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select your education level</option>
                  <option value="highschool">High School</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="graduate">Graduate</option>
                  <option value="postgraduate">Post Graduate</option>
                  <option value="professional">Professional Certification</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Interests */}
      {step === 2 && (
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-foreground mb-2">What interests you?</h2>
            <p className="text-muted-foreground text-sm mb-6">Select at least 2 areas that excite you</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    formData.interests.includes(interest)
                      ? "bg-primary/20 border-primary text-foreground"
                      : "bg-muted border-transparent hover:border-primary/30 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{interest}</span>
                    {formData.interests.includes(interest) && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Skills */}
      {step === 3 && (
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <h2 className="text-xl font-semibold text-foreground mb-2">Your Top Skills</h2>
            <p className="text-muted-foreground text-sm mb-6">Select at least 3 skills you excel at</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skillOptions.map((skill) => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    formData.skills.includes(skill)
                      ? "bg-secondary/20 border-secondary text-foreground"
                      : "bg-muted border-transparent hover:border-secondary/30 text-muted-foreground"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{skill}</span>
                    {formData.skills.includes(skill) && (
                      <Check className="w-4 h-4 text-secondary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Personality & Work Style */}
      {step === 4 && (
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Your Personality Type</h2>
                <p className="text-muted-foreground text-sm mb-4">Which describes you best?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {personalityTypes.map((type) => (
                    <button
                      key={type.value}
                      onClick={() => setFormData(prev => ({ ...prev, personality: type.value }))}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.personality === type.value
                          ? "bg-accent/20 border-accent"
                          : "bg-muted border-transparent hover:border-accent/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{type.label}</div>
                      <div className="text-sm text-muted-foreground">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Preferred Work Style</h2>
                <p className="text-muted-foreground text-sm mb-4">How do you like to work?</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {workStyles.map((style) => (
                    <button
                      key={style.value}
                      onClick={() => setFormData(prev => ({ ...prev, workStyle: style.value }))}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        formData.workStyle === style.value
                          ? "bg-primary/20 border-primary"
                          : "bg-muted border-transparent hover:border-primary/30"
                      }`}
                    >
                      <div className="font-medium text-foreground">{style.label}</div>
                      <div className="text-sm text-muted-foreground">{style.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 1}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!canProceed()}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {step === totalSteps ? "Get My Results" : "Continue"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
