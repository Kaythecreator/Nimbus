"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  Settings,
  Target,
  BookOpen,
  Infinity,
  Play,
  HelpCircle,
  FileText,
  Check
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function QuizSetupPage() {
  const [quizType, setQuizType] = useState("multiple-choice");
  const [selectedDifficulty, setSelectedDifficulty] = useState("mixed");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["all"]);
  const [questionCount, setQuestionCount] = useState("10");
  const [isTopicsDropdownOpen, setIsTopicsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTopicsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const quizTypes = [
    {
      id: "multiple-choice",
      name: "Multiple Choice",
      description: "Test your knowledge with quiz questions",
      icon: HelpCircle
    },
    {
      id: "frq",
      name: "Free Response",
      description: "Practice with essay-style questions",
      icon: FileText
    }
  ];

  const topics = [
    { id: "all", name: "All Topics", description: "Questions from all available topics" },
    { id: "derivatives", name: "Derivatives", description: "Differentiation rules and applications" },
    { id: "integration", name: "Integration", description: "Antiderivatives and definite integrals" },
    { id: "limits", name: "Limits", description: "Limit calculations and continuity" },
    { id: "linear-algebra", name: "Linear Algebra", description: "Matrices, determinants, and systems" },
    { id: "differential-equations", name: "Differential Equations", description: "Solving differential equations" }
  ];

  const difficulties = [
    { id: "easy", name: "Easy", description: "Basic concepts and simple calculations" },
    { id: "medium", name: "Medium", description: "Intermediate problems requiring multiple steps" },
    { id: "hard", name: "Hard", description: "Complex problems and advanced applications" },
    { id: "mixed", name: "Mixed", description: "Combination of all difficulty levels" }
  ];

  const questionCounts = [
    { id: "5", name: "5 Questions", icon: Target },
    { id: "10", name: "10 Questions", icon: Target },
    { id: "15", name: "15 Questions", icon: Target },
    { id: "infinite", name: "Practice Mode", icon: Infinity }
  ];

  const handleTopicChange = (topicId: string) => {
    if (topicId === "all") {
      // If selecting "all", clear other selections and select only "all"
      setSelectedTopics(["all"]);
    } else {
      // If selecting a specific topic
      if (selectedTopics.includes("all")) {
        // If "all" was selected, replace it with the new topic
        setSelectedTopics([topicId]);
      } else {
        // Toggle the specific topic
        if (selectedTopics.includes(topicId)) {
          // Remove if already selected (but don't allow empty selection)
          const newTopics = selectedTopics.filter(t => t !== topicId);
          setSelectedTopics(newTopics.length > 0 ? newTopics : ["all"]);
        } else {
          // Add to selection
          setSelectedTopics([...selectedTopics, topicId]);
        }
      }
    }
  };

  const getEstimatedQuestions = () => {
    if (questionCount === "infinite") return "∞";
    return questionCount;
  };

  const getSelectedTopicsDisplay = () => {
    if (selectedTopics.includes("all")) {
      return "All Topics";
    }
    if (selectedTopics.length === 1) {
      const topic = topics.find(t => t.id === selectedTopics[0]);
      return topic?.name || "";
    }
    return `${selectedTopics.length} Topics Selected`;
  };

  const getTopicsSummaryDisplay = () => {
    if (selectedTopics.includes("all")) {
      return "All";
    }
    return selectedTopics.length.toString();
  };

  const canStartQuiz = () => {
    return quizType && selectedTopics.length > 0 && selectedDifficulty && questionCount;
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
                  <span className="text-foreground font-medium">Quiz Setup</span>
                </div>
              </div>

              <div className="max-w-5xl mx-auto w-full">

                {/* Single Card with all configurations */}
                <Card className="p-8">
                  <CardContent className="space-y-6 p-0">
                    {/* Quiz Type Selection */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Quiz Type</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {quizTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <Card 
                              key={type.id}
                              className={`cursor-pointer transition-colors ${
                                quizType === type.id 
                                  ? "border-blue-500 bg-blue-50" 
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => setQuizType(type.id)}
                            >
                              <CardContent className="p-4 text-center">
                                <Icon className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                                <h4 className="font-semibold mb-1">{type.name}</h4>
                                <p className="text-sm text-muted-foreground">{type.description}</p>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>

                    {/* Difficulty Selection */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Difficulty Level</Label>
                      <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                        <SelectTrigger className="w-full !h-14">
                          <SelectValue placeholder="Choose difficulty level">
                            {selectedDifficulty && difficulties.find(d => d.id === selectedDifficulty)?.name}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {difficulties.map((difficulty) => (
                            <SelectItem key={difficulty.id} value={difficulty.id} className="py-3">
                              <div className="space-y-1">
                                <div className="font-medium">{difficulty.name}</div>
                                <div className="text-sm text-muted-foreground">{difficulty.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Topic Selection */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Topics to Focus On</Label>
                      <div className="relative" ref={dropdownRef}>
                        <div 
                          className="border rounded-md h-14 px-3 py-2 bg-white cursor-pointer hover:border-gray-300"
                          onClick={() => setIsTopicsDropdownOpen(!isTopicsDropdownOpen)}
                        >
                          <div className="flex items-center justify-between h-full">
                            <span className="text-sm">
                              {getSelectedTopicsDisplay()}
                            </span>
                            <ChevronDown className={`h-4 w-4 opacity-50 transition-transform ${isTopicsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                          </div>
                        </div>
                        {isTopicsDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border rounded-md shadow-md max-h-64 overflow-y-auto">
                            <div className="p-1">
                              {topics.map((topic) => (
                                <div 
                                  key={topic.id} 
                                  className="flex items-start justify-between cursor-pointer hover:bg-gray-50 p-3 rounded"
                                  onClick={() => handleTopicChange(topic.id)}
                                >
                                  <div className="flex-1 min-w-0 pr-3">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{topic.name}</span>
                                      {topic.id === "all" && (
                                        <Badge variant="secondary" className="text-xs">Recommended</Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{topic.description}</p>
                                  </div>
                                  <div className="flex items-center h-5">
                                    <div className="relative">
                                      <input
                                        type="checkbox"
                                        checked={selectedTopics.includes(topic.id)}
                                        onChange={() => handleTopicChange(topic.id)}
                                        className="h-4 w-4 appearance-none rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-[#17A2FE]/50 checked:border-[#17A2FE] checked:bg-[#17A2FE] cursor-pointer"
                                      />
                                      {selectedTopics.includes(topic.id) && (
                                        <Check className="h-3 w-3 text-white absolute top-0.5 left-0.5 pointer-events-none" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Question Count */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Number of Questions</Label>
                      <Select value={questionCount} onValueChange={setQuestionCount}>
                        <SelectTrigger className="w-full !h-14">
                          <SelectValue placeholder="Choose number of questions">
                            {questionCount && (
                              <div className="flex items-center gap-2">
                                {(() => {
                                  const count = questionCounts.find(c => c.id === questionCount);
                                  const Icon = count?.icon;
                                  return (
                                    <>
                                      {Icon && <Icon className="h-4 w-4 text-blue-600" />}
                                      <span>{count?.name}</span>
                                    </>
                                  );
                                })()}
                              </div>
                            )}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {questionCounts.map((count) => {
                            const Icon = count.icon;
                            return (
                              <SelectItem key={count.id} value={count.id} className="py-3">
                                <div className="flex items-center gap-3">
                                  <Icon className="h-4 w-4 text-blue-600" />
                                  <span className="font-medium">{count.name}</span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Quiz Summary */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold text-center">Quiz Summary</Label>
                      <div className="p-6 rounded-lg bg-blue-50 border border-blue-200 mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center max-w-4xl mx-auto">
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{quizTypes.find(t => t.id === quizType)?.name}</p>
                            <p className="text-sm text-blue-700">Type</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{getEstimatedQuestions()}</p>
                            <p className="text-sm text-blue-700">Questions</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-blue-600">{getTopicsSummaryDisplay()}</p>
                            <p className="text-sm text-blue-700">Topic</p>
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-blue-600">
                              {difficulties.find(d => d.id === selectedDifficulty)?.name}
                            </p>
                            <p className="text-sm text-blue-700">Difficulty</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Start Quiz Button */}
                    <div className="flex justify-center pt-4">
                      <Link href={quizType === "multiple-choice" ? "/student/courses/math-201/quiz" : "/student/courses/math-201/problems"}>
                        <Button 
                          size="lg" 
                          className="px-8 py-4 text-lg"
                          disabled={!canStartQuiz()}
                        >
                          <Play className="h-5 w-5 mr-2" />
                          Start {quizTypes.find(t => t.id === quizType)?.name}
                        </Button>
                      </Link>
                    </div>
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