"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-secondary">
      <div className="container mx-auto flex items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>

        <nav className="ml-8 flex gap-4 text-foreground">
          <Link href="/">Início</Link>
          <Link href="/galeria">Galeria</Link>
          <Link href="/sobre">Sobre</Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          {isAuthenticated && user?.role === "admin" && (
            <Link href="/admin">
              <Button className="font-semibold">Dashboard</Button>
            </Link>
          )}
          {isAuthenticated ? (
            <>
              <Link href="/profile">
                <Button variant="ghost" size="icon" aria-label="Perfil">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" onClick={handleLogout}>
                Sair
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon" aria-label="Entrar">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
