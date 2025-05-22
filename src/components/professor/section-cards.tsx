import { Crown, FolderClosed, BarChart2, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Sample course data
const courses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    code: "CS101",
    students: 125,
    avgScore: 82,
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    code: "CS201",
    students: 94,
    avgScore: 78,
  },
  {
    id: 3,
    title: "Web Development Fundamentals",
    code: "CS150",
    students: 110,
    avgScore: 88,
  },
  {
    id: 4,
    title: "Database Management",
    code: "CS250",
    students: 86,
    avgScore: 75,
  },
]

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-5 @xl/main:grid-cols-2">
      {courses.map((course) => (
        <Card key={course.id} className="border rounded-lg overflow-hidden hover:shadow-sm transition-shadow p-5 h-72">
          <CardContent className="p-0 justify-between h-full flex flex-col">
            <div>
            <div className="flex items-center mb-2 justify-between">
              <div className="flex items-center gap-4">
                <p className="text-gray-500 font-medium">{course.code}</p>
                <div className="flex items-center gap-1 text-xs text-gray-700 border border-gray-100 rounded-full px-2 py-1">
                  <Users className="h-3 w-3 text-gray-500" />
                  <span>{course.students} Students</span>
                </div>
              </div>
              
              <Badge 
                className={`rounded-full text-sm py-1 px-3 ${
                  course.avgScore >= 80 
                    ? 'bg-green-100 text-green-600' 
                    : course.avgScore >= 60 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-orange-100 text-orange-600'
                }`}
              >
                {course.avgScore}%
              </Badge>
            </div>
            
            <h2 className="text-2xl font-bold leading-tight mb-6">
              {course.title}
            </h2>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="flex justify-center items-center gap-2 rounded-b-sm h-12 border-gray-200 bg-white hover:bg-gray-50">
                <Crown className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-800">Leaderboard</span>
              </Button>
              <Button variant="outline" className="flex justify-center items-center gap-2 rounded-sm h-12 border-gray-200 bg-white hover:bg-gray-50">
                <FolderClosed className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-800">Materials</span>
              </Button>
              <Button variant="outline" className="flex justify-center items-center gap-2 rounded-sm h-12 border-gray-200 bg-white hover:bg-gray-50 col-span-2">
                <BarChart2 className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-800">Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 