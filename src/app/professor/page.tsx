import { AppSidebar } from "@/components/app-sidebar";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/professor/section-cards";
import { AtRiskStudents } from "@/components/professor/at-risk-students";
import { EngagementStats } from "@/components/professor/engagement-stats";
import { MilestonesCalendar } from "@/components/professor/milestones-calendar";
import { SystemAnnouncements } from "@/components/professor/system-announcements";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import data from "./data.json"; // Will update this path if data.json is moved to professor folder

export default function ProfessorDashboardPage() { // Renamed from Page
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem",
        "--header-height": "4rem",
      } as React.CSSProperties}
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col md:flex-row gap-4 py-4 md:gap-6 md:py-6">
              {/* Left Column */}
              <div className="flex flex-col gap-4 md:w-2/3">
                <div className="px-4 lg:px-6">
                  <h2 className="text-xl font-semibold mb-4">Course Overview</h2>
                  <SectionCards />
                </div>
                <div className="px-4 lg:px-6">
                  <h2 className="text-xl font-semibold mb-4">At-Risk Students</h2>
                  <AtRiskStudents />
                </div>
                <div className="px-4 lg:px-6">
                  <h2 className="text-xl font-semibold mb-4">Student Performance</h2>
                  <ChartAreaInteractive />
                </div>
              </div>
              
              {/* Right Column */}
              <div className="flex flex-col gap-4 md:w-1/3 px-4 lg:px-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Upcoming Milestones</h2>
                  <MilestonesCalendar />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Engagement Stats</h2>
                  <EngagementStats />
                </div>
                <div>
                  <SystemAnnouncements />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 