"use client"

import { useState } from "react"
import { ArrowRight, Check, ClipboardList, Lightbulb, Clock, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CareerAssignmentsProps {
  interests: string[]
  onComplete: (scores: Record<string, number>) => void
}

interface Question {
  id: string
  question: string
  options: { value: string; label: string; score: number }[]
}

const interestQuestions: Record<string, Question[]> = {
  technology: [
    {
      id: "tech1",
      question: "How comfortable are you with learning new programming languages?",
      options: [
        { value: "a", label: "Very excited to learn new languages regularly", score: 100 },
        { value: "b", label: "Comfortable with learning when needed", score: 75 },
        { value: "c", label: "Prefer to master one language deeply", score: 50 },
        { value: "d", label: "Find it challenging but willing to try", score: 25 },
      ],
    },
    {
      id: "tech2",
      question: "When solving a technical problem, you prefer to:",
      options: [
        { value: "a", label: "Research and find innovative solutions", score: 100 },
        { value: "b", label: "Follow established best practices", score: 75 },
        { value: "c", label: "Collaborate with others to brainstorm", score: 60 },
        { value: "d", label: "Ask for guidance from experts", score: 40 },
      ],
    },
  ],
  healthcare: [
    {
      id: "health1",
      question: "How do you feel about working in high-pressure medical situations?",
      options: [
        { value: "a", label: "Thrive under pressure and quick decisions", score: 100 },
        { value: "b", label: "Can handle it with proper training", score: 75 },
        { value: "c", label: "Prefer supportive/administrative roles", score: 50 },
        { value: "d", label: "Better suited for research-based roles", score: 40 },
      ],
    },
    {
      id: "health2",
      question: "Your approach to patient/client interaction:",
      options: [
        { value: "a", label: "Love direct patient care and empathy-driven work", score: 100 },
        { value: "b", label: "Enjoy helping but prefer limited interaction", score: 70 },
        { value: "c", label: "Prefer behind-the-scenes healthcare work", score: 50 },
        { value: "d", label: "More interested in health technology/systems", score: 60 },
      ],
    },
  ],
  business: [
    {
      id: "biz1",
      question: "How do you approach financial decision-making?",
      options: [
        { value: "a", label: "Love analyzing data and making strategic decisions", score: 100 },
        { value: "b", label: "Comfortable with basic financial concepts", score: 70 },
        { value: "c", label: "Prefer creative over numerical work", score: 40 },
        { value: "d", label: "Enjoy managing people more than numbers", score: 60 },
      ],
    },
    {
      id: "biz2",
      question: "Your leadership style is best described as:",
      options: [
        { value: "a", label: "Visionary - setting direction and inspiring others", score: 100 },
        { value: "b", label: "Collaborative - building consensus", score: 85 },
        { value: "c", label: "Supportive - helping team members grow", score: 70 },
        { value: "d", label: "Prefer individual contribution over leading", score: 40 },
      ],
    },
  ],
  arts: [
    {
      id: "art1",
      question: "How do you approach creative projects?",
      options: [
        { value: "a", label: "Start with experimentation and iteration", score: 100 },
        { value: "b", label: "Research trends then create original work", score: 85 },
        { value: "c", label: "Follow established design principles", score: 60 },
        { value: "d", label: "Prefer improving existing designs", score: 50 },
      ],
    },
    {
      id: "art2",
      question: "Your preferred creative medium:",
      options: [
        { value: "a", label: "Digital design and multimedia", score: 90 },
        { value: "b", label: "Traditional art and illustration", score: 85 },
        { value: "c", label: "Photography and video", score: 80 },
        { value: "d", label: "Writing and content creation", score: 75 },
      ],
    },
  ],
  science: [
    {
      id: "sci1",
      question: "Your approach to research and experimentation:",
      options: [
        { value: "a", label: "Love designing experiments and testing hypotheses", score: 100 },
        { value: "b", label: "Enjoy analyzing data and drawing conclusions", score: 85 },
        { value: "c", label: "Prefer applying existing research", score: 60 },
        { value: "d", label: "More interested in communicating findings", score: 50 },
      ],
    },
    {
      id: "sci2",
      question: "How do you handle complex scientific problems?",
      options: [
        { value: "a", label: "Break down systematically and solve step by step", score: 100 },
        { value: "b", label: "Collaborate with experts in different fields", score: 80 },
        { value: "c", label: "Research existing solutions first", score: 65 },
        { value: "d", label: "Focus on practical applications", score: 55 },
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      question: "Your preferred teaching approach:",
      options: [
        { value: "a", label: "Interactive and hands-on learning experiences", score: 100 },
        { value: "b", label: "Structured curriculum with clear objectives", score: 80 },
        { value: "c", label: "One-on-one mentoring and coaching", score: 85 },
        { value: "d", label: "Creating educational content and materials", score: 70 },
      ],
    },
    {
      id: "edu2",
      question: "How do you handle diverse learning needs?",
      options: [
        { value: "a", label: "Adapt methods for each individual learner", score: 100 },
        { value: "b", label: "Use multiple teaching techniques", score: 85 },
        { value: "c", label: "Focus on core concepts for everyone", score: 60 },
        { value: "d", label: "Provide extra resources for self-learning", score: 55 },
      ],
    },
  ],
  engineering: [
    {
      id: "eng1",
      question: "Your approach to engineering challenges:",
      options: [
        { value: "a", label: "Design innovative solutions from scratch", score: 100 },
        { value: "b", label: "Optimize and improve existing systems", score: 85 },
        { value: "c", label: "Focus on practical, cost-effective solutions", score: 75 },
        { value: "d", label: "Ensure quality and safety standards", score: 70 },
      ],
    },
    {
      id: "eng2",
      question: "Your preferred engineering domain:",
      options: [
        { value: "a", label: "Building and construction", score: 85 },
        { value: "b", label: "Machines and mechanical systems", score: 90 },
        { value: "c", label: "Electronics and electrical systems", score: 88 },
        { value: "d", label: "Software and systems engineering", score: 92 },
      ],
    },
  ],
  media: [
    {
      id: "media1",
      question: "Your content creation style:",
      options: [
        { value: "a", label: "Original storytelling and journalism", score: 100 },
        { value: "b", label: "Social media and digital marketing", score: 85 },
        { value: "c", label: "Video and multimedia production", score: 90 },
        { value: "d", label: "Public relations and communications", score: 75 },
      ],
    },
    {
      id: "media2",
      question: "How do you approach audience engagement?",
      options: [
        { value: "a", label: "Data-driven strategies and analytics", score: 85 },
        { value: "b", label: "Creative and viral content", score: 95 },
        { value: "c", label: "Building long-term relationships", score: 80 },
        { value: "d", label: "Community management and interaction", score: 75 },
      ],
    },
  ],
  law: [
    {
      id: "law1",
      question: "Your interest in legal/government work:",
      options: [
        { value: "a", label: "Advocating for justice and rights", score: 100 },
        { value: "b", label: "Policy development and analysis", score: 85 },
        { value: "c", label: "Corporate and business law", score: 80 },
        { value: "d", label: "Public administration and governance", score: 75 },
      ],
    },
    {
      id: "law2",
      question: "How do you approach complex regulations?",
      options: [
        { value: "a", label: "Analyze in detail and find solutions", score: 100 },
        { value: "b", label: "Simplify for practical application", score: 80 },
        { value: "c", label: "Focus on compliance and risk", score: 75 },
        { value: "d", label: "Advocate for policy changes", score: 85 },
      ],
    },
  ],
  environment: [
    {
      id: "env1",
      question: "Your approach to environmental challenges:",
      options: [
        { value: "a", label: "Scientific research and innovation", score: 100 },
        { value: "b", label: "Policy and advocacy work", score: 85 },
        { value: "c", label: "Sustainable business practices", score: 80 },
        { value: "d", label: "Conservation and fieldwork", score: 90 },
      ],
    },
    {
      id: "env2",
      question: "Your preferred focus area:",
      options: [
        { value: "a", label: "Renewable energy and clean tech", score: 95 },
        { value: "b", label: "Wildlife and ecosystem conservation", score: 90 },
        { value: "c", label: "Climate change mitigation", score: 92 },
        { value: "d", label: "Sustainable urban development", score: 85 },
      ],
    },
  ],
  sports: [
    {
      id: "sports1",
      question: "Your role in sports and fitness:",
      options: [
        { value: "a", label: "Coaching and training athletes", score: 100 },
        { value: "b", label: "Sports management and business", score: 85 },
        { value: "c", label: "Personal training and wellness", score: 90 },
        { value: "d", label: "Sports medicine and rehabilitation", score: 88 },
      ],
    },
    {
      id: "sports2",
      question: "Your approach to fitness goals:",
      options: [
        { value: "a", label: "Structured training programs", score: 90 },
        { value: "b", label: "Motivating and inspiring others", score: 95 },
        { value: "c", label: "Scientific approach to performance", score: 85 },
        { value: "d", label: "Holistic wellness and lifestyle", score: 80 },
      ],
    },
  ],
  entertainment: [
    {
      id: "ent1",
      question: "Your entertainment industry interest:",
      options: [
        { value: "a", label: "Film and video production", score: 95 },
        { value: "b", label: "Music and audio production", score: 90 },
        { value: "c", label: "Gaming and interactive media", score: 92 },
        { value: "d", label: "Events and live entertainment", score: 85 },
      ],
    },
    {
      id: "ent2",
      question: "Your creative role preference:",
      options: [
        { value: "a", label: "Director/Producer - leading projects", score: 100 },
        { value: "b", label: "Creator - making content", score: 95 },
        { value: "c", label: "Technical - behind the scenes", score: 80 },
        { value: "d", label: "Business - managing and promoting", score: 75 },
      ],
    },
  ],
  hospitality: [
    {
      id: "hosp1",
      question: "Your hospitality strength:",
      options: [
        { value: "a", label: "Guest experience and service excellence", score: 100 },
        { value: "b", label: "Operations and management", score: 85 },
        { value: "c", label: "Culinary arts and food service", score: 90 },
        { value: "d", label: "Travel planning and tourism", score: 88 },
      ],
    },
    {
      id: "hosp2",
      question: "How do you handle customer complaints?",
      options: [
        { value: "a", label: "Empathetic listening and quick resolution", score: 100 },
        { value: "b", label: "Follow protocols and escalate when needed", score: 75 },
        { value: "c", label: "Proactive prevention through quality", score: 85 },
        { value: "d", label: "Turn negatives into positive experiences", score: 95 },
      ],
    },
  ],
  psychology: [
    {
      id: "psy1",
      question: "Your psychology/counseling focus:",
      options: [
        { value: "a", label: "Clinical therapy and mental health", score: 100 },
        { value: "b", label: "Organizational and workplace psychology", score: 85 },
        { value: "c", label: "Research and academic psychology", score: 80 },
        { value: "d", label: "Coaching and personal development", score: 90 },
      ],
    },
    {
      id: "psy2",
      question: "Your approach to helping others:",
      options: [
        { value: "a", label: "Deep, long-term therapeutic relationships", score: 100 },
        { value: "b", label: "Short-term problem-solving approaches", score: 80 },
        { value: "c", label: "Group dynamics and facilitation", score: 75 },
        { value: "d", label: "Assessment and diagnosis", score: 85 },
      ],
    },
  ],
  agriculture: [
    {
      id: "agri1",
      question: "Your agricultural interest area:",
      options: [
        { value: "a", label: "Sustainable farming practices", score: 95 },
        { value: "b", label: "Agricultural technology and innovation", score: 100 },
        { value: "c", label: "Food processing and safety", score: 85 },
        { value: "d", label: "Agribusiness and supply chain", score: 80 },
      ],
    },
    {
      id: "agri2",
      question: "Your preferred work environment:",
      options: [
        { value: "a", label: "Outdoor fieldwork and farming", score: 90 },
        { value: "b", label: "Laboratory and research", score: 85 },
        { value: "c", label: "Office-based planning and management", score: 70 },
        { value: "d", label: "Mix of field and office work", score: 95 },
      ],
    },
  ],
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

export function CareerAssignments({ interests, onComplete }: CareerAssignmentsProps) {
  const [currentInterestIndex, setCurrentInterestIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, Record<string, string>>>({})
  const [scores, setScores] = useState<Record<string, number>>({})

  const currentInterest = interests[currentInterestIndex]
  const questions = interestQuestions[currentInterest] || []
  const currentQuestion = questions[currentQuestionIndex]

  const totalQuestions = interests.reduce((acc, interest) => {
    return acc + (interestQuestions[interest]?.length || 0)
  }, 0)

  const answeredQuestions = Object.values(answers).reduce((acc, interestAnswers) => {
    return acc + Object.keys(interestAnswers).length
  }, 0)

  const progress = (answeredQuestions / totalQuestions) * 100

  const handleAnswer = (questionId: string, optionValue: string, score: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentInterest]: {
        ...prev[currentInterest],
        [questionId]: optionValue,
      },
    }))

    // Update score for current interest
    const currentInterestAnswers = {
      ...answers[currentInterest],
      [questionId]: optionValue,
    }
    const questionsForInterest = interestQuestions[currentInterest] || []
    let totalScore = 0
    let answeredCount = 0

    questionsForInterest.forEach(q => {
      const answerValue = currentInterestAnswers[q.id]
      if (answerValue) {
        const option = q.options.find(o => o.value === answerValue)
        if (option) {
          totalScore += option.score
          answeredCount++
        }
      }
    })

    // Add current answer score
    totalScore += score - (currentInterestAnswers[questionId] ? 
      (questionsForInterest.find(q => q.id === questionId)?.options.find(o => o.value === currentInterestAnswers[questionId])?.score || 0) : 0)
    
    if (!currentInterestAnswers[questionId]) answeredCount++

    const avgScore = answeredCount > 0 ? Math.round(totalScore / answeredCount) : 0

    setScores(prev => ({
      ...prev,
      [currentInterest]: avgScore,
    }))

    // Move to next question or interest
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
      } else if (currentInterestIndex < interests.length - 1) {
        setCurrentInterestIndex(prev => prev + 1)
        setCurrentQuestionIndex(0)
      } else {
        // Calculate final scores
        const finalScores: Record<string, number> = {}
        interests.forEach(interest => {
          const interestAnswers = {
            ...answers[interest],
            ...(interest === currentInterest ? { [questionId]: optionValue } : {}),
          }
          const questionsForInt = interestQuestions[interest] || []
          let total = 0
          let count = 0
          questionsForInt.forEach(q => {
            const answerVal = interestAnswers[q.id]
            if (answerVal) {
              const opt = q.options.find(o => o.value === answerVal)
              if (opt) {
                total += opt.score
                count++
              }
            }
          })
          finalScores[interest] = count > 0 ? Math.round(total / count) : 0
        })
        onComplete(finalScores)
      }
    }, 300)
  }

  const selectedAnswer = answers[currentInterest]?.[currentQuestion?.id]

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
          <ClipboardList className="w-4 h-4 text-accent" />
          <span className="text-sm text-accent font-medium">Career Assessment</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Complete Your Assessments
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Answer questions about your selected interests to get personalized career recommendations
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm text-muted-foreground">Basic Info</span>
        </div>
        <div className="w-12 h-0.5 bg-primary"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center text-sm font-medium">
            <Check className="w-4 h-4" />
          </div>
          <span className="text-sm text-muted-foreground">Interests</span>
        </div>
        <div className="w-12 h-0.5 bg-accent"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium">3</div>
          <span className="text-sm font-medium text-foreground">Assessment</span>
        </div>
        <div className="w-12 h-0.5 bg-muted"></div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">4</div>
          <span className="text-sm text-muted-foreground">Results</span>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Overall Progress</span>
            <span className="text-sm font-medium text-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-muted-foreground">{answeredQuestions} of {totalQuestions} questions</span>
            <span className="text-xs text-muted-foreground">
              Interest {currentInterestIndex + 1} of {interests.length}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Current Interest Badge */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <Lightbulb className="w-5 h-5 text-primary" />
        <span className="text-lg font-semibold text-foreground">
          {interestNames[currentInterest] || currentInterest}
        </span>
        <span className="text-sm text-muted-foreground">
          (Question {currentQuestionIndex + 1} of {questions.length})
        </span>
      </div>

      {/* Question Card */}
      {currentQuestion && (
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              {currentQuestion.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value, option.score)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    selectedAnswer === option.value
                      ? "bg-primary/10 border-primary"
                      : "bg-muted/50 border-transparent hover:border-primary/30"
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    selectedAnswer === option.value
                      ? "border-primary bg-primary"
                      : "border-muted-foreground"
                  }`}>
                    {selectedAnswer === option.value && (
                      <Check className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <span className="text-foreground">{option.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed Interests */}
      {currentInterestIndex > 0 && (
        <Card className="bg-muted/30 border-border">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Completed Assessments</h4>
            <div className="flex flex-wrap gap-2">
              {interests.slice(0, currentInterestIndex).map((interest) => (
                <div
                  key={interest}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-sm"
                >
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-foreground">{interestNames[interest]}</span>
                  <span className="text-primary font-medium">{scores[interest] || 0}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
