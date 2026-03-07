"use client"

import { useState } from "react"
import { Check, X, ArrowRight, Lightbulb, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface QuizResult {
  score: number
  totalQuestions: number
  correctAnswers: number
  level: "beginner" | "intermediate" | "advanced"
  language: string
}

interface CodeQuizProps {
  language: string
  onComplete: (result: QuizResult) => void
}

const quizQuestions: Record<string, { question: string; options: string[]; correct: number; hint: string }[]> = {
  python: [
    {
      question: "What will print(2 ** 3) output?",
      options: ["6", "8", "5", "23"],
      correct: 1,
      hint: "** is the power operator in Python"
    },
    {
      question: "Which is the correct way to create a list in Python?",
      options: ["list = (1, 2, 3)", "list = [1, 2, 3]", "list = {1, 2, 3}", "list = <1, 2, 3>"],
      correct: 1,
      hint: "Lists use square brackets"
    },
    {
      question: "What does len('Hello') return?",
      options: ["4", "5", "6", "Hello"],
      correct: 1,
      hint: "len() returns the length of a string"
    },
    {
      question: "How do you start a comment in Python?",
      options: ["//", "/*", "#", "--"],
      correct: 2,
      hint: "Python uses a special character for comments"
    },
    {
      question: "What is the output of 10 // 3?",
      options: ["3.33", "3", "4", "10/3"],
      correct: 1,
      hint: "// is floor division"
    },
  ],
  javascript: [
    {
      question: "What will console.log(typeof []) output?",
      options: ["array", "object", "list", "undefined"],
      correct: 1,
      hint: "Arrays are a type of object in JavaScript"
    },
    {
      question: "Which keyword declares a constant variable?",
      options: ["var", "let", "const", "static"],
      correct: 2,
      hint: "Think about which one sounds like 'constant'"
    },
    {
      question: "What does '===' check for?",
      options: ["Only value", "Only type", "Value and type", "Assignment"],
      correct: 2,
      hint: "It's stricter than =="
    },
    {
      question: "How do you create an arrow function?",
      options: ["function => {}", "() => {}", "=> function()", "arrow() {}"],
      correct: 1,
      hint: "The arrow comes after the parameters"
    },
    {
      question: "What is null == undefined?",
      options: ["true", "false", "null", "undefined"],
      correct: 0,
      hint: "With loose equality, they are considered equal"
    },
  ],
  java: [
    {
      question: "Which is the correct way to declare a main method?",
      options: ["public void main()", "public static void main(String[] args)", "void main()", "static main()"],
      correct: 1,
      hint: "The main method needs specific modifiers and parameters"
    },
    {
      question: "What is the default value of an int variable?",
      options: ["null", "0", "undefined", "-1"],
      correct: 1,
      hint: "Primitive types have default numeric values"
    },
    {
      question: "Which keyword is used for inheritance?",
      options: ["inherits", "implements", "extends", "super"],
      correct: 2,
      hint: "A class _____ another class"
    },
    {
      question: "What does 'final' keyword mean for a variable?",
      options: ["Last variable", "Cannot be changed", "Public variable", "Static variable"],
      correct: 1,
      hint: "Final means the end - no more changes"
    },
    {
      question: "Which is NOT a primitive type in Java?",
      options: ["int", "boolean", "String", "char"],
      correct: 2,
      hint: "One of these is actually a class"
    },
  ],
  c: [
    {
      question: "What is the correct file extension for C source files?",
      options: [".c", ".cpp", ".h", ".cs"],
      correct: 0,
      hint: "C uses a simple single letter extension"
    },
    {
      question: "Which header file is required for printf()?",
      options: ["<stdlib.h>", "<stdio.h>", "<string.h>", "<conio.h>"],
      correct: 1,
      hint: "stdio stands for standard input/output"
    },
    {
      question: "What does the '&' operator do in C?",
      options: ["Logical AND", "Returns address of variable", "Bitwise OR", "Pointer declaration"],
      correct: 1,
      hint: "It's used with scanf() to pass variable addresses"
    },
    {
      question: "Which is the correct way to declare a pointer in C?",
      options: ["int ptr;", "int *ptr;", "pointer int ptr;", "int &ptr;"],
      correct: 1,
      hint: "The asterisk (*) is used for pointer declaration"
    },
    {
      question: "What is the size of 'int' in C (typically on 32-bit systems)?",
      options: ["2 bytes", "4 bytes", "8 bytes", "Depends on compiler"],
      correct: 1,
      hint: "It's usually 4 bytes on most modern systems"
    },
  ],
  cpp: [
    {
      question: "What is the correct file extension for C++ files?",
      options: [".c", ".cpp", ".cc", "Both B and C"],
      correct: 3,
      hint: "C++ allows multiple extensions"
    },
    {
      question: "Which operator is used for dereferencing a pointer?",
      options: ["&", "*", "->", "::"],
      correct: 1,
      hint: "The opposite of getting address"
    },
    {
      question: "What does 'cout' stand for?",
      options: ["Character out", "Console output", "Count output", "C output"],
      correct: 1,
      hint: "It outputs to the console"
    },
    {
      question: "Which header is needed for cout?",
      options: ["<stdio.h>", "<iostream>", "<string>", "<output>"],
      correct: 1,
      hint: "It's related to input/output streams"
    },
    {
      question: "What is a destructor prefix?",
      options: ["~", "!", "@", "#"],
      correct: 0,
      hint: "It's the tilde character"
    },
  ],
  csharp: [
    {
      question: "What is the C# equivalent of Java's 'extends'?",
      options: ["extends", "inherits", ":", "->"],
      correct: 2,
      hint: "C# uses a simple punctuation mark"
    },
    {
      question: "Which keyword is used for null-conditional access?",
      options: ["?.", "??", "!", "::"],
      correct: 0,
      hint: "It includes a question mark"
    },
    {
      question: "What is a struct in C#?",
      options: ["Reference type", "Value type", "Interface", "Abstract class"],
      correct: 1,
      hint: "Unlike classes, structs are stack-allocated"
    },
    {
      question: "Which namespace contains Console?",
      options: ["System", "Console", "IO", "Core"],
      correct: 0,
      hint: "The most fundamental namespace"
    },
    {
      question: "What does 'var' do in C#?",
      options: ["Creates variant type", "Implicit type inference", "Dynamic typing", "Weak typing"],
      correct: 1,
      hint: "The compiler figures out the type"
    },
  ],
  go: [
    {
      question: "How do you declare a short variable in Go?",
      options: ["var x = 5", "x := 5", "let x = 5", "x = 5"],
      correct: 1,
      hint: "Go uses a special operator with colon"
    },
    {
      question: "What is a goroutine?",
      options: ["A type of loop", "A lightweight thread", "A function", "An interface"],
      correct: 1,
      hint: "It's for concurrent execution"
    },
    {
      question: "Which keyword is used for error handling?",
      options: ["try/catch", "defer/recover", "throw/catch", "error/handle"],
      correct: 1,
      hint: "Go uses defer with recover"
    },
    {
      question: "What is a slice in Go?",
      options: ["Fixed-size array", "Dynamic array", "String", "Map"],
      correct: 1,
      hint: "It can grow and shrink"
    },
    {
      question: "How do you export a function in Go?",
      options: ["export keyword", "public keyword", "Capitalize first letter", "Use * prefix"],
      correct: 2,
      hint: "Go uses naming conventions"
    },
  ],
}

export function CodeQuiz({ language, onComplete }: CodeQuizProps) {
  const questions = quizQuestions[language] || quizQuestions.python
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    if (index === questions[currentQ].correct) {
      setCorrect(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1)
      setSelected(null)
      setAnswered(false)
      setShowHint(false)
    } else {
      const score = Math.round((correct / questions.length) * 100)
      const level = score < 40 ? "beginner" : score < 70 ? "intermediate" : "advanced"
      onComplete({
        score,
        totalQuestions: questions.length,
        correctAnswers: correct,
        level,
        language
      })
    }
  }

  const question = questions[currentQ]
  const progress = ((currentQ + 1) / questions.length) * 100

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Question {currentQ + 1} of {questions.length}</span>
          <span className="text-sm text-secondary font-medium">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-secondary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Code2 className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground leading-relaxed">{question.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selected === index
              const isCorrect = index === question.correct
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
                    isSelected ? "bg-secondary/20 border-secondary" :
                    "bg-muted border-transparent hover:border-secondary/30"
                  }`}
                >
                  <span className="text-foreground">{option}</span>
                  {showCorrect && <Check className="w-5 h-5 text-primary" />}
                  {showWrong && <X className="w-5 h-5 text-destructive" />}
                </button>
              )
            })}
          </div>

          {/* Hint */}
          {!answered && (
            <button
              onClick={() => setShowHint(true)}
              className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors"
            >
              <Lightbulb className="w-4 h-4" />
              Need a hint?
            </button>
          )}
          {showHint && !answered && (
            <div className="mt-3 p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
              <p className="text-sm text-secondary">{question.hint}</p>
            </div>
          )}

          {/* Explanation after answer */}
          {answered && (
            <div className={`mt-4 p-3 rounded-lg ${
              selected === question.correct ? "bg-primary/10 border border-primary/20" : "bg-destructive/10 border border-destructive/20"
            }`}>
              <p className="text-sm text-foreground">
                {selected === question.correct ? "Correct! " : "Not quite. "}
                {question.hint}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!answered}
          className="gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Score indicator */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: questions.length }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < currentQ ? "bg-primary" :
              i === currentQ ? "bg-secondary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
