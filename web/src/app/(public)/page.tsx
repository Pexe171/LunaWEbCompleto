import type { Metadata } from "next";
import ErrorState from "@/components/ErrorState";
import GalleryContent, { type GalleryResponse } from "@/components/GalleryContent";

export const metadata: Metadata = {
  title: "Galeria de Imagens",
  description: "Uma galeria de imagens com autenticação.",
};

const API_BASE_URL =
  process.env.API_URL_INTERNAL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:3333/api/v1";

async function fetchGallery(): Promise<GalleryResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Falha ao carregar galeria:", response.statusText);
      return null;
    }

    return (await response.json()) as GalleryResponse;
  } catch (error) {
    console.error("Erro ao buscar dados da galeria", error);
    return null;
  }
}

export default async function Home() {
  const data = await fetchGallery();

  if (!data) {
    return <ErrorState message="Erro ao carregar galeria." />;
  }

  return <GalleryContent initialData={data} />;
}
