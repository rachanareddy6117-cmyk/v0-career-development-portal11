"use client"

import { useState } from "react"
import { ArrowLeft, FileText, Plus, Trash2, Download, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ResumeBuilderProps {
  onBack: () => void
}

interface ResumeData {
  personalInfo: {
    fullName: string
    email: string
    phone: string
    location: string
    linkedin: string
    portfolio: string
  }
  summary: string
  education: { school: string; degree: string; year: string }[]
  experience: { company: string; role: string; duration: string; description: string }[]
  skills: string[]
}

const templates = [
  { id: "modern", name: "Modern", color: "primary" },
  { id: "classic", name: "Classic", color: "secondary" },
  { id: "creative", name: "Creative", color: "accent" },
]

export function ResumeBuilder({ onBack }: ResumeBuilderProps) {
  const [step, setStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState("modern")
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { fullName: "", email: "", phone: "", location: "", linkedin: "", portfolio: "" },
    summary: "",
    education: [{ school: "", degree: "", year: "" }],
    experience: [{ company: "", role: "", duration: "", description: "" }],
    skills: [""],
  })

  const totalSteps = 5

  const handlePersonalInfoChange = (field: keyof ResumeData["personalInfo"], value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }))
  }

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { school: "", degree: "", year: "" }]
    }))
  }

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }))
  }

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: "", role: "", duration: "", description: "" }]
    }))
  }

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }))
  }

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }))
  }

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Resume Builder</h1>
          <p className="text-sm text-muted-foreground">Create your professional resume</p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Step {step} of {totalSteps}</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step 1: Template Selection */}
      {step === 1 && (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Choose a Template</h2>
            <div className="grid grid-cols-3 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`p-4 rounded-xl border aspect-[3/4] flex flex-col items-center justify-center transition-all ${
                    selectedTemplate === template.id
                      ? `bg-${template.color}/20 border-${template.color}`
                      : "bg-muted border-transparent hover:border-primary/30"
                  }`}
                >
                  <FileText className={`w-8 h-8 mb-2 ${
                    selectedTemplate === template.id ? `text-${template.color}` : "text-muted-foreground"
                  }`} />
                  <span className="text-sm font-medium text-foreground">{template.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Personal Info */}
      {step === 2 && (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => handlePersonalInfoChange("fullName", e.target.value)}
                className="bg-muted border-0 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Email"
                value={resumeData.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                className="bg-muted border-0 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                className="bg-muted border-0 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Location"
                value={resumeData.personalInfo.location}
                onChange={(e) => handlePersonalInfoChange("location", e.target.value)}
                className="bg-muted border-0 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="url"
                placeholder="LinkedIn URL"
                value={resumeData.personalInfo.linkedin}
                onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                className="bg-muted border-0 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="url"
                placeholder="Portfolio URL (optional)"
                value={resumeData.personalInfo.portfolio}
                onChange={(e) => handlePersonalInfoChange("portfolio", e.target.value)}
                className="bg-muted border-0 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <textarea
              placeholder="Professional Summary"
              value={resumeData.summary}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
              rows={4}
              className="mt-4 w-full bg-muted border-0 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </CardContent>
        </Card>
      )}

      {/* Step 3: Education */}
      {step === 3 && (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Education</h2>
            <div className="space-y-4">
              {resumeData.education.map((edu, index) => (
                <div key={index} className="p-4 bg-muted rounded-xl">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Education {index + 1}</span>
                    {resumeData.education.length > 1 && (
                      <button onClick={() => removeEducation(index)} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="School/University"
                      value={edu.school}
                      onChange={(e) => {
                        const newEdu = [...resumeData.education]
                        newEdu[index].school = e.target.value
                        setResumeData(prev => ({ ...prev, education: newEdu }))
                      }}
                      className="bg-background border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEdu = [...resumeData.education]
                        newEdu[index].degree = e.target.value
                        setResumeData(prev => ({ ...prev, education: newEdu }))
                      }}
                      className="bg-background border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={edu.year}
                      onChange={(e) => {
                        const newEdu = [...resumeData.education]
                        newEdu[index].year = e.target.value
                        setResumeData(prev => ({ ...prev, education: newEdu }))
                      }}
                      className="bg-background border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={addEducation} className="w-full gap-2">
                <Plus className="w-4 h-4" /> Add Education
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Experience */}
      {step === 4 && (
        <Card className="bg-card border-border">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Work Experience</h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="p-4 bg-muted rounded-xl">
                  <div className="flex justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Experience {index + 1}</span>
                    {resumeData.experience.length > 1 && (
                      <button onClick={() => removeExperience(index)} className="text-destructive hover:text-destructive/80">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience]
                        newExp[index].company = e.target.value
                        setResumeData(prev => ({ ...prev, experience: newExp }))
                      }}
                      className="bg-background border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Role"
                      value={exp.role}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience]
                        newExp[index].role = e.target.value
                        setResumeData(prev => ({ ...prev, experience: newExp }))
                      }}
                      className="bg-background border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={exp.duration}
                      onChange={(e) => {
                        const newExp = [...resumeData.experience]
                        newExp[index].duration = e.target.value
                        setResumeData(prev => ({ ...prev, experience: newExp }))
                      }}
                      className="bg-background border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <textarea
                    placeholder="Description of responsibilities and achievements"
                    value={exp.description}
                    onChange={(e) => {
                      const newExp = [...resumeData.experience]
                      newExp[index].description = e.target.value
                      setResumeData(prev => ({ ...prev, experience: newExp }))
                    }}
                    rows={3}
                    className="w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
              ))}
              <Button variant="outline" onClick={addExperience} className="w-full gap-2">
                <Plus className="w-4 h-4" /> Add Experience
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Skills & Preview */}
      {step === 5 && (
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {resumeData.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 bg-muted rounded-full px-3 py-1">
                    <input
                      type="text"
                      placeholder="Skill"
                      value={skill}
                      onChange={(e) => {
                        const newSkills = [...resumeData.skills]
                        newSkills[index] = e.target.value
                        setResumeData(prev => ({ ...prev, skills: newSkills }))
                      }}
                      className="bg-transparent border-0 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none w-24"
                    />
                    <button onClick={() => removeSkill(index)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <Button variant="ghost" size="sm" onClick={addSkill} className="gap-1">
                  <Plus className="w-4 h-4" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resume Ready */}
          <Card className="bg-primary/10 border-primary/30">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Resume Ready!</h3>
              <p className="text-muted-foreground mb-4">Your resume will be reviewed by our professionals within 24 hours.</p>
              <Button className="gap-2 bg-primary text-primary-foreground">
                <Download className="w-4 h-4" /> Download Resume
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>
          Back
        </Button>
        <Button 
          onClick={() => setStep(Math.min(totalSteps, step + 1))}
          className="bg-primary text-primary-foreground"
          disabled={step === totalSteps}
        >
          {step === totalSteps - 1 ? "Finish" : "Continue"}
        </Button>
      </div>
    </div>
  )
}
