"use client";

import GalleryGrid from "@/components/GalleryGrid";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Image } from "@/types";

export type GalleryResponse = {
  images: Image[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

interface GalleryContentProps {
  initialData: GalleryResponse;
}

export default function GalleryContent({ initialData }: GalleryContentProps) {
  const {
    data,
    isError,
    isFetching,
  } = useQuery<GalleryResponse>({
    queryKey: ["gallery"],
    queryFn: () => api.get("/gallery").then((res) => res.data),
    initialData,
    staleTime: 60_000,
    gcTime: 300_000,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (!data && isFetching) {
    return <LoadingState message="Carregando galeria..." />;
  }

  if (!data || isError) {
    return <ErrorState message="Erro ao carregar galeria." />;
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Galeria de Imagens</h1>
      <GalleryGrid images={data.images || []} />
    </div>
  );
}
