"use client"

import * as React from "react"
import { Calendar as CalendarIcon, BookOpen, PlusCircle, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react"
import { format, addMonths, subMonths, getDaysInMonth, startOfMonth, getDay, parseISO } from "date-fns"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample calendar events
const events = [
  {
    id: 1,
    title: "Midterm Quiz Due",
    course: "CS101",
    date: "Today, 11:59 PM",
    type: "assignment",
  },
  {
    id: 2,
    title: "Office Hours",
    course: "CS201",
    date: "Tomorrow, 2:00-4:00 PM",
    type: "meeting",
  },
  {
    id: 3,
    title: "Project Proposal Deadline",
    course: "CS150",
    date: "Oct 15, 11:59 PM",
    type: "assignment",
  },
]

// Custom calendar component that mimics shadcn Calendar
function CustomCalendar() {
  // Use state for today's date to avoid hydration mismatch
  const [today, setToday] = React.useState(() => new Date());
  const [currentMonth, setCurrentMonth] = React.useState(() => new Date());
  
  // Initialize state after component mounts to ensure client-side only
  React.useEffect(() => {
    setToday(new Date());
    setCurrentMonth(new Date());
  }, []);
  
  // Sample dates with events (we'd typically get these from API or props)
  const datesWithEvents = [21, 22]; // Just the dates, not full Date objects
  
  const prevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };
  
  const nextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };
  
  const renderCalendarHeader = () => {
    return (
      <div className="flex items-center justify-between px-1 pb-3">
        <button 
          type="button" 
          className="p-1 opacity-70 hover:opacity-100"
          onClick={prevMonth}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <button 
          type="button" 
          className="p-1 opacity-70 hover:opacity-100"
          onClick={nextMonth}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  };
  
  const renderDaysOfWeek = () => {
    const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    
    return (
      <div className="grid grid-cols-7 text-center mb-1">
        {daysOfWeek.map((day, i) => (
          <div key={i} className="text-xs text-muted-foreground py-1">
            {day}
          </div>
        ))}
      </div>
    );
  };
  
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getDay(startOfMonth(currentMonth)); // 0-6 (Sunday-Saturday)
    
    // Create array for calendar grid
    const calendarDays = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-8 flex items-center justify-center"></div>);
    }
    
    // Add cells for days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = 
        today.getDate() === day && 
        today.getMonth() === currentMonth.getMonth() && 
        today.getFullYear() === currentMonth.getFullYear();
        
      const hasEvent = datesWithEvents.includes(day);
      
      calendarDays.push(
        <div 
          key={`day-${day}`} 
          className={cn(
            "h-8 w-8 flex items-center justify-center text-sm rounded-md mx-auto",
            isToday && "bg-primary text-primary-foreground font-medium",
            hasEvent && !isToday && "bg-primary/10 text-primary font-medium",
            !isToday && !hasEvent && "hover:bg-muted"
          )}
          suppressHydrationWarning
        >
          {day}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {calendarDays}
      </div>
    );
  };
  
  return (
    <div className="w-full">
      {renderCalendarHeader()}
      {renderDaysOfWeek()}
      {renderCalendarDays()}
    </div>
  );
}

export function MilestonesCalendar() {
  return (
    <Card className="border rounded-lg overflow-hidden p-2">
      <CardHeader className="px-4 py-3 pb-0 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
          <CardDescription>Events from Canvas and your calendar</CardDescription>
        </div>
        <div className="flex">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <CalendarIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <Tabs defaultValue="month" className="w-full">
        <div className="px-4 py-3">
          <TabsList className="w-full grid grid-cols-3 h-9 bg-muted/80 p-0.5 rounded-md">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="day" className="m-0 px-3">
          <div className="space-y-2 pt-1 pb-3">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/40 cursor-pointer transition-colors"
              >
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                  {event.type === "assignment" ? (
                    <BookOpen className="h-5 w-5" />
                  ) : (
                    <CalendarIcon className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{event.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{event.course}</span>
                    <Badge variant="outline" className="text-xs py-0 h-5 bg-transparent">
                      {event.date}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="week" className="m-0 px-3">
          <div className="space-y-2 pt-1 pb-3">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="flex items-center gap-3 p-2.5 rounded-md hover:bg-muted/40 cursor-pointer transition-colors"
              >
                <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                  {event.type === "assignment" ? (
                    <BookOpen className="h-5 w-5" />
                  ) : (
                    <CalendarIcon className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{event.title}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{event.course}</span>
                    <Badge variant="outline" className="text-xs py-0 h-5 bg-transparent">
                      {event.date}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="month" className="m-0 px-3">
          <div className="py-2">
            <CustomCalendar />
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="px-3 pb-2 pt-1">
        <Button 
          variant="outline" 
          size="default" 
          className="w-full border rounded-md bg-background text-foreground hover:bg-muted/20 h-11"
        >
          <Lightbulb className="h-4 w-4 mr-2" />
          Suggest Review Sessions
        </Button>
      </div>
    </Card>
  )
} 