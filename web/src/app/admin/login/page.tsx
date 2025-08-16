"use client";

import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Login Administrativo - Galeria de Imagens",
  description: "Área de acesso restrito para administradores.",
};

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, user, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      if (user?.role === 'admin') {
        router.push('/admin/upload');
      } else {
        router.push('/');
      }
    }
  }, [isAuthenticated, isInitialized, user, router]);

  if (!isInitialized) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <AuthForm type="login" onSubmit={login} />
    </div>
  );
}
