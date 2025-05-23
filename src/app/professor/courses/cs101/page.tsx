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
  Users 
} from "lucide-react"
import Link from "next/link"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function CourseDetailPage() {
  // Mock course data
  const course = {
    id: "cs101",
    code: "CS101",
    title: "Introduction to Computer Science",
    description: "This course provides a broad introduction to computer science and programming. Students will learn fundamental concepts of computing, basic programming skills, and problem-solving techniques.",
    students: 125,
    materials: 32,
    assignments: 8,
    quizzes: 5,
    avgGrade: "B+",
    avgScore: 87,
    completion: 75,
    term: "Spring 2023",
    status: "active",
    schedule: "Mon, Wed, Fri 10:00 - 11:15 AM",
    location: "Science Building, Room 301",
  };
  
  // Mock assignment data
  const assignments = [
    { 
      id: 1, 
      title: "Variables and Basic Operations", 
      dueDate: "Feb 12, 2023", 
      status: "Completed", 
      submissions: 125, 
      avgScore: 92 
    },
    { 
      id: 2, 
      title: "Control Structures", 
      dueDate: "Feb 26, 2023", 
      status: "Completed", 
      submissions: 122, 
      avgScore: 88 
    },
    { 
      id: 3, 
      title: "Functions and Parameters", 
      dueDate: "Mar 15, 2023", 
      status: "Completed", 
      submissions: 120, 
      avgScore: 85 
    },
    { 
      id: 4, 
      title: "Arrays and Collections", 
      dueDate: "Apr 2, 2023", 
      status: "Completed", 
      submissions: 118, 
      avgScore: 83 
    },
    { 
      id: 5, 
      title: "Object-Oriented Programming", 
      dueDate: "Apr 18, 2023", 
      status: "In Progress", 
      submissions: 110, 
      avgScore: 84 
    },
    { 
      id: 6, 
      title: "File I/O and Exception Handling", 
      dueDate: "May 5, 2023", 
      status: "Upcoming", 
      submissions: 0, 
      avgScore: 0 
    },
    { 
      id: 7, 
      title: "Recursion and Algorithms", 
      dueDate: "May 15, 2023", 
      status: "Upcoming", 
      submissions: 0, 
      avgScore: 0 
    },
    { 
      id: 8, 
      title: "Final Project", 
      dueDate: "May 30, 2023", 
      status: "Upcoming", 
      submissions: 0, 
      avgScore: 0 
    },
  ];
  
  // Mock student data
  const students = [
    { id: 1, name: "Alex Johnson", avatar: "/avatars/alex-johnson.png", avatarFallback: "AJ", grade: "A", score: 94, attendance: 100, lastActive: "Today" },
    { id: 2, name: "Maria Garcia", avatar: "/avatars/maria-garcia.png", avatarFallback: "MG", grade: "A-", score: 91, attendance: 95, lastActive: "Yesterday" },
    { id: 3, name: "James Wilson", avatar: "/avatars/james-wilson.png", avatarFallback: "JW", grade: "B+", score: 87, attendance: 90, lastActive: "2 days ago" },
    { id: 4, name: "Sarah Chen", avatar: "/avatars/sarah-chen.png", avatarFallback: "SC", grade: "B", score: 85, attendance: 85, lastActive: "Today" },
    { id: 5, name: "David Kim", avatar: "/avatars/david-kim.png", avatarFallback: "DK", grade: "C+", score: 77, attendance: 75, lastActive: "3 days ago" },
  ];
  
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem",
        "--header-height": "4rem",
      } as React.CSSProperties}
    >
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <AppSidebar />
        <div className="flex flex-col">
          <SiteHeader />
          <main className="flex-1 p-6">
            <div className="space-y-6">
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
              
              <Tabs defaultValue="assignments" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="assignments" className="space-y-4">
                  <div className="flex justify-end">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Assignment
                    </Button>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Assignments</CardTitle>
                      <CardDescription>
                        View and manage all assignments for this course
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {assignments.map((assignment) => (
                          <div
                            key={assignment.id}
                            className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                          >
                            <div className="flex items-start gap-3">
                              <div className="bg-primary/10 p-2 rounded-md">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">{assignment.title}</div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <CalendarClock className="h-3.5 w-3.5" />
                                  <span>Due: {assignment.dueDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-sm">
                                  {assignment.submissions > 0 ? (
                                    <>
                                      <span className="font-medium">{assignment.submissions}</span> submissions
                                    </>
                                  ) : "No submissions"}
                                </div>
                                {assignment.avgScore > 0 && (
                                  <div className="text-sm text-muted-foreground">
                                    Avg: {assignment.avgScore}%
                                  </div>
                                )}
                              </div>
                              <Badge
                                className={
                                  assignment.status === "Completed"
                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                    : assignment.status === "In Progress"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                }
                              >
                                {assignment.status}
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
                        {students.map((student) => (
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
                                  Last active: {student.lastActive}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="font-medium">
                                  {student.grade} ({student.score}%)
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {student.attendance}% attendance
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
} 