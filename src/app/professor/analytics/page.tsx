import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { BarChart, BarChartIcon, LineChart, TrendingUp, PieChart, Activity } from "lucide-react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function AnalyticsPage() {
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
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">
                  Track student performance and engagement across your courses.
                </p>
              </div>
              
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="engagement">Engagement</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Total Students
                        </CardTitle>
                        <BarChartIcon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">358</div>
                        <p className="text-xs text-muted-foreground">
                          +12% from last semester
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Average Grade
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">B+ (87%)</div>
                        <p className="text-xs text-muted-foreground">
                          +3% from last semester
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Completion Rate
                        </CardTitle>
                        <PieChart className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">93%</div>
                        <p className="text-xs text-muted-foreground">
                          +5% from last semester
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Active Students
                        </CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">325</div>
                        <p className="text-xs text-muted-foreground">
                          90% of total students
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                      <CardHeader>
                        <CardTitle>Grade Distribution</CardTitle>
                        <CardDescription>
                          Distribution of grades across all courses
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pl-2">
                        <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center rounded-md border border-dashed">
                          <BarChart className="h-8 w-8 text-muted-foreground" />
                          <span className="ml-2 text-muted-foreground">Bar Chart Visualization</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="col-span-3">
                      <CardHeader>
                        <CardTitle>Course Performance</CardTitle>
                        <CardDescription>
                          Average performance by course
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full bg-muted/20 flex items-center justify-center rounded-md border border-dashed">
                          <LineChart className="h-8 w-8 text-muted-foreground" />
                          <span className="ml-2 text-muted-foreground">Line Chart Visualization</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="performance" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                      <CardDescription>
                        Detailed performance metrics by course and topic
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] w-full bg-muted/20 flex items-center justify-center rounded-md border border-dashed">
                        <BarChart className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Performance Data Visualization</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="engagement" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Engagement</CardTitle>
                      <CardDescription>
                        Tracking participation and interaction
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] w-full bg-muted/20 flex items-center justify-center rounded-md border border-dashed">
                        <Activity className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Engagement Data Visualization</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="trends" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Trends</CardTitle>
                      <CardDescription>
                        Long-term performance trends across semesters
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] w-full bg-muted/20 flex items-center justify-center rounded-md border border-dashed">
                        <LineChart className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Trend Data Visualization</span>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}