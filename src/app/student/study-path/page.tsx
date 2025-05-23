"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  MapPin, 
  Clock, 
  Award,
  TrendingUp,
  BookOpen,
  CheckCircle,
  Circle,
  Star,
  ChevronRight,
  Lightbulb,
  Calendar,
  BarChart3,
  Zap
} from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function StudentStudyPathPage() {
  const learningGoals = [
    {
      id: 1,
      title: "Master Linear Algebra",
      description: "Complete all linear algebra topics with 90% proficiency",
      progress: 75,
      deadline: "March 15, 2024",
      priority: "high",
      estimatedTime: "3 weeks",
      skills: ["Matrix Operations", "Eigenvalues", "Vector Spaces"],
      status: "in-progress"
    },
    {
      id: 2,
      title: "Data Structures Proficiency",
      description: "Understand and implement all major data structures",
      progress: 60,
      deadline: "February 28, 2024",
      priority: "high",
      estimatedTime: "2 weeks",
      skills: ["Trees", "Graphs", "Hash Tables"],
      status: "in-progress"
    },
    {
      id: 3,
      title: "Physics Problem Solving",
      description: "Achieve 95% accuracy in mechanics problems",
      progress: 90,
      deadline: "March 1, 2024",
      priority: "medium",
      estimatedTime: "1 week",
      skills: ["Rotational Motion", "Energy Conservation"],
      status: "in-progress"
    }
  ];

  const recommendations = [
    {
      id: 1,
      type: "topic",
      title: "Review Matrix Multiplication",
      reason: "Based on your recent quiz performance",
      estimatedTime: "45 minutes",
      difficulty: "intermediate",
      priority: "high",
      course: "Advanced Mathematics"
    },
    {
      id: 2,
      type: "practice",
      title: "Binary Search Tree Practice",
      reason: "Upcoming assignment requires this knowledge",
      estimatedTime: "1 hour",
      difficulty: "advanced",
      priority: "high",
      course: "Computer Science"
    },
    {
      id: 3,
      type: "review",
      title: "Newton's Laws Review",
      reason: "Strong foundation for upcoming topics",
      estimatedTime: "30 minutes",
      difficulty: "beginner",
      priority: "medium",
      course: "Physics: Mechanics"
    },
    {
      id: 4,
      type: "video",
      title: "Algorithm Complexity Analysis",
      reason: "Frequently appears in your course",
      estimatedTime: "25 minutes",
      difficulty: "intermediate",
      priority: "medium",
      course: "Computer Science"
    }
  ];

  const studySchedule = [
    {
      id: 1,
      time: "9:00 AM - 10:30 AM",
      title: "Linear Algebra Practice",
      type: "study",
      course: "Mathematics",
      color: "bg-blue-500"
    },
    {
      id: 2,
      time: "2:00 PM - 3:00 PM",
      title: "CS-101 Lecture",
      type: "class",
      course: "Computer Science",
      color: "bg-green-500"
    },
    {
      id: 3,
      time: "4:00 PM - 5:00 PM",
      title: "Physics Study Group",
      type: "group",
      course: "Physics",
      color: "bg-purple-500"
    },
    {
      id: 4,
      time: "7:00 PM - 8:00 PM",
      title: "Binary Trees Assignment",
      type: "assignment",
      course: "Computer Science",
      color: "bg-orange-500"
    }
  ];

  const skillProgress = [
    { skill: "Calculus", level: 95, trend: "up" },
    { skill: "Linear Algebra", level: 75, trend: "up" },
    { skill: "Data Structures", level: 68, trend: "up" },
    { skill: "Algorithms", level: 45, trend: "stable" },
    { skill: "Classical Mechanics", level: 88, trend: "up" },
    { skill: "Problem Solving", level: 82, trend: "up" }
  ];

  const achievements = [
    {
      id: 1,
      title: "Math Streak Master",
      description: "Solved 50 math problems in a row correctly",
      icon: Award,
      color: "text-yellow-600",
      earned: true,
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Code Champion",
      description: "Completed 10 programming assignments",
      icon: Star,
      color: "text-blue-600",
      earned: true,
      date: "1 week ago"
    },
    {
      id: 3,
      title: "Physics Pro",
      description: "Achieve 90% average in physics",
      icon: Target,
      color: "text-purple-600",
      earned: false,
      progress: 88
    },
    {
      id: 4,
      title: "Study Consistency",
      description: "Study for 30 days straight",
      icon: Calendar,
      color: "text-green-600",
      earned: false,
      progress: 23
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner": return "bg-green-100 text-green-800";
      case "intermediate": return "bg-yellow-100 text-yellow-800";
      case "advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "topic": return BookOpen;
      case "practice": return Target;
      case "review": return Circle;
      case "video": return Circle;
      default: return Lightbulb;
    }
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
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">Study Path</h1>
                  <p className="text-muted-foreground">
                    Your personalized learning journey and recommendations
                  </p>
                </div>
                <Button>
                  <Zap className="h-4 w-4 mr-2" />
                  Get AI Recommendations
                </Button>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{learningGoals.length}</div>
                    <p className="text-xs text-muted-foreground">In progress</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {Math.round(learningGoals.reduce((sum, goal) => sum + goal.progress, 0) / learningGoals.length)}%
                    </div>
                    <p className="text-xs text-muted-foreground">Across all goals</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.5h</div>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Achievements</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {achievements.filter(a => a.earned).length}
                    </div>
                    <p className="text-xs text-muted-foreground">Earned</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="goals" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="goals">Learning Goals</TabsTrigger>
                  <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                  <TabsTrigger value="schedule">Study Schedule</TabsTrigger>
                  <TabsTrigger value="progress">Skills Progress</TabsTrigger>
                </TabsList>
                
                <TabsContent value="goals" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Active Goals</h3>
                      {learningGoals.map((goal) => (
                        <Card key={goal.id}>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-lg">{goal.title}</CardTitle>
                                <CardDescription>{goal.description}</CardDescription>
                              </div>
                              <Badge className={getPriorityColor(goal.priority)}>
                                {goal.priority}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{goal.progress}%</span>
                              </div>
                              <Progress value={goal.progress} className="h-2" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Deadline: </span>
                                <span>{goal.deadline}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Est. Time: </span>
                                <span>{goal.estimatedTime}</span>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground mb-2">Skills:</p>
                              <div className="flex flex-wrap gap-1">
                                {goal.skills.map((skill, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex justify-end">
                              <Button variant="outline" size="sm">
                                View Details
                                <ChevronRight className="h-4 w-4 ml-2" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Achievements</h3>
                      <div className="space-y-3">
                        {achievements.map((achievement) => {
                          const IconComponent = achievement.icon;
                          return (
                            <Card key={achievement.id} className={achievement.earned ? 'border-yellow-200 bg-yellow-50' : ''}>
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className={`p-2 rounded-full ${achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'} ${achievement.color}`}>
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-medium">{achievement.title}</h4>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {achievement.description}
                                    </p>
                                    {achievement.earned ? (
                                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                        Earned {achievement.date}
                                      </Badge>
                                    ) : (
                                      <div className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                          <span>Progress</span>
                                          <span>{achievement.progress}%</span>
                                        </div>
                                        <Progress value={achievement.progress} className="h-1" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="recommendations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI-Powered Recommendations</CardTitle>
                      <CardDescription>
                        Personalized study suggestions based on your progress and goals
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {recommendations.map((rec) => {
                          const IconComponent = getRecommendationIcon(rec.type);
                          return (
                            <Card key={rec.id} className="hover:shadow-md transition-shadow">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <h4 className="font-medium">{rec.title}</h4>
                                      <Badge className={getPriorityColor(rec.priority)}>
                                        {rec.priority}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">
                                      {rec.reason}
                                    </p>
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        <span>{rec.estimatedTime}</span>
                                        <Badge variant="outline" className={getDifficultyColor(rec.difficulty)}>
                                          {rec.difficulty}
                                        </Badge>
                                      </div>
                                      <Button size="sm" variant="outline">
                                        Start
                                      </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                      {rec.course}
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Today's Study Schedule</CardTitle>
                      <CardDescription>Your personalized study plan for today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {studySchedule.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 border rounded-lg">
                            <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{item.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {item.type}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{item.time}</span>
                                <span>•</span>
                                <span>{item.course}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="progress" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills Progress</CardTitle>
                      <CardDescription>Track your proficiency across different subjects</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {skillProgress.map((skill, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{skill.skill}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{skill.level}%</span>
                                {skill.trend === "up" ? (
                                  <TrendingUp className="h-4 w-4 text-green-500" />
                                ) : (
                                  <BarChart3 className="h-4 w-4 text-gray-500" />
                                )}
                              </div>
                            </div>
                            <Progress value={skill.level} className="h-2" />
                          </div>
                        ))}
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