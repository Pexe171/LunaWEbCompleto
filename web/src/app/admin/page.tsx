"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.replace("/");
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <h1 className="text-3xl font-bold">Dashboard do Admin</h1>
      <div className="flex flex-col gap-4">
        <Link href="/admin/publications" className="text-blue-500 underline">
          Ver Publicações
        </Link>
        <Link href="/admin/upload" className="text-blue-500 underline">
          Upload de Imagens
        </Link>
      </div>
    </div>
  );
}
