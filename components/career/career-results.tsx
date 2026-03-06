"use client"

import { useState, useEffect } from "react"
import { ArrowRight, RefreshCw, Briefcase, TrendingUp, GraduationCap, Star, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface CareerResultsProps {
  data: {
    age: string
    education: string
    interests: string[]
    skills: string[]
    personality: string
    workStyle: string
  }
  onReset: () => void
}

const careerPaths = [
  {
    title: "Software Developer",
    match: 95,
    description: "Build innovative software solutions and applications",
    salary: "$85K - $150K",
    growth: "22%",
    skills: ["Problem Solving", "Technical Skills", "Analytical Thinking"],
    color: "primary"
  },
  {
    title: "UX/UI Designer",
    match: 88,
    description: "Create beautiful and intuitive user experiences",
    salary: "$70K - $120K",
    growth: "18%",
    skills: ["Creativity", "Communication", "Problem Solving"],
    color: "secondary"
  },
  {
    title: "Data Scientist",
    match: 82,
    description: "Analyze data to drive business decisions",
    salary: "$90K - $160K",
    growth: "25%",
    skills: ["Analytical Thinking", "Technical Skills", "Data Analysis"],
    color: "accent"
  },
  {
    title: "Product Manager",
    match: 78,
    description: "Lead product development and strategy",
    salary: "$100K - $180K",
    growth: "15%",
    skills: ["Leadership", "Communication", "Problem Solving"],
    color: "primary"
  },
]

export function CareerResults({ data, onReset }: CareerResultsProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center py-20">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Briefcase className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">Analyzing Your Profile</h2>
        <p className="text-muted-foreground mb-8">Our AI is finding your perfect career matches...</p>
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className="w-3 h-3 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Your Career Analysis</h1>
        <p className="text-muted-foreground">
          Based on your interests, skills, and personality, here are your best career matches
        </p>
      </div>

      {/* Profile Summary */}
      <Card className="bg-card border-border mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Profile Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Personality</div>
              <div className="text-foreground font-medium capitalize">{data.personality}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Work Style</div>
              <div className="text-foreground font-medium capitalize">{data.workStyle}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Top Interests</div>
              <div className="text-foreground font-medium">{data.interests.slice(0, 2).join(", ")}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Key Skills</div>
              <div className="text-foreground font-medium">{data.skills.slice(0, 2).join(", ")}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Matches */}
      <h3 className="text-xl font-semibold text-foreground mb-4">Top Career Matches</h3>
      <div className="space-y-4 mb-8">
        {careerPaths.map((career, index) => (
          <Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-foreground">{career.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      career.match >= 90 ? "bg-primary/20 text-primary" :
                      career.match >= 80 ? "bg-secondary/20 text-secondary" :
                      "bg-accent/20 text-accent"
                    }`}>
                      {career.match}% Match
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, i) => (
                      <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-4 h-4 text-accent" />
                    <span className="text-foreground">{career.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{career.growth} growth</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Next Steps */}
      <Card className="bg-primary/10 border-primary/30">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Recommended Next Steps
          </h3>
          <div className="space-y-3">
            <Link href="/code-learning" className="flex items-center justify-between p-3 bg-card rounded-xl hover:bg-muted transition-colors group">
              <span className="text-foreground">Start learning with Interactive Coding</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
            <Link href="/skills" className="flex items-center justify-between p-3 bg-card rounded-xl hover:bg-muted transition-colors group">
              <span className="text-foreground">Test your logical skills</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
            <Link href="/interview" className="flex items-center justify-between p-3 bg-card rounded-xl hover:bg-muted transition-colors group">
              <span className="text-foreground">Prepare for interviews</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center mt-8">
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Retake Assessment
        </Button>
      </div>
    </div>
  )
}
