"use client";

import type { Metadata } from "next";
import AuthForm from "@/components/AuthForm";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const metadata: Metadata = {
  title: "Login - Galeria de Imagens",
  description: "Acesse sua conta para gerenciar suas imagens.",
};

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isInitialized } = useAuth();

  const { data: userCount, isLoading, isError } = useQuery({
    queryKey: ["user-count"],
    queryFn: async () => {
      const res = await api.get("/users/count");
      return res.data.count as number;
    },
  });

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized || isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <ErrorMessage message="Erro ao carregar contagem de usuários." />
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-8rem)]">
      <AuthForm type="login" onSubmit={login} />
      <p className="mt-4 text-center text-sm text-gray-500">
        <span className="block">Usuários Registrados</span>
        <span className="text-lg font-semibold">{userCount ?? 0}</span>
      </p>
    </div>
  );
}
