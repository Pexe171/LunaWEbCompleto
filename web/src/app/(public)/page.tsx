"use client";

import GalleryGrid from "@/components/GalleryGrid";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Image } from "@/types";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface GalleryResponse {
  images: Image[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export default function Home() {
  const [technique, setTechnique] = useState('');
  const [artist, setArtist] = useState('');
  const [date, setDate] = useState('');

  const { data, isLoading, isError } = useQuery<GalleryResponse>({
    queryKey: ['gallery', { technique, artist, date }],
    queryFn: () => api.get('/gallery', { params: { technique, artist, date } }).then(res => res.data),
    retry: false,
  });

  if (isLoading) return <div>Carregando galeria...</div>;
  if (isError) return <div>Erro ao carregar galeria.</div>;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Galeria de Imagens</h1>
      <div className="flex flex-wrap gap-4">
        <Input placeholder="Técnica" value={technique} onChange={(e) => setTechnique(e.target.value)} />
        <Input placeholder="Artista" value={artist} onChange={(e) => setArtist(e.target.value)} />
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <GalleryGrid images={data?.images || []} />
    </div>
  );
}
