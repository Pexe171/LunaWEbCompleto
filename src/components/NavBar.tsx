"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const { user, isAuthenticated, isLicensed, logout } = useAuth();
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
        {isAuthenticated && (
          <Link href="/admin/upload">
            <Button variant="ghost">Upload</Button>
          </Link>
        )}
        {isAuthenticated && user && (
          <Link href="/license">
            <Badge variant={isLicensed ? "default" : "destructive"}>
              {isLicensed ? "Licença Válida" : "Licença Expirada"}
            </Badge>
          </Link>
        )}
        {isAuthenticated ? (
          <Button onClick={handleLogout}>Sair</Button>
        ) : (
          <Link href="/login">
            <Button>Entrar</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
