"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { 
  BookOpen, 
  Clock, 
  Calendar,
  Award,
  FileText,
  Video,
  MessageCircle,
  Download,
  Play,
  CheckCircle,
  Circle,
  Star,
  ChevronRight,
  ArrowLeft,
  Brain,
  Target,
  RotateCcw,
  Zap,
  TrendingUp,
  Users,
  HelpCircle,
  Lightbulb,
  Atom,
  Beaker,
  Calculator,
  Gauge,
  Settings,
  Share,
  User,
  Trophy,
  Flame,
  BarChart3,
  TrendingDown,
  PenTool,
  Bot,
  GraduationCap
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function PhysicsCoursePage() {
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);

  const courseData = {
    id: "phys-150",
    title: "Physics: Mechanics",
    description: "Explore classical mechanics through interactive simulations and problem-solving",
    examDate: "March 18, 2024",
    daysToExam: 31,
    examProgress: 68,
    filesCount: 32,
    notesCount: 22,
    exercisesCount: 156,
    exercisesCompleted: 125,
    currentGrade: "B",
    gradeProgress: 82,
    xpCurrent: 2800,
    xpNextLevel: 3500,
    level: 8,
    color: "bg-purple-500"
  };

  const upcomingTasks = [
    { task: "Complete Kinematics Problem Set", due: "Tomorrow", priority: "high" },
    { task: "Review Energy Conservation", due: "Wednesday", priority: "medium" },
    { task: "Study Rotational Motion", due: "Friday", priority: "low" }
  ];

  const smartSuggestions = [
    "Practice more Projectile Motion problems - 71% accuracy",
    "Review Force diagrams - common mistake area",
    "Try advanced Conservation of Energy problems"
  ];

  const topTopics = [
    { name: "Kinematics", progress: 94, strength: "excellent" },
    { name: "Newton's Laws", progress: 87, strength: "good" },
    { name: "Work and Energy", progress: 83, strength: "good" }
  ];

  const bottomTopics = [
    { name: "Rotational Motion", progress: 52, strength: "needs work" },
    { name: "Oscillations", progress: 38, strength: "needs work" },
    { name: "Momentum Collisions", progress: 64, strength: "improving" }
  ];

  const badges = [
    { name: "Physics Pro", icon: "⚡", earned: true, description: "Solve 100 physics problems" },
    { name: "Lab Master", icon: "🔬", earned: true, description: "Complete 10 virtual labs" },
    { name: "Formula Guru", icon: "📐", earned: false, description: "Master all physics formulas" },
    { name: "Mechanics Expert", icon: "⚙️", earned: true, description: "Score 85% on mechanics exam" }
  ];

  const activityData = [
    { day: "Mon", sessions: 2 },
    { day: "Tue", sessions: 4 },
    { day: "Wed", sessions: 3 },
    { day: "Thu", sessions: 5 },
    { day: "Fri", sessions: 2 },
    { day: "Sat", sessions: 3 },
    { day: "Sun", sessions: 2 }
  ];

  const materials = [
    {
      id: 1,
      name: "Physics Formula Sheet",
      type: "PDF",
      size: "3.1 MB",
      topic: "General",
      uploadDate: "Jan 22, 2024"
    },
    {
      id: 2,
      name: "Kinematics Problem Examples",
      type: "PDF", 
      size: "2.8 MB",
      topic: "Kinematics",
      uploadDate: "Jan 20, 2024"
    },
    {
      id: 3,
      name: "Forces and Motion Guide",
      type: "PDF",
      size: "4.2 MB",
      topic: "Newton's Laws",
      uploadDate: "Jan 18, 2024"
    }
  ];

  const notes = [
    {
      id: 1,
      title: "Projectile Motion Formulas",
      topic: "Kinematics",
      lastModified: "1 hour ago",
      content: "Key equations for projectile motion analysis...",
      wordCount: 421
    },
    {
      id: 2,
      title: "Free Body Diagram Guidelines",
      topic: "Forces",
      lastModified: "6 hours ago",
      content: "Step-by-step approach to drawing and analyzing FBDs...",
      wordCount: 356
    }
  ];

  const flashcards = [
    {
      id: 1,
      front: "What is Newton's Second Law?",
      back: "F = ma\n\nThe net force on an object is equal to the mass of the object multiplied by its acceleration.",
      difficulty: "Easy"
    },
    {
      id: 2,
      front: "State the work-energy theorem",
      back: "The work done on an object equals the change in its kinetic energy:\nW = ΔKE = KEf - KEi = ½mvf² - ½mvi²",
      difficulty: "Medium"
    }
  ];

  const flipFlashcard = () => {
    setShowFlashcardAnswer(!showFlashcardAnswer);
  };

  const nextFlashcard = () => {
    setCurrentFlashcard((prev) => (prev + 1) % flashcards.length);
    setShowFlashcardAnswer(false);
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
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              {/* Breadcrumb */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Link href="/student/courses" className="flex items-center hover:text-foreground">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Courses
                </Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium">{courseData.title}</span>
              </div>

              {/* Course Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-8 rounded-full ${courseData.color}`} />
                    <h1 className="text-3xl font-bold">{courseData.title}</h1>
                  </div>
                  <p className="text-lg text-muted-foreground">{courseData.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Main Tabs */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="materials">Uploaded Materials</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="learn">Learn</TabsTrigger>
                  <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Top Section Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Exam Card */}
                    <Card className="lg:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-red-500" />
                          Final Exam
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="text-center">
                            <p className="text-3xl font-bold">{courseData.daysToExam}</p>
                            <p className="text-sm text-muted-foreground">days remaining</p>
                            <p className="text-sm font-medium">{courseData.examDate}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Exam Preparation</span>
                              <span>{courseData.examProgress}%</span>
                            </div>
                            <Progress value={courseData.examProgress} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Files Card */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-5 w-5 text-purple-500" />
                          <div>
                            <p className="text-2xl font-bold">{courseData.filesCount}</p>
                            <p className="text-sm text-muted-foreground">Files</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Notes Card */}
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Calculator className="h-5 w-5 text-orange-500" />
                          <div>
                            <p className="text-2xl font-bold">{courseData.notesCount}</p>
                            <p className="text-sm text-muted-foreground">Notes</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Second Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Score Summary Card */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Score Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Problems solved</span>
                          <span className="font-semibold">{courseData.exercisesCompleted}/{courseData.exercisesCount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Current grade</span>
                          <Badge variant="secondary" className="text-lg font-bold">{courseData.currentGrade}</Badge>
                        </div>
                        <div className="space-y-1">
                          <Progress value={courseData.gradeProgress} className="h-2" />
                          <p className="text-xs text-muted-foreground">{courseData.gradeProgress}% to next grade</p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* XP Tracker */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-yellow-500" />
                          Level {courseData.level}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">XP Progress</span>
                          <span className="font-semibold">{courseData.xpCurrent}/{courseData.xpNextLevel}</span>
                        </div>
                        <Progress value={(courseData.xpCurrent / courseData.xpNextLevel) * 100} className="h-3" />
                        <p className="text-xs text-muted-foreground">{courseData.xpNextLevel - courseData.xpCurrent} XP to level {courseData.level + 1}</p>
                      </CardContent>
                    </Card>

                    {/* Daily Goal Progress */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Today's Goal</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Problem solving</span>
                          <span className="font-semibold">8/10 problems</span>
                        </div>
                        <Progress value={80} className="h-2" />
                        <div className="flex items-center gap-2">
                          <Atom className="h-4 w-4 text-purple-500" />
                          <span className="text-sm">2 more to complete goal</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Study Plan Overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Upcoming Tasks</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {upcomingTasks.map((task, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{task.task}</p>
                              <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                            </div>
                            <Badge 
                              variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {task.priority}
                            </Badge>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Brain className="h-5 w-5" />
                          Smart Suggestions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {smartSuggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <Lightbulb className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                            <span className="text-sm">{suggestion}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Activity Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5" />
                        Weekly Physics Practice
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-end justify-between gap-2 h-32">
                        {activityData.map((day) => (
                          <div key={day.day} className="flex flex-col items-center gap-2">
                            <div 
                              className="bg-purple-500 rounded-t w-8 min-h-[4px]"
                              style={{ height: `${(day.sessions / 5) * 100}%` }}
                            />
                            <span className="text-xs text-muted-foreground">{day.day}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top & Bottom Topics */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-600">
                          <TrendingUp className="h-5 w-5" />
                          Strongest Topics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {topTopics.map((topic, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-sm">{topic.name}</span>
                              <span className="text-sm text-green-600">{topic.progress}%</span>
                            </div>
                            <Progress value={topic.progress} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-600">
                          <TrendingDown className="h-5 w-5" />
                          Needs Improvement
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {bottomTopics.map((topic, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-sm">{topic.name}</span>
                              <span className="text-sm text-red-600">{topic.progress}%</span>
                            </div>
                            <Progress value={topic.progress} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Gamification Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Achievements & Badges
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {badges.map((badge, index) => (
                          <div 
                            key={index} 
                            className={`p-4 border rounded-lg text-center ${badge.earned ? 'bg-yellow-50 border-yellow-200' : 'bg-muted/30 border-muted'}`}
                          >
                            <div className="text-2xl mb-2">{badge.icon}</div>
                            <p className="font-medium text-sm">{badge.name}</p>
                            <p className="text-xs text-muted-foreground">{badge.description}</p>
                            {badge.earned && <Badge className="mt-2 text-xs">Earned</Badge>}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 text-center">
                        <Button variant="outline">
                          <Users className="h-4 w-4 mr-2" />
                          View Leaderboard
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Uploaded Materials Tab */}
                <TabsContent value="materials" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Course Materials</h3>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download All
                    </Button>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {materials.map((material) => (
                          <div key={material.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                            <div className="flex items-center gap-4">
                              <FileText className="h-8 w-8 text-purple-500" />
                              <div>
                                <h4 className="font-medium">{material.name}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{material.type}</span>
                                  <span>•</span>
                                  <span>{material.size}</span>
                                  <span>•</span>
                                  <Badge variant="outline" className="text-xs">{material.topic}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">Uploaded {material.uploadDate}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Play className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Notes Tab */}
                <TabsContent value="notes" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Physics Notes</h3>
                    <Button>
                      <FileText className="h-4 w-4 mr-2" />
                      New Note
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    {notes.map((note) => (
                      <Card key={note.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Calculator className="h-5 w-5 text-orange-500" />
                                <h4 className="text-lg font-semibold">{note.title}</h4>
                                <Badge variant="outline">{note.topic}</Badge>
                              </div>
                              <p className="text-muted-foreground mb-3">{note.content}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{note.wordCount} words</span>
                                <span>Modified {note.lastModified}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                              <Button size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Learn Tab */}
                <TabsContent value="learn" className="space-y-6">
                  <h3 className="text-xl font-semibold">Practice Modes</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Multiple Choice */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <HelpCircle className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Multiple Choice</h4>
                        <p className="text-sm text-muted-foreground mb-4">Test your physics knowledge</p>
                        <Button className="w-full">Start Quiz</Button>
                      </CardContent>
                    </Card>

                    {/* Flashcards */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Brain className="h-12 w-12 text-green-500 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Flashcards</h4>
                        <p className="text-sm text-muted-foreground mb-4">Memorize formulas and concepts</p>
                        <Button className="w-full">Study Cards</Button>
                      </CardContent>
                    </Card>

                    {/* Open Questions */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <Calculator className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Problem Solving</h4>
                        <p className="text-sm text-muted-foreground mb-4">Practice physics calculations</p>
                        <Button className="w-full">Solve Problems</Button>
                      </CardContent>
                    </Card>

                    {/* Exam Simulation */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <GraduationCap className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Exam</h4>
                        <p className="text-sm text-muted-foreground mb-4">Simulate real exam conditions</p>
                        <Button className="w-full">Take Exam</Button>
                      </CardContent>
                    </Card>

                    {/* AI Tutor */}
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer md:col-span-2 lg:col-span-1">
                      <CardContent className="p-6 text-center">
                        <Bot className="h-12 w-12 text-indigo-500 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold mb-2">AI Tutor</h4>
                        <p className="text-sm text-muted-foreground mb-4">Get physics help and explanations</p>
                        <Button className="w-full">Chat with AI</Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Leaderboard Tab */}
                <TabsContent value="leaderboard" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Course Leaderboard</h3>
                    <Badge variant="outline">Physics: Mechanics</Badge>
                  </div>

                  {/* Leaderboard Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">15</p>
                        <p className="text-sm text-muted-foreground">Your Rank</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">94</p>
                        <p className="text-sm text-muted-foreground">Total Students</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                        <p className="text-2xl font-bold">2,800</p>
                        <p className="text-sm text-muted-foreground">Your XP</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Top Performers */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Physics Masters
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { rank: 1, name: "Alex Rodriguez", xp: 4200, level: 13, streak: 42, badge: "🏆" },
                          { rank: 2, name: "Emma Thompson", xp: 3950, level: 12, streak: 29, badge: "🥈" },
                          { rank: 3, name: "Nathan Singh", xp: 3800, level: 12, streak: 33, badge: "🥉" },
                          { rank: 4, name: "Olivia Martinez", xp: 3650, level: 11, streak: 21, badge: "⭐" },
                          { rank: 5, name: "Daniel Lee", xp: 3500, level: 11, streak: 26, badge: "⭐" },
                          { rank: 6, name: "Isabella Wong", xp: 3350, level: 10, streak: 18, badge: "⭐" }
                        ].map((student) => (
                          <div key={student.rank} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                                <span className="text-lg">{student.badge}</span>
                              </div>
                              <div>
                                <p className="font-semibold">{student.name}</p>
                                <p className="text-sm text-muted-foreground">Level {student.level} • {student.streak} day streak</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{student.xp.toLocaleString()} XP</p>
                              <p className="text-sm text-muted-foreground">Rank #{student.rank}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Your Position */}
                  <Card className="border-purple-200 bg-purple-50">
                    <CardHeader>
                      <CardTitle className="text-purple-800">Your Position</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100">
                            <span className="text-lg">⚛️</span>
                          </div>
                          <div>
                            <p className="font-semibold">You (Student)</p>
                            <p className="text-sm text-muted-foreground">Level {courseData.level} • 15 day streak</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{courseData.xpCurrent.toLocaleString()} XP</p>
                          <p className="text-sm text-muted-foreground">Rank #15</p>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="text-sm text-muted-foreground">
                          You need <span className="font-semibold text-purple-600">350 XP</span> to reach rank #14
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Weekly Challenge */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-purple-500" />
                        Physics Challenge
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Master Kinematics & Forces</h4>
                          <p className="text-sm text-muted-foreground mb-3">Complete 20 problems on motion and force analysis to earn bonus XP</p>
                          <div className="flex items-center gap-3">
                            <Progress value={60} className="flex-1" />
                            <span className="text-sm font-medium">12/20</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-sm text-muted-foreground">Ends in 5 days</span>
                          <Badge className="bg-purple-100 text-purple-800">+650 XP Bonus</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 