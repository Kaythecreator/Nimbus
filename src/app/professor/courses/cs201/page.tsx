import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  BarChart, 
  CalendarClock, 
  ChevronLeft, 
  FileText, 
  GraduationCap, 
  Pencil, 
  Plus, 
  Settings, 
  UploadCloud, 
  Users,
  Trophy,
  Medal,
  Award
} from "lucide-react"
import Link from "next/link"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function CourseDetailPage() {
  // Mock course data
  const course = {
    id: "cs201",
    code: "CS201",
    title: "Data Structures and Algorithms",
    description: "This course covers fundamental data structures and algorithms essential for computer science. Students will learn about arrays, linked lists, trees, graphs, sorting, and searching algorithms.",
    students: 94,
    materials: 28,
    assignments: 10,
    quizzes: 6,
    avgGrade: "B",
    avgScore: 84,
    completion: 78,
    term: "Spring 2023",
    status: "active",
    schedule: "Tue, Thu 2:00 - 3:30 PM",
    location: "Engineering Building, Room 205",
  };
  
  // Mock leaderboard data
  const leaderboard = [
    { 
      id: 1, 
      rank: 1,
      name: "Emily Rodriguez", 
      avatar: "/avatars/emily-rodriguez.png", 
      avatarFallback: "ER",
      totalPoints: 2950,
      avgScore: 96,
      assignmentsCompleted: 10,
      badge: "🏆 Top Performer"
    },
    { 
      id: 2, 
      rank: 2,
      name: "Michael Chang", 
      avatar: "/avatars/michael-chang.png", 
      avatarFallback: "MC",
      totalPoints: 2820,
      avgScore: 93,
      assignmentsCompleted: 10,
      badge: "🥈 Excellence"
    },
    { 
      id: 3, 
      rank: 3,
      name: "Jessica Thompson", 
      avatar: "/avatars/jessica-thompson.png", 
      avatarFallback: "JT",
      totalPoints: 2680,
      avgScore: 89,
      assignmentsCompleted: 9,
      badge: "🥉 High Achiever"
    },
    { 
      id: 4, 
      rank: 4,
      name: "Ryan Martinez", 
      avatar: "/avatars/ryan-martinez.png", 
      avatarFallback: "RM",
      totalPoints: 2550,
      avgScore: 87,
      assignmentsCompleted: 9,
      badge: "⭐ Great Work"
    },
    { 
      id: 5, 
      rank: 5,
      name: "Sophia Lee", 
      avatar: "/avatars/sophia-lee.png", 
      avatarFallback: "SL",
      totalPoints: 2280,
      avgScore: 79,
      assignmentsCompleted: 8,
      badge: "📈 Improving"
    },
  ];
  
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem",
        "--header-height": "4rem",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="/professor/courses">
                      <ChevronLeft className="h-4 w-4" />
                    </Link>
                  </Button>
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">{course.code}: {course.title}</h1>
                    <p className="text-muted-foreground">
                      {course.term} • {course.schedule} • {course.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Course
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Students Enrolled
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{course.students}</div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((course.students / 150) * 100)}% of capacity
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Average Grade
                    </CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{course.avgGrade} ({course.avgScore}%)</div>
                    <p className="text-xs text-muted-foreground">
                      Across all assignments
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Course Completion
                    </CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{course.completion}%</div>
                    <Progress value={course.completion} className="h-2 mt-2" />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Course Materials
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{course.materials}</div>
                    <p className="text-xs text-muted-foreground">
                      {course.assignments} assignments, {course.quizzes} quizzes
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Course Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{course.description}</p>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="leaderboards" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="leaderboards" className="space-y-4">
                  <div className="flex justify-end">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Leaderboard
                    </Button>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Leaderboards</CardTitle>
                      <CardDescription>
                        View and manage all leaderboards for this course
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {leaderboard.map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                          >
                            <div className="flex items-start gap-3">
                              <div className="bg-primary/10 p-2 rounded-md">
                                <Trophy className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  Rank: {student.rank}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-sm">
                                  {student.totalPoints > 0 ? (
                                    <>
                                      <span className="font-medium">{student.totalPoints}</span> points
                                    </>
                                  ) : "No points"}
                                </div>
                                {student.avgScore > 0 && (
                                  <div className="text-sm text-muted-foreground">
                                    Avg: {student.avgScore}%
                                  </div>
                                )}
                              </div>
                              <Badge
                                className={
                                  student.badge === "🏆 Top Performer"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    : student.badge === "🥈 Excellence"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                    : student.badge === "🥉 High Achiever"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                    : student.badge === "⭐ Great Work"
                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                }
                              >
                                {student.badge}
                              </Badge>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="students" className="space-y-4">
                  <div className="flex justify-end">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Students
                    </Button>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Roster</CardTitle>
                      <CardDescription>
                        Showing 5 of {course.students} students
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {leaderboard.map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.avatarFallback}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground">
                                  Last active: Today
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="font-medium">
                                  {student.avgScore}%
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="materials" className="space-y-4">
                  <div className="flex justify-end">
                    <Button>
                      <UploadCloud className="h-4 w-4 mr-2" />
                      Upload Materials
                    </Button>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Materials</CardTitle>
                      <CardDescription>
                        Upload and manage course materials, lectures, and resources
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center h-40 border rounded-lg bg-muted/20">
                        <div className="text-center">
                          <p className="text-muted-foreground mb-2">Materials view to be implemented</p>
                          <Button variant="outline">
                            <UploadCloud className="h-4 w-4 mr-2" />
                            Upload Files
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Analytics</CardTitle>
                      <CardDescription>
                        Performance and engagement metrics for the course
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center h-40 border rounded-lg bg-muted/20">
                        <div className="text-center">
                          <p className="text-muted-foreground mb-2">Analytics view to be implemented</p>
                          <Button variant="outline">
                            <BarChart className="h-4 w-4 mr-2" />
                            Generate Report
                          </Button>
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
  )
} 