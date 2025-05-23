"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Play, FileText, Clock, Users } from "lucide-react";

// Mock data for student courses
const mockCourses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    code: "MATH201",
    instructor: "Dr. Sarah Johnson",
    topicsToReview: ["Calculus", "Linear Algebra"],
    progress: 75,
    color: "bg-blue-500",
    nextClass: "Tomorrow, 2:00 PM",
    students: 45
  },
  {
    id: 2,
    title: "Computer Science Fundamentals", 
    code: "CS101",
    instructor: "Prof. Michael Chen",
    topicsToReview: ["Data Structures", "Algorithms"],
    progress: 60,
    color: "bg-green-500",
    nextClass: "Friday, 10:00 AM",
    students: 38
  },
  {
    id: 3,
    title: "Physics: Mechanics",
    code: "PHYS150",
    instructor: "Dr. Emily Rodriguez", 
    topicsToReview: ["Newton's Laws", "Energy"],
    progress: 90,
    color: "bg-purple-500",
    nextClass: "Monday, 1:00 PM",
    students: 32
  }
];

export function JoinedCourses() {
  return (
    <div className="grid grid-cols-1 gap-5 @xl/main:grid-cols-2">
      {mockCourses.map((course) => (
        <Card key={course.id} className="border rounded-lg overflow-hidden hover:shadow-sm transition-shadow p-5 h-72">
          <CardContent className="p-0 justify-between h-full flex flex-col">
            <div>
              <div className="flex items-center mb-2 justify-between">
                <div className="flex items-center gap-4">
                  <p className="text-gray-500 font-medium">{course.code}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-700 border border-gray-100 rounded-full px-2 py-1">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span>{course.nextClass}</span>
                  </div>
                </div>
                
                <Badge 
                  className={`rounded-full text-sm py-1 px-3 ${
                    course.progress >= 80 
                      ? 'bg-green-100 text-green-600' 
                      : course.progress >= 60 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-orange-100 text-orange-600'
                  }`}
                >
                  {course.progress}% Complete
                </Badge>
              </div>
              
              <h2 className="text-2xl font-bold leading-tight mb-4">
                {course.title}
              </h2>
              
              <p className="text-sm text-muted-foreground mb-3">
                Instructor: <span className="font-medium">{course.instructor}</span>
              </p>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm text-muted-foreground">Topics to review:</span>
                {course.topicsToReview.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex justify-center items-center gap-2 rounded-sm h-12 border-gray-200 bg-white hover:bg-gray-50">
                <Play className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-800">Quiz</span>
              </Button>
              <Button variant="outline" className="flex justify-center items-center gap-2 rounded-sm h-12 border-gray-200 bg-white hover:bg-gray-50">
                <FileText className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-800">Notes</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 