"use client";

import type { Metadata } from "next";
import GalleryGrid from "@/components/GalleryGrid";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Image } from "@/types";

export const metadata: Metadata = {
  title: "Publicações - Área Administrativa",
  description: "Gerencie as publicações da galeria.",
};

interface GalleryResponse {
  images: Image[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export default function PublicationsPage() {
  const { data, isLoading, isError } = useQuery<GalleryResponse>({
    queryKey: ["gallery"],
    queryFn: () => api.get("/gallery").then((res) => res.data),
    retry: false,
  });

  if (isLoading) return <Loading message="Carregando galeria..." />;
  if (isError)
    return <ErrorMessage message="Erro ao carregar galeria." />;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Publicações</h1>
      <GalleryGrid images={data?.images || []} />
    </div>
  );
}
