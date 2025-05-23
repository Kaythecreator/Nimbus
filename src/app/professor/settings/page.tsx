import { SiteHeader } from "@/components/site-header"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SettingsPage() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem",
        "--header-height": "4rem",
      } as React.CSSProperties}
    >
      <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
        <AppSidebar />
        <div className="flex flex-col">
          <SiteHeader />
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Class Settings</h1>
                <p className="text-muted-foreground">
                  Manage your class preferences and configurations
                </p>
              </div>
              
              <Tabs defaultValue="general" className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                  <TabsTrigger value="integrations">Integrations</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>General Settings</CardTitle>
                      <CardDescription>
                        Configure your default class settings and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Professor Name</Label>
                        <Input id="name" placeholder="Your name" defaultValue="Dr. John Smith" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" placeholder="Your email" defaultValue="john.smith@university.edu" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input id="department" placeholder="Your department" defaultValue="Computer Science" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Time Zone</Label>
                        <Select defaultValue="eastern">
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="eastern">Eastern Time (ET)</SelectItem>
                            <SelectItem value="central">Central Time (CT)</SelectItem>
                            <SelectItem value="mountain">Mountain Time (MT)</SelectItem>
                            <SelectItem value="pacific">Pacific Time (PT)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dark-mode">Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Toggle between light and dark themes
                          </p>
                        </div>
                        <Switch id="dark-mode" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-save">Auto Save</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically save changes while editing
                          </p>
                        </div>
                        <Switch id="auto-save" defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                      <CardDescription>
                        Configure how and when you receive notifications
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="email-notifications" defaultChecked />
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="browser-notifications" defaultChecked />
                        <Label htmlFor="browser-notifications">Browser Notifications</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="mobile-notifications" defaultChecked />
                        <Label htmlFor="mobile-notifications">Mobile Notifications</Label>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <Label>Notify me about:</Label>
                        <div className="grid gap-2 pt-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="assignment-submissions" defaultChecked />
                            <Label htmlFor="assignment-submissions">Assignment Submissions</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="due-date-reminders" defaultChecked />
                            <Label htmlFor="due-date-reminders">Due Date Reminders</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="student-messages" defaultChecked />
                            <Label htmlFor="student-messages">Student Messages</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="grade-updates" />
                            <Label htmlFor="grade-updates">Grade Updates</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="system-announcements" defaultChecked />
                            <Label htmlFor="system-announcements">System Announcements</Label>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="features" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Feature Settings</CardTitle>
                      <CardDescription>
                        Enable or disable features for your classes
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="ai-grading">AI-Assisted Grading</Label>
                          <p className="text-sm text-muted-foreground">
                            Use AI to help grade assignments and provide feedback
                          </p>
                        </div>
                        <Switch id="ai-grading" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-reminders">Automatic Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Send automatic reminders to students for upcoming deadlines
                          </p>
                        </div>
                        <Switch id="auto-reminders" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="plagiarism-detection">Plagiarism Detection</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically check submissions for plagiarism
                          </p>
                        </div>
                        <Switch id="plagiarism-detection" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="peer-review">Peer Reviews</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow students to review each other's work
                          </p>
                        </div>
                        <Switch id="peer-review" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="analytics">Analytics Dashboard</Label>
                          <p className="text-sm text-muted-foreground">
                            Access detailed analytics about student performance
                          </p>
                        </div>
                        <Switch id="analytics" defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="privacy" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Privacy Settings</CardTitle>
                      <CardDescription>
                        Manage data sharing and privacy preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="show-profile">Show Profile to Students</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow students to see your profile information
                          </p>
                        </div>
                        <Switch id="show-profile" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="share-analytics">Share Analytics with Department</Label>
                          <p className="text-sm text-muted-foreground">
                            Share class analytics with your department
                          </p>
                        </div>
                        <Switch id="share-analytics" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-collection">Data Collection</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow anonymous data collection for platform improvement
                          </p>
                        </div>
                        <Switch id="data-collection" defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="integrations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Integrations</CardTitle>
                      <CardDescription>
                        Connect with external services and platforms
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Canvas LMS</div>
                          <p className="text-sm text-muted-foreground">
                            Connect to Canvas for assignment and grade synchronization
                          </p>
                        </div>
                        <Button variant="outline">Connected</Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Google Classroom</div>
                          <p className="text-sm text-muted-foreground">
                            Connect with Google Classroom for easy integration
                          </p>
                        </div>
                        <Button variant="outline">Connect</Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Microsoft Teams</div>
                          <p className="text-sm text-muted-foreground">
                            Integrate with Microsoft Teams for meetings and collaboration
                          </p>
                        </div>
                        <Button variant="outline">Connect</Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <div className="font-medium">Zoom</div>
                          <p className="text-sm text-muted-foreground">
                            Connect to Zoom for virtual class sessions
                          </p>
                        </div>
                        <Button variant="outline">Connected</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              <div className="flex justify-end">
                <Button className="w-32">Save Changes</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}