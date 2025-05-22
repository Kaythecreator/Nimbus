"use client"

import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, BarChart2, CalendarCheck, Inbox, BookOpen, Settings, Users, Bell, 
  ThumbsUp, ChevronDown, ChevronUp
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useState, useContext, createContext, useEffect } from "react"

// Create a context to manage sidebar state
type SidebarContextType = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  expandSidebar: () => void;
  openCourseSubmenu: () => void;
};

const SidebarContext = createContext<SidebarContextType>({
  isCollapsed: false,
  toggleSidebar: () => {},
  expandSidebar: () => {},
  openCourseSubmenu: () => {},
});

// Mock data for professor navigation
const professorNavData = {
  navMain: [
    { title: "Dashboard", href: "/professor", icon: Home },
    { title: "Analytics", href: "/professor/analytics", icon: BarChart2 },
    { title: "Calendar", href: "/professor/calendar", icon: CalendarCheck },
    { title: "Inbox", href: "/professor/inbox", icon: Inbox, badge: 3 },
    {
      title: "Courses",
      icon: BookOpen,
      href: "/professor/courses",
      count: 5,
      submenu: true,
      items: [
        { title: "CS101: Intro to CS", href: "/professor/courses/cs101" },
        { title: "CS201: Data Structures", href: "/professor/courses/cs201" },
        { title: "CS150: Web Development", href: "/professor/courses/cs150" },
        { title: "CS250: Database Management", href: "/professor/courses/cs250" },
        { title: "CS300: Algorithms", href: "/professor/courses/cs300" },
      ],
    },
  ],
  navTeaching: [
    { title: "Class Settings", href: "/professor/settings", icon: Settings },
    { title: "Notifications", href: "/professor/notifications", icon: Bell, badge: 3 },
    { title: "Students", href: "/professor/students", icon: Users },
  ],
}

