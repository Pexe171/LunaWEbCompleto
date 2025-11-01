"use client";

import Link from "next/link";
import { Home, Images, Upload } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Início", icon: Home },
  { href: "/admin/publications", label: "Moderação", icon: Images },
  { href: "/admin/upload", label: "Upload", icon: Upload },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 border-r bg-background p-4 flex flex-col gap-2">
      <div className="mb-6 text-xl font-bold">Painel</div>
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2 rounded px-2 py-2 text-sm hover:bg-muted ${
              active ? "bg-muted font-semibold" : ""
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        );
      })}
    </aside>
  );
}
