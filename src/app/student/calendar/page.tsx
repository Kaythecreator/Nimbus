"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Clock, MapPin, Users, BookOpen } from "lucide-react";
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function StudentCalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const events = [
    {
      id: 1,
      title: "Math Exam - Calculus",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "exam",
      location: "Room 301",
      course: "Advanced Mathematics"
    },
    {
      id: 2,
      title: "CS Lab Session",
      date: "2024-01-16",
      time: "2:00 PM",
      type: "lab",
      location: "Computer Lab B",
      course: "Computer Science"
    },
    {
      id: 3,
      title: "Physics Study Group",
      date: "2024-01-17",
      time: "4:00 PM",
      type: "study",
      location: "Library Room 205",
      course: "Physics: Mechanics"
    },
    {
      id: 4,
      title: "Assignment Due: Data Structures",
      date: "2024-01-18",
      time: "11:59 PM",
      type: "assignment",
      location: "Online Submission",
      course: "Computer Science"
    },
    {
      id: 5,
      title: "Office Hours - Dr. Johnson",
      date: "2024-01-19",
      time: "3:00 PM",
      type: "office-hours",
      location: "Faculty Office 420",
      course: "Advanced Mathematics"
    }
  ];

  const todayEvents = events.filter(event => {
    const today = new Date().toISOString().split('T')[0];
    return event.date === today;
  });

  const upcomingEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.date);
    return eventDate > today;
  }).slice(0, 5);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "exam": return "bg-red-100 text-red-800 border-red-200";
      case "lab": return "bg-blue-100 text-blue-800 border-blue-200";
      case "study": return "bg-green-100 text-green-800 border-green-200";
      case "assignment": return "bg-orange-100 text-orange-800 border-orange-200";
      case "office-hours": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "exam": return <BookOpen className="h-3 w-3" />;
      case "lab": return <Users className="h-3 w-3" />;
      case "study": return <Users className="h-3 w-3" />;
      case "assignment": return <Clock className="h-3 w-3" />;
      case "office-hours": return <MapPin className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
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
                  <h1 className="text-2xl font-bold">Calendar</h1>
                  <p className="text-muted-foreground">Manage your study schedule and events</p>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar and Today's Events */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendar</CardTitle>
                      <CardDescription>View and manage your academic schedule</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md"
                      />
                    </CardContent>
                  </Card>

                  <Tabs defaultValue="today" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="today">Today's Events</TabsTrigger>
                      <TabsTrigger value="week">This Week</TabsTrigger>
                      <TabsTrigger value="month">This Month</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="today" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Today's Schedule</CardTitle>
                          <CardDescription>
                            {todayEvents.length} events scheduled for today
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {todayEvents.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">
                              No events scheduled for today. Enjoy your free time!
                            </p>
                          ) : (
                            <div className="space-y-3">
                              {todayEvents.map((event) => (
                                <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                                  <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-full ${getEventTypeColor(event.type)}`}>
                                      {getEventTypeIcon(event.type)}
                                    </div>
                                    <div>
                                      <h4 className="font-medium">{event.title}</h4>
                                      <p className="text-sm text-muted-foreground">{event.course}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">{event.time}</p>
                                    <p className="text-sm text-muted-foreground">{event.location}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="week" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>This Week's Events</CardTitle>
                          <CardDescription>All events for the current week</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {events.map((event) => (
                              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-full ${getEventTypeColor(event.type)}`}>
                                    {getEventTypeIcon(event.type)}
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{event.title}</h4>
                                    <p className="text-sm text-muted-foreground">{event.course}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{event.date} at {event.time}</p>
                                  <p className="text-sm text-muted-foreground">{event.location}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    
                    <TabsContent value="month" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Monthly Overview</CardTitle>
                          <CardDescription>Summary of events by type this month</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-red-600">2</div>
                              <div className="text-sm text-muted-foreground">Exams</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-blue-600">5</div>
                              <div className="text-sm text-muted-foreground">Lab Sessions</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-orange-600">8</div>
                              <div className="text-sm text-muted-foreground">Assignments</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-green-600">3</div>
                              <div className="text-sm text-muted-foreground">Study Groups</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-purple-600">4</div>
                              <div className="text-sm text-muted-foreground">Office Hours</div>
                            </div>
                            <div className="text-center p-4 border rounded-lg">
                              <div className="text-2xl font-bold text-gray-600">22</div>
                              <div className="text-sm text-muted-foreground">Total Events</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>

                {/* Upcoming Events Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>Next 5 events on your schedule</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {upcomingEvents.map((event) => (
                          <div key={event.id} className="space-y-2 p-3 border rounded-lg">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className={getEventTypeColor(event.type)}>
                                {getEventTypeIcon(event.type)}
                                <span className="ml-1 capitalize">{event.type.replace('-', ' ')}</span>
                              </Badge>
                              <span className="text-sm text-muted-foreground">{event.date}</span>
                            </div>
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{event.time}</span>
                              <MapPin className="h-3 w-3 ml-2" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Frequently used calendar features</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule Study Session
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Add Assignment Reminder
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="h-4 w-4 mr-2" />
                        Join Study Group
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <MapPin className="h-4 w-4 mr-2" />
                        Book Office Hours
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 