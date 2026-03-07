"use client"

import { ArrowRight, Play, Zap, Target, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Learning Platform</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            <span className="text-balance">Your Personalized Path to</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Dream Career
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-pretty">
            Discover your potential with adaptive learning paths, skill assessments, 
            interview training, and AI-driven career guidance tailored just for you.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 h-14 px-8 text-lg"
              onClick={() => {
                document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 h-14 px-8 text-lg border-border text-foreground hover:bg-muted">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            {[
              { value: "50K+", label: "Students Guided" },
              { value: "95%", label: "Success Rate" },
              { value: "200+", label: "Career Paths" },
              { value: "24/7", label: "AI Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating cards */}
        <div className="hidden lg:block absolute top-32 left-8 animate-float">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Career Match</div>
                <div className="text-xs text-muted-foreground">98% compatibility</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute top-48 right-12 animate-float-delayed">
          <div className="bg-card border border-border rounded-2xl p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">Skills Unlocked</div>
                <div className="text-xs text-muted-foreground">12 new this week</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  )
}
