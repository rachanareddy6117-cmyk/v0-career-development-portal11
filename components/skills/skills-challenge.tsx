"use client"

import { useState, useEffect, useCallback } from "react"
import { Clock, CheckCircle, XCircle, ArrowRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SkillResult {
  score: number
  timeUsed: number
  totalTime: number
  problemsSolved: number
  totalProblems: number
  category: string
}

interface SkillsChallengeProps {
  category: string
  onComplete: (result: SkillResult) => void
}

const problems: Record<string, { question: string; options: string[]; correct: number; points: number }[]> = {
  algorithms: [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"],
      correct: 1,
      points: 20
    },
    {
      question: "Which sorting algorithm has the best average case time complexity?",
      options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
      correct: 1,
      points: 20
    },
    {
      question: "What data structure does BFS use?",
      options: ["Stack", "Queue", "Array", "Linked List"],
      correct: 1,
      points: 20
    },
    {
      question: "Which algorithm finds the shortest path in a weighted graph?",
      options: ["DFS", "BFS", "Dijkstra", "Prim's"],
      correct: 2,
      points: 20
    },
    {
      question: "What is the space complexity of merge sort?",
      options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
      correct: 2,
      points: 20
    },
  ],
  datastructures: [
    {
      question: "Which data structure uses LIFO principle?",
      options: ["Queue", "Stack", "Array", "Tree"],
      correct: 1,
      points: 20
    },
    {
      question: "What is the time complexity of inserting at the beginning of a linked list?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
      correct: 0,
      points: 20
    },
    {
      question: "Which tree traversal gives nodes in sorted order for BST?",
      options: ["Preorder", "Inorder", "Postorder", "Level order"],
      correct: 1,
      points: 20
    },
    {
      question: "What is the maximum number of nodes at level k in a binary tree?",
      options: ["k", "2k", "2^k", "k^2"],
      correct: 2,
      points: 20
    },
    {
      question: "Which data structure is best for implementing LRU cache?",
      options: ["Array", "Stack", "HashMap + Doubly Linked List", "Queue"],
      correct: 2,
      points: 20
    },
  ],
  logic: [
    {
      question: "If all Bloops are Razzies, and all Razzies are Lazzies, then all Bloops are definitely Lazzies?",
      options: ["True", "False", "Cannot determine", "Sometimes"],
      correct: 0,
      points: 20
    },
    {
      question: "What comes next: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "46"],
      correct: 1,
      points: 20
    },
    {
      question: "If APPLE = 50 and BANANA = 42, what is CHERRY?",
      options: ["48", "54", "56", "63"],
      correct: 3,
      points: 20
    },
    {
      question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
      options: ["0 degrees", "7.5 degrees", "15 degrees", "22.5 degrees"],
      correct: 1,
      points: 20
    },
    {
      question: "If 5 machines take 5 minutes to make 5 widgets, how long for 100 machines to make 100 widgets?",
      options: ["5 minutes", "20 minutes", "100 minutes", "500 minutes"],
      correct: 0,
      points: 20
    },
  ],
  math: [
    {
      question: "What is the probability of getting exactly 2 heads in 3 coin tosses?",
      options: ["1/4", "3/8", "1/2", "3/4"],
      correct: 1,
      points: 20
    },
    {
      question: "What is GCD of 48 and 18?",
      options: ["2", "3", "6", "9"],
      correct: 2,
      points: 20
    },
    {
      question: "How many prime numbers are between 1 and 20?",
      options: ["6", "7", "8", "9"],
      correct: 2,
      points: 20
    },
    {
      question: "If a^2 + b^2 = 25 and ab = 12, what is (a+b)^2?",
      options: ["37", "49", "61", "73"],
      correct: 1,
      points: 20
    },
    {
      question: "What is the sum of first 10 natural numbers?",
      options: ["45", "50", "55", "60"],
      correct: 2,
      points: 20
    },
  ],
}

export function SkillsChallenge({ category, onComplete }: SkillsChallengeProps) {
  const challengeProblems = problems[category] || problems.algorithms
  const totalTime = 30 * 60 // 30 minutes in seconds

  const [currentProblem, setCurrentProblem] = useState(0)
  const [timeLeft, setTimeLeft] = useState(totalTime)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [solved, setSolved] = useState(0)

  const finishChallenge = useCallback(() => {
    onComplete({
      score,
      timeUsed: totalTime - timeLeft,
      totalTime,
      problemsSolved: solved,
      totalProblems: challengeProblems.length,
      category
    })
  }, [score, timeLeft, totalTime, solved, challengeProblems.length, category, onComplete])

  useEffect(() => {
    if (timeLeft <= 0) {
      finishChallenge()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, finishChallenge])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    if (index === challengeProblems[currentProblem].correct) {
      setScore(prev => prev + challengeProblems[currentProblem].points)
      setSolved(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentProblem < challengeProblems.length - 1) {
      setCurrentProblem(prev => prev + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      finishChallenge()
    }
  }

  const problem = challengeProblems[currentProblem]
  const timeWarning = timeLeft < 300 // Less than 5 minutes

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-foreground capitalize">{category} Challenge</h1>
          <p className="text-sm text-muted-foreground">Problem {currentProblem + 1} of {challengeProblems.length}</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
          timeWarning ? "bg-destructive/20 text-destructive" : "bg-accent/20 text-accent"
        }`}>
          {timeWarning && <AlertTriangle className="w-4 h-4" />}
          <Clock className="w-4 h-4" />
          <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent transition-all"
            style={{ width: `${((currentProblem + 1) / challengeProblems.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>Score: {score} points</span>
          <span>Solved: {solved}/{challengeProblems.length}</span>
        </div>
      </div>

      {/* Problem Card */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="p-8">
          <div className="mb-6">
            <span className="text-sm text-accent font-medium">{problem.points} points</span>
            <h2 className="text-xl font-semibold text-foreground mt-2">{problem.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {problem.options.map((option, index) => {
              const isSelected = selected === index
              const isCorrect = index === problem.correct
              const showCorrect = answered && isCorrect
              const showWrong = answered && isSelected && !isCorrect

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  disabled={answered}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                    showCorrect ? "bg-primary/20 border-primary" :
                    showWrong ? "bg-destructive/20 border-destructive" :
                    isSelected ? "bg-accent/20 border-accent" :
                    "bg-muted border-transparent hover:border-accent/30"
                  }`}
                >
                  <span className="text-foreground">{option}</span>
                  {showCorrect && <CheckCircle className="w-5 h-5 text-primary" />}
                  {showWrong && <XCircle className="w-5 h-5 text-destructive" />}
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {answered && (
            selected === problem.correct 
              ? <span className="text-primary">Correct! +{problem.points} points</span>
              : <span className="text-destructive">Incorrect. The answer was: {problem.options[problem.correct]}</span>
          )}
        </div>
        <Button
          onClick={handleNext}
          disabled={!answered}
          className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
        >
          {currentProblem < challengeProblems.length - 1 ? "Next Problem" : "Finish Challenge"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
