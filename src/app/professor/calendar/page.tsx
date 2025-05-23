import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function CalendarPage() {
  // Mock calendar data
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  const currentMonth = "May";
  const currentYear = "2023";
  
  // Mock events
  const events = [
    { date: 5, title: "CS101 - Midterm Exam", type: "exam", time: "10:00 AM - 12:00 PM" },
    { date: 12, title: "Office Hours", type: "meeting", time: "2:00 PM - 4:00 PM" },
    { date: 15, title: "Department Meeting", type: "meeting", time: "11:00 AM - 12:30 PM" },
    { date: 18, title: "CS250 - Project Presentations", type: "presentation", time: "3:00 PM - 5:00 PM" },
    { date: 22, title: "CS201 - Final Exam", type: "exam", time: "9:00 AM - 11:00 AM" },
    { date: 25, title: "Faculty Meeting", type: "meeting", time: "1:00 PM - 3:00 PM" },
    { date: 28, title: "Grade Submission Deadline", type: "deadline", time: "11:59 PM" },
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
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
                  <p className="text-muted-foreground">
                    Schedule and manage your academic events
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Select defaultValue="month">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="day">Day</SelectItem>
                      <SelectItem value="week">Week</SelectItem>
                      <SelectItem value="month">Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Event
                  </Button>
                </div>
              </div>

              <Card>
                <CardHeader className="px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {currentMonth} {currentYear}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Calendar header - days of week */}
                  <div className="grid grid-cols-7 border-b">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div 
                        key={day} 
                        className="p-3 text-center text-sm font-medium text-muted-foreground"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar grid */}
                  <div className="grid grid-cols-7 h-[700px]">
                    {days.map((day) => {
                      const dayEvents = events.filter((event) => event.date === day);
                      const isCurrentMonth = day > 0 && day <= 31;
                      const isToday = day === 22; // Just for demo
                      
                      return (
                        <div 
                          key={day} 
                          className={`border-r border-b p-2 ${isCurrentMonth ? "" : "opacity-50 bg-muted/20"} ${isToday ? "bg-primary/10" : ""}`}
                        >
                          <div className={`flex justify-between items-start h-full flex-col`}>
                            <div className="w-full">
                              <span className={`text-sm font-medium ${isToday ? "bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center" : ""}`}>
                                {day <= 31 ? day : day - 31}
                              </span>
                            </div>
                            <div className="w-full flex-1 mt-1">
                              {dayEvents.map((event, index) => (
                                <div 
                                  key={index}
                                  className={`mb-1 p-1 text-xs rounded cursor-pointer hover:opacity-80
                                    ${event.type === 'exam' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : ''}
                                    ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                                    ${event.type === 'presentation' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                                    ${event.type === 'deadline' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                                  `}
                                >
                                  <div className="font-medium">{event.title}</div>
                                  <div>{event.time}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Your scheduled events for the next 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {events
                        .filter(event => event.date >= 22 && event.date <= 28)
                        .map((event, index) => (
                          <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                            <div className="bg-primary/10 p-2 rounded-md">
                              <CalendarIcon className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{event.title}</div>
                              <div className="text-sm text-muted-foreground">
                                May {event.date}, 2023 • {event.time}
                              </div>
                            </div>
                            <Badge 
                              variant="outline"
                              className={`
                                ${event.type === 'exam' ? 'border-red-200 text-red-800 dark:border-red-800 dark:text-red-300' : ''}
                                ${event.type === 'meeting' ? 'border-blue-200 text-blue-800 dark:border-blue-800 dark:text-blue-300' : ''}
                                ${event.type === 'presentation' ? 'border-green-200 text-green-800 dark:border-green-800 dark:text-green-300' : ''}
                                ${event.type === 'deadline' ? 'border-amber-200 text-amber-800 dark:border-amber-800 dark:text-amber-300' : ''}
                              `}
                            >
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Canvas Integration</CardTitle>
                    <CardDescription>Sync your Canvas calendar with Nimbus</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Canvas Calendar</div>
                          <div className="text-sm text-muted-foreground">
                            Import your Canvas events
                          </div>
                        </div>
                        <Button variant="outline">Sync Now</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Auto-Sync</div>
                          <div className="text-sm text-muted-foreground">
                            Keep your calendars in sync
                          </div>
                        </div>
                        <Button variant="outline">Configure</Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">Export Calendar</div>
                          <div className="text-sm text-muted-foreground">
                            Export to iCal or Google Calendar
                          </div>
                        </div>
                        <Button variant="outline">Export</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}