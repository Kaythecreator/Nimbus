"use client"

import * as React from "react"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home, BarChart2, CalendarCheck, Inbox, BookOpen, Bell, MapPin,
  Timer, MessageCircle, StickyNote, Clock, ThumbsUp, ChevronDown, ChevronUp
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
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
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

// Types for navigation items
interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  count?: number;
  submenu?: boolean;
  items?: SubNavItem[];
}

interface SubNavItem {
  title: string;
  href: string;
}

interface QuickWidget {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// Mock data for student navigation
const studentNavData = {
  navMain: [
    { title: "Dashboard", href: "/student", icon: Home },
    { title: "Analytics", href: "/student/analytics", icon: BarChart2 },
    { title: "Calendar", href: "/student/calendar", icon: CalendarCheck },
    { title: "Inbox", href: "/student/inbox", icon: Inbox, badge: 2 },
    {
      title: "Courses",
      icon: BookOpen,
      href: "/student/courses",
      count: 3,
      submenu: true,
      items: [
        { title: "Advanced Mathematics", href: "/student/courses/math-201" },
        { title: "Computer Science Fundamentals", href: "/student/courses/cs-101" },
        { title: "Physics: Mechanics", href: "/student/courses/phys-150" },
      ],
    },
    { title: "Notifications", href: "/student/notifications", icon: Bell, badge: 1 },
    { title: "Study Path", href: "/student/study-path", icon: MapPin },
  ] as NavItem[],
  quickWidgets: [
    { id: "pomodoro", title: "Pomodoro Timer", icon: Timer, color: "text-red-500" },
    { id: "ai-chat", title: "AI Chat Assistant", icon: MessageCircle, color: "text-blue-500" },
    { id: "notes", title: "Notes", icon: StickyNote, color: "text-yellow-500" },
    { id: "reminders", title: "Reminders", icon: Clock, color: "text-green-500" }
  ] as QuickWidget[]
}

function StudentNavMain({ items, category }: { items: NavItem[], category?: string }) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const { expandSidebar } = useContext(SidebarContext);

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
        <SidebarGroupLabel className="font-semibold text-sm">
          {category}
        </SidebarGroupLabel>
      )}
      
      <SidebarMenu className="gap-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const hasCount = 'count' in item && item.count;
          const hasBadge = 'badge' in item && item.badge;
          const hasSubmenu = 'submenu' in item && item.submenu && item.items?.length && item.items.length > 0;
          const isSubmenuOpen = openSubmenu === item.title;
          
          if (hasSubmenu) {
            // Check if any child route is active
            const isSubmenuItemActive = hasSubmenu && item.items && item.items.some(
              (subitem: SubNavItem) => pathname === subitem.href
            ) || false;
            
            return (
              <div key={item.title}>
                <SidebarMenuItem>
                  <div data-collapse-hide>
                    <SidebarMenuButton 
                      className={`h-12 justify-between group px-4 ${isSubmenuItemActive ? 'text-white' : ''}`}
                      onClick={() => toggleSubmenu(item.title)}
                      data-active={isSubmenuItemActive}
                    >
                      <div className="flex items-center" style={getWhiteTextStyle(isSubmenuItemActive)}>
                        {item.icon && <item.icon className={`mr-3 shrink-0 h-5 w-5 ${isSubmenuItemActive ? 'text-white' : ''}`} data-collapse-ignore-margin />}
                        <span className={`truncate text-[15px] ${isSubmenuItemActive ? 'text-white' : ''}`} data-collapse-hide>
                          {item.title}
                        </span>
                      </div>
                      <div className="flex items-center" style={getWhiteTextStyle(isSubmenuItemActive)} data-collapse-hide>
                        {hasCount && (
                          <span className={`mr-1 text-sm ${isSubmenuItemActive ? 'text-white' : 'text-muted-foreground'}`}>
                            ({item.count})
                          </span>
                        )}
                        {hasBadge && (
                          <span className="mr-1 text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                            {item.badge}
                          </span>
                        )}
                        {isSubmenuOpen ? (
                          <ChevronUp className={`h-4 w-4 ${isSubmenuItemActive ? 'text-white' : ''}`} />
                        ) : (
                          <ChevronDown className={`h-4 w-4 ${isSubmenuItemActive ? 'text-white' : ''}`} />
                        )}
                      </div>
                    </SidebarMenuButton>
                  </div>
                  
                  {/* Link for collapsed state - always visible */}
                  <div data-collapse-show>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-full flex items-center justify-center p-3 rounded-md ${
                        isSubmenuItemActive 
                          ? 'bg-sidebar-primary text-white' 
                          : 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        expandSidebar();
                        if (item.title === "Courses") {
                          document.dispatchEvent(new Event("openCourseSubmenu"));
                          setOpenSubmenu(item.title);
                        }
                      }}
                    >
                      {item.icon && <item.icon className={`shrink-0 h-5 w-5 ${isSubmenuItemActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />}
                    </Button>
                  </div>
                </SidebarMenuItem>

                {isSubmenuOpen && item.items && (
                  <div className="pl-8 list-none">
                    {item.items.map((subitem: SubNavItem) => {
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
            );
          }

          // Regular menu item
          return (
            <SidebarMenuItem key={item.title}>
              <div data-collapse-hide>
                <SidebarMenuButton 
                  asChild 
                  className={`h-12 group px-4 ${isActive ? 'text-white' : ''}`} 
                  data-active={isActive}
                  isActive={isActive}
                  style={getWhiteTextStyle(isActive)}
                >
                  <Link 
                    href={item.href || '#'} 
                    className={`flex items-center text-inherit ${isActive ? 'text-white' : ''}`}
                    style={getWhiteTextStyle(isActive)}
                  >
                    {item.icon && <item.icon className={`mr-3 shrink-0 h-5 w-5 ${isActive ? 'text-white' : ''}`} />}
                    <span 
                      className={`truncate text-[15px] ${isActive ? 'text-white' : ''}`} 
                      style={getWhiteTextStyle(isActive)} 
                      data-collapse-hide
                    >
                      {item.title}
                    </span>
                    {hasBadge && (
                      <div className="ml-auto" data-collapse-hide>
                        <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                          {item.badge}
                        </span>
                      </div>
                    )}
                  </Link>
                </SidebarMenuButton>
              </div>
              
              {/* Collapsed state */}
              <div data-collapse-show className="w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-8 w-full flex items-center justify-center p-3 rounded-md ${
                    isActive 
                      ? 'bg-sidebar-primary text-white' 
                      : 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  asChild
                >
                  <Link href={item.href || '#'} className="flex justify-center items-center w-full h-full">
                    {item.icon && <item.icon className={`shrink-0 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400'}`} />}
                  </Link>
                </Button>
              </div>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </div>
  );
}

function QuickWidgetGrid({ widgets }: { widgets: QuickWidget[] }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredWidget, setHoveredWidget] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent, widgetId: string) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (widgetId: string) => {
    setHoveredWidget(widgetId);
  };

  const handleMouseLeave = () => {
    setHoveredWidget(null);
  };

  const getQuickActionHref = (widgetId: string) => {
    const routes: { [key: string]: string } = {
      'pomodoro': '/student/quick-actions/pomodoro',
      'ai-chat': '/student/quick-actions/ai-chat',
      'notes': '/student/quick-actions/notes',
      'reminders': '/student/quick-actions/reminders'
    };
    return routes[widgetId] || '#';
  };

  return (
    <div className="px-0 py-0 w-full">
      <SidebarGroupLabel className="mb-2 px-2 font-semibold text-sm" data-collapse-hide>Quick Actions</SidebarGroupLabel>
      {/* 2x2 grid when expanded, 1x4 when collapsed */}
      <div className="px-2" data-collapse-hide>
        <div className="grid grid-cols-2 gap-1">
          {widgets.map((widget) => (
            <Link 
              key={widget.id} 
              href={getQuickActionHref(widget.id)}
              className="block"
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-12 w-full flex flex-col items-center justify-center p-2 bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md"
                onMouseMove={(e) => handleMouseMove(e, widget.id)}
                onMouseEnter={() => handleMouseEnter(widget.id)}
                onMouseLeave={handleMouseLeave}
              >
                <widget.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
      {/* 1x4 grid when collapsed */}
      <div className="px-1 py-1" data-collapse-show>
        <div className="grid grid-cols-1 gap-2">
          {widgets.map((widget) => (
            <Link 
              key={widget.id} 
              href={getQuickActionHref(widget.id)}
              className="block"
            >
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-full flex items-center justify-center p-5 bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md"
                onMouseMove={(e) => handleMouseMove(e, widget.id)}
                onMouseEnter={() => handleMouseEnter(widget.id)}
                onMouseLeave={handleMouseLeave}
              >
                <widget.icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Custom cursor-following tooltip */}
      {hoveredWidget && (
        <div
          className="fixed z-50 bg-gray-900 text-white text-sm px-2 py-1 rounded shadow-lg pointer-events-none"
          style={{
            left: mousePosition.x + 10,
            top: mousePosition.y - 30,
            transform: 'translateZ(0)', // Force hardware acceleration
          }}
        >
          {widgets.find(w => w.id === hoveredWidget)?.title}
        </div>
      )}
    </div>
  );
}

export function StudentSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const expandSidebar = () => {
    setIsCollapsed(false);
  };

  const openCourseSubmenu = () => {
    // This will be handled by the nav component
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
        <SidebarHeader className="border-none pb-1">
          <div className="flex items-center justify-center w-full">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white text-lg font-semibold">
              N
            </div>
            <div className="font-semibold text-lg ml-3" data-collapse-hide>Nimbus</div>
          </div>
        </SidebarHeader>
        
        <SidebarContent className="flex flex-col py-1 px-0 gap-1">
          <QuickWidgetGrid widgets={studentNavData.quickWidgets} />
          {/* Divider only when collapsed */}
          <div data-collapse-show className="px-2 py-1">
            <Separator className="bg-gray-300 dark:bg-gray-600" />
          </div>
          <div className="px-1 text-muted-foreground">
            <StudentNavMain items={studentNavData.navMain} category="Pages" />
          </div>
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
  );
} 