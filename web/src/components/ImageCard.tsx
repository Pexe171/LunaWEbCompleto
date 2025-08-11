"use client";

import NextImage from "next/image";
import { useState } from "react";
import { Image as ImageType } from "@/types";
import { Card } from "./ui/card";
import Lightbox from "./Lightbox";
import LikeButton from "./LikeButton";
import { Button } from "./ui/button";
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
  const aspectRatio = image.width && image.height ? image.width / image.height : 1;

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    deleteMutation.mutate();
  };

  return (
    <>
      <Card
        className="relative group overflow-hidden cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <NextImage
          src={imageUrl}
          alt={image.title}
          width={400}
          height={Math.round(400 / aspectRatio)}
          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjREREREREIiAvPjwvc3ZnPg==`}
        />
        <div className="absolute inset-0 flex flex-col justify-between p-4 bg-primary/85 opacity-0 group-hover:opacity-100 transition">
          <div className="flex justify-end gap-2">
            {user?.role === "admin" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                className="bg-transparent hover:bg-soft/20"
              >
                <Trash className="h-6 w-6 text-soft" />
              </Button>
            )}
            <LikeButton imageId={image._id} />
          </div>
          <div className="text-background">
            <h3 className="font-semibold text-lg">{image.title}</h3>
            {image.artist && <p className="text-sm">{image.artist}</p>}
          </div>
        </div>
      </Card>
      <Lightbox isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} image={image} />
    </>
  );
}
