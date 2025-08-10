"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function UserNav() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 focus:outline-none"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-semibold">
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <span className="text-sm font-medium">{user?.name}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-md border bg-background p-2 shadow-md">
          <button
            className="w-full rounded px-2 py-1 text-left text-sm hover:bg-muted"
            onClick={() => {
              setOpen(false);
              router.push("/profile");
            }}
          >
            Editar Perfil
          </button>
          <button
            className="w-full rounded px-2 py-1 text-left text-sm hover:bg-muted"
            onClick={() => {
              setOpen(false);
              router.push("/profile#password");
            }}
          >
            Alterar Senha
          </button>
          <div className="my-1 border-t" />
          <button
            className="w-full rounded px-2 py-1 text-left text-sm text-red-600 hover:bg-muted"
            onClick={handleLogout}
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
