"use client"

import Link from "next/link"
import { 
  Compass, 
  Code2, 
  Brain, 
  Briefcase, 
  Newspaper,
  ArrowUpRight,
  Sparkles,
  Gamepad2,
  Timer,
  FileText,
  Video,
  Rocket
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    title: "Career Development",
    description: "Get AI-powered career guidance based on your age, interests, and aptitude. Discover your perfect career path with personalized analysis.",
    icon: Compass,
    color: "primary",
    href: "/career",
    highlights: ["Interest Analysis", "Field Recommendations", "Career Roadmap"],
    gradient: "from-primary/20 to-primary/5"
  },
  {
    title: "Interactive Code Learning",
    description: "Learn coding through fun, Duolingo-style quizzes. Assess your skills and get a personalized learning journey from beginner to pro.",
    icon: Code2,
    color: "secondary",
    href: "/code-learning",
    highlights: ["Fun Quizzes", "Progress Tracking", "Skill Assessment"],
    gradient: "from-secondary/20 to-secondary/5"
  },
  {
    title: "Logical & Conceptual Skills",
    description: "Test your problem-solving abilities with timed challenges. Get detailed analysis of your logical thinking and conceptual understanding.",
    icon: Brain,
    color: "accent",
    href: "/skills",
    highlights: ["30-Min Challenges", "Skill Analysis", "Learning Path"],
    gradient: "from-accent/20 to-accent/5"
  },
  {
    title: "Interview Training",
    description: "Prepare for success with resume building, mock interviews, and personality development. Get professional feedback and improve.",
    icon: Briefcase,
    color: "primary",
    href: "/interview",
    highlights: ["Resume Builder", "Mock Interviews", "Personality Dev"],
    gradient: "from-primary/20 to-primary/5"
  },
  {
    title: "Change Your Vision",
    description: "Stay updated with latest research, startup news, business trends, and tech launches in your chosen domain.",
    icon: Newspaper,
    color: "secondary",
    href: "/vision",
    highlights: ["Research Updates", "Startup News", "Industry Trends"],
    gradient: "from-secondary/20 to-secondary/5"
  },
]

const subFeatures = [
  { icon: Gamepad2, label: "Gamified Learning", description: "Learn while having fun" },
  { icon: Timer, label: "Timed Assessments", description: "Real interview prep" },
  { icon: FileText, label: "AI Resume Builder", description: "Professional templates" },
  { icon: Video, label: "Video Analysis", description: "Improve your presence" },
  { icon: Rocket, label: "Career Launch", description: "Ready for success" },
  { icon: Sparkles, label: "AI Insights", description: "Smart recommendations" },
]

export function FeatureCards() {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "primary":
        return {
          bg: "bg-primary/10",
          text: "text-primary",
          border: "border-primary/30",
          hover: "group-hover:bg-primary/20"
        }
      case "secondary":
        return {
          bg: "bg-secondary/10",
          text: "text-secondary",
          border: "border-secondary/30",
          hover: "group-hover:bg-secondary/20"
        }
      case "accent":
        return {
          bg: "bg-accent/10",
          text: "text-accent",
          border: "border-accent/30",
          hover: "group-hover:bg-accent/20"
        }
      default:
        return {
          bg: "bg-primary/10",
          text: "text-primary",
          border: "border-primary/30",
          hover: "group-hover:bg-primary/20"
        }
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A complete platform designed to guide you from discovery to career success
          </p>
        </div>

        {/* Main feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color)
            return (
              <Link key={index} href={feature.href}>
                <Card className={`group h-full bg-card border-border hover:border-${feature.color}/50 transition-all duration-300 hover:shadow-xl hover:shadow-${feature.color}/10 cursor-pointer overflow-hidden`}>
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-2xl ${colors.bg} ${colors.hover} flex items-center justify-center mb-5 transition-colors`}>
                      <feature.icon className={`w-7 h-7 ${colors.text}`} />
                    </div>

                    {/* Title with arrow */}
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-5 flex-grow">
                      {feature.description}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {feature.highlights.map((highlight, i) => (
                        <span 
                          key={i} 
                          className={`text-xs px-3 py-1.5 rounded-full ${colors.bg} ${colors.text} font-medium`}
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Sub-features grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {subFeatures.map((item, index) => (
            <div 
              key={index} 
              className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                <item.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="text-sm font-medium text-foreground mb-1">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
