"use client";

import NextImage from "next/image";
import { useState } from "react";
import { Image as ImageType } from "@/types";
import { Card } from "./ui/card";
import Lightbox from "./Lightbox";
import LikeButton from "./LikeButton";

interface ImageCardProps {
  image: ImageType;
}

export default function ImageCard({ image }: ImageCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageUrl = image.url || `${process.env.NEXT_PUBLIC_DRIVE_EMBED_PREFIX}${image.fileId}`;
  const aspectRatio = image.width && image.height ? image.width / image.height : 1;

  return (
    <>
      <Card className="relative group overflow-hidden cursor-pointer" onClick={() => setIsModalOpen(true)}>
        <NextImage
          src={imageUrl}
          alt={image.title}
          width={400}
          height={Math.round(400 / aspectRatio)}
          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjREREREREIiAvPjwvc3ZnPg==`}
        />
        <div className="absolute top-2 right-2">
          <LikeButton imageId={image._id} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h3 className="font-semibold text-lg">{image.title}</h3>
        </div>
      </Card>
      <Lightbox isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} image={image} />
    </>
  );
}
