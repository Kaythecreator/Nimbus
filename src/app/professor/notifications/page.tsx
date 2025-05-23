import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { 
  Bell, 
  BookOpen, 
  Calendar, 
  Check, 
  Filter, 
  GraduationCap, 
  InfoIcon, 
  Settings, 
  Trash2, 
  User2, 
  Users, 
  X 
} from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function NotificationsPage() {
  // Mock notifications data
  const notifications = [
    { 
      id: 1,
      title: "New Assignment Submissions",
      description: "5 students have submitted their assignments for CS101.",
      timestamp: "10 minutes ago",
      read: false,
      type: "submission",
      course: "CS101"
    },
    { 
      id: 2,
      title: "Upcoming Deadline",
      description: "The midterm project for CS250 is due in 2 days.",
      timestamp: "1 hour ago",
      read: false,
      type: "deadline",
      course: "CS250"
    },
    { 
      id: 3,
      title: "Student Message",
      description: "Alex Johnson has sent you a message regarding the final project.",
      timestamp: "3 hours ago",
      read: true,
      type: "message",
      course: "CS101"
    },
    { 
      id: 4,
      title: "Department Meeting",
      description: "Reminder: Faculty meeting tomorrow at 2:00 PM in Room 301.",
      timestamp: "Yesterday",
      read: true,
      type: "event",
      course: null
    },
    { 
      id: 5,
      title: "Canvas Integration",
      description: "Your Canvas grades have been successfully synced with the platform.",
      timestamp: "Yesterday",
      read: true,
      type: "system",
      course: null
    },
    { 
      id: 6,
      title: "At-Risk Student Alert",
      description: "Michael Lee has missed multiple assignments in CS201.",
      timestamp: "2 days ago",
      read: true,
      type: "alert",
      course: "CS201"
    },
    { 
      id: 7,
      title: "New Feature Available",
      description: "Try the new AI-assisted grading feature for faster feedback.",
      timestamp: "3 days ago",
      read: true,
      type: "system",
      course: null
    },
    { 
      id: 8,
      title: "Grade Appeal",
      description: "Sarah Chen has requested a grade review for the latest quiz.",
      timestamp: "4 days ago",
      read: true,
      type: "alert",
      course: "CS101"
    },
  ];

  // Calculate summary statistics
  const unreadCount = notifications.filter(n => !n.read).length;
  const todayCount = notifications.filter(n => 
    n.timestamp === "10 minutes ago" || 
    n.timestamp === "1 hour ago" || 
    n.timestamp === "3 hours ago"
  ).length;
  
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
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
                  <p className="text-muted-foreground">
                    Stay updated with your courses and students
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline">
                    <Bell className="h-4 w-4 mr-2" />
                    Mark All as Read
                  </Button>
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Notification Settings
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Unread Notifications
                    </CardTitle>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{unreadCount}</div>
                    <p className="text-xs text-muted-foreground">
                      Require your attention
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Today
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{todayCount}</div>
                    <p className="text-xs text-muted-foreground">
                      Notifications from today
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Submissions
                    </CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {notifications.filter(n => n.type === "submission").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      New assignment submissions
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Student Messages
                    </CardTitle>
                    <User2 className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {notifications.filter(n => n.type === "message").length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Messages from students
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Notifications</CardTitle>
                      <CardDescription>
                        View and manage your recent notifications
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear All
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="mb-4 w-full max-w-lg">
                      <TabsTrigger value="all">
                        All
                        <Badge className="ml-2 bg-muted text-muted-foreground">{notifications.length}</Badge>
                      </TabsTrigger>
                      <TabsTrigger value="unread">
                        Unread
                        <Badge className="ml-2 bg-primary text-primary-foreground">{unreadCount}</Badge>
                      </TabsTrigger>
                      <TabsTrigger value="courses">Courses</TabsTrigger>
                      <TabsTrigger value="system">System</TabsTrigger>
                    </TabsList>
                    
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex items-start justify-between rounded-lg border p-4 ${
                            notification.read ? "" : "bg-primary/5"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-2 rounded-full ${getNotificationIconBgClass(notification.type)}`}>
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <div className={`font-medium ${notification.read ? "" : "font-semibold"}`}>
                                  {notification.title}
                                </div>
                                {!notification.read && (
                                  <Badge variant="secondary" className="text-xs font-normal">New</Badge>
                                )}
                                {notification.course && (
                                  <Badge variant="outline" className="text-xs font-normal">
                                    {notification.course}
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {notification.description}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {notification.timestamp}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Manage how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/20">
                          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-medium">Assignment Submissions</div>
                          <div className="text-sm text-muted-foreground">
                            Get notified when students submit assignments
                          </div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900/20">
                          <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <div className="font-medium">Deadline Reminders</div>
                          <div className="text-sm text-muted-foreground">
                            Receive reminders for upcoming course deadlines
                          </div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-100 rounded-full dark:bg-green-900/20">
                          <User2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="font-medium">Student Messages</div>
                          <div className="text-sm text-muted-foreground">
                            Be notified when students send you messages
                          </div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-red-100 rounded-full dark:bg-red-900/20">
                          <Users className="h-5 w-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <div className="font-medium">At-Risk Student Alerts</div>
                          <div className="text-sm text-muted-foreground">
                            Receive alerts for students who may need additional support
                          </div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900/20">
                          <InfoIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <div className="font-medium">System Announcements</div>
                          <div className="text-sm text-muted-foreground">
                            Get updates about new features and system changes
                          </div>
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}

// Helper functions to get appropriate icons and styles
function getNotificationIcon(type: string) {
  switch (type) {
    case "submission":
      return <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
    case "deadline":
      return <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
    case "message":
      return <User2 className="h-5 w-5 text-green-600 dark:text-green-400" />;
    case "alert":
      return <Users className="h-5 w-5 text-red-600 dark:text-red-400" />;
    case "event":
      return <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
    case "system":
      return <InfoIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
    default:
      return <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
  }
}

function getNotificationIconBgClass(type: string) {
  switch (type) {
    case "submission":
      return "bg-blue-100 dark:bg-blue-900/20";
    case "deadline":
      return "bg-amber-100 dark:bg-amber-900/20";
    case "message":
      return "bg-green-100 dark:bg-green-900/20";
    case "alert":
      return "bg-red-100 dark:bg-red-900/20";
    case "event":
      return "bg-purple-100 dark:bg-purple-900/20";
    case "system":
      return "bg-gray-100 dark:bg-gray-800/40";
    default:
      return "bg-gray-100 dark:bg-gray-800/40";
  }
} 