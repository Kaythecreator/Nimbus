import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Archive, Edit, Inbox, Mail, MessageSquare, Search, Star, Trash2, UserRound } from "lucide-react"

export default function InboxPage() {
  // Mock messages data
  const messages = [
    {
      id: 1,
      sender: "Alex Johnson",
      avatar: "/avatars/alex-johnson.png",
      avatarFallback: "AJ",
      subject: "Question about CS101 assignment",
      preview: "Hello Professor, I have a question about the latest programming assignment. When I try to run the code...",
      date: "Today, 10:35 AM",
      unread: true,
      flagged: false,
      category: "student"
    },
    {
      id: 2,
      sender: "Maria Garcia",
      avatar: "/avatars/maria-garcia.png",
      avatarFallback: "MG",
      subject: "Request for recommendation letter",
      preview: "Dear Professor, I am applying for a summer internship at Google and would like to request a letter of recommendation...",
      date: "Yesterday, 3:22 PM",
      unread: true,
      flagged: true,
      category: "student"
    },
    {
      id: 3,
      sender: "Department Chair",
      avatar: "/avatars/dept-chair.png",
      avatarFallback: "DC",
      subject: "Upcoming faculty meeting",
      preview: "This is a reminder that we have a faculty meeting scheduled for next Tuesday at 2:00 PM. The agenda includes...",
      date: "May 20, 2023",
      unread: false,
      flagged: true,
      category: "faculty"
    },
    {
      id: 4,
      sender: "Canvas Notifications",
      avatar: "/avatars/canvas.png",
      avatarFallback: "CN",
      subject: "New submissions for CS250 Project",
      preview: "5 students have submitted their projects for CS250. Click here to review and grade the submissions...",
      date: "May 19, 2023",
      unread: false,
      flagged: false,
      category: "system"
    },
    {
      id: 5,
      sender: "Research Committee",
      avatar: "/avatars/research-committee.png",
      avatarFallback: "RC",
      subject: "Grant proposal deadline extension",
      preview: "Dear faculty, The deadline for the annual research grant proposals has been extended to June 15th...",
      date: "May 18, 2023",
      unread: false,
      flagged: false,
      category: "faculty"
    },
    {
      id: 6,
      sender: "James Wilson",
      avatar: "/avatars/james-wilson.png",
      avatarFallback: "JW",
      subject: "Office hours next week",
      preview: "Professor, I was wondering if I could schedule a meeting during your office hours next week to discuss my final project...",
      date: "May 17, 2023",
      unread: false,
      flagged: false,
      category: "student"
    },
    {
      id: 7,
      sender: "IT Department",
      avatar: "/avatars/it-dept.png",
      avatarFallback: "IT",
      subject: "System maintenance notification",
      preview: "The university systems including Canvas and email will be undergoing maintenance this Saturday from 2 AM to 5 AM...",
      date: "May 16, 2023",
      unread: false,
      flagged: false,
      category: "system"
    },
  ];

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <AppSidebar />
      <div className="flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <div className="border-b">
            <div className="flex h-16 items-center px-4 gap-4">
              <Button variant="ghost" size="icon" className="mr-2">
                <Inbox className="h-5 w-5" />
              </Button>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-8" />
              </div>
              <Button variant="ghost" size="icon">
                <Archive className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Star className="h-5 w-5" />
              </Button>
              <Button>
                <Edit className="h-5 w-5 mr-2" />
                Compose
              </Button>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-[240px_1fr] h-[calc(100vh-9rem)]">
            {/* Sidebar */}
            <div className="border-r">
              <div className="space-y-1 p-2">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Inbox className="h-4 w-4" />
                  <span>Inbox</span>
                  <Badge className="ml-auto">3</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <UserRound className="h-4 w-4" />
                  <span>Students</span>
                  <Badge className="ml-auto">2</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Faculty</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Star className="h-4 w-4" />
                  <span>Flagged</span>
                  <Badge className="ml-auto">2</Badge>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Mail className="h-4 w-4" />
                  <span>System</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Archive className="h-4 w-4" />
                  <span>Archive</span>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Trash</span>
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex flex-col">
              <Tabs defaultValue="all" className="w-full border-b">
                <div className="px-4 pt-2">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                    <TabsTrigger value="flagged">Flagged</TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
              
              <div className="flex-1 overflow-auto">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-4 p-4 border-b hover:bg-muted/50 cursor-pointer ${message.unread ? "bg-primary/5" : ""}`}
                  >
                    <Avatar className="h-10 w-10 mt-1">
                      <AvatarImage src={message.avatar} alt={message.sender} />
                      <AvatarFallback>{message.avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <div className={`font-medium ${message.unread ? "font-semibold" : ""}`}>
                          {message.sender}
                        </div>
                        {message.unread && (
                          <Badge variant="secondary" className="text-xs font-normal">New</Badge>
                        )}
                        {message.flagged && (
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                        )}
                      </div>
                      <div className={`text-sm ${message.unread ? "font-semibold" : ""}`}>
                        {message.subject}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        {message.preview}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {message.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 