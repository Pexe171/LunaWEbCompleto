import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Galeria de Imagens",
  description: "Uma galeria de imagens com autenticação e licenças.",
  keywords: ["galeria", "arte", "imagens", "artistas"],
  openGraph: {
    title: "Galeria de Imagens",
    description: "Compartilhe e descubra obras de arte digitais.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Providers>
          <NavBar />
          <main className="container mx-auto p-4 md:p-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