function ProfessorNavMain({ items, category }: { items: any[], category?: string }) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const { expandSidebar, openCourseSubmenu } = useContext(SidebarContext);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }
  
  // Effect to handle opening the course submenu when requested
  useEffect(() => {
    const coursesItem = items.find(item => item.title === "Courses" && item.submenu);
    if (coursesItem) {
      const handleOpenCourseSubmenu = () => {
        setOpenSubmenu("Courses");
      };
      
      // Listen for the openCourseSubmenu event
      document.addEventListener("openCourseSubmenu", handleOpenCourseSubmenu);
      
      return () => {
        document.removeEventListener("openCourseSubmenu", handleOpenCourseSubmenu);
      };
    }
  }, [items]);

  // Helper function to get white text styles for active items
  const getWhiteTextStyle = (isActive: boolean) => {
    if (!isActive) return {};
    return {
      color: 'white',
      '--tw-text-opacity': '1',
      textColor: 'white'
    };
  }

  return (
    <div className="flex flex-col gap-2">
      {category && (
        <SidebarGroupLabel className="px-2 py-1 text-sm font-medium text-muted-foreground">
          {category}
        </SidebarGroupLabel>
      )}
      
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.href;
          const hasCount = 'count' in item && item.count;
          const hasBadge = 'badge' in item && item.badge;
          const hasSubmenu = 'submenu' in item && item.submenu && item.items?.length > 0;
          const isSubmenuOpen = openSubmenu === item.title;
          
          if (hasSubmenu) {
            // Check if any child route is active
            const isSubmenuItemActive = hasSubmenu && item.items.some(
              (subitem: any) => pathname === subitem.href
            );
            
            // Create a link for collapsed state and a button for expanded state
            return (
              <div key={item.title}>
                <SidebarMenuItem>
                  <div data-collapse-hide>
                    <SidebarMenuButton 
                      className={`h-12 justify-between group px-4 ${isSubmenuItemActive ? 'text-white' : ''}`}
                      onClick={() => toggleSubmenu(item.title)}
                      data-active={isSubmenuItemActive}
                      style={getWhiteTextStyle(isSubmenuItemActive)}
                    >
                      <div className="flex items-center" style={getWhiteTextStyle(isSubmenuItemActive)}>
                        {item.icon && <item.icon className="mr-3 shrink-0" data-collapse-ignore-margin style={getWhiteTextStyle(isSubmenuItemActive)} />}
                        <span className={`truncate text-[15px] ${isSubmenuItemActive ? 'text-white' : ''}`} style={getWhiteTextStyle(isSubmenuItemActive)} data-collapse-hide>
                          {item.title}
                        </span>
                      </div>
                      <div className="flex items-center" style={getWhiteTextStyle(isSubmenuItemActive)} data-collapse-hide>
                        {hasCount && (
                          <span className={`mr-1 text-sm ${isSubmenuItemActive ? 'text-white' : 'text-muted-foreground'}`} style={getWhiteTextStyle(isSubmenuItemActive)}>
                            ({item.count})
                          </span>
                        )}
                        {isSubmenuOpen ? (
                          <ChevronUp className="h-4 w-4" style={getWhiteTextStyle(isSubmenuItemActive)} />
                        ) : (
                          <ChevronDown className="h-4 w-4" style={getWhiteTextStyle(isSubmenuItemActive)} />
                        )}
                      </div>
                    </SidebarMenuButton>
                  </div>
                  
                  {/* Link for collapsed state - always visible */}
                  <div data-collapse-show>
                    <SidebarMenuButton
                      className="h-12 flex justify-center items-center"
                      data-active={isSubmenuItemActive}
                      style={getWhiteTextStyle(isSubmenuItemActive)}
                      onClick={(e) => {
                        e.preventDefault();
                        expandSidebar();
                        if (item.title === "Courses") {
                          // Dispatch a custom event to open the course submenu
                          document.dispatchEvent(new Event("openCourseSubmenu"));
                          // Also set it directly for immediate effect
                          setOpenSubmenu(item.title);
                        }
                      }}
                    >
                      {item.icon && <item.icon className="shrink-0" style={getWhiteTextStyle(isSubmenuItemActive)} />}
                    </SidebarMenuButton>
                  </div>
                </SidebarMenuItem>

                {isSubmenuOpen && (
                  <div className="pl-8 list-none">
                    {item.items.map((subitem: any) => {
                      const isSubItemActive = pathname === subitem.href;
                      
                      return (
                        <SidebarMenuItem key={subitem.title}>
                          <SidebarMenuButton 
                            asChild 
                            className={`h-10 text-[15px] ${isSubItemActive ? 'text-white' : ''}`}
                            data-active={isSubItemActive}
                            isActive={isSubItemActive}
                            style={getWhiteTextStyle(isSubItemActive)}
                          >
                            <Link 
                              href={subitem.href || '#'} 
                              className={`text-inherit ${isSubItemActive ? 'text-white' : ''}`}
                              style={getWhiteTextStyle(isSubItemActive)}
                            >
                              <span 
                                className={`truncate ${isSubItemActive ? 'text-white' : ''}`}
                                style={getWhiteTextStyle(isSubItemActive)}
                              >
                                {subitem.title}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </div>
                )}
              </div>
            )
          }

          return (
            <SidebarMenuItem key={item.title} className="list-none">
              <SidebarMenuButton 
                asChild 
                isActive={isActive} 
                className={`h-12 px-4 ${isActive ? 'text-white' : ''}`}
                data-active={isActive}
                style={getWhiteTextStyle(isActive)}
              >
                <Link 
                  href={item.href || '#'} 
                  className={`flex items-center w-full text-inherit ${isActive ? 'text-white' : ''}`}
                  style={getWhiteTextStyle(isActive)}
                >
                  {item.icon && <item.icon className="mr-3 shrink-0" data-collapse-ignore-margin style={getWhiteTextStyle(isActive)} />}
                  <span 
                    className={`truncate text-[15px] ${isActive ? 'text-white' : ''}`}
                    data-collapse-hide
                    style={getWhiteTextStyle(isActive)}
                  >
                    {item.title}
                  </span>
                  
                  {hasBadge && (
                    <div className="ml-auto" data-collapse-hide>
                      <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {item.badge}
                      </span>
                    </div>
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </div>
  )
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const expandSidebar = () => {
    setIsCollapsed(false);
  };
  
  const openCourseSubmenu = () => {
    document.dispatchEvent(new Event("openCourseSubmenu"));
  };

  // Use useEffect to set data attributes on the sidebar based on state
  useEffect(() => {
    const sidebarElement = document.querySelector('[data-slot="sidebar"]');
    if (sidebarElement) {
      sidebarElement.setAttribute('data-state', isCollapsed ? 'collapsed' : 'expanded');
    }
  }, [isCollapsed]);

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar, expandSidebar, openCourseSubmenu }}>
      <Sidebar 
        collapsible="icon" 
        className="rounded-none shadow-sm"
        {...props}
      >
        <SidebarHeader className="border-none">
          <div className="flex items-center justify-center w-full">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white text-lg font-semibold">
              N
            </div>
            <div className="font-semibold text-lg ml-3" data-collapse-hide>Nimbus</div>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="flex flex-col py-4 px-2 gap-6">
          <ProfessorNavMain items={professorNavData.navMain} />
          <ProfessorNavMain items={professorNavData.navTeaching} category="TEACHING" />
        </SidebarContent>
        
        <SidebarFooter className="p-0">
          <Button variant="outline" className="w-full h-11 font-medium flex items-center justify-center bg-transparent" size="default">
            <ThumbsUp className="mr-3 shrink-0" data-collapse-hide />
            <span data-collapse-hide>Leave feedback</span>
            <ThumbsUp className="shrink-0" data-collapse-show />
          </Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarContext.Provider>
  )
}
