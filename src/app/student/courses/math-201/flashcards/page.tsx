"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Shuffle,
  BookOpen,
  Check,
  X,
  Filter
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function MathFlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [studiedCards, setStudiedCards] = useState<number[]>([]);
  const [correctCards, setCorrectCards] = useState<number[]>([]);

  const allFlashcards = [
    {
      id: 1,
      front: "What is the derivative of sin(x)?",
      back: "cos(x)",
      difficulty: "Easy",
      topic: "Derivatives"
    },
    {
      id: 2,
      front: "State the Fundamental Theorem of Calculus",
      back: "If f is continuous on [a,b] and F is an antiderivative of f, then ∫[a to b] f(x)dx = F(b) - F(a)",
      difficulty: "Medium",
      topic: "Integration"
    },
    {
      id: 3,
      front: "What is the Matrix Multiplication rule for A(m×n) × B(p×q)?",
      back: "Matrix multiplication is only possible when n = p. The result is an m×q matrix where each element (i,j) = Σ(A[i,k] × B[k,j])",
      difficulty: "Hard",
      topic: "Linear Algebra"
    },
    {
      id: 4,
      front: "Define a limit",
      back: "lim(x→a) f(x) = L means that f(x) can be made arbitrarily close to L by making x sufficiently close to a",
      difficulty: "Medium",
      topic: "Limits"
    },
    {
      id: 5,
      front: "What is the chain rule?",
      back: "If y = f(g(x)), then dy/dx = f'(g(x)) × g'(x) or (f ∘ g)'(x) = f'(g(x)) × g'(x)",
      difficulty: "Easy",
      topic: "Derivatives"
    },
    {
      id: 6,
      front: "How do you find the determinant of a 3×3 matrix?",
      back: "For matrix [[a,b,c],[d,e,f],[g,h,i]]: det = a(ei-fh) - b(di-fg) + c(dh-eg)",
      difficulty: "Hard",
      topic: "Linear Algebra"
    },
    {
      id: 7,
      front: "What is integration by parts?",
      back: "∫u dv = uv - ∫v du, where u and dv are chosen parts of the integrand",
      difficulty: "Medium",
      topic: "Integration"
    },
    {
      id: 8,
      front: "Define continuity at a point",
      back: "f(x) is continuous at x = a if: 1) f(a) exists, 2) lim(x→a) f(x) exists, and 3) lim(x→a) f(x) = f(a)",
      difficulty: "Medium",
      topic: "Limits"
    }
  ];

  const filteredCards = selectedDifficulty === "all" 
    ? allFlashcards 
    : allFlashcards.filter(card => card.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());

  const currentFlashcard = filteredCards[currentCard];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setCurrentCard((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    const newIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentCard(newIndex);
    setIsFlipped(false);
  };

  const markAsStudied = () => {
    if (!studiedCards.includes(currentFlashcard.id)) {
      setStudiedCards([...studiedCards, currentFlashcard.id]);
    }
    handleNext();
  };

  const markAsCorrect = () => {
    if (!correctCards.includes(currentFlashcard.id)) {
      setCorrectCards([...correctCards, currentFlashcard.id]);
    }
    markAsStudied();
  };

  const markAsIncorrect = () => {
    // Remove from correct if it was there
    setCorrectCards(correctCards.filter(id => id !== currentFlashcard.id));
    markAsStudied();
  };

  const resetProgress = () => {
    setStudiedCards([]);
    setCorrectCards([]);
    setCurrentCard(0);
    setIsFlipped(false);
  };

  const getProgressPercentage = () => {
    return filteredCards.length > 0 ? (studiedCards.length / allFlashcards.length) * 100 : 0;
  };

  const getAccuracyPercentage = () => {
    return studiedCards.length > 0 ? (correctCards.length / studiedCards.length) * 100 : 0;
  };

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
                  <span className="text-foreground font-medium">Flashcards</span>
                </div>
              </div>

              {/* Progress */}
              <div className="bg-transparent px-2 mx-64">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Study Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {studiedCards.length} of {allFlashcards.length} cards studied
                  </span>
                </div>
                <Progress value={getProgressPercentage()} className="h-2" />
              </div>

              {/* Study Summary - Top Section */}
              {studiedCards.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-64">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-green-600">{correctCards.length}</p>
                      <p className="text-sm text-muted-foreground">Correct</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-red-600">{studiedCards.length - correctCards.length}</p>
                      <p className="text-sm text-muted-foreground">Incorrect</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-blue-600">{getAccuracyPercentage().toFixed(0)}%</p>
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Main Content Layout */}
              <div className="max-w-2xl mx-auto w-full">
                <Card className="min-h-[400px]">
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{currentFlashcard?.topic}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {currentCard + 1} of {filteredCards.length}
                      </span>
                      <Badge 
                        variant={currentFlashcard?.difficulty === 'Easy' ? 'secondary' : 
                                currentFlashcard?.difficulty === 'Medium' ? 'default' : 'destructive'}
                      >
                        {currentFlashcard?.difficulty}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
                    <div 
                      className="w-full text-center cursor-pointer transition-all duration-300 hover:scale-105"
                      onClick={handleFlip}
                    >
                      <div className="min-h-[200px] flex items-center justify-center">
                        {isFlipped ? (
                          <div className="space-y-4">
                            <BookOpen className="h-8 w-8 text-blue-500 mx-auto" />
                            <p className="text-lg leading-relaxed">{currentFlashcard?.back}</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="text-6xl">🧠</div>
                            <p className="text-xl font-medium">{currentFlashcard?.front}</p>
                            <p className="text-sm text-muted-foreground">Click to reveal answer</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {isFlipped && (
                      <div className="flex gap-3 mt-6">
                        <Button variant="outline" onClick={markAsIncorrect} className="flex items-center gap-2">
                          <X className="h-4 w-4" />
                          Incorrect
                        </Button>
                        <Button onClick={markAsCorrect} className="flex items-center gap-2">
                          <Check className="h-4 w-4" />
                          Correct
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                  <Button variant="outline" onClick={handlePrevious}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleShuffle}>
                      <Shuffle className="h-4 w-4 mr-2" />
                      Shuffle
                    </Button>
                    <Button variant="outline" onClick={resetProgress}>
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>

                  <Button variant="outline" onClick={handleNext}>
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                {/* Completion Badge */}
                {studiedCards.length === allFlashcards.length && (
                  <div className="text-center mt-4">
                    <Badge className="text-sm py-2 px-4">
                      🎉 All cards studied!
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 