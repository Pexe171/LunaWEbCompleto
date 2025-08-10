"use client";

import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    router.push('/');
  }

  return (
    <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <AuthForm type="login" onSubmit={login} />
    </div>
  );
}
