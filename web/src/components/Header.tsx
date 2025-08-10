import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      <div className="container mx-auto flex items-center p-4">
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>
        <nav className="ml-8 flex gap-4">
          <Link href="/">Início</Link>
          <Link href="/galeria">Galeria</Link>
          <Link href="/artistas">Artistas</Link>
          <Link href="/sobre">Sobre</Link>
        </nav>
        <Link href="/login" className="ml-auto">
          <Button className="font-semibold">Login/Cadastro</Button>
        </Link>
      </div>
    </header>
  );
}
