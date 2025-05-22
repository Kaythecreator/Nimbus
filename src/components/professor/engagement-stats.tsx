import { BarChart3, CheckCircle, Clock } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Toggle, ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function EngagementStats() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Engagement</CardTitle>
          <ToggleGroup type="single" defaultValue="todo">
            <ToggleGroupItem value="todo" size="sm" className="px-3 h-7">
              <Clock className="h-3.5 w-3.5 mr-1" />
              To Do
            </ToggleGroupItem>
            <ToggleGroupItem value="done" size="sm" className="px-3 h-7">
              <CheckCircle className="h-3.5 w-3.5 mr-1" />
              Done
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <CardDescription>Student participation and progress</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-4">
          <div className="flex justify-between items-center text-sm mb-1">
            <span>Completion Rate</span>
            <span className="font-medium">78%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: "78%" }}></div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-100 dark:bg-blue-950 text-primary flex items-center justify-center rounded-md">
                <BarChart3 className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium">Quiz Activity</div>
                <div className="text-xs text-muted-foreground">Last 7 days</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">42 Quizzes</div>
              <div className="text-xs text-muted-foreground">Avg. Score: 76%</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400 flex items-center justify-center rounded-md">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium">Assignments</div>
                <div className="text-xs text-muted-foreground">Last 7 days</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">18 Submissions</div>
              <div className="text-xs text-muted-foreground">85% On-time</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 flex items-center justify-center rounded-md">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-medium">Time Spent</div>
                <div className="text-xs text-muted-foreground">Last 7 days</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">36.5 Hours</div>
              <div className="text-xs text-muted-foreground">+12% vs last week</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button size="sm" className="w-full">View Detailed Analytics</Button>
      </CardFooter>
    </Card>
  )
} 