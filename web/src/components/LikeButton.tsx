"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useToast } from "./ui/use-toast";

interface LikeButtonProps {
  imageId: string;
}

export default function LikeButton({ imageId }: LikeButtonProps) {
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Implementação otimista de likes. Você precisaria de um endpoint para likes/unlikes.
  // Aqui, apenas um mock para demonstrar a interação.
  const likeMutation = useMutation({
    mutationFn: () => api.post(`/gallery/${imageId}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      toast({
        title: "Sucesso!",
        description: "Imagem curtida com sucesso.",
        variant: "default",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao curtir",
        description: "Você não tem permissão para curtir.",
        variant: "destructive",
      });
    }
  });

  if (!isAuthenticated) {
    return null;
  }

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    likeMutation.mutate();
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLike}
      className="bg-transparent hover:bg-soft/20"
    >
      <Heart className="h-6 w-6 text-soft" />
    </Button>
  );
}
