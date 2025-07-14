"use client";
import { useSession } from "next-auth/react";
import {
  BookMarkedIcon, BookmarkIcon, Home, Inbox, NotebookPen, Pencil, Search, User
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Blogs",
    url: "/blogs",
    icon: Inbox,
  },
  {
    title: "Draft",
    url: "/draft",
    icon: Pencil,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
];

const adminItems = [
  {
    title: "All Posts",
    url: "/posts",
    icon: NotebookPen,
  },
  {
    title: "All users",
    url: "/users",
    icon: User,
  },
];

export function AppSidebar() {
  const { data: session } = useSession();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {session?.user && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="/bookmarks">
                      <BookmarkIcon />
                      <span>Bookmarks</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Creator Tools</SidebarGroupLabel> {/* renamed */}
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
