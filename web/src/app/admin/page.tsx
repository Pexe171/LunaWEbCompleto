"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Image } from "@/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import Head from "next/head";

interface GalleryResponse {
  images: Image[];
  totalCount: number;
}

export default function AdminDashboard() {
  const {
    data: approvedData,
    isLoading: approvedLoading,
    isError: approvedError,
  } = useQuery<GalleryResponse>({
    queryKey: ["gallery-approved"],
    queryFn: () => api.get("/gallery?status=approved&limit=1000").then((res) => res.data),
    staleTime: 60_000,
  });

  const {
    data: pendingData,
    isLoading: pendingLoading,
    isError: pendingError,
  } = useQuery<GalleryResponse>({
    queryKey: ["gallery-pending"],
    queryFn: () => api.get("/gallery?status=pending&limit=1000").then((res) => res.data),
    staleTime: 30_000,
  });

  const {
    data: todayData,
    isLoading: todayLoading,
    isError: todayError,
  } = useQuery<GalleryResponse>({
    queryKey: ["gallery-today"],
    queryFn: () => {
      const today = new Date().toISOString().split("T")[0];
      const params = new URLSearchParams({ date: today, limit: "1000", status: "all" });
      return api
        .get(`/gallery?${params.toString()}`)
        .then((res) => res.data);
    },
    staleTime: 60_000,
  });

  const {
    data: userCount,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["user-count"],
    queryFn: async () => {
      const res = await api.get("/users/count");
      return res.data.count as number;
    },
    staleTime: 60_000,
  });

  if (approvedLoading || pendingLoading || todayLoading || userLoading)
    return <LoadingState message="Carregando estatísticas..." />;
  if (approvedError || pendingError || todayError || userError)
    return <ErrorState message="Erro ao carregar estatísticas." />;

  const totalPublications = approvedData?.totalCount || 0;
  const pendingReviews = pendingData?.totalCount || 0;
  const newUploads = todayData?.totalCount || 0;

  const tagCounts: Record<string, number> = {};
  approvedData?.images.forEach((img) => {
    (img.tags || []).forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([tag]) => tag);

  return (
    <>
      <Head>
        <title>Painel do Admin - Galeria de Imagens</title>
        <meta
          name="description"
          content="Visualize estatísticas gerais do sistema."
        />
      </Head>
      <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Painel do Admin</h1>
        <Link href="/">
          <Button variant="outline">Voltar ao início</Button>
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Obras publicadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPublications}</div>
            <p className="text-xs text-muted-foreground">Aprovadas e visíveis na galeria pública.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Novos envios (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newUploads}</div>
            <p className="text-xs text-muted-foreground">Inclui obras em análise humana.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pendentes de revisão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Envios aguardando confirmação de autoria.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Usuários Registrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount ?? 0}</div>
            <p className="text-xs text-muted-foreground">Contas ativas na comunidade.</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Tags mais usadas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm">
            {topTags.length > 0 ? (
              topTags.map((tag) => <li key={tag}>#{tag}</li>)
            ) : (
              <li className="text-muted-foreground">Aguardando primeiras publicações.</li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
