"use client";

import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-8rem)]">
      <AuthForm type="register" onSubmit={register} />
    </div>
  );
}
