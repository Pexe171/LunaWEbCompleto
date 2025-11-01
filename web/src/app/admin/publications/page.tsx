"use client";

import { useCallback, useMemo, useState } from "react";
import NextImage from "next/image";
import Head from "next/head";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Image } from "@/types";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { resolveAssetUrl } from "@/lib/utils";

interface GalleryResponse {
  images: Image[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

type ModerationStatus = "pending" | "approved" | "rejected" | "all";

const STATUS_LABELS: Record<Exclude<ModerationStatus, "all">, string> = {
  pending: "Pendentes",
  approved: "Aprovadas",
  rejected: "Recusadas",
};

const STATUS_BADGE_VARIANT: Record<Exclude<ModerationStatus, "all">, "default" | "secondary" | "destructive"> = {
  pending: "secondary",
  approved: "default",
  rejected: "destructive",
};

function ModerationCard({
  image,
  onModerate,
  isProcessing,
}: {
  image: Image;
  onModerate: (payload: { status: Exclude<ModerationStatus, "all">; notes?: string }) => void;
  isProcessing: boolean;
}) {
  const [showRejectionNotes, setShowRejectionNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const internalUrl =
    (image.url && resolveAssetUrl(image.url, { internal: true })) ||
    (image.fileId ? `${process.env.NEXT_PUBLIC_DRIVE_EMBED_PREFIX}${image.fileId}` : null);
  const imageUrl =
    internalUrl || "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

  const statusLabel = STATUS_LABELS[image.status];
  const badgeVariant = STATUS_BADGE_VARIANT[image.status];

  const handleApprove = useCallback(() => {
    onModerate({ status: "approved" });
  }, [onModerate]);

  const handleRejectConfirm = useCallback(() => {
    onModerate({ status: "rejected", notes });
    setShowRejectionNotes(false);
    setNotes("");
  }, [notes, onModerate]);

  return (
    <article className="grid gap-4 rounded-lg border bg-background p-4 md:grid-cols-[minmax(0,240px)_1fr]">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-muted">
        <NextImage
          src={imageUrl}
          alt={image.title}
          fill
          className="object-cover"
          sizes="240px"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={badgeVariant}>{statusLabel}</Badge>
            <span className="text-xs text-muted-foreground">
              {image.reviewedAt
                ? `Atualizado em ${new Date(image.reviewedAt).toLocaleString()}`
                : "Aguardando revisão"}
            </span>
          </div>
          <h2 className="text-2xl font-semibold">{image.title}</h2>
          {image.description && <p className="text-sm text-muted-foreground">{image.description}</p>}
          {image.tags && image.tags.length > 0 && (
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Tags: {image.tags.join(", ")}
            </p>
          )}
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium">Assinatura digital</p>
          <p className="rounded border bg-muted/40 p-2 font-mono text-xs break-all">{image.signature}</p>
          {image.certificateUrl && (
            <a
              href={image.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-xs font-semibold text-primary underline"
            >
              Abrir certificado digital
            </a>
          )}
        </div>

        {image.moderationNotes && image.status === "rejected" && (
          <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
            Motivo da recusa: {image.moderationNotes}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {image.status === "pending" ? (
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleApprove} disabled={isProcessing}>
                {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Aprovar
              </Button>
              {showRejectionNotes ? (
                <div className="flex w-full flex-col gap-2">
                  <Textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    placeholder="Explique o motivo da recusa para registro interno"
                    rows={3}
                    className="w-full"
                  />
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="destructive"
                      onClick={handleRejectConfirm}
                      disabled={isProcessing}
                    >
                      {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Confirmar recusa
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowRejectionNotes(false);
                        setNotes("");
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setShowRejectionNotes(true)}
                  disabled={isProcessing}
                >
                  Recusar
                </Button>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {image.status === "approved" ? (
                <span>Obra publicada na galeria.</span>
              ) : (
                <>
                  <span>Envio recusado.</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onModerate({ status: "pending" })}
                    disabled={isProcessing}
                  >
                    Reabrir análise
                  </Button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default function PublicationsPage() {
  const [activeStatus, setActiveStatus] = useState<ModerationStatus>("pending");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const queryKey = useMemo(() => ["moderation", activeStatus], [activeStatus]);

  const { data, isLoading, isError } = useQuery<GalleryResponse>({
    queryKey,
    queryFn: () => {
      const params = new URLSearchParams();
      if (activeStatus !== "all") {
        params.set("status", activeStatus);
      }
      params.set("limit", "100");
      return api.get(`/gallery?${params.toString()}`).then((res) => res.data);
    },
  });

  const [processingId, setProcessingId] = useState<string | null>(null);

  const moderateMutation = useMutation({
    mutationFn: ({
      imageId,
      status,
      notes,
    }: {
      imageId: string;
      status: Exclude<ModerationStatus, "all">;
      notes?: string;
    }) => api.patch(`/gallery/${imageId}/status`, { status, notes }),
    onMutate: (variables) => {
      setProcessingId(variables.imageId);
    },
    onSuccess: (_, variables) => {
      toast({
        title: "Status atualizado",
        description:
          variables.status === "approved"
            ? "A obra foi aprovada e agora está visível para o público."
            : variables.status === "rejected"
            ? "Envio recusado com registro de motivo."
            : "Envio retornou para a fila de análise.",
      });
      queryClient.invalidateQueries({ queryKey: ["moderation"] });
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
    onError: () => {
      toast({
        title: "Não foi possível atualizar o status",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setProcessingId(null);
    },
  });

  const handleModerate = useCallback(
    (imageId: string, payload: { status: Exclude<ModerationStatus, "all">; notes?: string }) => {
      moderateMutation.mutate({ imageId, ...payload });
    },
    [moderateMutation],
  );

  if (isLoading) {
    return <LoadingState message="Carregando fila de moderação..." />;
  }

  if (isError) {
    return <ErrorState message="Erro ao carregar a fila de moderação." />;
  }

  const images = data?.images ?? [];

  return (
    <>
      <Head>
        <title>Moderação de Envios - Galeria Humana</title>
        <meta
          name="description"
          content="Gerencie os envios pendentes, aprovados e recusados da comunidade."
        />
      </Head>
      <div className="flex flex-col gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Moderação de Envios</h1>
          <p className="text-sm text-muted-foreground">
            Revise cada obra com carinho, confirme a autoria manual e garanta que nenhuma criação feita por IA chegue ao público.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(["pending", "approved", "rejected", "all"] as ModerationStatus[]).map((status) => (
            <Button
              key={status}
              variant={activeStatus === status ? "default" : "outline"}
              onClick={() => setActiveStatus(status)}
            >
              {status === "all" ? "Todas" : STATUS_LABELS[status]}
            </Button>
          ))}
        </div>

        {images.length === 0 ? (
          <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
            Nenhuma obra encontrada neste filtro. Quando novos envios chegarem, eles aparecerão aqui para avaliação.
          </div>
        ) : (
          <div className="space-y-6">
            {images.map((image) => (
              <ModerationCard
                key={image._id}
                image={image}
                onModerate={(payload) => handleModerate(image._id, payload)}
                isProcessing={processingId === image._id && moderateMutation.isPending}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
