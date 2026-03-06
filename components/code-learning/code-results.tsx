"use client"

import { Trophy, Target, BookOpen, ArrowRight, RefreshCw, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface QuizResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  level: "beginner" | "intermediate" | "advanced"
  language: string
}

interface CodeResultsProps {
  result: QuizResult
  onReset: () => void
}

const languageNames: Record<string, string> = {
  python: "Python",
  javascript: "JavaScript",
  java: "Java",
  cpp: "C++",
  csharp: "C#",
  go: "Go"
}

const levelConfig = {
  beginner: {
    title: "Beginner",
    color: "primary",
    message: "You're just getting started! Don't worry - everyone begins here.",
    recommendation: "Start with fundamentals and build a strong foundation. Practice daily with simple exercises.",
    path: [
      "Basic Syntax & Variables",
      "Control Flow (if/else, loops)",
      "Functions & Methods",
      "Basic Data Structures",
      "Simple Projects"
    ]
  },
  intermediate: {
    title: "Intermediate",
    color: "secondary",
    message: "Great progress! You have a good understanding of the basics.",
    recommendation: "Focus on advanced concepts and start building real projects to solidify your skills.",
    path: [
      "Object-Oriented Programming",
      "Error Handling",
      "File Operations",
      "APIs & Libraries",
      "Medium-sized Projects"
    ]
  },
  advanced: {
    title: "Advanced",
    color: "accent",
    message: "Excellent! You have strong fundamentals and ready for challenges.",
    recommendation: "Dive into advanced topics, contribute to open source, and mentor others.",
    path: [
      "Design Patterns",
      "System Design",
      "Performance Optimization",
      "Open Source Contribution",
      "Complex Applications"
    ]
  }
}

export function CodeResults({ result, onReset }: CodeResultsProps) {
  const config = levelConfig[result.level]

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className={`w-20 h-20 rounded-full bg-${config.color}/20 flex items-center justify-center mx-auto mb-4`}>
          <Trophy className={`w-10 h-10 text-${config.color}`} />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h1>
        <p className="text-muted-foreground">
          Here&apos;s your {languageNames[result.language]} skill assessment
        </p>
      </div>

      {/* Score Card */}
      <Card className="bg-card border-border mb-8">
        <CardContent className="p-8 text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${result.score * 3.52} 352`}
                className="text-secondary"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-foreground">{result.score}%</span>
            </div>
          </div>

          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${config.color}/20 mb-4`}>
            <Zap className={`w-4 h-4 text-${config.color}`} />
            <span className={`text-${config.color} font-semibold`}>{config.title} Level</span>
          </div>

          <p className="text-foreground mb-2">{config.message}</p>
          <p className="text-sm text-muted-foreground">
            You got {result.correctAnswers} out of {result.totalQuestions} questions correct
          </p>
        </CardContent>
      </Card>

      {/* Recommendation */}
      <Card className="bg-secondary/10 border-secondary/30 mb-8">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Recommendation</h3>
              <p className="text-muted-foreground text-sm">{config.recommendation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="bg-card border-border mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Your Learning Path
          </h3>
          <div className="space-y-3">
            {config.path.map((step, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index === 0 ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {index + 1}
                </div>
                <span className={index === 0 ? "text-foreground font-medium" : "text-muted-foreground"}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link href="/skills">
          <Card className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Test Logical Skills</div>
                <div className="text-sm text-muted-foreground">30-minute challenge</div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/interview">
          <Card className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Interview Prep</div>
                <div className="text-sm text-muted-foreground">Resume & mock interviews</div>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Try Another Language
        </Button>
      </div>
    </div>
  )
}
