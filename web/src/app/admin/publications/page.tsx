"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

export default function PublicationsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      router.replace("/");
    }
  }, [isAuthenticated, user, router]);

  const { data, isLoading, isError } = useQuery<GalleryResponse>({
    queryKey: ["gallery"],
    queryFn: () => api.get("/gallery").then((res) => res.data),
    retry: false,
  });

  if (isLoading) return <div>Carregando galeria...</div>;
  if (isError) return <div>Erro ao carregar galeria.</div>;

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-3xl font-bold">Publicações</h1>
      <GalleryGrid images={data?.images || []} />
    </div>
  );
}
