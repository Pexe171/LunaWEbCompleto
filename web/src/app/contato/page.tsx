import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato - Galeria de Imagens",
  description: "Entre em contato com nossa equipe.",
};

export default function Contato() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Contato</h1>
      <p>Entre em contato conosco.</p>
    </div>
  );
}
