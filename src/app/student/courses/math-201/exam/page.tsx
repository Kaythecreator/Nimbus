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
  Clock,
  GraduationCap,
  AlertTriangle,
  Play,
  FileText,
  Target,
  Timer,
  BookOpen,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function ExamPage() {
  const router = useRouter();
  const [examType, setExamType] = useState("practice");
  const [timeLimit, setTimeLimit] = useState("120");
  const [questionCount, setQuestionCount] = useState("50");

  const examTypes = [
    { 
      id: "practice", 
      name: "Practice Exam", 
      description: "Simulate exam conditions without consequences",
      icon: Target,
      color: "text-blue-600"
    },
    { 
      id: "midterm", 
      name: "Midterm Simulation", 
      description: "Practice for your upcoming midterm exam",
      icon: BookOpen,
      color: "text-orange-600"
    },
    { 
      id: "final", 
      name: "Final Exam Simulation", 
      description: "Full comprehensive final exam practice",
      icon: GraduationCap,
      color: "text-purple-600"
    }
  ];

  const timeLimits = [
    { id: "60", name: "1 Hour", description: "Quick assessment" },
    { id: "90", name: "1.5 Hours", description: "Standard midterm length" },
    { id: "120", name: "2 Hours", description: "Full exam duration" },
    { id: "180", name: "3 Hours", description: "Extended final exam" }
  ];

  const questionCounts = [
    { id: "25", name: "25 Questions", description: "Short exam" },
    { id: "40", name: "40 Questions", description: "Standard exam" },
    { id: "50", name: "50 Questions", description: "Comprehensive exam" },
    { id: "75", name: "75 Questions", description: "Extended final exam" }
  ];

  const handleStartExam = () => {
    // Build query params for the exam session
    const params = new URLSearchParams({
      type: examType,
      timeLimit: timeLimit,
      questions: questionCount
    });
    
    router.push(`/student/courses/math-201/exam/session?${params.toString()}`);
  };

  const getExamTypeDisplay = () => {
    const type = examTypes.find(t => t.id === examType);
    return type?.name || "";
  };

  const getTimeLimitDisplay = () => {
    const time = timeLimits.find(t => t.id === timeLimit);
    return time?.name || "";
  };

  const getQuestionCountDisplay = () => {
    const count = questionCounts.find(q => q.id === questionCount);
    return count?.name || "";
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
                  <span className="text-foreground font-medium">Exam Simulation</span>
                </div>
              </div>

              {/* Exam Setup */}
              <div className="max-w-5xl mx-auto w-full">
                <Card>
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <GraduationCap className="h-8 w-8 text-purple-600" />
                      <CardTitle className="text-2xl">Exam Simulation</CardTitle>
                    </div>
                    <p className="text-muted-foreground">Practice under real exam conditions to prepare for success</p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-8">
                      {/* Exam Type Selection */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">Exam Type</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {examTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                              <Card 
                                key={type.id}
                                className={`cursor-pointer transition-all hover:shadow-md ${
                                  examType === type.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                                }`}
                                onClick={() => setExamType(type.id)}
                              >
                                <CardContent className="p-4 text-center">
                                  <Icon className={`h-8 w-8 mx-auto mb-2 ${type.color}`} />
                                  <h4 className="font-semibold mb-1">{type.name}</h4>
                                  <p className="text-sm text-muted-foreground">{type.description}</p>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Limit */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">Time Limit</Label>
                        <Select value={timeLimit} onValueChange={setTimeLimit}>
                          <SelectTrigger className="w-full !h-14">
                            <SelectValue placeholder="Choose time limit">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{getTimeLimitDisplay()}</span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {timeLimits.map((time) => (
                              <SelectItem key={time.id} value={time.id}>
                                <div className="py-3">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span className="font-medium">{time.name}</span>
                                  </div>
                                  <div className="text-sm text-muted-foreground">{time.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Question Count */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold">Number of Questions</Label>
                        <Select value={questionCount} onValueChange={setQuestionCount}>
                          <SelectTrigger className="w-full !h-14">
                            <SelectValue placeholder="Choose number of questions">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>{getQuestionCountDisplay()}</span>
                              </div>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {questionCounts.map((count) => (
                              <SelectItem key={count.id} value={count.id}>
                                <div className="py-3">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span className="font-medium">{count.name}</span>
                                  </div>
                                  <div className="text-sm text-muted-foreground">{count.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Exam Conditions Notice */}
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-800 mb-2">Exam Conditions</h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                              <li>• Strict time limit will be enforced</li>
                              <li>• No pause or break options available</li>
                              <li>• Questions cannot be revisited once submitted</li>
                              <li>• Results will be recorded in your performance history</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Exam Summary */}
                      <div className="space-y-4">
                        <Label className="text-lg font-semibold text-center">Exam Summary</Label>
                        <div className="p-6 rounded-lg bg-purple-50 border border-purple-200 mx-auto">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center max-w-4xl mx-auto">
                            <div>
                              <p className="text-2xl font-bold text-purple-600">{getExamTypeDisplay()}</p>
                              <p className="text-sm text-purple-700">Type</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-purple-600">{getTimeLimitDisplay()}</p>
                              <p className="text-sm text-purple-700">Duration</p>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-purple-600">{getQuestionCountDisplay()}</p>
                              <p className="text-sm text-purple-700">Questions</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Start Button */}
                      <div className="flex justify-center pt-4">
                        <Button 
                          onClick={handleStartExam}
                          size="lg" 
                          className="px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700"
                        >
                          <Play className="h-5 w-5 mr-2" />
                          Start Exam
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Previous Exam Results */}
              <div className="max-w-5xl mx-auto w-full">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Recent Exam Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: "Practice Exam", score: 85, date: "2 days ago", duration: "1h 45m", questions: 40 },
                        { type: "Midterm Simulation", score: 78, date: "1 week ago", duration: "2h 0m", questions: 50 },
                        { type: "Practice Exam", score: 92, date: "2 weeks ago", duration: "1h 30m", questions: 25 }
                      ].map((result, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              result.score >= 90 ? 'bg-green-100 text-green-600' :
                              result.score >= 80 ? 'bg-blue-100 text-blue-600' :
                              result.score >= 70 ? 'bg-yellow-100 text-yellow-600' :
                              'bg-red-100 text-red-600'
                            }`}>
                              <span className="font-bold">{result.score}%</span>
                            </div>
                            <div>
                              <p className="font-semibold">{result.type}</p>
                              <p className="text-sm text-muted-foreground">
                                {result.questions} questions • {result.duration} • {result.date}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </div>
                      ))}
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