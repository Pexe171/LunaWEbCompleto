"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import UserNav from "@/components/admin/UserNav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.replace("/");
    }
  }, [isAuthenticated, user, router]);

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
