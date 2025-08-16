"use client";

import GalleryGrid from "@/components/GalleryGrid";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import Head from "next/head";
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
    queryKey: ["gallery"],
    queryFn: () => api.get("/gallery").then((res) => res.data),
    staleTime: 60_000,
    gcTime: 300_000,
    retry: false,
  });

  if (isLoading) return <LoadingState message="Carregando galeria..." />;
  if (isError) return <ErrorState message="Erro ao carregar galeria." />;

  return (
    <>
      <Head>
        <title>Galeria de Imagens</title>
        <meta
          name="description"
          content="Uma galeria de imagens com autenticação."
        />
      </Head>
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold">Galeria de Imagens</h1>
        <GalleryGrid images={data?.images || []} />
      </div>
    </>
  );
}
