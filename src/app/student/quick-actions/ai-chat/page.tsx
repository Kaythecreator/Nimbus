"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Send,
  Bot,
  User,
  Lightbulb,
  BookOpen,
  Calculator,
  Code,
  MessageCircle,
  Sparkles,
  RotateCcw
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  subject?: string;
}

export default function AIChatAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI study assistant. I can help you with math problems, explain concepts, review code, and answer questions about your courses. How can I help you today?",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    { text: "Explain calculus derivatives", icon: Calculator, subject: "Math" },
    { text: "Help me debug this code", icon: Code, subject: "CS" },
    { text: "What are Newton's laws?", icon: BookOpen, subject: "Physics" },
    { text: "Create a study plan", icon: Lightbulb, subject: "Study Tips" },
  ];

  const recentTopics = [
    "Linear Algebra - Matrix Operations",
    "JavaScript - Event Handling",
    "Physics - Kinematics",
    "Study Techniques - Spaced Repetition"
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('derivative') || input.includes('calculus')) {
      return "A derivative represents the rate of change of a function. For f(x) = x², the derivative f'(x) = 2x. This means the slope of the tangent line at any point x is 2x. Would you like me to explain specific derivative rules or work through an example?";
    } else if (input.includes('matrix') || input.includes('linear algebra')) {
      return "Matrix operations follow specific rules. For matrix multiplication A×B, the number of columns in A must equal the number of rows in B. The result will have dimensions (rows of A) × (columns of B). Would you like me to show you a specific example?";
    } else if (input.includes('code') || input.includes('debug') || input.includes('javascript')) {
      return "I'd be happy to help you debug your code! Common JavaScript issues include: undefined variables, scope problems, async/await confusion, and event handling mistakes. Can you share the specific code you're working with?";
    } else if (input.includes('newton') || input.includes('physics')) {
      return "Newton's three laws of motion are: 1) An object at rest stays at rest (inertia), 2) F = ma (force equals mass times acceleration), 3) For every action, there's an equal and opposite reaction. Which law would you like me to explain in more detail?";
    } else if (input.includes('study plan') || input.includes('study')) {
      return "I can help you create an effective study plan! A good plan includes: 1) Specific goals and deadlines, 2) Pomodoro technique for focused sessions, 3) Spaced repetition for retention, 4) Regular breaks and review sessions. What subject are you focusing on?";
    } else {
      return "That's an interesting question! Could you provide more context or specify which subject area you'd like help with? I'm here to assist with math, computer science, physics, and study strategies.";
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'ai',
        content: "Hello! I'm your AI study assistant. I can help you with math problems, explain concepts, review code, and answer questions about your courses. How can I help you today?",
        timestamp: new Date(),
      }
    ]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
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
            <div className="flex flex-col gap-6 py-6 md:gap-8 md:py-8 px-6 lg:px-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Link href="/student" className="flex items-center hover:text-foreground">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                  <span className="text-foreground font-medium">AI Chat Assistant</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearChat}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear Chat
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Quick Questions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Sparkles className="h-5 w-5 mr-2" />
                        Quick Questions
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {quickQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="w-full justify-start h-auto p-3 text-left"
                          onClick={() => handleQuickQuestion(question.text)}
                        >
                          <div className="flex items-start space-x-2">
                            <question.icon className="h-4 w-4 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-xs text-muted-foreground">{question.subject}</p>
                              <p className="text-sm">{question.text}</p>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Recent Topics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Topics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {recentTopics.map((topic, index) => (
                        <div key={index} className="text-sm p-2 bg-muted rounded-md">
                          {topic}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Main Chat Area */}
                <div className="lg:col-span-3">
                  <Card className="h-[600px] flex flex-col">
                    <CardHeader className="border-b">
                      <CardTitle className="flex items-center">
                        <Bot className="h-5 w-5 mr-2 text-blue-500" />
                        AI Study Assistant
                        <Badge variant="secondary" className="ml-2">Online</Badge>
                      </CardTitle>
                    </CardHeader>
                    
                    {/* Messages */}
                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex items-start space-x-3 ${
                            message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}
                        >
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <div className={`h-full w-full flex items-center justify-center ${
                              message.type === 'ai' 
                                ? 'bg-blue-100 text-blue-600' 
                                : 'bg-green-100 text-green-600'
                            }`}>
                              {message.type === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                            </div>
                          </Avatar>
                          <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                            <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-blue-500 text-white'
                                : 'bg-muted'
                            }`}>
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {/* Loading indicator */}
                      {isLoading && (
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-600">
                              <Bot className="h-4 w-4" />
                            </div>
                          </Avatar>
                          <div className="bg-muted p-3 rounded-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>

                    {/* Input Area */}
                    <div className="border-t p-4">
                      <div className="flex space-x-2">
                        <Textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          placeholder="Ask me anything about your studies..."
                          className="flex-1 min-h-[44px] max-h-32 resize-none"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim() || isLoading}
                          className="self-end"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Press Enter to send, Shift+Enter for new line
                      </p>
                    </div>
                  </Card>
                </div>
              </div>

              {/* Features Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Assistant Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calculator className="h-4 w-4 text-blue-500" />
                      <span>Math Problem Solving</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Code className="h-4 w-4 text-green-500" />
                      <span>Code Review & Debugging</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-purple-500" />
                      <span>Concept Explanations</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lightbulb className="h-4 w-4 text-yellow-500" />
                      <span>Study Plan Creation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 