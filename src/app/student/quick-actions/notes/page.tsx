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
import { 
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  BookOpen,
  Calculator,
  Code,
  StickyNote,
  Eye,
  Save,
  X,
  FileText,
  Calendar,
  Tag
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

interface Note {
  id: number;
  title: string;
  content: string;
  category: string;
  subject: string;
  createdAt: Date;
  updatedAt: Date;
  wordCount: number;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Calculus Integration Techniques",
      content: "Integration by parts: ∫u dv = uv - ∫v du\n\nChoosing u and dv:\n- Use LIATE rule (Log, Inverse trig, Algebraic, Trig, Exponential)\n- u should be easier to differentiate\n- dv should be easy to integrate\n\nExamples:\n1. ∫x·e^x dx\n   u = x, dv = e^x dx\n   du = dx, v = e^x\n   Result: x·e^x - ∫e^x dx = x·e^x - e^x + C",
      category: "Study Notes",
      subject: "Mathematics",
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20'),
      wordCount: 89
    },
    {
      id: 2,
      title: "JavaScript Event Handling",
      content: "Event Delegation:\n- Attach single event listener to parent element\n- Use event.target to identify actual clicked element\n- More efficient than multiple listeners\n\nExample:\ndocument.querySelector('.parent').addEventListener('click', (e) => {\n  if (e.target.classList.contains('button')) {\n    // Handle button click\n  }\n});\n\nBenefits:\n- Better performance\n- Handles dynamically added elements",
      category: "Code Notes",
      subject: "Computer Science",
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-18'),
      wordCount: 67
    },
    {
      id: 3,
      title: "Newton's Laws Summary",
      content: "First Law (Inertia):\nAn object at rest stays at rest, and an object in motion stays in motion at constant velocity, unless acted upon by an unbalanced force.\n\nSecond Law (F = ma):\nThe acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.\n\nThird Law (Action-Reaction):\nFor every action, there is an equal and opposite reaction.",
      category: "Lecture Notes",
      subject: "Physics",
      createdAt: new Date('2024-01-22'),
      updatedAt: new Date('2024-01-23'),
      wordCount: 78
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);

  // New note form state
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    category: "Study Notes",
    subject: "Mathematics"
  });

  const categories = ["Study Notes", "Lecture Notes", "Code Notes", "Personal Notes"];
  const subjects = ["Mathematics", "Computer Science", "Physics", "General"];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || note.category === selectedCategory;
    const matchesSubject = selectedSubject === "all" || note.subject === selectedSubject;
    
    return matchesSearch && matchesCategory && matchesSubject;
  });

  const handleCreateNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;

    const note: Note = {
      id: Math.max(...notes.map(n => n.id)) + 1,
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      subject: newNote.subject,
      createdAt: new Date(),
      updatedAt: new Date(),
      wordCount: newNote.content.trim().split(/\s+/).length
    };

    setNotes([note, ...notes]);
    setNewNote({ title: "", content: "", category: "Study Notes", subject: "Mathematics" });
    setIsCreateModalOpen(false);
  };

  const handleSaveEdit = () => {
    if (!editingNote) return;

    setNotes(notes.map(note => 
      note.id === editingNote.id 
        ? { 
            ...editingNote, 
            updatedAt: new Date(), 
            wordCount: editingNote.content.trim().split(/\s+/).length 
          }
        : note
    ));
    setEditingNote(null);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    if (viewingNote?.id === id) setViewingNote(null);
    if (editingNote?.id === id) setEditingNote(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Study Notes": return <BookOpen className="h-4 w-4" />;
      case "Lecture Notes": return <FileText className="h-4 w-4" />;
      case "Code Notes": return <Code className="h-4 w-4" />;
      case "Personal Notes": return <StickyNote className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case "Mathematics": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Computer Science": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "Physics": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
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
                  <span className="text-foreground font-medium">Notes</span>
                </div>
                <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      New Note
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Note</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Category</label>
                          <Select value={newNote.category} onValueChange={(value) => setNewNote({...newNote, category: value})}>
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
                          <Select value={newNote.subject} onValueChange={(value) => setNewNote({...newNote, subject: value})}>
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
                          value={newNote.title}
                          onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                          placeholder="Enter note title..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Content</label>
                        <Textarea
                          value={newNote.content}
                          onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                          placeholder="Write your note content..."
                          className="min-h-[200px]"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleCreateNote}>
                          <Save className="h-4 w-4 mr-2" />
                          Save Note
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{notes.length}</p>
                    <p className="text-sm text-muted-foreground">Total Notes</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">{notes.reduce((sum, note) => sum + note.wordCount, 0)}</p>
                    <p className="text-sm text-muted-foreground">Total Words</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-purple-600">{new Set(notes.map(n => n.subject)).size}</p>
                    <p className="text-sm text-muted-foreground">Subjects</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">{notes.filter(n => new Date().getTime() - n.updatedAt.getTime() < 7 * 24 * 60 * 60 * 1000).length}</p>
                    <p className="text-sm text-muted-foreground">Recent Updates</p>
                  </CardContent>
                </Card>
              </div>

              {/* Filters */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search notes..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full md:w-[180px]">
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
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {subjects.map(sub => (
                          <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Notes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredNotes.map(note => (
                  <Card key={note.id} className="h-[280px] flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(note.category)}
                          <Badge variant="outline" className="text-xs">
                            {note.category}
                          </Badge>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewingNote(note)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingNote(note)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteNote(note.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-sm line-clamp-1">{note.title}</h3>
                        <Badge className={`text-xs ${getSubjectColor(note.subject)}`}>
                          {note.subject}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 pb-3">
                      <p className="text-xs text-muted-foreground line-clamp-6">
                        {note.content}
                      </p>
                    </CardContent>
                    <div className="px-6 pb-4 flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(note.updatedAt)}
                        </span>
                        <span>{note.wordCount} words</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredNotes.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <StickyNote className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No notes found matching your criteria.</p>
                    <Button className="mt-4" onClick={() => setIsCreateModalOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Note
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* View Note Modal */}
              <Dialog open={!!viewingNote} onOpenChange={() => setViewingNote(null)}>
                <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle>{viewingNote?.title}</DialogTitle>
                      <div className="flex items-center space-x-2">
                        <Badge className={`text-xs ${getSubjectColor(viewingNote?.subject || '')}`}>
                          {viewingNote?.subject}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {viewingNote?.category}
                        </Badge>
                      </div>
                    </div>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="text-xs text-muted-foreground">
                      Created: {viewingNote?.createdAt && formatDate(viewingNote.createdAt)} • 
                      Updated: {viewingNote?.updatedAt && formatDate(viewingNote.updatedAt)} • 
                      {viewingNote?.wordCount} words
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <pre className="whitespace-pre-wrap text-sm font-sans">
                        {viewingNote?.content}
                      </pre>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* Edit Note Modal */}
              <Dialog open={!!editingNote} onOpenChange={() => setEditingNote(null)}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Note</DialogTitle>
                  </DialogHeader>
                  {editingNote && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Category</label>
                          <Select 
                            value={editingNote.category} 
                            onValueChange={(value) => setEditingNote({...editingNote, category: value})}
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
                            value={editingNote.subject} 
                            onValueChange={(value) => setEditingNote({...editingNote, subject: value})}
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
                          value={editingNote.title}
                          onChange={(e) => setEditingNote({...editingNote, title: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Content</label>
                        <Textarea
                          value={editingNote.content}
                          onChange={(e) => setEditingNote({...editingNote, content: e.target.value})}
                          className="min-h-[200px]"
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setEditingNote(null)}>
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