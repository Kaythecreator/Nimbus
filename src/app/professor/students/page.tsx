import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  AlertCircle, 
  ArrowUpDown, 
  BookOpen, 
  Calendar, 
  Filter, 
  GraduationCap, 
  LineChart, 
  MoreHorizontal, 
  Plus, 
  Search, 
  TrendingUp, 
  User2
} from "lucide-react"

export default function StudentsPage() {
  // Mock students data
  const students = [
    { 
      id: 1, 
      name: "Alex Johnson", 
      email: "alex.johnson@university.edu",
      avatar: "/avatars/alex-johnson.png", 
      avatarFallback: "AJ", 
      grade: "A", 
      score: 94, 
      courses: ["CS101", "CS250", "CS300"],
      attendance: 100, 
      lastActive: "Today",
      status: "good" 
    },
    { 
      id: 2, 
      name: "Maria Garcia", 
      email: "maria.garcia@university.edu",
      avatar: "/avatars/maria-garcia.png", 
      avatarFallback: "MG", 
      grade: "A-", 
      score: 91, 
      courses: ["CS101", "CS201", "CS220"],
      attendance: 95, 
      lastActive: "Yesterday",
      status: "good" 
    },
    { 
      id: 3, 
      name: "James Wilson", 
      email: "james.wilson@university.edu",
      avatar: "/avatars/james-wilson.png", 
      avatarFallback: "JW", 
      grade: "B+", 
      score: 87, 
      courses: ["CS101", "CS150"],
      attendance: 90, 
      lastActive: "2 days ago",
      status: "good" 
    },
    { 
      id: 4, 
      name: "Sarah Chen", 
      email: "sarah.chen@university.edu",
      avatar: "/avatars/sarah-chen.png", 
      avatarFallback: "SC", 
      grade: "B", 
      score: 85, 
      courses: ["CS101", "CS201", "CS250"],
      attendance: 85, 
      lastActive: "Today",
      status: "good" 
    },
    { 
      id: 5, 
      name: "David Kim", 
      email: "david.kim@university.edu",
      avatar: "/avatars/david-kim.png", 
      avatarFallback: "DK", 
      grade: "C+", 
      score: 77, 
      courses: ["CS101", "CS150"],
      attendance: 75, 
      lastActive: "3 days ago",
      status: "at-risk" 
    },
    { 
      id: 6, 
      name: "Emma Brown", 
      email: "emma.brown@university.edu",
      avatar: "/avatars/emma-brown.png", 
      avatarFallback: "EB", 
      grade: "B-", 
      score: 81, 
      courses: ["CS150", "CS250"],
      attendance: 80, 
      lastActive: "Yesterday",
      status: "good" 
    },
    { 
      id: 7, 
      name: "Michael Lee", 
      email: "michael.lee@university.edu",
      avatar: "/avatars/michael-lee.png", 
      avatarFallback: "ML", 
      grade: "D", 
      score: 67, 
      courses: ["CS101", "CS201"],
      attendance: 60, 
      lastActive: "1 week ago",
      status: "at-risk" 
    },
    { 
      id: 8, 
      name: "Sophia Martinez", 
      email: "sophia.martinez@university.edu",
      avatar: "/avatars/sophia-martinez.png", 
      avatarFallback: "SM", 
      grade: "B+", 
      score: 88, 
      courses: ["CS201", "CS300"],
      attendance: 92, 
      lastActive: "Today",
      status: "good" 
    },
  ];

  // Calculate summary statistics
  const totalStudents = students.length;
  const avgScore = Math.round(students.reduce((acc, student) => acc + student.score, 0) / totalStudents);
  const atRiskStudents = students.filter(s => s.status === "at-risk").length;
  const activeToday = students.filter(s => s.lastActive === "Today").length;
  
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AppSidebar />
      <div className="flex flex-col">
        <SiteHeader />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Students</h1>
                <p className="text-muted-foreground">
                  View and manage all your students across courses
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search students..." className="pl-8 w-64" />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Students
                  </CardTitle>
                  <User2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalStudents}</div>
                  <p className="text-xs text-muted-foreground">
                    Across all courses
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
                  <div className="text-2xl font-bold">{avgScore}%</div>
                  <p className="text-xs text-muted-foreground">
                    Class average score
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    At-Risk Students
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{atRiskStudents}</div>
                  <p className="text-xs text-muted-foreground">
                    Need additional support
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Today
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{activeToday}</div>
                  <p className="text-xs text-muted-foreground">
                    {Math.round((activeToday / totalStudents) * 100)}% of students
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex items-center justify-between">
              <Tabs defaultValue="all" className="w-full">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="all">All Students</TabsTrigger>
                    <TabsTrigger value="at-risk">At-Risk</TabsTrigger>
                    <TabsTrigger value="high-achievers">High Achievers</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="cs101">CS101</SelectItem>
                        <SelectItem value="cs150">CS150</SelectItem>
                        <SelectItem value="cs201">CS201</SelectItem>
                        <SelectItem value="cs250">CS250</SelectItem>
                        <SelectItem value="cs300">CS300</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <TabsContent value="all" className="mt-4">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Student Roster</CardTitle>
                        <Button variant="outline" size="sm">
                          <ArrowUpDown className="h-4 w-4 mr-2" />
                          Sort
                        </Button>
                      </div>
                      <CardDescription>
                        Showing all {totalStudents} students enrolled in your courses
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {students.map((student) => (
                          <div
                            key={student.id}
                            className="flex items-center justify-between rounded-lg border p-4"
                          >
                            <div className="flex items-center gap-4">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={student.avatar} alt={student.name} />
                                <AvatarFallback>{student.avatarFallback}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-muted-foreground">{student.email}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <BookOpen className="h-3.5 w-3.5" />
                                  <span>{student.courses.join(", ")}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-3.5 w-3.5" />
                                  <span>Last active: {student.lastActive}</span>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <Badge
                                  className={
                                    student.score >= 90
                                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                      : student.score >= 80
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                      : student.score >= 70
                                      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                  }
                                >
                                  {student.grade} ({student.score}%)
                                </Badge>
                                <div className="mt-1 text-xs text-muted-foreground">
                                  {student.attendance}% attendance
                                </div>
                              </div>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Showing {students.length} of {students.length} students
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">Previous</Button>
                        <Button variant="outline" size="sm">Next</Button>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="at-risk">
                  <Card>
                    <CardHeader>
                      <CardTitle>At-Risk Students</CardTitle>
                      <CardDescription>
                        Students who may need additional support
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {students
                          .filter(student => student.status === "at-risk")
                          .map((student) => (
                            <div
                              key={student.id}
                              className="flex items-center justify-between rounded-lg border p-4 bg-red-50 dark:bg-red-900/10"
                            >
                              <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={student.avatar} alt={student.name} />
                                  <AvatarFallback>{student.avatarFallback}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{student.name}</div>
                                  <div className="text-sm text-muted-foreground">{student.email}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <BookOpen className="h-3.5 w-3.5" />
                                    <span>{student.courses.join(", ")}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>Last active: {student.lastActive}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <Badge
                                    className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                  >
                                    {student.grade} ({student.score}%)
                                  </Badge>
                                  <div className="mt-1 text-xs text-muted-foreground">
                                    {student.attendance}% attendance
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="high-achievers">
                  <Card>
                    <CardHeader>
                      <CardTitle>High Achievers</CardTitle>
                      <CardDescription>
                        Students with exceptional performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {students
                          .filter(student => student.score >= 90)
                          .map((student) => (
                            <div
                              key={student.id}
                              className="flex items-center justify-between rounded-lg border p-4 bg-green-50 dark:bg-green-900/10"
                            >
                              <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={student.avatar} alt={student.name} />
                                  <AvatarFallback>{student.avatarFallback}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{student.name}</div>
                                  <div className="text-sm text-muted-foreground">{student.email}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <BookOpen className="h-3.5 w-3.5" />
                                    <span>{student.courses.join(", ")}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>Last active: {student.lastActive}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end">
                                  <Badge
                                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                  >
                                    {student.grade} ({student.score}%)
                                  </Badge>
                                  <div className="mt-1 text-xs text-muted-foreground">
                                    {student.attendance}% attendance
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
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
        </main>
      </div>
    </div>
  )
} 