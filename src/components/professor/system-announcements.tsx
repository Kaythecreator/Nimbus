import { Bell, ChevronRight, Megaphone, X } from "lucide-react"

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

// Sample announcements data
const announcements = [
  {
    id: 1,
    title: "New Feature: AI-Generated Quiz Sets",
    description: "Create custom quiz sets with our new AI-powered question generator.",
    date: "Oct 10, 2023",
    isNew: true,
  },
  {
    id: 2,
    title: "Upcoming Maintenance",
    description: "Planned maintenance on Oct 20, 2023 from 2-4 AM EST.",
    date: "Oct 8, 2023",
    isNew: false,
  },
]

export function SystemAnnouncements() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg">Announcements</CardTitle>
            <Badge variant="default" className="rounded-full h-5 px-2 text-xs">
              New
            </Badge>
          </div>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription>Platform updates and important notices</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          {announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="flex gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                announcement.isNew ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}>
                <Megaphone className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium">{announcement.title}</h4>
                  {announcement.isNew && (
                    <Badge variant="default" className="h-4 px-1 text-[10px]">NEW</Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {announcement.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {announcement.date}
                </p>
              </div>
              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-2 bg-muted/30 flex justify-between">
        <Button variant="link" size="sm" className="text-muted-foreground px-0">
          View all announcements
        </Button>
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Manage notifications
        </Button>
      </CardFooter>
    </Card>
  )
} 