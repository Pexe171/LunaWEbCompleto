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

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageType;
}

export default function Lightbox({ isOpen, onClose, image }: LightboxProps) {
  const imageUrl = image.url || `${process.env.NEXT_PUBLIC_DRIVE_EMBED_PREFIX}${image.fileId}`;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none bg-transparent sm:max-w-3xl">
        <DialogTitle className="sr-only">{image.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {image.description || "Image preview"}
        </DialogDescription>
        <div className="relative">
          <NextImage
            src={imageUrl}
            alt={image.title}
            width={image.width || 1200}
            height={image.height || 800}
            className="rounded-lg max-h-[80vh] w-auto h-auto object-contain"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <LikeButton imageId={image._id} />
            <ShareButton url={imageUrl} title={image.title} />
          </div>
        </div>
        <div className="p-4 bg-background text-foreground">
          <h2 className="text-xl font-semibold">{image.title}</h2>
          {image.description && <p className="mt-2">{image.description}</p>}
          <p className="text-sm text-muted-foreground mt-2">
            {image.artist && `${image.artist} • `}
            {new Date(image.createdAt).toLocaleDateString()}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
