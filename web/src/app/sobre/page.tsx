import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre - Galeria de Imagens",
  description: "Informações sobre o site.",
};

export default function Sobre() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Sobre</h1>
      <p>Informações sobre o site.</p>
    </div>
  );
}
