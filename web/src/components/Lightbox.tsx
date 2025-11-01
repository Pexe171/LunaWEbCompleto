"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import NextImage from "next/image";
import { Image as ImageType } from "@/types";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";
import { resolveAssetUrl } from "@/lib/utils";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageType;
}

export default function Lightbox({ isOpen, onClose, image }: LightboxProps) {
  const publicUrl =
    (image.url && resolveAssetUrl(image.url)) ||
    `${process.env.NEXT_PUBLIC_DRIVE_EMBED_PREFIX}${image.fileId}`;
  const internalUrl =
    (image.url && resolveAssetUrl(image.url, { internal: true })) || publicUrl;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none bg-transparent sm:max-w-3xl">
        <DialogTitle className="sr-only">{image.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {image.description || "Image preview"}
        </DialogDescription>
        <div className="relative">
          <NextImage
            src={internalUrl}
            alt={image.title}
            width={image.width || 1200}
            height={image.height || 800}
            className="rounded-lg max-h-[80vh] w-auto h-auto object-contain"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <LikeButton imageId={image._id} initialCount={image.likes || 0} />
            <ShareButton url={publicUrl} title={image.title} />
          </div>
        </div>
        <div className="p-4 bg-background text-foreground">
          <h2 className="text-xl font-semibold">{image.title}</h2>
          {image.description && <p className="mt-2">{image.description}</p>}
          <p className="text-sm text-muted-foreground mt-2">
            {image.artist && `${image.artist} • `}
            {new Date(image.createdAt).toLocaleDateString()}
          </p>
          <div className="mt-3 space-y-2 text-sm">
            <p className="font-medium">Assinatura verificada</p>
            <p className="rounded border bg-muted/40 p-2 font-mono text-xs break-all">
              {image.signature}
            </p>
            {image.certificateUrl && (
              <a
                href={image.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-xs font-semibold text-primary underline"
              >
                Ver certificado digital
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
