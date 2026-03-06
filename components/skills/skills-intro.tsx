"use client"

import { Brain, Clock, Target, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface SkillsIntroProps {
  onStart: (category: string) => void
}

const categories = [
  { id: "algorithms", name: "Algorithms", desc: "Sorting, searching, optimization", icon: "puzzle" },
  { id: "datastructures", name: "Data Structures", desc: "Arrays, trees, graphs", icon: "layers" },
  { id: "logic", name: "Logic Puzzles", desc: "Pattern recognition, reasoning", icon: "brain" },
  { id: "math", name: "Mathematical", desc: "Number theory, probability", icon: "calculator" },
]

const rules = [
  { icon: Clock, title: "30 Minutes", desc: "Complete all problems within time limit" },
  { icon: Target, title: "5 Problems", desc: "Solve diverse challenges" },
  { icon: Zap, title: "Instant Feedback", desc: "Know your skill level immediately" },
]

export function SkillsIntro({ onStart }: SkillsIntroProps) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
          <Brain className="w-4 h-4 text-accent" />
          <span className="text-sm text-accent font-medium">Skill Assessment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Test Your Logical Skills
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Challenge yourself with timed problem-solving exercises. Get detailed 
          analysis of your logical and conceptual abilities.
        </p>
      </div>

      {/* Rules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {rules.map((rule, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <rule.icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="font-medium text-foreground">{rule.title}</div>
              <div className="text-sm text-muted-foreground">{rule.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4">Choose Your Challenge</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              className="bg-card border-border hover:border-accent/50 transition-all cursor-pointer group"
              onClick={() => onStart(cat.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <Brain className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{cat.name}</div>
                    <div className="text-sm text-muted-foreground">{cat.desc}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Scoring Info */}
      <Card className="bg-accent/10 border-accent/20">
        <CardContent className="p-6">
          <h3 className="font-semibold text-foreground mb-4">How Scoring Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-card rounded-lg">
              <div className="font-medium text-foreground mb-1">Score 0-20</div>
              <div className="text-muted-foreground">Foundation level - start from basics</div>
            </div>
            <div className="p-3 bg-card rounded-lg">
              <div className="font-medium text-foreground mb-1">Score 20-50</div>
              <div className="text-muted-foreground">Intermediate - build on existing skills</div>
            </div>
            <div className="p-3 bg-card rounded-lg">
              <div className="font-medium text-foreground mb-1">Score 50-100</div>
              <div className="text-muted-foreground">Advanced - focus on complex problems</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
