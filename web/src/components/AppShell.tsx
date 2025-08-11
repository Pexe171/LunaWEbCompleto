"use client";

import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <Header />
      <main className={isAdmin ? "min-h-screen p-4" : "container mx-auto p-4 md:p-8"}>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
