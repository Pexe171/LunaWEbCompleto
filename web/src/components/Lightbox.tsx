"use client";

import { Dialog, DialogContent } from "./ui/dialog";
import NextImage from "next/image";
import { Image as ImageType } from "@/types";
import Comments from "./Comments";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageType;
}

export default function Lightbox({ isOpen, onClose, image }: LightboxProps) {
  const imageUrl = image.url || `${process.env.NEXT_PUBLIC_DRIVE_EMBED_PREFIX}${image.fileId}`;
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-4 border-none bg-background flex flex-col items-center">
        <NextImage
          src={imageUrl}
          alt={image.title}
          width={image.width || 1200}
          height={image.height || 800}
          className="rounded-lg max-h-[60vh] w-auto h-auto object-contain"
        />
        <Comments imageId={image._id} />
      </DialogContent>
    </Dialog>
  );
}
