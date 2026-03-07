"use client"

import { Code2, Sparkles, Zap, Trophy, Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CodeLearningIntroProps {
  onStart: (language: string) => void
}

const languages = [
  { id: "python", name: "Python", icon: "🐍", color: "from-yellow-500 to-blue-500", desc: "Great for beginners" },
  { id: "javascript", name: "JavaScript", icon: "⚡", color: "from-yellow-400 to-yellow-600", desc: "Web development" },
  { id: "java", name: "Java", icon: "☕", color: "from-red-500 to-orange-500", desc: "Enterprise apps" },
  { id: "c", name: "C", icon: "🔷", color: "from-gray-500 to-blue-600", desc: "Foundation of programming" },
  { id: "cpp", name: "C++", icon: "⚙️", color: "from-blue-500 to-blue-700", desc: "System programming" },
  { id: "csharp", name: "C#", icon: "🎮", color: "from-purple-500 to-purple-700", desc: "Game development" },
  { id: "go", name: "Go", icon: "🔵", color: "from-cyan-400 to-cyan-600", desc: "Cloud & backend" },
]

const benefits = [
  { icon: Zap, title: "Fun & Interactive", desc: "Duolingo-style quizzes that make learning enjoyable" },
  { icon: Target, title: "Skill Assessment", desc: "Know exactly where you stand and what to improve" },
  { icon: Trophy, title: "Track Progress", desc: "Watch your skills grow with detailed analytics" },
]

export function CodeLearningIntro({ onStart }: CodeLearningIntroProps) {
  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-6">
          <Code2 className="w-4 h-4 text-secondary" />
          <span className="text-sm text-secondary font-medium">Interactive Learning</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Learn Coding the Fun Way
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Take a quick quiz to assess your current level, then get a personalized 
          learning path tailored just for you
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <benefit.icon className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <div className="font-medium text-foreground">{benefit.title}</div>
              <div className="text-sm text-muted-foreground">{benefit.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Language Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-secondary" />
          Choose Your Language
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {languages.map((lang) => (
            <Card 
              key={lang.id}
              className="bg-card border-border hover:border-secondary/50 transition-all cursor-pointer group"
              onClick={() => onStart(lang.id)}
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{lang.icon}</div>
                <div className="font-semibold text-foreground mb-1">{lang.name}</div>
                <div className="text-xs text-muted-foreground">{lang.desc}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 text-center">
        <p className="text-secondary text-sm">
          The quiz takes about 5-10 minutes. Answer honestly to get the most accurate assessment!
        </p>
      </div>
    </div>
  )
}
