import Link from "next/link";
import { Button } from "./ui/button";
import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-secondary">
      <div className="container mx-auto flex items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>
        <nav className="ml-8 flex gap-4 text-foreground">
          <Link href="/">Início</Link>
          <Link href="/galeria">Galeria</Link>
          <Link href="/artistas">Artistas</Link>
          <Link href="/sobre">Sobre</Link>
        </nav>
        <Link href="/admin/upload" className="ml-auto">
          <Button className="font-semibold">Fazer Upload</Button>
        </Link>
        <Link href="/login" className="ml-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
