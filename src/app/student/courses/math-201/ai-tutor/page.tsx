"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft,
  ChevronRight,
  Bot,
  Send,
  Lightbulb,
  BookOpen,
  Calculator,
  HelpCircle,
  Sparkles,
  User,
  RotateCcw
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function AITutorPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI Math Tutor. I'm here to help you understand complex mathematical concepts, solve problems step-by-step, and answer any questions you have about Advanced Mathematics. What would you like to work on today?",
      timestamp: "9:30 AM"
    }
  ]);

  const quickQuestions = [
    "Explain the chain rule",
    "Help me solve integration by parts",
    "What are eigenvalues?", 
    "Show me how to find derivatives",
    "Explain matrix multiplication",
    "Help with differential equations"
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Simulate AI response
    const aiResponse = {
      id: messages.length + 2,
      type: "ai",
      content: `I understand you're asking about "${message}". Let me help you with that step by step:\n\n1. First, let's break down the concept...\n2. Here's the mathematical foundation...\n3. Let me show you an example...\n\nWould you like me to elaborate on any of these points or work through a specific problem together?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage, aiResponse]);
    setMessage("");
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: "ai",
        content: "Hello! I'm your AI Math Tutor. I'm here to help you understand complex mathematical concepts, solve problems step-by-step, and answer any questions you have about Advanced Mathematics. What would you like to work on today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
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
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8 px-6 lg:px-8 h-full">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Link href="/student/courses/math-201" className="flex items-center hover:text-foreground">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Advanced Mathematics
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-foreground font-medium">AI Tutor</span>
                </div>
                <Button variant="outline" onClick={clearChat}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear Chat
                </Button>
              </div>

              {/* AI Tutor Interface */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 h-full min-h-0">
                {/* Left Side - Chat Interface */}
                <div className="lg:col-span-3 flex flex-col h-full min-h-0">
                  <Card className="flex-1 flex flex-col min-h-0">
                    <CardHeader className="border-b">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            AI Math Tutor
                            <Badge variant="secondary" className="text-xs">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Online
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">Advanced Mathematics Assistant</p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    {/* Messages */}
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {msg.type === 'ai' && (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-indigo-100 text-indigo-600">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-1' : ''}`}>
                            <div className={`p-3 rounded-lg ${
                              msg.type === 'user' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              <p className="text-sm whitespace-pre-line">{msg.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 px-1">
                              {msg.timestamp}
                            </p>
                          </div>
                          {msg.type === 'user' && (
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      ))}
                    </CardContent>

                    {/* Input Area */}
                    <div className="p-4 border-t">
                      <div className="flex gap-2">
                        <Input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Ask me anything about mathematics..."
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          className="flex-1"
                        />
                        <Button onClick={handleSendMessage} disabled={!message.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Right Side - Quick Actions & Help */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Quick Questions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <HelpCircle className="h-5 w-5" />
                        Quick Questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {quickQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full text-left justify-start h-auto p-3"
                          onClick={() => handleQuickQuestion(question)}
                        >
                          <span className="text-sm">{question}</span>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* AI Capabilities */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Lightbulb className="h-5 w-5" />
                        I can help with
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg">
                        <Calculator className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">Problem Solving</p>
                          <p className="text-xs text-muted-foreground">Step-by-step solutions</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-green-50 rounded-lg">
                        <BookOpen className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium text-sm">Concept Explanation</p>
                          <p className="text-xs text-muted-foreground">Clear, detailed explanations</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-purple-50 rounded-lg">
                        <Sparkles className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-medium text-sm">Practice Problems</p>
                          <p className="text-xs text-muted-foreground">Custom problem generation</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Study Tips */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Today's Tip</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800">Practice Daily</p>
                            <p className="text-xs text-yellow-700">
                              Spend 15-20 minutes daily on practice problems to reinforce your learning.
                            </p>
                          </div>
                        </div>
                      </div>
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