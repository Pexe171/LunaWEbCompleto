"use client";

import NextImage from "next/image";
import { useState } from "react";
import { Image as ImageType } from "@/types";
import Lightbox from "./Lightbox";
import LikeButton from "./LikeButton";
import { Trash } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "./ui/use-toast";
import { resolveAssetUrl } from "@/lib/utils";

interface ImageCardProps {
  image: ImageType;
}

export default function ImageCard({ image }: ImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useMutation({
    mutationFn: () => api.delete(`/gallery/${image._id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      toast({ title: "Sucesso!", description: "Publicação removida com sucesso." });
    },
    onError: () => {
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover a publicação.",
        variant: "destructive",
      });
    },
  });

  const imageUrl =
    (image.url && resolveAssetUrl(image.url, { internal: true })) ||
    `${process.env.NEXT_PUBLIC_DRIVE_EMBED_PREFIX}${image.fileId}`;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteMutation.mutate();
  };

  return (
    <>
      <article
        tabIndex={0}
        role="button"
        className={`card ${showOverlay ? "card--active" : ""}`}
        onClick={() => {
          setIsModalOpen(true);
          setShowOverlay(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsModalOpen(true);
            setShowOverlay(false);
          }
        }}
      >
        <div
          className="card__media"
          onClick={(e) => {
            e.stopPropagation();
            setShowOverlay((v) => !v);
          }}
        >
          <NextImage
            src={imageUrl}
            alt={image.title}
            fill
            className="object-cover"
            sizes="400px"
          />
          <div className="card__overlay" aria-hidden="true">
            <p>{image.title}</p>
          </div>
        </div>
        <div className="card__actions" onClick={(e) => e.stopPropagation()}>
          <div className="actions__left">
            <LikeButton imageId={image._id} initialCount={image.likes || 0} />
          </div>
          <div className="actions__right">
            {user?.role === "admin" && (
              <button
                className="iconbtn"
                aria-label="Excluir"
                onClick={handleDelete}
                title="Excluir"
              >
                <Trash width={22} height={22} />
              </button>
            )}
          </div>
        </div>
      </article>
      <Lightbox
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        image={image}
      />
    </>
  );
}
