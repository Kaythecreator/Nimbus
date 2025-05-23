"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Clock,
  Calendar as CalendarIcon,
  AlertCircle,
  CheckCircle2,
  Circle,
  Filter,
  Save,
  Bell,
  Target,
  BookOpen,
  Calculator,
  Code,
  X
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface Reminder {
  id: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  subject: string;
  dueDate: Date;
  completed: boolean;
  createdAt: Date;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      title: "Complete Math Assignment 3",
      description: "Finish problems 1-15 on linear algebra transformations",
      priority: 'high',
      category: 'Assignment',
      subject: 'Mathematics',
      dueDate: new Date('2024-12-28'),
      completed: false,
      createdAt: new Date('2024-12-20')
    },
    {
      id: 2,
      title: "Study for CS Midterm",
      description: "Review algorithms, data structures, and time complexity",
      priority: 'high',
      category: 'Exam',
      subject: 'Computer Science',
      dueDate: new Date('2024-12-30'),
      completed: false,
      createdAt: new Date('2024-12-18')
    },
    {
      id: 3,
      title: "Physics Lab Report",
      description: "Write up results from pendulum experiment",
      priority: 'medium',
      category: 'Lab Report',
      subject: 'Physics',
      dueDate: new Date('2024-12-26'),
      completed: true,
      createdAt: new Date('2024-12-15')
    },
    {
      id: 4,
      title: "Review Calculus Notes",
      description: "Go through derivatives and integration notes before next class",
      priority: 'low',
      category: 'Study',
      subject: 'Mathematics',
      dueDate: new Date('2024-12-25'),
      completed: false,
      createdAt: new Date('2024-12-22')
    },
    {
      id: 5,
      title: "Project: Weather App",
      description: "Implement API integration and responsive design",
      priority: 'medium',
      category: 'Project',
      subject: 'Computer Science',
      dueDate: new Date('2025-01-05'),
      completed: false,
      createdAt: new Date('2024-12-10')
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [showCompleted, setShowCompleted] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  // New reminder form state
  const [newReminder, setNewReminder] = useState({
    title: "",
    description: "",
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: 'Assignment',
    subject: 'Mathematics',
    dueDate: new Date()
  });

  const categories = ['Assignment', 'Exam', 'Lab Report', 'Project', 'Study', 'Meeting', 'Other'];
  const subjects = ['Mathematics', 'Computer Science', 'Physics', 'General'];

  const filteredReminders = reminders.filter(reminder => {
    const matchesSearch = reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === "all" || reminder.priority === selectedPriority;
    const matchesCategory = selectedCategory === "all" || reminder.category === selectedCategory;
    const matchesSubject = selectedSubject === "all" || reminder.subject === selectedSubject;
    const matchesCompletion = showCompleted || !reminder.completed;
    
    return matchesSearch && matchesPriority && matchesCategory && matchesSubject && matchesCompletion;
  });

  const handleCreateReminder = () => {
    if (!newReminder.title.trim()) return;

    const reminder: Reminder = {
      id: Math.max(...reminders.map(r => r.id)) + 1,
      title: newReminder.title,
      description: newReminder.description,
      priority: newReminder.priority,
      category: newReminder.category,
      subject: newReminder.subject,
      dueDate: newReminder.dueDate,
      completed: false,
      createdAt: new Date()
    };

    setReminders([reminder, ...reminders]);
    setNewReminder({
      title: "",
      description: "",
      priority: 'medium',
      category: 'Assignment',
      subject: 'Mathematics',
      dueDate: new Date()
    });
    setIsCreateModalOpen(false);
  };

  const handleToggleComplete = (id: number) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };

  const handleSaveEdit = () => {
    if (!editingReminder) return;

    setReminders(reminders.map(reminder =>
      reminder.id === editingReminder.id ? editingReminder : reminder
    ));
    setEditingReminder(null);
  };

  const handleDeleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
    if (editingReminder?.id === id) setEditingReminder(null);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Assignment': return <BookOpen className="h-4 w-4" />;
      case 'Exam': return <Target className="h-4 w-4" />;
      case 'Lab Report': return <Calculator className="h-4 w-4" />;
      case 'Project': return <Code className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const isOverdue = (dueDate: Date, completed: boolean) => {
    return !completed && dueDate < new Date();
  };

  const isDueSoon = (dueDate: Date, completed: boolean) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return !completed && dueDate <= tomorrow && dueDate >= new Date();
  };

  const formatDueDate = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays === -1) return 'Due yesterday';
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    
    return format(date, 'MMM d, yyyy');
  };

  const stats = {
    total: reminders.length,
    completed: reminders.filter(r => r.completed).length,
    pending: reminders.filter(r => !r.completed).length,
    overdue: reminders.filter(r => isOverdue(r.dueDate, r.completed)).length,
    dueSoon: reminders.filter(r => isDueSoon(r.dueDate, r.completed)).length
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
                  <span className="text-foreground font-medium">Reminders</span>
                </div>
                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Reminder
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Reminder</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Priority</label>
                          <Select value={newReminder.priority} onValueChange={(value: 'low' | 'medium' | 'high') => setNewReminder({...newReminder, priority: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Due Date</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {format(newReminder.dueDate, "PPP")}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={newReminder.dueDate}
                                onSelect={(date) => date && setNewReminder({...newReminder, dueDate: date})}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Category</label>
                          <Select value={newReminder.category} onValueChange={(value) => setNewReminder({...newReminder, category: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subject</label>
                          <Select value={newReminder.subject} onValueChange={(value) => setNewReminder({...newReminder, subject: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map(sub => (
                                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={newReminder.title}
                          onChange={(e) => setNewReminder({...newReminder, title: e.target.value})}
                          placeholder="Enter reminder title..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={newReminder.description}
                          onChange={(e) => setNewReminder({...newReminder, description: e.target.value})}
                          placeholder="Add description (optional)..."
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateReminder}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Reminder
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                    <p className="text-sm text-muted-foreground">Overdue</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">{stats.dueSoon}</p>
                    <p className="text-sm text-muted-foreground">Due Soon</p>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search reminders..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                      <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder="Priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Priorities</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                        <SelectTrigger>
                          <SelectValue placeholder="Subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          {subjects.map(sub => (
                            <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="show-completed"
                          checked={showCompleted}
                          onCheckedChange={setShowCompleted}
                        />
                        <label htmlFor="show-completed" className="text-sm font-medium">
                          Show completed
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reminders List */}
              <div className="space-y-3">
                {filteredReminders.map(reminder => (
                  <Card key={reminder.id} className={`${reminder.completed ? 'opacity-60' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <Checkbox
                          checked={reminder.completed}
                          onCheckedChange={() => handleToggleComplete(reminder.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <h3 className={`font-semibold ${reminder.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {reminder.title}
                              </h3>
                              {reminder.description && (
                                <p className="text-sm text-muted-foreground">
                                  {reminder.description}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingReminder(reminder)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteReminder(reminder.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                              {getCategoryIcon(reminder.category)}
                              <Badge variant="outline" className="text-xs">
                                {reminder.category}
                              </Badge>
                            </div>
                            <Badge className={`text-xs ${getPriorityColor(reminder.priority)}`}>
                              {reminder.priority} priority
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {reminder.subject}
                            </Badge>
                            <div className={`flex items-center space-x-1 text-xs ${
                              isOverdue(reminder.dueDate, reminder.completed) ? 'text-red-600' :
                              isDueSoon(reminder.dueDate, reminder.completed) ? 'text-orange-600' :
                              'text-muted-foreground'
                            }`}>
                              <Clock className="h-3 w-3" />
                              <span>{formatDueDate(reminder.dueDate)}</span>
                              {isOverdue(reminder.dueDate, reminder.completed) && (
                                <AlertCircle className="h-3 w-3" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredReminders.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No reminders found matching your criteria.</p>
                    <Button className="mt-4" onClick={() => setIsCreateModalOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Reminder
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Edit Reminder Modal */}
              <Dialog open={!!editingReminder} onOpenChange={() => setEditingReminder(null)}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Reminder</DialogTitle>
                  </DialogHeader>
                  {editingReminder && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Priority</label>
                          <Select 
                            value={editingReminder.priority} 
                            onValueChange={(value: 'low' | 'medium' | 'high') => setEditingReminder({...editingReminder, priority: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Due Date</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-start text-left font-normal">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {format(editingReminder.dueDate, "PPP")}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={editingReminder.dueDate}
                                onSelect={(date) => date && setEditingReminder({...editingReminder, dueDate: date})}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Category</label>
                          <Select 
                            value={editingReminder.category} 
                            onValueChange={(value) => setEditingReminder({...editingReminder, category: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Subject</label>
                          <Select 
                            value={editingReminder.subject} 
                            onValueChange={(value) => setEditingReminder({...editingReminder, subject: value})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {subjects.map(sub => (
                                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          value={editingReminder.title}
                          onChange={(e) => setEditingReminder({...editingReminder, title: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea
                          value={editingReminder.description}
                          onChange={(e) => setEditingReminder({...editingReminder, description: e.target.value})}
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setEditingReminder(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveEdit}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 