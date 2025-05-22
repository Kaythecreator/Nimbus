import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  BookOpen, 
  ChevronRight, 
  FileText, 
  GraduationCap, 
  LineChart,
  Plus, 
  Search, 
  Settings, 
  Users 
} from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  // Mock courses data
  const courses = [
    {
      id: "cs101",
      code: "CS101",
      title: "Introduction to Computer Science",
      students: 125,
      materials: 32,
      assignments: 8,
      quizzes: 5,
      avgGrade: "B+",
      avgScore: 87,
      term: "Spring 2023",
      status: "active",
    },
    {
      id: "cs201",
      code: "CS201",
      title: "Data Structures and Algorithms",
      students: 94,
      materials: 28,
      assignments: 10,
      quizzes: 6,
      avgGrade: "B",
      avgScore: 84,
      term: "Spring 2023",
      status: "active",
    },
    {
      id: "cs150",
      code: "CS150",
      title: "Web Development Fundamentals",
      students: 110,
      materials: 36,
      assignments: 12,
      quizzes: 4,
      avgGrade: "A-",
      avgScore: 91,
      term: "Spring 2023",
      status: "active",
    },
    {
      id: "cs250",
      code: "CS250",
      title: "Database Management",
      students: 86,
      materials: 24,
      assignments: 9,
      quizzes: 5,
      avgGrade: "B+",
      avgScore: 88,
      term: "Spring 2023",
      status: "active",
    },
    {
      id: "cs300",
      code: "CS300",
      title: "Algorithms",
      students: 72,
      materials: 30,
      assignments: 11,
      quizzes: 7,
      avgGrade: "B",
      avgScore: 85,
      term: "Spring 2023",
      status: "active",
    },
    {
      id: "cs220",
      code: "CS220",
      title: "Software Engineering",
      students: 98,
      materials: 40,
      assignments: 15,
      quizzes: 8,
      avgGrade: "B+",
      avgScore: 86,
      term: "Fall 2022",
      status: "archived",
    },
    {
      id: "cs110",
      code: "CS110",
      title: "Programming Basics",
      students: 135,
      materials: 25,
      assignments: 10,
      quizzes: 4,
      avgGrade: "B",
      avgScore: 83,
      term: "Fall 2022",
      status: "archived",
    },
  ];

  // Calculate summary statistics
  const totalStudents = courses.filter(c => c.status === "active").reduce((acc, course) => acc + course.students, 0);
  const totalCourses = courses.filter(c => c.status === "active").length;
  const avgClassSize = Math.round(totalStudents / totalCourses);
  const totalAssignments = courses.filter(c => c.status === "active").reduce((acc, course) => acc + course.assignments, 0);

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AppSidebar />
      <div className="flex flex-col">
        <SiteHeader />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                <p className="text-muted-foreground">
                  Manage your courses and student enrollments
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search courses..." className="pl-8 w-64" />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Course
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Active Courses
                  </CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCourses}</div>
                  <p className="text-xs text-muted-foreground">
                    Spring 2023 Semester
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Students
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStudents}</div>
                  <p className="text-xs text-muted-foreground">
                    Across all active courses
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Class Size
                  </CardTitle>
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{avgClassSize}</div>
                  <p className="text-xs text-muted-foreground">
                    Students per course
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Assignments
                  </CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalAssignments}</div>
                  <p className="text-xs text-muted-foreground">
                    Across all active courses
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Tabs defaultValue="active" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active Courses</TabsTrigger>
                <TabsTrigger value="archived">Archived Courses</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Courses</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {courses
                    .filter(course => course.status === "active")
                    .map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="font-normal">
                              {course.term}
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardTitle className="text-xl">{course.code}</CardTitle>
                          <CardDescription className="line-clamp-1">
                            {course.title}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{course.students} Students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{course.materials} Materials</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <LineChart className="h-4 w-4 text-muted-foreground" />
                              <span>Avg: {course.avgGrade} ({course.avgScore}%)</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-4 border-t">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/professor/courses/${course.id}`}>
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Users className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <LineChart className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="archived" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {courses
                    .filter(course => course.status === "archived")
                    .map((course) => (
                      <Card key={course.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="font-normal">
                              {course.term}
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </div>
                          <CardTitle className="text-xl">{course.code}</CardTitle>
                          <CardDescription className="line-clamp-1">
                            {course.title}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{course.students} Students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span>{course.materials} Materials</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <LineChart className="h-4 w-4 text-muted-foreground" />
                              <span>Avg: {course.avgGrade} ({course.avgScore}%)</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between pt-4 border-t">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/professor/courses/${course.id}`}>
                              View Details
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Link>
                          </Button>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Users className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <LineChart className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="upcoming" className="space-y-4">
                <div className="flex items-center justify-center h-40 border rounded-lg bg-muted/20">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">No upcoming courses found</p>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Course
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
} 