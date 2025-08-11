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

  const { data } = useQuery({
    queryKey: ["user-count"],
    queryFn: async () => {
      const res = await api.get("/users/count");
      return res.data;
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
      <p className="mt-4 text-sm text-gray-500">
        {data?.count ?? 0} usuários cadastrados.
      </p>
    </div>
  );
}
