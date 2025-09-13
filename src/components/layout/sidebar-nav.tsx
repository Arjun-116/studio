"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Newspaper,
  Calendar,
  Handshake,
  Briefcase,
  MessageCircle,
  Settings,
  LifeBuoy,
  GitBranch,
  LogOut,
  Loader2,
  LogIn,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { logout } from "@/app/auth/actions";
import { Button } from "../ui/button";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/directory", label: "Directory", icon: Users },
  { href: "/news", label: "News Feed", icon: Newspaper },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/mentorship", label: "Mentorship", icon: Handshake },
  { href: "/jobs", label: "Job Board", icon: Briefcase },
  { href: "/messages", label: "Messages", icon: MessageCircle },
];

export function SidebarNav({
  user,
}: {
  user: { displayName: string; photoURL: string } | null;
}) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [loggingOut, setLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      // You might want to redirect the user to the login page
      window.location.href = "/login";
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Something went wrong.",
      });
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <Sidebar className="border-r" collapsible="icon" variant="sidebar">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GitBranch className="h-6 w-6" />
          </div>
          <span className="font-semibold text-xl text-sidebar-foreground font-headline">
            Nexus
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Support">
              <LifeBuoy className="h-5 w-5" />
              <span>Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            {user ? (
              <SidebarMenuButton
                onClick={handleLogout}
                disabled={loggingOut}
                tooltip="Logout"
              >
                {loggingOut ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <LogOut className="h-5 w-5" />
                )}
                <span>Logout</span>
              </SidebarMenuButton>
            ) : (
              <Link href="/login">
                <SidebarMenuButton tooltip="Login">
                  <LogIn className="h-5 w-5" />
                  <span>Login</span>
                </SidebarMenuButton>
              </Link>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
