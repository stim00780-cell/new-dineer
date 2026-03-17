// src/app/admin/layout.tsx
'use client';

import * as React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import {
    LayoutGrid,
    ShoppingBag,
    Users,
    Utensils,
    NotebookText,
    Settings,
    Star,
    BarChart3,
    Newspaper,
    Presentation,
    Globe,
    FileText
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const adminNavLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutGrid },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/users', label: 'Users', icon: Users },
    { href: '/admin/applications', label: 'Applications', icon: FileText },
    { href: '/admin/menu', label: 'Menu Items', icon: Utensils },
    { href: '/admin/plans', label: 'Plans', icon: NotebookText },
    { href: '/admin/content', label: 'Content', icon: Presentation },
    { href: '/admin/blog', label: 'Blog', icon: Newspaper },
    { href: '/admin/reviews', label: 'Reviews', icon: Star },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/seo', label: 'SEO', icon: Globe },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);


  if (isLoading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <p>Loading or redirecting...</p>
        </div>
    );
  }

  const currentLabel = adminNavLinks.find(link => pathname.startsWith(link.href))?.label ?? 'Admin';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <Logo />
          </SidebarHeader>
          <SidebarContent className="p-0">
            <SidebarMenu>
              {adminNavLinks.map((link) => (
                <SidebarMenuItem key={link.href}>
                  <SidebarMenuButton
                    onClick={() => router.push(link.href)}
                    isActive={pathname.startsWith(link.href)}
                    tooltip={link.label}
                  >
                    <link.icon />
                    <span>{link.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
             <Separator className="my-2" />
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm group-data-[state=collapsed]:hidden">
                  <span className="font-semibold text-sidebar-foreground">{user.name}</span>
                  <span className="text-muted-foreground text-xs">{user.email}</span>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 overflow-auto bg-secondary/20">
             <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
                <SidebarTrigger className="md:hidden" />
                <h1 className="text-lg font-semibold md:text-2xl">
                    {currentLabel}
                </h1>
            </header>
            <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
