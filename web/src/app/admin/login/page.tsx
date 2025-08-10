"use client";

import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

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
    return null;
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <AuthForm type="login" onSubmit={login} />
    </div>
  );
}
