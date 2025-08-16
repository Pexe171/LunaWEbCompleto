"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import { Artist, Image as ImageType } from "@/types";
import GalleryGrid from "@/components/GalleryGrid";
import FollowButton from "@/components/FollowButton";
import Loading from "@/components/Loading";
import { resolveAssetUrl } from "@/lib/utils";

export default function ArtistPage() {
  const params = useParams();
  const artistId = params?.artistId as string;

  const { data: artist, isLoading: artistLoading } = useQuery({
    queryKey: ["artist", artistId],
    queryFn: async () => {
      const res = await api.get(`/artists/${artistId}`);
      return res.data as Artist;
    },
    enabled: !!artistId,
  });

  const { data: images = [], isLoading: imagesLoading } = useQuery({
    queryKey: ["artistImages", artistId],
    queryFn: async () => {
      const res = await api.get(`/artists/${artistId}/images`);
      return res.data.images as ImageType[];
    },
    enabled: !!artistId,
  });

  const { data: followData } = useQuery({
    queryKey: ["followStatus", artistId],
    queryFn: async () => {
      const res = await api.get(`/artists/${artistId}/follow`);
      return res.data as { isFollowing: boolean };
    },
    enabled: !!artistId,
  });

  if (artistLoading) {
    return <Loading className="p-8" />;
  }

  if (!artist) {
    return <div className="p-8">Artista não encontrado.</div>;
  }

  const avatarUrl = resolveAssetUrl(artist.avatarUrl, { internal: true });

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="flex items-center gap-4">
        <Image
          src={avatarUrl}
          alt={artist.name}
          width={96}
          height={96}
          className="rounded-full object-cover"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{artist.name}</h1>
          <p className="text-muted-foreground">{artist.bio}</p>
        </div>
        {followData && (
          <FollowButton artistId={artistId} isFollowing={followData.isFollowing} />
        )}
      </div>
      {imagesLoading ? (
        <Loading message="Carregando galeria..." />
      ) : (
        <GalleryGrid images={images} />
      )}
    </div>
  );
}
