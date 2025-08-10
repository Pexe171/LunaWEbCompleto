"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.replace('/');
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="flex flex-col items-center gap-8 p-4">
      <h1 className="text-3xl font-bold">Dashboard Admin</h1>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/admin/publications">Ver Publicações</Link>
        </Button>
        <Button asChild>
          <Link href="/admin/upload">Carregar Imagem</Link>
        </Button>
      </div>
    </div>
  );
}
