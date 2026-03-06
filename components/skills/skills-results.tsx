"use client"

import { Brain, Clock, Target, Trophy, ArrowRight, RefreshCw, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface SkillResult {
  score: number
  timeUsed: number
  totalTime: number
  problemsSolved: number
  totalProblems: number
  category: string
}

interface SkillsResultsProps {
  result: SkillResult
  onReset: () => void
}

const categoryNames: Record<string, string> = {
  algorithms: "Algorithms",
  datastructures: "Data Structures",
  logic: "Logic Puzzles",
  math: "Mathematical"
}

export function SkillsResults({ result, onReset }: SkillsResultsProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  const getLevel = () => {
    if (result.score < 20) return { level: "Foundation", color: "destructive", message: "You're at the beginning of your journey. Don't worry - with practice, you'll improve rapidly!" }
    if (result.score < 50) return { level: "Developing", color: "secondary", message: "You have a good foundation. Focus on practicing more complex problems to level up." }
    if (result.score < 80) return { level: "Proficient", color: "primary", message: "Excellent work! You have strong logical skills. Keep challenging yourself with harder problems." }
    return { level: "Expert", color: "accent", message: "Outstanding! Your logical and conceptual skills are exceptional. Consider helping others learn!" }
  }

  const levelInfo = getLevel()

  const getRecommendations = () => {
    if (result.score < 20) {
      return [
        "Start with basic programming concepts",
        "Practice simple logic puzzles daily",
        "Focus on understanding fundamentals",
        "Use visual learning tools"
      ]
    }
    if (result.score < 50) {
      return [
        "Practice medium-difficulty problems",
        "Learn common algorithms patterns",
        "Study time and space complexity",
        "Work on real coding challenges"
      ]
    }
    return [
      "Tackle advanced algorithmic problems",
      "Participate in coding competitions",
      "Study system design concepts",
      "Mentor others to reinforce learning"
    ]
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Challenge Complete!</h1>
        <p className="text-muted-foreground">
          Here&apos;s your {categoryNames[result.category]} skills analysis
        </p>
      </div>

      {/* Score Card */}
      <Card className="bg-card border-border mb-8">
        <CardContent className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-2">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground">{result.score}</div>
              <div className="text-sm text-muted-foreground">Points</div>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-2">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{result.problemsSolved}/{result.totalProblems}</div>
              <div className="text-sm text-muted-foreground">Solved</div>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-3xl font-bold text-foreground">{formatTime(result.timeUsed)}</div>
              <div className="text-sm text-muted-foreground">Time Used</div>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground">{Math.round((result.score / 100) * 100)}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level Card */}
      <Card className={`bg-${levelInfo.color}/10 border-${levelInfo.color}/30 mb-8`}>
        <CardContent className="p-6 text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${levelInfo.color}/20 mb-4`}>
            <span className={`text-${levelInfo.color} font-semibold`}>{levelInfo.level} Level</span>
          </div>
          <p className="text-foreground">{levelInfo.message}</p>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-card border-border mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Next Steps</h3>
          <div className="space-y-3">
            {getRecommendations().map((rec, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-xl">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground">
                  {index + 1}
                </div>
                <span className="text-foreground">{rec}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link href="/code-learning">
          <Card className="bg-card border-border hover:border-primary/30 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="font-medium text-foreground">Learn Coding</div>
                <div className="text-sm text-muted-foreground">Interactive quizzes</div>
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
                <div className="text-sm text-muted-foreground">Mock interviews</div>
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
          Try Another Category
        </Button>
      </div>
    </div>
  )
}
