import { AlertCircle, ArrowRight } from "lucide-react"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Sample at-risk student data
const atRiskStudents = [
  {
    id: 1,
    initials: "AJ",
    name: "Alex Johnson",
    course: "CS101",
    issue: "Missing 3 consecutive quizzes",
    lastActivity: "14 days ago",
    risk: "high",
  },
  {
    id: 2,
    initials: "SL",
    name: "Samantha Lee",
    course: "CS201",
    issue: "Performance below 60% threshold",
    lastActivity: "2 days ago",
    risk: "medium",
  },
  {
    id: 3,
    initials: "MC",
    name: "Michael Chen",
    course: "CS150",
    issue: "No login for over 3 weeks",
    lastActivity: "23 days ago",
    risk: "high",
  },
]

export function AtRiskStudents() {
  return (
    <div className="space-y-4">
      {atRiskStudents.map((student) => (
        <Card key={student.id} className="border rounded-xl p-5">
          <CardContent className="p-0">
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 text-xs">
                  <AvatarFallback className="bg-gray-100 text-gray-800">{student.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{student.name}</h3>
                  <p className="text-sm text-gray-500">Course: {student.course}</p>
                </div>
              </div>
              <Badge 
                className={`rounded-full ${
                  student.risk === "high" ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                }`}
              >
                {student.risk === "high" ? "High Risk" : "Medium Risk"}
              </Badge>
            </div>
            
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-gray-700">{student.issue}</span>
              </div>
              <p className="text-sm text-gray-500">Last activity: {student.lastActivity}</p>
            </div>
            
            <div className="flex justify-between">
              <Button variant="ghost" className="h-9 px-4 text-sm font-medium">
                Send Message
              </Button>
              <Button variant="outline" className="h-9 px-4 text-sm font-medium flex items-center">
                View Details
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 