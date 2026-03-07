"use client"

import { useState, useEffect } from "react"
import { ArrowRight, RefreshCw, Briefcase, TrendingUp, GraduationCap, Star, CheckCircle, Target, Award, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

interface CareerAnalysisProps {
  data: {
    age: string
    education: string
    interests: string[]
    assignmentScores: Record<string, number>
  }
  onReset: () => void
}

const interestNames: Record<string, string> = {
  technology: "Technology & Software",
  healthcare: "Healthcare & Medicine",
  business: "Business & Finance",
  arts: "Arts & Design",
  science: "Science & Research",
  education: "Education & Teaching",
  engineering: "Engineering",
  media: "Media & Communication",
  law: "Law & Government",
  environment: "Environment & Sustainability",
  sports: "Sports & Fitness",
  entertainment: "Entertainment",
  hospitality: "Hospitality & Tourism",
  psychology: "Psychology & Counseling",
  agriculture: "Agriculture & Food",
}

const careerPathsByInterest: Record<string, { title: string; description: string; salary: string; growth: string; skills: string[] }[]> = {
  technology: [
    { title: "Software Developer", description: "Build applications and systems using programming languages", salary: "$75K - $150K", growth: "22%", skills: ["Programming", "Problem Solving", "System Design"] },
    { title: "Data Scientist", description: "Analyze complex data to drive business decisions", salary: "$85K - $160K", growth: "25%", skills: ["Statistics", "Machine Learning", "Python"] },
    { title: "Cybersecurity Analyst", description: "Protect systems and networks from cyber threats", salary: "$80K - $140K", growth: "28%", skills: ["Security", "Networking", "Risk Assessment"] },
    { title: "AI/ML Engineer", description: "Develop artificial intelligence and machine learning solutions", salary: "$100K - $180K", growth: "35%", skills: ["Deep Learning", "Python", "Mathematics"] },
  ],
  healthcare: [
    { title: "Healthcare Administrator", description: "Manage healthcare facilities and operations", salary: "$70K - $130K", growth: "18%", skills: ["Management", "Healthcare Policy", "Leadership"] },
    { title: "Medical Researcher", description: "Conduct research to improve medical treatments", salary: "$65K - $120K", growth: "15%", skills: ["Research", "Analysis", "Medical Knowledge"] },
    { title: "Health Informatics Specialist", description: "Manage healthcare data and information systems", salary: "$75K - $110K", growth: "20%", skills: ["Data Management", "Healthcare IT", "Analysis"] },
    { title: "Public Health Analyst", description: "Analyze health trends and develop public health programs", salary: "$55K - $90K", growth: "16%", skills: ["Epidemiology", "Statistics", "Policy"] },
  ],
  business: [
    { title: "Business Analyst", description: "Analyze business processes and recommend improvements", salary: "$65K - $110K", growth: "14%", skills: ["Analysis", "Communication", "Strategy"] },
    { title: "Financial Analyst", description: "Analyze financial data and market trends", salary: "$70K - $120K", growth: "12%", skills: ["Financial Modeling", "Excel", "Research"] },
    { title: "Product Manager", description: "Lead product development from conception to launch", salary: "$90K - $160K", growth: "18%", skills: ["Strategy", "Leadership", "Communication"] },
    { title: "Management Consultant", description: "Advise organizations on business strategy", salary: "$85K - $180K", growth: "15%", skills: ["Problem Solving", "Communication", "Strategy"] },
  ],
  arts: [
    { title: "UX/UI Designer", description: "Design user experiences for digital products", salary: "$65K - $120K", growth: "20%", skills: ["Design Tools", "User Research", "Prototyping"] },
    { title: "Graphic Designer", description: "Create visual content for brands and media", salary: "$45K - $85K", growth: "10%", skills: ["Adobe Suite", "Typography", "Creativity"] },
    { title: "Motion Graphics Designer", description: "Create animated visual content", salary: "$55K - $100K", growth: "15%", skills: ["Animation", "After Effects", "Storytelling"] },
    { title: "Art Director", description: "Lead creative vision for campaigns and projects", salary: "$70K - $130K", growth: "12%", skills: ["Leadership", "Creativity", "Brand Strategy"] },
  ],
  science: [
    { title: "Research Scientist", description: "Conduct scientific research in various fields", salary: "$70K - $130K", growth: "12%", skills: ["Research Methods", "Analysis", "Technical Writing"] },
    { title: "Laboratory Manager", description: "Oversee laboratory operations and research", salary: "$65K - $110K", growth: "10%", skills: ["Lab Management", "Quality Control", "Leadership"] },
    { title: "Scientific Writer", description: "Communicate scientific findings to various audiences", salary: "$55K - $95K", growth: "15%", skills: ["Writing", "Research", "Communication"] },
    { title: "Data Analyst", description: "Analyze scientific data and create reports", salary: "$60K - $100K", growth: "18%", skills: ["Statistics", "Programming", "Visualization"] },
  ],
  education: [
    { title: "Curriculum Developer", description: "Design educational programs and materials", salary: "$55K - $90K", growth: "12%", skills: ["Instructional Design", "Content Creation", "Research"] },
    { title: "Educational Technology Specialist", description: "Implement technology solutions in education", salary: "$60K - $95K", growth: "18%", skills: ["EdTech", "Training", "Technology"] },
    { title: "Corporate Trainer", description: "Train employees in corporate settings", salary: "$55K - $85K", growth: "14%", skills: ["Training", "Communication", "Presentation"] },
    { title: "Academic Advisor", description: "Guide students in their educational journey", salary: "$45K - $70K", growth: "10%", skills: ["Counseling", "Communication", "Planning"] },
  ],
  engineering: [
    { title: "Systems Engineer", description: "Design and manage complex systems", salary: "$80K - $140K", growth: "15%", skills: ["Systems Design", "Analysis", "Project Management"] },
    { title: "Project Engineer", description: "Manage engineering projects from start to finish", salary: "$75K - $120K", growth: "12%", skills: ["Project Management", "Technical Skills", "Leadership"] },
    { title: "Quality Engineer", description: "Ensure products meet quality standards", salary: "$65K - $100K", growth: "10%", skills: ["Quality Assurance", "Testing", "Process Improvement"] },
    { title: "Automation Engineer", description: "Design and implement automated systems", salary: "$85K - $130K", growth: "20%", skills: ["Automation", "Programming", "Robotics"] },
  ],
  media: [
    { title: "Content Strategist", description: "Plan and manage content across platforms", salary: "$60K - $100K", growth: "16%", skills: ["Content Planning", "SEO", "Analytics"] },
    { title: "Digital Marketing Manager", description: "Lead digital marketing campaigns", salary: "$65K - $120K", growth: "18%", skills: ["Marketing", "Analytics", "Social Media"] },
    { title: "Video Producer", description: "Create and produce video content", salary: "$50K - $90K", growth: "14%", skills: ["Video Production", "Editing", "Storytelling"] },
    { title: "PR Specialist", description: "Manage public relations and communications", salary: "$55K - $95K", growth: "12%", skills: ["Communication", "Media Relations", "Writing"] },
  ],
  law: [
    { title: "Legal Analyst", description: "Research and analyze legal documents and cases", salary: "$55K - $90K", growth: "10%", skills: ["Legal Research", "Analysis", "Writing"] },
    { title: "Compliance Officer", description: "Ensure organizational compliance with regulations", salary: "$65K - $110K", growth: "15%", skills: ["Compliance", "Risk Management", "Policy"] },
    { title: "Policy Analyst", description: "Analyze and develop public policy", salary: "$60K - $100K", growth: "12%", skills: ["Research", "Analysis", "Writing"] },
    { title: "Contract Manager", description: "Manage contracts and negotiations", salary: "$70K - $120K", growth: "14%", skills: ["Contract Law", "Negotiation", "Management"] },
  ],
  environment: [
    { title: "Environmental Consultant", description: "Advise on environmental compliance and sustainability", salary: "$60K - $100K", growth: "18%", skills: ["Environmental Science", "Consulting", "Compliance"] },
    { title: "Sustainability Manager", description: "Lead sustainability initiatives in organizations", salary: "$70K - $120K", growth: "22%", skills: ["Sustainability", "Strategy", "Project Management"] },
    { title: "Renewable Energy Analyst", description: "Analyze and promote renewable energy solutions", salary: "$65K - $110K", growth: "25%", skills: ["Energy Analysis", "Research", "Technical Knowledge"] },
    { title: "Conservation Scientist", description: "Manage and protect natural resources", salary: "$55K - $90K", growth: "12%", skills: ["Conservation", "Research", "GIS"] },
  ],
  sports: [
    { title: "Sports Marketing Manager", description: "Market sports teams, events, and products", salary: "$60K - $110K", growth: "15%", skills: ["Marketing", "Sports Knowledge", "Communication"] },
    { title: "Fitness Program Manager", description: "Design and manage fitness programs", salary: "$50K - $85K", growth: "18%", skills: ["Fitness", "Program Design", "Management"] },
    { title: "Sports Data Analyst", description: "Analyze athletic performance data", salary: "$55K - $95K", growth: "20%", skills: ["Data Analysis", "Statistics", "Sports Science"] },
    { title: "Athletic Director", description: "Manage athletic programs and facilities", salary: "$65K - $120K", growth: "12%", skills: ["Management", "Leadership", "Budgeting"] },
  ],
  entertainment: [
    { title: "Production Manager", description: "Manage entertainment production projects", salary: "$60K - $110K", growth: "14%", skills: ["Production", "Management", "Budgeting"] },
    { title: "Game Designer", description: "Design video games and interactive experiences", salary: "$55K - $100K", growth: "18%", skills: ["Game Design", "Creativity", "Programming"] },
    { title: "Event Coordinator", description: "Plan and execute entertainment events", salary: "$45K - $75K", growth: "16%", skills: ["Event Planning", "Coordination", "Communication"] },
    { title: "Talent Manager", description: "Manage careers of entertainment professionals", salary: "$50K - $120K", growth: "12%", skills: ["Management", "Networking", "Negotiation"] },
  ],
  hospitality: [
    { title: "Hotel Operations Manager", description: "Manage daily hotel operations", salary: "$55K - $95K", growth: "14%", skills: ["Operations", "Customer Service", "Management"] },
    { title: "Travel Consultant", description: "Plan and book travel experiences", salary: "$40K - $70K", growth: "10%", skills: ["Travel Knowledge", "Sales", "Customer Service"] },
    { title: "Restaurant Manager", description: "Manage restaurant operations and staff", salary: "$45K - $75K", growth: "12%", skills: ["Management", "Food Service", "Customer Service"] },
    { title: "Tourism Marketing Manager", description: "Market tourism destinations and services", salary: "$55K - $90K", growth: "16%", skills: ["Marketing", "Tourism", "Communication"] },
  ],
  psychology: [
    { title: "HR Psychologist", description: "Apply psychology in workplace settings", salary: "$70K - $120K", growth: "18%", skills: ["Psychology", "HR", "Assessment"] },
    { title: "Career Counselor", description: "Guide individuals in career decisions", salary: "$50K - $80K", growth: "14%", skills: ["Counseling", "Assessment", "Communication"] },
    { title: "User Researcher", description: "Research user behavior for product development", salary: "$65K - $110K", growth: "20%", skills: ["Research", "Psychology", "Analysis"] },
    { title: "Training Psychologist", description: "Design and deliver psychological training", salary: "$60K - $100K", growth: "15%", skills: ["Training", "Psychology", "Facilitation"] },
  ],
  agriculture: [
    { title: "Agricultural Consultant", description: "Advise farmers on best practices", salary: "$55K - $90K", growth: "12%", skills: ["Agriculture", "Consulting", "Technical Knowledge"] },
    { title: "Food Scientist", description: "Research and develop food products", salary: "$60K - $100K", growth: "15%", skills: ["Food Science", "Research", "Quality Control"] },
    { title: "AgriTech Specialist", description: "Implement technology in agriculture", salary: "$65K - $110K", growth: "22%", skills: ["Technology", "Agriculture", "Innovation"] },
    { title: "Supply Chain Manager", description: "Manage agricultural supply chains", salary: "$70K - $120K", growth: "18%", skills: ["Supply Chain", "Logistics", "Management"] },
  ],
}

export function CareerAnalysis({ data, onReset }: CareerAnalysisProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [showDetailedResults, setShowDetailedResults] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  // Sort interests by score
  const sortedInterests = [...data.interests].sort(
    (a, b) => (data.assignmentScores[b] || 0) - (data.assignmentScores[a] || 0)
  )

  const topInterests = sortedInterests.slice(0, 3)
  
  // Get career paths for top interests
  const recommendedCareers = topInterests.flatMap(interest => {
    const careers = careerPathsByInterest[interest] || []
    const score = data.assignmentScores[interest] || 0
    return careers.slice(0, 2).map(career => ({
      ...career,
      matchPercentage: Math.min(99, score + Math.floor(Math.random() * 10)),
      fromInterest: interest,
    }))
  }).sort((a, b) => b.matchPercentage - a.matchPercentage).slice(0, 6)

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 text-center py-20">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Briefcase className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3">Analyzing Your Profile</h2>
        <p className="text-muted-foreground mb-8">Our AI is calculating your perfect career matches based on your assessment results...</p>
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
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Your Career Analysis</h1>
        <p className="text-muted-foreground">
          Based on your interests, skills, and assessment performance, here are your personalized career recommendations
        </p>
      </div>

      {/* Interest Priority Analysis */}
      <Card className="bg-card border-border mb-8">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Your Interest Priority Analysis</h3>
              <p className="text-sm text-muted-foreground">Ranked by your assessment performance</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {sortedInterests.map((interest, index) => {
              const score = data.assignmentScores[interest] || 0
              const isTop = index < 3
              return (
                <div key={interest} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {isTop && (
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          index === 0 ? "bg-primary text-primary-foreground" :
                          index === 1 ? "bg-secondary text-secondary-foreground" :
                          "bg-accent text-accent-foreground"
                        }`}>
                          {index + 1}
                        </div>
                      )}
                      <span className={`font-medium ${isTop ? "text-foreground" : "text-muted-foreground"}`}>
                        {interestNames[interest] || interest}
                      </span>
                      {index === 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          Top Match
                        </span>
                      )}
                    </div>
                    <span className={`font-bold ${
                      score >= 80 ? "text-primary" :
                      score >= 60 ? "text-secondary" :
                      "text-muted-foreground"
                    }`}>
                      {score}%
                    </span>
                  </div>
                  <Progress 
                    value={score} 
                    className={`h-2 ${
                      isTop ? "" : "opacity-50"
                    }`}
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Career Matches */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Recommended Career Paths</h3>
        </div>
        
        <div className="grid gap-4">
          {recommendedCareers.map((career, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/30 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-lg font-semibold text-foreground">{career.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        career.matchPercentage >= 90 ? "bg-primary/20 text-primary" :
                        career.matchPercentage >= 80 ? "bg-secondary/20 text-secondary" :
                        "bg-accent/20 text-accent"
                      }`}>
                        {career.matchPercentage}% Match
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {career.skills.map((skill, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Based on your interest in {interestNames[career.fromInterest]}
                    </span>
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
      </div>

      {/* Profile Summary */}
      <Card className="bg-muted/30 border-border mb-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Profile Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Age Range</div>
              <div className="text-foreground font-medium capitalize">{data.age.replace("-", " to ")}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Education</div>
              <div className="text-foreground font-medium capitalize">{data.education}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Top Interest</div>
              <div className="text-foreground font-medium">{interestNames[topInterests[0]] || topInterests[0]}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Interests Assessed</div>
              <div className="text-foreground font-medium">{data.interests.length} areas</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="bg-primary/10 border-primary/30 mb-8">
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
              <span className="text-foreground">Test your logical and conceptual skills</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
            <Link href="/interview" className="flex items-center justify-between p-3 bg-card rounded-xl hover:bg-muted transition-colors group">
              <span className="text-foreground">Prepare for interviews with Mock Sessions</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Button onClick={onReset} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Retake Assessment
        </Button>
        <Link href="/interview">
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            Start Interview Prep
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
