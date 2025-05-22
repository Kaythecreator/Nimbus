import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Search, Bookmark, HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-4 border-b bg-background/95 backdrop-blur transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) rounded-t-lg">
      <div className="flex w-full items-center gap-2 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-lg font-semibold">Professor Dashboard</h1>
        
        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:flex w-40 lg:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-8 h-9"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            
            <Button variant="ghost" size="icon">
              <Bookmark className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
            
            <Separator orientation="vertical" className="mx-1 h-6" />
            
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/default-avatar.png" alt="Professor" />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  )
}
