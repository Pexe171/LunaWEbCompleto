"use client";

import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isInitialized } = useAuth();

  const { data: userCount } = useQuery({
    queryKey: ["user-count"],
    queryFn: async () => {
      const res = await api.get("/users/count");
      return res.data.count;
    },
  });

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-8rem)]">
      <AuthForm type="login" onSubmit={login} redirectTo="/" />
      <p className="mt-4 text-center text-sm text-gray-500">
        <span className="block">Usuários Registrados</span>
        <span className="text-lg font-semibold">{userCount ?? 0}</span>
      </p>
    </div>
  );
}
