"use client";

import Image from "next/image";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Image as ImageType } from "@/types";

interface GalleryResponse {
  images: ImageType[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export default function Home() {
  const { data, isLoading, isError } = useQuery<GalleryResponse>({
    queryKey: ['gallery', 'recent'],
    queryFn: () =>
      api
        .get('/gallery', { params: { limit: 6 } })
        .then(res => res.data),
  });

  return (
    <div className="flex flex-col gap-16">
      <section className="relative h-96 w-full">
        <Image
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
          alt="Destaque da galeria"
          fill
          priority
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white gap-4">
          <h1 className="text-4xl font-bold text-center">Explore a Criatividade</h1>
          <Link
            href="#galeria"
            className="px-6 py-3 bg-accent rounded-md text-lg"
          >
            Ver Galeria
          </Link>
        </div>
      </section>

      <section id="galeria" className="flex flex-col gap-8">
        <h2 className="text-3xl font-bold text-center">Obras Recentes</h2>
        {isLoading && <div>Carregando galeria...</div>}
        {isError && <div>Erro ao carregar galeria.</div>}
        {data && <GalleryGrid images={data.images} />}
      </section>

      <section className="flex flex-col md:flex-row items-center gap-8">
        <Image
          src="https://images.unsplash.com/photo-1526318472351-bc3c9c0ed911?auto=format&fit=crop&w=400&q=80"
          alt="Sobre a galeria"
          width={400}
          height={300}
          className="rounded-lg object-cover"
          unoptimized
        />
        <p className="text-lg max-w-xl text-center md:text-left">
          A LunaWEb é uma galeria digital dedicada a celebrar obras recentes e
          artistas independentes. Inspire-se com as criações e descubra novos
          talentos.
        </p>
      </section>
    </div>
  );
}
