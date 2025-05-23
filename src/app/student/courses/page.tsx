"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Calendar,
  Award,
  TrendingUp,
  FileText,
  Video,
  MessageCircle,
  ExternalLink,
  Plus,
  Search
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function StudentCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: "math-201",
      title: "Advanced Mathematics",
      instructor: "Dr. Sarah Johnson",
      instructorAvatar: "/avatars/dr-johnson.jpg",
      description: "Advanced calculus, linear algebra, and mathematical analysis",
      progress: 75,
      color: "bg-blue-500",
      totalTopics: 15,
      completedTopics: 11,
      timeSpent: "45h 20m",
      nextClass: "Tomorrow, 10:00 AM",
      assignments: 3,
      quizzes: 2,
      materials: 12,
      announcements: 1,
      students: 28,
      rating: 4.8,
      credits: 3
    },
    {
      id: "cs-101",
      title: "Computer Science Fundamentals",
      instructor: "Prof. Michael Chen",
      instructorAvatar: "/avatars/prof-chen.jpg",
      description: "Introduction to programming, data structures, and algorithms",
      progress: 60,
      color: "bg-green-500",
      totalTopics: 12,
      completedTopics: 7,
      timeSpent: "38h 15m",
      nextClass: "Wednesday, 2:00 PM",
      assignments: 5,
      quizzes: 1,
      materials: 18,
      announcements: 2,
      students: 35,
      rating: 4.6,
      credits: 4
    },
    {
      id: "phys-150",
      title: "Physics: Mechanics",
      instructor: "Dr. Emily Rodriguez",
      instructorAvatar: "/avatars/dr-rodriguez.jpg",
      description: "Classical mechanics, thermodynamics, and wave physics",
      progress: 90,
      color: "bg-purple-500",
      totalTopics: 18,
      completedTopics: 16,
      timeSpent: "41h 57m",
      nextClass: "Friday, 9:00 AM",
      assignments: 2,
      quizzes: 0,
      materials: 15,
      announcements: 0,
      students: 22,
      rating: 4.9,
      credits: 3
    }
  ];

  const recentActivities = [
    {
      course: "Advanced Mathematics",
      activity: "Quiz completed: Derivatives",
      score: "92%",
      time: "2 hours ago",
      type: "quiz"
    },
    {
      course: "Computer Science",
      activity: "Assignment submitted: Binary Trees",
      score: "Pending",
      time: "1 day ago",
      type: "assignment"
    },
    {
      course: "Physics: Mechanics",
      activity: "Lecture attended: Newton's Laws",
      score: "Completed",
      time: "2 days ago",
      type: "lecture"
    }
  ];

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const overallProgress = Math.round(
    courses.reduce((sum, course) => sum + course.progress, 0) / courses.length
  );

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);

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
                  <h1 className="text-2xl font-bold">My Courses</h1>
                  <p className="text-muted-foreground">
                    {courses.length} enrolled courses • {totalCredits} credits • {overallProgress}% average progress
                  </p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Courses
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{courses.length}</div>
                    <p className="text-xs text-muted-foreground">Active enrollments</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{overallProgress}%</div>
                    <p className="text-xs text-muted-foreground">Across all courses</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalCredits}</div>
                    <p className="text-xs text-muted-foreground">Credit hours</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Study Time</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">125h</div>
                    <p className="text-xs text-muted-foreground">This semester</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="courses" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="courses">All Courses</TabsTrigger>
                  <TabsTrigger value="activity">Recent Activity</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                      <Card key={course.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-12 h-12 ${course.color} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                                {course.title.split(' ').map(word => word[0]).join('')}
                              </div>
                              <div>
                                <CardTitle className="text-lg leading-tight">
                                  {course.title}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1 mt-1">
                                  <Avatar className="h-4 w-4">
                                    <AvatarImage src={course.instructorAvatar} />
                                    <AvatarFallback className="text-xs">
                                      {course.instructor.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  {course.instructor}
                                </CardDescription>
                              </div>
                            </div>
                            <Badge variant="secondary">{course.credits} credits</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            {course.description}
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{course.progress}% ({course.completedTopics}/{course.totalTopics} topics)</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{course.timeSpent}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{course.students} students</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{course.assignments} assignments</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Award className="h-4 w-4 text-muted-foreground" />
                              <span>★ {course.rating}</span>
                            </div>
                          </div>
                          
                          <div className="pt-2 border-t">
                            <p className="text-sm font-medium mb-2">Next Class:</p>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {course.nextClass}
                            </p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button asChild className="flex-1">
                              <Link href={`/student/courses/${course.id}`}>
                                View Course
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest course activities and submissions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${
                                activity.type === 'quiz' ? 'bg-blue-100' :
                                activity.type === 'assignment' ? 'bg-orange-100' :
                                'bg-green-100'
                              }`}>
                                {activity.type === 'quiz' && <Award className="h-4 w-4 text-blue-600" />}
                                {activity.type === 'assignment' && <FileText className="h-4 w-4 text-orange-600" />}
                                {activity.type === 'lecture' && <Video className="h-4 w-4 text-green-600" />}
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{activity.activity}</h4>
                                <p className="text-sm text-muted-foreground">{activity.course}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">{activity.score}</p>
                              <p className="text-xs text-muted-foreground">{activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="schedule" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Weekly Schedule</CardTitle>
                      <CardDescription>Your upcoming classes and sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {courses.map((course) => (
                          <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 ${course.color} rounded text-white font-bold text-sm flex items-center justify-center`}>
                                {course.title.split(' ').map(word => word[0]).join('')}
                              </div>
                              <div>
                                <h4 className="font-medium">{course.title}</h4>
                                <p className="text-sm text-muted-foreground">{course.instructor}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{course.nextClass}</p>
                              <p className="text-sm text-muted-foreground">Regular class</p>
                            </div>
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