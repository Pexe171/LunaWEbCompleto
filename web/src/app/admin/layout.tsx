"use client";

import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import UserNav from "@/components/admin/UserNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isInitialized, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname === "/admin/login") {
      return;
    }

    if (!isInitialized || isLoading) {
      return;
    }

    if (!isAuthenticated) {
      router.replace("/admin/login");
      return;
    }

    if (user?.role !== "admin") {
      router.replace("/");
    }
  }, [isAuthenticated, isInitialized, isLoading, pathname, router, user]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isInitialized || isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-sm text-muted-foreground">Carregando painel...</span>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  return (
    <div className="flex h-full min-h-screen">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end border-b p-4">
          <UserNav />
        </header>
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}
