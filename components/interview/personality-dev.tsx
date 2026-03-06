"use client"

import { useState } from "react"
import { ArrowLeft, Video, Mic, Upload, CheckCircle, AlertCircle, Play, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface PersonalityDevProps {
  onBack: () => void
}

export function PersonalityDev({ onBack }: PersonalityDevProps) {
  const [uploadType, setUploadType] = useState<"video" | "audio" | null>(null)
  const [isUploaded, setIsUploaded] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleUpload = () => {
    setIsUploaded(true)
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
    }, 3000)
  }

  const analysisResults = {
    overall: 75,
    categories: [
      { name: "Confidence", score: 80, feedback: "Good overall confidence. Try to maintain more eye contact." },
      { name: "Clarity", score: 85, feedback: "Excellent articulation. Your speech is clear and easy to follow." },
      { name: "Pace", score: 70, feedback: "Slightly fast at times. Try to slow down during key points." },
      { name: "Body Language", score: 65, feedback: "Good posture. Consider using more hand gestures for emphasis." },
      { name: "Engagement", score: 78, feedback: "Good energy. Varying your tone can improve engagement further." },
    ],
    improvements: [
      "Practice pausing between key points",
      "Use more varied facial expressions",
      "Maintain consistent eye contact",
      "Project your voice more in larger rooms"
    ]
  }

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analysis Results</h1>
            <p className="text-sm text-muted-foreground">Your personality development feedback</p>
          </div>
        </div>

        {/* Overall Score */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-8 text-center">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${analysisResults.overall * 3.52} 352`} className="text-accent" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-foreground">{analysisResults.overall}%</span>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Good Progress!</h3>
            <p className="text-muted-foreground">You&apos;re on the right track. Keep practicing!</p>
          </CardContent>
        </Card>

        {/* Category Scores */}
        <Card className="bg-card border-border mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Detailed Analysis</h3>
            <div className="space-y-4">
              {analysisResults.categories.map((cat, index) => (
                <div key={index} className="p-4 bg-muted rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">{cat.name}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      cat.score >= 80 ? "bg-primary/20 text-primary" :
                      cat.score >= 60 ? "bg-secondary/20 text-secondary" :
                      "bg-destructive/20 text-destructive"
                    }`}>
                      {cat.score}%
                    </span>
                  </div>
                  <div className="h-2 bg-background rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full transition-all ${
                        cat.score >= 80 ? "bg-primary" :
                        cat.score >= 60 ? "bg-secondary" : "bg-destructive"
                      }`}
                      style={{ width: `${cat.score}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{cat.feedback}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Improvements */}
        <Card className="bg-accent/10 border-accent/30 mb-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-accent" />
              Areas to Focus On
            </h3>
            <ul className="space-y-2">
              {analysisResults.improvements.map((item, index) => (
                <li key={index} className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground">
                    {index + 1}
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button onClick={onBack} variant="outline">Back to Interview Hub</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Personality Development</h1>
          <p className="text-sm text-muted-foreground">Upload a video or audio clip for analysis</p>
        </div>
      </div>

      {/* Upload Type Selection */}
      {!uploadType && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card 
            className="bg-card border-border hover:border-accent/50 transition-all cursor-pointer"
            onClick={() => setUploadType("video")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Video Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Upload a video clip to analyze your body language, posture, and overall presence
              </p>
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                <li>Body language analysis</li>
                <li>Eye contact tracking</li>
                <li>Gesture assessment</li>
              </ul>
            </CardContent>
          </Card>

          <Card 
            className="bg-card border-border hover:border-accent/50 transition-all cursor-pointer"
            onClick={() => setUploadType("audio")}
          >
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Audio Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Upload an audio clip to analyze your speaking tone, pace, and clarity
              </p>
              <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                <li>Tone assessment</li>
                <li>Speaking pace</li>
                <li>Clarity analysis</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Upload Section */}
      {uploadType && !isUploaded && (
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-2xl ${
                uploadType === "video" ? "bg-accent/20" : "bg-secondary/20"
              } flex items-center justify-center mx-auto mb-4`}>
                {uploadType === "video" ? (
                  <Video className="w-8 h-8 text-accent" />
                ) : (
                  <Mic className="w-8 h-8 text-secondary" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Upload Your {uploadType === "video" ? "Video" : "Audio"} Clip
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Record yourself speaking for 1-2 minutes about any topic
              </p>

              <div className="border-2 border-dashed border-border rounded-xl p-8 mb-6 hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-foreground font-medium mb-1">Drag and drop your file here</p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {uploadType === "video" ? "MP4, MOV, WebM (max 100MB)" : "MP3, WAV, M4A (max 50MB)"}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" onClick={() => setUploadType(null)}>
                  Back
                </Button>
                <Button onClick={handleUpload} className="gap-2 bg-primary text-primary-foreground">
                  <Upload className="w-4 h-4" /> Upload & Analyze
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analyzing */}
      {isAnalyzing && (
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6 animate-pulse">
              {uploadType === "video" ? (
                <Play className="w-10 h-10 text-accent" />
              ) : (
                <Volume2 className="w-10 h-10 text-accent" />
              )}
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Analyzing Your {uploadType === "video" ? "Video" : "Audio"}...</h3>
            <p className="text-muted-foreground mb-6">Our AI is examining your communication style</p>
            <div className="flex justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i}
                  className="w-3 h-3 rounded-full bg-accent animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      {!uploadType && (
        <Card className="bg-accent/10 border-accent/20 mt-8">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-accent" />
              Tips for Best Results
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Record in a well-lit, quiet environment
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Speak naturally as if in an interview
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Include both sitting and standing if possible
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Make sure your face is clearly visible
              </li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
