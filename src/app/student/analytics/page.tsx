"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, TrendingDown, Clock, Target, Award } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function StudentAnalyticsPage() {
  const analytics = {
    overall: {
      totalStudyTime: "124h 32m",
      averageScore: 87.5,
      topicsCompleted: 42,
      streakDays: 15
    },
    subjects: [
      {
        name: "Advanced Mathematics",
        progress: 75,
        timeSpent: "45h 20m",
        averageScore: 92,
        trend: "up",
        topics: 15,
        completedTopics: 11
      },
      {
        name: "Computer Science",
        progress: 60,
        timeSpent: "38h 15m",
        averageScore: 85,
        trend: "up",
        topics: 12,
        completedTopics: 7
      },
      {
        name: "Physics: Mechanics",
        progress: 90,
        timeSpent: "41h 57m",
        averageScore: 88,
        trend: "down",
        topics: 18,
        completedTopics: 16
      }
    ],
    weeklyProgress: [
      { day: "Mon", hours: 3.5, score: 85 },
      { day: "Tue", hours: 2.8, score: 90 },
      { day: "Wed", hours: 4.2, score: 78 },
      { day: "Thu", hours: 3.1, score: 88 },
      { day: "Fri", hours: 2.5, score: 92 },
      { day: "Sat", hours: 1.8, score: 87 },
      { day: "Sun", hours: 2.2, score: 89 }
    ]
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
                  <h1 className="text-2xl font-bold">Analytics</h1>
                  <p className="text-muted-foreground">Track your learning progress and performance</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                    <SelectItem value="90">Last 3 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.overall.totalStudyTime}</div>
                    <p className="text-xs text-muted-foreground">+12% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.overall.averageScore}%</div>
                    <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Topics Completed</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.overall.topicsCompleted}</div>
                    <p className="text-xs text-muted-foreground">+8 this month</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.overall.streakDays} days</div>
                    <p className="text-xs text-muted-foreground">Keep it up!</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="subjects" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="subjects">Subject Performance</TabsTrigger>
                  <TabsTrigger value="weekly">Weekly Progress</TabsTrigger>
                  <TabsTrigger value="goals">Learning Goals</TabsTrigger>
                </TabsList>
                
                <TabsContent value="subjects" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {analytics.subjects.map((subject, index) => (
                      <Card key={index}>
                        <CardHeader>
                          <CardTitle className="text-lg">{subject.name}</CardTitle>
                          <CardDescription>
                            {subject.completedTopics} of {subject.topics} topics completed
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{subject.progress}%</span>
                            </div>
                            <Progress value={subject.progress} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Time Spent</p>
                              <p className="font-medium">{subject.timeSpent}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Avg Score</p>
                              <div className="flex items-center gap-1">
                                <span className="font-medium">{subject.averageScore}%</span>
                                {subject.trend === "up" ? (
                                  <TrendingUp className="h-3 w-3 text-green-500" />
                                ) : (
                                  <TrendingDown className="h-3 w-3 text-red-500" />
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="weekly" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Study Hours & Performance</CardTitle>
                      <CardDescription>
                        Your study hours and average scores for the past week
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-2">
                        {analytics.weeklyProgress.map((day, index) => (
                          <div key={index} className="text-center space-y-2">
                            <p className="text-sm font-medium">{day.day}</p>
                            <div className="bg-muted rounded-lg p-2 space-y-1">
                              <div className="text-xs text-muted-foreground">Hours</div>
                              <div className="font-bold">{day.hours}h</div>
                              <div className="text-xs text-muted-foreground">Score</div>
                              <Badge variant={day.score >= 85 ? "default" : "secondary"}>
                                {day.score}%
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="goals" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Monthly Goals</CardTitle>
                        <CardDescription>Track your progress towards monthly targets</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Study 80 hours this month</span>
                            <span>65/80 hours</span>
                          </div>
                          <Progress value={81.25} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Complete 20 topics</span>
                            <span>16/20 topics</span>
                          </div>
                          <Progress value={80} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Maintain 85% average</span>
                            <span>87.5% current</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Achievements</CardTitle>
                        <CardDescription>Your recent learning milestones</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Award className="h-4 w-4 text-yellow-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">15-Day Streak</p>
                            <p className="text-xs text-muted-foreground">Studied every day for 15 days</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <Target className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Perfect Score</p>
                            <p className="text-xs text-muted-foreground">Scored 100% on Physics quiz</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Math Master</p>
                            <p className="text-xs text-muted-foreground">Completed all Calculus topics</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 