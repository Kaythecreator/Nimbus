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
import { useRouter } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function FlashcardSetupPage() {
  const router = useRouter();
  const [selectedDifficulty, setSelectedDifficulty] = useState("mixed");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["all"]);
  const [cardCount, setCardCount] = useState("10");
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

  const difficulties = [
    { id: "mixed", name: "Mixed Difficulty", description: "All difficulty levels" },
    { id: "easy", name: "Easy", description: "Basic concepts and definitions" },
    { id: "medium", name: "Medium", description: "Intermediate problem solving" },
    { id: "hard", name: "Hard", description: "Advanced applications" }
  ];

  const topics = [
    { id: "all", name: "All Topics", description: "Cover all available topics" },
    { id: "derivatives", name: "Derivatives", description: "Differentiation rules and applications" },
    { id: "integration", name: "Integration", description: "Integration techniques and applications" },
    { id: "limits", name: "Limits", description: "Limit concepts and calculations" },
    { id: "linear-algebra", name: "Linear Algebra", description: "Matrices, vectors, and transformations" }
  ];

  const cardCounts = [
    { id: "5", name: "5 Cards", icon: Target },
    { id: "10", name: "10 Cards", icon: BookOpen },
    { id: "15", name: "15 Cards", icon: Settings },
    { id: "all", name: "All Cards", icon: Infinity }
  ];

  const handleTopicChange = (topicId: string) => {
    if (topicId === "all") {
      setSelectedTopics(["all"]);
    } else {
      const newTopics = selectedTopics.includes("all") 
        ? [topicId] 
        : selectedTopics.includes(topicId)
          ? selectedTopics.filter(id => id !== topicId)
          : [...selectedTopics, topicId];
      
      setSelectedTopics(newTopics.length === 0 ? ["all"] : newTopics);
    }
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

  const getEstimatedCards = () => {
    if (cardCount === "all") return "All Available";
    return cardCount;
  };

  const handleStartFlashcards = () => {
    // Build query params for the flashcard session
    const params = new URLSearchParams({
      difficulty: selectedDifficulty,
      topics: selectedTopics.join(','),
      count: cardCount
    });
    
    router.push(`/student/courses/math-201/flashcards?${params.toString()}`);
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
                  <span className="text-foreground font-medium">Flashcard Setup</span>
                </div>
              </div>

              {/* Setup Form */}
              <div className="max-w-5xl mx-auto w-full">
                <Card>
                  <CardContent className="p-8">
                    <div className="space-y-8">
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
                              <SelectItem key={difficulty.id} value={difficulty.id}>
                                <div className="py-3">
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
                                        <div>
                                          <div className="font-medium text-sm">{topic.name}</div>
                                          <div className="text-xs text-muted-foreground">{topic.description}</div>
                                        </div>
                                      </div>
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

                      {/* Card Count */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">Number of Cards</Label>
                        <Select value={cardCount} onValueChange={setCardCount}>
                          <SelectTrigger className="w-full !h-14">
                            <SelectValue placeholder="Choose number of cards">
                              {cardCount && (
                                <div className="flex items-center gap-2">
                                  {(() => {
                                    const count = cardCounts.find(c => c.id === cardCount);
                                    const Icon = count?.icon;
                                    return (
                                      <>
                                        {Icon && <Icon className="h-4 w-4" />}
                                        <span>{count?.name}</span>
                                      </>
                                    );
                                  })()}
                                </div>
                              )}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {cardCounts.map((count) => {
                              const Icon = count.icon;
                              return (
                                <SelectItem key={count.id} value={count.id}>
                                  <div className="flex items-center gap-2 py-3">
                                    <Icon className="h-4 w-4" />
                                    <span>{count.name}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Flashcard Summary */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold text-center">Flashcard Summary</Label>
                        <div className="p-6 rounded-lg bg-blue-50 border border-blue-200 mx-auto">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center max-w-4xl mx-auto">
                            <div>
                              <p className="text-2xl font-bold text-blue-600">{difficulties.find(d => d.id === selectedDifficulty)?.name}</p>
                              <p className="text-sm text-blue-700">Difficulty</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-blue-600">{getTopicsSummaryDisplay()}</p>
                              <p className="text-sm text-blue-700">Topics</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-blue-600">{getEstimatedCards()}</p>
                              <p className="text-sm text-blue-700">Cards</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Start Button */}
                      <div className="flex justify-center pt-4">
                        <Button 
                          onClick={handleStartFlashcards}
                          size="lg" 
                          className="px-8 py-3 text-lg"
                        >
                          <Play className="h-5 w-5 mr-2" />
                          Start Flashcards
                        </Button>
                      </div>
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