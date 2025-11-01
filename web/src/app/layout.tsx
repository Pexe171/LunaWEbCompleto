import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/gallery.css";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import ApiStatusLogger from "@/components/ApiStatusLogger";
import AppShell from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Galeria de Imagens",
  description: "Uma galeria de imagens com autenticação.",
};

export const revalidate = 60;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Script id="remove-hydration-attrs" strategy="beforeInteractive">
          {`
            if (typeof document !== "undefined") {
              const rootElement = document.documentElement;
              if (rootElement.hasAttribute("suppresshydrationwarning")) {
                rootElement.removeAttribute("suppresshydrationwarning");
              }
              if (rootElement.hasAttribute("data-lt-installed")) {
                rootElement.removeAttribute("data-lt-installed");
              }
            }
          `}
        </Script>
        <Providers>
          <ApiStatusLogger />
          <AppShell>{children}</AppShell>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
