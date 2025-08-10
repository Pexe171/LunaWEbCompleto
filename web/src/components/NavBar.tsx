"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <nav className="p-4 flex items-center justify-between border-b bg-background">
      <Link href="/" className="text-xl font-bold">
        Galeria
      </Link>
      <div className="flex items-center space-x-4">
        {isAuthenticated && user?.role === 'admin' && (
          <Link href="/admin">
            <Button variant="ghost">Dashboard</Button>
          </Link>
        )}
        {isAuthenticated && (
          <Link href="/profile">
            <Button variant="ghost">Perfil</Button>
          </Link>
        )}
        {isAuthenticated ? (
          <Button onClick={handleLogout}>Sair</Button>
        ) : (
          <>
            <Link href="/login">
              <Button>Entrar</Button>
            </Link>
            <Link href="/admin/login">
              <Button variant="ghost">Admin</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
