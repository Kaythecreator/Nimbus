"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Bell, 
  Settings, 
  BookOpen,
  Calendar,
  Mail,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  X
} from "lucide-react";
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function StudentNotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    {
      id: 1,
      type: "assignment",
      title: "Assignment Due Tomorrow",
      message: "Your Binary Trees Implementation assignment for CS-101 is due tomorrow at 11:59 PM.",
      course: "Computer Science Fundamentals",
      timestamp: "2 hours ago",
      read: false,
      priority: "high",
      icon: BookOpen
    },
    {
      id: 2,
      type: "grade",
      title: "New Grade Posted",
      message: "Your grade for the Math Exam - Calculus has been posted. You scored 92%.",
      course: "Advanced Mathematics",
      timestamp: "4 hours ago",
      read: false,
      priority: "normal",
      icon: Award
    },
    {
      id: 3,
      type: "announcement",
      title: "Class Schedule Change",
      message: "Physics lab session has been moved from Thursday to Friday this week.",
      course: "Physics: Mechanics",
      timestamp: "1 day ago",
      read: true,
      priority: "high",
      icon: Calendar
    },
    {
      id: 4,
      type: "message",
      title: "New Message from Instructor",
      message: "Dr. Johnson has sent you a message regarding your recent assignment submission.",
      course: "Advanced Mathematics",
      timestamp: "2 days ago",
      read: true,
      priority: "normal",
      icon: Mail
    },
    {
      id: 5,
      type: "reminder",
      title: "Study Session Reminder",
      message: "Don't forget about the Physics study group session tomorrow at 4:00 PM in Library Room 205.",
      course: "Physics: Mechanics",
      timestamp: "3 days ago",
      read: true,
      priority: "low",
      icon: Clock
    },
    {
      id: 6,
      type: "system",
      title: "Course Registration Opens",
      message: "Registration for Spring 2024 courses opens Monday, January 20th at 9:00 AM.",
      course: "System",
      timestamp: "5 days ago",
      read: false,
      priority: "normal",
      icon: Info
    }
  ];

  const settings = {
    emailNotifications: true,
    pushNotifications: true,
    assignmentReminders: true,
    gradeNotifications: true,
    announcementNotifications: true,
    messageNotifications: true,
    reminderNotifications: false,
    systemNotifications: true
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notification =>
    notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notification.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getNotificationsByType = (type: string) => {
    return filteredNotifications.filter(n => n.type === type);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-600";
      case "normal": return "text-blue-600";
      case "low": return "text-gray-600";
      default: return "text-gray-600";
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "normal": return "bg-blue-100 text-blue-800";
      case "low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "assignment": return BookOpen;
      case "grade": return Award;
      case "announcement": return Bell;
      case "message": return Mail;
      case "reminder": return Clock;
      case "system": return Info;
      default: return Bell;
    }
  };

  const markAsRead = (notificationId: number) => {
    // In a real app, this would update the notification in state/database
    console.log(`Mark notification ${notificationId} as read`);
  };

  const deleteNotification = (notificationId: number) => {
    // In a real app, this would delete the notification
    console.log(`Delete notification ${notificationId}`);
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
                  <h1 className="text-2xl font-bold">Notifications</h1>
                  <p className="text-muted-foreground">
                    {unreadCount} unread notifications
                  </p>
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark All as Read
                </Button>
                <Button variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>

              <Tabs defaultValue="all" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="all">All ({filteredNotifications.length})</TabsTrigger>
                  <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
                  <TabsTrigger value="assignments">Assignments</TabsTrigger>
                  <TabsTrigger value="grades">Grades</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-4">
                  <div className="space-y-3">
                    {filteredNotifications.map((notification) => {
                      const IconComponent = notification.icon;
                      return (
                        <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`p-2 rounded-full bg-gray-100 ${getPriorityColor(notification.priority)}`}>
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                                      {notification.title}
                                    </h4>
                                    <Badge variant="outline" className={getPriorityBadge(notification.priority)}>
                                      {notification.priority}
                                    </Badge>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                                    )}
                                  </div>
                                  <p className={`text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'} mb-2`}>
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>{notification.course}</span>
                                    <span>•</span>
                                    <span>{notification.timestamp}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {!notification.read && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="unread" className="space-y-4">
                  <div className="space-y-3">
                    {filteredNotifications.filter(n => !n.read).map((notification) => {
                      const IconComponent = notification.icon;
                      return (
                        <Card key={notification.id} className="border-l-4 border-l-primary">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`p-2 rounded-full bg-gray-100 ${getPriorityColor(notification.priority)}`}>
                                  <IconComponent className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-semibold">{notification.title}</h4>
                                    <Badge variant="outline" className={getPriorityBadge(notification.priority)}>
                                      {notification.priority}
                                    </Badge>
                                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  </div>
                                  <p className="text-sm text-foreground mb-2">{notification.message}</p>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span>{notification.course}</span>
                                    <span>•</span>
                                    <span>{notification.timestamp}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteNotification(notification.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="assignments" className="space-y-4">
                  <div className="space-y-3">
                    {getNotificationsByType("assignment").map((notification) => (
                      <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`p-2 rounded-full bg-orange-100 text-orange-600`}>
                                <BookOpen className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`font-medium mb-1 ${!notification.read ? 'font-semibold' : ''}`}>
                                  {notification.title}
                                </h4>
                                <p className={`text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'} mb-2`}>
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>{notification.course}</span>
                                  <span>•</span>
                                  <span>{notification.timestamp}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="grades" className="space-y-4">
                  <div className="space-y-3">
                    {getNotificationsByType("grade").map((notification) => (
                      <Card key={notification.id} className={`${!notification.read ? 'border-l-4 border-l-primary' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`p-2 rounded-full bg-green-100 text-green-600`}>
                                <Award className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`font-medium mb-1 ${!notification.read ? 'font-semibold' : ''}`}>
                                  {notification.title}
                                </h4>
                                <p className={`text-sm ${!notification.read ? 'text-foreground' : 'text-muted-foreground'} mb-2`}>
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>{notification.course}</span>
                                  <span>•</span>
                                  <span>{notification.timestamp}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>Manage how you receive notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Delivery Methods</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <label className="text-sm font-medium">Email Notifications</label>
                              <p className="text-xs text-muted-foreground">
                                Receive notifications via email
                              </p>
                            </div>
                            <Switch defaultChecked={settings.emailNotifications} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <label className="text-sm font-medium">Push Notifications</label>
                              <p className="text-xs text-muted-foreground">
                                Receive push notifications in your browser
                              </p>
                            </div>
                            <Switch defaultChecked={settings.pushNotifications} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Notification Types</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <label className="text-sm font-medium">Assignment Reminders</label>
                              <p className="text-xs text-muted-foreground">
                                Get reminded about upcoming assignments
                              </p>
                            </div>
                            <Switch defaultChecked={settings.assignmentReminders} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <label className="text-sm font-medium">Grade Notifications</label>
                              <p className="text-xs text-muted-foreground">
                                Be notified when new grades are posted
                              </p>
                            </div>
                            <Switch defaultChecked={settings.gradeNotifications} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <label className="text-sm font-medium">Course Announcements</label>
                              <p className="text-xs text-muted-foreground">
                                Receive course announcements from instructors
                              </p>
                            </div>
                            <Switch defaultChecked={settings.announcementNotifications} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <label className="text-sm font-medium">Messages</label>
                              <p className="text-xs text-muted-foreground">
                                Get notified of new messages from instructors
                              </p>
                            </div>
                            <Switch defaultChecked={settings.messageNotifications} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <label className="text-sm font-medium">Study Reminders</label>
                              <p className="text-xs text-muted-foreground">
                                Receive reminders for study sessions and events
                              </p>
                            </div>
                            <Switch defaultChecked={settings.reminderNotifications} />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <label className="text-sm font-medium">System Updates</label>
                              <p className="text-xs text-muted-foreground">
                                Important system announcements and updates
                              </p>
                            </div>
                            <Switch defaultChecked={settings.systemNotifications} />
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <Button>Save Preferences</Button>
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