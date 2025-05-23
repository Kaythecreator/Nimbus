"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { JoinedCourses } from "@/components/student/joined-courses";
import { RecentActivity } from "@/components/student/recent-activity";
import { StreakCounter } from "@/components/student/streak-counter";
import { RecommendedTopics } from "@/components/student/recommended-topics";
import { TopicMastery } from "@/components/student/topic-mastery";
import { QuickStats } from "@/components/student/quick-stats";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function StudentDashboardPage() {
  const mockCourses = [
    {
      id: 1,
      title: "Advanced Mathematics",
      instructor: "Dr. Sarah Johnson",
      topicsToReview: ["Calculus", "Linear Algebra"],
      progress: 75,
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Computer Science Fundamentals",
      instructor: "Prof. Michael Chen",
      topicsToReview: ["Data Structures", "Algorithms"],
      progress: 60,
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Physics: Mechanics",
      instructor: "Dr. Emily Rodriguez",
      topicsToReview: ["Newton's Laws", "Energy"],
      progress: 90,
      color: "bg-purple-500"
    }
  ];

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
            <div className="flex flex-col md:flex-row gap-4 py-4 md:gap-6 md:py-6">
              {/* Left Column */}
              <div className="flex flex-col gap-4 md:w-2/3">
                <div className="px-4 lg:px-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">My Courses</h2>
                    <Badge variant="secondary">{mockCourses.length} Active</Badge>
                  </div>
                  <JoinedCourses />
                </div>
                
                <div className="px-4 lg:px-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <RecentActivity />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col gap-4 md:w-1/3 px-4 lg:px-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Study Progress</h2>
                  <StreakCounter />
                </div>
                <div>
                  <RecommendedTopics />
                </div>
                <div>
                  <TopicMastery />
                </div>
                <div>
                  <QuickStats />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 