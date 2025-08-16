"use client";

import AuthForm from "@/components/AuthForm";
import LoadingState from "@/components/LoadingState";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isInitialized, router]);

  if (!isInitialized) {
    return <LoadingState message="Carregando..." />;
  }

  return (
    <>
      <Head>
        <title>Cadastro - Galeria de Imagens</title>
        <meta
          name="description"
          content="Crie sua conta para compartilhar suas criações."
        />
      </Head>
      <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
        <AuthForm type="register" onSubmit={register} redirectTo="/login" />
      </div>
    </>
  );
}
