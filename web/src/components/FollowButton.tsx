"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "./ui/use-toast";

interface FollowButtonProps {
  artistId: string;
  isFollowing: boolean;
}

export default function FollowButton({ artistId, isFollowing }: FollowButtonProps) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: (currentlyFollowing: boolean) =>
      currentlyFollowing
        ? api.delete(`/artists/${artistId}/follow`)
        : api.post(`/artists/${artistId}/follow`),
    onSuccess: (_, currentlyFollowing) => {
      queryClient.invalidateQueries({ queryKey: ["followStatus", artistId] });
      toast({
        title: "Sucesso!",
        description: currentlyFollowing
          ? "Você deixou de seguir o artista."
          : "Agora você segue este artista.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status de seguidor.",
        variant: "destructive",
      });
    },
  });

  if (!isAuthenticated) {
    return null;
  }

  const handleToggle = () => {
    mutation.mutate(isFollowing);
  };

  return (
    <Button onClick={handleToggle} variant={isFollowing ? "secondary" : "default"}>
      {isFollowing ? "Seguindo" : "Seguir"}
    </Button>
  );
}
