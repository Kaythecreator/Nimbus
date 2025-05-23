"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Send, 
  Paperclip, 
  Star, 
  StarOff, 
  Archive,
  Trash2,
  Reply,
  Forward,
  MoreHorizontal,
  Mail,
  MessageSquare,
  Bell
} from "lucide-react";
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function StudentInboxPage() {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      senderEmail: "s.johnson@university.edu",
      subject: "Math Exam Results Available",
      preview: "Your exam results for Advanced Calculus have been posted...",
      content: "Dear Student,\n\nI'm pleased to inform you that your exam results for Advanced Calculus (MATH-201) have been posted to the course portal. You scored 92% on the exam, which is an excellent result.\n\nThe class average was 78%, so you performed well above average. Please review the feedback provided for each question.\n\nBest regards,\nDr. Sarah Johnson",
      timestamp: "2 hours ago",
      read: false,
      starred: false,
      type: "message",
      avatar: "/avatars/dr-johnson.jpg"
    },
    {
      id: 2,
      sender: "Course System",
      senderEmail: "noreply@university.edu",
      subject: "Assignment Due Tomorrow: Data Structures",
      preview: "Reminder: Your assignment for CS-101 is due tomorrow at 11:59 PM...",
      content: "This is an automated reminder that your assignment 'Binary Trees Implementation' for Computer Science Fundamentals (CS-101) is due tomorrow, January 16th, at 11:59 PM.\n\nAssignment Details:\n- Topic: Binary Trees Implementation\n- Due Date: January 16, 2024, 11:59 PM\n- Submission: Online via Course Portal\n- File Format: .zip file containing source code and documentation\n\nIf you have any questions, please contact your instructor or teaching assistant.",
      timestamp: "5 hours ago",
      read: false,
      starred: true,
      type: "notification",
      avatar: "/avatars/system.jpg"
    },
    {
      id: 3,
      sender: "Physics Study Group",
      senderEmail: "physics-sg@university.edu",
      subject: "Study Session This Friday",
      preview: "Don't forget about our study session this Friday at 4 PM...",
      content: "Hi everyone!\n\nJust a reminder about our weekly study session this Friday, January 17th, at 4:00 PM in Library Room 205.\n\nThis week we'll be covering:\n- Newton's Laws of Motion\n- Work and Energy\n- Momentum and Collisions\n\nPlease bring your textbooks and any questions you have from this week's lectures.\n\nSee you there!\nPhysics Study Group Coordinator",
      timestamp: "1 day ago",
      read: true,
      starred: false,
      type: "group",
      avatar: "/avatars/study-group.jpg"
    },
    {
      id: 4,
      sender: "Academic Advisor",
      senderEmail: "advisor@university.edu",
      subject: "Course Registration Opens Next Week",
      preview: "Course registration for the spring semester opens Monday...",
      content: "Dear Student,\n\nThis is to inform you that course registration for the Spring 2024 semester will open on Monday, January 20th, at 9:00 AM.\n\nBased on your current progress and academic standing, I recommend considering the following courses:\n- Advanced Statistics (MATH-301)\n- Database Systems (CS-201)\n- Modern Physics (PHYS-201)\n\nPlease schedule an appointment if you'd like to discuss your course selection.\n\nBest regards,\nAcademic Advisor",
      timestamp: "2 days ago",
      read: true,
      starred: false,
      type: "message",
      avatar: "/avatars/advisor.jpg"
    },
    {
      id: 5,
      sender: "Library Services",
      senderEmail: "library@university.edu",
      subject: "Book Return Reminder",
      preview: "The following books are due for return in 3 days...",
      content: "Dear Student,\n\nThis is a friendly reminder that the following books checked out under your name are due for return in 3 days (January 18th, 2024):\n\n1. 'Introduction to Algorithms' by Cormen et al.\n2. 'Linear Algebra and Its Applications' by David Lay\n3. 'University Physics' by Young & Freedman\n\nYou can return books at any library location or renew them online if no one else has placed a hold.\n\nThank you,\nLibrary Services",
      timestamp: "3 days ago",
      read: true,
      starred: false,
      type: "notification",
      avatar: "/avatars/library.jpg"
    }
  ];

  const unreadCount = messages.filter(msg => !msg.read).length;
  const starredCount = messages.filter(msg => msg.starred).length;

  const filteredMessages = messages.filter(msg =>
    msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    msg.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStar = (messageId: number) => {
    // In a real app, this would update the message in state/database
    console.log(`Toggle star for message ${messageId}`);
  };

  const markAsRead = (messageId: number) => {
    // In a real app, this would update the message read status
    console.log(`Mark message ${messageId} as read`);
  };

  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case "message": return <Mail className="h-4 w-4" />;
      case "notification": return <Bell className="h-4 w-4" />;
      case "group": return <MessageSquare className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  const getMessageTypeColor = (type: string) => {
    switch (type) {
      case "message": return "text-blue-600";
      case "notification": return "text-orange-600";
      case "group": return "text-green-600";
      default: return "text-gray-600";
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
                  <h1 className="text-2xl font-bold">Inbox</h1>
                  <p className="text-muted-foreground">
                    {unreadCount} unread messages • {starredCount} starred
                  </p>
                </div>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Compose
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Message List */}
                <div className="lg:col-span-1 space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Messages</span>
                        <Badge variant="secondary">{filteredMessages.length}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="max-h-96 overflow-y-auto">
                        {filteredMessages.map((message, index) => (
                          <div key={message.id}>
                            <div
                              className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                                selectedMessage === message.id ? 'bg-muted' : ''
                              } ${!message.read ? 'border-l-4 border-l-primary' : ''}`}
                              onClick={() => {
                                setSelectedMessage(message.id);
                                if (!message.read) markAsRead(message.id);
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={message.avatar} />
                                  <AvatarFallback>
                                    {message.sender.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className={`text-sm font-medium truncate ${!message.read ? 'font-semibold' : ''}`}>
                                      {message.sender}
                                    </p>
                                    <div className="flex items-center gap-1">
                                      <div className={`${getMessageTypeColor(message.type)}`}>
                                        {getMessageTypeIcon(message.type)}
                                      </div>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-6 w-6 p-0"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleStar(message.id);
                                        }}
                                      >
                                        {message.starred ? (
                                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                        ) : (
                                          <StarOff className="h-3 w-3" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                  <p className={`text-sm truncate ${!message.read ? 'font-medium' : 'text-muted-foreground'}`}>
                                    {message.subject}
                                  </p>
                                  <p className="text-xs text-muted-foreground truncate mt-1">
                                    {message.preview}
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {message.timestamp}
                                  </p>
                                </div>
                              </div>
                            </div>
                            {index < filteredMessages.length - 1 && <Separator />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Message Content */}
                <div className="lg:col-span-2">
                  {selectedMessage ? (
                    <Card className="h-fit">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={messages.find(m => m.id === selectedMessage)?.avatar} />
                              <AvatarFallback>
                                {messages.find(m => m.id === selectedMessage)?.sender.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">
                                {messages.find(m => m.id === selectedMessage)?.subject}
                              </CardTitle>
                              <CardDescription>
                                From: {messages.find(m => m.id === selectedMessage)?.sender} 
                                &lt;{messages.find(m => m.id === selectedMessage)?.senderEmail}&gt;
                              </CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Reply className="h-4 w-4 mr-2" />
                              Reply
                            </Button>
                            <Button variant="outline" size="sm">
                              <Forward className="h-4 w-4 mr-2" />
                              Forward
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4 text-xs text-muted-foreground">
                          Received: {messages.find(m => m.id === selectedMessage)?.timestamp}
                        </div>
                        <div className="prose prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap font-sans">
                            {messages.find(m => m.id === selectedMessage)?.content}
                          </pre>
                        </div>
                        
                        <Separator className="my-6" />
                        
                        {/* Quick Reply */}
                        <div className="space-y-4">
                          <h4 className="font-medium">Quick Reply</h4>
                          <Textarea 
                            placeholder="Type your reply here..."
                            className="min-h-24"
                          />
                          <div className="flex items-center justify-between">
                            <Button variant="outline" size="sm">
                              <Paperclip className="h-4 w-4 mr-2" />
                              Attach File
                            </Button>
                            <div className="flex gap-2">
                              <Button variant="outline">Save Draft</Button>
                              <Button>
                                <Send className="h-4 w-4 mr-2" />
                                Send Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="h-96 flex items-center justify-center">
                      <CardContent>
                        <div className="text-center text-muted-foreground">
                          <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">Select a message to read</p>
                          <p className="text-sm">Choose a message from the list to view its contents</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 