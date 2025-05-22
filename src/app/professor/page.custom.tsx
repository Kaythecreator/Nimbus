import React from 'react';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {
  Home, BarChart2, Calendar, Inbox, BookOpen, Settings, Users, Bell, Megaphone
} from 'lucide-react';

const sidebarNavItems = [
  { title: "Dashboard", icon: Home, href: "/professor" },
  { title: "Analytics", icon: BarChart2, href: "/professor/analytics" },
  { title: "Calendar", icon: Calendar, href: "/professor/calendar" },
  { title: "Inbox", icon: Inbox, href: "/professor/inbox" },
  { title: "Courses", icon: BookOpen, href: "/professor/courses" },
  { title: "Class Settings", icon: Settings, href: "/professor/settings" },
  { title: "Students", icon: Users, href: "/professor/students" },
  { title: "Notifications", icon: Bell, href: "/professor/notifications" },
  { title: "System Announcements", icon: Megaphone, href: "/professor/announcements" },
];

export default function ProfessorCustomPage() {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen bg-background text-foreground">
      <ResizablePanel defaultSize={20} maxSize={30} minSize={15} className="p-4">
        <div className="flex h-full flex-col">
          <h2 className="mb-4 text-lg font-semibold tracking-tight text-primary">
            Professor Portal (Custom)
          </h2>
          <nav className="flex flex-col space-y-1">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                className="w-full justify-start hover:bg-accent hover:text-accent-foreground"
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-border hover:bg-primary" />
      <ResizablePanel defaultSize={80}>
        <main className="flex h-full flex-col p-6">
          <h1 className="text-2xl font-semibold mb-4">Dashboard Overview (Custom)</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="border rounded-lg p-4 min-h-[120px] bg-card text-card-foreground">
              Course Card 1 (Placeholder)
            </div>
            <div className="border rounded-lg p-4 min-h-[120px] bg-card text-card-foreground">
              At-Risk Students (Placeholder)
            </div>
          </div>
        </main>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
} 