import Link from "next/link";
import { Github, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-6 text-sm text-foreground border-t">
      <div className="flex flex-col items-center gap-4">
        <nav className="flex gap-4">
          <Link href="/sobre" className="hover:underline">
            Sobre
          </Link>
          <Link href="/contato" className="hover:underline">
            Contato
          </Link>
          <Link
            href="/politica-de-privacidade"
            className="hover:underline"
          >
            Política de Privacidade
          </Link>
        </nav>
        <div className="flex gap-4">
          <a href="#" aria-label="GitHub">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Twitter">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
        <p>Criador &amp; Programador: Pexe</p>
        <p>© {year} Pexe. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
