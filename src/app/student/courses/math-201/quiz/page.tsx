"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function MathQuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the derivative of x²?",
      options: ["2x", "x", "x²", "2"],
      correct: "2x",
      explanation: "Using the power rule: d/dx(xⁿ) = n·xⁿ⁻¹, so d/dx(x²) = 2x¹ = 2x"
    },
    {
      id: 2,
      question: "Which of the following is the integral of 2x?",
      options: ["x²", "x² + C", "2x²", "2x² + C"],
      correct: "x² + C",
      explanation: "∫2x dx = 2∫x dx = 2(x²/2) + C = x² + C. Don't forget the constant of integration!"
    },
    {
      id: 3,
      question: "What is the limit of (sin x)/x as x approaches 0?",
      options: ["0", "1", "∞", "undefined"],
      correct: "1",
      explanation: "This is a fundamental limit in calculus: lim(x→0) sin(x)/x = 1"
    },
    {
      id: 4,
      question: "If A = [1 2; 3 4], what is det(A)?",
      options: ["-2", "2", "10", "-10"],
      correct: "-2",
      explanation: "For a 2×2 matrix [a b; c d], det = ad - bc = (1)(4) - (2)(3) = 4 - 6 = -2"
    },
    {
      id: 5,
      question: "What is the general solution to dy/dx = 3y?",
      options: ["y = 3x + C", "y = Ce³ˣ", "y = 3eˣ", "y = e³ˣ + C"],
      correct: "y = Ce³ˣ",
      explanation: "This is a separable differential equation: dy/y = 3dx → ln|y| = 3x + C → y = Ce³ˣ"
    }
  ];

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value);
  };

  const handleSubmitAnswer = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    return answers.filter((answer, index) => answer === questions[index].correct).length;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setAnswers([]);
    setShowResult(false);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <SidebarProvider
        style={{
          "--sidebar-width": "16rem",
          "--header-height": "4rem",
        } as React.CSSProperties}
      >
        <StudentSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                {/* Results */}
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <Trophy className="h-12 w-12 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
                    <p className="text-muted-foreground">Advanced Mathematics Quiz</p>
                  </div>

                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        <div>
                          <p className="text-4xl font-bold text-blue-600">{score}/{questions.length}</p>
                          <p className="text-muted-foreground">Correct Answers</p>
                        </div>
                        <div>
                          <p className="text-2xl font-semibold">{percentage}%</p>
                          <p className="text-muted-foreground">Final Score</p>
                        </div>
                        <Badge 
                          variant={percentage >= 80 ? "default" : percentage >= 60 ? "secondary" : "destructive"}
                          className="text-lg py-1 px-3"
                        >
                          {percentage >= 80 ? "Excellent!" : percentage >= 60 ? "Good Work" : "Needs Improvement"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Review Answers */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Your Answers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {questions.map((question, index) => (
                        <div key={question.id} className="p-4 border rounded-lg">
                          <div className="flex items-start gap-3">
                            {answers[index] === question.correct ? (
                              <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600 mt-1" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium mb-2">{question.question}</p>
                              <p className="text-sm text-muted-foreground mb-1">
                                Your answer: <span className={answers[index] === question.correct ? "text-green-600" : "text-red-600"}>{answers[index] || "Not answered"}</span>
                              </p>
                              <p className="text-sm text-muted-foreground mb-2">
                                Correct answer: <span className="text-green-600">{question.correct}</span>
                              </p>
                              <p className="text-sm text-blue-600">{question.explanation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <div className="flex gap-4 justify-center">
                    <Button onClick={restartQuiz} variant="outline">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Try Again
                    </Button>
                    <Link href="/student/courses/math-201">
                      <Button>Back to Course</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem",
        "--header-height": "4rem",
      } as React.CSSProperties}
    >
      <StudentSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8 px-6 lg:px-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Link href="/student/courses/math-201" className="flex items-center hover:text-foreground">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Advanced Mathematics
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground font-medium">Multiple Choice Quiz</span>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-transparent px-2 mb-8 mx-64">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {currentQuestion + 1} of {questions.length}
                  </span>
                </div>
                <div className="mx">
                  <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
                </div>
              </div>

              {/* Question */}
              <div className="max-w-2xl mx-auto w-full">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Question {currentQuestion + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-lg">{questions[currentQuestion].question}</p>

                    {showResult ? (
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg border-2 border-green-200 bg-green-50">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="font-semibold text-green-800">
                              {selectedAnswer === questions[currentQuestion].correct ? "Correct!" : "Incorrect"}
                            </span>
                          </div>
                          <p className="text-green-700 mb-2">
                            Correct answer: {questions[currentQuestion].correct}
                          </p>
                          <p className="text-sm text-green-600">
                            {questions[currentQuestion].explanation}
                          </p>
                        </div>
                        <Button 
                          onClick={handleNextQuestion} 
                          className="w-full"
                        >
                          {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    ) : (
                      <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                        <div className="space-y-3">
                          {questions[currentQuestion].options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <RadioGroupItem value={option} id={`option-${index}`} />
                              <Label 
                                htmlFor={`option-${index}`} 
                                className="text-base cursor-pointer flex-1 p-3 rounded-lg border hover:bg-muted/50"
                              >
                                {option}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    )}

                    {!showResult && (
                      <Button 
                        onClick={handleSubmitAnswer} 
                        disabled={!selectedAnswer}
                        className="w-full"
                      >
                        Submit Answer
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 