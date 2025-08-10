"use client";

import GalleryGrid from "@/components/GalleryGrid";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Image } from "@/types";

interface GalleryResponse {
  images: Image[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export default function Home() {
  const { data, isLoading, isError } = useQuery<GalleryResponse>({
    queryKey: ['gallery'],
    queryFn: () => api.get('/gallery').then(res => res.data),
  });

  if (isLoading) return <div>Carregando galeria...</div>;
  if (isError) return <div>Erro ao carregar galeria.</div>;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Galeria de Imagens</h1>
      <GalleryGrid images={data?.images || []} />
    </div>
  );
}
