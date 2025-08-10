"use client";

import { Dialog, DialogContent } from "./ui/dialog";
import NextImage from "next/image";
import { Image as ImageType } from "@/types";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageType;
}

export default function Lightbox({ isOpen, onClose, image }: LightboxProps) {
  const imageUrl = image.url || `${process.env.NEXT_PUBLIC_DRIVE_EMBED_PREFIX}${image.fileId}`;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none bg-transparent">
        <NextImage
          src={imageUrl}
          alt={image.title}
          width={image.width || 1200}
          height={image.height || 800}
          className="rounded-lg max-h-[80vh] w-auto h-auto object-contain"
        />
      </DialogContent>
    </Dialog>
  );
}
